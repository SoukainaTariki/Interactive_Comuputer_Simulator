import React, { useState } from 'react';
import { 
  Zap, 
  Cpu, 
  Database, 
  HardDrive, 
  Keyboard, 
  Monitor, 
  Radio, 
  Activity, 
  Waves, 
  Layers, 
  RefreshCw,
  Eye,
  Sliders,
  AlertTriangle
} from 'lucide-react';

interface LanguageProp {
  language: string;
}

// ============================================================================
// 1. GPU DIAGRAM (Graphic Processor & High-Speed VRAM)
// ============================================================================
const GPU_STRINGS: Record<string, any> = {
  ar: {
    headerTitle: "البنية الدقيقة لمعالج الرسوميات (GPU)",
    headerSub: "محاكاة تفاعلية للتوازي الفائق وممرات ذاكرة VRAM",
    tagline: "3D CORE",
    clickTip: "💡 انقر على العناصر البرمجية لفحصها دقيقاً",
    focusTitle: "العضو المحدد للفحص:",
    focusUsage: "مساهمة العضو في اللعب والتصميم:",
    sm: { 
      title: "معالجات متعددة الانسياب (SM)", 
      desc: "مئات الأنوية الصغيرة تعمل بالتوازي لحساب إضاءة وظلال آلاف البكسلات في نفس اللحظة.",
      usage: "تحسب ملايين الإحداثيات الضوئية المتوازية في الزمن الحقيقي."
    },
    vram: { 
      title: "ذاكرة الفيديو الخارقة (VRAM)", 
      desc: "ذاكرة وصول عشوائي سريعة جداً ومخصصة لتخزين القوالب ثلاثية الأبعاد (Textures) وإطارات العرض المؤقتة.",
      usage: "تخزن الخامات المعقدة والصور دون تحميل المعالج الرئيسي."
    },
    pcie: { 
      title: "منفذ PCIe عريض النطاق", 
      desc: "النفق السريع لنقل أوامر الأبعاد الثلاثية من المعالج الرئيسي (CPU) إلى بطاقة الشاشة.",
      usage: "تتحكم في سرعة تبادل حركات تسيير اللعبة بين المعالج والكرت."
    },
    controller: { 
      title: "متحكم الذاكرة الرسومية", 
      desc: "ينظم حركة سيل البيانات الضخم بين أنوية المعالجة وذاكرة VRAM بسرعات فائقة.",
      usage: "تنظم الأولويات للتوصيل العريض لتفادي أي اختناق برمي."
    },
    display: { 
      title: "واجهة إخراج العرض (HDMI/DP)", 
      desc: "تحول مخرجات الإطارات الرقمية المعالجة إلى إشارات فيديو تتدفق مباشرة نحو الشاشة.",
      usage: "تنقل الإطارات النهائية المعدة (Frames) بمعدل تحديث عالٍHz."
    }
  },
  fr: {
    headerTitle: "Micro-architecture Générale d’un GPU",
    headerSub: "Calculs massifs parallèles et tampon vidéo dédié",
    tagline: "3D CORE",
    clickTip: "💡 Cliquez sur un bloc pour l’inspecter.",
    focusTitle: "Bloc en focus :",
    focusUsage: "Usage éducatif :",
    sm: { 
      title: "Multiprocesseurs de Flux (SM)", 
      desc: "Des centaines de mini-cœurs calculant en parallèle l'éclairage et les couleurs de milliers de pixels par seconde.",
      usage: "Calcule instantanément les ombres, rayons lumineux (Ray Tracing) et polygones complexes."
    },
    vram: { 
      title: "Mémoire Vidéo Ultra-Rapide (VRAM)", 
      desc: "Stocke temporairement les textures lourdes 3D et le tampon d'image (Framebuffer) en attente d'affichage.",
      usage: "Permet de charger les textures lourdes d’un jeu vidéo ou d'un rendu 3D de manière directe."
    },
    pcie: { 
      title: "Interface Bus PCI-Express", 
      desc: "Le canal ultra-rapide servant à recevoir les instructions géométriques envoyées par le processeur (CPU).",
      usage: "Définit le goulot d'étranglement de transfert des coordonnées 3D brutes du processeur CPU."
    },
    controller: { 
      title: "Contrôleur de Mémoire", 
      desc: "Arbitre et distribue les gigaoctets de données transférés par seconde entre les cœurs GPU et la mémoire VRAM.",
      usage: "Évite les pertes de temps de latence mémoire d'accès entre les cœurs."
    },
    display: { 
      title: "Moteur d'Affichage (HDMI/DP)", 
      desc: "Génère et transmet le signal vidéo final prêt à être lu par les pixels physiques de l'écran.",
      usage: "Garantit un taux de rafraîchissement élevé (Hz) sans scintillement mécanique."
    }
  },
  en: {
    headerTitle: "General GPU Micro-architecture",
    headerSub: "Massive parallel computations and dedicated video frame buffer",
    tagline: "3D CORE",
    clickTip: "💡 Click a block to inspect its details.",
    focusTitle: "Block in focus:",
    focusUsage: "Educational aspect:",
    sm: { 
      title: "Streaming Multiprocessors (SM)", 
      desc: "Hundreds of highly parallel arithmetic units specialized in calculating pixel shading, lighting and 3D polygon positions.",
      usage: "Instantly calculates lighting variables, shadows, and Ray Tracing vectors."
    },
    vram: { 
      title: "High-Bandwidth Video RAM (VRAM)", 
      desc: "Ultra-fast dedicated storage holding heavy 3D textures, vertex arrays, and the final display framebuffer.",
      usage: "Enables loading heavy assets in video games or 3D render pipelines directly."
    },
    pcie: { 
      title: "PCI-Express Bus Interface", 
      desc: "High-speed motherboard lane that receives coordinates and geometric mesh packets from the main CPU.",
      usage: "Sets the high bandwidth threshold for transfer rate of 3D system variables."
    },
    controller: { 
      title: "Memory Management Unit", 
      desc: "Orchestrates gigabytes of simultaneous data transfers between the GPU compute engines and VRAM.",
      usage: "Eliminates memory access latencies between multiple compute cores."
    },
    display: { 
      title: "Display Engine (HDMI / DP)", 
      desc: "Translates the computed digital frame buffer into raw serial signals for delivery to the monitor screen.",
      usage: "Maintains optimal high refresh rates (Hz) without graphical lag."
    }
  },
  es: {
    headerTitle: "Microarquitectura General del GPU",
    headerSub: "Cálculos matemáticos masivos en paralelo y búfer de video dedicado",
    tagline: "3D CORE",
    clickTip: "💡 Pulse sobre un bloque para inspeccionar sus detalles.",
    focusTitle: "Bloque seleccionado:",
    focusUsage: "Uso educativo:",
    sm: { 
      title: "Multiprocesadores de Flujo (SM)", 
      desc: "Cientos de mini-núcleos geométricos que procesan en paralelo las luces, sombras y colores de millones de polígonos.",
      usage: "Procesa instantáneamente reflejos, rayos lógicos de iluminación (Ray Tracing) y posiciones."
    },
    vram: { 
      title: "Memoria de Video Ultra-Rápida (VRAM)", 
      desc: "Almacenamiento de alta velocidad dedicado a resguardar texturas densas 3D y el búfer de fotogramas activo.",
      usage: "Permite alojar gigas de texturas pesadas evitando estropear el bus principal."
    },
    pcie: { 
      title: "Interfaz de Bus PCI-Express", 
      desc: "Canal de alta velocidad de la placa base diseñado para recibir coordenadas de mallas desde la CPU principal.",
      usage: "Define el límite de ancho de banda para transferir comandos geométricos pesados."
    },
    controller: { 
      title: "Controlador de Memoria de Video", 
      desc: "Administra y arbitra las oleadas masivas de transferencias de datos entre los núcleos gráficos y los bancos de VRAM.",
      usage: "Optimiza los accesos de datos simultáneos para prevenir picos de latencia."
    },
    display: { 
      title: "Motor de Pantalla (HDMI / DP)", 
      desc: "Modula y transmite la señal de video final lista para su despliegue físico por los píxeles del monitor.",
      usage: "Asegura tasas de refresco elevadas (Hz) y estables en tiempo real."
    }
  },
  de: {
    headerTitle: "Grafikprozessor-Mikroarchitektur (GPU)",
    headerSub: "Massiv parallele Berechnungen und dedizierter Videospeicher (VRAM)",
    tagline: "3D CORE",
    clickTip: "💡 Klicken Sie auf einen Block, um Details anzuzeigen.",
    focusTitle: "Fokusierter Block:",
    focusUsage: "Anwendung & Nutzen:",
    sm: { 
      title: "Streaming-Multiprozessoren (SM)", 
      desc: "Hunderte paralleler Rechenwerke, spezialisiert auf die Berechnung von Shadern, Beleuchtungen und Polygonen.",
      usage: "Berechnet instantan Render-Modelle, Beleuchtungen (Ray Tracing) und Geometrien parallel."
    },
    vram: { 
      title: "Videospeicher mit hoher Bandbreite (VRAM)", 
      desc: "Spezialspeicher, der Texturen, Vertex-Vektoren und den Framebuffer für die Bildschirmausgabe bereithält.",
      usage: "Ermöglicht direktes Laden von hochauflösenden Texturen und Bildfolgen."
    },
    pcie: { 
      title: "PCI-Express Bus-Schnittstelle", 
      desc: "Die direkte superschnelle Mainboard-Verbindung zur Entgegennahme von Berechnungen durch die CPU.",
      usage: "Markiert das Transferlimit für rohe 3D-Koordinaten aus der Hauptplatine."
    },
    controller: { 
      title: "Grafik-Speicher-Controller", 
      desc: "Steuert und synchronisiert massive Datentransfers zwischen den Rechenkernen und Speicherbänken.",
      usage: "Verhindert Zugriffsverzögerungen und sorgt für eine gleichmäßige Frame-Dichte."
    },
    display: { 
      title: "Display-Engine (HDMI / DP)", 
      desc: "Wandelt berechnete Grafikpuffer in serielle Videosignale für das Display um.",
      usage: "Sichert hohe Bildwiederholraten (Hz) ohne mechanisches Bildflackern."
    }
  }
};

