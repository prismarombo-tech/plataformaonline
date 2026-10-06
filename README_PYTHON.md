# PRISMA Online 1.0.0-online.1

Edición independiente de PRISMA Offline 1.0.0. Conserva módulos, explicaciones,
mascota y evoluciones, ruta adaptativa, instrumentos del estudio, biblioteca PDF,
panel docente, revisión humana, exportaciones y editor de preguntas.

## Cambios de esta edición

- No ejecuta ni descarga Gemma, Ollama o llama.cpp.
- Banco de 40 situaciones escritas: 15 casos existentes y 25 nuevos casos cotidianos.
- Sorteo por estudiante entre casos no asignados. El registro persiste en la base.
  No reinicia el ciclo automáticamente después del reto 40. Los módulos pueden
  volver a practicarse y las respuestas se pueden mejorar.
- Las ayudas y la complejidad siguen las reglas adaptativas existentes.
- El asistente y Prismi dan orientaciones predeterminadas. La biblioteca devuelve
  fragmentos relevantes de PDF, sin inventar respuestas a partir de ellos.
- Las respuestas abiertas quedan pendientes de valoración docente. No se asigna
  competencia validada por longitud o palabras clave. Las actividades cerradas de
  los módulos conservan sus correcciones y progresión.
- El texto del nuevo reto se muestra progresivamente tras confirmar el guardado.

## Google Sheets

Hoja creada: https://docs.google.com/spreadsheets/d/1WJe_UzOWBC9ZOBXr2LmSHv-7VrzpQbI1ms1sGoAMqqs/edit

Es una base nueva, sin datos importados de estudiantes. Mantener privada.
`_PRISMA_DB` conserva todas las tablas SQL, sus tipos y los archivos auxiliares
de biblioteca/bancos en una copia comprimida con verificación SHA-256. No es
cifrado. Las pestañas visibles permiten consultar estudiantes, retos, respuestas,
progreso, instrumentos y revisiones. Algunas celdas de vista muy largas se
abrevian; la copia integral conserva el valor completo. Administrar los registros
desde PRISMA, no editando a mano las vistas o `_PRISMA_DB`.

El servidor utiliza SQLite como caché transaccional local y confirma la escritura
al navegador solamente después de guardar en Sheets. Al reiniciar restaura la
copia de Sheets. Si falla la confirmación, bloquea nuevas escrituras; reiniciar
tras resolver la conexión recupera el estado remoto sin sobrescribirlo a ciegas.

## Arranque de prueba, sin datos reales

Requiere Python 3.12 o posterior:

```powershell
python -m pip install -r requirements.txt
$env:PRISMA_STORAGE='local-demo'
$env:PRISMA_TEACHER_PASSWORD='elige-una-clave-larga-propia'
python server_online.py
```

Abrir http://127.0.0.1:8000. La demostración usa datos locales y NO escribe en
Sheets. El docente entra con la clave configurada y crea códigos/PIN para sus
estudiantes. Los estudiantes no crean cuentas públicas.

## Conectar el almacenamiento real

1. En tu proyecto de Google Cloud habilita Google Sheets API y crea una cuenta
   de servicio dedicada. Conserva su JSON como secreto del servidor.
2. Comparte únicamente esta hoja con el correo de esa cuenta como editor.
   No publiques la hoja ni subas el JSON a GitHub.
3. Configura en el alojamiento:
   - `PRISMA_STORAGE=sheets`
   - `PRISMA_SHEET_ID=1WJe_UzOWBC9ZOBXr2LmSHv-7VrzpQbI1ms1sGoAMqqs`
   - `GOOGLE_SERVICE_ACCOUNT_JSON`: contenido del JSON secreto; o usa
     `GOOGLE_APPLICATION_CREDENTIALS` con un archivo privado del servidor.
   - `PRISMA_TEACHER_PASSWORD`: al menos 12 caracteres.
   - `PRISMA_PUBLIC_URL`: URL HTTPS final del programa.
   - `PORT`: puerto asignado por tu alojamiento.
4. Ejecuta `python server_online.py` o construye el Dockerfile incluido.
5. Verifica `/api/health`: debe indicar `storage: google-sheets`. Crea una cuenta
   sintética, responde un reto, verifica las filas y reinicia el servidor para
   comprobar que el estado se recupera antes de usar datos del estudio.

La conexión de Google Drive en Codex sirve para crear la hoja; no concede al
servidor publicado credenciales permanentes. Estas se configuran por separado.

## Publicar desde GitHub

Este repositorio contiene un servidor Python, por lo que GitHub Pages solo no
lo ejecuta. Sube el repositorio público solicitado por el titular y
conéctalo a un alojamiento compatible con Docker/Python y HTTPS. No se contrató
ningún servicio ni se activaron cobros. El servicio debe usar UNA sola réplica y
un solo proceso escritor por hoja. No activar autoscaling ni varios workers.

Se incluye `PUBLICAR_GITHUB.ps1`, que usa GitHub CLI tras iniciar sesión y crea
un repositorio público. No incluye credenciales, bases de datos ni modelos.
La publicación pública no cambia la licencia de evaluación e investigación.

## Límites y fidelidad de investigación

Esta adaptación requiere un nuevo pilotaje: sustituye IA generativa por un banco
curado y evaluación docente; no es idéntica a la intervención offline descrita
en el anteproyecto. No se alteraron los instrumentos originales. Deben documentarse
esta edición y el tratamiento de datos online antes de usarla con participantes.

Sheets tiene cuotas; esta implementación está orientada a un piloto pequeño,
no a cientos de conexiones simultáneas. Serializa escrituras y reintenta errores
transitorios. Rechaza lotes superiores a 1,9 MB antes de enviar, sin truncar datos.
Los PDF, respuestas extensas y registros frecuentes consumen ese margen. Evaluar
carga y tamaño con el curso real; para crecer hará falta ampliar la persistencia.
No iniciar dos instancias sobre la misma hoja ni editar las pestañas gestionadas
mientras la aplicación está en servicio. Las sesiones expiran al reiniciar.

## Pruebas

```text
python -m unittest test_online -v
```

Licencia: `LICENCIA_EVALUACION_INVESTIGACION.txt`. Componentes de terceros conservan
sus condiciones. La carpeta original offline no se modifica.
