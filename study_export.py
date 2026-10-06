"""Export tidy UTF-8 CSV from an authenticated PRISMA study JSON download.
Usage: python study_export.py PRISMA_estudio_3.0.json output_directory
No automatic aggregation of IM-1 or causal-effect claims.
"""
import csv,json,sys
from pathlib import Path
def export(source,destination):
    d=json.loads(Path(source).read_text(encoding='utf-8-sig'));out=Path(destination);out.mkdir(parents=True,exist_ok=True)
    people={p['code']:json.loads(p['metadata']) for p in d['study_people']}
    records={r['id']:r for r in d['study_records']};answers=[];ratings=[];validation=[]
    for r in records.values():
        p=json.loads(r['payload']);m=people.get(r['subject'],{});included=r.get('included_in_research',False)
        base={'record_id':r['id'],'instrument':r['instrument'],'version':r['version'],'subject':r['subject'],'occasion':r['occasion'],'institution':m.get('institution'),'course':m.get('course'),'condition':m.get('condition'),'cohort':m.get('cohort'),'phase':m.get('phase'),'included_in_research':included}
        if r['kind']=='application':
            for k,v in p['answers'].items():answers.append({**base,'form':p.get('form'),'item':k,'response':v,'missing':v is None,'duration_ms':p.get('duration_ms'),'medium':p.get('medium')})
        if r['kind']=='content':
            for item,attrs in p['ratings'].items():
                for attribute,value in attrs.items():
                    if attribute!='note':validation.append({**base,'item':item,'attribute':attribute,'value':value,'note':attrs.get('note')})
    for r in d['study_scores']:
        response=records.get(r['response_id']);
        if not response:continue
        m=people.get(response['subject'],{});p=json.loads(response['payload'])
        for item,value in json.loads(r['scores']).items():ratings.append({'response_id':r['response_id'],'subject':response['subject'],'rater':r['rater'],'occasion':response['occasion'],'form':p.get('form'),'course':m.get('course'),'institution':m.get('institution'),'condition':m.get('condition'),'phase':m.get('phase'),'included_in_research':response.get('included_in_research',False),'item':item,'dimension':(int(item)-1)//3+1,'score':value,'unscored':value is None,'note':r['note']})
    for filename,rows in [('responses_long.csv',answers),('im3_ratings_long.csv',ratings),('content_validation_long.csv',validation)]:
        with (out/filename).open('w',encoding='utf-8-sig',newline='') as f:
            if rows:w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
    (out/'README.txt').write_text('Conservar originales. Filtrar included_in_research=True y phase=intervention para análisis definitivo. Pilotaje separado. No tratar pendientes como cero. Elegir evaluador/adjudicación según protocolo, no promediar evaluadores automáticamente. Estimar efecto ajustado por pretest y conglomerados con el analista; no sustituirlo por comparación simple de promedios.\n',encoding='utf8')
if __name__=='__main__':export(sys.argv[1],sys.argv[2])

