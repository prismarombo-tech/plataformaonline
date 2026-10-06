# PRISMA: Motor estable heredado: SQLite base, llama.cpp/llama-cpp, streaming y compatibilidad HTTP.
# PRISMA: Los comentarios explican responsabilidades sin cambiar la logica ejecutable.
# PRISMA: Mantener nombres de rutas, campos JSON y tablas porque forman parte de la compatibilidad del sistema.

from __future__ import annotations
import base64, csv, glob, hashlib, io, json, os, re, secrets, shutil, sqlite3, subprocess, sys, threading, time, urllib.request, urllib.error, webbrowser, unicodedata
from http import HTTPStatus
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from prisma_written_missions import validate_written_mission
from urllib.parse import urlparse, parse_qs

ROOT = Path(__file__).resolve().parent
WEB = ROOT / 'web'
DATA = Path(os.environ.get('PRISMA_DATA_DIR', str(ROOT / 'data')))
MODELS = ROOT / 'models'
LIBRARY = DATA / 'library'
BACKUPS = DATA / 'backups'
DB = DATA / 'prisma_research.db'
VENDOR = ROOT / 'vendor'
for p in (DATA, LIBRARY, BACKUPS, MODELS): p.mkdir(parents=True, exist_ok=True)
if VENDOR.exists(): sys.path.insert(0, str(VENDOR))

PORT = 8000
AI_PORT = 11435
AI_URL = f'http://127.0.0.1:{AI_PORT}/v1/chat/completions'
AI_MODE = 'none'
AI_READY = False
AI_ERROR = ''
LLAMA_PROC = None
DIRECT_MODEL = None
DIRECT_LOCK = threading.Lock()
TEACHER_TOKENS = set()
BACKUP_LOCK = threading.Lock()
LAST_PROGRESS_BACKUP = None
DOC_CHUNKS = []

DIM_LABELS = {'problem':'comprension del problema','solution':'diseno de solucion','context':'justificacion y contextualizacion','check':'verificacion y mejora'}
FALLBACKS = json.loads((Path(__file__).resolve().parent/'web/data/scenarios/written_missions.json').read_text(encoding='utf8'))

# PRISMA: Convierte datos Python a JSON compacto conservando tildes y caracteres en espanol.
def json_dumps(x): return json.dumps(x, ensure_ascii=False, separators=(',',':'))
# PRISMA: Genera la marca de fecha y hora usada en los registros locales de SQLite.
def now_iso(): return time.strftime('%Y-%m-%dT%H:%M:%S')
# PRISMA: Localiza el archivo GGUF que usa el motor de IA local.
def model_path():
    files = sorted(MODELS.glob('*.gguf'), key=lambda p:p.stat().st_size, reverse=True)
    return files[0] if files else None

# PRISMA: Abre la conexion SQLite reutilizando el motor estable de la version base.
class ManagedConnection(sqlite3.Connection):
    # El contexto SQLite confirma/revierte, pero no cierra por defecto.
    def __exit__(self, *exc):
        try:
            return super().__exit__(*exc)
        finally:
            self.close()

def db_conn():
    c=sqlite3.connect(DB, timeout=15, factory=ManagedConnection)
    c.row_factory=sqlite3.Row
    return c

# PRISMA: Inicializa y migra la base SQLite con las tablas de investigacion, estudiantes, sesiones e instrumentos.
def init_db():
    with db_conn() as c:
        c.execute('PRAGMA journal_mode=WAL')
        c.executescript('''
        CREATE TABLE IF NOT EXISTS settings(key TEXT PRIMARY KEY,value TEXT);
        CREATE TABLE IF NOT EXISTS adaptive_states(participant_code TEXT PRIMARY KEY, grade TEXT, state_json TEXT, updated_at TEXT);
        CREATE TABLE IF NOT EXISTS learner_profiles(participant_code TEXT PRIMARY KEY, grade TEXT, context_json TEXT, updated_at TEXT);
        CREATE TABLE IF NOT EXISTS interactions(id INTEGER PRIMARY KEY AUTOINCREMENT,participant_code TEXT,grade TEXT,event_type TEXT,item_id TEXT,payload_json TEXT,created_at TEXT);
        CREATE TABLE IF NOT EXISTS missions(id INTEGER PRIMARY KEY AUTOINCREMENT,participant_code TEXT,grade TEXT,mission_json TEXT,generated_by TEXT,created_at TEXT);
        CREATE TABLE IF NOT EXISTS attempts(id INTEGER PRIMARY KEY AUTOINCREMENT,participant_code TEXT,grade TEXT,mission_json TEXT,answer TEXT,evaluation_json TEXT,evaluation_source TEXT,generated_by TEXT,created_at TEXT);
        CREATE TABLE IF NOT EXISTS teacher_reviews(id INTEGER PRIMARY KEY AUTOINCREMENT,attempt_id INTEGER,status TEXT,rubric_json TEXT,note TEXT,created_at TEXT);
        CREATE TABLE IF NOT EXISTS benchmarks(id INTEGER PRIMARY KEY AUTOINCREMENT,result_json TEXT,created_at TEXT);
        CREATE TABLE IF NOT EXISTS documents(id INTEGER PRIMARY KEY AUTOINCREMENT,filename TEXT UNIQUE,path TEXT,created_at TEXT);
        ''')

# PRISMA: Crea una copia de seguridad de la base de datos mediante el mecanismo estable heredado.
def backup_db(reason='auto'):
    global LAST_PROGRESS_BACKUP
    with BACKUP_LOCK:
        if reason=='progress' and LAST_PROGRESS_BACKUP is not None and time.monotonic()-LAST_PROGRESS_BACKUP<60:
            return
        dest=_backup_db(reason)
        if dest is not None and reason=='progress':LAST_PROGRESS_BACKUP=time.monotonic()
        return dest

def _backup_db(reason='auto'):
    if not DB.exists() or DB.stat().st_size < 1024: return
    try:
        stamp=time.strftime('%Y%m%d_%H%M%S')+f'_{time.time_ns()}'; dest=BACKUPS/f'prisma_{reason}_{stamp}.db'
        from contextlib import closing
        with closing(sqlite3.connect(DB)) as src, closing(sqlite3.connect(dest)) as out:
            src.backup(out)
        files=sorted(BACKUPS.glob('prisma_*.db'),key=lambda x:x.stat().st_mtime,reverse=True)
        for old in files[8:]:
            try: old.unlink()
            except: pass
        return dest
    except Exception: pass

