import React, { useState, useEffect } from 'react';
import { 
  Keyboard, 
  HelpCircle, 
  Cpu, 
  Database, 
  Settings, 
  Calculator, 
  HardDrive, 
  Monitor, 
  ArrowLeft,
  ArrowRightLeft,
  BookOpen,
  Info,
  Sparkles,
  Eye,
  ChevronRight,
  ChevronDown,
  Layers,
  Sliders,
  Compass,
  Zap,
  Network,
  Wifi,
  MousePointer,
  Copy,
  Mic,
  Video,
  Printer,
  Volume2,
  Smartphone,
  FolderOpen,
  Server,
  Compass as CompassIcon,
  Play,
  FileText,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLearning } from '../context/LearningContext';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedHierarchicalComponent } from '../data/hierarchicalTranslations';
import {
  DetailInfo,
  SubElement,
  UnderComponent,
  MainComponent,
  CategoryInfo,
  functionalCategories,
  physicalCategories
} from '../data/explorerComponentsData';
import MotherboardInteractiveDiagram from './MotherboardInteractiveDiagram';
import InterconnectionSchema from './InterconnectionSchema';

// Interactive educational SVG diagrams
import CpuArchitectureDiagram from './diagrams/CpuArchitectureDiagram';
import ControlUnitDiagram from './diagrams/ControlUnitDiagram';
import AluDiagram from './diagrams/AluDiagram';
import MotherboardDiagram from './diagrams/MotherboardDiagram';
import CacheHierarchyDiagram from './diagrams/CacheHierarchyDiagram';
import RamVolatilityDiagram from './diagrams/RamVolatilityDiagram';
import PsuDiagram from './diagrams/PsuDiagram';
import {
  GpuDiagram,
  RomDiagram,
  SsdDiagram,
  HddDiagram,
  InputDevicesDiagram,
  OutputDevicesDiagram,
  StorageDevicesDiagram
} from './diagrams/AdditionalDiagrams';

// Infographics assets
import dataBusInfographic from '../assets/images/data_bus_infographic_1782060373236.jpg';
import addressBusInfographic from '../assets/images/address_bus_infographic_1782060389643.jpg';
import controlBusInfographic from '../assets/images/control_bus_infographic_1782060402334.jpg';

