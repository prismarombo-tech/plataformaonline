"""Versioned study workflows. No scores or validation results are fabricated.

Application records, content judgements and pedagogical practice stay separate.
The document catalogue lives outside WEB so unassigned tests are not public assets.
"""
import csv, hashlib, io, json, statistics, uuid
from pathlib import Path
from datetime import datetime, timezone

CATALOG=json.loads((Path(__file__).parent/'study_catalog.json').read_text(encoding='utf8'))
TABLES=('study_people','study_records','study_assignments','study_scores','study_releases','study_cohorts')
def stamp(): return datetime.now(timezone.utc).isoformat()
def dumps(v): return json.dumps(v,ensure_ascii=False,sort_keys=True,separators=(',',':'))
def init(app):
    with app.db_conn() as c:
        c.executescript('''
        CREATE TABLE IF NOT EXISTS study_people(code TEXT PRIMARY KEY,metadata TEXT NOT NULL,updated_at TEXT);
        CREATE TABLE IF NOT EXISTS study_records(id TEXT PRIMARY KEY,kind TEXT,instrument TEXT,version TEXT,subject TEXT,occasion TEXT,payload TEXT,created_at TEXT);
        CREATE INDEX IF NOT EXISTS idx_study_records ON study_records(kind,instrument,subject);
        CREATE TABLE IF NOT EXISTS study_assignments(id TEXT PRIMARY KEY,subject TEXT,instrument TEXT,version TEXT,occasion TEXT,form TEXT,cohort TEXT,status TEXT,created_at TEXT,UNIQUE(subject,instrument,occasion,cohort));
        CREATE TABLE IF NOT EXISTS study_scores(id TEXT PRIMARY KEY,response_id TEXT,rater TEXT,scores TEXT,note TEXT,created_at TEXT,UNIQUE(response_id,rater));
        CREATE TABLE IF NOT EXISTS study_releases(instrument TEXT,version TEXT,status TEXT,evidence TEXT,created_at TEXT,PRIMARY KEY(instrument,version));
        CREATE TABLE IF NOT EXISTS study_cohorts(id TEXT PRIMARY KEY,phase TEXT,manifest TEXT,metadata TEXT,created_at TEXT);
        CREATE TABLE IF NOT EXISTS study_drafts(subject TEXT,kind TEXT,payload TEXT,updated_at TEXT,PRIMARY KEY(subject,kind));
        ''')
def code(v):
    import re
    value=str(v or '').strip()
    if not re.fullmatch(r'[A-Za-z0-9_-]{1,48}',value):raise ValueError('Usa un código de 1 a 48 letras, números, guion o guion bajo.')
    return value
def person(c,subject):
    row=c.execute('SELECT metadata FROM study_people WHERE code=?',(subject,)).fetchone()
    return json.loads(row[0]) if row else {}
def eligible(meta):
    return meta.get('consent')=='granted' and (meta.get('role')!='student' or meta.get('assent')=='granted') and not meta.get('withdrawn')
def record(c,kind,instrument,subject,occasion,payload,version=None):
    rid=uuid.uuid4().hex
    c.execute('INSERT INTO study_records VALUES(?,?,?,?,?,?,?,?)',(rid,kind,instrument,version or CATALOG.get(instrument,{}).get('version','3.0'),subject,occasion,dumps(payload),stamp()))
    return rid
def manifest(app):
    files={}
    for base in [app.ROOT/'web',app.ROOT]:
        paths=base.rglob('*') if base.name=='web' else base.glob('*')
        for p in paths:
            if p.is_file() and p.suffix.lower() in {'.js','.json','.py','.html','.css'}:
                files[str(p.relative_to(app.ROOT))]=hashlib.sha256(p.read_bytes()).hexdigest()
    return {'app_version':app.APP_VERSION,'files':files,'model':app.model_fingerprint(),'algorithm':'3.2-evidence','adaptive_policy':__import__('prisma_adaptive_policy').policy(app),'catalog':hashlib.sha256(dumps(CATALOG).encode()).hexdigest()}