# PRISMA: Lee una opcion persistente de configuracion desde SQLite.
def setting_get(k):
    with db_conn() as c:
        r=c.execute('SELECT value FROM settings WHERE key=?',(k,)).fetchone(); return r['value'] if r else None

# PRISMA: Guarda una opcion persistente de configuracion en SQLite.
def setting_set(k,v):
    with db_conn() as c:c.execute('INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value',(k,v))

# PRISMA: Busca llama-server en ubicaciones conocidas para ejecutar Gemma localmente.
def find_llama_server(*args, **kwargs):
    raise RuntimeError("Esta edición utiliza banco prediseñado; no ejecuta modelos.")

# PRISMA: Solicita una respuesta completa al servidor local de llama.cpp.
def ai_http(*args, **kwargs):
    raise RuntimeError("Esta edición utiliza banco prediseñado; no ejecuta modelos.")

# PRISMA: Solicita una respuesta en streaming al servidor local de llama.cpp.
def ai_http_stream(*args, **kwargs):
    raise RuntimeError("Esta edición utiliza banco prediseñado; no ejecuta modelos.")

# PRISMA: Intenta cargar el GGUF directamente con llama-cpp-python cuando esta disponible.
def ensure_direct_model(*args, **kwargs):
    raise RuntimeError("Esta edición utiliza banco prediseñado; no ejecuta modelos.")

# PRISMA: Genera texto usando llama-cpp-python cargado dentro del mismo proceso.
def ai_direct(*args, **kwargs):
    raise RuntimeError("Esta edición utiliza banco prediseñado; no ejecuta modelos.")

# PRISMA: Genera texto por fragmentos usando llama-cpp-python.
def ai_direct_stream(*args, **kwargs):
    raise RuntimeError("Esta edición utiliza banco prediseñado; no ejecuta modelos.")

# PRISMA: Selecciona automaticamente el proveedor local disponible para una respuesta completa.
def ai_text(*args, **kwargs):
    raise RuntimeError("Esta edición utiliza banco prediseñado; no ejecuta modelos.")

# PRISMA: Selecciona automaticamente el proveedor local disponible para una respuesta en streaming.
def ai_stream(*args, **kwargs):
    raise RuntimeError("Esta edición utiliza banco prediseñado; no ejecuta modelos.")

# PRISMA: Limpia la salida textual de la IA antes de mostrarla o almacenarla.
def clean_ai_plain(text):
    t=str(text or '').replace('\r','')
    t=re.sub(r'```(?:json|markdown|text)?','',t,flags=re.I)
    t=t.replace('```','').replace('**','').replace('__','').replace('`','')
    t=re.sub(r'(?m)^\s*#{1,6}\s*','',t)
    t=re.sub(r'(?m)^\s*[-*+]\s+','• ',t)
    t=re.sub(r'\n{3,}','\n\n',t)
    return t.strip()

# PRISMA: Normaliza valores individuales producidos por la IA.
def clean_ai_value(v):
    if isinstance(v,str): return clean_ai_plain(v)
    if isinstance(v,list): return [clean_ai_value(x) for x in v]
    if isinstance(v,dict): return {k:clean_ai_value(x) for k,x in v.items()}
    return v

# PRISMA: Intenta extraer un objeto JSON de una salida generada por el modelo.
def parse_json_text(text):
    text=str(text or '').strip().replace('```json','').replace('```','').strip()
    try:return json.loads(text)
    except: pass
    a=text.find('{'); b=text.rfind('}')
    if a>=0 and b>a:
        try:return json.loads(text[a:b+1])
        except:pass
    return None

# PRISMA: Normaliza nombres de campos escritos por Gemma para poder interpretarlos.
def _norm_key(text):
    t=unicodedata.normalize('NFD',str(text or '')).encode('ascii','ignore').decode('ascii').upper().strip()
    return re.sub(r'\s+',' ',t)

# PRISMA: Interpreta salidas estructuradas como lineas CLAVE: valor.
def parse_lines(text):
    out={}
    for raw in clean_ai_plain(text).splitlines():
        if ':' not in raw: continue
        k,v=raw.split(':',1); k=_norm_key(k); v=v.strip()
        if k and v: out[k]=v
    return out

# PRISMA: Inicia el motor de IA usando la implementacion estable de la version base.
def start_ai(*args, **kwargs):
    raise RuntimeError("Esta edición utiliza banco prediseñado; no ejecuta modelos.")

# PRISMA: Convierte el contexto del estudiante a una representacion textual compacta.
def learner_context_text(learner):
    learner=learner or {}
    direct=clean_ai_plain(str(learner.get('profileText') or '')).strip()
    if direct:
        return direct[:700]
    parts=[]
    for key in ('interests','environment','learningGoal'):
        value=clean_ai_plain(str(learner.get(key) or '')).strip()
        if value:
            parts.append(value)
    return ' | '.join(parts)[:700]

# PRISMA: Crea una mision determinista cuando no hay IA disponible.
def fallback_mission(payload):
    focus=(payload.get('focus') or {}).get('dimension','problem')
    learner=payload.get('learner_context') or {}
    idx=(int(payload.get('mission_number') or 1)-1)%len(FALLBACKS)
    seed=dict(FALLBACKS[idx])
    learner_text=learner_context_text(learner)
    seed.update({
        'story':('Resuelve el reto observando, proponiendo, justificando y verificando con evidencia. ' + (f"Conectalo, si resulta util, con lo que el estudiante conto: {learner_text[:110]}." if learner_text else '')).strip(),
        'teacher_note':f'Respaldo local orientado a {DIM_LABELS.get(focus,focus)}.',
        'focus_dimension':focus,
        'support_level':'adaptativo',
        'evidence_goal':'Entrega una respuesta en la que se vean claramente el problema, la solucion, la justificacion y la forma de comprobarla.',
        'success_criterion':'La propuesta debe incluir al menos una evidencia o medida que permita decidir si la solucion funciona y que mejorar.',
        'mission_id':f'LOCAL-{seed["id"]}-{int(time.time())}',
        'generated_by':'banco-local'
    })
    return seed

