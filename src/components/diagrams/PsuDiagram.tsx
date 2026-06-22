import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const PSU_STRINGS: Record<string, any> = {
  ar: {
    title: "وحدة تزويد الطاقة (PSU): تحويل التيار وتوزيعه",
    sub: "تحويل التيار المتردد (230 فولت متردد) ➔ تيار مستمر منخفض ومستقر (تيارات مستمرة) | الجذع المشترك",
    tagline: "POWER RATIO",
    legend: "⚡ مرر فوق أي من ممرات الطاقة لمعاينة مستوى الجهد وتأثيره",
    outletLabel: "مقبس حائط 230 فولت",
    acLabel: "تيار متردد (~ 50Hz)",
    transformerLabel: "⚡ منظم هابط / محول",
    psuLabel: "مزود الطاقة (PSU)",
    cpuLabel: "المعالج (VCORE)",
    cpuVolts: "🕹️ 1.2V تيار مستمر",
    ramLabel: "ذاكرة RAM",
    ramVolts: "⚡ 1.25V تيار مستمر",
    ssdLabel: "وحدات تخزين SSD",
    ssdVolts: "📀 5.0V تيار مستمر",
    gpuLabel: "كرت الشاشة والمراوح",
    gpuVolts: "🏎️ 12.0V تيار مستمر",
    watermark: "⚡ مرر فوق أحد خطوط الفولتية لفحص التوزيع بالتفصيل وبشكل تفاعلي",
    hoverLegend: "🖱️ مرر فوق المنظم أو أحد خطوط الإمداد لمشاهدة كيف تنخفض الفولتية لحماية الدوائر الحساسة.",
    outletTitle: "مقبس الطاقة الجداري الرئيسي (230 فولت تيار متردد)",
    outletDesc: "تيار كهربائي جيبي متردد عالي التوتر يتذبذب بمعدل 50 هرتز. خطير جداً على الأجهزة الإلكترونية لو اتصل بها مباشرة.",
    psuTitle: "وحدة تغذية الطاقة (PSU - Power Supply Unit)",
    psuDesc: "تتألف من محولات خافضة للجهد، ومقومات ثنائية (ديودات)، ومكثفات تصفية لتبسيط وتخفيض توتر الموجات المترددة.",
    cpuTitle: "خط تغذية المعالج الرئيسي (1.2 فولت مستمر)",
    cpuDesc: "جهد فائق الانخفاض عالي الدقة موجه خصيصاً لتشغيل مليارات الترانزستورات النانومترية دون إتلافها.",
    ramTitle: "خط تغذية الذاكرة العشوائية RAM (1.2 فولت مستمر)",
    ramDesc: "جهد مستقر وثابت يسري بشكل مستمر للحفاظ على نبضات الحفظ في مكثفات خلايا DRAM.",
    ssdTitle: "خط تخزين أقراص الحالة الصلبة SSD (5.0 فولت مستمر)",
    ssdDesc: "الجهد القياسي المعتمد لتشغيل شرائح التحكم المجهرية وبوابات فلاش NAND الدائمة.",
    gpuTitle: "خط الجهد العالي للكرت والمروحة GPU & Fans (12.0 فولت)",
    gpuDesc: "خط الطاقة الأعلى المخصص للأجهزة المتعطشة للقدرة الكهربائية: كرت الشاشة الثقيل، مراوح التبريد، ومضخات السوائل."
  },
  fr: {
    title: "Bloc d’Alimentation : La Transformation du Courant",
    sub: "Transformation AC (230V Alternatif) ➔ DC (Tensions Continues) | Tronc Commun",
    tagline: "POWER RATIO",
    legend: "⚡ Survolez un rail ou la prise pour inspecter ses caractéristiques de tension",
    outletLabel: "PRISE 230V",
    acLabel: "AC (~ 50Hz)",
    transformerLabel: "⚡ TRANSFORMATEUR",
    psuLabel: "BLOC ALIM (PSU)",
    cpuLabel: "CPU (VCORE)",
    cpuVolts: "🕹️ 1.2V Continu",
    ramLabel: "MÉMOIRE RAM",
    ramVolts: "⚡ 1.25V Continu",
    ssdLabel: "STOCKAGE SSD",
    ssdVolts: "📀 5.0V Continu",
    gpuLabel: "GPU / FANS",
    gpuVolts: "🏎️ 12.0V Continu",
    watermark: "⚡ Survolez un rail ou la prise pour inspecter ses caractéristiques de tension",
    hoverLegend: "🖱️ Survolez un des blocs d'alimentation ou un des rails sortants pour analyser comment le voltage alternatif se convertit en énergie pure stable de silicium.",
    outletTitle: "Prise Électrique Secteur (230 Volts Alternatif)",
    outletDesc: "Courant sinusoïdal de haute voltabilité oscillant à 50Hz. Extrêmement dangereux pour l'informatique si branché directement.",
    psuTitle: "Le Bloc d’Alimentation (PSU - Power Supply Unit)",
    psuDesc: "Composé de bobinages, transformateurs et ponts de diodes redresseurs. Filtre les variations et aplatit les ondes de courant.",
    cpuTitle: "Rail CPU Vcore (1.2 Volts continu)",
    cpuDesc: "Un voltage ultra-faible mais d'un ampérage d'une extrême précision destiné à alimenter les nano-transistors du silicium du CPU.",
    ramTitle: "Rail Mémoire RAM (1.2 Volts continu)",
    ramDesc: "Tension ultra-stable alimentant de manière permanente les cellules de condensateurs mémoires DRAM.",
    ssdTitle: "Rail SSD / Unités Flash (5.0 Volts continu)",
    ssdDesc: "Tension standardisée pour l'alimentation des petites puces contrôleurs et des barrières de flash NAND permanentes.",
    gpuTitle: "Rail de Forte Puissance GPU & Fans (12.0 Volts)",
    gpuDesc: "Le rail le plus puissant destiné aux gros besoins électriques : processeur graphique lourd, ventilateurs de refroidissement, pompes."
  },
  en: {
    title: "Power Supply Unit: Current Transformation",
    sub: "Transformation AC (230V Alternating) ➔ DC (Stable Continuous Voltages) | Core Architecture",
    tagline: "POWER RATIO",
    legend: "⚡ Hover over any rail or block to inspect its potential",
    outletLabel: "WALL OUTLET 230V",
    acLabel: "AC (~ 50Hz)",
    transformerLabel: "⚡ TRANSFORMER",
    psuLabel: "POWER SUPPLY (PSU)",
    cpuLabel: "CPU (VCORE)",
    cpuVolts: "🕹️ 1.2V DC",
    ramLabel: "RAM memory",
    ramVolts: "⚡ 1.25V DC",
    ssdLabel: "SSD STORAGE",
    ssdVolts: "📀 5.0V DC",
    gpuLabel: "GPU / FANS",
    gpuVolts: "🏎️ 12.0V DC",
    watermark: "⚡ Hover over solid state line headers to inspect active potential channels",
    hoverLegend: "🖱️ Hover over any key power stage or output continuous lines to inspect conversion steps.",
    outletTitle: "Electrical Wall Socket Outlet (230 Volts AC)",
    outletDesc: "High voltage 230V sinusoidal alternating current (AC) oscillating at 50Hz, unsuitable for semiconductors.",
    psuTitle: "The Power Supply Unit (PSU)",
    psuDesc: "Made of step-down transformers, diodes, and capacitors to smooth and step down alternating cycles into stable direct currents.",
    cpuTitle: "CPU Vcore Power Rail (1.2 Volts DC)",
    cpuDesc: "Ultra-low highly critical voltage driving core logic silicon structures with high current precision without frying them.",
    ramTitle: "RAM Memory Power Rail (1.2 Volts DC)",
    ramDesc: "Ultra-stable tension continuous rail driving memory state retention modules and DRAM chip matrices.",
    ssdTitle: "SSD / Flash Controller Rail (5.0 Volts DC)",
    ssdDesc: "Standard stable low potential rail to drive flash memory controller circuits and NAND gate boards.",
    gpuTitle: "High Power GPU & Cooling Rail (12.0 Volts)",
    gpuDesc: "High-current power rail built for mechanical fan cooling, heavy graphic processing requirements, and external lanes."
  },
  es: {
    title: "Fuente de Alimentación: Transformación de Corriente",
    sub: "Conversión de CA (230V Alterna) ➔ CC (Voltajes Continuos Estables) | Arquitectura Central",
    tagline: "POWER RATIO",
    legend: "⚡ Pase el cursor sobre los rieles para medir el potencial eléctrico",
    outletLabel: "ENCHUFE PARED 230V",
    acLabel: "CA (~ 50Hz)",
    transformerLabel: "⚡ TRANSFORMADOR",
    psuLabel: "FUENTE DE ALIMENTACIÓN (PSU)",
    cpuLabel: "CPU (VCORE)",
    cpuVolts: "🕹️ 1.2V Continuo",
    ramLabel: "MEMORIA RAM",
    ramVolts: "⚡ 1.25V Continuo",
    ssdLabel: "ALMACENAMIENTO SSD",
    ssdVolts: "📀 5.0V Continuo",
    gpuLabel: "GPU / FANTAS",
    gpuVolts: "🏎️ 12.0V Continuo",
    watermark: "⚡ Pase el cursor sobre los conectores para inspeccionar voltajes en tiempo real",
    hoverLegend: "🖱️ Pase el cursor sobre la fuente o los rieles de salida para analizar cómo la corriente alterna se asienta en energía limpia.",
    outletTitle: "Toma de Corriente Eléctrica Comercial (230V Alterna)",
    outletDesc: "Corriente sinusoidal alterna (AC) de alta tensión que oscila a 50Hz. Extremadamente destructora si se conecta directamente al silicio.",
    psuTitle: "La Unidad Fuente de Alimentación (PSU - Power Supply)",
    psuDesc: "Construida con bobinas reductoras, puentes rectificadores de diodos y filtros amortiguadores que suavizan y aplanan las ondas eléctricas.",
    cpuTitle: "Riel CPU Vcore (1.2 Voltios continuo)",
    cpuDesc: "Voltaje micro-preciso destinado a energizar los miles de millones de transistores en la base lógica del procesador.",
    ramTitle: "Riel de Memoria RAM (1.2 Voltios continuo)",
    ramDesc: "Nivel de energía altamente estable que alimenta de forma ininterrumpida las celdas volátiles de DRAM.",
    ssdTitle: "Riel SSD / Unidad Flash (5.0 Voltios continuo)",
    ssdDesc: "Tensión normalizada para alimentar el microcontrolador lógico y las compuertas de flash NAND de almacenamiento.",
    gpuTitle: "Riel de Alta Potencia GPU y Ventiladores (12.0 Voltios)",
    gpuDesc: "El canal eléctrico de mayor volumen de carga orientado a alimentar chips de aceleración 3D densos, disipadores y bombas de agua."
  },
  de: {
    title: "Netzteil: Die Stromtransformation (PSU)",
    sub: "Transformation von AC (230V Wechselstrom) ➔ DC (Gleichstrom-Sicherheit) | Kernarchitektur",
    tagline: "POWER RATIO",
    legend: "⚡ Bewegen Sie den Zeiger über eine Schienenschnittstelle, um Ströme einzusehen",
    outletLabel: "STECKDOSE 230V",
    acLabel: "AC (~ 50Hz)",
    transformerLabel: "⚡ TRANSFORMATOR",
    psuLabel: "NETZTEIL (PSU)",
    cpuLabel: "CPU (VCORE)",
    cpuVolts: "🕹️ 1.2V Gleichstrom",
    ramLabel: "ARBEITSSPEICHER",
    ramVolts: "⚡ 1.25V Gleichstrom",
    ssdLabel: "SSD FLASH-SPEICHER",
    ssdVolts: "📀 5.0V Gleichstrom",
    gpuLabel: "GPU INSEL / LÜFTER",
    gpuVolts: "🏎️ 12.0V Gleichstrom",
    watermark: "⚡ Bewegen Sie den Zeiger über Stromschienen zur Spannungsprüfung",
    hoverLegend: "🖱️ Bewegen Sie den Zeiger über Stromquellen oder Strompfade, um die Umformung von Wechselspannung in stabile Gleichspannung einzusehen.",
    outletTitle: "Haushaltssteckdose (230 Volt Netz-Wechselstrom)",
    outletDesc: "Hochgespannter sinusförmiger Wechselstrom (AC), der mit 50Hz oszilliert. Ungefiltert absolut zerstörerisch für mikroelektronische Schaltkreise.",
    psuTitle: "Das Netzteil (PSU - Power Supply Unit)",
    psuDesc: "Spannungswandler-Baugruppe aus elektromagnetischen Spulen, Gleichrichterdioden und Siebkondensatoren zur Filterung und Glättung roher Ströme.",
    cpuTitle: "CPU-Ausgangsschiene Vcore (1.2 Volt Gleichstrom)",
    cpuDesc: "Extrem niedrige, hochpräzise Betriebsspannung zur verlustarmen Versorgung der Nanometer-Transistoren des Prozessors.",
    ramTitle: "RAM-Spannungsschiene (1.2 Volt Gleichstrom)",
    ramDesc: "Hochstabile Gleichspannung zur permanenten Erhaltung der elektrischen Ladungen in den DRAM-Speicherzellen.",
    ssdTitle: "SSD-Ausgangsschiene (5.0 Volt Gleichstrom)",
    ssdDesc: "Standardisierte Niederspannung zur zuverlässigen Spannversorgung integrierter Flash-Controller und Flash-Speicherblöcke.",
    gpuTitle: "GPU Hochstrom-Leistungsschiene (12.0 Volt)",
    gpuDesc: "Die leistungsstärkste Verbindung für verbrauchsintensive Großkomponenten wie Grafikkarten, Kühlelemente und Gehäuselüfter."
  }
};

