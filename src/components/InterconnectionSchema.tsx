import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Cpu, Settings, Calculator, Database, Layers, 
  Zap, Activity, Radio, Power 
} from 'lucide-react';

interface InterconnectionSchemaProps {
  componentId: string;
  language: string;
}

export default function InterconnectionSchema({ componentId, language }: InterconnectionSchemaProps) {
  const isRTL = language === 'ar';

  switch (componentId) {
    case 'h_cpu':
      return <CpuInternalDiagram language={language} isRTL={isRTL} />;
    case 'h_uc':
      return <ControlUnitInternalDiagram language={language} isRTL={isRTL} />;
    case 'h_ual':
      return <AluInternalDiagram language={language} isRTL={isRTL} />;
    case 'h_motherboard':
      return <MotherboardBusDiagram language={language} isRTL={isRTL} />;
    case 'h_cache':
      return <CacheHierarchyVisualizer language={language} isRTL={isRTL} />;
    case 'h_ram':
      return <RamVolatilitySimulator language={language} isRTL={isRTL} />;
    case 'h_psu':
    case 'h_alimentation':
      return <PsuVoltageConvertor language={language} isRTL={isRTL} />;
    default:
      return null;
  }
}

// ============================================================================
// 1. CPU INTERNAL DIAGRAM (h_cpu)
// ============================================================================
function CpuInternalDiagram({ language, isRTL }: { language: string; isRTL: boolean }) {
  const [activeSegment, setActiveSegment] = useState<string | null>(null);

  const CPU_DIAGRAM_STRINGS: Record<string, any> = {
    ar: {
      title: "التوصيل والتفاعل الداخلي للمعالج",
      sub: "كيف تتدفق المعطيات والعناوين والتحكم",
      uc: "وحدة التحكم (UC)",
      ucDesc: "تقرأ التعليمات وتوجه الأوامر لكل المكونات.",
      ual: "الوحدة الحسابية والمنطقية (ALU)",
      ualDesc: "تنفذ العمليات الرياضية والمقارنات العقلانية.",
      reg: "سجلات المعالجة (Registers)",
      regDesc: "تخزن المعطيات اللحظية بسرعة البرق.",
      busControl: "ناقل التحكم (Signaux Électriques)",
      busData: "مسار البيانات الداخلي",
      clickHint: "انقر على مكون لفهم حركته الاتصالية"
    },
    fr: {
      title: "Architecture d'Interconnexion Interne du CPU",
      sub: "Comment transitent les calculs et signaux au cœur de la puce",
      uc: "Unité de Contrôle (UC)",
      ucDesc: "Le chef d'orchestre : décode et pilote le flux.",
      ual: "Unité d'Alimentation CPU / ALU",
      ualDesc: "Le calculateur rapide : additions et logique.",
      reg: "Registres de Travail",
      regDesc: "Mémoires instantanées ultra-rapides du processeur.",
      busControl: "Bus de Contrôle",
      busData: "Autoroute des Données Directes",
      clickHint: "Cliquez sur une section pour faire circuler les informations"
    },
    en: {
      title: "CPU Internal Interconnection Architecture",
      sub: "How calculations, addresses, and control signals flow inside the chip",
      uc: "Control Unit (CU)",
      ucDesc: "The conductor: decodes instructions and routes data flows.",
      ual: "Arithmetic Logic Unit (ALU)",
      ualDesc: "The fast calculator: additions, subtractions and boolean logic.",
      reg: "Working Registers",
      regDesc: "Ultra-fast instant memory cells on the CPU die.",
      busControl: "Control Bus",
      busData: "Direct Data Highway",
      clickHint: "Click on any section to simulate the data signal flow"
    },
    es: {
      title: "Arquitectura de Interconexión Interna de la CPU",
      sub: "Cómo fluyen los cálculos, direcciones y señales dentro del chip",
      uc: "Unidad de Control (UC)",
      ucDesc: "El director: decodifica las instrucciones y dirige los flujos.",
      ual: "Unidad Aritmética Lógica (ALU)",
      ualDesc: "El calculador rápido: sumas, restas y lógica booleana.",
      reg: "Registros de Trabajo",
      regDesc: "Celdas de memoria instantáneas y ultrarrápidas de la CPU.",
      busControl: "Bus de Control",
      busData: "Autopista de Datos Directos",
      clickHint: "Haga clic en una sección para ver fluir las señales"
    },
    de: {
      title: "Interne Verbindungsarchitektur der CPU",
      sub: "Wie Berechnungen, Adressen und Steuersignale im Chip fließen",
      uc: "Steuerwerk (UC)",
      ucDesc: "Der Dirigent: dekodiert Befehle und lenkt den Datenstrom.",
      ual: "Rechenwerk (ALU)",
      ualDesc: "Der schnelle Rechner: Additionen und boolesche Logik.",
      reg: "Arbeitsregister",
      regDesc: "Superschnelle Sofortspeicherzellen direkt im Prozessor.",
      busControl: "Steuerbus",
      busData: "Direkte Datenautobahn",
      clickHint: "Klicken Sie auf einen Bereich, um Signale fließen zu lassen"
    }
  };

  const labels = CPU_DIAGRAM_STRINGS[language] || CPU_DIAGRAM_STRINGS.en || CPU_DIAGRAM_STRINGS.fr;

  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-850 rounded-3xl p-5 md:p-6 text-slate-800 dark:text-white transition-colors duration-300 space-y-4 shadow-sm">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h5 className="text-sm font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 uppercase font-sans">
            <Cpu className="w-4 h-4 text-emerald-500 animate-pulse animate-duration-[3000ms]" />
            <span>{labels.title}</span>
          </h5>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">{labels.sub}</p>
        </div>
      </div>

      <div className="relative border border-slate-200 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl overflow-hidden aspect-[16/10] md:aspect-[16/9] flex flex-col justify-between transition-colors duration-300">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-radial-grid opacity-10 pointer-events-none" />

        {/* Dynamic Glowing Communication Trace Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 500 280">
          {/* Path from UC to ALU */}
          <path d="M 150 70 H 350" fill="none" stroke="#e11d48" strokeWidth="2" strokeDasharray="5, 5" className="opacity-40" />
          {activeSegment === 'uc' && (
            <motion.path 
              d="M 150 70 H 350" 
              fill="none" 
              stroke="#fb7185" 
              strokeWidth="3.5" 
              initial={{ strokeDashoffset: 30 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              strokeDasharray="8, 8"
            />
          )}

          {/* Path from Reg to ALU */}
          <path d="M 350 200 V 100" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="5, 5" className="opacity-30" />
          {activeSegment === 'reg' && (
            <motion.path 
              d="M 350 200 V 100" 
              fill="none" 
              stroke="#60a5fa" 
              strokeWidth="4" 
              initial={{ strokeDashoffset: 20 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              strokeDasharray="6, 6"
            />
          )}

          {/* Path from Reg to UC */}
          <path d="M 150 200 V 100" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="5, 5" className="opacity-30" />
          {activeSegment === 'reg' && (
            <motion.path 
              d="M 150 240 L 150 90" 
              fill="none" 
              stroke="#34d399" 
              strokeWidth="3" 
              initial={{ strokeDashoffset: -20 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              strokeDasharray="5, 5"
            />
          )}
        </svg>

        {/* Top Layer: UC & ALU */}
        <div className="grid grid-cols-2 gap-4 relative z-10">
          {/* UC Card */}
          <button 
            onClick={() => setActiveSegment(activeSegment === 'uc' ? null : 'uc')}
            className={`p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden ${
              activeSegment === 'uc' 
                ? 'bg-rose-50/80 dark:bg-rose-950/50 border-rose-500 shadow-md scale-102 ring-1 ring-rose-500' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-rose-400 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings className={`w-5 h-5 ${activeSegment === 'uc' ? 'text-rose-505 dark:text-rose-400 rotate-45' : 'text-rose-500'} transition-transform`} />
              <span className="font-bold text-xs font-sans text-rose-700 dark:text-rose-200">{labels.uc}</span>
            </div>
            <p className="text-[10px] text-slate-600 dark:text-slate-350 mt-1.5 leading-normal">{labels.ucDesc}</p>
            {activeSegment === 'uc' && (
              <span className="absolute bottom-1 right-2 text-[8px] font-mono text-rose-500 dark:text-rose-400 animate-pulse uppercase">active control pulse</span>
            )}
          </button>

          {/* ALU Card */}
          <button 
            onClick={() => setActiveSegment(activeSegment === 'ual' ? null : 'ual')}
            className={`p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden ${
              activeSegment === 'ual' 
                ? 'bg-emerald-50/80 dark:bg-emerald-950/50 border-emerald-500 shadow-md scale-102 ring-1 ring-emerald-500' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-emerald-400 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Calculator className={`w-5 h-5 ${activeSegment === 'ual' ? 'text-emerald-600 dark:text-emerald-400 scale-105' : 'text-emerald-500'}`} />
              <span className="font-bold text-xs font-sans text-emerald-700 dark:text-emerald-205">{labels.ual}</span>
            </div>
            <p className="text-[10px] text-slate-600 dark:text-slate-350 mt-1.5 leading-normal">{labels.ualDesc}</p>
            {activeSegment === 'ual' && (
              <span className="absolute bottom-1 right-2 text-[8px] font-mono text-emerald-600 dark:text-emerald-400 animate-bounce uppercase">ALU CALC ACTIVE</span>
            )}
          </button>
        </div>

        {/* Middle Bus Banner */}
        <div className="flex justify-center items-center py-2 relative z-10">
          <span className="text-[9px] font-mono tracking-widest text-slate-600 dark:text-[#94a3b8] bg-slate-100 dark:bg-[#1e293b] px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 uppercase flex items-center gap-1.5 shadow-sm">
            <Radio className="w-3 h-3 text-cyan-600 dark:text-cyan-405 animate-pulse" />
            <span>{activeSegment === 'uc' ? labels.busControl : labels.busData}</span>
          </span>
        </div>

        {/* Bottom Layer: Registers */}
        <button 
          onClick={() => setActiveSegment(activeSegment === 'reg' ? null : 'reg')}
          className={`w-full p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden z-10 ${
            activeSegment === 'reg' 
              ? 'bg-blue-50/80 dark:bg-blue-950/50 border-blue-500 shadow-md scale-101 ring-1 ring-blue-500' 
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-slate-705'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-500" />
              <span className="font-bold text-xs font-sans text-blue-700 dark:text-blue-200">{labels.reg}</span>
            </div>
            <div className="flex gap-2 font-mono text-[9px] text-blue-600 dark:text-[#3b82f6] font-bold">
              <span>[ REG0: F1 ]</span>
              <span>[ ACC: 0101 ]</span>
              <span>[ IR: ADD ]</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-600 dark:text-slate-350 mt-1.5 leading-normal">{labels.regDesc}</p>
        </button>
      </div>

      <div className="text-[10px] font-mono text-center text-slate-500 flex items-center justify-center gap-2 pt-1">
        <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
        <span>{labels.clickHint}</span>
      </div>
    </div>
  );
}

// ============================================================================
// 2. CONTROL UNIT INTERNAL DIAGRAM (h_uc)
// ============================================================================
function ControlUnitInternalDiagram({ language, isRTL }: { language: string; isRTL: boolean }) {
  const [clockRate, setClockRate] = useState<number>(1);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 2800 / clockRate);
    return () => clearInterval(timer);
  }, [clockRate]);

  const stepsInfo: Record<string, { t: string; desc: string }[]> = {
    ar: [
      { t: "1. جلب (Fetch)", desc: "يقوم السيكوانسور بجلب الكود الكهربائي الثنائي للتعليمة من الذاكرة العشوائية RAM." },
      { t: "2. فك التشفير (Decode)", desc: "يقوم مفسر التعليمات بترجمة الشيفرة الثنائية إلى أوامر وتحكّمات فرعية." },
      { t: "3. توجيه الإشارات (Execute/Dispatch)", desc: "ترسل وحدة العضو الإشارات الكهربائية لتأمر الوحدة الحسابية أو المسجلات بالعمل." }
    ],
    fr: [
      { t: "1. Chargement (Fetch)", desc: "Le séquenceur synchronise l'arrivée de la ligne de code binaire depuis la mémoire vive." },
      { t: "2. Décodage (Decode)", desc: "Le décodeur examine le binaire pour générer les tensions électriques de commande." },
      { t: "3. Orchestration (Dispatch/Execute)", desc: "Elle ouvre les vannes électriques (bus) pour ordonner la réalisation de l'opération." }
    ],
    en: [
      { t: "1. Fetch", desc: "The control sequencer fetches the electric binary code of the instruction from volatile RAM." },
      { t: "2. Decode", desc: "The instruction decoder translates the binary pattern into micro-operation commands." },
      { t: "3. Execute / Dispatch", desc: "The dispatch unit sends control signals to ALU or registers to execute the task." }
    ],
    es: [
      { t: "1. Búsqueda (Fetch)", desc: "El secuenciador eléctrico busca el código binario de la instrucción en la memoria RAM." },
      { t: "2. Decodificación (Decode)", desc: "El decodificador traduce el patrón binario en microórdenes eléctricas." },
      { t: "3. Ejecución / Envío (Execute/Dispatch)", desc: "La unidad de control envía las señales para indicar a la ALU o registros que actúen." }
    ],
    de: [
      { t: "1. Abrufen (Fetch)", desc: "Das Steuerwerk ruft den binären Befehlscode aus dem flüchtigen RAM-Speicher ab." },
      { t: "2. Dekodieren (Decode)", desc: "Der Befehlsdecoder übersetzt den Binärcode in elektrische Steuersignale." },
      { t: "3. Ausführen / Verteilen (Execute/Dispatch)", desc: "Das Steuerwerk sendet Signale an die ALU oder Register zur Ausführung." }
    ]
  };

  const UC_DIAGRAM_STRINGS: Record<string, any> = {
    ar: {
      title: "دورة توجيه وحدة التحكم",
      sub: "تنظيم وتوجيه نبضات القلب المعالج السيكوانسور",
      freq: "تردد نبضات ساعة المعالج:",
      anatomy: "مسار الوظيفة الحالية:"
    },
    fr: {
      title: "Circuit de Commande de l'Unité de Contrôle",
      sub: "Représentation du décodage de l'oscillateur d'horloge",
      freq: "Fréquence de l'oscillateur :",
      anatomy: "Anatomie du cycle interne :"
    },
    en: {
      title: "Control Unit Instruction Cycle",
      sub: "Representation of the clock oscillator decoding",
      freq: "Processor Clock Frequency:",
      anatomy: "Anatomy of the internal cycle:"
    },
    es: {
      title: "Ciclo de Instrucción de la Unidad de Control",
      sub: "Planificación y dirección de los impulsos de reloj",
      freq: "Frecuencia del Reloj del Procesador:",
      anatomy: "Anatomía del ciclo interno:"
    },
    de: {
      title: "Arbeitskreis des Steuerwerks",
      sub: "Organisation der Prozessortaktleitung",
      freq: "Prozessortaktfrequenz:",
      anatomy: "Anatomie des internen Zyklus:"
    }
  };

  const getTranslatedSteps = () => {
    return stepsInfo[language] || stepsInfo.en || stepsInfo.fr;
  };

  const ucls = UC_DIAGRAM_STRINGS[language] || UC_DIAGRAM_STRINGS.en || UC_DIAGRAM_STRINGS.fr;
  const currentStepData = getTranslatedSteps()[step];

  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-850 rounded-3xl p-5 md:p-6 text-slate-800 dark:text-white transition-colors duration-300 space-y-4 shadow-sm">
      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-850">
        <div>
          <h5 className="text-sm font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            <Settings className="w-4 h-4 text-rose-500 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{ucls.title}</span>
          </h5>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
            {ucls.sub}
          </p>
        </div>
      </div>

      <div className="bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-2xl p-4 md:p-5 space-y-5 transition-colors duration-300">
        {/* Physical clock frequency control */}
        <div className="flex justify-between items-center bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-850 shadow-2xs transition-colors duration-300">
          <span className="text-[11px] font-mono text-slate-600 dark:text-slate-300 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-yellow-500" />
            <span>{ucls.freq}</span>
            <span className="text-yellow-600 dark:text-yellow-400 font-extrabold">{clockRate} GHz</span>
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 4].map((rate) => (
              <button
                key={rate}
                onClick={() => setClockRate(rate)}
                className={`px-3 py-1 rounded-md text-[9px] font-black cursor-pointer transition-all duration-200 ${
                  clockRate === rate 
                    ? 'bg-rose-650 dark:bg-rose-600 text-white shadow-sm scale-105' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>

        {/* Visual pipeline stream flow */}
        <div className="grid grid-cols-3 gap-3">
          {getTranslatedSteps().map((st, i) => {
            const isCurrentlyActive = step === i;
            return (
              <div 
                key={i}
                className={`p-3 rounded-xl border text-center transition-all duration-300 ${
                  isCurrentlyActive 
                    ? 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-455 text-rose-950 dark:text-rose-200 shadow-2xs scale-102 font-bold' 
                    : 'bg-white dark:bg-slate-950/20 border-slate-150 dark:border-slate-850 opacity-50 text-slate-500 dark:text-slate-450 font-bold'
                }`}
              >
                <div className="h-1.5 w-full rounded-full mb-2 bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                  {isCurrentlyActive && (
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-rose-500 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2.8 / clockRate, ease: "linear" }}
                    />
                  )}
                </div>
                <div className={`font-black text-[10px] sm:text-xs truncate ${isCurrentlyActive ? 'text-rose-700 dark:text-rose-400' : 'text-slate-400 dark:text-slate-500'}`}>
                  {st.t}
                </div>
              </div>
            );
          })}
        </div>

        {/* Concrete Step Explanation */}
        <div className="bg-white dark:bg-slate-950/85 p-4 rounded-xl border-l-4 border-rose-600 text-slate-800 dark:text-[#f8fafc] shadow-3xs transition-colors duration-300">
          <span className="text-[9px] font-black uppercase text-rose-500 dark:text-rose-400 font-mono block mb-1">
            {ucls.anatomy}
          </span>
          <div className="space-y-1">
            <h6 className="text-[12px] font-bold text-slate-900 dark:text-slate-100">{currentStepData.t}</h6>
            <p className="text-[11px] text-slate-655 dark:text-[#cbd5e1] leading-relaxed font-medium">{currentStepData.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. ALU INTERNAL DIAGRAM (h_ual)
// ============================================================================
function AluInternalDiagram({ language, isRTL }: { language: string; isRTL: boolean }) {
  const [numA, setNumA] = useState<number>(2);
  const [numB, setNumB] = useState<number>(3);
  const [op, setOp] = useState<'+' | '-' | '*'>('+');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [result, setResult] = useState<number | string>(5);

  const performCalculation = () => {
    setIsCalculating(true);
    setTimeout(() => {
      let calcRes: number = 0;
      if (op === '+') calcRes = numA + numB;
      else if (op === '-') calcRes = numA - numB;
      else if (op === '*') calcRes = numA * numB;
      setResult(calcRes);
      setIsCalculating(false);
    }, 800);
  };

  const toBinary = (val: number) => {
    if (val < 0) return "-" + Math.abs(val).toString(2).padStart(4, '0');
    return val.toString(2).padStart(4, '0');
  };

  const ALU_DIAGRAM_STRINGS: Record<string, any> = {
    ar: {
      title: "الوحدة الحسابية والمنطقية التفاعلية",
      sub: "اختبر تدفق البيانات والمخرجات الرياضية الثنائية",
      trigger: "فحص ومعالجة بنية الحساب",
      accOut: "سجل تجميع النتيجة (ACCUMULATEUR)",
      calculating: "عمليات الترانزستور...",
      dataA: "المعطى أ",
      dataB: "المعطى ب",
      binary: "ثنائي"
    },
    fr: {
      title: "Calculateur d'Interconnexion ALU Direct",
      sub: "Additionnez les variables et observez l'onde finale",
      trigger: "Déclencher Calcul Électrique",
      accOut: "Accumulateur CPU Out (ACC)",
      calculating: "calcul du transistor...",
      dataA: "Donnée A",
      dataB: "Donnée B",
      binary: "Binaire"
    },
    en: {
      title: "Interactive Arithmetic Logic Unit (ALU)",
      sub: "Input variables and observe the arithmetic binary output",
      trigger: "Trigger Electrical Calculation",
      accOut: "CPU Accumulator Output (ACC)",
      calculating: "transistor logic...",
      dataA: "Data A",
      dataB: "Data B",
      binary: "Binary"
    },
    es: {
      title: "Unidad Aritmética Lógica (ALU) Interactiva",
      sub: "Ingrese las variables y observe la salida binaria aritmética",
      trigger: "Disparar Cálculo Eléctrico",
      accOut: "Salida del Acumulador CPU (ACC)",
      calculating: "cálculo de transistores...",
      dataA: "Dato A",
      dataB: "Dato B",
      binary: "Binario"
    },
    de: {
      title: "Interaktives Rechenwerk (ALU)",
      sub: "Geben Sie Variablen ein und beobachten Sie die binäre Ausgabe",
      trigger: "Elektrische Berechnung auslösen",
      accOut: "Rechenwerk-Akkumulator (ACC)",
      calculating: "Transistorberechnung...",
      dataA: "Wert A",
      dataB: "Wert B",
      binary: "Binär"
    }
  };

  const labels = ALU_DIAGRAM_STRINGS[language] || ALU_DIAGRAM_STRINGS.en || ALU_DIAGRAM_STRINGS.fr;

  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-850 rounded-3xl p-5 md:p-6 text-slate-800 dark:text-white transition-colors duration-300 space-y-4 shadow-sm">
      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-850">
        <div>
          <h5 className="text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
            <Calculator className="w-4 h-4 text-emerald-505 dark:text-emerald-400 animate-pulse" />
            <span>{labels.title}</span>
          </h5>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
            {labels.sub}
          </p>
        </div>
      </div>

      <div className="bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-4 rounded-2xl space-y-4 transition-colors duration-300">
        {/* Dynamic Controls Grid */}
        <div className="grid grid-cols-3 gap-3 items-center">
          {/* Number A */}
          <div className="bg-white dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-850 text-center space-y-1 shadow-3xs transition-colors duration-300">
            <label className="text-[9px] text-slate-400 dark:text-slate-500 uppercase block font-mono">{labels.dataA}</label>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-450">{numA}</div>
            <div className="text-[9px] font-mono text-slate-400 opacity-60 font-semibold mt-0.5">({toBinary(numA)})</div>
            <div className="flex justify-center gap-1 pt-1.5">
              <button onClick={() => setNumA(prev => Math.max(0, prev - 1))} className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-705 text-[10px] font-bold text-slate-655 dark:text-slate-300 rounded cursor-pointer">-</button>
              <button onClick={() => setNumA(prev => Math.min(15, prev + 1))} className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-705 text-[10px] font-bold text-slate-655 dark:text-slate-300 rounded cursor-pointer">+</button>
            </div>
          </div>

          {/* Operation Selector */}
          <div className="bg-white dark:bg-slate-950 p-2 text-center rounded-xl border border-slate-200 dark:border-slate-850 space-y-2 shadow-3xs transition-colors duration-300">
            <label className="text-[9px] text-slate-400 dark:text-slate-500 uppercase block font-mono">CODE ALU</label>
            <div className="flex justify-center gap-1.5">
              {(['+', '-', '*'] as const).map((operator) => (
                <button
                  key={operator}
                  onClick={() => { setOp(operator); setResult('?'); }}
                  className={`w-6 h-6 flex items-center justify-center rounded text-xs font-black cursor-pointer transition-all ${
                    op === operator 
                      ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-xs' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-700'
                  }`}
                >
                  {operator}
                </button>
              ))}
            </div>
          </div>

          {/* Number B */}
          <div className="bg-white dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-850 text-center space-y-1 shadow-3xs transition-colors duration-300">
            <label className="text-[9px] text-slate-400 dark:text-slate-500 uppercase block font-mono">{labels.dataB}</label>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-455">{numB}</div>
            <div className="text-[9px] font-mono text-slate-400 opacity-60 font-semibold mt-0.5">({toBinary(numB)})</div>
            <div className="flex justify-center gap-1 pt-1.5">
              <button onClick={() => setNumB(prev => Math.max(0, prev - 1))} className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-[10px] font-bold text-slate-655 dark:text-slate-300 rounded cursor-pointer">-</button>
              <button onClick={() => setNumB(prev => Math.min(15, prev + 1))} className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-[10px] font-bold text-slate-655 dark:text-slate-300 rounded cursor-pointer">+</button>
            </div>
          </div>
        </div>

        {/* Central Execute Button */}
        <button
          onClick={performCalculation}
          disabled={isCalculating}
          className="w-full py-2.5 bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:brightness-110 active:brightness-95 disabled:bg-emerald-850 rounded-xl text-xs font-black tracking-wider text-white uppercase transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className={`w-4 h-4 ${isCalculating ? 'animate-ping' : ''}`} />
          <span>{labels.trigger}</span>
        </button>

        {/* Visual Pipeline Result Output */}
        <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-850 relative overflow-hidden flex flex-col items-center shadow-3xs transition-colors duration-300">
          <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
            {labels.accOut}
          </span>
          
          <AnimatePresence mode="wait">
            {isCalculating ? (
              <motion.div 
                key="loading-calc"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-[10px] font-mono text-emerald-500/80 uppercase">{labels.calculating}</span>
              </motion.div>
            ) : (
              <motion.div 
                key="result-calc"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight leading-none mb-1">
                  {result}
                </div>
                {typeof result === 'number' && (
                  <span className="text-[11px] text-indigo-650 dark:text-[#818cf8] font-mono font-bold uppercase">
                    {labels.binary} : {toBinary(result)}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. MOTHERBOARD BUS DIAGRAM (h_motherboard)
// ============================================================================
function MotherboardBusDiagram({ language, isRTL }: { language: string; isRTL: boolean }) {
  const [selectedBus, setSelectedBus] = useState<'system' | 'pci' | 'sata'>('system');

  const busInfo: Record<string, Record<string, { t: string; p: string; speed: string }>> = {
    system: {
      ar: { t: "الناقل الأمامي السريع (Bus Système / FSB)", p: "رابط بروتوكول فائق السرعة يربط مباشرة قلب المعالج بالذاكرة العشوائية RAM لمعالجة مئات الجيغابايت بالثانية.", speed: "Fibre cuivre / ~0.1 Ns de latence" },
      fr: { t: "Le Bus Système (FSB / Bus CPU-RAM)", p: "C'est l'autoroute principale de données à ultra-haute vitesse. Elle relie directement le CPU et les mémoires vives pour échanger les lignes de code en cours de calcul.", speed: "Latence minimale | Bande passante maximale (bleue)" },
      en: { t: "System Bus (FSB / CPU-RAM Bus)", p: "This is the primary ultra-high-speed data highway. It connects the CPU directly to the RAM to exchange data and code lines seamlessly.", speed: "Minimal latency | Maximum bandwidth (Blue)" },
      es: { t: "Bus de Sistema (FSB / Bus CPU-RAM)", p: "Es la autopista principal de datos a velocidad ultraalta. Conecta directamente la CPU con la RAM para intercambiar datos de instrucciones.", speed: "Latencia mínima | Ancho de banda máximo (Azul)" },
      de: { t: "Systembus (FSB / CPU-RAM-Bus)", p: "Dies ist die primäre Ultra-Hochgeschwindigkeits-Datenautobahn. Sie verbindet die CPU direkt mit dem RAM für schnellen Code-Austausch.", speed: "Minimale Latenz | Maximale Bandbreite (Blau)" }
    },
    pci: {
      ar: { t: "ناقل التوسعة السريع (Bus PCI Express)", p: "أوتوستراد مخصص لتوسيع العتاد، يستخدم بشكل خاص لتوصيل طاقة كروت الشاشة GPU ومعالجة الرسوم الرسومية.", speed: "نطاقات متوازية x16 بنظام متقدم" },
      fr: { t: "Le Bus d’Extension (PCI Express)", p: "Une autoroute optimisée pour le transit graphique et d'extension. Elle transporte les modèles géométriques 3D vers le processeur graphique (GPU) externe.", speed: "Double liaison différentielle point-à-point" },
      en: { t: "PCI Express Expansion Bus (PCIe)", p: "An optimized highway for graphics and expansion hardware. It routes 3D geometry and assets to the dedicated Graphics Processing Unit (GPU).", speed: "Differential point-to-point dual link (Yellow)" },
      es: { t: "Bus de Expansión PCI Express (PCIe)", p: "Una autopista optimizada para gráficos y tarjetas de expansión. Envía modelos 3D y texturas hacia la GPU aceleradora.", speed: "Enlace dual diferencial punto a punto (Amarillo)" },
      de: { t: "Erweiterungsbus (PCI Express / PCIe)", p: "Ein optimierter Hochgeschwindigkeits-Bus für Grafikkarten und Erweiterungen. Er überträgt Grafikdaten an die GPU.", speed: "Differentielle Punkt-zu-Punkt-Doppelverbindung (Gelb)" }
    },
    sata: {
      ar: { t: "ناقل معطيات القرص الصلب (Bus SATA / Liaison Stockage)", p: "يقوم بنقل وتوصيل البيانات المغناطيسية أو السيلكونية المخزنة باسم طويل من القرص الصلب أو SSD.", speed: "مستوى سرعة متوسط 6 Gbit/s" },
      fr: { t: "Le Bus SATA (Disque Dur / Stockage)", p: "Un câble série plat transmettant des blocs de données permanents du SSD vers la carte mère pour précharger les programmes au démarrage.", speed: "Transit modéré par blocs séquentiels" },
      en: { t: "SATA Bus (Storage / Hard Drive Link)", p: "A serial interface connecting solid-state-drives (SSD) or hard drives. It copies permanent software assets into RAM upon program launch.", speed: "Moderate block-sequential transit (Cyan)" },
      es: { t: "Bus SATA (Almacenamiento / Disco Duro)", p: "Una interfaz serie que conecta el SSD o disco duro con la placa base para cargar archivos permanentes al iniciar programas.", speed: "Tránsito secuencial moderado por bloques (Cian)" },
      de: { t: "SATA-Bus (Speicher- / Festplattenverbindung)", p: "Speichertransferverbindung für Festplatten und Solid-State-Drives (SSDs). Sie kopiert Programme beim Start in den RAM.", speed: "Moderater blocksequentieller Transfer (Cyan)" }
    }
  };

  const MB_DIAGRAM_STRINGS: Record<string, any> = {
    ar: {
      title: "مخطط النواقل ومسارات اللوحة الأم",
      sub: "شرايين التوصيل التي تنبض بحركة البيانات",
      systemTitle: "الناقل الأمامي (أزرق)",
      systemSub: "رابط سريع بين المعالج والرام",
      pciTitle: "ناقل PCI Express (أصفر)",
      pciSub: "لتوصيل كروت الشاشة والتوسعة",
      sataTitle: "ناقل SATA للتخزين (cyan)",
      sataSub: "رابط الأقراص الصلبة والـ SSD",
      specHeader: "مواصفات الناقل الفعال:"
    },
    fr: {
      title: "Plan des Autoroutes de Données de la Carte Mère",
      sub: "L'orchestration des connexions de circuits imprimés",
      systemTitle: "Autoroute Système (Bleu)",
      systemSub: "CPU ⟷ RAM link high-speed",
      pciTitle: "Bus PCI Express (Jaune)",
      pciSub: "Liaison Graphique & Extensions",
      sataTitle: "Bus SATA Stockage (Cyan)",
      sataSub: "SSD ⟷ Chipset Storage line",
      specHeader: "Spécifications de la ligne :"
    },
    en: {
      title: "Motherboard Data Highway Layout",
      sub: "Physical copper traces that pump electric pulses",
      systemTitle: "System Bus (Blue)",
      systemSub: "CPU ⟷ RAM high-speed link",
      pciTitle: "PCI Express Bus (Yellow)",
      pciSub: "Graphics Card & Expansion Link",
      sataTitle: "SATA Storage Bus (Cyan)",
      sataSub: "SSD ⟷ Chipset Storage line",
      specHeader: "Selected Line Specifications:"
    },
    es: {
      title: "Diseño de la Autopista de Datos de la Placa Base",
      sub: "Orquestación de conexiones en el circuito impreso",
      systemTitle: "Bus del Sistema (Azul)",
      systemSub: "CPU ⟷ RAM enlace de alta velocidad",
      pciTitle: "Bus PCI Express (Amarillo)",
      pciSub: "Enlace gráfico y expansiones",
      sataTitle: "Bus SATA Almacenamiento (Cian)",
      sataSub: "SSD ⟷ Chipset línea de almacenamiento",
      specHeader: "Especificaciones de la línea:"
    },
    de: {
      title: "Datenautobahn-Layout der Hauptplatine",
      sub: "Die Orchestrierung der Leiterplattenverbindungen",
      systemTitle: "System-Bus (Blau)",
      systemSub: "CPU ⟷ RAM Hochgeschwindigkeitslink",
      pciTitle: "PCI Express Bus (Gelb)",
      pciSub: "Grafik- und Erweiterungsbus",
      sataTitle: "SATA Speicher-Bus (Cyan)",
      sataSub: "SSD ⟷ Chipset Speicherlinie",
      specHeader: "Linienspezifikationen:"
    }
  };

  const labels = MB_DIAGRAM_STRINGS[language] || MB_DIAGRAM_STRINGS.en || MB_DIAGRAM_STRINGS.fr;

  const getTranslatedBus = () => {
    const activeInfo = busInfo[selectedBus] || busInfo.system;
    return activeInfo[language] || activeInfo.en || activeInfo.fr;
  };

  const currentBus = getTranslatedBus();

  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-850 rounded-3xl p-5 md:p-6 text-slate-800 dark:text-white transition-colors duration-300 space-y-4 shadow-sm">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h5 className="text-sm font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-500 animate-pulse animate-duration-[2000ms]" />
            <span>{labels.title}</span>
          </h5>
          <p className="text-[10px] text-slate-555 dark:text-slate-400 font-mono mt-0.5">
            {labels.sub}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Visual Map Render (Col-span-7) */}
        <div className="md:col-span-7 relative bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center p-3 transition-colors duration-300">
          <svg className="w-full h-full" viewBox="0 0 320 240">
            {/* Motherboard circuit lines design */}
            <g opacity="0.18" stroke="#10b981" strokeWidth="1" fill="none">
              <path d="M 20 20 L 60 20 L 80 40 H 240 L 260 20 H 300" />
              <path d="M 20 220 L 60 220 L 80 200 H 240 L 260 220 H 300" />
              <circle cx="160" cy="120" r="80" strokeDasharray="3, 3" />
            </g>

            {/* Microchips Represented as visual blocks */}
            {/* CPU Socket Node */}
            <rect x="30" y="80" width="55" height="55" rx="6" className="fill-slate-100 dark:fill-slate-800 stroke-blue-500" strokeWidth="2" />
            <text x="57" y="112" className="fill-slate-500 dark:fill-slate-400" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CPU SOCKET</text>

            {/* RAM Slot Nodes */}
            <rect x="130" y="30" width="8" height="70" rx="2" className="fill-slate-100 dark:fill-slate-800 stroke-emerald-500" strokeWidth="2" />
            <line x1="134" y1="35" x2="134" y2="95" className="stroke-rose-500 opacity-40" strokeWidth="1" />
            <text x="144" y="68" className="fill-slate-500 dark:fill-slate-400" fontSize="7" fontWeight="bold" transform="rotate(90 144 68)" textAnchor="middle">RAM SLOTS</text>

            {/* Chipset Node */}
            <rect x="145" y="140" width="45" height="45" rx="6" className="fill-slate-100 dark:fill-slate-800 stroke-purple-500" strokeWidth="2" />
            <text x="167" y="166" className="fill-slate-500 dark:fill-slate-400" fontSize="7" fontWeight="bold" textAnchor="middle">CHIPSET</text>

            {/* PCI Socket Card Node */}
            <rect x="30" y="170" width="70" height="10" rx="2" className="fill-slate-100 dark:fill-slate-800 stroke-amber-500" strokeWidth="1.5" />
            <text x="65" y="177" className="fill-slate-500 dark:fill-slate-300" fontSize="6" fontWeight="bold" textAnchor="middle">PCI EXPRESS x16</text>

            {/* SATA Slot Port */}
            <rect x="250" y="145" width="20" height="25" rx="3" className="fill-slate-100 dark:fill-slate-800 stroke-cyan-500" strokeWidth="1.5" />
            <text x="260" y="160" className="fill-slate-500 dark:fill-slate-400" fontSize="6" fontWeight="bold" textAnchor="middle">SATA</text>

            {/* DYNAMIC BUS PATHWAYS COLOR & ANIMATIONS */}
            {/* CPU to RAM System Bus pathway */}
            <path d="M 85 100 H 115 V 65 H 130" fill="none" 
              stroke={selectedBus === 'system' ? '#2563eb' : '#94a3b8'} 
              strokeWidth={selectedBus === 'system' ? '3.5' : '1.5'} 
              className="transition-all duration-300"
            />
            {selectedBus === 'system' && (
              <motion.path 
                d="M 85 100 H 115 V 65 H 130" 
                fill="none" 
                stroke="#60a5fa" 
                strokeWidth="2.5" 
                strokeDasharray="6, 6"
                initial={{ strokeDashoffset: 20 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              />
            )}

            {/* Chipset to PCIe Bus Pathway */}
            <path d="M 65 160 V 145 H 145" fill="none" 
              stroke={selectedBus === 'pci' ? '#d97706' : '#94a3b8'} 
              strokeWidth={selectedBus === 'pci' ? '3' : '1.5'} 
              className="transition-all duration-300"
            />
            {selectedBus === 'pci' && (
              <motion.path 
                d="M 65 160 V 145 H 145" 
                fill="none" 
                stroke="#fbbf24" 
                strokeWidth="2.5" 
                strokeDasharray="5, 5"
                initial={{ strokeDashoffset: -15 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            )}

            {/* Chipset to SATA HDD Connection */}
            <path d="M 190 162 H 250" fill="none" 
              stroke={selectedBus === 'sata' ? '#06b6d4' : '#94a3b8'} 
              strokeWidth={selectedBus === 'sata' ? '3' : '1.5'} 
              className="transition-all duration-300"
            />
            {selectedBus === 'sata' && (
              <motion.path 
                d="M 190 162 H 250" 
                fill="none" 
                stroke="#67e8f9" 
                strokeWidth="2.5" 
                strokeDasharray="6, 6"
                initial={{ strokeDashoffset: 15 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            )}
          </svg>
        </div>

        {/* Info detail (Col-span-5) */}
        <div className="md:col-span-5 flex flex-col gap-3 justify-between">
          <div className="flex flex-col gap-2.5">
            <button 
              onClick={() => setSelectedBus('system')}
              className={`p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                selectedBus === 'system' 
                  ? 'bg-gradient-to-r from-blue-500/15 via-indigo-500/5 to-transparent dark:from-blue-500/25 dark:via-indigo-500/5 dark:to-transparent border-blue-500 text-blue-800 dark:text-blue-200 shadow-3xs' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
              }`}
            >
              <span className="font-extrabold text-[11px] uppercase block mb-0.5">{labels.systemTitle}</span>
              <span className="text-[10px] pr-1 leading-normal block opacity-[0.85]">{labels.systemSub}</span>
            </button>

            <button 
              onClick={() => setSelectedBus('pci')}
              className={`p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                selectedBus === 'pci' 
                  ? 'bg-gradient-to-r from-amber-500/15 via-orange-500/5 to-transparent dark:from-amber-500/25 dark:via-orange-500/5 dark:to-transparent border-amber-500/80 text-amber-800 dark:text-amber-200 shadow-3xs' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
              }`}
            >
              <span className="font-extrabold text-[11px] uppercase block mb-0.5">{labels.pciTitle}</span>
              <span className="text-[10px] pr-1 leading-normal block opacity-[0.85]">{labels.pciSub}</span>
            </button>

            <button 
              onClick={() => setSelectedBus('sata')}
              className={`p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                selectedBus === 'sata' 
                  ? 'bg-gradient-to-r from-cyan-500/15 via-teal-500/5 to-transparent dark:from-cyan-500/25 dark:via-teal-500/5 dark:to-transparent border-cyan-500 text-cyan-800 dark:text-cyan-200 shadow-3xs' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
              }`}
            >
              <span className="font-extrabold text-[11px] uppercase block mb-0.5 font-bold">{labels.sataTitle}</span>
              <span className="text-[10px] pr-1 leading-normal block opacity-[0.85]">{labels.sataSub}</span>
            </button>
          </div>

          <div className="bg-white dark:bg-slate-950 p-4 border border-slate-200 dark:border-slate-850 rounded-2xl space-y-2 transition-colors duration-300">
            <h6 className="text-[11px] font-bold text-slate-900 dark:text-slate-100 uppercase font-sans border-b border-slate-100 dark:border-slate-855 pb-2 flex items-center justify-between">
              <span>{labels.specHeader}</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-black">{selectedBus.toUpperCase()} BUS</span>
            </h6>
            <p className="text-[11px] text-slate-705 dark:text-[#cbd5e1] leading-relaxed font-semibold">{currentBus.p}</p>
            <div className="text-[9px] font-mono text-slate-400 dark:text-[#cbd5e1]/60 pt-0.5">{currentBus.speed}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5. CACHE HIERARCHY VISUALIZER (h_cache)
// ============================================================================
function CacheHierarchyVisualizer({ language, isRTL }: { language: string; isRTL: boolean }) {
  const [activeTier, setActiveTier] = useState<number>(0);

  const CACHE_STRINGS: Record<string, any> = {
    ar: {
      title: "هرم سرعة وأبعاد الطبقات للذاكرة المخبئية",
      sub: "التدرج من الأقرب والأسرع للأكبر سعة والأبعد بالمعالج",
      speedTitle: "سرعة التبادل المباشرة:",
      cores: "CPU CORES",
      cores_cap: "8 أنوية بسرعة 4.0 جيجاهرتز",
      cores_speed: "فوري (0 نانوثانية تأخير)",
      cores_desc: "تسترد أنوية الحساب البيانات بالسرعة الأصلية لساعتها الداخلية بدون أي انتظار.",
      
      l1: "ذاكرة مخبئية L1 (سريعة جداً)",
      l1_cap: "32 كيلوبايت لكل نواة",
      l1_speed: "فورية للغاية (1 نانوثانية تأخير)",
      l1_desc: "ذاكرة مجهرية مدمجة مباشرة في النواة. وهي تحتفظ بتعليمات التشغيل الآنية.",
      
      l2: "ذاكرة مخبئية L2 (متوسطة)",
      l2_cap: "512 كيلوبايت لكل نواة",
      l2_speed: "سريعة جداً (4 نانوثانية تأخير)",
      l2_desc: "ستخزن هذه الذاكرة البيانات المسبقة المتوقع معالجتها لاحقاً لتغذية L1 فوراً.",
      
      l3: "ذاكرة مخبئية L3 (مشتركة)",
      l3_cap: "16 ميجابايت إجمالاً",
      l3_speed: "سريعة (12 نانوثانية تأخير)",
      l3_desc: "خزان تبادل مشترك بين الأنوية يمنع الذهاب المتكرر إلى ذاكرة الرام الخارجية.",
      
      ram: "الذاكرة العشوائية الـ RAM",
      ram_cap: "16 جيجابايت تخزين مؤقت",
      ram_speed: "معتدلة (60 نانوثانية تأخير)",
      ram_desc: "الذاكرة الرئيسية البعيدة جغرافياً عن المعالج تتطلب الانتقال الكهروكيميائي عبر اللوحة."
    },
    fr: {
      title: "Pyramide Temporelle de la Mémoire Cache",
      sub: "Plus proche = plus rapide. Plus loin = plus d'espace.",
      speedTitle: "VITESSE D'ÉCHANGE DIRECTE:",
      cores: "CPU CORES",
      cores_cap: "8 Cœurs @ 4.0 GHz",
      cores_speed: "IMMÉDIAT (0 ns delay)",
      cores_desc: "Le cœur de calcul récupère les données à la vitesse native de son horloge interne sans aucune attente.",
      
      l1: "CACHE L1 (Ultra-Proche)",
      l1_cap: "32 Ko par cœur",
      l1_speed: "EXTRÊME (1 ns delay)",
      l1_desc: "Mémoire microscopique soudée directement dans le cœur. Garde l'instruction exécutée exactement à cette micro-seconde.",
      
      l2: "CACHE L2 (Intermédiaire)",
      l2_cap: "512 Ko par cœur",
      l2_speed: "TRÈS RAPIDE (4 ns delay)",
      l2_desc: "Un peu plus grand, stocke les prochaines données prédites pour alimenter le cache L1 à flux tendu.",
      
      l3: "CACHE L3 (Partagé)",
      l3_cap: "16 Mo global",
      l3_speed: "RAPIDE (12 ns delay)",
      l3_desc: "Grand entrepôt d'échanges partagé entre tous les cœurs pour éviter d'aller chercher trop souvent dehors en RAM.",
      
      ram: "RAM (Mémoire Principale)",
      ram_cap: "16 Go de stockage",
      ram_speed: "MODÉRÉ (60 ns delay)",
      ram_desc: "La mémoire principale lointaine extérieure au processeur. Nécessite de traverser la carte mère physiquement."
    },
    en: {
      title: "Time Pyramid of Cache Memory",
      sub: "Closer = faster. Further = larger capacity.",
      speedTitle: "DIRECT EXCHANGE SPEED:",
      cores: "CPU CORES",
      cores_cap: "8 Cores @ 4.0 GHz",
      cores_speed: "IMMEDIATE (0 ns delay)",
      cores_desc: "The processing core retrieves data at the native speed of its internal clock cycles.",
      
      l1: "L1 CACHE (Ultra-Close)",
      l1_cap: "32 KB per core",
      l1_speed: "EXTREME (1 ns delay)",
      l1_desc: "Microscopic memory soldered directly on the core to hold immediate instruction operands.",
      
      l2: "L2 CACHE (Intermediate)",
      l2_cap: "512 KB per core",
      l2_speed: "VERY FAST (4 ns delay)",
      l2_desc: "Slightly larger storage holding dynamic instruction feeds predicted for L1 caching.",
      
      l3: "L3 CACHE (Shared)",
      l3_cap: "16 MB global",
      l3_speed: "FAST (12 ns delay)",
      l3_desc: "A larger on-chip silo shared by all cores to prevent constant external fetching into physical RAM.",
      
      ram: "RAM (Main Memory)",
      ram_cap: "16 GB volatile style",
      ram_speed: "MODERATE (60 ns delay)",
      ram_desc: "The main physical memory. Demands crossing electronic tracks of the motherboard."
    },
    es: {
      title: "Pirámide Temporal de la Memoria Caché",
      sub: "Más cerca = más rápido. Más lejos = más capacidad.",
      speedTitle: "VELOCIDAD DE INTERCAMBIO DIRECTO:",
      cores: "NÚCLEOS CPU",
      cores_cap: "8 Núcleos @ 4.0 GHz",
      cores_speed: "INMEDIATO (0 ns delay)",
      cores_desc: "El núcleo recupera los datos a la velocidad nativa de su reloj de cálculo.",
      
      l1: "CACHÉ L1 (Ultra-Cercano)",
      l1_cap: "32 KB por núcleo",
      l1_speed: "EXTREMO (1 ns delay)",
      l1_desc: "Memoria microscópica integrada en el propio núcleo. Almacena instrucciones en ejecución súper inmediatas.",
      
      l2: "CACHÉ L2 (Intermedio)",
      l2_cap: "512 KB por núcleo",
      l2_speed: "MUY RÁPIDO (4 ns delay)",
      l2_desc: "Algo más grande. Almacena las próximas líneas de datos predichas para alimentar la caché L1.",
      
      l3: "CACHÉ L3 (Compartido)",
      l3_cap: "16 MB global",
      l3_speed: "RÁPIDO (12 ns delay)",
      l3_desc: "Gran almacén unificado compartido entre todos los núcleos para evitar búsquedas constantes en RAM.",
      
      ram: "RAM (Memoria Principal)",
      ram_cap: "16 GB volátil",
      ram_speed: "MODERADO (60 ns delay)",
      ram_desc: "La memoria física principal externa. Requiere el tránsito físico por las pistas del ordenador."
    },
    de: {
      title: "Zeitpyramide des Cache-Speichers",
      sub: "Näher = schneller. Weiter weg = mehr Kapazität.",
      speedTitle: "DIREKTE TRANSFERGESCHWINDIGKEIT:",
      cores: "CPU-KERNE",
      cores_cap: "8 Kerne @ 4.0 GHz",
      cores_speed: "SOFORT (0 ns Latenz)",
      cores_desc: "Der Kern liest Werte direkt mit der nativen Taktgeschwindigkeit seiner internen Register.",
      
      l1: "L1 CACHE (Ultra-Nah)",
      l1_cap: "32 KB pro Kern",
      l1_speed: "EXTREM SCHNELL (1 ns)",
      l1_desc: "Mikroskopisch kleiner Speicher direkt auf dem Kern für aktuelle Berechnungsanweisungen.",
      
      l2: "L2 CACHE (Zwischenspeicher)",
      l2_cap: "512 KB pro Kern",
      l2_speed: "SEHR SCHNELL (4 ns)",
      l2_desc: "Etwas größerer Speicher zur Zwischenspeicherung der spekulativ vorhergesagten Datenströme.",
      
      l3: "L3 CACHE (Gemeinsam genutzt)",
      l3_cap: "16 MB gesamt",
      l3_speed: "SCHNELL (12 ns)",
      l3_desc: "Ein großer On-Chip-Speicher, den sich alle CPU-Kerne teilen, um RAM-Abfragen zu minimieren.",
      
      ram: "RAM (Arbeitsspeicher)",
      ram_cap: "16 GB flüchtig",
      ram_speed: "MODERAT (60 ns)",
      ram_desc: "Der physische externe Hauptspeicher. Erfordert Signale über die Kupferbahnen der Hauptplatine."
    }
  };

  const labels = CACHE_STRINGS[language] || CACHE_STRINGS.en || CACHE_STRINGS.fr;

  const cacheTiers = [
    {
      lvl: labels.cores,
      capacity: labels.cores_cap,
      speed: labels.cores_speed,
      desc: labels.cores_desc,
      pct: 100,
      size: "text-rose-500 bg-rose-500",
      bgClass: "bg-gradient-to-r from-rose-500/15 via-rose-500/5 to-transparent dark:from-rose-500/25 dark:via-rose-500/5 dark:to-transparent border-rose-500 text-rose-955 dark:text-rose-200"
    },
    {
      lvl: labels.l1,
      capacity: labels.l1_cap,
      speed: labels.l1_speed,
      desc: labels.l1_desc,
      pct: 94,
      size: "text-amber-500 bg-amber-500",
      bgClass: "bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent dark:from-amber-500/25 dark:via-amber-500/5 dark:to-transparent border-amber-500 text-amber-955 dark:text-amber-200"
    },
    {
      lvl: labels.l2,
      capacity: labels.l2_cap,
      speed: labels.l2_speed,
      desc: labels.l2_desc,
      pct: 82,
      size: "text-yellow-500 bg-yellow-500",
      bgClass: "bg-gradient-to-r from-yellow-500/15 via-yellow-500/5 to-transparent dark:from-yellow-500/25 dark:via-yellow-500/5 dark:to-transparent border-yellow-500 text-yellow-955 dark:text-yellow-200"
    },
    {
      lvl: labels.l3,
      capacity: labels.l3_cap,
      speed: labels.l3_speed,
      desc: labels.l3_desc,
      pct: 60,
      size: "text-[#10b981] bg-[#10b981]",
      bgClass: "bg-gradient-to-r from-emerald-500/15 via-emerald-500/5 to-transparent dark:from-emerald-500/25 dark:via-emerald-500/5 dark:to-transparent border-emerald-500 text-emerald-955 dark:text-emerald-200"
    },
    {
      lvl: labels.ram,
      capacity: labels.ram_cap,
      speed: labels.ram_speed,
      desc: labels.ram_desc,
      pct: 15,
      size: "text-[#3b82f6] bg-[#3b82f6]",
      bgClass: "bg-gradient-to-r from-blue-500/15 via-blue-500/5 to-transparent dark:from-blue-500/25 dark:via-blue-500/5 dark:to-transparent border-blue-500 text-blue-955 dark:text-blue-200"
    }
  ];

  const currentTier = cacheTiers[activeTier];

  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-850 rounded-3xl p-5 md:p-6 text-slate-800 dark:text-white transition-colors duration-300 space-y-4 shadow-sm">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h5 className="text-sm font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
            <Database className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span>{labels.title}</span>
          </h5>
          <p className="text-[10px] text-slate-555 dark:text-slate-400 font-mono mt-0.5">
            {labels.sub}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch bg-slate-50/60 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-205 border-slate-200 dark:border-slate-850 transition-colors duration-300">
        {/* Pyramid stacks (col-span-6) */}
        <div className="md:col-span-6 flex flex-col gap-2.5 justify-center">
          {cacheTiers.map((tier, idx) => {
            const isSel = idx === activeTier;
            return (
              <button
                key={idx}
                onClick={() => setActiveTier(idx)}
                className={`py-2.5 px-4 text-left transition-all duration-300 border rounded-xl flex items-center justify-between cursor-pointer ${
                  isSel ? tier.bgClass : 'bg-white dark:bg-slate-950/45 border-slate-200 dark:border-slate-855 hover:bg-slate-100 dark:hover:bg-slate-900/50 opacity-70'
                }`}
                style={{ width: `${60 + (idx * 10)}%`, alignSelf: 'center' }}
              >
                <div className="flex flex-col">
                  <span className={`text-[10px] font-black tracking-wider ${isSel ? 'text-slate-900 dark:text-[#f8fafc]' : 'text-slate-500 dark:text-slate-400'}`}>
                    {tier.lvl}
                  </span>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 opacity-80 mt-0.5">{tier.capacity}</span>
                </div>
                <span className={`text-[9px] font-mono leading-none font-bold uppercase rounded-md px-1.5 py-0.5 ${
                  idx === 0 ? 'bg-rose-500 text-white' : idx === 1 ? 'bg-amber-600 text-white' : idx === 4 ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                }`}>
                  {idx === 0 ? 'CORES' : `L${idx}`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected block spec (col-span-6) */}
        <div className="md:col-span-6 flex flex-col justify-between bg-white dark:bg-slate-950 p-4 border border-slate-200 dark:border-slate-850 rounded-2xl shadow-3xs transition-colors duration-300">
          <div className="space-y-3">
            <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-850 pb-2.5">
              <div>
                <h6 className="text-[12px] font-bold text-slate-850 dark:text-slate-100 tracking-tight">{currentTier.lvl}</h6>
                <span className="text-[10px] text-emerald-600 dark:text-[#22c55e] font-mono font-black leading-none mt-1 block">{currentTier.capacity}</span>
              </div>
              <span className="text-[9px] font-sans font-extrabold uppercase bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded text-rose-600 dark:text-rose-400">
                {currentTier.speed}
              </span>
            </div>

            <p className="text-[11px] text-slate-705 dark:text-[#cbd5e1] leading-relaxed font-semibold">
              {currentTier.desc}
            </p>
          </div>

          <div className="space-y-1 pt-3 border-t border-slate-100 dark:border-slate-855 mt-3">
            <div className="flex justify-between text-[9px] text-slate-500 dark:text-[#cbd5e1]/45 font-mono font-bold">
              <span>{labels.speedTitle}</span>
              <span className="font-black text-emerald-600 dark:text-[#22c55e]">{currentTier.pct}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${currentTier.size}`}
                initial={{ width: '0%' }}
                animate={{ width: `${currentTier.pct}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 6. RAM VOLATILITY SIMULATOR (h_ram)
// ============================================================================
function RamVolatilitySimulator({ language, isRTL }: { language: string; isRTL: boolean }) {
  const [powerOn, setPowerOn] = useState<boolean>(true);

  const RAM_STRINGS: Record<string, any> = {
    ar: {
      title: "محاكي ومبيّن الذاكرة المتطايرة لـ RAM",
      desc: "تعتمد الذاكرة العشوائية على الشحنة لحفظ المعطيات. اقطع الكهرباء لمشاهدة التفريغ اللحظي.",
      state: "حالة تغذية الكهرباء الفعالة للوحة:",
      cell: "خلية معالجة العناوين",
      app: "البيانات المسجلة بالخلية",
      binary: "نبض الكود الثنائي",
      switchOn: "الكهرباء موصلة (5 فولت)",
      switchOff: "قطع التيار (0 فولت)",
      volaAlert: "تنبيه: تم زوال ومسح كافة الخلايا نتيجة انعدام التيار الكهربائي!",
      empty: "[ فارغة ]",
      kernel: "نواة نظام التشغيل OS Kernel",
      chrome: "متصفح الويب (علامة تبويب)",
      word: "مسودة وثيقة غير محفوظة",
      graphics: "مخزن إطار الصور الرسومية"
    },
    fr: {
      title: "Simulateur de Volatilité Électrique de la RAM",
      desc: "La RAM a besoin de courant pour aligner les électrons. Coupez l'alimentation pour voir la décharge complète.",
      state: "Tension d'Alimentation ATX :",
      cell: "Cellule d'Adresse",
      app: "Donnée / Module actif",
      binary: "Code binaire retenu",
      switchOn: "ALIMENTATION ACTIVE (5V)",
      switchOff: "COUPER L'ALIMENTATION (0V)",
      volaAlert: "Alerte: Toutes les charges capacitives se sont vidées instantanément (DRAM éteinte).",
      empty: "[ VIDE ]",
      kernel: "Noyau du Système d'Exploitation",
      chrome: "Navigateur Web (Onglet)",
      word: "Brouillon de document Word",
      graphics: "Buffer de texture graphique GPU"
    },
    en: {
      title: "RAM Electric Volatility Simulator",
      desc: "RAM relies on persistent electric charges to hold bits. Cut the power to see absolute instant data loss.",
      state: "ATX Supply Voltage Line:",
      cell: "Memory Address Cell",
      app: "Active Data / Software Module",
      binary: "Retained Binary Code",
      switchOn: "ACTIVATE POWER (5V)",
      switchOff: "CUT POWER SOURCE (0V)",
      volaAlert: "Alert: All capacitive cells fell to ground state instantly (DRAM cleared).",
      empty: "[ EMPTY ]",
      kernel: "System OS Kernel (Core OS)",
      chrome: "Web Browser (Active Tab)",
      word: "Unsaved Document Draft",
      graphics: "Graphic GPU Framebuffer Texture"
    },
    es: {
      title: "Simulador de Volatilidad Eléctrica de la RAM",
      desc: "La RAM depende de cargas eléctricas para almacenar bits. Corte la energía para ver la pérdida total.",
      state: "Tensión de Alimentación ATX:",
      cell: "Celda de Dirección",
      app: "Dato / Módulo Activo",
      binary: "Código Binario Retenido",
      switchOn: "ACTIVAR ENERGÍA (5V)",
      switchOff: "CORTAR ENERGÍA (0V)",
      volaAlert: "Alerta: Todas las cargas capacitivas se drenaron instantáneamente (DRAM vaciada).",
      empty: "[ VACÍO ]",
      kernel: "Núcleo del Sistema Operativo",
      chrome: "Navegador Web (Pestaña activa)",
      word: "Borrador de Documento Word",
      graphics: "Textura Gráfica GPU Framebuffer"
    },
    de: {
      title: "Arbeitsspeicher-Flüchtigkeitssimulator",
      desc: "Der RAM benötigt elektrische Ladungen, um Bits zu halten. Schalten Sie den Strom ab, um den Verlust zu sehen.",
      state: "ATX-Versorgungsspannung:",
      cell: "Speicheradresse",
      app: "Aktive Daten / Modul",
      binary: "Gespeicherter Binärcode",
      switchOn: "STROM ANSCHALTEN (5V)",
      switchOff: "STROM ABSCHALTEN (0V)",
      volaAlert: "Warnung: Alle kapazitiven Ladungen wurden sofort entladen (DRAM gelöscht).",
      empty: "[ LEER ]",
      kernel: "Betriebssystem-Kernel (Core OS)",
      chrome: "Webbrowser (Aktiver Tab)",
      word: "Ungespeicherter Word-Entwurf",
      graphics: "Grafik-GPU-Framebuffer-Textur"
    }
  };

  const labels = RAM_STRINGS[language] || RAM_STRINGS.en || RAM_STRINGS.fr;

  const initialRows = [
    { cell: "0x01A", app: labels.kernel, code: "10110011", secure: true },
    { cell: "0x0B4", app: labels.chrome, code: "01001111", secure: false },
    { cell: "0x122", app: labels.word, code: "11100011", secure: false },
    { cell: "0x2C8", app: labels.graphics, code: "00110101", secure: false }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-850 rounded-3xl p-5 md:p-6 text-slate-800 dark:text-white transition-colors duration-300 space-y-4 shadow-sm">
      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-850">
        <div>
          <h5 className="text-sm font-black text-rose-600 dark:text-rose-450 dark:text-rose-400 uppercase tracking-widest flex items-center gap-1.5 animate-pulse animate-duration-[2000ms]">
            <Power className="w-4 h-4 text-emerald-500" />
            <span>{labels.title}</span>
          </h5>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">{labels.desc}</p>
        </div>
      </div>

      <div className="bg-slate-50/50 dark:bg-slate-900/40 p-4 border border-slate-200 dark:border-slate-850 rounded-2xl space-y-4 transition-colors duration-300">
        {/* Toggle Switch Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-850 gap-3 shadow-3xs transition-colors duration-300">
          <span className="text-[11px] font-mono font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className={`w-2.5 h-2.5 rounded-full ${powerOn ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
            <span>{labels.state} {powerOn ? '5V (ON)' : '0V (OFF)'}</span>
          </span>

          <button
            onClick={() => setPowerOn(!powerOn)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-103 shadow-xs ${
              powerOn 
                ? 'bg-gradient-to-r from-red-500 via-rose-600 to-pink-650 hover:brightness-110 active:brightness-95 text-white' 
                : 'bg-gradient-to-r from-emerald-500 via-teal-650 to-emerald-600 hover:brightness-110 active:brightness-95 text-white contrast-125'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{powerOn ? labels.switchOff : labels.switchOn}</span>
          </button>
        </div>

        {/* Display grids representing cells */}
        <div className="space-y-2">
          <div className="grid grid-cols-12 text-[9px] uppercase font-mono tracking-widest text-slate-500 dark:text-slate-400 border-b border-slate-150 dark:border-slate-850 pb-1.5 px-2 mb-2 font-black">
            <div className="col-span-3">{labels.cell}</div>
            <div className="col-span-5">{labels.app}</div>
            <div className="col-span-4 text-right">{labels.binary}</div>
          </div>

          {initialRows.map((row, index) => {
            return (
              <div 
                key={index} 
                className={`grid grid-cols-12 items-center text-[11px] font-mono tracking-tight py-2.5 px-3 rounded-xl border transition-all duration-500 ${
                  powerOn 
                    ? 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-200 shadow-3xs' 
                    : 'bg-white/40 dark:bg-slate-950/20 border-slate-100 dark:border-slate-950 opacity-20 text-slate-400 dark:text-slate-550'
                }`}
              >
                <div className="col-span-3 font-bold text-rose-600 dark:text-rose-455 dark:text-rose-400">{row.cell}</div>
                <div className="col-span-12 md:col-span-5 font-sans font-bold text-[12px] truncate">
                  {powerOn ? row.app : labels.empty}
                </div>
                <div className="col-span-12 md:col-span-4 text-right">
                  <span className={`px-2 py-0.5 rounded font-bold text-xs ${powerOn ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500/30'}`}>
                    {powerOn ? row.code : '00000000'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Evaporation notification banner if off */}
        <AnimatePresence>
          {!powerOn && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-350 p-4 rounded-xl flex items-center justify-center text-center text-[10px] md:text-xs font-semibold leading-relaxed font-sans mt-2"
            >
              🚀 {labels.volaAlert}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============================================================================
// 7. PSU VOLTAGE CONVERTOR (h_psu)
// ============================================================================
function PsuVoltageConvertor({ language, isRTL }: { language: string; isRTL: boolean }) {
  const [isSieving, setIsSieving] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSieving(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const PSU_STRINGS: Record<string, any> = {
    ar: {
      title: "منظم ومحوّل الجهود الكهربائية لعلبة التغذية",
      sub: "مراقبة آلية تحويل التيار المتناوب الخطر لتيارات مستمرة ملائمة للمعالج",
      acIn: "تيار متردد (AC IN)",
      acDesc: "230V غير مستقر خطر",
      dcOut: "جهود مستمرة مخرجة (DC OUT)",
      psuCard: "علبة المحولات والتحكم بالتيار (PSU)",
      secNote: "تأمين وحماية المعالج من صدمات فرق التيار الخارجي",
      railGpu: "خط المعالج الرسومي:",
      railRam: "خط الذاكرة العشوائية:",
      railCpu: "خط نواة المعالج CPU:"
    },
    fr: {
      title: "Régulateur de Tensions Électriques du Bloc PSU",
      sub: "Du 230 Volt alternatif dangereux vers les fragiles micro-circuits de silicium",
      acIn: "Courant Secteur (AC IN)",
      acDesc: "230V Alternatif Brut",
      dcOut: "Tensions de Sortie Régulées (DC OUT)",
      psuCard: "Transformateur, Bobine & Circuit de Lissage",
      secNote: "Stabilité absolue exigée par les CPU d'aujourd'hui",
      railGpu: "Rail GPU / HDD :",
      railRam: "Logique RAM :",
      railCpu: "Micro-Cœur CPU :"
    },
    en: {
      title: "PSU Voltage Regulator & Power Converter",
      sub: "From dangerous 230V AC grid power to low-voltage DC rails for computer silicon",
      acIn: "Mains Power (AC IN)",
      acDesc: "230V Oscillating AC",
      dcOut: "Regulated Direct Current (DC OUT)",
      psuCard: "Transforming & Filtering Stage",
      secNote: "Flawless stability demanded by modern processor cores",
      railGpu: "GPU / HDD Rail:",
      railRam: "RAM Logic Feed:",
      railCpu: "CPU Micro-Core:"
    },
    es: {
      title: "Regulador de Voltaje y Convertidor PSU",
      sub: "De corriente alterna peligrosa de 230V a rieles limpios de corriente continua",
      acIn: "Corriente de Red (AC IN)",
      acDesc: "230V Alterna Oscilante",
      dcOut: "Corrientes Directas Reguladas (DC OUT)",
      psuCard: "Etapa de Transformación y Filtro",
      secNote: "Estabilidad absoluta exigida por los núcleos del procesador",
      railGpu: "Carril GPU / Disco:",
      railRam: "Alimentación RAM:",
      railCpu: "Micro-Núcleo CPU:"
    },
    de: {
      title: "PSU-Spannungsregler & Stromkonverter",
      sub: "Von gefährlicher 230V Wechselspannung zu sicheren Gleichspannungsleitungen",
      acIn: "Netzstrom (AC IN)",
      acDesc: "230V Rohwechselspannung",
      dcOut: "Geregelte Gleichspannung (DC OUT)",
      psuCard: "Transformator- & Filterstufe",
      secNote: "Absolute Spannungsstabilität für moderne CPU-Kerne",
      railGpu: "GPU / HDD-Schiene:",
      railRam: "RAM-Datenlogik:",
      railCpu: "CPU-Mikrokern:"
    }
  };

  const labels = PSU_STRINGS[language] || PSU_STRINGS.en || PSU_STRINGS.fr;

  return (
    <div className="bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-850 rounded-3xl p-5 md:p-6 text-slate-800 dark:text-white transition-colors duration-300 space-y-4 shadow-sm">
      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-850">
        <div>
          <h5 className="text-sm font-black text-rose-600 dark:text-rose-455 dark:text-rose-400 uppercase tracking-widest flex items-center gap-1.5 animate-bounce">
            <Zap className="w-4 h-4 text-rose-500" />
            <span>{labels.title}</span>
          </h5>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">{labels.sub}</p>
        </div>
      </div>

      <div className="bg-slate-50/50 dark:bg-slate-900/40 p-4 border border-slate-200 dark:border-slate-850 rounded-2xl space-y-5 transition-colors duration-300">
        {/* Connection pipeline schematic block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Wall outlet Side (Col3) */}
          <div className="md:col-span-3 bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 p-4 rounded-xl text-center space-y-1 transition-colors duration-300 shadow-3xs">
            <span className="text-[9px] font-mono text-red-650 dark:text-red-400 uppercase font-black tracking-wider block">{labels.acIn}</span>
            <div className="text-sm md:text-md font-bold text-red-900 dark:text-slate-100">{labels.acDesc}</div>
            
            {/* Pulsing high energy AC Sinus Curve Wave */}
            <div className="h-6 w-full relative overflow-hidden flex items-center justify-center opacity-70">
              <svg className="w-full h-full" viewBox="0 0 100 20">
                <path d="M 0 10 Q 25 2, 50 10 T 100 10" fill="none" stroke="#ef4444" strokeWidth="2.5" className="animate-pulse" />
              </svg>
            </div>
          </div>

          {/* Center PSU transformer box (Col5) */}
          <div className="md:col-span-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-4 rounded-xl text-center space-y-2 relative overflow-hidden transition-colors duration-300 shadow-3xs">
            <div className="absolute inset-0 bg-radial-grid opacity-5 pointer-events-none" />
            <span className="text-[10px] font-black text-rose-605 dark:text-rose-400 tracking-wider font-mono block">{labels.psuCard}</span>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-normal font-medium">{labels.secNote}</p>
            
            {/* Animating converter gears */}
            <div className="flex justify-center gap-2 pt-1">
              <Settings className="w-5 h-5 text-indigo-500 animate-spin" style={{ animationDuration: '4s' }} />
              <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
            </div>
          </div>

          {/* Safe Output Rails (Col4) */}
          <div className="md:col-span-4 bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-xl space-y-2 transition-colors duration-300 shadow-3xs">
            <span className="text-[9px] font-mono text-emerald-700 dark:text-emerald-400 uppercase font-black tracking-wider block text-center mb-1">
              {labels.dcOut}
            </span>

            {/* Stable straight DC voltage rails */}
            <div className="space-y-1.5 font-mono text-[10px] font-bold">
              <div className="flex justify-between items-center text-emerald-650 dark:text-[#22c55e]">
                <span>{labels.railGpu}</span>
                <span className="bg-slate-100 dark:bg-[#111827] text-[9px] text-slate-800 dark:text-white px-1.5 py-0.5 rounded border border-slate-205 dark:border-slate-800 shadow-3xs">+12.0 V</span>
              </div>
              <div className="flex justify-between items-center text-purple-700 dark:text-[#a855f7]">
                <span>{labels.railRam}</span>
                <span className="bg-slate-100 dark:bg-[#111827] text-[9px] text-slate-800 dark:text-white px-1.5 py-0.5 rounded border border-slate-205 dark:border-slate-800 shadow-3xs">+1.5 V</span>
              </div>
              <div className="flex justify-between items-center text-cyan-600 dark:text-cyan-400">
                <span>{labels.railCpu}</span>
                <span className="bg-slate-100 dark:bg-[#111827] text-[9px] text-slate-800 dark:text-white px-1.5 py-0.5 rounded border border-slate-205 dark:border-slate-800 shadow-3xs">+1.2 V</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
