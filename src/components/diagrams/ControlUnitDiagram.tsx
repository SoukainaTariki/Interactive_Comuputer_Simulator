import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const CU_STRINGS: Record<string, any> = {
  ar: {
    title: "المهندس والمخطط: وحدة التحكم (CU)",
    sub: "مخطط التدفق: الموزع ومفكك التشفير للتعليمات | الجذع المشترك",
    simulatingBtn: "⏳ جاري محاكاة الدورة...",
    simulateBtn: "⚡ تشغيل دورة الساعة",
    ramMem: "ذاكرة RAM",
    instruction: "تعليمات ثنائية",
    decoder: "مفكك التشفير",
    translatorCode: "[ مترجم الأوامر ]",
    sequencer: "الموزع / الساعة",
    aluOrder: "أمر الـ UAL",
    calculate: "عملية حسابية",
    controlBus: "🚌 ناقل التحكم",
    legend: "💡 اضغط على خطوة لمشاهدة تدفق الإشارات",
    step1Title: "1. إحضار (Fetch)",
    step2Title: "2. تفكيك التشفير (Decode)",
    step3Title: "3. التسلسل (Sequence)",
    step4Title: "4. إرسال (Dispatch)",
    step1Desc: "تقرأ وحدة التحكم (UC) عداد البرنامج (PC)، وتحدد موقع التعليمات الثنائية في الذاكرة RAM، ثم تنقلها إلى سجل التعليمات (IR).",
    step2Desc: "يترجم وحدة فك التشفير الأوامر الثنائية (مثل '01101') إلى أوامر تحكم للدوائر الإلكترونية.",
    step3Desc: "يولد منسق الساعة النبضات الكهربائية التزامنية بالجيجاهرتز لتنظيم أزمنة التنفيذ لجميع المكونات.",
    step4Desc: "ترسل وحدة التحكم الإشارات المناسبة (مثل القراءة/الكتابة، وبدء الحساب) عبر ناقل التحكم إلى وحدة الحساب والمنطق أو الذاكرة."
  },
  fr: {
    title: "Le Chef d’Orchestre : Unité de Contrôle",
    sub: "Flowchart : Sequenceur & Décodeur d'Instruction | Tronc Commun",
    simulatingBtn: "⏳ Cycle En Cours...",
    simulateBtn: "⚡ Lancer le Cycle",
    ramMem: "RAM Mem",
    instruction: "Instruction",
    decoder: "DÉCODEUR",
    translatorCode: "[ Traducteur de code ]",
    sequencer: "SÉQUENCEUR / CLOCK",
    aluOrder: "Ordre UAL",
    calculate: "Calcul",
    controlBus: "🚌 BUS DE CONTRÔLE",
    legend: "💡 Cliquez sur une étape pour examiner le flux",
    step1Title: "1. Fetch (Récupération)",
    step2Title: "2. Decode (Décodage)",
    step3Title: "3. Sequence (Séquencement)",
    step4Title: "4. Dispatch (Exécution)",
    step1Desc: "L'Unité de Contrôle (UC) lit le Compteur Ordinal (PC), localise l'instruction binaire codée dans la RAM, puis la rapatrie dans le Registre d’Instruction (IR).",
    step2Desc: "Le Décodeur interne traduit l'instruction binaire (ex. '01101') en commandes matérielles compréhensibles par les circuits électroniques.",
    step3Desc: "Le Séquenceur d'horloge génère des impulsions électriques rythmiques (en Gigahertz) pour cadencer et coordonner l'activation des puces.",
    step4Desc: "L'UC diffuse les signaux de commande (ex: lire/écrire, démarrer calcul) sur le Bus de Contrôle vers l'UAL ou les périphériques."
  },
  en: {
    title: "The Conductor: Control Unit (CU)",
    sub: "Flowchart: Instruction Sequencer & Decoder | Core Architecture",
    simulatingBtn: "⏳ Running Cycle...",
    simulateBtn: "⚡ Start Clock Cycle",
    ramMem: "RAM Mem",
    instruction: "Instruction",
    decoder: "DECODER",
    translatorCode: "[ Instruction Translator ]",
    sequencer: "SEQUENCER / CLOCK",
    aluOrder: "ALU Command",
    calculate: "Calculation",
    controlBus: "🚌 CONTROL BUS",
    legend: "💡 Click a step to inspect the signal flow",
    step1Title: "1. Fetch (Retrieval)",
    step2Title: "2. Decode (Decoding)",
    step3Title: "3. Sequence (Timing)",
    step4Title: "4. Dispatch (Execution)",
    step1Desc: "The UC reads the Program Counter (PC), finds the instruction inside RAM, and copies it to the Instruction Register (IR).",
    step2Desc: "The internal Decoder translates the computer language (binary code like '01101') into electrical routing path commands.",
    step3Desc: "The Clock Sequencer emits high-frequency electrical pulses (GHz ticks) to trigger elements in strict synchronization.",
    step4Desc: "The UC broadcasts command signals (e.g. read, write, start ALU step) over the system Control Bus pathways."
  },
  es: {
    title: "El Director: Unidad de Control (UC)",
    sub: "Diagrama de flujo: Secuenciador y Decodificador | Arquitectura Central",
    simulatingBtn: "⏳ Ejecutando ciclo...",
    simulateBtn: "⚡ Iniciar ciclo de reloj",
    ramMem: "Memoria RAM",
    instruction: "Instrucción",
    decoder: "DECODIFICADOR",
    translatorCode: "[ Traductor de instrucciones ]",
    sequencer: "SECUENCIADOR / CLOCK",
    aluOrder: "Orden UAL",
    calculate: "Cálculo",
    controlBus: "🚌 BUS DE CONTROL",
    legend: "💡 Haga clic en un paso para inspeccionar el flujo",
    step1Title: "1. Búsqueda (Fetch)",
    step2Title: "2. Decodificación",
    step3Title: "3. Secuención (Reloj)",
    step4Title: "4. Despacho (Ejecución)",
    step1Desc: "La Unidad de Control lee el Contador de Programa (PC), ubica la instrucción binaria en la RAM y la transfiere al Registro de Instrucciones (IR).",
    step2Desc: "El decodificador traduce la instrucción de máquina (como '01101') en señales controladoras comprensibles por los circuitos lógicos.",
    step3Desc: "El secuenciador del reloj genera impulsos eléctricos periódicos de alta frecuencia (en GHz) para cronometrar las unidades correspondientes.",
    step4Desc: "La UC difunde las señales de comando (ej: leer, escribir, operar) sobre el bus de control hacia la ALU o la memoria."
  },
  de: {
    title: "Der Dirigent: Steuerwerk (UC)",
    sub: "Ablaufdiagramm: Taktgeber & Instruktionsdecoder | Kernarchitektur",
    simulatingBtn: "⏳ Zyklus läuft...",
    simulateBtn: "⚡ Taktzyklus starten",
    ramMem: "RAM Speicher",
    instruction: "Anweisung",
    decoder: "DECODER",
    translatorCode: "[ Befehlsübersetzer ]",
    sequencer: "SEQUENZER / TAKT",
    aluOrder: "ALU Befehl",
    calculate: "Berechnung",
    controlBus: "🚌 STEUERBUS",
    legend: "💡 Klicken Sie auf einen Schritt, um den Ablauf zu sehen",
    step1Title: "1. Holen (Fetch)",
    step2Title: "2. Dekodieren",
    step3Title: "3. Takten (Sequenzer)",
    step4Title: "4. Ausführen (Dispatch)",
    step1Desc: "Das Steuerwerk (CU) liest den Befehlszähler (PC), holt die binär codierte Anweisung aus dem Arbeitsspeicher (RAM) ins Instruktionsregister (IR).",
    step2Desc: "Der interne Instruktionsdecoder übersetzt binäre Anweisungen (z. B. '01101') in elektronische Steuersignale für die Ausführungseinheiten.",
    step3Desc: "Der Taktgeber erzeugt gleichmäßige hochfrequente elektrische Impulse (im Gigahertz-Bereich), um alle Arbeitsschritte exakt zu synchronisieren.",
    step4Desc: "Das Steuerwerk verteilt Steuersignale (z. B. Lesen/Schreiben, Rechenstart) über den Steuerbus an das Rechenwerk (ALU) oder Peripheriegeräte."
  }
};

