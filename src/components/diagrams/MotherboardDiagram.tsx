import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const MB_STRINGS: Record<string, any> = {
  ar: {
    title: "اللوحة الأم: التوزيع المادي ومسالك النحاس",
    sub: "مخطط التوصيلات البينية للأعضاء المادية | الجذع المشترك",
    tagline: "MAINBOARD",
    legend: "🎯 مرر فوق أي من منافذ اللوحة الأم لمعاينة معلوماته",
    cpuTitle: "مقبس المعالج (Socket CPU)",
    cpuDesc: "الموضع المربع المجهز بآلاف الإبر الدقيقة المذهبة لاستقبال المعالج المركزي وتثبيته ميكانيكياً وكهربائياً باللوحة.",
    ramTitle: "شقوق ذاكرة الوصول العشوائي (RAM Slots)",
    ramDesc: "المنافذ الضيقة الطولية المدعمة برافعات تأمين جانبية لتثبيت رقاقات الذاكرة السريعة بالقرب من المعالج لتقليل زمن التأخير.",
    chipsetTitle: "رقاقة شريحة التحكم (Chipset)",
    chipsetDesc: "منسق الممرات المجهري المبرد بمشتت حراري معدني. ينظم حركة عبور البيانات المتوسطة وقليلة السرعة (منافذ USB، كروت PCIe الفرعية).",
    sataTitle: "منافذ ساتا (SATA Ports)",
    sataDesc: "قوابس مسطحة مخصصة لربط كابلات تخزين البيانات القادمة من وحدات الأقراص الصلبة (HDD) أو أقراص الحالة الصلبة السريعة (SSD).",
    hoverLegend: "🖱️ مرر فوق أحد المكونات لتتحقق من توصيلاته والناقل المتصل بها."
  },
  fr: {
    title: "Carte Mère : Disposition Physique & Pistes de Cuivre",
    sub: "Layout d'Interconnexions des Organes Matériels | Tronc Commun",
    tagline: "MAINBOARD",
    legend: "🎯 Survolez un connecteur de la carte mène",
    cpuTitle: "Socket CPU (Connecteur Processeur)",
    cpuDesc: "L'emplacement physique carré doté de milliers d'aiguilles dorées destiné à accueillir le microprocesseur principal et à le fixer mécaniquement au système.",
    ramTitle: "Slots pour barrettes RAM (Mémoire Vive)",
    ramDesc: "Les connecteurs rigides minces équipés de leviers de verrouillage plastique maintenant les barrettes de mémoire vive au plus proche du processeur.",
    chipsetTitle: "Puce du Chipset (Le régulateur d’autoroutes)",
    chipsetDesc: "Le concentrateur d'autoroutes logé sous un dissipateur en métal. Il gère les connexions à vitesse modérée (prises USB, souris, cartes filles PCIe).",
    sataTitle: "Ports SATA (Stockage permanent SSD / HDD)",
    sataDesc: "Prises de connexion plates destinées à raccorder les câbles plats de données provenant des disques durs lents ou des lecteurs optiques.",
    hoverLegend: "🖱️ Survolez un des ports matériels (CPU, RAM, SATA, Chipset) pour comprendre son raccordement et son bus d'interconnexion."
  },
  en: {
    title: "Motherboard: Physical Layout & Copper Pathways",
    sub: "Interconnection Paths of Hardware Components | Core Architecture",
    tagline: "MAINBOARD",
    legend: "🎯 Hover over motherboard socket interfaces",
    cpuTitle: "CPU Socket",
    cpuDesc: "The square physical socket containing thousands of golden landing plates to receive and latch the computer processor safely.",
    ramTitle: "RAM Dual-Channel Slots",
    ramDesc: "Thin rigid vertical sockets with dual security lock levers that maintain high-speed RAM sticks as close as possible to the CPU.",
    chipsetTitle: "System Chipset Hub",
    chipsetDesc: "The highway controller component housed under a metallic heatsink. It manages medium to lower speed accessories, PCIe brackets, and USB inputs.",
    sataTitle: "SATA Disk Storage Ports",
    sataDesc: "Flat connection blocks built to drive flat serial data cables directly from permanent hard drives and optical disk storage units.",
    hoverLegend: "🖱️ Hover over any key hardware interface (CPU, RAM, SATA, Chipset) to inspect its bus lines and connections."
  },
  es: {
    title: "Placa Base: Distribución Física y Pistas de Cobre",
    sub: "Diseño de Interconexiones de Órganos de Hardware | Arquitectura Central",
    tagline: "PLACA BASE",
    legend: "🎯 Pase el cursor sobre los conectores para ver detalles",
    cpuTitle: "Zócalo del Procesador (Socket CPU)",
    cpuDesc: "La ranura física cuadrada provista de miles de pines dorados diseñada para acoplar el microprocesador principal de forma mecánica y eléctrica.",
    ramTitle: "Ranuras de Memoria RAM (Slots)",
    ramDesc: "Ranuras rígidas con palancas plásticas de cierre que sostienen los módulos de RAM ultra-rápida posicionados cerca de la CPU.",
    chipsetTitle: "Chipset del Sistema (Regulador de Autopistas)",
    chipsetDesc: "Concentrador de autopistas lógicas colocado debajo de un disipador metálico. Regula velocidades medianas como puertos USB y puertos PCIe.",
    sataTitle: "Puertos SATA (Almacenamiento Permanente SSD / HDD)",
    sataDesc: "Enchufes planos diseñados para conectar cables serie de datos desde discos duros o unidades de estado sólido.",
    hoverLegend: "🖱️ Pase el cursor sobre puertos de hardware (CPU, RAM, SATA, Chipset) para analizar su bus asignado."
  },
  de: {
    title: "Mainboard: Physisches Layout & Kupferbahnen",
    sub: "Vernetzungsdiagramm physischer Hardware-Komponenten | Kernarchitektur",
    tagline: "MAINBOARD",
    legend: "🎯 Bewegen Sie den Zeiger über die Mainboard-Anschlüsse",
    cpuTitle: "Prozessorsockel (CPU Socket)",
    cpuDesc: "Die quadratische Hauptfassung mit hunderten vergoldeten Steckkontakten für die sichere mechanische und elektrische Fixierung des Prozessors.",
    ramTitle: "Arbeitsspeicher-Slots (DIMM RAM)",
    ramDesc: "Schmale Steckplätze mit seitlichen Halteklammern zur schnellen, latenzarmen Direktanbindung der RAM-Speicherbausteine an die CPU.",
    chipsetTitle: "Chipsatz (System-Chipset Controller)",
    chipsetDesc: "Die Daten-Verteilerzentrale unter dem Aluminium-Kühlkörper. Regelt mittlere Datenströme wie USB-Schnittstellen und PCI-Express-Steckplätze.",
    sataTitle: "SATA-Anschlüsse (SSD / HDD Festplatten)",
    sataDesc: "Flache, standardisierte SATA-Verbindungskabelports für angeschlossene optische Laufwerke oder permanente Magnetschicht- und Flashspeicher.",
    hoverLegend: "🖱️ Bewegen Sie die Maus über CPU, RAM, SATA oder Chipsatz, um dorthin führende Busleitungen zu visualisieren."
  }
};