def frozen(c):return c.execute("SELECT 1 FROM study_cohorts WHERE phase='intervention' LIMIT 1").fetchone() is not None
def is_frozen(app):
    with app.db_conn() as c:return frozen(c)
def competence(state):
    out={}
    for dim in ('problem','solution','context','check'):
        rows=[e for e in state.get('taskEvidence',{}).values() if not e.get('provisional') and type(e.get('rubric',{}).get(dim)) is int and 1<=e['rubric'][dim]<=4]
        out[dim]={'level':statistics.mean(e['rubric'][dim] for e in rows) if rows else None,'tasks':len(rows),'human':sum(e.get('source')=='docente' for e in rows)}
    return out
def enrollment(c,p):
    subject=code(p.get('code'));m=p.get('metadata')
    if not isinstance(m,dict):raise ValueError('Faltan datos de caracterización.')
    allowed={'role','institution','course','teacher','cohort','condition','phase','grade','consent','assent','withdrawn','retention_until','consent_reference','area','experience_years','age_band','digital_skills','device','connectivity'}
    m={k:v for k,v in m.items() if k in allowed}
    if m.get('role') not in {'student','teacher','expert','observer'}:raise ValueError('Rol inválido.')
    if m.get('condition') not in {'experimental','comparison','pilot','none'}:raise ValueError('Condición inválida.')
    if m.get('phase') not in {'pilot','intervention','none'}:raise ValueError('Fase inválida.')
    for k in ('consent','assent'):
        if m.get(k) not in {'pending','granted','declined'}:raise ValueError('Indica el estado de consentimiento y asentimiento.')
    if m.get('consent')=='granted' and not str(m.get('consent_reference','')).strip():raise ValueError('Indica la referencia de la autorización bajo custodia institucional.')
    old=person(c,subject)
    if old.get('phase')=='pilot' and m.get('phase')=='intervention':raise ValueError('Participó en pilotaje: usa participantes distintos para la muestra definitiva.')
    if old and old.get('cohort') and frozen(c) and any(old.get(k)!=m.get(k) for k in ('cohort','course','condition','institution','phase')):raise ValueError('La asignación del estudio está congelada. Conserva el registro y documenta la desviación.')
    c.execute('INSERT INTO study_people VALUES(?,?,?) ON CONFLICT(code) DO UPDATE SET metadata=excluded.metadata,updated_at=excluded.updated_at',(subject,dumps(m),stamp()))
    record(c,'enrollment','',subject,'',{'before':old,'after':m})
    return {'ok':True}
def validate_answers(doc,answers,form=''):
    if not isinstance(answers,dict):raise ValueError('Las respuestas deben ser un objeto.')
    items=doc['forms'][form]['items'] if doc['id']=='IM-3' else doc['items']
    out={}
    for item in items:
        v=answers.get(item['id'])
        if v is None or v=='':out[item['id']]=None;continue
        if item['type']=='text':
            if not isinstance(v,str) or len(v)>10000:raise ValueError('Respuesta demasiado larga o inválida.')
        elif isinstance(v,bool) or v not in item['values']:raise ValueError('Respuesta fuera de escala en ítem '+item['id'])
        out[item['id']]=v
    return out