export default function ControlUnitDiagram() {
  const { language } = useLanguage();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const strings = CU_STRINGS[language] || CU_STRINGS.en || CU_STRINGS.fr;

  const steps = [
    {
      id: 1,
      title: strings.step1Title,
      text: strings.step1Desc
    },
    {
      id: 2,
      title: strings.step2Title,
      text: strings.step2Desc
    },
    {
      id: 3,
      title: strings.step3Title,
      text: strings.step3Desc
    },
    {
      id: 4,
      title: strings.step4Title,
      text: strings.step4Desc
    }
  ];

  const triggerSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    let step = 1;
    setActiveStep(1);

    const interval = setInterval(() => {
      step += 1;
      if (step <= 4) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setActiveStep(null);
        setIsSimulating(false);
      }
    }, 2200);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-indigo-950/40 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
            {strings.title}
          </h4>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
            {strings.sub}
          </p>
        </div>
        <button
          onClick={triggerSimulation}
          disabled={isSimulating}
          className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border uppercase tracking-wider transition-all cursor-pointer ${
            isSimulating
              ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900 pointer-events-none'
              : 'bg-indigo-650 hover:bg-indigo-700 text-white border-transparent shadow-xs hover:scale-102 hover:shadow-md'
          }`}
        >
          {isSimulating ? strings.simulatingBtn : strings.simulateBtn}
        </button>
      </div>

      {/* SVG Flowchart Viewport */}
      <div className="relative w-full aspect-[16/10] bg-slate-50/50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center justify-center p-2">
        <svg viewBox="0 0 600 360" className="w-full h-auto select-none font-sans">
          
          {/* DEFINITION OF FLOW MARKERS */}
          <defs>
            <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
            </marker>
            <marker id="arrow-gray" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
            </marker>
            <marker id="arrow-indigo" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#6366f1" />
            </marker>
          </defs>

          {/* BACKGROUND CONDUIT GRID */}
          <g opacity="0.3">
            <line x1="300" y1="20" x2="300" y2="340" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,4" className="dark:stroke-slate-800" />
            <line x1="100" y1="180" x2="500" y2="180" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,4" className="dark:stroke-slate-800" />
          </g>

          {/* STEP 1: INSTRUCTION RAM MODULE (INPUT SOURCE) */}
          <g
            className="cursor-pointer transition-all duration-300"
            onClick={() => setActiveStep(1)}
          >
            <rect
              x="30"
              y="130"
              width="100"
              height="100"
              rx="12"
              fill={activeStep === 1 ? '#ecfdf5' : '#ffffff'}
              stroke={activeStep === 1 ? '#10b981' : '#cbd5e1'}
              strokeWidth={activeStep === 1 ? '3' : '1.5'}
              className="dark:fill-slate-900 dark:stroke-slate-800 transition-colors"
            />
            <rect x="30" y="130" width="100" height="28" rx="100" rx-y="100" fill="#10b981" className="opacity-10" />
            <text x="80" y="148" textAnchor="middle" className="font-sans font-black text-[10px] fill-emerald-800 dark:fill-emerald-400 uppercase tracking-widest">
              {strings.ramMem}
            </text>
            <text x="80" y="180" textAnchor="middle" className="font-mono text-[11px] fill-slate-800 dark:fill-slate-100 font-bold">
              0110 1101
            </text>
            <text x="80" y="198" textAnchor="middle" className="font-sans text-[8px] fill-slate-500">
              {strings.instruction}
            </text>
          </g>

          {/* DIRECTED ARROW FROM RAM TO UC */}
          <path
            d="M 130,180 L 190,180"
            fill="none"
            stroke={activeStep === 1 ? '#10b981' : '#94a3b8'}
            strokeWidth="3"
            markerEnd="url(#arrow-green)"
            className={activeStep === 1 ? 'animate-pulse' : ''}
          />

          {/* MAIN CONTAINER: UNITÉ DE CONTRÔLE (UC) GRAPHIC */}
          <g>
            <rect
              x="200"
              y="45"
              width="200"
              height="250"
              rx="20"
              fill="none"
              stroke="#6366f1"
              strokeWidth="2.5"
              strokeDasharray="6,3"
              className="dark:stroke-indigo-800"
            />
            <rect x="230" y="32" width="140" height="22" rx="6" fill="#6366f1" />
            <text x="300" y="46" textAnchor="middle" className="font-mono font-black text-[9px] fill-white tracking-widest uppercase">
              {strings.decoder === "DÉCODEUR" ? "UNITÉ DE CONTRÔLE (UC)" : "CONTROL UNIT (CU)"}
            </text>
          </g>

          {/* STEP 2: DÉCODEUR D'INSTRUCTION */}
          <g
            className="cursor-pointer transition-all duration-300"
            onClick={() => setActiveStep(2)}
          >
            <rect
              x="220"
              y="75"
              width="160"
              height="75"
              rx="12"
              fill={activeStep === 2 ? '#e0e7ff' : '#f8fafc'}
              stroke={activeStep === 2 ? '#6366f1' : '#e2e8f0'}
              strokeWidth={activeStep === 2 ? '3.5' : '1.5'}
              className="dark:fill-slate-900 dark:stroke-slate-800 transition-colors"
            />
            <text x="300" y="98" textAnchor="middle" className="font-sans font-extrabold text-[11px] fill-indigo-900 dark:fill-indigo-300">
              {strings.decoder}
            </text>
            <text x="300" y="112" textAnchor="middle" className="font-mono text-[8px] fill-indigo-500 tracking-wider">
              {strings.translatorCode}
            </text>
            <line x1="240" y1="125" x2="360" y2="125" stroke="#cbd5e1" strokeWidth="1.5" className="dark:stroke-slate-800" />
            <text x="300" y="136" textAnchor="middle" className="font-mono text-[8px] fill-rose-500 font-semibold uppercase">
              01101 ➔ ADDER
            </text>
          </g>

          {/* COUPLING LINK: DECODER TO SEQUENCER */}
          <path
            d="M 300,150 L 300,195"
            fill="none"
            stroke={activeStep === 2 || activeStep === 3 ? '#6366f1' : '#94a3b8'}
            strokeWidth="2.5"
            markerEnd="url(#arrow-indigo)"
          />

          {/* STEP 3: SÉQUENCEUR ET HORLOGE SYSTÈMATIQUE */}
          <g
            className="cursor-pointer transition-all duration-300"
            onClick={() => setActiveStep(3)}
          >
            <rect
              x="220"
              y="200"
              width="160"
              height="75"
              rx="12"
              fill={activeStep === 3 ? '#e0e7ff' : '#f8fafc'}
              stroke={activeStep === 3 ? '#6366f1' : '#e2e8f0'}
              strokeWidth={activeStep === 3 ? '3.5' : '1.5'}
              className="dark:fill-slate-900 dark:stroke-slate-800 transition-colors"
            />
            {/* Pulsing clock visual wave */}
            <path
              d="M 235,250 L 250,250 L 255,230 L 265,260 L 270,250 L 285,250 L 290,230 L 300,260 L 305,250 L 320,250 L 325,230 L 335,260 L 340,250 M 345,250"
              fill="none"
              stroke="#6366f1"
              strokeWidth="2.5"
              className={activeStep === 3 ? 'animate-pulse' : 'opacity-60'}
            />
            <text x="300" y="218" textAnchor="middle" className="font-sans font-extrabold text-[11px] fill-indigo-900 dark:fill-indigo-300">
              {strings.sequencer}
            </text>
          </g>

          {/* CONNECTORS TO DESTINATIONS (ALU AND BUS) */}
          <path
            d="M 380,238 H 470"
            fill="none"
            stroke={activeStep === 4 ? '#f59e0b' : '#cbd5e1'}
            strokeWidth="3.5"
            markerEnd="url(#arrow-green)"
            className={activeStep === 4 ? 'animate-bounce' : ''}
          />
          <path
            d="M 300,275 V 320"
            fill="none"
            stroke={activeStep === 4 ? '#f59e0b' : '#cbd5e1'}
            strokeWidth="3.5"
            markerEnd="url(#arrow-gray)"
          />

          {/* STEP 4: OUTPUT OUTPUT STAGE (ORDRES DE CALCUL & CONTROL BUS) */}
          {/* Target A: Ordre à l'UAL */}
          <g
            className="cursor-pointer transition-all duration-305"
            onClick={() => setActiveStep(4)}
          >
            <rect
              x="470"
              y="200"
              width="100"
              height="75"
              rx="12"
              fill={activeStep === 4 ? '#fef3c7' : '#ffffff'}
              stroke={activeStep === 4 ? '#f59e0b' : '#cbd5e1'}
              strokeWidth={activeStep === 4 ? '3' : '1.5'}
              className="dark:fill-slate-900 dark:stroke-slate-800 transition-colors"
            />
            <text x="520" y="222" textAnchor="middle" className="font-sans text-[10px] fill-amber-900 dark:fill-amber-400 font-extrabold uppercase">
              {strings.aluOrder}
            </text>
            <text x="520" y="238" textAnchor="middle" className="font-mono text-[9px] fill-slate-400 dark:fill-slate-500 font-bold">
              [ Additionner! ]
            </text>
            <text x="520" y="254" textAnchor="middle" className="font-sans text-[8px] fill-slate-400 font-medium">
              {strings.calculate}
            </text>
          </g>

          {/* Target B: Control Bus */}
          <g
            className="cursor-pointer transition-all duration-300"
            onClick={() => setActiveStep(4)}
          >
            <rect
              x="230"
              y="318"
              width="140"
              height="35"
              rx="8"
              fill={activeStep === 4 ? '#fffbeb' : '#ffffff'}
              stroke={activeStep === 4 ? '#f59e0b' : '#cbd5e1'}
              strokeWidth={activeStep === 4 ? '2.5' : '1.5'}
              className="dark:fill-slate-900 dark:stroke-slate-800 transition-colors"
            />
            <text x="300" y="339" textAnchor="middle" className="font-mono text-[9px] fill-amber-800 dark:fill-amber-500 font-bold uppercase tracking-wider">
              {strings.controlBus}
            </text>
          </g>
        </svg>

        {/* Legend Step Details Card */}
        <div className="absolute top-2 left-2 flex items-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs border border-slate-100 dark:border-slate-850 rounded-lg px-2.5 py-1 text-[9px] font-sans font-bold text-slate-500 dark:text-slate-400 shadow-3xs">
          <span>{strings.legend}</span>
        </div>
      </div>

      {/* Description list representation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
        {steps.map((st) => (
          <button
            key={st.id}
            onClick={() => setActiveStep(st.id)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeStep === st.id
                ? 'bg-indigo-50/50 hover:bg-indigo-50 dark:bg-indigo-950/20 border-indigo-500 dark:border-indigo-800 shadow-3xs hover:scale-101'
                : 'bg-slate-50/20 hover:bg-slate-50/50 dark:bg-slate-950/20 dark:hover:bg-slate-950/40 border-slate-100 dark:border-slate-850'
            }`}
          >
            <h5 className={`text-[11px] font-black uppercase mb-1.5 ${activeStep === st.id ? 'text-indigo-650 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}>
              {st.title}
            </h5>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-3">
              {st.text}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
