window.PRISMA_BANK_DATA = {
  "version": 3,
  "moduleKey": "everyday",
  "title": "Resolver retos cotidianos",
  "short": "Retos cotidianos",
  "icon": "🧭",
  "color": "#ffbe70",
  "learningSequence": "case-cycle-v1",
  "instructions": "Diez etapas. Cada caso conecta comprensión, diseño, justificación y verificación mediante preguntas ABCD. Las explicaciones y el reto final se mantienen separados de la competencia de rúbrica.",
  "units": [
    {
      "id": 1,
      "title": "Reconocer el objetivo y los límites",
      "intro": "Aprende a conectar objetivo, procedimiento, razón y comprobación en una decisión cotidiana.",
      "lesson": [
        "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
        "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
        "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
        "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión."
      ],
      "questions": [
        {
          "id": "everyday-u01-case1-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u01-case1",
          "caseTitle": "Una compra para el grupo",
          "context": "Un grupo dispone de 50 créditos ficticios y necesita 4 cuadernos. Cada cuaderno cuesta 7 créditos. El envío cuesta 5. No se realizará ninguna compra.",
          "options": [
            "Conseguir 4 cuadernos sin superar 50 créditos, incluyendo el envío.",
            "Elegir el menor precio por cuaderno sin considerar cuántos se necesitan.",
            "Usar todo el presupuesto aunque sobren cuadernos.",
            "Comprobar solo si el envío cuesta menos que el presupuesto."
          ],
          "answer": "Conseguir 4 cuadernos sin superar 50 créditos, incluyendo el envío.",
          "explanation": "El objetivo combina cantidad y presupuesto: el envío también consume recursos. Aplicado al caso: Conseguir 4 cuadernos sin superar 50 créditos, incluyendo el envío.",
          "optionFeedback": {
            "Elegir el menor precio por cuaderno sin considerar cuántos se necesitan.": "Comprueba que el objetivo respete todas las condiciones.",
            "Usar todo el presupuesto aunque sobren cuadernos.": "Comprueba que el objetivo respete todas las condiciones.",
            "Comprobar solo si el envío cuesta menos que el presupuesto.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u01-case1-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u01-case1",
          "caseTitle": "Una compra para el grupo",
          "context": "Un grupo dispone de 50 créditos ficticios y necesita 4 cuadernos. Cada cuaderno cuesta 7 créditos. El envío cuesta 5. No se realizará ninguna compra.",
          "options": [
            "Comparar 7 con 50 sin multiplicar por la cantidad.",
            "Multiplicar 4 × 7 y omitir el envío.",
            "Sumar 4 + 7 + 5 y tratarlo como el costo.",
            "Calcular 4 × 7, sumar 5 y comparar el total con 50."
          ],
          "answer": "Calcular 4 × 7, sumar 5 y comparar el total con 50.",
          "explanation": "Multiplicar obtiene el costo de todos los cuadernos; sumar el envío completa el costo que se compara con el presupuesto. Aplicado al caso: Calcular 4 × 7, sumar 5 y comparar el total con 50.",
          "optionFeedback": {
            "Comparar 7 con 50 sin multiplicar por la cantidad.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Multiplicar 4 × 7 y omitir el envío.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Sumar 4 + 7 + 5 y tratarlo como el costo.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u01-case1-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u01-case1",
          "caseTitle": "Una compra para el grupo",
          "context": "Un grupo dispone de 50 créditos ficticios y necesita 4 cuadernos. Cada cuaderno cuesta 7 créditos. El envío cuesta 5. No se realizará ninguna compra.",
          "options": [
            "Es adecuada porque gastar más siempre mejora la calidad.",
            "Es adecuada porque el precio de un solo cuaderno cabe en el presupuesto.",
            "La opción cuesta 33 créditos y cubre los 4 cuadernos sin superar 50.",
            "Es adecuada porque el envío es más barato que un cuaderno."
          ],
          "answer": "La opción cuesta 33 créditos y cubre los 4 cuadernos sin superar 50.",
          "explanation": "Que un cuaderno sea asequible no garantiza que lo sea el pedido completo; la razón debe incluir cantidad y envío. Aplicado al caso: La opción cuesta 33 créditos y cubre los 4 cuadernos sin superar 50.",
          "optionFeedback": {
            "Es adecuada porque el envío es más barato que un cuaderno.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Es adecuada porque gastar más siempre mejora la calidad.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Es adecuada porque el precio de un solo cuaderno cabe en el presupuesto.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u01-case1-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u01-case1",
          "caseTitle": "Una compra para el grupo",
          "context": "Un grupo dispone de 50 créditos ficticios y necesita 4 cuadernos. Cada cuaderno cuesta 7 créditos. El envío cuesta 5. No se realizará ninguna compra.",
          "options": [
            "Mantener la decisión aunque cambie el costo de envío.",
            "Comprobar 33 ≤ 50; si sube el envío, recalcular antes de decidir.",
            "Repetir que la compra es barata sin sumar los costos.",
            "Comparar el número de cuadernos con los créditos disponibles."
          ],
          "answer": "Comprobar 33 ≤ 50; si sube el envío, recalcular antes de decidir.",
          "explanation": "La desigualdad contrasta el costo total con el límite. Un cambio de precio exige repetir el cálculo. Aplicado al caso: Comprobar 33 ≤ 50; si sube el envío, recalcular antes de decidir.",
          "optionFeedback": {
            "Repetir que la compra es barata sin sumar los costos.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Comparar el número de cuadernos con los créditos disponibles.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Mantener la decisión aunque cambie el costo de envío.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u01-case2-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u01-case2",
          "caseTitle": "Cuadernos para una actividad simulada",
          "context": "Un grupo dispone de 60 créditos ficticios y necesita 4 cuadernos. Cada cuaderno cuesta 8 créditos. El envío cuesta 5. No se realizará ninguna compra.",
          "options": [
            "Elegir el menor precio por cuaderno sin considerar cuántos se necesitan.",
            "Usar todo el presupuesto aunque sobren cuadernos.",
            "Comprobar solo si el envío cuesta menos que el presupuesto.",
            "Conseguir 4 cuadernos sin superar 60 créditos, incluyendo el envío."
          ],
          "answer": "Conseguir 4 cuadernos sin superar 60 créditos, incluyendo el envío.",
          "explanation": "El objetivo combina cantidad y presupuesto: el envío también consume recursos. Aplicado al caso: Conseguir 4 cuadernos sin superar 60 créditos, incluyendo el envío.",
          "optionFeedback": {
            "Elegir el menor precio por cuaderno sin considerar cuántos se necesitan.": "Comprueba que el objetivo respete todas las condiciones.",
            "Usar todo el presupuesto aunque sobren cuadernos.": "Comprueba que el objetivo respete todas las condiciones.",
            "Comprobar solo si el envío cuesta menos que el presupuesto.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u01-case2-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u01-case2",
          "caseTitle": "Cuadernos para una actividad simulada",
          "context": "Un grupo dispone de 60 créditos ficticios y necesita 4 cuadernos. Cada cuaderno cuesta 8 créditos. El envío cuesta 5. No se realizará ninguna compra.",
          "options": [
            "Multiplicar 4 × 8 y omitir el envío.",
            "Sumar 4 + 8 + 5 y tratarlo como el costo.",
            "Calcular 4 × 8, sumar 5 y comparar el total con 60.",
            "Comparar 8 con 60 sin multiplicar por la cantidad."
          ],
          "answer": "Calcular 4 × 8, sumar 5 y comparar el total con 60.",
          "explanation": "Multiplicar obtiene el costo de todos los cuadernos; sumar el envío completa el costo que se compara con el presupuesto. Aplicado al caso: Calcular 4 × 8, sumar 5 y comparar el total con 60.",
          "optionFeedback": {
            "Comparar 8 con 60 sin multiplicar por la cantidad.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Multiplicar 4 × 8 y omitir el envío.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Sumar 4 + 8 + 5 y tratarlo como el costo.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u01-case2-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u01-case2",
          "caseTitle": "Cuadernos para una actividad simulada",
          "context": "Un grupo dispone de 60 créditos ficticios y necesita 4 cuadernos. Cada cuaderno cuesta 8 créditos. El envío cuesta 5. No se realizará ninguna compra.",
          "options": [
            "Es adecuada porque el precio de un solo cuaderno cabe en el presupuesto.",
            "La opción cuesta 37 créditos y cubre los 4 cuadernos sin superar 60.",
            "Es adecuada porque el envío es más barato que un cuaderno.",
            "Es adecuada porque gastar más siempre mejora la calidad."
          ],
          "answer": "La opción cuesta 37 créditos y cubre los 4 cuadernos sin superar 60.",
          "explanation": "Que un cuaderno sea asequible no garantiza que lo sea el pedido completo; la razón debe incluir cantidad y envío. Aplicado al caso: La opción cuesta 37 créditos y cubre los 4 cuadernos sin superar 60.",
          "optionFeedback": {
            "Es adecuada porque el envío es más barato que un cuaderno.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Es adecuada porque gastar más siempre mejora la calidad.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Es adecuada porque el precio de un solo cuaderno cabe en el presupuesto.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u01-case2-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u01-case2",
          "caseTitle": "Cuadernos para una actividad simulada",
          "context": "Un grupo dispone de 60 créditos ficticios y necesita 4 cuadernos. Cada cuaderno cuesta 8 créditos. El envío cuesta 5. No se realizará ninguna compra.",
          "options": [
            "Comprobar 37 ≤ 60; si sube el envío, recalcular antes de decidir.",
            "Repetir que la compra es barata sin sumar los costos.",
            "Comparar el número de cuadernos con los créditos disponibles.",
            "Mantener la decisión aunque cambie el costo de envío."
          ],
          "answer": "Comprobar 37 ≤ 60; si sube el envío, recalcular antes de decidir.",
          "explanation": "La desigualdad contrasta el costo total con el límite. Un cambio de precio exige repetir el cálculo. Aplicado al caso: Comprobar 37 ≤ 60; si sube el envío, recalcular antes de decidir.",
          "optionFeedback": {
            "Repetir que la compra es barata sin sumar los costos.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Comparar el número de cuadernos con los créditos disponibles.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Mantener la decisión aunque cambie el costo de envío.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u01-case3-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u01-case3",
          "caseTitle": "Elegir un paquete de cuadernos",
          "context": "Un grupo dispone de 70 créditos ficticios y necesita 4 cuadernos. Cada cuaderno cuesta 9 créditos. El envío cuesta 5. No se realizará ninguna compra.",
          "options": [
            "Usar todo el presupuesto aunque sobren cuadernos.",
            "Comprobar solo si el envío cuesta menos que el presupuesto.",
            "Conseguir 4 cuadernos sin superar 70 créditos, incluyendo el envío.",
            "Elegir el menor precio por cuaderno sin considerar cuántos se necesitan."
          ],
          "answer": "Conseguir 4 cuadernos sin superar 70 créditos, incluyendo el envío.",
          "explanation": "El objetivo combina cantidad y presupuesto: el envío también consume recursos. Aplicado al caso: Conseguir 4 cuadernos sin superar 70 créditos, incluyendo el envío.",
          "optionFeedback": {
            "Elegir el menor precio por cuaderno sin considerar cuántos se necesitan.": "Comprueba que el objetivo respete todas las condiciones.",
            "Usar todo el presupuesto aunque sobren cuadernos.": "Comprueba que el objetivo respete todas las condiciones.",
            "Comprobar solo si el envío cuesta menos que el presupuesto.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u01-case3-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u01-case3",
          "caseTitle": "Elegir un paquete de cuadernos",
          "context": "Un grupo dispone de 70 créditos ficticios y necesita 4 cuadernos. Cada cuaderno cuesta 9 créditos. El envío cuesta 5. No se realizará ninguna compra.",
          "options": [
            "Sumar 4 + 9 + 5 y tratarlo como el costo.",
            "Calcular 4 × 9, sumar 5 y comparar el total con 70.",
            "Comparar 9 con 70 sin multiplicar por la cantidad.",
            "Multiplicar 4 × 9 y omitir el envío."
          ],
          "answer": "Calcular 4 × 9, sumar 5 y comparar el total con 70.",
          "explanation": "Multiplicar obtiene el costo de todos los cuadernos; sumar el envío completa el costo que se compara con el presupuesto. Aplicado al caso: Calcular 4 × 9, sumar 5 y comparar el total con 70.",
          "optionFeedback": {
            "Comparar 9 con 70 sin multiplicar por la cantidad.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Multiplicar 4 × 9 y omitir el envío.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Sumar 4 + 9 + 5 y tratarlo como el costo.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u01-case3-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u01-case3",
          "caseTitle": "Elegir un paquete de cuadernos",
          "context": "Un grupo dispone de 70 créditos ficticios y necesita 4 cuadernos. Cada cuaderno cuesta 9 créditos. El envío cuesta 5. No se realizará ninguna compra.",
          "options": [
            "La opción cuesta 41 créditos y cubre los 4 cuadernos sin superar 70.",
            "Es adecuada porque el envío es más barato que un cuaderno.",
            "Es adecuada porque gastar más siempre mejora la calidad.",
            "Es adecuada porque el precio de un solo cuaderno cabe en el presupuesto."
          ],
          "answer": "La opción cuesta 41 créditos y cubre los 4 cuadernos sin superar 70.",
          "explanation": "Que un cuaderno sea asequible no garantiza que lo sea el pedido completo; la razón debe incluir cantidad y envío. Aplicado al caso: La opción cuesta 41 créditos y cubre los 4 cuadernos sin superar 70.",
          "optionFeedback": {
            "Es adecuada porque el envío es más barato que un cuaderno.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Es adecuada porque gastar más siempre mejora la calidad.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Es adecuada porque el precio de un solo cuaderno cabe en el presupuesto.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u01-case3-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u01-case3",
          "caseTitle": "Elegir un paquete de cuadernos",
          "context": "Un grupo dispone de 70 créditos ficticios y necesita 4 cuadernos. Cada cuaderno cuesta 9 créditos. El envío cuesta 5. No se realizará ninguna compra.",
          "options": [
            "Repetir que la compra es barata sin sumar los costos.",
            "Comparar el número de cuadernos con los créditos disponibles.",
            "Mantener la decisión aunque cambie el costo de envío.",
            "Comprobar 41 ≤ 70; si sube el envío, recalcular antes de decidir."
          ],
          "answer": "Comprobar 41 ≤ 70; si sube el envío, recalcular antes de decidir.",
          "explanation": "La desigualdad contrasta el costo total con el límite. Un cambio de precio exige repetir el cálculo. Aplicado al caso: Comprobar 41 ≤ 70; si sube el envío, recalcular antes de decidir.",
          "optionFeedback": {
            "Repetir que la compra es barata sin sumar los costos.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Comparar el número de cuadernos con los créditos disponibles.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Mantener la decisión aunque cambie el costo de envío.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u01-case4-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u01-case4",
          "caseTitle": "Una compra diferente",
          "context": "Un grupo dispone de 80 créditos ficticios y necesita 4 cuadernos. Cada cuaderno cuesta 10 créditos. El envío cuesta 5. No se realizará ninguna compra.",
          "options": [
            "Comprobar solo si el envío cuesta menos que el presupuesto.",
            "Conseguir 4 cuadernos sin superar 80 créditos, incluyendo el envío.",
            "Elegir el menor precio por cuaderno sin considerar cuántos se necesitan.",
            "Usar todo el presupuesto aunque sobren cuadernos."
          ],
          "answer": "Conseguir 4 cuadernos sin superar 80 créditos, incluyendo el envío.",
          "explanation": "El objetivo combina cantidad y presupuesto: el envío también consume recursos. Aplicado al caso: Conseguir 4 cuadernos sin superar 80 créditos, incluyendo el envío.",
          "optionFeedback": {
            "Elegir el menor precio por cuaderno sin considerar cuántos se necesitan.": "Comprueba que el objetivo respete todas las condiciones.",
            "Usar todo el presupuesto aunque sobren cuadernos.": "Comprueba que el objetivo respete todas las condiciones.",
            "Comprobar solo si el envío cuesta menos que el presupuesto.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u01-case4-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u01-case4",
          "caseTitle": "Una compra diferente",
          "context": "Un grupo dispone de 80 créditos ficticios y necesita 4 cuadernos. Cada cuaderno cuesta 10 créditos. El envío cuesta 5. No se realizará ninguna compra.",
          "options": [
            "Calcular 4 × 10, sumar 5 y comparar el total con 80.",
            "Comparar 10 con 80 sin multiplicar por la cantidad.",
            "Multiplicar 4 × 10 y omitir el envío.",
            "Sumar 4 + 10 + 5 y tratarlo como el costo."
          ],
          "answer": "Calcular 4 × 10, sumar 5 y comparar el total con 80.",
          "explanation": "Multiplicar obtiene el costo de todos los cuadernos; sumar el envío completa el costo que se compara con el presupuesto. Aplicado al caso: Calcular 4 × 10, sumar 5 y comparar el total con 80.",
          "optionFeedback": {
            "Comparar 10 con 80 sin multiplicar por la cantidad.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Multiplicar 4 × 10 y omitir el envío.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Sumar 4 + 10 + 5 y tratarlo como el costo.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u01-case4-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u01-case4",
          "caseTitle": "Una compra diferente",
          "context": "Un grupo dispone de 80 créditos ficticios y necesita 4 cuadernos. Cada cuaderno cuesta 10 créditos. El envío cuesta 5. No se realizará ninguna compra.",
          "options": [
            "Es adecuada porque el envío es más barato que un cuaderno.",
            "Es adecuada porque gastar más siempre mejora la calidad.",
            "Es adecuada porque el precio de un solo cuaderno cabe en el presupuesto.",
            "La opción cuesta 45 créditos y cubre los 4 cuadernos sin superar 80."
          ],
          "answer": "La opción cuesta 45 créditos y cubre los 4 cuadernos sin superar 80.",
          "explanation": "Que un cuaderno sea asequible no garantiza que lo sea el pedido completo; la razón debe incluir cantidad y envío. Aplicado al caso: La opción cuesta 45 créditos y cubre los 4 cuadernos sin superar 80.",
          "optionFeedback": {
            "Es adecuada porque el envío es más barato que un cuaderno.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Es adecuada porque gastar más siempre mejora la calidad.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Es adecuada porque el precio de un solo cuaderno cabe en el presupuesto.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u01-case4-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u01-case4",
          "caseTitle": "Una compra diferente",
          "context": "Un grupo dispone de 80 créditos ficticios y necesita 4 cuadernos. Cada cuaderno cuesta 10 créditos. El envío cuesta 5. No se realizará ninguna compra.",
          "options": [
            "Comparar el número de cuadernos con los créditos disponibles.",
            "Mantener la decisión aunque cambie el costo de envío.",
            "Comprobar 45 ≤ 80; si sube el envío, recalcular antes de decidir.",
            "Repetir que la compra es barata sin sumar los costos."
          ],
          "answer": "Comprobar 45 ≤ 80; si sube el envío, recalcular antes de decidir.",
          "explanation": "La desigualdad contrasta el costo total con el límite. Un cambio de precio exige repetir el cálculo. Aplicado al caso: Comprobar 45 ≤ 80; si sube el envío, recalcular antes de decidir.",
          "optionFeedback": {
            "Repetir que la compra es barata sin sumar los costos.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Comparar el número de cuadernos con los créditos disponibles.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Mantener la decisión aunque cambie el costo de envío.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        }
      ],
      "reading": {
        "title": "Reconocer el objetivo y los límites",
        "lead": "Un grupo dispone de 50 créditos ficticios y necesita 4 cuadernos. Cada cuaderno cuesta 7 créditos. El envío cuesta 5. No se realizará ninguna compra.",
        "context": "Un caso se resuelve mediante cuatro decisiones relacionadas. El ejemplo siguiente muestra el razonamiento; después cambiará la situación. Todos los datos son ficticios y el trabajo se realiza dentro de PRISMA.",
        "keyIdeas": [
          {
            "id": "problem",
            "title": "Comprensión del problema",
            "text": "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
            "example": "Conseguir 4 cuadernos sin superar 50 créditos, incluyendo el envío."
          },
          {
            "id": "solution",
            "title": "Diseño de la solución",
            "text": "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
            "example": "Calcular 4 × 7, sumar 5 y comparar el total con 50."
          },
          {
            "id": "context",
            "title": "Justificación y contextualización",
            "text": "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
            "example": "La opción cuesta 33 créditos y cubre los 4 cuadernos sin superar 50."
          },
          {
            "id": "check",
            "title": "Verificación y mejora",
            "text": "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión.",
            "example": "Comprobar 33 ≤ 50; si sube el envío, recalcular antes de decidir."
          }
        ],
        "strategy": "Primero comprende, después diseña, justifica con los datos y verifica frente a la condición.",
        "remember": "Una opción correcta debe responder a este caso, no solo sonar convincente."
      }
    },
    {
      "id": 2,
      "title": "Ordenar decisiones con sentido",
      "intro": "Aprende a conectar objetivo, procedimiento, razón y comprobación en una decisión cotidiana.",
      "lesson": [
        "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
        "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
        "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
        "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión."
      ],
      "questions": [
        {
          "id": "everyday-u02-case1-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u02-case1",
          "caseTitle": "Organizar una tarde",
          "context": "Hay 45 minutos para leer (13 min), preparar un esquema (11 min) y revisarlo (8 min). El esquema necesita la lectura y la revisión necesita el esquema.",
          "options": [
            "Terminar solo la tarea más corta para registrar un logro.",
            "Usar todos los minutos aunque no se revise el esquema.",
            "Hacer la revisión antes de tener un esquema.",
            "Completar las tres tareas en orden y dentro de 45 minutos."
          ],
          "answer": "Completar las tres tareas en orden y dentro de 45 minutos.",
          "explanation": "Hay dos condiciones: terminar las tres tareas y respetar sus dependencias dentro del tiempo disponible. Aplicado al caso: Completar las tres tareas en orden y dentro de 45 minutos.",
          "optionFeedback": {
            "Terminar solo la tarea más corta para registrar un logro.": "Comprueba que el objetivo respete todas las condiciones.",
            "Usar todos los minutos aunque no se revise el esquema.": "Comprueba que el objetivo respete todas las condiciones.",
            "Hacer la revisión antes de tener un esquema.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u02-case1-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u02-case1",
          "caseTitle": "Organizar una tarde",
          "context": "Hay 45 minutos para leer (13 min), preparar un esquema (11 min) y revisarlo (8 min). El esquema necesita la lectura y la revisión necesita el esquema.",
          "options": [
            "Eliminar la revisión sin comprobar si alcanza el tiempo.",
            "Hacer solo el esquema porque es la tarea central.",
            "Leer, preparar el esquema y revisarlo; sumar 13+11+8 para comprobar el tiempo.",
            "Revisar, escribir el esquema y después leer."
          ],
          "answer": "Leer, preparar el esquema y revisarlo; sumar 13+11+8 para comprobar el tiempo.",
          "explanation": "Una tarea que necesita el resultado de otra debe ir después; la suma permite comprobar si la secuencia cabe. Aplicado al caso: Leer, preparar el esquema y revisarlo; sumar 13+11+8 para comprobar el tiempo.",
          "optionFeedback": {
            "Revisar, escribir el esquema y después leer.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Eliminar la revisión sin comprobar si alcanza el tiempo.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Hacer solo el esquema porque es la tarea central.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u02-case1-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u02-case1",
          "caseTitle": "Organizar una tarde",
          "context": "Hay 45 minutos para leer (13 min), preparar un esquema (11 min) y revisarlo (8 min). El esquema necesita la lectura y la revisión necesita el esquema.",
          "options": [
            "Revisar primero evita tener que leer después.",
            "El orden respeta las dependencias y requiere 32 de los 45 minutos.",
            "El orden sirve porque empieza por la tarea cuyo nombre es más corto.",
            "Basta que cada tarea por separado tarde menos del tiempo total."
          ],
          "answer": "El orden respeta las dependencias y requiere 32 de los 45 minutos.",
          "explanation": "La razón conecta el orden necesario con la duración total; comprobar cada tarea por separado no basta. Aplicado al caso: El orden respeta las dependencias y requiere 32 de los 45 minutos.",
          "optionFeedback": {
            "El orden sirve porque empieza por la tarea cuyo nombre es más corto.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Basta que cada tarea por separado tarde menos del tiempo total.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Revisar primero evita tener que leer después.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u02-case1-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u02-case1",
          "caseTitle": "Organizar una tarde",
          "context": "Hay 45 minutos para leer (13 min), preparar un esquema (11 min) y revisarlo (8 min). El esquema necesita la lectura y la revisión necesita el esquema.",
          "options": [
            "Comparar 32 con 45 y reservar 13 minutos de margen.",
            "Comparar únicamente la duración de la lectura con la del esquema.",
            "Sumar los minutos dos veces para asegurar que no falte tiempo.",
            "Dar por cumplido el plan antes de comprobar la suma."
          ],
          "answer": "Comparar 32 con 45 y reservar 13 minutos de margen.",
          "explanation": "El margen es el tiempo disponible menos la suma de las tareas y permite revisar un posible retraso. Aplicado al caso: Comparar 32 con 45 y reservar 13 minutos de margen.",
          "optionFeedback": {
            "Comparar únicamente la duración de la lectura con la del esquema.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Sumar los minutos dos veces para asegurar que no falte tiempo.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Dar por cumplido el plan antes de comprobar la suma.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u02-case2-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u02-case2",
          "caseTitle": "Preparar una presentación",
          "context": "Hay 50 minutos para leer (14 min), preparar un esquema (12 min) y revisarlo (8 min). El esquema necesita la lectura y la revisión necesita el esquema.",
          "options": [
            "Usar todos los minutos aunque no se revise el esquema.",
            "Hacer la revisión antes de tener un esquema.",
            "Completar las tres tareas en orden y dentro de 50 minutos.",
            "Terminar solo la tarea más corta para registrar un logro."
          ],
          "answer": "Completar las tres tareas en orden y dentro de 50 minutos.",
          "explanation": "Hay dos condiciones: terminar las tres tareas y respetar sus dependencias dentro del tiempo disponible. Aplicado al caso: Completar las tres tareas en orden y dentro de 50 minutos.",
          "optionFeedback": {
            "Terminar solo la tarea más corta para registrar un logro.": "Comprueba que el objetivo respete todas las condiciones.",
            "Usar todos los minutos aunque no se revise el esquema.": "Comprueba que el objetivo respete todas las condiciones.",
            "Hacer la revisión antes de tener un esquema.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u02-case2-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u02-case2",
          "caseTitle": "Preparar una presentación",
          "context": "Hay 50 minutos para leer (14 min), preparar un esquema (12 min) y revisarlo (8 min). El esquema necesita la lectura y la revisión necesita el esquema.",
          "options": [
            "Hacer solo el esquema porque es la tarea central.",
            "Leer, preparar el esquema y revisarlo; sumar 14+12+8 para comprobar el tiempo.",
            "Revisar, escribir el esquema y después leer.",
            "Eliminar la revisión sin comprobar si alcanza el tiempo."
          ],
          "answer": "Leer, preparar el esquema y revisarlo; sumar 14+12+8 para comprobar el tiempo.",
          "explanation": "Una tarea que necesita el resultado de otra debe ir después; la suma permite comprobar si la secuencia cabe. Aplicado al caso: Leer, preparar el esquema y revisarlo; sumar 14+12+8 para comprobar el tiempo.",
          "optionFeedback": {
            "Revisar, escribir el esquema y después leer.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Eliminar la revisión sin comprobar si alcanza el tiempo.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Hacer solo el esquema porque es la tarea central.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u02-case2-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u02-case2",
          "caseTitle": "Preparar una presentación",
          "context": "Hay 50 minutos para leer (14 min), preparar un esquema (12 min) y revisarlo (8 min). El esquema necesita la lectura y la revisión necesita el esquema.",
          "options": [
            "El orden respeta las dependencias y requiere 34 de los 50 minutos.",
            "El orden sirve porque empieza por la tarea cuyo nombre es más corto.",
            "Basta que cada tarea por separado tarde menos del tiempo total.",
            "Revisar primero evita tener que leer después."
          ],
          "answer": "El orden respeta las dependencias y requiere 34 de los 50 minutos.",
          "explanation": "La razón conecta el orden necesario con la duración total; comprobar cada tarea por separado no basta. Aplicado al caso: El orden respeta las dependencias y requiere 34 de los 50 minutos.",
          "optionFeedback": {
            "El orden sirve porque empieza por la tarea cuyo nombre es más corto.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Basta que cada tarea por separado tarde menos del tiempo total.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Revisar primero evita tener que leer después.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u02-case2-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u02-case2",
          "caseTitle": "Preparar una presentación",
          "context": "Hay 50 minutos para leer (14 min), preparar un esquema (12 min) y revisarlo (8 min). El esquema necesita la lectura y la revisión necesita el esquema.",
          "options": [
            "Comparar únicamente la duración de la lectura con la del esquema.",
            "Sumar los minutos dos veces para asegurar que no falte tiempo.",
            "Dar por cumplido el plan antes de comprobar la suma.",
            "Comparar 34 con 50 y reservar 16 minutos de margen."
          ],
          "answer": "Comparar 34 con 50 y reservar 16 minutos de margen.",
          "explanation": "El margen es el tiempo disponible menos la suma de las tareas y permite revisar un posible retraso. Aplicado al caso: Comparar 34 con 50 y reservar 16 minutos de margen.",
          "optionFeedback": {
            "Comparar únicamente la duración de la lectura con la del esquema.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Sumar los minutos dos veces para asegurar que no falte tiempo.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Dar por cumplido el plan antes de comprobar la suma.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u02-case3-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u02-case3",
          "caseTitle": "Planificar una sesión",
          "context": "Hay 55 minutos para leer (15 min), preparar un esquema (13 min) y revisarlo (8 min). El esquema necesita la lectura y la revisión necesita el esquema.",
          "options": [
            "Hacer la revisión antes de tener un esquema.",
            "Completar las tres tareas en orden y dentro de 55 minutos.",
            "Terminar solo la tarea más corta para registrar un logro.",
            "Usar todos los minutos aunque no se revise el esquema."
          ],
          "answer": "Completar las tres tareas en orden y dentro de 55 minutos.",
          "explanation": "Hay dos condiciones: terminar las tres tareas y respetar sus dependencias dentro del tiempo disponible. Aplicado al caso: Completar las tres tareas en orden y dentro de 55 minutos.",
          "optionFeedback": {
            "Terminar solo la tarea más corta para registrar un logro.": "Comprueba que el objetivo respete todas las condiciones.",
            "Usar todos los minutos aunque no se revise el esquema.": "Comprueba que el objetivo respete todas las condiciones.",
            "Hacer la revisión antes de tener un esquema.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u02-case3-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u02-case3",
          "caseTitle": "Planificar una sesión",
          "context": "Hay 55 minutos para leer (15 min), preparar un esquema (13 min) y revisarlo (8 min). El esquema necesita la lectura y la revisión necesita el esquema.",
          "options": [
            "Leer, preparar el esquema y revisarlo; sumar 15+13+8 para comprobar el tiempo.",
            "Revisar, escribir el esquema y después leer.",
            "Eliminar la revisión sin comprobar si alcanza el tiempo.",
            "Hacer solo el esquema porque es la tarea central."
          ],
          "answer": "Leer, preparar el esquema y revisarlo; sumar 15+13+8 para comprobar el tiempo.",
          "explanation": "Una tarea que necesita el resultado de otra debe ir después; la suma permite comprobar si la secuencia cabe. Aplicado al caso: Leer, preparar el esquema y revisarlo; sumar 15+13+8 para comprobar el tiempo.",
          "optionFeedback": {
            "Revisar, escribir el esquema y después leer.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Eliminar la revisión sin comprobar si alcanza el tiempo.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Hacer solo el esquema porque es la tarea central.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u02-case3-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u02-case3",
          "caseTitle": "Planificar una sesión",
          "context": "Hay 55 minutos para leer (15 min), preparar un esquema (13 min) y revisarlo (8 min). El esquema necesita la lectura y la revisión necesita el esquema.",
          "options": [
            "El orden sirve porque empieza por la tarea cuyo nombre es más corto.",
            "Basta que cada tarea por separado tarde menos del tiempo total.",
            "Revisar primero evita tener que leer después.",
            "El orden respeta las dependencias y requiere 36 de los 55 minutos."
          ],
          "answer": "El orden respeta las dependencias y requiere 36 de los 55 minutos.",
          "explanation": "La razón conecta el orden necesario con la duración total; comprobar cada tarea por separado no basta. Aplicado al caso: El orden respeta las dependencias y requiere 36 de los 55 minutos.",
          "optionFeedback": {
            "El orden sirve porque empieza por la tarea cuyo nombre es más corto.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Basta que cada tarea por separado tarde menos del tiempo total.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Revisar primero evita tener que leer después.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u02-case3-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u02-case3",
          "caseTitle": "Planificar una sesión",
          "context": "Hay 55 minutos para leer (15 min), preparar un esquema (13 min) y revisarlo (8 min). El esquema necesita la lectura y la revisión necesita el esquema.",
          "options": [
            "Sumar los minutos dos veces para asegurar que no falte tiempo.",
            "Dar por cumplido el plan antes de comprobar la suma.",
            "Comparar 36 con 55 y reservar 19 minutos de margen.",
            "Comparar únicamente la duración de la lectura con la del esquema."
          ],
          "answer": "Comparar 36 con 55 y reservar 19 minutos de margen.",
          "explanation": "El margen es el tiempo disponible menos la suma de las tareas y permite revisar un posible retraso. Aplicado al caso: Comparar 36 con 55 y reservar 19 minutos de margen.",
          "optionFeedback": {
            "Comparar únicamente la duración de la lectura con la del esquema.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Sumar los minutos dos veces para asegurar que no falte tiempo.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Dar por cumplido el plan antes de comprobar la suma.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u02-case4-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u02-case4",
          "caseTitle": "Reorganizar el tiempo",
          "context": "Hay 60 minutos para leer (16 min), preparar un esquema (14 min) y revisarlo (8 min). El esquema necesita la lectura y la revisión necesita el esquema.",
          "options": [
            "Completar las tres tareas en orden y dentro de 60 minutos.",
            "Terminar solo la tarea más corta para registrar un logro.",
            "Usar todos los minutos aunque no se revise el esquema.",
            "Hacer la revisión antes de tener un esquema."
          ],
          "answer": "Completar las tres tareas en orden y dentro de 60 minutos.",
          "explanation": "Hay dos condiciones: terminar las tres tareas y respetar sus dependencias dentro del tiempo disponible. Aplicado al caso: Completar las tres tareas en orden y dentro de 60 minutos.",
          "optionFeedback": {
            "Terminar solo la tarea más corta para registrar un logro.": "Comprueba que el objetivo respete todas las condiciones.",
            "Usar todos los minutos aunque no se revise el esquema.": "Comprueba que el objetivo respete todas las condiciones.",
            "Hacer la revisión antes de tener un esquema.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u02-case4-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u02-case4",
          "caseTitle": "Reorganizar el tiempo",
          "context": "Hay 60 minutos para leer (16 min), preparar un esquema (14 min) y revisarlo (8 min). El esquema necesita la lectura y la revisión necesita el esquema.",
          "options": [
            "Revisar, escribir el esquema y después leer.",
            "Eliminar la revisión sin comprobar si alcanza el tiempo.",
            "Hacer solo el esquema porque es la tarea central.",
            "Leer, preparar el esquema y revisarlo; sumar 16+14+8 para comprobar el tiempo."
          ],
          "answer": "Leer, preparar el esquema y revisarlo; sumar 16+14+8 para comprobar el tiempo.",
          "explanation": "Una tarea que necesita el resultado de otra debe ir después; la suma permite comprobar si la secuencia cabe. Aplicado al caso: Leer, preparar el esquema y revisarlo; sumar 16+14+8 para comprobar el tiempo.",
          "optionFeedback": {
            "Revisar, escribir el esquema y después leer.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Eliminar la revisión sin comprobar si alcanza el tiempo.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Hacer solo el esquema porque es la tarea central.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u02-case4-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u02-case4",
          "caseTitle": "Reorganizar el tiempo",
          "context": "Hay 60 minutos para leer (16 min), preparar un esquema (14 min) y revisarlo (8 min). El esquema necesita la lectura y la revisión necesita el esquema.",
          "options": [
            "Basta que cada tarea por separado tarde menos del tiempo total.",
            "Revisar primero evita tener que leer después.",
            "El orden respeta las dependencias y requiere 38 de los 60 minutos.",
            "El orden sirve porque empieza por la tarea cuyo nombre es más corto."
          ],
          "answer": "El orden respeta las dependencias y requiere 38 de los 60 minutos.",
          "explanation": "La razón conecta el orden necesario con la duración total; comprobar cada tarea por separado no basta. Aplicado al caso: El orden respeta las dependencias y requiere 38 de los 60 minutos.",
          "optionFeedback": {
            "El orden sirve porque empieza por la tarea cuyo nombre es más corto.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Basta que cada tarea por separado tarde menos del tiempo total.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Revisar primero evita tener que leer después.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u02-case4-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u02-case4",
          "caseTitle": "Reorganizar el tiempo",
          "context": "Hay 60 minutos para leer (16 min), preparar un esquema (14 min) y revisarlo (8 min). El esquema necesita la lectura y la revisión necesita el esquema.",
          "options": [
            "Dar por cumplido el plan antes de comprobar la suma.",
            "Comparar 38 con 60 y reservar 22 minutos de margen.",
            "Comparar únicamente la duración de la lectura con la del esquema.",
            "Sumar los minutos dos veces para asegurar que no falte tiempo."
          ],
          "answer": "Comparar 38 con 60 y reservar 22 minutos de margen.",
          "explanation": "El margen es el tiempo disponible menos la suma de las tareas y permite revisar un posible retraso. Aplicado al caso: Comparar 38 con 60 y reservar 22 minutos de margen.",
          "optionFeedback": {
            "Comparar únicamente la duración de la lectura con la del esquema.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Sumar los minutos dos veces para asegurar que no falte tiempo.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Dar por cumplido el plan antes de comprobar la suma.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        }
      ],
      "reading": {
        "title": "Ordenar decisiones con sentido",
        "lead": "Hay 45 minutos para leer (13 min), preparar un esquema (11 min) y revisarlo (8 min). El esquema necesita la lectura y la revisión necesita el esquema.",
        "context": "Un caso se resuelve mediante cuatro decisiones relacionadas. El ejemplo siguiente muestra el razonamiento; después cambiará la situación. Todos los datos son ficticios y el trabajo se realiza dentro de PRISMA.",
        "keyIdeas": [
          {
            "id": "problem",
            "title": "Comprensión del problema",
            "text": "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
            "example": "Completar las tres tareas en orden y dentro de 45 minutos."
          },
          {
            "id": "solution",
            "title": "Diseño de la solución",
            "text": "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
            "example": "Leer, preparar el esquema y revisarlo; sumar 13+11+8 para comprobar el tiempo."
          },
          {
            "id": "context",
            "title": "Justificación y contextualización",
            "text": "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
            "example": "El orden respeta las dependencias y requiere 32 de los 45 minutos."
          },
          {
            "id": "check",
            "title": "Verificación y mejora",
            "text": "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión.",
            "example": "Comparar 32 con 45 y reservar 13 minutos de margen."
          }
        ],
        "strategy": "Primero comprende, después diseña, justifica con los datos y verifica frente a la condición.",
        "remember": "Una opción correcta debe responder a este caso, no solo sonar convincente."
      }
    },
    {
      "id": 3,
      "title": "Relacionar datos y espacio",
      "intro": "Aprende a conectar objetivo, procedimiento, razón y comprobación en una decisión cotidiana.",
      "lesson": [
        "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
        "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
        "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
        "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión."
      ],
      "questions": [
        {
          "id": "everyday-u03-case1-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u03-case1",
          "caseTitle": "Una zona de lectura",
          "context": "El plano ficticio de una sala tiene 28 m². Una distribución ocupa 10 m² con mesas. Debe quedar libre al menos la mitad del área. Solo se analizan datos; no se modifica una sala real.",
          "options": [
            "Elegir la distribución con más mesas sin revisar el espacio libre.",
            "Comprobar el color del plano en lugar de su superficie.",
            "Elegir una distribución que deje al menos 14 m² libres.",
            "Ocupar toda la sala para aprovechar cada metro cuadrado."
          ],
          "answer": "Elegir una distribución que deje al menos 14 m² libres.",
          "explanation": "La mitad del área fija el mínimo libre; tener muchas mesas no es el objetivo. Aplicado al caso: Elegir una distribución que deje al menos 14 m² libres.",
          "optionFeedback": {
            "Ocupar toda la sala para aprovechar cada metro cuadrado.": "Comprueba que el objetivo respete todas las condiciones.",
            "Elegir la distribución con más mesas sin revisar el espacio libre.": "Comprueba que el objetivo respete todas las condiciones.",
            "Comprobar el color del plano en lugar de su superficie.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u03-case1-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u03-case1",
          "caseTitle": "Una zona de lectura",
          "context": "El plano ficticio de una sala tiene 28 m². Una distribución ocupa 10 m² con mesas. Debe quedar libre al menos la mitad del área. Solo se analizan datos; no se modifica una sala real.",
          "options": [
            "Dividir 10 entre dos y llamarlo espacio disponible.",
            "Restar 10 de 28 y comparar el espacio restante con 14.",
            "Sumar 10 y 28 para obtener el espacio libre.",
            "Comparar 10 con cero, sin calcular lo que queda."
          ],
          "answer": "Restar 10 de 28 y comparar el espacio restante con 14.",
          "explanation": "El área libre se obtiene restando la ocupada de la total. Luego se compara con el mínimo exigido. Aplicado al caso: Restar 10 de 28 y comparar el espacio restante con 14.",
          "optionFeedback": {
            "Sumar 10 y 28 para obtener el espacio libre.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Comparar 10 con cero, sin calcular lo que queda.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Dividir 10 entre dos y llamarlo espacio disponible.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u03-case1-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u03-case1",
          "caseTitle": "Una zona de lectura",
          "context": "El plano ficticio de una sala tiene 28 m². Una distribución ocupa 10 m² con mesas. Debe quedar libre al menos la mitad del área. Solo se analizan datos; no se modifica una sala real.",
          "options": [
            "Quedan 18 m² libres, que alcanzan el mínimo de 14 m².",
            "Cumple porque toda sala debe tener mesas.",
            "Cumple porque el área ocupada es un número positivo.",
            "Cumple porque una distribución bonita siempre deja espacio suficiente."
          ],
          "answer": "Quedan 18 m² libres, que alcanzan el mínimo de 14 m².",
          "explanation": "La elección se justifica por el espacio que queda disponible, no por su apariencia. Aplicado al caso: Quedan 18 m² libres, que alcanzan el mínimo de 14 m².",
          "optionFeedback": {
            "Cumple porque toda sala debe tener mesas.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Cumple porque el área ocupada es un número positivo.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Cumple porque una distribución bonita siempre deja espacio suficiente.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u03-case1-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u03-case1",
          "caseTitle": "Una zona de lectura",
          "context": "El plano ficticio de una sala tiene 28 m². Una distribución ocupa 10 m² con mesas. Debe quedar libre al menos la mitad del área. Solo se analizan datos; no se modifica una sala real.",
          "options": [
            "Afirmar que sobra espacio sin calcularlo.",
            "Comparar metros cuadrados con el número de personas, sin otro dato.",
            "Mantener la distribución aunque el área libre sea inferior al mínimo.",
            "Comprobar 18 ≥ 14; si otra opción deja menos, revisar su distribución."
          ],
          "answer": "Comprobar 18 ≥ 14; si otra opción deja menos, revisar su distribución.",
          "explanation": "Una distribución puede cambiar: hay que contrastar su área libre con el mismo criterio. Aplicado al caso: Comprobar 18 ≥ 14; si otra opción deja menos, revisar su distribución.",
          "optionFeedback": {
            "Afirmar que sobra espacio sin calcularlo.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Comparar metros cuadrados con el número de personas, sin otro dato.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Mantener la distribución aunque el área libre sea inferior al mínimo.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u03-case2-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u03-case2",
          "caseTitle": "Distribuir un espacio compartido",
          "context": "El plano ficticio de una sala tiene 32 m². Una distribución ocupa 12 m² con mesas. Debe quedar libre al menos la mitad del área. Solo se analizan datos; no se modifica una sala real.",
          "options": [
            "Comprobar el color del plano en lugar de su superficie.",
            "Elegir una distribución que deje al menos 16 m² libres.",
            "Ocupar toda la sala para aprovechar cada metro cuadrado.",
            "Elegir la distribución con más mesas sin revisar el espacio libre."
          ],
          "answer": "Elegir una distribución que deje al menos 16 m² libres.",
          "explanation": "La mitad del área fija el mínimo libre; tener muchas mesas no es el objetivo. Aplicado al caso: Elegir una distribución que deje al menos 16 m² libres.",
          "optionFeedback": {
            "Ocupar toda la sala para aprovechar cada metro cuadrado.": "Comprueba que el objetivo respete todas las condiciones.",
            "Elegir la distribución con más mesas sin revisar el espacio libre.": "Comprueba que el objetivo respete todas las condiciones.",
            "Comprobar el color del plano en lugar de su superficie.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u03-case2-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u03-case2",
          "caseTitle": "Distribuir un espacio compartido",
          "context": "El plano ficticio de una sala tiene 32 m². Una distribución ocupa 12 m² con mesas. Debe quedar libre al menos la mitad del área. Solo se analizan datos; no se modifica una sala real.",
          "options": [
            "Restar 12 de 32 y comparar el espacio restante con 16.",
            "Sumar 12 y 32 para obtener el espacio libre.",
            "Comparar 12 con cero, sin calcular lo que queda.",
            "Dividir 12 entre dos y llamarlo espacio disponible."
          ],
          "answer": "Restar 12 de 32 y comparar el espacio restante con 16.",
          "explanation": "El área libre se obtiene restando la ocupada de la total. Luego se compara con el mínimo exigido. Aplicado al caso: Restar 12 de 32 y comparar el espacio restante con 16.",
          "optionFeedback": {
            "Sumar 12 y 32 para obtener el espacio libre.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Comparar 12 con cero, sin calcular lo que queda.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Dividir 12 entre dos y llamarlo espacio disponible.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u03-case2-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u03-case2",
          "caseTitle": "Distribuir un espacio compartido",
          "context": "El plano ficticio de una sala tiene 32 m². Una distribución ocupa 12 m² con mesas. Debe quedar libre al menos la mitad del área. Solo se analizan datos; no se modifica una sala real.",
          "options": [
            "Cumple porque toda sala debe tener mesas.",
            "Cumple porque el área ocupada es un número positivo.",
            "Cumple porque una distribución bonita siempre deja espacio suficiente.",
            "Quedan 20 m² libres, que alcanzan el mínimo de 16 m²."
          ],
          "answer": "Quedan 20 m² libres, que alcanzan el mínimo de 16 m².",
          "explanation": "La elección se justifica por el espacio que queda disponible, no por su apariencia. Aplicado al caso: Quedan 20 m² libres, que alcanzan el mínimo de 16 m².",
          "optionFeedback": {
            "Cumple porque toda sala debe tener mesas.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Cumple porque el área ocupada es un número positivo.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Cumple porque una distribución bonita siempre deja espacio suficiente.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u03-case2-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u03-case2",
          "caseTitle": "Distribuir un espacio compartido",
          "context": "El plano ficticio de una sala tiene 32 m². Una distribución ocupa 12 m² con mesas. Debe quedar libre al menos la mitad del área. Solo se analizan datos; no se modifica una sala real.",
          "options": [
            "Comparar metros cuadrados con el número de personas, sin otro dato.",
            "Mantener la distribución aunque el área libre sea inferior al mínimo.",
            "Comprobar 20 ≥ 16; si otra opción deja menos, revisar su distribución.",
            "Afirmar que sobra espacio sin calcularlo."
          ],
          "answer": "Comprobar 20 ≥ 16; si otra opción deja menos, revisar su distribución.",
          "explanation": "Una distribución puede cambiar: hay que contrastar su área libre con el mismo criterio. Aplicado al caso: Comprobar 20 ≥ 16; si otra opción deja menos, revisar su distribución.",
          "optionFeedback": {
            "Afirmar que sobra espacio sin calcularlo.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Comparar metros cuadrados con el número de personas, sin otro dato.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Mantener la distribución aunque el área libre sea inferior al mínimo.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u03-case3-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u03-case3",
          "caseTitle": "Una sala para conversar",
          "context": "El plano ficticio de una sala tiene 36 m². Una distribución ocupa 14 m² con mesas. Debe quedar libre al menos la mitad del área. Solo se analizan datos; no se modifica una sala real.",
          "options": [
            "Elegir una distribución que deje al menos 18 m² libres.",
            "Ocupar toda la sala para aprovechar cada metro cuadrado.",
            "Elegir la distribución con más mesas sin revisar el espacio libre.",
            "Comprobar el color del plano en lugar de su superficie."
          ],
          "answer": "Elegir una distribución que deje al menos 18 m² libres.",
          "explanation": "La mitad del área fija el mínimo libre; tener muchas mesas no es el objetivo. Aplicado al caso: Elegir una distribución que deje al menos 18 m² libres.",
          "optionFeedback": {
            "Ocupar toda la sala para aprovechar cada metro cuadrado.": "Comprueba que el objetivo respete todas las condiciones.",
            "Elegir la distribución con más mesas sin revisar el espacio libre.": "Comprueba que el objetivo respete todas las condiciones.",
            "Comprobar el color del plano en lugar de su superficie.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u03-case3-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u03-case3",
          "caseTitle": "Una sala para conversar",
          "context": "El plano ficticio de una sala tiene 36 m². Una distribución ocupa 14 m² con mesas. Debe quedar libre al menos la mitad del área. Solo se analizan datos; no se modifica una sala real.",
          "options": [
            "Sumar 14 y 36 para obtener el espacio libre.",
            "Comparar 14 con cero, sin calcular lo que queda.",
            "Dividir 14 entre dos y llamarlo espacio disponible.",
            "Restar 14 de 36 y comparar el espacio restante con 18."
          ],
          "answer": "Restar 14 de 36 y comparar el espacio restante con 18.",
          "explanation": "El área libre se obtiene restando la ocupada de la total. Luego se compara con el mínimo exigido. Aplicado al caso: Restar 14 de 36 y comparar el espacio restante con 18.",
          "optionFeedback": {
            "Sumar 14 y 36 para obtener el espacio libre.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Comparar 14 con cero, sin calcular lo que queda.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Dividir 14 entre dos y llamarlo espacio disponible.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u03-case3-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u03-case3",
          "caseTitle": "Una sala para conversar",
          "context": "El plano ficticio de una sala tiene 36 m². Una distribución ocupa 14 m² con mesas. Debe quedar libre al menos la mitad del área. Solo se analizan datos; no se modifica una sala real.",
          "options": [
            "Cumple porque el área ocupada es un número positivo.",
            "Cumple porque una distribución bonita siempre deja espacio suficiente.",
            "Quedan 22 m² libres, que alcanzan el mínimo de 18 m².",
            "Cumple porque toda sala debe tener mesas."
          ],
          "answer": "Quedan 22 m² libres, que alcanzan el mínimo de 18 m².",
          "explanation": "La elección se justifica por el espacio que queda disponible, no por su apariencia. Aplicado al caso: Quedan 22 m² libres, que alcanzan el mínimo de 18 m².",
          "optionFeedback": {
            "Cumple porque toda sala debe tener mesas.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Cumple porque el área ocupada es un número positivo.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Cumple porque una distribución bonita siempre deja espacio suficiente.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u03-case3-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u03-case3",
          "caseTitle": "Una sala para conversar",
          "context": "El plano ficticio de una sala tiene 36 m². Una distribución ocupa 14 m² con mesas. Debe quedar libre al menos la mitad del área. Solo se analizan datos; no se modifica una sala real.",
          "options": [
            "Mantener la distribución aunque el área libre sea inferior al mínimo.",
            "Comprobar 22 ≥ 18; si otra opción deja menos, revisar su distribución.",
            "Afirmar que sobra espacio sin calcularlo.",
            "Comparar metros cuadrados con el número de personas, sin otro dato."
          ],
          "answer": "Comprobar 22 ≥ 18; si otra opción deja menos, revisar su distribución.",
          "explanation": "Una distribución puede cambiar: hay que contrastar su área libre con el mismo criterio. Aplicado al caso: Comprobar 22 ≥ 18; si otra opción deja menos, revisar su distribución.",
          "optionFeedback": {
            "Afirmar que sobra espacio sin calcularlo.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Comparar metros cuadrados con el número de personas, sin otro dato.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Mantener la distribución aunque el área libre sea inferior al mínimo.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u03-case4-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u03-case4",
          "caseTitle": "Otra distribución posible",
          "context": "El plano ficticio de una sala tiene 40 m². Una distribución ocupa 16 m² con mesas. Debe quedar libre al menos la mitad del área. Solo se analizan datos; no se modifica una sala real.",
          "options": [
            "Ocupar toda la sala para aprovechar cada metro cuadrado.",
            "Elegir la distribución con más mesas sin revisar el espacio libre.",
            "Comprobar el color del plano en lugar de su superficie.",
            "Elegir una distribución que deje al menos 20 m² libres."
          ],
          "answer": "Elegir una distribución que deje al menos 20 m² libres.",
          "explanation": "La mitad del área fija el mínimo libre; tener muchas mesas no es el objetivo. Aplicado al caso: Elegir una distribución que deje al menos 20 m² libres.",
          "optionFeedback": {
            "Ocupar toda la sala para aprovechar cada metro cuadrado.": "Comprueba que el objetivo respete todas las condiciones.",
            "Elegir la distribución con más mesas sin revisar el espacio libre.": "Comprueba que el objetivo respete todas las condiciones.",
            "Comprobar el color del plano en lugar de su superficie.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u03-case4-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u03-case4",
          "caseTitle": "Otra distribución posible",
          "context": "El plano ficticio de una sala tiene 40 m². Una distribución ocupa 16 m² con mesas. Debe quedar libre al menos la mitad del área. Solo se analizan datos; no se modifica una sala real.",
          "options": [
            "Comparar 16 con cero, sin calcular lo que queda.",
            "Dividir 16 entre dos y llamarlo espacio disponible.",
            "Restar 16 de 40 y comparar el espacio restante con 20.",
            "Sumar 16 y 40 para obtener el espacio libre."
          ],
          "answer": "Restar 16 de 40 y comparar el espacio restante con 20.",
          "explanation": "El área libre se obtiene restando la ocupada de la total. Luego se compara con el mínimo exigido. Aplicado al caso: Restar 16 de 40 y comparar el espacio restante con 20.",
          "optionFeedback": {
            "Sumar 16 y 40 para obtener el espacio libre.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Comparar 16 con cero, sin calcular lo que queda.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Dividir 16 entre dos y llamarlo espacio disponible.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u03-case4-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u03-case4",
          "caseTitle": "Otra distribución posible",
          "context": "El plano ficticio de una sala tiene 40 m². Una distribución ocupa 16 m² con mesas. Debe quedar libre al menos la mitad del área. Solo se analizan datos; no se modifica una sala real.",
          "options": [
            "Cumple porque una distribución bonita siempre deja espacio suficiente.",
            "Quedan 24 m² libres, que alcanzan el mínimo de 20 m².",
            "Cumple porque toda sala debe tener mesas.",
            "Cumple porque el área ocupada es un número positivo."
          ],
          "answer": "Quedan 24 m² libres, que alcanzan el mínimo de 20 m².",
          "explanation": "La elección se justifica por el espacio que queda disponible, no por su apariencia. Aplicado al caso: Quedan 24 m² libres, que alcanzan el mínimo de 20 m².",
          "optionFeedback": {
            "Cumple porque toda sala debe tener mesas.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Cumple porque el área ocupada es un número positivo.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Cumple porque una distribución bonita siempre deja espacio suficiente.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u03-case4-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u03-case4",
          "caseTitle": "Otra distribución posible",
          "context": "El plano ficticio de una sala tiene 40 m². Una distribución ocupa 16 m² con mesas. Debe quedar libre al menos la mitad del área. Solo se analizan datos; no se modifica una sala real.",
          "options": [
            "Comprobar 24 ≥ 20; si otra opción deja menos, revisar su distribución.",
            "Afirmar que sobra espacio sin calcularlo.",
            "Comparar metros cuadrados con el número de personas, sin otro dato.",
            "Mantener la distribución aunque el área libre sea inferior al mínimo."
          ],
          "answer": "Comprobar 24 ≥ 20; si otra opción deja menos, revisar su distribución.",
          "explanation": "Una distribución puede cambiar: hay que contrastar su área libre con el mismo criterio. Aplicado al caso: Comprobar 24 ≥ 20; si otra opción deja menos, revisar su distribución.",
          "optionFeedback": {
            "Afirmar que sobra espacio sin calcularlo.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Comparar metros cuadrados con el número de personas, sin otro dato.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Mantener la distribución aunque el área libre sea inferior al mínimo.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        }
      ],
      "reading": {
        "title": "Relacionar datos y espacio",
        "lead": "El plano ficticio de una sala tiene 28 m². Una distribución ocupa 10 m² con mesas. Debe quedar libre al menos la mitad del área. Solo se analizan datos; no se modifica una sala real.",
        "context": "Un caso se resuelve mediante cuatro decisiones relacionadas. El ejemplo siguiente muestra el razonamiento; después cambiará la situación. Todos los datos son ficticios y el trabajo se realiza dentro de PRISMA.",
        "keyIdeas": [
          {
            "id": "problem",
            "title": "Comprensión del problema",
            "text": "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
            "example": "Elegir una distribución que deje al menos 14 m² libres."
          },
          {
            "id": "solution",
            "title": "Diseño de la solución",
            "text": "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
            "example": "Restar 10 de 28 y comparar el espacio restante con 14."
          },
          {
            "id": "context",
            "title": "Justificación y contextualización",
            "text": "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
            "example": "Quedan 18 m² libres, que alcanzan el mínimo de 14 m²."
          },
          {
            "id": "check",
            "title": "Verificación y mejora",
            "text": "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión.",
            "example": "Comprobar 18 ≥ 14; si otra opción deja menos, revisar su distribución."
          }
        ],
        "strategy": "Primero comprende, después diseña, justifica con los datos y verifica frente a la condición.",
        "remember": "Una opción correcta debe responder a este caso, no solo sonar convincente."
      }
    },
    {
      "id": 4,
      "title": "Comparar alternativas equivalentes",
      "intro": "Aprende a conectar objetivo, procedimiento, razón y comprobación en una decisión cotidiana.",
      "lesson": [
        "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
        "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
        "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
        "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión."
      ],
      "questions": [
        {
          "id": "everyday-u04-case1-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u04-case1",
          "caseTitle": "Comparar iluminación",
          "context": "Dos lámparas ficticias iluminan igual de bien. A consume 5 W y B 8 W. Se usarían 3 horas. Energía en Wh = potencia en W × horas. Solo debes calcular con estos datos.",
          "options": [
            "Suponer que W y Wh son la misma magnitud.",
            "Elegir la opción de menor energía para la misma iluminación y duración.",
            "Elegir siempre la de mayor potencia sin considerar el consumo.",
            "Comparar equipos durante tiempos distintos y atribuir todo a la potencia."
          ],
          "answer": "Elegir la opción de menor energía para la misma iluminación y duración.",
          "explanation": "La comparación requiere la misma función y duración, para que el consumo de energía sea el criterio pertinente. Aplicado al caso: Elegir la opción de menor energía para la misma iluminación y duración.",
          "optionFeedback": {
            "Elegir siempre la de mayor potencia sin considerar el consumo.": "Comprueba que el objetivo respete todas las condiciones.",
            "Comparar equipos durante tiempos distintos y atribuir todo a la potencia.": "Comprueba que el objetivo respete todas las condiciones.",
            "Suponer que W y Wh son la misma magnitud.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u04-case1-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u04-case1",
          "caseTitle": "Comparar iluminación",
          "context": "Dos lámparas ficticias iluminan igual de bien. A consume 5 W y B 8 W. Se usarían 3 horas. Energía en Wh = potencia en W × horas. Solo debes calcular con estos datos.",
          "options": [
            "Calcular 5×3 y 8×3, y comparar las energías en Wh.",
            "Comparar solo las letras A y B de las opciones.",
            "Sumar las potencias y tratar la suma como energía de cada equipo.",
            "Multiplicar una potencia por horas y dejar la otra sin convertir."
          ],
          "answer": "Calcular 5×3 y 8×3, y comparar las energías en Wh.",
          "explanation": "Potencia multiplicada por tiempo produce energía. Ambas alternativas deben expresarse en Wh. Aplicado al caso: Calcular 5×3 y 8×3, y comparar las energías en Wh.",
          "optionFeedback": {
            "Comparar solo las letras A y B de las opciones.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Sumar las potencias y tratar la suma como energía de cada equipo.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Multiplicar una potencia por horas y dejar la otra sin convertir.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u04-case1-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u04-case1",
          "caseTitle": "Comparar iluminación",
          "context": "Dos lámparas ficticias iluminan igual de bien. A consume 5 W y B 8 W. Se usarían 3 horas. Energía en Wh = potencia en W × horas. Solo debes calcular con estos datos.",
          "options": [
            "A conviene porque su nombre aparece primero.",
            "B conviene porque mayor potencia significa siempre mayor eficiencia.",
            "Ambas consumen igual porque funcionan la misma cantidad de horas.",
            "A usaría 15 Wh y B 24 Wh; A cumple la misma función con menos energía."
          ],
          "answer": "A usaría 15 Wh y B 24 Wh; A cumple la misma función con menos energía.",
          "explanation": "Con igual iluminación y tiempo, la menor energía permite justificar la elección; mayor potencia no significa mayor eficiencia. Aplicado al caso: A usaría 15 Wh y B 24 Wh; A cumple la misma función con menos energía.",
          "optionFeedback": {
            "A conviene porque su nombre aparece primero.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "B conviene porque mayor potencia significa siempre mayor eficiencia.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Ambas consumen igual porque funcionan la misma cantidad de horas.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u04-case1-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u04-case1",
          "caseTitle": "Comparar iluminación",
          "context": "Dos lámparas ficticias iluminan igual de bien. A consume 5 W y B 8 W. Se usarían 3 horas. Energía en Wh = potencia en W × horas. Solo debes calcular con estos datos.",
          "options": [
            "Ignorar las horas porque los equipos tienen la misma función.",
            "Concluir que el consumo real será siempre idéntico a la estimación.",
            "Comparar 15 y 24 Wh usando el mismo tiempo; recalcular si cambian las horas.",
            "Comparar la energía de A con la potencia de B como si fueran iguales."
          ],
          "answer": "Comparar 15 y 24 Wh usando el mismo tiempo; recalcular si cambian las horas.",
          "explanation": "W y Wh representan magnitudes distintas. Si cambia la duración, cambia la energía calculada. Aplicado al caso: Comparar 15 y 24 Wh usando el mismo tiempo; recalcular si cambian las horas.",
          "optionFeedback": {
            "Comparar la energía de A con la potencia de B como si fueran iguales.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Ignorar las horas porque los equipos tienen la misma función.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Concluir que el consumo real será siempre idéntico a la estimación.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u04-case2-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u04-case2",
          "caseTitle": "Elegir un equipo de lectura",
          "context": "Dos lámparas ficticias iluminan igual de bien. A consume 6 W y B 9 W. Se usarían 3 horas. Energía en Wh = potencia en W × horas. Solo debes calcular con estos datos.",
          "options": [
            "Elegir la opción de menor energía para la misma iluminación y duración.",
            "Elegir siempre la de mayor potencia sin considerar el consumo.",
            "Comparar equipos durante tiempos distintos y atribuir todo a la potencia.",
            "Suponer que W y Wh son la misma magnitud."
          ],
          "answer": "Elegir la opción de menor energía para la misma iluminación y duración.",
          "explanation": "La comparación requiere la misma función y duración, para que el consumo de energía sea el criterio pertinente. Aplicado al caso: Elegir la opción de menor energía para la misma iluminación y duración.",
          "optionFeedback": {
            "Elegir siempre la de mayor potencia sin considerar el consumo.": "Comprueba que el objetivo respete todas las condiciones.",
            "Comparar equipos durante tiempos distintos y atribuir todo a la potencia.": "Comprueba que el objetivo respete todas las condiciones.",
            "Suponer que W y Wh son la misma magnitud.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u04-case2-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u04-case2",
          "caseTitle": "Elegir un equipo de lectura",
          "context": "Dos lámparas ficticias iluminan igual de bien. A consume 6 W y B 9 W. Se usarían 3 horas. Energía en Wh = potencia en W × horas. Solo debes calcular con estos datos.",
          "options": [
            "Comparar solo las letras A y B de las opciones.",
            "Sumar las potencias y tratar la suma como energía de cada equipo.",
            "Multiplicar una potencia por horas y dejar la otra sin convertir.",
            "Calcular 6×3 y 9×3, y comparar las energías en Wh."
          ],
          "answer": "Calcular 6×3 y 9×3, y comparar las energías en Wh.",
          "explanation": "Potencia multiplicada por tiempo produce energía. Ambas alternativas deben expresarse en Wh. Aplicado al caso: Calcular 6×3 y 9×3, y comparar las energías en Wh.",
          "optionFeedback": {
            "Comparar solo las letras A y B de las opciones.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Sumar las potencias y tratar la suma como energía de cada equipo.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Multiplicar una potencia por horas y dejar la otra sin convertir.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u04-case2-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u04-case2",
          "caseTitle": "Elegir un equipo de lectura",
          "context": "Dos lámparas ficticias iluminan igual de bien. A consume 6 W y B 9 W. Se usarían 3 horas. Energía en Wh = potencia en W × horas. Solo debes calcular con estos datos.",
          "options": [
            "B conviene porque mayor potencia significa siempre mayor eficiencia.",
            "Ambas consumen igual porque funcionan la misma cantidad de horas.",
            "A usaría 18 Wh y B 27 Wh; A cumple la misma función con menos energía.",
            "A conviene porque su nombre aparece primero."
          ],
          "answer": "A usaría 18 Wh y B 27 Wh; A cumple la misma función con menos energía.",
          "explanation": "Con igual iluminación y tiempo, la menor energía permite justificar la elección; mayor potencia no significa mayor eficiencia. Aplicado al caso: A usaría 18 Wh y B 27 Wh; A cumple la misma función con menos energía.",
          "optionFeedback": {
            "A conviene porque su nombre aparece primero.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "B conviene porque mayor potencia significa siempre mayor eficiencia.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Ambas consumen igual porque funcionan la misma cantidad de horas.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u04-case2-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u04-case2",
          "caseTitle": "Elegir un equipo de lectura",
          "context": "Dos lámparas ficticias iluminan igual de bien. A consume 6 W y B 9 W. Se usarían 3 horas. Energía en Wh = potencia en W × horas. Solo debes calcular con estos datos.",
          "options": [
            "Concluir que el consumo real será siempre idéntico a la estimación.",
            "Comparar 18 y 27 Wh usando el mismo tiempo; recalcular si cambian las horas.",
            "Comparar la energía de A con la potencia de B como si fueran iguales.",
            "Ignorar las horas porque los equipos tienen la misma función."
          ],
          "answer": "Comparar 18 y 27 Wh usando el mismo tiempo; recalcular si cambian las horas.",
          "explanation": "W y Wh representan magnitudes distintas. Si cambia la duración, cambia la energía calculada. Aplicado al caso: Comparar 18 y 27 Wh usando el mismo tiempo; recalcular si cambian las horas.",
          "optionFeedback": {
            "Comparar la energía de A con la potencia de B como si fueran iguales.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Ignorar las horas porque los equipos tienen la misma función.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Concluir que el consumo real será siempre idéntico a la estimación.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u04-case3-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u04-case3",
          "caseTitle": "Decidir entre dos lámparas",
          "context": "Dos lámparas ficticias iluminan igual de bien. A consume 7 W y B 10 W. Se usarían 3 horas. Energía en Wh = potencia en W × horas. Solo debes calcular con estos datos.",
          "options": [
            "Elegir siempre la de mayor potencia sin considerar el consumo.",
            "Comparar equipos durante tiempos distintos y atribuir todo a la potencia.",
            "Suponer que W y Wh son la misma magnitud.",
            "Elegir la opción de menor energía para la misma iluminación y duración."
          ],
          "answer": "Elegir la opción de menor energía para la misma iluminación y duración.",
          "explanation": "La comparación requiere la misma función y duración, para que el consumo de energía sea el criterio pertinente. Aplicado al caso: Elegir la opción de menor energía para la misma iluminación y duración.",
          "optionFeedback": {
            "Elegir siempre la de mayor potencia sin considerar el consumo.": "Comprueba que el objetivo respete todas las condiciones.",
            "Comparar equipos durante tiempos distintos y atribuir todo a la potencia.": "Comprueba que el objetivo respete todas las condiciones.",
            "Suponer que W y Wh son la misma magnitud.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u04-case3-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u04-case3",
          "caseTitle": "Decidir entre dos lámparas",
          "context": "Dos lámparas ficticias iluminan igual de bien. A consume 7 W y B 10 W. Se usarían 3 horas. Energía en Wh = potencia en W × horas. Solo debes calcular con estos datos.",
          "options": [
            "Sumar las potencias y tratar la suma como energía de cada equipo.",
            "Multiplicar una potencia por horas y dejar la otra sin convertir.",
            "Calcular 7×3 y 10×3, y comparar las energías en Wh.",
            "Comparar solo las letras A y B de las opciones."
          ],
          "answer": "Calcular 7×3 y 10×3, y comparar las energías en Wh.",
          "explanation": "Potencia multiplicada por tiempo produce energía. Ambas alternativas deben expresarse en Wh. Aplicado al caso: Calcular 7×3 y 10×3, y comparar las energías en Wh.",
          "optionFeedback": {
            "Comparar solo las letras A y B de las opciones.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Sumar las potencias y tratar la suma como energía de cada equipo.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Multiplicar una potencia por horas y dejar la otra sin convertir.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u04-case3-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u04-case3",
          "caseTitle": "Decidir entre dos lámparas",
          "context": "Dos lámparas ficticias iluminan igual de bien. A consume 7 W y B 10 W. Se usarían 3 horas. Energía en Wh = potencia en W × horas. Solo debes calcular con estos datos.",
          "options": [
            "Ambas consumen igual porque funcionan la misma cantidad de horas.",
            "A usaría 21 Wh y B 30 Wh; A cumple la misma función con menos energía.",
            "A conviene porque su nombre aparece primero.",
            "B conviene porque mayor potencia significa siempre mayor eficiencia."
          ],
          "answer": "A usaría 21 Wh y B 30 Wh; A cumple la misma función con menos energía.",
          "explanation": "Con igual iluminación y tiempo, la menor energía permite justificar la elección; mayor potencia no significa mayor eficiencia. Aplicado al caso: A usaría 21 Wh y B 30 Wh; A cumple la misma función con menos energía.",
          "optionFeedback": {
            "A conviene porque su nombre aparece primero.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "B conviene porque mayor potencia significa siempre mayor eficiencia.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Ambas consumen igual porque funcionan la misma cantidad de horas.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u04-case3-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u04-case3",
          "caseTitle": "Decidir entre dos lámparas",
          "context": "Dos lámparas ficticias iluminan igual de bien. A consume 7 W y B 10 W. Se usarían 3 horas. Energía en Wh = potencia en W × horas. Solo debes calcular con estos datos.",
          "options": [
            "Comparar 21 y 30 Wh usando el mismo tiempo; recalcular si cambian las horas.",
            "Comparar la energía de A con la potencia de B como si fueran iguales.",
            "Ignorar las horas porque los equipos tienen la misma función.",
            "Concluir que el consumo real será siempre idéntico a la estimación."
          ],
          "answer": "Comparar 21 y 30 Wh usando el mismo tiempo; recalcular si cambian las horas.",
          "explanation": "W y Wh representan magnitudes distintas. Si cambia la duración, cambia la energía calculada. Aplicado al caso: Comparar 21 y 30 Wh usando el mismo tiempo; recalcular si cambian las horas.",
          "optionFeedback": {
            "Comparar la energía de A con la potencia de B como si fueran iguales.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Ignorar las horas porque los equipos tienen la misma función.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Concluir que el consumo real será siempre idéntico a la estimación.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u04-case4-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u04-case4",
          "caseTitle": "Revisar el consumo previsto",
          "context": "Dos lámparas ficticias iluminan igual de bien. A consume 8 W y B 11 W. Se usarían 3 horas. Energía en Wh = potencia en W × horas. Solo debes calcular con estos datos.",
          "options": [
            "Comparar equipos durante tiempos distintos y atribuir todo a la potencia.",
            "Suponer que W y Wh son la misma magnitud.",
            "Elegir la opción de menor energía para la misma iluminación y duración.",
            "Elegir siempre la de mayor potencia sin considerar el consumo."
          ],
          "answer": "Elegir la opción de menor energía para la misma iluminación y duración.",
          "explanation": "La comparación requiere la misma función y duración, para que el consumo de energía sea el criterio pertinente. Aplicado al caso: Elegir la opción de menor energía para la misma iluminación y duración.",
          "optionFeedback": {
            "Elegir siempre la de mayor potencia sin considerar el consumo.": "Comprueba que el objetivo respete todas las condiciones.",
            "Comparar equipos durante tiempos distintos y atribuir todo a la potencia.": "Comprueba que el objetivo respete todas las condiciones.",
            "Suponer que W y Wh son la misma magnitud.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u04-case4-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u04-case4",
          "caseTitle": "Revisar el consumo previsto",
          "context": "Dos lámparas ficticias iluminan igual de bien. A consume 8 W y B 11 W. Se usarían 3 horas. Energía en Wh = potencia en W × horas. Solo debes calcular con estos datos.",
          "options": [
            "Multiplicar una potencia por horas y dejar la otra sin convertir.",
            "Calcular 8×3 y 11×3, y comparar las energías en Wh.",
            "Comparar solo las letras A y B de las opciones.",
            "Sumar las potencias y tratar la suma como energía de cada equipo."
          ],
          "answer": "Calcular 8×3 y 11×3, y comparar las energías en Wh.",
          "explanation": "Potencia multiplicada por tiempo produce energía. Ambas alternativas deben expresarse en Wh. Aplicado al caso: Calcular 8×3 y 11×3, y comparar las energías en Wh.",
          "optionFeedback": {
            "Comparar solo las letras A y B de las opciones.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Sumar las potencias y tratar la suma como energía de cada equipo.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Multiplicar una potencia por horas y dejar la otra sin convertir.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u04-case4-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u04-case4",
          "caseTitle": "Revisar el consumo previsto",
          "context": "Dos lámparas ficticias iluminan igual de bien. A consume 8 W y B 11 W. Se usarían 3 horas. Energía en Wh = potencia en W × horas. Solo debes calcular con estos datos.",
          "options": [
            "A usaría 24 Wh y B 33 Wh; A cumple la misma función con menos energía.",
            "A conviene porque su nombre aparece primero.",
            "B conviene porque mayor potencia significa siempre mayor eficiencia.",
            "Ambas consumen igual porque funcionan la misma cantidad de horas."
          ],
          "answer": "A usaría 24 Wh y B 33 Wh; A cumple la misma función con menos energía.",
          "explanation": "Con igual iluminación y tiempo, la menor energía permite justificar la elección; mayor potencia no significa mayor eficiencia. Aplicado al caso: A usaría 24 Wh y B 33 Wh; A cumple la misma función con menos energía.",
          "optionFeedback": {
            "A conviene porque su nombre aparece primero.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "B conviene porque mayor potencia significa siempre mayor eficiencia.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Ambas consumen igual porque funcionan la misma cantidad de horas.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u04-case4-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u04-case4",
          "caseTitle": "Revisar el consumo previsto",
          "context": "Dos lámparas ficticias iluminan igual de bien. A consume 8 W y B 11 W. Se usarían 3 horas. Energía en Wh = potencia en W × horas. Solo debes calcular con estos datos.",
          "options": [
            "Comparar la energía de A con la potencia de B como si fueran iguales.",
            "Ignorar las horas porque los equipos tienen la misma función.",
            "Concluir que el consumo real será siempre idéntico a la estimación.",
            "Comparar 24 y 33 Wh usando el mismo tiempo; recalcular si cambian las horas."
          ],
          "answer": "Comparar 24 y 33 Wh usando el mismo tiempo; recalcular si cambian las horas.",
          "explanation": "W y Wh representan magnitudes distintas. Si cambia la duración, cambia la energía calculada. Aplicado al caso: Comparar 24 y 33 Wh usando el mismo tiempo; recalcular si cambian las horas.",
          "optionFeedback": {
            "Comparar la energía de A con la potencia de B como si fueran iguales.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Ignorar las horas porque los equipos tienen la misma función.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Concluir que el consumo real será siempre idéntico a la estimación.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        }
      ],
      "reading": {
        "title": "Comparar alternativas equivalentes",
        "lead": "Dos lámparas ficticias iluminan igual de bien. A consume 5 W y B 8 W. Se usarían 3 horas. Energía en Wh = potencia en W × horas. Solo debes calcular con estos datos.",
        "context": "Un caso se resuelve mediante cuatro decisiones relacionadas. El ejemplo siguiente muestra el razonamiento; después cambiará la situación. Todos los datos son ficticios y el trabajo se realiza dentro de PRISMA.",
        "keyIdeas": [
          {
            "id": "problem",
            "title": "Comprensión del problema",
            "text": "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
            "example": "Elegir la opción de menor energía para la misma iluminación y duración."
          },
          {
            "id": "solution",
            "title": "Diseño de la solución",
            "text": "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
            "example": "Calcular 5×3 y 8×3, y comparar las energías en Wh."
          },
          {
            "id": "context",
            "title": "Justificación y contextualización",
            "text": "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
            "example": "A usaría 15 Wh y B 24 Wh; A cumple la misma función con menos energía."
          },
          {
            "id": "check",
            "title": "Verificación y mejora",
            "text": "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión.",
            "example": "Comparar 15 y 24 Wh usando el mismo tiempo; recalcular si cambian las horas."
          }
        ],
        "strategy": "Primero comprende, después diseña, justifica con los datos y verifica frente a la condición.",
        "remember": "Una opción correcta debe responder a este caso, no solo sonar convincente."
      }
    },
    {
      "id": 5,
      "title": "Diseñar una solución para todos",
      "intro": "Aprende a conectar objetivo, procedimiento, razón y comprobación en una decisión cotidiana.",
      "lesson": [
        "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
        "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
        "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
        "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión."
      ],
      "questions": [
        {
          "id": "everyday-u05-case1-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u05-case1",
          "caseTitle": "Organizar turnos de lectura",
          "context": "21 estudiantes quieren usar una sala virtual que admite 8 personas por turno. Todos deben participar exactamente una vez. Los turnos son sucesivos y no se permite superar la capacidad.",
          "options": [
            "Organizar turnos para las 21 personas sin superar 8 en ninguno.",
            "Poner a todas las personas en un único turno aunque no quepan.",
            "Dar varios turnos a las primeras personas y dejar a otras fuera.",
            "Organizar solo grupos completos e ignorar a quienes sobren."
          ],
          "answer": "Organizar turnos para las 21 personas sin superar 8 en ninguno.",
          "explanation": "La solución debe incluir a cada persona una sola vez y respetar la capacidad en todos los turnos. Aplicado al caso: Organizar turnos para las 21 personas sin superar 8 en ninguno.",
          "optionFeedback": {
            "Poner a todas las personas en un único turno aunque no quepan.": "Comprueba que el objetivo respete todas las condiciones.",
            "Dar varios turnos a las primeras personas y dejar a otras fuera.": "Comprueba que el objetivo respete todas las condiciones.",
            "Organizar solo grupos completos e ignorar a quienes sobren.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u05-case1-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u05-case1",
          "caseTitle": "Organizar turnos de lectura",
          "context": "21 estudiantes quieren usar una sala virtual que admite 8 personas por turno. Todos deben participar exactamente una vez. Los turnos son sucesivos y no se permite superar la capacidad.",
          "options": [
            "Usar solo 2 turnos completos y dejar fuera el resto.",
            "Asignar turnos sin comprobar si una persona se repite.",
            "Añadir personas al último turno aunque supere 8.",
            "Formar grupos de hasta 8, incluir a quienes sobren y usar 3 turnos."
          ],
          "answer": "Formar grupos de hasta 8, incluir a quienes sobren y usar 3 turnos.",
          "explanation": "Se divide el total por la capacidad y, si hay un resto, se necesita otro turno. Redondear hacia abajo puede excluir personas. Aplicado al caso: Formar grupos de hasta 8, incluir a quienes sobren y usar 3 turnos.",
          "optionFeedback": {
            "Usar solo 2 turnos completos y dejar fuera el resto.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Asignar turnos sin comprobar si una persona se repite.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Añadir personas al último turno aunque supere 8.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u05-case1-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u05-case1",
          "caseTitle": "Organizar turnos de lectura",
          "context": "21 estudiantes quieren usar una sala virtual que admite 8 personas por turno. Todos deben participar exactamente una vez. Los turnos son sucesivos y no se permite superar la capacidad.",
          "options": [
            "La capacidad se puede superar cuando faltan pocas personas.",
            "Si sobra alguien, significa que no necesita participar.",
            "3 turnos permiten cubrir a todos manteniendo la capacidad máxima.",
            "La organización es justa si el primer turno está completo."
          ],
          "answer": "3 turnos permiten cubrir a todos manteniendo la capacidad máxima.",
          "explanation": "El número de turnos debe permitir incluir a todos; llenar el primer turno no demuestra que el plan completo funcione. Aplicado al caso: 3 turnos permiten cubrir a todos manteniendo la capacidad máxima.",
          "optionFeedback": {
            "La organización es justa si el primer turno está completo.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "La capacidad se puede superar cuando faltan pocas personas.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Si sobra alguien, significa que no necesita participar.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u05-case1-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u05-case1",
          "caseTitle": "Organizar turnos de lectura",
          "context": "21 estudiantes quieren usar una sala virtual que admite 8 personas por turno. Todos deben participar exactamente una vez. Los turnos son sucesivos y no se permite superar la capacidad.",
          "options": [
            "Revisar la primera lista y asumir que las demás están bien.",
            "Comprobar que las listas sumen 21, no tengan repeticiones y cada turno tenga como máximo 8.",
            "Comprobar únicamente que existan varios turnos.",
            "Contar turnos como si fueran personas."
          ],
          "answer": "Comprobar que las listas sumen 21, no tengan repeticiones y cada turno tenga como máximo 8.",
          "explanation": "Verificar el plan exige comprobar cobertura, ausencia de duplicados y capacidad, no solo contar turnos. Aplicado al caso: Comprobar que las listas sumen 21, no tengan repeticiones y cada turno tenga como máximo 8.",
          "optionFeedback": {
            "Comprobar únicamente que existan varios turnos.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Contar turnos como si fueran personas.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Revisar la primera lista y asumir que las demás están bien.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u05-case2-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u05-case2",
          "caseTitle": "Compartir una sala virtual",
          "context": "24 estudiantes quieren usar una sala virtual que admite 8 personas por turno. Todos deben participar exactamente una vez. Los turnos son sucesivos y no se permite superar la capacidad.",
          "options": [
            "Poner a todas las personas en un único turno aunque no quepan.",
            "Dar varios turnos a las primeras personas y dejar a otras fuera.",
            "Organizar solo grupos completos e ignorar a quienes sobren.",
            "Organizar turnos para las 24 personas sin superar 8 en ninguno."
          ],
          "answer": "Organizar turnos para las 24 personas sin superar 8 en ninguno.",
          "explanation": "La solución debe incluir a cada persona una sola vez y respetar la capacidad en todos los turnos. Aplicado al caso: Organizar turnos para las 24 personas sin superar 8 en ninguno.",
          "optionFeedback": {
            "Poner a todas las personas en un único turno aunque no quepan.": "Comprueba que el objetivo respete todas las condiciones.",
            "Dar varios turnos a las primeras personas y dejar a otras fuera.": "Comprueba que el objetivo respete todas las condiciones.",
            "Organizar solo grupos completos e ignorar a quienes sobren.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u05-case2-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u05-case2",
          "caseTitle": "Compartir una sala virtual",
          "context": "24 estudiantes quieren usar una sala virtual que admite 8 personas por turno. Todos deben participar exactamente una vez. Los turnos son sucesivos y no se permite superar la capacidad.",
          "options": [
            "Asignar turnos sin comprobar si una persona se repite.",
            "Añadir personas al último turno aunque supere 8.",
            "Formar grupos de hasta 8, incluir a quienes sobren y usar 3 turnos.",
            "Usar solo 2 turnos completos, aunque queden personas sin participar."
          ],
          "answer": "Formar grupos de hasta 8, incluir a quienes sobren y usar 3 turnos.",
          "explanation": "Se divide el total por la capacidad y, si hay un resto, se necesita otro turno. Redondear hacia abajo puede excluir personas. Aplicado al caso: Formar grupos de hasta 8, incluir a quienes sobren y usar 3 turnos.",
          "optionFeedback": {
            "Asignar turnos sin comprobar si una persona se repite.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Añadir personas al último turno aunque supere 8.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Usar solo 2 turnos completos, aunque queden personas sin participar.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u05-case2-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u05-case2",
          "caseTitle": "Compartir una sala virtual",
          "context": "24 estudiantes quieren usar una sala virtual que admite 8 personas por turno. Todos deben participar exactamente una vez. Los turnos son sucesivos y no se permite superar la capacidad.",
          "options": [
            "Si sobra alguien, significa que no necesita participar.",
            "3 turnos permiten cubrir a todos manteniendo la capacidad máxima.",
            "La organización es justa si el primer turno está completo.",
            "La capacidad se puede superar cuando faltan pocas personas."
          ],
          "answer": "3 turnos permiten cubrir a todos manteniendo la capacidad máxima.",
          "explanation": "El número de turnos debe permitir incluir a todos; llenar el primer turno no demuestra que el plan completo funcione. Aplicado al caso: 3 turnos permiten cubrir a todos manteniendo la capacidad máxima.",
          "optionFeedback": {
            "La organización es justa si el primer turno está completo.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "La capacidad se puede superar cuando faltan pocas personas.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Si sobra alguien, significa que no necesita participar.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u05-case2-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u05-case2",
          "caseTitle": "Compartir una sala virtual",
          "context": "24 estudiantes quieren usar una sala virtual que admite 8 personas por turno. Todos deben participar exactamente una vez. Los turnos son sucesivos y no se permite superar la capacidad.",
          "options": [
            "Comprobar que las listas sumen 24, no tengan repeticiones y cada turno tenga como máximo 8.",
            "Comprobar únicamente que existan varios turnos.",
            "Contar turnos como si fueran personas.",
            "Revisar la primera lista y asumir que las demás están bien."
          ],
          "answer": "Comprobar que las listas sumen 24, no tengan repeticiones y cada turno tenga como máximo 8.",
          "explanation": "Verificar el plan exige comprobar cobertura, ausencia de duplicados y capacidad, no solo contar turnos. Aplicado al caso: Comprobar que las listas sumen 24, no tengan repeticiones y cada turno tenga como máximo 8.",
          "optionFeedback": {
            "Comprobar únicamente que existan varios turnos.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Contar turnos como si fueran personas.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Revisar la primera lista y asumir que las demás están bien.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u05-case3-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u05-case3",
          "caseTitle": "Distribuir grupos",
          "context": "27 estudiantes quieren usar una sala virtual que admite 8 personas por turno. Todos deben participar exactamente una vez. Los turnos son sucesivos y no se permite superar la capacidad.",
          "options": [
            "Dar varios turnos a las primeras personas y dejar a otras fuera.",
            "Organizar solo grupos completos e ignorar a quienes sobren.",
            "Organizar turnos para las 27 personas sin superar 8 en ninguno.",
            "Poner a todas las personas en un único turno aunque no quepan."
          ],
          "answer": "Organizar turnos para las 27 personas sin superar 8 en ninguno.",
          "explanation": "La solución debe incluir a cada persona una sola vez y respetar la capacidad en todos los turnos. Aplicado al caso: Organizar turnos para las 27 personas sin superar 8 en ninguno.",
          "optionFeedback": {
            "Poner a todas las personas en un único turno aunque no quepan.": "Comprueba que el objetivo respete todas las condiciones.",
            "Dar varios turnos a las primeras personas y dejar a otras fuera.": "Comprueba que el objetivo respete todas las condiciones.",
            "Organizar solo grupos completos e ignorar a quienes sobren.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u05-case3-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u05-case3",
          "caseTitle": "Distribuir grupos",
          "context": "27 estudiantes quieren usar una sala virtual que admite 8 personas por turno. Todos deben participar exactamente una vez. Los turnos son sucesivos y no se permite superar la capacidad.",
          "options": [
            "Añadir personas al último turno aunque supere 8.",
            "Formar grupos de hasta 8, incluir a quienes sobren y usar 4 turnos.",
            "Usar solo 3 turnos completos y dejar fuera el resto.",
            "Asignar turnos sin comprobar si una persona se repite."
          ],
          "answer": "Formar grupos de hasta 8, incluir a quienes sobren y usar 4 turnos.",
          "explanation": "Se divide el total por la capacidad y, si hay un resto, se necesita otro turno. Redondear hacia abajo puede excluir personas. Aplicado al caso: Formar grupos de hasta 8, incluir a quienes sobren y usar 4 turnos.",
          "optionFeedback": {
            "Usar solo 3 turnos completos y dejar fuera el resto.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Asignar turnos sin comprobar si una persona se repite.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Añadir personas al último turno aunque supere 8.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u05-case3-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u05-case3",
          "caseTitle": "Distribuir grupos",
          "context": "27 estudiantes quieren usar una sala virtual que admite 8 personas por turno. Todos deben participar exactamente una vez. Los turnos son sucesivos y no se permite superar la capacidad.",
          "options": [
            "4 turnos permiten cubrir a todos manteniendo la capacidad máxima.",
            "La organización es justa si el primer turno está completo.",
            "La capacidad se puede superar cuando faltan pocas personas.",
            "Si sobra alguien, significa que no necesita participar."
          ],
          "answer": "4 turnos permiten cubrir a todos manteniendo la capacidad máxima.",
          "explanation": "El número de turnos debe permitir incluir a todos; llenar el primer turno no demuestra que el plan completo funcione. Aplicado al caso: 4 turnos permiten cubrir a todos manteniendo la capacidad máxima.",
          "optionFeedback": {
            "La organización es justa si el primer turno está completo.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "La capacidad se puede superar cuando faltan pocas personas.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Si sobra alguien, significa que no necesita participar.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u05-case3-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u05-case3",
          "caseTitle": "Distribuir grupos",
          "context": "27 estudiantes quieren usar una sala virtual que admite 8 personas por turno. Todos deben participar exactamente una vez. Los turnos son sucesivos y no se permite superar la capacidad.",
          "options": [
            "Comprobar únicamente que existan varios turnos.",
            "Contar turnos como si fueran personas.",
            "Revisar la primera lista y asumir que las demás están bien.",
            "Comprobar que las listas sumen 27, no tengan repeticiones y cada turno tenga como máximo 8."
          ],
          "answer": "Comprobar que las listas sumen 27, no tengan repeticiones y cada turno tenga como máximo 8.",
          "explanation": "Verificar el plan exige comprobar cobertura, ausencia de duplicados y capacidad, no solo contar turnos. Aplicado al caso: Comprobar que las listas sumen 27, no tengan repeticiones y cada turno tenga como máximo 8.",
          "optionFeedback": {
            "Comprobar únicamente que existan varios turnos.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Contar turnos como si fueran personas.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Revisar la primera lista y asumir que las demás están bien.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u05-case4-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u05-case4",
          "caseTitle": "Comprobar una organización nueva",
          "context": "30 estudiantes quieren usar una sala virtual que admite 8 personas por turno. Todos deben participar exactamente una vez. Los turnos son sucesivos y no se permite superar la capacidad.",
          "options": [
            "Organizar solo grupos completos e ignorar a quienes sobren.",
            "Organizar turnos para las 30 personas sin superar 8 en ninguno.",
            "Poner a todas las personas en un único turno aunque no quepan.",
            "Dar varios turnos a las primeras personas y dejar a otras fuera."
          ],
          "answer": "Organizar turnos para las 30 personas sin superar 8 en ninguno.",
          "explanation": "La solución debe incluir a cada persona una sola vez y respetar la capacidad en todos los turnos. Aplicado al caso: Organizar turnos para las 30 personas sin superar 8 en ninguno.",
          "optionFeedback": {
            "Poner a todas las personas en un único turno aunque no quepan.": "Comprueba que el objetivo respete todas las condiciones.",
            "Dar varios turnos a las primeras personas y dejar a otras fuera.": "Comprueba que el objetivo respete todas las condiciones.",
            "Organizar solo grupos completos e ignorar a quienes sobren.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u05-case4-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u05-case4",
          "caseTitle": "Comprobar una organización nueva",
          "context": "30 estudiantes quieren usar una sala virtual que admite 8 personas por turno. Todos deben participar exactamente una vez. Los turnos son sucesivos y no se permite superar la capacidad.",
          "options": [
            "Formar grupos de hasta 8, incluir a quienes sobren y usar 4 turnos.",
            "Usar solo 3 turnos completos y dejar fuera el resto.",
            "Asignar turnos sin comprobar si una persona se repite.",
            "Añadir personas al último turno aunque supere 8."
          ],
          "answer": "Formar grupos de hasta 8, incluir a quienes sobren y usar 4 turnos.",
          "explanation": "Se divide el total por la capacidad y, si hay un resto, se necesita otro turno. Redondear hacia abajo puede excluir personas. Aplicado al caso: Formar grupos de hasta 8, incluir a quienes sobren y usar 4 turnos.",
          "optionFeedback": {
            "Usar solo 3 turnos completos y dejar fuera el resto.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Asignar turnos sin comprobar si una persona se repite.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Añadir personas al último turno aunque supere 8.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u05-case4-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u05-case4",
          "caseTitle": "Comprobar una organización nueva",
          "context": "30 estudiantes quieren usar una sala virtual que admite 8 personas por turno. Todos deben participar exactamente una vez. Los turnos son sucesivos y no se permite superar la capacidad.",
          "options": [
            "La organización es justa si el primer turno está completo.",
            "La capacidad se puede superar cuando faltan pocas personas.",
            "Si sobra alguien, significa que no necesita participar.",
            "4 turnos permiten cubrir a todos manteniendo la capacidad máxima."
          ],
          "answer": "4 turnos permiten cubrir a todos manteniendo la capacidad máxima.",
          "explanation": "El número de turnos debe permitir incluir a todos; llenar el primer turno no demuestra que el plan completo funcione. Aplicado al caso: 4 turnos permiten cubrir a todos manteniendo la capacidad máxima.",
          "optionFeedback": {
            "La organización es justa si el primer turno está completo.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "La capacidad se puede superar cuando faltan pocas personas.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Si sobra alguien, significa que no necesita participar.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u05-case4-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u05-case4",
          "caseTitle": "Comprobar una organización nueva",
          "context": "30 estudiantes quieren usar una sala virtual que admite 8 personas por turno. Todos deben participar exactamente una vez. Los turnos son sucesivos y no se permite superar la capacidad.",
          "options": [
            "Contar turnos como si fueran personas.",
            "Revisar la primera lista y asumir que las demás están bien.",
            "Comprobar que las listas sumen 30, no tengan repeticiones y cada turno tenga como máximo 8.",
            "Comprobar únicamente que existan varios turnos."
          ],
          "answer": "Comprobar que las listas sumen 30, no tengan repeticiones y cada turno tenga como máximo 8.",
          "explanation": "Verificar el plan exige comprobar cobertura, ausencia de duplicados y capacidad, no solo contar turnos. Aplicado al caso: Comprobar que las listas sumen 30, no tengan repeticiones y cada turno tenga como máximo 8.",
          "optionFeedback": {
            "Comprobar únicamente que existan varios turnos.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Contar turnos como si fueran personas.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Revisar la primera lista y asumir que las demás están bien.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        }
      ],
      "reading": {
        "title": "Diseñar una solución para todos",
        "lead": "21 estudiantes quieren usar una sala virtual que admite 8 personas por turno. Todos deben participar exactamente una vez. Los turnos son sucesivos y no se permite superar la capacidad.",
        "context": "Un caso se resuelve mediante cuatro decisiones relacionadas. El ejemplo siguiente muestra el razonamiento; después cambiará la situación. Todos los datos son ficticios y el trabajo se realiza dentro de PRISMA.",
        "keyIdeas": [
          {
            "id": "problem",
            "title": "Comprensión del problema",
            "text": "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
            "example": "Organizar turnos para las 21 personas sin superar 8 en ninguno."
          },
          {
            "id": "solution",
            "title": "Diseño de la solución",
            "text": "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
            "example": "Formar grupos de hasta 8, incluir a quienes sobren y usar 3 turnos."
          },
          {
            "id": "context",
            "title": "Justificación y contextualización",
            "text": "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
            "example": "3 turnos permiten cubrir a todos manteniendo la capacidad máxima."
          },
          {
            "id": "check",
            "title": "Verificación y mejora",
            "text": "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión.",
            "example": "Comprobar que las listas sumen 21, no tengan repeticiones y cada turno tenga como máximo 8."
          }
        ],
        "strategy": "Primero comprende, después diseña, justifica con los datos y verifica frente a la condición.",
        "remember": "Una opción correcta debe responder a este caso, no solo sonar convincente."
      }
    },
    {
      "id": 6,
      "title": "Comprobar recursos disponibles",
      "intro": "Aprende a conectar objetivo, procedimiento, razón y comprobación en una decisión cotidiana.",
      "lesson": [
        "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
        "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
        "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
        "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión."
      ],
      "questions": [
        {
          "id": "everyday-u06-case1-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u06-case1",
          "caseTitle": "Archivar un trabajo",
          "context": "Un almacenamiento ficticio tiene 20 GB y ya usa 5 GB. Se necesita guardar un archivo de 14 GB. No se puede borrar el material anterior. No debes modificar archivos reales.",
          "options": [
            "Borrar lo anterior sin considerar la condición de conservarlo.",
            "Comparar únicamente el tamaño nuevo con la capacidad total.",
            "Suponer que GB indica cuántos archivos hay.",
            "Decidir si caben 14 GB nuevos conservando los 5 GB existentes."
          ],
          "answer": "Decidir si caben 14 GB nuevos conservando los 5 GB existentes.",
          "explanation": "Conservar lo anterior es una restricción: solo el espacio libre puede recibir el archivo nuevo. Aplicado al caso: Decidir si caben 14 GB nuevos conservando los 5 GB existentes.",
          "optionFeedback": {
            "Borrar lo anterior sin considerar la condición de conservarlo.": "Comprueba que el objetivo respete todas las condiciones.",
            "Comparar únicamente el tamaño nuevo con la capacidad total.": "Comprueba que el objetivo respete todas las condiciones.",
            "Suponer que GB indica cuántos archivos hay.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u06-case1-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u06-case1",
          "caseTitle": "Archivar un trabajo",
          "context": "Un almacenamiento ficticio tiene 20 GB y ya usa 5 GB. Se necesita guardar un archivo de 14 GB. No se puede borrar el material anterior. No debes modificar archivos reales.",
          "options": [
            "Comparar 5 con 14 sin usar la capacidad total.",
            "Contar los nombres de los archivos en lugar de sus tamaños.",
            "Calcular 20−5 y comparar ese espacio disponible con 14.",
            "Sumar 20+5 para calcular espacio libre."
          ],
          "answer": "Calcular 20−5 y comparar ese espacio disponible con 14.",
          "explanation": "La capacidad total incluye el espacio ocupado; restarlo evita contar dos veces recursos ya usados. Aplicado al caso: Calcular 20−5 y comparar ese espacio disponible con 14.",
          "optionFeedback": {
            "Sumar 20+5 para calcular espacio libre.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Comparar 5 con 14 sin usar la capacidad total.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Contar los nombres de los archivos en lugar de sus tamaños.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u06-case1-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u06-case1",
          "caseTitle": "Archivar un trabajo",
          "context": "Un almacenamiento ficticio tiene 20 GB y ya usa 5 GB. Se necesita guardar un archivo de 14 GB. No se puede borrar el material anterior. No debes modificar archivos reales.",
          "options": [
            "Los nombres cortos de archivo garantizan que ocupen menos espacio.",
            "Caben porque hay 15 GB libres y se necesitan 14.",
            "Caben siempre porque el almacenamiento tiene espacio usado.",
            "No importa lo que ya está guardado si el archivo nuevo es importante."
          ],
          "answer": "Caben porque hay 15 GB libres y se necesitan 14.",
          "explanation": "La comparación entre tamaño nuevo y espacio libre determina si cabe. La importancia o el nombre del archivo no cambia su tamaño. Aplicado al caso: Caben porque hay 15 GB libres y se necesitan 14.",
          "optionFeedback": {
            "Caben siempre porque el almacenamiento tiene espacio usado.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "No importa lo que ya está guardado si el archivo nuevo es importante.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Los nombres cortos de archivo garantizan que ocupen menos espacio.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u06-case1-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u06-case1",
          "caseTitle": "Archivar un trabajo",
          "context": "Un almacenamiento ficticio tiene 20 GB y ya usa 5 GB. Se necesita guardar un archivo de 14 GB. No se puede borrar el material anterior. No debes modificar archivos reales.",
          "options": [
            "Comprobar si 5+14 ≤ 20; si no, buscar capacidad adicional en el caso hipotético sin borrar lo previo.",
            "Cambiar la unidad de GB a MB sin convertir los valores.",
            "Repetir la misma decisión aunque aumente el tamaño nuevo.",
            "Concluir que falta espacio solo porque hay archivos guardados."
          ],
          "answer": "Comprobar si 5+14 ≤ 20; si no, buscar capacidad adicional en el caso hipotético sin borrar lo previo.",
          "explanation": "Sumar lo usado y lo nuevo permite verificar la capacidad total sin borrar material. Si no cabe, hay que revisar la alternativa hipotética. Aplicado al caso: Comprobar si 5+14 ≤ 20; si no, buscar capacidad adicional en el caso hipotético sin borrar lo previo.",
          "optionFeedback": {
            "Cambiar la unidad de GB a MB sin convertir los valores.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Repetir la misma decisión aunque aumente el tamaño nuevo.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Concluir que falta espacio solo porque hay archivos guardados.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u06-case2-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u06-case2",
          "caseTitle": "Guardar recursos de clase",
          "context": "Un almacenamiento ficticio tiene 20 GB y ya usa 6 GB. Se necesita guardar un archivo de 16 GB. No se puede borrar el material anterior. No debes modificar archivos reales.",
          "options": [
            "Comparar únicamente el tamaño nuevo con la capacidad total.",
            "Suponer que GB indica cuántos archivos hay.",
            "Decidir si caben 16 GB nuevos conservando los 6 GB existentes.",
            "Borrar lo anterior sin considerar la condición de conservarlo."
          ],
          "answer": "Decidir si caben 16 GB nuevos conservando los 6 GB existentes.",
          "explanation": "Conservar lo anterior es una restricción: solo el espacio libre puede recibir el archivo nuevo. Aplicado al caso: Decidir si caben 16 GB nuevos conservando los 6 GB existentes.",
          "optionFeedback": {
            "Borrar lo anterior sin considerar la condición de conservarlo.": "Comprueba que el objetivo respete todas las condiciones.",
            "Comparar únicamente el tamaño nuevo con la capacidad total.": "Comprueba que el objetivo respete todas las condiciones.",
            "Suponer que GB indica cuántos archivos hay.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u06-case2-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u06-case2",
          "caseTitle": "Guardar recursos de clase",
          "context": "Un almacenamiento ficticio tiene 20 GB y ya usa 6 GB. Se necesita guardar un archivo de 16 GB. No se puede borrar el material anterior. No debes modificar archivos reales.",
          "options": [
            "Contar los nombres de los archivos en lugar de sus tamaños.",
            "Calcular 20−6 y comparar ese espacio disponible con 16.",
            "Sumar 20+6 para calcular espacio libre.",
            "Comparar 6 con 16 sin usar la capacidad total."
          ],
          "answer": "Calcular 20−6 y comparar ese espacio disponible con 16.",
          "explanation": "La capacidad total incluye el espacio ocupado; restarlo evita contar dos veces recursos ya usados. Aplicado al caso: Calcular 20−6 y comparar ese espacio disponible con 16.",
          "optionFeedback": {
            "Sumar 20+6 para calcular espacio libre.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Comparar 6 con 16 sin usar la capacidad total.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Contar los nombres de los archivos en lugar de sus tamaños.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u06-case2-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u06-case2",
          "caseTitle": "Guardar recursos de clase",
          "context": "Un almacenamiento ficticio tiene 20 GB y ya usa 6 GB. Se necesita guardar un archivo de 16 GB. No se puede borrar el material anterior. No debes modificar archivos reales.",
          "options": [
            "No caben: hay 14 GB libres y se necesitan 16; debe plantearse otra opción.",
            "Caben siempre porque el almacenamiento tiene espacio usado.",
            "No importa lo que ya está guardado si el archivo nuevo es importante.",
            "Los nombres cortos de archivo garantizan que ocupen menos espacio."
          ],
          "answer": "No caben: hay 14 GB libres y se necesitan 16; debe plantearse otra opción.",
          "explanation": "La comparación entre tamaño nuevo y espacio libre determina si cabe. La importancia o el nombre del archivo no cambia su tamaño. Aplicado al caso: No caben: hay 14 GB libres y se necesitan 16; debe plantearse otra opción.",
          "optionFeedback": {
            "Caben siempre porque el almacenamiento tiene espacio usado.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "No importa lo que ya está guardado si el archivo nuevo es importante.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Los nombres cortos de archivo garantizan que ocupen menos espacio.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u06-case2-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u06-case2",
          "caseTitle": "Guardar recursos de clase",
          "context": "Un almacenamiento ficticio tiene 20 GB y ya usa 6 GB. Se necesita guardar un archivo de 16 GB. No se puede borrar el material anterior. No debes modificar archivos reales.",
          "options": [
            "Cambiar la unidad de GB a MB sin convertir los valores.",
            "Repetir la misma decisión aunque aumente el tamaño nuevo.",
            "Concluir que falta espacio solo porque hay archivos guardados.",
            "Comprobar si 6+16 ≤ 20; si no, buscar capacidad adicional en el caso hipotético sin borrar lo previo."
          ],
          "answer": "Comprobar si 6+16 ≤ 20; si no, buscar capacidad adicional en el caso hipotético sin borrar lo previo.",
          "explanation": "Sumar lo usado y lo nuevo permite verificar la capacidad total sin borrar material. Si no cabe, hay que revisar la alternativa hipotética. Aplicado al caso: Comprobar si 6+16 ≤ 20; si no, buscar capacidad adicional en el caso hipotético sin borrar lo previo.",
          "optionFeedback": {
            "Cambiar la unidad de GB a MB sin convertir los valores.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Repetir la misma decisión aunque aumente el tamaño nuevo.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Concluir que falta espacio solo porque hay archivos guardados.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u06-case3-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u06-case3",
          "caseTitle": "Organizar archivos",
          "context": "Un almacenamiento ficticio tiene 20 GB y ya usa 7 GB. Se necesita guardar un archivo de 18 GB. No se puede borrar el material anterior. No debes modificar archivos reales.",
          "options": [
            "Suponer que GB indica cuántos archivos hay.",
            "Decidir si caben 18 GB nuevos conservando los 7 GB existentes.",
            "Borrar lo anterior sin considerar la condición de conservarlo.",
            "Comparar únicamente el tamaño nuevo con la capacidad total."
          ],
          "answer": "Decidir si caben 18 GB nuevos conservando los 7 GB existentes.",
          "explanation": "Conservar lo anterior es una restricción: solo el espacio libre puede recibir el archivo nuevo. Aplicado al caso: Decidir si caben 18 GB nuevos conservando los 7 GB existentes.",
          "optionFeedback": {
            "Borrar lo anterior sin considerar la condición de conservarlo.": "Comprueba que el objetivo respete todas las condiciones.",
            "Comparar únicamente el tamaño nuevo con la capacidad total.": "Comprueba que el objetivo respete todas las condiciones.",
            "Suponer que GB indica cuántos archivos hay.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u06-case3-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u06-case3",
          "caseTitle": "Organizar archivos",
          "context": "Un almacenamiento ficticio tiene 20 GB y ya usa 7 GB. Se necesita guardar un archivo de 18 GB. No se puede borrar el material anterior. No debes modificar archivos reales.",
          "options": [
            "Calcular 20−7 y comparar ese espacio disponible con 18.",
            "Sumar 20+7 para calcular espacio libre.",
            "Comparar 7 con 18 sin usar la capacidad total.",
            "Contar los nombres de los archivos en lugar de sus tamaños."
          ],
          "answer": "Calcular 20−7 y comparar ese espacio disponible con 18.",
          "explanation": "La capacidad total incluye el espacio ocupado; restarlo evita contar dos veces recursos ya usados. Aplicado al caso: Calcular 20−7 y comparar ese espacio disponible con 18.",
          "optionFeedback": {
            "Sumar 20+7 para calcular espacio libre.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Comparar 7 con 18 sin usar la capacidad total.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Contar los nombres de los archivos en lugar de sus tamaños.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u06-case3-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u06-case3",
          "caseTitle": "Organizar archivos",
          "context": "Un almacenamiento ficticio tiene 20 GB y ya usa 7 GB. Se necesita guardar un archivo de 18 GB. No se puede borrar el material anterior. No debes modificar archivos reales.",
          "options": [
            "Caben siempre porque el almacenamiento tiene espacio usado.",
            "No importa lo que ya está guardado si el archivo nuevo es importante.",
            "Los nombres cortos de archivo garantizan que ocupen menos espacio.",
            "No caben: hay 13 GB libres y se necesitan 18; debe plantearse otra opción."
          ],
          "answer": "No caben: hay 13 GB libres y se necesitan 18; debe plantearse otra opción.",
          "explanation": "La comparación entre tamaño nuevo y espacio libre determina si cabe. La importancia o el nombre del archivo no cambia su tamaño. Aplicado al caso: No caben: hay 13 GB libres y se necesitan 18; debe plantearse otra opción.",
          "optionFeedback": {
            "Caben siempre porque el almacenamiento tiene espacio usado.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "No importa lo que ya está guardado si el archivo nuevo es importante.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Los nombres cortos de archivo garantizan que ocupen menos espacio.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u06-case3-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u06-case3",
          "caseTitle": "Organizar archivos",
          "context": "Un almacenamiento ficticio tiene 20 GB y ya usa 7 GB. Se necesita guardar un archivo de 18 GB. No se puede borrar el material anterior. No debes modificar archivos reales.",
          "options": [
            "Repetir la misma decisión aunque aumente el tamaño nuevo.",
            "Concluir que falta espacio solo porque hay archivos guardados.",
            "Comprobar si 7+18 ≤ 20; si no, buscar capacidad adicional en el caso hipotético sin borrar lo previo.",
            "Cambiar la unidad de GB a MB sin convertir los valores."
          ],
          "answer": "Comprobar si 7+18 ≤ 20; si no, buscar capacidad adicional en el caso hipotético sin borrar lo previo.",
          "explanation": "Sumar lo usado y lo nuevo permite verificar la capacidad total sin borrar material. Si no cabe, hay que revisar la alternativa hipotética. Aplicado al caso: Comprobar si 7+18 ≤ 20; si no, buscar capacidad adicional en el caso hipotético sin borrar lo previo.",
          "optionFeedback": {
            "Cambiar la unidad de GB a MB sin convertir los valores.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Repetir la misma decisión aunque aumente el tamaño nuevo.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Concluir que falta espacio solo porque hay archivos guardados.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u06-case4-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u06-case4",
          "caseTitle": "Comprobar espacio disponible",
          "context": "Un almacenamiento ficticio tiene 20 GB y ya usa 8 GB. Se necesita guardar un archivo de 20 GB. No se puede borrar el material anterior. No debes modificar archivos reales.",
          "options": [
            "Decidir si caben 20 GB nuevos conservando los 8 GB existentes.",
            "Borrar lo anterior sin considerar la condición de conservarlo.",
            "Comparar únicamente el tamaño nuevo con la capacidad total.",
            "Suponer que GB indica cuántos archivos hay."
          ],
          "answer": "Decidir si caben 20 GB nuevos conservando los 8 GB existentes.",
          "explanation": "Conservar lo anterior es una restricción: solo el espacio libre puede recibir el archivo nuevo. Aplicado al caso: Decidir si caben 20 GB nuevos conservando los 8 GB existentes.",
          "optionFeedback": {
            "Borrar lo anterior sin considerar la condición de conservarlo.": "Comprueba que el objetivo respete todas las condiciones.",
            "Comparar únicamente el tamaño nuevo con la capacidad total.": "Comprueba que el objetivo respete todas las condiciones.",
            "Suponer que GB indica cuántos archivos hay.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u06-case4-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u06-case4",
          "caseTitle": "Comprobar espacio disponible",
          "context": "Un almacenamiento ficticio tiene 20 GB y ya usa 8 GB. Se necesita guardar un archivo de 20 GB. No se puede borrar el material anterior. No debes modificar archivos reales.",
          "options": [
            "Sumar 20+8 para calcular espacio libre.",
            "Comparar 8 con 20 sin usar la capacidad total.",
            "Contar los nombres de los archivos en lugar de sus tamaños.",
            "Calcular 20−8 y comparar ese espacio disponible con 20."
          ],
          "answer": "Calcular 20−8 y comparar ese espacio disponible con 20.",
          "explanation": "La capacidad total incluye el espacio ocupado; restarlo evita contar dos veces recursos ya usados. Aplicado al caso: Calcular 20−8 y comparar ese espacio disponible con 20.",
          "optionFeedback": {
            "Sumar 20+8 para calcular espacio libre.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Comparar 8 con 20 sin usar la capacidad total.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Contar los nombres de los archivos en lugar de sus tamaños.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u06-case4-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u06-case4",
          "caseTitle": "Comprobar espacio disponible",
          "context": "Un almacenamiento ficticio tiene 20 GB y ya usa 8 GB. Se necesita guardar un archivo de 20 GB. No se puede borrar el material anterior. No debes modificar archivos reales.",
          "options": [
            "No importa lo que ya está guardado si el archivo nuevo es importante.",
            "Los nombres cortos de archivo garantizan que ocupen menos espacio.",
            "No caben: hay 12 GB libres y se necesitan 20; debe plantearse otra opción.",
            "Caben siempre porque el almacenamiento tiene espacio usado."
          ],
          "answer": "No caben: hay 12 GB libres y se necesitan 20; debe plantearse otra opción.",
          "explanation": "La comparación entre tamaño nuevo y espacio libre determina si cabe. La importancia o el nombre del archivo no cambia su tamaño. Aplicado al caso: No caben: hay 12 GB libres y se necesitan 20; debe plantearse otra opción.",
          "optionFeedback": {
            "Caben siempre porque el almacenamiento tiene espacio usado.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "No importa lo que ya está guardado si el archivo nuevo es importante.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Los nombres cortos de archivo garantizan que ocupen menos espacio.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u06-case4-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u06-case4",
          "caseTitle": "Comprobar espacio disponible",
          "context": "Un almacenamiento ficticio tiene 20 GB y ya usa 8 GB. Se necesita guardar un archivo de 20 GB. No se puede borrar el material anterior. No debes modificar archivos reales.",
          "options": [
            "Concluir que falta espacio solo porque hay archivos guardados.",
            "Comprobar si 8+20 ≤ 20; si no, buscar capacidad adicional en el caso hipotético sin borrar lo previo.",
            "Cambiar la unidad de GB a MB sin convertir los valores.",
            "Repetir la misma decisión aunque aumente el tamaño nuevo."
          ],
          "answer": "Comprobar si 8+20 ≤ 20; si no, buscar capacidad adicional en el caso hipotético sin borrar lo previo.",
          "explanation": "Sumar lo usado y lo nuevo permite verificar la capacidad total sin borrar material. Si no cabe, hay que revisar la alternativa hipotética. Aplicado al caso: Comprobar si 8+20 ≤ 20; si no, buscar capacidad adicional en el caso hipotético sin borrar lo previo.",
          "optionFeedback": {
            "Cambiar la unidad de GB a MB sin convertir los valores.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Repetir la misma decisión aunque aumente el tamaño nuevo.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Concluir que falta espacio solo porque hay archivos guardados.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        }
      ],
      "reading": {
        "title": "Comprobar recursos disponibles",
        "lead": "Un almacenamiento ficticio tiene 20 GB y ya usa 5 GB. Se necesita guardar un archivo de 14 GB. No se puede borrar el material anterior. No debes modificar archivos reales.",
        "context": "Un caso se resuelve mediante cuatro decisiones relacionadas. El ejemplo siguiente muestra el razonamiento; después cambiará la situación. Todos los datos son ficticios y el trabajo se realiza dentro de PRISMA.",
        "keyIdeas": [
          {
            "id": "problem",
            "title": "Comprensión del problema",
            "text": "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
            "example": "Decidir si caben 14 GB nuevos conservando los 5 GB existentes."
          },
          {
            "id": "solution",
            "title": "Diseño de la solución",
            "text": "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
            "example": "Calcular 20−5 y comparar ese espacio disponible con 14."
          },
          {
            "id": "context",
            "title": "Justificación y contextualización",
            "text": "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
            "example": "Caben porque hay 15 GB libres y se necesitan 14."
          },
          {
            "id": "check",
            "title": "Verificación y mejora",
            "text": "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión.",
            "example": "Comprobar si 5+14 ≤ 20; si no, buscar capacidad adicional en el caso hipotético sin borrar lo previo."
          }
        ],
        "strategy": "Primero comprende, después diseña, justifica con los datos y verifica frente a la condición.",
        "remember": "Una opción correcta debe responder a este caso, no solo sonar convincente."
      }
    },
    {
      "id": 7,
      "title": "Razonar con incertidumbre",
      "intro": "Aprende a conectar objetivo, procedimiento, razón y comprobación en una decisión cotidiana.",
      "lesson": [
        "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
        "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
        "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
        "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión."
      ],
      "questions": [
        {
          "id": "everyday-u07-case1-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u07-case1",
          "caseTitle": "Elegir una hora de salida",
          "context": "Tres tiempos ficticios de espera fueron 13, 16 y 19 minutos. Hay 20 minutos disponibles. Los tiempos varían; no hay garantía de que el siguiente sea igual al promedio.",
          "options": [
            "Ignorar el tiempo disponible porque ya hay tres observaciones.",
            "Tomar el promedio como una garantía para todos los casos.",
            "Usar los datos para estimar la espera y reconocer la incertidumbre.",
            "Asegurar que la siguiente espera será exactamente igual a la menor."
          ],
          "answer": "Usar los datos para estimar la espera y reconocer la incertidumbre.",
          "explanation": "Una estimación informa una decisión, pero no convierte tiempos variables en una certeza. Aplicado al caso: Usar los datos para estimar la espera y reconocer la incertidumbre.",
          "optionFeedback": {
            "Asegurar que la siguiente espera será exactamente igual a la menor.": "Comprueba que el objetivo respete todas las condiciones.",
            "Ignorar el tiempo disponible porque ya hay tres observaciones.": "Comprueba que el objetivo respete todas las condiciones.",
            "Tomar el promedio como una garantía para todos los casos.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u07-case1-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u07-case1",
          "caseTitle": "Elegir una hora de salida",
          "context": "Tres tiempos ficticios de espera fueron 13, 16 y 19 minutos. Hay 20 minutos disponibles. Los tiempos varían; no hay garantía de que el siguiente sea igual al promedio.",
          "options": [
            "Borrar el dato mayor para hacer que la decisión parezca segura.",
            "Calcular el promedio 16, comparar los tres valores con 20 y considerar un margen.",
            "Elegir solo el dato menor porque es el más conveniente.",
            "Sumar los tiempos y decir que esa suma es la próxima espera."
          ],
          "answer": "Calcular el promedio 16, comparar los tres valores con 20 y considerar un margen.",
          "explanation": "El promedio resume los datos; revisar cada valor y el tiempo disponible permite reconocer variación y margen. Aplicado al caso: Calcular el promedio 16, comparar los tres valores con 20 y considerar un margen.",
          "optionFeedback": {
            "Elegir solo el dato menor porque es el más conveniente.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Sumar los tiempos y decir que esa suma es la próxima espera.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Borrar el dato mayor para hacer que la decisión parezca segura.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u07-case1-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u07-case1",
          "caseTitle": "Elegir una hora de salida",
          "context": "Tres tiempos ficticios de espera fueron 13, 16 y 19 minutos. Hay 20 minutos disponibles. Los tiempos varían; no hay garantía de que el siguiente sea igual al promedio.",
          "options": [
            "El promedio orienta la decisión, pero la variación observada impide prometer una espera exacta.",
            "Tres datos eliminan toda incertidumbre sobre el siguiente caso.",
            "La espera debe ser siempre menor que el presupuesto de tiempo.",
            "El promedio es una duración observada en todos los casos."
          ],
          "answer": "El promedio orienta la decisión, pero la variación observada impide prometer una espera exacta.",
          "explanation": "Los datos observados no garantizan el próximo resultado. La justificación debe reconocer ese límite. Aplicado al caso: El promedio orienta la decisión, pero la variación observada impide prometer una espera exacta.",
          "optionFeedback": {
            "Tres datos eliminan toda incertidumbre sobre el siguiente caso.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "La espera debe ser siempre menor que el presupuesto de tiempo.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "El promedio es una duración observada en todos los casos.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u07-case1-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u07-case1",
          "caseTitle": "Elegir una hora de salida",
          "context": "Tres tiempos ficticios de espera fueron 13, 16 y 19 minutos. Hay 20 minutos disponibles. Los tiempos varían; no hay garantía de que el siguiente sea igual al promedio.",
          "options": [
            "Ignorar toda espera nueva que contradiga el promedio.",
            "Repetir el promedio como prueba de que no existen retrasos.",
            "Cambiar el objetivo después de ver el dato para declarar éxito siempre.",
            "Comparar una nueva espera con la estimación y ajustar el margen si los datos muestran más variación."
          ],
          "answer": "Comparar una nueva espera con la estimación y ajustar el margen si los datos muestran más variación.",
          "explanation": "Una observación nueva puede cambiar la estimación: compararla permite revisar el margen sin ocultar datos discordantes. Aplicado al caso: Comparar una nueva espera con la estimación y ajustar el margen si los datos muestran más variación.",
          "optionFeedback": {
            "Ignorar toda espera nueva que contradiga el promedio.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Repetir el promedio como prueba de que no existen retrasos.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Cambiar el objetivo después de ver el dato para declarar éxito siempre.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u07-case2-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u07-case2",
          "caseTitle": "Estimar una espera",
          "context": "Tres tiempos ficticios de espera fueron 14, 17 y 20 minutos. Hay 21 minutos disponibles. Los tiempos varían; no hay garantía de que el siguiente sea igual al promedio.",
          "options": [
            "Tomar el promedio como una garantía para todos los casos.",
            "Usar los datos para estimar la espera y reconocer la incertidumbre.",
            "Asegurar que la siguiente espera será exactamente igual a la menor.",
            "Ignorar el tiempo disponible porque ya hay tres observaciones."
          ],
          "answer": "Usar los datos para estimar la espera y reconocer la incertidumbre.",
          "explanation": "Una estimación informa una decisión, pero no convierte tiempos variables en una certeza. Aplicado al caso: Usar los datos para estimar la espera y reconocer la incertidumbre.",
          "optionFeedback": {
            "Asegurar que la siguiente espera será exactamente igual a la menor.": "Comprueba que el objetivo respete todas las condiciones.",
            "Ignorar el tiempo disponible porque ya hay tres observaciones.": "Comprueba que el objetivo respete todas las condiciones.",
            "Tomar el promedio como una garantía para todos los casos.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u07-case2-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u07-case2",
          "caseTitle": "Estimar una espera",
          "context": "Tres tiempos ficticios de espera fueron 14, 17 y 20 minutos. Hay 21 minutos disponibles. Los tiempos varían; no hay garantía de que el siguiente sea igual al promedio.",
          "options": [
            "Calcular el promedio 17, comparar los tres valores con 21 y considerar un margen.",
            "Elegir solo el dato menor porque es el más conveniente.",
            "Sumar los tiempos y decir que esa suma es la próxima espera.",
            "Borrar el dato mayor para hacer que la decisión parezca segura."
          ],
          "answer": "Calcular el promedio 17, comparar los tres valores con 21 y considerar un margen.",
          "explanation": "El promedio resume los datos; revisar cada valor y el tiempo disponible permite reconocer variación y margen. Aplicado al caso: Calcular el promedio 17, comparar los tres valores con 21 y considerar un margen.",
          "optionFeedback": {
            "Elegir solo el dato menor porque es el más conveniente.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Sumar los tiempos y decir que esa suma es la próxima espera.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Borrar el dato mayor para hacer que la decisión parezca segura.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u07-case2-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u07-case2",
          "caseTitle": "Estimar una espera",
          "context": "Tres tiempos ficticios de espera fueron 14, 17 y 20 minutos. Hay 21 minutos disponibles. Los tiempos varían; no hay garantía de que el siguiente sea igual al promedio.",
          "options": [
            "Tres datos eliminan toda incertidumbre sobre el siguiente caso.",
            "La espera debe ser siempre menor que el presupuesto de tiempo.",
            "El promedio es una duración observada en todos los casos.",
            "El promedio orienta la decisión, pero la variación observada impide prometer una espera exacta."
          ],
          "answer": "El promedio orienta la decisión, pero la variación observada impide prometer una espera exacta.",
          "explanation": "Los datos observados no garantizan el próximo resultado. La justificación debe reconocer ese límite. Aplicado al caso: El promedio orienta la decisión, pero la variación observada impide prometer una espera exacta.",
          "optionFeedback": {
            "Tres datos eliminan toda incertidumbre sobre el siguiente caso.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "La espera debe ser siempre menor que el presupuesto de tiempo.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "El promedio es una duración observada en todos los casos.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u07-case2-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u07-case2",
          "caseTitle": "Estimar una espera",
          "context": "Tres tiempos ficticios de espera fueron 14, 17 y 20 minutos. Hay 21 minutos disponibles. Los tiempos varían; no hay garantía de que el siguiente sea igual al promedio.",
          "options": [
            "Repetir el promedio como prueba de que no existen retrasos.",
            "Cambiar el objetivo después de ver el dato para declarar éxito siempre.",
            "Comparar una nueva espera con la estimación y ajustar el margen si los datos muestran más variación.",
            "Ignorar toda espera nueva que contradiga el promedio."
          ],
          "answer": "Comparar una nueva espera con la estimación y ajustar el margen si los datos muestran más variación.",
          "explanation": "Una observación nueva puede cambiar la estimación: compararla permite revisar el margen sin ocultar datos discordantes. Aplicado al caso: Comparar una nueva espera con la estimación y ajustar el margen si los datos muestran más variación.",
          "optionFeedback": {
            "Ignorar toda espera nueva que contradiga el promedio.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Repetir el promedio como prueba de que no existen retrasos.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Cambiar el objetivo después de ver el dato para declarar éxito siempre.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u07-case3-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u07-case3",
          "caseTitle": "Planificar una conexión",
          "context": "Tres tiempos ficticios de espera fueron 15, 18 y 21 minutos. Hay 22 minutos disponibles. Los tiempos varían; no hay garantía de que el siguiente sea igual al promedio.",
          "options": [
            "Usar los datos para estimar la espera y reconocer la incertidumbre.",
            "Asegurar que la siguiente espera será exactamente igual a la menor.",
            "Ignorar el tiempo disponible porque ya hay tres observaciones.",
            "Tomar el promedio como una garantía para todos los casos."
          ],
          "answer": "Usar los datos para estimar la espera y reconocer la incertidumbre.",
          "explanation": "Una estimación informa una decisión, pero no convierte tiempos variables en una certeza. Aplicado al caso: Usar los datos para estimar la espera y reconocer la incertidumbre.",
          "optionFeedback": {
            "Asegurar que la siguiente espera será exactamente igual a la menor.": "Comprueba que el objetivo respete todas las condiciones.",
            "Ignorar el tiempo disponible porque ya hay tres observaciones.": "Comprueba que el objetivo respete todas las condiciones.",
            "Tomar el promedio como una garantía para todos los casos.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u07-case3-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u07-case3",
          "caseTitle": "Planificar una conexión",
          "context": "Tres tiempos ficticios de espera fueron 15, 18 y 21 minutos. Hay 22 minutos disponibles. Los tiempos varían; no hay garantía de que el siguiente sea igual al promedio.",
          "options": [
            "Elegir solo el dato menor porque es el más conveniente.",
            "Sumar los tiempos y decir que esa suma es la próxima espera.",
            "Borrar el dato mayor para hacer que la decisión parezca segura.",
            "Calcular el promedio 18, comparar los tres valores con 22 y considerar un margen."
          ],
          "answer": "Calcular el promedio 18, comparar los tres valores con 22 y considerar un margen.",
          "explanation": "El promedio resume los datos; revisar cada valor y el tiempo disponible permite reconocer variación y margen. Aplicado al caso: Calcular el promedio 18, comparar los tres valores con 22 y considerar un margen.",
          "optionFeedback": {
            "Elegir solo el dato menor porque es el más conveniente.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Sumar los tiempos y decir que esa suma es la próxima espera.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Borrar el dato mayor para hacer que la decisión parezca segura.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u07-case3-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u07-case3",
          "caseTitle": "Planificar una conexión",
          "context": "Tres tiempos ficticios de espera fueron 15, 18 y 21 minutos. Hay 22 minutos disponibles. Los tiempos varían; no hay garantía de que el siguiente sea igual al promedio.",
          "options": [
            "La espera debe ser siempre menor que el presupuesto de tiempo.",
            "El promedio es una duración observada en todos los casos.",
            "El promedio orienta la decisión, pero la variación observada impide prometer una espera exacta.",
            "Tres datos eliminan toda incertidumbre sobre el siguiente caso."
          ],
          "answer": "El promedio orienta la decisión, pero la variación observada impide prometer una espera exacta.",
          "explanation": "Los datos observados no garantizan el próximo resultado. La justificación debe reconocer ese límite. Aplicado al caso: El promedio orienta la decisión, pero la variación observada impide prometer una espera exacta.",
          "optionFeedback": {
            "Tres datos eliminan toda incertidumbre sobre el siguiente caso.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "La espera debe ser siempre menor que el presupuesto de tiempo.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "El promedio es una duración observada en todos los casos.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u07-case3-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u07-case3",
          "caseTitle": "Planificar una conexión",
          "context": "Tres tiempos ficticios de espera fueron 15, 18 y 21 minutos. Hay 22 minutos disponibles. Los tiempos varían; no hay garantía de que el siguiente sea igual al promedio.",
          "options": [
            "Cambiar el objetivo después de ver el dato para declarar éxito siempre.",
            "Comparar una nueva espera con la estimación y ajustar el margen si los datos muestran más variación.",
            "Ignorar toda espera nueva que contradiga el promedio.",
            "Repetir el promedio como prueba de que no existen retrasos."
          ],
          "answer": "Comparar una nueva espera con la estimación y ajustar el margen si los datos muestran más variación.",
          "explanation": "Una observación nueva puede cambiar la estimación: compararla permite revisar el margen sin ocultar datos discordantes. Aplicado al caso: Comparar una nueva espera con la estimación y ajustar el margen si los datos muestran más variación.",
          "optionFeedback": {
            "Ignorar toda espera nueva que contradiga el promedio.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Repetir el promedio como prueba de que no existen retrasos.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Cambiar el objetivo después de ver el dato para declarar éxito siempre.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u07-case4-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u07-case4",
          "caseTitle": "Revisar una estimación",
          "context": "Tres tiempos ficticios de espera fueron 16, 19 y 22 minutos. Hay 23 minutos disponibles. Los tiempos varían; no hay garantía de que el siguiente sea igual al promedio.",
          "options": [
            "Asegurar que la siguiente espera será exactamente igual a la menor.",
            "Ignorar el tiempo disponible porque ya hay tres observaciones.",
            "Tomar el promedio como una garantía para todos los casos.",
            "Usar los datos para estimar la espera y reconocer la incertidumbre."
          ],
          "answer": "Usar los datos para estimar la espera y reconocer la incertidumbre.",
          "explanation": "Una estimación informa una decisión, pero no convierte tiempos variables en una certeza. Aplicado al caso: Usar los datos para estimar la espera y reconocer la incertidumbre.",
          "optionFeedback": {
            "Asegurar que la siguiente espera será exactamente igual a la menor.": "Comprueba que el objetivo respete todas las condiciones.",
            "Ignorar el tiempo disponible porque ya hay tres observaciones.": "Comprueba que el objetivo respete todas las condiciones.",
            "Tomar el promedio como una garantía para todos los casos.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u07-case4-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u07-case4",
          "caseTitle": "Revisar una estimación",
          "context": "Tres tiempos ficticios de espera fueron 16, 19 y 22 minutos. Hay 23 minutos disponibles. Los tiempos varían; no hay garantía de que el siguiente sea igual al promedio.",
          "options": [
            "Sumar los tiempos y decir que esa suma es la próxima espera.",
            "Borrar el dato mayor para hacer que la decisión parezca segura.",
            "Calcular el promedio 19, comparar los tres valores con 23 y considerar un margen.",
            "Elegir solo el dato menor porque es el más conveniente."
          ],
          "answer": "Calcular el promedio 19, comparar los tres valores con 23 y considerar un margen.",
          "explanation": "El promedio resume los datos; revisar cada valor y el tiempo disponible permite reconocer variación y margen. Aplicado al caso: Calcular el promedio 19, comparar los tres valores con 23 y considerar un margen.",
          "optionFeedback": {
            "Elegir solo el dato menor porque es el más conveniente.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Sumar los tiempos y decir que esa suma es la próxima espera.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Borrar el dato mayor para hacer que la decisión parezca segura.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u07-case4-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u07-case4",
          "caseTitle": "Revisar una estimación",
          "context": "Tres tiempos ficticios de espera fueron 16, 19 y 22 minutos. Hay 23 minutos disponibles. Los tiempos varían; no hay garantía de que el siguiente sea igual al promedio.",
          "options": [
            "El promedio es una duración observada en todos los casos.",
            "El promedio orienta la decisión, pero la variación observada impide prometer una espera exacta.",
            "Tres datos eliminan toda incertidumbre sobre el siguiente caso.",
            "La espera debe ser siempre menor que el presupuesto de tiempo."
          ],
          "answer": "El promedio orienta la decisión, pero la variación observada impide prometer una espera exacta.",
          "explanation": "Los datos observados no garantizan el próximo resultado. La justificación debe reconocer ese límite. Aplicado al caso: El promedio orienta la decisión, pero la variación observada impide prometer una espera exacta.",
          "optionFeedback": {
            "Tres datos eliminan toda incertidumbre sobre el siguiente caso.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "La espera debe ser siempre menor que el presupuesto de tiempo.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "El promedio es una duración observada en todos los casos.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u07-case4-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u07-case4",
          "caseTitle": "Revisar una estimación",
          "context": "Tres tiempos ficticios de espera fueron 16, 19 y 22 minutos. Hay 23 minutos disponibles. Los tiempos varían; no hay garantía de que el siguiente sea igual al promedio.",
          "options": [
            "Comparar una nueva espera con la estimación y ajustar el margen si los datos muestran más variación.",
            "Ignorar toda espera nueva que contradiga el promedio.",
            "Repetir el promedio como prueba de que no existen retrasos.",
            "Cambiar el objetivo después de ver el dato para declarar éxito siempre."
          ],
          "answer": "Comparar una nueva espera con la estimación y ajustar el margen si los datos muestran más variación.",
          "explanation": "Una observación nueva puede cambiar la estimación: compararla permite revisar el margen sin ocultar datos discordantes. Aplicado al caso: Comparar una nueva espera con la estimación y ajustar el margen si los datos muestran más variación.",
          "optionFeedback": {
            "Ignorar toda espera nueva que contradiga el promedio.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Repetir el promedio como prueba de que no existen retrasos.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Cambiar el objetivo después de ver el dato para declarar éxito siempre.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        }
      ],
      "reading": {
        "title": "Razonar con incertidumbre",
        "lead": "Tres tiempos ficticios de espera fueron 13, 16 y 19 minutos. Hay 20 minutos disponibles. Los tiempos varían; no hay garantía de que el siguiente sea igual al promedio.",
        "context": "Un caso se resuelve mediante cuatro decisiones relacionadas. El ejemplo siguiente muestra el razonamiento; después cambiará la situación. Todos los datos son ficticios y el trabajo se realiza dentro de PRISMA.",
        "keyIdeas": [
          {
            "id": "problem",
            "title": "Comprensión del problema",
            "text": "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
            "example": "Usar los datos para estimar la espera y reconocer la incertidumbre."
          },
          {
            "id": "solution",
            "title": "Diseño de la solución",
            "text": "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
            "example": "Calcular el promedio 16, comparar los tres valores con 20 y considerar un margen."
          },
          {
            "id": "context",
            "title": "Justificación y contextualización",
            "text": "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
            "example": "El promedio orienta la decisión, pero la variación observada impide prometer una espera exacta."
          },
          {
            "id": "check",
            "title": "Verificación y mejora",
            "text": "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión.",
            "example": "Comparar una nueva espera con la estimación y ajustar el margen si los datos muestran más variación."
          }
        ],
        "strategy": "Primero comprende, después diseña, justifica con los datos y verifica frente a la condición.",
        "remember": "Una opción correcta debe responder a este caso, no solo sonar convincente."
      }
    },
    {
      "id": 8,
      "title": "Justificar sin generalizar",
      "intro": "Aprende a conectar objetivo, procedimiento, razón y comprobación en una decisión cotidiana.",
      "lesson": [
        "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
        "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
        "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
        "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión."
      ],
      "questions": [
        {
          "id": "everyday-u08-case1-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u08-case1",
          "caseTitle": "Interpretar una consulta",
          "context": "En una consulta respondieron 35 estudiantes: 21 eligieron lectura y 14 juegos. Otros 9 no respondieron. No hay información sobre sus preferencias.",
          "options": [
            "Cambiar los votos para que todas las opciones tengan igual apoyo.",
            "Describir las respuestas sin atribuir preferencias a quienes no participaron.",
            "Afirmar que toda la comunidad prefiere lectura sin consultar a los demás.",
            "Contar las ausencias como votos por juegos."
          ],
          "answer": "Describir las respuestas sin atribuir preferencias a quienes no participaron.",
          "explanation": "Las conclusiones describen a quienes respondieron; la preferencia de los ausentes sigue siendo desconocida. Aplicado al caso: Describir las respuestas sin atribuir preferencias a quienes no participaron.",
          "optionFeedback": {
            "Afirmar que toda la comunidad prefiere lectura sin consultar a los demás.": "Comprueba que el objetivo respete todas las condiciones.",
            "Contar las ausencias como votos por juegos.": "Comprueba que el objetivo respete todas las condiciones.",
            "Cambiar los votos para que todas las opciones tengan igual apoyo.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u08-case1-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u08-case1",
          "caseTitle": "Interpretar una consulta",
          "context": "En una consulta respondieron 35 estudiantes: 21 eligieron lectura y 14 juegos. Otros 9 no respondieron. No hay información sobre sus preferencias.",
          "options": [
            "Comparar 21 y 14 entre quienes respondieron e indicar que faltan 9 respuestas.",
            "Sumar los 9 ausentes a la opción favorita.",
            "Presentar el resultado como si todas las personas hubieran contestado.",
            "Eliminar los votos de la opción menos elegida."
          ],
          "answer": "Comparar 21 y 14 entre quienes respondieron e indicar que faltan 9 respuestas.",
          "explanation": "Comparar votos identifica la preferencia observada, mientras informar las ausencias delimita el alcance. Aplicado al caso: Comparar 21 y 14 entre quienes respondieron e indicar que faltan 9 respuestas.",
          "optionFeedback": {
            "Sumar los 9 ausentes a la opción favorita.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Presentar el resultado como si todas las personas hubieran contestado.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Eliminar los votos de la opción menos elegida.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u08-case1-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u08-case1",
          "caseTitle": "Interpretar una consulta",
          "context": "En una consulta respondieron 35 estudiantes: 21 eligieron lectura y 14 juegos. Otros 9 no respondieron. No hay información sobre sus preferencias.",
          "options": [
            "Quienes no responden siempre apoyan la opción ganadora.",
            "Una mayoría permite afirmar que todos piensan igual.",
            "La opción con menos votos no tuvo ningún apoyo.",
            "Lectura es la opción más elegida entre quienes respondieron; no se conoce la preferencia de los ausentes."
          ],
          "answer": "Lectura es la opción más elegida entre quienes respondieron; no se conoce la preferencia de los ausentes.",
          "explanation": "Ser mayoría entre participantes no implica unanimidad ni representa automáticamente a quienes no contestaron. Aplicado al caso: Lectura es la opción más elegida entre quienes respondieron; no se conoce la preferencia de los ausentes.",
          "optionFeedback": {
            "Quienes no responden siempre apoyan la opción ganadora.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Una mayoría permite afirmar que todos piensan igual.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "La opción con menos votos no tuvo ningún apoyo.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u08-case1-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u08-case1",
          "caseTitle": "Interpretar una consulta",
          "context": "En una consulta respondieron 35 estudiantes: 21 eligieron lectura y 14 juegos. Otros 9 no respondieron. No hay información sobre sus preferencias.",
          "options": [
            "Sustituir las respuestas ausentes por ceros de satisfacción.",
            "Mantener la conclusión para cualquier grupo aunque cambien los datos.",
            "Revisar que los votos sumen las respuestas recibidas y limitar la conclusión a ese grupo.",
            "Comparar el nombre de las opciones para decidir cuál ganó."
          ],
          "answer": "Revisar que los votos sumen las respuestas recibidas y limitar la conclusión a ese grupo.",
          "explanation": "La suma detecta inconsistencias en los votos; limitar la conclusión evita generalizar más allá de los datos. Aplicado al caso: Revisar que los votos sumen las respuestas recibidas y limitar la conclusión a ese grupo.",
          "optionFeedback": {
            "Comparar el nombre de las opciones para decidir cuál ganó.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Sustituir las respuestas ausentes por ceros de satisfacción.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Mantener la conclusión para cualquier grupo aunque cambien los datos.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u08-case2-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u08-case2",
          "caseTitle": "Escoger una actividad",
          "context": "En una consulta respondieron 40 estudiantes: 24 eligieron lectura y 16 juegos. Otros 10 no respondieron. No hay información sobre sus preferencias.",
          "options": [
            "Describir las respuestas sin atribuir preferencias a quienes no participaron.",
            "Afirmar que toda la comunidad prefiere lectura sin consultar a los demás.",
            "Contar las ausencias como votos por juegos.",
            "Cambiar los votos para que todas las opciones tengan igual apoyo."
          ],
          "answer": "Describir las respuestas sin atribuir preferencias a quienes no participaron.",
          "explanation": "Las conclusiones describen a quienes respondieron; la preferencia de los ausentes sigue siendo desconocida. Aplicado al caso: Describir las respuestas sin atribuir preferencias a quienes no participaron.",
          "optionFeedback": {
            "Afirmar que toda la comunidad prefiere lectura sin consultar a los demás.": "Comprueba que el objetivo respete todas las condiciones.",
            "Contar las ausencias como votos por juegos.": "Comprueba que el objetivo respete todas las condiciones.",
            "Cambiar los votos para que todas las opciones tengan igual apoyo.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u08-case2-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u08-case2",
          "caseTitle": "Escoger una actividad",
          "context": "En una consulta respondieron 40 estudiantes: 24 eligieron lectura y 16 juegos. Otros 10 no respondieron. No hay información sobre sus preferencias.",
          "options": [
            "Sumar los 10 ausentes a la opción favorita.",
            "Presentar el resultado como si todas las personas hubieran contestado.",
            "Eliminar los votos de la opción menos elegida.",
            "Comparar 24 y 16 entre quienes respondieron e indicar que faltan 10 respuestas."
          ],
          "answer": "Comparar 24 y 16 entre quienes respondieron e indicar que faltan 10 respuestas.",
          "explanation": "Comparar votos identifica la preferencia observada, mientras informar las ausencias delimita el alcance. Aplicado al caso: Comparar 24 y 16 entre quienes respondieron e indicar que faltan 10 respuestas.",
          "optionFeedback": {
            "Sumar los 10 ausentes a la opción favorita.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Presentar el resultado como si todas las personas hubieran contestado.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Eliminar los votos de la opción menos elegida.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u08-case2-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u08-case2",
          "caseTitle": "Escoger una actividad",
          "context": "En una consulta respondieron 40 estudiantes: 24 eligieron lectura y 16 juegos. Otros 10 no respondieron. No hay información sobre sus preferencias.",
          "options": [
            "Una mayoría permite afirmar que todos piensan igual.",
            "La opción con menos votos no tuvo ningún apoyo.",
            "Lectura es la opción más elegida entre quienes respondieron; no se conoce la preferencia de los ausentes.",
            "Quienes no responden siempre apoyan la opción ganadora."
          ],
          "answer": "Lectura es la opción más elegida entre quienes respondieron; no se conoce la preferencia de los ausentes.",
          "explanation": "Ser mayoría entre participantes no implica unanimidad ni representa automáticamente a quienes no contestaron. Aplicado al caso: Lectura es la opción más elegida entre quienes respondieron; no se conoce la preferencia de los ausentes.",
          "optionFeedback": {
            "Quienes no responden siempre apoyan la opción ganadora.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Una mayoría permite afirmar que todos piensan igual.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "La opción con menos votos no tuvo ningún apoyo.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u08-case2-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u08-case2",
          "caseTitle": "Escoger una actividad",
          "context": "En una consulta respondieron 40 estudiantes: 24 eligieron lectura y 16 juegos. Otros 10 no respondieron. No hay información sobre sus preferencias.",
          "options": [
            "Mantener la conclusión para cualquier grupo aunque cambien los datos.",
            "Revisar que los votos sumen las respuestas recibidas y limitar la conclusión a ese grupo.",
            "Comparar el nombre de las opciones para decidir cuál ganó.",
            "Sustituir las respuestas ausentes por ceros de satisfacción."
          ],
          "answer": "Revisar que los votos sumen las respuestas recibidas y limitar la conclusión a ese grupo.",
          "explanation": "La suma detecta inconsistencias en los votos; limitar la conclusión evita generalizar más allá de los datos. Aplicado al caso: Revisar que los votos sumen las respuestas recibidas y limitar la conclusión a ese grupo.",
          "optionFeedback": {
            "Comparar el nombre de las opciones para decidir cuál ganó.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Sustituir las respuestas ausentes por ceros de satisfacción.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Mantener la conclusión para cualquier grupo aunque cambien los datos.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u08-case3-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u08-case3",
          "caseTitle": "Leer una encuesta",
          "context": "En una consulta respondieron 45 estudiantes: 27 eligieron lectura y 18 juegos. Otros 11 no respondieron. No hay información sobre sus preferencias.",
          "options": [
            "Afirmar que toda la comunidad prefiere lectura sin consultar a los demás.",
            "Contar las ausencias como votos por juegos.",
            "Cambiar los votos para que todas las opciones tengan igual apoyo.",
            "Describir las respuestas sin atribuir preferencias a quienes no participaron."
          ],
          "answer": "Describir las respuestas sin atribuir preferencias a quienes no participaron.",
          "explanation": "Las conclusiones describen a quienes respondieron; la preferencia de los ausentes sigue siendo desconocida. Aplicado al caso: Describir las respuestas sin atribuir preferencias a quienes no participaron.",
          "optionFeedback": {
            "Afirmar que toda la comunidad prefiere lectura sin consultar a los demás.": "Comprueba que el objetivo respete todas las condiciones.",
            "Contar las ausencias como votos por juegos.": "Comprueba que el objetivo respete todas las condiciones.",
            "Cambiar los votos para que todas las opciones tengan igual apoyo.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u08-case3-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u08-case3",
          "caseTitle": "Leer una encuesta",
          "context": "En una consulta respondieron 45 estudiantes: 27 eligieron lectura y 18 juegos. Otros 11 no respondieron. No hay información sobre sus preferencias.",
          "options": [
            "Presentar el resultado como si todas las personas hubieran contestado.",
            "Eliminar los votos de la opción menos elegida.",
            "Comparar 27 y 18 entre quienes respondieron e indicar que faltan 11 respuestas.",
            "Sumar los 11 ausentes a la opción favorita."
          ],
          "answer": "Comparar 27 y 18 entre quienes respondieron e indicar que faltan 11 respuestas.",
          "explanation": "Comparar votos identifica la preferencia observada, mientras informar las ausencias delimita el alcance. Aplicado al caso: Comparar 27 y 18 entre quienes respondieron e indicar que faltan 11 respuestas.",
          "optionFeedback": {
            "Sumar los 11 ausentes a la opción favorita.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Presentar el resultado como si todas las personas hubieran contestado.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Eliminar los votos de la opción menos elegida.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u08-case3-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u08-case3",
          "caseTitle": "Leer una encuesta",
          "context": "En una consulta respondieron 45 estudiantes: 27 eligieron lectura y 18 juegos. Otros 11 no respondieron. No hay información sobre sus preferencias.",
          "options": [
            "La opción con menos votos no tuvo ningún apoyo.",
            "Lectura es la opción más elegida entre quienes respondieron; no se conoce la preferencia de los ausentes.",
            "Quienes no responden siempre apoyan la opción ganadora.",
            "Una mayoría permite afirmar que todos piensan igual."
          ],
          "answer": "Lectura es la opción más elegida entre quienes respondieron; no se conoce la preferencia de los ausentes.",
          "explanation": "Ser mayoría entre participantes no implica unanimidad ni representa automáticamente a quienes no contestaron. Aplicado al caso: Lectura es la opción más elegida entre quienes respondieron; no se conoce la preferencia de los ausentes.",
          "optionFeedback": {
            "Quienes no responden siempre apoyan la opción ganadora.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Una mayoría permite afirmar que todos piensan igual.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "La opción con menos votos no tuvo ningún apoyo.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u08-case3-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u08-case3",
          "caseTitle": "Leer una encuesta",
          "context": "En una consulta respondieron 45 estudiantes: 27 eligieron lectura y 18 juegos. Otros 11 no respondieron. No hay información sobre sus preferencias.",
          "options": [
            "Revisar que los votos sumen las respuestas recibidas y limitar la conclusión a ese grupo.",
            "Comparar el nombre de las opciones para decidir cuál ganó.",
            "Sustituir las respuestas ausentes por ceros de satisfacción.",
            "Mantener la conclusión para cualquier grupo aunque cambien los datos."
          ],
          "answer": "Revisar que los votos sumen las respuestas recibidas y limitar la conclusión a ese grupo.",
          "explanation": "La suma detecta inconsistencias en los votos; limitar la conclusión evita generalizar más allá de los datos. Aplicado al caso: Revisar que los votos sumen las respuestas recibidas y limitar la conclusión a ese grupo.",
          "optionFeedback": {
            "Comparar el nombre de las opciones para decidir cuál ganó.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Sustituir las respuestas ausentes por ceros de satisfacción.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Mantener la conclusión para cualquier grupo aunque cambien los datos.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u08-case4-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u08-case4",
          "caseTitle": "Revisar una conclusión del grupo",
          "context": "En una consulta respondieron 50 estudiantes: 30 eligieron lectura y 20 juegos. Otros 12 no respondieron. No hay información sobre sus preferencias.",
          "options": [
            "Contar las ausencias como votos por juegos.",
            "Cambiar los votos para que todas las opciones tengan igual apoyo.",
            "Describir las respuestas sin atribuir preferencias a quienes no participaron.",
            "Afirmar que toda la comunidad prefiere lectura sin consultar a los demás."
          ],
          "answer": "Describir las respuestas sin atribuir preferencias a quienes no participaron.",
          "explanation": "Las conclusiones describen a quienes respondieron; la preferencia de los ausentes sigue siendo desconocida. Aplicado al caso: Describir las respuestas sin atribuir preferencias a quienes no participaron.",
          "optionFeedback": {
            "Afirmar que toda la comunidad prefiere lectura sin consultar a los demás.": "Comprueba que el objetivo respete todas las condiciones.",
            "Contar las ausencias como votos por juegos.": "Comprueba que el objetivo respete todas las condiciones.",
            "Cambiar los votos para que todas las opciones tengan igual apoyo.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u08-case4-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u08-case4",
          "caseTitle": "Revisar una conclusión del grupo",
          "context": "En una consulta respondieron 50 estudiantes: 30 eligieron lectura y 20 juegos. Otros 12 no respondieron. No hay información sobre sus preferencias.",
          "options": [
            "Eliminar los votos de la opción menos elegida.",
            "Comparar 30 y 20 entre quienes respondieron e indicar que faltan 12 respuestas.",
            "Sumar los 12 ausentes a la opción favorita.",
            "Presentar el resultado como si todas las personas hubieran contestado."
          ],
          "answer": "Comparar 30 y 20 entre quienes respondieron e indicar que faltan 12 respuestas.",
          "explanation": "Comparar votos identifica la preferencia observada, mientras informar las ausencias delimita el alcance. Aplicado al caso: Comparar 30 y 20 entre quienes respondieron e indicar que faltan 12 respuestas.",
          "optionFeedback": {
            "Sumar los 12 ausentes a la opción favorita.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Presentar el resultado como si todas las personas hubieran contestado.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Eliminar los votos de la opción menos elegida.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u08-case4-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u08-case4",
          "caseTitle": "Revisar una conclusión del grupo",
          "context": "En una consulta respondieron 50 estudiantes: 30 eligieron lectura y 20 juegos. Otros 12 no respondieron. No hay información sobre sus preferencias.",
          "options": [
            "Lectura es la opción más elegida entre quienes respondieron; no se conoce la preferencia de los ausentes.",
            "Quienes no responden siempre apoyan la opción ganadora.",
            "Una mayoría permite afirmar que todos piensan igual.",
            "La opción con menos votos no tuvo ningún apoyo."
          ],
          "answer": "Lectura es la opción más elegida entre quienes respondieron; no se conoce la preferencia de los ausentes.",
          "explanation": "Ser mayoría entre participantes no implica unanimidad ni representa automáticamente a quienes no contestaron. Aplicado al caso: Lectura es la opción más elegida entre quienes respondieron; no se conoce la preferencia de los ausentes.",
          "optionFeedback": {
            "Quienes no responden siempre apoyan la opción ganadora.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Una mayoría permite afirmar que todos piensan igual.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "La opción con menos votos no tuvo ningún apoyo.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u08-case4-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u08-case4",
          "caseTitle": "Revisar una conclusión del grupo",
          "context": "En una consulta respondieron 50 estudiantes: 30 eligieron lectura y 20 juegos. Otros 12 no respondieron. No hay información sobre sus preferencias.",
          "options": [
            "Comparar el nombre de las opciones para decidir cuál ganó.",
            "Sustituir las respuestas ausentes por ceros de satisfacción.",
            "Mantener la conclusión para cualquier grupo aunque cambien los datos.",
            "Revisar que los votos sumen las respuestas recibidas y limitar la conclusión a ese grupo."
          ],
          "answer": "Revisar que los votos sumen las respuestas recibidas y limitar la conclusión a ese grupo.",
          "explanation": "La suma detecta inconsistencias en los votos; limitar la conclusión evita generalizar más allá de los datos. Aplicado al caso: Revisar que los votos sumen las respuestas recibidas y limitar la conclusión a ese grupo.",
          "optionFeedback": {
            "Comparar el nombre de las opciones para decidir cuál ganó.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Sustituir las respuestas ausentes por ceros de satisfacción.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Mantener la conclusión para cualquier grupo aunque cambien los datos.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        }
      ],
      "reading": {
        "title": "Justificar sin generalizar",
        "lead": "En una consulta respondieron 35 estudiantes: 21 eligieron lectura y 14 juegos. Otros 9 no respondieron. No hay información sobre sus preferencias.",
        "context": "Un caso se resuelve mediante cuatro decisiones relacionadas. El ejemplo siguiente muestra el razonamiento; después cambiará la situación. Todos los datos son ficticios y el trabajo se realiza dentro de PRISMA.",
        "keyIdeas": [
          {
            "id": "problem",
            "title": "Comprensión del problema",
            "text": "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
            "example": "Describir las respuestas sin atribuir preferencias a quienes no participaron."
          },
          {
            "id": "solution",
            "title": "Diseño de la solución",
            "text": "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
            "example": "Comparar 21 y 14 entre quienes respondieron e indicar que faltan 9 respuestas."
          },
          {
            "id": "context",
            "title": "Justificación y contextualización",
            "text": "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
            "example": "Lectura es la opción más elegida entre quienes respondieron; no se conoce la preferencia de los ausentes."
          },
          {
            "id": "check",
            "title": "Verificación y mejora",
            "text": "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión.",
            "example": "Revisar que los votos sumen las respuestas recibidas y limitar la conclusión a ese grupo."
          }
        ],
        "strategy": "Primero comprende, después diseña, justifica con los datos y verifica frente a la condición.",
        "remember": "Una opción correcta debe responder a este caso, no solo sonar convincente."
      }
    },
    {
      "id": 9,
      "title": "Verificar una mejora",
      "intro": "Aprende a conectar objetivo, procedimiento, razón y comprobación en una decisión cotidiana.",
      "lesson": [
        "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
        "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
        "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
        "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión."
      ],
      "questions": [
        {
          "id": "everyday-u09-case1-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u09-case1",
          "caseTitle": "Comparar residuos ficticios",
          "context": "Un registro ficticio de 5 días pasó de 22 a 16 objetos mal clasificados. La meta era quedar en 18 o menos. Se usó el mismo número de días, pero no se conoce el total de objetos en cada período.",
          "options": [
            "Comprobar la meta del conteo y reconocer qué falta para comparar proporciones.",
            "Asegurar que mejoró el porcentaje sin conocer los totales.",
            "Concluir que ningún objeto quedó mal clasificado.",
            "Cambiar la meta para que siempre coincida con el resultado."
          ],
          "answer": "Comprobar la meta del conteo y reconocer qué falta para comparar proporciones.",
          "explanation": "El conteo y la proporción son distintos: la meta del conteo puede comprobarse aunque falten totales. Aplicado al caso: Comprobar la meta del conteo y reconocer qué falta para comparar proporciones.",
          "optionFeedback": {
            "Asegurar que mejoró el porcentaje sin conocer los totales.": "Comprueba que el objetivo respete todas las condiciones.",
            "Concluir que ningún objeto quedó mal clasificado.": "Comprueba que el objetivo respete todas las condiciones.",
            "Cambiar la meta para que siempre coincida con el resultado.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u09-case1-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u09-case1",
          "caseTitle": "Comparar residuos ficticios",
          "context": "Un registro ficticio de 5 días pasó de 22 a 16 objetos mal clasificados. La meta era quedar en 18 o menos. Se usó el mismo número de días, pero no se conoce el total de objetos en cada período.",
          "options": [
            "Comparar períodos de distinta duración sin ajustar la comparación.",
            "Tratar el conteo de objetos como si ya fuera un porcentaje.",
            "Usar solamente el resultado inicial para evaluar la meta.",
            "Comparar 16 con 18, calcular la diferencia con 22 y señalar los totales desconocidos."
          ],
          "answer": "Comparar 16 con 18, calcular la diferencia con 22 y señalar los totales desconocidos.",
          "explanation": "Se contrasta el resultado con la meta y el valor inicial; sin denominadores no se calcula una proporción. Aplicado al caso: Comparar 16 con 18, calcular la diferencia con 22 y señalar los totales desconocidos.",
          "optionFeedback": {
            "Comparar períodos de distinta duración sin ajustar la comparación.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Tratar el conteo de objetos como si ya fuera un porcentaje.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Usar solamente el resultado inicial para evaluar la meta.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u09-case1-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u09-case1",
          "caseTitle": "Comparar residuos ficticios",
          "context": "Un registro ficticio de 5 días pasó de 22 a 16 objetos mal clasificados. La meta era quedar en 18 o menos. Se usó el mismo número de días, pero no se conoce el total de objetos en cada período.",
          "options": [
            "Todo descenso de conteo demuestra igual descenso de porcentaje.",
            "La falta de totales obliga a decir que el conteo no cambió.",
            "El conteo cumple la meta porque 16 ≤ 18; no basta para afirmar una mejora porcentual.",
            "Cumplir una meta prueba que cualquier acción realizada fue la causa."
          ],
          "answer": "El conteo cumple la meta porque 16 ≤ 18; no basta para afirmar una mejora porcentual.",
          "explanation": "Alcanzar la meta del conteo no demuestra por sí solo una mejora porcentual ni la causa del cambio. Aplicado al caso: El conteo cumple la meta porque 16 ≤ 18; no basta para afirmar una mejora porcentual.",
          "optionFeedback": {
            "Cumplir una meta prueba que cualquier acción realizada fue la causa.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Todo descenso de conteo demuestra igual descenso de porcentaje.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "La falta de totales obliga a decir que el conteo no cambió.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u09-case1-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u09-case1",
          "caseTitle": "Comparar residuos ficticios",
          "context": "Un registro ficticio de 5 días pasó de 22 a 16 objetos mal clasificados. La meta era quedar en 18 o menos. Se usó el mismo número de días, pero no se conoce el total de objetos en cada período.",
          "options": [
            "Confundir alcanzar la meta con demostrar la causa del cambio.",
            "Verificar duración, conteos y meta; para comparar proporciones, identificar los totales que faltan.",
            "Inventar totales y presentarlos como observaciones reales.",
            "Eliminar el período inicial porque el resultado final es mejor."
          ],
          "answer": "Verificar duración, conteos y meta; para comparar proporciones, identificar los totales que faltan.",
          "explanation": "Los mismos días hacen comparable la duración; para proporciones faltan los totales de objetos de ambos períodos. Aplicado al caso: Verificar duración, conteos y meta; para comparar proporciones, identificar los totales que faltan.",
          "optionFeedback": {
            "Inventar totales y presentarlos como observaciones reales.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Eliminar el período inicial porque el resultado final es mejor.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Confundir alcanzar la meta con demostrar la causa del cambio.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u09-case2-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u09-case2",
          "caseTitle": "Evaluar una mejora de organización",
          "context": "Un registro ficticio de 5 días pasó de 24 a 18 objetos mal clasificados. La meta era quedar en 20 o menos. Se usó el mismo número de días, pero no se conoce el total de objetos en cada período.",
          "options": [
            "Asegurar que mejoró el porcentaje sin conocer los totales.",
            "Concluir que ningún objeto quedó mal clasificado.",
            "Cambiar la meta para que siempre coincida con el resultado.",
            "Comprobar la meta del conteo y reconocer qué falta para comparar proporciones."
          ],
          "answer": "Comprobar la meta del conteo y reconocer qué falta para comparar proporciones.",
          "explanation": "El conteo y la proporción son distintos: la meta del conteo puede comprobarse aunque falten totales. Aplicado al caso: Comprobar la meta del conteo y reconocer qué falta para comparar proporciones.",
          "optionFeedback": {
            "Asegurar que mejoró el porcentaje sin conocer los totales.": "Comprueba que el objetivo respete todas las condiciones.",
            "Concluir que ningún objeto quedó mal clasificado.": "Comprueba que el objetivo respete todas las condiciones.",
            "Cambiar la meta para que siempre coincida con el resultado.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u09-case2-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u09-case2",
          "caseTitle": "Evaluar una mejora de organización",
          "context": "Un registro ficticio de 5 días pasó de 24 a 18 objetos mal clasificados. La meta era quedar en 20 o menos. Se usó el mismo número de días, pero no se conoce el total de objetos en cada período.",
          "options": [
            "Tratar el conteo de objetos como si ya fuera un porcentaje.",
            "Usar solamente el resultado inicial para evaluar la meta.",
            "Comparar 18 con 20, calcular la diferencia con 24 y señalar los totales desconocidos.",
            "Comparar períodos de distinta duración sin ajustar la comparación."
          ],
          "answer": "Comparar 18 con 20, calcular la diferencia con 24 y señalar los totales desconocidos.",
          "explanation": "Se contrasta el resultado con la meta y el valor inicial; sin denominadores no se calcula una proporción. Aplicado al caso: Comparar 18 con 20, calcular la diferencia con 24 y señalar los totales desconocidos.",
          "optionFeedback": {
            "Comparar períodos de distinta duración sin ajustar la comparación.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Tratar el conteo de objetos como si ya fuera un porcentaje.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Usar solamente el resultado inicial para evaluar la meta.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u09-case2-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u09-case2",
          "caseTitle": "Evaluar una mejora de organización",
          "context": "Un registro ficticio de 5 días pasó de 24 a 18 objetos mal clasificados. La meta era quedar en 20 o menos. Se usó el mismo número de días, pero no se conoce el total de objetos en cada período.",
          "options": [
            "La falta de totales obliga a decir que el conteo no cambió.",
            "El conteo cumple la meta porque 18 ≤ 20; no basta para afirmar una mejora porcentual.",
            "Cumplir una meta prueba que cualquier acción realizada fue la causa.",
            "Todo descenso de conteo demuestra igual descenso de porcentaje."
          ],
          "answer": "El conteo cumple la meta porque 18 ≤ 20; no basta para afirmar una mejora porcentual.",
          "explanation": "Alcanzar la meta del conteo no demuestra por sí solo una mejora porcentual ni la causa del cambio. Aplicado al caso: El conteo cumple la meta porque 18 ≤ 20; no basta para afirmar una mejora porcentual.",
          "optionFeedback": {
            "Cumplir una meta prueba que cualquier acción realizada fue la causa.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Todo descenso de conteo demuestra igual descenso de porcentaje.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "La falta de totales obliga a decir que el conteo no cambió.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u09-case2-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u09-case2",
          "caseTitle": "Evaluar una mejora de organización",
          "context": "Un registro ficticio de 5 días pasó de 24 a 18 objetos mal clasificados. La meta era quedar en 20 o menos. Se usó el mismo número de días, pero no se conoce el total de objetos en cada período.",
          "options": [
            "Verificar duración, conteos y meta; para comparar proporciones, identificar los totales que faltan.",
            "Inventar totales y presentarlos como observaciones reales.",
            "Eliminar el período inicial porque el resultado final es mejor.",
            "Confundir alcanzar la meta con demostrar la causa del cambio."
          ],
          "answer": "Verificar duración, conteos y meta; para comparar proporciones, identificar los totales que faltan.",
          "explanation": "Los mismos días hacen comparable la duración; para proporciones faltan los totales de objetos de ambos períodos. Aplicado al caso: Verificar duración, conteos y meta; para comparar proporciones, identificar los totales que faltan.",
          "optionFeedback": {
            "Inventar totales y presentarlos como observaciones reales.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Eliminar el período inicial porque el resultado final es mejor.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Confundir alcanzar la meta con demostrar la causa del cambio.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u09-case3-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u09-case3",
          "caseTitle": "Leer un registro semanal",
          "context": "Un registro ficticio de 5 días pasó de 26 a 20 objetos mal clasificados. La meta era quedar en 22 o menos. Se usó el mismo número de días, pero no se conoce el total de objetos en cada período.",
          "options": [
            "Concluir que ningún objeto quedó mal clasificado.",
            "Cambiar la meta para que siempre coincida con el resultado.",
            "Comprobar la meta del conteo y reconocer qué falta para comparar proporciones.",
            "Asegurar que mejoró el porcentaje sin conocer los totales."
          ],
          "answer": "Comprobar la meta del conteo y reconocer qué falta para comparar proporciones.",
          "explanation": "El conteo y la proporción son distintos: la meta del conteo puede comprobarse aunque falten totales. Aplicado al caso: Comprobar la meta del conteo y reconocer qué falta para comparar proporciones.",
          "optionFeedback": {
            "Asegurar que mejoró el porcentaje sin conocer los totales.": "Comprueba que el objetivo respete todas las condiciones.",
            "Concluir que ningún objeto quedó mal clasificado.": "Comprueba que el objetivo respete todas las condiciones.",
            "Cambiar la meta para que siempre coincida con el resultado.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u09-case3-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u09-case3",
          "caseTitle": "Leer un registro semanal",
          "context": "Un registro ficticio de 5 días pasó de 26 a 20 objetos mal clasificados. La meta era quedar en 22 o menos. Se usó el mismo número de días, pero no se conoce el total de objetos en cada período.",
          "options": [
            "Usar solamente el resultado inicial para evaluar la meta.",
            "Comparar 20 con 22, calcular la diferencia con 26 y señalar los totales desconocidos.",
            "Comparar períodos de distinta duración sin ajustar la comparación.",
            "Tratar el conteo de objetos como si ya fuera un porcentaje."
          ],
          "answer": "Comparar 20 con 22, calcular la diferencia con 26 y señalar los totales desconocidos.",
          "explanation": "Se contrasta el resultado con la meta y el valor inicial; sin denominadores no se calcula una proporción. Aplicado al caso: Comparar 20 con 22, calcular la diferencia con 26 y señalar los totales desconocidos.",
          "optionFeedback": {
            "Comparar períodos de distinta duración sin ajustar la comparación.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Tratar el conteo de objetos como si ya fuera un porcentaje.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Usar solamente el resultado inicial para evaluar la meta.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u09-case3-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u09-case3",
          "caseTitle": "Leer un registro semanal",
          "context": "Un registro ficticio de 5 días pasó de 26 a 20 objetos mal clasificados. La meta era quedar en 22 o menos. Se usó el mismo número de días, pero no se conoce el total de objetos en cada período.",
          "options": [
            "El conteo cumple la meta porque 20 ≤ 22; no basta para afirmar una mejora porcentual.",
            "Cumplir una meta prueba que cualquier acción realizada fue la causa.",
            "Todo descenso de conteo demuestra igual descenso de porcentaje.",
            "La falta de totales obliga a decir que el conteo no cambió."
          ],
          "answer": "El conteo cumple la meta porque 20 ≤ 22; no basta para afirmar una mejora porcentual.",
          "explanation": "Alcanzar la meta del conteo no demuestra por sí solo una mejora porcentual ni la causa del cambio. Aplicado al caso: El conteo cumple la meta porque 20 ≤ 22; no basta para afirmar una mejora porcentual.",
          "optionFeedback": {
            "Cumplir una meta prueba que cualquier acción realizada fue la causa.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Todo descenso de conteo demuestra igual descenso de porcentaje.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "La falta de totales obliga a decir que el conteo no cambió.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u09-case3-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u09-case3",
          "caseTitle": "Leer un registro semanal",
          "context": "Un registro ficticio de 5 días pasó de 26 a 20 objetos mal clasificados. La meta era quedar en 22 o menos. Se usó el mismo número de días, pero no se conoce el total de objetos en cada período.",
          "options": [
            "Inventar totales y presentarlos como observaciones reales.",
            "Eliminar el período inicial porque el resultado final es mejor.",
            "Confundir alcanzar la meta con demostrar la causa del cambio.",
            "Verificar duración, conteos y meta; para comparar proporciones, identificar los totales que faltan."
          ],
          "answer": "Verificar duración, conteos y meta; para comparar proporciones, identificar los totales que faltan.",
          "explanation": "Los mismos días hacen comparable la duración; para proporciones faltan los totales de objetos de ambos períodos. Aplicado al caso: Verificar duración, conteos y meta; para comparar proporciones, identificar los totales que faltan.",
          "optionFeedback": {
            "Inventar totales y presentarlos como observaciones reales.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Eliminar el período inicial porque el resultado final es mejor.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Confundir alcanzar la meta con demostrar la causa del cambio.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u09-case4-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u09-case4",
          "caseTitle": "Revisar si se alcanzó una meta",
          "context": "Un registro ficticio de 5 días pasó de 28 a 22 objetos mal clasificados. La meta era quedar en 24 o menos. Se usó el mismo número de días, pero no se conoce el total de objetos en cada período.",
          "options": [
            "Cambiar la meta para que siempre coincida con el resultado.",
            "Comprobar la meta del conteo y reconocer qué falta para comparar proporciones.",
            "Asegurar que mejoró el porcentaje sin conocer los totales.",
            "Concluir que ningún objeto quedó mal clasificado."
          ],
          "answer": "Comprobar la meta del conteo y reconocer qué falta para comparar proporciones.",
          "explanation": "El conteo y la proporción son distintos: la meta del conteo puede comprobarse aunque falten totales. Aplicado al caso: Comprobar la meta del conteo y reconocer qué falta para comparar proporciones.",
          "optionFeedback": {
            "Asegurar que mejoró el porcentaje sin conocer los totales.": "Comprueba que el objetivo respete todas las condiciones.",
            "Concluir que ningún objeto quedó mal clasificado.": "Comprueba que el objetivo respete todas las condiciones.",
            "Cambiar la meta para que siempre coincida con el resultado.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u09-case4-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u09-case4",
          "caseTitle": "Revisar si se alcanzó una meta",
          "context": "Un registro ficticio de 5 días pasó de 28 a 22 objetos mal clasificados. La meta era quedar en 24 o menos. Se usó el mismo número de días, pero no se conoce el total de objetos en cada período.",
          "options": [
            "Comparar 22 con 24, calcular la diferencia con 28 y señalar los totales desconocidos.",
            "Comparar períodos de distinta duración sin ajustar la comparación.",
            "Tratar el conteo de objetos como si ya fuera un porcentaje.",
            "Usar solamente el resultado inicial para evaluar la meta."
          ],
          "answer": "Comparar 22 con 24, calcular la diferencia con 28 y señalar los totales desconocidos.",
          "explanation": "Se contrasta el resultado con la meta y el valor inicial; sin denominadores no se calcula una proporción. Aplicado al caso: Comparar 22 con 24, calcular la diferencia con 28 y señalar los totales desconocidos.",
          "optionFeedback": {
            "Comparar períodos de distinta duración sin ajustar la comparación.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Tratar el conteo de objetos como si ya fuera un porcentaje.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Usar solamente el resultado inicial para evaluar la meta.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u09-case4-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u09-case4",
          "caseTitle": "Revisar si se alcanzó una meta",
          "context": "Un registro ficticio de 5 días pasó de 28 a 22 objetos mal clasificados. La meta era quedar en 24 o menos. Se usó el mismo número de días, pero no se conoce el total de objetos en cada período.",
          "options": [
            "Cumplir una meta prueba que cualquier acción realizada fue la causa.",
            "Todo descenso de conteo demuestra igual descenso de porcentaje.",
            "La falta de totales obliga a decir que el conteo no cambió.",
            "El conteo cumple la meta porque 22 ≤ 24; no basta para afirmar una mejora porcentual."
          ],
          "answer": "El conteo cumple la meta porque 22 ≤ 24; no basta para afirmar una mejora porcentual.",
          "explanation": "Alcanzar la meta del conteo no demuestra por sí solo una mejora porcentual ni la causa del cambio. Aplicado al caso: El conteo cumple la meta porque 22 ≤ 24; no basta para afirmar una mejora porcentual.",
          "optionFeedback": {
            "Cumplir una meta prueba que cualquier acción realizada fue la causa.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Todo descenso de conteo demuestra igual descenso de porcentaje.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "La falta de totales obliga a decir que el conteo no cambió.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u09-case4-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u09-case4",
          "caseTitle": "Revisar si se alcanzó una meta",
          "context": "Un registro ficticio de 5 días pasó de 28 a 22 objetos mal clasificados. La meta era quedar en 24 o menos. Se usó el mismo número de días, pero no se conoce el total de objetos en cada período.",
          "options": [
            "Eliminar el período inicial porque el resultado final es mejor.",
            "Confundir alcanzar la meta con demostrar la causa del cambio.",
            "Verificar duración, conteos y meta; para comparar proporciones, identificar los totales que faltan.",
            "Inventar totales y presentarlos como observaciones reales."
          ],
          "answer": "Verificar duración, conteos y meta; para comparar proporciones, identificar los totales que faltan.",
          "explanation": "Los mismos días hacen comparable la duración; para proporciones faltan los totales de objetos de ambos períodos. Aplicado al caso: Verificar duración, conteos y meta; para comparar proporciones, identificar los totales que faltan.",
          "optionFeedback": {
            "Inventar totales y presentarlos como observaciones reales.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Eliminar el período inicial porque el resultado final es mejor.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Confundir alcanzar la meta con demostrar la causa del cambio.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        }
      ],
      "reading": {
        "title": "Verificar una mejora",
        "lead": "Un registro ficticio de 5 días pasó de 22 a 16 objetos mal clasificados. La meta era quedar en 18 o menos. Se usó el mismo número de días, pero no se conoce el total de objetos en cada período.",
        "context": "Un caso se resuelve mediante cuatro decisiones relacionadas. El ejemplo siguiente muestra el razonamiento; después cambiará la situación. Todos los datos son ficticios y el trabajo se realiza dentro de PRISMA.",
        "keyIdeas": [
          {
            "id": "problem",
            "title": "Comprensión del problema",
            "text": "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
            "example": "Comprobar la meta del conteo y reconocer qué falta para comparar proporciones."
          },
          {
            "id": "solution",
            "title": "Diseño de la solución",
            "text": "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
            "example": "Comparar 16 con 18, calcular la diferencia con 22 y señalar los totales desconocidos."
          },
          {
            "id": "context",
            "title": "Justificación y contextualización",
            "text": "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
            "example": "El conteo cumple la meta porque 16 ≤ 18; no basta para afirmar una mejora porcentual."
          },
          {
            "id": "check",
            "title": "Verificación y mejora",
            "text": "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión.",
            "example": "Verificar duración, conteos y meta; para comparar proporciones, identificar los totales que faltan."
          }
        ],
        "strategy": "Primero comprende, después diseña, justifica con los datos y verifica frente a la condición.",
        "remember": "Una opción correcta debe responder a este caso, no solo sonar convincente."
      }
    },
    {
      "id": 10,
      "title": "Integrar los cuatro pasos",
      "intro": "Aprende a conectar objetivo, procedimiento, razón y comprobación en una decisión cotidiana.",
      "lesson": [
        "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
        "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
        "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
        "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión."
      ],
      "questions": [
        {
          "id": "everyday-u10-case1-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u10-case1",
          "caseTitle": "Elegir un plan de trabajo",
          "context": "Dos planes ficticios cuestan A: 62 y B: 55 créditos. El límite es 70. El requisito mínimo de calidad es 3/5; A tiene 4/5 y B 2/5. Estos datos se dan para resolver el caso, sin contratar servicios.",
          "options": [
            "Elegir la opción más barata aunque incumpla la calidad requerida.",
            "Elegir cualquier opción que cumpla solo uno de los requisitos.",
            "Promediar precio y calidad aunque tengan unidades diferentes.",
            "Elegir una opción que cumpla tanto presupuesto como calidad mínima."
          ],
          "answer": "Elegir una opción que cumpla tanto presupuesto como calidad mínima.",
          "explanation": "Presupuesto y calidad mínima son requisitos simultáneos: cumplir solo uno no basta. Aplicado al caso: Elegir una opción que cumpla tanto presupuesto como calidad mínima.",
          "optionFeedback": {
            "Elegir la opción más barata aunque incumpla la calidad requerida.": "Comprueba que el objetivo respete todas las condiciones.",
            "Elegir cualquier opción que cumpla solo uno de los requisitos.": "Comprueba que el objetivo respete todas las condiciones.",
            "Promediar precio y calidad aunque tengan unidades diferentes.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u10-case1-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u10-case1",
          "caseTitle": "Elegir un plan de trabajo",
          "context": "Dos planes ficticios cuestan A: 62 y B: 55 créditos. El límite es 70. El requisito mínimo de calidad es 3/5; A tiene 4/5 y B 2/5. Estos datos se dan para resolver el caso, sin contratar servicios.",
          "options": [
            "Sumar créditos y puntos de calidad como si fueran equivalentes.",
            "Cambiar el mínimo de calidad después de elegir una opción.",
            "Comprobar cada requisito en A y B; descartar las opciones que incumplan uno esencial.",
            "Ordenar solo por precio y elegir la primera opción."
          ],
          "answer": "Comprobar cada requisito en A y B; descartar las opciones que incumplan uno esencial.",
          "explanation": "Comprobar cada condición por separado evita mezclar créditos con puntos de calidad. Aplicado al caso: Comprobar cada requisito en A y B; descartar las opciones que incumplan uno esencial.",
          "optionFeedback": {
            "Ordenar solo por precio y elegir la primera opción.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Sumar créditos y puntos de calidad como si fueran equivalentes.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Cambiar el mínimo de calidad después de elegir una opción.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u10-case1-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u10-case1",
          "caseTitle": "Elegir un plan de trabajo",
          "context": "Dos planes ficticios cuestan A: 62 y B: 55 créditos. El límite es 70. El requisito mínimo de calidad es 3/5; A tiene 4/5 y B 2/5. Estos datos se dan para resolver el caso, sin contratar servicios.",
          "options": [
            "Ambas cumplen porque las dos tienen un precio menor al límite.",
            "A cuesta 62 ≤ 70 y tiene 4 ≥ 3 de calidad; B es más barata, pero no cumple la calidad mínima.",
            "B es mejor porque cualquier ahorro compensa incumplir un requisito.",
            "A es mejor solo porque aparece antes en el enunciado."
          ],
          "answer": "A cuesta 62 ≤ 70 y tiene 4 ≥ 3 de calidad; B es más barata, pero no cumple la calidad mínima.",
          "explanation": "La opción más barata no es viable si incumple un requisito esencial; la razón debe mencionar ambos criterios. Aplicado al caso: A cuesta 62 ≤ 70 y tiene 4 ≥ 3 de calidad; B es más barata, pero no cumple la calidad mínima.",
          "optionFeedback": {
            "B es mejor porque cualquier ahorro compensa incumplir un requisito.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "A es mejor solo porque aparece antes en el enunciado.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Ambas cumplen porque las dos tienen un precio menor al límite.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u10-case1-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u10-case1",
          "caseTitle": "Elegir un plan de trabajo",
          "context": "Dos planes ficticios cuestan A: 62 y B: 55 créditos. El límite es 70. El requisito mínimo de calidad es 3/5; A tiene 4/5 y B 2/5. Estos datos se dan para resolver el caso, sin contratar servicios.",
          "options": [
            "Revisar por separado presupuesto y calidad; si cambian los datos, volver a comprobar ambos.",
            "Comprobar únicamente el precio del plan elegido.",
            "Dar por válida una elección porque fue la primera respuesta.",
            "Mantener la elección aunque deje de cumplir un requisito esencial."
          ],
          "answer": "Revisar por separado presupuesto y calidad; si cambian los datos, volver a comprobar ambos.",
          "explanation": "Una decisión sigue siendo válida solo mientras cumpla ambos requisitos; si cambian los datos, hay que volver a contrastarlos. Aplicado al caso: Revisar por separado presupuesto y calidad; si cambian los datos, volver a comprobar ambos.",
          "optionFeedback": {
            "Comprobar únicamente el precio del plan elegido.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Dar por válida una elección porque fue la primera respuesta.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Mantener la elección aunque deje de cumplir un requisito esencial.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "guided",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u10-case2-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u10-case2",
          "caseTitle": "Comparar dos servicios ficticios",
          "context": "Dos planes ficticios cuestan A: 72 y B: 65 créditos. El límite es 80. El requisito mínimo de calidad es 3/5; A tiene 4/5 y B 2/5. Estos datos se dan para resolver el caso, sin contratar servicios.",
          "options": [
            "Elegir cualquier opción que cumpla solo uno de los requisitos.",
            "Promediar precio y calidad aunque tengan unidades diferentes.",
            "Elegir una opción que cumpla tanto presupuesto como calidad mínima.",
            "Elegir la opción más barata aunque incumpla la calidad requerida."
          ],
          "answer": "Elegir una opción que cumpla tanto presupuesto como calidad mínima.",
          "explanation": "Presupuesto y calidad mínima son requisitos simultáneos: cumplir solo uno no basta. Aplicado al caso: Elegir una opción que cumpla tanto presupuesto como calidad mínima.",
          "optionFeedback": {
            "Elegir la opción más barata aunque incumpla la calidad requerida.": "Comprueba que el objetivo respete todas las condiciones.",
            "Elegir cualquier opción que cumpla solo uno de los requisitos.": "Comprueba que el objetivo respete todas las condiciones.",
            "Promediar precio y calidad aunque tengan unidades diferentes.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u10-case2-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u10-case2",
          "caseTitle": "Comparar dos servicios ficticios",
          "context": "Dos planes ficticios cuestan A: 72 y B: 65 créditos. El límite es 80. El requisito mínimo de calidad es 3/5; A tiene 4/5 y B 2/5. Estos datos se dan para resolver el caso, sin contratar servicios.",
          "options": [
            "Cambiar el mínimo de calidad después de elegir una opción.",
            "Comprobar cada requisito en A y B; descartar las opciones que incumplan uno esencial.",
            "Ordenar solo por precio y elegir la primera opción.",
            "Sumar créditos y puntos de calidad como si fueran equivalentes."
          ],
          "answer": "Comprobar cada requisito en A y B; descartar las opciones que incumplan uno esencial.",
          "explanation": "Comprobar cada condición por separado evita mezclar créditos con puntos de calidad. Aplicado al caso: Comprobar cada requisito en A y B; descartar las opciones que incumplan uno esencial.",
          "optionFeedback": {
            "Ordenar solo por precio y elegir la primera opción.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Sumar créditos y puntos de calidad como si fueran equivalentes.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Cambiar el mínimo de calidad después de elegir una opción.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u10-case2-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u10-case2",
          "caseTitle": "Comparar dos servicios ficticios",
          "context": "Dos planes ficticios cuestan A: 72 y B: 65 créditos. El límite es 80. El requisito mínimo de calidad es 3/5; A tiene 4/5 y B 2/5. Estos datos se dan para resolver el caso, sin contratar servicios.",
          "options": [
            "A cuesta 72 ≤ 80 y tiene 4 ≥ 3 de calidad; B es más barata, pero no cumple la calidad mínima.",
            "B es mejor porque cualquier ahorro compensa incumplir un requisito.",
            "A es mejor solo porque aparece antes en el enunciado.",
            "Ambas cumplen porque las dos tienen un precio menor al límite."
          ],
          "answer": "A cuesta 72 ≤ 80 y tiene 4 ≥ 3 de calidad; B es más barata, pero no cumple la calidad mínima.",
          "explanation": "La opción más barata no es viable si incumple un requisito esencial; la razón debe mencionar ambos criterios. Aplicado al caso: A cuesta 72 ≤ 80 y tiene 4 ≥ 3 de calidad; B es más barata, pero no cumple la calidad mínima.",
          "optionFeedback": {
            "B es mejor porque cualquier ahorro compensa incumplir un requisito.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "A es mejor solo porque aparece antes en el enunciado.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Ambas cumplen porque las dos tienen un precio menor al límite.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u10-case2-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u10-case2",
          "caseTitle": "Comparar dos servicios ficticios",
          "context": "Dos planes ficticios cuestan A: 72 y B: 65 créditos. El límite es 80. El requisito mínimo de calidad es 3/5; A tiene 4/5 y B 2/5. Estos datos se dan para resolver el caso, sin contratar servicios.",
          "options": [
            "Comprobar únicamente el precio del plan elegido.",
            "Dar por válida una elección porque fue la primera respuesta.",
            "Mantener la elección aunque deje de cumplir un requisito esencial.",
            "Revisar por separado presupuesto y calidad; si cambian los datos, volver a comprobar ambos."
          ],
          "answer": "Revisar por separado presupuesto y calidad; si cambian los datos, volver a comprobar ambos.",
          "explanation": "Una decisión sigue siendo válida solo mientras cumpla ambos requisitos; si cambian los datos, hay que volver a contrastarlos. Aplicado al caso: Revisar por separado presupuesto y calidad; si cambian los datos, volver a comprobar ambos.",
          "optionFeedback": {
            "Comprobar únicamente el precio del plan elegido.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Dar por válida una elección porque fue la primera respuesta.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Mantener la elección aunque deje de cumplir un requisito esencial.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "application",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u10-case3-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u10-case3",
          "caseTitle": "Decidir con más de un criterio",
          "context": "Dos planes ficticios cuestan A: 82 y B: 75 créditos. El límite es 90. El requisito mínimo de calidad es 3/5; A tiene 4/5 y B 2/5. Estos datos se dan para resolver el caso, sin contratar servicios.",
          "options": [
            "Promediar precio y calidad aunque tengan unidades diferentes.",
            "Elegir una opción que cumpla tanto presupuesto como calidad mínima.",
            "Elegir la opción más barata aunque incumpla la calidad requerida.",
            "Elegir cualquier opción que cumpla solo uno de los requisitos."
          ],
          "answer": "Elegir una opción que cumpla tanto presupuesto como calidad mínima.",
          "explanation": "Presupuesto y calidad mínima son requisitos simultáneos: cumplir solo uno no basta. Aplicado al caso: Elegir una opción que cumpla tanto presupuesto como calidad mínima.",
          "optionFeedback": {
            "Elegir la opción más barata aunque incumpla la calidad requerida.": "Comprueba que el objetivo respete todas las condiciones.",
            "Elegir cualquier opción que cumpla solo uno de los requisitos.": "Comprueba que el objetivo respete todas las condiciones.",
            "Promediar precio y calidad aunque tengan unidades diferentes.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u10-case3-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u10-case3",
          "caseTitle": "Decidir con más de un criterio",
          "context": "Dos planes ficticios cuestan A: 82 y B: 75 créditos. El límite es 90. El requisito mínimo de calidad es 3/5; A tiene 4/5 y B 2/5. Estos datos se dan para resolver el caso, sin contratar servicios.",
          "options": [
            "Comprobar cada requisito en A y B; descartar las opciones que incumplan uno esencial.",
            "Ordenar solo por precio y elegir la primera opción.",
            "Sumar créditos y puntos de calidad como si fueran equivalentes.",
            "Cambiar el mínimo de calidad después de elegir una opción."
          ],
          "answer": "Comprobar cada requisito en A y B; descartar las opciones que incumplan uno esencial.",
          "explanation": "Comprobar cada condición por separado evita mezclar créditos con puntos de calidad. Aplicado al caso: Comprobar cada requisito en A y B; descartar las opciones que incumplan uno esencial.",
          "optionFeedback": {
            "Ordenar solo por precio y elegir la primera opción.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Sumar créditos y puntos de calidad como si fueran equivalentes.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Cambiar el mínimo de calidad después de elegir una opción.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u10-case3-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u10-case3",
          "caseTitle": "Decidir con más de un criterio",
          "context": "Dos planes ficticios cuestan A: 82 y B: 75 créditos. El límite es 90. El requisito mínimo de calidad es 3/5; A tiene 4/5 y B 2/5. Estos datos se dan para resolver el caso, sin contratar servicios.",
          "options": [
            "B es mejor porque cualquier ahorro compensa incumplir un requisito.",
            "A es mejor solo porque aparece antes en el enunciado.",
            "Ambas cumplen porque las dos tienen un precio menor al límite.",
            "A cuesta 82 ≤ 90 y tiene 4 ≥ 3 de calidad; B es más barata, pero no cumple la calidad mínima."
          ],
          "answer": "A cuesta 82 ≤ 90 y tiene 4 ≥ 3 de calidad; B es más barata, pero no cumple la calidad mínima.",
          "explanation": "La opción más barata no es viable si incumple un requisito esencial; la razón debe mencionar ambos criterios. Aplicado al caso: A cuesta 82 ≤ 90 y tiene 4 ≥ 3 de calidad; B es más barata, pero no cumple la calidad mínima.",
          "optionFeedback": {
            "B es mejor porque cualquier ahorro compensa incumplir un requisito.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "A es mejor solo porque aparece antes en el enunciado.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Ambas cumplen porque las dos tienen un precio menor al límite.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u10-case3-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u10-case3",
          "caseTitle": "Decidir con más de un criterio",
          "context": "Dos planes ficticios cuestan A: 82 y B: 75 créditos. El límite es 90. El requisito mínimo de calidad es 3/5; A tiene 4/5 y B 2/5. Estos datos se dan para resolver el caso, sin contratar servicios.",
          "options": [
            "Dar por válida una elección porque fue la primera respuesta.",
            "Mantener la elección aunque deje de cumplir un requisito esencial.",
            "Revisar por separado presupuesto y calidad; si cambian los datos, volver a comprobar ambos.",
            "Comprobar únicamente el precio del plan elegido."
          ],
          "answer": "Revisar por separado presupuesto y calidad; si cambian los datos, volver a comprobar ambos.",
          "explanation": "Una decisión sigue siendo válida solo mientras cumpla ambos requisitos; si cambian los datos, hay que volver a contrastarlos. Aplicado al caso: Revisar por separado presupuesto y calidad; si cambian los datos, volver a comprobar ambos.",
          "optionFeedback": {
            "Comprobar únicamente el precio del plan elegido.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Dar por válida una elección porque fue la primera respuesta.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Mantener la elección aunque deje de cumplir un requisito esencial.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "transfer",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u10-case4-problem",
          "type": "choice",
          "prompt": "¿Qué objetivo y condición deben orientar la decisión?",
          "caseId": "everyday-u10-case4",
          "caseTitle": "Resolver una decisión nueva",
          "context": "Dos planes ficticios cuestan A: 92 y B: 85 créditos. El límite es 100. El requisito mínimo de calidad es 3/5; A tiene 4/5 y B 2/5. Estos datos se dan para resolver el caso, sin contratar servicios.",
          "options": [
            "Elegir una opción que cumpla tanto presupuesto como calidad mínima.",
            "Elegir la opción más barata aunque incumpla la calidad requerida.",
            "Elegir cualquier opción que cumpla solo uno de los requisitos.",
            "Promediar precio y calidad aunque tengan unidades diferentes."
          ],
          "answer": "Elegir una opción que cumpla tanto presupuesto como calidad mínima.",
          "explanation": "Presupuesto y calidad mínima son requisitos simultáneos: cumplir solo uno no basta. Aplicado al caso: Elegir una opción que cumpla tanto presupuesto como calidad mínima.",
          "optionFeedback": {
            "Elegir la opción más barata aunque incumpla la calidad requerida.": "Comprueba que el objetivo respete todas las condiciones.",
            "Elegir cualquier opción que cumpla solo uno de los requisitos.": "Comprueba que el objetivo respete todas las condiciones.",
            "Promediar precio y calidad aunque tengan unidades diferentes.": "Comprueba que el objetivo respete todas las condiciones."
          },
          "skill": "Comprensión del problema",
          "readingRef": "problem",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "problem"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u10-case4-solution",
          "type": "choice",
          "prompt": "¿Qué procedimiento usa adecuadamente la información?",
          "caseId": "everyday-u10-case4",
          "caseTitle": "Resolver una decisión nueva",
          "context": "Dos planes ficticios cuestan A: 92 y B: 85 créditos. El límite es 100. El requisito mínimo de calidad es 3/5; A tiene 4/5 y B 2/5. Estos datos se dan para resolver el caso, sin contratar servicios.",
          "options": [
            "Ordenar solo por precio y elegir la primera opción.",
            "Sumar créditos y puntos de calidad como si fueran equivalentes.",
            "Cambiar el mínimo de calidad después de elegir una opción.",
            "Comprobar cada requisito en A y B; descartar las opciones que incumplan uno esencial."
          ],
          "answer": "Comprobar cada requisito en A y B; descartar las opciones que incumplan uno esencial.",
          "explanation": "Comprobar cada condición por separado evita mezclar créditos con puntos de calidad. Aplicado al caso: Comprobar cada requisito en A y B; descartar las opciones que incumplan uno esencial.",
          "optionFeedback": {
            "Ordenar solo por precio y elegir la primera opción.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Sumar créditos y puntos de calidad como si fueran equivalentes.": "Vuelve a ordenar las operaciones o decisiones usando los datos.",
            "Cambiar el mínimo de calidad después de elegir una opción.": "Vuelve a ordenar las operaciones o decisiones usando los datos."
          },
          "skill": "Diseño de la solución",
          "readingRef": "solution",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "solution"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u10-case4-context",
          "type": "choice",
          "prompt": "¿Qué justificación está respaldada por los datos?",
          "caseId": "everyday-u10-case4",
          "caseTitle": "Resolver una decisión nueva",
          "context": "Dos planes ficticios cuestan A: 92 y B: 85 créditos. El límite es 100. El requisito mínimo de calidad es 3/5; A tiene 4/5 y B 2/5. Estos datos se dan para resolver el caso, sin contratar servicios.",
          "options": [
            "A es mejor solo porque aparece antes en el enunciado.",
            "Ambas cumplen porque las dos tienen un precio menor al límite.",
            "A cuesta 92 ≤ 100 y tiene 4 ≥ 3 de calidad; B es más barata, pero no cumple la calidad mínima.",
            "B es mejor porque cualquier ahorro compensa incumplir un requisito."
          ],
          "answer": "A cuesta 92 ≤ 100 y tiene 4 ≥ 3 de calidad; B es más barata, pero no cumple la calidad mínima.",
          "explanation": "La opción más barata no es viable si incumple un requisito esencial; la razón debe mencionar ambos criterios. Aplicado al caso: A cuesta 92 ≤ 100 y tiene 4 ≥ 3 de calidad; B es más barata, pero no cumple la calidad mínima.",
          "optionFeedback": {
            "B es mejor porque cualquier ahorro compensa incumplir un requisito.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "A es mejor solo porque aparece antes en el enunciado.": "La razón debe sostenerse en los datos, sin suponer información que no se dio.",
            "Ambas cumplen porque las dos tienen un precio menor al límite.": "La razón debe sostenerse en los datos, sin suponer información que no se dio."
          },
          "skill": "Justificación y contextualización",
          "readingRef": "context",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "context"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        },
        {
          "id": "everyday-u10-case4-check",
          "type": "choice",
          "prompt": "¿Cómo comprobarías la decisión y revisarías lo que falta?",
          "caseId": "everyday-u10-case4",
          "caseTitle": "Resolver una decisión nueva",
          "context": "Dos planes ficticios cuestan A: 92 y B: 85 créditos. El límite es 100. El requisito mínimo de calidad es 3/5; A tiene 4/5 y B 2/5. Estos datos se dan para resolver el caso, sin contratar servicios.",
          "options": [
            "Mantener la elección aunque deje de cumplir un requisito esencial.",
            "Revisar por separado presupuesto y calidad; si cambian los datos, volver a comprobar ambos.",
            "Comprobar únicamente el precio del plan elegido.",
            "Dar por válida una elección porque fue la primera respuesta."
          ],
          "answer": "Revisar por separado presupuesto y calidad; si cambian los datos, volver a comprobar ambos.",
          "explanation": "Una decisión sigue siendo válida solo mientras cumpla ambos requisitos; si cambian los datos, hay que volver a contrastarlos. Aplicado al caso: Revisar por separado presupuesto y calidad; si cambian los datos, volver a comprobar ambos.",
          "optionFeedback": {
            "Comprobar únicamente el precio del plan elegido.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Dar por válida una elección porque fue la primera respuesta.": "Una comprobación compara con un criterio y reconoce qué falta.",
            "Mantener la elección aunque deje de cumplir un requisito esencial.": "Una comprobación compara con un criterio y reconoce qué falta."
          },
          "skill": "Verificación y mejora",
          "readingRef": "check",
          "learningRole": "final",
          "time": 0,
          "competency": {
            "dimensions": [
              "check"
            ],
            "context": "cotidiano_simulado",
            "validation_status": "candidate_expert_review_pending"
          }
        }
      ],
      "reading": {
        "title": "Integrar los cuatro pasos",
        "lead": "Dos planes ficticios cuestan A: 62 y B: 55 créditos. El límite es 70. El requisito mínimo de calidad es 3/5; A tiene 4/5 y B 2/5. Estos datos se dan para resolver el caso, sin contratar servicios.",
        "context": "Un caso se resuelve mediante cuatro decisiones relacionadas. El ejemplo siguiente muestra el razonamiento; después cambiará la situación. Todos los datos son ficticios y el trabajo se realiza dentro de PRISMA.",
        "keyIdeas": [
          {
            "id": "problem",
            "title": "Comprensión del problema",
            "text": "Identifica qué se busca, qué datos importan y qué condición no se puede ignorar.",
            "example": "Elegir una opción que cumpla tanto presupuesto como calidad mínima."
          },
          {
            "id": "solution",
            "title": "Diseño de la solución",
            "text": "Ordena decisiones u operaciones para llegar al objetivo y compara alternativas.",
            "example": "Comprobar cada requisito en A y B; descartar las opciones que incumplan uno esencial."
          },
          {
            "id": "context",
            "title": "Justificación y contextualización",
            "text": "Relaciona la elección con una condición del enunciado. Distingue datos de suposiciones.",
            "example": "A cuesta 62 ≤ 70 y tiene 4 ≥ 3 de calidad; B es más barata, pero no cumple la calidad mínima."
          },
          {
            "id": "check",
            "title": "Verificación y mejora",
            "text": "Compara el resultado con un criterio; si falta información, dilo y plantea una revisión.",
            "example": "Revisar por separado presupuesto y calidad; si cambian los datos, volver a comprobar ambos."
          }
        ],
        "strategy": "Primero comprende, después diseña, justifica con los datos y verifica frente a la condición.",
        "remember": "Una opción correcta debe responder a este caso, no solo sonar convincente."
      }
    }
  ],
  "contentRevision": "3.1.0-candidate",
  "qualityNote": "Contenido candidato: requiere revisión experta y pilotaje; no acredita competencia por completar preguntas."
};