export function GpuDiagram({ language }: LanguageProp) {
  const [activeSegment, setActiveSegment] = useState<string>('sm');

  const strings = GPU_STRINGS[language] || GPU_STRINGS.en || GPU_STRINGS.fr;

  const getTranslation = (key: 'sm' | 'vram' | 'pcie' | 'controller' | 'display') => {
    return strings[key];
  };

  return (
    <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-5 space-y-5 shadow-inner">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-sm font-black text-rose-400 uppercase tracking-wide flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-500" />
            <span>{strings.headerTitle}</span>
          </h4>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5">
            {strings.headerSub}
          </p>
        </div>
        <span className="text-[9px] bg-rose-950/40 text-rose-400 font-mono font-bold px-2 rounded-full border border-rose-500/10">{strings.tagline}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Interactive SVG Diagram (md:col-span-8) */}
        <div className="md:col-span-8 bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 relative flex items-center justify-center">
          <svg viewBox="0 0 500 320" className="w-full h-auto">
            {/* PCIe Bus block */}
            <g 
              onClick={() => setActiveSegment('pcie')}
              className="cursor-pointer group"
            >
              <rect x="20" y="260" width="160" height="40" rx="8" fill={activeSegment === 'pcie' ? '#f43f5e' : '#1e293b'} stroke="#f43f5e" strokeWidth={activeSegment === 'pcie' ? "2" : "1"} />
              <text x="100" y="285" textAnchor="middle" className="font-mono text-xs fill-white font-bold group-hover:fill-rose-350">PCI-Express 4.0/5.0</text>
            </g>

            {/* HDMI Out Block */}
            <g 
              onClick={() => setActiveSegment('display')}
              className="cursor-pointer group"
            >
              <rect x="360" y="260" width="120" height="40" rx="8" fill={activeSegment === 'display' ? '#f43f5e' : '#1e293b'} stroke="#f43f5e" strokeWidth={activeSegment === 'display' ? "2" : "1"} />
              <text x="420" y="285" textAnchor="middle" className="font-mono text-xs fill-white font-bold group-hover:fill-rose-350">HDMI / DP Out</text>
            </g>

            {/* VRAM bank Left */}
            <g 
              onClick={() => setActiveSegment('vram')}
              className="cursor-pointer group"
            >
              <rect x="25" y="40" width="120" height="180" rx="12" fill={activeSegment === 'vram' ? '#e11d48' : '#0f172a'} stroke="#f43f5e" strokeWidth="1.5" />
              <text x="85" y="125" textAnchor="middle" className="font-bold text-xs fill-white uppercase tracking-wider">VRAM</text>
              <text x="85" y="145" textAnchor="middle" className="font-mono text-[9px] fill-rose-300">GDDR6 / HBM</text>
              {/* Stack effect */}
              <rect x="35" y="160" width="10" height="30" fill="#f43f5e" opacity="0.7" />
              <rect x="50" y="160" width="10" height="30" fill="#f43f5e" opacity="0.7" />
              <rect x="65" y="160" width="10" height="30" fill="#f43f5e" opacity="0.7" />
              <rect x="80" y="160" width="10" height="30" fill="#f43f5e" opacity="0.7" />
            </g>

            {/* GPU Core (Middle) */}
            <g 
              onClick={() => setActiveSegment('sm')}
              className="cursor-pointer group"
            >
              <rect x="180" y="40" width="160" height="180" rx="16" fill={activeSegment === 'sm' ? '#f43f5e' : '#1e1b4b'} stroke="#e11d48" strokeWidth="2" />
              <text x="260" y="70" textAnchor="middle" className="font-bold text-xs fill-rose-100 uppercase tracking-widest">GPU CORE</text>
              
              {/* Multiprocessors grid inside core */}
              <rect x="195" y="90" width="30" height="30" rx="4" fill="#312e81" stroke="#f43f5e" />
              <rect x="230" y="90" width="30" height="30" rx="4" fill="#312e81" stroke="#f43f5e" />
              <rect x="265" y="90" width="30" height="30" rx="4" fill="#312e81" stroke="#f43f5e" />
              <rect x="300" y="90" width="30" height="30" rx="4" fill="#312e81" stroke="#f43f5e" />

              <rect x="195" y="125" width="30" height="30" rx="4" fill="#312e81" stroke="#f43f5e" />
              <rect x="230" y="125" width="30" height="30" rx="4" fill="#f43f5e" stroke="#fff" />
              <rect x="265" y="125" width="30" height="30" rx="4" fill="#f43f5e" stroke="#fff" />
              <rect x="300" y="125" width="30" height="30" rx="4" fill="#312e81" stroke="#f43f5e" />

              <rect x="195" y="160" width="30" height="30" rx="4" fill="#312e81" stroke="#f43f5e" />
              <rect x="230" y="160" width="30" height="30" rx="4" fill="#312e81" stroke="#f43f5e" />
              <rect x="265" y="160" width="30" height="30" rx="4" fill="#312e81" stroke="#f43f5e" />
              <rect x="300" y="160" width="30" height="30" rx="4" fill="#312e81" stroke="#f43f5e" />

              <text x="260" y="205" textAnchor="middle" className="font-mono text-[9px] fill-white opacity-80">SM GRID (Cores)</text>
            </g>

            {/* Graphic Memory Controller block inside */}
            <g
              onClick={() => setActiveSegment('controller')}
              className="cursor-pointer group"
            >
              <rect x="155" y="100" width="15" height="60" rx="4" fill={activeSegment === 'controller' ? '#f43f5e' : '#334155'} stroke="#475569" />
              <text x="162" y="135" textAnchor="middle" transform="rotate(-90 162 135)" className="font-bold text-[8px] fill-white uppercase font-sans">Ctrl</text>
            </g>

            {/* Connection Arrows/Buses */}
            {/* Bus VRAM <-> GPU Core */}
            <path d="M 145 130 L 155 130" stroke="#f43f5e" strokeWidth="2" fill="none" />
            <path d="M 170 130 L 180 130" stroke="#f43f5e" strokeWidth="2" fill="none" />
            
            {/* PCIe to GPU Core */}
            <path d="M 100 260 L 100 240 L 260 240 L 260 220" stroke="#f43f5e" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />

            {/* GPU Core to Display */}
            <path d="M 340 130 L 420 130 L 420 260" stroke="#f43f5e" strokeWidth="1.5" fill="none" />
          </svg>
          
          <div className="absolute bottom-2 left-2 text-[8px] font-mono opacity-50">
            {strings.clickTip}
          </div>
        </div>

        {/* Informational Sidebar (md:col-span-4) */}
        <div className="md:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-inner">
          <div className="space-y-1">
            <span className="text-[10px] text-rose-400 font-black tracking-widest font-mono uppercase block">
              {strings.focusTitle}
            </span>
            <h5 className="text-sm font-extrabold text-white">
              {getTranslation(activeSegment as any).title}
            </h5>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-semibold">
            {getTranslation(activeSegment as any).desc}
          </p>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-850 space-y-2">
            <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider font-mono">
              {strings.focusUsage}
            </span>
            <div className="flex gap-2 items-start text-rose-200">
              <Zap className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
              <span className="font-medium leading-relaxed">
                {getTranslation(activeSegment as any).usage}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. ROM DIAGRAM (Permanent Memory / BIOS Startup)
// ============================================================================
const ROM_STRINGS: Record<string, any> = {
  ar: {
    title: "الذاكرة الميتة ومحاكاة إقلاع الحاسوب (ROM / BIOS)",
    sub: "تجسيد ديناميكي لخطوات الإقلاع الأولية المخزنة دائمياً",
    bootBtnSimulate: "محاكاة الإقلاع",
    bootBtnLoading: "جاري الفحص...",
    liveRead: "⚡ جاري قراءة كود التأسيس المدمج:",
    liveSuccess: "● نظام الفيرموير جاهز ومحمي بالكامل",
    liveDesc: "البيانات آمنة ولا يمكن مسحها بانقطاع الكهرباء.",
    tagline: "BIOS EEPROM",
    stepsTitle: "مراحل ومسارات الإقلاع الأربعة:",
    steps: [
      "توليد النبضة الكهربائية الأولى عند تشغيل زر الطاقة الرئيسي (Power On).",
      "قراءة أول تعليمة ثابتة مخزنة في الذاكرة الميتة ROM (عنوان التشغيل الرئيسي).",
      "بدء فحص الذات الميكانيكي وعرض الخصائص الأساسية للقطع (POST Test).",
      "تسليم القيادة للقرص الصلب لإقلاع نظام التشغيل الرئيسي (Windows/Linux) بنجاح."
    ]
  },
  fr: {
    title: "Mémoire Morte & Cycle de Boot (ROM / BIOS)",
    sub: "Algorithme permanent inaltérable de démarrage machine",
    bootBtnSimulate: "Simuler le Démarrage",
    bootBtnLoading: "Boot en cours...",
    liveRead: "⚡ LECTURE DES ADRESSES ROM :",
    liveSuccess: "● EXÉCUTION INTÈGRE PRÊTE",
    liveDesc: "Le code résiste indéfiniment sans aucune alimentation.",
    tagline: "BIOS EEPROM",
    stepsTitle: "Les 4 Étapes de l’Éveil Électrique :",
    steps: [
      "Émission de la tension d'allumage par la carte mère (Power-On signal).",
      "Lecture de la toute première ligne d'instruction gravée à demeure dans l'EEPROM ROM.",
      "Lancement du test d'autodiagnostic matériel général complet (POST - Power On Self Test).",
      "Le BIOS trouve le secteur d'amorçage sur le SSD/HDD et lui cède le contrôle global."
    ]
  },
  en: {
    title: "Permanent Memory & Boot Cycle (ROM / BIOS)",
    sub: "Unalterable firmware algorithm stored physically to system startup",
    bootBtnSimulate: "Simulate Startup",
    bootBtnLoading: "Booting...",
    liveRead: "⚡ FETCHING ROM CODE ADDRESSES:",
    liveSuccess: "● BOOT CELL INTEGRITY VERIFIED",
    liveDesc: "Instruction parameters persist forever without electrical backup.",
    tagline: "BIOS EEPROM",
    stepsTitle: "The four steps of cold start startup:",
    steps: [
      "Power button is pressed, sending a master hardware voltage to all motherboard lines.",
      "CPU runs its hardwired code reset vector, fetching first master instruction in ROM.",
      "BIOS routine launches the POST (Power-On Self-Test) checking RAM, CPU and Keyboards.",
      "Bootstrap loader locates the OS loading track (MBR/GPT) on storage drive & hands over."
    ]
  },
  es: {
    title: "Memoria Muerta y Ciclo de Arranque (ROM / BIOS)",
    sub: "Algoritmo firmware inalterable pre-grabado para iniciar el ordenador",
    bootBtnSimulate: "Simular Arranque",
    bootBtnLoading: "Arrancando...",
    liveRead: "⚡ LEYENDO DIRECCIONES DE ROM COLD:",
    liveSuccess: "● FIRMWARE INTEGRO PRE-CUBIERTO",
    liveDesc: "Las instrucciones permanecen inmutables sin suministro eléctrico.",
    tagline: "BIOS EEPROM",
    stepsTitle: "Las 4 Etapas del Despertar Eléctrico:",
    steps: [
      "Presión del botón de encendido que despacha carga a los circuitos de la placa.",
      "La CPU levanta su vector de reinicio y lee la primera instrucción grabada en la ROM.",
      "Inicia la rutina del BIOS POST para someter a autodiagnóstico el hardware básico.",
      "El gestor encuentra el sector cargador del SO en el SSD/HDD y le cede el control."
    ]
  },
  de: {
    title: "Festspeichertyp & Systemstart (ROM / BIOS)",
    sub: "Dauerhafter und unveränderlicher Firmware-Algorithmus zum PC-Start",
    bootBtnSimulate: "Arranque simulieren",
    bootBtnLoading: "Bootvorgang...",
    liveRead: "⚡ LESE INTEGRALE ROM-ZEIGERADRESSEN:",
    liveSuccess: "● BOOTSTRAP-ROUTINE VOLLSTÄNDIG BEREIT",
    liveDesc: "Der Programmcode überdauert gänzlich ohne Betriebsspannung.",
    tagline: "BIOS EEPROM",
    stepsTitle: "Die 4 Phasen des Kaltstart-Weckrufs:",
    steps: [
      "Betätigung des Netzschalters versetzt die Hauptplatine unter Betriebsspannung.",
      "Der CPU-Resetvektor springt an und holt den ersten Befehl direkt aus dem ROM.",
      "Start der POST-Routine (Power On Self Test) zur Überprüfung wichtiger Hardware.",
      "Der Boot-Loader findet die System-Sektoren auf SSD/HDD und übergibt die Kontrolle."
    ]
  }
};

export function RomDiagram({ language }: LanguageProp) {
  const [booting, setBooting] = useState(false);
  const [step, setStep] = useState(0);

  const strings = ROM_STRINGS[language] || ROM_STRINGS.en || ROM_STRINGS.fr;

  const triggerBoot = () => {
    if (booting) return;
    setBooting(true);
    setStep(0);
    const intervals = [1000, 2500, 4200, 5800];
    
    intervals.forEach((t, i) => {
      setTimeout(() => {
        setStep(i + 1);
        if (i === intervals.length - 1) {
          setBooting(false);
        }
      }, t);
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-5 space-y-5 shadow-inner">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-sm font-black text-cyan-400 uppercase tracking-wide flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-500 animate-pulse" />
            <span>{strings.title}</span>
          </h4>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5">
            {strings.sub}
          </p>
        </div>
        <button 
          onClick={triggerBoot}
          disabled={booting}
          className={`text-[10px] font-bold px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
            booting ? 'bg-amber-900/40 border-amber-500/20 text-amber-400 cursor-not-allowed' : 'bg-cyan-950/40 border-cyan-500/20 text-cyan-400 hover:border-cyan-500/50 cursor-pointer hover:bg-cyan-900/35'
          }`}
        >
          <RefreshCw className={`w-3 h-3 ${booting ? 'animate-spin' : ''}`} />
          <span>{booting ? strings.bootBtnLoading : strings.bootBtnSimulate}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Interactive Visual Graphic */}
        <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-850 relative flex flex-col items-center justify-center min-h-[220px]">
          {/* ROM Chip SVG */}
          <svg viewBox="0 0 200 150" className="w-[160px] h-auto">
            {/* Chip base */}
            <rect x="20" y="20" width="160" height="90" rx="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
            <circle cx="35" cy="35" r="4" fill="#06b6d4" /> {/* pin 1 marker */}
            
            {/* Pins */}
            <rect x="40" y="10" width="10" height="10" fill="#94a3b8" />
            <rect x="70" y="10" width="10" height="10" fill="#94a3b8" />
            <rect x="100" y="10" width="10" height="10" fill="#94a3b8" />
            <rect x="130" y="10" width="10" height="10" fill="#94a3b8" />
            
            <rect x="40" y="110" width="10" height="10" fill="#94a3b8" />
            <rect x="70" y="110" width="10" height="10" fill="#94a3b8" />
            <rect x="100" y="110" width="10" height="10" fill="#94a3b8" />
            <rect x="130" y="110" width="10" height="10" fill="#94a3b8" />

            <text x="100" y="65" textAnchor="middle" className="font-mono text-xs fill-cyan-400 font-black tracking-widest">BIOS ROM</text>
            <text x="100" y="85" textAnchor="middle" className="font-sans text-[8px] fill-slate-400 font-bold tracking-wider">NON-VOLATILE EEPROM</text>

            {/* Glowing lines during boot */}
            {booting && (
              <line x1="30" y1="130" x2="170" y2="130" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5 5" className="animate-pulse" />
            )}
          </svg>

          {/* Real-time boot status monitor */}
          <div className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-lg mt-3 text-center min-h-[50px] flex flex-col justify-center">
            {booting ? (
              <div className="space-y-1.5 animate-pulse">
                <span className="text-[10px] text-amber-400 font-bold uppercase font-mono block">
                  {strings.liveRead}
                </span>
                <span className="text-xs font-mono font-bold text-slate-100">
                  {step === 0 && "0x000FF000: INIT VECTORS"}
                  {step === 1 && "0x000FF042: CPU CORES CHECK"}
                  {step === 2 && "0x000FF0F0: MEMORY BANK DETECT"}
                  {step === 3 && "0x000FF1FC: INT13h BOOTSTRAP"}
                </span>
              </div>
            ) : (
              <div className="space-y-0.5">
                <span className="text-[9px] text-emerald-450 text-emerald-400 font-black block uppercase tracking-widest font-mono">
                  {strings.liveSuccess}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {strings.liveDesc}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Steps description list */}
        <div className="space-y-3">
          <span className="text-[10px] text-cyan-400 font-black tracking-widest uppercase font-mono block">
            {strings.stepsTitle}
          </span>

          <div className="space-y-2.5">
            {strings.steps.map((st: string, i: number) => {
              const isCurrent = booting && step === i;
              const isPassed = !booting || step > i;
              return (
                <div 
                  key={i}
                  className={`p-2.5 rounded-xl border text-xs transition-all duration-300 flex gap-2.5 items-center ${
                    isCurrent 
                      ? 'bg-amber-950/30 border-amber-500/40 text-amber-200 ring-1 ring-amber-500/20' 
                      : isPassed && booting
                        ? 'bg-slate-900 border-emerald-950/50 text-slate-400'
                        : 'bg-slate-900 border-slate-850 text-slate-300'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono font-black shrink-0 ${
                    isCurrent 
                      ? 'bg-amber-500 text-slate-950' 
                      : isPassed && booting
                        ? 'bg-emerald-900/50 text-emerald-400'
                        : 'bg-slate-800 text-slate-400'
                  }`}>
                    {i + 1}
                  </span>
                  <p className="font-semibold leading-relaxed flex-grow">{st}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. SSD DIAGRAM (Solid State Drive / Flash NAND Cells)
// ============================================================================
const SSD_STRINGS: Record<string, any> = {
  ar: {
    title: "الذاكرة الصلبة الحديثة ومتحكم SSD",
    sub: "حركات الكهرباء في بوابات فلاش ناند المعزولة",
    btnRead: "قـــراءة (Read)",
    btnWrite: "كـتـابـة (Write)",
    microActivity: "النشاط الفيزيائي للمتحكم:",
    techTitle: "مميزات تقنية NAND Flash:",
    techDesc: "انعدام القطع المتحركة يجعل معدل تلف البيانات ميكانيكياً شبه مستحيل.",
    desc: {
      idle: "انقر فوق قراءة أو كتابة لرصد كهرباء بوابات الخلايا المعزولة.",
      read: "المتحكم يرسل تيار كشفي منخفض عبر الأسطر لرصد شحنات البوابات وتوليد الثنائيات 0 و 1.",
      write: "شحن بوابات الخلايا العائمة بجهد عالي لحبس الإلكترونات في شبكة السيليكون لحفظ الملفات بشكل دائم."
    }
  },
  fr: {
    title: "Fonctionnement Interne d’un Disque SSD",
    sub: "Transistors à grille flottante retenant les charges permanentes",
    btnRead: "LIRE",
    btnWrite: "ÉCRIRE",
    microActivity: "Activité électronique :",
    techTitle: "Atout technologique SSD :",
    techDesc: "L'absence de pièces en mouvement élimine toute usure et latence mécanique.",
    desc: {
      idle: "Cliquez sur LIRE ou ÉCRIRE pour visualiser la physique électrique des cellules NAND.",
      read: "Le contrôleur applique une tension faible pour tester la présence d'électrons piégés, sans effacer.",
      write: "Des impulsions à haute tension injectent des électrons à travers un isolant pour graver les bits."
    }
  },
  en: {
    title: "Solid State Drive Inner Working (SSD)",
    sub: "Transistors holding permanent silicon electrical charges safely",
    btnRead: "READ",
    btnWrite: "WRITE",
    microActivity: "Silicon Activity:",
    techTitle: "NAND Flash tech advantage:",
    techDesc: "No moving parts means no mechanical friction or wear ever.",
    desc: {
      idle: "Click READ or WRITE to trigger simulated microscopic cell flash activities.",
      read: "Controller sends low-level sensory voltage reading trapped electrons state without leaking.",
      write: "High voltage pulses inject and encapsulate electrons inside isolated floating gate arrays."
    }
  },
  es: {
    title: "Funcionamiento de un Disco SSD",
    sub: "Transistores de compuerta flotante sosteniendo cargas permanentes",
    btnRead: "LEER",
    btnWrite: "ESCRIBIR",
    microActivity: "Actividad electrónica:",
    techTitle: "Ventaja tecnológica de Flash NAND:",
    techDesc: "La ausencia de piezas mecánicas en fricción elimina desgastes físicos y latencias.",
    desc: {
      idle: "Presione LEER o ESCRIBIR para visualizar el comportamiento cuántico de las celdas.",
      read: "El controlador despliega baja tensión buscando atrapar el estado del electrón sin consumirlo.",
      write: "Impulsos lógicos inyectan cargas de alta tensión a través de un aislante de silicio."
    }
  },
  de: {
    title: "Funktionsweise einer SSD (Solid State Drive)",
    sub: "Transistoren mit Floating-Gate zur permanenten Ladungssicherung",
    btnRead: "LESEN",
    btnWrite: "SCHREIBEN",
    microActivity: "Elektrische Aktivität:",
    techTitle: "NAND-Flash Technologievorteil:",
    techDesc: "Das Fehlen beweglicher Verschleißteile minimiert Ausfälle und mechanische Wartezeiten.",
    desc: {
      idle: "Klicken Sie auf LESEN oder SCHREIBEN zur Simulation mikroskopischer Schaltaktivitäten.",
      read: "Die Steuereinheit misst mit niedriger Spannung, ob Elektronen im Gate gefangen sind.",
      write: "Impulse mit hoher Spannung schießen Elektronen durch die Grenzschicht zur Datengravur."
    }
  }
};

export function SsdDiagram({ language }: LanguageProp) {
  const [opMode, setOpMode] = useState<'idle' | 'read' | 'write'>('idle');

  const strings = SSD_STRINGS[language] || SSD_STRINGS.en || SSD_STRINGS.fr;

  const getDesc = () => {
    return strings.desc[opMode];
  };

  return (
    <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-5 space-y-5 shadow-inner">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-sm font-black text-emerald-400 uppercase tracking-wide flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-emerald-500" />
            <span>{strings.title}</span>
          </h4>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5">
            {strings.sub}
          </p>
        </div>
        <div className="flex gap-1.5 shadow-2xs">
          <button 
            onClick={() => {
              setOpMode('read');
              setTimeout(() => setOpMode('idle'), 2500);
            }}
            className={`text-[9px] font-black px-2.5 py-1 rounded-md border uppercase font-mono transition-all duration-200 cursor-pointer ${
              opMode === 'read' ? 'bg-sky-950 border-sky-500 text-sky-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {strings.btnRead}
          </button>
          <button 
            onClick={() => {
              setOpMode('write');
              setTimeout(() => setOpMode('idle'), 2500);
            }}
            className={`text-[9px] font-black px-2.5 py-1 rounded-md border uppercase font-mono transition-all duration-200 cursor-pointer ${
              opMode === 'write' ? 'bg-amber-950 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {strings.btnWrite}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Memory Grid Animation Area (md:col-span-7) */}
        <div className="md:col-span-7 bg-slate-950/80 rounded-2xl p-4 border border-slate-850 flex flex-col items-center">
          <div className="grid grid-cols-4 gap-2.5 w-full max-w-[280px]">
            {/* Create 16 cells simulating flash logic */}
            {Array.from({ length: 16 }).map((_, i) => {
              let cellColor = 'bg-slate-850 border-slate-800';
              if (opMode === 'read') {
                cellColor = i % 3 === 0 ? 'bg-sky-900/60 border-sky-500 text-sky-300 animate-pulse' : 'bg-slate-850 border-slate-800';
              } else if (opMode === 'write') {
                cellColor = i % 2 === 0 ? 'bg-amber-900/50 border-amber-500 text-amber-300 transition-all scale-102' : 'bg-slate-850 border-slate-800';
              }
              return (
                <div 
                  key={i} 
                  className={`aspect-square rounded-xl border flex flex-col items-center justify-center font-mono text-[9px] transition-all duration-300 ${cellColor}`}
                >
                  <span className="font-extrabold">{i % 2 === 0 ? '1' : '0'}</span>
                  <span className="text-[6px] opacity-40">Cell{i+1}</span>
                </div>
              );
            })}
          </div>

          <div className="w-full h-1 bg-slate-800 rounded-full mt-4 overflow-hidden relative">
            {opMode === 'read' && <div className="absolute top-0 bottom-0 left-0 right-0 bg-sky-500 animate-loadingLine"></div>}
            {opMode === 'write' && <div className="absolute top-0 bottom-0 left-0 right-0 bg-amber-500 animate-loadingLine"></div>}
          </div>
        </div>

        {/* Info Area (md:col-span-5) */}
        <div className="md:col-span-5 space-y-4 font-sans text-xs">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider font-mono">
              {strings.microActivity}
            </span>
            <div className="flex gap-2 items-center">
              <span className={`w-2.5 h-2.5 rounded-full ${
                opMode === 'idle' ? 'bg-slate-500' : opMode === 'read' ? 'bg-sky-500 animate-ping' : 'bg-amber-500 animate-ping'
              }`}></span>
              <span className="font-bold text-slate-200 uppercase font-mono">
                {opMode.toUpperCase()}
              </span>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed font-semibold min-h-[50px]">
            {getDesc()}
          </p>

          <div className="bg-slate-900/90 border border-slate-850 p-3.5 rounded-xl space-y-1">
            <span className="text-[9px] uppercase font-bold text-emerald-400 block tracking-wider font-mono">
              {strings.techTitle}
            </span>
            <span className="text-[11px] text-slate-400 leading-relaxed block animate-fade-in">
              {strings.techDesc}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. HDD DIAGRAM (Hard Disk Drive / Magnetic Platter & Arm)
// ============================================================================
const HDD_STRINGS: Record<string, any> = {
  ar: {
    title: "القرص الصلب الميكانيكي (HDD)",
    sub: "تجسيد الأقراص الدوارة المغناطيسية وذراع القراءة المذبذبة",
    btnSpin: "تشغيل المحرك",
    btnSpinning: "...جاري الدوران",
    spinStatusActive: "⚡ 7200 دورة/دقيقة - جاري تحريك رأس القراءة",
    spinStatusIdle: "المحرك ساكن - الرأس في منطقة الهبوط الآمن",
    macMechanism: "آلية الحفظ الميكانيكي:",
    macDesc: "تنظم البيانات في مسارات دائرية مقسمة إلى قطاعات (Sectors) على طبقة مغناطيسية رقيقة جداً.",
    warningTitle: "تحذير ميكانيكي:",
    warningDesc: "الحركة الميكانيكية تجعله حساساً جداً للاهتزازات والضربات أثناء التشغيل."
  },
  fr: {
    title: "Physique Magnétique d’un Disque HDD",
    sub: "Plateaux ferromagnétiques en rotation et tête de lecture",
    btnSpin: "Faire tourner",
    btnSpinning: "MOTEUR ACTIF",
    spinStatusActive: "⚡ RPM: 7200 | RECHERCHE DU SECTEUR PHYSIQUE",
    spinStatusIdle: "Moteur éteint - Tête de lecture en veille.",
    macMechanism: "Nature du stockage magnétique :",
    macDesc: "Les données sont stockées sous forme d'orientation magnétique de particules microscopiques de fer.",
    warningTitle: "Frétillement micrométrique :",
    warningDesc: "Sa fragilité découle du fait que la tête mécanique flotte à seulement quelques nanomètres du plateau."
  },
  en: {
    title: "Magnetic Physics of a Hard Disk Drive (HDD)",
    sub: "Rotating magnetic platters and micro actuator arm reading tracks",
    btnSpin: "Spin Platters",
    btnSpinning: "MOTOR ACTIVE",
    spinStatusActive: "⚡ RPM: 7200 | SCANNING MAG-PHYSICAL PLATTERS",
    spinStatusIdle: "Motor stopped - Actuator head parked in safe zone.",
    macMechanism: "Magnetic Data Storage Way:",
    macDesc: "Data is physically recorded as custom orientation indexes of ferromagnetic particles.",
    warningTitle: "Fragility Warning:",
    warningDesc: "Fragility stems from the read/write tip floating merely nanometers above spinning platters."
  },
  es: {
    title: "Física Magnética de un Disco Duro HDD",
    sub: "Platos ferromagnéticos en revolución y servomotor de aguja",
    btnSpin: "Girar Platos",
    btnSpinning: "MOTOR ACTIVO",
    spinStatusActive: "⚡ RPM: 7200 | RASTREANDO SECTORES FÍSICOS",
    spinStatusIdle: "Motor detenido - Aguja aparcada de forma segura.",
    macMechanism: "Almacenamiento Magnético:",
    macDesc: "Los datos se graban como orientaciones de micro-partículas polares de hierro sobre el disco.",
    warningTitle: "Advertencia Mecánica:",
    warningDesc: "Su fragilidad se debe a que la cabeza lectora vuela a pocos nanómetros del plato giratorio."
  },
  de: {
    title: "Mechanischer Magnetschichtspeicher (HDD)",
    sub: "Rotierende Magnetscheiben und mechanischer Lese-/Schreibarm",
    btnSpin: "Platten drehen",
    btnSpinning: "MOTOR ROTIERT",
    spinStatusActive: "⚡ RPM: 7200 | POSITIONIERE AKTIV AUF SPURSEKTOR",
    spinStatusIdle: "Motor aus - Schreibkopf befindet sich geparkt.",
    macMechanism: "Magnetische Haltung:",
    macDesc: "Daten werden als polare Feldlinien-Ausrichtungen winziger Eisenpartikel permanent gesichert.",
    warningTitle: "Mechanischer Nachteil:",
    warningDesc: "Die Empfindlichkeit rührt vom extrem kleinen Luftspalt zwischen Platten und Lesekopf (Nanometerbereich)."
  }
};

export function HddDiagram({ language }: LanguageProp) {
  const [spinning, setSpinning] = useState(false);

  const strings = HDD_STRINGS[language] || HDD_STRINGS.en || HDD_STRINGS.fr;

  const triggerSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setTimeout(() => setSpinning(false), 4500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-5 space-y-5 shadow-inner">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-sm font-black text-amber-500 uppercase tracking-wide flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-500" />
            <span>{strings.title}</span>
          </h4>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5">
            {strings.sub}
          </p>
        </div>
        <button 
          onClick={triggerSpin}
          disabled={spinning}
          className={`text-[9px] font-black px-2.5 py-1 rounded-md border uppercase font-mono transition-all cursor-pointer ${
            spinning ? 'bg-rose-950/40 border-rose-500/10 text-rose-400 cursor-not-allowed' : 'bg-amber-950/40 border-amber-500/20 text-amber-400 hover:border-amber-500/50'
          }`}
        >
          {spinning ? strings.btnSpinning : strings.btnSpin}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Interactive mechanical platter */}
        <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-850 flex flex-col items-center justify-center relative min-h-[200px]">
          <svg viewBox="0 0 200 200" className="w-[170px] h-auto">
            {/* Platter base */}
            <circle 
              cx="100" 
              cy="100" 
              r="75" 
              fill="#334155" 
              stroke="#64748b" 
              strokeWidth="2.5" 
              className={spinning ? 'animate-spin origin-center duration-300' : ''} 
              style={{ transformOrigin: '100px 100px' }}
            />
            {/* Magnetic tracks circle */}
            <circle cx="100" cy="100" r="55" fill="none" stroke="#475569" strokeDasharray="6,4" />
            <circle cx="100" cy="100" r="35" fill="none" stroke="#475569" strokeDasharray="4,6" />
            <circle cx="100" cy="100" r="15" fill="#1e293b" stroke="#334155" />

            {/* Actuator shaft */}
            <circle cx="160" cy="40" r="12" fill="#475569" stroke="#94a3b8" />
            <circle cx="160" cy="40" r="4" fill="#cbd5e1" />

            {/* Actuator arm and read/write head */}
            <path 
              d="M 160 40 L 110 95 L 98 102" 
              stroke="#64748b" 
              strokeWidth="4" 
              fill="none" 
              className={spinning ? 'animate-bounce origin-[160px_40px]' : ''}
              style={{ transformOrigin: '160px 40px' }}
            />
            {/* Reading Head tip */}
            <rect x="94" y="98" width="8" height="8" fill="#e2e8f0" rx="1" />
          </svg>

          {/* Real-time status display */}
          <div className="mt-3 text-center">
            {spinning ? (
              <span className="text-amber-500 font-mono text-[10px] font-black animate-pulse block">
                {strings.spinStatusActive}
              </span>
            ) : (
              <span className="text-slate-400 text-[10px] font-bold block">
                {strings.spinStatusIdle}
              </span>
            )}
          </div>
        </div>

        {/* Educational details */}
        <div className="space-y-4 font-sans text-xs">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest font-mono">
              {strings.macMechanism}
            </span>
            <p className="text-slate-300 leading-relaxed font-semibold animate-fade-in">
              {strings.macDesc}
            </p>
          </div>

          <div className="bg-slate-950/40 p-3.5 border border-slate-850 rounded-xl space-y-2">
            <div className="flex gap-2 items-start text-rose-300">
              <AlertTriangle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
              <span className="leading-relaxed font-semibold animate-fade-in">
                <strong className="text-rose-450 mr-1">{strings.warningTitle}</strong> {strings.warningDesc}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5. INPUT DEVICES DIAGRAM (Encoders / Keystroke to Binary)
// ============================================================================
const INPUT_DEV_STRINGS: Record<string, any> = {
  ar: {
    title: "ترميز البيانات ووحدات الإدخال",
    sub: "رصد فيزيائي للمؤثر الخارجي وتحويله إلى كود كهربائي ثنائي",
    btnKey: "ضغط لوحة المفاتيح",
    btnMouse: "حركة الفأرة الضوئية",
    btnMic: "موجات الصوت (ميكروفون)",
    pathwayTitle: "تحويل الحدث التفاعلي :",
    mechanismTitle: "تسلسل المعالجة الميكروسكوبية:",
    data: {
      key: { input: "ضغطة التلميذ على الحرف 'A'", binary: "01000001", steps: "الحركة الفيزيائية تقفل الدارة الكهربائية -> يقرأ المتحكم العمود -> يرسل الرمز الثنائي للبروسيسور." },
      mouse: { input: "حركة طفيفة للفأرة نحو اليمين", binary: "00001010", steps: "كشّاف تيار الضوء الأرضي يرصد الحركة بمعدل هرتز عالي -> يترجمها لقيم إحداثيات ثنائية." },
      mic: { input: "تردد نبرة صوت تلميذ في الفصل", binary: "11001110", steps: "اهتزاز غشاء الميكروفون حركياً -> يتحول لموجة كهروأكوستية ضعيفة -> يتم تقطيعها عبر محول CAN لثنائيات." }
    }
  },
  fr: {
    title: "Transcodage et Périphériques d’Entrée",
    sub: "De l’action mécanique humaine vers les codes électriques machine",
    btnKey: "Clavier physique",
    btnMouse: "Souris optique",
    btnMic: "Microphone vocal",
    pathwayTitle: "TRANSLATION DES SIGNES :",
    mechanismTitle: "Mécanisme logique de conversion :",
    data: {
      key: { input: "Pression de l'utilisateur sur la touche 'A'", binary: "01000001", steps: "Pression physique ➔ Circuit fermé ➔ Contrôleur du clavier ➔ Transmis en binaire." },
      mouse: { input: "Déplacement latéral de la souris", binary: "00001010", steps: "Capteur LED / Laser ➔ Mesure de réflexion optique ➔ Delta X / Y transcodé." },
      mic: { input: "Onde vocale reçue par le microphone", binary: "11001110", steps: "Vibration de membrane ➔ Tension analogique faible ➔ Convertisseur analogique-numérique (CAN)." }
    }
  },
  en: {
    title: "Data Transcoding & Input Modules",
    sub: "Translating physical human interaction into binary electric pulses",
    btnKey: "Physical Keyboard",
    btnMouse: "Optical Mouse",
    btnMic: "Vocal Microphone",
    pathwayTitle: "TRANSLATION OF SIGNALS:",
    mechanismTitle: "Logic conversion chain in hardware:",
    data: {
      key: { input: "User hits key 'A' on physical keyboard board", binary: "01000001", steps: "Physical stroke ➔ Circuit matrix closure ➔ Keyboard micro-controller scans coordinates ➔ Sends ASCII 65 (01000001)." },
      mouse: { input: "A brief horizontal mouse displacement", binary: "00001010", steps: "LED sensory reflection scan ➔ High frequency DSP counts coordinates differences ➔ Modulates Delta values." },
      mic: { input: "User voice pitch frequencies entering mic", binary: "11001110", steps: "Acoustic wave vibration ➔ Electret copper magnetism ➔ Light analog current ➔ ADC sweeps into code stream." }
    }
  },
  es: {
    title: "Codificación y Periféricos de Entrada",
    sub: "Transmutación de acciones humanas mecánicas en flujos binarios",
    btnKey: "Teclado físico",
    btnMouse: "Ratón óptico",
    btnMic: "Micrófono de voz",
    pathwayTitle: "TRADUCCIÓN DE SEÑALES LÓGICAS:",
    mechanismTitle: "Cadena de conversión física:",
    data: {
      key: { input: "Presionar la tecla 'A' en el teclado", binary: "01000001", steps: "Golpe mecánico ➔ Cierre de circuito ➔ El procesador de teclado lee fila/columna ➔ Envía ASCII 65 (01000001)." },
      mouse: { input: "Arrastre horizontal breve del ratón", binary: "00001010", steps: "Rebote luminoso de sensor LED ➔ Medición DSP a alta frecuencia ➔ Delta X / Y mapeado en binario." },
      mic: { input: "Voz ingresando por cápsula de audio", binary: "11001110", steps: "Presión acústica ➔ Inducción de bobina débil ➔ El conversor analógico a digital (ADC) emite muestras codificadas." }
    }
  },
  de: {
    title: "Transkodierung & Eingabegeräte-Signale",
    sub: "Verschlüsselung mechanischer Aktionen in maschinenlesbare Ströme",
    btnKey: "Physische Tastatur",
    btnMouse: "Optische Maus",
    btnMic: "Kupfer-Mikrofon",
    pathwayTitle: "ÜBERSETZUNG DES IMPULSES:",
    mechanismTitle: "Signalverarbeitungsschritte der Hardware:",
    data: {
      key: { input: "Nutzer tippt den Buchstaben 'A' ein", binary: "01000001", steps: "Mechanischer Anschlag ➔ Stromkreisschluss auf Tastaturmatrix ➔ Controller scannt Matrix ➔ Sendet ASCII 65 (01000001)." },
      mouse: { input: "Klassische seitliche Hand-Mausbewegung", binary: "00001010", steps: "LED/Laser reflektiert auf Pad ➔ DSP-Prozessor verrechnet Reflektion-Frequenzen ➔ Transmittiert Richtungsvektor." },
      mic: { input: "Sprech-Schallwelle trifft die Membran", binary: "11001110", steps: "Schall-Druckwellen ➔ Induzierte Schwingspule ➔ Schwache Analogspannung ➔ ADC wandelt Welle in Binär-Bytes." }
    }
  }
};

export function InputDevicesDiagram({ language }: LanguageProp) {
  const [activeInput, setActiveInput] = useState<'key' | 'mouse' | 'mic'>('key');

  const strings = INPUT_DEV_STRINGS[language] || INPUT_DEV_STRINGS.en || INPUT_DEV_STRINGS.fr;

  const getConversion = () => {
    return strings.data[activeInput];
  };

  return (
    <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-5 space-y-5 shadow-inner">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-sm font-black text-rose-400 uppercase tracking-wide flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-rose-500" />
            <span>{strings.title}</span>
          </h4>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5">
            {strings.sub}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Buttons Selector (md:col-span-4) */}
        <div className="md:col-span-4 flex flex-col gap-2.5">
          <button 
            onClick={() => setActiveInput('key')}
            className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
              activeInput === 'key' ? 'bg-rose-950/40 border-rose-500/30 text-rose-300' : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <Keyboard className="w-4 h-4" />
              <span>{strings.btnKey}</span>
            </div>
            <span className="font-mono text-[9px] opacity-40">('A')</span>
          </button>

          <button 
            onClick={() => setActiveInput('mouse')}
            className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
              activeInput === 'mouse' ? 'bg-rose-950/40 border-rose-500/30 text-rose-300' : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{strings.btnMouse}</span>
            </div>
            <span className="font-mono text-[9px] opacity-40">(X, Y)</span>
          </button>

          <button 
            onClick={() => setActiveInput('mic')}
            className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
              activeInput === 'mic' ? 'bg-rose-950/40 border-rose-500/30 text-rose-300' : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <Waves className="w-4 h-4" />
              <span>{strings.btnMic}</span>
            </div>
            <span className="font-mono text-[9px] opacity-40">(Analog CAN)</span>
          </button>
        </div>

        {/* Visual Binary Pathway (md:col-span-8) */}
        <div className="md:col-span-8 bg-slate-950/80 rounded-2xl p-5 border border-slate-850 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] text-rose-450 uppercase font-black font-mono block tracking-wider">
              {strings.pathwayTitle}
            </span>
            <div className="text-sm font-extrabold text-slate-100 flex gap-1 items-center animate-fade-in">
              <span>{getConversion().input}</span>
              <span className="text-rose-500">➔</span>
              <span className="bg-rose-950/60 border border-rose-800/40 px-2.5 py-1 rounded font-mono text-xs text-rose-405 font-bold">
                {getConversion().binary}
              </span>
            </div>
          </div>

          <div className="border-t border-slate-850 pt-2.5 mt-3 space-y-1">
            <span className="text-[9px] text-slate-400 uppercase font-bold block tracking-wider font-mono">
              {strings.mechanismTitle}
            </span>
            <p className="text-slate-300 text-xs leading-relaxed font-semibold animate-fade-in">
              {getConversion().steps}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 6. OUTPUT DEVICES DIAGRAM (Binary to Real-World Sensation)
// ============================================================================
const OUTPUT_DEV_STRINGS: Record<string, any> = {
  ar: {
    title: "وحدات الإخراج وفك التشفير",
    sub: "تحويل الأوامر والنبضات الرقمية الثنائية إلى إحساس بشري مرئي أو صوتي",
    btnOff: "فصل الشاشة",
    btnOn: "توصيل الشاشة",
    activePixel: "بكسل رسومي نشط [أحمر، أخضر، أزرق]",
    emptyMonitor: "[ شاشة العرض مطفأة ]",
    descTitle: "آلية فك التشفير للعين:",
    descText: "تتلقى بطاقة الشاشة مصفوفات ثنائية تصف مئات آلاف الإحداثيات وتترجم شدة الكهرباء للتحكم في الألوان الثلاثة (أحمر، أخضر، أزرق).",
    watermarkTitle: "العلاقة الكهربائية:",
    watermarkText: "إعادة إرسال النبضات 60 مرة على الأقل بالثانية (60Hz) يمنح العين البشرية وهماً حركياً مستمراً."
  },
  fr: {
    title: "Traduction des Signaux et Organes de Sortie",
    sub: "Du bit abstrait vers la sensation sensorielle physique ou sonore",
    btnOff: "ÉTEINDRE",
    btnOn: "ALLUMER",
    activePixel: "PIXEL [R, G, B] ACTIF",
    emptyMonitor: "[ ÉCRAN NOIR / VEILLE ]",
    descTitle: "Conversion des données d’affichage :",
    descText: "Les circuits électroniques de l'écran (DAC) décodent le tampon d'image pour moduler les transistors LCD/OLED de chaque sous-pixel.",
    watermarkTitle: "Vitesse du flux de rafraîchissement :",
    watermarkText: "La réécriture du signal 60 fois par seconde (60Hz) est requise pour éliminer le scintillement oculaire."
  },
  en: {
    title: "Physical Signal Decoding & Output Units",
    sub: "Translating mathematical digital bytes into visual light or moving sound waves",
    btnOff: "MONITOR OFF",
    btnOn: "MONITOR ON",
    activePixel: "ACTIVE HARDWARE PIXEL [R, G, B]",
    emptyMonitor: "[ SCREEN IN POWER STEWARDSHIP ]",
    descTitle: "Display Data Rendering process:",
    descText: "Display interface DAC cards decode computed binary arrays to feed tiny LCD/OLED sub-pixels micro-voltages on selected grids.",
    watermarkTitle: "System Refresh Loop Rate:",
    watermarkText: "Rewriting the system visual matrix 60 times per second (60Hz minimum) prevents human visual fatigue."
  },
  es: {
    title: "Decodificación y Dispositivos de Salida",
    sub: "Fusión de bits binarios en imágenes coloreadas y ondas armónicas",
    btnOff: "DESACOPLAR",
    btnOn: "ACOPLAR PANTALLA",
    activePixel: "PÍXEL DE HARDWARE [R, G, B] ACTIVO",
    emptyMonitor: "[ EN REPOSO DE CORRIENTE ]",
    descTitle: "Mapeo de señales de vídeo:",
    descText: "Los circuitos DAC convierten tramas binarias digitales en variaciones que iluminan subpíxeles rojos, verdes y azules.",
    watermarkTitle: "Tasa de refresco continuo:",
    watermarkText: "Reescribir el mapa de bits 60 veces por segundo (60Hz) discurre un fluido óptico continuo para el ojo humano."
  },
  de: {
    title: "Signaldekodierung & Ausgabegeräte",
    sub: "Übersetzung abstrakter Bytes in Farblicht und mechanische Tonwellen",
    btnOff: "AUSSCHALTEN",
    btnOn: "MONITOR AN",
    activePixel: "HARDWARE-PIXEL [R, G, B] AKTIV",
    emptyMonitor: "[ STANDBY-MODUS / KEIN SIGNAL ]",
    descTitle: "Ansteuerung der Flüssigkristalle:",
    descText: "Die Elektronik des Monitors (DAC) dekodiert Framedaten zur Modulation mikroskopischer Spannungen an den LCD/OLED-Subpixeln.",
    watermarkTitle: "Refreshrate und Frequenz:",
    watermarkText: "Eine Mindestwiederholrate von 60 Hertz (60Hz) behebt Bildflackern und erzeugt eine flüssige optische Bewegung."
  }
};

export function OutputDevicesDiagram({ language }: LanguageProp) {
  const [powerActive, setPowerActive] = useState(false);

  const strings = OUTPUT_DEV_STRINGS[language] || OUTPUT_DEV_STRINGS.en || OUTPUT_DEV_STRINGS.fr;

  return (
    <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-5 space-y-5 shadow-inner">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-sm font-black text-blue-400 uppercase tracking-wide flex items-center gap-2">
            <Monitor className="w-4 h-4 text-blue-500" />
            <span>{strings.title}</span>
          </h4>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5">
            {strings.sub}
          </p>
        </div>
        <button 
          onClick={() => setPowerActive(!powerActive)}
          className={`text-[9px] font-black px-2.5 py-1 rounded-md border uppercase font-mono transition-all cursor-pointer ${
            powerActive ? 'bg-emerald-950 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          {powerActive ? strings.btnOff : strings.btnOn}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Visualized Output Grid (md:col-span-6) */}
        <div className="md:col-span-6 bg-slate-950/80 rounded-2xl p-4 border border-slate-850 flex flex-col items-center justify-center min-h-[170px]">
          <div className={`w-full max-w-[200px] aspect-[4/3] rounded-xl border-2 transition-all duration-300 flex flex-col justify-between p-2 relative overflow-hidden ${
            powerActive ? 'bg-sky-950/40 border-blue-500 shadow-all ring-1 ring-blue-500/20' : 'bg-slate-950 border-slate-850'
          }`}>
            {powerActive ? (
              <div className="flex-grow flex flex-col justify-center items-center space-y-2 animate-fadeIn">
                {/* Glowing LED grid pixel zoom */}
                <div className="grid grid-cols-3 gap-0.5 bg-slate-950 p-1.5 rounded-lg border border-blue-800/40 animate-pulse">
                  <div className="w-3 h-3 bg-red-600 rounded-xs"></div>
                  <div className="w-3 h-3 bg-green-600 rounded-xs"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded-xs"></div>
                </div>
                <span className="text-[11px] font-mono text-blue-300 font-extrabold">{strings.activePixel}</span>
              </div>
            ) : (
              <div className="flex-grow flex items-center justify-center text-slate-400 font-mono text-center text-[10px]">
                {strings.emptyMonitor}
              </div>
            )}
            <div className="h-1 bg-slate-800 w-12 mx-auto rounded-full mt-2"></div>
          </div>
        </div>

        {/* Educational Information (md:col-span-6) */}
        <div className="md:col-span-6 space-y-4 font-sans text-xs">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest font-mono">
              {strings.descTitle}
            </span>
            <p className="text-slate-300 leading-relaxed font-semibold animate-fade-in">
              {strings.descText}
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-850 p-3.5 rounded-xl space-y-1">
            <span className="text-[9px] uppercase font-bold text-blue-400 block tracking-wider font-mono">
              {strings.watermarkTitle}
            </span>
            <span className="text-[11px] text-slate-400 leading-relaxed block animate-fade-in">
              {strings.watermarkText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 7. STORAGE DEVICES DIAGRAM (Memory/Storage Pyramid)
// ============================================================================
const PYRAMID_STRINGS: Record<string, any> = {
  ar: {
    title: "هرم سرعات وسعات تخزين الحاسوب",
    sub: "مقارنة استراتيجية تظهر المفارقة العكسية بين السرعة والسعة والتكلفة",
    infoCaption: "▲ السرعة العظمى بالقمة | السعة الكبرى بالقاعدة ▼",
    capLabel: "السعة الكلية:",
    costLabel: "تكلفة جيجابايت:",
    tiers: [
      { name: "سجلات المعالج CPU", speed: "< 1ns (فائق للغاية)", cap: "~ بايتات", desc: "سجلات ميكروسكوبية مغروسة بداخل قلب المعالج مباشرة لثواني الحساب الفوري." },
      { name: "الذاكرة المخبئية L1/L2/L3", speed: "1ns - 10ns (سريعة جداً)", cap: "ميجابايت (MB)", desc: "خلايا تخزين وسيطة سريعة تمنع ركود ونوم عتاد المعالج في انتظار الذاكرة العشوائية." },
      { name: "الذاكرة العشوائية (RAM)", speed: "15ns - 50ns (سرعة معتدلة)", cap: "جيجابايت (GB)", desc: "الورشة المؤقتة الكبرى لتطبيقات النظام، تفقد كل محتوياتها بمجرد انقطاع تيار اللوحة." },
      { name: "الذاكرة الصلبة SSD/HDD", speed: "10μs - 10ms (سرعة ميكانيكية)", cap: "تيرابايت (TB)", desc: "المستقر الدائم والعميق والآمن لتخزين ملفات نظام التشغيل والدروس والمستندات." }
    ]
  },
  fr: {
    title: "Hiérarchie et Vitesse du Stockage",
    sub: "La pyramide des performances du micro-processeur au stockage de masse",
    infoCaption: "▲ Vitesse maximale en haut | Capacité maximale en bas ▼",
    capLabel: "Capacité :",
    costLabel: "Coût par Go :",
    tiers: [
      { name: "Registres CPU", speed: "< 1ns (Ultra-Rapide)", cap: "~ Bytes", desc: "Séquences d'exécution logées au cœur absolu de calcul, immédiates mais à taille unitaire infime." },
      { name: "Mémoire Cache L1/L2/L3", speed: "1ns - 10ns (Rapide)", cap: "Megabytes (MB)", desc: "Conserve les blocs d'instructions récurrents au plus proche des circuits de calcul." },
      { name: "Mémoire Vive (RAM)", speed: "15ns - 50ns (Modéré)", cap: "Gigabytes (GB)", desc: "Espace de travail volatile servant de bureau aux processus, vidé intégralement à l'extinction." },
      { name: "Mémoire Morte SSD/HDD", speed: "10μs - 10ms (Lent)", cap: "Terabytes (TB)", desc: "Stockage de masse inaltérable destiné à conserver de manière permanente l'OS et les fichiers." }
    ]
  },
  en: {
    title: "Memory & Storage Hierarchy",
    sub: "Strategic comparison showing inverse relationship of speed, size and cost",
    infoCaption: "▲ Maximum speed at top | Maximum size at base ▼",
    capLabel: "Capacity volume:",
    costLabel: "Cost per GB:",
    tiers: [
      { name: "CPU Registers", speed: "< 1ns (Instantaneous)", cap: "~ Bytes", desc: "Microscopic silicon cells located directly inside processing pipelines for instant execution cycles." },
      { name: "Cache L1/L2/L3 Memory", speed: "1ns - 10ns (In-Die Speed)", cap: "Megabytes (MB)", desc: "Intermediate cache channels caching instruction lines so execution engines never starve." },
      { name: "RAM System Desktop Memory", speed: "15ns - 50ns (Moderate)", cap: "Gigabytes (GB)", desc: "Primary volatile playground holding computer operations. Drains completely when power goes down." },
      { name: "Solid Storage SSD/HDD", speed: "10μs - 10ms (Storage Class)", cap: "Terabytes (TB)", desc: "Deep permanent vault where large files, computer games, and core system blocks sit persistently." }
    ]
  },
  es: {
    title: "Jerarquía de Rendimiento de Memoria y Almacenamiento",
    sub: "Pirámide que contrasta velocidad extrema, capacidades masivas y coste financiero",
    infoCaption: "▲ Velocidad máxima arriba | Capacidad máxima abajo ▼",
    capLabel: "Capacidad total:",
    costLabel: "Coste por GB:",
    tiers: [
      { name: "Registros CPU", speed: "< 1ns (Instántaneo)", cap: "~ Bytes", desc: "Pequeñas celdas grabadas en la unidad aritmética para cálculos lógicos de ciclo simple." },
      { name: "Memoria Caché L1/L2/L3", speed: "1ns - 10ns (Ultra-Rápido)", cap: "Megabytes (MB)", desc: "Pasarelas intermedias de silicio que evitan retrasos en búsquedas de datos lógicas de la RAM." },
      { name: "Memoria del Sistema (RAM)", speed: "15ns - 50ns (Moderado)", cap: "Gigabytes (GB)", desc: "Área temporal de trabajo de procesos, cuyo potencial se disipa a tierra al interrumpirse el suministro." },
      { name: "Almacenamiento Permanente SSD/HDD", speed: "10μs - 10ms (Lento)", cap: "Terabytes (TB)", desc: "Bóveda masiva segura encargada de retener el sistema operativo, juegos y documentos pesados de forma persistente." }
    ]
  },
  de: {
    title: "Arbeitsspeicher- & Datenspeicherhierarchie",
    sub: "Strategischer Leistungsvergleich bezüglich Transferzeit, Volumen und Investitionskosten",
    infoCaption: "▲ Maximale Datenzugriffszeit oben | Speicherplatz unten ▼",
    capLabel: "Gesamtvolumen:",
    costLabel: "Kosten pro Gigabyte:",
    tiers: [
      { name: "CPU-Hauptregister", speed: "< 1ns (Latenzfrei)", cap: "~ Bytes", desc: "Mikroskopisch kleine Siliziumzellen direkt in den ALU-Pfaden für augenblickliche Befehlszyklen." },
      { name: "Cache L1/L2/L3 Cachestufen", speed: "1ns - 10ns (Sehr schnell)", cap: "Megabytes (MB)", desc: "Schnelle On-Chip-Schnittstellen zur Abminderung langsamer Mainboard-Taktzyklen." },
      { name: "Arbeitsspeicher (RAM)", speed: "15ns - 50ns (Moderat)", cap: "Gigabytes (GB)", desc: "Der Primärspeicher zur aktiven Programmausführung. Verliert alle Daten bei Spannungsabfall." },
      { name: "Festspeicher SSD/HDD", speed: "10μs - 10ms (Speicherklasse)", cap: "Terabytes (TB)", desc: "Dauerhaftes Datengrab für Systemlaufwerke und installierte Dokumente ohne Datenverlust." }
    ]
  }
};

export function StorageDevicesDiagram({ language }: LanguageProp) {
  const [activeTier, setActiveTier] = useState<number>(2);

  const strings = PYRAMID_STRINGS[language] || PYRAMID_STRINGS.en || PYRAMID_STRINGS.fr;

  const logos = [Cpu, Layers, Database, HardDrive];

  const tiers = strings.tiers.map((t: any, idx: number) => ({
    ...t,
    logo: logos[idx]
  }));

  return (
    <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-5 space-y-5 shadow-inner">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-sm font-black text-amber-400 uppercase tracking-wide flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" />
            <span>{strings.title}</span>
          </h4>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5">
            {strings.sub}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Pyramid layout (md:col-span-6) */}
        <div className="md:col-span-6 flex flex-col gap-2 relative">
          <span className="text-[9px] uppercase font-bold text-center text-slate-500 block mb-1">
            {strings.infoCaption}
          </span>
          {tiers.map((t: any, idx: number) => {
            const isSelected = activeTier === idx;
            const itemWidth = 100 - (3 - idx) * 15; // Pyramid effect
            return (
              <button
                key={idx}
                onClick={() => setActiveTier(idx)}
                style={{ width: `${itemWidth}%` }}
                className={`mx-auto p-2.5 rounded-xl border text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
                  isSelected 
                    ? 'bg-amber-950/50 border-amber-500 text-amber-200 scale-102 ring-1 ring-amber-500/20' 
                    : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {React.createElement(t.logo, { className: "w-3.5 h-3.5 shrink-0 text-amber-500" })}
                  <span className="text-[11px] font-black">{t.name}</span>
                </div>
                <span className="font-mono text-[9px] opacity-75">{t.cap}</span>
              </button>
            );
          })}
        </div>

        {/* Informational display (md:col-span-6) */}
        <div className="md:col-span-6 bg-slate-950/80 rounded-2xl p-4 border border-slate-850 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="text-[11px] font-black text-amber-300">
              {tiers[activeTier].name}
            </span>
            <span className="text-[10px] font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-400">
              {tiers[activeTier].speed}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-semibold min-h-[50px] animate-fade-in">
            {tiers[activeTier].desc}
          </p>

          <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono font-bold bg-slate-900/60 p-2 rounded-xl">
            <div className="border-r border-slate-800">
              <span className="text-slate-500 block uppercase text-[8px] tracking-wider mb-0.5">
                {strings.capLabel}
              </span>
              <span className="text-amber-200">{tiers[activeTier].cap}</span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[8px] tracking-wider mb-0.5">
                {strings.costLabel}
              </span>
              <span className="text-rose-400">
                {activeTier === 0 && "$$$$$$"}
                {activeTier === 1 && "$$$$$"}
                {activeTier === 2 && "$$$"}
                {activeTier === 3 && "$"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
