import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const CPU_ARCH_STRINGS: Record<string, any> = {
  ar: {
    title: "البنية الداخلية للمعالج (CPU)",
    titleEn: "Internal CPU Architecture",
    tagline: "ناقلات الربط وحركة المرور الداخلية | الجذع المشترك",
    ucTitle: "وحدة التحكم (CU)",
    ucDesc: "توجه وتنسق حركة المكونات: تفك تشفير الأوامر، وترسل إشارات تحكم متناهية، وتضبط توافق التوقيت عبر نبضات الساعة.",
    aluTitle: "وحدة الحساب والمنطق (ALU)",
    aluDesc: "المحاسب الداخلي: تجري العمليات الرياضية الثنائية (+، -) والمقارنات المنطقية الحقيقية (بوابات AND، OR).",
    regTitle: "سجلات المعالجة فائقة السرعة",
    regDesc: "خلايا ذاكرة ميكروية فورية الوصول: تتضمن سجل الأوامر الحالي (IR)، وعداد البرنامج (PC)، والمركم (Accumulator).",
    busTitle: "المسارات الناقلة الداخلية",
    busDesc: "حافلات نحاسية فائقة السرعة تتدفق فيها النبضات الكهربائية لنقل العبارات الثنائية وإشارات التحكم.",
    cycleText: "1. إحضار ➔ 2. تفكيك ➔ 3. تنفيذ",
    decoder: "مفكك التشفير",
    clock: "منسق الساعة",
    accumulator: "المركم",
    programCounter: "عداد البرنامج",
    instructionReg: "سجل التعليمات",
    internalBus: "الناقل الداخلي للمركز",
    legend: "🖱️ مرر فوق المكونات لمتابعة عملها بالتفصيل خطوة بخطوة"
  },
  fr: {
    title: "Structure Interne du Processeur (CPU)",
    titleEn: "Internal CPU Architecture",
    tagline: "Tronc Commun Informatique",
    ucTitle: "Unité de Contrôle (UC)",
    ucDesc: "Orchestre le système : décode les instructions, envoie les ordres de contrôle et synchronise le rythme matériel grâce à l'horloge systématique.",
    aluTitle: "Unité Arithmétique et Logique (UAL)",
    aluDesc: "La calculatrice interne : effectue les additions binaires, soustractions et opérations logiques de comparaison (VRAI/FAUX).",
    regTitle: "Bloc des Registres",
    regDesc: "Mémoire ultra-rapide à accès direct : stocke l'instruction en cours (IR), le pointeur de la prochaine instruction (PC) et l'accumulateur.",
    busTitle: "Liaisons de Bus Internes",
    busDesc: "Voies électriques ultra-rapides en cuivre véhiculant instantanément les données binaires et signaux de contrôle entre l'UC, l'UAL et les registres.",
    cycleText: "1. Chargement (Fetch) ➔ 2. Décodage (Decode) ➔ 3. Exécution (Execute)",
    decoder: "Décodeur",
    clock: "Séquenceur",
    accumulator: "Accumulateur",
    programCounter: "Compteur Ordinal",
    instructionReg: "Reg. Instruction",
    internalBus: "Bus Interne / CPU BUS",
    legend: "🖱️ Survolez un des blocs du processeur pour inspecter son rôle et son fonctionnement pas à pas."
  },
  en: {
    title: "Internal CPU Architecture",
    titleEn: "Core Processor Architecture",
    tagline: "Internal Bus Highways and Flow | Computer Science",
    ucTitle: "Control Unit (CU)",
    ucDesc: "Orchestrates the system: decodes instructions, sends control signals and syncs hardware clock cycles.",
    aluTitle: "Arithmetic & Logic Unit (ALU)",
    aluDesc: "The internal calculator: performs binary math (+, -) and logical boolean comparisons (AND, OR, NOT).",
    regTitle: "Registers Group Block",
    regDesc: "Ultra-fast direct-access memory: stores current instruction (IR), program counter (PC), and immediate result (Accumulator).",
    busTitle: "Internal Bus Highways",
    busDesc: "Ultra-fast electrical copper paths driving binary values and instructions between the CU, ALU and Registers.",
    cycleText: "1. Fetch ➔ 2. Decode ➔ 3. Execute",
    decoder: "Decoder",
    clock: "Sequencer / Clock",
    accumulator: "Accumulator",
    programCounter: "Program Counter (PC)",
    instructionReg: "Instruction Reg (IR)",
    internalBus: "Internal Bus / CPU BUS",
    legend: "🖱️ Hover over any CPU component block to inspect its dynamic function step by step."
  },
  es: {
    title: "Estructura Interno del Procesador (CPU)",
    titleEn: "Internal CPU Architecture",
    tagline: "Autopistas de Buses Internos | Arquitectura Central",
    ucTitle: "Unidad de Control (UC)",
    ucDesc: "Orquesta el sistema entero: decodifica instrucciones, despacha señales de comando y sincroniza el reloj del hardware.",
    aluTitle: "Unidad Aritmética y Lógica (ALU)",
    aluDesc: "La calculadora interna: procesa aritmética binaria estándar (+, -) y operaciones lógicas booleanas (AND, OR).",
    regTitle: "Bloque de Registros",
    regDesc: "Celdas de almacenamiento de altísima velocidad: mantiene la instrucción en curso (IR), el contador de programa (PC) y el acumulador.",
    busTitle: "Vías de Bus Interno",
    busDesc: "Líneas de cobre que transportan datos binarios e impulsos lógicos de control entre la UC, la ALU y los registros.",
    cycleText: "1. Búsqueda ➔ 2. Decodificación ➔ 3. Ejecución",
    decoder: "Decodificador",
    clock: "Reloj / Secuenciador",
    accumulator: "Acumulador",
    programCounter: "Contador de Programa",
    instructionReg: "Reg. de Instrucción",
    internalBus: "Bus Interno / CPU BUS",
    legend: "🖱️ Pase el cursor sobre uno de los bloques para inspeccionar su función detallada paso a paso."
  },
  de: {
    title: "Interne Prozessorarchitektur (CPU)",
    titleEn: "Internal CPU Architecture",
    tagline: "Interne Datenbusse und Befehlszyklen | Informatik",
    ucTitle: "Steuerwerk (CU / UC)",
    ucDesc: "Koordinierte Steuerung: Dekodiert geladene Programmbefehle, steuert die Rechenwerke und synchronisiert Hardwarezyklen über einen Systemtakt.",
    aluTitle: "Rechenwerk (ALU)",
    aluDesc: "Das interne Rechenzentrum: Führt mathematische Berechnungen (+, -) und logische bitweise Vergleiche (UND, ODER) durch.",
    regTitle: "Registersatz (DRAM-Zellen)",
    regDesc: "Superschneller Direktzugriffspeicher: Speichert den aktuellen Befehl (IR), den nächsten Programmbefehl (PC) und Zwischenergebnisse (Akkumulator).",
    busTitle: "Interne Datenpfade (Busse)",
    busDesc: "Hauptelektrische Leitungen für den superschnellen internen Austausch binärer Daten- und Steuersignale zwischen Steuerwerk, ALU und Registern.",
    cycleText: "1. Holen ➔ 2. Dekodieren ➔ 3. Ausführen",
    decoder: "Dekodierer",
    clock: "Taktgeber (Sequenzer)",
    accumulator: "Akkumulator (ACC)",
    programCounter: "Befehlszähler (PC)",
    instructionReg: "Befehlsregister (IR)",
    internalBus: "Interner Bus / CPU BUS",
    legend: "🖱️ Bewegen Sie den Mauszeiger über einen CPU-Block, um dessen genaue Funktion Schritt für Schritt zu analysieren."
  }
};

