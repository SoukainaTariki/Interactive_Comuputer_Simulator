import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const CACHE_STRINGS: Record<string, any> = {
  ar: {
    title: "التسلسل الهرمي للذاكرة المخبئية (السرعات وزمن التأخير)",
    sub: "تقريب البيانات المادية للمعلومات | الجذع المشترك",
    tagline: "CACHE LATENCY",
    speedArrow: "🚀 تناقص السرعة (زمن تأخير ns)",
    sizeArrow: "📦 تزايد السعة (كيلوبايت ➔ جيجابايت)",
    legend: "🧠 كلما اقتربت البيانات من نواة المعالجة، زادت سرعتها!",
    hoverLegend: "🖱️ مرر فوق أي من مستويات هرم التخزين لاستعراض معلومات السعة والسرعة.",
    l0Title: "بلورات المعالجة (CPU Cores)",
    l0Cap: "سجلات ميكروية محدودة",
    l0Speed: "0.1 إلى 0.3 نانو ثانية (فوري)",
    l0Desc: "أنوية التنفيذ التي تدور بأقصى سرعة ممكنة وتحتاج للتعليمات والبيانات فورا دون تأخير يذكر.",
    l1Title: "الذاكرة المخبئية الأولى L1 (Level 1)",
    l1Cap: "32 إلى 64 كيلوبايت لكل نواة",
    l1Speed: "0.5 إلى 1 نانو ثانية (فائقة للغاية)",
    l1Desc: "خلايا تخزين مجهرية منقوشة على السيليكون داخل النواة مباشرة لخدمة المعالج فورا.",
    l2Title: "الذاكرة المخبئية الثانية L2 (Level 2)",
    l2Cap: "256 كيلوبايت إلى 1 ميجابايت لكل نواة",
    l2Speed: "2 إلى 4 نانو ثانية (سريعة جداً)",
    l2Desc: "مخزن مؤقت متوسط السعة يغذي الذاكرة L1 بالبيانات مستبقاً حركات المعالجة.",
    l3Title: "الذاكرة المخبئية المشتركة L3 (Level 3)",
    l3Cap: "4 إلى 64 ميجابايت مشتركة",
    l3Speed: "8 إلى 15 نانو ثانية (سريعة)",
    l3Desc: "خزان تخزيني واسع مشترك على شريحة السيليكون يجنب المعالج اضطرار القراءة من الذاكرة الخارجية RAM.",
    l4Title: "ذاكرة النظام العشوائية (RAM)",
    l4Cap: "8 إلى 64 جيجابايت (سعة متوسطة)",
    l4Speed: "50 إلى 80 نانو ثانية (معتدلة السرعة)",
    l4Desc: "طاولة العمل الأساسية للحاسوب والمستقرة خارج المعالج. رحبة للغاية ولكنها أبطأ نسبيا في النقل.",
    sizeText: "السعة:",
    latencyText: "زمن التأخير:"
  },
  fr: {
    title: "Hiérarchie de la Mémoire Cache (Puces & Latences)",
    sub: "Rapprochement Physique de l’Information | Tronc Commun",
    tagline: "CACHE LATENCY",
    speedArrow: "🚀 Vitesse décroissante (ns)",
    sizeArrow: "📦 Taille croissante (Ko ➔ Go)",
    legend: "🧠 Plus on est proche du cœur, plus c'est rapide !",
    hoverLegend: "🖱️ Survolez n'importe quelle couche de la pyramide d'études pour analyser sa capacité de fichiers et sa vitesse de transfert.",
    l0Title: "Cœurs de Calcul (CPU Cores)",
    l0Cap: "Quelques registres",
    l0Speed: "0.1 à 0.3 ns (Instantané)",
    l0Desc: "Les unités d'exécution qui tournent à plein régime et ont besoin d'instructions sous la main sans attendre une micro-seconde.",
    l1Title: "Cache Primaire L1 (Level 1)",
    l1Cap: "32 Ko à 64 Ko par cœur",
    l1Speed: "0.5 à 1 ns (Extrême)",
    l1Desc: "Cellules mémoires gravées au mm² près sur chaque cœur du CPU. C'est l'étagère personnelle immédiate des cœurs.",
    l2Title: "Cache Intermédiaire L2 (Level 2)",
    l2Cap: "256 Ko à 1 Mo par cœur",
    l2Speed: "2 à 4 ns (Très rapide)",
    l2Desc: "Tampon de taille intermédiaire. Il approvisionne la mémoire L1 de manière continue en devançant les calculs.",
    l3Title: "Cache Partagé L3 (Level 3)",
    l3Cap: "4 Mo à 64 Mo partagés",
    l3Speed: "8 à 15 ns (Rapide)",
    l3Desc: "Une grande armoire de mémoire commune placée sur le silicium pour éviter de devoir demander des données à la RAM extérieure.",
    l4Title: "Mémoire Vive Externe (RAM)",
    l4Cap: "8 Go à 64 Go (Massif)",
    l4Speed: "50 à 80 ns (Relativement modéré)",
    l4Desc: "La table de travail globale du PC, installée à l'extérieur de la puce. Très grande capacité, mais plus lente d'accès.",
    sizeText: "Taille:",
    latencyText: "Latence d'accès:"
  },
  en: {
    title: "Cache Memory Hierarchy (Capacities & Latencies)",
    sub: "Data Placement Proximity to Core Logic | Computer Science",
    tagline: "CACHE LATENCY",
    speedArrow: "🚀 Speed decreasing (higher ns)",
    sizeArrow: "📦 Storage increasing (KB ➔ GB)",
    legend: "🧠 The closer the data is to computed core logic, the faster it routes!",
    hoverLegend: "🖱️ Hover over any layer of the storage pyramid to inspect its capacities and transfer latencies.",
    l0Title: "CPU Computing Cores (ALU / CU)",
    l0Cap: "A few silicon registers",
    l0Speed: "0.1 to 0.3 ns (Instant)",
    l0Desc: "The hardware compute units that execute instructions millions of times per second and require low latencies.",
    l1Title: "Primary L1 Cache (Level 1)",
    l1Cap: "32 KB to 64 KB per core",
    l1Speed: "0.5 to 1 ns (Extreme Speed)",
    l1Desc: "Micro-memory cells etched physically inside each CPU core. It acts as the closest direct shelf for processing.",
    l2Title: "Intermediate L2 Cache (Level 2)",
    l2Cap: "256 KB to 1 MB per core",
    l2Speed: "2 to 4 ns (Very Fast)",
    l2Desc: "Double sized memory lane buffering instructions beforehand so that L1 cells remain continuously stocked.",
    l3Title: "Shared L3 Cache (Level 3)",
    l3Cap: "4 MB to 64 MB Shared",
    l3Speed: "8 to 15 ns (Fast)",
    l3Desc: "An on-chip communal storage locker that prevents the processor from querying slow off-chip RAM.",
    l4Title: "External RAM memory",
    l4Cap: "8 GB to 64 GB (Massive)",
    l4Speed: "50 to 80 ns (Moderate Speed)",
    l4Desc: "The global workspace desk of the system, installed off-chip on the motherboard. Huge volume but limited speeds.",
    sizeText: "Size:",
    latencyText: "Access Latency:"
  },
  es: {
    title: "Jerarquía de Memoria Caché (Tamaño y Latencias)",
    sub: "Proximidad Física de los Datos al Núcleo | Arquitectura Central",
    tagline: "CACHE LATENCY",
    speedArrow: "🚀 Velocidad decreciente (ns)",
    sizeArrow: "📦 Capacidad creciente (KB ➔ GB)",
    legend: "🧠 ¡Cuanto más cerca del núcleo Procesador, más rápido corre!",
    hoverLegend: "🖱️ Pase el cursor sobre los niveles de la pirámide de memoria para inspeccionar latencias de intercambio.",
    l0Title: "Núcleos de Cómputo (CPU Cores)",
    l0Cap: "Unos pocos registros",
    l0Speed: "0.1 a 0.3 ns (Instántaneo)",
    l0Desc: "Unidades físicas de ejecución que trabajan a máxima velocidad y precisan instrucciones sin tiempos de espera.",
    l1Title: "Caché Primaria L1 (Nivel 1)",
    l1Cap: "32 KB a 64 KB por núcleo",
    l1Speed: "0.5 a 1 ns (Extrema velocidad)",
    l1Desc: "Celdas de retención grabadas directamente al lado de la ALU de cada núcleo. El estante personal del núcleo.",
    l2Title: "Caché Intermedia L2 (Nivel 2)",
    l2Cap: "256 KB a 1 MB por núcleo",
    l2Speed: "2 a 4 ns (Muy rápido)",
    l2Desc: "Búfer de tamaño intermedio. Almacena ráfagas anticipadas para reabastecer las celdas de L1 continuamente.",
    l3Title: "Caché Compartida L3 (Nivel 3)",
    l3Cap: "4 MB a 64 MB compartidos",
    l3Speed: "8 a 15 ns (Rápido)",
    l3Desc: "Gran armario común en el silicio para evitar llamados externos al bus externo de la RAM.",
    l4Title: "Memoria de Sistema RAM",
    l4Cap: "8 GB a 64 GB (Grande)",
    l4Speed: "50 a 80 ns (Moderado)",
    l4Desc: "El escritorio global de procesos del ordenador, ubicado fuera del procesador físico.",
    sizeText: "Tamaño:",
    latencyText: "Latencia de acceso:"
  },
  de: {
    title: "Cache-Speicherhierarchie (Kapazitäten & Latenzen)",
    sub: "Physische Nähe der Informationen zum Rechenkern | Kernarchitektur",
    tagline: "CACHE LATENCY",
    speedArrow: "🚀 Abnehmende Geschwindigkeit (ns)",
    sizeArrow: "📦 Zunehmende Kapazität (KB ➔ GB)",
    legend: "🧠 Je näher Daten am Rechenkern liegen, desto schneller erfolgt der Zugriff!",
    hoverLegend: "🖱️ Bewegen Sie den Mauszeiger über eine Pyramidenschicht, um Kapazität und Latenzzeit zu analysieren.",
    l0Title: "Prozessorkerne (CPU Cores)",
    l0Cap: "Einige wenige Register",
    l0Speed: "0.1 bis 0.3 ns (Sofort)",
    l0Desc: "Die eigentlichen physischen Rechenwerke, die am schnellsten arbeiten und Befehle verzögerungsfrei benötigen.",
    l1Title: "Primärer L1-Cache (Ebene 1)",
    l1Cap: "32 KB bis 64 KB pro Kern",
    l1Speed: "0.5 bis 1 ns (Extrem schnell)",
    l1Desc: "Direkt im Silizium-Rechenkern integrierte Speicherzellen. Das unmittelbare Arbeitsablagefach des CPU-Kerns.",
    l2Title: "Sekundärer L2-Cache (Ebene 2)",
    l2Cap: "256 KB bis 1 MB pro Kern",
    l2Speed: "2 bis 4 ns (Sehr schnell)",
    l2Desc: "Zwischenspeicher zur vorausschauenden Bevorratung und fortlaufenden Belieferung des primären L1-Caches.",
    l3Title: "Gemeinsamer L3-Cache (Ebene 3)",
    l3Cap: "4 MB bis 64 MB geteilt",
    l3Speed: "8 bis 15 ns (Schnell)",
    l3Desc: "Ein großer On-Chip-Sammelspeicher für alle Rechenkerne zur Vermeidung langsamer Mainboard-Busspeicher-Abfragen an den RAM.",
    l4Title: "Arbeitsspeicher (Main RAM)",
    l4Cap: "8 GB bis 64 GB (Massiv)",
    l4Speed: "50 bis 80 ns (Moderat)",
    l4Desc: "Der universelle Arbeitstisch des gesamten Computers, der sich physisch außerhalb des Prozessors befindet.",
    sizeText: "Kapazität:",
    latencyText: "Zugriffslatenz:"
  }
};