# PRISMA: Construye el prompt de mision de la capa estable heredada.
def mission_prompt(payload):
    focus=payload.get('focus') or {}; mastery=payload.get('mastery') or {}; debt=payload.get('debt') or {}; rec=payload.get('recommendations') or []; learner=payload.get('learner_context') or {}
    last=payload.get('last_evaluation') or {}
    prior=''
    if last:
        prior=("\nAprendizaje anterior que debes transferir a esta nueva mision:\n"
               f"- Dimension que necesitaba mas apoyo: {last.get('weakest','')}\n"
               f"- Objetivo de aprendizaje anterior: {last.get('learning_goal','')}\n"
               f"- Proxima transferencia sugerida: {last.get('next_mission_focus','')}\n"
               "No repitas exactamente el reto anterior. Crea una situacion nueva donde el estudiante tenga que aplicar esa mejora.")
    return f'''El estudiante responde exclusivamente por escrito en PRISMA: compara, calcula, justifica y revisa con datos ficticios dados. No pidas maquetas, modelos 3D, dibujos, construcción, mediciones reales ni archivos externos.
Eres PRISMA, tutor STEM local para secundaria en Bogota. Crea UNA mision STEM situada, realista, desafiante, clara y de bajo costo.
Grado: {payload.get('grade','')}
Foco adaptativo actual: {focus}
Dominio actual: {mastery}
Deuda pedagogica: {debt}
Modulos de refuerzo: {rec}{prior}
Descripcion libre del estudiante sobre sus gustos, entorno y lo que quiere aprender: {learner_context_text(learner)}
Usa esta descripcion solo para dar pertinencia al reto. Integra de forma natural uno o dos elementos cuando ayuden al aprendizaje; no fuerces conexiones, no inventes datos personales y no uses estereotipos.
La mision debe exigir comprender el problema, disenar una solucion, justificarla en contexto y verificarla con evidencia.
Adapta el andamiaje: si el dominio de la dimension foco es bajo, da pasos mas guiados; si es alto, deja mas autonomia.
No uses nombres reales ni decisiones de alto impacto.
No des la solucion. Desarrolla la mision completa y autosuficiente. Puedes usar hasta 600 palabras cuando el reto lo necesite; no cortes una idea, paso, evidencia o criterio de exito a mitad.
Responde en TEXTO LIMPIO, sin Markdown, sin asteriscos dobles, sin #, sin bloques de codigo y sin tablas.
Usa exactamente estas lineas y en este orden:
TITULO: texto breve
HISTORIA: una introduccion atractiva de una o dos frases
CONTEXTO: situacion concreta con restricciones reales
RETO: tarea principal que debe resolver el estudiante
PASO 1: accion
PASO 2: accion
PASO 3: accion
PASO 4: accion
EVIDENCIA: que debe entregar o hacer visible en su respuesta
CRITERIO DE EXITO: como sabra que su propuesta esta bien sustentada
MODULOS: dos a cuatro claves separadas por coma
FOCO: problem, solution, context o check
APOYO: guiado, equilibrado o autonomo
NOTA DOCENTE: orientacion breve'''

# PRISMA: Convierte la respuesta textual del modelo en la estructura interna de mision.
def parse_mission_output(text,payload):
    raw_clean=clean_ai_plain(text)
    obj=parse_json_text(text)
    if isinstance(obj,dict) and obj.get('title'):
        obj=clean_ai_value(obj)
        obj.setdefault('success_criterion',obj.get('successCriterion') or '')
    else:
        r=parse_lines(text)
        focus=(payload.get('focus') or {}).get('dimension','problem')
        tags=[x.strip().lower() for x in (r.get('MODULOS') or '').split(',') if x.strip()]
        obj={
            'title':r.get('TITULO') or 'Mision STEM adaptativa',
            'story':r.get('HISTORIA') or 'PRISMA preparo un nuevo reto para tu trayectoria.',
            'context':r.get('CONTEXTO') or 'Situacion escolar contextualizada.',
            'task':r.get('RETO') or 'Propone, justifica y verifica una solucion STEM.',
            'steps':[r.get(f'PASO {i}') or f'Desarrolla el paso {i}.' for i in range(1,5)],
            'module_tags':tags[:4] or list(payload.get('recommendations') or [])[:4],
            'teacher_note':r.get('NOTA DOCENTE') or 'Acompanamiento formativo y revision humana.',
            'focus_dimension':(r.get('FOCO') or focus).lower(),
            'support_level':r.get('APOYO') or 'adaptativo',
            'evidence_goal':r.get('EVIDENCIA') or 'Hacer visibles las cuatro dimensiones de la rubrica.',
            'success_criterion':r.get('CRITERIO DE EXITO') or 'Explica que evidencia usarias para decidir si la propuesta funciona y como la mejorarias.'
        }
    obj['raw_text']=raw_clean
    obj['mission_id']=f'AI-{int(time.time()*1000)}'; obj['generated_by']='gemma-local'
    validate_written_mission(obj)
    obj['delivery_mode']='written-only-v312'
    return obj

# PRISMA: Guarda la mision generada junto con trazabilidad, fuentes y version del modelo.
def save_mission(payload,obj):
    with db_conn() as c:c.execute('INSERT INTO missions(participant_code,grade,mission_json,generated_by,created_at) VALUES(?,?,?,?,?)',(payload.get('participant_code',''),payload.get('grade',''),json_dumps(obj),'gemma-local',now_iso()))

# PRISMA: Orquesta preparacion, generacion con IA o respaldo local, parseo y guardado de la mision.
def generate_mission(payload):
    if not AI_READY:return {'mission':fallback_mission(payload),'source':'banco-local'}
    try:
        obj=parse_mission_output(ai_text(mission_prompt(payload),1100,.45),payload); save_mission(payload,obj)
        return {'mission':obj,'source':'gemma-local'}
    except Exception:
        return {'mission':fallback_mission(payload),'source':'banco-local'}