export default function PsuDiagram() {
  const { language } = useLanguage();
  const [hoveredRail, setHoveredRail] = useState<string | null>(null);

  const strings = PSU_STRINGS[language] || PSU_STRINGS.en || PSU_STRINGS.fr;

  const rails = {
    outlet: {
      title: strings.outletTitle,
      desc: strings.outletDesc
    },
    psu: {
      title: strings.psuTitle,
      desc: strings.psuDesc
    },
    cpu: {
      title: strings.cpuTitle,
      desc: strings.cpuDesc
    },
    ram: {
      title: strings.ramTitle,
      desc: strings.ramDesc
    },
    ssd: {
      title: strings.ssdTitle,
      desc: strings.ssdDesc
    },
    gpu: {
      title: strings.gpuTitle,
      desc: strings.gpuDesc
    }
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
        <div className="text-[10px] bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-mono font-bold px-2.5 py-1 rounded-full border border-amber-100 dark:border-amber-950">
          {strings.tagline}
        </div>
      </div>

      {/* SVG Canvas depicting PSU flows */}
      <div className="relative w-full aspect-[4/3] bg-slate-50/50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center justify-center p-2">
        <svg viewBox="0 0 600 450" className="w-full h-auto select-none font-sans">
          
          {/* DEFINITIONS OF SYSTEM GLOWS FOR ARROWS */}
          <defs>
            <marker id="arrow-amber" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#d97706" />
            </marker>
            <marker id="arrow-rose" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#f43f5e" />
            </marker>
          </defs>

          {/* GRID BACKGROUND PATHS */}
          <g opacity="0.1" stroke="currentColor" className="text-slate-400">
            <line x1="100" y1="225" x2="500" y2="225" />
            <line x1="300" y1="50" x2="300" y2="400" />
          </g>

          {/* 1. OUTLET WALL SOCKET (Left) */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredRail('outlet')}
            onMouseLeave={() => setHoveredRail(null)}
          >
            {/* Outlet container */}
            <rect x="25" y="150" width="100" height="150" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" className="dark:fill-slate-900 dark:stroke-slate-800 shadow-3xs" />
            <rect x="25" y="150" width="100" height="30" rx="14" rx-y="14" fill="#f1f5f9" className="dark:fill-slate-800" />
            <circle cx="75" cy="210" r="28" fill="#e2e8f0" className="dark:fill-slate-950" />
            <circle cx="63" cy="210" r="5" fill="#475569" />
            <circle cx="87" cy="210" r="5" fill="#475569" />
            <circle cx="75" cy="192" r="4" fill="#94a3b8" /> {/* earth ground pin */}

            <text x="75" y="171" textAnchor="middle" className="font-mono font-black text-[9px] fill-slate-500">
              {strings.outletLabel}
            </text>
            <text x="75" y="265" textAnchor="middle" className="font-sans font-black text-[10px] fill-red-500 animate-pulse">
              {strings.acLabel}
            </text>
          </g>

          {/* CONDUIT LINE OUTLET TO PSU */}
          <path
            d="M 125,225 H 200"
            fill="none"
            stroke="#ef4444"
            strokeWidth="3.5"
            strokeDasharray="4,4"
            className="animate-pulse"
          />

          {/* 2. THE CENTRAL POWER SUPPLY UNIT (PSU) COMPOSANT */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredRail('psu')}
            onMouseLeave={() => setHoveredRail(null)}
          >
            {/* Box enclosure */}
            <rect
              x="200"
              y="110"
              width="180"
              height="230"
              rx="20"
              fill={hoveredRail === 'psu' ? '#fffbeb' : '#ffffff'}
              stroke={hoveredRail === 'psu' ? '#d97706' : '#f59e0b'}
              strokeWidth="3.5"
              className="dark:fill-slate-950 dark:stroke-slate-850"
            />
            {/* Cooling fan graphics representing power */}
            <circle cx="290" cy="225" r="50" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="10,5" className="animate-spin" style={{ transformOrigin: '290px 225px', animationDuration: '8s' }} />
            <circle cx="290" cy="225" r="8" fill="#d97706" />

            <rect x="220" y="300" width="140" height="25" rx="6" fill="#f59e0b" />
            <text x="290" y="316" textAnchor="middle" className="font-mono font-black text-[9px] fill-white tracking-wider uppercase">
              {strings.transformerLabel}
            </text>

            <text x="290" y="142" textAnchor="middle" className="font-sans font-black text-[11px] fill-amber-900 dark:fill-amber-400 uppercase tracking-widest">
              {strings.psuLabel}
            </text>
          </g>

          {/* 3. FOUR SEPARATE DC VOLTAGE OUTPUT RAILS (Right branching) */}
          {/* Rail A: CPU Vcore */}
          <g
            className="cursor-pointer transition-all duration-350"
            onMouseEnter={() => setHoveredRail('cpu')}
            onMouseLeave={() => setHoveredRail(null)}
          >
            {/* Pathway wire */}
            <path d="M 380,180 Q 420,180 440,75 H 465" fill="none" stroke={hoveredRail === 'cpu' ? '#ef4444' : '#cbd5e1'} strokeWidth="2.5" markerEnd="url(#arrow-rose)" />
            <rect x="465" y="50" width="112" height="42" rx="8" fill="#ffffff" stroke={hoveredRail === 'cpu' ? '#f43f5e' : '#cbd5e1'} strokeWidth="1.5" className="dark:fill-slate-900 dark:stroke-slate-800" />
            <text x="521" y="68" textAnchor="middle" className="font-sans font-black text-[9px] fill-rose-600 dark:fill-rose-450 uppercase tracking-widest">{strings.cpuLabel}</text>
            <text x="521" y="83" textAnchor="middle" className="font-mono text-[9px] fill-slate-800 dark:fill-slate-200 font-bold">{strings.cpuVolts}</text>
          </g>

          {/* Rail B: RAM memory */}
          <g
            className="cursor-pointer transition-all duration-350"
            onMouseEnter={() => setHoveredRail('ram')}
            onMouseLeave={() => setHoveredRail(null)}
          >
            {/* Pathway wire */}
            <path d="M 380,210 H 465" fill="none" stroke={hoveredRail === 'ram' ? '#3b82f6' : '#cbd5e1'} strokeWidth="2.5" markerEnd="url(#arrow-rose)" />
            <rect x="465" y="145" width="112" height="42" rx="8" fill="#ffffff" stroke={hoveredRail === 'ram' ? '#3b82f6' : '#cbd5e1'} strokeWidth="1.5" className="dark:fill-slate-900 dark:stroke-slate-800" />
            <text x="521" y="163" textAnchor="middle" className="font-sans font-black text-[9px] fill-blue-600 dark:fill-blue-450 uppercase tracking-widest">{strings.ramLabel}</text>
            <text x="521" y="178" textAnchor="middle" className="font-mono text-[9px] fill-slate-800 dark:fill-slate-200 font-bold">{strings.ramVolts}</text>
          </g>

          {/* Rail C: SSD flash storage */}
          <g
            className="cursor-pointer transition-all duration-350"
            onMouseEnter={() => setHoveredRail('ssd')}
            onMouseLeave={() => setHoveredRail(null)}
          >
            {/* Pathway wire */}
            <path d="M 380,240 H 465" fill="none" stroke={hoveredRail === 'ssd' ? '#10b981' : '#cbd5e1'} strokeWidth="2.5" markerEnd="url(#arrow-rose)" />
            <rect x="465" y="240" width="112" height="42" rx="8" fill="#ffffff" stroke={hoveredRail === 'ssd' ? '#10b981' : '#cbd5e1'} strokeWidth="1.5" className="dark:fill-slate-900 dark:stroke-slate-800" />
            <text x="521" y="258" textAnchor="middle" className="font-sans font-black text-[9px] fill-emerald-600 dark:fill-emerald-450 uppercase tracking-widest">{strings.ssdLabel}</text>
            <text x="521" y="273" textAnchor="middle" className="font-mono text-[9px] fill-slate-800 dark:fill-slate-200 font-bold">{strings.ssdVolts}</text>
          </g>

          {/* Rail D: GPU heavy processing */}
          <g
            className="cursor-pointer transition-all duration-350"
            onMouseEnter={() => setHoveredRail('gpu')}
            onMouseLeave={() => setHoveredRail(null)}
          >
            {/* Pathway wire */}
            <path d="M 380,270 Q 420,270 440,350 H 465" fill="none" stroke={hoveredRail === 'gpu' ? '#eab308' : '#cbd5e1'} strokeWidth="2.5" markerEnd="url(#arrow-rose)" />
            <rect x="465" y="335" width="112" height="42" rx="8" fill="#ffffff" stroke={hoveredRail === 'gpu' ? '#eab308' : '#cbd5e1'} strokeWidth="1.5" className="dark:fill-slate-900 dark:stroke-slate-800" />
            <text x="521" y="353" textAnchor="middle" className="font-sans font-black text-[9px] fill-amber-600 dark:fill-amber-550 uppercase tracking-widest">{strings.gpuLabel}</text>
            <text x="521" y="368" textAnchor="middle" className="font-mono text-[9px] fill-slate-800 dark:text-slate-200 font-bold">{strings.gpuVolts}</text>
          </g>
        </svg>

        {/* Informative watermark */}
        <div className="absolute top-2 left-2 flex items-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border border-slate-100 dark:border-slate-850 rounded-lg px-2.5 py-1 text-[9px] font-sans font-bold text-slate-500 shadow-3xs">
          <span>{strings.watermark}</span>
        </div>
      </div>

      {/* Description Explanation panel */}
      <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 rounded-xl min-h-[90px] flex flex-col justify-center animate-fade-in">
        {hoveredRail ? (
          <div className="space-y-1 animate-fade-in">
            <h5 className="text-[11px] font-black uppercase text-amber-600 dark:text-amber-400 font-sans tracking-wider">
              🛡️ {rails[hoveredRail as keyof typeof rails].title}
            </h5>
            <p className="text-[11px] text-slate-600 dark:text-slate-350 font-normal leading-relaxed">
              {rails[hoveredRail as keyof typeof rails].desc}
            </p>
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
