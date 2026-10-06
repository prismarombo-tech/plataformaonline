// PRISMA: Motor adaptativo central. Integra dominio STEM, deuda pedagógica,
// trayectoria reciente, avances, retrocesos, estancamientos y recomendaciones de práctica.
// PRISMA: La lógica es explicable: cada recomendación puede rastrearse hasta
// resultados de preguntas, rúbricas de misiones y necesidades persistentes.

(() => {
  'use strict';

  // PRISMA: Se conserva la misma clave para no perder el progreso creado en versiones anteriores.
  const STORAGE_KEY = 'prismaAdaptiveModelV2';
  let policy={version:'3.2-pilot',minTasks:3,minSessions:2,minIndependent:2,minTransfer:1,minLevel:3};
  const policyReady=typeof fetch==='function'?fetch('/api/adaptive_policy').then(r=>r.ok?r.json():null).then(p=>{if(p)policy=p;}).catch(()=>{}):Promise.resolve();
  const DIMENSIONS = ['problem', 'solution', 'context', 'check'];
  const DIMENSION_LABELS = {
    problem: 'Comprensión del problema',
    solution: 'Diseño de la solución',
    context: 'Justificación y contextualización',
    check: 'Verificación y mejora'
  };
  const DEBT_LABELS = {
    clarity: 'claridad', sequence: 'secuenciación lógica', decomposition: 'descomposición',
    efficiency: 'eficiencia', validation: 'validación', context: 'contextualización',
    verification: 'verificación', autonomy: 'autonomía', edgeCases: 'casos límite'
  };

  // PRISMA: Relaciona cada dimensión de la rúbrica con módulos donde puede practicarse.
  // Datos e IA participa en comprensión, contexto y verificación dentro de la ruta STEM.
  const MODULE_MAP = {
    problem: ['everyday', 'science', 'dataai', 'computational', 'math', 'measurement'],
    solution: ['everyday', 'robotics', 'structures', 'arduino', 'codingbasics', 'electronics', 'computational'],
    context: ['environment', 'dataai', 'energy', 'everyday', 'simplemachines', 'structures'],
    check: ['everyday', 'measurement', 'dataai', 'science', 'ohm', 'electronics', 'codingbasics']
  };
  const DEBT_MODULE_MAP = {
    clarity: ['science', 'dataai', 'math'], sequence: ['computational', 'codingbasics'],
    decomposition: ['computational', 'codingbasics'], efficiency: ['energy', 'simplemachines', 'math'],
    validation: ['measurement', 'dataai', 'science', 'ohm'], context: ['environment', 'dataai', 'energy', 'everyday'],
    verification: ['measurement', 'dataai', 'science', 'ohm'], autonomy: ['robotics', 'arduino', 'structures'],
    edgeCases: ['codingbasics', 'arduino', 'robotics', 'dataai']
  };
  const MODULE_DIMENSIONS = {
    dataai: ['problem','check'], math: ['problem','check'], ohm: ['problem','solution','check'], arduino: ['solution','check'],
    electronics: ['solution','check'], computational: ['problem','solution'], codingbasics: ['solution','check'],
    simplemachines: ['problem','solution','context'], everyday: ['problem','solution','context','check'], energy: ['problem','solution','context'],
    structures: ['solution','context','check'], measurement: ['problem','check'], robotics: ['solution','context','check'],
    environment: ['problem','context','solution'], science: ['problem','context','check']
  };
  // PRISMA: Lista cerrada de modulos activos. Sirve para que evidencias historicas de un
  // modulo retirado no vuelvan a aparecer como recomendacion en una ruta nueva.
  const ACTIVE_MODULES = new Set(Object.keys(MODULE_DIMENSIONS));
  const DEBT_DIMENSIONS = {
    clarity:['problem'], sequence:['solution'], decomposition:['problem','solution'], efficiency:['solution','context'],
    validation:['check'], context:['context'], verification:['check'], autonomy:['context','solution'], edgeCases:['solution','check']
  };

  function clamp(n, min, max) { return Math.max(min, Math.min(max, Number(n) || 0)); }
  function now() { return Date.now(); }
  function average(values) { const a=values.filter(Number.isFinite); return a.length ? a.reduce((s,x)=>s+x,0)/a.length : null; }
  function readAll() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; } }
  function writeAll(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
  function idSafe(value) { return String(value || 'default').trim().toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-|-$/g, '') || 'default'; }

  // PRISMA: Modelo mínimo persistente. La trayectoria se calcula desde las evidencias,
  // por lo que una actualización de software puede mejorar el análisis sin borrar datos anteriores.
  function baseModel(participantId) {
    return {
      participantId: idSafe(participantId),
      algorithmVersion: "3.0-evidence", mastery: { problem: 0, solution: 0, context: 0, check: 0 },
      debt: { clarity: 0, sequence: 0, decomposition: 0, efficiency: 0, validation: 0, context: 0, verification: 0, autonomy: 0, edgeCases: 0 },
      evidence: [], missionCount: 0, questionCount: 0, adaptivePassed: 0, adaptiveXp: 0,
      passedMissionIds: [], specialRewards: [], updatedAt: now()
    };
  }
  function normalizeModel(raw, participantId) {
    const base = baseModel(participantId);
    const model = { ...base, ...(raw || {}) };
    model.mastery = { ...base.mastery, ...(raw?.mastery || {}) };
    model.debt = { ...base.debt, ...(raw?.debt || {}) };
    for (const key of DIMENSIONS) model.mastery[key] = clamp(model.mastery[key], 0, 100);
    for (const key of Object.keys(base.debt)) model.debt[key] = clamp(model.debt[key], 0, 20);
    // PRISMA: 240 evidencias permiten detectar tendencias sin crecer indefinidamente.
    model.evidence = Array.isArray(model.evidence) ? model.evidence.slice(-240) : [];
    model.passedMissionIds = Array.isArray(model.passedMissionIds) ? model.passedMissionIds.slice(-100) : [];
    model.specialRewards = Array.isArray(model.specialRewards) ? model.specialRewards : [];
    model.adaptivePassed = Math.max(0, Number(model.adaptivePassed) || 0);
    model.adaptiveXp = Math.max(0, Number(model.adaptiveXp) || 0);
    if (raw && raw.algorithmVersion !== '3.0-evidence') {
      model.legacySnapshot = raw.legacySnapshot || {mastery:raw.mastery,evidence:raw.evidence,updatedAt:raw.updatedAt};
      model.algorithmVersion = '3.0-evidence';
    }
    model.taskEvidence = raw?.taskEvidence || {};
    recompute(model);
    return model;
  }
  // Practice is useful, but only an explicit rubric supports these four complex criteria.
  // One latest assessment per task prevents repeated revisions from multiplying evidence.
  function recompute(model) {
    model.competence={};model.policy={...policy};model.adaptiveRuleVersion='3.2';
    for(const dim of DIMENSIONS){
      const all=Object.entries(model.taskEvidence||{}).filter(([,e])=>!e.provisional&&Number.isInteger(e.rubric?.[dim])&&e.rubric[dim]>=1&&e.rubric[dim]<=4);
      // A recurring bank case is one source of evidence, even if its mission ID changes.
      const families=new Map();for(const [id,e] of all.sort((a,b)=>(a[1].at||0)-(b[1].at||0)))families.set(e.evidenceKey||id,e);
      const rows=[...families.values()].slice(-12),level=rows.length?average(rows.map(e=>e.rubric[dim])):null;
      const successful=rows.filter(e=>e.rubric[dim]>=policy.minLevel);
      const independent=successful.filter(e=>e.assistanceKnown===true&&!e.assisted&&!e.revision&&['equilibrado','autonomo'].includes(e.supportLevel));
      const sessions=new Set(successful.map(e=>e.sessionId).filter(Boolean)).size;
      const transfer=independent.filter(e=>e.purpose==='transfer'&&e.parentMissionId).length;
      const coverage=Math.min(1,successful.length/policy.minTasks,sessions/policy.minSessions,independent.length/policy.minIndependent,transfer/policy.minTransfer);
      const consistent=rows.length>=2&&rows.slice(-2).every(e=>e.rubric[dim]>=policy.minLevel);
      const consolidated=level>=policy.minLevel&&coverage>=1&&consistent;
      model.mastery[dim]=level===null?0:(level-1)*100/3;
      model.competence[dim]={level,tasks:rows.length,sessions,independent:independent.length,transfer,human:rows.filter(e=>e.source==='docente').length,coverage:Math.round(coverage*100),consolidated,status:!rows.length?'Sin evidencia':consolidated?'Consolidación provisional':rows.length<policy.minTasks?'Evidencia inicial':'En consolidación',lastAt:Math.max(0,...rows.map(e=>e.at||0))};
    }
  }
  function display(model,dim){const c=model.competence?.[dim];return c?.tasks?`${c.level.toFixed(1)}/4 · ${c.tasks} retos · ${c.status}`:'Sin evidencia de rúbrica';}
  function coverage(model,dim){return model.competence?.[dim]?.coverage||0;}
  function get(participantId) {
    const key = idSafe(participantId), all = readAll();
    const model = normalizeModel(all[key], key);
    all[key] = model; writeAll(all); return model;
  }
  function save(participantId, model) {
    const key = idSafe(participantId), all = readAll();
    all[key] = normalizeModel({ ...model, participantId: key, updatedAt: now() }, key);
    writeAll(all);
    window.dispatchEvent(new CustomEvent('prisma-adaptive-updated', { detail: { participantId: key, model: all[key] } }));
    return all[key];
  }

  function skillText(q) { return `${q?.skill || ''} ${q?.prompt || ''}`.toLowerCase(); }
  function inferDimensions(moduleKey, q) {
    if(Array.isArray(q?.competency?.dimensions)&&q.competency.dimensions.length)return q.competency.dimensions.filter(d=>DIMENSIONS.includes(d));
    const dims = new Set(MODULE_DIMENSIONS[moduleKey] || ['problem']);
    const t = skillText(q);
    if (/comprend|identific|observ|concept|reconoc|interpret|pregunta/.test(t)) dims.add('problem');
    if (/aplic|diseñ|program|algorit|orden|relacion|resolver|constru|prototip/.test(t)) dims.add('solution');
    if (/context|ejemplo|ambient|situaci|uso|aplicaci|comunidad|equidad|etica|ética/.test(t)) dims.add('context');
    if (/verific|valid|medir|cálcul|calcul|dato|comprobar|trigonom|resultado|evidencia|fuente|sesgo/.test(t)) dims.add('check');
    if (q?.type === 'order') { dims.add('solution'); dims.add('check'); }
    if (q?.type === 'match') { dims.add('problem'); dims.add('context'); }
    return [...dims].slice(0, 3);
  }
  function debtsFor(moduleKey, q, ok) {
    if (ok) return [];
    const t = skillText(q), out = new Set();
    if (/orden|algorit|secuen|proceso/.test(t)) out.add('sequence');
    if (/descomp|parte|paso|variable/.test(t)) out.add('decomposition');
    if (/medir|verific|valid|dato|resultado|evidencia|fuente|calidad/.test(t)) { out.add('verification'); out.add('validation'); }
    if (/context|ejemplo|ambient|situaci|equidad|etica|ética/.test(t)) out.add('context');
    if (/eficien|optim|energ/.test(t)) out.add('efficiency');
    if (/program|arduino|robot|caso|ia|modelo|sesgo/.test(t)) out.add('edgeCases');
    if (!out.size) out.add('clarity');
    return [...out];
  }

  // PRISMA: Cada microactividad actualiza el dominio y conserva la evidencia necesaria
  // para distinguir un error aislado de un retroceso persistente.
  function applyQuestionResult(participantId, moduleKey, q, ok, meta = {}) {
    const model = get(participantId), dims = inferDimensions(moduleKey, q);
    // Closed practice never certifies a complex STEM rubric level.
    if(meta.eventId && model.evidence.some(e=>e.eventId===meta.eventId))return model;
    const debts = debtsFor(moduleKey, q, ok);
    if (ok) {
      // PRISMA: Un acierto reduce sobre todo las deudas relacionadas con la habilidad practicada.
      for (const [debt, debtDims] of Object.entries(DEBT_DIMENSIONS)) {
        const related = debtDims.some(d => dims.includes(d));
        model.debt[debt] = clamp(model.debt[debt] - (related ? 0.16 : 0.025), 0, 20);
      }
    } else {
      for (const debt of debts) model.debt[debt] = clamp(model.debt[debt] + 1.1, 0, 20);
    }
    model.questionCount = (Number(model.questionCount) || 0) + 1;
    model.evidence.push({ type: 'question', moduleKey, questionId: q?.id || '', ok: !!ok, dimensions: dims, debts, unitIndex: meta.unitIndex ?? null, repeat:!!meta.repeat, assisted:!!meta.assisted, firstExposure:!!meta.firstExposure, eventId:meta.eventId||'', sessionId:meta.sessionId||'', algorithmVersion:'3.0-evidence', at: now() });
    return save(participantId, model);
  }

  // PRISMA: La rúbrica de una misión tiene mayor peso porque evalúa una respuesta abierta
  // que integra comprensión, diseño, contexto y verificación.
  function applyMissionRubric(participantId, rubric, meta = {}) {
    const model = get(participantId);
    const map = { problem: rubric.problem, solution: rubric.solution, context: rubric.context, check: rubric.check };
    const taskId=String(meta.scenarioId||'');
    const provisional=!!meta.provisional || !meta.evaluationSource || /reglas|respaldo|fallback/.test(meta.evaluationSource);
    if(taskId){const previous=model.taskEvidence[taskId];model.taskEvidence[taskId]={...previous,rubric:map,firstRubric:previous?.firstRubric||map,provisional,source:meta.evaluationSource,applicationModule:meta.applicationModule||'',answer:meta.answer||'',at:now(),sessionId:meta.sessionId||'',assisted:!!meta.assisted,assistanceKnown:meta.assistanceKnown===true,revision:!!meta.isRevision,supportLevel:meta.supportLevel||'unknown',evidenceKey:meta.evidenceKey||previous?.evidenceKey||taskId,purpose:meta.purpose||'practice',parentMissionId:meta.parentMissionId||'',complexity:meta.complexity||'unclassified'};}
    recompute(model);
    const weakest = Object.entries(map).sort((a,b) => Number(a[1]) - Number(b[1]))[0]?.[0] || 'problem';
    const debtByDim = { problem:['clarity','decomposition'], solution:['sequence','efficiency'], context:['context','autonomy'], check:['verification','validation'] };
    for (const key of Object.keys(model.debt)) model.debt[key] = clamp(model.debt[key] - 0.12, 0, 20);
    for (const dim of DIMENSIONS) if (Number(map[dim]) < 3) {
      for (const debt of debtByDim[dim]) model.debt[debt] = clamp(model.debt[debt] + (Number(map[dim]) === 1 ? 2.1 : 1.05), 0, 20);
    }
    if (!meta.isRevision) model.missionCount = (Number(model.missionCount) || 0) + 1;
    const missionId = String(meta.scenarioId || '');
    const averageLevel = DIMENSIONS.reduce((sum,dim)=>sum + clamp(map[dim],1,4),0) / DIMENSIONS.length;
    // PRISMA v2.4.9.1: un reto adaptativo se considera APROBADO cuando TODAS
    // las habilidades de la rubrica obtienen una puntuacion igual o mayor a 3/4.
    // El promedio general no reemplaza este criterio: cada dimension debe estar, como
    // minimo, en nivel 3 (Logrado). Un 2/4 en cualquier habilidad mantiene la ruta de mejora.
    const approvalByDimension = Object.fromEntries(DIMENSIONS.map(dim => [dim, Number(map[dim]) >= 3]));
    const approved = !provisional && DIMENSIONS.every(dim => approvalByDimension[dim] === true);
    const minimumLevel = Math.min(...DIMENSIONS.map(dim => Number(map[dim]) || 0));
    let passedNow = false, rewardNow = null;
    if (approved && missionId && !model.passedMissionIds.includes(missionId)) {
      model.passedMissionIds.push(missionId); model.adaptivePassed += 1; model.adaptiveXp += 120; passedNow = true;
      const milestones = {1:['primera-mision','Primera misión brillante'],3:['pensador-stem','Pensador STEM'],5:['evolucion-brote','Evolución: Brote adaptativo'],10:['investigador-prisma','Investigador PRISMA'],20:['maestro-retos','Maestro de retos']};
      const hit = milestones[model.adaptivePassed];
      if (hit && !model.specialRewards.includes(hit[0])) { model.specialRewards.push(hit[0]); rewardNow = {id:hit[0], title:hit[1]}; }
    }
    model.lastMissionOutcome = { missionId, average: Math.round(averageLevel*100)/100, minimumLevel, approved, approvalByDimension, passedNow, rewardNow, at: now() };
    model.evidence.push({ type: meta.isRevision ? 'mission_revision' : 'mission', scenarioId: missionId, rubric: map, average: averageLevel, minimumLevel, approved, approvalByDimension, passedNow, rewardNow, weakest, provisional, algorithmVersion:'3.0-evidence', evaluationSource: meta.evaluationSource || '', generatedBy: meta.generatedBy || '', revision: !!meta.isRevision, at: now() });
    return save(participantId, model);
  }

  // PRISMA: Convierte una evidencia histórica a una puntuación comparable de 0 a 100
  // para calcular si una dimensión viene mejorando, estable o retrocediendo.
  function evidenceScoreForDimension(e, dim) {
    if (!e || e.provisional || e.algorithmVersion!=='3.0-evidence') return null;
    if ((e.type === 'mission' || e.type === 'mission_revision') && e.rubric && e.rubric[dim] != null) {
      return ({1:25,2:45,3:70,4:90})[clamp(e.rubric[dim],1,4)] || null;
    }

    return null;
  }
  function dimensionTrend(modelOrId, dim) {
    const model = typeof modelOrId === 'string' ? get(modelOrId) : normalizeModel(modelOrId, modelOrId?.participantId || 'default');
    const unique=new Map();for(const [id,e] of Object.entries(model.taskEvidence||{}).sort((a,b)=>(a[1].at||0)-(b[1].at||0)))if(!e.provisional&&e.firstRubric&&!e.assisted)unique.set(e.evidenceKey||id,e);
    const scores=[...unique.values()].map(e=>({1:25,2:45,3:70,4:90})[e.firstRubric[dim]]).filter(Number.isFinite).slice(-16);
    if (scores.length < 4) return { delta:0, label:'sin tendencia suficiente', recent:average(scores), previous:null, samples:scores.length };
    const recentCount = Math.min(5, Math.max(2, Math.floor(scores.length/2)));
    const recent = scores.slice(-recentCount), previous = scores.slice(-recentCount*2,-recentCount);
    const r = average(recent), p = average(previous);
    const delta = p == null ? 0 : Math.round((r-p)*10)/10;
    const label = delta <= -7 ? 'retroceso' : delta >= 7 ? 'avance' : 'estable';
    return { delta, label, recent:r, previous:p, samples:scores.length };
  }

  // PRISMA: Resume precisión y tendencia de cada módulo a partir de respuestas reales.
  function moduleSignals(modelOrId) {
    const model = typeof modelOrId === 'string' ? get(modelOrId) : normalizeModel(modelOrId, modelOrId?.participantId || 'default');
    const grouped = {};
    for (const e of model.evidence.filter(e => e.type === 'question' && !e.repeat && !e.assisted && ACTIVE_MODULES.has(e.moduleKey)).slice(-180)) {
      (grouped[e.moduleKey] ||= []).push(e);
    }
    const out = {};
    for (const [moduleKey, rows] of Object.entries(grouped)) {
      const recentRows = rows.slice(-20), recent6 = rows.slice(-6), previous6 = rows.slice(-12,-6);
      const acc = arr => arr.length ? Math.round(arr.filter(x=>x.ok).length*100/arr.length) : null;
      const recentAccuracy = acc(recent6), previousAccuracy = acc(previous6);
      const delta = recentAccuracy == null || previousAccuracy == null ? 0 : recentAccuracy-previousAccuracy;
      const units = {};
      for (const e of recentRows) if (Number.isInteger(Number(e.unitIndex))) {
        const k=Number(e.unitIndex); (units[k] ||= {ok:0,total:0,lastAt:0}); units[k].total++; if(e.ok)units[k].ok++; units[k].lastAt=Math.max(units[k].lastAt,Number(e.at)||0);
      }
      let weakUnit = 0, weakScore = Infinity;
      for (const [idx,s] of Object.entries(units)) {
        const unitAcc=s.total ? ((s.ok+1.5)/(s.total+3))*100 : 50; // suavizado: un solo error no domina toda la ruta.
        if(unitAcc<weakScore){weakScore=unitAcc;weakUnit=Number(idx)}
      }
      // PRISMA v2.5.1: diferencia avance, retroceso y estancamiento. El estancamiento
      // solo se declara con historial suficiente y rendimiento todavia mejorable; asi no se
      // etiqueta como problema a quien ya domina el modulo y simplemente mantiene su nivel.
      let trend = delta <= -20 ? 'retroceso' : delta >= 20 ? 'avance' : 'estable';
      const stagnant = rows.length >= 12 && recentAccuracy != null && recentAccuracy < 80 && Math.abs(delta) <= 9;
      if (stagnant) trend = 'estancamiento';
      out[moduleKey] = {
        accuracy: acc(recentRows), recentAccuracy, previousAccuracy, delta, trend, stagnant,
        weakUnit, samples: recentRows.length, lastAt: Number(recentRows[recentRows.length-1]?.at)||0
      };
    }
    return out;
  }

  // PRISMA: Construye una lectura longitudinal de las cuatro dimensiones.
  function trajectory(modelOrId) {
    const model = typeof modelOrId === 'string' ? get(modelOrId) : normalizeModel(modelOrId, modelOrId?.participantId || 'default');
    const dimensions = Object.fromEntries(DIMENSIONS.map(dim => [dim, { score:Math.round(model.mastery[dim]), ...dimensionTrend(model,dim) }]));
    const regressing = DIMENSIONS.filter(d => dimensions[d].label === 'retroceso');
    const improving = DIMENSIONS.filter(d => dimensions[d].label === 'avance');
    const modules = moduleSignals(model);
    const stagnatingModules = Object.entries(modules).filter(([,v]) => v.trend === 'estancamiento').map(([k]) => k);
    const status = regressing.length ? 'retroceso_detectado' : stagnatingModules.length ? 'estancamiento_detectado' : improving.length ? 'avance_detectado' : 'estable';
    return { status, dimensions, regressing, improving, stagnatingModules, modules };
  }

  // PRISMA: El foco ya no depende solo del puntaje más bajo. Un retroceso reciente
  // puede elevar la prioridad de una dimensión que antes iba bien.
  function focus(modelOrId) {
    const model = typeof modelOrId === 'string' ? get(modelOrId) : normalizeModel(modelOrId, modelOrId?.participantId || 'default');
    const tr = trajectory(model);
    const priority = {};
    for (const dim of DIMENSIONS) {
      const masteryNeed = 100 - clamp(model.mastery[dim],0,100);
      const trend = tr.dimensions[dim];
      const regressionBonus = Math.max(0,-trend.delta) * 0.8;
      const debtBonus = Object.entries(model.debt).reduce((sum,[debt,value]) => sum + ((DEBT_DIMENSIONS[debt]||[]).includes(dim) ? Number(value||0)*1.8 : 0),0);
      priority[dim] = masteryNeed + regressionBonus + debtBonus;
    }
    const dimension = Object.entries(priority).sort((a,b)=>b[1]-a[1])[0]?.[0] || 'problem';
    const debt = Object.entries(model.debt).filter(([k])=>(DEBT_DIMENSIONS[k]||[]).includes(dimension)).sort((a,b)=>b[1]-a[1])[0] || Object.entries(model.debt).sort((a,b)=>b[1]-a[1])[0];
    const trend = tr.dimensions[dimension];
    return {
      dimension, dimensionLabel: DIMENSION_LABELS[dimension],
      debt: debt?.[1] > 0.4 ? debt[0] : null, debtLabel: debt?.[1] > 0.4 ? DEBT_LABELS[debt[0]] : null,
      score: Math.round(model.mastery[dimension]), priority:Math.round(priority[dimension]*10)/10,
      trend:trend.label, trendDelta:trend.delta, mode:!DIMENSIONS.some(d=>model.competence?.[d]?.tasks)?'diagnostic':DIMENSIONS.every(d=>(model.competence?.[d]?.level||0)>=policy.minLevel)?'extension':'reinforcement', complexity:DIMENSIONS.every(d=>model.competence?.[d]?.consolidated)?'avanzado':DIMENSIONS.every(d=>(model.competence?.[d]?.level||0)>=policy.minLevel)?'intermedio':'basico'
    };
  }

  // PRISMA: Recomienda módulos y una unidad de micropráctica. Se combinan:
  // foco actual, deuda pedagógica, precisión reciente, retrocesos y repetición reciente.
  function recommendPath(modelOrId, limit = 3) {
    const model = typeof modelOrId === 'string' ? get(modelOrId) : normalizeModel(modelOrId, modelOrId?.participantId || 'default');
    const f = focus(model), signals = moduleSignals(model), candidates = new Set(MODULE_MAP[f.dimension] || []);
    if (f.debt) for (const key of (DEBT_MODULE_MAP[f.debt] || [])) candidates.add(key);
    // PRISMA: Un retroceso claro en cualquier modulo practicado recientemente entra como candidato
    // aunque no pertenezca al foco principal. Esto evita que una caida real quede oculta por un
    // promedio historico alto en las cuatro dimensiones.
    for (const [key,sig] of Object.entries(signals)) {
      if (!ACTIVE_MODULES.has(key)) continue;
      if (sig.trend === 'retroceso' || sig.trend === 'estancamiento') candidates.add(key);
    }
    const nowMs=now(), rows=[];
    for (const key of candidates) {
      const sig=signals[key]||{};
      let score=(MODULE_MAP[f.dimension]||[]).includes(key)?50:30;
      if(f.debt&&(DEBT_MODULE_MAP[f.debt]||[]).includes(key))score+=25;
      if(Number.isFinite(sig.accuracy))score+=(100-sig.accuracy)*0.28;
      if(sig.trend==='retroceso')score+=18 + Math.min(18,Math.max(0,-Number(sig.delta||0))*0.28);
      if(sig.trend==='estancamiento')score+=40;
      if(sig.trend==='avance')score-=5;
      // PRISMA: Si acaba de practicar ese módulo, se baja un poco su prioridad para favorecer variedad,
      // salvo que exista un retroceso claro.
      const hoursSince=sig.lastAt?((nowMs-sig.lastAt)/3600000):999;
      if(hoursSince<1&&!['retroceso','estancamiento'].includes(sig.trend))score-=10;
      const unitIndex=Number.isInteger(sig.weakUnit)?Math.max(0,Math.min(9,sig.weakUnit)):0;
      let why=f.mode==='extension'?`Aplica ${f.dimensionLabel.toLowerCase()} en una situación nueva para ampliar evidencias`:f.mode==='diagnostic'?`Explora ${f.dimensionLabel.toLowerCase()}; todavía faltan evidencias`:`Refuerza ${f.dimensionLabel.toLowerCase()}`;
      if(sig.trend==='retroceso')why+=` y presenta retroceso reciente en este módulo`;
      else if(sig.trend==='estancamiento')why+=`; el desempeño se ha mantenido sin mejora suficiente`;
      else if(Number.isFinite(sig.accuracy)&&sig.accuracy<65)why+=`; la precisión reciente es ${sig.accuracy}%`;
      else if(f.debt)why+=` y trabaja ${f.debtLabel}`;
      // PRISMA v2.5.1: cada paso tiene una meta concreta. No se usa como nota definitiva;
      // sirve para que el estudiante sepa cuándo conviene volver a revisar su trayectoria.
      let goal=key==='everyday'?'Resuelve un caso de cuatro decisiones y como máximo un repaso; después regresa al mismo reto.':'Practica 5 preguntas iniciales y hasta 3 refuerzos; después regresa al mismo reto y explica qué mejorarás.';
      rows.push({moduleKey:key,unitIndex,priority:Math.round(score*10)/10,reason:why+'.',goal,trend:sig.trend||'sin historial',recentAccuracy:Number.isFinite(sig.recentAccuracy)?sig.recentAccuracy:null});
    }
    return rows.sort((a,b)=>b.priority-a.priority||a.moduleKey.localeCompare(b.moduleKey)).slice(0,limit);
  }
  function recommendModules(modelOrId, limit = 3) { return recommendPath(modelOrId,limit).map(x=>x.moduleKey); }

  function reason(modelOrId) {
    const model = typeof modelOrId === 'string' ? get(modelOrId) : normalizeModel(modelOrId, modelOrId?.participantId || 'default');
    const f = focus(model), tr=trajectory(model), t=tr.dimensions[f.dimension];
    const info=model.competence?.[f.dimension];
    if(f.mode==='extension')return 'Tu nivel observado permite profundizar. Aplica lo aprendido en un problema nuevo; la consolidación requiere evidencias variadas y autonomía.';
    if(!info?.tasks)return `Explora ${f.dimensionLabel.toLowerCase()} con un reto inicial. Aún no hay evidencia de rúbrica; las prácticas orientan los apoyos sin certificar dominio.`;
    return `${f.dimensionLabel}: ${display(model,f.dimension)}. ${f.debt?`Conviene practicar ${f.debtLabel}.`:''} Es una estimación formativa; revisa tareas nuevas, apoyos y valoración docente antes de concluir dominio.`;
  }

  function summary(participantId) {
    const model = get(participantId), f = focus(model), tr=trajectory(model), route=recommendPath(model);
    const orderedStrengths = Object.entries(model.mastery).sort((a,b)=>Number(b[1])-Number(a[1]));
    const strongest = Object.values(model.competence||{}).some(c=>c.tasks>0) && orderedStrengths[0] ? {dimension:orderedStrengths[0][0],label:DIMENSION_LABELS[orderedStrengths[0][0]],score:Math.round(orderedStrengths[0][1])} : null;
    const checkpoint = route.length ? 'Completa primero la Prioridad 1. Si puedes, realiza también la Prioridad 2 y luego vuelve a Revisar mi avance para recalcular la ruta.' : 'Continúa practicando y vuelve a revisar tu avance cuando existan nuevos resultados.';
    return { model, focus:f, trajectory:tr, route, recommendations:route.map(x=>x.moduleKey), reason:reason(model), strongest, checkpoint };
  }

  window.PRISMA_ADAPTIVE = {
    STORAGE_KEY, DIMENSIONS, DIMENSION_LABELS, DEBT_LABELS,
    display, coverage, policyReady, getPolicy:()=>({...policy}), get, save, focus, reason, summary, trajectory, dimensionTrend, moduleSignals,
    recommendModules, recommendPath, inferDimensions, debtsFor,
    applyQuestionResult, applyMissionRubric
  };
})();
