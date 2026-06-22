import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const RAM_V_STRINGS: Record<string, any> = {
  ar: {
    title: "الذاكرة العشوائية: خاصية التطاير (تخزين مؤقت)",
    sub: "الاحتفاظ بالبيانات تحت تيار (5 فولت) مقابل فقدانها دون تيار (0 فولت) | الجذع المشترك",
    powerBtnOn: "🔋 تحت الجهد (ON)",
    powerBtnOff: "📴 مفصول الطاقة (OFF)",
    blackoutTitle: "⚠️ انقطاع التيار الكهربائي (0 فولت)",
    blackoutDesc: "تفرغ جميع مكثفات DRAM شحناتها فوراً. يتم محو ومعالجة جميع الملفات المؤقتة في الذاكرة العشوائية!",
    chromeTitle: "تطبيق 1: متصفح الويب (كروم)",
    chromeDesc: "يخزن هياكل الصفحات المفتوحة وسجل التصفح النشط المؤقت.",
    chromeSize: "محمل 2.4 جيجا",
    minecraftTitle: "تطبيق 2: لعبة Minecraft 3D",
    minecraftDesc: "تخزن مؤقتا صور الأبعاد الثلاثية وإحداثيات تحرك اللاعب الحالية وأصوات اللعب.",
    minecraftSize: "محمل 4.1 جيجا",
    wordTitle: "تطبيق 3: معالج النصوص (Word)",
    wordDesc: "يحتفظ بالخطوط والفقرات المكتوبة في انتظار الحفظ النهائي.",
    wordSize: "محمل 350 ميجا",
    activeLabel: "نشط (LIVE)",
    emptyLabel: "ممحو (0V)",
    emptyValue: "[ فارغ / --- ]",
    legend: "⚙️ انقر على زر تشغيل/إيقاف في الأعلى لمحاكاة انقطاع الكهرباء الفوري!",
    questionTitle: "لماذا توصف الذاكرة العشوائية RAM بأنها متطايرة؟",
    questionDesc: "عندما تتوفر طاقة كهربائية مستقرة (5 فولت)، تحتفظ رقائق السيليكون ببيانات التطبيق. في حالة انقطاع الكهرباء المفاجئ (أو إغلاق الجهاز)، تفرغ ملايين المكثفات الميكروية شحناتها بسرعة الضوء (0 فولت) وتتبدد جميع العمليات والتعديلات غير المحفوظة نهائياً على القرص الصلب SSD/HDD! لذا تذكر دائماً حفظ دروسك بشكل دوري."
  },
  fr: {
    title: "RAM : Propriété de Volatilité (Stockage Éphémère)",
    sub: "Rétention sous Courant (5V) vs Perte sans Courant (0V) | Tronc Commun",
    powerBtnOn: "🔋 Sous Tension (ON)",
    powerBtnOff: "📴 Hors Tension (OFF)",
    blackoutTitle: "🔌⚠️ COUPURE DE COURANT (0 VOLT)",
    blackoutDesc: "Toutes les condensateurs de DRAM se vident. Toutes les données de travail sont perdues en RAM !",
    chromeTitle: "Application 1 : Navigateur Web (Chrome)",
    chromeDesc: "Stocke les structures de pages HTML ouvertes, l'historique récent de navigation active, et les images de cours d'informatique.",
    chromeSize: "2.4 Go chargés",
    minecraftTitle: "Application 2 : Jeu vidéo (Minecraft)",
    minecraftDesc: "Stocke temporairement les textures graphiques des blocs 3D, les coordonnées physiques du joueur et les sons du monde actif.",
    minecraftSize: "4.1 Go chargés",
    wordTitle: "Application 3 : Traitement de texte (Word)",
    wordDesc: "Garde en mémoire les paragraphes saisis pour le prochain rapport d'examen de Tronc Commun, en attente de sauvegarde définitive.",
    wordSize: "350 Mo chargés",
    activeLabel: "ACTIVE (LIVE)",
    emptyLabel: "EFFACÉ (0V)",
    emptyValue: "[ EMPTY / --- ]",
    legend: "⚙️ Cliquez sur le bouton ON/OFF en haut pour simuler une coupure !",
    questionTitle: "Pourquoi la RAM est-elle qualifiée de \"volatile\" ?",
    questionDesc: "Lorsqu'il y a du courant (5V), les puces de silicium retiennent les applications ouvertes. En cas de coupure brusque de courant (ou d'extinction du PC), les millions de petits condensateurs internes de DRAM se vident à la vitesse de la lumière (0 Volt) et toutes vos modifications non enregistrées sur SSD/HDD s'effacent à jamais ! C'est la raison pour laquelle on doit toujours sauvegarder ses cours."
  },
  en: {
    title: "RAM: Volatility Property (Temporary Storage)",
    sub: "Data Retention with Electrical Potential (5V) vs Zero Potential (0V) | Core Architecture",
    powerBtnOn: "🔋 Power On (LIVE 5V)",
    powerBtnOff: "📴 Power Off (OFF 0V)",
    blackoutTitle: "🔌⚠️ POWER OUTAGE (0 VOLTS)",
    blackoutDesc: "All internal DRAM capacitors instantaneously discharge. All current working data in temporary memory is erased!",
    chromeTitle: "Application 1: Web Browser (Chrome)",
    chromeDesc: "Holds open HTML tree configurations, recent tab histories, and local cache images during reading cycles.",
    chromeSize: "2.4 MB loaded",
    minecraftTitle: "Application 2: 3D Video Game (Minecraft)",
    minecraftDesc: "Temporarily holds heavy graphic texture vectors, player coords, and active environmental audio feeds.",
    minecraftSize: "4.1 GB loaded",
    wordTitle: "Application 3: Text Document (Word)",
    wordDesc: "Holds typed essay paragraphs of pending assignments in transient state, waiting for saved block.",
    wordSize: "350 MB loaded",
    activeLabel: "ACTIVE (LIVE)",
    emptyLabel: "CLEARED (0V)",
    emptyValue: "[ EMPTY / --- ]",
    legend: "⚙️ Click the ON/OFF button at the top to simulate a direct power cut!",
    questionTitle: "Why is physical compute RAM called \"volatile\"?",
    questionDesc: "While stable electrical current (5V) is maintained, internal silicon transistors hold open software files. When power goes down (accidental cuts or shut down), millions of DRAM capacitors empty themselves within microseconds (0 Volts). Any edits not written to solid state SSD or HDD storage disappear forever! This is why you must periodically save your progress."
  },
  es: {
    title: "RAM: Propiedad de Volatilidad (Resguardo Temporal)",
    sub: "Retención con Corriente Activa (5V) frente a Pérdida Absoluta (0V) | Arquitectura Central",
    powerBtnOn: "🔋 Con Corriente (ON)",
    powerBtnOff: "📴 Sin Corriente (OFF)",
    blackoutTitle: "🔌⚠️ CORTE DE ENERGÍA (0 VOLTIOS)",
    blackoutDesc: "Todos los condensadores internos de DRAM se descargan inmediatamente. ¡Todo dato sin guardar se disipa de la memoria RAM!",
    chromeTitle: "Aplicación 1: Navegador Web (Chrome)",
    chromeDesc: "Retiene las páginas abiertas, configuraciones de árbol DOM e imágenes cargadas en el sitio web.",
    chromeSize: "2.4 GB cargados",
    minecraftTitle: "Aplicación 2: Videojuego 3D (Minecraft)",
    minecraftDesc: "Guarda texturas gráficas del entorno tridimensional, audios y posiciones del jugador.",
    minecraftSize: "4.1 GB cargados",
    wordTitle: "Aplicación 3: Editor de Texto (Word)",
    wordDesc: "Retiene los párrafos escritos para el reporte escolar en memoria de trabajo, aguardando guardado definitivo.",
    wordSize: "350 MB cargados",
    activeLabel: "ACTIVO (LIVE)",
    emptyLabel: "BORRADO (0V)",
    emptyValue: "[ VACÍO / --- ]",
    legend: "⚙️ ¡Presione el interruptor de energía ON/OFF de arriba para simular una caída eléctrica!",
    questionTitle: "¿Por qué se califica la RAM como memoria \"volátil\"?",
    questionDesc: "Mientras circulan los 5 Voltios de corriente, los transistores preservan activas las cargas. Al apagarse la placa base, los millones de pequeños condensadores se vacían instantáneamente a tierra (0 voltios) de forma que cualquier avance no grabado explícitamente en el almacenamiento magnético o Flash (SSD/HDD) se desvanece para siempre."
  },
  de: {
    title: "RAM: Volatilität (Flüchtiger Arbeitsspeicher)",
    sub: "Datenhaltung unter Spannung (5V) vs. Ladungsverlust ohne Strom (0V) | Kernarchitektur",
    powerBtnOn: "🔋 Taktstrom an (ON)",
    powerBtnOff: "📴 Stromausfall (OFF)",
    blackoutTitle: "🔌⚠️ STROMAUSFALL (0 VOLT)",
    blackoutDesc: "Sämtliche internen DRAM-Kondensatoren entladen sich schlagartig. Alle aktiven RAM-Arbeitsdaten gehen verloren!",
    chromeTitle: "Anwendung 1: Webbrowser (Chrome)",
    chromeDesc: "Speichert das DOM-Gerüst geöffneter Webseiten, den Tab-Verlauf und geladene Mediendateien.",
    chromeSize: "2,4 GB belegt",
    minecraftTitle: "Anwendung 2: 3D-Videospiel (Minecraft)",
    minecraftDesc: "Hält Grafiktexturen, dreidimensionale Vektordaten, Tonspuren und Spielerkoordinaten im Speicher.",
    minecraftSize: "4,1 GB belegt",
    wordTitle: "Anwendung 3: Textverarbeitung (Word)",
    wordDesc: "Sichert die eingegebenen Zeilen des ungespeicherten Prüfungsberichts bis zum endgültigen HDD/SSD-Schreibvorgang.",
    wordSize: "350 MB belegt",
    activeLabel: "AKTIV (LIVE)",
    emptyLabel: "GELÖSCHT (0V)",
    emptyValue: "[ LEER / --- ]",
    legend: "⚙️ Klicken Sie oben auf den Schalter, um einen Takt- und Stromausfall zu simulieren!",
    questionTitle: "Warum wird der RAM-Speicher als \"flüchtig\" bezeichnet?",
    questionDesc: "Unter anliegender Gleichspannung (5V) halten die Silizium-Baugruppen des DRAMs ihre Ladung aufrecht. Bricht die Stromzufuhr jedoch ab, entladen sich Millionen Mikrokondensatoren innerhalb von Mikrosekunden komplett auf 0 Volt. Alle nicht auf einer SSD oder Magnetschichtfestplatte (HDD) endgültig gespeicherten Nutzdaten gehen unwiderruflich verloren."
  }
};

