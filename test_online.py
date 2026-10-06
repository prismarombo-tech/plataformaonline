import hashlib, json, os, sqlite3, uuid, unittest, threading, urllib.request, urllib.error
from pathlib import Path
TMP=Path(__file__).parent/'data'/('test-'+uuid.uuid4().hex)
TMP.mkdir(parents=True)
os.environ.update(PRISMA_DATA_DIR=str(TMP),PRISMA_STORAGE='local-demo',PRISMA_TEACHER_PASSWORD='test-only-long-password')
import server_online as server
from online_store import encode,decode,snapshot,restore,SheetsStore,StorageError

class OnlineTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):server.initialize()

    def test_forty_distinct_per_student_and_exhaustion(self):
        ids=[]
        for _ in range(40):
            out=server.engine.mission(server.app,{'participant_code':'A','grade':'8','focus':{'dimension':'check','complexity':'avanzado'}})
            ids.append(out['mission']['id'])
            self.assertEqual(out['mission']['focus_dimension'],'check')
            self.assertEqual(out['mission']['complexity'],'avanzado')
        self.assertEqual(len(set(ids)),40)
        with self.assertRaises(server.engine.BankExhausted):server.engine.mission(server.app,{'participant_code':'A'})
        self.assertEqual(server.engine.mission(server.app,{'participant_code':'B'})['remaining'],39)

    def test_written_bank(self):
        from prisma_written_missions import validate_written_mission
        self.assertEqual(len(server.engine.BANK),40)
        for m in server.engine.BANK:
            self.assertEqual(len(m['focus']),4)
            validate_written_mission(m)

    def test_roundtrip_complete_database(self):
        data=snapshot(server.app.DB)
        packed=[['sha256',hashlib.sha256(data).hexdigest()]]+[[i,x] for i,x in enumerate(encode(data))]
        self.assertEqual(data,decode(packed))
        path=TMP/'restored.db';restore(path,decode(packed))
        with sqlite3.connect(path) as a, sqlite3.connect(server.app.DB) as b:
            self.assertEqual(list(a.iterdump()),list(b.iterdump()))

    def test_no_fake_validated_grade(self):
        p={'participant_code':'FEEDBACK','answer':'porque datos solución verificar '*100,'mission':{}}
        out=server.engine.evaluate(server.app,p)
        self.assertTrue(out['provisional']);self.assertFalse(out['model_used']);self.assertFalse(out['scored'])
        self.assertNotIn('maqueta',out['feedback'])

    def test_formulas_remain_text(self):
        self.assertEqual(SheetsStore.cell('=IMPORTXML("bad")')['userEnteredValue'],{'stringValue':'=IMPORTXML("bad")'})

    def test_sheets_atomic_write_and_recovery(self):
        from online_store import VIEW_SQL
        class Response:
            status_code=200
            def __init__(self,value):self.value=value
            def json(self):return self.value
        class GoogleFake:
            def __init__(self):self.requests=[];self.rows=[['empty','']]
            def request(self,method,url,json=None,timeout=None):
                if method=='POST':
                    self.requests.append(json)
                    for item in json['requests']:
                        x=item.get('updateCells',{})
                        if x.get('start',{}).get('sheetId')==1:
                            self.rows=[[v['userEnteredValue']['stringValue'] for v in r['values']] for r in x['rows']]
                    return Response({})
                if '/values/' in url:return Response({'values':self.rows})
                return Response({'sheets':[{'properties':{'title':n,'sheetId':i}} for i,n in enumerate(['_PRISMA_DB','Estado',*VIEW_SQL],1)]})
        transport=GoogleFake();store=SheetsStore('synthetic-sheet',transport)
        recovered=TMP/'google-restored.db';recovered.touch();store.load(recovered)
        store.save(server.app.DB);self.assertEqual(len(transport.requests),1)
        store.save(server.app.DB);self.assertEqual(len(transport.requests),1)
        store.load(recovered)
        with sqlite3.connect(recovered) as a,sqlite3.connect(server.app.DB) as b:self.assertEqual(list(a.iterdump()),list(b.iterdump()))
        self.assertLess(len(json.dumps(transport.requests[0]).encode()),1900000)

    def test_no_model_execution(self):
        for f in ('start_ai','ai_text','ai_stream'):
            with self.assertRaises(RuntimeError):getattr(server.app.legacy,f)('test')

    def test_http_access_mission_answer_and_failure(self):
        http=server.ThreadingHTTPServer(('127.0.0.1',0),server.Handler)
        threading.Thread(target=http.serve_forever,daemon=True).start()
        base='http://127.0.0.1:'+str(http.server_port)
        def post(path,p,headers=None):
            req=urllib.request.Request(base+path,data=json.dumps(p).encode(),headers={'Content-Type':'application/json',**(headers or {})})
            try:
                with urllib.request.urlopen(req,timeout=10) as r:return r.status,r.read()
            except urllib.error.HTTPError as e:return e.code,e.read()
        try:
            self.assertEqual(post('/api/teacher/setup',{'pin':'123456'})[0],403)
            self.assertEqual(post('/api/student/login',{'participant_code':'UNKNOWN','grade':'8','pin_hash':'a'*64})[0],401)
            status,b=post('/api/teacher/login',{'pin':'test-only-long-password'});self.assertEqual(status,200)
            th={'X-PRISMA-Teacher-Token':json.loads(b)['token']}
            status,b=post('/api/teacher/students/create',{'grade':'8','count':1,'prefix':'WEB'},th);self.assertEqual(status,200)
            user=json.loads(b)['created'][0];code=user['participant_code']
            status,b=post('/api/student/login',{'participant_code':code,'grade':'8','pin_hash':server.app._student_pin_hash(code,user['pin'])});self.assertEqual(status,200)
            sh={'X-PRISMA-Student-Token':json.loads(b)['token']}
            self.assertEqual(post('/api/generate_mission',{'participant_code':code})[0],401)
            self.assertEqual(post('/api/generate_mission',{'participant_code':'OTHER'},sh)[0],401)
            status,b=post('/api/generate_mission_stream',{'participant_code':code,'grade':'8'},sh);self.assertEqual(status,200)
            events=[json.loads(x) for x in b.splitlines()];self.assertTrue(any(x['type']=='token' for x in events))
            mission=events[-1]['data']['mission']
            status,b=post('/api/evaluate_stem',{'participant_code':code,'mission':mission,'answer':'Comparo ambas opciones usando los datos del caso.'},sh)
            self.assertEqual(status,200);self.assertTrue(json.loads(b)['provisional'])
            self.assertEqual(post('/api/generate',{'participant_code':code,'prompt':'¿Cómo verifico?'},sh)[0],200)
            self.assertEqual(post('/api/ask_document',{'participant_code':code,'query':'agua'},sh)[0],200)
            with server.app.db_conn() as c:n=c.execute('SELECT COUNT(*) FROM online_draws').fetchone()[0]
            class BrokenStore:
                def save(self,path):raise StorageError('Fallo simulado de red')
            server.STORE=BrokenStore()
            self.assertEqual(post('/api/generate_mission',{'participant_code':code},sh)[0],503)
            with server.app.db_conn() as c:self.assertEqual(c.execute('SELECT COUNT(*) FROM online_draws').fetchone()[0],n)
            self.assertTrue(server.FAILED)
        finally:
            server.STORE=None;server.FAILED=False;http.shutdown();http.server_close()

if __name__=='__main__':unittest.main()
