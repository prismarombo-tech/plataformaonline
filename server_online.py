"""Entry point for the online edition. One process / one replica per spreadsheet."""
import base64, hashlib, io, json, os, secrets, sqlite3, threading, time
from http.server import ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse
import server_simple as app
import online_engine as engine
from online_store import SheetsStore, StorageError, snapshot, restore

LOCK=threading.RLock()
STORE=None
FAILED=False
ATTEMPTS={}
BASE_EVAL_SAVE=app.save_evaluation

def load_files():
    with app.db_conn() as c:
        for name,value in c.execute('SELECT path,content FROM online_files'):
            if not (name.startswith('library/') or name.startswith('banks/')):raise StorageError('Archivo persistente inválido.')
            base=app.LIBRARY if name.startswith('library/') else app.QUESTION_BANK_DIR
            target=(base/Path(name).name).resolve()
            if target.parent!=base.resolve():raise StorageError('Ruta inválida.')
            target.write_bytes(base64.b64decode(value))

def save_files():
    with app.db_conn() as c:
        present=[]
        for prefix,folder,pattern in [('library',app.LIBRARY,'*.pdf'),('banks',app.QUESTION_BANK_DIR,'*.js')]:
            for f in folder.glob(pattern):
                name=prefix+'/'+f.name;present.append(name)
                value=base64.b64encode(f.read_bytes()).decode()
                c.execute('INSERT INTO online_files VALUES(?,?) ON CONFLICT(path) DO UPDATE SET content=excluded.content WHERE content!=excluded.content',(name,value))
        for (name,) in c.execute('SELECT path FROM online_files').fetchall():
            if name not in present:c.execute('DELETE FROM online_files WHERE path=?',(name,))

def rollback_files():
    with app.db_conn() as c:present={r[0] for r in c.execute('SELECT path FROM online_files')}
    for prefix,base,pattern in [('library',app.LIBRARY,'*.pdf'),('banks',app.QUESTION_BANK_DIR,'*.js')]:
        for p in base.glob(pattern):
            if prefix+'/'+p.name not in present:p.unlink()
    load_files();app.load_documents()