def assign(c,p):
    subject=code(p.get('subject'));iid=p.get('instrument');occasion=p.get('occasion');form=p.get('form','')
    if iid not in CATALOG or not iid.startswith('IM-'):raise ValueError('Selecciona IM-1 a IM-4.')
    m=person(c,subject)
    if not eligible(m):raise ValueError('Se requiere autorización documentada; el aprendizaje continúa disponible sin investigación.')
    if not m.get('cohort'):raise ValueError('Falta cohorte.')
    if iid=='IM-4' and m.get('role')!='teacher':raise ValueError('IM-4 corresponde a docentes.')
    if iid!='IM-4' and m.get('role')!='student':raise ValueError('Este instrumento corresponde a estudiantes.')
    valid={'IM-1':['baseline'],'IM-2':['post'],'IM-3':['pre','post'],'IM-4':['pre','post']}
    if occasion not in valid[iid]:raise ValueError('Momento no permitido para el instrumento.')
    if iid=='IM-2' and m.get('condition')!='experimental' and m.get('phase')!='pilot':raise ValueError('IM-2 se aplica al grupo experimental al finalizar.')
    if iid=='IM-3':
        if form not in ('A','B'):raise ValueError('Indica forma A o B según el esquema balanceado del curso.')
        other=c.execute("SELECT form FROM study_assignments WHERE subject=? AND instrument='IM-3' AND occasion<>? AND cohort=?",(subject,occasion,m['cohort'])).fetchone()
        if other and other[0]==form:raise ValueError('La otra ocasión debe usar la otra forma.')
        same=c.execute("SELECT a.form FROM study_assignments a JOIN study_people p ON p.code=a.subject WHERE a.instrument='IM-3' AND a.occasion=? AND a.cohort=? AND json_extract(p.metadata,'$.course')=? LIMIT 1",(occasion,m['cohort'],m.get('course'))).fetchone()
        if same and same[0]!=form:raise ValueError('El curso debe seguir la misma secuencia A/B previamente definida.')
    else:form=''
    version=CATALOG[iid]['version']
    if c.execute('SELECT 1 FROM study_assignments WHERE subject=? AND instrument=? AND occasion=? AND cohort=?',(subject,iid,occasion,m['cohort'])).fetchone():raise ValueError('La aplicación ya está asignada para esa persona, cohorte y momento.')
    if m.get('phase')=='intervention':
        release=c.execute('SELECT status FROM study_releases WHERE instrument=? AND version=?',(iid,version)).fetchone()
        cohort=c.execute("SELECT phase FROM study_cohorts WHERE id=?",(m['cohort'],)).fetchone()
        if not release or release[0]!='validated' or not cohort or cohort[0]!='intervention':raise ValueError('Registra la validación y congela la cohorte antes de aplicar la medición definitiva.')
    aid=uuid.uuid4().hex
    c.execute('INSERT INTO study_assignments VALUES(?,?,?,?,?,?,?,?,?)',(aid,subject,iid,version,occasion,form,m['cohort'],'assigned',stamp()))
    return {'ok':True,'id':aid}
def application_draft(c,p,subject):
    a=c.execute("SELECT * FROM study_assignments WHERE id=? AND subject=? AND status='assigned'",(p.get('assignment_id'),subject)).fetchone()
    if not a or not eligible(person(c,subject)):raise ValueError('Aplicación no disponible.')
    kind='instrument:'+a['id']
    if p.get('load'):
        row=c.execute('SELECT payload FROM study_drafts WHERE subject=? AND kind=?',(subject,kind)).fetchone()
        return {'draft':json.loads(row[0]) if row else None}
    payload=p.get('draft')
    if not isinstance(payload,dict) or len(dumps(payload))>150000:raise ValueError('Borrador inválido.')
    c.execute('INSERT INTO study_drafts VALUES(?,?,?,?) ON CONFLICT(subject,kind) DO UPDATE SET payload=excluded.payload,updated_at=excluded.updated_at',(subject,kind,dumps(payload),stamp()))
    return {'ok':True}

