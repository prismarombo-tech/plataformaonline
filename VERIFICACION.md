# Verificación de la edición online

Fecha: 5 de octubre de 2026.

- Copia independiente; no se alteró la instalación original ni su base de datos.
- Banco: exactamente 40 identificadores únicos; todos son de razonamiento escrito.
- Sorteo: 40 asignaciones distintas por estudiante; solicitud 41 rechazada sin reinicio del ciclo.
- Dos estudiantes tienen historiales independientes.
- Ayuda guiada y complejidad avanzada conservan la política adaptativa.
- No se ejecutan motores de IA; sus llamadas están desactivadas explícitamente.
- Validación de acceso por API: cuenta desconocida, sesión ausente y código ajeno rechazados.
- Acceso docente, creación de estudiante, reto NDJSON y respuesta probados con datos sintéticos.
- La orientación automática no constituye una calificación validada.
- Fallo de almacenamiento simulado: respuesta 503, reversión local y bloqueo de nuevas escrituras.
- Copia integral SQLite→compresión→celdas→restauración conserva todas las tablas.
- Contrato de Sheets probado con transporte simulado; valores enviados como texto evitan fórmulas inyectadas.
- Navegador: ingreso docente, creación de acceso, ingreso del estudiante, 15 módulos,
  presentación de reto, respuesta escrita y orientación provisional comprobados.
- Hoja nativa creada en Google Drive: 8 pestañas; cabeceras y formato leídos de vuelta;
  zona horaria Bogotá y permisos verificados: solo propietario, no compartida.

## Pendiente antes de usar participantes reales

- Conectar las credenciales del servidor a la hoja y ejecutar una prueba real de
  escritura y recuperación tras reinicio. La conexión de Codex no es una credencial de despliegue.
- Repositorio público de destino: prismarombo-tech/plataformaonline.
  La disponibilidad del código en GitHub no constituye un despliegue del servidor.
- Elegir y configurar alojamiento Python/Docker con HTTPS y una sola réplica.
- Prueba de carga con el curso previsto, por cuotas y tamaño de Google Sheets.
- Revisión pedagógica de los 25 nuevos casos y documentación del cambio de intervención.

No se afirma haber desplegado la web ni probado persistencia remota real desde el servidor.
