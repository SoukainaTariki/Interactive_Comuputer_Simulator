import React, { useState, useEffect, useRef } from 'react';
import { 
  Keyboard, 
  Monitor, 
  Cpu, 
  Layers, 
  HardDrive,
  Maximize2,
  Minimize2,
  ChevronRight,
  X
} from 'lucide-react';
import { ScenarioStep } from '../data/scenariosData';
import { useLearning } from '../context/LearningContext';
import { useLanguage } from '../context/LanguageContext';

const getBusTypeForStep = (step: any): 'data' | 'addr' | 'ctrl' => {
  if (!step) return 'data';
  const txt = `${step.title || ''} ${step.queSePasseTil || ''} ${step.pourquoi || ''} ${step.packetValue || ''}`.toLowerCase();
  
  // Command / Control bus keywords
  if (
    txt.includes('contrôle') || 
    txt.includes('commande') || 
    txt.includes('ordre') || 
    txt.includes('interruption') || 
    txt.includes('clock') || 
    txt.includes('signal d\'activation') ||
    txt.includes('psu') ||
    txt.includes('allumage') ||
    txt.includes('tension') ||
    txt.includes('intercepte') ||
    txt.includes('verrou') ||
    txt.includes('décodage') ||
    txt.includes('instruction')
  ) {
    return 'ctrl';
  }
  
  // Address bus keywords
  if (
    txt.includes('adresse') || 
    txt.includes('localise') || 
    txt.includes('recherche permanent') ||
    txt.includes('secteur') ||
    txt.includes('index') ||
    txt.includes('recherche d\'index') ||
    txt.includes('d\'allocation') ||
    txt.includes('pointeur')
  ) {
    return 'addr';
  }
  
  return 'data';
};

interface MiniCompInfo {
  name: string;
  desc: string;
  emoji: string;
  targetId: string;
}

