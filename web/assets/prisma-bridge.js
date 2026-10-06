// PRISMA: Puente visual compartido entre modulos y el estado general de PRISMA.
// PRISMA: Los comentarios documentan el flujo; no cambian datos, rutas API ni comportamiento.

(() => {
  'use strict';

  const SESSION_KEY = 'prismaHubSessionV1';
  const HUB_PROFILE_KEY = 'prismaHubProfilesUnifiedOfflineV1';
  const modules = Array.isArray(window.PRISMA_MODULES) ? window.PRISMA_MODULES : [];
  const moduleMap = Object.fromEntries(modules.map(m => [m.key, m]));
  const phases = [{"key": "huevito", "name": "Fase 1 · Prismi Bebé", "min": 0, "next": 15}, {"key": "brote", "name": "Fase 2 · Prismi Explorador", "min": 15, "next": 30}, {"key": "aventurero", "name": "Fase 3 · Prismi Constructor", "min": 30, "next": 45}, {"key": "explorador", "name": "Fase 4 · Prismi Creador digital", "min": 45, "next": 60}, {"key": "maestro", "name": "Fase 5 · Prismi Científico", "min": 60, "next": 100}, {"key": "innovador", "name": "Fase 6 · Prismi Innovador", "min": 100, "next": null}];
  const personalities={
    auto:{name:'Automática',emoji:'✨',className:'prisma-mood-curious'},alegre:{name:'Alegre',emoji:'☀️',className:'prisma-mood-happy'},
    timido:{name:'Tímido',emoji:'💗',className:'prisma-mood-shy'},curioso:{name:'Curioso',emoji:'🔎',className:'prisma-mood-curious'},
    valiente:{name:'Valiente',emoji:'🛡️',className:'prisma-mood-brave'},dormilon:{name:'Dormilón',emoji:'💤',className:'prisma-mood-sleepy'},
    travieso:{name:'Travieso',emoji:'⚡',className:'prisma-mood-playful'},sabio:{name:'Sabio',emoji:'🎓',className:'prisma-mood-wise'}
  };

  // PRISMA: Funcion 'readJson' encargada de una tarea especifica de esta pantalla.
  function readJson(key){try{return JSON.parse(localStorage.getItem(key)||'null')}catch{return null}}
  // PRISMA: Funcion 'session' encargada de una tarea especifica de esta pantalla.
  function session(){try{return JSON.parse(sessionStorage.getItem(SESSION_KEY)||'null')}catch{return null}}
  // PRISMA: Obtiene el codigo de participante activo para la Ruta Adaptativa.
  function participantId(){return String(session()?.code||'default').trim().toLowerCase().replace(/[^a-z0-9_-]+/g,'-')}
  // PRISMA: Funcion 'moduleStats' encargada de una tarea especifica de esta pantalla.
  function moduleStats(key){const cfg=moduleMap[key];if(!cfg)return{completed:0,percent:0,attempts:0,correct:0,bestStreak:0};const db=readJson(cfg.storageKey)||{};const p=db[participantId()]||{};const completed=Array.isArray(p.completedMissions)?p.completedMissions.length:0;return{completed,percent:Math.round((Math.min(cfg.total,completed)+(p.finalPassed?1:0))/(cfg.total+1)*100),attempts:Number(p.attempts)||0,correct:Number(p.correct)||0,bestStreak:Number(p.bestStreak)||0}}
  // PRISMA: Selecciona la etapa visual correspondiente al porcentaje de avance.
  function phaseFor(percent){return [...phases].reverse().find(p=>percent>=p.min)||phases[0]}
  // PRISMA: Funcion 'automaticPersonality' encargada de una tarea especifica de esta pantalla.
  function automaticPersonality(stats){const accuracy=stats.attempts?Math.round(stats.correct/stats.attempts*100):null;if(stats.percent>=75)return'sabio';if(stats.attempts>=12&&accuracy!==null&&accuracy<60)return'valiente';if(stats.completed===0)return'curioso';if(stats.bestStreak>=10)return'travieso';if(stats.percent<20)return'alegre';if(stats.percent<50)return'curioso';return'valiente'}
  // PRISMA: Funcion 'chosenPersonality' encargada de una tarea especifica de esta pantalla.
  function chosenPersonality(moduleKey,stats){const profile=(readJson(HUB_PROFILE_KEY)||{})[participantId()]||{};const p=profile.modulePersonalities?.[moduleKey]||'auto';return p==='auto'?automaticPersonality(stats):(personalities[p]?p:'curioso')}

  // PRISMA: Funcion 'createMascot' encargada de una tarea especifica de esta pantalla.
  function createMascot(){if(document.getElementById('prismaModuleMascot'))return;const box=document.createElement('aside');box.id='prismaModuleMascot';box.className='prisma-module-mascot';box.innerHTML=`<div class="prisma-module-mascot-aura"></div><img id="prismaModuleMascotImage" src="../../assets/prismi/huevito.svg" alt="Mascota PRISMA"><div class="prisma-module-mascot-copy"><strong id="prismaModuleMascotTitle">Mascota del módulo</strong><span id="prismaModuleMascotStage">Prismi Bebé · 0%</span><div class="prisma-module-mascot-track"><i id="prismaModuleMascotBar"></i></div><small id="prismaModuleMascotHint">Aprendizaje adaptativo local.</small></div>`;document.body.appendChild(box)}
  // PRISMA: Funcion 'updateMascot' encargada de una tarea especifica de esta pantalla.
  function updateMascot(){const key=document.body?.dataset?.prismaModule,cfg=moduleMap[key],box=document.getElementById('prismaModuleMascot');if(!cfg||!box)return;const stats=moduleStats(key),phase=phaseFor(stats.percent),personality=personalities[chosenPersonality(key,stats)]||personalities.curioso;const img=document.getElementById('prismaModuleMascotImage');img.src=`../../assets/prismi/${phase.key}.svg`;img.className=personality.className;document.getElementById('prismaModuleMascotTitle').textContent=`${cfg.icon} Mascota de ${cfg.short}`;document.getElementById('prismaModuleMascotStage').textContent=`${personality.emoji} ${phase.name} · ${stats.percent}%`;document.getElementById('prismaModuleMascotBar').style.width=`${stats.percent}%`;const adaptive=window.PRISMA_ADAPTIVE?.summary(participantId());document.getElementById('prismaModuleMascotHint').textContent=adaptive?`Foco: ${adaptive.focus.dimensionLabel}.`:'Progreso guardado localmente.'}
  // PRISMA: Funcion 'start' encargada de una tarea especifica de esta pantalla.
  function start(){if(!session()?.code)return;createMascot();updateMascot();window.addEventListener('storage',updateMascot);window.addEventListener('prisma-adaptive-updated',updateMascot);window.addEventListener('focus',updateMascot)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