# PRISMA: Construye una ruta formativa por defecto segun la dimension mas debil.
def _default_learning_plan(weakest):
    plans={
        'problem':{
            'goal':'Comprender el problema antes de proponer soluciones: identificar causas, variables, restricciones y objetivo.',
            'route':['Reescribe en dos o tres frases cual es el problema, a quien afecta y que condicion no puedes ignorar.','Busca o practica una actividad donde debas identificar variables, datos y restricciones.','Transfiere esa comprension a una situacion nueva y explica que cambia antes de disenar la solucion.'],
            'micro':'Construye una mini ficha con cuatro apartados: problema, dos causas posibles, dos variables medibles y una restriccion real.',
            'success':'La ficha distingue claramente causas, variables y restricciones sin proponer aun la solucion.',
            'next':'En la siguiente mision deberas analizar una situacion nueva y justificar que informacion necesitas antes de disenar.'
        },
        'solution':{
            'goal':'Convertir una idea general en una solucion STEM concreta, ordenada y realizable.',
            'route':['Transforma tu propuesta en una secuencia de pasos con materiales, decisiones y responsables del proceso.','Practica un reto de diseno, algoritmos, estructuras o prototipado relacionado con la necesidad detectada.','Aplica lo aprendido en una nueva mision reduciendo la ayuda y explicando por que elegiste ese diseno.'],
            'micro':'Describe un prototipo minimo viable en cinco pasos: entrada, proceso, materiales, salida esperada y posible falla.',
            'success':'Otra persona podria construir o ejecutar tu propuesta siguiendo la secuencia sin tener que adivinar pasos importantes.',
            'next':'La siguiente mision te pedira disenar una solucion mas autonoma y considerar una posible falla o alternativa.'
        },
        'context':{
            'goal':'Justificar por que la propuesta es viable y pertinente para el contexto escolar y los recursos disponibles.',
            'route':['Agrega a tu respuesta dos razones de viabilidad y una limitacion del contexto que deba respetarse.','Practica una actividad vinculada con ambiente, energia, fuerzas, recursos o toma de decisiones contextualizada.','En la siguiente mision compara dos alternativas y elige una usando criterios del contexto.'],
            'micro':'Compara dos soluciones posibles usando tres criterios: costo o recursos, seguridad y efecto en la comunidad escolar.',
            'success':'La eleccion se apoya en criterios del contexto y reconoce al menos una limitacion o compromiso.',
            'next':'La siguiente mision te pedira elegir entre alternativas y defender la opcion mas pertinente para el contexto.'
        },
        'check':{
            'goal':'Aprender a comprobar una propuesta con datos, criterios de exito y una decision de mejora.',
            'route':['Completa tu respuesta indicando que mediras antes, que mediras despues y cual sera el criterio de comparacion.','Practica una microactividad de medicion, datos, ciencia u Ohm donde tengas que verificar un resultado.','En una nueva mision disena desde el inicio una prueba y usa su resultado para decidir que cambiarias.'],
            'micro':'Disena una prueba A/B sencilla: define variable, unidad, valor antes, valor despues y criterio para decidir si hubo mejora.',
            'success':'La prueba permite obtener un dato comparable y tomar una decision concreta de mantener, modificar o descartar la propuesta.',
            'next':'La siguiente mision exigira un plan de verificacion desde el inicio y una regla clara para decidir la mejora.'
        }
    }
    return plans.get(weakest,plans['problem'])

# PRISMA: Aplica una rubrica local de respaldo cuando no puede evaluar la IA.
def local_rubric(answer):
    t=re.sub(r'[^a-z0-9áéíóúñü ]+',' ',answer.lower()); wc=len(t.split())
    # PRISMA: Funcion interna 'lvl' del servidor; se mantiene separada para facilitar mantenimiento y pruebas.
    def lvl(words, min_words=30):
        hits=sum(1 for w in words if w in t); return 4 if hits>=4 and wc>=80 else 3 if hits>=2 and wc>=50 else 2 if hits>=1 or wc>=min_words else 1
    r={'problem':lvl(['problema','causa','dato','variable','condicion']), 'solution':lvl(['solucion','propuesta','diseno','paso','material']), 'context':lvl(['porque','viable','contexto','colegio','recursos']), 'check':lvl(['medir','comparar','verificar','prueba','resultado','mejorar'])}
    weak=min(r,key=r.get); plan=_default_learning_plan(weak)
    return {'rubric':r,'weakest':weak,'feedback':f'La principal oportunidad de mejora esta en {DIM_LABELS[weak]}.','strengths':['La respuesta presenta elementos utiles para continuar.'],'weaknesses':[f'Conviene fortalecer {DIM_LABELS[weak]}.'],'improvements':[plan['route'][0]],'learning_goal':plan['goal'],'learning_route':plan['route'],'micro_challenge':plan['micro'],'success_criterion':plan['success'],'next_mission_focus':plan['next'],'teacher_suggestion':'Usar la retroalimentacion como apoyo formativo y permitir una revision del mismo reto.','evaluation_source':'respaldo-local','model_used':False}

# PRISMA: Construye el prompt de evaluacion de la capa estable.
def evaluation_prompt(payload):
    mission=payload.get('mission') or {}; mission={k:v for k,v in mission.items() if k not in ('raw_text','teacher_note')}; answer=str(payload.get('answer') or ''); learner=payload.get('learner_context') or {}
    return f'''Evalua formativamente la respuesta de un estudiante de grado {payload.get('grade','')} a una mision STEM.
MISION: {json_dumps(mission)}
RESPUESTA DEL ESTUDIANTE: {answer}
CONTEXTO E INTERESES DEL ESTUDIANTE: {learner_context_text(learner)}
Usa nivel entero de 1 a 4 para: comprension del problema, diseno de solucion, justificacion/contextualizacion y verificacion/mejora.
Tu prioridad es ayudar al estudiante a mejorar, no solo asignar niveles.
La ruta debe ser accionable: primero revisar esta misma respuesta, luego practicar una habilidad puntual y finalmente transferirla a una nueva mision.
El MINI RETO debe durar aproximadamente 5 a 10 minutos, centrarse en la dimension mas debil y NO dar la respuesta.
No califiques identidad ni conducta. Se concreto, formativo y claro.
Responde en TEXTO LIMPIO, sin Markdown, sin asteriscos dobles, sin #, sin bloques de codigo y sin tablas.
Usa exactamente estas lineas:
COMPRENSION: 1-4
DISENO: 1-4
JUSTIFICACION: 1-4
VERIFICACION: 1-4
RETROALIMENTACION: una sintesis breve que explique el siguiente paso
FORTALEZA 1: texto
FORTALEZA 2: texto
POR FORTALECER 1: texto
POR FORTALECER 2: texto
MEJORA 1: accion concreta para revisar esta respuesta
MEJORA 2: segunda accion concreta
OBJETIVO DE APRENDIZAJE: habilidad especifica que debe fortalecer
RUTA PASO 1: que debe corregir o reescribir ahora en este mismo reto
RUTA PASO 2: que habilidad o concepto debe practicar despues
RUTA PASO 3: como debe transferir lo aprendido a una situacion nueva
MINI RETO: una tarea breve y concreta para practicar la dimension mas debil
CRITERIO DE EXITO: evidencia observable que demostraria mejora
PROXIMA MISION: que deberia exigir la siguiente mision para comprobar transferencia
SUGERENCIA DOCENTE: texto breve'''

