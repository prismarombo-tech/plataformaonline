"""Pilot rules, independent task complexity and mechanical mission checks."""
import re,json,hashlib
DEFAULT={'version':'3.2-pilot','minTasks':3,'minSessions':2,'minIndependent':2,'minTransfer':1,'minLevel':3}
MATRIX={
 'basico':'Compara dos opciones con los datos disponibles. Elige una, justifica con un dato y comprueba una condición.',
 'intermedio':'Compara dos opciones y sus restricciones. Cambia por escrito un dato del caso, indicando tu nuevo valor, y comprueba si cambia tu decisión.',
 'avanzado':'Compara dos soluciones con criterios que puedan entrar en conflicto. Analiza por escrito dos cambios de datos, indica tus valores supuestos y argumenta límites y mejoras de la decisión.'}
SUPPORT={
 'guiado':['Identifica la pregunta, los datos y una restricción.','Escribe dos opciones y explica cómo usarás los datos.','Elige una opción y apóyala con un dato.','Comprueba la condición principal y corrige si hace falta.'],
 'equilibrado':['Explica tu estrategia y compara alternativas.','Justifica y comprueba tu decisión con los datos.'],
 'autonomo':['Organiza tu respuesta y comprueba sus límites sin una secuencia de pasos prescrita.']}
def policy(app):
 try:return validate(json.loads(app.setting_get('adaptive_policy_v320') or '{}'),allow_default=True)
 except (ValueError,TypeError):return dict(DEFAULT)
def validate(data,allow_default=False):
 if not isinstance(data,dict):raise ValueError('Los criterios deben ser un objeto.')
 out=dict(DEFAULT)
 for k,lo,hi in [('minTasks',2,12),('minSessions',2,12),('minIndependent',1,12),('minTransfer',1,6),('minLevel',3,4)]:
  v=data.get(k,DEFAULT[k] if allow_default else None)
  if type(v) is not int or not lo<=v<=hi:raise ValueError(f'{k}: requiere un entero entre {lo} y {hi}.')
  out[k]=v
 if max(out['minSessions'],out['minIndependent'],out['minTransfer'])>out['minTasks']:raise ValueError('Los mínimos parciales no pueden superar el mínimo de retos.')
 out['version']='3.2-'+hashlib.sha256(json.dumps(out,sort_keys=True).encode()).hexdigest()[:10]
 return out
def decorate(m,p,generated=False):
 level=p.get('complexity','basico');level=level if level in MATRIX else 'basico'
 text=' '.join(str(m.get(k,'')) for k in ('context','task'))
 if generated:
  if any(not str(m.get(k,'')).strip() for k in ('title','context','task')):raise ValueError('Misión incompleta.')
  if len(re.findall(r'\d+(?:[.,]\d+)?',text))<2:raise ValueError('Faltan datos cuantitativos para resolver el caso.')
  if len(set(m.get('module_tags',[])) & {'math','measurement','energy','environment','science','dataai','computational','codingbasics','simplemachines','everyday','structures','ohm','electronics','arduino','robotics'})<2:raise ValueError('Falta conexión entre dos áreas STEM.')
 parent=str(p.get('parent_mission_id') or '')[:150]
 support=p.get('support_level','guiado');support=support if support in SUPPORT else 'guiado'
 m['task']=str(m.get('task',''))+'\n'+MATRIX[level]
 m.update(complexity=level,support_level=support,steps=list(SUPPORT[support]),purpose='transfer' if parent else 'diagnostic' if (p.get('focus')or{}).get('mode')=='diagnostic' else 'practice',parent_mission_id=parent,policy_version=p.get('policy_version','3.2-pilot'),quality_check='structural-pass; semantic-expert-review-pending')
 m['evidence_key']=(m.get('id') if not generated else None) or hashlib.sha256((str(m.get('title',''))+'|'+str(m.get('context',''))).casefold().encode()).hexdigest()[:24]
 m['raw_text']='\n'.join([f"TITULO: {m.get('title','')}",f"CONTEXTO: {m.get('context','')}",f"RETO: {m['task']}"]+[f'PASO {i+1}: {x}' for i,x in enumerate(m['steps'])]+[f"EVIDENCIA: {m.get('evidence_goal','')}",f"CRITERIO DE EXITO: {m.get('success_criterion','')}"])
 return m
