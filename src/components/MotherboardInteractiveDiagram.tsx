import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Info, ChevronRight, Cpu as CpuIcon, Layers, Settings, HardDrive, Zap, Sliders, Layout, RefreshCw } from 'lucide-react';

interface MotherboardInteractiveDiagramProps {
  language: string;
}

interface LabelDetail {
  name: string;
  desc: string;
}

const motherboardLabels: Record<string, Record<string, LabelDetail>> = {
  cpu: {
    fr: { name: "Processeur (CPU)", desc: "Le cerveau de l'ordinateur qui gère et exécute toutes les instructions logiques et calculs mathématiques à la vitesse de la lumière." },
    en: { name: "Processor (CPU)", desc: "The central brain of the computer that manages and executes logical instructions and numerical calculations at lightspeed." },
    ar: { name: "المعالج (CPU)", desc: "دماغ الكمبيوتر المركزي الذي يدير وينفذ التعليمات المنطقية والحسابات الرياضية بسرعة فائقة." },
    de: { name: "Prozessor (CPU)", desc: "Das zentrale Gehirn des Computers, das logische Anweisungen und mathematische Berechnungen in Lichtgeschwindigkeit verarbeitet." },
    es: { name: "Procesador (CPU)", desc: "El cerebro central de la computadora que gestiona y ejecuta las instrucciones lógicas y los cálculos matemáticos a velocidad de la luz." }
  },
  ram: {
    fr: { name: "Mémoire vive (RAM)", desc: "Espace de stockage de travail ultra-rapide et volatil, utilisé par le processeur pour stocker temporairement les données des programmes en cours." },
    en: { name: "RAM Memory", desc: "Ultra-fast and volatile temporary working storage space used by the processor to keep active applications and software processes." },
    ar: { name: "الذاكرة العشوائية (RAM)", desc: "مساحة تخزين مؤقتة متطايرة فائقة السرعة تُستخدم للاحتفاظ ببيانات التطبيقات والبرامج النشطة قيد التشغيل." },
    de: { name: "RAM-Arbeitsspeicher", desc: "Ultraschneller, flüchtiger temporärer Arbeitsspeicher, den der Prozessor nutzt, um Daten aktiver Programme bereitzuhalten." },
    es: { name: "Memoria RAM", desc: "Espacio de trabajo temporal y volátil ultra rápido utilizado por el procesador para almacenar datos de programas en ejecución activa." }
  },
  chipset: {
    fr: { name: "Chipset", desc: "Le grand aiguilleur de données qui orchestre et gère le trafic haute vitesse entre le processeur et tous les autres composants physiques." },
    en: { name: "Chipset", desc: "The main data hub/routing controller that orchestrates fast data transfers between the processor and all other motherboard sectors." },
    ar: { name: "مجموعة الشرائح (Chipset)", desc: "موجه البيانات الرئيسي الذي ينظم حركة المرور والاتصال فائق السرعة بين المعالج وجميع المكونات الأخرى." },
    de: { name: "Chipsatz", desc: "Der primäre Datenkoordinator, der den schnellen Informationsfluss zwischen dem Prozessor und anderen PC-Bauteilen steuert." },
    es: { name: "Chipset", desc: "El gran distribuidor de datos que gestiona y coordina el tráfico de alta velocidad entre el procesador y los demás componentes físicos." }
  },
  sata: {
    fr: { name: "Ports SATA", desc: "Prises de transfert de données reliant les disques de stockage permanents (SSD / disques durs) et lecteurs optiques à la carte mère." },
    en: { name: "SATA Ports", desc: "Data transmission interfaces used to plug solid-state drives (SSDs), hard drives (HDDs), and optical drives to the main system." },
    ar: { name: "منافذ SATA", desc: "واجهات نقل البيانات المستخدمة لتوصيل أقراص التخزين الدائمة (SSD / HDD) باللوحة الأم لتخزين الملفات." },
    de: { name: "SATA-Anschlüsse", desc: "Schnittstellen zur Datenübertragung für den Anschluss von Festplatten (HDDs), Halbleiterlaufwerken (SSDs) und optischen Laufwerken." },
    es: { name: "Puertos SATA", desc: "Interfaces de transmisión de datos empleadas para conectar unidades de almacenamiento permanente (SSD/HDD) a la placa base." }
  },
  bios: {
    fr: { name: "Puce ROM / BIOS UEFI", desc: "Une mémoire morte inaltérable stockant le micrologiciel initial responsable du démarrage et de l'initialisation du matériel (POST)." },
    en: { name: "ROM / UEFI BIOS Chip", desc: "A robust non-volatile memory chip preserving the primary system startup program for hardware discovery and OS booting." },
    ar: { name: "شريحة ROM / BIOS UEFI", desc: "رقاقة ذاكرة غير متطايرة ومثبتة تحتفظ ببرنامج التشغيل الأولي وبدء تشغيل عتاد اللوحة الأم بشكل صحيح." },
    de: { name: "ROM / UEFI-BIOS-Chip", desc: "Ein robuster, nichtflüchtiger Speicherchip, welcher die Systemstart-Firmware zur Erkennung der Hardware-Komponenten sichert." },
    es: { name: "Chip ROM / BIOS UEFI", desc: "Un chip de memoria no volátil que almacena el microprograma fundamental encargado de inicializar el hardware en el arranque del equipo." }
  },
  pci: {
    fr: { name: "Slots PCI Express", desc: "Connecteurs d'extension haut débit conçus principalement pour accueillir la carte graphique (GPU) ou des modules Wi-Fi rapides." },
    en: { name: "PCI Express Slots", desc: "High-bandwidth expansion lanes primarily engineered to hold high-performance Graphics Cards (GPUs) and fast network cards." },
    ar: { name: "شقوق PCI Express", desc: "قنوات توسعة عالية النطاق مصممة خصيصاً لتركيب بطاقات الفيديو والأجهزة الطرفية عالية السرعة." },
    de: { name: "PCI-Express-Steckplätze", desc: "Erweiterungsslots mit hoher Bandbreite zur Aufnahme von dedizierten Grafikkarten (GPUs) oder kabellosen Netzwerkkarten." },
    es: { name: "Ranuras PCI Express", desc: "Zócalos de expansión de gran velocidad diseñados para conectar tarjetas gráficas para juegos o tarjetas expansivas wifi." }
  },
  psu: {
    fr: { name: "Connecteur d'Alimentation", desc: "La prise de distribution principale ATX transférant l'énergie stabilisée du bloc d'alimentation aux puces électroniques de la carte mère." },
    en: { name: "ATX Power Connector", desc: "The main motherboard socket feeding safe and stable direct electrical currents generated by the Power Supply Unit (PSU)." },
    ar: { name: "منفذ الطاقة الرئيسي (ATX)", desc: "مقبس استقبال الطاقة الرئيسي الذي يغذي اللوحة الأم بالتيارات الكهربائية المستمرة والمنظمة القادمة من مزود الطاقة." },
    de: { name: "ATX-Stromanschluss", desc: "Die Hauptbuchse des Mainboards, die stabile elektrische Gleichspannungen direkt vom Netzteil (PSU) einspeist." },
    es: { name: "Conector de Alimentación (ATX)", desc: "El enchufe principal que transfiere energía eléctrica estabilizada desde la fuente de poder (PSU) a la motherboard." }
  },
  io_panel: {
    fr: { name: "Panneau Connecteurs Arrière (I/O)", desc: "Regroupement de prises externes (USB, HDMI, Ethernet, Jack Audio) pour brancher instantanément vos périphériques externes." },
    en: { name: "Back I/O Ports Panel", desc: "The external interface panel offering instant connectivity for USB accessories, display screens, keyboard/mouse, and network cables." },
    ar: { name: "لوحة المنافذ الخلفية (I/O)", desc: "مجموعة من المنافذ الخارجية (USB, HDMI, Ethernet) لتوصيل ملحقات الإدخال والإخراج وشاشات العرض." },
    de: { name: "Rückseitiges I/O-Anschlussfeld", desc: "Externe Anschlussbuchsen (USB, HDMI, LAN, Audio) für die direkte Verbindung von Peripheriegeräten und Zubehör." },
    es: { name: "Panel Trasero de Puertos (I/O)", desc: "La consola trasera que integra conexiones externas como puertos USB, HDMI, salida de audio y cable de internet." }
  }
};

