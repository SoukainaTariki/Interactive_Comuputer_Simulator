import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ALU_STRINGS: Record<string, any> = {
  ar: {
    title: "الحاسبة: وحدة الحساب والمنطق (ALU)",
    sub: "الدوائر المتكاملة للجمع والمقارنة المنطقية | الجذع المشترك",
    add: "➕ ADD (جمع)",
    subtr: "➖ SUB (طرح)",
    and: "🔧 AND (ربط بـ و)",
    or: "🧱 OR (ربط بـ أو)",
    inputA: "بيانات المدخل أ",
    inputB: "بيانات المدخل ب",
    binary: "ثنائي:",
    resultAcc: "النتيجة (ACC)",
    activatedOp: "🔬 المعالجات النشطة:",
    sum: "حساب المجموع",
    diff: "حساب الفارق",
    boolean: "بوابة منطقية ثنائية",
    didYouKnow: "💡 هل تعلم؟",
    didYouKnowDesc: "لا تعرف وحدة ALU سوى إجراء عمليات الجمع الإلكتروني البسيطة على المستوى المجهري. للقيام بالطرح، تقوم بتحويل الرقم B إلى سالب عبر المتمم الثنائي، ثم تجمعه! وتستغرق ترانزستوراتها ميكروثانية لحل هذه العمليات.",
    legend: "⚙️ غيّر الأرقام واختر العملية للرؤية التجريبية لـ ALU"
  },
  fr: {
    title: "La Calculatrice : Unité Arithmétique & Logique (UAL)",
    sub: "Circuits Intégrés d'Addition et de Comparaison Logique | Tronc Commun",
    add: "➕ ADD (Addition)",
    subtr: "➖ SUB (Soustraction)",
    and: "🔧 AND (Liaison ET)",
    or: "🧱 OR (Liaison OU)",
    inputA: "Donnée d’Entrée A",
    inputB: "Donnée d’Entrée B",
    binary: "Binaire:",
    resultAcc: "RÉSULTAT (ACC)",
    activatedOp: "🔬 OPÉRATEURS ACTIVÉS :",
    sum: "Calcul Somme",
    diff: "Calcul Différence",
    boolean: "Porte Logique Booléenne",
    didYouKnow: "💡 Le saviez-vous ?",
    didYouKnowDesc: "L'UAL ne sait faire que des additions électroniques élémentaires de niveaux microscopiques. Pour soustraire, elle transforme le nombre B en négatif via le complément à deux, puis l'additionne ! Ses transistors prennent des microsecondes pour résoudre ces opérations.",
    legend: "⚙️ Modifiez les entrées et l'opération pour simuler l'UAL en direct"
  },
  en: {
    title: "The Calculator: Arithmetic & Logic Unit (ALU)",
    sub: "Integrated circuits for calculation and boolean comparisons | Core Architecture",
    add: "➕ ADD (Addition)",
    subtr: "➖ SUB (Subtraction)",
    and: "🔧 AND (Logic ET/AND)",
    or: "🧱 OR (Logic OU/OR)",
    inputA: "Input Data A",
    inputB: "Input Data B",
    binary: "Binary:",
    resultAcc: "RESULT (ACC)",
    activatedOp: "🔬 LOGIC OPERATORS ACTIVE:",
    sum: "Sum Calculation",
    diff: "Difference Calculation",
    boolean: "Boolean Logic Gate",
    didYouKnow: "💡 Did you know?",
    didYouKnowDesc: "The ALU only knows how to perform basic elementary electronic additions. To subtract, it converts input B to negative using two's complement and then adds it! Its transistors take microseconds to solve these operations.",
    legend: "⚙️ Modify inputs and select operations to simulate the ALU live"
  },
  es: {
    title: "La Calculadora: Unidad Aritmética y Lógica (ALU)",
    sub: "Circuitos integrados para cálculo y comparaciones booleanas | Arquitectura Central",
    add: "➕ ADD (Suma)",
    subtr: "➖ SUB (Resta)",
    and: "🔧 AND (Lógica AND/Y)",
    or: "🧱 OR (Lógica OR/O)",
    inputA: "Datos de Entrada A",
    inputB: "Datos de Entrada B",
    binary: "Binario:",
    resultAcc: "RESULTADO (ACC)",
    activatedOp: "🔬 OPERADORES DE LÓGICA ACTIVOS:",
    sum: "Cálculo de Suma",
    diff: "Cálculo de Diferencia",
    boolean: "Puerta de Lógica Booleana",
    didYouKnow: "💡 ¿Sabías que?",
    didYouKnowDesc: "La ALU solo sabe realizar sumas electrónicas elementales. Para restar, transforma el número B en negativo usando el complemento a dos y luego lo suma. Sus transistores tardan microsegundos para resolver estas operaciones.",
    legend: "⚙️ Cambie los datos de entrada y elija una operación para ver la simulación"
  },
  de: {
    title: "Der Taschenrechner: Rechenwerk (ALU)",
    sub: "Integrierte Schaltkreise für Addition und logische Vergleiche | Kernarchitektur",
    add: "➕ ADD (Addition)",
    subtr: "➖ SUB (Subtraktion)",
    and: "🔧 AND (Logisches UND)",
    or: "🧱 OR (Logisches ODER)",
    inputA: "Eingangsdaten A",
    inputB: "Eingangsdaten B",
    binary: "Binär:",
    resultAcc: "ERGEBNIS (ACC)",
    activatedOp: "🔬 AKTIVIERTE OPERATOREN:",
    sum: "Summenberechnung",
    diff: "Differenzberechnung",
    boolean: "Boolesches Logikgatter",
    didYouKnow: "💡 Wussten Sie schon?",
    didYouKnowDesc: "Die ALU kann im Grunde nur elementare elektronische Additionen durchführen. Für eine Subtraktion wandelt sie die Zahl B mittels Zweierkomplement in eine negative Zahl um und addiert diese dann! Ihre Transistoren benötigen nur Mikrosekunden, um diese Berechnungen durchzuführen.",
    legend: "⚙️ Ändern Sie die Eingaben und wählen Sie Operationen aus, um die ALU live zu erleben"
  }
};