export default function CacheHierarchyDiagram() {
  const { language } = useLanguage();
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  const strings = CACHE_STRINGS[language] || CACHE_STRINGS.en || CACHE_STRINGS.fr;

  const levels = [
    {
      depth: 0,
      title: strings.l0Title,
      capacity: strings.l0Cap,
      speed: strings.l0Speed,
      desc: strings.l0Desc,
      color: "bg-rose-500",
      textColor: "text-rose-500"
    },
    {
      depth: 1,
      title: strings.l1Title,
      capacity: strings.l1Cap,
      speed: strings.l1Speed,
      desc: strings.l1Desc,
      color: "bg-blue-600",
      textColor: "text-blue-600"
    },
    {
      depth: 2,
      title: strings.l2Title,
      capacity: strings.l2Cap,
      speed: strings.l2Speed,
      desc: strings.l2Desc,
      color: "bg-cyan-500",
      textColor: "text-cyan-500"
    },
    {
      depth: 3,
      title: strings.l3Title,
      capacity: strings.l3Cap,
      speed: strings.l3Speed,
      desc: strings.l3Desc,
      color: "bg-indigo-500",
      textColor: "text-indigo-500"
    },
    {
      depth: 4,
      title: strings.l4Title,
      capacity: strings.l4Cap,
      speed: strings.l4Speed,
      desc: strings.l4Desc,
      color: "bg-slate-500",
      textColor: "text-slate-600"
    }
  ];

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
        <div className="text-[10px] bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-mono font-bold px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-950">
          {strings.tagline}
        </div>
      </div>

      {/* SVG Pyramid Funnel layout */}
      <div className="relative w-full aspect-[4/3] bg-slate-50/50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center justify-center p-2">
        <svg viewBox="0 0 600 450" className="w-full h-auto select-none font-sans">
          
          {/* SPEED LIMIT ARROW ON LEFT */}
          <g>
            <path d="M 50,55 V 365" fill="none" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-down-red)" style={{ markerEnd: 'url(#arrow-down-red)' }} />
            <text x="35" y="210" textAnchor="middle" transform="rotate(-90 35 210)" className="font-mono font-extrabold text-[9px] fill-red-600 tracking-widest uppercase">
              {strings.speedArrow}
            </text>
          </g>

          {/* STORAGE SIZE ARROW ON RIGHT */}
          <g>
            <path d="M 550,55 V 365" fill="none" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrow-green)" />
            <text x="565" y="210" textAnchor="middle" transform="rotate(90 565 210)" className="font-mono font-extrabold text-[9px] fill-emerald-600 tracking-widest uppercase">
              {strings.sizeArrow}
            </text>
          </g>

          {/* LEVEL 0: CPU CORES (At the center-top) */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredLevel(0)}
            onMouseLeave={() => setHoveredLevel(null)}
          >
            <polygon
              points="240,40 360,40 380,85 220,85"
              fill={hoveredLevel === 0 ? '#ffe4e6' : '#fff1f2'}
              stroke={hoveredLevel === 0 ? '#f43f5e' : '#fda4af'}
              strokeWidth="2"
              className="dark:fill-rose-950/20 dark:stroke-rose-800"
            />
            <text x="300" y="65" textAnchor="middle" className="font-sans font-black text-[11px] fill-rose-900 dark:fill-rose-300 uppercase tracking-wider">
              CPU CORES
            </text>
            <text x="300" y="102" textAnchor="middle" className="font-mono text-[8px] fill-rose-500 dark:fill-rose-450 uppercase font-black">
              (0.2ns - Microscope)
            </text>
          </g>

          {/* LEVEL 1: CACHE L1 COMPOSANT (Deeper funnel segment) */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredLevel(1)}
            onMouseLeave={() => setHoveredLevel(null)}
          >
            <polygon
              points="215,110 385,110 410,160 190,160"
              fill={hoveredLevel === 1 ? '#dbeafe' : '#eff6ff'}
              stroke={hoveredLevel === 1 ? '#3b82f6' : '#93c5fd'}
              strokeWidth="2.5"
              className="dark:fill-blue-950/20 dark:stroke-blue-800"
            />
            <text x="300" y="135" textAnchor="middle" className="font-sans font-black text-[11px] fill-blue-900 dark:fill-blue-300 uppercase tracking-wider">
              🔹 CACHE L1 (Level 1)
            </text>
            <text x="300" y="152" textAnchor="middle" className="font-mono text-[8px] fill-blue-500 font-black">
              {strings.l1Cap} | 0.8 ns
            </text>
          </g>

          {/* LEVEL 2: CACHE L2 COMPOSANT */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredLevel(2)}
            onMouseLeave={() => setHoveredLevel(null)}
          >
            <polygon
              points="185,185 415,185 440,240 160,240"
              fill={hoveredLevel === 2 ? '#e0f2fe' : '#f0f9ff'}
              stroke={hoveredLevel === 2 ? '#0ea5e9' : '#7dd3fc'}
              strokeWidth="2.5"
              className="dark:fill-sky-950/20 dark:stroke-sky-800"
            />
            <text x="300" y="210" textAnchor="middle" className="font-sans font-black text-[11px] fill-sky-900 dark:fill-sky-300 uppercase tracking-widest">
              🔹 CACHE L2 (Level 2)
            </text>
            <text x="300" y="228" textAnchor="middle" className="font-mono text-[8px] fill-sky-600 font-extrabold">
              {strings.l2Cap} | 3 ns
            </text>
          </g>

          {/* LEVEL 3: CACHE L3 COMPOSANT */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredLevel(3)}
            onMouseLeave={() => setHoveredLevel(null)}
          >
            <polygon
              points="155,265 445,265 470,325 130,325"
              fill={hoveredLevel === 3 ? '#f3e8ff' : '#faf5ff'}
              stroke={hoveredLevel === 3 ? '#9061f9' : '#c084fc'}
              strokeWidth="2.5"
              className="dark:fill-purple-950/20 dark:stroke-purple-800"
            />
            <text x="300" y="292" textAnchor="middle" className="font-sans font-black text-[11px] fill-purple-900 dark:fill-purple-300 uppercase tracking-widest">
              🔹 CACHE L3 (Level 3)
            </text>
            <text x="300" y="310" textAnchor="middle" className="font-mono text-[8px] fill-purple-500 font-black">
              {strings.l3Cap} | 12 ns
            </text>
          </g>

          {/* LEVEL 4: SYSTEM RAM MODULE */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredLevel(4)}
            onMouseLeave={() => setHoveredLevel(null)}
          >
            <rect
              x="80"
              y="350"
              width="440"
              height="65"
              rx="12"
              fill={hoveredLevel === 4 ? '#f1f5f9' : '#f8fafc'}
              stroke={hoveredLevel === 4 ? '#64748b' : '#cbd5e1'}
              strokeWidth="3"
              className="dark:fill-slate-900 dark:stroke-slate-800"
            />
            <text x="300" y="380" textAnchor="middle" className="font-sans font-black text-[12px] fill-slate-850 dark:fill-slate-200 uppercase tracking-widest">
              🏁 RAM SYSTEM
            </text>
            <text x="300" y="398" textAnchor="middle" className="font-mono text-[8.5px] fill-slate-500 font-extrabold">
              {strings.l4Cap} | 60 ns
            </text>
          </g>
        </svg>

        {/* Legend */}
        <div className="absolute top-2 left-2 flex items-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs border border-slate-100 dark:border-slate-850 rounded-lg px-2.5 py-1 text-[9px] font-mono text-slate-500 shadow-3xs">
          <span>{strings.legend}</span>
        </div>
      </div>

      {/* Dynamic text description block */}
      <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 rounded-xl min-h-[90px] flex flex-col justify-center animate-fade-in">
        {hoveredLevel !== null ? (
          <div className="space-y-1 animate-fade-in">
            <h5 className={`text-[11px] font-black uppercase tracking-wider flex items-center ${levels[hoveredLevel].textColor}`}>
              ⚡ {levels[hoveredLevel].title}
            </h5>
            <p className="text-[11px] text-slate-600 dark:text-slate-350 font-normal leading-relaxed">
              {levels[hoveredLevel].desc}
            </p>
            <div className="grid grid-cols-2 text-[9.5px] font-mono font-medium pt-1 text-slate-450">
              <span>📊 {strings.sizeText} <strong className="text-slate-700 dark:text-slate-300">{levels[hoveredLevel].capacity}</strong></span>
              <span>🏎️ {strings.latencyText} <strong className="text-slate-700 dark:text-slate-300">{levels[hoveredLevel].speed}</strong></span>
            </div>
          </div>
        ) : (
          <div className="text-center py-2 animate-fade-in">
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              {strings.hoverLegend}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
