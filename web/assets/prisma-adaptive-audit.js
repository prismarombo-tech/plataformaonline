// Observe chosen support without interfering with navigation or saving student answers twice.
(()=>{'use strict';document.addEventListener('click',e=>{const a=e.composedPath().find(x=>x.tagName==='A')||e.target.closest('a');if(!a)return;let url;try{url=new URL(a.href,location.href)}catch{return}if(url.origin!==location.origin||url.searchParams.get('adaptive')!=='1')return;
 let s;try{s=JSON.parse(sessionStorage.getItem('prismaHubSessionV1')||'null')}catch{return}if(!s)return;
 const summary=window.PRISMA_ADAPTIVE?.summary(String(s.code).toLowerCase());
 window.PRISMA_EVIDENCE?.record({event_type:'adaptive_support_opened',module_key:url.searchParams.get('module'),unit_index:Number(url.searchParams.get('unit')||0),payload:{parent_mission_id:url.searchParams.get('mission')||'',focus:summary?.focus,route:summary?.route,policy:window.PRISMA_ADAPTIVE?.getPolicy()}});
 },true);})();
