// PRISMA: Hub del estudiante: ingreso, perfil, mascotas, modulos, sincronizacion y acceso a la Ruta Adaptativa.
// PRISMA: Los comentarios documentan el flujo; no cambian datos, rutas API ni comportamiento.

'use strict';

const SESSION_KEY = 'prismaHubSessionV1';
const PROFILE_KEY = 'prismaHubProfilesUnifiedOfflineV1';
const modules = Array.isArray(window.PRISMA_MODULES) ? window.PRISMA_MODULES : [];
const moduleWorldNames={dataai:'Laboratorio de Datos e IA',math:'Galaxia de los Números',ohm:'Laboratorio de Chispas',arduino:'Taller de Inventoras',electronics:'Ciudad de los Circuitos',computational:'Isla de los Acertijos',codingbasics:'Mundo Digital',simplemachines:'Taller Mecánico',everyday:'Laboratorio de decisiones',energy:'Ciudad de la Energía',structures:'Ciudad de Puentes',measurement:'Laboratorio de Medidas',robotics:'Fábrica de Robots',environment:'Bosque de las Guardianas',science:'Laboratorio de Descubrimientos'};
const phases=[{"key": "huevito", "name": "Fase 1 · Prismi Bebé", "min": 0, "next": 15, "image": "assets/prismi/huevito.svg", "description": "Prismi comienza su recorrido y descubre nuevas ideas contigo."}, {"key": "brote", "name": "Fase 2 · Prismi Explorador", "min": 15, "next": 30, "image": "assets/prismi/brote.svg", "description": "Prismi observa, busca pistas y explora los problemas."}, {"key": "aventurero", "name": "Fase 3 · Prismi Constructor", "min": 30, "next": 45, "image": "assets/prismi/aventurero.svg", "description": "Prismi compara alternativas y construye soluciones con los datos."}, {"key": "explorador", "name": "Fase 4 · Prismi Creador digital", "min": 45, "next": 60, "image": "assets/prismi/explorador.svg", "description": "Prismi conecta ideas y desarrolla sus propuestas digitales."}, {"key": "maestro", "name": "Fase 5 · Prismi Científico", "min": 60, "next": 100, "image": "assets/prismi/maestro.svg", "description": "Prismi justifica sus decisiones, investiga y verifica resultados."}, {"key": "innovador", "name": "Fase 6 · Prismi Innovador", "min": 100, "next": null, "image": "assets/prismi/innovador.svg", "description": "Prismi integra lo aprendido y propone mejoras con sentido."}];
const personalities={
  auto:{name:'Automática',emoji:'✨',description:'Cambia según tu progreso, precisión y constancia.',className:'mood-curious',color:'#82e263',particles:['✨','⭐','💫','🌱']},
  alegre:{name:'Alegre',emoji:'☀️',description:'Celebra cada avance.',className:'mood-happy',color:'#ffd65a',particles:['✨','☀️','⭐','💫']},
  timido:{name:'Tímido',emoji:'💗',description:'Avanza con calma y cuida cada paso.',className:'mood-shy',color:'#ff8fc2',particles:['💗','💕','🌸','✨']},
  curioso:{name:'Curioso',emoji:'🔎',description:'Observa, pregunta y busca pistas antes de responder.',className:'mood-curious',color:'#61c8ff',particles:['🔎','❓','💡','✨']},
  valiente:{name:'Valiente',emoji:'🛡️',description:'Convierte los errores en información para mejorar.',className:'mood-brave',color:'#ffad45',particles:['🛡️','🔥','⭐','✨']},
  dormilon:{name:'Dormilón',emoji:'💤',description:'Aprende a un ritmo tranquilo.',className:'mood-sleepy',color:'#b8a2ff',particles:['💤','☁️','🌙','Z']},
  travieso:{name:'Travieso',emoji:'⚡',description:'Disfruta las rachas y los minirretos.',className:'mood-playful',color:'#ffe16b',particles:['⚡','😜','💫','✨']},
  sabio:{name:'Sabio',emoji:'🎓',description:'Relaciona lo aprendido y explica sus decisiones.',className:'mood-wise',color:'#72dfcb',particles:['🎓','📘','🔮','⭐']}
};
const $=id=>document.getElementById(id);
let currentSession=null,currentProfile=null,selectedMascotModuleKey='math',toastTimer=null;