export default function MotherboardDiagram() {
  const { language } = useLanguage();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const strings = MB_STRINGS[language] || MB_STRINGS.en || MB_STRINGS.fr;

  const nodes = {
    cpu: {
      title: strings.cpuTitle,
      desc: strings.cpuDesc
    },
    ram: {
      title: strings.ramTitle,
      desc: strings.ramDesc
    },
    chipset: {
      title: strings.chipsetTitle,
      desc: strings.chipsetDesc
    },
    sata: {
      title: strings.sataTitle,
      desc: strings.sataDesc
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-indigo-950/40 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Title */}
      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
            {strings.title}
          </h4>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
            {strings.sub}
          </p>
        </div>
        <div className="text-[10px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-mono font-bold px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-950">
          {strings.tagline}
        </div>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="relative w-full aspect-[4/3] bg-emerald-950/90 border border-emerald-900 rounded-xl overflow-hidden flex items-center justify-center p-2">
        <svg viewBox="0 0 600 450" className="w-full h-auto select-none font-sans">
          
          {/* DEFINITIONS OF SYSTEM GLOWS */}
          <defs>
            <linearGradient id="trace-glow-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow-light" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* BACKGROUND MOTHERBOARD CIRCUIT PATTERN */}
          <g stroke="#047857" strokeWidth="1" opacity="0.45" fill="none">
            <rect x="20" y="20" width="560" height="410" rx="10" stroke="#047857" strokeWidth="2" />
            <path d="M 40,40 L 100,40 L 120,60" />
            <path d="M 40,380 L 100,380 L 120,360" />
            <path d="M 500,40 L 450,40 L 430,60" />
            <path d="M 500,380 L 450,380 L 430,360" />
            
            {/* Horizontal guidelines */}
            <line x1="30" y1="225" x2="570" y2="225" strokeDasharray="5,10" />
            <line x1="180" y1="30" x2="180" y2="420" strokeDasharray="3,6" />
          </g>

          {/* COPPER SYSTEM TRACES (HIGHWAYS CONNECTIVITY) - Visual glow if hovered */}
          <g fill="none" strokeWidth="2.5" strokeOpacity="0.8">
            {/* CPU to RAM Traces (High speed) */}
            <path
              d="M 170,120 H 340 M 170,135 H 340 M 170,150 H 340"
              stroke={hoveredNode === 'cpu' || hoveredNode === 'ram' ? '#3b82f6' : '#10b981'}
              strokeWidth={hoveredNode === 'cpu' || hoveredNode === 'ram' ? '3.5' : '2'}
              className="transition-all"
            />
            {/* CPU to Chipset Traces */}
            <path
              d="M 120,185 V 270 H 260"
              stroke={hoveredNode === 'cpu' || hoveredNode === 'chipset' ? '#3b82f6' : '#10b981'}
              strokeWidth={hoveredNode === 'cpu' || hoveredNode === 'chipset' ? '3.5' : '2'}
              className="transition-all"
            />
            {/* Chipset to SATA Traces */}
            <path
              d="M 320,320 H 450 V 290"
              stroke={hoveredNode === 'chipset' || hoveredNode === 'sata' ? '#3b82f6' : '#10b981'}
              strokeWidth={hoveredNode === 'chipset' || hoveredNode === 'sata' ? '3.5' : '2'}
              className="transition-all"
            />
          </g>

          {/* --- 1. CPU SOCKET (TOP LEFT) --- */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredNode('cpu')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Outer socket bracket */}
            <rect
              x="50"
              y="50"
              width="120"
              height="120"
              rx="12"
              fill={hoveredNode === 'cpu' ? '#115e59' : '#064e3b'}
              stroke={hoveredNode === 'cpu' ? '#60a5fa' : '#059669'}
              strokeWidth="3.5"
            />
            {/* Pin elements inside socket */}
            <rect x="65" y="65" width="90" height="90" rx="4" fill="#047857" stroke="#065f46" strokeWidth="1" />
            <circle cx="110" cy="110" r="15" fill="#022c22" stroke="#059669" strokeWidth="1.5" />
            
            {/* Micro gold pins array representation */}
            <g opacity="0.3" fill="#f59e0b">
              <rect x="70" y="70" width="4" height="4" />
              <rect x="78" y="70" width="4" height="4" />
              <rect x="86" y="70" width="4" height="4" />
              <rect x="130" y="70" width="4" height="4" />
              <rect x="138" y="70" width="4" height="4" />
              <rect x="146" y="70" width="4" height="4" />
              
              <rect x="70" y="146" width="4" height="4" />
              <rect x="78" y="146" width="4" height="4" />
              <rect x="146" y="146" width="4" height="4" />
            </g>
            
            <text x="110" y="114" textAnchor="middle" className="font-mono font-black text-[9px] fill-emerald-300 pointer-events-none">
              SOCKET CPU
            </text>
            
            {/* Lever metal arm */}
            <line x1="168" y1="60" x2="168" y2="150" stroke="#94a3b8" strokeWidth="3" />
            <circle cx="168" cy="150" r="4" fill="#64748b" />
          </g>

          {/* --- 2. RAM DUAL-CHANNEL SLOTS (TOP RIGHT) --- */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredNode('ram')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Slot A1 */}
            <rect x="340" y="40" width="14" height="150" rx="3" fill="#022c22" stroke={hoveredNode === 'ram' ? '#3b82f6' : '#047857'} strokeWidth="1.5" />
            {/* Slot B1 */}
            <rect x="365" y="40" width="14" height="150" rx="3" fill="#022c22" stroke={hoveredNode === 'ram' ? '#3b82f6' : '#047857'} strokeWidth="1.5" />

            {/* Locked RAM stick graphic representation inside Slot A1 */}
            {hoveredNode === 'ram' && (
              <g>
                <rect x="343" y="45" width="8" height="140" rx="2" fill="#1e40af" />
                <rect x="345" y="60" width="4" height="20" fill="#0f172a" />
                <rect x="345" y="90" width="4" height="20" fill="#0f172a" />
                <rect x="345" y="120" width="4" height="20" fill="#0f172a" />
              </g>
            )}

            {/* Securing clip levers */}
            <path d="M 334,40 L 340,48" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M 334,190 L 340,182" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M 379,40 L 373,48" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M 379,190 L 373,182" stroke="#cbd5e1" strokeWidth="2" />

            <text x="355" y="115" textAnchor="middle" transform="rotate(90 355 115)" className="font-sans font-extrabold text-[8px] fill-emerald-400 tracking-wider">
              DIMM RAM SLOTS
            </text>
          </g>

          {/* --- 3. SYSTEM CHIPSET HUB (BOTTOM LEFT) --- */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredNode('chipset')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <rect
              x="260"
              y="250"
              width="80"
              height="80"
              rx="8"
              fill={hoveredNode === 'chipset' ? '#1e3a8a' : '#0f172a'}
              stroke={hoveredNode === 'chipset' ? '#60a5fa' : '#334155'}
              strokeWidth="2.5"
            />
            {/* Heat dissipator plate ridges */}
            <rect x="270" y="260" width="12" height="60" fill="#1e293b" />
            <rect x="294" y="260" width="12" height="60" fill="#1e293b" />
            <rect x="318" y="260" width="12" height="60" fill="#1e293b" />

            <text x="300" y="295" textAnchor="middle" className="font-mono font-black text-[9px] fill-slate-300">
              CHIPSET
            </text>
          </g>

          {/* --- 4. SATA HARD STORAGE SLOTS (BOTTOM RIGHT) --- */}
          <g
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredNode('sata')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* SATA Block ports */}
            <rect
              x="450"
              y="240"
              width="45"
              height="30"
              rx="4"
              fill="#022c22"
              stroke={hoveredNode === 'sata' ? '#3b82f6' : '#059669'}
              strokeWidth="2"
            />
            {/* SATA port 1 notch */}
            <rect x="455" y="248" width="12" height="14" fill="#0f172a" />
            {/* SATA port 2 notch */}
            <rect x="475" y="248" width="12" height="14" fill="#0f172a" />

            <text x="472" y="285" textAnchor="middle" className="font-mono text-[9px] fill-emerald-450 tracking-wider">
              SATA
            </text>
          </g>

          {/* MOTHERBOARD METAPHOR LABEL COOPERATIVE OVERLAY */}
          <line x1="20" y1="20" x2="300" y2="430" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.1" />
        </svg>

        {/* Legend */}
        <div className="absolute top-2 left-2 flex items-center bg-emerald-900/90 border border-emerald-800 rounded-lg px-2.5 py-1 text-[9px] font-sans font-bold text-emerald-300 shadow-3xs">
          <span>{strings.legend}</span>
        </div>
      </div>

      {/* Description Panel */}
      <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 rounded-xl min-h-[90px] flex flex-col justify-center animate-fade-in">
        {hoveredNode ? (
          <div className="space-y-1 animate-fade-in">
            <h5 className="text-[11px] font-black uppercase text-emerald-600 dark:text-emerald-400 font-sans tracking-wider">
              🔹 {nodes[hoveredNode as keyof typeof nodes].title}
            </h5>
            <p className="text-[11px] text-slate-600 dark:text-slate-350 font-normal leading-relaxed">
              {nodes[hoveredNode as keyof typeof nodes].desc}
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
