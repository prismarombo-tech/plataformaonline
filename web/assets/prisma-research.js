// PRISMA: Tiempo visible, eventos y cierre de sesion sin perder el ultimo intervalo.
(function(){
'use strict';
const SESSION_KEY='prismaHubSessionV1',RID_KEY='prismaResearchSessionV240';
let timer=null,last=Date.now(),wasVisible=document.visibilityState==='visible',starting=null,ending=null;
function read(){try{return JSON.parse(sessionStorage.getItem(SESSION_KEY)||'null')}catch{return null}}
function hdr(s){return {'Content-Type':'application/json',...(s?.studentToken?{'X-PRISMA-Student-Token':s.studentToken}:{})}}
async function post(path,obj,keepalive=false){const s=read();if(!s||location.protocol==='file:')return null;try{const r=await fetch(path,{method:'POST',headers:hdr(s),body:JSON.stringify(obj),keepalive});return r.ok?await r.json().catch(()=>({ok:true})):null}catch{return null}}
function takeVisible(){const now=Date.now(),visible=wasVisible?Math.max(0,Math.min(60000,now-last)):0;last=now;wasVisible=document.visibilityState==='visible';return visible}
function start(confirmedSessionId){
  if(starting)return starting;
  starting=(async()=>{
    const s=read();if(!s)return null;
    const out=confirmedSessionId?{session_id:confirmedSessionId}:await post('/api/research/session/start',{participant_code:s.code,grade:s.grade,session_id:sessionStorage.getItem(RID_KEY)||''});
    const current=read();
    if(out?.session_id&&current?.code===s.code&&current?.studentToken===s.studentToken){
      sessionStorage.setItem(RID_KEY,out.session_id);current.researchSessionId=out.session_id;
      sessionStorage.setItem(SESSION_KEY,JSON.stringify(current));last=Date.now();wasVisible=document.visibilityState==='visible';ending=null;
      if(!timer)timer=setInterval(heartbeat,30000);
    }
    return current;
  })().finally(()=>{starting=null});
  return starting;
}
async function heartbeat(keepalive=false){
  if(ending)return;
  const s=read(),rid=sessionStorage.getItem(RID_KEY),visible=takeVisible();
  if(!s||!rid||!visible)return;
  return post('/api/research/session/heartbeat',{participant_code:s.code,session_id:rid,visible_ms:visible},keepalive===true);
}
function event(type,payload={}){const s=read();if(!s)return;return post('/api/research/event',{participant_code:s.code,session_id:sessionStorage.getItem(RID_KEY)||s.researchSessionId||'',event_type:type,payload})}
function end(){
  if(ending)return ending;
  clearInterval(timer);timer=null;
  const s=read(),rid=sessionStorage.getItem(RID_KEY),visible=takeVisible();
  if(!s||!rid)return Promise.resolve(null);
  ending=post('/api/research/session/end',{participant_code:s.code,session_id:rid,visible_ms:visible},true);
  return ending;
}
window.PRISMA_RESEARCH={start,heartbeat,event,end,readSession:read,sessionId:()=>sessionStorage.getItem(RID_KEY)||''};
document.addEventListener('visibilitychange',()=>heartbeat(true));
window.addEventListener('pagehide',end);
window.addEventListener('pageshow',e=>{if(e.persisted)start()});
})();
