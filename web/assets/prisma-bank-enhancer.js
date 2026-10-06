// PRISMA STEM v2.5.1
// Ampliador y depurador de bancos curriculares.
//
// OBJETIVOS DE ESTE ARCHIVO
// 1) Mantener la depuración específica de Matemáticas y transformar respuestas escritas en opción múltiple ABCD.
// 1b) Evitar que el banco efectivo genere actividades de respuesta escrita; la evidencia abierta queda reservada para los retos adaptativos.
// 2) Crear una reserva adicional de actividades sin depender de Internet ni de Gemma.
// 3) Duplicar el banco efectivo de cada submodulo: 40 actividades originales -> 80 disponibles.
// 4) Mantener identificadores estables para que PRISMA pueda recordar que preguntas ya vio cada estudiante.
//
// IMPORTANTE
// Las variantes de reserva se construyen a partir del contenido curricular disponible, pendiente de revisión experta en cada unidad.
// No modifican el motor de IA, SQLite, las misiones adaptativas ni los datos de investigacion.

(() => {
  'use strict';

  const bank = window.PRISMA_BANK_DATA;
  if (!bank || !Array.isArray(bank.units)) return;
  if(bank.learningSequence==='case-cycle-v1')return; // authored cases: no duplicated reserve variants

  // PRISMA: Copia un objeto de pregunta sin compartir referencias internas.
  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  // PRISMA: Elimina el prefijo usado por las preguntas escritas para reutilizar el enunciado.
  function stripShortPrefix(text) {
    return String(text || '').replace(/^(?:Responde sin opciones|Escribe tu respuesta|Escribe la respuesta|Escribe el resultado|Calcula y escribe el resultado|Escribe el concepto|Escribe una respuesta breve):\s*/i, '').trim();
  }

  // PRISMA: Devuelve una lista sin elementos repetidos ni valores vacios.
  function unique(values) {
    return [...new Set((values || []).map(v => String(v || '').trim()).filter(Boolean))];
  }

  // PRISMA: Recupera de una explicacion la respuesta correcta cuando la pregunta es verdadero/falso.
  function correctFromExplanation(q) {
    const text = String(q?.explanation || '');
    const patterns = [
      /respuesta correcta es «([^»]+)»/i,
      /respuesta es «([^»]+)»/i,
      /La forma correcta es “([^”]+)”/i,
      /La respuesta es “([^”]+)”/i,
    ];
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) return match[1].trim();
    }
    return '';
  }

  // PRISMA: Asegura que las respuestas escritas siempre incluyan la respuesta principal.
  function normalizeAccepted(q) {
    if (!q || !['short', 'text'].includes(q.type)) return;
    q.accepted = unique([q.answer, ...(Array.isArray(q.accepted) ? q.accepted : [])]);
  }

  // ---------------------------------------------------------------------------
  // CORRECCIONES DE MATEMATICAS
  // ---------------------------------------------------------------------------

  // PRISMA: Produce opciones numericas sencillas alrededor de una respuesta correcta.
  function numericOptions(answer) {
    const n = Number(answer);
    if (!Number.isFinite(n)) return [String(answer)];
    const candidates = [n, n + 1, Math.max(0, n - 1), n + 2].map(v => Number.isInteger(v) ? String(v) : String(Math.round(v * 100) / 100));
    return unique(candidates).slice(0, 4);
  }

  // PRISMA: Repara comparaciones de fracciones que antes preguntaban "cuál es mayor" sin mostrar ambas fracciones.
  function fixFractionComparisons(unit) {
    const comparisons = [
      ['3/4', '1/4'], ['4/5', '2/5'], ['5/6', '3/6'], ['6/8', '4/8'], ['7/10', '5/10'],
      ['3/4', '2/4'], ['3/5', '1/5'], ['5/6', '4/6'], ['4/8', '3/8'], ['7/8', '5/8'],
      ['2/4', '1/4'], ['4/5', '3/5'], ['5/6', '2/6'], ['7/8', '2/8'], ['8/10', '6/10'],
      ['3/4', '1/4'], ['3/5', '2/5'], ['5/6', '1/6'], ['7/8', '5/8'],
    ];
    let cursor = 0;
    for (const q of unit.questions.filter(x => /-cmp\d+$/.test(String(x.id || '')))) {
      const [greater, smaller] = comparisons[cursor++ % comparisons.length];
      if (q.type === 'short') {
        q.prompt = `Compara y escribe la fracción mayor: entre ${greater} y ${smaller}.`;
        q.answer = greater;
        q.accepted = [greater];
      } else if (q.type === 'choice') {
        q.prompt = `¿Cuál fracción es mayor: ${greater} o ${smaller}?`;
        q.answer = greater;
        q.options = [greater, smaller, 'Son iguales', 'No se puede determinar'];
      } else if (q.type === 'truefalse') {
        const proposed = q.answer === 'Verdadero' ? greater : smaller;
        q.prompt = `Verdadero o falso: entre ${greater} y ${smaller}, la fracción mayor es ${proposed}.`;
      }
      q.explanation = `Como tienen el mismo denominador, se comparan los numeradores: ${greater} es mayor que ${smaller}.`;
    }

    const pairSets = [
      [['3/4','1/4'],['4/5','2/5'],['5/6','3/6'],['6/8','4/8']],
      [['7/10','5/10'],['3/5','1/5'],['7/8','2/8'],['5/6','1/6']],
    ];
    const relationQs = unit.questions.filter(q => ['memory','match'].includes(q.type));
    relationQs.forEach((q, i) => {
      const set = pairSets[i % pairSets.length];
      q.pairs = set.map((p, j) => ({ id: `p${j + 1}`, left: `Entre ${p[0]} y ${p[1]}, ¿cuál es mayor?`, right: p[0] }));
      q.explanation = 'Relacionaste cada comparación con la fracción mayor.';
    });
  }

  // PRISMA: Genera distintas expresiones algebraicas para reemplazar repeticiones exactas.
  function algebraTasks() {
    const groups = [
      [[3,'+'],[5,'-'],[2,'*'],[3,'*'],[2,'/'],[4,'*'],[5,'/'],[7,'plus'],[10,'minusx']],
      [[6,'+'],[2,'-'],[5,'*'],[4,'*'],[3,'/'],[6,'*'],[4,'/'],[9,'plus'],[12,'minusx']],
      [[8,'+'],[7,'-'],[6,'*'],[7,'*'],[4,'/'],[8,'*'],[2,'/'],[11,'plus'],[15,'minusx']],
      [[10,'+'],[4,'-'],[8,'*'],[9,'*'],[5,'/'],[10,'*'],[6,'/'],[13,'plus'],[20,'minusx']],
    ];
    const out = [];
    for (const group of groups) {
      group.forEach(([n, op]) => {
        if (op === '+') out.push({ phrase: `un número más ${n}`, answer: `x + ${n}`, alternatives: [`${n} + x`] });
        else if (op === '-') out.push({ phrase: `un número menos ${n}`, answer: `x − ${n}`, alternatives: [`x - ${n}`] });
        else if (op === '*') out.push({ phrase: `${n} veces un número`, answer: `${n}x`, alternatives: [`${n} x`, `${n}*x`, `x*${n}`] });
        else if (op === '/') out.push({ phrase: `un número dividido entre ${n}`, answer: `x ÷ ${n}`, alternatives: [`x/${n}`] });
        else if (op === 'plus') out.push({ phrase: `${n} más un número`, answer: `${n} + x`, alternatives: [`x + ${n}`] });
        else if (op === 'minusx') out.push({ phrase: `${n} menos un número`, answer: `${n} − x`, alternatives: [`${n} - x`] });
      });
    }
    return out;
  }

  // PRISMA: Reescribe la unidad de lenguaje algebraico con situaciones distintas y completas.
  function fixAlgebraUnit(unit) {
    const tasks = algebraTasks();
    const normal = unit.questions.filter(q => !['memory','match'].includes(q.type));
    normal.forEach((q, i) => {
      const task = tasks[i % tasks.length];
      const basePrompt = `Si x representa un número, ¿qué expresión representa “${task.phrase}”?`;
      if (q.type === 'short') {
        q.prompt = `Escribe la expresión algebraica: ${basePrompt}`;
        q.answer = task.answer;
        q.accepted = unique([task.answer, ...task.alternatives]);
      } else if (q.type === 'choice') {
        const distractors = [`x + ${i + 2}`, `${i + 2}x`, `x ÷ ${Math.max(2, (i % 6) + 2)}`, `${i + 3} − x`];
        q.prompt = basePrompt;
        q.answer = task.answer;
        q.options = unique([task.answer, ...distractors]).slice(0, 4);
      } else if (q.type === 'truefalse') {
        const wrong = task.answer.includes('+') ? task.answer.replace('+', '−') : task.answer.includes('−') ? task.answer.replace('−', '+') : `x + ${i + 2}`;
        const proposed = q.answer === 'Verdadero' ? task.answer : wrong;
        q.prompt = `Verdadero o falso: “${task.phrase}” se representa como ${proposed}.`;
      }
      q.explanation = `Una forma correcta de representar “${task.phrase}” es ${task.answer}.`;
    });

    const relationQs = unit.questions.filter(q => ['memory','match'].includes(q.type));
    relationQs.forEach((q, i) => {
      const start = (i * 4) % tasks.length;
      q.pairs = Array.from({ length: 4 }, (_, j) => {
        const task = tasks[(start + j) % tasks.length];
        return { id: `p${j + 1}`, left: task.phrase, right: task.answer };
      });
      q.explanation = 'Relacionaste cada frase algebraica con su expresión.';
    });
  }

  // PRISMA: Reescribe problemas de proporcionalidad cuya redacción anterior contenía "1 objetos".
  function fixProportionQuestions(unit) {
    const scenarios = [
      ['cuaderno', 2, 3], ['sensor', 4, 5], ['semilla', 3, 6], ['ficha', 5, 4], ['botella', 6, 3],
      ['cable', 7, 2], ['tornillo', 4, 7], ['libro', 8, 3], ['pieza', 5, 6], ['tarjeta', 9, 2],
      ['cuaderno', 3, 8], ['sensor', 6, 4], ['semilla', 2, 9], ['ficha', 7, 5], ['botella', 4, 6],
      ['cable', 5, 7], ['tornillo', 8, 4], ['libro', 6, 5], ['pieza', 9, 3], ['tarjeta', 4, 8],
    ];
    let cursor = 0;
    for (const q of unit.questions.filter(x => /-prop\d+$/.test(String(x.id || '')))) {
      const [item, value, qty] = scenarios[cursor++ % scenarios.length];
      const total = value * qty;
      const plural = qty === 1 ? item : `${item}${item.endsWith('s') ? '' : 's'}`;
      const question = `Cada ${item} vale ${value} puntos. Si reúnes ${qty} ${plural}, ¿cuántos puntos obtienes en total?`;
      if (q.type === 'short') {
        q.prompt = `Calcula y escribe el resultado: ${question}`;
        q.answer = String(total);
        q.accepted = [String(total), `${total} puntos`];
      } else if (q.type === 'choice') {
        q.prompt = question;
        q.answer = String(total);
        q.options = numericOptions(total);
      } else if (q.type === 'truefalse') {
        const proposed = q.answer === 'Verdadero' ? total : total + value;
        q.prompt = `Verdadero o falso: ${question.replace('¿cuántos puntos obtienes en total?', `el total es ${proposed} puntos.`)}`;
      }
      q.explanation = `${value} × ${qty} = ${total} puntos.`;
    }
  }

  // PRISMA: Sustituye respuestas escritas repetitivas de trigonometría por ejercicios con datos suficientes.
  function fixTrigShorts(unit) {
    const replacements = [
      { prompt: 'En un triángulo rectángulo, el cateto opuesto mide 3 y la hipotenusa 5. ¿Cuál es el seno del ángulo?', answer: '0.6', accepted: ['0.6','0,6','3/5'] },
      { prompt: 'En un triángulo rectángulo, el cateto adyacente mide 4 y la hipotenusa 5. ¿Cuál es el coseno del ángulo?', answer: '0.8', accepted: ['0.8','0,8','4/5'] },
      { prompt: 'En un triángulo rectángulo, el cateto opuesto mide 3 y el adyacente 4. ¿Cuál es la tangente del ángulo?', answer: '0.75', accepted: ['0.75','0,75','3/4'] },
      { prompt: 'En un triángulo rectángulo, ¿cómo se llama el lado más largo, ubicado frente al ángulo de 90 grados?', answer: 'hipotenusa', accepted: ['hipotenusa'] },
      { prompt: 'Si el cateto opuesto mide 4 y la hipotenusa 5, ¿cuál es el seno del ángulo?', answer: '0.8', accepted: ['0.8','0,8','4/5'] },
      { prompt: 'Si el cateto adyacente mide 12 y la hipotenusa 13, escribe el coseno como fracción.', answer: '12/13', accepted: ['12/13'] },
      { prompt: 'Si el cateto opuesto mide 5 y el adyacente 12, escribe la tangente como fracción.', answer: '5/12', accepted: ['5/12'] },
      { prompt: 'Respecto de un ángulo agudo en un triángulo rectángulo, ¿cómo se llama el cateto que está enfrente de ese ángulo?', answer: 'cateto opuesto', accepted: ['cateto opuesto','opuesto'] },
    ];
    unit.questions.filter(q => q.type === 'short').forEach((q, i) => {
      const r = replacements[i % replacements.length];
      q.prompt = `Escribe la respuesta: ${r.prompt}`;
      q.answer = r.answer;
      q.accepted = r.accepted;
      q.explanation = `Respuesta esperada: ${r.answer}. Revisa la relación entre los lados antes de calcular.`;
    });
  }

  // PRISMA: Amplía equivalencias válidas sin aceptar unidades extrañas en ejercicios que no las piden.
  function broadenMathAccepted(q) {
    if (q.type !== 'short') return;
    const extras = [];
    const answer = String(q.answer || '').trim();
    const prompt = String(q.prompt || '').toLowerCase();
    if (answer === '2/4') extras.push('1/2', '0.5');
    if (answer === '4/4' || answer === '5/5' || answer === '8/8') extras.push('1');
    if (/perímetro|perimetro/.test(prompt) && /^-?\d+(?:\.\d+)?$/.test(answer)) extras.push(`${answer} cm`, `${answer}cm`);
    if (/área|area/.test(prompt) && /^-?\d+(?:\.\d+)?$/.test(answer)) extras.push(`${answer} cm²`, `${answer} cm2`, `${answer}cm2`);
    if (/puntos/.test(prompt) && /^-?\d+(?:\.\d+)?$/.test(answer)) extras.push(`${answer} puntos`);
    q.accepted = unique([answer, ...(q.accepted || []), ...extras]);
  }

  // PRISMA: Corrige las principales ambiguedades detectadas en el banco de Matematicas.
  function improveMath() {
    const u3 = bank.units.find(u => u.id === 3); if (u3) fixFractionComparisons(u3);
    const u6 = bank.units.find(u => u.id === 6); if (u6) fixAlgebraUnit(u6);
    const u9 = bank.units.find(u => u.id === 9); if (u9) fixProportionQuestions(u9);
    const u10 = bank.units.find(u => u.id === 10); if (u10) fixTrigShorts(u10);
    for (const unit of bank.units) for (const q of unit.questions) { broadenMathAccepted(q); normalizeAccepted(q); }
  }

  // ---------------------------------------------------------------------------
  // RESERVA DE ACTIVIDADES
  // ---------------------------------------------------------------------------

  // PRISMA: Clasifica respuestas para buscar distractores del mismo tipo (números con números, palabras con palabras).
  function answerShape(value) {
    const s = String(value || '').trim();
    if (/^-?\d+(?:[.,]\d+)?$/.test(s)) return 'number';
    if (/^-?\d+\/\d+$/.test(s)) return 'fraction';
    if (/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+$/.test(s)) return 'word';
    return s.length <= 32 ? 'shortphrase' : 'longphrase';
  }

  // PRISMA: Agrupa preguntas matemáticas por la familia visible en su identificador.
  // Así, una respuesta de fracciones busca distractores de fracciones y no de geometría.
  function mathQuestionFamily(q) {
    const id = String(q?.id || '');
    const match = id.match(/^math-u\d+-([a-z]+)/i);
    return match ? match[1].toLowerCase() : (q?.readingRef || 'general');
  }

  // PRISMA: Conserva la respuesta principal y equivalencias ya declaradas por el banco.
  function writtenAcceptedFor(q) {
    return unique([q?.answer, ...(Array.isArray(q?.accepted) ? q.accepted : [])]);
  }

  // PRISMA: Decide si otra pregunta pertenece al mismo contexto de respuesta.
  function sameDistractorFamily(other, q) {
    if (bank.moduleKey === 'math') return mathQuestionFamily(other) === mathQuestionFamily(q);
    return !!(q.readingRef && other.readingRef === q.readingRef);
  }

  // PRISMA: Crea distractores de fracciones con el mismo tipo de representación.
  // Evita opciones poco didácticas como mezclar 2/4 con 5/12 sin relación con el ejercicio.
  function fractionDistractors(answer) {
    const match = String(answer || '').trim().match(/^(-?\d+)\/(\d+)$/);
    if (!match) return [];
    const n = Number(match[1]), d = Number(match[2]);
    if (!d) return [];
    const values = [
      `${Math.max(0, n - 1)}/${d}`,
      `${n + 1}/${d}`,
      `${Math.max(1, n)}/${d * 2}`,
      `${Math.max(0, n - 2)}/${d}`,
    ];
    return unique(values.filter(v => v !== String(answer))).slice(0, 3);
  }

  // PRISMA v2.5.0: Si la respuesta es uno de los conceptos visibles de la lectura,
  // usa primero otros conceptos de esa misma lectura como distractores. Esto evita mezclar
  // palabras o frases que no pertenecen a la misma familia conceptual.
  function conceptDistractors(unit, q, count = 3) {
    const titles = (unit?.reading?.keyIdeas || []).map(k => String(k?.title || '').trim()).filter(Boolean);
    const norm = v => String(v || '').trim().toLocaleLowerCase('es');
    const answer = norm(q?.answer);
    const exact = titles.find(t => norm(t) === answer);
    if (!exact) return [];
    return titles.filter(t => norm(t) !== answer).slice(0, count);
  }

  // PRISMA: Busca respuestas alternativas reales de la misma unidad para construir opciones de reserva creíbles.
  function distractorsFor(unit, q, count = 3) {
    const conceptOptions = conceptDistractors(unit, q, count);
    if (conceptOptions.length >= Math.min(2, count)) return conceptOptions.slice(0, count);
    const targetShape = answerShape(q.answer);
    if (bank.moduleKey === 'math' && targetShape === 'fraction') {
      const generated = fractionDistractors(q.answer);
      if (generated.length >= 2) return generated.slice(0, count);
    }
    const preferred = [];
    const fallback = [];
    for (const other of unit.questions) {
      const candidates = [];
      if (other.answer && !['Verdadero','Falso'].includes(other.answer)) candidates.push(other.answer);
      if (Array.isArray(other.options)) candidates.push(...other.options);
      for (const value of candidates) {
        if (String(value) === String(q.answer) || answerShape(value) !== targetShape) continue;
        // PRISMA: Primero exige compatibilidad pedagógica. En Matemáticas
        // se prefiere no construir una opción múltiple antes que mostrar distractores absurdos.
        if (sameDistractorFamily(other, q)) preferred.push(String(value));
        else fallback.push(String(value));
      }
    }
    const strict = unique(preferred);
    if (bank.moduleKey === 'math') return strict.slice(0, count);
    // PRISMA v2.5.1: si una unidad tiene muy pocos conceptos, completa los distractores
    // con respuestas del mismo tipo dentro del MISMO módulo. Esto evita opciones artificiales
    // como "Opción alternativa" y mantiene el vocabulario curricular relacionado.
    const moduleFallback=[];
    for(const u of bank.units||[]) for(const other of u.questions||[]){
      const candidates=[];
      if(other.answer&&!['Verdadero','Falso'].includes(other.answer))candidates.push(other.answer);
      if(Array.isArray(other.options))candidates.push(...other.options);
      for(const value of candidates){
        if(String(value)===String(q.answer)||answerShape(value)!==targetShape)continue;
        moduleFallback.push(String(value));
      }
    }
    return unique([...strict, ...fallback, ...moduleFallback]).slice(0, count);
  }

  // PRISMA: Limpia el texto auxiliar del ahorcado cuando se transforma en respuesta escrita.
  function cleanHangmanPrompt(text) {
    return String(text || '')
      .replace(/Ahorcado:\s*identifica el concepto\.\s*Pista:\s*/i, '')
      .replace(/Ahorcado:\s*descubre la respuesta\.\s*Pista:\s*/i, '')
      .replace(/Ahorcado:\s*descubre (?:la )?palabra\.\s*Pista:\s*/i, '')
      .replace(/^Ahorcado:\s*/i, '')
      .replace(/^descubre la respuesta\.\s*Pista:\s*/i, '')
      .replace(/^descubre (?:la )?palabra\.\s*Pista:\s*/i, '')
      .trim();
  }

  // PRISMA v2.5.0: Decide cuándo una opción múltiple puede transformarse en respuesta
  // escrita sin obligar al estudiante a copiar una definición larga o una frase exacta.
  function canBecomeWritten(unit, q) {
    const answer = String(q?.answer || '').trim();
    const prompt = String(q?.prompt || '').toLocaleLowerCase('es');
    const shape = answerShape(answer);
    if (!answer) return false;
    if (shape === 'number' || shape === 'fraction') return true;
    if (bank.moduleKey === 'math' && answer.length <= 24) return true;
    if (bank.moduleKey === 'ohm' && (/fórmula|formula|calcula|convierte/.test(prompt) || /^[virp]\s*[×÷=+\-]/i.test(answer)) && answer.length <= 24) return true;
    if (/qué concepto|que concepto|identifica el concepto|corresponde a esta descripción/.test(prompt) && answer.length <= 32) return true;
    return false;
  }

  // PRISMA v2.5.1: convierte cualquier respuesta escrita del banco curricular a
  // selección ABCD. Los distractores se buscan primero dentro de la misma unidad/familia.
  // Si faltan, se generan alternativas conservadoras según el tipo de respuesta.
  function writtenToChoice(unit, q, index = 0) {
    if (!q || !['short','text'].includes(q.type) || !q.answer) return q;
    const answer=String(q.answer).trim();
    let distractors=distractorsFor(unit,q,3);
    const shape=answerShape(answer);
    if(distractors.length<3 && shape==='number'){
      const n=Number(answer.replace(',','.'));
      if(Number.isFinite(n)) distractors=unique([...distractors,String(n+1),String(Math.max(0,n-1)),String(n+2)]);
    }
    if(distractors.length<3 && shape==='fraction') distractors=unique([...distractors,...fractionDistractors(answer)]);
    if(distractors.length<3){
      const genericByShape={word:['medición','energía','variable','evidencia'],shortphrase:['La opción no corresponde','Un dato diferente','Otra relación posible','Ninguna de las anteriores']};
      distractors=unique([...distractors,...(genericByShape[shape]||genericByShape.shortphrase)]).filter(x=>x!==answer);
    }
    const opts=unique([answer,...distractors]).slice(0,4);
    q.type='choice';
    q.convertedFromWritten=true;
    q.prompt=stripShortPrefix(q.prompt)
      .replace(/^Escribe solo el concepto que corresponde a esta situación:/i,'Selecciona el concepto que corresponde a esta situación:')
      .replace(/^Escribe el concepto que corresponde a esta descripción:/i,'Selecciona el concepto que corresponde a esta descripción:')
      .replace(/^Escribe el concepto:/i,'Selecciona el concepto correcto:')
      .replace(/^Escribe (?:tu |la )?respuesta:/i,'Selecciona la respuesta correcta:')
      .replace(/^Calcula y escribe el resultado:/i,'Calcula y selecciona el resultado correcto:')
      .replace(/^Escribe el resultado:/i,'Selecciona el resultado correcto:');
    q.options=opts;
    delete q.accepted;
    q.time=Math.min(50,Math.max(35,Number(q.time||40)));
    return q;
  }

  // PRISMA: Crea una segunda actividad equivalente pero con otra forma de responder.
  function reserveVariant(unit, q, index) {
    const v = clone(q);
    v.id = `${q.id}-r1`;
    v.reserve = true;
    v.reserveSourceId = q.id;
    v.skill = q.skill ? `${q.skill} · reserva` : 'reserva curricular';

    if (q.type === 'choice' && Array.isArray(q.options)) {
      // Si la respuesta es una definición o una frase larga, la reserva conserva el tipo
      // opción múltiple y solo cambia el orden. Así no exige memorizar/copiarlas literalmente.
      v.type = 'choice';
      const opts = [...q.options];
      const shift = (index % Math.max(1, opts.length - 1)) + 1;
      v.options = [...opts.slice(shift), ...opts.slice(0, shift)];
      v.prompt = String(q.prompt || '').trim();
      v.time = Number(q.time || 40);
      return v;
    }

    if (['short', 'text'].includes(q.type) && q.answer) {
      const distractors = distractorsFor(unit, q, 3);
      if (distractors.length >= 2) {
        v.type = 'choice';
        let basePrompt = stripShortPrefix(q.prompt);
        basePrompt = basePrompt
          .replace(/^Escribe solo el concepto que corresponde a esta situación:/i, 'Selecciona el concepto que corresponde a esta situación:')
          .replace(/^Escribe el concepto que corresponde a esta descripción:/i, 'Selecciona el concepto que corresponde a esta descripción:')
          .replace(/^Escribe el concepto:/i, 'Selecciona el concepto:')
          .replace(/^Escribe tu respuesta:/i, 'Selecciona la respuesta correcta:')
          .replace(/^Escribe la respuesta:/i, 'Selecciona la respuesta correcta:');
        v.prompt = basePrompt;
        v.options = unique([q.answer, ...distractors]).slice(0, 4);
        delete v.accepted;
        v.time = Math.min(45, Number(q.time || 45));
      } else {
        v.type = 'truefalse';
        v.prompt = `Verdadero o falso: la respuesta «${q.answer}» resuelve correctamente este reto: «${stripShortPrefix(q.prompt)}».`;
        v.answer = 'Verdadero';
        delete v.accepted;
        v.time = 30;
      }
      return v;
    }

    if (q.type === 'hangman' && q.answer) {
      v.type = 'choice';
      v.prompt = `Selecciona el concepto que corresponde a la pista: ${cleanHangmanPrompt(q.prompt)}`;
      const distractors=distractorsFor(unit,q,3);
      v.options=unique([q.answer,...distractors]).slice(0,4);
      delete v.accepted; delete v.maxWrong;
      v.time = 45;
      return v;
    }

    if (q.type === 'truefalse') {
      v.type = 'choice';
      v.prompt = `Comprueba esta afirmación: ${String(q.prompt || '').replace(/^Verdadero o falso:\s*/i, '')}`;
      v.options = ['Verdadero', 'Falso'];
      v.time = 35;
      return v;
    }

    if (q.type === 'memory' && Array.isArray(q.pairs)) {
      v.type = 'match';
      v.prompt = 'Relaciona cada elemento con la idea o respuesta que le corresponde.';
      v.pairs = q.pairs.map(p => ({ id: p.id, left: p.right, right: p.left }));
      v.answerSummary = 'Todas las relaciones correctas';
      v.time = Math.max(70, Number(q.time || 70));
      return v;
    }

    if (q.type === 'match' && Array.isArray(q.pairs)) {
      v.type = 'memory';
      v.prompt = 'Memoria: encuentra las parejas que representan la misma relación.';
      v.pairs = q.pairs.map(p => ({ id: p.id, left: p.right, right: p.left }));
      v.answerSummary = 'Todas las parejas correctas';
      v.time = Math.max(80, Number(q.time || 80));
      return v;
    }

    if (q.type === 'order' && Array.isArray(q.items)) {
      v.prompt = String(q.prompt || 'Ordena los elementos correctamente.');
      return v;
    }

    // PRISMA: Fallback conservador para un tipo no contemplado: conserva la pregunta sin inventar contenido nuevo.
    v.prompt = String(q.prompt || '');
    return v;
  }

  // PRISMA: Crea una variante de reserva por cada pregunta fuente. Si el docente agrega
  // preguntas desde el editor, el banco efectivo crece automaticamente en lugar de quedar limitado a 80.
  function expandReserve() {
    for (const unit of bank.units) {
      const originals = unit.questions.filter(q => !q.reserve);
      const ids = new Set(unit.questions.map(q => q.id));
      const variants = [];
      for (let i = 0; i < originals.length; i++) {
        const variant = reserveVariant(unit, originals[i], i);
        if (!variant || ids.has(variant.id)) continue;
        variant.sourceItemId=originals[i].id;variant.competency={...(originals[i].competency||{}),source_item_id:originals[i].id,evidence_kind:'practice_variant'};
        normalizeAccepted(variant);
        ids.add(variant.id);
        variants.push(variant);
      }
      unit.questions = [...originals, ...variants];
      unit.questionPoolSize = unit.questions.length;
      unit.originalQuestionCount = originals.length;
      unit.reserveQuestionCount = variants.length;
    }
    bank.version = 5;
    bank.poolMode = 'original-plus-reserve';
    bank.questionsPerUnit = Math.max(0,...bank.units.map(unit=>unit.questions.length));
    bank.baseRoundQuestions = 15;
  }

  if (bank.moduleKey === 'math') improveMath();

  // PRISMA v2.5.1: antes de ampliar, elimina del banco efectivo las respuestas escritas.
  // Se conserva la respuesta abierta únicamente en las misiones adaptativas evaluadas con rúbrica.
  for (const unit of bank.units) {
    unit.questions.forEach((q,i)=>{ normalizeAccepted(q); writtenToChoice(unit,q,i); });
  }

  expandReserve();

  // PRISMA: Expone un resumen tecnico que facilita pruebas y auditoria sin afectar al estudiante.
  window.PRISMA_BANK_QUALITY = {
    coherenceRevision: '2.5.1',
    moduleKey: bank.moduleKey,
    units: bank.units.length,
    totalQuestions: bank.units.reduce((sum, unit) => sum + unit.questions.length, 0),
    originalQuestions: bank.units.reduce((sum, unit) => sum + Number(unit.originalQuestionCount || 0), 0),
    reserveQuestions: bank.units.reduce((sum, unit) => sum + Number(unit.reserveQuestionCount || 0), 0),
  };
})();
