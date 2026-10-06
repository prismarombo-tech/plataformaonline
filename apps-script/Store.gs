/* Private transactional state in Google Sheets. Run setupPrisma from the editor. */
const APP_VERSION='1.1.0-pages.1';
function props_(){return PropertiesService.getScriptProperties();}
function hash_(s){return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,String(s),Utilities.Charset.UTF_8).map(b=>('0'+((b+256)%256).toString(16)).slice(-2)).join('');}
function id_(){return Utilities.getUuid().replace(/-/g,'');}
function now_(){return new Date().toISOString();}
function fail_(message,status){const e=new Error(message);e.status=status||400;throw e;}
function need_(ok,message,status){if(!ok)fail_(message,status);}
function clone_(x){return JSON.parse(JSON.stringify(x));}
function sheet_(){const sid=props_().getProperty('PRISMA_SHEET_ID');need_(sid,'Falta PRISMA_SHEET_ID en las propiedades del proyecto.',503);return SpreadsheetApp.openById(sid);}
function blank_(){return {version:APP_VERSION,accounts:{},tokens:{},states:{},modules:{},profiles:{},missions:[],attempts:[],events:[],sessions:{},instruments:{},responses:[],reviews:[],documents:[],banks:{},backups:{},people:{},records:[],assignments:[],scores:[],releases:{},cohorts:[],drafts:{},operations:{},config:{enabled:false,locked:false,phase:'pilot'},policy:{version:'3.2-pilot',minTasks:3,minSessions:2,minIndependent:2,minTransfer:1,minLevel:3}};}
function load_(){
 const s=sheet_(),control=s.getSheetByName('_PRISMA_GAS');need_(control,'Ejecuta setupPrisma desde Apps Script.',503);
 const pointer=String(control.getRange('A1').getValue());if(pointer==='EMPTY')return blank_();
 const p=JSON.parse(pointer),tab=s.getSheetByName(p.slot),rows=tab.getRange(1,1,p.chunks,1).getValues();
 const encoded=rows.map(r=>{need_(String(r[0]).startsWith('b64:'),'Copia de datos incompleta.',503);return String(r[0]).slice(4);}).join('');
 need_(hash_(encoded)===p.hash,'La verificación de la copia de datos falló. No se sobrescribirá.',503);
 return JSON.parse(Utilities.ungzip(Utilities.newBlob(Utilities.base64Decode(encoded),'application/gzip')).getDataAsString('UTF-8'));
}
function save_(db){
 const raw=JSON.stringify(db);need_(raw.length<12000000,'El piloto alcanzó el límite de almacenamiento de esta edición. Exporta y revisa su capacidad.',507);
 const encoded=Utilities.base64Encode(Utilities.gzip(Utilities.newBlob(raw,'application/json')).getBytes());
 need_(encoded.length<6000000,'La copia supera la capacidad prevista para este piloto.',507);
 const s=sheet_(),control=s.getSheetByName('_PRISMA_GAS'),old=String(control.getRange('A1').getValue());
 const previous=old==='EMPTY'?null:JSON.parse(old),slot=previous&&previous.slot==='_PRISMA_GAS_A'?'_PRISMA_GAS_B':'_PRISMA_GAS_A';
 const tab=s.getSheetByName(slot),rows=encoded.match(/.{1,40000}/g).map(x=>['b64:'+x]);
 if(tab.getMaxRows()<rows.length)tab.insertRowsAfter(tab.getMaxRows(),rows.length-tab.getMaxRows());
 tab.getRange(1,1,rows.length,1).setValues(rows);SpreadsheetApp.flush();
 const read=tab.getRange(1,1,rows.length,1).getValues().map(r=>String(r[0]).slice(4)).join('');
 need_(hash_(read)===hash_(encoded),'No se confirmó la escritura. Intenta de nuevo.',503);
 const pointer=JSON.stringify({slot,chunks:rows.length,hash:hash_(encoded),revision:id_(),at:now_()});
 try{control.getRange('A1').setValue(pointer);SpreadsheetApp.flush();}catch(e){if(String(control.getRange('A1').getValue())!==pointer)throw e;}
}
function setupPrisma(){
 const lock=LockService.getScriptLock();lock.waitLock(30000);
 try{
  const p=props_(),password=p.getProperty('PRISMA_TEACHER_PASSWORD');need_(password&&password.length>=12,'Configura una contraseña docente de al menos 12 caracteres en las propiedades.');
  if(!p.getProperty('PRISMA_AUTH_SALT'))p.setProperty('PRISMA_AUTH_SALT',id_()+id_());
  p.setProperty('PRISMA_TEACHER_HASH',hash_(p.getProperty('PRISMA_AUTH_SALT')+password));p.deleteProperty('PRISMA_TEACHER_PASSWORD');
  const s=sheet_();for(const name of ['_PRISMA_GAS','_PRISMA_GAS_A','_PRISMA_GAS_B']){let t=s.getSheetByName(name);if(!t)t=s.insertSheet(name);t.hideSheet();}
  const ctl=s.getSheetByName('_PRISMA_GAS');if(!ctl.getRange('A1').getValue())ctl.getRange('A1').setValue('EMPTY');
  const db=load_();save_(db);return 'Configuración lista. Despliega la aplicación web y configura su URL en GitHub.';
 }finally{lock.releaseLock();}
}
function doGet(){return ContentService.createTextOutput(JSON.stringify({service:'PRISMA',version:APP_VERSION,configured:!!props_().getProperty('PRISMA_TEACHER_HASH')})).setMimeType(ContentService.MimeType.JSON);}
function doPost(e){
 let response;const lock=LockService.getScriptLock();let locked=false;
 try{
  need_(e&&e.postData&&e.postData.contents.length<6500000,'Solicitud demasiado grande.',413);
  const q=JSON.parse(e.postData.contents);need_(q&&q.protocol==='prisma-gas-v1','Protocolo inválido.');
  locked=lock.tryLock(25000);need_(locked,'El servidor está ocupado. Intenta nuevamente.',503);
  const db=load_(),fp=hash_(JSON.stringify(q)),prior=db.operations[q.request_id];
  if(prior){need_(prior.fingerprint===fp,'Identificador de solicitud reutilizado.',409);if(!['/api/student/login','/api/teacher/login'].includes(q.path))authenticate_(db,q);response=prior.response;}
  else{
   const data=route_(db,q);response={status:200,data};
   if(q.method!=='GET'){
    need_(/^[a-zA-Z0-9_-]{16,80}$/.test(q.request_id||''),'Identificador de solicitud inválido.');
    const cutoff=Date.now()-3600000;for(const k of Object.keys(db.operations))if(db.operations[k].at<cutoff)delete db.operations[k];
    if(JSON.stringify(response).length<300000)db.operations[q.request_id]={fingerprint:fp,response,at:Date.now()};
    save_(db);
   }
  }
 }catch(err){response={status:err.status||503,data:{detail:err.status?err.message:'No se confirmó la operación. Revisa la conexión o la configuración del servidor.'}};}
 finally{if(locked)lock.releaseLock();}
 return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}