export default function RamVolatilityDiagram() {
  const { language } = useLanguage();
  const [isPowerOn, setIsPowerOn] = useState<boolean>(true);

  const strings = RAM_V_STRINGS[language] || RAM_V_STRINGS.en || RAM_V_STRINGS.fr;

  const applications = [
    {
      id: "app1",
      name: strings.chromeTitle,
      fr: strings.chromeDesc,
      size: strings.chromeSize,
      colorClass: "bg-blue-600 border-blue-500",
      textColor: "text-blue-500",
      hexColors: "#2563eb"
    },
    {
      id: "app2",
      name: strings.minecraftTitle,
      fr: strings.minecraftDesc,
      size: strings.minecraftSize,
      colorClass: "bg-emerald-600 border-emerald-500",
      textColor: "text-emerald-500",
      hexColors: "#059669"
    },
    {
      id: "app3",
      name: strings.wordTitle,
      fr: strings.wordDesc,
      size: strings.wordSize,
      colorClass: "bg-[#2b579a] border-[#1e3c6c]",
      textColor: "text-[#2b579a]",
      hexColors: "#2b579a"
    }
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-indigo-950/40 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header Panel */}
      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
            {strings.title}
          </h4>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
            {strings.sub}
          </p>
        </div>
        
        {/* INTERACTIVE POWER SWITCH BUTTON */}
        <button
          onClick={() => setIsPowerOn(!isPowerOn)}
          className={`text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-lg border uppercase tracking-wider transition-all cursor-pointer ${
            isPowerOn
              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-200 hover:bg-emerald-200'
              : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border-rose-200 hover:bg-rose-200'
          }`}
        >
          {isPowerOn ? strings.powerBtnOn : strings.powerBtnOff}
        </button>
      </div>

      {/* SVG DRAM Volatile Board Canvas */}
      <div className="relative w-full aspect-[16/10] bg-slate-50/50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center justify-center p-2 overflow-hidden">
        
        {/* Overlays warning indicator */}
        {!isPowerOn && (
          <div className="absolute inset-0 bg-slate-950/35 backdrop-grayscale-xs flex flex-col items-center justify-center pointer-events-none transition-all duration-300 z-10">
            <span className="text-[26px] mb-1">🔌⚠️</span>
            <span className="font-mono text-[10px] font-black text-rose-400 tracking-widest uppercase">
              {strings.blackoutTitle}
            </span>
            <span className="text-[10px] text-white/90 font-medium text-center max-w-[280px] p-2 leading-tight">
              {strings.blackoutDesc}
            </span>
          </div>
        )}

        <svg viewBox="0 0 600 360" className="w-full h-auto select-none font-sans">
          
          {/* SILICON MODULE BARRETTE */}
          <g>
            {/* Green PCB Board */}
            <rect x="50" y="80" width="500" height="200" rx="10" fill="#064e3b" stroke="#047857" strokeWidth="3" />
            
            {/* Golden connection pins at the bottom */}
            <g fill="#f59e0b" opacity="0.9">
              {Array.from({ length: 48 }).map((_, idx) => (
                <rect key={idx} x={65 + idx * 10} y="274" width="4" height="12" rx="1" />
              ))}
            </g>

            {/* Micro tracks on PCB */}
            <path d="M 60,180 H 540" fill="none" stroke="#047857" strokeWidth="2" strokeDasharray="3,3" />
            <path d="M 50,130 H 550" fill="none" stroke="#047857" strokeWidth="1" strokeDasharray="1,5" />
          </g>

          {/* APPLICATION 1 MEMORY CHIP CELL */}
          <g transform="translate(80, 110)">
            <rect
              x="0"
              y="0"
              width="130"
              height="120"
              rx="8"
              fill={isPowerOn ? '#1e293b' : '#334155'}
              stroke={isPowerOn ? '#2563eb' : '#475569'}
              strokeWidth="2.5"
              className="transition-colors"
            />
            {/* Internal bits floating */}
            {isPowerOn ? (
              <g className="transition-all duration-300 animate-fade-in">
                <rect x="5" y="80" width="120" height="32" rx="4" fill="#2563eb" className="opacity-15" />
                <text x="65" y="44" textAnchor="middle" className="font-sans text-[8.5px] fill-blue-400 tracking-wider font-extrabold uppercase">CHROME WEB</text>
                <text x="65" y="65" textAnchor="middle" className="font-mono text-[9px] fill-blue-300 font-extrabold font-bold uppercase">{strings.activeLabel}</text>
                <text x="65" y="100" textAnchor="middle" className="font-mono text-[11px] fill-white animate-pulse">0101 1010</text>
              </g>
            ) : (
              <g className="animate-fade-in">
                <text x="65" y="65" textAnchor="middle" className="font-mono text-[11px] fill-slate-500 font-extrabold">{strings.emptyLabel}</text>
                <text x="65" y="90" textAnchor="middle" className="font-mono text-[8px] fill-slate-500">{strings.emptyValue}</text>
              </g>
            )}
          </g>

          {/* APPLICATION 2 MEMORY CHIP CELL */}
          <g transform="translate(235, 110)">
            <rect
              x="0"
              y="0"
              width="130"
              height="120"
              rx="8"
              fill={isPowerOn ? '#1e293b' : '#334155'}
              stroke={isPowerOn ? '#059669' : '#475569'}
              strokeWidth="2.5"
              className="transition-colors"
            />
            {/* Internal bits floating */}
            {isPowerOn ? (
              <g className="transition-all duration-300 animate-fade-in">
                <rect x="5" y="80" width="120" height="32" rx="4" fill="#059669" className="opacity-15" />
                <text x="65" y="44" textAnchor="middle" className="font-sans text-[8.5px] fill-emerald-400 tracking-wider font-extrabold uppercase">MINECRAFT 3D</text>
                <text x="65" y="65" textAnchor="middle" className="font-mono text-[9px] fill-emerald-300 font-extrabold font-bold uppercase">{strings.activeLabel}</text>
                <text x="65" y="100" textAnchor="middle" className="font-mono text-[11px] fill-white animate-pulse">1100 1101</text>
              </g>
            ) : (
              <g className="animate-fade-in">
                <text x="65" y="65" textAnchor="middle" className="font-mono text-[11px] fill-slate-500 font-extrabold">{strings.emptyLabel}</text>
                <text x="65" y="90" textAnchor="middle" className="font-mono text-[8px] fill-slate-500">{strings.emptyValue}</text>
              </g>
            )}
          </g>

          {/* APPLICATION 3 MEMORY CHIP CELL */}
          <g transform="translate(390, 110)">
            <rect
              x="0"
              y="0"
              width="130"
              height="120"
              rx="8"
              fill={isPowerOn ? '#1e293b' : '#334155'}
              stroke={isPowerOn ? '#b45309' : '#475569'}
              strokeWidth="2.5"
              className="transition-colors"
            />
            {/* Internal bits floating */}
            {isPowerOn ? (
              <g className="transition-all duration-300 animate-fade-in">
                <rect x="5" y="80" width="120" height="32" rx="4" fill="#d97706" className="opacity-15" />
                <text x="65" y="44" textAnchor="middle" className="font-sans text-[8.5px] fill-amber-400 tracking-wider font-extrabold uppercase">MS WORD TEXT</text>
                <text x="65" y="65" textAnchor="middle" className="font-mono text-[9px] fill-amber-300 font-extrabold font-bold uppercase">{strings.activeLabel}</text>
                <text x="65" y="100" textAnchor="middle" className="font-mono text-[11px] fill-white animate-pulse">0011 0001</text>
              </g>
            ) : (
              <g className="animate-fade-in">
                <text x="65" y="65" textAnchor="middle" className="font-mono text-[11px] fill-slate-500 font-extrabold">{strings.emptyLabel}</text>
                <text x="65" y="90" textAnchor="middle" className="font-mono text-[8px] fill-slate-500">{strings.emptyValue}</text>
              </g>
            )}
          </g>
        </svg>

        {/* Legend block */}
        <div className="absolute top-2 left-2 flex items-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border border-slate-100 dark:border-slate-850 rounded-lg px-2.5 py-1 text-[9px] font-sans font-bold text-slate-500 shadow-3xs">
          <span>{strings.legend}</span>
        </div>
      </div>

      {/* Description lists below */}
      <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 rounded-xl space-y-1.5 animate-fade-in">
        <h5 className="text-[11px] font-black uppercase text-slate-800 dark:text-slate-100 font-sans tracking-wide">
          {strings.questionTitle}
        </h5>
        <p className="text-[10.5px] text-slate-600 dark:text-slate-350 leading-relaxed">
          {strings.questionDesc}
        </p>
      </div>
    </div>
  );
}