# PRISMA: Limita un nivel de rubrica al rango valido de 1 a 4.
def _level(v):
    m=re.search(r'[1-4]',str(v or '')); return int(m.group()) if m else 1

# PRISMA: Completa los campos de la ruta formativa si la IA omitio alguno.
def _complete_learning_plan(obj):
    rub=obj.get('rubric') or {}; weakest=obj.get('weakest') or (min(rub,key=rub.get) if rub else 'problem')
    plan=_default_learning_plan(weakest)
    route=obj.get('learning_route') if isinstance(obj.get('learning_route'),list) else []
    route=[clean_ai_plain(x) for x in route if str(x).strip()]
    while len(route)<3: route.append(plan['route'][len(route)])
    obj['learning_goal']=clean_ai_plain(obj.get('learning_goal') or plan['goal'])
    obj['learning_route']=route[:3]
    obj['micro_challenge']=clean_ai_plain(obj.get('micro_challenge') or plan['micro'])
    obj['success_criterion']=clean_ai_plain(obj.get('success_criterion') or plan['success'])
    obj['next_mission_focus']=clean_ai_plain(obj.get('next_mission_focus') or plan['next'])
    return obj

# PRISMA: Convierte la salida de evaluacion en rubrica, feedback y ruta de aprendizaje.
def parse_evaluation_output(text):
    obj=parse_json_text(text)
    if isinstance(obj,dict) and isinstance(obj.get('rubric'),dict):
        obj=clean_ai_value(obj)
        rub={k:max(1,min(4,int(obj['rubric'].get(k,1)))) for k in ('problem','solution','context','check')}
    else:
        r=parse_lines(text)
        rub={'problem':_level(r.get('COMPRENSION')),'solution':_level(r.get('DISENO')),'context':_level(r.get('JUSTIFICACION')),'check':_level(r.get('VERIFICACION'))}
        obj={
            'rubric':rub,
            'feedback':r.get('RETROALIMENTACION') or '',
            'strengths':[r[k] for k in ('FORTALEZA 1','FORTALEZA 2') if r.get(k)],
            'weaknesses':[r[k] for k in ('POR FORTALECER 1','POR FORTALECER 2','DEBILIDAD 1','DEBILIDAD 2') if r.get(k)],
            'improvements':[r[k] for k in ('MEJORA 1','MEJORA 2') if r.get(k)],
            'learning_goal':r.get('OBJETIVO DE APRENDIZAJE') or '',
            'learning_route':[r[k] for k in ('RUTA PASO 1','RUTA PASO 2','RUTA PASO 3') if r.get(k)],
            'micro_challenge':r.get('MINI RETO') or '',
            'success_criterion':r.get('CRITERIO DE EXITO') or '',
            'next_mission_focus':r.get('PROXIMA MISION') or '',
            'teacher_suggestion':r.get('SUGERENCIA DOCENTE') or 'Revisar la evidencia y contextualizar la recomendacion.'
        }
    obj['rubric']=rub; obj['weakest']=min(rub,key=rub.get); obj['evaluation_source']='gemma-local'; obj['model_used']=True
    return _complete_learning_plan(obj)

# PRISMA: Guarda intento, rubrica, tiempo, revision y metadatos de reproducibilidad.
def save_evaluation(payload,result):
    mission=payload.get('mission') or {}; answer=str(payload.get('answer') or '')
    with db_conn() as c:
        cur=c.execute('INSERT INTO attempts(participant_code,grade,mission_json,answer,evaluation_json,evaluation_source,generated_by,created_at) VALUES(?,?,?,?,?,?,?,?)',(payload.get('participant_code',''),payload.get('grade',''),json_dumps(mission),answer,json_dumps(result),result.get('evaluation_source',''),mission.get('generated_by',''),now_iso()))
        result['attempt_id']=cur.lastrowid
    return result

# PRISMA: Orquesta evaluacion con Gemma o respaldo local y devuelve la ruta formativa resultante.
def evaluate(payload):
    result=None
    if AI_READY:
        try: result=parse_evaluation_output(ai_text(evaluation_prompt(payload),1050,.15))
        except Exception: result=None
    if not result: result=local_rubric(str(payload.get('answer') or ''))
    return save_evaluation(payload,result)

# PRISMA: Lee los PDF locales, los fragmenta y prepara estadisticas para busqueda BM25.
def load_documents():
    global DOC_CHUNKS
    DOC_CHUNKS=[]
    try:
        from pypdf import PdfReader
    except Exception:return
    for pdf in LIBRARY.glob('*.pdf'):
        try:
            reader=PdfReader(str(pdf))
            for pi,page in enumerate(reader.pages,1):
                text=' '.join((page.extract_text() or '').split())
                if not text:continue
                for i in range(0,len(text),1400):
                    chunk=text[i:i+1700]
                    if len(chunk)>120:DOC_CHUNKS.append({'filename':pdf.name,'page':pi,'text':chunk})
        except:pass

# PRISMA: Busca fragmentos curriculares relevantes con BM25 sin usar Internet.
def doc_search(q,k=4):
    terms=[x for x in re.findall(r'[a-záéíóúñ0-9]{3,}',q.lower()) if x not in {'para','como','que','con','una','los','las','del','por'}]
    scored=[]
    for ch in DOC_CHUNKS:
        low=ch['text'].lower(); score=sum(low.count(t)*(1+min(len(t),8)/8) for t in terms)
        if score:scored.append((score,ch))
    return [x[1] for x in sorted(scored,key=lambda z:z[0],reverse=True)[:k]]

# PRISMA: Comprueba el token temporal del docente antes de exponer datos sensibles del panel.
def teacher_ok(headers):return headers.get('X-PRISMA-Teacher-Token','') in TEACHER_TOKENS

