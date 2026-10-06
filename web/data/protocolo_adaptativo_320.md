# PRISMA 3.2.0: adaptación, trazabilidad y validación

Estado: versión candidata para pilotaje. La comprobación técnica no demuestra eficacia educativa ni reemplaza juicio de expertos o aval ético. Se conservan datos, XP, mascotas y resultados históricos. Las reglas nuevas reinterpretan las evidencias disponibles sin borrar la historia.

## Correspondencia con el anteproyecto

PRISMA combina un modelo del estudiante, decisiones pedagógicas explícitas y generación local con Gemma. No se afirma que Gemma entrene sus parámetros con cada estudiante. La adaptación cambia el foco, la selección de refuerzo, el nivel de ayuda y las exigencias escritas del reto.

El flujo es: reto diagnóstico formativo → respuesta → devolución → refuerzo focalizado → revisión de la respuesta → problema nuevo. El diagnóstico formativo no usa ítems ni puntajes del pretest IM-3 para enseñar sus respuestas. Los instrumentos de investigación permanecen separados y las ayudas de IA se bloquean durante las aplicaciones asignadas.

## Niveles, evidencias y consolidación

El nivel observado sigue siendo una media de rúbricas 1–4. No equivale a un porcentaje de dominio ni a una calificación definitiva. Las barras muestran cobertura de evidencias para consolidación. Se consideran hasta los doce casos distintos más recientes; regenerar un caso del banco no lo convierte en un caso nuevo. Los registros anteriores sin información de ayuda se conservan, pero no se interpretan como trabajo autónomo.

Los valores iniciales propuestos son: tres casos distintos con nivel mínimo 3, dos sesiones, dos resultados sin ayuda externa y sin revisión, y una transferencia con vínculo al reto anterior. Los dos últimos resultados deben alcanzar el nivel mínimo y la media reciente también. El apoyo guiado no cuenta como evidencia independiente. Estos criterios producen una etiqueta de consolidación provisional, nunca una certificación de dominio absoluto. Son decisiones del diseño pendientes de validación experta; no se atribuyen a un autor.

El docente puede cambiar los mínimos desde «Criterios adaptativos y validación pedagógica». Se registra la versión y la historia de cambios. Durante la intervención congelada no se permite modificarlos. Tras cambiar criterios, recargar las sesiones. Las sesiones son identificadores de uso, no pruebas de retención a largo plazo: para medir retención debe programarse una comprobación diferida dentro del protocolo.

Las revisiones actualizan el nivel de la misma tarea y se conservan en la historia; no multiplican casos. Las tendencias utilizan la primera respuesta registrada de cada caso, sin ayuda externa declarada. La validez de esa declaración requiere observación docente. Los contextos generados parecidos todavía deben revisarse: una huella textual no demuestra equivalencia o diferencia semántica.

## Complejidad y ayuda: dimensiones independientes

| Complejidad propuesta | Exigencia escrita |
|---|---|
| Básica | Comparar dos opciones, justificar con un dato y comprobar una condición. |
| Intermedia | Comparar restricciones y analizar un cambio explícito de datos. |
| Avanzada | Comparar criterios en tensión, analizar dos cambios y discutir límites y mejoras. |

Ayuda guiada: cuatro pasos. Equilibrada: dos orientaciones. Autónoma: organización propia. Una sola rúbrica alta no retira automáticamente todas las ayudas. Los retos siempre se resuelven con texto, datos dados y supuestos declarados; no se solicitan maquetas, trabajos físicos ni diseños 3D.

Se verifican automáticamente campos, presencia de datos numéricos, etiquetas de al menos dos áreas y restricciones de actividades escritas. Esta comprobación es estructural: no demuestra que los datos sean suficientes, que las dos áreas estén realmente integradas ni que la dificultad semántica sea correcta. Eso requiere revisión experta. El banco de respaldo también conserva esa condición de candidato a validación.

## Etiquetas de actividades

