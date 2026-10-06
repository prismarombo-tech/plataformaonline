// Small, on-demand learning guide shared by student pages.
(() => {
  'use strict';
  const host=document.createElement('div');host.id='prismiGuide';
  const shadow=host.attachShadow({mode:'open'});
  shadow.innerHTML=`<style>
    :host{position:fixed;left:max(12px,env(safe-area-inset-left));bottom:max(12px,env(safe-area-inset-bottom));z-index:1100;font:14px/1.45 system-ui,sans-serif;color:#20324b}
    :host([hidden]),[hidden]{display:none!important}*{box-sizing:border-box}
    button,a{font:inherit}button{cursor:pointer}button:focus-visible,a:focus-visible{outline:3px solid #6557ed;outline-offset:3px}
    #mascot{width:62px;height:62px;border:2px solid #c7c1ff;border-radius:50%;background:#fff;box-shadow:0 3px 15px #19204433;padding:3px;display:block}
    #mascot img{width:100%;height:100%;object-fit:contain}#mascot:disabled{cursor:wait;opacity:.75}
    section{width:min(300px,calc(100vw - 24px));max-height:min(410px,calc(100dvh - 100px));overflow:auto;background:#fff;border:1px solid #d8d2f2;border-radius:18px;padding:16px;box-shadow:0 6px 30px #20253c33;margin-bottom:10px;overflow-wrap:anywhere}
    header{display:flex;align-items:center;justify-content:space-between;gap:12px}h2{font-size:16px;margin:0}#close{border:0;background:#f1eefb;border-radius:50%;width:30px;height:30px;color:#20324b}
    ol{padding-left:22px;margin:12px 0}li{margin:7px 0}a{color:#493aa4}p{margin:10px 0}small{display:block;color:#626b7b;font-size:11px}
  </style><section hidden aria-label="Consejo de Prismi"><header><h2>Tu siguiente paso</h2><button id="close" aria-label="Cerrar consejo">×</button></header><ol></ol><p id="tip" role="status" aria-live="polite"></p><small id="source"></small></section><button id="mascot" aria-label="Prismi: recomendar mi ruta de aprendizaje" aria-expanded="false" title="Pulsa para ver tu ruta y un consejo"><img src="/assets/prismi/explorador.svg" alt="Prismi"></button>`;
  document.body.append(host);
  const $=s=>shadow.querySelector(s),button=$('#mascot'),panel=$('section');let busy=false,controller=null;
  function session(){try{return JSON.parse(sessionStorage.getItem('prismaHubSessionV1')||'null')}catch{return null}}
  function close(){panel.hidden=true;button.setAttribute('aria-expanded','false')}
  $('#close').onclick=()=>{close();button.focus()};host.addEventListener('keydown',e=>{if(e.key==='Escape'){close();button.focus()}});
  function visibility(){const s=session();host.hidden=!s?.code||!s?.verified;if(host.hidden){controller?.abort();close()}}
  visibility();setInterval(visibility,1000);
  const tips={problem:'Identifica la pregunta y los datos antes de responder.',solution:'Compara dos opciones y escribe por qué eliges una.',context:'Apoya tu decisión con un dato del caso.',check:'Cambia un dato y comprueba si tu respuesta sigue funcionando.'};
  button.onclick=async()=>{
    if(busy)return;const s=session();if(!s?.verified)return;
    busy=true;button.disabled=true;panel.hidden=false;button.setAttribute('aria-expanded','true');$('#source').textContent='';$('ol').replaceChildren();$('ol').hidden=true;
    const id=String(s.code).toLowerCase().replace(/[^a-z0-9_-]+/g,'-');
    await window.PRISMA_ADAPTIVE?.policyReady;const summary=window.PRISMA_ADAPTIVE?.summary(id),modules=window.PRISMA_MODULES||[];
    const route=(summary?.route||[]).slice(0,2).map(step=>({step,module:modules.find(m=>m.key===step.moduleKey)})).filter(x=>x.module);
    const initial=!(summary?.model?.missionCount>0);
    function link(label,url){const li=document.createElement('li'),a=document.createElement('a');a.textContent=label;a.href=url;li.append(a);$('ol').append(li)}
    if(initial)link('Empieza con tu reto adaptativo','/modules/adaptive/index.html');
    for(const {step,module} of route.slice(0,initial?1:2)){const unit=Math.max(0,Math.min(9,Number(step.unitIndex)||0));const url=new URL('/'+module.path,location.origin);url.searchParams.set('adaptive','1');url.searchParams.set('unit',unit);link(`${module.short} · etapa ${unit+1}`,url.href)}
    if(!initial)link('Vuelve al reto y aplica lo aprendido','/modules/adaptive/index.html');
    const focus=summary?.focus?.dimension||'problem';$('#tip').textContent='Prismi está pensando…';const reason=summary?.focus?.mode==='extension'?'Puedes profundizar; prueba otra situación.':summary?.focus?.mode==='diagnostic'?'Primero necesitamos observar tu razonamiento.':`Prioridad: ${summary?.focus?.dimensionLabel||'comprender el problema'}.`;let why=$('#why');if(!why){why=document.createElement('p');why.id='why';$('ol').before(why)}why.textContent=reason;
    controller=new AbortController();const timer=setTimeout(()=>controller?.abort(),45000);
    try{
      const response=await fetch('/api/prismi_tip',{method:'POST',headers:{'Content-Type':'application/json',...(s.studentToken?{'X-PRISMA-Student-Token':s.studentToken}:{})},signal:controller.signal,body:JSON.stringify({participant_code:s.code,focus,route:route.map(({step,module})=>({module:module.short,stage:(Number(step.unitIndex)||0)+1}))})});
      if(session()?.code!==s.code)return;
      if([401,403,423].includes(response.status)){ $('ol').replaceChildren();$('#tip').textContent=response.status===423?'Completa primero el instrumento del estudio sin ayuda.':'Vuelve a iniciar sesión para consultar tu ruta.';return;}
      if(!response.ok)throw Error('unavailable');const data=await response.json();
      $('ol').hidden=false;$('#tip').textContent=data.tip||tips[focus]||tips.problem;$('#source').textContent=data.source==='gemma-local'?'Consejo de Gemma · pulsa Prismi para actualizar':'Consejo predeterminado · pulsa Prismi para actualizar';
    }catch{if(session()?.code===s.code){$('#tip').textContent=tips[focus]||tips.problem;$('#source').textContent='Consejo predeterminado · revisa tu conexión';}}
    finally{clearTimeout(timer);controller=null;busy=false;button.disabled=false;visibility()}
  };
})();
