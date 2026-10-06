"""Checks generated missions before display; conservative fallback for material tasks."""
import json,re,unicodedata
PATTERNS = ['\\bmaquetas?\\b', '\\b(?:3\\s*-?\\s*d|tridimensional\\w*|cad|tinkercad|blender|sketchup|autocad)\\b', '\\b(?:carton|tijeras|pegamento|plastilina|soldador|protoboard)\\b', '\\b(?:construye|construyan|construir|fabrica|fabricar|recorta|recortar|ensambla|ensamblar|dibuja|dibujar|modela|modelar)\\b', '\\b(?:mide|midan|medir|mediras|medirias|entrevista|entrevistar|fotografia|fotografiar|graba|grabar|recolecta|recolectar)\\b', '\\b(?:realiza|realizar|haz|hacer|ejecuta|ejecutar)\\b.{0,55}\\b(?:experimento|prueba fisica|montaje|prototipo)\\b', '\\b(?:instala|instalar|descarga|descargar|compra|comprar|conecta|conectar)\\b.{0,55}\\b(?:programa|software|simulador|material|materiales|componente|componentes|circuito)\\b']
FIELDS = ('title','story','context','task','steps','evidence_goal','success_criterion','teacher_note','raw_text')
def requires_external_work(mission):
    text=' '.join(json.dumps(mission.get(k,''),ensure_ascii=False) for k in FIELDS)
    text=''.join(c for c in unicodedata.normalize('NFKD',text.lower()) if not unicodedata.combining(c))
    return any(re.search(p,text) for p in PATTERNS)
def validate_written_mission(mission):
    if requires_external_work(mission):
        raise ValueError('El reto requiere adaptación a razonamiento escrito; se utilizará el banco local.')
    return mission