El inventario descargable incluye contenido, dimensión, dificultad propuesta, requisito previo, procedencia y estado de revisión. Se respetan las dimensiones ya etiquetadas en los bancos. Cuando faltan etiquetas se utilizan valores conservadores del módulo, identificados como provisionales. Los microrefuerzos priorizan foco, dificultad, requisito previo y exposición reciente. El inventario no certifica una revisión humana de cada ítem.

Procedimiento: revisar primero los ítems que entrarán en la intervención, contrastar sus etiquetas con los descriptores y editar el banco desde las herramientas docentes existentes. Validar que el ejercicio realmente exige la habilidad indicada; acertar una pregunta cerrada no demuestra por sí solo competencia para justificar por escrito. Las variantes de un mismo ítem no son transferencia independiente.

## Evaluación de Gemma

El archivo `adaptive_reference_cases.json` contiene cuatro respuestas sintéticas contrastantes y rúbricas propuestas, con justificación. No es un patrón oro validado. Dos docentes deben puntuar primero sin ver esas propuestas y acordar descriptores. Después se comparan las respuestas del mismo modelo local, versión y configuración con los criterios humanos. Registrar acuerdos exactos, diferencias absolutas por dimensión, discrepancias mayores de un nivel y casos de severidad o indulgencia. No concluir validez con cuatro ejemplos; ampliar la muestra con respuestas cortas y extensas, correctas e incorrectas y diversos contextos.

## Trazabilidad

Las Interacciones exportables registran `adaptive_decision`, `adaptive_support_opened`, `adaptive_micropractice_completed`, `adaptive_mission` y `adaptive_mission_revision`. Una decisión incluye foco, cobertura de evidencias, ruta, ayuda, complejidad y versión de reglas. Las prácticas iniciadas desde el reto incluyen su identificador. Las visitas generales pueden no tener padre y deben analizarse como exploración. Los resultados de misión conservan propósito, fuente, condición de ayuda y relación de transferencia. La observación de ruta no acredita que el estudiante aprendió.

## Protocolo antes del estudio

1. Validación técnica: autenticación, conservación de historia, rutas diferentes con igual promedio, ausencia de falsa consolidación por repetición, ayudas, respaldo local, generación progresiva y visualización.
2. VP-1: expertos revisan casos, reglas, etiquetas, adecuación territorial, dificultad y calidad de retroalimentación.
3. Calibración de rúbricas: contraste de evaluadores humanos y Gemma, con decisiones documentadas.
4. VP-2: pilotaje con participantes externos a la muestra definitiva; observar claridad de instrucciones, ayuda declarada, retorno al mismo reto, transferencia y tiempos reales en los equipos institucionales.
5. Estabilización: ajustar, repetir solo las comprobaciones afectadas y congelar software, bancos, reglas, prompts y modelo antes del estudio.
6. Evaluación: IM-3 pre/post para competencias, IM-2 para experiencia, IM-4 para apropiación docente e indicadores comparables de acceso y uso. No usar XP o evolución de mascotas como resultado de aprendizaje. El diseño estima el efecto de la intervención conjunta, no el efecto aislado de Gemma.

## Ajustes sugeridos al anteproyecto

Precisar en «Algoritmo de personalización» las reglas y sus evidencias; distinguir nivel observado, consolidación provisional y transferencia. En «Base de datos», describir navegador y SQLite. En «Ruta didáctica», documentar el retorno desde los refuerzos y el nuevo problema. Delimitar las competencias observables mediante razonamiento escrito. Mantener los espacios de discusión y mediación docente durante las sesiones. No presentar la validación ni la eficacia como ya realizadas.

Fundamentos para discutir el diseño: Brusilovsky (2001), https://doi.org/10.1023/A:1011143116306 ; Brusilovsky y Millán (2007), https://doi.org/10.1007/978-3-540-72079-9_1 ; Kelley y Knowles (2016), https://doi.org/10.1186/s40594-016-0046-z . Estas fuentes fundamentan conceptos, no validan los umbrales particulares de PRISMA.
