"""Private Sheets persistence, atomic snapshots, single application writer.

SQLite is the local transaction/query cache. Sheets is the durable database.
The full snapshot preserves all tables/types; readable views are supplemental.
Never use a public sheet or put service-account credentials in web/.
"""
import base64, hashlib, json, os, sqlite3, time, zlib
from pathlib import Path

class StorageError(RuntimeError): pass

def snapshot(path):
    with sqlite3.connect(path) as c:
        return c.serialize()

def restore(path, data):
    with sqlite3.connect(':memory:') as src, sqlite3.connect(path) as dst:
        # WAL-mode headers require a disk WAL; in-memory recovery uses rollback mode.
        src.deserialize(data[:18]+b'\x01\x01'+data[20:])
        src.backup(dst)

def encode(data):
    value=base64.b64encode(zlib.compress(data)).decode('ascii')
    return [value[i:i+40000] for i in range(0,len(value),40000)]

def decode(rows):
    data=zlib.decompress(base64.b64decode(''.join(r[1] for r in rows[1:] if len(r)>1)))
    if hashlib.sha256(data).hexdigest()!=rows[0][1]: raise StorageError('La copia de Sheets no supera la verificación de integridad.')
    return data

VIEW_SQL={
 'Estudiantes':'SELECT participant_code,grade,created_at,updated_at FROM participant_accounts',
 'Retos_asignados':'SELECT participant_code,bank_id,mission_id,created_at FROM online_draws',
 'Respuestas':'SELECT id,participant_code,mission_id,answer,evaluation_json,created_at FROM attempts',
 'Progreso':'SELECT participant_code,module_key,grade,state_json,updated_at FROM module_states',
 'Instrumentos':'SELECT id,kind,instrument,version,subject,occasion,payload,created_at FROM study_records',
 'Revisiones':'SELECT id,attempt_id,status,rubric_json,note,created_at FROM teacher_reviews',
}

class SheetsStore:
    def __init__(self, spreadsheet_id, transport=None):
        self.id=spreadsheet_id; self.ids={};self.last=b'';self.transport=transport
        if transport is None:
            import google.auth
            from google.oauth2 import service_account
            from google.auth.transport.requests import AuthorizedSession
            scopes=['https://www.googleapis.com/auth/spreadsheets']
            raw=os.environ.get('GOOGLE_SERVICE_ACCOUNT_JSON')
            creds=(service_account.Credentials.from_service_account_info(json.loads(raw),scopes=scopes)
                   if raw else google.auth.default(scopes=scopes)[0])
            self.transport=AuthorizedSession(creds)
        self.url='https://sheets.googleapis.com/v4/spreadsheets/'+self.id

    def request(self, method, suffix='', body=None):
        for attempt in range(4):
            try:
                r=self.transport.request(method,self.url+suffix,json=body,timeout=25)
            except Exception:
                if attempt==3:raise StorageError('No se pudo confirmar el guardado en Google Sheets.') from None
                time.sleep(2**attempt);continue
            if r.status_code in (429,500,502,503,504):
                if attempt<3:time.sleep(2**attempt);continue
            if not 200<=r.status_code<300:raise StorageError(f'Google Sheets rechazó la operación ({r.status_code}). Revisa acceso y cuota.')
            return r.json()

    def load(self,path):
        meta=self.request('GET','?fields=sheets.properties')
        self.ids={s['properties']['title']:s['properties']['sheetId'] for s in meta['sheets']}
        if '_PRISMA_DB' not in self.ids:raise StorageError('Usa la hoja creada para PRISMA: falta _PRISMA_DB.')
        rows=self.request('GET','/values/%27_PRISMA_DB%27%21A1%3AB500')['values']
        if rows and rows[0][0]=='sha256':
            data=decode(rows);restore(path,data);self.last=data
        elif rows and rows[0][0]!='empty':raise StorageError('Formato de base de datos no reconocido; no se sobrescribió.')

    @staticmethod
    def cell(v):
        # Explicit stringValue prevents formula injection, preserves codes and JSON.
        return {'userEnteredValue':{'stringValue':'' if v is None else str(v)}}

    def save(self,path):
        data=snapshot(path)
        if data==self.last:return
        digest=hashlib.sha256(data).hexdigest()
        sheets={'_PRISMA_DB':[['sha256',digest]]+[[str(i),v] for i,v in enumerate(encode(data))]}
        with sqlite3.connect(path) as c:
            for title,sql in VIEW_SQL.items():
                cur=c.execute(sql)
                # Complete values remain in the snapshot if a long display cell is abbreviated.
                sheets[title]=[[x[0] for x in cur.description]]+[[str(v)[:39000]+' [ver copia integral]' if v is not None and len(str(v))>39000 else v for v in row] for row in cur]
        sheets['Estado']=[['PRISMA Online','Base privada de investigación'],['Versión','1.0.0-online.1'],['Último guardado UTC',time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime())],['SHA-256',digest],['Uso','No editar las pestañas gestionadas por la aplicación.'],['Datos','La copia integral incluye todas las tablas y archivos auxiliares.']]
        req=[]
        for title,rows in sheets.items():
            if title not in self.ids:raise StorageError('Falta pestaña de almacenamiento: '+title)
            sid=self.ids[title];cols=max(len(r) for r in rows)
            req.extend([
                {'updateSheetProperties':{'properties':{'sheetId':sid,'gridProperties':{'rowCount':max(100,len(rows)+1),'columnCount':max(8,cols)}},'fields':'gridProperties.rowCount,gridProperties.columnCount'}},
                {'updateCells':{'range':{'sheetId':sid},'fields':'userEnteredValue'}},
                {'updateCells':{'start':{'sheetId':sid,'rowIndex':0,'columnIndex':0},'rows':[{'values':[self.cell(v) for v in row]} for row in rows],'fields':'userEnteredValue'}}])
        body={'requests':req}
        if len(json.dumps(body).encode())>1900000:raise StorageError('La base supera el tamaño configurado para este piloto. Exporta y amplía el almacenamiento antes de continuar.')
        try:self.request('POST',':batchUpdate',body)
        except StorageError:
            # A timeout can occur after a successful commit; reconcile before rollback.
            try:
                rows=self.request('GET','/values/%27_PRISMA_DB%27%21A1%3AB1').get('values',[])
                if not rows or rows[0]!=['sha256',digest]:raise StorageError('Guardado no confirmado.')
            except Exception:raise StorageError('No se pudo verificar el guardado; el servidor debe reconectar antes de aceptar cambios.') from None
        self.last=data