def application(c,p,subject):
    a=c.execute('SELECT * FROM study_assignments WHERE id=? AND subject=?',(p.get('assignment_id'),subject)).fetchone()
    if not a:raise ValueError('Asignación no encontrada.')
    if a['status']=='completed':raise ValueError('La aplicación ya fue enviada y se conserva sin sobrescribir.')
    if not eligible(person(c,subject)):raise ValueError('La participación está retirada o no autorizada.')
    answers=validate_answers(CATALOG[a['instrument']],p.get('answers'),a['form'])
    rid=record(c,'application',a['instrument'],subject,a['occasion'],{'assignment_id':a['id'],'form':a['form'],'answers':answers,'metadata':person(c,subject),'duration_ms':max(0,min(86400000,int(p.get('duration_ms',0)))),'medium':p.get('medium','digital'),'notes':str(p.get('notes',''))[:3000],'definition':CATALOG[a['instrument']]},a['version'])
    c.execute("UPDATE study_assignments SET status='completed' WHERE id=?",(a['id'],))
    c.execute('DELETE FROM study_drafts WHERE subject=? AND kind=?',(subject,'instrument:'+a['id']))
    return {'ok':True,'id':rid}
def content_judgement(c,p):
    iid=p.get('instrument');evaluator=code(p.get('evaluator'));ratings=p.get('ratings',{})
    if iid not in CATALOG:raise ValueError('Instrumento inválido.')
    clean={}
    for unit in CATALOG[iid]['validation_units']:
        row=ratings.get(unit['id'],{});attrs=['clarity','relevance','representativeness']+(['equivalence'] if unit.get('equivalence') else [])
        vals={}
        for attr in attrs:
            value=row.get(attr)
            if isinstance(value,bool) or value not in [1,2,3,4,5,'N/A']:raise ValueError('Valora cada atributo con 1–5 o N/A.')
            if (value=='N/A' or value in [1,2,3]) and not str(row.get('note','')).strip():raise ValueError('Justifica N/A y valoraciones 1–3.')
            vals[attr]=value
        clean[unit['id']]={**vals,'note':str(row.get('note',''))[:3000]}
    if not str(p.get('expert_profile','')).strip():raise ValueError('Registra el perfil y áreas de competencia del juez.')
    return {'ok':True,'id':record(c,'content',iid,evaluator,str(p.get('round','1')),{'ratings':clean,'expert_profile':p['expert_profile']})}
def observation(c,p):
    iid=p.get('instrument')
    if iid not in ('VP-1','VP-2'):raise ValueError('Selecciona VP-1 o VP-2.')
    evaluator=code(p.get('evaluator'));answers=validate_answers(CATALOG[iid],p.get('answers'))
    notes=p.get('notes',{})
    if not isinstance(notes,dict):raise ValueError('Las notas deben identificarse por ítem.')
    for k,v in answers.items():
        if iid=='VP-1' and (v in [1,2,3,'N/A']) and not str(notes.get(k,'')).strip():raise ValueError('Justifica N/A y puntuaciones 1–3.')
    return {'ok':True,'id':record(c,'prototype' if iid=='VP-1' else 'pilot',iid,evaluator,str(p.get('occasion','')),{'answers':answers,'notes':notes,'context':p.get('context',{}),'technical':p.get('technical',{}),'incidents':p.get('incidents',[]),'recommendation':p.get('recommendation','')})}
def score(c,p):
    rid=p.get('response_id');row=c.execute("SELECT * FROM study_records WHERE id=? AND kind='application' AND instrument='IM-3'",(rid,)).fetchone()
    if not row:raise ValueError('Respuesta IM-3 no encontrada.')
    rater=code(p.get('rater'));values=p.get('scores',{})
    if set(values)!=set(map(str,range(1,13))) or any(isinstance(v,bool) or v not in [0,1,2,3,None] for v in values.values()):raise ValueError('Registra 12 puntuaciones 0–3 o null para pendiente. Ausencia de calificación no es cero.')
    c.execute('INSERT INTO study_scores VALUES(?,?,?,?,?,?)',(uuid.uuid4().hex,rid,rater,dumps(values),str(p.get('note',''))[:4000],stamp()))
    return {'ok':True}
