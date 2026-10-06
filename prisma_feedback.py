"""Student-facing feedback actions are constrained to the existing digital workflow.
Gemma supplies dimension scores; no automatic score inflation is performed.
"""
import json
from pathlib import Path
PLANS=json.loads((Path(__file__).parent/'web/assets/prisma-digital-feedback.js').read_text(encoding='utf8').split('=',1)[1].split(';\n',1)[0])
def digital_feedback(result):
    r=dict(result);rub=r.get('rubric',{});weak=min(PLANS,key=lambda k:rub.get(k,1));plan=PLANS[weak]
    provisional=r.get('provisional') or not r.get('model_used')
    strengths=[p['label']+': la valoración identifica lo esencial de esta dimensión.' for k,p in PLANS.items() if rub.get(k,1)>=3]
    r.update(weakest=weak,rubric_details={},feedback=('Esta orientación está pendiente de revisión docente. Puedes continuar aclarando tu respuesta dentro de PRISMA.' if provisional else 'La valoración reconoce lo esencial en las cuatro dimensiones. Revisa ahora la claridad de tu justificación y comprobación.' if rub.get(weak,1)>=3 else 'Tu respuesta puede mejorar paso a paso. Empieza por '+plan['label'].lower()+'.'),strengths=['Conserva las ideas que puedas relacionar con el enunciado.'] if provisional else strengths or ['El siguiente paso es hacer explícita una idea relacionada con el enunciado.'],weaknesses=['La orientación provisional no determina tu nivel.'] if provisional else [p['label']+': falta precisar evidencia en la respuesta.' for k,p in PLANS.items() if rub.get(k,1)<3],improvements=[plan['action'],'Relee tu respuesta y comprueba que explicas el porqué; no hace falta alargarla ni usar palabras técnicas.'],learning_goal='Explicar con claridad '+plan['label'].lower()+' usando la información del reto.',learning_route=[plan['action'],'Abre el refuerzo recomendado en PRISMA y revisa sus explicaciones.','Vuelve a esta misma respuesta y explica qué cambió en tu razonamiento.'],micro_challenge=plan['action'],success_criterion=plan['success'],next_mission_focus='En otro reto de PRISMA, aplica este razonamiento a los datos del nuevo enunciado.',teacher_suggestion='Revisa la explicación escrita y reconoce lo esencial; solicita una aclaración concreta si falta evidencia.',feedback_policy='digital-v301')
    return r