# PRISMA: Reune en una sola respuesta los datos que necesita el panel docente.
def dashboard():
    with db_conn() as c:
        states=c.execute('SELECT * FROM adaptive_states ORDER BY updated_at DESC').fetchall(); inter=c.execute('SELECT COUNT(*) n FROM interactions').fetchone()['n']; missions=c.execute('SELECT COUNT(*) n FROM missions').fetchone()['n']; atts=c.execute('SELECT * FROM attempts ORDER BY id DESC LIMIT 30').fetchall(); ai=c.execute("SELECT COUNT(*) n FROM attempts WHERE evaluation_source='gemma-local'").fetchone()['n']; total=c.execute('SELECT COUNT(*) n FROM attempts').fetchone()['n']; benches=c.execute('SELECT * FROM benchmarks ORDER BY id DESC LIMIT 5').fetchall()
    parts=[]; av={'problem':[],'solution':[],'context':[],'check':[]}
    for s in states:
        st=json.loads(s['state_json'] or '{}'); m=st.get('mastery',{})
        for k in av:av[k].append(float(m.get(k,0)))
        parts.append({'participant_code':s['participant_code'],'grade':s['grade'],**{k:float(m.get(k,0)) for k in av},'mission_count':int(st.get('missionCount',0)),'question_count':int(st.get('questionCount',0))})
    recent=[]
    for a in atts:
        mj=json.loads(a['mission_json'] or '{}'); ev=json.loads(a['evaluation_json'] or '{}')
        recent.append({'attempt_id':a['id'],'participant_code':a['participant_code'],'mission_title':mj.get('title','Mision STEM'),'mission':mj,'answer':a['answer'],'evaluation':ev,'evaluation_source':a['evaluation_source'],'generated_by':a['generated_by'],'created_at':a['created_at'],'teacher_review':None})
    summary={'model_available':AI_READY,'model_provider':AI_MODE,'model_file_available':bool(model_path()),'db_size_mb':round(DB.stat().st_size/1048576,2) if DB.exists() else 0,'participants':len(parts),'interactions':inter,'missions_generated':missions,'mission_attempts':total,'ai_evaluation_percent':round(ai*100/total) if total else 0,'documents_loaded':len(list(LIBRARY.glob('*.pdf'))),'document_chunks':len(DOC_CHUNKS),'mastery_avg':{k:round(sum(v)/len(v),1) if v else 0 for k,v in av.items()},'process':{'rss_mb':'local'}}
    return {'summary':summary,'participants':parts,'recent_attempts':recent,'technical':{},'benchmarks':[{'result':json.loads(x['result_json'])} for x in benches]}