const getMiniCompInfo = (id: string, level: string, lang: string = 'fr'): MiniCompInfo => {
  const nid = id.toLowerCase();
  
  if (lang === 'en') {
    if (nid === 'clavier') {
      return {
        name: "The Keyboard / Input",
        desc: "Input device consisting of physical keys. Each keystroke sends a binary electrical code (e.g. ASCII code) to the Central Unit for processing.",
        emoji: "⌨️",
        targetId: "clavier"
      };
    }
    if (nid === 'ram') {
      return {
        name: "Main Memory (RAM)",
        desc: "Ultra-fast volatile workspace that temporarily stores active program instructions and computation variables.",
        emoji: "💾",
        targetId: "ram"
      };
    }
    if (nid === 'cpu') {
      return {
        name: "Processor (CPU)",
        desc: "The true brain of the machine. It reads consecutive lines of instructions in RAM, decodes them, and orchestrates all calculations.",
        emoji: "🧠",
        targetId: "cpu"
      };
    }
    if (nid === 'ssd_hdd' || nid === 'stockage' || nid === 'ssd' || nid === 'hdd') {
      return {
        name: "Permanent Storage (SSD)",
        desc: "Solid-state or magnetic storage cupboard. Keeps applications and your files intact even when power is cut off.",
        emoji: "💽",
        targetId: "stockage"
      };
    }
    if (nid === 'ecran' || nid === 'écran') {
      return {
        name: "The Screen / Output",
        desc: "Main output device translating central unit signals live into colored pixels.",
        emoji: "🖥️",
        targetId: "ecran"
      };
    }
    if (nid === 'bus') {
      return {
        name: "Motherboard Buses (Copper Lines)",
        desc: "Parallel connection channels carrying physical signals for addresses, execution data, and activation control.",
        emoji: "🚌",
        targetId: "bus"
      };
    }
    
    if (level === 'simple') {
      if (nid === 'clavier') {
        return {
          name: "Input Devices",
          desc: "Organs (keyboard, mouse, webcam, mic) used to inject physical actions or commands into the central unit.",
          emoji: "⌨️",
          targetId: "clavier"
        };
      }
      if (nid === 'cpu') {
        return {
          name: "The Central Unit",
          desc: "Contains the executing processor and RAM. Together they execute and accelerate program calculations.",
          emoji: "🧠",
          targetId: "cpu"
        };
      }
      if (nid === 'ecran') {
        return {
          name: "Output Devices",
          desc: "Organs (screen, speakers, printer) in charge of rendering the final results of processing in an understandable format.",
          emoji: "🖥️",
          targetId: "ecran"
        };
      }
    }
  } else if (lang === 'ar') {
    if (nid === 'clavier') {
      return {
        name: "لوحة المفاتيح / الإدخال",
        desc: "جهاز إدخال يتكون من أزرار فيزيائية. كل ضغطة ترسل كودًا كهربائيًا ثنائيًا (مثل رمز ASCII) إلى الوحدة المركزية لمعالجته.",
        emoji: "⌨️",
        targetId: "clavier"
      };
    }
    if (nid === 'ram') {
      return {
        name: "ذاكرة الوصول العشوائي (RAM)",
        desc: "مساحة عمل مؤقتة فائقة السرعة تخزن مؤقتًا تعليمات البرامج النشطة ومتغيرات الحسابات.",
        emoji: "💾",
        targetId: "ram"
      };
    }
    if (nid === 'cpu') {
      return {
        name: "المعالج (CPU)",
        desc: "العقل الحقيقي للآلة. يقرأ الأسطر المتتالية من التعليمات في الذاكرة العشوائية (RAM)، ويفكك تشفيرها وينظم جميع العمليات الحسابية.",
        emoji: "🧠",
        targetId: "cpu"
      };
    }
    if (nid === 'ssd_hdd' || nid === 'stockage' || nid === 'ssd' || nid === 'hdd') {
      return {
        name: "التخزين الدائم (SSD)",
        desc: "خزانة حفظ صلبة أو مغناطيسية. تحافظ على سلامة التطبيقات وملفاتك حتى عند قطع التيار الكهربائي.",
        emoji: "💽",
        targetId: "stockage"
      };
    }
    if (nid === 'ecran' || nid === 'écran') {
      return {
        name: "الشاشة / الإخراج",
        desc: "جهاز الإخراج الرئيسي الذي يترجم إشارات الوحدة المركزية مباشرة إلى بكسلات ملونة.",
        emoji: "🖥️",
        targetId: "ecran"
      };
    }
    if (nid === 'bus') {
      return {
        name: "ناقل لوحة الأم (مسارات النحاس)",
        desc: "قنوات اتصال متوازية تنقل الإشارات الفيزيائية للعناوين، وبيانات التشغيل، والتحكم في التنشيط.",
        emoji: "🚌",
        targetId: "bus"
      };
    }
    
    if (level === 'simple') {
      if (nid === 'clavier') {
        return {
          name: "أجهزة الإدخال",
          desc: "أعضاء (لوحة المفاتيح، الفأرة، كاميرا الويب، الميكروفون) تُستعمل لإدخال الأفعال أو الأوامر الحقيقية إلى الوحدة المركزية.",
          emoji: "⌨️",
          targetId: "clavier"
        };
      }
      if (nid === 'cpu') {
        return {
          name: "الوحدة المركزية",
          desc: "تحتوي على المعالج والرام. معًا، يقومان بإجراء وتسريع حسابات البرنامج.",
          emoji: "🧠",
          targetId: "cpu"
        };
      }
      if (nid === 'ecran') {
        return {
          name: "أجهزة الإخراج",
          desc: "أعضاء (الشاشة، مكبرات الصوت، الطابعة) مكلفة بإرجاع النتيجة النهائية للمعالجات في شكل مفهوم.",
          emoji: "🖥️",
          targetId: "ecran"
        };
      }
    }
  } else if (lang === 'es') {
    if (nid === 'clavier') {
      return {
        name: "El Teclado / Entrada",
        desc: "Dispositivo de entrada constituido por teclas físicas. Cada pulsación envía un código eléctrico binario (ej: código ASCII) a la Unidad Central para ser procesado.",
        emoji: "⌨️",
        targetId: "clavier"
      };
    }
    if (nid === 'ram') {
      return {
        name: "Memoria RAM",
        desc: "Espacio de trabajo volátil ultrarrápido que almacena temporalmente las instrucciones de los programas activos y las variables de los cálculos.",
        emoji: "💾",
        targetId: "ram"
      };
    }
    if (nid === 'cpu') {
      return {
        name: "Procesador (CPU)",
        desc: "El verdadero cerebro de la máquina. Lee las líneas consecutivas de instrucciones en la RAM, las decodifica y orquesta todos los cálculos.",
        emoji: "🧠",
        targetId: "cpu"
      };
    }
    if (nid === 'ssd_hdd' || nid === 'stockage' || nid === 'ssd' || nid === 'hdd') {
      return {
        name: "Almacenamiento Permanente (SSD)",
        desc: "Armario de copia de seguridad sólido o magnético. Conserva las aplicaciones y tus archivos intactos incluso cortando la alimentación eléctrica.",
        emoji: "💽",
        targetId: "stockage"
      };
    }
    if (nid === 'ecran' || nid === 'écran') {
      return {
        name: "La Pantalla / Salida",
        desc: "Periférico de salida principal que traduce en vivo las señales de la unidad central en forma de píxeles de colores.",
        emoji: "🖥️",
        targetId: "ecran"
      };
    }
    if (nid === 'bus') {
      return {
        name: "Los Buses de la Placa Base",
        desc: "Canales de conexión en paralelo que transportan las señales físicas de direcciones, datos de ejecución y control de activación.",
        emoji: "🚌",
        targetId: "bus"
      };
    }
    
    if (level === 'simple') {
      if (nid === 'clavier') {
        return {
          name: "Dispositivos de Entrada",
          desc: "Órganos (teclado, ratón, cámara web, micrófono) que sirven para inyectar acciones o comandos reales hacia el interior de la unidad central.",
          emoji: "⌨️",
          targetId: "clavier"
        };
      }
      if (nid === 'cpu') {
        return {
          name: "La Unidad Central",
          desc: "Contiene el procesador ejecutor y la memoria de acceso aleatorio RAM. Juntos, realizan y aceleran los cálculos del programa.",
          emoji: "🧠",
          targetId: "cpu"
        };
      }
      if (nid === 'ecran') {
        return {
          name: "Dispositivos de Salida",
          desc: "Órganos (pantalla, altavoces, impresora) encargados de restituir el resultado final de los tratamientos de forma comprensible.",
          emoji: "🖥️",
          targetId: "ecran"
        };
      }
    }
  } else if (lang === 'de') {
    if (nid === 'clavier') {
      return {
        name: "Die Tastatur / Eingabe",
        desc: "Eingabegerät bestehend aus physischen Tasten. Jeder Tastendruck sendet einen elektrischen Binärcode (z. B. ASCII-Code) zur Verarbeitung an die Zentraleinheit.",
        emoji: "⌨️",
        targetId: "clavier"
      };
    }
    if (nid === 'ram') {
      return {
        name: "Arbeitsspeicher (RAM)",
        desc: "Superschneller flüchtiger Speicher, in dem Programmbefehle und Berechnungsvariablen aktiv verwaltet werden.",
        emoji: "💾",
        targetId: "ram"
      };
    }
    if (nid === 'cpu') {
      return {
        name: "Prozessor (CPU)",
        desc: "Das wahre Gehirn der Maschine. Er liest fortlaufende Programmbefehle aus dem RAM ein, dekodiert sie und koordiniert alle Berechnungen.",
        emoji: "🧠",
        targetId: "cpu"
      };
    }
    if (nid === 'ssd_hdd' || nid === 'stockage' || nid === 'ssd' || nid === 'hdd') {
      return {
        name: "Dauerspeicher (SSD)",
        desc: "Ein permanenter NAND-Flash- oder Plattenspeicher. Erhält Programme und Ihre Dateien intakt, auch wenn der Strom abgeschaltet wird.",
        emoji: "💽",
        targetId: "stockage"
      };
    }
    if (nid === 'ecran' || nid === 'écran') {
      return {
        name: "Der Bildschirm / Ausgabe",
        desc: "Hauptausgabegerät, das Signale der Zentraleinheit in Echtzeit in farbige Pixel übersetzt.",
        emoji: "🖥️",
        targetId: "ecran"
      };
    }
    if (nid === 'bus') {
      return {
        name: "Systembusse (Kupferbahnen)",
        desc: "Parallele Verbindungsleitungen auf dem Mainboard, die Adress-, Daten- und Steuersignale übertragen.",
        emoji: "🚌",
        targetId: "bus"
      };
    }
    
    if (level === 'simple') {
      if (nid === 'clavier') {
        return {
          name: "Eingabegeräte",
          desc: "Tastatur, Maus, Webcam, Mikrofon usw., um physische Aktionen in die Zentraleinheit einzuspeisen.",
          emoji: "⌨️",
          targetId: "clavier"
        };
      }
      if (nid === 'cpu') {
        return {
          name: "Zentraleinheit",
          desc: "Enthält Prozessor und RAM. Zusammen verarbeiten und beschleunigen sie die Programmberechnungen.",
          emoji: "🧠",
          targetId: "cpu"
        };
      }
      if (nid === 'ecran') {
        return {
          name: "Ausgabegeräte",
          desc: "Bildschirm, Lautsprecher, Drucker usw., um verarbeitete Daten visualisiert auszugeben.",
          emoji: "🖥️",
          targetId: "ecran"
        };
      }
    }
  }

  // Default to French
  if (nid === 'clavier') {
    return {
      name: "Le Clavier / Input",
      desc: "Dispositif d'entrée constitué de touches physiques. Chaque frappe envoie un code électrique binaire (ex: code ASCII) à l'Unité Centrale pour être traité.",
      emoji: "⌨️",
      targetId: "clavier"
    };
  }
  if (nid === 'ram') {
    return {
      name: "Mémoire Vive (RAM)",
      desc: "Espace de travail volatile ultra-rapide qui stocke temporairement les instructions des programmes actifs et les variables de calculs.",
      emoji: "💾",
      targetId: "ram"
    };
  }
  if (nid === 'cpu') {
    return {
      name: "Processeur (CPU)",
      desc: "Le véritable cerveau de la machine. Il lit les lignes d'instructions consécutives en RAM, les décode et orchestre tous les calculs.",
      emoji: "🧠",
      targetId: "cpu"
    };
  }
  if (nid === 'ssd_hdd' || nid === 'stockage' || nid === 'ssd' || nid === 'hdd') {
    return {
      name: "Stockage Permanent (SSD)",
      desc: "Placard de sauvegarde solide ou magnétique. Conserve les applications et vos fichiers intacts même en coupant l'alimentation électrique.",
      emoji: "💽",
      targetId: "stockage"
    };
  }
  if (nid === 'ecran' || nid === 'écran') {
    return {
      name: "L'Écran / Output",
      desc: "Périphérique de sortie principal traduisant en direct les signaux de l'unité centrale sous forme de pixels colorés.",
      emoji: "🖥️",
      targetId: "ecran"
    };
  }
  if (nid === 'bus') {
    return {
      name: "Les Bus carte mère (Lignes de Cuivre)",
      desc: "Canaux de connexion parallèles transportant les signaux physiques d'adresses, de données d'exécution et de contrôle d'activation.",
      emoji: "🚌",
      targetId: "bus"
    };
  }
  
  if (level === 'simple') {
    if (nid === 'clavier') {
      return {
        name: "Périphériques d'Entrée",
        desc: "Organes (clavier, souris, webcam, micro) servant à injecter les actions ou commandes réelles vers l'intérieur de l'unité centrale.",
        emoji: "⌨️",
        targetId: "clavier"
      };
    }
    if (nid === 'cpu') {
      return {
        name: "L'Unité Centrale",
        desc: "Contient le processeur exécuteur et la mémoire vive RAM. Ensemble, ils effectuent et accélèrent les calculs du programme.",
        emoji: "🧠",
        targetId: "cpu"
      };
    }
    if (nid === 'ecran') {
      return {
        name: "Périphériques de Sortie",
        desc: "Organes (écran, haut-parleurs, imprimante) chargés de restituer le résultat final des traitements sous forme compréhensible.",
        emoji: "🖥️",
        targetId: "ecran"
      };
    }
  }

  return {
    name: "Composant d'Architecture",
    desc: "Élément d'interconnexion composant l'architecture de Von Neumann ou son alimentation générale de calcul.",
    emoji: "🔌",
    targetId: id
  };
};

