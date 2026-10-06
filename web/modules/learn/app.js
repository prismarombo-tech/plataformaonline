// PRISMA: Motor de los módulos curriculares: 6.000 actividades fuente y 6.000 variantes de reserva generadas localmente.
// PRISMA: Los comentarios documentan el flujo; no cambian datos, rutas API ni comportamiento.

(() => {
'use strict';
const SESSION_KEY='prismaHubSessionV1';
const queryParams=new URLSearchParams(location.search);
const moduleKey=queryParams.get('module')||'';
const ADAPTIVE_MICRO=queryParams.get('adaptive')==='1';
const cfg=window.PRISMA_MODULE_MAP?.[moduleKey];
const bank=window.PRISMA_BANK_DATA;
if(moduleKey==='forces')return;
if(!cfg||!bank||bank.moduleKey!==moduleKey){ document.getElementById('loadingView').innerHTML='<h1>No pudimos abrir el módulo</h1><p>El banco de preguntas no coincide con este curso.</p><a class="back-btn" href="../../index.html?return=module">Volver a PRISMA</a>'; return; }
const RESEARCH_MODE=true;
// PRISMA: La ronda normal usa 15 preguntas tomadas de un banco efectivo de 80 por submódulo.
// El microrefuerzo adaptativo se mantiene breve para no alterar la ruta de misiones.
const CASE_MODULE=bank.learningSequence==='case-cycle-v1';
const UNIT_BASE=CASE_MODULE?8:15, MAX_ROUND=60, ADAPTIVE_BASE=CASE_MODULE?4:5, ADAPTIVE_MAX_ROUND=CASE_MODULE?5:8, PASS_SCORE=70, FINAL_PASS_SCORE=80, FINAL_PER_UNIT=CASE_MODULE?4:3, FINAL_BASE=FINAL_PER_UNIT*bank.units.length, RECENT_MEMORY=160;
const WORLDS={
  dataai:{name:'Laboratorio de Datos e IA',icon:'🧠',symbols:['🧠','📊','🔎','🤖','✦'],scene:['📋','📊','🤖','🔐'],badge:'Investigadora de datos'},
  math:{name:'Galaxia de los Números',icon:'🌌',symbols:['➗','✖️','➕','🔢','⭐'],scene:['🪐','🔢','📐','🚀'],badge:'Viajera matemática'},
  ohm:{name:'Laboratorio de Chispas',icon:'⚡',symbols:['⚡','🔋','💡','Ω','✦'],scene:['🔋','💡','🔌','⚡'],badge:'Guardiana del circuito'},
  arduino:{name:'Taller de Inventoras',icon:'🤖',symbols:['🤖','💻','🔧','💡','⚙️'],scene:['🤖','🔧','🧠','💻'],badge:'Inventora Arduino'},
  electronics:{name:'Ciudad de los Circuitos',icon:'🔌',symbols:['🔌','💡','🔋','🧲','✦'],scene:['🔌','🔋','💡','🧰'],badge:'Inventora eléctrica'},
  computational:{name:'Isla de los Acertijos',icon:'🧠',symbols:['🧠','🧩','➡️','🔎','✦'],scene:['🧩','🗺️','🔎','➡️'],badge:'Maestra de algoritmos'},
  codingbasics:{name:'Mundo Digital',icon:'💻',symbols:['💻','⌨️','🔁','💡','✨'],scene:['💻','🔁','🔀','🐞'],badge:'Creadora de código'},
  simplemachines:{name:'Taller Mecánico',icon:'⚙️',symbols:['⚙️','🛞','🪜','🧰','✦'],scene:['⚙️','🛞','🪜','🔩'],badge:'Ingeniera de máquinas'},
  everyday:{name:'Laboratorio de decisiones',icon:'🧭',symbols:['🧭','🔎','💡','📊','✦'],scene:['🔎','🧩','💬','✅'],badge:'Exploradora de decisiones'},
  energy:{name:'Ciudad de la Energía',icon:'☀️',symbols:['☀️','💡','🔋','🌬️','✨'],scene:['☀️','💡','🌬️','🔋'],badge:'Guardiana de la energía'},
  structures:{name:'Ciudad de Puentes',icon:'🌉',symbols:['🌉','🔺','🏗️','🧱','✦'],scene:['🌉','🔺','🏗️','🧱'],badge:'Constructora PRISMA'},
  measurement:{name:'Laboratorio de Medidas',icon:'📏',symbols:['📏','⏱️','🌡️','📊','✦'],scene:['📏','⚖️','🌡️','📊'],badge:'Detective de datos'},
  robotics:{name:'Fábrica de Robots',icon:'🤖',symbols:['🤖','📡','⚙️','🦾','✨'],scene:['🤖','📡','🦾','⚙️'],badge:'Entrenadora de robots'},
  environment:{name:'Bosque de las Guardianas',icon:'🌱',symbols:['🌱','🌎','💧','♻️','☀️'],scene:['🌳','💧','♻️','☀️'],badge:'Protectora del planeta'},
  science:{name:'Laboratorio de Descubrimientos',icon:'🧪',symbols:['🧪','🔬','🔎','📋','✨'],scene:['🔬','🧪','📋','🔎'],badge:'Pequeña científica'}
};
const world=WORLDS[moduleKey]||{name:'Mundo PRISMA',icon:'✨',symbols:['✨','⭐','🧩','🌱'],scene:['✨','🔎','💡','⭐'],badge:'Exploradora PRISMA'};
const $=id=>document.getElementById(id);
let session=null, profile=null, state=null, timer=null, seconds=0, saveTimer=null, toastTimer=null;
// PRISMA: Lee la sesion activa desde sessionStorage.
function readSession(){try{const r=sessionStorage.getItem(SESSION_KEY);if(r){const s=JSON.parse(r);if(s?.code&&s?.grade&&s.verified===true)return s}}catch{}return null}
// PRISMA: Normaliza texto para comparar respuestas escritas.
function normalize(v){return String(v||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9_-]+/g,'-').replace(/^-|-$/g,'')}
// PRISMA: Obtiene la clave local con la que se identifica el progreso del participante.
function playerId(){return normalize(session?.code||'default')}
// PRISMA: Lee el progreso completo del modulo desde localStorage.
function storage(){try{return JSON.parse(localStorage.getItem(cfg.storageKey)||'{}')}catch{return{}}}
// PRISMA: Guarda el progreso completo del modulo en localStorage.
function writeStorage(db){localStorage.setItem(cfg.storageKey,JSON.stringify(db))}
// PRISMA: Crea la estructura inicial de progreso de un modulo.
function baseProfile(){return{id:playerId(),participantCode:session.code,name:session.code,course:session.grade,grade:session.grade,xp:0,completedMissions:[],unitBest:{},correct:0,attempts:0,bestStreak:0,currentStreak:0,seen:{},finalBest:{score:0,date:null,attempts:0},finalPassed:false,recentQuestionIds:[],recentQuestionKeys:[],updatedAt:Date.now()}}
// PRISMA: Completa y corrige un perfil local antiguo para mantener compatibilidad.
function normalizeProfile(raw){const p={...baseProfile(),...(raw||{}),id:playerId(),participantCode:session.code,name:session.code,course:session.grade,grade:session.grade};p.completedMissions=Array.isArray(p.completedMissions)?p.completedMissions:[];p.unitBest=p.unitBest&&typeof p.unitBest==='object'?p.unitBest:{};p.seen=p.seen&&typeof p.seen==='object'?p.seen:{};p.finalBest=p.finalBest&&typeof p.finalBest==='object'?p.finalBest:{score:0,date:null,attempts:0};p.finalPassed=!!p.finalPassed||(+p.finalBest.score||0)>=FINAL_PASS_SCORE;p.recentQuestionIds=Array.isArray(p.recentQuestionIds)?p.recentQuestionIds.slice(-RECENT_MEMORY):[];p.recentQuestionKeys=Array.isArray(p.recentQuestionKeys)?p.recentQuestionKeys.slice(-(RECENT_MEMORY*2)):[];return p}
// PRISMA: Guarda el perfil del modulo y marca su ultima actualizacion.
function saveLocal(){if(state&&['unit','adaptiveMicro','final'].includes(state.mode)&&!state.finished)profile.activeRound=JSON.parse(JSON.stringify({...state,activePuzzle:null}));const db=storage();db[profile.id]=profile;writeStorage(db);try{window.dispatchEvent(new StorageEvent('storage',{key:cfg.storageKey}))}catch{window.dispatchEvent(new Event('storage'))}}
// PRISMA: Realiza llamadas JSON al servidor local e incluye el token del estudiante.
async function localApi(path,payload,keepalive=false){if(location.protocol==='file:')return null;try{const res=await fetch(path,{method:'POST',headers:{'Content-Type':'application/json',...(session?.studentToken?{'X-PRISMA-Student-Token':session.studentToken}:{})},keepalive,body:JSON.stringify({...payload,session_id:window.PRISMA_RESEARCH?.sessionId?.()||''})});return res.ok?await res.json():null}catch{return null}}
// PRISMA: Realiza una consulta GET al servidor local.
async function localGet(path){if(location.protocol==='file:')return null;try{const res=await fetch(path,{headers:{...(session?.studentToken?{'X-PRISMA-Student-Token':session.studentToken}:{})},cache:'no-store'});return res.ok?await res.json():null}catch{return null}}
// PRISMA: Sincroniza resultados del modulo con el modelo adaptativo central.
function syncAdaptiveState(model){if(!model)return;localApi('/api/adaptive_state',{participant_code:session.code,grade:session.grade,state:model})}
// PRISMA: Registra una interaccion curricular para trazabilidad de investigacion.
function logInteraction(payload){if(window.PRISMA_EVIDENCE)window.PRISMA_EVIDENCE.record(payload);else localApi('/api/interaction',{participant_code:session.code,grade:session.grade,...payload})}
let remoteSaveTimer=null;
async function flushModuleSave(keepalive=false){
  clearTimeout(remoteSaveTimer);remoteSaveTimer=null;
  if(!session||!profile)return;
  const out=await localApi('/api/module_state',{participant_code:session.code,grade:session.grade,module_key:moduleKey,state:profile},keepalive);
  $('syncStatus').textContent=out?'Local + SQLite':'Guardado local';
}
function queueSave(){profile.updatedAt=Date.now();saveLocal();$('syncStatus').textContent='Guardando…';clearTimeout(remoteSaveTimer);remoteSaveTimer=setTimeout(()=>flushModuleSave(),350)}
window.addEventListener('pagehide',()=>{if(remoteSaveTimer!==null)flushModuleSave(true)});
// PRISMA: Muestra una vista del modulo y oculta las demas.
function show(id){for(const v of document.querySelectorAll('.view'))v.classList.add('hidden');$('loadingView').classList.add('hidden');$(id).classList.remove('hidden')}
// PRISMA: Calcula el porcentaje de aciertos cuando existen intentos.
function accuracy(){return profile.attempts?Math.round(profile.correct/profile.attempts*100):null}
// PRISMA: Comprueba si una unidad ya fue superada.
function isDone(id){return profile.completedMissions.includes(id)}
// PRISMA: Cuenta cuantas unidades del modulo ha terminado el estudiante.
function completedUnitsCount(){return bank.units.filter(u=>isDone(u.id)).length}
// PRISMA: Decide si una unidad esta disponible segun la progresion del modulo.
function unitUnlocked(index){return index===0||isDone(bank.units[index-1].id)}
// PRISMA: Mezcla colores para adaptar la identidad visual del modulo.
function hexMix(hex,target='#ffffff',amount=.25){const clean=String(hex||'#78b7ff').replace('#','');const a=clean.length===3?clean.split('').map(x=>x+x).join(''):clean;const b=target.replace('#','');return '#'+[0,2,4].map(i=>Math.round(parseInt(a.slice(i,i+2),16)*(1-amount)+parseInt(b.slice(i,i+2),16)*amount).toString(16).padStart(2,'0')).join('')}
// PRISMA: Aplica colores, nombre e iconografia del modulo actual.
function applyModuleTheme(){const accent=cfg.color||'#78b7ff';document.documentElement.style.setProperty('--accent',accent);document.body.style.setProperty('--accent',accent);document.body.style.setProperty('--module-accent-a',accent);document.body.style.setProperty('--module-accent-b',hexMix(accent,'#ffffff',.24));document.body.style.setProperty('--module-highlight',hexMix(accent,'#ffffff',.42));document.body.style.setProperty('--accent-soft',hexMix(accent,'#ffffff',.62));const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=accent}
// PRISMA: Convierte el puntaje en estrellas de progreso.
function starsForScore(score){score=+score||0;return score>=90?3:score>=80?2:score>=PASS_SCORE?1:0}
// PRISMA: Devuelve las estrellas obtenidas en una unidad concreta.
function unitStars(u){return starsForScore(profile.unitBest?.[u.id]?.score)}
// PRISMA: Suma las estrellas logradas en todo el modulo.
function totalStars(){return bank.units.reduce((n,u)=>n+unitStars(u),0)}
// PRISMA: Convierte una cantidad de estrellas a representacion visual.
function starText(n){return `${'★'.repeat(n)}${'☆'.repeat(Math.max(0,3-n))}`}
// PRISMA: Define los logros disponibles dentro del modulo.
function achievementList(){
  const completed=completedUnitsCount(),stars=totalStars(),acc=accuracy(),scores=Object.values(profile.unitBest||{}).map(x=>+x.score||0);
  return [
    {id:'first',icon:'🌱',title:'Primer paso',desc:'Supera tu primera etapa.',ok:completed>=1},
    {id:'explorer',icon:'🧭',title:'Exploradora del mundo',desc:'Supera 5 etapas del curso.',ok:completed>=5},
    {id:'master',icon:'🏅',title:world.badge,desc:'Supera las 10 etapas del curso.',ok:completed>=10},
    {id:'stars',icon:'⭐',title:'Coleccionista estelar',desc:'Reúne al menos 20 estrellas.',ok:stars>=20},
    {id:'streak',icon:'🔥',title:'Racha brillante',desc:'Logra una racha de 5 aciertos.',ok:(profile.bestStreak||0)>=5},
    {id:'accuracy',icon:'🎯',title:'Mente precisa',desc:'Alcanza 90% de precisión con 20 respuestas.',ok:(profile.attempts||0)>=20&&acc!==null&&acc>=90},
    {id:'perfect',icon:'💎',title:'Misión perfecta',desc:'Obtén 100% en una etapa.',ok:scores.some(x=>x>=100)},
    {id:'final',icon:'👑',title:'Comprobación de práctica superada',desc:'Supera la Misión Final.',ok:!!profile.finalPassed}
  ];
}
// PRISMA: Determina cuales logros ya cumple el estudiante.
function unlockedAchievements(){return achievementList().filter(x=>x.ok).length}
// PRISMA: Dibuja elementos decorativos del mundo tematico del modulo.
function renderWorldDecor(){
  document.body.dataset.world=moduleKey;
  let layer=document.getElementById('worldDecor');
  if(!layer){layer=document.createElement('div');layer.id='worldDecor';layer.className='world-decor';layer.setAttribute('aria-hidden','true');document.body.prepend(layer)}
  const syms=world.symbols||['✨'];
  layer.innerHTML=Array.from({length:14},(_,i)=>`<span style="--i:${i};--x:${(i*37)%96};--y:${(i*23+7)%92}">${syms[i%syms.length]}</span>`).join('');
}
// PRISMA: Calcula la siguiente unidad que conviene completar.
function currentFrontierIndex(){const done=completedUnitsCount();return Math.min(done,bank.units.length-1)}
// PRISMA: Construye el mapa de las diez unidades del modulo.
function renderAdventureMap(){
  const frontier=currentFrontierIndex();
  $('unitGrid').innerHTML=`<div class="map-world-label"><span>${world.icon}</span><div><small>ESTÁS EXPLORANDO</small><strong>${esc(world.name)}</strong></div><b>${totalStars()}/30 ⭐</b></div>`+bank.units.map((u,i)=>{
    const done=isDone(u.id),unlock=unitUnlocked(i),stars=unitStars(u),here=i===frontier&&!done;
    return `<article class="unit-card map-station ${done?'done':''} ${unlock?'':'locked'} ${here?'current':''}" data-unit="${i}">
      <span class="path-node">${done?'✓':i+1}</span>
      <div class="station-art">${(world.scene||[cfg.icon])[i%(world.scene||[cfg.icon]).length]}</div>
      <div class="station-copy"><small>ESTACIÓN ${i+1}</small>${u.phase?`<span class="station-phase">${esc(u.phase)}</span>`:''}<h3>${esc(u.title)}</h3><p>${esc(u.intro)}</p><div class="station-stars" aria-label="${stars} de 3 estrellas">${starText(stars)}</div></div>
      <span class="unit-status">${done?'Superado':unlock?'Abrir':'🔒'}</span>
      ${here?`<div class="map-traveler"><img src="${mascotStageImage()}" alt="PRISMA está aquí"><span>¡Siguiente aventura!</span></div>`:''}
    </article>`
  }).join('');
  document.querySelectorAll('.unit-card:not(.locked)').forEach(el=>el.addEventListener('click',()=>openLesson(+el.dataset.unit)));
}
// PRISMA: Actualiza el boton de mochila con recompensas y logros.
function renderBackpackButton(){
  const btn=$('backpackBtn');if(!btn)return;const n=unlockedAchievements();btn.innerHTML=`🎒 Mi colección <strong>${n}/8</strong>`;btn.setAttribute('aria-label',`Abrir colección de logros, ${n} de 8 desbloqueados`)
}
// PRISMA: Abre el panel de logros y progreso acumulado.
function openBackpack(){
  const items=achievementList();$('backpackTitle').textContent=`🎒 Colección · ${cfg.short}`;$('backpackWorld').textContent=`${world.icon} ${world.name} · ${totalStars()}/30 estrellas`;
  $('badgeGrid').innerHTML=items.map(x=>`<article class="badge-card ${x.ok?'unlocked':'locked'}"><div class="badge-icon">${x.ok?x.icon:'🔒'}</div><div><strong>${esc(x.title)}</strong><p>${esc(x.desc)}</p></div><span>${x.ok?'DESBLOQUEADO':'PENDIENTE'}</span></article>`).join('');
  $('backpackModal').classList.remove('hidden');document.body.classList.add('modal-open');
}
// PRISMA: Cierra el panel de mochila.
function closeBackpack(){$('backpackModal')?.classList.add('hidden');document.body.classList.remove('modal-open')}
// PRISMA: Muestra una escena conceptual interactiva vinculada a la lectura.
function renderConceptScene(u){
  const ideas=Array.isArray(u.reading?.keyIdeas)?u.reading.keyIdeas.slice(0,4):[];const scene=$('conceptScene');if(!scene)return;
  if(!ideas.length){scene.innerHTML='';scene.classList.add('hidden');return}scene.classList.remove('hidden');
  const pos=[[17,32],[76,23],[25,72],[72,70]];
  scene.innerHTML=`<div class="scene-sky"><span>${world.symbols?.[1]||'✨'}</span><span>${world.symbols?.[2]||'⭐'}</span></div><div class="scene-ground"></div>
    <div class="scene-title"><small>EXPLORA LA ESCENA</small><strong>${world.icon} ${esc(world.name)}</strong><span>Toca los puntos brillantes</span></div>
    ${ideas.map((idea,i)=>`<button class="scene-hotspot" style="left:${pos[i][0]}%;top:${pos[i][1]}%" data-scene="${i}" aria-label="Descubrir ${esc(idea.title)}"><b>${world.scene?.[i]||'✦'}</b><i>+</i></button>`).join('')}
    <div id="sceneInfo" class="scene-info"><strong>🔎 Explora</strong><p>Toca un objeto para descubrir una idea de esta etapa.</p></div>`;
  scene.querySelectorAll('[data-scene]').forEach(btn=>btn.onclick=()=>{const idea=ideas[+btn.dataset.scene];scene.querySelectorAll('.scene-hotspot').forEach(x=>x.classList.toggle('active',x===btn));$('sceneInfo').innerHTML=`<strong>${esc(idea.title)}</strong><p>${esc(idea.text||'')}</p>${idea.example?`<small>${esc(idea.example)}</small>`:''}`});
}
// PRISMA: Muestra el minilaboratorio o actividad breve de exploracion.
function renderMiniLab(u){
  const box=$('miniLab');if(!box)return;
  if(moduleKey==='measurement'){
    const used=new Set(state?.lessonExampleIds||[]);
    const pool=(u.questions||[]).filter(q=>q.type==='choice'&&Array.isArray(q.options)&&q.options.length===4&&!q.reserve&&!used.has(q.id));
    const q=pool[Math.floor(Math.random()*pool.length)]||((u.questions||[]).find(q=>q.type==='choice'&&Array.isArray(q.options)));
    if(!q){box.innerHTML='';box.classList.add('hidden');return}
    box.classList.remove('hidden');state.miniLabTarget=q.id;
    box.innerHTML=`<div class="mini-lab-head"><span>🔎</span><div><strong>Comprobación rápida</strong><small>Resuelve un caso con los datos de la lectura. Solo una opción coincide exactamente.</small></div></div>
      <div class="lab-clue"><small>CASO</small><strong>${esc(q.prompt)}</strong></div>
      <div class="lab-chips">${shuffle(q.options).map(x=>`<button class="lab-chip" data-value="${esc(x)}">${esc(x)}</button>`).join('')}</div><div id="labFeedback" class="lab-feedback"></div>`;
    box.querySelectorAll('.lab-chip').forEach(b=>b.onclick=()=>{
      const ok=b.dataset.value===String(q.answer);
      box.querySelectorAll('.lab-chip').forEach(x=>{x.disabled=true;x.classList.toggle('correct',x===b&&ok);x.classList.toggle('wrong',x===b&&!ok)});
      $('labFeedback').textContent=ok?`Correcto. ${q.explanation||''}`:`Esa opción contiene un error. La respuesta que coincide con los datos es «${q.answer}». ${q.explanation||''}`;
      if(ok)celebrate('spark');
    });
    return;
  }
  const ideas=(u.reading?.keyIdeas||[]).filter(x=>x.example).slice(0,4);
  if(ideas.length<2){box.innerHTML='';box.classList.add('hidden');return}box.classList.remove('hidden');
  const target=ideas[Math.floor(Math.random()*ideas.length)];state.miniLabTarget=target.id;
  box.innerHTML=`<div class="mini-lab-head"><span>🧩</span><div><strong>Minirreto · Une la pista</strong><small>Arrastra o toca el concepto que corresponde al ejemplo.</small></div></div>
  <div class="lab-clue"><small>PISTA</small><strong>${esc(target.example)}</strong></div>
  <div id="labDrop" class="lab-drop" data-drop="${esc(target.id)}">Suelta aquí tu respuesta</div>
  <div class="lab-chips">${shuffle(ideas).map(x=>`<button draggable="true" class="lab-chip" data-lab="${esc(x.id)}">${esc(x.title)}</button>`).join('')}</div><div id="labFeedback" class="lab-feedback"></div>`;
  const check=id=>{const ok=id===target.id;$('labDrop').className=`lab-drop ${ok?'correct':'wrong'}`;$('labDrop').textContent=ok?`✓ ${target.title}`:'Intenta con otra idea';$('labFeedback').textContent=ok?'¡Bien conectado! Esta relación te servirá en el reto.':'Mira de nuevo la pista y compárala con las ideas de la lectura.';if(ok){box.querySelectorAll('.lab-chip').forEach(b=>b.disabled=true);celebrate('spark')}};
  box.querySelectorAll('.lab-chip').forEach(b=>{b.onclick=()=>check(b.dataset.lab);b.ondragstart=e=>e.dataTransfer.setData('text/plain',b.dataset.lab)});const drop=$('labDrop');drop.ondragover=e=>{e.preventDefault();drop.classList.add('ready')};drop.ondragleave=()=>drop.classList.remove('ready');drop.ondrop=e=>{e.preventDefault();drop.classList.remove('ready');check(e.dataTransfer.getData('text/plain'))};
}
// PRISMA: Actualiza el indicador de energia/racha durante los retos.
function renderEnergy(){const box=$('energyCells');if(!box)return;const n=state?.energy||0;box.innerHTML=Array.from({length:5},(_,i)=>`<i class="${i<n?'filled':''}">${i<n?'✦':'◇'}</i>`).join('');$('energyText').textContent=n?`${n}/5`:'0/5'}
// PRISMA: Cambia la expresion y mensaje de la mascota segun lo que ocurre.
function mascotReact(kind,text){const img=$('quizMascotImg');if(img){img.src=mascotStageImage();img.className=`quiz-mascot-img react-${kind}`}$('quizCompanionText').textContent=text}
// PRISMA: Activa una celebracion visual breve por un logro.
function celebrate(kind='mission'){
  const layer=$('celebrationLayer');if(!layer)return;layer.innerHTML='';layer.className=`celebration-layer show ${kind}`;const marks=kind==='final'?['👑','⭐','✨','🏆']:kind==='spark'?['✦','✨','⭐']:['⭐','✨','✦','🌟'];
  for(let i=0;i<(kind==='spark'?10:28);i++){const el=document.createElement('span');el.textContent=marks[i%marks.length];el.style.setProperty('--x',`${8+Math.random()*84}%`);el.style.setProperty('--d',`${Math.random()*.65}s`);el.style.setProperty('--r',`${-30+Math.random()*60}deg`);layer.appendChild(el)}
  setTimeout(()=>{layer.className='celebration-layer';layer.innerHTML=''},kind==='spark'?900:2200)
}
// PRISMA: Dibuja la portada y el mapa principal del modulo.
function renderMeasurementGuide(){
  if(moduleKey!=='measurement')return;
  const rule=document.querySelector('.rule-card');
  if(rule)rule.innerHTML='<strong>🎯 Cómo trabajar este módulo</strong><p>No memorices términos aislados. En cada etapa pregúntate: <b>¿qué quiero medir?, ¿con qué instrumento?, ¿qué unidad uso?, ¿cómo registro el dato? y ¿qué puedo concluir?</b> Lee primero el ejemplo y después practica.</p>';
  let box=document.getElementById('measurementGuide');
  if(!box){box=document.createElement('section');box.id='measurementGuide';box.className='measurement-guide';rule?.insertAdjacentElement('afterend',box)}
  box.innerHTML=`<div class="measurement-guide-head"><div><span class="eyebrow">TU RUTA COMO DETECTIVE</span><h2>De una pregunta a una conclusión con datos</h2><p>Un dato tiene sentido cuando sabes cómo se obtuvo y qué demuestra.</p></div><div class="measurement-question">🔎 <strong>Pregunta guía</strong><span>¿Qué quiero averiguar y qué evidencia necesito?</span></div></div><div class="measurement-steps"><article><b>1</b><span>📏</span><strong>Medir</strong><small>Elige qué observar y con qué instrumento.</small></article><article><b>2</b><span>✍️</span><strong>Registrar</strong><small>Anota valor + unidad, por ejemplo 12 cm.</small></article><article><b>3</b><span>📋</span><strong>Organizar</strong><small>Ordena varios datos en una tabla.</small></article><article><b>4</b><span>📊</span><strong>Representar</strong><small>Usa una gráfica para comparar visualmente.</small></article><article><b>5</b><span>🔎</span><strong>Interpretar</strong><small>Compara y explica qué significan los datos.</small></article></div><div class="measurement-example"><span>💡 EJEMPLO COMPLETO</span><div><strong>¿Creció la planta?</strong><i>→</i><em>Regla</em><i>→</i><em>12 cm</em><i>→</i><em>Tabla</em><i>→</i><em>3 cm más que ayer</em><i>→</i><strong>Sí, creció</strong></div></div>`;
}
function renderHome(){show('homeView');applyModuleTheme();renderWorldDecor();document.querySelector('.module-hero')?.setAttribute('data-icon',cfg.icon||'✨');$('moduleTitle').textContent=`${cfg.icon} ${cfg.title}`;$('moduleDescription').textContent=cfg.description;$('brandTitle').textContent=cfg.title;$('userName').textContent=session.code;$('userCourse').textContent=`Grado ${session.grade}`;$('completedCount').textContent=`${completedUnitsCount()}/10`;$('xpCount').textContent=profile.xp;$('accuracyCount').textContent=accuracy()===null?'—':`${accuracy()}%`;$('worldName').textContent=`${world.icon} ${world.name}`;$('starCount').textContent=`${totalStars()}/30`;renderBackpackButton();renderMeasurementGuide();renderAdventureMap();renderFinalChallengeCard();renderAdaptiveModuleCard()}
// PRISMA: Muestra el acceso al reto final cuando corresponde.
function renderFinalChallengeCard(){const unlocked=finalUnlocked(),passed=!!profile.finalPassed,best=+profile.finalBest?.score||0;const card=$('finalChallengeCard');card.className=`final-challenge-card ${unlocked?'unlocked':'locked'} ${passed?'passed':''}`;card.innerHTML=`<div class="final-orbit">${passed?'👑':'🌟'}</div><div class="final-card-copy"><span class="eyebrow">MISIÓN FINAL</span><h2>${passed?'¡Reto final superado!':'Reto final del curso'}</h2><p>${unlocked?'Repasa los 10 temas principales y demuestra que puedes conectarlos en un único desafío.':'Se habilita cuando superes los 10 submódulos de este curso.'}</p><div class="final-card-meta"><span>${unlocked?'🔓 Disponible':`🔒 ${completedUnitsCount()}/10 completados`}</span>${best?`<span>🏆 Mejor: ${best}%</span>`:''}<span>🎯 ${FINAL_PASS_SCORE}% para superar</span></div></div><button id="openFinalBtn" class="${unlocked?'primary-btn':'secondary-btn'}" ${unlocked?'':'disabled'}>${passed?'Ver resumen / repetir':'Abrir reto final →'}</button>`;if(unlocked)$('openFinalBtn').onclick=openFinalSummary}
// PRISMA: Escapa texto antes de insertarlo en HTML para evitar que contenido externo se interprete como codigo.
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
// PRISMA: Elige la imagen de mascota correspondiente al avance.
function mascotStageImage(){
  const pct=Math.round((Math.min(10,completedUnitsCount())+(profile.finalPassed?1:0))/11*100);
  const stage=pct>=100?'innovador':pct>=60?'maestro':pct>=45?'explorador':pct>=30?'aventurero':pct>=15?'brote':'huevito';
  return `../../assets/prismi/${stage}.svg`;
}
// PRISMA: Selecciona ejemplos de apoyo que no repitan exactamente el reto evaluado.
function readingExamples(u,ideas){
  const chosen=[],usedRefs=new Set();
  const friendly=u.questions.filter(q=>['choice','short','text','truefalse'].includes(q.type));
  const source=friendly.length>=3?friendly:u.questions;
  for(const q of source){if(chosen.length>=3)break;const ref=q.readingRef||'';if(ref&&usedRefs.has(ref))continue;chosen.push(q);if(ref)usedRefs.add(ref)}
  if(chosen.length<3){for(const q of source){if(chosen.length>=3)break;if(!chosen.some(x=>x.id===q.id))chosen.push(q)}}
  return chosen;
}
// PRISMA: Obtiene la respuesta correcta en forma de texto legible.
function correctAnswerText(q){
  if(['short','text','hangman'].includes(q.type))return q.answer||q.accepted?.[0]||'';
  if(['memory','match','order'].includes(q.type))return q.answerSummary||(q.items?.join(' → ')||'Completar correctamente el reto');
  return q.answer||'';
}
// PRISMA: Prepara una respuesta de ejemplo para mostrar en la lectura.
function answerLabel(q){return correctAnswerText(q)}
// PRISMA: Extrae palabras clave para apoyar la comprension del tema.
function readingKeywords(r,u){
  if(Array.isArray(r.keywords)&&r.keywords.length)return r.keywords.slice(0,8);
  const words=[];
  for(const idea of (r.keyIdeas||[])){if(idea.title)words.push(idea.title)}
  const extra=(u.title||'').split(/[,/&·–—:-]+/).map(x=>x.trim()).filter(x=>x.length>2);
  for(const w of extra)if(!words.some(x=>x.toLowerCase()===w.toLowerCase()))words.push(w);
  return words.slice(0,8);
}

// PRISMA: Muestra dentro del modulo el foco recomendado por la Ruta Adaptativa.
function renderAdaptiveModuleCard(){const adaptive=window.PRISMA_ADAPTIVE;if(!adaptive)return;const summary=adaptive.summary(profile.id);const labels=adaptive.DIMENSION_LABELS;const title=$('moduleAdaptiveTitle'),reason=$('moduleAdaptiveReason'),bars=$('moduleAdaptiveBars');if(title)title.textContent=`Foco actual · ${summary.focus.dimensionLabel}`;if(reason)reason.textContent=summary.reason;if(bars)bars.innerHTML=Object.entries(summary.model.mastery).map(([k,v])=>`<div><span>${esc(labels[k])}</span><i title="Evidencias para consolidación, no porcentaje de dominio"><b style="width:${adaptive.coverage(summary.model,k)}%"></b></i><strong>${esc(adaptive.display(summary.model,k))}</strong></div>`).join('')}
// PRISMA: Comprueba si las diez unidades estan terminadas.
function finalUnlocked(){return bank.units.every(u=>isDone(u.id))}
// PRISMA: Construye el resumen de una unidad para el repaso final.
function finalSummaryUnit(u,index){const r=u.reading||{},ideas=Array.isArray(r.keyIdeas)?r.keyIdeas:[];return `<details class="final-topic" ${index===0?'open':''}><summary><span>${index+1}</span><div><strong>${esc(u.title)}</strong><small>${esc(r.lead||u.intro||'')}</small></div><b>⌄</b></summary><div class="final-topic-body">${ideas.length?ideas.map(x=>`<div class="final-key"><strong>${esc(x.title||'Idea clave')}</strong><p>${esc(x.text||'')}</p>${x.example?`<small>${esc(x.example)}</small>`:''}</div>`).join(''):`<p>${esc((u.lesson||[]).join(' '))}</p>`}${r.strategy?`<div class="final-tip"><b>🧠 Para recordarlo:</b> ${esc(r.strategy)}</div>`:''}</div></details>`}
// PRISMA: Abre el mapa-resumen antes del reto final.

function diagnostic(index){
 const u=bank.units[index];const qs=u.questions.filter(q=>!q.reserve&&q.learningRole!=='final'&&['choice','truefalse'].includes(q.type)).slice(0,CASE_MODULE?4:3);
 if(!qs.length){profile.diagnostics||={};profile.diagnostics[u.id]={unavailable:true};openLesson(index);return}
 let box=$('diagnosticView');if(!box){box=document.createElement('section');box.id='diagnosticView';box.className='view';document.querySelector('main').append(box)}
 box.innerHTML=`<h2>Antes de explorar: ${esc(u.title)}</h2><p>Estas preguntas sirven para reconocer lo que ya sabes. No dan una nota ni cambian tu nivel de rúbrica. ${CASE_MODULE?'Puedes dejar sin marcar una pregunta si aún no sabes.':'Puedes elegir «Aún no lo sé».'}</p>${qs.map((q,i)=>`<fieldset><legend>${esc(q.context||'')} ${esc(q.prompt)}</legend>${(q.options||['Verdadero','Falso']).map((o,n)=>`<label style="display:block;padding:10px"><input type="radio" name="diagnostic${i}" value="${n}"> ${CASE_MODULE?String.fromCharCode(65+n)+'. ':''}${esc(o)}</label>`).join('')}${CASE_MODULE?'':`<label><input type="radio" name="diagnostic${i}" value="unknown"> Aún no lo sé</label>`}</fieldset>`).join('')}<button id="diagnosticDone" class="primary-btn">Guardar y explorar la explicación</button>`;
 show('diagnosticView');$('diagnosticDone').onclick=()=>{const responses=qs.map((q,i)=>{const choice=document.querySelector(`input[name="diagnostic${i}"]:checked`);const value=choice?.value==='unknown'||!choice?null:(q.options||['Verdadero','Falso'])[Number(choice.value)];return {question_id:q.id,readingRef:q.readingRef||null,answer:value,correct:value===null?null:value===q.answer}});profile.diagnostics||={};profile.diagnostics[u.id]={responses,at:Date.now(),version:'3.0'};for(const q of qs){const seen=profile.seen[u.id]||={};seen[q.id]=(seen[q.id]||0)+1}logInteraction({event_type:'pedagogical_diagnostic',module_key:moduleKey,item_id:u.id,payload:{responses,version:'3.0',separate_from_im3:true}});queueSave();box.classList.add('hidden');openLesson(index)};
}
function applicationLink(){const task=window.PRISMA_APPLICATIONS?.[moduleKey];if(!task)return '';return `<article class="reading-idea"><div><h3>Aplicación integradora · ${esc(task.title)}</h3><p>${esc(task.context)}</p><p>${esc(task.task)}</p><a class="primary-btn" href="../adaptive/index.html?application=${encodeURIComponent(moduleKey)}">Resolver y justificar esta aplicación</a><p>Se valora aparte de las preguntas de práctica. Resuelve con los datos dados dentro de PRISMA; no necesitas materiales ni acciones físicas.</p></div></article>`}

function openFinalSummary(){if(!finalUnlocked()){toast('Completa primero los 10 submódulos.');return}state={mode:'finalSummary'};show('finalSummaryView');$('finalMascotImg').src=mascotStageImage();$('finalSummaryTitle').textContent=`${cfg.icon} Reto final · ${cfg.title}`;$('finalSummaryLead').textContent='Has superado las 10 etapas. Antes del desafío, recorre este mapa-resumen: reúne las ideas principales que aprendiste durante todo el curso.';$('finalSummaryGrid').innerHTML=applicationLink()+bank.units.map(finalSummaryUnit).join('');const best=+profile.finalBest?.score||0;$('finalBestText').textContent=best?`Tu mejor resultado hasta ahora es ${best}%.`:'Será tu primer intento del reto final.';$('finalRuleText').textContent=`El reto comienza con ${FINAL_BASE} preguntas: ${FINAL_PER_UNIT} de cada submódulo. Esta comprobación no añade repeticiones: al finalizar podrás revisar tus errores y volver a las explicaciones. Necesitas ${FINAL_PASS_SCORE}% para superar la misión final.`;window.scrollTo({top:0,behavior:'smooth'})}
// PRISMA: Normaliza el enunciado para reconocer el mismo contenido aunque cambie su presentación.
function canonicalQuestionPrompt(q){return normAnswer(String((q?.context||'')+' '+(q?.prompt||'')).replace(/^Responde sin opciones:\s*/i,'').replace(/^Reto de reserva:\s*/i,'').replace(/^Reserva:\s*/i,'').replace(/^Escribe la palabra o expresión completa:\s*/i,''))}
// PRISMA: Construye dos claves de memoria. La primera une una actividad fuente con su variante
// de reserva; la segunda detecta contenidos prácticamente iguales aunque tengan otro ID.
function questionMemoryKeys(q){const source=`src:${q.reserveSourceId||q.id||''}`;const pairText=Array.isArray(q.pairs)?q.pairs.map(p=>`${p.left}|${p.right}`).join('||'):'';const itemText=Array.isArray(q.items)?q.items.join('||'):'';const content=`content:${normAnswer(`${canonicalQuestionPrompt(q)}|${q.answer||q.answerSummary||''}|${pairText}|${itemText}`)}`;return [source,content]}
// PRISMA: Mantiene una firma principal por compatibilidad con registros anteriores.
function questionSignature(q){return questionMemoryKeys(q)[1]}
// PRISMA: Asigna prioridad a preguntas menos vistas y evita repetir tanto el original como su reserva.
function questionRank(u,q,adaptiveFocus=null,target='basico'){const seen=profile.seen[u.id]||{};const recentIds=new Set(profile.recentQuestionIds||[]);const recentKeys=new Set(profile.recentQuestionKeys||[]);const keys=questionMemoryKeys(q);const dims=window.PRISMA_ADAPTIVE?.inferDimensions?.(moduleKey,q)||[];const missing=new Set((profile.diagnostics?.[u.id]?.responses||[]).filter(x=>x.correct!==true).map(x=>x.readingRef));const difficultyPenalty=Math.abs(({basico:1,intermedio:2,avanzado:3}[target]||1)-(q.pedagogy?.difficulty||1));const prerequisitePenalty=q.pedagogy?.prerequisite&& !isDone(q.pedagogy.prerequisite)?1:0;const focusPenalty=(missing.has(q.readingRef)?-2:adaptiveFocus&&!dims.includes(adaptiveFocus)?3:0)+difficultyPenalty+prerequisitePenalty;return {q,recent:(recentIds.has(q.id)||keys.some(key=>recentKeys.has(key)))?1:0,count:+seen[q.id]||0,focusPenalty,rand:Math.random()}}
// PRISMA: Selecciona preguntas variadas de una unidad evitando exceso de repeticion.
function selectQuestionsFromUnit(u,count){
  if(CASE_MODULE)return u.questions.filter(q=>q.learningRole==='final').slice(0,count);
  const adaptiveSummary=window.PRISMA_ADAPTIVE?.summary?.(profile.id);
  const adaptiveFocus=adaptiveSummary?.focus?.dimension||null;
  const targetComplexity=adaptiveSummary?.focus?.complexity||'basico';
  const ranked=u.questions.map(q=>questionRank(u,q,adaptiveFocus,targetComplexity)).sort((a,b)=>a.recent-b.recent||(ADAPTIVE_MICRO?a.focusPenalty-b.focusPenalty:a.count-b.count)||(ADAPTIVE_MICRO?a.count-b.count:a.focusPenalty-b.focusPenalty)||a.rand-b.rand);
  if(count<=1)return ranked.slice(0,count).map(x=>x.q);
  const out=[];for(const x of ranked){if(!out.length||out.some(q=>q.type!==x.q.type)){out.push(x.q);if(out.length>=count)break}}
  for(const x of ranked){if(out.length>=count)break;if(!out.some(q=>q.id===x.q.id))out.push(x.q)}
  return out;
}
// PRISMA: Inicia el reto final mezclando preguntas de las diez unidades.
function startFinalChallenge(){if(!finalUnlocked()){renderHome();return}const queue=[];bank.units.forEach((u,unitIndex)=>selectQuestionsFromUnit(u,FINAL_PER_UNIT).forEach(q=>queue.push({qid:q.id,unitIndex,repeat:false})));state={mode:'final',unitIndex:null,lessonExampleIds:[],queue:CASE_MODULE?queue:shuffle(queue),pos:0,correct:0,firstCorrect:0,firstTotal:0,errors:0,answered:false,lastId:null,startBase:FINAL_BASE,energy:0,energyBursts:0};$('quizCompanionIcon').textContent='🌟';$('quizCompanionTitle').textContent='Misión final PRISMA';mascotReact('focus','Las preguntas mezclan los 10 submódulos. Usa el mapa-resumen y confía en lo que aprendiste.');queueSave();renderEnergy();renderQuestion();show('quizView')}
// PRISMA: Abre la lectura guiada, ejemplos y minilaboratorio de una unidad.
function openLesson(index){
  if(!ADAPTIVE_MICRO&&restoreLearningClosure(index))return;
  if(!ADAPTIVE_MICRO&&!profile.diagnostics?.[bank.units[index].id]){diagnostic(index);return}

  state={mode:'unitLesson',unitIndex:index,lessonExampleIds:[]};const u=bank.units[index],r=u.reading||{};show('lessonView');
  $('lessonBadge').textContent=`SUBMÓDULO ${index+1} DE 10`;$('lessonTitle').textContent=u.title;
  $('readingTitle').textContent=r.title||`Lectura inicial · ${u.title}`;
  $('lessonIntro').textContent=r.lead||u.intro||'';
  const baseContext=r.context||'Lee las ideas clave antes de comenzar. Las preguntas se basan en esta explicación.';
  $('readingContext').textContent=moduleKey==='measurement'?baseContext:`${baseContext} No necesitas memorizar palabra por palabra: busca comprender qué significa cada idea, cuándo se usa y cómo reconocerla en una situación sencilla.`;
  $('lessonMascotImg').src=mascotStageImage();
  $('mascotLessonTitle').textContent=`${cfg.icon} ${cfg.short}: misión ${index+1}`;
  $('mascotLessonText').textContent=`Bienvenida a ${world.name}. Hoy explorarás “${u.title}”. Toca la escena, revisa los ejemplos y prueba el minirreto antes de comenzar.`;
  const ideas=Array.isArray(r.keyIdeas)?r.keyIdeas:[];
  if(moduleKey==='measurement'){
    const goalTitle=document.querySelector('.reading-goals .reading-section-title strong');
    const goalHelp=document.querySelector('.reading-goals .reading-section-title small');
    if(goalTitle)goalTitle.textContent='¿Qué decisiones vas a practicar?';
    if(goalHelp)goalHelp.textContent='No memorices definiciones: usa estos pasos para resolver el caso.';
    const blocks=document.querySelectorAll('.reading-block .reading-section-title');
    if(blocks[0]){const strong=blocks[0].querySelector('strong'),small=blocks[0].querySelector('small');if(strong)strong.textContent='Resolvemos el caso paso a paso';if(small)small.textContent='Cada tarjeta explica qué decisión tomar y por qué.'}
    if(blocks[1]){const strong=blocks[1].querySelector('strong'),small=blocks[1].querySelector('small');if(strong)strong.textContent='Ejemplos de decisiones con datos';if(small)small.textContent='Observa cómo los números, unidades y comparaciones responden preguntas concretas.'}
    if(blocks[2]){const strong=blocks[2].querySelector('strong'),small=blocks[2].querySelector('small');if(strong)strong.textContent='Pistas útiles';if(small)small.textContent='Úsalas para leer y resolver los retos.'}
  }
  $('readingGoals').innerHTML=(ideas.length?ideas.map(x=>x.title):[u.title]).slice(0,6).map(x=>`<span class="goal-chip">${esc(x)}</span>`).join('');
  $('readingIdeas').innerHTML=ideas.length?ideas.map((idea,i)=>`<article class="reading-idea"><span>${i+1}</span><div><strong>${esc(idea.title||`Idea ${i+1}`)}</strong><p>${esc(idea.text||'')}</p>${idea.example?`<small>${esc(idea.example)}</small>`:''}</div></article>`).join(''):(u.lesson||[]).map((x,i)=>`<article class="reading-idea"><span>${i+1}</span><div><p>${esc(x)}</p></div></article>`).join('');
  renderConceptScene(u);
  const examples=CASE_MODULE?u.questions.filter(q=>q.learningRole==='guided'):readingExamples(u,ideas); state.lessonExampleIds=examples.map(q=>q.id);
  $('guidedExamples').innerHTML=examples.map((q,i)=>`<article class="guided-example"><span class="example-number">EJEMPLO ${i+1}</span><strong>${esc(q.prompt)}</strong><div class="example-answer"><b>Respuesta:</b> ${esc(answerLabel(q))}</div><small>${esc(q.explanation||'Observa cómo la respuesta se relaciona con las ideas de la lectura.')}</small></article>`).join('');
  $('readingKeywords').innerHTML=readingKeywords(r,u).map(x=>`<span class="keyword-chip">${esc(x)}</span>`).join('');
  $('readingStrategy').textContent=r.strategy||(u.lesson?.[1]||'Lee con atención y relaciona la idea con un ejemplo.');
  $('readingRemember').textContent=moduleKey==='measurement'?(r.remember||'Usa los datos para responder la pregunta; no memorices frases aisladas.'):`${r.remember||'Si fallas, la retroalimentación te indicará qué idea debes revisar.'} No pasa nada si necesitas volver a mirar una explicación: aprender también significa corregir, comparar y volver a intentar.`;
  let cycle=$('learningCycle');if(!cycle){cycle=document.createElement('div');cycle.id='learningCycle';$('lessonView').append(cycle)}cycle.innerHTML=`<h3>Aplica y explica</h3><p>Elige una idea de esta etapa, úsala para tomar una decisión en el reto del módulo y explica con qué dato comprobarías tu decisión.</p>${applicationLink()}<label>Mi explicación<textarea id="unitReflection" rows="3"></textarea></label><button id="saveReflection" class="secondary-btn">Guardar mi explicación</button>`;$('unitReflection').value=profile.reflections?.[u.id]?.text||'';$('saveReflection').onclick=()=>{profile.reflections||={};profile.reflections[u.id]={text:$('unitReflection').value,at:Date.now()};logInteraction({event_type:'unit_reflection',module_key:moduleKey,item_id:u.id,payload:profile.reflections[u.id]});queueSave();toast('Explicación guardada para continuar tu proceso.');};renderMiniLab(u);learningOrientation(u);window.scrollTo({top:0,behavior:'smooth'});
}
// PRISMA: Baraja una lista sin modificar el arreglo original.
function shuffle(a){const r=[...a];for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]]}return r}
// PRISMA: Elige las preguntas base del reto priorizando variedad de tipos y contenido.
function selectBaseQuestions(u,count=10){
  if(CASE_MODULE){const cases=[...new Set(u.questions.filter(q=>['application','transfer'].includes(q.learningRole)).map(q=>q.caseId))];if(ADAPTIVE_MICRO)cases.sort((a,b)=>u.questions.filter(q=>q.caseId===a).reduce((n,q)=>n+(profile.seen[u.id]?.[q.id]||0),0)-u.questions.filter(q=>q.caseId===b).reduce((n,q)=>n+(profile.seen[u.id]?.[q.id]||0),0));return cases.flatMap(id=>u.questions.filter(q=>q.caseId===id)).slice(0,count);}
  const shown=new Set(state?.lessonExampleIds||[]);let pool=u.questions.filter(q=>!shown.has(q.id));if(pool.length<count)pool=u.questions;
  // PRISMA: Dentro de la unidad se priorizan actividades relacionadas con el foco actual.
  // En una ronda normal se conserva más variedad; en microrefuerzo el foco pesa primero.
  const adaptiveSummary=window.PRISMA_ADAPTIVE?.summary?.(profile.id);
  const adaptiveFocus=adaptiveSummary?.focus?.dimension||null;
  const targetComplexity=adaptiveSummary?.focus?.complexity||'basico';
  const ranked=pool.map(q=>questionRank(u,q,adaptiveFocus,targetComplexity)).sort((a,b)=>a.recent-b.recent||(ADAPTIVE_MICRO?a.focusPenalty-b.focusPenalty:a.count-b.count)||(ADAPTIVE_MICRO?a.count-b.count:a.focusPenalty-b.focusPenalty)||a.rand-b.rand);
  if(ADAPTIVE_MICRO)return ranked.sort((a,b)=>a.focusPenalty-b.focusPenalty||a.recent-b.recent||a.count-b.count||a.rand-b.rand).slice(0,count).map(x=>x.q);
  const byType=new Map();for(const x of ranked){if(!byType.has(x.q.type))byType.set(x.q.type,[]);byType.get(x.q.type).push(x)}
  const typeOrder=['choice','truefalse','short','hangman','memory','match','order'];const chosen=[];
  for(const t of typeOrder){const bucket=byType.get(t);if(bucket?.length&&chosen.length<Math.min(7,count))chosen.push(bucket.shift().q)}
  const promptKeys=new Set(chosen.map(q=>normAnswer(q.prompt)));
  for(const x of ranked){if(chosen.length>=count)break;if(chosen.some(q=>q.id===x.q.id))continue;const key=normAnswer(x.q.prompt);if(promptKeys.has(key)&&ranked.length>count)continue;chosen.push(x.q);promptKeys.add(key)}
  for(const x of ranked){if(chosen.length>=count)break;if(!chosen.some(q=>q.id===x.q.id))chosen.push(x.q)}
  return shuffle(chosen.slice(0,count));
}
// PRISMA: Inicia una ronda normal o un microrefuerzo adaptativo.
function startQuiz(){const u=bank.units[state.unitIndex];const unitIndex=state.unitIndex,lessonExampleIds=[...(state.lessonExampleIds||[])];const baseCount=ADAPTIVE_MICRO?ADAPTIVE_BASE:UNIT_BASE;const base=selectBaseQuestions(u,baseCount);state={mode:ADAPTIVE_MICRO?'adaptiveMicro':'unit',unitIndex,lessonExampleIds,queue:base.map(q=>({qid:q.id,unitIndex,repeat:false})),pos:0,correct:0,firstCorrect:0,firstTotal:0,errors:0,answered:false,lastId:null,startBase:base.length,maxRound:ADAPTIVE_MICRO?ADAPTIVE_MAX_ROUND:base.length+3,energy:0,energyBursts:0};$('quizCompanionIcon').textContent=cfg.icon||'✨';$('quizCompanionTitle').textContent=ADAPTIVE_MICRO?'Microrefuerzo adaptativo':`${cfg.short}: piensa como una exploradora`;mascotReact('focus',ADAPTIVE_MICRO?'Esta es una práctica breve seleccionada por tu ruta adaptativa. Trabaja la necesidad detectada y luego regresa a tu misión STEM.':'Busca la idea de la lectura que se relaciona con la pregunta. Cinco aciertos seguidos llenan tu energía PRISMA.');queueSave();renderEnergy();renderQuestion();show('quizView')}
// PRISMA: Localiza la pregunta completa a partir del elemento de la cola.
function findQ(item){const unitIndex=typeof item==='object'&&item!==null?(item.unitIndex??state.unitIndex):state.unitIndex;const qid=typeof item==='object'&&item!==null?item.qid:item;return bank.units[unitIndex]?.questions.find(q=>q.id===qid)}
// PRISMA: Evita que la misma pregunta aparezca dos veces seguidas.
function ensureNoImmediateRepeat(){const cur=state.queue[state.pos];if(!cur||state.pos===0)return;const prev=state.queue[state.pos-1];if(cur.qid!==prev.qid||cur.unitIndex!==prev.unitIndex)return;const later=state.queue.findIndex((x,i)=>i>state.pos&&(x.qid!==cur.qid||x.unitIndex!==cur.unitIndex));if(later>state.pos)[state.queue[state.pos],state.queue[later]]=[state.queue[later],state.queue[state.pos]]}
// PRISMA: Selecciona el renderer adecuado segun el tipo de pregunta.
function renderQuestion(){
  clearInterval(timer);ensureNoImmediateRepeat();if(state.pos>=state.queue.length||state.pos>=(state.maxRound||MAX_ROUND)){finishRound();return}
  const item=state.queue[state.pos],q=findQ(item);state.answered=false;state.activePuzzle=null;state.questionStartedAt=Date.now();
  $('feedbackBox').className='feedback hidden';$('feedbackStudy').className='feedback-study hidden';$('feedbackStudy').innerHTML='';
  $('repeatTag').classList.toggle('hidden',!item.repeat);$('questionSkill').textContent=q.skill||'práctica';$('questionPrompt').textContent=q.prompt;let caseBox=$('questionCase');if(!caseBox){caseBox=document.createElement('div');caseBox.id='questionCase';$('questionPrompt').before(caseBox)}caseBox.hidden=!q.context;caseBox.innerHTML=q.context?`<strong>${esc(q.caseTitle||'Situación')}</strong><p>${esc(q.context)}</p><small>${esc(q.learningRole==='transfer'?'Aplica lo aprendido en un caso diferente':q.learningRole==='final'?'Comprobación final: caso reservado':'Relaciona las cuatro decisiones del mismo caso')}</small>`:'';
  $('questionCounter').textContent=`Pregunta ${state.pos+1} de ${state.queue.length}`;$('errorCounter').textContent=`${state.errors} error${state.errors===1?'':'es'} · ${state.queue.length-state.startBase} refuerzos`;
  $('quizBar').style.width=`${Math.min(100,(state.pos/state.queue.length)*100)}%`;renderEnergy();
  const area=$('answerArea');$('questionCard').classList.remove('visual-mission','puzzle-mission');
  if(q.type==='short'||q.type==='text')renderShortQuestion(q,item,area);
  else if(q.type==='truefalse')renderTrueFalseQuestion(q,item,area);
  else if(q.type==='hangman')renderHangmanQuestion(q,item,area);
  else if(q.type==='memory')renderMemoryQuestion(q,item,area);
  else if(q.type==='match')renderMatchQuestion(q,item,area);
  else if(q.type==='order')renderOrderQuestion(q,item,area);
  else renderChoiceQuestion(q,item,area);
  if(q.type==='memory'){
    clearInterval(timer);timer=null;$('timerBox').textContent='10 intentos';$('timerBox').classList.remove('danger');
  }else startTimer(q.time||30);
}
// PRISMA: Dibuja una pregunta de seleccion multiple.
function renderChoiceQuestion(q,item,area){
  const visual=!CASE_MODULE&&!item.repeat&&state.pos%4===2;$('questionCard').classList.toggle('visual-mission',visual);const options=shuffle(q.options||[]),icons=['🧩','🔎','💡','🚀'];
  area.innerHTML=visual?`<div class="visual-challenge-banner"><span>🎯</span><div><strong>Desafío gráfico</strong><small>Elige la tarjeta que completa mejor la misión.</small></div></div><div class="choice-grid visual-choice-grid">${options.map((o,i)=>`<button class="choice-btn" data-value="${esc(o)}"><span class="choice-art">${icons[i%icons.length]}</span><b>${esc(o)}</b></button>`).join('')}</div>`:`<div class="choice-grid">${options.map((o,i)=>`<button class="choice-btn" data-value="${esc(o)}">${CASE_MODULE?`<b>${String.fromCharCode(65+i)}.</b> `:''}${esc(o)}</button>`).join('')}</div>`;
  area.querySelectorAll('.choice-btn').forEach(b=>b.onclick=()=>answerChoice(q,item,b.dataset.value,b));
}
// PRISMA: Dibuja una pregunta de respuesta corta escrita.
function renderShortQuestion(q,item,area){area.innerHTML=`<div class="question-mode-label">✍️ RESPUESTA CORTA</div><div class="text-answer"><input id="textAnswerInput" autocomplete="off" spellcheck="false" placeholder="Escribe tu respuesta"><button id="textSubmitBtn" class="primary-btn">Comprobar</button></div><small class="mode-help">Puedes escribir con mayúsculas o minúsculas.</small>`;$('textSubmitBtn').onclick=()=>answerText(q,item);$('textAnswerInput').addEventListener('keydown',e=>{if(e.key==='Enter')answerText(q,item)});setTimeout(()=>$('textAnswerInput')?.focus(),50)}
// PRISMA: Dibuja una pregunta de verdadero/falso.
function renderTrueFalseQuestion(q,item,area){area.innerHTML=`<div class="question-mode-label">⚖️ VERDADERO O FALSO</div><div class="tf-grid"><button class="tf-btn" data-value="Verdadero"><span>✅</span><b>Verdadero</b></button><button class="tf-btn" data-value="Falso"><span>❌</span><b>Falso</b></button></div>`;area.querySelectorAll('.tf-btn').forEach(b=>b.onclick=()=>answerChoice(q,item,b.dataset.value,b))}
// PRISMA: Normaliza una letra para comparar respuestas del ahorcado.
function letterKey(c){const up=String(c||'').toUpperCase();if(up==='Ñ')return 'Ñ';return up.normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
// PRISMA: Dibuja y controla una actividad tipo ahorcado.
function renderHangmanQuestion(q,item,area){
  $('questionCard').classList.add('puzzle-mission');const answer=String(q.answer||''),alphabet='ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');const puzzle={guessed:new Set(),wrong:0,max:q.maxWrong||6};state.activePuzzle=puzzle;
  area.innerHTML=`<div class="question-mode-label">🪢 AHORCADO PRISMA</div><div class="hangman-shell"><div id="hangmanLives" class="hangman-lives"></div><div id="hangmanWord" class="hangman-word"></div><div class="hangman-keyboard">${alphabet.map(l=>`<button class="letter-btn" data-letter="${l}">${l}</button>`).join('')}</div></div>`;
  const update=()=>{if(state.answered)return;const letters=[...answer];$('hangmanWord').innerHTML=letters.map(ch=>/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(ch)?`<span class="hang-letter">${puzzle.guessed.has(letterKey(ch))?esc(ch.toUpperCase()):'_'}</span>`:ch===' '?'<span class="hang-space"> </span>':`<span class="hang-symbol">${esc(ch)}</span>`).join('');$('hangmanLives').textContent=`Intentos disponibles: ${Math.max(0,puzzle.max-puzzle.wrong)} ${'💛'.repeat(Math.max(0,puzzle.max-puzzle.wrong))}`;const complete=letters.every(ch=>!/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(ch)||puzzle.guessed.has(letterKey(ch)));if(complete)resolveAnswer(q,item,true,answer);else if(puzzle.wrong>=puzzle.max)resolveAnswer(q,item,false,`${puzzle.wrong} letras incorrectas`)};
  area.querySelectorAll('.letter-btn').forEach(b=>b.onclick=()=>{if(state.answered||b.disabled)return;const l=b.dataset.letter;b.disabled=true;puzzle.guessed.add(l);const exists=[...answer].some(ch=>letterKey(ch)===l);if(!exists){puzzle.wrong++;b.classList.add('miss')}else b.classList.add('hit');update()});update();
}
// PRISMA: Dibuja una actividad de memoria por parejas.
function renderMemoryQuestion(q,item,area){
  $('questionCard').classList.add('puzzle-mission');
  const cards=[];(q.pairs||[]).forEach((p,i)=>{cards.push({pair:p.id||String(i),side:'L',text:p.left});cards.push({pair:p.id||String(i),side:'R',text:p.right})});
  const mixed=shuffle(cards),maxMistakes=10;
  const puzzle={open:[],matched:new Set(),mistakes:0,maxMistakes,locked:false};state.activePuzzle=puzzle;
  const status=()=>`Parejas: ${puzzle.matched.size}/${q.pairs.length} · Intentos fallidos: ${puzzle.mistakes}/${puzzle.maxMistakes}`;
  area.innerHTML=`<div class="question-mode-label">🧠 MEMORIA</div><p class="mode-help">Encuentra las parejas. Puedes equivocarte hasta 10 veces antes de que el reto se marque como incorrecto.</p><div class="memory-grid">${mixed.map((c,i)=>`<button class="memory-card" data-index="${i}" data-pair="${esc(c.pair)}" data-side="${c.side}"><span class="memory-back">?</span><span class="memory-front">${esc(c.text)}</span></button>`).join('')}</div><div id="memoryStatus" class="puzzle-status">${status()}</div>`;
  const buttons=[...area.querySelectorAll('.memory-card')];
  buttons.forEach(b=>b.onclick=()=>{
    if(state.answered||puzzle.locked||b.classList.contains('matched')||b.classList.contains('open'))return;
    b.classList.add('open');puzzle.open.push(b);if(puzzle.open.length<2)return;
    const [a,c]=puzzle.open;
    if(a.dataset.pair===c.dataset.pair&&a.dataset.side!==c.dataset.side){
      a.classList.add('matched');c.classList.add('matched');puzzle.matched.add(a.dataset.pair);puzzle.open=[];
      $('memoryStatus').textContent=status();
      if(puzzle.matched.size===q.pairs.length){
        const detail=puzzle.mistakes?`Completaste todas las parejas con ${puzzle.mistakes} intento${puzzle.mistakes===1?'':'s'} fallido${puzzle.mistakes===1?'':'s'} de 10`:'Completaste todas las parejas sin errores';
        setTimeout(()=>resolveAnswer(q,item,true,detail),250);
      }
    }else{
      puzzle.mistakes++;puzzle.locked=true;$('memoryStatus').textContent=status();
      const reachedLimit=puzzle.mistakes>=puzzle.maxMistakes;
      setTimeout(()=>{
        a.classList.remove('open');c.classList.remove('open');puzzle.open=[];puzzle.locked=false;
        if(reachedLimit&&!state.answered)resolveAnswer(q,item,false,'Llegaste al máximo de 10 intentos fallidos');
      },650);
    }
  });
}
// PRISMA: Dibuja una actividad de relacionar elementos.
function renderMatchQuestion(q,item,area){
  $('questionCard').classList.add('puzzle-mission');const pairs=q.pairs||[],right=shuffle(pairs.map(p=>({id:p.id,text:p.right}))),puzzle={selected:null,matched:new Set(),mistakes:0};state.activePuzzle=puzzle;
  area.innerHTML=`<div class="question-mode-label">🔗 RELACIONAR</div><p class="mode-help">Toca primero una tarjeta de la izquierda y luego su pareja de la derecha.</p><div class="match-board"><div class="match-column">${pairs.map(p=>`<button class="match-card left" data-pair="${esc(p.id)}">${esc(p.left)}</button>`).join('')}</div><div class="match-column">${right.map(p=>`<button class="match-card right" data-pair="${esc(p.id)}">${esc(p.text)}</button>`).join('')}</div></div><div id="matchStatus" class="puzzle-status">Parejas: 0/${pairs.length}</div>`;
  const left=[...area.querySelectorAll('.match-card.left')],rights=[...area.querySelectorAll('.match-card.right')];left.forEach(b=>b.onclick=()=>{if(state.answered||b.classList.contains('matched'))return;left.forEach(x=>x.classList.remove('selected'));b.classList.add('selected');puzzle.selected=b});rights.forEach(b=>b.onclick=()=>{if(state.answered||b.classList.contains('matched')||!puzzle.selected)return;const l=puzzle.selected;if(l.dataset.pair===b.dataset.pair){l.classList.remove('selected');l.classList.add('matched');b.classList.add('matched');puzzle.matched.add(b.dataset.pair);puzzle.selected=null;$('matchStatus').textContent=`Parejas: ${puzzle.matched.size}/${pairs.length}`;if(puzzle.matched.size===pairs.length)setTimeout(()=>resolveAnswer(q,item,puzzle.mistakes===0,puzzle.mistakes?`${puzzle.mistakes} relación${puzzle.mistakes===1?'':'es'} incorrecta${puzzle.mistakes===1?'':'s'}`:''),250)}else{puzzle.mistakes++;l.classList.add('shake');b.classList.add('shake');setTimeout(()=>{l.classList.remove('shake','selected');b.classList.remove('shake')},450);puzzle.selected=null}})
}
// PRISMA: Dibuja una actividad de ordenar pasos o elementos.
function renderOrderQuestion(q,item,area){
  $('questionCard').classList.add('puzzle-mission');const mixed=shuffle((q.items||[]).map((text,i)=>({text,original:i})));const puzzle={chosen:[]};state.activePuzzle=puzzle;
  area.innerHTML=`<div class="question-mode-label">🔢 ORDENA LOS PASOS</div><p class="mode-help">Toca las tarjetas en el orden correcto.</p><div id="orderSource" class="order-source">${mixed.map((x,i)=>`<button class="order-chip" data-index="${i}" data-text="${esc(x.text)}">${esc(x.text)}</button>`).join('')}</div><div class="order-arrow">↓</div><div id="orderChosen" class="order-chosen"><span class="order-placeholder">Tu secuencia aparecerá aquí</span></div><div class="order-actions"><button id="orderReset" class="secondary-btn">Reiniciar</button><button id="orderCheck" class="primary-btn">Comprobar orden</button></div>`;
  const paint=()=>{$('orderChosen').innerHTML=puzzle.chosen.length?puzzle.chosen.map((x,i)=>`<span class="ordered-chip"><b>${i+1}</b>${esc(x)}</span>`).join(''):'<span class="order-placeholder">Tu secuencia aparecerá aquí</span>'};area.querySelectorAll('.order-chip').forEach(b=>b.onclick=()=>{if(state.answered||b.disabled)return;b.disabled=true;puzzle.chosen.push(b.dataset.text);paint()});$('orderReset').onclick=()=>{puzzle.chosen=[];area.querySelectorAll('.order-chip').forEach(b=>b.disabled=false);paint()};$('orderCheck').onclick=()=>{if(puzzle.chosen.length!==(q.items||[]).length){toast('Completa primero todos los pasos.');return}const ok=puzzle.chosen.every((x,i)=>normAnswer(x)===normAnswer(q.items[i]));resolveAnswer(q,item,ok,puzzle.chosen.join(' → '))}
}
// PRISMA: Normaliza una respuesta antes de compararla.
function normAnswer(v){return String(v||'').trim().toLowerCase().replace(/,/g,'.').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ')}
// PRISMA: Convierte numeros, decimales y fracciones sencillas a un valor comparable.
// Tambien admite unidades escritas por el estudiante, por ejemplo "10 cm" frente a "10".
function mathNumericValue(value){
  let s=normAnswer(value).replace(/−/g,'-').replace(/,/g,'.').replace(/\s*(cm|cm2|cm²|m|m2|m²|puntos?|%|grados?)$/i,'').trim();
  if(/^[-+]?\d+(?:\.\d+)?$/.test(s))return Number(s);
  const f=s.match(/^([-+]?\d+(?:\.\d+)?)\/([-+]?\d+(?:\.\d+)?)$/);
  if(f&&Number(f[2])!==0)return Number(f[1])/Number(f[2]);
  return null;
}
// PRISMA: Comprueba equivalencias flexibles en respuestas escritas.
function answerEquivalent(a,b){const na=normAnswer(a),nb=normAnswer(b);if(na===nb)return true;const va=mathNumericValue(a),vb=mathNumericValue(b);if(va!==null&&vb!==null&&Math.abs(va-vb)<1e-9)return true;if(/[0-9Ω=×÷+*/−-]/.test(String(a)+String(b)))return na.replace(/−/g,'-').replace(/×/g,'*').replace(/÷/g,'/').replace(/\s+/g,'')===nb.replace(/−/g,'-').replace(/×/g,'*').replace(/÷/g,'/').replace(/\s+/g,'');return false}
// PRISMA: Evalua una respuesta de texto.
function answerText(q,item){if(state.answered)return;const v=$('textAnswerInput').value;const accepted=(q.accepted?.length?q.accepted:[q.answer]).filter(Boolean);const ok=accepted.some(a=>answerEquivalent(a,v));resolveAnswer(q,item,ok,v)}
// PRISMA: Evalua una opcion seleccionada.
function answerChoice(q,item,value,button){if(state.answered)return;const ok=value===q.answer;document.querySelectorAll('.choice-btn,.tf-btn').forEach(b=>{b.disabled=true;if(ok&&b.dataset.value===q.answer)b.classList.add('correct')});if(!ok)button.classList.add('wrong');resolveAnswer(q,item,ok,value)}
// PRISMA: Programa dos refuerzos posteriores tras un error sin repetir inmediatamente.
function scheduleTwo(item){if(state.mode==='final'||item.repeat||state.queue.some(x=>x.qid===item.qid&&x.repeat)||state.queue.length>=(state.maxRound||MAX_ROUND))return 0;state.queue.push({qid:item.qid,unitIndex:item.unitIndex??state.unitIndex,repeat:true});return 1;}
// PRISMA: Recupera la idea de lectura que conviene revisar despues de un error.
function readingReminder(q,item){const unitIndex=item?.unitIndex??state.unitIndex,u=bank.units[unitIndex],r=u.reading||{},ideas=Array.isArray(r.keyIdeas)?r.keyIdeas:[];const idea=ideas.find(x=>x.id===q.readingRef);if(idea)return `<strong>📖 Repasa ${esc(u.title)}:</strong><span>${esc(idea.title)} — ${esc(idea.text)}${idea.example?` ${esc(idea.example)}`:''}</span>`;return `<strong>📖 Pista de ${esc(u.title)}:</strong><span>${esc(r.strategy||u.intro||'Revisa la explicación inicial antes del refuerzo.')}</span>`}
// PRISMA: Procesa el resultado de una pregunta, actualiza progreso y genera feedback.
function resolveAnswer(q,item,ok,value){
  if(state.answered)return;state.answered=true;clearInterval(timer);profile.attempts++;const unitIndex=item.unitIndex??state.unitIndex,unit=bank.units[unitIndex];const seen=profile.seen[unit.id]||(profile.seen[unit.id]={});seen[q.id]=(seen[q.id]||0)+1;profile.recentQuestionIds=Array.isArray(profile.recentQuestionIds)?profile.recentQuestionIds:[];profile.recentQuestionIds.push(q.id);profile.recentQuestionIds=profile.recentQuestionIds.slice(-RECENT_MEMORY);profile.recentQuestionKeys=Array.isArray(profile.recentQuestionKeys)?profile.recentQuestionKeys:[];profile.recentQuestionKeys.push(...questionMemoryKeys(q));profile.recentQuestionKeys=profile.recentQuestionKeys.slice(-(RECENT_MEMORY*2));
  state.responses||=[];state.responses.push({qid:q.id,unitIndex,correct:ok,repeat:!!item.repeat,readingRef:q.readingRef,dimension:q.competency?.dimensions?.[0]||null,caseId:q.caseId||null});if(ok){state.correct++;profile.correct++;profile.currentStreak=(profile.currentStreak||0)+1;profile.bestStreak=Math.max(profile.bestStreak||0,profile.currentStreak);profile.xp+=item.repeat?0:10;state.energy=(state.energy||0)+(item.repeat?0:1);if(state.energy>=5&&!item.repeat){state.energy=0;state.energyBursts=(state.energyBursts||0)+1;profile.xp+=15;celebrate('spark');toast('✨ ¡Energía PRISMA completa! +15 XP');mascotReact('celebrate','¡Cinco aciertos! Tu energía brilló y ganaste 15 XP extra.')}else mascotReact('happy',`¡Muy bien! Llevas ${state.energy}/5 de energía PRISMA.`)}else{state.errors++;profile.currentStreak=0;state.energy=0;scheduleTwo(item);mascotReact('think','Revisa la explicación. Al cerrar podrás decidir qué idea necesitas practicar de nuevo.')}
  if(!item.repeat){state.firstTotal=(state.firstTotal||0)+1;if(ok)state.firstCorrect=(state.firstCorrect||0)+1;}
  const evidenceMeta={unitIndex,repeat:!!item.repeat,firstExposure:seen[q.id]===1&&!q.reserve,assisted:!!item.repeat||!!state.activePuzzle?.mistakes,eventId:crypto.randomUUID(),sessionId:window.PRISMA_RESEARCH?.sessionId?.()||'',duration_ms:Math.max(0,Date.now()-(state.questionStartedAt||Date.now()))};
  const adaptiveModel=window.PRISMA_ADAPTIVE?.applyQuestionResult(profile.id,moduleKey,q,ok,evidenceMeta);syncAdaptiveState(adaptiveModel);logInteraction({event_type:'question_answer',module_key:moduleKey,unit_index:unitIndex,item_id:q.id,correct:ok,payload:{...evidenceMeta,answer:String(value??''),correct:ok,algorithm_version:'3.0-evidence',competency:q.competency||null,question_type:q.type,skill:q.skill||'',repeat:!!item.repeat,dimensions:window.PRISMA_ADAPTIVE?.inferDimensions(moduleKey,q)||[]}});renderAdaptiveModuleCard();
  queueSave();renderEnergy();$('questionCounter').textContent=`Pregunta ${state.pos+1} de ${state.queue.length}`;$('errorCounter').textContent=`${state.errors} error${state.errors===1?'':'es'} · ${state.queue.length-state.startBase} refuerzos`;$('feedbackBox').className=`feedback ${ok?'correct':'wrong'}`;$('feedbackTitle').textContent=ok?'✅ ¡Muy bien!':'🧩 Vamos a reforzarlo';const correct=correctAnswerText(q);
  if(ok){$('feedbackText').textContent=`${q.explanation||'Aplicaste correctamente la idea de la lectura.'} Sigue usando la lectura como mapa para resolver los siguientes retos.`;$('feedbackStudy').classList.add('hidden');$('feedbackStudy').innerHTML=''}else{
    let chosen='';if(!value)chosen='Se terminó el tiempo. ';else if(['memory','match'].includes(q.type))chosen=`Terminaste el juego con ${value}. `;else if(q.type==='hangman')chosen=`El ahorcado terminó con ${value}. `;else if(q.type==='order')chosen=`Tu orden fue «${value}». `;else chosen=`Tu respuesta fue «${value}». `;
    $('feedbackText').textContent=`${chosen}${q.optionFeedback?.[value]||''} Revisa la idea de la lectura y explica qué cambiarías. El refuerzo se registra como práctica con apoyo.`;$('feedbackStudy').innerHTML=readingReminder(q,item)+`<details><summary>Ver solución explicada después de pensar</summary><p>${esc(correct)}. ${esc(q.explanation||'')}</p></details>`;$('feedbackStudy').classList.remove('hidden')
  }
  $('continueBtn').focus();
}
// PRISMA: Inicia el temporizador visible de una pregunta cuando corresponde.
function startTimer(t){const mode=sessionStorage.getItem('prismaTimeMode')||'none';if(mode==='none'){clearInterval(timer);$('timerBox').textContent='A tu ritmo';return}if(mode==='double')t*=2;seconds=t;$('timerBox').textContent=seconds;$('timerBox').classList.remove('danger');timer=setInterval(()=>{seconds--;$('timerBox').textContent=seconds;if(seconds<=Math.min(10,Math.round(t*.2)))$('timerBox').classList.add('danger');if(seconds<=0){clearInterval(timer);const item=state.queue[state.pos],q=findQ(item);resolveAnswer(q,item,false,'') }},1000)}
// PRISMA: Avanza a la siguiente pregunta de la cola.
function nextQuestion(){state.pos++;state.answered=false;queueSave();renderQuestion()}
// PRISMA: Cierra la ronda, calcula resultado y guarda progreso.
function finishRound(){
  if($('learningClosure'))$('learningClosure').hidden=true;
  recordLearningRound();
  state.finished=true;delete profile.activeRound;clearInterval(timer);const score=state.firstTotal?Math.round((state.firstCorrect||0)/state.firstTotal*100):0;
  if(state.mode==='adaptiveMicro'){
    queueSave();show('resultView');$('resultIcon').textContent=score>=70?'🧠':'🌱';$('resultTitle').textContent='Microrefuerzo adaptativo completado';$('resultText').textContent=`Realizaste ${state.pos} microactividades focalizadas y alcanzaste ${score}%. Este resultado alimenta tu modelo adaptativo, pero no desbloquea etapas ni se usa como calificación final. Regresa a la Ruta adaptativa para mejorar el mismo reto y explicar qué aprendiste.`;$('resultStars').innerHTML=`<span>${score>=80?'✨':'🧩'}</span><b>${score>=80?'Refuerzo consolidado':'Sigue fortaleciendo esta necesidad'}</b>`;$('resultScore').textContent=`${score}%`;$('resultAttempts').textContent=state.pos;$('resultErrors').textContent=state.errors;$('retryBtn').textContent='Otro microrefuerzo';logInteraction({event_type:'adaptive_micropractice_completed',module_key:moduleKey,unit_index:state.unitIndex,item_id:'micropractice',correct:score>=70,payload:{parent_mission_id:new URLSearchParams(location.search).get('mission')||'',policy:window.PRISMA_ADAPTIVE.getPolicy(),focus:window.PRISMA_ADAPTIVE.summary(profile.id).focus,score,attempts:state.pos,errors:state.errors,base_count:state.startBase,max_round:state.maxRound}});loadRanking();return;
  }
  if(state.mode==='final'){const passed=score>=FINAL_PASS_SCORE;const wasPassed=!!profile.finalPassed;const old=profile.finalBest||{score:0};if(score>(+old.score||0))profile.finalBest={score,date:Date.now(),attempts:state.pos};if(passed){profile.finalPassed=true;if(!wasPassed)profile.xp+=250}queueSave();show('resultView');$('resultIcon').textContent=passed?'👑':'🌟';$('resultTitle').textContent=passed?'¡Misión final superada!':'El reto final te espera';$('resultText').textContent=passed?`Conseguiste ${score}% y completaste el reto global de ${cfg.title}. Has conectado aprendizajes de los 10 submódulos.`:`Obtuviste ${score}%. Repasa el mapa final y vuelve a intentarlo cuando estés lista. Necesitas ${FINAL_PASS_SCORE}% para superar la misión final.`;$('resultStars').innerHTML=passed?'<span>👑</span><b>Comprobación de práctica superada</b>':'<span>🌟</span><b>Sigue explorando</b>';$('resultScore').textContent=`${score}%`;$('resultAttempts').textContent=state.pos;$('resultErrors').textContent=state.errors;$('retryBtn').textContent='Volver al resumen final';if(passed)celebrate('final');loadRanking();return}
  const u=bank.units[state.unitIndex];const passed=score>=PASS_SCORE;state.pendingCompletion=passed&&!isDone(u.id);profile.learningCycle[u.id].closure={pending:state.pendingCompletion,score,attempts:state.pos,errors:state.errors};const old=profile.unitBest[u.id]||{score:0};if(score>old.score)profile.unitBest[u.id]={score,date:Date.now(),attempts:state.pos};const best=profile.unitBest[u.id]?.score||score,stars=starsForScore(best);queueSave();show('resultView');$('resultIcon').textContent=passed?'🏆':'🌱';$('resultTitle').textContent=passed?'¡Misión cumplida!':'Esta idea merece otra vuelta';$('resultText').textContent=passed?(finalUnlocked()?'¡Superaste las 10 etapas! Ya puedes abrir la Misión Final desde el mapa.':`Resolviste correctamente ${score}% de los primeros intentos de esta ronda. Completa la revisión breve de abajo para cerrar la etapa y continuar.`):`Obtuviste ${score}%. Necesitas ${PASS_SCORE}% para avanzar. Revisa las ideas señaladas antes de iniciar otra ronda; las preguntas ya vistas siguen siendo práctica, no evidencia nueva de competencia.`;$('resultStars').innerHTML=`<span>${starText(stars)}</span><b>${stars===3?'¡Misión estelar!':stars===2?'¡Buen trabajo!':stars===1?'¡Etapa superada!':'Vuelve por tu primera estrella'}</b>`;$('resultScore').textContent=`${score}%`;$('resultAttempts').textContent=state.pos;$('resultErrors').textContent=state.errors;$('retryBtn').textContent=passed?'Practicar otra vez':'Repetir etapa';renderLearningClosure(u,score);loadRanking()
}
function recordLearningRound(){
 if(!state||state.unitIndex===null||state.unitIndex===undefined)return;
 const u=bank.units[state.unitIndex];profile.learningCycle||={};const cycle=profile.learningCycle[u.id]||{};
 profile.learningCycle[u.id]={...cycle,practiceAt:Date.now(),mode:state.mode,responses:state.responses||[],needsReview:[...new Set((state.responses||[]).filter(x=>!x.correct&&!x.repeat).map(x=>x.readingRef).filter(Boolean))]};
 logInteraction({event_type:'learning_cycle_practice',module_key:moduleKey,item_id:u.id,payload:profile.learningCycle[u.id]});
}
function renderLearningClosure(u,score){
 let box=$('learningClosure');if(!box){box=document.createElement('section');box.id='learningClosure';$('resultView').querySelector('.result-card').append(box)}
 box.hidden=false;const cycle=profile.learningCycle?.[u.id]||{},refs=new Set(cycle.needsReview||[]),ideas=(u.reading?.keyIdeas||[]).filter(i=>refs.has(i.id));
 box.innerHTML=`<h2>Cierra lo aprendido</h2><p>${ideas.length?'Revisa estas ideas antes de otra ronda:':'La práctica terminó. El siguiente paso es aplicar lo aprendido a otra situación.'}</p>${ideas.map(i=>`<article><strong>${esc(i.title)}</strong><p>${esc(i.text)}</p></article>`).join('')}<p>¿Qué decisión tomarás para continuar? No es una nota: elige lo que necesitas.</p>${['Releer la explicación de la idea que confundí.','Comparar mi respuesta con la solución explicada.','Practicar otro caso usando la misma estrategia.','Aplicar lo aprendido en un reto de PRISMA.'].map((t,i)=>`<button class="secondary-btn" data-close="${i}">${String.fromCharCode(65+i)}. ${t}</button>`).join('')}<p id="closureStatus"></p>`;
 box.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>{cycle.reflection={choice:Number(b.dataset.close),at:Date.now()};if(cycle.closure)cycle.closure.pending=false;profile.learningCycle[u.id]=cycle;logInteraction({event_type:'learning_cycle_reflection',module_key:moduleKey,item_id:u.id,payload:{...cycle.reflection,score}});if(state.pendingCompletion&&!isDone(u.id)){profile.completedMissions.push(u.id);profile.xp+=50;state.pendingCompletion=false;celebrate('mission')}$('closureStatus').textContent=score>=PASS_SCORE?'Etapa cerrada. Ya puedes continuar desde el mapa.':'Decisión guardada. Revisa la explicación y vuelve a practicar cuando estés preparado.';queueSave();box.querySelectorAll('[data-close]').forEach(x=>x.disabled=true);loadRanking()});
}
function restoreLearningClosure(index){
 const u=bank.units[index],c=profile.learningCycle?.[u.id]?.closure;if(!c?.pending)return false;
 state={mode:'unit',unitIndex:index,finished:true,pendingCompletion:true,pos:c.attempts,errors:c.errors};
 show('resultView');$('resultIcon').textContent='🧭';$('resultTitle').textContent='Retoma el cierre de tu etapa';$('resultText').textContent='Tu práctica está guardada. Elige cómo continuar para cerrar la etapa sin repetir la ronda.';$('resultScore').textContent=c.score+'%';$('resultAttempts').textContent=c.attempts;$('resultErrors').textContent=c.errors;$('resultStars').innerHTML='';$('retryBtn').textContent='Revisar cierre';renderLearningClosure(u,c.score);return true;
}
function learningOrientation(u){
 profile.learningCycle||={};profile.learningCycle[u.id]={...(profile.learningCycle[u.id]||{}),lessonOpenedAt:Date.now()};
 const missed=(profile.diagnostics?.[u.id]?.responses||[]).filter(x=>x.correct!==true),refs=new Set(missed.map(x=>x.readingRef)),ideas=(u.reading?.keyIdeas||[]).filter(x=>refs.has(x.id));
 let box=$('learningOrientation');if(!box){box=document.createElement('aside');box.id='learningOrientation';$('readingContext').before(box)}
 box.innerHTML=`<strong>Tu recorrido en esta etapa</strong><p>Explora lo que sabes → comprende el ejemplo → practica con retroalimentación → revisa lo aprendido → aplica en otro caso.</p><p>${ideas.length?'Tu exploración inicial sugiere revisar: '+ideas.map(x=>esc(x.title)).join(', '):'Usa el ejemplo para explicar el porqué de cada decisión; acertar por memoria no es el objetivo.'}</p>`;
 $('startQuizBtn').textContent=`Comenzar ${ADAPTIVE_MICRO?ADAPTIVE_BASE:UNIT_BASE} preguntas${CASE_MODULE?' ABCD en casos conectados':''} →`;
 if(CASE_MODULE){$('miniLab').classList.add('hidden');$('learningCycle').innerHTML='<h3>Una decisión, cuatro habilidades</h3><p>Las preguntas ABCD de cada caso siguen comprensión, diseño, justificación y verificación. Al terminar elegirás cómo continuar tu aprendizaje. Las barras de competencia se valoran aparte, en los retos argumentados.</p>'}
 queueSave();
}
// PRISMA: Carga el registro local de resultados para mostrar progreso comparativo.
function loadRanking(){const list=$('rankingList');const a=accuracy();list.innerHTML=`<div class="rank-row personal-only"><strong>✦</strong><span><b>${esc(session.code)}</b><br><small>Grado ${esc(session.grade)}</small></span><span>${completedUnitsCount()}/10</span><strong>${profile.xp} XP · ${a===null?'—':a+'%'}</strong></div><p class="muted">Sin ranking público. El progreso se conserva por código de participante.</p>`;$('syncStatus').textContent='Solo local'}
// PRISMA: Muestra mensajes breves en los modulos.
function toast(t){$('toast').textContent=t;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2200)}
// PRISMA: Inicializa el modulo curricular seleccionado desde la URL.
async function init(){await window.PRISMA_ADAPTIVE.policyReady;session=readSession();if(!session){location.replace('../../index.html');return}await window.PRISMA_RESEARCH?.start?.();session=window.PRISMA_RESEARCH?.readSession?.()||session;const db=storage();let local=db[playerId()]||null;const remote=await localGet(`/api/module_state?participant_code=${encodeURIComponent(session.code)}&module_key=${encodeURIComponent(moduleKey)}`);if(remote?.state&&(!local||(Number(remote.state.updatedAt)||0)>(Number(local.updatedAt)||0))){local=remote.state;db[playerId()]=local;writeStorage(db)}profile=normalizeProfile(local);saveLocal();if(!remote?.state||((Number(profile.updatedAt)||0)>(Number(remote.state.updatedAt)||0)))localApi('/api/module_state',{participant_code:session.code,grade:session.grade,module_key:moduleKey,state:profile});document.title=`${cfg.title} · PRISMA`;applyModuleTheme();renderWorldDecor();$('userName').textContent=session.code;$('userCourse').textContent=`Grado ${session.grade}`;renderHome();loadRanking();const pendingIndex=bank.units.findIndex(u=>profile.learningCycle?.[u.id]?.closure?.pending);if(pendingIndex>=0&&!ADAPTIVE_MICRO&&restoreLearningClosure(pendingIndex))return;if(profile.activeRound&&!profile.activeRound.finished){state=profile.activeRound;if(state.answered)state.pos++;renderQuestion();if(!state.finished)show('quizView');toast('Retomaste la ronda guardada.');return}const requested=Number(queryParams.get('unit'));if(ADAPTIVE_MICRO&&Number.isInteger(requested)&&requested>=0&&requested<bank.units.length)setTimeout(()=>openLesson(requested),80)}
$('lessonBack').onclick=renderHome;$('startQuizBtn').onclick=startQuiz;$('finalBack').onclick=renderHome;$('startFinalBtn').onclick=startFinalChallenge;$('quitQuizBtn').onclick=()=>{if(confirm('¿Pausar esta ronda? Se conservará para retomarla al volver al módulo.'))renderHome()};$('continueBtn').onclick=nextQuestion;$('resultHomeBtn').onclick=()=>state?.mode==='adaptiveMicro'?location.href='../adaptive/index.html':renderHome();$('retryBtn').onclick=()=>state?.mode==='final'?openFinalSummary():state?.mode==='adaptiveMicro'?openLesson(state.unitIndex):openLesson(state.unitIndex);$('backpackBtn').onclick=openBackpack;$('backpackClose').onclick=closeBackpack;$('backpackModal').onclick=e=>{if(e.target===$('backpackModal'))closeBackpack()};document.addEventListener('keydown',e=>{if(e.key==='Escape')closeBackpack()});window.addEventListener('prisma-adaptive-updated',renderAdaptiveModuleCard);
init();
})();
