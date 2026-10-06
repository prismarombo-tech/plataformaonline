import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { gzipSync, gunzipSync } from 'node:zlib';
const root=path.resolve(import.meta.dirname,'..'),src=path.join(root,'web'),out=path.join(root,'_site');
const base=process.env.PRISMA_BASE_PATH||'/plataformaonline/';
if(!/^\/[A-Za-z0-9_-]+\/$/.test(base))throw Error('Invalid project base path');
fs.mkdirSync(out,{recursive:true});
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(x=>x.isDirectory()?walk(path.join(dir,x.name)):[path.join(dir,x.name)]);}
for(const file of walk(src)){
 const relative=path.relative(src,file),dest=path.join(out,relative);fs.mkdirSync(path.dirname(dest),{recursive:true});
 if(!/\.(html|js|css)$/.test(file)){fs.copyFileSync(file,dest);continue;}
 let text=fs.readFileSync(file,'utf8');
 // Rewrite application-root asset/navigation paths; API routes use the transport.
 text=text.replace(/(["'`(])\/(assets|modules|data|legal)\//g,(_,q,part)=>q+base+part+'/');
 if(file.endsWith('.html')){
  text=text.replace(/<head>/i,'<head>\n<script>window.PRISMA_BASE_PATH='+JSON.stringify(base)+';</script><script src="'+base+'online-config.js"></script><script src="'+base+'assets/prisma-cloud.js"></script>');
  if(relative.replaceAll('\\','/')==='modules/learn/index.html'){
   const marker='  <script src="../../assets/prisma-bank-enhancer.js',start=text.indexOf(marker),end=text.indexOf('</body>',start);if(start<0||end<0)throw Error('Learning bootstrap changed');
   const scripts=[...text.slice(start,end).matchAll(/<script src="([^"]+)"[^>]*><\/script>/g)].map(m=>m[1]);
   text=text.slice(0,start)+'<script>(async()=>{try{const key=new URLSearchParams(location.search).get("module");await window.PRISMA_LOAD_CLOUD_BANK(key);for(const url of '+JSON.stringify(scripts)+'){await new Promise((ok,no)=>{const s=document.createElement("script");s.src=url;s.onload=ok;s.onerror=no;document.body.appendChild(s);});}}catch(e){document.getElementById("loadingView").textContent=e.message||"No se pudo cargar el módulo. Revisa la conexión.";}})();</script>'+text.slice(end);
  }
 }
 fs.writeFileSync(dest,text);
}
fs.writeFileSync(path.join(out,'.nojekyll'),'');
// Embed unchanged instruments and original question banks in the Apps Script package.
const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(src,'assets/prisma-modules.js'),'utf8'),context);
const banks={};for(const file of fs.readdirSync(path.join(src,'data/modules')).filter(f=>f.endsWith('.js'))){const c={window:{}};vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(src,'data/modules',file),'utf8'),c);banks[c.window.PRISMA_BANK_DATA.moduleKey]=c.window.PRISMA_BANK_DATA;}
const feedback={window:{}};vm.createContext(feedback);vm.runInContext(fs.readFileSync(path.join(src,'assets/prisma-digital-feedback.js'),'utf8'),feedback);
const files=walk(src).filter(f=>/\.(html|js|css|json)$/.test(f));const hash=crypto.createHash('sha256');for(const file of files.sort())hash.update(fs.readFileSync(file));for(const file of walk(path.join(root,'apps-script')).filter(f=>f.endsWith('.gs')&&!f.endsWith('Data.gs')).sort())hash.update(fs.readFileSync(file));
const values={RELEASE_HASH:hash.digest('hex'),MISSIONS:JSON.parse(fs.readFileSync(path.join(root,'online_missions.json'),'utf8')),CATALOG:JSON.parse(fs.readFileSync(path.join(root,'study_catalog.json'),'utf8')),BANKS:banks,MODULES:context.window.PRISMA_MODULES,PLANS:feedback.window.PRISMA_DIGITAL_PLANS};
fs.writeFileSync(path.join(root,'apps-script/Data.gs'),Object.entries(values).map(([k,v])=>'const '+k+'='+JSON.stringify(v)+';').join('\n'));
fs.mkdirSync(path.join(root,'deployment'),{recursive:true});
const serialized=JSON.stringify(values),packed=gzipSync(serialized);
if(gunzipSync(packed).toString('utf8')!==serialized)throw Error('Deployment data round-trip failed');
const bootstrap='const PRISMA_DATA=JSON.parse(Utilities.ungzip(Utilities.newBlob(Utilities.base64Decode('+JSON.stringify(packed.toString('base64'))+'),"application/gzip")).getDataAsString("UTF-8"));\n'+Object.keys(values).map(k=>'const '+k+'=PRISMA_DATA.'+k+';').join('\n');
fs.writeFileSync(path.join(root,'deployment/PRISMA.gs'),[bootstrap,...['Store.gs','Core.gs','Study.gs','Tools.gs'].map(f=>fs.readFileSync(path.join(root,'apps-script',f),'utf8'))].join('\n'));
fs.copyFileSync(path.join(root,'apps-script/appsscript.json'),path.join(root,'deployment/appsscript.json'));
console.log('Built GitHub Pages at '+out+'; '+Object.keys(banks).length+' banks; '+values.MISSIONS.length+' missions.');
