# PRISMA Online — GitHub Pages + Google Apps Script

La interfaz se publica en GitHub Pages y el servidor JavaScript se ejecuta en
Google Apps Script. Los datos se guardan en una hoja privada de Google Sheets.
Esta edición no necesita alojamiento Python, Gemma ni claves de IA.

Dirección prevista: https://prismarombo-tech.github.io/plataformaonline/

## Estado de activación

El código incluye publicación mediante GitHub Actions. La interfaz muestra un
aviso de preparación hasta configurar la URL real de Apps Script. No permite
entrar ni simula guardar datos cuando el servidor está desconectado.

## Funciones

- 15 módulos originales, mascota y progresión; editor de preguntas con copias.
- 40 retos escritos, aleatorios y sin repetirse por estudiante. El reto 41 no
  reinicia el banco: se invita a revisar y continuar los módulos.
- Complejidad y ayudas adaptativas; consejos predeterminados de Prismi.
- Respuestas abiertas pendientes de valoración docente, sin notas automáticas
  basadas en palabras clave. Las actividades cerradas conservan sus correcciones.
- Cuentas creadas por el docente, tokens con vencimiento y separación de cuentas.
- Instrumentos originales IM-1–IM-4, VP-1 y VP-2; consentimientos, asignaciones,
  borradores, puntuaciones independientes, validación y congelación de cohortes.
- Biblioteca PDF con búsqueda BM25, exportaciones CSV/ZIP e informe docente.

## Activar Google Apps Script

1. Crea un proyecto en https://script.google.com/ con tu cuenta propietaria de la hoja.
2. En un único archivo de código pega **deployment/PRISMA.gs** completo.
   No pegues también los archivos de apps-script/: son las fuentes del mismo paquete.
3. En Configuración del proyecto activa la visualización del manifiesto y sustituye
   appsscript.json por **deployment/appsscript.json**. Incluye el servicio Drive v3
   para convertir temporalmente PDF a texto.
4. Añade propiedades del script, desde su configuración privada:
   - PRISMA_SHEET_ID: 1WJe_UzOWBC9ZOBXr2LmSHv-7VrzpQbI1ms1sGoAMqqs
   - PRISMA_TEACHER_PASSWORD: una contraseña propia de al menos 12 caracteres.
   Nunca pongas la contraseña en el código ni en GitHub. El titular debe introducirla.
5. Ejecuta **setupPrisma** desde el editor y revisa/autoriza los permisos solicitados
   por Google. Guarda el hash de la contraseña y elimina la propiedad en texto claro.
6. Implementar → Nueva implementación → Aplicación web. Ejecutar como: tú.
   Acceso: cualquier usuario. La aplicación comprueba sus propios accesos en cada
   solicitud; la hoja y el proyecto NO deben hacerse públicos.
7. Copia la dirección terminada en **/exec** a `url` en **web/online-config.js**.
   Esa dirección es pública; no es una contraseña.
8. En GitHub, Settings → Pages → Source: GitHub Actions. La acción publica solo
   `_site/`, con la interfaz; no publica las carpetas del servidor como sitio web.
9. Prueba con cuentas sintéticas: ingreso, reto, respuesta, revisión docente,
   recarga en otro navegador y recuperación del historial. No uses participantes
   reales hasta comprobar el recorrido completo con Google.

## Guardado y consulta

La hoja conserva el estado completo comprimido en `_PRISMA_GAS_A/B`. Se escribe
una copia nueva y se verifica su huella antes de cambiar el puntero activo; una
escritura fallida deja la copia anterior. Un bloqueo del proyecto serializa cambios
y los identificadores de solicitud evitan repetir escrituras por reintentos de red.
Los datos comprimidos NO están cifrados: la protección depende de los permisos
privados de Google. La pestaña `_PRISMA_DB` de la variante Python no se reutiliza.

Ejecuta **actualizarVistas** en Apps Script para refrescar las pestañas legibles de
estudiantes, retos, respuestas, progreso, instrumentos y revisiones. Estas vistas
son de consulta; no edites el estado desde las celdas. Puedes programar la función
con un activador de tiempo desde Apps Script si necesitas actualizaciones periódicas.

## Diferencias y límites de esta adaptación

- Necesita Internet. Apps Script tiene cuotas y no garantiza capacidad ilimitada.
  Antes del pilotaje, mide carga y latencias con el grupo previsto.
- Los PDF tienen límite de 3 MB por archivo. La conversión de Drive puede alterar
  tablas y no conserva referencias fiables de página; comprueba el texto extraído.
  Los PDF y el texto se conservan en la copia de datos; la conversión temporal va a
  la papelera. No se hace público el documento.
- Las vistas legibles de Sheets se actualizan por separado; el estado persistente
  se confirma en cada escritura. Copias previas requieren gestión de conservación.
- No se migra automáticamente la base Python ni datos de la instalación offline.
- Requiere nuevo pilotaje metodológico: banco curado y revisión docente sustituyen
  IA generativa. Los enunciados de los instrumentos no se modificaron.

## Construir y comprobar

Requiere Node 22 o posterior solo para preparar el sitio, no para alojarlo:

```text
node scripts/build-pages.mjs
node tests/apps-script.test.mjs
```

Las pruebas usan dobles de los servicios de Google: no sustituyen una prueba real
de autorización, CORS, conversión de PDF y persistencia en Google.

La variante Python anterior se conserva como referencia en README_PYTHON.md; no
participa en el despliegue de GitHub Pages. Se mantiene la licencia de evaluación
e investigación. Publicar el repositorio no cambia esa licencia.