def quantile(vals,q):
    if not vals:return None
    a=sorted(vals);pos=(len(a)-1)*q;lo=int(pos);hi=min(lo+1,len(a)-1)
    return a[lo]+(a[hi]-a[lo])*(pos-lo)
def descriptives(values,maximum=5):
    nums=[v for v in values if isinstance(v,(int,float)) and not isinstance(v,bool)]
    n=len(nums);out={'n':n,'missing':sum(v is None for v in values),'not_applicable':sum(v in ('N/A','N/O') for v in values),'counts':{str(v):values.count(v) for v in set(values)}}
    if n:out.update(mean=statistics.mean(nums),median=statistics.median(nums),iqr=quantile(nums,.75)-quantile(nums,.25),favorable_pct=100*sum(v>=4 for v in nums)/n if maximum==5 else None)
    return out
def summary(c):
    out={'content':{},'prototype':{},'pilot':{},'applications':{},'agreement':[]}
    # One latest judgement per evaluator and instrument/round, not duplicate votes.
    rows=c.execute('SELECT * FROM study_records ORDER BY created_at').fetchall();latest={}
    for r in rows:
        if r['kind'] in ('content','prototype','pilot'):latest[(r['kind'],r['instrument'],r['version'],r['subject'],r['occasion'])]=r
    groups={}
    for r in latest.values():groups.setdefault((r['kind'],r['instrument'],r['version'],r['occasion']),[]).append(json.loads(r['payload']))
    for (kind,iid,version,occasion),data in groups.items():
        target={};doc=CATALOG[iid]
        if kind=='content':
            for u in doc['validation_units']:
                target[u['id']]={}
                for attr in ['clarity','relevance','representativeness']+(['equivalence'] if u.get('equivalence') else []):
                    values=[d['ratings'].get(u['id'],{}).get(attr) for d in data];st=descriptives(values);nums=[v for v in values if isinstance(v,int)]
                    v=sum(x-1 for x in nums)/(len(nums)*4) if nums else None
                    st.update(aiken_v=v,decision='sin datos' if v is None else 'mantener' if v>=.8 else 'revisar' if v>=.7 else 'reformular');target[u['id']][attr]=st
        else:
            for i in doc['items']:
                values=[d['answers'].get(i['id']) for d in data];st=descriptives(values,2 if kind=='pilot' else 5)
                if kind=='prototype' and st['n']:
                    st['decision']='modificar' if st['mean']<3 or st['favorable_pct']<60 else 'mantener' if st['mean']>=4 and st['favorable_pct']>=80 else 'revisar'
                    st['review_disagreement']=st['iqr']>=2
                    st['review_panel']=st['not_applicable']/len(values)>=.3
                if kind=='pilot' and st['n']:st['observed_achievement_pct']=st['mean']/2*100
                target[i['id']]=st
        out[kind][iid+'/'+version+'/'+occasion]=target
    for r in rows:
        if r['kind']=='application':out['applications'][r['id']]={'instrument':r['instrument'],'subject':r['subject'],'occasion':r['occasion'],'form':json.loads(r['payload']).get('form'),'raters':[]}
    grouped={}
    for r in c.execute('SELECT * FROM study_scores'):
        scores=json.loads(r['scores']);nums=list(scores.values());total=sum(nums) if all(v is not None for v in nums) else None
        dims={str(i//3+1):sum(scores[str(j)] for j in range(i+1,i+4)) if all(scores[str(j)] is not None for j in range(i+1,i+4)) else None for i in range(0,12,3)}
        if r['response_id'] in out['applications']:out['applications'][r['response_id']]['raters'].append({'rater':r['rater'],'total':total,'dimensions':dims})
        grouped.setdefault(r['response_id'],[]).append((r['rater'],scores))
    for rid,raters in grouped.items():
        for i,(name,a) in enumerate(raters):
            for other,b in raters[i+1:]:
                pairs=[(a[k],b[k]) for k in a if a[k] is not None and b[k] is not None]
                out['agreement'].append({'response_id':rid,'raters':[name,other],'paired_items':len(pairs),'exact_agreement':sum(x==y for x,y in pairs)/len(pairs) if pairs else None,'discrepant_items':[k for k in a if a[k] is not None and b[k] is not None and a[k]!=b[k]]})
    return out
def teacher(app,path,p=None):
    with app.db_conn() as c:
        if p is None:
            if path.endswith('/catalog'):return CATALOG
            if path.endswith('/summary'):return summary(c)
            if path.endswith('/integrity'):
                current=manifest(app)
                return {'cohorts':[{'id':r['id'],'matches':json.loads(r['manifest'])==current,'phase':r['phase']} for r in c.execute('SELECT * FROM study_cohorts')]}
            if path.endswith('/data'):
                out={t:[dict(r) for r in c.execute('SELECT * FROM '+t)] for t in TABLES}
                for r in out['study_records']:
                    r['included_in_research']=eligible(person(c,r['subject'])) if r['kind']=='application' else None
                return out
        c.execute('BEGIN IMMEDIATE')
        if path.endswith('/application_draft'):return application_draft(c,p,code(p.get('subject')))
        if path.endswith('/enroll'):return enrollment(c,p)
        if path.endswith('/assign'):return assign(c,p)
        if path.endswith('/respond'):return application(c,p,code(p.get('subject')))
        if path.endswith('/content'):return content_judgement(c,p)
        if path.endswith('/observe'):return observation(c,p)
        if path.endswith('/score'):return score(c,p)
        if path.endswith('/release'):
            iid=p.get('instrument');evidence=str(p.get('evidence','')).strip()
            if iid not in CATALOG or len(evidence)<20:raise ValueError('Indica instrumento y referencia verificable de validación, pilotaje, versión y decisión responsable.')
            if frozen(c):raise ValueError('Hay una intervención congelada. Conserva esta versión.')
            c.execute('INSERT OR REPLACE INTO study_releases VALUES(?,?,?,?,?)',(iid,CATALOG[iid]['version'],'validated',evidence,stamp()))
            record(c,'release',iid,'','',{'evidence':evidence});return {'ok':True}
        if path.endswith('/freeze'):
            cohort=code(p.get('cohort'));metadata=p.get('metadata',{})
            if not all(str(metadata.get(k,'')).strip() for k in ['protocol','balanced_forms','contents','sessions','minutes_per_session','ethics_reference','vp1_decision','vp2_decision','retention_until']):raise ValueError('Completa protocolo, balance A/B, contenidos, dosis, ética, decisiones VP-1/VP-2 y conservación.')
            if c.execute("SELECT count(*) FROM study_releases WHERE status='validated'").fetchone()[0]<6:raise ValueError('Registra la validación de los seis instrumentos antes de congelar la intervención.')
            if app.model_path() and not app.MODEL_SHA256:raise ValueError('Espera a que termine el cálculo de la huella del modelo antes de congelar.')
            c.execute('INSERT INTO study_cohorts VALUES(?,?,?,?,?)',(cohort,'intervention',dumps(manifest(app)),dumps(metadata),stamp()));return {'ok':True}
        if path.endswith('/incident'):
            return {'ok':True,'id':record(c,'incident','',str(p.get('subject','')),'',p)}
        if path.endswith('/erase'):
            subject=code(p.get('subject'))
            if p.get('confirm')!='ELIMINAR '+subject:raise ValueError('Confirma escribiendo ELIMINAR seguido del código exacto.')
            if not person(c,subject).get('withdrawn'):raise ValueError('Registra primero el retiro y revisa la política de conservación.')
            c.execute('DELETE FROM study_scores WHERE response_id IN (SELECT id FROM study_records WHERE subject=?)',(subject,))
            c.execute('DELETE FROM study_records WHERE subject=?',(subject,))
            c.execute('DELETE FROM study_assignments WHERE subject=?',(subject,))
            c.execute('DELETE FROM study_drafts WHERE subject=?',(subject,))
            c.execute('DELETE FROM study_people WHERE code=?',(subject,))
            c.execute('DELETE FROM teacher_reviews WHERE attempt_id IN (SELECT id FROM attempts WHERE participant_code=?)',(subject,))
            for table in ('attempts','missions','interactions','adaptive_states','module_states','learner_profiles','participant_accounts','research_sessions','research_events','instrument_responses'):
                if c.execute("SELECT 1 FROM sqlite_master WHERE type='table' AND name=?",(table,)).fetchone():c.execute('DELETE FROM '+table+' WHERE participant_code=?',(subject,))
            for token,rec in list(app.STUDENT_TOKENS.items()):
                if rec.get('participant_code')==subject:app.STUDENT_TOKENS.pop(token,None)
            return {'ok':True,'notice':'Eliminado de la base activa. El responsable debe gestionar las copias de seguridad y las cachés de los equipos según la política de conservación.'}
    raise ValueError('Operación desconocida.')
def student(app,path,subject,p=None):
    with app.db_conn() as c:
        if path.endswith('/assignments'):
            if not eligible(person(c,subject)):return {'assignments':[]}
            out=[]
            for row in c.execute("SELECT * FROM study_assignments WHERE subject=? AND status='assigned'",(subject,)):
                r=dict(row);doc=CATALOG[r['instrument']];r['title']=doc['title']
                r['items']=doc['forms'][r['form']]['items'] if r['instrument']=='IM-3' else doc['items']
                r['context']=doc['forms'][r['form']]['context'] if r['instrument']=='IM-3' else []
                out.append(r)
            return {'assignments':out}
        if path.endswith('/application_draft'):return application_draft(c,p,subject)
        if path.endswith('/respond'):
            c.execute('BEGIN IMMEDIATE');return application(c,p,subject)
        if path.endswith('/draft'):
            kind=str((p or {}).get('kind','adaptive'))
            if kind not in ('adaptive','learning'):raise ValueError('Tipo de borrador inválido.')
            if p is None:
                r=c.execute('SELECT payload FROM study_drafts WHERE subject=? AND kind=?',(subject,kind)).fetchone()
                return {'draft':json.loads(r[0]) if r else None}
            payload=p.get('draft')
            if not isinstance(payload,dict):raise ValueError('Borrador inválido.')
            prior=c.execute('SELECT payload FROM study_drafts WHERE subject=? AND kind=?',(subject,kind)).fetchone()
            if prior and kind=='adaptive':
                old=json.loads(prior[0])
                if old.get('mission',{}).get('mission_id')!=payload.get('mission',{}).get('mission_id'):
                    record(c,'draft_archive','',subject,'',old)
                elif old.get('updatedAt',0)>payload.get('updatedAt',0):return {'ok':True,'stale':True}
            if len(dumps(payload))>150000:raise ValueError('Borrador demasiado grande.')
            c.execute('INSERT INTO study_drafts VALUES(?,?,?,?) ON CONFLICT(subject,kind) DO UPDATE SET payload=excluded.payload,updated_at=excluded.updated_at',(subject,kind,dumps(payload),stamp()));return {'ok':True}
        if path.endswith('/incident'):
            return {'ok':True,'id':record(c,'incident','',subject,'',{'mission_id':str(p.get('mission_id',''))[:120],'note':str(p.get('note',''))[:2000],'category':str(p.get('category',''))[:80]})}
    raise ValueError('Operación desconocida.')
def active_exam(app,subject):
    with app.db_conn() as c:
        return eligible(person(c,subject)) and c.execute("SELECT 1 FROM study_assignments WHERE subject=? AND instrument='IM-3' AND status='assigned' LIMIT 1",(subject,)).fetchone() is not None