// PRISMA: Escapa texto antes de insertarlo en HTML para evitar que contenido externo se interprete como codigo.
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
// PRISMA: Limita un numero a un rango minimo y maximo.
function clamp(n,min,max){return Math.max(min,Math.min(max,Number(n)||0))}
// PRISMA: Formatea cantidades usando separadores numericos de Colombia.
function fmt(n){return new Intl.NumberFormat('es-CO').format(Math.max(0,Number(n)||0))}
// PRISMA: Calcula el porcentaje de aciertos cuando existen intentos.
function accuracy(correct,attempts){return attempts?Math.round(correct/attempts*100):null}
// PRISMA: Normaliza el codigo seudonimizado escrito por el estudiante.
function normalizeCode(v){return String(v||'').trim().toUpperCase().replace(/[^A-Z0-9_-]+/g,'-').replace(/^-|-$/g,'')}
// PRISMA: Une el contexto e intereses del estudiante en un texto pedagogico compacto.
function learnerContextText(ctx={}){const direct=String(ctx.profileText||'').trim();if(direct)return direct;return [ctx.interests,ctx.environment,ctx.learningGoal].map(v=>String(v||'').trim()).filter(Boolean).join(' · ')}
// PRISMA: Migra solo referencias visuales a modulos retirados. No transfiere puntajes ni
// actividades antiguas al nuevo modulo, porque Datos e IA tiene objetivos curriculares diferentes.
function migrateModuleReferences(profile){if(!profile)return profile;const valid=new Set(modules.map(m=>m.key));if(!valid.has(profile.mascotModule))profile.mascotModule=profile.mascotModule==='english'?'dataai':'math';if(!valid.has(profile.lastModule))profile.lastModule=profile.lastModule==='english'?'dataai':'math';return profile}
// PRISMA: Obtiene la clave local con la que se identifica el progreso del participante.
function playerId(){return normalizeCode(currentSession?.code||'default').toLowerCase()}
// PRISMA: Lee perfiles locales guardados en el navegador.
function readProfiles(){try{return JSON.parse(localStorage.getItem(PROFILE_KEY)||'{}')}catch{return{}}}
// PRISMA: Guarda perfiles locales del navegador.
function writeProfiles(db){localStorage.setItem(PROFILE_KEY,JSON.stringify(db))}
// PRISMA: Implementa SHA-256 en JavaScript para equipos donde Web Crypto no esta disponible.
function sha256Fallback(ascii){function rr(v,a){return(v>>>a)|(v<<(32-a))}const max=8*ascii.length,words=[],hash=[],k=[],isComposite={};let primeCounter=0,candidate=2;while(primeCounter<64){if(!isComposite[candidate]){for(let i=0;i<313;i+=candidate)isComposite[i]=candidate;hash[primeCounter]=(Math.pow(candidate,.5)*4294967296)|0;k[primeCounter++]=(Math.pow(candidate,1/3)*4294967296)|0}candidate++}ascii+='\x80';while(ascii.length%64-56)ascii+='\x00';for(let i=0;i<ascii.length;i++){const j=ascii.charCodeAt(i);words[i>>2]|=j<<((3-i)%4)*8}words[words.length]=((max/4294967296)|0);words[words.length]=max;for(let j=0;j<words.length;){const w=words.slice(j,j+=16),old=hash.slice(0);for(let i=0;i<64;i++){const w15=w[i-15],w2=w[i-2],a=hash[0],e=hash[4];w[i]=(i<16?w[i]:(w[i-16]+(rr(w15,7)^rr(w15,18)^(w15>>>3))+w[i-7]+(rr(w2,17)^rr(w2,19)^(w2>>>10)))|0);const t1=(hash[7]+(rr(e,6)^rr(e,11)^rr(e,25))+((e&hash[5])^((~e)&hash[6]))+k[i]+w[i])|0;const t2=((rr(a,2)^rr(a,13)^rr(a,22))+((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])))|0;hash=[(t1+t2)|0,a,hash[1],hash[2],(hash[3]+t1)|0,e,hash[5],hash[6]]}for(let i=0;i<8;i++)hash[i]=(hash[i]+old[i])|0}return hash.map(h=>(h>>>0).toString(16).padStart(8,'0')).join('')}
// PRISMA: Calcula el hash del PIN antes de enviarlo al servidor.
async function hashPin(code,pin){const raw=`PRISMA-LOCAL:${code}:${pin}`;if(globalThis.crypto?.subtle){const bytes=new TextEncoder().encode(raw);const digest=await crypto.subtle.digest('SHA-256',bytes);return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('')}return sha256Fallback(raw)}
// PRISMA: Selecciona la etapa visual correspondiente al porcentaje de avance.
function phaseFor(percent){return [...phases].reverse().find(p=>percent>=p.min)||phases[0]}
// PRISMA: Muestra un mensaje temporal de estado al usuario.
function showToast(message){clearTimeout(toastTimer);$('toast').textContent=message;$('toast').classList.add('show');toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2600)}
// PRISMA: Alterna entre la pantalla de ingreso y el tablero principal.
function showView(id){$('loginView').classList.toggle('hidden',id!=='loginView');$('dashboardView').classList.toggle('hidden',id!=='dashboardView')}
// PRISMA: Actualiza el indicador visual del servidor/IA local.
function setLocalStatus(text,state='offline'){$('localStatus').className=`local-status ${state}`;$('localStatusText').textContent=text}