# PRISMA: Define el manejador HTTP que extiende el motor estable y concentra las rutas de PRISMA.
class Handler(SimpleHTTPRequestHandler):
    server_version='PRISMA/2.3.2'
    # PRISMA: Funcion interna '__init__' del servidor; se mantiene separada para facilitar mantenimiento y pruebas.
    def __init__(self,*a,**kw):super().__init__(*a,directory=str(WEB),**kw)
    # PRISMA: Funcion interna 'log_message' del servidor; se mantiene separada para facilitar mantenimiento y pruebas.
    def log_message(self,fmt,*args): pass
    # PRISMA: Funcion interna 'end_headers' del servidor; se mantiene separada para facilitar mantenimiento y pruebas.
    def end_headers(self):
        # Los recursos se revalidan; API y bancos editables nunca usan cache.
        path=urlparse(self.path).path
        dynamic=path.startswith(('/api/', '/health', '/data/modules/'))
        self.send_header('Cache-Control','no-store' if dynamic else 'no-cache')
        return super().end_headers()
    # PRISMA: Protege las respuestas JSON frente a desconexiones del cliente.
    def _json(self,obj,status=200,headers=None):
        b=json.dumps(obj,ensure_ascii=False).encode('utf-8'); self.send_response(status);self.send_header('Content-Type','application/json; charset=utf-8');self.send_header('Content-Length',str(len(b)));self.send_header('Cache-Control','no-store');
        for k,v in (headers or {}).items():self.send_header(k,v)
        self.end_headers();self.wfile.write(b)
    # PRISMA: Lee el cuerpo JSON una sola vez y lo reutiliza durante la solicitud.
    def _body(self):
        n=int(self.headers.get('Content-Length','0') or 0); raw=self.rfile.read(n) if n else b''
        try:return json.loads(raw.decode('utf-8')) if raw else {}
        except:return {}
    # PRISMA: Funcion interna '_stream_headers' del servidor; se mantiene separada para facilitar mantenimiento y pruebas.
    def _stream_headers(self,content_type='text/plain; charset=utf-8'):
        self.send_response(200); self.send_header('Content-Type',content_type); self.send_header('Cache-Control','no-store'); self.send_header('Connection','close'); self.end_headers()
    # PRISMA: Envia texto al navegador controlando cierres de conexion durante el streaming.
    def _write_stream(self,text):
        try:self.wfile.write(str(text).encode('utf-8')); self.wfile.flush()
        except (BrokenPipeError,ConnectionResetError):raise
    # PRISMA: Agrupa fragmentos del streaming para reducir escrituras y errores WinError 10053.
    def _ndjson_event(self,kind,**payload):
        self._write_stream(json.dumps({'type':kind,**payload},ensure_ascii=False,separators=(',',':'))+'\n')
    # PRISMA: Enruta las consultas HTTP de lectura: salud, estados, panel, exportaciones y archivos.
    def do_GET(self):
        path=urlparse(self.path).path
        if path in ('/health','/api/health'):
            return self._json({'status':'ok','offline':True,'model_available':AI_READY,'model_file_available':bool(model_path()),'provider':AI_MODE,'message':AI_ERROR})
        if path=='/api/adaptive_state':
            q=parse_qs(urlparse(self.path).query);code=(q.get('participant_code')or[''])[0]
            with db_conn() as c:r=c.execute('SELECT grade,state_json,updated_at FROM adaptive_states WHERE participant_code=?',(code,)).fetchone()
            return self._json({'state':json.loads(r['state_json']) if r else None,'grade':r['grade'] if r else None,'updated_at':r['updated_at'] if r else None})
        if path=='/api/learner_profile':
            q=parse_qs(urlparse(self.path).query);code=(q.get('participant_code')or[''])[0]
            with db_conn() as c:r=c.execute('SELECT grade,context_json,updated_at FROM learner_profiles WHERE participant_code=?',(code,)).fetchone()
            return self._json({'context':json.loads(r['context_json']) if r else None,'grade':r['grade'] if r else None,'updated_at':r['updated_at'] if r else None})
        if path=='/api/teacher/status':return self._json({'configured':bool(setting_get('teacher_pin_hash'))})
        if path=='/api/teacher/dashboard':
            if not teacher_ok(self.headers):return self._json({'detail':'No autorizado'},401)
            return self._json(dashboard())
        if path=='/api/teacher/export.csv':
            if not teacher_ok(self.headers):return self._json({'detail':'No autorizado'},401)
            q=parse_qs(urlparse(self.path).query);kind=(q.get('kind')or['interactions'])[0]
            return self._csv_export(kind)
        return super().do_GET()
    # PRISMA: Enruta las operaciones HTTP: login, sesiones, misiones, evaluaciones y acciones docentes.
    def do_POST(self):
        path=urlparse(self.path).path; p=self._body()
        if path=='/api/generate_mission':return self._json(generate_mission(p))
        if path=='/api/evaluate_stem':return self._json(evaluate(p))
        if path=='/api/generate_mission_stream':
            self._stream_headers('application/x-ndjson; charset=utf-8')
            if not AI_READY:
                self._ndjson_event('result',data={'mission':fallback_mission(p),'source':'banco-local'}); return
            raw=''
            try:
                for token in ai_stream(mission_prompt(p),1100,.45):
                    raw+=token
                obj=parse_mission_output(raw,p); save_mission(p,obj)
                self._ndjson_event('result',data={'mission':obj,'source':'gemma-local'})
            except (BrokenPipeError,ConnectionResetError): return
            except Exception as e:
                self._ndjson_event('result',data={'mission':fallback_mission(p),'source':'banco-local','warning':clean_ai_plain(str(e))})
            return
        if path=='/api/evaluate_stem_stream':
            self._stream_headers('application/x-ndjson; charset=utf-8')
            raw=''; result=None
            if AI_READY:
                try:
                    for token in ai_stream(evaluation_prompt(p),1050,.15):
                        raw+=token; self._ndjson_event('token',text=token)
                    result=parse_evaluation_output(raw)
                except (BrokenPipeError,ConnectionResetError): return
                except Exception: result=None
            if not result: result=local_rubric(str(p.get('answer') or ''))
            result=save_evaluation(p,result); self._ndjson_event('result',data=result); return
        if path=='/api/generate_stream':
            prompt=str(p.get('prompt') or '')
            clean_prompt=f'''Responde en espanol claro y directo. No uses Markdown, asteriscos dobles, encabezados con #, bloques de codigo ni tablas. Si enumeras, usa 1., 2., 3. Mantén una presentacion limpia.\n\nPregunta del estudiante: {prompt}'''
            self._stream_headers()
            if not AI_READY:
                self._write_stream('Gemma no esta activo. Abre PRISMA con INICIAR_PRISMA.bat y espera a que indique IA lista.'); return
            try:
                for token in ai_stream(clean_prompt,800,.35): self._write_stream(token)
            except (BrokenPipeError,ConnectionResetError): return
            except Exception as e:self._write_stream(f'No pude consultar Gemma: {clean_ai_plain(e)}')
            return
        if path=='/api/learner_profile':
            ctx=p.get('context') or {}
            safe={k:str(ctx.get(k) or '')[:700] for k in ('profileText','interests','environment','learningGoal') if str(ctx.get(k) or '').strip()}
            with db_conn() as c:c.execute('INSERT INTO learner_profiles(participant_code,grade,context_json,updated_at) VALUES(?,?,?,?) ON CONFLICT(participant_code) DO UPDATE SET grade=excluded.grade,context_json=excluded.context_json,updated_at=excluded.updated_at',(p.get('participant_code',''),p.get('grade',''),json_dumps(safe),now_iso()))
            return self._json({'ok':True})
        if path=='/api/adaptive_state':
            with db_conn() as c:c.execute('INSERT INTO adaptive_states(participant_code,grade,state_json,updated_at) VALUES(?,?,?,?) ON CONFLICT(participant_code) DO UPDATE SET grade=excluded.grade,state_json=excluded.state_json,updated_at=excluded.updated_at',(p.get('participant_code',''),p.get('grade',''),json_dumps(p.get('state') or {}),now_iso()))
            backup_db('progress');return self._json({'ok':True})
        if path=='/api/interaction':
            with db_conn() as c:c.execute('INSERT INTO interactions(participant_code,grade,event_type,item_id,payload_json,created_at) VALUES(?,?,?,?,?,?)',(p.get('participant_code',''),p.get('grade',''),p.get('event_type',''),p.get('item_id',''),json_dumps(p.get('payload') or {}),now_iso()))
            return self._json({'ok':True})
        if path=='/api/teacher/setup':
            pin=str(p.get('pin') or '')
            if setting_get('teacher_pin_hash'):return self._json({'detail':'Ya configurado'},409)
            if not re.fullmatch(r'\d{6,12}',pin):return self._json({'detail':'PIN invalido'},400)
            setting_set('teacher_pin_hash',hashlib.sha256(('PRISMA:'+pin).encode()).hexdigest());return self._json({'ok':True})
        if path=='/api/teacher/login':
            pin=str(p.get('pin') or '');h=hashlib.sha256(('PRISMA:'+pin).encode()).hexdigest()
            if h!=setting_get('teacher_pin_hash'):return self._json({'detail':'PIN incorrecto'},401)
            tok=secrets.token_urlsafe(24);TEACHER_TOKENS.add(tok);return self._json({'token':tok})
        if path=='/api/teacher/logout':
            TEACHER_TOKENS.discard(self.headers.get('X-PRISMA-Teacher-Token',''));return self._json({'ok':True})
        if path=='/api/teacher/review':
            if not teacher_ok(self.headers):return self._json({'detail':'No autorizado'},401)
            with db_conn() as c:c.execute('INSERT INTO teacher_reviews(attempt_id,status,rubric_json,note,created_at) VALUES(?,?,?,?,?)',(p.get('attempt_id'),p.get('status','approved'),json_dumps(p.get('rubric')) if p.get('rubric') else '',p.get('note',''),now_iso()))
            return self._json({'ok':True})
        if path=='/api/teacher/benchmark':
            if not teacher_ok(self.headers):return self._json({'detail':'No autorizado'},401)
            t=time.perf_counter();loops=max(10,min(500,int(p.get('loops') or 100)));x=0
            for i in range(loops*500):x=(x*33+i)%1000003
            result={'loops':loops,'local_cpu_ms':round((time.perf_counter()-t)*1000,2),'ai_ready':AI_READY,'provider':AI_MODE}
            with db_conn() as c:c.execute('INSERT INTO benchmarks(result_json,created_at) VALUES(?,?)',(json_dumps(result),now_iso()))
            return self._json({'result':result})
        if path=='/api/upload_pdf':
            if not teacher_ok(self.headers):return self._json({'detail':'No autorizado'},401)
            try:
                name=re.sub(r'[^A-Za-z0-9._-]+','_',str(p.get('filename') or 'documento.pdf'))[:120]; raw=base64.b64decode(p.get('data_base64') or '',validate=True)
                if len(raw)>20*1024*1024:return self._json({'detail':'PDF supera 20 MB'},400)
                dest=LIBRARY/name;dest.write_bytes(raw)
                with db_conn() as c:c.execute('INSERT OR REPLACE INTO documents(filename,path,created_at) VALUES(?,?,?)',(name,str(dest),now_iso()))
                load_documents();return self._json({'filename':name,'chunks':len(DOC_CHUNKS)})
            except Exception as e:return self._json({'detail':f'No se pudo indexar: {e}'},400)
        if path=='/api/clear_docs':
            if not teacher_ok(self.headers):return self._json({'detail':'No autorizado'},401)
            for f in LIBRARY.glob('*.pdf'):
                try:f.unlink()
                except:pass
            load_documents();return self._json({'ok':True})
        if path=='/api/ask_document_stream':
            q=str(p.get('query') or ''); sources=doc_search(q,int(p.get('k') or 4))
            self._stream_headers('application/x-ndjson; charset=utf-8')
            if not sources:
                msg='No encontre fragmentos relevantes en la biblioteca local.'; self._ndjson_event('token',text=msg); self._ndjson_event('result',data={'answer':msg,'sources':[]}); return
            context='\n\n'.join(f"[{x['filename']} p.{x['page']}] {x['text']}" for x in sources)
            raw=''
            if AI_READY:
                prompt=f'''Responde solo con la informacion del contexto local. Si no alcanza, dilo claramente. No uses Markdown, asteriscos dobles, #, bloques de codigo ni tablas. Escribe limpio y breve.\nPregunta: {q}\nCONTEXTO:\n{context}'''
                try:
                    for token in ai_stream(prompt,650,.15): raw+=token; self._ndjson_event('token',text=token)
                    ans=clean_ai_plain(raw)
                except (BrokenPipeError,ConnectionResetError): return
                except Exception: ans='No pude consultar Gemma; revisa los fragmentos recuperados.'
            else: ans='Gemma no esta activo. Estos son los fragmentos locales mas relacionados con tu pregunta.'; self._ndjson_event('token',text=ans)
            self._ndjson_event('result',data={'answer':ans,'sources':sources}); return
        if path=='/api/ask_document':
            q=str(p.get('query') or '');sources=doc_search(q,int(p.get('k') or 4))
            if not sources:return self._json({'answer':'No encontre fragmentos relevantes en la biblioteca local.','sources':[]})
            context='\n\n'.join(f"[{s['filename']} p.{s['page']}] {s['text']}" for s in sources)
            if AI_READY:
                try:ans=clean_ai_plain(ai_text(f'Responde SOLO con la informacion del contexto local. Sin Markdown ni asteriscos. Pregunta: {q}\nCONTEXTO:\n{context}',650,.15))
                except:ans='No pude consultar Gemma; revisa los fragmentos recuperados.'
            else:ans='Gemma no esta activo. Estos son los fragmentos locales mas relacionados con tu pregunta.'
            return self._json({'answer':ans,'sources':sources})
        return self._json({'detail':'Ruta no encontrada'},404)
    # PRISMA: Entrega al navegador un CSV generado por el servidor.
    def _csv_export(self,kind):
        out=io.StringIO(newline='');w=csv.writer(out)
        with db_conn() as c:
            if kind=='participants':
                rows=c.execute('SELECT participant_code,grade,state_json,updated_at FROM adaptive_states').fetchall();w.writerow(['participant_code','grade','problem','solution','context','check','mission_count','adaptive_passed','adaptive_xp','special_rewards','question_count','updated_at'])
                for r in rows:
                    st=json.loads(r['state_json'] or '{}');m=st.get('mastery',{});w.writerow([r['participant_code'],r['grade'],m.get('problem'),m.get('solution'),m.get('context'),m.get('check'),st.get('missionCount'),st.get('adaptivePassed'),st.get('adaptiveXp'),';'.join(st.get('specialRewards') or []),st.get('questionCount'),r['updated_at']])
            elif kind=='attempts':
                rows=c.execute('SELECT * FROM attempts').fetchall();w.writerow(['id','participant_code','grade','answer','evaluation_source','created_at']);[w.writerow([r['id'],r['participant_code'],r['grade'],r['answer'],r['evaluation_source'],r['created_at']]) for r in rows]
            else:
                rows=c.execute('SELECT * FROM interactions').fetchall();w.writerow(['id','participant_code','grade','event_type','item_id','payload_json','created_at']);[w.writerow([r['id'],r['participant_code'],r['grade'],r['event_type'],r['item_id'],r['payload_json'],r['created_at']]) for r in rows]
        b=out.getvalue().encode('utf-8-sig');self.send_response(200);self.send_header('Content-Type','text/csv; charset=utf-8');self.send_header('Content-Disposition',f'attachment; filename="prisma_{kind}.csv"');self.send_header('Content-Length',str(len(b)));self.end_headers();self.wfile.write(b)

# PRISMA: Punto de entrada: configura modo local/LAN, inicia SQLite, biblioteca, IA y servidor HTTP.
def main():
    init_db();load_documents()
    print('PRISMA STEM SIMPLE OFFLINE')
    mp=model_path()
    print(f'Modelo: {mp.name if mp else "NO ENCONTRADO"}')
    print('Iniciando motor local...')
    start_ai()
    print('IA: LISTA' if AI_READY else f'IA: respaldo local ({AI_ERROR})')
    server=ThreadingHTTPServer(('127.0.0.1',PORT),Handler)
    url=f'http://127.0.0.1:{PORT}/?v=232'
    threading.Timer(1.0,lambda:webbrowser.open(url)).start()
    print(f'PRISMA: {url}')
    print('Deja esta ventana abierta. Ctrl+C para cerrar.')
    try:server.serve_forever()
    except KeyboardInterrupt:pass
    finally:
        server.server_close()
        if LLAMA_PROC and LLAMA_PROC.poll() is None:
            try:LLAMA_PROC.terminate()
            except:pass
if __name__=='__main__':main()