export default function CpuArchitectureDiagram() {
  const { language } = useLanguage();
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const strings = CPU_ARCH_STRINGS[language] || CPU_ARCH_STRINGS.en || CPU_ARCH_STRINGS.fr;

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-indigo-950/40 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Title */}
      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
            {strings.title}
          </h4>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
            {strings.titleEn} | {strings.tagline}
          </p>
        </div>
        <div className="text-[10px] bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-mono font-medium px-2.5 py-1 rounded-full border border-rose-100 dark:border-rose-950">
          CPU CORE
        </div>
      </div>

      {/* Interactive SVG Diagram */}
      <div className="relative w-full aspect-[4/3] bg-slate-50/50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-850 rounded-xl overflow-hidden flex items-center justify-center p-2">
        <svg
          viewBox="0 0 600 450"
          className="w-full h-auto select-none font-sans"
          id="cpu-svg-diagram"
        >
          {/* BACKGROUND TRACES */}
          <g opacity="0.15">
            <path d="M 50,50 L 550,50 M 50,400 L 550,400 M 50,50 L 50,400 M 550,50 L 550,400" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" className="text-rose-400" />
            <circle cx="100" cy="100" r="4" className="text-rose-500 fill-current" />
            <circle cx="500" cy="100" r="4" className="text-rose-500 fill-current" />
            <circle cx="100" cy="350" r="4" className="text-rose-500 fill-current" />
            <circle cx="500" cy="350" r="4" className="text-rose-500 fill-current" />
          </g>

          {/* DEFINITIONS OF MARKERS */}
          <defs>
            <marker id="arrow-down-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#f43f5e" />
            </marker>
            <marker id="arrow-up-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#3b82f6" />
            </marker>
            <marker id="arrow-bi-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#8b5cf6" />
            </marker>
          </defs>

          {/* INTERNAL BUSES / HIGHLIGHT HIGHWAYS */}
          <g className="transition-all duration-300">
            {/* Bidirectional internal buses */}
            <path
              d="M 170,220 L 430,220"
              fill="none"
              stroke={hoveredPart === 'bus' ? '#8b5cf6' : '#d8b4fe'}
              strokeWidth={hoveredPart === 'bus' ? '8' : '6'}
              strokeLinejoin="round"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPart('bus')}
              onMouseLeave={() => setHoveredPart(null)}
            />
            {/* Control arrow traces */}
            <path d="M 230,170 V 220" fill="none" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow-down-red)" strokeDasharray="3,3" />
            <path d="M 370,170 V 220" fill="none" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow-up-blue)" />
            <path d="M 300,220 V 270" fill="none" stroke="#8b5cf6" strokeWidth="4" markerEnd="url(#arrow-bi-purple)" markerStart="url(#arrow-bi-purple)" />
          </g>

          {/* --- 1. UNITÉ DE CONTRÔLE (UC) --- */}
          <g
            className="cursor-pointer transition-all duration-300 transform"
            onMouseEnter={() => setHoveredPart('uc')}
            onMouseLeave={() => setHoveredPart(null)}
          >
            {/* Box container */}
            <rect
              x="100"
              y="70"
              width="260"
              height="100"
              rx="16"
              fill={hoveredPart === 'uc' ? '#ffe4e6' : '#fff1f2'}
              stroke={hoveredPart === 'uc' ? '#f43f5e' : '#fda4af'}
              strokeWidth="2.5"
              className="dark:fill-rose-950/20 dark:stroke-rose-800/80 transition-colors"
            />
            {/* Component header */}
            <text x="120" y="105" className="font-sans font-extrabold text-[12px] fill-rose-900 dark:fill-rose-300 uppercase tracking-wider">
              {strings.ucTitle}
            </text>
            <text x="120" y="122" className="font-mono text-[9px] fill-rose-500/80 dark:fill-rose-450 uppercase tracking-widest font-black">
              CU / Control Unit
            </text>
            
            {/* Small decorative circuit sub-elements inside */}
            <rect x="120" y="135" width="105" height="22" rx="4" fill="#ffffff" stroke="#fecdd3" strokeWidth="1" className="dark:fill-slate-900 dark:stroke-rose-950" />
            <text x="125" y="149" className="font-sans text-[8.5px] fill-rose-700 dark:fill-rose-400 font-bold">{strings.decoder}</text>

            <rect x="240" y="135" width="100" height="22" rx="4" fill="#ffffff" stroke="#fecdd3" strokeWidth="1" className="dark:fill-slate-900 dark:stroke-rose-950" />
            <text x="245" y="149" className="font-sans text-[8.5px] fill-rose-700 dark:fill-rose-400 font-bold">{strings.clock}</text>
          </g>

          {/* --- 2. UNITÉ ARITHMÉTIQUE ET LOGIQUE (UAL) --- */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredPart('alu')}
            onMouseLeave={() => setHoveredPart(null)}
          >
            {/* Box container shaped like custom ALU trapezoid (highly creative) */}
            <path
              d="M 380,70 L 490,70 L 510,130 L 460,130 L 440,110 L 420,130 L 370,130 Z"
              fill={hoveredPart === 'alu' ? '#dbeafe' : '#eff6ff'}
              stroke={hoveredPart === 'alu' ? '#3b82f6' : '#93c5fd'}
              strokeWidth="2.5"
              className="dark:fill-blue-950/25 dark:stroke-blue-800/80 transition-colors"
            />
            {/* Component header */}
            <text x="440" y="152" textAnchor="middle" className="font-sans font-extrabold text-[10px] fill-blue-900 dark:fill-blue-300 uppercase tracking-wider">
              {strings.aluTitle}
            </text>
            <text x="440" y="165" textAnchor="middle" className="font-mono text-[8px] fill-blue-500 dark:fill-blue-400 uppercase font-black">
              ALU (+ / - / AND)
            </text>

            {/* Micro calculator display graphic */}
            <line x1="410" y1="90" x2="430" y2="90" stroke="#3b82f6" strokeWidth="2" strokeDasharray="2,2" />
            <line x1="445" y1="90" x2="465" y2="90" stroke="#3b82f6" strokeWidth="2" />
            <text x="440" y="102" textAnchor="middle" className="font-mono text-[16px] fill-blue-500/40 dark:fill-blue-500/20 font-black">
              + − ÷ =
            </text>
          </g>

          {/* --- 3. BLOC DES REGISTRES --- */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredPart('reg')}
            onMouseLeave={() => setHoveredPart(null)}
          >
            {/* Box Container */}
            <rect
              x="120"
              y="270"
              width="360"
              height="110"
              rx="16"
              fill={hoveredPart === 'reg' ? '#faf5ff' : '#f3e8ff'}
              stroke={hoveredPart === 'reg' ? '#8b5cf6' : '#c084fc'}
              strokeWidth="2.5"
              className="dark:fill-purple-950/20 dark:stroke-purple-800/80 transition-colors"
            />
            <text x="140" y="295" className="font-sans font-extrabold text-[12px] fill-purple-900 dark:fill-purple-300 uppercase tracking-wider">
              {strings.regTitle}
            </text>
            <text x="140" y="310" className="font-mono text-[8px] fill-purple-500 dark:fill-purple-400 font-bold">
              High-Speed Storage Registers
            </text>

            {/* Core Registers inside */}
            {/* Registre 1: Accumulateur */}
            <rect x="140" y="325" width="100" height="40" rx="8" fill="#ffffff" stroke="#e9d5ff" strokeWidth="1.5" className="dark:fill-slate-900 dark:stroke-purple-950" />
            <text x="190" y="341" textAnchor="middle" className="font-sans font-black text-[10px] fill-purple-800 dark:fill-purple-350">ACC</text>
            <text x="190" y="354" textAnchor="middle" className="font-mono text-[7px] fill-slate-400 dark:fill-slate-500">{strings.accumulator}</text>

            {/* Registre 2: Program Counter */}
            <rect x="250" y="325" width="100" height="40" rx="8" fill="#ffffff" stroke="#e9d5ff" strokeWidth="1.5" className="dark:fill-slate-900 dark:stroke-purple-950" />
            <text x="300" y="341" textAnchor="middle" className="font-sans font-black text-[10px] fill-purple-800 dark:fill-purple-350">PC</text>
            <text x="300" y="354" textAnchor="middle" className="font-mono text-[7px] fill-slate-400 dark:fill-slate-500">{strings.programCounter}</text>

            {/* Registre 3: Instruction Register */}
            <rect x="360" y="325" width="100" height="40" rx="8" fill="#ffffff" stroke="#e9d5ff" strokeWidth="1.5" className="dark:fill-slate-900 dark:stroke-purple-950" />
            <text x="410" y="341" textAnchor="middle" className="font-sans font-black text-[10px] fill-purple-800 dark:fill-purple-350">IR</text>
            <text x="410" y="354" textAnchor="middle" className="font-mono text-[7px] fill-slate-400 dark:fill-slate-500">{strings.instructionReg}</text>
          </g>

          {/* CENTRAL BUS LABELS */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredPart('bus')}
            onMouseLeave={() => setHoveredPart(null)}
          >
            <rect x="190" y="209" width="220" height="22" rx="6" fill="#8b5cf6" className="dark:fill-purple-600 shadow-sm" />
            <text x="300" y="223" textAnchor="middle" className="font-mono text-[8px] fill-white font-extrabold tracking-widest uppercase">
              {strings.internalBus}
            </text>
          </g>
        </svg>

        {/* Dynamic floating instruction box helpful indicator */}
        <div className="absolute top-2 right-2 flex items-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs border border-slate-100 dark:border-slate-800 rounded-lg px-2 py-1 text-[9px] font-mono font-medium text-slate-500 dark:text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping mr-1.5"></span>
          <span>{strings.cycleText}</span>
        </div>
      </div>

      {/* Description Panel */}
      <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 rounded-xl min-h-[90px] flex flex-col justify-center">
        {hoveredPart === 'uc' && (
          <div className="space-y-1 animate-fade-in">
            <h5 className="text-[11px] font-black uppercase text-rose-500 font-sans tracking-wider flex items-center">
              ⚙️ {strings.ucTitle}
            </h5>
            <p className="text-[11px] text-slate-600 dark:text-slate-350 font-normal leading-relaxed">
              {strings.ucDesc}
            </p>
          </div>
        )}
        {hoveredPart === 'alu' && (
          <div className="space-y-1 animate-fade-in">
            <h5 className="text-[11px] font-black uppercase text-blue-500 font-sans tracking-wider flex items-center">
              🧮 {strings.aluTitle}
            </h5>
            <p className="text-[11px] text-slate-600 dark:text-slate-350 font-normal leading-relaxed">
              {strings.aluDesc}
            </p>
          </div>
        )}
        {hoveredPart === 'reg' && (
          <div className="space-y-1 animate-fade-in">
            <h5 className="text-[11px] font-black uppercase text-purple-500 font-sans tracking-wider flex items-center">
              💾 {strings.regTitle}
            </h5>
            <p className="text-[11px] text-slate-600 dark:text-slate-350 font-normal leading-relaxed">
              {strings.regDesc}
            </p>
          </div>
        )}
        {hoveredPart === 'bus' && (
          <div className="space-y-1 animate-fade-in">
            <h5 className="text-[11px] font-black uppercase text-purple-600 font-sans tracking-wider flex items-center">
              ⚡ {strings.busTitle}
            </h5>
            <p className="text-[11px] text-slate-600 dark:text-slate-350 font-normal leading-relaxed">
              {strings.busDesc}
            </p>
          </div>
        )}
        {!hoveredPart && (
          <div className="text-center py-2 animate-fade-in">
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              {strings.legend}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
