/* Transport for GitHub Pages -> Google Apps Script. Credentials travel in POST bodies. */
(()=>{'use strict';
 const config=window.PRISMA_ONLINE_CONFIG||{},originalFetch=window.fetch.bind(window);
 if(config.backend!=='apps-script')return;
 const configured=/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(config.url||'');
 function error(message,status=503){return new Response(JSON.stringify({detail:message}),{status,headers:{'Content-Type':'application/json'}});}
 function notice(){if(configured)return;const box=document.createElement('div');box.setAttribute('role','status');box.style.cssText='padding:16px;background:#fff3cf;color:#493510;font:16px system-ui;text-align:center;position:relative;z-index:10000';box.textContent='PRISMA está en preparación. Falta conectar Google Apps Script; los accesos y el guardado todavía no están disponibles.';document.body.prepend(box);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',notice);else notice();
 let queue=Promise.resolve();
 window.fetch=function(input,options={}){
  const url=new URL(typeof input==='string'?input:input.url,location.href),prefix=window.PRISMA_BASE_PATH||'/',path=url.pathname.startsWith(prefix+'api/')?url.pathname.slice(prefix.length-1):url.pathname;
  if(url.origin!==location.origin||!(path.startsWith('/api/')||path==='/health'))return originalFetch(input,options);
  if(!configured)return Promise.resolve(error('El responsable debe conectar Google Apps Script antes de usar la plataforma.'));
  const job=async()=>{
   if(options.signal?.aborted)throw new DOMException('Solicitud cancelada','AbortError');
   const headers=new Headers(options.headers||(input instanceof Request?input.headers:undefined));let payload={};
   try{payload=options.body?JSON.parse(options.body):{};}catch{return error('Solicitud inválida.',400);}
   const request={protocol:'prisma-gas-v1',request_id:crypto.randomUUID(),path,method:(options.method||'GET').toUpperCase(),query:Object.fromEntries(url.searchParams),payload,teacher_token:headers.get('X-PRISMA-Teacher-Token')||'',student_token:headers.get('X-PRISMA-Student-Token')||''};
   let packet;
   for(let attempt=0;attempt<2;attempt++){
    try{const response=await originalFetch(config.url,{method:'POST',redirect:'follow',credentials:'omit',headers:{'Content-Type':'text/plain;charset=UTF-8'},body:JSON.stringify(request),signal:options.signal});if(!response.ok)throw Error('Apps Script no respondió.');packet=await response.json();if(!Number.isInteger(packet.status))throw Error('Despliegue de Apps Script inválido.');break;}catch(e){if(options.signal?.aborted||attempt)throw e;}
   }
   const data=packet.data;if(packet.status!==200)return error(data?.detail||'No se confirmó la operación.',packet.status);
   if(data?.file){const f=data.file,body=f.base64?Uint8Array.from(atob(f.base64),c=>c.charCodeAt(0)):f.text;return new Response(body,{headers:{'Content-Type':f.mime}});}
   if(path==='/api/generate_stream')return new Response(data.answer||'',{headers:{'Content-Type':'text/plain;charset=utf-8'}});
   if(path.endsWith('_stream')){const text=data.mission?.raw_text||data.answer||'',tokens=text.match(/[\s\S]{1,22}/g)||[],lines=tokens.map(text=>JSON.stringify({type:'token',text}));lines.push(JSON.stringify({type:'result',data}));return new Response(lines.join('\n')+'\n',{headers:{'Content-Type':'application/x-ndjson'}});}
   return new Response(JSON.stringify(data),{headers:{'Content-Type':'application/json'}});
  };
  const pending=queue.then(job);queue=pending.catch(()=>{});return pending;
 };
 window.PRISMA_LOAD_CLOUD_BANK=async function(module){const s=JSON.parse(sessionStorage.getItem('prismaHubSessionV1')||'null');const r=await fetch('/api/question_bank?module='+encodeURIComponent(module),{headers:{'X-PRISMA-Student-Token':s?.studentToken||''}});const data=await r.json();if(!r.ok)throw Error(data.detail||'No se pudo cargar el banco.');window.PRISMA_BANK_DATA=data.bank;};
})();
