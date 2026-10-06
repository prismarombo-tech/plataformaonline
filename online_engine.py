"""Curated challenges and predetermined feedback. No generative AI calls."""
import json, secrets, uuid
from pathlib import Path
from prisma_adaptive_policy import decorate, policy
from prisma_feedback import digital_feedback

BANK=json.loads((Path(__file__).parent/'online_missions.json').read_text(encoding='utf8'))

class BankExhausted(ValueError):pass

def init(app):
    with app.db_conn() as c:
        c.executescript('''CREATE TABLE IF NOT EXISTS online_draws(participant_code TEXT NOT NULL,bank_id TEXT NOT NULL,mission_id TEXT NOT NULL,created_at TEXT,PRIMARY KEY(participant_code,bank_id));
        CREATE TABLE IF NOT EXISTS online_files(path TEXT PRIMARY KEY,content TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS online_operations(operation_id TEXT PRIMARY KEY,result_json TEXT NOT NULL);''')

def mission(app,p):
    code=app._safe_code(p.get('participant_code'))
    if not code:raise ValueError('Inicia sesión para obtener un reto.')
    with app.db_conn() as c:
        c.execute('BEGIN IMMEDIATE')
        used={r[0] for r in c.execute('SELECT bank_id FROM online_draws WHERE participant_code=?',(code,))}
        remaining=[m for m in BANK if m['id'] not in used]
        if not remaining:raise BankExhausted('Ya recibiste los 40 retos. Revisa tus respuestas y continúa los módulos; no se repetirán retos automáticamente.')
        module=p.get('application_module','')
        matched=[m for m in remaining if module in m.get('module_tags',[])]
        obj=dict(secrets.choice(matched or remaining))
        mid='ONLINE-'+uuid.uuid4().hex
        c.execute('INSERT INTO online_draws VALUES(?,?,?,?)',(code,obj['id'],mid,app.now_iso()))
    focus=(p.get('focus') or {}).get('dimension','problem')
    focus=focus if focus in app.legacy.DIM_LABELS else 'problem'
    prepared=dict(p,complexity=(p.get('focus') or {}).get('complexity','basico'),support_level=app.adaptive_support_level(p),policy_version=policy(app)['version'])
    obj.update(mission_id=mid,generated_by='banco-predisenado',focus_dimension=focus,
      story=f'Reto {len(used)+1} de 40. Elegido al azar entre los que aún no has recibido.',
      adaptation_reason='El caso se sortea sin repetición; las ayudas y la complejidad se ajustan a tu trayectoria.',
      teacher_note='Reto prediseñado. La orientación automática no acredita dominio; conserva la revisión docente.',
      bank_remaining=len(remaining)-1,curriculum_sources=[],application_module=module)
    obj=decorate(obj,prepared);app.save_mission(p,obj)
    return {'mission':obj,'source':'banco-predisenado','remaining':len(remaining)-1}

def evaluate(app,p):
    # No word-count or keyword grade: free writing requires human review.
    dim=(p.get('mission') or {}).get('focus_dimension','problem')
    if dim not in app.legacy.DIM_LABELS:dim='problem'
    result={'rubric':{k:1 for k in app.legacy.DIM_LABELS},'weakest':dim,'model_used':False,'provisional':True,'evaluation_source':'guia-predeterminada','scored':False}
    # The four neutral placeholders never count as validated competence.
    result['rubric'][dim]=0
    result=digital_feedback(result)
    result['rubric']={k:1 for k in app.legacy.DIM_LABELS}
    result['feedback']='Tu respuesta quedó registrada. Revisa los datos, explica tu decisión y comprueba una condición. El docente valorará las cuatro habilidades.'
    result=app.save_evaluation(p,result)
    result['scored']=False
    return result

def answer(prompt):
    t=str(prompt).casefold()
    if any(w in t for w in ('verific','comprob','revis')):return 'Compara tu resultado con una condición del enunciado. Cambia un dato por escrito y explica si tu decisión sigue siendo válida.'
    if any(w in t for w in ('justif','porque','por qué','context')):return 'Relaciona tu decisión con un dato del caso. Explica por qué cumple la condición y reconoce una limitación.'
    if any(w in t for w in ('soluci','pasos','diseñ')):return 'Describe dos alternativas, ordena tus pasos y elige una usando los datos. Todo se responde con palabras y números dentro de PRISMA.'
    if any(w in t for w in ('ruta','aprender','módul')):return 'Empieza por tu reto adaptativo, responde con tus razones y abre después el módulo recomendado. Vuelve al reto para mejorar tu explicación.'
    return 'Identifica qué debes resolver, los datos disponibles y una restricción. Propón una opción, explica por qué y compruébala. Esta es una guía predeterminada, no una respuesta generada por IA.'
