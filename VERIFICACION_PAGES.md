# Verificación de GitHub Pages y Apps Script

Pruebas locales con servicios de Google simulados:

- Accesos docente/estudiante y rechazo de consultas a otra cuenta.
- 40 retos distintos; agotamiento; historial independiente de otra cuenta.
- Respuestas provisionales; revisión docente preservada frente a estados enviados
  por el cliente. El estudiante no puede fabricar evidencia docente validada.
- Idempotencia ante reintentos y rechazo de identificadores con otro contenido.
- Fallo de confirmación de Sheets conserva la copia anterior y permite reintentar.
- Consentimiento, IM-3 sin ayudas, borradores y respuestas no sobrescribibles.
- Calificación independiente, ausencias como null y acuerdo descriptivo.
- Edición de preguntas visible al estudiante, con restauración de copias.
- Congelación exige validación y bloquea cambios; huellas verificables.
- Exportación privada y protección contra fórmulas en CSV.
- Construcción bajo /plataformaonline/ y separación de interfaz/servidor.

Pendientes de verificación remota: autorización de Apps Script, ejecución real de
setupPrisma, despliegue /exec, CORS desde Pages, PDF real y prueba de carga del curso.
No se declara equivalencia de capacidad o latencia con la versión Python.