class Handler(app.Handler):
    server_version='PRISMA-Online/1.0'
    def end_headers(self):
        self.send_header('X-Content-Type-Options','nosniff')
        self.send_header('Referrer-Policy','same-origin')
        self.send_header('X-Frame-Options','SAMEORIGIN')
        self.send_header('Cache-Control','no-store' if self.path.startswith(('/api/','/health')) else 'no-cache')
        # Legacy handler contains wildcard CORS; intentionally bypass it.
        super(app.legacy.Handler,self).end_headers()

    def list_directory(self,path):return self.send_error(404)

    def _is_origin_local(self):return False

    def _rate_limit(self,path):
        if path not in {'/api/student/login','/api/teacher/login'}:return False
        # Key by submitted account as well as peer (proxy headers cannot be trusted).
        p=self._body();key=(path,str(p.get('participant_code','teacher'))[:48])
        now=time.monotonic();xs=[v for v in ATTEMPTS.get(key,[]) if now-v<60]
        ATTEMPTS[key]=xs+[now]
        return len(xs)>=12

    def do_GET(self):
        if urlparse(self.path).path in {'/health','/api/health'}:
            return self._json({'status':'unavailable' if FAILED else 'ok','app_version':app.APP_VERSION,'access_mode':'online','student_auth_required':True,'offline':False,'offline_capable':False,'local_ai':False,'model_available':False,'provider':'banco-predisenado','model_provider':'banco-predisenado','model_file_available':False,'documents_loaded':len(list(app.LIBRARY.glob('*.pdf'))),'research':app.research_config(),'storage':'google-sheets' if STORE else 'local-demo','message':'40 retos sin repetición. Orientación predeterminada y revisión docente.'},503 if FAILED else 200)
        with LOCK:return super().do_GET()

    def do_POST(self):
        global FAILED
        path=urlparse(self.path).path
        # Serialize application changes; acknowledge only after Sheets confirms them.
        with LOCK:
            if FAILED:return self._json({'detail':'Almacenamiento no disponible. El administrador debe reiniciar la conexión; no se aceptaron cambios.'},503)
            try:
                if self._rate_limit(path):return self._json({'detail':'Demasiados intentos. Espera un minuto.'},429)
                origin=self.headers.get('Origin')
                expected=os.environ.get('PRISMA_PUBLIC_URL','').rstrip('/')
                if origin and expected and origin.rstrip('/')!=expected:return self._json({'detail':'Origen no autorizado.'},403)
                p=self._body()
            except app.InvalidRequest as e:return self._json({'detail':str(e)},400)
            before=snapshot(app.DB)
            student_tokens=dict(app.STUDENT_TOKENS);teacher_tokens=set(app.legacy.TEACHER_TOKENS)
            wire=self.wfile;buf=io.BytesIO();self.wfile=buf
            try:
                self._dispatch(path,p)
                status=getattr(self,'_online_status',200)
                if status>=400:
                    restore(app.DB,before)
                else:
                    if path in {'/api/upload_pdf','/api/clear_documents','/api/clear_docs','/api/teacher/question_bank/save','/api/teacher/question_bank/restore'}:save_files()
                    if STORE:STORE.save(app.DB)
                response=buf.getvalue()
            except (engine.BankExhausted,ValueError) as e:
                restore(app.DB,before);self.wfile=wire;self._headers_buffer=[]
                return self._json({'detail':str(e)},409 if isinstance(e,engine.BankExhausted) else 400)
            except Exception as e:
                restore(app.DB,before)
                app.STUDENT_TOKENS.clear();app.STUDENT_TOKENS.update(student_tokens)
                app.legacy.TEACHER_TOKENS.clear();app.legacy.TEACHER_TOKENS.update(teacher_tokens)
                if path in {'/api/upload_pdf','/api/clear_documents','/api/clear_docs','/api/teacher/question_bank/save','/api/teacher/question_bank/restore'}:rollback_files()
                # Ambiguous remote commits require reload from Sheets, never blind overwrite.
                if isinstance(e,StorageError):FAILED=True
                self.wfile=wire;self._headers_buffer=[]
                return self._json({'detail':str(e) if isinstance(e,StorageError) else 'No se guardó la operación. Revisa la conexión o contacta al docente.'},503)
            finally:self.wfile=wire
            try:wire.write(response);wire.flush()
            except (BrokenPipeError,ConnectionResetError):pass

    def send_response(self,code,message=None):
        self._online_status=code
        return super().send_response(code,message)

    def _dispatch(self,path,p):
        if path=='/api/teacher/setup':return self._json({'detail':'La clave docente se configura en el servidor, no desde una página pública.'},403)
        if path=='/api/student/login':
            with app.db_conn() as c:
                exists=c.execute('SELECT 1 FROM participant_accounts WHERE participant_code=?',(app._safe_code(p.get('participant_code')),)).fetchone()
            if not exists:return self._json({'detail':'Código no habilitado. Solicita tu acceso al docente.'},401)
        special={'/api/generate_mission','/api/generate_mission_stream','/api/evaluate_stem','/api/evaluate_stem_stream','/api/generate','/api/generate_stream','/api/ask_document','/api/ask_document_stream'}
        if path not in special:return super().do_POST()
        if not self._student_guard(app._safe_code(p.get('participant_code'))):return
        if app.study.active_exam(app,app._safe_code(p.get('participant_code'))):return self._json({'detail':'El apoyo está pausado durante la prueba activa.'},403)
        if path.startswith('/api/ask_document'):
            sources=app.doc_search(str(p.get('query') or ''),4)
            text=('Estos fragmentos coinciden con tu consulta. Lee su contexto y usa la información para justificar tu respuesta.' if sources else 'No encontré fragmentos relacionados. Reformula la consulta con un concepto del documento.')
            result={'answer':text,'sources':sources,'source':'recuperacion-documental-sin-ia'}
            if path.endswith('_stream'):
                self._stream_headers('application/x-ndjson; charset=utf-8');self._ndjson_event('token',text=text);return self._ndjson_event('result',data=result)
            return self._json(result)
        if path.startswith('/api/generate_mission'):
            result=engine.mission(app,p)
            if path.endswith('_stream'):
                self._stream_headers('application/x-ndjson; charset=utf-8')
                for i in range(0,len(result['mission']['raw_text']),32):self._ndjson_event('token',text=result['mission']['raw_text'][i:i+32])
                return self._ndjson_event('result',data=result)
            return self._json(result)
        if path.startswith('/api/evaluate_stem'):
            mid=str(p.get('mission_id') or (p.get('mission') or {}).get('mission_id') or '')
            with app.db_conn() as c:row=c.execute('SELECT mission_json FROM missions WHERE mission_id=? AND participant_code=?',(mid,app._safe_code(p.get('participant_code')))).fetchone()
            if not row:return self._json({'detail':'Este reto no pertenece a tu cuenta.'},403)
            p=dict(p,mission=json.loads(row[0]))
            if not str(p.get('answer') or '').strip():return self._json({'detail':'Escribe tu razonamiento antes de pedir orientación.'},400)
            result=engine.evaluate(app,p)
            if path.endswith('_stream'):
                self._stream_headers('application/x-ndjson; charset=utf-8');return self._ndjson_event('result',data=result)
            return self._json(result)
        text=engine.answer(p.get('prompt',''))
        if path.endswith('_stream'):
            self._stream_headers();return self._write_stream(text)
        return self._json({'answer':text,'source':'guia-predeterminada'})