// PRISMA: Realiza llamadas JSON al servidor local e incluye el token del estudiante.
async function localApi(path,options={}){try{const res=await fetch(path,{...options,headers:{'Content-Type':'application/json',...(currentSession?.studentToken?{'X-PRISMA-Student-Token':currentSession.studentToken}:{}),...(options.headers||{})}});if(!res.ok)throw new Error(String(res.status));return await res.json()}catch{return null}}
// PRISMA: Comprueba disponibilidad del servidor local, IA y modo de acceso.
async function checkServer(){
  if(location.protocol==='file:'){setLocalStatus('Abre con INICIAR_PRISMA.bat','offline');$('adaptiveLocalStatus').textContent='PRISMA necesita el iniciador para conectar Gemma.';return}
  try{const res=await fetch('/api/health',{cache:'no-store'});if(res.ok){const h=await res.json();if(h?.status==='ok'){const mode=h.access_mode==='lan'?'Aula LAN':'Online';setLocalStatus(h.model_available?`${mode} · Gemma listo`:`${mode} · orientación predeterminada`,h.model_available?'ready':'offline');$('adaptiveLocalStatus').textContent=h.access_mode==='lan'?'PRISMA funciona en la red local del aula sin depender de Internet.':'PRISMA usa retos prediseñados y guarda el progreso en el servidor online.';return}}}catch{}
  setLocalStatus('PRISMA cargando…','offline');$('adaptiveLocalStatus').textContent='Espera unos segundos; el servidor local todavía está iniciando.';
}
// PRISMA: Sincroniza el modelo adaptativo del navegador con SQLite.
let entrySnapshot=null;
async function syncAdaptiveRemote(){await window.PRISMA_ADAPTIVE.policyReady;
  if(!currentSession||location.protocol==='file:'||!window.PRISMA_ADAPTIVE)return null;
  const id=playerId(); const local=window.PRISMA_ADAPTIVE.get(id);
  const remote=entrySnapshot||await localApi(`/api/adaptive_state?participant_code=${encodeURIComponent(currentSession.code)}`);
  if(remote?.state){
    const r=remote.state,l=local;
    const remoteScore=(Number(r.updatedAt)||0)+(Array.isArray(r.evidence)?r.evidence.length:0);
    const localScore=(Number(l.updatedAt)||0)+(Array.isArray(l.evidence)?l.evidence.length:0);
    if(remoteScore>localScore) return window.PRISMA_ADAPTIVE.save(id,r);
  }
  await localApi('/api/adaptive_state',{method:'POST',body:JSON.stringify({participant_code:currentSession.code,grade:currentSession.grade,state:local})});
  return local;
}
// PRISMA: Guarda en el servidor el contexto pedagogico del estudiante.
async function saveLearnerContextRemote(){
  if(!currentSession||!currentProfile||location.protocol==='file:')return;
  await localApi('/api/learner_profile',{method:'POST',body:JSON.stringify({participant_code:currentSession.code,grade:currentSession.grade,context:currentProfile.learnerContext||{}})});
}

// PRISMA: Sincroniza el progreso de cada modulo con el servidor local.
async function syncModuleProfilesRemote(){if(!currentSession||location.protocol==='file:')return;const snapshot=entrySnapshot||await localApi("/api/student/snapshot");if(!snapshot)throw new Error("No se confirmó la sincronización.");await Promise.all(modules.map(async m=>{try{const db=JSON.parse(localStorage.getItem(m.storageKey)||'{}'),id=playerId(),local=db[id]||null;const rs=snapshot.modules?.[m.key]||null;if(rs&&(!local||(Number(rs.updatedAt)||0)>(Number(local.updatedAt)||0))){db[id]=rs;localStorage.setItem(m.storageKey,JSON.stringify(db));return}if(local&&(!rs||(Number(local.updatedAt)||0)>(Number(rs.updatedAt)||0)))await localApi('/api/module_state',{method:'POST',body:JSON.stringify({participant_code:currentSession.code,grade:currentSession.grade,module_key:m.key,state:local})})}catch{}}))}
// PRISMA: Comprueba si el estudiante tiene un instrumento de investigacion pendiente.
async function checkActiveResearchInstrument(){if(!currentSession||!$('researchInstrumentBtn'))return;const x=await localApi(`/api/instruments/active?participant_code=${encodeURIComponent(currentSession.code)}`,{method:'GET'});const pending=(x?.instruments||[]).some(i=>!i.answered);$('researchInstrumentBtn').classList.toggle('hidden',!pending)}