export default function AluDiagram() {
  const { language } = useLanguage();
  const [valA, setValA] = useState<number>(12);
  const [valB, setValB] = useState<number>(5);
  const [operation, setOperation] = useState<'ADD' | 'SUB' | 'AND' | 'OR'>('ADD');
  const [isPowerCalculating, setIsPowerCalculating] = useState(false);
  const [calculatedValue, setCalculatedValue] = useState<number>(17);

  const strings = ALU_STRINGS[language] || ALU_STRINGS.en || ALU_STRINGS.fr;

  useEffect(() => {
    let outcome = 0;
    if (operation === 'ADD') outcome = valA + valB;
    else if (operation === 'SUB') outcome = valA - valB;
    else if (operation === 'AND') outcome = valA & valB;
    else if (operation === 'OR') outcome = valA | valB;
    
    setCalculatedValue(outcome);
  }, [valA, valB, operation]);

  const runALUComputation = () => {
    setIsPowerCalculating(true);
    setTimeout(() => {
      setIsPowerCalculating(false);
    }, 1800);
  };

  const toBinary = (num: number): string => {
    return (num >>> 0).toString(2).padStart(8, '0');
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-indigo-950/40 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2 border-b border-slate-100 dark:border-slate-800 gap-2">
        <div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
            {strings.title}
          </h4>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
            {strings.sub}
          </p>
        </div>
        
        {/* Interactive operation buttons */}
        <div className="flex flex-wrap gap-1">
          {(['ADD', 'SUB', 'AND', 'OR'] as const).map((op) => (
            <button
              key={op}
              onClick={() => { setOperation(op); runALUComputation(); }}
              className={`text-[9px] px-2.5 py-1 rounded-md font-mono font-bold transition-all cursor-pointer ${
                operation === op
                  ? 'bg-blue-600 text-white shadow-xs scale-102 line-height-none'
                  : 'bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 text-slate-650 dark:text-slate-400 hover:bg-slate-100'
              }`}
            >
              {op === 'ADD' ? strings.add :
               op === 'SUB' ? strings.subtr :
               op === 'AND' ? strings.and : strings.or}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs controls panel */}
      <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-100 dark:border-slate-850">
        <div>
          <label className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-wider block mb-1">
            {strings.inputA}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="31"
              value={valA}
              onChange={(e) => { setValA(parseInt(e.target.value)); runALUComputation(); }}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <span className="font-mono text-xs font-black min-w-[30px] text-blue-650 dark:text-blue-450 text-right bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-1 rounded-sm shadow-3xs">
              {valA}
            </span>
          </div>
          <span className="text-[8px] font-mono text-slate-405 block text-left pt-0.5">
            {strings.binary} {toBinary(valA)}
          </span>
        </div>

        <div>
          <label className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-wider block mb-1">
            {strings.inputB}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="31"
              value={valB}
              onChange={(e) => { setValB(parseInt(e.target.value)); runALUComputation(); }}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <span className="font-mono text-xs font-black min-w-[30px] text-blue-650 dark:text-blue-450 text-right bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-1 rounded-sm shadow-3xs">
              {valB}
            </span>
          </div>
          <span className="text-[8px] font-mono text-slate-405 block text-left pt-0.5">
            {strings.binary} {toBinary(valB)}
          </span>
        </div>
      </div>

      {/* SVG ALU Animation Canvas */}
      <div className="relative w-full aspect-[16/10] bg-slate-50/50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center justify-center p-2 overflow-hidden">
        
        {/* Computing lightning overlay */}
        {isPowerCalculating && (
          <div className="absolute inset-0 bg-blue-500/5 mix-blend-screen pointer-events-none animate-pulse" />
        )}

        <svg viewBox="0 0 600 360" className="w-full h-auto select-none font-sans">
          
          {/* MARKERS DEFINITION */}
          <defs>
            <marker id="arrow-blue-solid" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#3b82f6" />
            </marker>
            <marker id="arrow-emerald-solid" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
            </marker>
          </defs>

          {/* INPUT A ARROW PATHWAYS with flow animation */}
          <g>
            <path
              d="M 120,80 L 190,80 Q 230,80 230,120"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="5"
              markerEnd="url(#arrow-blue-solid)"
              strokeDasharray={isPowerCalculating ? '10 4' : 'none'}
              className={isPowerCalculating ? 'stroke-[6px]' : ''}
              style={{ strokeDashoffset: isPowerCalculating ? -20 : 0, transition: 'all 0.1s' }}
            />
            {/* Value boxes A */}
            <rect x="30" y="50" width="100" height="60" rx="8" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" className="dark:fill-slate-900 shadow-3xs" />
            <text x="80" y="72" textAnchor="middle" className="font-sans font-black text-[9px] fill-blue-700 dark:fill-blue-400 uppercase tracking-widest">{strings.inputA === "بيانات المدخل أ" ? "INPUT A" : strings.inputA}</text>
            <text x="80" y="96" textAnchor="middle" className="font-mono text-sm font-extrabold fill-slate-800 dark:fill-slate-150">{valA}</text>
          </g>

          {/* INPUT B ARROW PATHWAYS with flow animation */}
          <g>
            <path
              d="M 480,80 L 410,80 Q 370,80 370,120"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="5"
              markerEnd="url(#arrow-blue-solid)"
              strokeDasharray={isPowerCalculating ? '10 4' : 'none'}
              className={isPowerCalculating ? 'stroke-[6px]' : ''}
              style={{ strokeDashoffset: isPowerCalculating ? -20 : 0, transition: 'all 0.1s' }}
            />
            {/* Value boxes B */}
            <rect x="470" y="50" width="100" height="60" rx="8" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" className="dark:fill-slate-900 shadow-3xs" />
            <text x="520" y="72" textAnchor="middle" className="font-sans font-black text-[9px] fill-blue-700 dark:fill-blue-400 uppercase tracking-widest">{strings.inputB === "بيانات المدخل ب" ? "INPUT B" : strings.inputB}</text>
            <text x="520" y="96" textAnchor="middle" className="font-mono text-sm font-extrabold fill-slate-800 dark:fill-slate-150">{valB}</text>
          </g>

          {/* --- TRAPEZOID ALU BODY COMPOSANT --- */}
          <g className="cursor-pointer" onClick={runALUComputation}>
            <polygon
              points="180,120 420,120 460,220 330,220 300,185 270,220 140,220"
              fill={isPowerCalculating ? '#dbeafe' : '#f0fdf4'}
              stroke={isPowerCalculating ? '#3b82f6' : '#10b981'}
              strokeWidth="3.5"
              className="dark:fill-slate-900 transition-colors duration-200"
            />
            <text x="300" y="152" textAnchor="middle" className="font-mono font-black text-[15px] fill-slate-800 dark:fill-slate-200 tracking-wider">
              {operation}
            </text>
            <text x="300" y="172" textAnchor="middle" className="font-sans font-black text-[9px] fill-emerald-600 dark:fill-emerald-400 tracking-widest uppercase">
              {strings.title === "الحاسبة: وحدة الحساب والمنطق (ALU)" ? "ALU / ARITHMETIC ENGINE" : "UAL / ARITHMETIC ENGINE"}
            </text>

            {/* Arithmetic operators floating decoration inside shape */}
            <g opacity={isPowerCalculating ? 0.9 : 0.3} className="text-emerald-500 font-mono font-black text-xs">
              <text x="180" y="195" textAnchor="middle">01+01</text>
              <text x="420" y="195" textAnchor="middle">AND/OR</text>
              <text x="300" y="210" textAnchor="middle" className="text-[10px]">A {operation === 'ADD' ? '+' : operation === 'SUB' ? '-' : operation === 'AND' ? '&' : '|'} B</text>
            </g>
          </g>

          {/* OUTPUT RESULT ARROW PATHWAY with pulsing logic */}
          <g>
            <path
              d="M 300,220 V 285"
              fill="none"
              stroke="#10b981"
              strokeWidth="5.5"
              markerEnd="url(#arrow-emerald-solid)"
              strokeDasharray={isPowerCalculating ? '4 2' : 'none'}
              className={isPowerCalculating ? 'stroke-[7px]' : ''}
            />

            {/* Floating result capsule */}
            <g transform="translate(210, 275)">
              <rect x="0" y="10" width="180" height="60" rx="12" fill="#10b981" className="shadow-md" />
              <text x="90" y="28" textAnchor="middle" className="font-sans font-black text-[9px] fill-white uppercase tracking-widest">
                {strings.resultAcc}
              </text>
              <text x="90" y="52" textAnchor="middle" className="font-mono text-sm font-black fill-white">
                {calculatedValue} <tspan className="text-[10px] font-normal font-sans opacity-85">({toBinary(calculatedValue)})</tspan>
              </text>
            </g>
          </g>
        </svg>

        {/* Floating status text */}
        <div className="absolute bottom-2 right-2 flex items-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border border-slate-100 dark:border-slate-850 rounded-lg px-2.5 py-1 text-[9px] font-mono text-slate-500 shadow-3xs">
          <span className="font-bold text-blue-650 dark:text-blue-400 mr-1.5">{strings.activatedOp}</span>
          <span>{operation === 'ADD' ? strings.sum : operation === 'SUB' ? strings.diff : strings.boolean}</span>
        </div>
      </div>

      {/* Description Explanation text below */}
      <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-100 dark:border-slate-800/80">
        <p className="text-[11px] text-slate-600 dark:text-slate-350 leading-relaxed">
          💡 <strong className="text-slate-800 dark:text-slate-100 uppercase">{strings.didYouKnow}</strong> {strings.didYouKnowDesc}
        </p>
      </div>
    </div>
  );
}