const pinPositions = [
  { id: 'cpu', top: '22%', left: '48%', color: 'border-blue-500 bg-blue-500', icon: CpuIcon },
  { id: 'ram', top: '15%', left: '72%', color: 'border-emerald-500 bg-emerald-500', icon: Layers },
  { id: 'chipset', top: '54%', left: '58%', color: 'border-purple-500 bg-purple-500', icon: Settings },
  { id: 'sata', top: '76%', left: '82%', color: 'border-cyan-500 bg-cyan-500', icon: HardDrive },
  { id: 'bios', top: '84%', left: '58%', color: 'border-rose-500 bg-rose-500', icon: Info },
  { id: 'pci', top: '58%', left: '26%', color: 'border-amber-500 bg-amber-500', icon: Sliders },
  { id: 'psu', top: '12%', left: '85%', color: 'border-yellow-500 bg-yellow-500', icon: Zap },
  { id: 'io_panel', top: '15%', left: '14%', color: 'border-indigo-500 bg-indigo-500', icon: Layout }
];

export default function MotherboardInteractiveDiagram({ language }: MotherboardInteractiveDiagramProps) {
  const [selectedId, setSelectedId] = useState<string>('cpu');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const currentLang = ['fr', 'en', 'ar', 'de', 'es'].includes(language) ? language : 'fr';
  const activeLabelId = hoveredId || selectedId;
  const currentDetails = motherboardLabels[activeLabelId]?.[currentLang] || motherboardLabels.cpu[currentLang];

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-4 md:p-6 shadow-sm overflow-hidden flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-4">
        <div>
          <h3 className="text-md sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            {currentLang === 'fr' && "Cartographie Interactive de la Carte Mère"}
            {currentLang === 'en' && "Interactive Motherboard Mapping"}
            {currentLang === 'ar' && "الخريطة التفاعلية للوحة الأم"}
            {currentLang === 'de' && "Interaktive Mainboard-Flächen"}
            {currentLang === 'es' && "Mapa Interactivo de la Placa Base"}
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-1">
            {currentLang === 'fr' && "Survolez ou cliquez sur les modules de couleur de la carte mère pour en observer le rôle."}
            {currentLang === 'en' && "Hover or click on the colored modules to observe their hardware role."}
            {currentLang === 'ar' && "قم بتمرير المؤشر أو النقر على الوحدات الملونة للتعرف على وظيفتها."}
            {currentLang === 'de' && "Fahren Sie mit der Maus über die farbigen Module, um deren Rolle zu verstehen."}
            {currentLang === 'es' && "Pase el cursor o presione los módulos de color para aprender sus funciones."}
          </p>
        </div>
        
        <button
          onClick={() => setSelectedId('cpu')}
          className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-150/70 dark:bg-blue-950/20 dark:hover:bg-blue-900/40 px-3 py-1.5 rounded-xl border border-blue-100 dark:border-blue-900/40 cursor-pointer flex items-center gap-1.5 self-end sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          {currentLang === 'fr' && "Réinitialiser au CPU"}
          {currentLang === 'en' && "Reset to CPU"}
          {currentLang === 'ar' && "عادة تعيين للمعالج"}
          {currentLang === 'de' && "Auf CPU zurücksetzen"}
          {currentLang === 'es' && "Restaurar a CPU"}
        </button>
      </div>

      {/* Main Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Interactive Diagram Canvas representing 4:3 Aspect Ratio overlay */}
        <div className="lg:col-span-7 flex items-center justify-center">
          <div className="relative w-full aspect-[4/3] bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs group select-none">
            {/* Background Image of motherboard */}
            <img 
              src="/assets/components/motherboard/hero.png" 
              alt="Computer Motherboard Architecture Layout" 
              className="absolute inset-0 w-full h-full object-cover opacity-90 dark:opacity-75 transition-transform duration-700 group-hover:scale-[1.01]"
              referrerPolicy="no-referrer"
            />
            
            {/* Soft Ambient Overlay */}
            <div className="absolute inset-0 bg-slate-950/5 pointer-events-none" />

            {/* Absolute positioning of pins with responsive percentage sizes */}
            {pinPositions.map((pin) => {
              const isSelected = selectedId === pin.id;
              const isHovered = hoveredId === pin.id;
              const isActive = isSelected || isHovered;
              const labelText = motherboardLabels[pin.id]?.[currentLang]?.name || pin.id.toUpperCase();
              const PinIcon = pin.icon;

              return (
                <div 
                  key={pin.id}
                  style={{ top: pin.top, left: pin.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-25"
                >
                  {/* Glowing background ring on hover or selection */}
                  <div className={`absolute -inset-4 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/10 dark:bg-white/5 blur-xs scale-120' 
                      : 'scale-0'
                  }`} />

                  {/* Ripple Ring Wave animation */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                        className={`absolute w-8 h-8 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 border-2 ${
                          isSelected ? 'border-amber-400' : 'border-blue-400'
                        }`}
                      />
                    )}
                  </AnimatePresence>

                  {/* Pulsing Outer Core Badge */}
                  <button
                    onMouseEnter={() => setHoveredId(pin.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedId(pin.id)}
                    className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md ${
                      isSelected 
                        ? 'border-amber-400 bg-amber-500 text-white scale-110 ring-4 ring-amber-500/20' 
                        : isHovered 
                          ? 'border-blue-400 bg-blue-500 text-white scale-108 ring-4 ring-blue-500/20'
                          : `${pin.color} border-white/40 text-white hover:scale-105 hover:border-white shadow-lg`
                    }`}
                  >
                    <PinIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  {/* Micro Text Label above of the pin hover */}
                  <div className={`absolute left-1/2 -translate-x-1/2 top-8 sm:top-10 mt-1 pointer-events-none transition-all duration-200 shadow-md ${
                    isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                  }`}>
                    <div className="bg-slate-900/95 dark:bg-slate-950/95 text-white text-[10px] sm:text-[11px] font-black tracking-wider whitespace-nowrap px-2.5 py-1 rounded-xl border border-slate-700">
                      {labelText}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Informative Showcase Card on the Right panel */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-5 md:p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="p-3 bg-blue-600/10 text-blue-600 dark:text-blue-450 rounded-2xl border border-blue-500/10">
                {(() => {
                  const activePin = pinPositions.find(p => p.id === activeLabelId);
                  const Icon = activePin ? activePin.icon : CpuIcon;
                  return <Icon className="w-5 h-5 sm:w-6 sm:h-6" />;
                })()}
              </span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 dark:text-blue-400 font-mono">
                  {currentLang === 'fr' && "Composant Identifié"}
                  {currentLang === 'en' && "Detected Component"}
                  {currentLang === 'ar' && "المكون المحدد"}
                  {currentLang === 'de' && "Erkanntes Bauteil"}
                  {currentLang === 'es' && "Componente Detectado"}
                </span>
                <h4 className="text-lg font-black text-slate-850 dark:text-white leading-tight">
                  {currentDetails.name}
                </h4>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-semibold leading-relaxed">
              {currentDetails.desc}
            </p>

            <div className="pt-2">
              <div className="flex flex-col gap-2 bg-white/70 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 rounded-2xl p-3 shadow-inner">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider flex items-center gap-1">
                  <Info className="w-3 h-3 text-emerald-500" />
                  {currentLang === 'fr' && "Symptôme de Panne Globale"}
                  {currentLang === 'en' && "Global Failure Symptom"}
                  {currentLang === 'ar' && "أعراض الفشل والأعطال"}
                  {currentLang === 'de' && "Globale Fehleranzeige"}
                  {currentLang === 'es' && "Problema Típico o Falla"}
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                  {activeLabelId === 'cpu' && (
                    currentLang === 'fr' ? "Si défaillant : Écran noir instantané, les ventilateurs tournent mais le PC ne démarre pas." :
                    currentLang === 'en' ? "If failed: Instant blank screen, cooling fans spin but PC does not execute startup bios." :
                    currentLang === 'ar' ? "في حالة الفشل: شاشة سوداء فورية، تدور المراوح ولكن لا يقوم الكمبيوتر بالإقلاع." :
                    currentLang === 'de' ? "Bei Defekt: Monitor bleibt schwarz, Lüfter drehen sich, doch BIOS-Start gelingt nicht." :
                    "Si falla: Pantalla negra instantánea, los ventiladores giran pero el PC no inicia BIOS."
                  )}
                  {activeLabelId === 'ram' && (
                    currentLang === 'fr' ? "Si défaillant : Bips sonores continus de la carte mère au démarrage, arrêts soudains (écrans bleus)." :
                    currentLang === 'en' ? "If failed: Continuous beep codes from motherboard on boot, sudden blue-screen-of-death (BSOD) crashes." :
                    currentLang === 'ar' ? "في حالة الفشل: صفارات مستمرة من اللوحة الأم عند البدء، مع توقفات مفاجئة (الشاشة الزرقاء)." :
                    currentLang === 'de' ? "Bei Defekt: Kontinuierliche Signalbips beim Einschalten, plötzliche Blue-Screens." :
                    "Si falla: Pitidos continuos de la placa base al arrancar, congelamientos y pantallas azules."
                  )}
                  {activeLabelId === 'chipset' && (
                    currentLang === 'fr' ? "Si défaillant : Surchauffe, instabilités du bus informatique, ports USB ou Wi-Fi non reconnus." :
                    currentLang === 'en' ? "If failed: Device overheating, peripheral bus instability, non-functional USB or PCIe ports." :
                    currentLang === 'ar' ? "في حالة الفشل: حرارة شديدة، عدم استقرار في ناقل البيانات، أو عدم التعرف على منافذ USB." :
                    currentLang === 'de' ? "Bei Defekt: Überhitzung, instabile Datenbussysteme, USB-Stecker nicht erkannt." :
                    "Si falla: Sobrecalentamiento, inestabilidades en transferencia de datos, puertos USB no reconocidos."
                  )}
                  {activeLabelId === 'sata' && (
                    currentLang === 'fr' ? "Si défaillant : Le système affiche 'No boot device found' (Disque dur introuvable)." :
                    currentLang === 'en' ? "If failed: BIOS triggers 'No bootable device found' because hard drive cannot be mapped." :
                    currentLang === 'ar' ? "في حالة الفشل: سيعرض النظام رسالة تفيد بعدم وجود جهاز للإقلاع لعدم العثور على القرص." :
                    currentLang === 'de' ? "Bei Defekt: Fehleranzeige 'Kein bootfähiges Medium gefunden' - SSD unsichtbar." :
                    "Si falla: Mensajes de 'No bootable device found' por discos duros que desaparecen del sistema."
                  )}
                  {activeLabelId === 'bios' && (
                    currentLang === 'fr' ? "Si défaillant : Batterie CMOS vide (heure perdue), PC bloqué sur le logo du constructeur." :
                    currentLang === 'en' ? "If failed: Empty CMOS battery causes lost clock time, PC is completely locked on vendor logo." :
                    currentLang === 'ar' ? "في حالة الفشل: بطارية CMOS فارغة (فقدان الوقت والتاريخ)، الكمبيوتر يتوقف عند شعار الشركة." :
                    currentLang === 'de' ? "Bei Defekt: CMOS-Batterie leer (Uhrzeit verloren), PC friert beim Herstellerlogo ein." :
                    "Si falla: Batería CMOS gastada (reloj retrasado), PC bloqueado en logotipo inicial del fabricante."
                  )}
                  {activeLabelId === 'pci' && (
                    currentLang === 'fr' ? "Si défaillant : Aucun signal vidéo reçu par l'écran, glitchs colorés ou crash graphique lourd." :
                    currentLang === 'en' ? "If failed: Monitor displays no signal or heavy artifacts, or graphics card drops in performance." :
                    currentLang === 'ar' ? "في حالة الفشل: لا توجد إشارة فيديو مرسلة إلى الشاشة، أو ظهور ألوان مشوشة متداخلة." :
                    currentLang === 'de' ? "Bei Defekt: Monitor empfängt kein Videosignal, bunte Grafikartefakte am Bildschirm." :
                    "Si falla: Ninguna señal de video del monitor, parpadeos de color o cuelgues de renderizado."
                  )}
                  {activeLabelId === 'psu' && (
                    currentLang === 'fr' ? "Si défaillant : Pas de lumières, silence total à l'appui sur le bouton de démarrage." :
                    currentLang === 'en' ? "If failed: No power lights, absolute silence when pressing the power switch." :
                    currentLang === 'ar' ? "في حالة الفشل: لا توجد أضواء، صمت تام عند الضغط على زر التشغيل." :
                    currentLang === 'de' ? "Bei Defekt: Keine LEDs leuchten, absolutes Schweigen bei Druck des Powerknopfs." :
                    "Si falla: Ausencia de luces led, silencio absoluto al presionar el interruptor de encendido."
                  )}
                  {activeLabelId === 'io_panel' && (
                    currentLang === 'fr' ? "Si défaillant : Clavier, souris ou clé USB insérée non détectés à l'arrière." :
                    currentLang === 'en' ? "If failed: Wired keyboard, mouse or plugged USB storage remain completely undetected in the back." :
                    currentLang === 'ar' ? "في حالة الفشل: لوحة المفاتيح والملحقات أو مفتاح USB لا يستجيب في المنافذ الخلفية." :
                    currentLang === 'de' ? "Bei Defekt: Maus, Tastatur oder USB-Sticks an der Rückseite werden nicht erkannt." :
                    "Si falla: El ratón del PC, teclado USB o memorias externas permanecen apagados o invisibles."
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100/90 dark:border-slate-800/80">
            <h5 className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase font-mono mb-2">
              {currentLang === 'fr' && "Liste des modules cartographiés"}
              {currentLang === 'en' && "List ofMapped Modules"}
              {currentLang === 'ar' && "قائمة المكونات المحددة للوحة الأم"}
              {currentLang === 'de' && "Verzeichnis der Module"}
              {currentLang === 'es' && "Módulos Identificados"}
            </h5>
            
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
              {pinPositions.map((pin) => {
                const isSelected = selectedId === pin.id;
                const label = motherboardLabels[pin.id]?.[currentLang]?.name || pin.id.toUpperCase();
                return (
                  <button
                    key={pin.id}
                    onClick={() => setSelectedId(pin.id)}
                    className={`px-2.5 py-1 text-[11px] rounded-xl font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    {(() => {
                      const Icon = pin.icon;
                      return <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />;
                    })()}
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
