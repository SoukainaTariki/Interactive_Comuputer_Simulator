import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  HelpCircle, 
  CheckCircle,
  Lightbulb,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Info,
  Sparkles,
  Award,
  Maximize2,
  Minimize2,
  Cpu,
  Tv,
  SkipBack,
  SkipForward,
  X,
  Minus,
  Plus,
  HelpCircle as QuestionIcon
} from 'lucide-react';
import { ScenarioStep } from '../data/scenariosData';
import ComputerDiagramSimplified from './ComputerDiagramSimplified';
import ComputerDiagramAdvanced from './ComputerDiagramAdvanced';
import { useLearning } from '../context/LearningContext';
import { useLanguage } from '../context/LanguageContext';

interface SimulationWorkspaceProps {
  initialScenarioId?: string;
  onBackToHome?: () => void;
  defaultMode: 'simplified' | 'advanced';
}

export default function SimulationWorkspace({ 
  initialScenarioId = 'clavier_ecrire', 
  onBackToHome,
  defaultMode
}: SimulationWorkspaceProps) {
  const { learningLevel, setLearningLevel } = useLearning();
  const { scenariosData, t, dir, language } = useLanguage();
  
  // Diagram mode is automatically calculated based on learning level:
  // Simple/Intermediate levels use 'simplified' (Motherboard view), Advanced level uses 'advanced' (Bus & Clock view)
  const diagramMode = (learningLevel === 'simple' || learningLevel === 'intermediate') ? 'simplified' : 'advanced';
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    return () => observer.disconnect();
  }, []);

  // Lifted Canvas Zoom and Pan States
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Main scenario tracking
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(initialScenarioId);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1); // -1 means ready/not started
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  // Speed controls (unifies standard simple 4s auto-play and advanced modular speed levels)
  // Mapped: 0.5x (5000ms), 1x (2500ms), 2x (1800ms), 3x (1200ms), 4x (800ms)
  const speedLevels = [5000, 2500, 1800, 1200, 800];
  const speedLabels = ["0.5x", "1x", "2x", "3x", "4x"];
  const [speedLevel, setSpeedLevel] = useState<number>(2); // Default is '2x' (1800ms)
  const activeDelay = speedLevels[speedLevel];

  // Cognitive activation gate state
  const [hasAnsweredActivation, setHasAnsweredActivation] = useState<boolean>(true);
  const [selectedActivationOption, setSelectedActivationOption] = useState<number | null>(null);
  const [isActivationCorrect, setIsActivationCorrect] = useState<boolean>(false);

  // Playback loop reference
  const playbackTimer = useRef<NodeJS.Timeout | null>(null);

  const activeScenario = scenariosData.find(s => s.id === selectedScenarioId) || scenariosData[0];
  const steps = activeScenario.steps;
  const currentStep = steps[currentStepIndex];
  const isCompleted = currentStepIndex === steps.length - 1;

  // Track initial scenario configuration changes from home/parcours triggers
  useEffect(() => {
    setSelectedScenarioId(initialScenarioId);
    resetSimulationState();
  }, [initialScenarioId]);

  // Handle ESC key for fullscreen support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Playback timer orchestration - Bypass cognitive block since question is hidden
  useEffect(() => {
    if (isPlaying && currentStepIndex >= 0) {
      playbackTimer.current = setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, activeDelay);
    } else {
      if (playbackTimer.current) clearTimeout(playbackTimer.current);
    }

    return () => {
      if (playbackTimer.current) clearTimeout(playbackTimer.current);
    };
  }, [isPlaying, currentStepIndex, steps, activeDelay]);

  // Clean application state when active scenario changes
  const resetSimulationState = () => {
    setIsPlaying(false);
    if (playbackTimer.current) clearTimeout(playbackTimer.current);
    setCurrentStepIndex(-1);
    setHasAnsweredActivation(true);
    setSelectedActivationOption(null);
    setIsActivationCorrect(false);
    setSelectedComponentId(null);
  };

  const handleScenarioChange = (id: string) => {
    setSelectedScenarioId(id);
    setIsPlaying(false);
    if (playbackTimer.current) clearTimeout(playbackTimer.current);
    setCurrentStepIndex(-1);
    setHasAnsweredActivation(true);
    setSelectedActivationOption(null);
    setIsActivationCorrect(false);
    setSelectedComponentId(null);
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleActivationAnswer = (optionIndex: number) => {
    if (hasAnsweredActivation) return;
    setSelectedActivationOption(optionIndex);
    setHasAnsweredActivation(true);
    const correctIdx = activeScenario.activationQuestion.correctIndex;
    const isCorrect = optionIndex === correctIdx;
    setIsActivationCorrect(isCorrect);

    if (isCorrect) {
      // Auto trigger start simulation after correct feedback
      setTimeout(() => {
        setCurrentStepIndex(0);
        setIsPlaying(true);
      }, 1500);
    }
  };

  const handleStartSimulation = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleNextStep = () => {
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  // Compute simulation status
  let stateLabel = "Prêt";
  let stateColor = "bg-emerald-500";
  let stateTextColor = "text-emerald-700 dark:text-emerald-400";
  let stateBgColor = "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/20 dark:border-emerald-500/30";
  
  if (currentStepIndex === -1) {
    stateLabel = "Prêt";
    stateColor = "bg-emerald-500";
    stateTextColor = "text-emerald-700 dark:text-emerald-400";
    stateBgColor = "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/20 dark:border-emerald-500/30";
  } else if (isPlaying) {
    stateLabel = "En cours";
    stateColor = "bg-blue-500";
    stateTextColor = "text-blue-700 dark:text-blue-400";
    stateBgColor = "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/20 dark:border-blue-500/30";
  } else if (currentStepIndex === steps.length - 1) {
    stateLabel = "Terminé";
    stateColor = "bg-purple-500";
    stateTextColor = "text-purple-700 dark:text-purple-400";
    stateBgColor = "bg-purple-500/10 dark:bg-purple-500/20 border-purple-500/20 dark:border-purple-500/30";
  } else {
    stateLabel = "En pause";
    stateColor = "bg-amber-500";
    stateTextColor = "text-amber-700 dark:text-amber-400";
    stateBgColor = "bg-amber-550/10 dark:bg-amber-500/20 border-amber-500/20 dark:border-amber-500/30";
  }

  const handlePlayAction = () => {
    if (currentStepIndex === steps.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else if (currentStepIndex === -1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const togglePlayPause = () => {
    handlePlayAction();
  };

  return (
    <div id="simulation-page-root" className="w-[96%] max-w-[1800px] md:max-w-[2000px] mx-auto pt-1 pb-3 px-4 space-y-4 animate-fadeIn selection:bg-blue-500/30">
      
     

      {/* Selector tab row - aligned left */}
      <div className="flex flex-col md:flex-row items-start justify-start gap-4 mb-[7px] w-full">
        {/* Scenarios filter pills */}
        <div className="flex items-center gap-2 flex-wrap justify-start">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-sans">
            {language === 'ar' ? 'اختر سيناريو :' : language === 'en' ? 'Choose a scenario :' : language === 'es' ? 'Elige un escenario :' : language === 'de' ? 'Szenario auswählen :' : 'Choisi un scénario :'}
          </span>
          <div className="flex flex-wrap bg-slate-100 dark:bg-slate-950 rounded-xl p-1 gap-1 border border-slate-200 dark:border-slate-800" style={{ paddingTop: '2px', paddingBottom: '2px' }}>
            {scenariosData.map((sc) => {
              const getScenarioLabel = (id: string) => {
                if (language === 'ar') {
                  switch (id) {
                    case 'clavier_ecrire': return 'لوحة المفاتيح ⌨️';
                    case 'faire_calcul': return 'عملية حسابية 🎛️';
                    case 'ouvrir_image': return 'عرض صورة 🖼️';
                    case 'ouvrir_fichier': return 'فتح ملف 📂';
                    case 'enregistrer_fichier': return 'حفظ ملف 💾';
                    case 'demarrage_pc': return 'إقلاع الحاسوب 🔌';
                    default: return 'دورة المعالج 🧠';
                  }
                }
                if (language === 'en') {
                  switch (id) {
                    case 'clavier_ecrire': return 'Keyboard ⌨️';
                    case 'faire_calcul': return 'Addition 🎛️';
                    case 'ouvrir_image': return 'Show Image 🖼️';
                    case 'ouvrir_fichier': return 'Open File 📂';
                    case 'enregistrer_fichier': return 'Save File 💾';
                    case 'demarrage_pc': return 'Boot PC 🔌';
                    default: return 'CPU Cycle 🧠';
                  }
                }
                if (language === 'es') {
                  switch (id) {
                    case 'clavier_ecrire': return 'Teclado ⌨️';
                    case 'faire_calcul': return 'Adición 🎛️';
                    case 'ouvrir_image': return 'Mostrar Imagen 🖼️';
                    case 'ouvrir_fichier': return 'Abrir Archivo 📂';
                    case 'enregistrer_fichier': return 'Guardar Archivo 💾';
                    case 'demarrage_pc': return 'Arranque PC 🔌';
                    default: return 'Ciclo CPU 🧠';
                  }
                }
                if (language === 'de') {
                  switch (id) {
                    case 'clavier_ecrire': return 'Tastatur ⌨️';
                    case 'faire_calcul': return 'Addition 🎛️';
                    case 'ouvrir_image': return 'Bild anzeigen 🖼️';
                    case 'ouvrir_fichier': return 'Datei öffnen 📂';
                    case 'enregistrer_fichier': return 'Datei speichern 💾';
                    case 'demarrage_pc': return 'PC Booten 🔌';
                    default: return 'CPU Zyklus 🧠';
                  }
                }
                // French
                switch (id) {
                   case 'clavier_ecrire': return 'Clavier ⌨️';
                   case 'faire_calcul': return 'Addition 🎛️';
                   case 'ouvrir_image': return 'Image 🖼️';
                   case 'ouvrir_fichier': return 'Fichier 📂';
                   case 'enregistrer_fichier': return 'Sauvegarde 💾';
                   case 'demarrage_pc': return 'Démarrage du PC 🔌';
                   default: return 'Cycle CPU 🧠';
                }
              };

              return (
                <button
                  key={sc.id}
                  onClick={() => handleScenarioChange(sc.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    sc.id === selectedScenarioId 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'text-gray-600 dark:text-slate-450 hover:text-gray-950 dark:hover:text-white bg-transparent hover:bg-slate-200 dark:bg-slate-900/30 dark:hover:bg-slate-800/80 border border-transparent dark:border-slate-800/50'
                  }`}
                >
                  {getScenarioLabel(sc.id)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <>


      {/* STEP 1: ACTIVATION QUESTION PANEL (Temporarily bypassed for development as requested) */}
      {false ? (
        <div className="bg-white dark:bg-slate-950 border-2 border-blue-400 dark:border-blue-800 rounded-3xl p-6 space-y-6 max-w-3xl mx-auto shadow-sm">
          <div className="flex items-center gap-2.5 text-blue-700 dark:text-blue-400">
            <HelpCircle className="w-6 h-6 animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-wider font-mono">
              {language === 'ar' ? 'سؤال تنشيطي: لتنزيل ذهنك وتنشيطه!' : language === 'en' ? 'Starting question: To activate your brain!' : language === 'es' ? 'Pregunta inicial: ¡Para activar tu cerebro!' : language === 'de' ? 'Startfrage: Um dein Gehirn zu aktivieren!' : 'Question de départ : Pour activer ton cerveau !'}
            </span>
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 leading-snug">
            {activeScenario.activationQuestion.question}
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {activeScenario.activationQuestion.options.map((opt, i) => {
              const isSelected = selectedActivationOption === i;
              const hasAnswered = hasAnsweredActivation;
              const isCorrectOpt = i === activeScenario.activationQuestion.correctIndex;
              
              let optStyle = 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-250';
              if (hasAnswered) {
                if (isCorrectOpt) {
                  optStyle = 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-400 text-emerald-950 dark:text-emerald-350 font-bold';
                } else if (isSelected) {
                  optStyle = 'bg-rose-50 dark:bg-rose-950/20 border-rose-400 text-rose-950 dark:text-rose-350';
                } else {
                  optStyle = 'bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-900 text-slate-400 dark:text-slate-600 opacity-60';
                }
              }

              return (
                <button
                  key={i}
                  disabled={hasAnswered}
                  onClick={() => handleActivationAnswer(i)}
                  className={`w-full p-4 rounded-xl border-2 text-left text-sm md:text-base transition-all cursor-pointer flex items-center justify-between gap-3 ${optStyle}`}
                >
                  <span>{opt}</span>
                  {hasAnswered && isCorrectOpt && <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {hasAnsweredActivation && (
            <div className={`p-4 rounded-2xl border animate-fadeIn space-y-3 ${
              isActivationCorrect ? 'bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-300' : 'bg-blue-50/40 dark:bg-blue-950/10 border-blue-200 dark:border-blue-800 text-blue-950 dark:text-blue-300'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Explication pédagogique :</span>
              </div>
              <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-slate-350">
                {activeScenario.activationQuestion.explanation}
              </p>

              <div className="pt-2 text-right">
                <button
                  onClick={handleStartSimulation}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-6 py-3 rounded-xl inline-flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-xs"
                >
                  <span>Commencer la simulation d'architecture</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* STAGE 2: ONGOING RUNNING SIMULATOR */
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" style={{ paddingTop: '5px' }}>
            
            {/* CONTAINER LEFT: Renders selected hardware representation - Made cleaner and more focused */}
            <div className={isFullscreen
              ? "fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 p-2 md:p-3 overflow-hidden flex flex-col animate-fadeIn"
              : "lg:col-span-9 transition-all duration-300 space-y-6"
             } style={isFullscreen ? undefined : { paddingLeft: '6px', paddingRight: '6px' }}>
              
              {/* 📺 SINGLE SEAMLESS PLAYER & DIAGRAM CARD ("las9 m3a div diagramme") */}
              <div className={`relative flex flex-col items-stretch overflow-hidden transition-all duration-350 ${
                isFullscreen 
                  ? 'flex-grow h-full w-full rounded-2xl border border-slate-200/60 dark:border-slate-800/85 shadow-2xl' 
                  : 'rounded-3xl border shadow-md'
              } ${
                isDarkMode 
                  ? 'bg-slate-950 border-slate-850' 
                  : 'bg-white border-slate-200'
              }`}>
                 <div className={`relative flex-grow bg-slate-50/[0.02] dark:bg-slate-950/20 flex flex-col overflow-hidden ${
                   isFullscreen ? 'p-1.5' : 'p-3 sm:p-5'
                 }`} style={{ paddingTop: '14px', paddingBottom: '2px' }}>
                  {diagramMode === 'simplified' ? (
                    <ComputerDiagramSimplified 
                      currentStep={currentStep}
                      isDarkMode={isDarkMode}
                      isFullscreen={isFullscreen}
                      onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
                      zoomScale={zoomScale}
                      setZoomScale={setZoomScale}
                      panOffset={panOffset}
                      setPanOffset={setPanOffset}
                    />
                  ) : (
                    <ComputerDiagramAdvanced 
                      activeStepIndex={currentStepIndex}
                      scenarioId={selectedScenarioId as any}
                      selectedComponentId={selectedComponentId}
                      onSelectComponent={setSelectedComponentId}
                      isPlaying={isPlaying}
                      activeDelay={activeDelay}
                      isFullscreen={isFullscreen}
                      onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
                      zoomScale={zoomScale}
                      setZoomScale={setZoomScale}
                      panOffset={panOffset}
                      setPanOffset={setPanOffset}
                    />
                  )}
                </div>

                {/* 🚌 BUS SYSTEM LEGEND (FOR SIMPLE & INTERMEDIATE/ADVANCED DIAGRAMS) - matching custom pill-shaped style */}
                {learningLevel === 'simple' && (
                  <div className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-1.5 px-4 border-t select-none transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-950/70 border-slate-900 text-white' 
                      : 'bg-slate-50/40 border-slate-100 text-slate-800'
                  }`}>
                    {/* Unique Green Bus */}
                    <div className="flex items-center gap-2">
                      <span className="w-5.5 h-2 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/30 animate-pulse"></span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-sans">
                        BUS
                      </span>
                    </div>
                  </div>
                )}

                {(learningLevel === 'intermediate' || learningLevel === 'advanced') && (
                  <div className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-1.5 px-4 border-t select-none transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-950/70 border-slate-900 text-white' 
                      : 'bg-slate-50/40 border-slate-100 text-slate-800'
                  }`}>
                    {/* Data Bus */}
                    <div className="flex items-center gap-2">
                      <span className="w-5.5 h-2 rounded-full bg-blue-500 shadow-xs shadow-blue-500/30"></span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-sans">
                        {language === 'ar' ? 'ناقل البيانات (القيم)' : language === 'en' ? 'DATA BUS (Values)' : language === 'es' ? 'BUS DE DATOS (Valores)' : language === 'de' ? 'DATENBUS (Werte)' : 'BUS DE DONNÉES (Valeurs)'}
                      </span>
                    </div>

                    {/* Address Bus */}
                    <div className="flex items-center gap-2">
                      <span className="w-5.5 h-2 rounded-full bg-[#a855f7] shadow-xs shadow-purple-500/30"></span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-sans">
                        {language === 'ar' ? 'ناقل العناوين (الجهة)' : language === 'en' ? 'ADDRESS BUS (Destination)' : language === 'es' ? 'BUS DE DIRECCIONES (Destino)' : language === 'de' ? 'ADRESSBUS (Ziel)' : "BUS D'ADRESSES (Destination)"}
                      </span>
                    </div>

                    {/* Control Bus */}
                    <div className="flex items-center gap-2">
                      <span className="w-5.5 h-2 rounded-full bg-[#f97316] shadow-xs shadow-orange-500/30"></span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-sans">
                        {language === 'ar' ? 'ناقل التحكم (أوامر القراءة/الكتابة)' : language === 'en' ? 'CONTROL BUS (R/W Orders)' : language === 'es' ? 'BUS DE CONTROL (Órdenes R/W)' : language === 'de' ? 'STEUERBUS (R/W Befehle)' : 'BUS DE CONTRÔLE (Ordres R/W)'}
                      </span>
                    </div>
                  </div>
                )}

                {/* 📺 INTEGRATED COMPACT CONTROL BAR */}
                <div className={`border-t py-1.5 px-3 md:py-2 md:px-4 flex flex-col md:flex-row items-center justify-between gap-3 transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-slate-900/95 border-slate-800/80 text-white' 
                    : 'bg-white border-slate-100 text-slate-800'
                }`}>
                  {/* Left Section: Active State Display */}
                  <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center select-none">
                    <span className="relative flex h-2.5 w-2.5">
                      {isPlaying ? (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      ) : null}
                      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${stateColor}`}></span>
                    </span>
                    <span className="text-xs font-bold tracking-wide uppercase text-slate-500 dark:text-slate-400 min-w-[65px]">
                      {(() => {
                        if (stateLabel === "Prêt") {
                          return language === 'ar' ? 'جاهز' : language === 'en' ? 'Ready' : language === 'es' ? 'Listo' : language === 'de' ? 'Bereit' : 'Prêt';
                        }
                        if (stateLabel === "En cours") {
                          return language === 'ar' ? 'جاري التشغيل' : language === 'en' ? 'Running' : language === 'es' ? 'En curso' : language === 'de' ? 'In Ausführung' : 'En cours';
                        }
                        if (stateLabel === "Terminé") {
                          return language === 'ar' ? 'مكتمل' : language === 'en' ? 'Completed' : language === 'es' ? 'Completado' : language === 'de' ? 'Abgeschlossen' : 'Terminé';
                        }
                        if (stateLabel === "En pause") {
                          return language === 'ar' ? 'مؤقت' : language === 'en' ? 'Paused' : language === 'es' ? 'En pausa' : language === 'de' ? 'Pausiert' : 'En pause';
                        }
                        return stateLabel;
                      })()}
                    </span>
                    {currentStepIndex >= 0 && (
                      <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-650 dark:text-slate-350">
                        {language === 'ar' ? 'الخطوة' : language === 'en' ? 'Step' : language === 'es' ? 'Paso' : language === 'de' ? 'Schritt' : 'Étape'} {currentStepIndex + 1}/{steps.length}
                      </span>
                    )}
                  </div>

                  {/* Center Section: Primary Simulation Playback Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Previous step */}
                    <button
                      onClick={handlePrevStep}
                      disabled={currentStepIndex <= 0}
                      className="p-1 h-7.5 w-7.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-95 bg-white dark:bg-slate-950 flex items-center justify-center shadow-3xs"
                      title={language === 'ar' ? 'الخطوة السابقة' : language === 'en' ? 'Previous step' : language === 'es' ? 'Paso anterior' : language === 'de' ? 'Vorheriger Schritt' : 'Étape précédente'}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Play/Pause/Replay Primary action */}
                    <button
                      onClick={handlePlayAction}
                      className={`h-7.5 px-3 rounded-lg font-extrabold text-[11px] inline-flex items-center gap-1.2 transition-all text-white cursor-pointer active:scale-95 shadow-2xs hover:shadow ${
                        isPlaying 
                          ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/10' 
                          : currentStepIndex === steps.length - 1
                            ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10'
                            : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/10'
                      }`}
                      title={isPlaying 
                        ? (language === 'ar' ? 'إيقاف مؤقت' : language === 'en' ? 'Pause' : language === 'es' ? 'Pausa' : language === 'de' ? 'Pausieren' : 'Pause') 
                        : currentStepIndex === steps.length - 1 
                          ? (language === 'ar' ? 'إعادة البدء' : language === 'en' ? 'Restart' : language === 'es' ? 'Reiniciar' : language === 'de' ? 'Neustart' : 'Recommencer') 
                          : (language === 'ar' ? 'تشغيل' : language === 'en' ? 'Start' : language === 'es' ? 'Iniciar' : language === 'de' ? 'Starten' : 'Lancer')}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3 h-3 fill-white" />
                          <span>{language === 'ar' ? 'إيقاف' : language === 'en' ? 'Pause' : language === 'es' ? 'Pausa' : language === 'de' ? 'Pause' : 'Pause'}</span>
                        </>
                      ) : currentStepIndex === steps.length - 1 ? (
                        <>
                          <RotateCcw className="w-3 h-3" />
                          <span>{language === 'ar' ? 'إعادة' : language === 'en' ? 'Replay' : language === 'es' ? 'Repetir' : language === 'de' ? 'Wiederholen' : 'Rejouer'}</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-white" />
                          <span>{language === 'ar' ? 'تشغيل' : language === 'en' ? 'Start' : language === 'es' ? 'Iniciar' : language === 'de' ? 'Starten' : 'Lancer'}</span>
                        </>
                      )}
                    </button>

                    {/* Next step */}
                    <button
                      onClick={handleNextStep}
                      disabled={isCompleted}
                      className="p-1 h-7.5 w-7.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-95 bg-white dark:bg-slate-950 flex items-center justify-center shadow-3xs"
                      title={language === 'ar' ? 'الخطوة التالية' : language === 'en' ? 'Next step' : language === 'es' ? 'Paso siguiente' : language === 'de' ? 'Nächster Schritt' : 'Étape suivante'}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Compact Reset action */}
                    {currentStepIndex >= 0 && (
                      <button
                        onClick={resetSimulationState}
                        className="p-1 h-7.5 w-7.5 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                        title={language === 'ar' ? 'إعادة تعيين' : language === 'en' ? 'Reset' : language === 'es' ? 'Reiniciar' : language === 'de' ? 'Zurücksetzen' : 'Réinitialiser'}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Right Section: Compact Speed Selector + Zoom + Fullscreen */}
                  <div className="flex items-center gap-2.5 flex-wrap justify-end">
                    {/* Vitesse Selector */}
                    <div className="flex bg-slate-100 dark:bg-slate-950 p-0.5 rounded-lg border border-slate-200/60 dark:border-slate-800/80 items-center gap-1 h-7.5">
                      <span className="text-[10px] font-mono font-black text-slate-450 dark:text-slate-500 uppercase tracking-widest pl-1.5 pr-0.5 hidden sm:block select-none leading-none">
                        {language === 'ar' ? 'السرعة :' : language === 'en' ? 'Speed :' : language === 'es' ? 'Velocidad :' : language === 'de' ? 'Tempo :' : 'Vitesse :'}
                      </span>
                      <div className="flex gap-0.5">
                        {speedLabels.map((lbl, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSpeedLevel(idx)}
                            className={`w-6.5 h-6.5 flex items-center justify-center text-[10px] rounded-md font-extrabold cursor-pointer transition-all ${
                              speedLevel === idx 
                                ? 'bg-blue-600 text-white shadow-3xs scale-[1.02]' 
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-205/65 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/80'
                            }`}
                            title={language === 'ar' ? `السرعة ${lbl}` : language === 'en' ? `Speed ${lbl}` : language === 'es' ? `Velocidad ${lbl}` : language === 'de' ? `Geschwindigkeit ${lbl}` : `Vitesse ${lbl}`}
                          >
                            {lbl}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

                    {/* Zoom Controls */}
                    <div className="flex bg-slate-100 dark:bg-slate-950 p-0.5 rounded-lg border border-slate-200/60 dark:border-slate-800/80 items-center justify-center gap-0.5 h-7.5">
                      {/* Reset Fit */}
                      {(zoomScale !== 1 || panOffset.x !== 0 || panOffset.y !== 0) && (
                        <button
                          onClick={() => { setZoomScale(1); setPanOffset({ x: 0, y: 0 }); }}
                          className="h-6.5 px-2 rounded-md text-[10px] font-bold tracking-wide transition cursor-pointer bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-200/30 dark:border-blue-800/30 flex items-center gap-1 active:scale-95"
                          title={language === 'ar' ? 'إعادة توسيط (100%)' : language === 'en' ? 'Re-center (100%)' : language === 'es' ? 'Centrar de nuevo (100%)' : language === 'de' ? 'Zentrieren (100%)' : 'Recentrer (100%)'}
                        >
                          <span>Fit</span>
                        </button>
                      )}

                      {/* Zoom Out [-] */}
                      <button
                        onClick={() => setZoomScale(prev => Math.max(0.4, prev - 0.15))}
                        disabled={zoomScale <= 0.4}
                        className="w-6.5 h-6.5 rounded-md flex items-center justify-center transition cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-850 dark:text-slate-400 dark:hover:text-slate-250 disabled:opacity-20 disabled:cursor-not-allowed font-extrabold text-[10px] active:scale-95"
                        title={language === 'ar' ? 'تصغير (-)' : language === 'en' ? 'Zoom out (-)' : language === 'es' ? 'Reducir zoom (-)' : language === 'de' ? 'Hinauszoomen (-)' : 'Zoom arrière (-)'}
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      {/* Zoom percent indicator */}
                      <span 
                        onClick={() => { setZoomScale(1); setPanOffset({ x: 0, y: 0 }); }}
                        className="px-1.5 cursor-pointer select-none text-[10px] font-black font-mono tracking-wider text-slate-600 dark:text-slate-300 min-w-[42px] text-center hover:text-blue-500 dark:hover:text-blue-400 transition"
                        title={language === 'ar' ? 'إعادة التوسيط إلى 100%' : language === 'en' ? 'Re-center to 100%' : language === 'es' ? 'Centrar al 100%' : language === 'de' ? 'Zentrieren auf 100%' : 'Recentrer à 100%'}
                      >
                        {Math.round(zoomScale * 100)}%
                      </span>

                      {/* Zoom In [+] */}
                      <button
                        onClick={() => setZoomScale(prev => Math.min(3.5, prev + 0.15))}
                        disabled={zoomScale >= 3.5}
                        className="w-6.5 h-6.5 rounded-md flex items-center justify-center transition cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-850 dark:text-slate-400 dark:hover:text-slate-250 disabled:opacity-20 disabled:cursor-not-allowed font-extrabold text-[10px] active:scale-95"
                        title={language === 'ar' ? 'تكبير (+)' : language === 'en' ? 'Zoom in (+)' : language === 'es' ? 'Ampliar zoom (+)' : language === 'de' ? 'Hineinzoomen (+)' : 'Zoom avant (+)'}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

                    {/* Fullscreen Toggle button */}
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="h-7.5 w-7.5 rounded-lg flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer active:scale-95 transition-all"
                      title={isFullscreen ? (language === 'ar' ? 'إنهاء ملء الشاشة' : language === 'en' ? 'Exit fullscreen' : language === 'es' ? 'Salir de pantalla completa' : language === 'de' ? 'Vollbildmodus verlassen' : 'Quitter le plein écran') : (language === 'ar' ? 'ملء الشاشة' : language === 'en' ? 'Fullscreen' : language === 'es' ? 'Pantalla completa' : language === 'de' ? 'Vollbildmodus' : 'Plein écran')}
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                      ) : (
                        <Maximize2 className="w-3.5 h-3.5 text-blue-500" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* 🗂️ MOVED FOOTER SECTIONS (Buses Legend & Pedagogue Tips, cleanly arranged outside and under the diagram section as requested) */}
              {!isFullscreen && (
                <div className="space-y-4">
                  {/* 1. Legend Section for Intermediate Buses (Moved here) */}
                  {diagramMode === 'simplified' && learningLevel === 'intermediate' && (
                    <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-3xs text-left">
                      <p className="text-2xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                         Les Bus de Communication (L'Infrastructure Réseau du PC)
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* Data Bus */}
                        <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-blue-500/[0.03] dark:bg-blue-500/[0.01] border border-blue-100 dark:border-blue-900/30">
                          <span className="flex-shrink-0 w-3 h-3 rounded-full bg-blue-500 mt-0.5 border border-white dark:border-slate-800 shadow-xs" />
                          <div>
                            <p className="text-xs font-black text-blue-900 dark:text-blue-300">Bus de Données (Data Bus)</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold leading-snug mt-0.5">Transporte les fichiers et valeurs concrètes (lettres, nombres, pixels de l'écran).</p>
                          </div>
                        </div>
                        {/* Address Bus */}
                        <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-purple-500/[0.03] dark:bg-purple-500/[0.01] border border-purple-100 dark:border-purple-900/30">
                          <span className="flex-shrink-0 w-3 h-3 rounded-full bg-purple-500 mt-0.5 border border-white dark:border-slate-800 shadow-xs" />
                          <div>
                            <p className="text-xs font-black text-purple-900 dark:text-purple-300">Bus d'Adresses (Address Bus)</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold leading-snug mt-0.5">Désigne quel composant ou case mémoire doit recevoir ou fournir la donnée.</p>
                          </div>
                        </div>
                        {/* Control Bus */}
                        <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-orange-500/[0.03] dark:bg-orange-500/[0.01] border border-orange-100 dark:border-orange-900/30">
                          <span className="flex-shrink-0 w-3 h-3 rounded-full bg-orange-505 mt-0.5 border border-white dark:border-slate-850 shadow-xs" />
                          <div>
                            <p className="text-xs font-black text-orange-900 dark:text-orange-300">Bus de Contrôle (Control Bus)</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold leading-snug mt-0.5">Achemine les ordres (Lecture ou Écriture) et synchronise les puces grâce à l'horloge.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. Interactive Tip (Moved here) */}
                  <div className="p-4 border border-blue-105/50 dark:border-blue-900/30 bg-blue-50/10 dark:bg-blue-952/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                    <div className="space-y-1" style={{ fontSize: '16px' }}>
                      <p className="font-sans font-black text-base text-blue-900 dark:text-blue-300 flex items-center gap-1.5" style={{ fontSize: '16px' }}>
                        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                        <span> {language === 'ar' ? 'نصيحة تعليمية تفاعلية :' : language === 'en' ? 'Interactive Class Tip:' : language === 'es' ? 'Consejo de clase interactivo:' : language === 'de' ? 'Interaktiver Klassentipp:' : 'Conseil de classe interactif :'}</span>
                      </p>
                      <p className="font-sans text-sm font-medium text-slate-600 dark:text-slate-400" style={{ fontSize: '14px' }}>
                        {language === 'ar' ? "ضع مؤشر الفأرة أو انقر فوق أي عنصر مادي (المعالج، الذاكرة العشوائية، الشاشة...) لفتح بطاقته الوصفية الكاملة والروابط المادية الخاصة به." : language === 'en' ? 'Hover or click on any hardware block (CPU, RAM, Screen...) to open its full descriptive sheet and physical connections.' : language === 'es' ? 'Pase el cursor o haga clic en cualquier bloque de hardware (CPU, RAM, Pantalla...) para abrir su ficha descriptiva completa y sus conexiones físicas.' : language === 'de' ? 'Bewege den Mauszeiger über eine Hardwarekomponente (CPU, RAM, Bildschirm...) oder klicke darauf, um die vollständige Beschreibung anzuzeigen.' : "Survolez ou cliquez sur n'importe quel bloc matériel (CPU, RAM, Écran...) pour ouvrir sa fiche descriptive complète et ses connexions physiques."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CONTAINER RIGHT: Controller Dashboard, Explanations, Progress Steps Timeline (Split into 2 distinct boxes as requested) */}
            <div className="lg:col-span-3 flex flex-col self-stretch gap-4 h-[720px] max-h-[720px]">
              
              {/* 🛡️ BOÎTE 1 : GUIDE PÉDAGOGIQUE ET EXPLICATIONS (Sized to fit the largest element stably) */}
              <div className="relative flex flex-col border backdrop-blur-md rounded-3xl shadow-lg bg-white dark:bg-slate-950 border-slate-200/65 dark:border-slate-800/85 p-6 h-[380px] max-h-[380px] lg:h-[380px] lg:max-h-[380px] select-none text-left overflow-y-auto scrollbar-thin flex-shrink-0">
                {currentStepIndex === -1 ? (
                  /* 🧭 SCÉNARIO EN ATTENTE (Ready state overview) */
                  <div className="flex flex-col gap-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.12em] font-sans font-bold">
                        {language === 'ar' ? 'السيناريو النشط' : language === 'en' ? 'ACTIVE SCENARIO' : language === 'es' ? 'ESCENARIO ACTIVO' : language === 'de' ? 'AKTIVES SZENARIO' : 'SCÉNARIO ACTIF'}
                      </span>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400 border border-blue-500/20">
                        {language === 'ar' ? '🧭 جاهز' : language === 'en' ? '🧭 READY' : language === 'es' ? '🧭 LISTO' : language === 'de' ? '🧭 BEREIT' : '🧭 PRÊT'}
                      </span>
                    </div>
                    
                    <h3 className="text-[18px] font-extrabold leading-normal text-slate-900 dark:text-white">
                      {activeScenario.title}
                    </h3>
                    
                    <p className="text-[14px] font-medium leading-[1.7] text-slate-500 dark:text-slate-400">
                      {activeScenario.description}
                    </p>
                    
                    <div className="mt-2 flex flex-col gap-2">
                      <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.12em] font-sans">
                        {language === 'ar' ? `المكونات المستخدمة في هذا المسار (${steps.length} خطوات) :` : language === 'en' ? `Components used in this path (${steps.length} Steps):` : language === 'es' ? `Componentes utilizados en este trayecto (${steps.length} Pasos):` : language === 'de' ? `In diesem Pfad verwendete Komponenten (${steps.length} Schritte):` : `Composants utilisés dans ce trajet (${steps.length} Étapes) :`}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(() => {
                          const uniqueComps = Array.from(new Set(activeScenario.steps.map(s => s.componentId as string))) as string[];
                          const componentNameMap: Record<string, string> = language === 'ar' ? {
                            clavier: 'لوحة المفاتيح ⌨️',
                            bus: 'ناقل 🚌',
                            ram: 'الذاكرة العشوائية 💾',
                            cpu: 'المعالج 🧠',
                            ecran: 'الشاشة 🖥️',
                            gpu: 'معالج الرسوميات 🎨',
                            stockage: 'القرص الصلب 💾',
                            uc: 'وحدة التحكم ⚙️',
                            ual: 'وحدة الحساب والمنطق 🎛️',
                            psu: 'مزود الطاقة ⚡',
                            rom: 'ذاكرة القراءة فقط 🔒',
                            registres: 'المسجلات 🧠',
                            souris: 'الفأرة 🖱️'
                          } : language === 'en' ? {
                            clavier: 'Keyboard ⌨️',
                            bus: 'Bus 🚌',
                            ram: 'RAM 💾',
                            cpu: 'CPU 🧠',
                            ecran: 'Screen 🖥️',
                            gpu: 'GPU 🎨',
                            stockage: 'SSD 💾',
                            uc: 'CU ⚙️',
                            ual: 'ALU 🎛️',
                            psu: 'Power ⚡',
                            rom: 'ROM 🔒',
                            registres: 'Registers 🧠',
                            souris: 'Mouse 🖱️'
                          } : language === 'es' ? {
                            clavier: 'Teclado ⌨️',
                            bus: 'Bus 🚌',
                            ram: 'RAM 💾',
                            cpu: 'CPU 🧠',
                            ecran: 'Pantalla 🖥️',
                            gpu: 'GPU 🎨',
                            stockage: 'SSD 💾',
                            uc: 'UC ⚙️',
                            ual: 'ALU 🎛️',
                            psu: 'Alimentación ⚡',
                            rom: 'ROM 🔒',
                            registres: 'Registros 🧠',
                            souris: 'Ratón 🖱️'
                          } : language === 'de' ? {
                            clavier: 'Tastatur ⌨️',
                            bus: 'Bus 🚌',
                            ram: 'RAM 💾',
                            cpu: 'CPU 🧠',
                            ecran: 'Bildschirm 🖥️',
                            gpu: 'GPU 🎨',
                            stockage: 'SSD 💾',
                            uc: 'Steuerwerk ⚙️',
                            ual: 'Rechenwerk 🎛️',
                            psu: 'Netzteil ⚡',
                            rom: 'ROM 🔒',
                            registres: 'Register 🧠',
                            souris: 'Maus 🖱️'
                          } : {
                            clavier: 'Clavier ⌨️',
                            bus: 'Bus 🚌',
                            ram: 'RAM 💾',
                            cpu: 'CPU 🧠',
                            ecran: 'Écran 🖥️',
                            gpu: 'GPU 🎨',
                            stockage: 'SSD 💾',
                            uc: 'UC ⚙️',
                            ual: 'UAL 🎛️',
                            psu: 'Alim ⚡',
                            rom: 'ROM 🔒',
                            registres: 'Registres 🧠',
                            souris: 'Souris 🖱️'
                          };
                          return uniqueComps.map((id) => (
                            <span key={id} className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30 px-2 py-0.5 rounded-md border border-blue-100/40 dark:border-blue-900/20 shadow-3xs">
                              {componentNameMap[id] || id}
                            </span>
                          ));
                        })()}
                      </div>
                    </div>
                  </div>
                ) : currentStep ? (
                  /* ⚡ MISSION ACTIVE & EXPLICATIONS (Processing state overview) */
                  <div className="flex flex-col gap-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.12em] font-sans font-bold">
                        {language === 'ar' ? 'المهمة النشطة' : language === 'en' ? 'ACTIVE MISSION' : language === 'es' ? 'MISIÓN ACTIVA' : language === 'de' ? 'AKTIVE MISSION' : 'MISSION ACTIVE'}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-650 dark:bg-emerald-500/15 dark:text-emerald-450 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        {language === 'ar' ? '🟢 جاري التنفيذ' : language === 'en' ? '🟢 RUNNING' : language === 'es' ? '🟢 EN CURSO' : language === 'de' ? '🟢 IN AUSFÜHRUNG' : '🟢 EN COURS'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 border border-slate-150/60 dark:border-slate-800 px-3 py-1.5 rounded-xl">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.12em] font-mono">
                        {language === 'ar' ? 'الخطوة' : language === 'en' ? 'STEP' : language === 'es' ? 'PASO' : language === 'de' ? 'SCHRITT' : 'ÉTAPE'} {currentStepIndex + 1} / {steps.length}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-slate-500 bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 px-2 py-0.5 rounded-md">
                        {language === 'ar' ? 'البيانات :' : language === 'en' ? 'Data :' : language === 'es' ? 'Datos :' : language === 'de' ? 'Daten :' : 'Donnée :'} <span className="font-extrabold text-blue-600 dark:text-blue-400">"{currentStep.packetValue}"</span>
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-[18px] font-black leading-normal text-slate-900 dark:text-white">
                        {currentStep.title}
                      </h4>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.12em] font-sans">
                        {language === 'ar' ? 'ماذا يحدث ؟' : language === 'en' ? 'What happens?' : language === 'es' ? '¿Qué está pasando?' : language === 'de' ? 'Was passiert?' : 'Que se passe-t-il ?'}
                      </span>
                      <p className="text-[14px] font-medium leading-[1.7] text-slate-755 dark:text-slate-300">
                        {currentStep.queSePasseTil}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-[0.12em] font-sans">
                        {language === 'ar' ? 'لماذا ؟' : language === 'en' ? 'Why?' : language === 'es' ? '¿Por qué?' : language === 'de' ? 'Warum?' : 'Pourquoi ?'}
                      </span>
                      <p className="text-[14px] font-medium leading-[1.7] text-slate-755 dark:text-slate-300">
                        {currentStep.pourquoi}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* 🛡️ BOÎTE 2 : TRAJET DE LA DONNÉE (Timeline takes remaining space) */}
              <div className="relative flex flex-col border backdrop-blur-md rounded-3xl shadow-lg bg-white dark:bg-slate-950 border-slate-200/65 dark:border-slate-800/85 p-6 h-[324px] max-h-[324px] lg:h-[324px] lg:max-h-[324px] select-none text-left overflow-hidden flex-grow animate-fadeIn">
                <div className="flex flex-col flex-grow h-full min-h-0 gap-3">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.12em] font-sans block">
                    {language === 'ar' ? '● مسار البيانات' : language === 'en' ? '● DATA PATH' : language === 'es' ? '● TRAYECTO DE LOS DATOS' : language === 'de' ? '● DATENPFAD' : '● TRAJET DE LA DONNÉE'}
                  </span>
                  
                  <div className="flex-1 h-0 overflow-y-auto pr-1 space-y-2 relative pl-4 before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-slate-100 dark:before:bg-slate-900/60 scrollbar-thin">
                    {steps.map((st, idx) => {
                      const isPassed = idx < currentStepIndex;
                      const isCurrent = idx === currentStepIndex;
                      return (
                        <div 
                          key={idx} 
                          onClick={() => {
                            setCurrentStepIndex(idx);
                            setIsPlaying(false);
                          }}
                          className={`flex items-start gap-3 p-2 rounded-xl text-xs transition-all text-left relative z-10 cursor-pointer select-none border ${
                            isCurrent 
                              ? 'bg-blue-50/70 border-blue-200/50 dark:bg-blue-950/20 dark:border-blue-900/30 text-blue-650 dark:text-blue-400 font-extrabold shadow-3xs' 
                              : 'border-transparent hover:bg-slate-100/60 dark:hover:bg-slate-900/55 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                          }`}
                        >
                          {/* Circle state: Completed = checkmark tick, Current = pulsed dot, Future = open circle */}
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] shrink-0 font-bold border transition-all pointer-events-none ${
                              isCurrent 
                                ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_8px_rgba(59,130,246,0.5)] scale-110 ring-4 ring-blue-500/20' 
                                : isPassed 
                                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-505 text-emerald-600 dark:text-emerald-400' 
                                  : 'bg-white dark:bg-slate-950 border-slate-205 dark:border-slate-800 text-slate-400'
                            }`}
                          >
                            {isPassed ? (
                              '✓'
                            ) : isCurrent ? (
                              '●'
                            ) : (
                              '○'
                            )}
                          </div>
                          
                          <div className="flex-grow min-w-0 flex flex-col justify-center pointer-events-none">
                            <p 
                              className={`truncate font-sans text-[13px] font-semibold leading-normal tracking-wide ${isCurrent ? 'text-blue-600 dark:text-blue-400 font-black' : 'text-slate-700 dark:text-slate-300'}`}
                            >
                              {st.title}
                            </p>
                            {isCurrent && (
                              <span className="text-[10px] text-blue-500 dark:text-blue-450 font-mono italic block mt-0.5 leading-none animate-pulse">
                                {language === 'ar' ? 'معالجة نشطة...' : language === 'en' ? 'Active processing...' : language === 'es' ? 'Procesamiento activo...' : language === 'de' ? 'Verarbeitung aktiv...' : 'Traitement actif...'}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FINAL LESSON COMPLETE SUMMARY PEDAGOGUE */}
          {isCompleted && (
            <div className="bg-white dark:bg-slate-950 border border-emerald-100 dark:border-emerald-900 rounded-3xl p-6 md:p-8 space-y-6 animate-fadeIn max-w-4xl mx-auto shadow-sm dark:shadow-slate-950/40">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-900 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center shadow-3xs border border-emerald-100/50 dark:border-emerald-900/30">
                    <Award className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase font-mono block">
                      {language === 'ar' ? 'تهانينا، تم إكمال السيناريو !' : language === 'en' ? 'Congratulations, Scenario Completed!' : language === 'es' ? '¡Felicidades, escenario completado!' : language === 'de' ? 'Herzlichen Glückwunsch, Szenario abgeschlossen!' : 'Félicitations, Scénario Terminé !'}
                    </span>
                    <h4 className="text-xl md:text-2xl font-black text-slate-950 dark:text-white">
                      {language === 'ar' ? 'ما فهمته من هذا المسار' : language === 'en' ? 'What I learned from this journey' : language === 'es' ? 'Lo que aprendí de este trayecto' : language === 'de' ? 'Was ich auf diesem Pfad gelernt habe' : "Ce que j'ai compris de ce trajet"}
                    </h4>
                  </div>
                </div>
                
                <button
                  onClick={resetSimulationState}
                  className="bg-slate-105 hover:bg-slate-150 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 text-xs font-extrabold px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-3xs transition-all active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'إعادة عرض المحاكاة' : language === 'en' ? 'Review simulation' : language === 'es' ? 'Revisar la simulación' : language === 'de' ? 'Simulation ansehen' : 'Revoir la simulation'}</span>
                </button>
              </div>

              {/* Grid of synthesis keycaps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeScenario.summaryPoints.map((point, i) => (
                  <div key={i} className="bg-slate-50/70 dark:bg-slate-900/25 border border-slate-100/60 dark:border-slate-900/40 p-4 rounded-xl flex items-start gap-2.5 shadow-3xs">
                    <span className="text-emerald-600 dark:text-emerald-400 text-lg">💡</span>
                    <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-blue-50/20 dark:bg-blue-950/10 p-4 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 mt-4">
                <p className="text-blue-950 dark:text-blue-300 text-xs font-medium max-w-full leading-relaxed">
                  {language === 'ar' ? "لقد تعلمت كيف تتدفق الإشارات والمقاطع البرمجية. لك مطلق الحرية في استكشاف سيناريو آخر أو تقييم معارفك الجديدة عبر الاختبار النهائي!" : language === 'en' ? "You have learned how signals flow. You are free to explore another scenario or test your knowledge in the final quiz!" : language === 'es' ? "Has aprendido cómo fluyen las señales. ¡Eres libre de explorar otro escenario o poner a prueba tus conocimientos en el cuestionario final!" : language === 'de' ? "Du hast gelernt, wie Signale fließen. Du kannst gerne ein anderes Szenario erkunden oder dein Wissen im finalen Quiz testen!" : "Tu as appris comment circulent les signaux. Libre à toi d'explorer un autre scénario ou d'évaluer tes nouvelles connaissances à travers le quiz final !"}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
</div>
  );
}