// Helper components to load images with robust fallback (trying JPG first, then PNG, then falling back to Placeholder)
const CardImageWithFallback = ({ compId, alt, language, onClick }: { compId: string; alt: string; language: string; onClick?: (src: string) => void }) => {
  const [imgSrc, setImgSrc] = useState<string>(() => {
    if (compId === 'h_bus_data') return dataBusInfographic;
    if (compId === 'h_bus_addr') return addressBusInfographic;
    if (compId === 'h_bus_ctrl') return controlBusInfographic;
    return `/assets/components/${compId.replace('c_', '').replace('h_', '')}/card.jpg`;
  });
  const [useFallbackPlaceholder, setUseFallbackPlaceholder] = useState(false);

  useEffect(() => {
    if (compId === 'h_bus_data') {
      setImgSrc(dataBusInfographic);
      setUseFallbackPlaceholder(false);
    } else if (compId === 'h_bus_addr') {
      setImgSrc(addressBusInfographic);
      setUseFallbackPlaceholder(false);
    } else if (compId === 'h_bus_ctrl') {
      setImgSrc(controlBusInfographic);
      setUseFallbackPlaceholder(false);
    } else {
      setImgSrc(`/assets/components/${compId.replace('c_', '').replace('h_', '')}/card.jpg`);
      setUseFallbackPlaceholder(false);
    }
  }, [compId]);

  const handleError = () => {
    if (imgSrc && imgSrc.endsWith('.jpg')) {
      const cleanId = compId.replace('c_', '').replace('h_', '');
      setImgSrc(`/assets/components/${cleanId}/card.png`);
    } else {
      setUseFallbackPlaceholder(true);
    }
  };

  if (!useFallbackPlaceholder) {
    return (
      <div 
        onClick={() => onClick?.(imgSrc)}
        className="relative w-full h-36 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xs border border-slate-200/45 dark:border-slate-850 group/cardimg shrink-0 cursor-pointer flex items-center justify-center"
      >
        <img
          src={imgSrc}
          alt={alt}
          onError={handleError}
          className="max-w-full max-h-full object-contain p-2 transition-transform duration-500 group-hover/cardimg:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-36 bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 font-mono select-none group/placeholder overflow-hidden shrink-0"
    >
      <span className="text-xl mb-1 opacity-60">📷</span>
      <span className="font-extrabold tracking-wider uppercase text-[9px]">
        [ IMAGE PLACEHOLDER ]
      </span>
    </div>
  );
};

const HeroImageWithFallback = ({ compId, alt, language, onClick }: { compId: string; alt: string; language: string; onClick?: (src: string) => void }) => {
  const [imgSrc, setImgSrc] = useState<string>(() => {
    if (compId === 'h_bus_data') return dataBusInfographic;
    if (compId === 'h_bus_addr') return addressBusInfographic;
    if (compId === 'h_bus_ctrl') return controlBusInfographic;
    return `/assets/components/${compId.replace('c_', '').replace('h_', '')}/hero.jpg`;
  });
  const [useFallbackPlaceholder, setUseFallbackPlaceholder] = useState(false);

  useEffect(() => {
    if (compId === 'h_bus_data') {
      setImgSrc(dataBusInfographic);
      setUseFallbackPlaceholder(false);
    } else if (compId === 'h_bus_addr') {
      setImgSrc(addressBusInfographic);
      setUseFallbackPlaceholder(false);
    } else if (compId === 'h_bus_ctrl') {
      setImgSrc(controlBusInfographic);
      setUseFallbackPlaceholder(false);
    } else {
      setImgSrc(`/assets/components/${compId.replace('c_', '').replace('h_', '')}/hero.jpg`);
      setUseFallbackPlaceholder(false);
    }
  }, [compId]);

  const handleError = () => {
    if (imgSrc && imgSrc.endsWith('.jpg')) {
      const cleanId = compId.replace('c_', '').replace('h_', '');
      setImgSrc(`/assets/components/${cleanId}/hero.png`);
    } else {
      setUseFallbackPlaceholder(true);
    }
  };

  if (!useFallbackPlaceholder) {
    return (
      <div 
        onClick={() => onClick?.(imgSrc)}
        className="relative w-full h-52 sm:h-64 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xs border border-slate-200/50 dark:border-slate-800/80 group/heroimg cursor-pointer flex items-center justify-center"
      >
        <img
          src={imgSrc}
          alt={alt}
          onError={handleError}
          className="max-w-full max-h-full object-contain p-4 transition-transform duration-700 group-hover/heroimg:scale-[1.02]"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-52 sm:h-64 bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-450 dark:text-slate-600 font-mono select-none overflow-hidden group/hero shadow-xs"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-transparent opacity-50"></div>
      <span className="text-3xl mb-2.5 opacity-70">🖼️</span>
      <span className="font-extrabold tracking-wider uppercase text-xs">
        [ COMPONENT IMAGE PLACEHOLDER ]
      </span>
      <span className="text-[10px] text-slate-400/90 dark:text-slate-500 font-sans mt-1 text-center px-4 max-w-md">
        {language === 'ar' 
          ? 'منطقة مخصصة لإدراج صورة تعبيرية عالية الدقة للمكون الفني لاحقاً' 
          : 'Large visual area reserved for a future high-definition component cover or photograph.'}
      </span>
    </div>
  );
};


// Helper to get diagram/schema file extension based on item ID (returns 'png' for specified peripheral/storage components, and 'svg' for others)
const getFileExtension = (id: string): string => {
  const pngKeywords = [
    'clavier', 'souris', 'webcam', 'microphone', 'scanner', 
    'ecran', 'imprimante', 'hp', 'projecteur', 
    'ssd', 'hdd', 'cle_usb', 'sd_card',
    'input_dev', 'output_dev', 'storage_dev'
  ];
  const cleanId = id.toLowerCase().replace('c_', '').replace('h_', '');
  return pngKeywords.some(kw => cleanId.includes(kw)) ? 'png' : 'svg';
};

interface ExplorerComposantsProps {
  onBackToHome?: () => void;
}

export default function ExplorerComposants({ onBackToHome }: ExplorerComposantsProps) {
  // Navigation level states
  // level 1: category select grid
  // level 2: list of components inside selecion
  // level 3: specific component page
  // level 4: subcomponent page
  // level 5: general synthesis handout/syllabus (document de description de tous)
  const [currentLevel, setCurrentLevel] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedApproach, setSelectedApproach] = useState<'functional' | 'physical'>('functional');
  const [selectedCategory, setSelectedCategory] = useState<CategoryInfo | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<MainComponent | null>(null);
  const [selectedSubcomponent, setSelectedSubcomponent] = useState<UnderComponent | null>(null);
  
  // Tab-based filtering option inside lists
  const [listFilter, setListFilter] = useState<string>('all');
  
  // Trigger open states for elements
  const [openedInternalElement, setOpenedInternalElement] = useState<string | null>(null);

  const [activeLightbox, setActiveLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  const { learningLevel, activeComponentId, setActiveComponentId } = useLearning();
  const { componentsData, t, dir, language } = useLanguage();

  // Handle escape key to close lightbox or go back a level
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        if (activeLightbox) {
          setActiveLightbox(null);
        } else {
          // Go back depending on currentLevel
          if (currentLevel === 4) {
            setSelectedSubcomponent(null);
            setCurrentLevel(3);
          } else if (currentLevel === 3) {
            setSelectedComponent(null);
            setCurrentLevel(2);
          } else if (currentLevel === 2) {
            setSelectedCategory(null);
            setCurrentLevel(1);
          } else if (currentLevel === 5) {
            setCurrentLevel(1);
          } else if (currentLevel === 1 && onBackToHome) {
            onBackToHome();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeLightbox, currentLevel, onBackToHome]);

  // Handle cross-context component opening (from diagram clicks)
  useEffect(() => {
    if (activeComponentId) {
      // Find where this component is based on the diagram click
      const id = activeComponentId.toLowerCase();
      let foundComp: MainComponent | null = null;
      let foundCat: CategoryInfo | null = null;
      let foundApproach: 'functional' | 'physical' = 'functional';

      // Look in functional first
      for (const cat of functionalCategories) {
        const matches = cat.components.find(c => c.id.toLowerCase().includes(id) || id.includes(c.id.toLowerCase()));
        if (matches) {
          foundComp = matches;
          foundCat = cat;
          foundApproach = 'functional';
          break;
        }
      }

      // Look in physical next
      if (!foundComp) {
        for (const cat of physicalCategories) {
          const matches = cat.components.find(c => c.id.toLowerCase().includes(id) || id.includes(c.id.toLowerCase()));
          if (matches) {
            foundComp = matches;
            foundCat = cat;
            foundApproach = 'physical';
            break;
          }
        }
      }

      if (foundComp && foundCat) {
        setSelectedApproach(foundApproach);
        setSelectedCategory(foundCat);
        setSelectedComponent(getLocalizedHierarchicalComponent(foundComp, language));
        setCurrentLevel(3); // Direct access to Level 3 Card Detail Page
        setActiveComponentId(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [activeComponentId, language]);

  // Translate category utilities
  const getTranslatedCategoryStrings = (catId: string): { name: string; desc: string } => {
    const defaultVal = { name: '', desc: '' };
    const translations: Record<string, Record<string, { name: string; desc: string }>> = {
      peripheriques_entree: {
        fr: { name: "Périphériques d'entrée", desc: "Saisir des textes, sons ou images pour les envoyer à l'Unité Centrale." },
        en: { name: "Input Devices", desc: "Interact and send characters, coordinates or media to the Central Unit." },
        ar: { name: "أجهزة الإدخال", desc: "إدخال النصوص والأصوات والصور لإرسالها للمعالجة المركزية." },
        es: { name: "Dispositivos de Entrada", desc: "Introducir textos, sonidos o imágenes para mandarlos al CPU." },
        de: { name: "Eingabegeräte", desc: "Texte, Töne oder Bilder eingeben, um sie an die Zentraleinheit zu senden." }
      },
      unites_traitement: {
        fr: { name: "Unités de traitement", desc: "Résoudre et exécuter instantanément les calculs programmatiques." },
        en: { name: "Processing Units", desc: "Resolve and execute calculations instantly for all active systems." },
        ar: { name: "وحدات المعالجة", desc: "حل وتنفيذ الحسابات والعمليات البرمجية على الفور." },
        es: { name: "Unidades de Procesamiento", desc: "Resolver y ejecutar cálculos instantáneamente." },
        de: { name: "Prozessoreinheiten", desc: "Programmberechnungen sofort auflösen und ausführen." }
      },
      memores: {
        fr: { name: "Mémoires", desc: "Stockage de travail volatile ou sauvegarde de masse stable à long terme." },
        en: { name: "Memory Blocks", desc: "Volatile workspace buffer or permanent long-term storage drives." },
        ar: { name: "الذاكرة ومخازن البيانات", desc: "التخزين المؤقت النشط أو الحفظ الدائم للملفات والمعلومات." },
        es: { name: "Memorias", desc: "Almacenamiento de trabajo volátil o almacenamiento a largo plazo." },
        de: { name: "Arbeitsspeicher & Medien", desc: "Flüchtiger Arbeitsspeicher oder stabile Langzeitspeicherung." }
      },
      memoires: {
        fr: { name: "Mémoires", desc: "Stockage de travail volatile ou sauvegarde de masse stable à long terme." },
        en: { name: "Memory Blocks", desc: "Volatile workspace buffer or permanent long-term storage drives." },
        ar: { name: "الذاكرة ومخازن البيانات", desc: "التخزين المؤقت النشط أو الحفظ الدائم للملفات والمعلومات." },
        es: { name: "Memorias", desc: "Almacenamiento de trabajo volátil o almacenamiento a largo plazo." },
        de: { name: "Arbeitsspeicher & Medien", desc: "Flüchtiger Arbeitsspeicher oder stabile Langzeitspeicherung." }
      },
      bus_communication: {
        fr: { name: "Bus et communication", desc: "Fils microscopiques de transmission d'électricité et de messages de données sur la carte mère." },
        en: { name: "Buses & Highways", desc: "Physical copper tracks routing binary addresses and messages across all electronic chips." },
        ar: { name: "النواقل والممرات", desc: "مسارات نحاسية رقيقة لنقل الكهرباء والإشارات عبر اللوحة الأم." },
        es: { name: "Buses y Comunicación", desc: "Pistas microscópicas de cobre para enviar datos en la placa base." },
        de: { name: "Busse & Datenwege", desc: "Mikroskopische Leiterbahnen zur Strom- und Datenübertragung auf dem Mainboard." }
      },
      peripheriques_sortie: {
        fr: { name: "Périphériques de sortie", desc: "Restituer et projeter les signaux calculés sous forme visuelle ou sonore." },
        en: { name: "Output Devices", desc: "Express and project calculated outputs as beautiful visuals, prints or acoustic sounds." },
        ar: { name: "أجهزة الإخراج", desc: "عرض الرسوميات والأصوات والبيانات المحسوبة للمستخدم." },
        es: { name: "Dispositivos de Salida", desc: "Proyectar los resultados de los cálculos en formato visual, sonoro o de papel." },
        de: { name: "Ausgabegeräte", desc: "Berechnete Signale direkt visuell oder akustisch wiedergeben." }
      },
      peripheriques_entree_sortie: {
        fr: { name: "Périphériques d'entrée/sortie", desc: "Transit bidirectionnel polyvalent pour capter l'ordre puis afficher le résultat." },
        en: { name: "Input/Output Peripherals", desc: "Versatile bidirectional interaction blocks facilitating intake and feedback." },
        ar: { name: "أجهزة الإدخال والإخراج المختلطة", desc: "التدفق المتبادل لاستقبال الأوامر وعرض النتائج في نفس الوقت." },
        es: { name: "Periféricos de Entrada/Salida", desc: "Tránsito bidireccional para captar órdenes y proyectar resultados." },
        de: { name: "Ein-/Ausgabegeräte (I/O)", desc: "Vielseitiger zweiseitiger Datentransport zur Steuerung und Rückmeldung." }
      },
      peripheriques_stockage: {
        fr: { name: "Périphériques de stockage", desc: "Placards externes amovibles pour emporter de façon robuste vos fichiers." },
        en: { name: "Storage Peripherals", desc: "Removable external keys or cartridges protecting your saved directories." },
        ar: { name: "أجهزة التخزين الخارجية", desc: "مخازن خارجية متنقلة لحفظ الملفات ونقلها بأمان." },
        es: { name: "Periféricos de Almacenamiento", desc: "Dispositivos externos extraíbles para almacenar archivos de forma segura." },
        de: { name: "Externe Speichermedien", desc: "Abnehmbare externe Datenträger, um Dateien sicher mitzunehmen." }
      },
      unite_centrale: {
        fr: { name: "Unité Centrale (Interne)", desc: "Tous les organes électroniques principaux sécurisés à l'intérieur de la caisse." },
        en: { name: "Central Unit (Internal)", desc: "The foundational electronic structures secured safely inside the main tower." },
        ar: { name: "الوحدة المركزية (داخلي)", desc: "جميع المكونات واللوحات الحيوية المثبتة بأمان داخل علبة الكمبيوتر." },
        es: { name: "Unidad Central (Interno)", desc: "Estructuras fundamentales protegidas dentro de la caja de la computadora." },
        de: { name: "Zentraleinheit (Intern)", desc: "Alle wichtigen Elektronikkomponenten, die sicher im Gehäuse geschützt sind." }
      },
      peripheriques_externes: {
        fr: { name: "Périphériques Externes", desc: "Appareils connectés à l'Unité Centrale depuis le plan extérieur." },
        en: { name: "External Peripherals", desc: "Peripheral hardware tools interfacing with the Central Unit from outside." },
        ar: { name: "الملحقات الخارجية", desc: "أجهزة تواصل وتحكم تتصل بالصندوق المركزي من الخارج." },
        es: { name: "Periféricos Externos", desc: "Herramientas de hardware conectadas con el CPU desde el exterior." },
        de: { name: "Externe Peripherie", desc: "Geräte, die von außen an die Zentraleinheit angeschlossen sind." }
      }
    };

    const res = translations[catId]?.[language] || translations[catId]?.['fr'] || defaultVal;
    return res;
  };

  // Safe navigation helpers
  const handleSelectCategory = (category: CategoryInfo) => {
    setSelectedCategory(category);
    setCurrentLevel(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectComponent = (comp: MainComponent) => {
    setSelectedComponent(getLocalizedHierarchicalComponent(comp, language));
    setCurrentLevel(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSubcomponent = (under: UnderComponent) => {
    setSelectedSubcomponent(under);
    setCurrentLevel(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Breadcrumbs text indicators
  const getBreadcrumbTitle = (level: number) => {
    if (level === 1) {
      return language === 'ar' ? 'البداية' : language === 'en' ? 'Explorer Home' : 'Accueil Exploration';
    }
    if (level === 2 && selectedCategory) {
      return getTranslatedCategoryStrings(selectedCategory.id).name;
    }
    if (level === 3 && selectedComponent) {
      return selectedComponent.name;
    }
    if (level === 4 && selectedSubcomponent) {
      return selectedSubcomponent.name;
    }
    return '';
  };

  const categoriesToRender = selectedApproach === 'functional' ? functionalCategories : physicalCategories;

  // Render Category counter helper
  const getComponentCount = (catId: string) => {
    const list = categoriesToRender.find(c => c.id === catId);
    if (!list) return 0;
    
    // In peripheral cards we have specialized subcomponents
    if (catId.includes('peripheriques')) {
      // Input / Output lists
      let sum = 0;
      list.components.forEach(m => {
        if (m.underComponents) sum += m.underComponents.length;
      });
      return sum > 0 ? sum : list.components.length;
    }
    return list.components.length;
  };

  // Layout components rendering
  const isRTL = language === 'ar';

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col gap-6 select-none ${isRTL ? 'rtl' : 'ltr'}`} id="simulation-page-root" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* HEADER CONTROLS BAR: PROGRESSIVE LEARNING AND CLASSIFICATION VIEW TOGGLE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <span>
              {language === 'ar' ? 'مستكشف المكونات' : language === 'de' ? 'Hardware-Explorer' : language === 'es' ? 'Explorador de Componentes' : language === 'en' ? 'Hardware Core Explorer' : 'Explorateur de Composants'}
            </span>
          </h2>
          <p className="text-slate-500 text-xs md:text-sm font-medium">
            {language === 'ar' ? 'تتبع الهيكل الفني الداخلي وآلية تداول البيانات خطوة بخطوة.' : language === 'de' ? 'Entdecken Sie die innere Architektur und den Datenfluss Schritt für Schritt.' : language === 'es' ? 'Descubra la arquitectura interna y la comunicación de datos paso a paso.' : language === 'en' ? 'Trace the internal physical architecture of your computer sequentially.' : 'Visualisez la structure physique interne et la communication des impulsions.'}
          </p>
        </div>

        {/* Level 1 / Level 5 View Toggle: Classification & Synthesis approach selection */}
        {(currentLevel === 1 || currentLevel === 5) && (
          <div className="flex items-center gap-2 self-start md:self-center">
            <span className="text-xs font-black text-slate-400 font-mono hidden sm:inline">
              {language === 'ar' ? 'منظور التصنيف:' : language === 'en' ? 'Classification:' : 'Syllabus :'}
            </span>
            <div className="p-1 bg-slate-100 dark:bg-slate-950 rounded-2xl flex border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setCurrentLevel(1);
                  setSelectedApproach('functional');
                }}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                  currentLevel === 1 && selectedApproach === 'functional'
                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-205/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/80'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>{language === 'ar' ? 'حسب الوظيفة' : language === 'en' ? 'Functional' : 'Fonctionnelle'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentLevel(1);
                  setSelectedApproach('physical');
                }}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                  currentLevel === 1 && selectedApproach === 'physical'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-205/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/80'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>{language === 'ar' ? 'حسب الموقع' : language === 'en' ? 'Physical' : 'Physique'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* BREADCRUMBS NAVIGATION: DYNAMIC VISUAL MARKERS */}
      {currentLevel > 1 && currentLevel < 5 && (
        <div className="flex flex-wrap items-center gap-2 bg-slate-100/60 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 px-5 py-3 rounded-2xl text-xs text-slate-600 dark:text-slate-400 select-none">
          <button
            onClick={() => {
              setCurrentLevel(1);
              setSelectedCategory(null);
              setSelectedComponent(null);
              setSelectedSubcomponent(null);
            }}
            className="font-bold hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer flex items-center gap-1"
          >
            <span>{language === 'ar' ? 'الرئيسية' : 'Explorer'}</span>
          </button>
          
          <ChevronRight className={`w-3.5 h-3.5 text-slate-350 shrink-0 ${isRTL ? 'rotate-180' : ''}`} />

          <button
            disabled={currentLevel === 2}
            onClick={() => {
              setCurrentLevel(2);
              setSelectedComponent(null);
              setSelectedSubcomponent(null);
            }}
            className={`font-bold transition ${
              currentLevel === 2 
                ? 'text-slate-900 dark:text-white' 
                : 'hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer'
            }`}
          >
            {getBreadcrumbTitle(2)}
          </button>

          {currentLevel > 2 && selectedComponent && (
            <>
              <ChevronRight className={`w-3.5 h-3.5 text-slate-350 shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
              <button
                disabled={currentLevel === 3}
                onClick={() => {
                  setCurrentLevel(3);
                  setSelectedSubcomponent(null);
                }}
                className={`font-bold transition ${
                  currentLevel === 3 
                    ? 'text-slate-900 dark:text-white' 
                    : 'hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer'
                }`}
              >
                {selectedComponent.name}
              </button>
            </>
          )}

          {currentLevel > 3 && selectedSubcomponent && (
            <>
              <ChevronRight className={`w-3.5 h-3.5 text-slate-350 shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
              <span className="font-extrabold text-slate-900 dark:text-white">
                {selectedSubcomponent.name}
              </span>
            </>
          )}

          {/* FLUID STEP BACK ACTION */}
          <div className={`mr-auto ${isRTL ? 'mr-0 ml-auto' : 'ml-auto'}`}>
            <button
              onClick={() => {
                if (currentLevel === 4) {
                  setCurrentLevel(3);
                  setSelectedSubcomponent(null);
                } else if (currentLevel === 3) {
                  setCurrentLevel(2);
                  setSelectedComponent(null);
                } else if (currentLevel === 2) {
                  setCurrentLevel(1);
                  setSelectedCategory(null);
                }
              }}
              className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-205 rounded-xl text-xs font-bold text-slate-700 cursor-pointer flex items-center gap-1 shadow-2xs transition-all hover:scale-102"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              <span>{language === 'ar' ? 'السابق' : 'Retour'}</span>
            </button>
          </div>
        </div>
      )}

      {/* CORE DISPLAY STAGE WITH ANIMATION ROUTINGS */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          
          {/* ==================================================== */}
          {/* LEVEL 1 — THEME/CATEGORY CARDS GRID                  */}
          {/* ==================================================== */}
          {currentLevel === 1 && (
            <motion.div
              key="explorer-level-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {categoriesToRender.map((cat, idx) => {
                const count = getComponentCount(cat.id);
                // Dynamically fetch translations
                const translated = getTranslatedCategoryStrings(cat.id);
                const title = translated.name || cat.name;
                const desc = translated.desc || cat.description;
                
                // Color mapping
                const isFunctional = selectedApproach === 'functional';
                const mainColor = isFunctional ? 'text-emerald-600 border-emerald-100' : 'text-blue-600 border-blue-100';
                
                return (
                  <div
                    key={cat.id}
                    className="group bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xs transition-all duration-300 hover:scale-103 hover:border-emerald-500/40 hover:shadow-md relative overflow-hidden"
                  >
                    {/* Tiny gradient border glow index on hover */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="space-y-4">
                      {/* Top Row: Category Visual Theme Icon */}
                      <div className="flex items-center justify-between">
                        <div className={`p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-teal-600 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 group-hover:text-emerald-500 transition-all duration-300`}>
                          {cat.id.includes('entree') ? <Keyboard className="w-6 h-6" /> :
                           cat.id.includes('sortie') ? <Monitor className="w-6 h-6" /> :
                           cat.id.includes('traitement') ? <Cpu className="w-6 h-6" /> :
                           cat.id.includes('mem') ? <Database className="w-6 h-6" /> :
                           cat.id.includes('bus') ? <ArrowRightLeft className="w-6 h-6" /> :
                           cat.id.includes('alimentation') ? <Zap className="w-6 h-6" /> :
                           cat.id.includes('unite_centrale') ? <Layers className="w-6 h-6" /> :
                           <Smartphone className="w-6 h-6" />}
                        </div>
                        {/* Number of elements indicator */}
                        <span className="font-mono text-xs font-black text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-950 px-3 py-1 rounded-xl border border-slate-100 h-fit">
                          {count} {language === 'ar' ? 'محتويات' : language === 'en' ? 'items' : 'éléments'}
                        </span>
                      </div>

                      {/* Name & desc */}
                      <div className="space-y-1.5">
                        <h3 className="text-lg font-black text-slate-950 dark:text-white tracking-tight leading-snug">
                          {title}
                        </h3>
                        <p className="text-slate-600 text-xs md:text-sm leading-relaxed text-slate-400/90 font-medium">
                          {desc}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectCategory(cat)}
                      className="mt-6 w-full py-3 bg-slate-55 bg-slate-50 hover:bg-emerald-600 hover:text-white text-emerald-600 dark:bg-slate-800 dark:hover:bg-emerald-900 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-transparent hover:scale-102 shadow-2xs group-hover:border-emerald-500/20"
                    >
                      <span>
                        {language === 'ar' ? 'عرض المكونات الفنية' : language === 'de' ? 'Komponenten anzeigen' : language === 'es' ? 'Ver componentes' : language === 'en' ? 'See hardware components' : 'Voir les composants'}
                      </span>
                      <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* ==================================================== */}
          {/* LEVEL 2 — COMPONENT CARDS LIST                       */}
          {/* ==================================================== */}
          {currentLevel === 2 && selectedCategory && (
            <motion.div
              key="explorer-level-2"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Category Showcase Ribbon */}
              <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 pl-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 block">
                    {selectedApproach === 'functional'
                      ? (language === 'ar' ? 'التصنيف العملي والوظيفي' : 'Classification Fonctionnelle')
                      : (language === 'ar' ? 'التصنيف المادي والتركيبي' : 'Classification Physique')}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                    {getTranslatedCategoryStrings(selectedCategory.id).name}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-4xl">
                    {getTranslatedCategoryStrings(selectedCategory.id).desc}
                  </p>
                </div>
              </div>

              {/* Grid of clean, highly visual component cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedCategory.components.map((c) => {
                  const comp = getLocalizedHierarchicalComponent(c, language);
                  const Icon = comp.icon;
                  
                  return (
                    <div
                      key={comp.id}
                      className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300 hover:border-emerald-500/40 hover:-translate-y-1 relative"
                    >
                      <div className="space-y-4">
                        {/* Top: Header icon, name and micro role badge */}
                        <div className="flex items-start gap-3.5">
                          <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-3xs">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                              {comp.name}
                            </h4>
                            <span className="inline-block text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 border border-slate-100/80 px-2 py-0.5 rounded-md font-mono">
                              {language === 'ar' ? 'الدور:' : 'Rôle :'} {comp.roleBadge}
                            </span>
                          </div>
                        </div>

                        {/* Short description - No massive paragraphs */}
                        <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed mt-1">
                          {comp.shortDescription}
                        </p>

                        {/* Image Container with Fallback moved below the description */}
                        <CardImageWithFallback compId={comp.id} alt={comp.name} language={language} onClick={(src) => setActiveLightbox({ src, alt: comp.name })} />
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                        {comp.underComponents && comp.underComponents.length > 0 ? (
                          <span className="text-xs font-bold text-slate-450 text-slate-400 flex items-center gap-1">
                            <Info className="w-3.5 h-3.5 text-slate-350" />
                            <span>
                              {comp.underComponents.length} {language === 'ar' ? 'أعضاء فرعية' : 'sous-composant(s)'}
                            </span>
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                            <HexGlowDot />
                            <span>{language === 'ar' ? 'مكتمل' : 'Fiche unitaire'}</span>
                          </span>
                        )}

                        <button
                          onClick={() => handleSelectComponent(c)}
                          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1 transition-all cursor-pointer shadow-sm hover:scale-102"
                        >
                          <span>{language === 'ar' ? 'سير الدرس والدراسة' : 'En savoir plus'}</span>
                          <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ==================================================== */}
          {/* LEVEL 3 — COMPONENT DETAIL PAGE                      */}
          {/* ==================================================== */}
          {currentLevel === 3 && selectedComponent && (
            <motion.div
              key="explorer-level-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* 1. Header Section */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden shadow-xs">
                {/* Visual grid decor */}
                <div className="absolute inset-0 bg-radial-grid opacity-5 pointer-events-none"></div>

                <div className="p-5 md:p-6 bg-slate-800/80 rounded-2xl border border-slate-700 text-emerald-400 shadow-inner scale-102 flex items-center justify-center shrink-0">
                  {(() => {
                    const ElementIcon = selectedComponent.icon;
                    return <ElementIcon className="w-10 h-10" />;
                  })()}
                </div>

                <div className="space-y-2 flex-grow text-center md:text-left">
                  <span className="text-[10px] md:text-xs uppercase font-extrabold tracking-widest text-emerald-405 text-emerald-400 font-mono bg-emerald-900/30 px-3 py-1 rounded-md border border-emerald-500/10">
                    {language === 'ar' ? 'لوحة دراسة المكون الفني المتميز' : 'Fiche Didactique Globale Premium'}
                  </span>
                  <h3 className="text-xl md:text-3xl font-black tracking-tight leading-none mt-1">
                    {selectedComponent.name}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-350 leading-relaxed font-semibold max-w-2xl">
                    "{selectedComponent.shortDescription}"
                  </p>
                </div>
              </div>

              {/* 2. Main Educational Visualization Section (PRIORITIZED BEFORE ANY LONG TEXT) */}
              <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-5 md:p-7 space-y-4 shadow-3xs">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h4 className="text-xs font-black uppercase text-slate-455 text-slate-400 tracking-widest font-mono flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-emerald-500" />
                    <span>{language === 'ar' ? 'المخطط التفاعلي البيداغوجي المعتمد' : 'Visualisation Interactive Majeure'}</span>
                  </h4>
                  <span className="text-[9px] bg-emerald-100/60 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-mono font-bold px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-950">LIVE MODEL</span>
                </div>
                
                <div className="w-full animate-fadeIn min-h-[300px] flex items-center justify-center animate-fadeIn duration-500">
                  {selectedComponent.id === 'h_cpu' ? (
                    <CpuArchitectureDiagram />
                  ) : selectedComponent.id === 'h_motherboard' ? (
                    <div className="space-y-6 w-full">
                      <MotherboardInteractiveDiagram language={language} />
                      <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4">
                        <MotherboardDiagram />
                      </div>
                    </div>
                  ) : selectedComponent.id === 'h_cache' ? (
                    <CacheHierarchyDiagram />
                  ) : selectedComponent.id === 'h_ram' ? (
                    <RamVolatilityDiagram />
                  ) : selectedComponent.id === 'h_psu' ? (
                    <PsuDiagram />
                  ) : selectedComponent.id === 'h_gpu' ? (
                    <GpuDiagram language={language} />
                  ) : selectedComponent.id === 'h_rom' ? (
                    <RomDiagram language={language} />
                  ) : selectedComponent.id === 'h_ssd' ? (
                    <SsdDiagram language={language} />
                  ) : selectedComponent.id === 'h_hdd' ? (
                    <HddDiagram language={language} />
                  ) : selectedComponent.id === 'h_input_dev' ? (
                    <InputDevicesDiagram language={language} />
                  ) : selectedComponent.id === 'h_output_dev' ? (
                    <OutputDevicesDiagram language={language} />
                  ) : selectedComponent.id === 'h_storage_dev' ? (
                    <StorageDevicesDiagram language={language} />
                  ) : ['h_bus_data', 'h_bus_addr', 'h_bus_ctrl'].includes(selectedComponent.id) ? (
                    <div className="space-y-6 w-full">
                      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-850 shadow-2xs aspect-video relative group/infographic cursor-zoom-in bg-white dark:bg-slate-950 max-w-3xl mx-auto">
                        <img 
                          src={
                            selectedComponent.id === 'h_bus_data' ? dataBusInfographic :
                            selectedComponent.id === 'h_bus_addr' ? addressBusInfographic :
                            controlBusInfographic
                          }
                          alt={selectedComponent.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/infographic:scale-[1.03]"
                          onClick={() => setActiveLightbox({
                            src: selectedComponent.id === 'h_bus_data' ? dataBusInfographic :
                                 selectedComponent.id === 'h_bus_addr' ? addressBusInfographic :
                                 controlBusInfographic,
                            alt: selectedComponent.name
                          })}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-slate-950/0 group-hover/infographic:bg-slate-950/20 transition-all duration-305 flex items-center justify-center">
                          <span className="bg-slate-900/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover/infographic:opacity-100 scale-95 group-hover/infographic:scale-100 transition-all duration-300 shadow-lg select-none">
                            🔍 {language === 'ar' ? 'تكبير ملء الشاشة' : 'Agrandir l’image'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Dynamic conceptual loaders based on classification keywords */
                    selectedComponent.id.includes('entree') ? (
                      <InputDevicesDiagram language={language} />
                    ) : selectedComponent.id.includes('sortie') ? (
                      <OutputDevicesDiagram language={language} />
                    ) : selectedComponent.id.includes('stockage') ? (
                      <StorageDevicesDiagram language={language} />
                    ) : (
                      <StorageDevicesDiagram language={language} />
                    )
                  )}
                </div>
              </div>

              {/* 3. Definition + Real-Life Analogy Section (Desktop side-by-side, mobile stacked) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Definition and core explanation */}
                <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-4 flex flex-col justify-between shadow-3xs">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-widest font-mono flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-850 pb-2.5">
                      <HelpCircle className="w-4 h-4 text-emerald-500" />
                      <span>{language === 'ar' ? 'التعريف والوظائف الرئيسية' : 'Définition Technique & Fonctions'}</span>
                    </h4>
                    <p className="text-slate-950 dark:text-slate-50 text-sm md:text-base leading-relaxed font-bold">
                      {selectedComponent.details.definition}
                    </p>
                    <p className="text-slate-800 dark:text-slate-200 text-xs md:text-sm leading-relaxed font-semibold">
                      {selectedComponent.details.fonction}
                    </p>
                  </div>
                </div>

                {/* Analogy & Example Card */}
                <div className="bg-amber-50/50 dark:bg-amber-950/10 border-2 border-amber-200 dark:border-amber-800 rounded-3xl p-6 md:p-8 space-y-4 flex flex-col justify-between shadow-3xs">
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase font-black text-amber-800 dark:text-amber-300 tracking-wider font-mono bg-amber-100 dark:bg-amber-900/30 px-2.5 py-1 rounded-md h-fit w-fit flex items-center gap-1 font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'مثال تقريبي من واقع الفصل' : 'Analogie Concrète & Exemple'}</span>
                    </span>
                    <p className="text-amber-955 dark:text-amber-100 text-sm italic leading-relaxed font-bold">
                      "{selectedComponent.details.exemple}"
                    </p>
                  </div>
                </div>
              </div>

              {/* High-Quality Interactive Visual Interconnection Schema */}
              {['h_cpu', 'h_uc', 'h_ual', 'h_motherboard', 'h_cache', 'h_ram', 'h_psu', 'h_alimentation'].includes(selectedComponent.id) ? (
                <div className="w-full">
                  <InterconnectionSchema componentId={selectedComponent.id} language={language} />
                </div>
              ) : selectedComponent.details.schema ? (
                /* Fallback to classic styled ASCII layout if no specific visual schema */
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-3xl p-5 md:p-6 font-mono text-xs overflow-x-auto text-emerald-650 dark:text-emerald-400 leading-normal transition-colors duration-300">
                  <span className="text-slate-500 dark:text-slate-400 text-[9px] uppercase font-sans tracking-wide font-black block mb-2 border-b border-slate-200 dark:border-slate-850 pb-2">
                    {language === 'ar' ? 'مخطط التوصيل الكهربائي:' : "Schéma d'interconnexion :"}
                  </span>
                  <pre className="whitespace-pre font-semibold leading-relaxed">
                    {selectedComponent.details.schema}
                  </pre>
                </div>
              ) : null}

              {/* 4. How It Works Section (The general process flow model) */}
              {(() => {
                const stepsDict: Record<string, { title: string; desc: string }[]> = {
                  h_cpu: [
                    { 
                      title: language === 'ar' ? '1. جلب التعليمة (Fetch)' : '1. Charger la commande (Fetch)', 
                      desc: language === 'ar' ? 'قراءة التعليمة التالية ميكرو-ثنائياً من الذاكرة العشوائية RAM عبر ناقل البيانات.' : 'Le processeur récupère l’octet binaire d’instruction stocké en RAM à l’adresse spécifiée.' 
                    },
                    { 
                      title: language === 'ar' ? '2. تفكيك الشفرة (Decode)' : '2. Décoder le code (Decode)', 
                      desc: language === 'ar' ? 'تفكيك الرموز وترجمتها لنهايات ونبضات كهربائية بداخل وحدة التحكم للحاسوب.' : 'L’unité de contrôle décompile le binaire brut pour identifier l’opération et les registres concernés.' 
                    },
                    { 
                      title: language === 'ar' ? '3. التنفيذ الميكانيكي (Execute)' : '3. Exécuter l’action (Execute)', 
                      desc: language === 'ar' ? 'تنفيذ دورتها بواسطة تفعيل العتاد المناسب مثل وحدة الحساب والمنطق ALU للجمع أو المقارنة.' : 'L’unité arithmétique et logique (UAL) effectue l’action demandée, puis écrit le résultat.' 
                    }
                  ],
                  h_ram: [
                    { 
                      title: language === 'ar' ? '1. رصد العنوان المطلبي' : '1. Localisation d’adresse', 
                      desc: language === 'ar' ? 'استقبل كود الإحداثيات المطلوب عبر ناقل العناوين قادماً من المعالج.' : 'Le décodeur d’adresses intercepte la demande envoyée via le bus d’adresses.' 
                    },
                    { 
                      title: language === 'ar' ? '2. تنشيط المكثفات' : '2. Ouverture des grilles', 
                      desc: language === 'ar' ? 'توصيل شحنة صغيرة بأسطر خلايا السليكون المصممة لتخزين الحالات المؤقتة (DRAM).' : 'Le contrôleur applique une tension sur les lignes d’ouverture des condensateurs visés.' 
                    },
                    { 
                      title: language === 'ar' ? '3. تصدير سيل البيانات' : '3. Transit des données', 
                      desc: language === 'ar' ? 'توصيل وتسليم البيانات بالتيار المسترسل عبر خطوط النواقل بحدود Nanoseconds.' : 'Les charges électriques restantes s’écoulent par le bus de données vers les registres CPU.' 
                    }
                  ],
                  h_rom: [
                    { 
                      title: language === 'ar' ? '1. نبض زر التشغيل' : '1. Allumage électrique', 
                      desc: language === 'ar' ? 'استقبال الشارة الأولى وتغذية سطر الـ BIOS المستقل لمعاينة المكونات.' : 'Dès que l’interrupteur envoie la tension, la carte mère réveille le code d’amorçage.' 
                    },
                    { 
                      title: language === 'ar' ? '2. استقراء الكود المحفور' : '2. Balayage permanent', 
                      desc: language === 'ar' ? 'استقصاء وقراءة الكود الدائم المحفور دقة تامة لحل شفرة الكلمات الأولية.' : 'Le processeur charge direct le microcode gravé à demeure et inaltérable de la puce.' 
                    },
                    { 
                      title: language === 'ar' ? '3. تسليم مفتاح التحكم' : '3. Relais de boot', 
                      desc: language === 'ar' ? 'مباشرة وإنهاء فحص الذات POST لتسليم دفة القيادة لنظام الحاسوب الدائم على الهارد.' : 'Le BIOS localise le master code d’amorçage sur l’unité de masse et lui cède les manettes.' 
                    }
                  ],
                  h_motherboard: [
                    { 
                      title: language === 'ar' ? '1. تهيئة خطوط التوزيع' : '1. Stabilisation électrique', 
                      desc: language === 'ar' ? 'تنظيم خطوط الجهد الواردة من مزود الطاقة لتفادي أي تلف بالقطع الحساسة.' : 'Le régulateur filtre et distribue des tensions continues stables aux différents étages.' 
                    },
                    { 
                      title: language === 'ar' ? '2. ربط النواقل النحاسية' : '2. Interconnexion des bus', 
                      desc: language === 'ar' ? 'إنفاذ وتوصيل النحاسي بمسافات بالغة الدقة لتفادي التدخل المنعكس للإشارات.' : 'Les bus de communication (lignes de cuivre) routent l’information sans croisements.' 
                    },
                    { 
                      title: language === 'ar' ? '3. مواءمة الترددات' : '3. Cadencement global', 
                      desc: language === 'ar' ? 'تنسيق التزامن مع مذبذب الكوارتز لضمان جريان آمن ومتناظر للمعلومات.' : 'Garantit l’homogénéité des temps de trajets des bits sous l’égide de l’horloge.' 
                    }
                  ],
                  h_gpu: [
                    { 
                      title: language === 'ar' ? '1. استيراد الإحداثيات' : '1. Import géométrique', 
                      desc: language === 'ar' ? 'استيراد مصفوفات الفضاء والأشياء الهندسية من المعالج عبر PCIe.' : 'Le GPU réceptionne les données géométriques de l’univers virtuel envoyées par le CPU.' 
                    },
                    { 
                      title: language === 'ar' ? '2. التكسير المسطح للبكسل' : '2. Rastérisation 2D', 
                      desc: language === 'ar' ? 'تحليل النماذج ثلاثية الأبعاد وتحويلها لخطوط وملاحة بكسلات على شاشة مسطحة.' : 'Projette instantanément ces coordonnées théoriques 3D en une matrice de pixels 2D.' 
                    },
                    { 
                      title: language === 'ar' ? '3. معالجة الظلال والألوان' : '3. Pixel Shaders & VRAM', 
                      desc: language === 'ar' ? 'حساب الإضاءة الفيزيائية والظلال على آلاف الأنوية المتوازية وكتابتها بالـ VRAM.' : 'Calcule la couleur de chaque point selon les sources de lumière avant l’envoi final.' 
                    }
                  ],
                  h_ssd: [
                    { 
                      title: language === 'ar' ? '1. ربط الفهرسة الذكية' : '1. Mapping logique LBA', 
                      desc: language === 'ar' ? 'ربط عناوين النظام البرمجية بمصفوفات ناند المادية ومتابعة مؤشر التآكل.' : 'Le contrôleur associe la requête logique système avec les coordonnées physiques réelles.' 
                    },
                    { 
                      title: language === 'ar' ? '2. دفع الإلكترونات بالأنفاق' : '2. Effet Tunnel électrons', 
                      desc: language === 'ar' ? 'دفع الشحنات بجهد كهربائي مرتفع عبر جدار إسمنتي معزول لحفظ الرقم الثنائي.' : 'Injecte des charges d’électrons à travers une barrière isolante dans la grille flottante.' 
                    },
                    { 
                      title: language === 'ar' ? '3. تأمين الحبس الدائم' : '3. Conservation hermétique', 
                      desc: language === 'ar' ? 'عزل تام يحبس الشحنة لمنع ضياع الملفات لعقود حتى دون طاقة كهربائية.' : 'Les isolants piègent hermétiquement la charge pour préserver le fichier sans électricité.' 
                    }
                  ],
                  h_hdd: [
                    { 
                      title: language === 'ar' ? '1. تدوير الأقراص الرقيقة' : '1. Rotation uniforme', 
                      desc: language === 'ar' ? 'تدوير الأقراص المغناطيسية بسرعة 7200 دورة بالدقيقة لخلق عازل هوائي.' : 'Fait pivoter l’axe moteur de cuivre pour élever la vitesse à 7200 ou 5400 RPM.' 
                    },
                    { 
                      title: language === 'ar' ? '2. تموضع رأس القراءة' : '2. Glide micrométrique', 
                      desc: language === 'ar' ? 'تموضع ذراع الملف الصوتي بدقة نانوية للوقوف والطفو فوق مسار الحفظ المغناطيسي.' : 'L’actuateur oriente le bras au-dessus de la piste cible de façon instantanée.' 
                    },
                    { 
                      title: language === 'ar' ? '3. استشعار الحث المغناطيسي' : '3. Induction magnétique', 
                      desc: language === 'ar' ? 'التقاط ذبذبات الأقطاب وترجمتها لإشارات تيار مستمر تمثل الثنائيات 0 و 1.' : 'La tête inductrice capte la polarité ou réaligne les cristaux ferromagnétiques.' 
                    }
                  ]
                };

                const currentSteps = stepsDict[selectedComponent.id] || [
                  { 
                    title: language === 'ar' ? '1. الاستقبال والتهيئة' : '1. Prise en charge brute', 
                    desc: language === 'ar' ? 'تجهيز قناة المكون البشري أو العتادي لاستقبال سيل التعليمات.' : 'Prépare le canal d’activation séquentiel pour recueillir les instructions.' 
                  },
                  { 
                    title: language === 'ar' ? '2. إدارة الحركة والتداول' : '2. Traitement dynamique', 
                    desc: language === 'ar' ? 'تحويل الحركة المادية أو الإشارة الكهربائية إلى نبض ثنائي ذكي.' : 'Traite et transcode les signaux physiques sous l’égide du bus système.' 
                  },
                  { 
                    title: language === 'ar' ? '3. إغلاق دورة المعالجة' : '3. Fin de cycle opération', 
                    desc: language === 'ar' ? 'إخطار العتاد المركزي بنجاح دورة العمل للبدء بدورة معالجة تالية.' : 'Confirme à l’hôte Von Neumann la réussite de l’écriture pour entamer le cycle suivant.' 
                  }
                ];

                return (
                  <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-3xs">
                    <div className="border-b border-slate-100 dark:border-slate-850 pb-3 flex items-center justify-between">
                      <h4 className="text-sm font-black uppercase text-slate-800 dark:text-slate-100 font-mono flex items-center gap-2">
                        <Settings className="w-5 h-5 text-emerald-550 text-emerald-500 animate-spin-slow" />
                        <span>{language === 'ar' ? 'دورة الحركة خطوة بخطوة (How It Works)' : 'Processus Logique de Fonctionnement'}</span>
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">FLOW GRAPH</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                      {currentSteps.map((s, idx) => (
                        <div 
                          key={idx} 
                          className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-2xl p-5 space-y-2.5 relative group hover:border-emerald-500/20 hover:bg-white dark:hover:bg-slate-900 transition duration-300"
                        >
                          <div className="absolute -top-3.5 left-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-mono font-black text-xs w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                            0{idx + 1}
                          </div>
                          <h5 className="font-extrabold text-sm text-slate-900 dark:text-white pt-2">
                            {s.title}
                          </h5>
                          <p className="text-xs text-slate-600 dark:text-slate-405 text-slate-400 leading-relaxed font-semibold">
                            {s.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* 5. Subcomponents Internal Cards Grid (If any exist) */}
              {selectedComponent.underComponents && selectedComponent.underComponents.length > 0 && (
                <div className="space-y-4 pt-4">
                  <div className="border-b-2 border-slate-150 dark:border-slate-850 pb-3 flex items-center gap-2 pl-1">
                    <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 font-mono">
                      {language === 'ar' ? 'المكونات الفرعية الجوهرية' : 'Étude des composants internes associés'}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedComponent.underComponents.map((under) => {
                      const UnderIcon = under.icon;
                      return (
                        <div
                          key={under.id}
                          className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl p-5 shadow-3xs hover:border-emerald-500/20 hover:shadow-all transition duration-200 flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center gap-2.5">
                              <div className="p-2 bg-slate-50 border border-slate-100 text-slate-700/80 rounded-xl">
                                <UnderIcon className="w-4 h-4" />
                              </div>
                              <span className="font-extrabold text-sm text-slate-950 dark:text-white">
                                {under.name}
                              </span>
                            </div>
                            <p className="text-slate-655 text-xs font-medium leading-relaxed">
                              {under.role}
                            </p>
                          </div>

                          <button
                            onClick={() => handleSelectSubcomponent(under)}
                            className="mt-5 w-full py-2 bg-slate-50 hover:bg-emerald-600 text-emerald-600 hover:text-white px-3 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1 transition-all cursor-pointer border border-slate-150"
                          >
                            <span>{language === 'ar' ? 'فحص هذا العضو' : 'Ouvrir la fiche'}</span>
                            <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 6. Quick Interactive Classroom Quiz (Mini-Quiz with Instant feedback on EVERY page!) */}
              {(() => {
                const getQuizQuestion = (compId: string) => {
                  const questions: Record<string, { q: string; choices: string[]; correctIdx: number; exp: string }> = {
                    h_cpu: {
                      q: language === 'ar' ? 'ما هي الوظيفة الأساسية لوحدة الحساب والمنطق (ALU) داخل المعالج؟' : 'Quelle est la fonction principale de l’UAL (Unité Arithmétique et Logique) au sein du CPU ?',
                      choices: [
                        language === 'ar' ? 'توفير وحفظ الملفات بصفة مستدامة.' : 'Sécuriser le stockage des fichiers système.',
                        language === 'ar' ? 'إجراء العمليات الرياضية والمقارنات المنطقية الجبرية.' : 'Exécuter des calculs mathématiques et choix logiques de Boole.',
                        language === 'ar' ? 'شحن اللوحة الأم كهربائياً للبدء.' : 'Alimenter la carte mère en courant électrique continu.'
                      ],
                      correctIdx: 1,
                      exp: language === 'ar' ? 'وحدة الحساب والمنطق هي العضل الفكري للمعالج، تتكفل بكل الحسابات البسيطة والمعقدة.' : 'L’UAL réalise toutes les opérations de calcul de base et les choix logiques indispensables.'
                    },
                    h_ram: {
                      q: language === 'ar' ? 'ماذا يحدث للبيانات المخزنة في الذاكرة العشوائية RAM عند انقطاع التيار الكهربائي؟' : 'Que se passe-t-il pour les données de la RAM lorsque l’alimentation électrique s’arrête ?',
                      choices: [
                        language === 'ar' ? 'تتبخر وتُمحى بالكامل بسبب الطبيعة المتطايرة لخلاياها.' : 'Elles s’effacent instantanément car la mémoire est volatile.',
                        language === 'ar' ? 'تبقى محفوظة دائمياً للتشغيل التالي.' : 'Elles restent conservées pour la prochaine reprise de la session.',
                        language === 'ar' ? 'تدمج تلقائياً على خوادم السحاب.' : 'Elles sont transmises automatiquement sur le cloud.'
                      ],
                      correctIdx: 0,
                      exp: language === 'ar' ? 'الذاكرة العشوائية متطايرة (Volatile)؛ تفقد شحنتها فورياً بمجرد غياب الكهرباء نظراً لبنية مكثفاتها.' : 'La RAM stocke temporairement sous forme de charge. Sans rafraîchissement électrique constant, l’état s’annihile.'
                    },
                    h_rom: {
                      q: language === 'ar' ? 'لماذا يتم حفظ الميكروكود BIOS في ذاكرة ROM بدلاً من القرص SSD؟' : 'Pourquoi le programme d’amorçage initial BIOS est-il logé en mémoire ROM plutôt que sur le SSD ?',
                      choices: [
                        language === 'ar' ? 'لتشغيل وبدء الجهاز بصرف النظر عن وجود القرص الصلب أو خلوّه.' : 'Pour initier la mise en route indépendamment de l’absence, panne ou formatage du SSD.',
                        language === 'ar' ? 'لأنها أسرع ميكانيكياً في النقل.' : 'Car elle possède une bande passante d’échange supérieure.',
                        language === 'ar' ? 'لكونها رخيصة مقارنة ببقية الوسائط.' : 'Pour amoindrir le coût énergétique de fabrication.'
                      ],
                      correctIdx: 0,
                      exp: language === 'ar' ? 'يتحتم وجود كود أصلي غير قابل للتعديل لتشخيص سلامة الأجهزة عند أول دقيقة من التشغيل.' : 'La carte mère requiert un ensemble d’instructions inaltérables d’usine pour localiser l’OS.'
                    },
                    h_motherboard: {
                      q: language === 'ar' ? 'ما هو الدور الحصري للوحة الأم (Motherboard)؟' : 'Qu’est-ce qui caractérise le rôle de la carte mère (Motherboard) ?',
                      choices: [
                        language === 'ar' ? 'تنفيذ برامج تصفح الويب والألعاب ثنائية الأبعاد.' : 'Faire tourner les logiciels lourds d’imagerie graphique.',
                        language === 'ar' ? 'التوصيل المادي والكهربائي وضبط لغة التزامن لكافة العناصر.' : 'Assurer la liaison physique et l’accord électrique synchrone de tous les composants.',
                        language === 'ar' ? 'توفير التبريد السائل الهادئ للمعالج.' : 'Fournir directement le liquide de refroidissement du CPU.'
                      ],
                      correctIdx: 1,
                      exp: language === 'ar' ? 'اللوحة الأم تؤمن الترابط كلياً؛ وبدونها تعجز الأجهزة عن التواصل وتبادل الإشارات النبضية.' : 'La carte mère sert de réseau nerveux central, reliant toutes les puces du ordinateur.'
                    },
                    h_gpu: {
                      q: language === 'ar' ? 'بم يختلف المعالج الرسومي GPU عن المعالج المركزي للكمبيوتر؟' : 'Quelle est la distinction architecturale clé d’un GPU face au processeur CPU ?',
                      choices: [
                        language === 'ar' ? 'بأنه يسير في مسار تتابعي أحادي فقط.' : 'Le fait qu’il traite de façon strictement séquentielle une tâche.',
                        language === 'ar' ? 'بكونه يحتوي على مئات النوى لتأدية آلاف العمليات بالتوازي.' : 'Sa structure embarquant des cents de mini-cœurs dédiés aux calculs parallèles.',
                        language === 'ar' ? 'أنه خالي من ممرات الذاكرة المؤقتة.' : 'L’absence totale de mémoire cache dans ses circuits internes.'
                      ],
                      correctIdx: 1,
                      exp: language === 'ar' ? 'يعتمد معالج الرسوميات على الحساب المتوازي المكثف لتمثيل ملايين البكسلات الرسومية في جزء من الثانية.' : 'La génération 3D demande d’innombrables calculs d’ombrage simplifiés exécutés en parallèle.'
                    },
                    h_ssd: {
                      q: language === 'ar' ? 'ما هو دور متحكم الذاكرة الصلبة (SSD Controller)؟' : 'Quelle tâche décisive accomplit le contrôleur intelligent d’un disque SSD ?',
                      choices: [
                        language === 'ar' ? 'توفير الشارات الصوتية لنظام التشغيل.' : 'Générer l’oscillation de synchronisation de la RAM.',
                        language === 'ar' ? 'تسيير عمليات حفظ البيانات بالتساوي بين خلايا فلاش لتفادي تآكلها.' : 'Distribuer les cycles d’écriture pour égaliser l’usure des blocs NAND permanents.',
                        language === 'ar' ? 'حفظ إعدادات الساعة التراكمية للبيوس.' : 'Retenir l’heure système et les variables CMOS.'
                      ],
                      correctIdx: 1,
                      exp: language === 'ar' ? 'يسير المتحكم خلايا الفلاش الذكية ويوزع ضغوط الكتابات بالتساوي لمنع فناء الخلايا وحفظ توازن القرص.' : 'Le contrôleur gère la répartition uniforme pour allonger drastiquement l’espérance de vie des NAND.'
                    },
                    h_hdd: {
                      q: language === 'ar' ? 'ما هو أصل الخطر الفيزيائي الكامن بامتلاك قرص ميكانيكي HDD؟' : 'Quel est le risque de défaillance physique inhérent à un disque dur HDD ?',
                      choices: [
                        language === 'ar' ? 'تبخر الشحنات لضعف المغناطيسية الساكنة.' : 'La perte par évaporation magnétique en l’absence d’alimentation.',
                        language === 'ar' ? 'اصطدام رأس القراءة بالقرص الدوار وخدش الطبقة المغناطيسية.' : 'Le contact accidentel (crash) de la tête de lecture rayant la surface du plateau.',
                        language === 'ar' ? 'تلف الكوابل النحاسية الرابطة بالمذربورد.' : 'L’oxydation immédiate des bus de données SATA.'
                      ],
                      correctIdx: 1,
                      exp: language === 'ar' ? 'رأس القراءة يطفو على مسافة مجهرية متناهية الصغر؛ أي ارتجاج قوي قد يؤدي لاحتكاكه بالقرص وفقدان دائم للملفات.' : 'Un choc mécanique en fonctionnement peut projeter la tête métallique sur le disque tournant.'
                    },
                    h_cache: {
                      q: language === 'ar' ? 'لماذا تعد الذاكرة المخبئية L1 فائقة الأداء لتواصل المعالج؟' : 'Pourquoi la mémoire Cache L1 est-elle si performante pour le microprocesseur ?',
                      choices: [
                        language === 'ar' ? 'لسعتها الضخمة التي تؤمن حفظ الأفلام الكبيرة.' : 'Sa taille de stockage équivalente aux disques externes.',
                        language === 'ar' ? 'لأنها تقع بجوار أو داخل نواة الحساب وتستجيب في نبضة ساعة واحدة.' : 'Parce qu’elle réside directement dans le cœur du CPU avec un temps de latence infime (< 1ns).',
                        language === 'ar' ? 'لاستقلاليتها الكهربائية الكاملة.' : 'Son fonctionnement autonome sans consommer aucune puissance.'
                      ],
                      correctIdx: 1,
                      exp: language === 'ar' ? 'تتكامل الذاكرة L1 مع قلب المعالج بمسافات naino لتقدم المعلومة فوراً وتنهي اضطرار المعالج لانتظار RAM البطيئة.' : 'Le L1 est le cache le plus rapide et le plus proche, servant d’antichambre d’un seul cycle d’exécution.'
                    }
                  };

                  return questions[compId] || {
                    q: language === 'ar' ? 'ما أهمية هذا المكون في هندسة الحاسوب؟' : 'Quelle est l’importance stratégique de ce matériel dans la chaîne ?',
                    choices: [
                      language === 'ar' ? 'تغذية باقي الأجهزة بالطاقة الكهربائية النظيفة.' : 'Distribuer des flux électriques réguliers.',
                      language === 'ar' ? 'إجراء مساهمته المخصصة في دورة المعالجة (حسب معيار Von Neumann).' : 'Accomplir son utilité fonctionnelle cible pour équilibrer Von Neumann.',
                      language === 'ar' ? 'ليس للمكون أي أثر جوهري لإقلاع الآلة.' : 'Aucun apport vital indispensable pour l’ensemble.'
                    ],
                    correctIdx: 1,
                    exp: language === 'ar' ? 'كل قطعة تؤدي رسالتها المتفق عليها في النموذج لإنجاح معالجة السلسلة الرقمية بالكامل.' : 'Chaque pièce détient une part de responsabilité logique ou physique concertée.'
                  };
                };

                const quiz = getQuizQuestion(selectedComponent.id);
                const hasSubmitted = quizSubmitted[selectedComponent.id] || false;
                const selectedChoice = quizAnswers[selectedComponent.id] !== undefined ? quizAnswers[selectedComponent.id] : null;

                const handleAnswerSelect = (idx: number) => {
                  if (hasSubmitted) return;
                  setQuizAnswers(prev => ({ ...prev, [selectedComponent.id]: idx }));
                };

                const handleSubmitQuiz = () => {
                  if (selectedChoice === null) return;
                  setQuizSubmitted(prev => ({ ...prev, [selectedComponent.id]: true }));
                };

                const handleResetQuiz = () => {
                  setQuizAnswers(prev => {
                    const copy = { ...prev };
                    delete copy[selectedComponent.id];
                    return copy;
                  });
                  setQuizSubmitted(prev => {
                    const copy = { ...prev };
                    delete copy[selectedComponent.id];
                    return copy;
                  });
                };

                return (
                  <div className="bg-gradient-to-br from-slate-50 via-indigo-50/20 to-blue-50/30 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950 text-slate-800 dark:text-white rounded-3xl p-6 md:p-8 space-y-6 shadow-xl border border-blue-200/50 dark:border-indigo-900/40">
                    <div className="flex justify-between items-center border-b border-blue-100 dark:border-indigo-900/50 pb-3">
                      <div className="flex items-center gap-2.5">
                        <HelpCircle className="w-5 h-5 text-blue-600 dark:text-indigo-400 animate-pulse" />
                        <h4 className="text-sm font-black uppercase tracking-wider font-mono text-slate-900 dark:text-white">
                          {language === 'ar' ? 'اختبر معلوماتك الفورية الحية (Interactive Knowledge Check)' : 'Mini-Quiz Synergie : Validation des Connaissances'}
                        </h4>
                      </div>
                      <span className="text-[10px] bg-blue-100 text-blue-800 dark:bg-indigo-900/50 dark:text-indigo-300 font-mono font-bold px-2.5 py-1 rounded-full border border-blue-200 dark:border-indigo-500/20">
                        PEDAGOGY
                      </span>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-100 leading-relaxed">
                        {quiz.q}
                      </p>

                      <div className="grid grid-cols-1 gap-3">
                        {quiz.choices.map((choice, idx) => {
                          const matchesSelected = selectedChoice === idx;
                          let btnClass = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-950/50 dark:border-indigo-950/40 dark:text-slate-300 dark:hover:bg-slate-950/80';
                          if (hasSubmitted) {
                            if (idx === quiz.correctIdx) {
                              btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-800 dark:bg-emerald-950/60 dark:border-emerald-500 dark:text-emerald-200 ring-1 ring-emerald-500/20';
                            } else if (matchesSelected) {
                              btnClass = 'bg-rose-50 border-rose-500 text-rose-800 dark:bg-rose-950/60 dark:border-rose-500 dark:text-rose-200 ring-1 ring-rose-500/20';
                            } else {
                              btnClass = 'bg-slate-50 border-slate-100 text-slate-450 dark:bg-slate-950/30 dark:border-slate-900/80 dark:text-slate-500';
                            }
                          } else if (matchesSelected) {
                            btnClass = 'bg-blue-50/80 border-blue-500 text-blue-900 dark:bg-indigo-900/40 dark:border-indigo-500 dark:text-indigo-250';
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => handleAnswerSelect(idx)}
                              disabled={hasSubmitted}
                              className={`p-4 rounded-xl border text-xs text-left font-bold transition-all duration-200 flex items-center justify-between cursor-pointer ${btnClass}`}
                            >
                              <span className="leading-relaxed flex-grow">{choice}</span>
                              {!hasSubmitted && matchesSelected && (
                                <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-indigo-400"></span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex gap-2.5 justify-end">
                      {hasSubmitted ? (
                        <button
                          onClick={handleResetQuiz}
                          className="px-4 py-2 bg-blue-50 hover:bg-blue-105 border border-blue-200 dark:bg-indigo-900/40 dark:hover:bg-indigo-900/60 border border-blue-200 dark:border-indigo-500/30 rounded-xl text-xs font-black uppercase tracking-wider text-blue-700 dark:text-indigo-200 transition-all cursor-pointer"
                        >
                          {language === 'ar' ? 'إعادة الاختبار' : 'Réessayer'}
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmitQuiz}
                          disabled={selectedChoice === null}
                          className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
                            selectedChoice === null
                              ? 'bg-slate-105 dark:bg-slate-955/30 bg-slate-100 dark:bg-slate-950/30 border-slate-200 dark:border-slate-900 text-slate-400 dark:text-slate-550 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700 dark:bg-indigo-500 dark:hover:bg-indigo-405 dark:hover:bg-indigo-400 border-blue-500 dark:border-indigo-400 text-white dark:text-slate-950 cursor-pointer shadow-sm'
                          }`}
                        >
                          {language === 'ar' ? 'إرسال الجواب' : 'Valider mon choix'}
                        </button>
                      )}
                    </div>

                    {hasSubmitted && (
                      <div className={`p-4 rounded-xl border animate-fadeIn text-xs leading-relaxed space-y-1.5 ${
                        selectedChoice === quiz.correctIdx 
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-500/20 dark:text-emerald-200' 
                          : 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/40 dark:border-rose-500/20 dark:text-rose-200'
                      }`}>
                        <span className="font-mono font-black uppercase tracking-wider text-[9px] block">
                          {selectedChoice === quiz.correctIdx 
                            ? (language === 'ar' ? '✔ إجابة صحيحة ! تصحيح بيداغوجي :' : '✔ BONNE RÉPONSE :') 
                            : (language === 'ar' ? '✘ إجابة خاطئة ! التوجيه الفني :' : '✘ ANALYSE PÉDAGOGIQUE :')}
                        </span>
                        <p className="font-semibold">{quiz.exp}</p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* ==================================================== */}
          {/* LEVEL 4 — SUBCOMPONENT PAGE                          */}
          {/* ==================================================== */}
          {currentLevel === 4 && selectedComponent && selectedSubcomponent && (
            <motion.div
              key="explorer-level-4"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Parent tracker indicator */}
              <div className="flex items-center gap-1.5 text-xs text-slate-450 text-slate-400 font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl h-fit w-fit select-none">
                <Cpu className="w-3.5 h-3.5" />
                <span>{selectedComponent.name}</span>
                <ChevronRight className={`w-3 h-3 ${isRTL ? 'rotate-180' : ''}`} />
                <span className="text-slate-900 dark:text-white font-black">{selectedSubcomponent.name}</span>
              </div>

              {/* Header Box */}
              <div className="bg-gradient-to-r from-teal-900/40 via-blue-900/10 to-transparent border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex items-start gap-4">
                <div className="p-4 bg-white shadow-2xs text-teal-600 rounded-2xl shrink-0">
                  {(() => {
                    const SubIcon = selectedSubcomponent.icon;
                    return <SubIcon className="w-8 h-8" />;
                  })()}
                </div>
                <div className="space-y-1.5 flex-grow">
                  <span className="text-[10px] uppercase font-black font-mono tracking-widest text-teal-600">
                    {language === 'ar' ? 'بطاقة فحص مجهري للمكون الفرعي' : 'Microscopie de sous-composant'}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
                    {selectedSubcomponent.name}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm font-semibold">
                    {selectedSubcomponent.role}
                  </p>
                </div>
              </div>

              {/* Interactive cards grid */}
              {selectedSubcomponent.details && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Info blocks */}
                  <div className="lg:col-span-8 flex flex-col gap-6">
                    
                    {/* Role specification */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-3xl p-6 space-y-3">
                      <strong className="text-[10px] uppercase font-black text-slate-500 dark:text-slate-400 font-mono">
                        {language === 'ar' ? '١. دور المكون الفرعي بالتفصيل' : '1. Rôle technique détaillé'}
                      </strong>
                      <p className="text-slate-950 dark:text-slate-50 text-sm md:text-base leading-relaxed font-extrabold pr-1">
                        {selectedSubcomponent.details.definition}
                      </p>
                    </div>

                    {/* Mechanics of logical activity */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-3xl p-6 space-y-3">
                      <strong className="text-[10px] uppercase font-black text-slate-500 dark:text-slate-400 font-mono">
                        {language === 'ar' ? '٢. كيف يعمل من الداخل؟' : '2. Fonctionnement opérationnel'}
                      </strong>
                      <p className="text-slate-950 dark:text-slate-100 text-xs md:text-sm leading-relaxed font-semibold">
                        {selectedSubcomponent.details.fonction}
                      </p>
                    </div>

                    {/* Interactive diagram for undercomponents */}
                    {selectedSubcomponent.id === 'h_uc' ? (
                      <ControlUnitDiagram />
                    ) : selectedSubcomponent.id === 'h_ual' ? (
                      <AluDiagram />
                    ) : null}
                  </div>

                  {/* Right hand layout */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Everyday analogy / Example */}
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-150 dark:border-emerald-900 rounded-3xl p-6 space-y-3 shadow-3xs">
                      <span className="text-[10px] uppercase font-black text-emerald-800 tracking-wider font-mono h-fit">
                        {language === 'ar' ? 'مثال معبر عن المكون' : 'Analogie pratique'}
                      </span>
                      <p className="text-emerald-950 dark:text-emerald-300 text-xs md:text-sm leading-relaxed italic pr-0.5">
                        "{selectedSubcomponent.details.exemple}"
                      </p>
                    </div>

                    {/* Schematic block if any */}
                    {selectedSubcomponent.details.schema && (
                      <div className="rounded-3xl overflow-hidden shadow-inner">
                        {['h_cpu', 'h_uc', 'h_ual', 'h_motherboard', 'h_cache', 'h_ram', 'h_psu', 'h_alimentation'].includes(selectedSubcomponent.id) ? (
                          <InterconnectionSchema componentId={selectedSubcomponent.id} language={language} />
                        ) : (
                          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-5 font-mono text-xs overflow-x-auto text-emerald-650 dark:text-emerald-400 leading-normal transition-colors duration-300">
                            <pre className="whitespace-pre font-semibold leading-relaxed">
                              {selectedSubcomponent.details.schema}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Level 4 child raw elements (Registers list etc.) as distinct interactive cards */}
              {selectedSubcomponent.subElements && (
                <div className="space-y-4 pt-4">
                  <div className="border-b-2 border-slate-105 pb-3">
                    <span className="text-[10px] uppercase font-black text-slate-400 font-mono tracking-widest pl-1">
                      {language === 'ar' ? 'محرك الخلايا والمسجلات الدقيقة المدروسة' : 'Cellules etRegistres de fonctionnement'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedSubcomponent.subElements.map((el, i) => {
                      const isFocused = openedInternalElement === el.name;
                      return (
                        <div
                          key={i}
                          onClick={() => setOpenedInternalElement(isFocused ? null : el.name)}
                          className={`bg-white dark:bg-slate-900 border rounded-2xl p-5 shadow-2xs hover:shadow-xs transition duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                            isFocused ? 'border-emerald-500 shadow-md scale-102 ring-1 ring-emerald-500' : 'border-slate-200'
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-[13px] text-emerald-900 dark:text-emerald-400 font-sans tracking-tight">
                                {el.name}
                              </span>
                              <span className="text-[9px] font-mono text-slate-405 font-bold uppercase bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded">
                                {language === 'ar' ? 'سجل نظام' : 'Micro-registre'}
                              </span>
                            </div>
                            <p className="text-slate-900 dark:text-slate-100 text-xs font-semibold leading-relaxed font-sans pr-1">
                              {el.role}
                            </p>

                            {/* Details expansion */}
                            {isFocused && (
                              <div className="animate-fadeIn pt-2.5 mt-2.5 border-t border-slate-100 bg-slate-50/50 dark:bg-slate-950/20 p-2.5 rounded-lg text-[11px] text-slate-800 dark:text-slate-200 leading-relaxed italic">
                                "{el.more}"
                              </div>
                            )}
                          </div>

                          <div className="mt-4 pt-3.5 border-t border-slate-50 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
                            <span>{language === 'ar' ? 'انقر للتفاصيل' : 'Cliquer pour en savoir plus'}</span>
                            <Play className={`w-3 h-3 transition-transform ${isFocused ? 'rotate-90 text-emerald-500' : 'text-slate-350'}`} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </motion.div>
          )}

          {/* ==================================================== */}
          {/* LIGHTBOX FOR COMPONENT IMAGES IN FULL SCREEN         */}
          {/* ==================================================== */}
          {activeLightbox && (
            <motion.div
              key="component-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/90 z-50 flex flex-col items-center justify-center p-4 sm:p-8 backdrop-blur-md"
              onClick={() => setActiveLightbox(null)}
            >
              {/* Close Button / Instructions */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-3">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg select-none">
                  {language === 'ar' ? 'اضغط ESC أو أي مكان للإغلاق' : 'Pressez ÉCHAP ou cliquez partout pour fermer'}
                </span>
                <button
                  onClick={() => setActiveLightbox(null)}
                  className="p-2.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-white hover:text-red-400 rounded-full transition-all cursor-pointer shadow-lg flex items-center justify-center"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image and Alt Info */}
              <motion.div
                initial={{ scale: 0.95, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="max-w-4xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the modal itself
              >
                <div className="w-full flex-grow flex items-center justify-center overflow-hidden bg-slate-950 p-2">
                  <img
                    src={activeLightbox.src}
                    alt={activeLightbox.alt}
                    className="max-w-full max-h-[70vh] object-contain rounded-xl select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="bg-slate-950 border-t border-slate-800 p-4 shrink-0 flex items-center justify-center">
                  <span className="text-white text-sm font-black tracking-tight text-center">{activeLightbox.alt}</span>
                </div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>


      </div>
    </div>
  );
}

function HexGlowDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
    </span>
  );
}