interface ComputerDiagramSimplifiedProps {
  currentStep: ScenarioStep | null;
  isDarkMode?: boolean;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  zoomScale: number;
  setZoomScale: React.Dispatch<React.SetStateAction<number>>;
  panOffset: { x: number; y: number };
  setPanOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
}

// ────────────────────────────────────────────────────────
// REDESIGNED SIMPLIFIED & INTERMEDIATE DIAGRAM COMPONENT
// Optimisé pour les écrans de projection scolaires
// CPU au centre, pas de boîte bus superflue, 3 bus parallèles colorés
// ────────────────────────────────────────────────────────
export default function ComputerDiagramSimplified({ 
  currentStep, 
  isDarkMode = false,
  isFullscreen = false,
  onToggleFullscreen,
  zoomScale,
  setZoomScale,
  panOffset,
  setPanOffset
}: ComputerDiagramSimplifiedProps) {
  const { learningLevel, setLearningLevel, isProjectionMode, setActiveTab, setActiveComponentId } = useLearning();
  const { scenariosData, t, language } = useLanguage();

  const localMap: Record<string, {
    circulation: string;
    schemaSimple: string;
    schemaInter: string;
    schemaAdvanced: string;
    simple: string;
    inter: string;
    advanced: string;
    titleSimple: string;
    titleInter: string;
    titleAdv: string;
  }> = {
    fr: {
      circulation: "Circulation Temps-Réel",
      schemaSimple: "Schéma Simple",
      schemaInter: "Schéma Intermédiaire",
      schemaAdvanced: "Schéma Avancé",
      simple: "Simple",
      inter: "Intermédiaire",
      advanced: "Avancé",
      titleSimple: "Niveau Simple",
      titleInter: "Niveau Intermédiaire",
      titleAdv: "Niveau Avancé",
    },
    en: {
      circulation: "Real-Time Flow",
      schemaSimple: "Simple Diagram",
      schemaInter: "Intermediate Diagram",
      schemaAdvanced: "Advanced Diagram",
      simple: "Simple",
      inter: "Intermediate",
      advanced: "Advanced",
      titleSimple: "Simple Level",
      titleInter: "Intermediate Level",
      titleAdv: "Advanced Level",
    },
    ar: {
      circulation: "تدفق البيانات في الوقت الفعلي",
      schemaSimple: "مخطط مبسط",
      schemaInter: "مخطط متوسط",
      schemaAdvanced: "مخطط متقدم",
      simple: "مبسط",
      inter: "متوسط",
      advanced: "متقدم",
      titleSimple: "مستوى مبسط",
      titleInter: "مستوى متوسط",
      titleAdv: "مستوى متقدم",
    },
    es: {
      circulation: "Flujo en Tiempo Real",
      schemaSimple: "Diagrama Simple",
      schemaInter: "Diagrama Intermedio",
      schemaAdvanced: "Diagrama Avanzado",
      simple: "Simple",
      inter: "Intermedio",
      advanced: "Avanzado",
      titleSimple: "Nivel Simple",
      titleInter: "Nivel Intermedio",
      titleAdv: "Nivel Avanzado",
    },
    de: {
      circulation: "Echtzeit-Datenfluss",
      schemaSimple: "Einfaches Diagramm",
      schemaInter: "Mittleres Diagramm",
      schemaAdvanced: "Erweitertes Diagramm",
      simple: "Einfach",
      inter: "Mittel",
      advanced: "Fortgeschritten",
      titleSimple: "Einfache Stufe",
      titleInter: "Mittlere Stufe",
      titleAdv: "Fortgeschrittene Stufe",
    }
  };

  const currentStrings = localMap[language] || localMap.fr;
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [activePopupNodeId, setActivePopupNodeId] = useState<string | null>(null);

  // Interactive Canvas State
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [isSpacePressed, setIsSpacePressed] = useState<boolean>(false);

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panOffsetStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const getComponentCenter = (id: string): { x: number; y: number } | null => {
    const activeNodes = learningLevel === 'simple' ? SIMPLE_NODES : INTERMEDIATE_NODES;
    const node = activeNodes[id as keyof typeof activeNodes];
    if (node) {
      return { x: node.cx, y: node.cy };
    }
    return null;
  };

  // spacebar hook for cursor/mode switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        setIsSpacePressed(true);
        e.preventDefault();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Center automatic zoom when active step advances - disabled to maintain a clean centered view like the advanced diagram
  useEffect(() => {
    resetZoomAndPan();
  }, [learningLevel]);

  // Miro/Figma style canvas wheel zoom & pinch-to-zoom (scroll is allowed to scroll the page naturally)
  useEffect(() => {
    const element = canvasRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const zoomFactor = 1.08;
        const direction = e.deltaY < 0 ? 1 : -1;
        let nextScale = direction > 0 ? zoomScale * zoomFactor : zoomScale / zoomFactor;
        nextScale = Math.max(0.5, Math.min(nextScale, 3.5));

        const rect = element.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xs = (mouseX - panOffset.x) / zoomScale;
        const ys = (mouseY - panOffset.y) / zoomScale;

        setZoomScale(nextScale);
        setPanOffset({
          x: mouseX - xs * nextScale,
          y: mouseY - ys * nextScale
        });
      }
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    return () => element.removeEventListener('wheel', handleWheel);
  }, [zoomScale, panOffset]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (currentStep) return; // Prevent panning when scenario is active
    // Allows standard dragging everywhere on non-interactive parts of the canvas
    const target = e.target as HTMLElement;
    const isInteractive = target.closest('button') || target.closest('a') || target.closest('[id*="hw-node-"]') || target.closest('[id*="pedagogical-"]');
    if (!isInteractive && (e.button === 0 || e.button === 1)) {
      setIsPanning(true);
      panStartRef.current = { x: e.clientX, y: e.clientY };
      panOffsetStartRef.current = { ...panOffset };
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    setPanOffset({
      x: panOffsetStartRef.current.x + dx,
      y: panOffsetStartRef.current.y + dy
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsPanning(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (currentStep) return; // Prevent panning when scenario is active
    const target = e.target as HTMLElement;
    const isInteractive = target.closest('button') || target.closest('a') || target.closest('[id*="hw-node-"]') || target.closest('[id*="pedagogical-"]');
    if (!isInteractive && e.touches.length === 1) {
      const touch = e.touches[0];
      setIsPanning(true);
      panStartRef.current = { x: touch.clientX, y: touch.clientY };
      panOffsetStartRef.current = { ...panOffset };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isPanning || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - panStartRef.current.x;
    const dy = touch.clientY - panStartRef.current.y;
    setPanOffset({
      x: panOffsetStartRef.current.x + dx,
      y: panOffsetStartRef.current.y + dy
    });
  };

  const handleZoomIn = () => setZoomScale(prev => Math.min(prev + 0.15, 3.5));
  const handleZoomOut = () => setZoomScale(prev => Math.max(prev - 0.15, 0.5));
  const resetZoomAndPan = () => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Handle ESC key for popup close
  useEffect(() => {
    const handlePopupEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activePopupNodeId) {
        setActivePopupNodeId(null);
      }
    };
    window.addEventListener('keydown', handlePopupEsc);
    return () => window.removeEventListener('keydown', handlePopupEsc);
  }, [activePopupNodeId]);

  // 1. Find the current scenario and active step index in standard scenariosData
  const activeScenario = currentStep ? scenariosData.find(s => s.steps.includes(currentStep)) : null;
  const activeStepIndex = (currentStep && activeScenario) ? activeScenario.steps.indexOf(currentStep) : -1;
  const steps = activeScenario ? activeScenario.steps : [];
  const isLastStep = activeStepIndex !== -1 && activeStepIndex === steps.length - 1;

  // Helper to map and resolve any detailed componentId onto our simplified nodes
  const resolveSimplifiedComponentId = (id: string, level: 'simple' | 'intermediate' | 'advanced'): string => {
    if (level === 'simple') {
      if (['clavier', 'souris', 'webcam', 'microphone'].includes(id)) return 'clavier';
      if (['ecran', 'hautparleurs', 'imprimante'].includes(id)) return 'ecran';
      if (['cpu', 'uc', 'ual', 'cache', 'registres', 'rom', 'gpu'].includes(id)) return 'cpu';
      return 'stockage';
    } else {
      // Intermediate level (CPU at center, RAM at top, SSD at bottom, Keyboard/Screen at sides)
      if (['clavier', 'souris', 'webcam', 'microphone'].includes(id)) return 'clavier';
      if (['ecran', 'hautparleurs', 'imprimante'].includes(id)) return 'ecran';
      if (['cpu', 'uc', 'ual', 'cache', 'registres', 'rom', 'gpu'].includes(id)) return 'cpu';
      if (['stockage', 'ssd_hdd', 'stockage_ext'].includes(id)) return 'stockage';
      if (['ram'].includes(id)) return 'ram';
      if (['bus'].includes(id)) return 'bus'; // Highlights the parallel communication lines!
      return id;
    }
  };

  // Determine the active component (target) and previous step component (source)
  const currentTargetRaw = currentStep ? currentStep.componentId : '';
  const currentTargetResolved = currentTargetRaw ? resolveSimplifiedComponentId(currentTargetRaw, learningLevel) : '';

  const previousTargetRaw = (activeStepIndex > 0 && steps[activeStepIndex - 1]) ? steps[activeStepIndex - 1].componentId : '';
  const previousTargetResolved = previousTargetRaw ? resolveSimplifiedComponentId(previousTargetRaw, learningLevel) : '';

  // Whether data packet should move (is going from one block to another)
  const hasMovement = previousTargetResolved && currentTargetResolved && (previousTargetResolved !== currentTargetResolved);

  // Layout structure for the nodes in SVG coordinate space (viewBox 1000 × 600)
  // Perfectly aligned with the CPU as the central brain
  const getLocalizedNodeStrings = (id: string, isSimple: boolean) => {
    if (isSimple) {
      switch (id) {
        case 'clavier':
          return {
            name: language === 'ar' ? 'أجهزة الإدخال' : language === 'en' ? 'Input Devices' : language === 'es' ? 'Dispositivos de Entrada' : language === 'de' ? 'Eingabegeräte' : "Périphériques d'entrée",
            desc: language === 'ar' ? 'لوحة المفاتيح، الفأرة، المستشعرات...' : language === 'en' ? 'Keyboard, mouse, sensors...' : language === 'es' ? 'Teclado, ratón, sensores...' : language === 'de' ? 'Tastatur, Maus, Sensoren...' : "Clavier, souris, capteurs..."
          };
        case 'stockage':
          return {
            name: language === 'ar' ? 'أجهزة التخزين' : language === 'en' ? 'Storage Devices' : language === 'es' ? 'Dispositivos de Almacenamiento' : language === 'de' ? 'Speichergeräte' : "Périphériques de stockage",
            desc: language === 'ar' ? 'القرص الصلب (SSD/HDD)، مفتاح USB...' : language === 'en' ? 'Hard drive (SSD/HDD), USB drive...' : language === 'es' ? 'Disco duro (SSD/HDD), memoria USB...' : language === 'de' ? 'Festplatte (SSD/HDD), USB-Stick...' : "Disque dur (SSD/HDD), clé USB..."
          };
        case 'cpu':
          return {
            name: language === 'ar' ? 'الوحدة المركزية' : language === 'en' ? 'Central Processing Unit' : language === 'es' ? 'Unidad Central (Procesamiento)' : language === 'de' ? 'Zentraleinheit' : "Unité Centrale",
            desc: language === 'ar' ? 'دماغ المعالجة (المعالج + الرام)' : language === 'en' ? 'Processing brain (CPU + RAM)' : language === 'es' ? 'Cerebro de procesamiento (CPU + RAM)' : language === 'de' ? 'Verarbeitungshirn (CPU + RAM)' : "Cerveau de traitement (CPU + RAM)"
          };
        case 'ecran':
          return {
            name: language === 'ar' ? 'أجهزة الإخراج' : language === 'en' ? 'Output Devices' : language === 'es' ? 'Dispositivos de Salida' : language === 'de' ? 'Ausgabegeräte' : "Périphériques de sortie",
            desc: language === 'ar' ? 'الشاشة، مكبرات الصوت، الطابعة...' : language === 'en' ? 'Screen, speakers, printer...' : language === 'es' ? 'Pantalla, altavoces, impresora...' : language === 'de' ? 'Bildschirm, Lautsprecher, Drucker...' : "Écran, haut-parleurs, imprimante..."
          };
        default:
          return { name: id, desc: '' };
      }
    } else {
      switch (id) {
        case 'clavier':
          return {
            name: language === 'ar' ? 'لوحة المفاتيح (إدخال)' : language === 'en' ? 'Keyboard (Input)' : language === 'es' ? 'Teclado (Entrada)' : language === 'de' ? 'Tastatur (Eingabe)' : "Clavier (Saisie)",
            desc: language === 'ar' ? 'جهاز إدخال' : language === 'en' ? 'Input device' : language === 'es' ? 'Dispositivo de entrada' : language === 'de' ? 'Eingabegerät' : "Périphérique d'entrée"
          };
        case 'ram':
          return {
            name: language === 'ar' ? 'ذاكرة RAM' : language === 'en' ? 'RAM Memory' : language === 'es' ? 'Memoria RAM' : language === 'de' ? 'RAM-Speicher' : "Mémoire RAM",
            desc: language === 'ar' ? 'ذاكرة الوصول العشوائي' : language === 'en' ? 'Volatile execution memory' : language === 'es' ? 'Memoria viva de ejecución' : language === 'de' ? 'Flüchtiger Arbeitsspeicher' : "Mémoire vive d'exécution"
          };
        case 'cpu':
          return {
            name: language === 'ar' ? 'معالج CPU' : language === 'en' ? 'CPU Processor' : language === 'es' ? 'Procesador CPU' : language === 'de' ? 'CPU-Prozessor' : "Processeur CPU",
            desc: language === 'ar' ? 'دماغ المعالجة' : language === 'en' ? 'Processing brain' : language === 'es' ? 'Cerebro de procesamiento' : language === 'de' ? 'Verarbeitungshirn' : "Cerveau de traitement"
          };
        case 'stockage':
          return {
            name: language === 'ar' ? 'تخزين SSD' : language === 'en' ? 'SSD Storage' : language === 'es' ? 'Almacenamiento SSD' : language === 'de' ? 'SSD-Speicher' : "Stockage SSD",
            desc: language === 'ar' ? 'تخزين دائم' : language === 'en' ? 'Permanent storage' : language === 'es' ? 'Almacenamiento permanente' : language === 'de' ? 'Permanenter Speicher' : "Stockage permanent"
          };
        case 'ecran':
          return {
            name: language === 'ar' ? 'الشاشة (عرض)' : language === 'en' ? 'The Screen (Display)' : language === 'es' ? 'La Pantalla (Visualización)' : language === 'de' ? 'Der Bildschirm (Anzeige)' : "L'Écran (Affichage)",
            desc: language === 'ar' ? 'جهاز إخراج' : language === 'en' ? 'Output device' : language === 'es' ? 'Dispositivo de salida' : language === 'de' ? 'Ausgabegerät' : "Périphérique de sortie"
          };
        default:
          return { name: id, desc: '' };
      }
    }
  };

  const INTERMEDIATE_NODES = {
    clavier: { 
      id: 'clavier', 
      x: 55, 
      y: 235, 
      w: 220, 
      h: 120, 
      cx: 165, 
      cy: 295, 
      name: getLocalizedNodeStrings('clavier', false).name, 
      icon: Keyboard, 
      color: 'emerald', 
      desc: getLocalizedNodeStrings('clavier', false).desc, 
      emoji: '⌨️' 
    },
    ram: { 
      id: 'ram', 
      x: 375, 
      y: 25, 
      w: 250, 
      h: 120, 
      cx: 500, 
      cy: 85,  
      name: getLocalizedNodeStrings('ram', false).name, 
      icon: Layers, 
      color: 'indigo', 
      desc: getLocalizedNodeStrings('ram', false).desc, 
      emoji: '💾' 
    },
    cpu: { 
      id: 'cpu', 
      x: 350, 
      y: 190, 
      w: 300, 
      h: 210, 
      cx: 500, 
      cy: 295, 
      name: getLocalizedNodeStrings('cpu', false).name, 
      icon: Cpu, 
      color: 'rose', 
      desc: getLocalizedNodeStrings('cpu', false).desc, 
      emoji: '🧠' 
    },
    stockage: { 
      id: 'stockage',
      x: 375, 
      y: 445, 
      w: 250, 
      h: 120, 
      cx: 500, 
      cy: 505, 
      name: getLocalizedNodeStrings('stockage', false).name, 
      icon: HardDrive, 
      color: 'cyan', 
      desc: getLocalizedNodeStrings('stockage', false).desc, 
      emoji: '💽' 
    },
    ecran: { 
      id: 'ecran',   
      x: 725, 
      y: 235, 
      w: 220, 
      h: 120, 
      cx: 835, 
      cy: 295, 
      name: getLocalizedNodeStrings('ecran', false).name, 
      icon: Monitor, 
      color: 'amber', 
      desc: getLocalizedNodeStrings('ecran', false).desc, 
      emoji: '🖥️' 
    },
  };

  const SIMPLE_NODES = {
    clavier: { id: 'clavier', x: 60, y: 200, w: 240, h: 150, cx: 180, cy: 275, name: getLocalizedNodeStrings('clavier', true).name, icon: Keyboard, color: 'emerald', desc: getLocalizedNodeStrings('clavier', true).desc, emoji: '⌨️' },
    stockage:{ id: 'stockage',x: 380, y: 410, w: 240, h: 150, cx: 500, cy: 485, name: getLocalizedNodeStrings('stockage', true).name, icon: HardDrive, color: 'cyan', desc: getLocalizedNodeStrings('stockage', true).desc, emoji: '💽' },
    cpu:     { id: 'cpu',     x: 380, y: 200, w: 240, h: 150, cx: 500, cy: 275, name: getLocalizedNodeStrings('cpu', true).name, icon: Cpu, color: 'rose', desc: getLocalizedNodeStrings('cpu', true).desc, emoji: '🧠' },
    ecran:   { id: 'ecran',   x: 700, y: 200, w: 240, h: 150, cx: 820, cy: 275, name: getLocalizedNodeStrings('ecran', true).name, icon: Monitor, color: 'amber', desc: getLocalizedNodeStrings('ecran', true).desc, emoji: '🖥️' },
  };

  const activeNodes = learningLevel === 'simple' ? SIMPLE_NODES : INTERMEDIATE_NODES;

  // 2. Generate active circuit path traces for dynamic packet travel flow (on the Blue Data Bus!)
  const getIntermediatePath = (src: string, dst: string, busType: 'data' | 'addr' | 'ctrl'): string => {
    // Resolve 'bus' to 'cpu' for clean physical packet flow along the physical connections
    const rSrc = src === 'bus' ? 'cpu' : src;
    const rDst = dst === 'bus' ? 'cpu' : dst;

    // Determine Y coordinate for horizontal paths
    const Y_h = busType === 'data' ? 285 : (busType === 'addr' ? 295 : 305);
    // Determine X coordinate for vertical paths
    const X_v = busType === 'data' ? 490 : (busType === 'addr' ? 500 : 510);

    if (rSrc === 'clavier' && rDst === 'cpu')      return `M 165 ${Y_h} H 500`;
    if (rSrc === 'cpu'     && rDst === 'clavier')  return `M 500 ${Y_h} H 165`;
    if (rSrc === 'cpu'     && rDst === 'ram')      return `M ${X_v} 295 V 85`;
    if (rSrc === 'ram'     && rDst === 'cpu')      return `M ${X_v} 85 V 295`;
    if (rSrc === 'cpu'     && rDst === 'stockage') return `M ${X_v} 295 V 505`;
    if (rSrc === 'stockage'&& rDst === 'cpu')      return `M ${X_v} 505 V 295`;
    if (rSrc === 'cpu'     && rDst === 'ecran')    return `M 500 ${Y_h} H 835`;
    if (rSrc === 'ecran'   && rDst === 'cpu')      return `M 835 ${Y_h} H 500`;

    if (rSrc === 'clavier' && rDst === 'ram')      return `M 165 ${Y_h} H ${X_v} V 85`;
    if (rSrc === 'ram'     && rDst === 'clavier')  return `M ${X_v} 85 V ${Y_h} H 165`;
    if (rSrc === 'ram'     && rDst === 'stockage') return `M ${X_v} 85 V 505`;
    if (rSrc === 'stockage'&& rDst === 'ram')      return `M ${X_v} 505 V 85`;
    if (rSrc === 'clavier' && rDst === 'ecran')    return `M 165 ${Y_h} H 835`;
    if (rSrc === 'stockage'&& rDst === 'ecran')    return `M ${X_v} 505 V ${Y_h} H 835`;

    // Fallbacks connecting components via center port structures
    const p1 = INTERMEDIATE_NODES[rSrc as keyof typeof INTERMEDIATE_NODES] || INTERMEDIATE_NODES.cpu;
    const p2 = INTERMEDIATE_NODES[rDst as keyof typeof INTERMEDIATE_NODES] || INTERMEDIATE_NODES.cpu;
    return `M ${p1.cx} ${p1.cy} H 500 V ${p2.cy} H ${p2.cx}`;
  };

  const getSimplePath = (src: string, dst: string): string => {
    if (src === 'clavier' && dst === 'stockage') return 'M 180 275 H 455 V 485 H 500';
    if (src === 'stockage' && dst === 'clavier') return 'M 500 485 H 545 V 275 H 180';
    if (src === 'clavier' && dst === 'cpu')      return 'M 180 275 H 500';
    if (src === 'cpu'     && dst === 'clavier')  return 'M 500 275 H 180';
    if (src === 'stockage' && dst === 'cpu')     return 'M 500 485 H 545 V 275 H 500';
    if (src === 'cpu'     && dst === 'stockage') return 'M 500 275 H 455 V 485 H 500';
    if (src === 'cpu'     && dst === 'ecran')    return 'M 500 275 H 820';
    if (src === 'ecran'   && dst === 'cpu')      return 'M 820 275 H 500';
    if (src === 'stockage' && dst === 'ecran')   return 'M 500 485 H 545 V 275 H 820';
    if (src === 'ecran'   && dst === 'stockage') return 'M 820 275 H 455 V 485 H 500';

    // Standard raw fallback
    const p1 = SIMPLE_NODES[src as keyof typeof SIMPLE_NODES] || SIMPLE_NODES.clavier;
    const p2 = SIMPLE_NODES[dst as keyof typeof SIMPLE_NODES] || SIMPLE_NODES.ecran;
    return `M ${p1.cx} ${p1.cy} L ${p2.cx} ${p2.cy}`;
  };

  const activeBusType = getBusTypeForStep(currentStep);

  const activePathD = hasMovement 
    ? (learningLevel === 'simple' 
        ? getSimplePath(previousTargetResolved, currentTargetResolved) 
        : getIntermediatePath(previousTargetResolved, currentTargetResolved, activeBusType))
    : '';

  // Return specific thematic colors suited for projection screens
  const getThemePalette = (colorName: string, isThisSelected: boolean) => {
    switch (colorName) {
      case 'emerald':
        return {
          bg: isThisSelected 
            ? (isDarkMode ? 'bg-emerald-950/45 border-emerald-400' : 'bg-emerald-50 border-emerald-500') 
            : (isDarkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-white border-slate-350'),
          text: isDarkMode ? 'text-emerald-400' : 'text-emerald-850',
          badgeBg: 'bg-emerald-500 dark:bg-emerald-600',
          strokeColor: '#10b981'
        };
      case 'blue':
        return {
          bg: isThisSelected 
            ? (isDarkMode ? 'bg-blue-950/45 border-blue-400' : 'bg-blue-50 border-blue-500') 
            : (isDarkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-white border-slate-350'),
          text: isDarkMode ? 'text-blue-400' : 'text-blue-850',
          badgeBg: 'bg-blue-600 dark:bg-blue-500',
          strokeColor: '#3b82f6'
        };
      case 'indigo':
        return {
          bg: isThisSelected 
            ? (isDarkMode ? 'bg-indigo-950/45 border-indigo-400' : 'bg-indigo-50 border-indigo-500') 
            : (isDarkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-white border-slate-350'),
          text: isDarkMode ? 'text-indigo-400' : 'text-indigo-850',
          badgeBg: 'bg-indigo-600 dark:bg-indigo-550',
          strokeColor: '#6366f1'
        };
      case 'cyan':
        return {
          bg: isThisSelected 
            ? (isDarkMode ? 'bg-cyan-950/45 border-cyan-400' : 'bg-cyan-50 border-cyan-500') 
            : (isDarkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-white border-slate-350'),
          text: isDarkMode ? 'text-cyan-400' : 'text-cyan-850',
          badgeBg: 'bg-cyan-600 dark:bg-cyan-500',
          strokeColor: '#06b6d4'
        };
      case 'rose':
        return {
          bg: isThisSelected 
            ? (isDarkMode ? 'bg-rose-950/45 border-rose-400' : 'bg-rose-50 border-rose-500') 
            : (isDarkMode ? 'bg-slate-900/60 border-slate-700 font-bold' : 'bg-white border-slate-350 font-bold'),
          text: isDarkMode ? 'text-rose-400' : 'text-rose-850',
          badgeBg: 'bg-rose-600 dark:bg-rose-500',
          strokeColor: '#f43f5e'
        };
      case 'amber':
      default:
        return {
          bg: isThisSelected 
            ? (isDarkMode ? 'bg-amber-950/45 border-amber-400' : 'bg-amber-50 border-amber-500') 
            : (isDarkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-white border-slate-350'),
          text: isDarkMode ? 'text-amber-400' : 'text-amber-850',
          badgeBg: 'bg-amber-600 dark:bg-amber-500',
          strokeColor: '#f59e0b'
        };
    }
  };

  // Helper to determine interactive opacity of a connection leg
  // Highlighting active nodes during simulations, completely static & clean when hovered (as requested)
  const getLegOpacity = (legId: 'clavier' | 'ram' | 'stockage' | 'ecran') => {
    const isAnyActive = !!currentTargetResolved;
    if (!isAnyActive) return 'opacity-80 transition-all duration-300';
    
    // CPU selected highlights all buses since it routes everything
    const isCpuSelected = currentTargetResolved === 'cpu' || currentTargetResolved === 'bus';
    const isThisSelected = currentTargetResolved === legId;
    
    return (isCpuSelected || isThisSelected) 
      ? 'opacity-100 scale-[1.015] transition-all duration-300 drop-shadow-[0_0_4px_rgba(59,130,246,0.50)]' 
      : 'opacity-15 transition-all duration-300';
  };

  // Determine static paths in background
  const renderBackgroundTraces = () => {
    const strokeColor = isDarkMode ? '#1e293b' : '#e2e8f0';
    const traceWidth = isProjectionMode ? 6 : 4.5;

    if (learningLevel === 'simple') {
      const arrowFill = '#8cc63f';
      return (
        <g>
          {/* Left-to-Right Arrow #1 (Périphériques d'entrée -> Unité Centrale) */}
          <path
            d="M 305 270 H 355 V 264 L 375 275 L 355 286 V 280 H 305 Z"
            fill={arrowFill}
            stroke={isDarkMode ? '#475569' : '#1e293b'}
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="transition-transform duration-300 hover:scale-[1.03] origin-center cursor-help"
          >
            <title>Arrivée des données de saisie vers l'Unité Centrale</title>
          </path>

          {/* Left-to-Right Arrow #2 (Unité Centrale -> Périphériques de sortie) */}
          <path
            d="M 625 270 H 675 V 264 L 695 275 L 675 286 V 280 H 625 Z"
            fill={arrowFill}
            stroke={isDarkMode ? '#475569' : '#1e293b'}
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="transition-transform duration-300 hover:scale-[1.03] origin-center cursor-help"
          >
            <title>Envoi des résultats traités vers la sortie (Affichage/Son)</title>
          </path>

          {/* Downward Arrow #3 (Unité Centrale -> Périphériques de stockage) */}
          <path
            d="M 450 355 V 385 H 444 L 455 405 L 466 385 H 460 V 355 Z"
            fill={arrowFill}
            stroke={isDarkMode ? '#475569' : '#1e293b'}
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="transition-transform duration-300 hover:scale-[1.03] origin-center cursor-help"
          >
            <title>Sauvegarde / Écriture permanente des données</title>
          </path>

          {/* Upward Arrow #4 (Périphériques de stockage -> Unité Centrale) */}
          <path
            d="M 540 405 V 375 H 534 L 545 355 L 556 375 H 550 V 405 Z"
            fill={arrowFill}
            stroke={isDarkMode ? '#475569' : '#1e293b'}
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="transition-transform duration-300 hover:scale-[1.03] origin-center cursor-help"
          >
            <title>Lecture / Chargement des données archivées</title>
          </path>
        </g>
      );
    }

    // For intermediate learning level, we draw three distinct parallel colored buses
    // Blue = Data Bus, Purple = Address Bus, Orange = Control Bus
    const dataColor = '#3b82f6';
    const addrColor = '#a855f7';
    const ctrlColor = '#f97316';
    const busWidth = isProjectionMode ? 4.5 : 3;

    return (
      <g>
        {/* Clavier to CPU (Left Leg) */}
        <g className={getLegOpacity('clavier')}>
          {/* Bidirectional Data Bus (Double Arrowhead) */}
          <path d="M 285 285 H 340" fill="none" stroke={dataColor} strokeWidth={busWidth} strokeLinecap="round" markerStart="url(#blue-arrow)" markerEnd="url(#blue-arrow)" />
          {/* Unidirectional Address Bus (Pointers OUTWARD from CPU to keyboard controller - Leftward) */}
          <path d="M 340 295 H 285" fill="none" stroke={addrColor} strokeWidth={busWidth} strokeLinecap="round" markerEnd="url(#purple-arrow)" />
          {/* Bidirectional Control Bus (Double Arrowhead) */}
          <path d="M 285 305 H 340" fill="none" stroke={ctrlColor} strokeWidth={busWidth} strokeLinecap="round" markerStart="url(#orange-arrow)" markerEnd="url(#orange-arrow)" />
        </g>

        {/* CPU to RAM (Top Leg) */}
        <g className={getLegOpacity('ram')}>
          {/* Bidirectional Data Bus (Double Arrowhead) */}
          <path d="M 490 180 V 155" fill="none" stroke={dataColor} strokeWidth={busWidth} strokeLinecap="round" markerStart="url(#blue-arrow)" markerEnd="url(#blue-arrow)" />
          {/* Unidirectional Address Bus (Pointers OUTWARD from CPU to RAM - Upward) */}
          <path d="M 500 180 V 155" fill="none" stroke={addrColor} strokeWidth={busWidth} strokeLinecap="round" markerEnd="url(#purple-arrow)" />
          {/* Bidirectional Control Bus (Double Arrowhead) */}
          <path d="M 510 180 V 155" fill="none" stroke={ctrlColor} strokeWidth={busWidth} strokeLinecap="round" markerStart="url(#orange-arrow)" markerEnd="url(#orange-arrow)" />
        </g>

        {/* CPU to SSD (Bottom Leg) */}
        <g className={getLegOpacity('stockage')}>
          {/* Bidirectional Data Bus (Double Arrowhead) */}
          <path d="M 490 410 V 435" fill="none" stroke={dataColor} strokeWidth={busWidth} strokeLinecap="round" markerStart="url(#blue-arrow)" markerEnd="url(#blue-arrow)" />
          {/* Unidirectional Address Bus (Pointers OUTWARD from CPU to SSD - Downward) */}
          <path d="M 500 410 V 435" fill="none" stroke={addrColor} strokeWidth={busWidth} strokeLinecap="round" markerEnd="url(#purple-arrow)" />
          {/* Bidirectional Control Bus (Double Arrowhead) */}
          <path d="M 510 410 V 435" fill="none" stroke={ctrlColor} strokeWidth={busWidth} strokeLinecap="round" markerStart="url(#orange-arrow)" markerEnd="url(#orange-arrow)" />
        </g>

        {/* CPU to Screen (Right Leg) */}
        <g className={getLegOpacity('ecran')}>
          {/* Bidirectional Data Bus (Double Arrowhead) */}
          <path d="M 660 285 H 715" fill="none" stroke={dataColor} strokeWidth={busWidth} strokeLinecap="round" markerStart="url(#blue-arrow)" markerEnd="url(#blue-arrow)" />
          {/* Unidirectional Address Bus (Pointers OUTWARD from CPU to Screen controller - Rightward) */}
          <path d="M 660 295 H 715" fill="none" stroke={addrColor} strokeWidth={busWidth} strokeLinecap="round" markerEnd="url(#purple-arrow)" />
          {/* Bidirectional Control Bus (Double Arrowhead) */}
          <path d="M 660 305 H 715" fill="none" stroke={ctrlColor} strokeWidth={busWidth} strokeLinecap="round" markerStart="url(#orange-arrow)" markerEnd="url(#orange-arrow)" />
        </g>
      </g>
    );
  };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      
      {/* Upper header segment on projection board */}
      <div 
        className="flex justify-between items-center mb-4 px-2 gap-4"
        style={{ paddingLeft: '9px', paddingRight: '5px', marginBottom: '11px', paddingTop: '0px', paddingBottom: '0px' }}
      >
        <div className="flex items-center gap-2">
          <span className="flex h-3.5 w-3.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
          </span>
          <span 
            className={`font-mono font-black ${isProjectionMode ? 'text-base' : 'text-xs'} text-slate-500 dark:text-slate-400 uppercase tracking-widest`}
            style={{ fontSize: '13px' }}
          >
            {currentStrings.circulation} • {learningLevel === 'simple' ? currentStrings.schemaSimple : currentStrings.schemaInter}
          </span>
        </div>

        {/* Level selector buttons directly next to the title */}
        <div 
          className="flex items-center gap-1 p-1 bg-slate-100/95 dark:bg-slate-950 rounded-xl border-2 border-slate-300 dark:border-slate-800 shadow-sm shrink-0 font-sans"
          style={{ paddingTop: '-2px', paddingBottom: '-2px', paddingRight: '2px', paddingLeft: '2px' }}
        >
          <button
            onClick={() => setLearningLevel('simple')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all duration-200 cursor-pointer ${
              learningLevel === 'simple'
                ? 'bg-emerald-600 text-white shadow-xs border border-emerald-500'
                : 'text-slate-600 hover:text-slate-900 border border-transparent hover:bg-slate-200 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
            }`}
            style={{ paddingTop: '4px', paddingBottom: '4px' }}
            title={currentStrings.titleSimple}
          >
            {currentStrings.simple}
          </button>
          <button
            onClick={() => setLearningLevel('intermediate')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all duration-200 cursor-pointer ${
              learningLevel === 'intermediate'
                ? 'bg-blue-600 text-white shadow-xs border border-blue-500'
                : 'text-slate-600 hover:text-slate-905 border border-transparent hover:bg-slate-200 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
            }`}
            style={{ paddingBottom: '4px', paddingTop: '4px' }}
            title={currentStrings.titleInter}
          >
            {currentStrings.inter}
          </button>
          <button
            onClick={() => setLearningLevel('advanced')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all duration-200 cursor-pointer ${
              learningLevel === 'advanced'
                ? 'bg-purple-600 text-white shadow-xs border border-purple-500'
                : 'text-slate-600 hover:text-slate-905 border border-transparent hover:bg-slate-200 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
            }`}
            style={{ paddingRight: '12px', paddingBottom: '4px', paddingTop: '4px' }}
            title={currentStrings.titleAdv}
          >
            {currentStrings.advanced}
          </button>
        </div>
      </div>
        
    
      {/* Main SVG workspace canvas wrapped for zoomability */}
      <div 
        className={isFullscreen
          ? `relative w-full flex-1 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 overflow-hidden shadow-2xl font-sans transition-all duration-300 min-h-[480px] h-full ${
              isDarkMode ? 'bg-slate-950 shadow-slate-950/40' : 'bg-slate-105 shadow-slate-200/50'
            }`
          : `relative w-full aspect-[16/10] rounded-3xl border border-slate-200/60 dark:border-slate-800/80 overflow-hidden shadow-2xl font-sans transition-all duration-300 ${
              isDarkMode ? 'bg-slate-950 shadow-slate-950/40' : 'bg-slate-105 shadow-slate-200/50'
            }`
        }
        style={{ minHeight: isFullscreen ? undefined : 380 }}
      >
        {/* Outer Grid Tracer Backdrop */}
        <div className="absolute inset-0 pointer-events-none opacity-40 z-0 bg-[radial-gradient(#64748b_1.2px,transparent_1.2px)] dark:bg-[radial-gradient(#334155_1.2px,transparent_1.2px)] bg-[size:20px_20px]"></div>

        {/* Floating toolbar removed as it is now beautifully integrated into the bottom controller bar */}

        <div
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUpOrLeave}
          style={{ 
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`, 
            transformOrigin: 'center center',
            transition: isPanning ? 'none' : 'transform 0.15s ease-out',
            cursor: isPanning ? 'grabbing' : 'grab',
            touchAction: 'none'
          }}
          className="absolute inset-0 w-full h-full z-10 origin-center select-none"
        >
          <svg 
            id="pedagogic-svg-motherboard"
            viewBox="0 0 1000 600" 
            className="w-full h-full select-none"
            style={{ contentVisibility: 'auto', display: 'block' }}
          >
        {/* Glow Filters and Visual System Definitions */}
        <defs>
          <filter id="projection-glow-blue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="projection-glow-green" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="projection-glow-purple" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="11" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="projection-glow-orange" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="11" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Elegant directionality and active route arrow markers */}
          <marker id="emerald-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
          </marker>
          <marker id="blue-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3b82f6" />
          </marker>
          <marker id="purple-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#a855f7" />
          </marker>
          <marker id="orange-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f97316" />
          </marker>
        </defs>

        {/* 1. Static silicon paths printed on PCB */}
        {renderBackgroundTraces()}

        {/* 2. Active glowing path highlight with slowing dynamic flow animation */}
        {activePathD && (() => {
          const isSimple = learningLevel === 'simple';
          let strokeGlow = '#10b981';
          let strokeCore = '#34d399';
          let filterGlow = "url(#projection-glow-green)";
          let activeMarkerEnd = "url(#emerald-arrow)";
          let dashArray = "4 5";
          let animationSpeed = "1.2s";

          if (isSimple) {
            strokeGlow = '#10b981';
            strokeCore = '#34d399';
            filterGlow = "url(#projection-glow-green)";
            activeMarkerEnd = "url(#emerald-arrow)";
            dashArray = "4 5";
            animationSpeed = "1.2s";
          } else {
            // Intermediate Level: Color pathways based on actual activeBusType
            if (activeBusType === 'addr') {
              strokeGlow = '#a855f7';
              strokeCore = '#c084fc';
              filterGlow = "url(#projection-glow-purple)";
              activeMarkerEnd = "url(#purple-arrow)";
            } else if (activeBusType === 'ctrl') {
              strokeGlow = '#f97316';
              strokeCore = '#fb923c';
              filterGlow = "url(#projection-glow-orange)";
              activeMarkerEnd = "url(#orange-arrow)";
            } else {
              // 'data'
              strokeGlow = '#3b82f6';
              strokeCore = '#60a5fa';
              filterGlow = "url(#projection-glow-blue)";
              activeMarkerEnd = "url(#blue-arrow)";
            }
            // Dotted outline for intermediate active path as requested
            dashArray = "3 5";
            animationSpeed = "1.6s";
          }
          
          const strokeWidthGlow = isSimple ? (isProjectionMode ? 8 : 6) : (isProjectionMode ? 14 : 9);
          const strokeWidthCore = isSimple ? (isProjectionMode ? 4 : 3) : (isProjectionMode ? 8 : 5);

          return (
            <g>
              {/* Visual underlay glow */}
              <path
                d={activePathD}
                fill="none"
                stroke={strokeGlow}
                strokeWidth={strokeWidthGlow}
                strokeLinecap="round"
                opacity="0.4"
                filter={filterGlow}
              />
              {/* Animated high-contrast conduit pattern representing movement */}
              <path
                d={activePathD}
                fill="none"
                stroke={strokeCore}
                strokeWidth={strokeWidthCore}
                strokeLinecap="round"
                strokeDasharray={dashArray}
                opacity="1.0"
                markerEnd={activeMarkerEnd}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="18;0"
                  dur={animationSpeed}
                  repeatCount="indefinite"
                />
              </path>
            </g>
          );
        })()}

        {/* 3. HTML ForeignObject nodes. Allows elegant fluid React/Tailwind styling on SVG board */}
        {Object.values(activeNodes).map((node) => {
          const isComponentActive = currentTargetResolved === node.id;
          const isComponentHovered = hoveredNodeId === node.id;
          const isThisSelected = isComponentActive || isComponentHovered;
          
          const isAnySelected = !!currentTargetResolved || hoveredNodeId !== null;
          const dimClass = (isAnySelected && !isThisSelected) 
            ? 'opacity-30 scale-[0.97]' 
            : 'opacity-100 scale-100';

          const palette = getThemePalette(node.color, isThisSelected);
          const IconComponent = node.icon;

          const isCpu = node.id === 'cpu';
          
          const borderThicknessClass = isThisSelected 
            ? (isProjectionMode ? 'border-4 ring-8 ring-orange-500/25 animate-pulse-slow' : 'border-3 ring-4 ring-orange-500/15') 
            : (isProjectionMode ? 'border-[2.5px]' : 'border-2');

          // CPU gets unique drop glow and visual weight as the central brain!
          const cpuGlow = isThisSelected 
            ? 'shadow-[0_0_35px_rgba(244,63,94,0.45)] border-rose-500 scale-[1.045] bg-rose-50/10 dark:bg-rose-950/20' 
            : 'shadow-2xl border-rose-400/80 dark:border-rose-900/90 scale-100 bg-rose-500/[0.02] dark:bg-rose-950/[0.05]';

          const normalGlow = isThisSelected
            ? 'border-orange-500 dark:border-orange-400 scale-[1.025] shadow-lg'
            : 'shadow-xs';

          const glowAndActiveEffect = isCpu ? cpuGlow : normalGlow;

          return (
            <foreignObject
              key={node.id}
              x={node.x}
              y={node.y}
              width={node.w}
              height={node.h}
              className="overflow-visible"
            >
              <div 
                id={`hw-node-${node.id}`}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={() => setActivePopupNodeId(node.id)}
                className={`w-full h-full p-2.5 sm:p-3.5 flex flex-col items-center justify-center text-center rounded-2xl select-none transition-all duration-300 cursor-pointer ${palette.bg} ${borderThicknessClass} ${glowAndActiveEffect} ${dimClass}`}
              >
                {/* Visual Icon with relative projection dimensions */}
                <div className="flex items-center gap-2">
                  <span className={`${isCpu ? (isProjectionMode ? 'text-5xl' : 'text-4.5xl') : (isProjectionMode ? 'text-4xl' : 'text-2.5xl sm:text-3.5xl')} filter drop-shadow-xs`}>
                    {node.emoji}
                  </span>
                  <IconComponent 
                    className={`${isCpu ? (isProjectionMode ? 'w-14 h-14' : 'w-11 h-11') : (isProjectionMode ? 'w-10 h-10' : 'w-7 h-7')} ${
                      isThisSelected ? (isCpu ? 'text-rose-600 dark:text-rose-400 animate-pulse' : 'text-orange-650 dark:text-orange-400 animate-bounce') : 'text-slate-400 dark:text-slate-500'
                    }`} 
                  />
                </div>

                {/* Highly readable, bold display labels from distance */}
                <span className={`font-sans tracking-tight font-black leading-tight ${isCpu ? (isProjectionMode ? 'text-2xl md:text-3xl mt-2.5' : 'text-lg sm:text-1.5xl mt-1.5') : (isProjectionMode ? 'text-xl md:text-2xl mt-2' : 'text-sm sm:text-base mt-2')} ${palette.text}`}>
                  {node.name}
                </span>

                {/* Explicative detailed subtitles */}
                <p className={`font-sans leading-tight font-black ${isCpu ? 'text-2xs sm:text-xs text-rose-600 dark:text-rose-400/90 mt-1' : 'text-[10px] sm:text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5'}`}>
                  {node.desc}
                </p>

                {/* Local packet bounce shown if the step stays still inside this node */}
                {isComponentActive && !hasMovement && currentStep && (
                  <div className="mt-1.5 animate-bounce">
                    <span className="bg-orange-500 text-white font-extrabold font-mono text-[10px] sm:text-xs px-2 py-0.5 rounded shadow-xs block max-w-[170px] truncate">
                      📦 {currentStep.packetValue}
                    </span>
                  </div>
                )}
              </div>
            </foreignObject>
          );
        })}

        {/* 4. LARGER GLOWING FLOATING DATA PACKET PILL (Dynamic moving animated object) */}
        {hasMovement && currentStep && activePathD && (
          <g>
            {/* Elegant physical packet box */}
            <rect
              id="traveling-pulse-packet"
              x={isProjectionMode ? -90 : -75}
              y={isProjectionMode ? -24 : -19}
              width={isProjectionMode ? 180 : 150}
              height={isProjectionMode ? 48 : 38}
              rx={isProjectionMode ? 16 : 12}
              fill="#f97316"
              stroke="#ffffff"
              strokeWidth={isProjectionMode ? 3.5 : 2.5}
              className="shadow-md animate-pulse"
              filter="url(#projection-glow-orange)"
            />
            {/* Large clear high-contrast textual value inside packet */}
            <text
              id="traveling-pulse-packet-text"
              x="0"
              y="5"
              textAnchor="middle"
              fill="#ffffff"
              fontWeight="950"
              fontSize={isProjectionMode ? "17px" : "13px"}
              fontFamily="monospace"
              className="tracking-wide"
            >
              {currentStep.packetValue.length > 12 
                ? `${currentStep.packetValue.substring(0, 11)}...` 
                : currentStep.packetValue
              }
            </text>

            <animateMotion
              dur={isProjectionMode ? "2.6s" : "1.9s"} /* classroom projection friendly speed */
              repeatCount={isLastStep ? "1" : "indefinite"}
              fill="freeze"
              path={activePathD}
            />
          </g>
        )}
        </svg>
      </div> {/* ref={canvasRef} */}


    </div> {/* aspect ratio viewport */}

      {/* Centered Modal Popup for Simplified View */}
      {activePopupNodeId && (() => {
        const info = getMiniCompInfo(activePopupNodeId, learningLevel, language);
        return (
          <div 
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
            onClick={() => setActivePopupNodeId(null)}
          >
            <div 
              className="bg-white dark:bg-slate-900 border-2 border-emerald-300 dark:border-emerald-850 rounded-2xl p-6 md:p-8 shadow-2xl relative max-w-lg w-full flex flex-col gap-5 animate-scaleIn text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button X */}
              <button
                onClick={() => setActivePopupNodeId(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 transition-colors cursor-pointer"
                title={language === 'ar' ? 'إغلاق (Esc)' : language === 'en' ? 'Close (Esc)' : language === 'es' ? 'Cerrar (Esc)' : language === 'de' ? 'Schließen (Esc)' : 'Fermer (Esc)'}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4 mt-2">
                <span className="text-5xl filter drop-shadow-sm shrink-0">{info.emoji}</span>
                <div className="space-y-2">
                  <h4 className="font-extrabold text-lg md:text-xl text-slate-900 dark:text-slate-100 uppercase tracking-tight flex flex-wrap items-center gap-2">
                    <span>{info.name}</span>
                  </h4>
                  <p className="text-sm md:text-base text-slate-650 dark:text-slate-300 leading-relaxed font-semibold">
                    {info.desc}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-end mt-4 pt-4 border-t border-slate-101 dark:border-slate-800">
                <button
                  onClick={() => {
                    setActiveTab('schema');
                    setActiveComponentId(info.targetId);
                    setActivePopupNodeId(null);
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl inline-flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-xs"
                >
                  <span>{language === 'ar' ? 'عرض المزيد' : language === 'en' ? 'See more' : language === 'es' ? 'Ver más' : language === 'de' ? 'Mehr sehen' : 'Voir plus'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