// PRISMA: Lee el progreso local de un modulo concreto.
function moduleProfile(module){try{const db=JSON.parse(localStorage.getItem(module.storageKey)||'{}');return db?.[playerId()]||null}catch{return null}}
// PRISMA: Calcula progreso, aciertos y estado resumido de un modulo.
function statsFor(module){const p=moduleProfile(module)||{};const completed=clamp(Array.isArray(p.completedMissions)?p.completedMissions.length:0,0,module.total);const percent=Math.round((completed+(p.finalPassed?1:0))/(module.total+1)*100);const correct=Number(p.correct)||0,attempts=Number(p.attempts)||0;return{completed,total:module.total,percent,xp:Number(p.xp)||0,correct,attempts,accuracy:accuracy(correct,attempts),bestStreak:Number(p.bestStreak)||0,finalScore:Number(p.finalBest?.score)||0}}
// PRISMA: Elige automaticamente una personalidad de mascota a partir del progreso.
function autoPersonality(a){if(a.percent>=75)return'sabio';if(a.attempts>=12&&a.accuracy!==null&&a.accuracy<60)return'valiente';if(a.completed===0)return'curioso';if(a.bestStreak>=10)return'travieso';if(a.percent<20)return'alegre';if(a.percent<50)return'curioso';return'valiente'}
// PRISMA: Devuelve la personalidad de mascota seleccionada por el estudiante o por el sistema.
function personalityFor(moduleKey,a){const chosen=currentProfile?.modulePersonalities?.[moduleKey]||'auto';return chosen==='auto'?autoPersonality(a):(personalities[chosen]?chosen:'curioso')}
// PRISMA: Genera decoracion visual ligera alrededor de la mascota.
function createParticles(p){const box=$('particles');box.innerHTML='';const pos=[[14,70],[23,29],[38,15],[64,16]];p.particles.slice(0,4).forEach((symbol,i)=>{const el=document.createElement('span');el.className='particle';el.textContent=symbol;el.style.left=`${pos[i][0]}%`;el.style.top=`${pos[i][1]}%`;el.style.animationDelay=`${i*.42}s`;box.appendChild(el)})}
// PRISMA: Dibuja los selectores de mascota asociados a los modulos.
function renderMascotTabs(){$('mascotModuleTabs').innerHTML=modules.map(m=>{const a=statsFor(m),ph=phaseFor(a.percent);return`<button type="button" class="mascot-module-tab ${m.key===selectedMascotModuleKey?'active':''}" data-key="${m.key}" style="--module-color:${m.color}"><span>${m.icon}</span><strong>${esc(m.short)}</strong><small>${ph.name.replace(/^Fase \d+ · /,'')} · ${a.percent}%</small></button>`}).join('');$('mascotModuleTabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{selectedMascotModuleKey=b.dataset.key;currentProfile.mascotModule=selectedMascotModuleKey;saveCurrentProfile();renderDashboard()})}
// PRISMA: Dibuja los controles para cambiar personalidad de la mascota.
function renderPersonalityButtons(){const selected=currentProfile?.modulePersonalities?.[selectedMascotModuleKey]||'auto';$('personalityGrid').innerHTML=Object.entries(personalities).map(([key,p])=>`<button type="button" class="personality-btn ${key===selected?'active':''}" data-p="${key}" style="--person-color:${p.color}"><span>${p.emoji}</span><strong>${esc(p.name)}</strong></button>`).join('');$('personalityGrid').querySelectorAll('button').forEach(b=>b.onclick=()=>{currentProfile.modulePersonalities[selectedMascotModuleKey]=b.dataset.p;saveCurrentProfile();renderDashboard();showToast(`Personalidad: ${personalities[b.dataset.p].name}`)})}
// PRISMA: Actualiza imagen, texto y progreso visual de la mascota.
function renderMascot(){const module=modules.find(m=>m.key===selectedMascotModuleKey)||modules.find(m=>m.key==='math')||modules[0];const a=statsFor(module),phase=phaseFor(a.percent),p=personalities[personalityFor(module.key,a)];document.documentElement.style.setProperty('--person-color',p.color);document.documentElement.style.setProperty('--selected-module-color',module.color);$('mascotImage').src=phase.image;$('mascotImage').className=`mascot-image ${p.className}`;$('phaseTitle').textContent=`${module.icon} ${module.short} · ${phase.name}`;$('phaseDescription').textContent=`Esta mascota crece con tu avance en ${module.short}. ${phase.description}`;$('personalityEmoji').textContent=p.emoji;$('personalityName').textContent=p.name;$('personalityDescription').textContent=p.description;$('selectedModuleName').textContent=module.short;$('overallPercent').textContent=`${a.percent}%`;$('overallBar').style.width=`${a.percent}%`;$('statCompleted').textContent=`${a.completed}/${a.total}`;$('statXp').textContent=fmt(a.xp);$('statAccuracy').textContent=a.accuracy===null?'—':`${a.accuracy}%`;$('statStreak').textContent=fmt(a.bestStreak);$('evolutionHint').textContent=phase.next===null?'La mascota alcanzó su fase máxima.':`Al llegar al ${phase.next}% en ${module.short}, evolucionará.`;createParticles(p);renderMascotTabs();renderPersonalityButtons()}

// PRISMA: Construye las tarjetas de los modulos curriculares del Hub.
function renderModules(){$('moduleGrid').innerHTML=modules.map(module=>{const a=statsFor(module),phase=phaseFor(a.percent),p=personalities[personalityFor(module.key,a)];const complementary='';return`<article class="module-card ${module.key===selectedMascotModuleKey?'selected':''}" style="--module-color:${module.color};--card-person-color:${p.color}"><button class="module-mascot-preview" type="button" data-preview="${module.key}"><span class="module-mascot-aura"></span><img src="${phase.image}" alt="Mascota de ${esc(module.short)}"><span class="module-stage-pill">${p.emoji} ${phase.name.replace(/^Fase \d+ · /,'')}</span></button><div class="module-card-heading"><div class="module-icon">${module.icon}</div><div><h3>${esc(module.title)}</h3><p class="module-stage-copy">${esc(moduleWorldNames[module.key]||'Mundo PRISMA')}</p></div></div><p class="module-subtitle">${esc(module.description)}</p>${complementary}<div class="module-progress"><div class="module-progress-head"><span>${a.completed} de ${module.total} etapas</span><strong>${a.percent}%</strong></div><div class="mini-track" title="Evidencias para consolidación; no porcentaje de dominio"><span style="width:${a.percent}%"></span></div><div class="module-meta"><span>${fmt(a.xp)} XP</span><span>${a.finalScore?`Final ${a.finalScore}%`:'En progreso'}</span></div><button class="module-btn" type="button" data-module="${module.key}">${a.completed?'Continuar':'Comenzar'}</button></div></article>`}).join('');$('moduleGrid').querySelectorAll('[data-module]').forEach(b=>b.onclick=()=>openModule(b.dataset.module));$('moduleGrid').querySelectorAll('[data-preview]').forEach(b=>b.onclick=()=>{selectedMascotModuleKey=b.dataset.preview;renderDashboard()})}

// PRISMA: Determina la etapa de evolucion de la mascota segun misiones superadas.
function adaptiveMascotPhase(count){const n=Math.max(0,Number(count)||0);const phases=[{"image": "assets/prismi/huevito.svg", "name": "Prismi Bebé", "min": 0, "next": 5}, {"image": "assets/prismi/brote.svg", "name": "Prismi Explorador", "min": 5, "next": 10}, {"image": "assets/prismi/aventurero.svg", "name": "Prismi Constructor", "min": 10, "next": 20}, {"image": "assets/prismi/explorador.svg", "name": "Prismi Creador digital", "min": 20, "next": 30}, {"image": "assets/prismi/maestro.svg", "name": "Prismi Científico", "min": 30, "next": 40}, {"image": "assets/prismi/innovador.svg", "name": "Prismi Innovador", "min": 40, "next": null}];return [...phases].reverse().find(p=>n>=p.min)||phases[0]}
// PRISMA: Consume una respuesta NDJSON y muestra el texto mientras Gemma lo genera.
async function streamPlain(path,payload,onText){try{const res=await fetch(path,{method:'POST',headers:{'Content-Type':'application/json',...(currentSession?.studentToken?{'X-PRISMA-Student-Token':currentSession.studentToken}:{})},body:JSON.stringify({...payload,participant_code:currentSession?.code||payload.participant_code,grade:currentSession?.grade||payload.grade,session_id:window.PRISMA_RESEARCH?.sessionId?.()||''})});if(!res.ok)return null;const reader=res.body.getReader(),decoder=new TextDecoder();let text='';for(;;){const {value,done}=await reader.read();text+=decoder.decode(value||new Uint8Array(),{stream:!done});if(onText)onText(text);if(done)break}return text}catch{return null}}
// PRISMA: Abre/cierra la revisión en un panel compacto para no alargar verticalmente el Hub.
function openProgressAdvicePanel(){
  const box=$('progressAdviceBox'),backdrop=$('progressAdviceBackdrop');
  box.classList.remove('hidden');backdrop?.classList.remove('hidden');
  requestAnimationFrame(()=>$('progressAdviceClose')?.focus());
}
function closeProgressAdvicePanel(){
  $('progressAdviceBox')?.classList.add('hidden');$('progressAdviceBackdrop')?.classList.add('hidden');
}

// PRISMA: Solicita una lectura breve del avance personal cuando el estudiante la pide.
async function reviewProgressWithAI(){
  if(!currentSession)return;
  const btn=$('progressAdviceBtn'),box=$('progressAdviceBox'),out=$('progressAdviceText'),planBox=$('progressAdvicePlan');
  const s=window.PRISMA_ADAPTIVE.summary(playerId());
  const moduleName=k=>modules.find(m=>m.key===k)?.short||k;
  const moduleProgress=modules.map(m=>{const a=statsFor(m);return `${m.short}:${a.completed}/${a.total}${a.accuracy===null?'':`-${a.accuracy}%`}`}).join(' | ');
  const route=(s.route||[]).slice(0,3);
  const routeText=route.map((x,i)=>`${i+1}) ${moduleName(x.moduleKey)} etapa ${(Number(x.unitIndex)||0)+1}. Motivo: ${x.reason||''} Meta: ${x.goal||''}`).join(' | ');
  const trends=Object.entries(s.trajectory?.dimensions||{}).map(([k,v])=>`${window.PRISMA_ADAPTIVE.DIMENSION_LABELS[k]}=${v.label}(${v.delta||0})`).join(' | ');
  const stagnant=(s.trajectory?.stagnatingModules||[]).map(moduleName).join(', ')||'ninguno';
  const context=currentProfile?.learnerContext||{};

  // PRISMA v2.5.1: muestra una ruta estructurada que NO depende de lo que redacte Gemma.
  // Gemma explica; el motor adaptativo decide prioridades, etapas y metas desde la evidencia guardada.
  const priorityLabels=['PRIORIDAD 1','PRIORIDAD 2','DESPUÉS'];
  planBox.innerHTML=`<div class="progress-route-title"><span>🧭 Ruta calculada por PRISMA</span><small>se recalcula con nuevos resultados</small></div>`+
    (route.length?route.map((step,i)=>{const m=modules.find(x=>x.key===step.moduleKey);if(!m)return'';const unit=Math.max(0,Math.min(9,Number(step.unitIndex)||0));const status=step.trend==='retroceso'?'↓ retroceso':step.trend==='estancamiento'?'→ estancamiento':step.trend==='avance'?'↑ avance':'estable';return `<article class="progress-route-step"><div class="progress-route-step-head"><b>${priorityLabels[i]||`PASO ${i+1}`} · ${esc(m.short)}</b><span>${esc(status)} · etapa ${unit+1}</span></div><p>${esc(step.reason||'Práctica seleccionada por tu trayectoria.')}</p><small><b>Meta:</b> ${esc(step.goal||'Completa la práctica y revisa nuevamente tu avance.')}</small><button type="button" data-progress-route="${esc(step.moduleKey)}" data-unit="${unit}">Practicar ${esc(m.short)} · etapa ${unit+1}</button></article>`}).join(''):'<div class="progress-route-checkpoint">Aún no hay evidencia suficiente para ordenar tres prioridades. Completa algunas actividades y vuelve a revisar.</div>')+
    `<div class="progress-route-checkpoint"><b>Comprobación:</b> ${esc(s.checkpoint||'Vuelve a revisar tu avance cuando tengas nuevos resultados.')}</div>`;
  planBox.querySelectorAll('[data-progress-route]').forEach(b=>b.onclick=()=>openModule(b.dataset.progressRoute,true,Number(b.dataset.unit)));

  btn.disabled=true;btn.textContent='Revisando tu trayectoria…';openProgressAdvicePanel();box.classList.add('loading');out.textContent='';
  const first=route[0],second=route[1];
  const fallback=`Tu trayectoria muestra que ${s.strongest?`${s.strongest.label.toLowerCase()} es una fortaleza actual (${window.PRISMA_ADAPTIVE.display(s.model,s.strongest.dimension)})`:'todavía necesitas un reto inicial para observar tus decisiones'}, mientras que ${s.focus.dimensionLabel.toLowerCase()} necesita mayor atención (${window.PRISMA_ADAPTIVE.display(s.model,s.focus.dimension)}). ${s.focus.trend==='retroceso'?'Hay un retroceso reciente, así que PRISMA propone consolidar antes de aumentar dificultad.':stagnant!=='ninguno'?`También se detecta estancamiento en ${stagnant}, por eso conviene cambiar la práctica y comprobar el resultado.`:'La ruta busca consolidar el progreso sin repetir siempre lo mismo.'} Empieza por ${first?`${moduleName(first.moduleKey)}, etapa ${(Number(first.unitIndex)||0)+1}`:'la primera prioridad mostrada abajo'} y cumple la meta indicada. ${second?`Después practica ${moduleName(second.moduleKey)}, etapa ${(Number(second.unitIndex)||0)+1}.`:''} Cuando completes esas prácticas, vuelve a este botón: PRISMA recalculará la ruta con tus nuevos aciertos, errores, avances y retrocesos. En la Orientación + biblioteca puedes investigar conceptos o contrastar evidencia antes de responder una nueva misión adaptativa.`;
  const prompt=`Actúa como orientador pedagógico de PRISMA STEM. Escribe UN solo mensaje en español claro, entre 130 y 170 palabras, sin Markdown. No inventes módulos ni cambies el orden de la ruta calculada. Debes: 1) reconocer una fortaleza real; 2) explicar la necesidad principal; 3) mencionar si existe avance, retroceso o estancamiento; 4) indicar que primero debe practicar la PRIORIDAD 1, luego la PRIORIDAD 2 y después el tercer paso si existe; 5) repetir de forma breve las metas concretas dadas por PRISMA; 6) cerrar indicando que al terminar debe pulsar de nuevo Revisar mi avance para recalcular la ruta. Puedes sugerir Orientación + biblioteca para investigar y contrastar evidencia, pero NO uses la IA para decidir los módulos. Fortaleza: ${s.strongest?`${s.strongest.label} ${window.PRISMA_ADAPTIVE.display(s.model,s.strongest.dimension)}`:'sin evidencia suficiente'}. Foco: ${s.focus.dimensionLabel} ${window.PRISMA_ADAPTIVE.display(s.model,s.focus.dimension)}. Tendencias: ${trends}. Estancamientos de módulos: ${stagnant}. Ruta exacta: ${routeText}. Misiones adaptativas: ${s.model.missionCount||0}. Superadas: ${s.model.adaptivePassed||0}. Progreso de módulos: ${moduleProgress}. Contexto e intereses: ${learnerContextText(context)}.`;
  let text=null;const h=location.protocol!=='file:'?await localApi('/api/health'):null;
  if(h?.model_available)text=await streamPlain('/api/generate_stream',{prompt},t=>out.textContent=t.replace(/\*\*/g,'').replace(/#{1,6}\s*/g,''));
  if(!text)out.textContent=fallback;
  box.classList.remove('loading');btn.disabled=false;btn.textContent='🧠 Revisar mi avance';
  // PRISMA: registra la consulta y la ruta calculada para poder estudiar fidelidad y cambios de trayectoria.
  if(location.protocol!=='file:')localApi('/api/interaction',{method:'POST',body:JSON.stringify({participant_code:currentSession.code,grade:currentSession.grade,event_type:'progress_ai_review',item_id:'hub-progress-review',payload:{focus:s.focus,route,trajectory_status:s.trajectory?.status||'',stagnating_modules:s.trajectory?.stagnatingModules||[]}})}).catch(()=>{});
}

// PRISMA: Actualiza el resumen de la ruta adaptativa en el Hub.
function renderAdaptive(){const summary=window.PRISMA_ADAPTIVE.summary(playerId());$('adaptiveReason').textContent=summary.reason+' Las barras muestran evidencias para consolidación; el nivel observado se informa sobre 4.';const labels=window.PRISMA_ADAPTIVE.DIMENSION_LABELS;$('adaptiveMasteryBars').innerHTML=Object.entries(summary.model.mastery).map(([key,value])=>{const tr=summary.trajectory?.dimensions?.[key];const trend=tr?.label==='avance'?` · ↑${Math.abs(tr.delta)}`:tr?.label==='retroceso'?` · ↓${Math.abs(tr.delta)}`:'';return`<div class="adaptive-bar-row"><span>${esc(labels[key])}${esc(trend)}</span><div class="mini-track" title="Evidencias para consolidación; no porcentaje de dominio"><i style="width:${window.PRISMA_ADAPTIVE.coverage(summary.model,key)}%"></i></div><strong>${esc(window.PRISMA_ADAPTIVE.display(summary.model,key))}</strong></div>`}).join('');const route=Array.isArray(summary.route)?summary.route:[];$('adaptiveRecommendations').innerHTML=`<strong>Ruta sugerida según tu trayectoria:</strong> ${route.map((step,index)=>{const m=modules.find(x=>x.key===step.moduleKey);if(!m)return'';const unit=Math.max(0,Math.min(9,Number(step.unitIndex)||0));return`<button type="button" data-rec="${step.moduleKey}" data-unit="${unit}" title="${esc(step.reason||'Refuerzo elegido por tu avance reciente')}">${index===0?'🎯':'🧩'} ${m.icon} ${esc(m.short)} · etapa ${unit+1}</button>`}).join('')}`;$('adaptiveRecommendations').querySelectorAll('[data-rec]').forEach(b=>b.onclick=()=>openModule(b.dataset.rec,true,Number(b.dataset.unit)));const ph=adaptiveMascotPhase(summary.model.adaptivePassed);$('adaptiveHubMascot').src=ph.image;$('adaptiveMascotHomePhase').textContent=`${ph.name} · ${summary.model.adaptivePassed||0} misiones superadas${ph.next?` · evoluciona en ${ph.next}`:''}`;const rewardNames={'primera-mision':'🌟 Primera misión','pensador-stem':'🧠 Pensador STEM','evolucion-brote':'🌱 Brote adaptativo','investigador-prisma':'🔎 Investigador','maestro-retos':'🏆 Maestro'};$('adaptiveRewardsHome').innerHTML=(summary.model.specialRewards||[]).slice(-5).map(k=>`<span>${rewardNames[k]||'🏅 Premio'}</span>`).join('');}
// PRISMA: Guarda el perfil actual del estudiante en almacenamiento local.
function saveCurrentProfile(){const db=readProfiles();db[playerId()]=currentProfile;writeProfiles(db)}
// PRISMA: Actualiza todos los indicadores visibles del tablero del estudiante.
function renderDashboard(){if(!currentSession||!currentProfile)return;$('chipName').textContent=currentSession.code;$('chipCourse').textContent=`Grado ${currentSession.grade}`;$('welcomeTitle').textContent=`Código ${currentSession.code}`;$('userChip').classList.remove('hidden');$('refreshBtn').classList.remove('hidden');$('logoutBtn').classList.remove('hidden');showView('dashboardView');renderMascot();renderAdaptive();renderModules();checkServer()}
// PRISMA: Abre un modulo curricular conservando el contexto de sesion.
function openModule(key,adaptive=false,unitIndex=null){const module=modules.find(m=>m.key===key);if(!module)return;sessionStorage.setItem(SESSION_KEY,JSON.stringify(currentSession));currentProfile.lastModule=key;currentProfile.mascotModule=key;selectedMascotModuleKey=key;saveCurrentProfile();const unit=Number.isInteger(Number(unitIndex))?Math.max(0,Math.min(9,Number(unitIndex))):null;location.href=module.path+(adaptive?`&adaptive=1${unit!==null?`&unit=${unit}`:''}`:'')}
// PRISMA: Abre la Ruta Adaptativa de misiones STEM.
function openAdaptive(){sessionStorage.setItem(SESSION_KEY,JSON.stringify(currentSession));location.href='modules/adaptive/index.html'}

// PRISMA: Valida el formulario de ingreso y crea la sesion local del estudiante.
let loginBusy=false;
function entryMessage(text){$('entryLoadingStep').textContent=text;}
function entryLoading(show){const box=$('entryLoading');if(show){const mascot=document.querySelector('.login-mascot');if(mascot)$('entryLoadingMascot').src=mascot.src;entryMessage('Comprobando tu acceso…');if(!box.open)box.showModal();}else if(box.open)box.close();}
$('entryLoading').addEventListener('cancel',e=>e.preventDefault());
async function handleLogin(e){
 e.preventDefault();if(loginBusy)return;loginBusy=true;
 const button=$('loginBtn');button.disabled=true;button.textContent='Entrando y sincronizando tu progreso…';button.setAttribute('aria-busy','true');
 try{await performLogin(e)}catch{ $('loginError').textContent='No se pudo completar la carga. Revisa la conexión e intenta de nuevo.'; }
 finally{entryLoading(false);loginBusy=false;button.disabled=false;button.textContent='Entrar a PRISMA';button.removeAttribute('aria-busy');}
}
async function performLogin(e){e.preventDefault();const code=normalizeCode($('codeInput').value),grade=$('gradeInput').value.trim(),pin=$('pinInput').value.trim(),profileText=$('learnerContextInput').value.trim();$('loginError').textContent='';if(code.length<3||!grade||!/^[0-9]{6}$/.test(pin)){$('loginError').textContent='Completa código, grado y un PIN local de seis números.';return}if(profileText.length<20){$('loginError').textContent='Antes de entrar, cuéntale a PRISMA en un solo texto qué te gusta, cómo es tu entorno o qué te gustaría aprender.';return}if(/@[a-z0-9.-]+\.[a-z]{2,}/i.test(profileText)||/(?:\d[ -]?){7,}/.test(profileText)||/\bmi nombre (?:es|completo es)\b/i.test(profileText)){$('loginError').textContent='Por privacidad, no escribas nombres completos, correos, teléfonos ni direcciones. Describe solo intereses, entorno general y lo que quieres aprender.';return}entryLoading(true);const db=readProfiles(),id=code.toLowerCase(),pinHash=await hashPin(code,pin);let auth=null;const r=await fetch('/api/student/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({participant_code:code,grade,pin_hash:pinHash,context:{profileText}})});auth=await r.json();if(!r.ok||!auth?.token){$('loginError').textContent=auth?.detail||'No fue posible validar el acceso.';return}entrySnapshot=auth.snapshot||null;const learnerContext={profileText};currentSession={code,grade,id,verified:true,learnerContext,createdAt:Date.now(),studentToken:auth?.token||''};currentProfile={id,code,grade,pinHash,modulePersonalities:{},mascotModule:'math',lastModule:'math',learnerContext,createdAt:Date.now(),updatedAt:Date.now(),...(db[id]||{}),code,grade,pinHash,learnerContext};migrateModuleReferences(currentProfile);currentProfile.modulePersonalities=currentProfile.modulePersonalities||{};saveCurrentProfile();sessionStorage.setItem(SESSION_KEY,JSON.stringify(currentSession));entryMessage('Recuperando tu progreso y tus módulos…');await window.PRISMA_RESEARCH?.start?.(auth.session_id);currentSession=window.PRISMA_RESEARCH?.readSession?.()||currentSession;if(!auth.session_id)await saveLearnerContextRemote();await syncAdaptiveRemote();await syncModuleProfilesRemote();entrySnapshot=null;renderDashboard();checkActiveResearchInstrument()}
// PRISMA: Cierra la sesion de estudiante y limpia datos temporales de la pestana.
async function logout(){await window.PRISMA_RESEARCH?.end?.();try{await localApi('/api/student/logout',{method:'POST',body:'{}'})}catch{}sessionStorage.removeItem(SESSION_KEY);sessionStorage.removeItem('prismaResearchSessionV240');currentSession=null;currentProfile=null;$('loginForm').reset();$('userChip').classList.add('hidden');$('refreshBtn').classList.add('hidden');$('logoutBtn').classList.add('hidden');showView('loginView');setLocalStatus('Sistema online','offline')}
// PRISMA: Restaura una sesion existente cuando la pagina se vuelve a abrir.
async function restore(){try{const raw=sessionStorage.getItem(SESSION_KEY);if(!raw)return false;const s=JSON.parse(raw);if(!s?.code||!s?.grade||s.verified!==true)return false;const db=readProfiles(),id=normalizeCode(s.code).toLowerCase();if(!db[id])return false;currentProfile=db[id];migrateModuleReferences(currentProfile);const ctx=currentProfile.learnerContext||s.learnerContext||{};if(learnerContextText(ctx).length<8){sessionStorage.removeItem(SESSION_KEY);return false}currentSession={...s,learnerContext:ctx};sessionStorage.setItem(SESSION_KEY,JSON.stringify(currentSession));try{const vr=await fetch('/api/student/snapshot',{headers:{'X-PRISMA-Student-Token':currentSession.studentToken||''},cache:'no-store'});if(!vr.ok){sessionStorage.removeItem(SESSION_KEY);return false}entrySnapshot=await vr.json();}catch{return false}selectedMascotModuleKey=currentProfile.mascotModule||currentProfile.lastModule||'math';await window.PRISMA_RESEARCH?.start?.();currentSession=window.PRISMA_RESEARCH?.readSession?.()||currentSession;await syncAdaptiveRemote();await syncModuleProfilesRemote();entrySnapshot=null;renderDashboard();checkActiveResearchInstrument();return true}catch{return false}}


// PRISMA: Rellena el campo de contexto con informacion ya guardada.
function prefillLearnerContext(){const code=normalizeCode($('codeInput').value);if(!code)return;const p=readProfiles()[code.toLowerCase()];const text=learnerContextText(p?.learnerContext||{});if(text&&!$('learnerContextInput').value)$('learnerContextInput').value=text;}
$('codeInput').addEventListener('blur',prefillLearnerContext);$('codeInput').addEventListener('change',prefillLearnerContext);
$('loginForm').addEventListener('submit',handleLogin);$('logoutBtn').addEventListener('click',logout);if($('researchInstrumentBtn'))$('researchInstrumentBtn').addEventListener('click',()=>location.href='modules/research/index.html');$('refreshBtn').addEventListener('click',()=>{renderDashboard();showToast('Progreso local actualizado.')});$('brandBtn').addEventListener('click',()=>currentProfile?renderDashboard():showView('loginView'));$('adaptiveRouteBtn').addEventListener('click',openAdaptive);$('progressAdviceBtn').addEventListener('click',reviewProgressWithAI);$('progressAdviceClose')?.addEventListener('click',closeProgressAdvicePanel);$('progressAdviceBackdrop')?.addEventListener('click',closeProgressAdvicePanel);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('progressAdviceBox')?.classList.contains('hidden'))closeProgressAdvicePanel()});window.addEventListener('storage',()=>{if(currentProfile)renderDashboard()});window.addEventListener('prisma-adaptive-updated',()=>{if(currentProfile)renderAdaptive()});
(async()=>{if(!(await restore())){showView('loginView');checkServer()}})();