def initialize():
    global STORE
    app.APP_VERSION='1.0.0-online.1';app.ACCESS_MODE='online';app.STUDENT_AUTH_REQUIRED=True
    app.legacy.AI_READY=False;app.legacy.AI_MODE='banco-predisenado';app.legacy.AI_ERROR='Orientación predeterminada; no se usa Gemma.'
    app.model_fingerprint=lambda:'predisenado-v1-40'
    app.model_identity=lambda:{'provider':'banco-predisenado','fingerprint':'predisenado-v1-40','model_used':False}
    app.init_db();engine.init(app)
    mode=os.environ.get('PRISMA_STORAGE','sheets')
    if mode=='sheets':
        sid=os.environ.get('PRISMA_SHEET_ID','')
        if not sid:raise StorageError('Configura PRISMA_SHEET_ID y las credenciales de Google antes de publicar.')
        STORE=SheetsStore(sid);STORE.load(app.DB);app.init_db();engine.init(app);load_files()
    elif mode!='local-demo':raise ValueError('Modo de almacenamiento desconocido.')
    pin=os.environ.get('PRISMA_TEACHER_PASSWORD','')
    if len(pin)<12:raise ValueError('Configura PRISMA_TEACHER_PASSWORD con al menos 12 caracteres.')
    app.setting_set('teacher_pin_hash',hashlib.sha256(('PRISMA:'+pin).encode()).hexdigest())
    save_files();app.load_documents()
    if STORE:STORE.save(app.DB)

def main():
    initialize()
    host=os.environ.get('PRISMA_HOST','127.0.0.1' if not STORE else '0.0.0.0')
    port=int(os.environ.get('PORT','8000'))
    if not STORE and host not in {'127.0.0.1','localhost'}:raise ValueError('La demostración local no se publica en Internet.')
    print(f'PRISMA Online disponible en {host}:{port}; almacenamiento: '+('Google Sheets' if STORE else 'demostración local'),flush=True)
    ThreadingHTTPServer((host,port),Handler).serve_forever()

if __name__=='__main__':main()
