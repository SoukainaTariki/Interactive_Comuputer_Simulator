import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  PlayCircle, 
  Compass, 
  RotateCcw,
  SkipForward,
  BookmarkCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface OnboardingStep {
  title: string;
  description: string;
  targetId: string; // DOM ID to highlight and position near
  fallbackText?: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  badge: string;
}

interface OnboardingTourProps {
  currentTab: string;
  setTab: (tab: string) => void;
  isDarkMode: boolean;
}

export default function OnboardingTour({ currentTab, setTab, isDarkMode }: OnboardingTourProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [tooltipCoords, setTooltipCoords] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const { language } = useLanguage();

  const currentLang = ['fr', 'en', 'ar', 'de', 'es'].includes(language) ? language : 'fr';

  // Localized texts helper
  const localText = {
    helpBtn: {
      fr: "Besoin d'aide ? Lancez le Guide ! 🎓",
      en: "Need help? Launch the Guide! 🎓",
      ar: "تحتاج لمساعدة؟ ابدأ الدليل ! 🎓",
      de: "Hilfe benötigt? Guide starten! 🎓",
      es: "¿Necesitas ayuda? ¡Iniciar la Guía! 🎓",
    },
    skip: {
      fr: "Sauter",
      en: "Skip",
      ar: "تجاوز",
      de: "Überspringen",
      es: "Saltar",
    },
    prev: {
      fr: "Précédent",
      en: "Previous",
      ar: "السابق",
      de: "Zurück",
      es: "Anterior",
    },
    continue: {
      fr: "Continuer",
      en: "Continue",
      ar: "متابعة",
      de: "Weiter",
      es: "Continuar",
    },
    letsGo: {
      fr: "C'est parti ! 🎓",
      en: "Let's go! 🎓",
      ar: "هيا بنا ! 🎓",
      de: "Los geht's! 🎓",
      es: "¡Vamos allá! 🎓",
    },
  };

  const stepsTranslation: Record<string, Record<string, { badge: string; title: string; description: string; fallbackText?: string }>> = {
    step1: {
      fr: {
        badge: "Étape 1 sur 5 • Entrée ⌨️",
        title: "Débutez par l'action : Les Périphériques d'Entrée",
        description: "Notre voyage commence lorsque vous interagissez avec les périphériques d'entrée. Au clavier ou à la souris, vos gestes mécaniques sont codés en impulsions binaires électriques (des 0 et des 1).",
        fallbackText: "Recherchez le bloc clavier sur notre carte mère interactive !",
      },
      en: {
        badge: "Step 1 of 5 • Input ⌨️",
        title: "Start with Action: Input Devices",
        description: "Our journey begins when you interact with input devices. On the keyboard or mouse, your mechanical gestures are encoded into binary electrical impulses (0s and 1s).",
        fallbackText: "Search for the keyboard block on our interactive motherboard!",
      },
      ar: {
        badge: "الخطوة 1 من 5 • المدخلات ⌨️",
        title: "ابدأ بالعمل: أجهزة الإدخال",
        description: "تبدأ رحلتنا عندما تتفاعل مع أجهزة الإدخال. على لوحة المفاتيح أو الماوس، يتم ترميز إيماءاتك الميكانيكية إلى نبضات كهربائية ثنائية (0 و 1).",
        fallbackText: "ابحث عن كتلة لوحة المفاتيح على لوحتنا الأم التفاعلية!",
      },
      de: {
        badge: "Schritt 1 von 5 • Eingabe ⌨️",
        title: "Beginnen Sie mit der Aktion: Eingabegeräte",
        description: "Unsere Reise beginnt, wenn Sie mit Eingabegeräten interagieren. Auf der Tastatur oder Maus werden Ihre mechanischen Bewegungen in binäre elektrische Impulse (0 und 1) kodiert.",
        fallbackText: "Suchen Sie den Tastaturblock auf unserem interaktiven Mainboard!",
      },
      es: {
        badge: "Paso 1 de 5 • Entrada ⌨️",
        title: "Comience con la acción: Dispositivos de Entrada",
        description: "Nuestro viaje comienza cuando interactúas con los dispositivos de entrada. En el teclado o el ratón, tus gestos mecánicos se codifican en impulsos eléctricos binarios (0 y 1).",
        fallbackText: "¡Busque el bloque de teclado en nuestra placa base interactiva!",
      }
    },
    step2: {
      fr: {
        badge: "Étape 2 sur 5 • Traitement 🧠",
        title: "Le Cerveau : L'Unité de Traitement des Données",
        description: "Le CPU (Processeur Central) s'empare de ces instructions stockées pour les analyser à la volée. C'est ici que l'Unité de Contrôle (UC) planifie les actions et que l'UAL calcule les résultats.",
      },
      en: {
        badge: "Step 2 of 5 • Processing 🧠",
        title: "The Brain: The Data Processing Unit",
        description: "The CPU (Central Processor) grabs these stored instructions to analyze them on the fly. This is where the Control Unit (CU) schedules actions and the ALU calculates the results.",
      },
      ar: {
        badge: "الخطوة 2 من 5 • المعالجة 🧠",
        title: "الدماغ: وحدة معالجة البيانات",
        description: "يقوم المعالج (CPU) بجلب هذه التعليمات المخزنة لتحليلها فوراً. هنا تقوم وحدة التحكم (CU) بجدولة المهام وتقوم وحدة الحساب والمنطق (ALU) بحساب النتائج.",
      },
      de: {
        badge: "Schritt 2 von 5 • Verarbeitung 🧠",
        title: "Das Gehirn: Die Datenverarbeitungseinheit",
        description: "Die CPU (Zentralprozessor) greift auf diese gespeicherten Anweisungen zu, um sie im laufenden Betrieb zu analysieren. Hier plant die Steuereinheit (CU) Aktionen und die ALU berechnet die Ergebnisse.",
      },
      es: {
        badge: "Paso 2 de 5 • Procesamiento 🧠",
        title: "El Cerebro: La Unidad de Procesamiento de Datos",
        description: "La CPU (Procesador Central) toma estas instrucciones almacenadas para analizarlas sobre la marcha. Aquí la Unidad de Control (CU) planifica las acciones y la ALU calcula los resultados.",
      }
    },
    step3: {
      fr: {
        badge: "Étape 3 sur 5 • Mémoire 💾",
        title: "Saisissez la Mémoire : RAM vs Stockage Disque",
        description: "Il y a deux types de mémoires. La RAM (mémoire vive) est ultra-rapide mais s'efface à l'extinction (volatile). Le SSD (stockage à long terme) préserve vos fichiers de façon robuste sans aucun courant.",
      },
      en: {
        badge: "Step 3 of 5 • Memory 💾",
        title: "Understand Memory: RAM vs Disk Storage",
        description: "There are two types of memories. RAM (random access memory) is ultra-fast but is erased upon power-off (volatile). SSD (long-term storage) preserves your files robustly without any electrical current.",
      },
      ar: {
        badge: "الخطوة 3 من 5 • الذاكرة 💾",
        title: "فهم الذاكرة: الذاكرة العشوائية مقابل التخزين الدائم",
        description: "هناك نوعان من الذاكرة. الذاكرة العشوائية (RAM) فائقة السرعة ولكنها تُمحى عند إيقاف التشغيل (متطايرة). أما القرص الصلب (SSD للتخزين طويل المدى) فيحفظ ملفاتك بشكل دائم دون الحاجة للكهرباء.",
      },
      de: {
        badge: "Schritt 3 von 5 • Speicher 💾",
        title: "Speicher verstehen: RAM vs. Festplattenspeicher",
        description: "Es gibt zwei Arten von Speichern. Der RAM (Arbeitsspeicher) is ultraschnell, wird aber beim Ausschalten gelöscht (flüchtig). Die SSD (Langzeitspeicher) sichert Ihre Dateien robust auch ohne Strom.",
      },
      es: {
        badge: "Paso 3 de 5 • Memoria 💾",
        title: "Sujeta la memoria: RAM frente a almacenamiento en disco",
        description: "Hay dos tipos de memorias. La RAM (memoria de acceso aleatorio) es ultra rápida pero se borra al apagar el equipo (volátil). El SSD (almacenamiento a largo plazo) conserva sus archivos de forma robusta sin corriente.",
      }
    },
    step4: {
      fr: {
        badge: "Étape 4 sur 5 • Micro-Architecture 🔬",
        title: "Explorez le processeur en profondeur !",
        description: "En passant au niveau avancé ou expert, vous découvrirez les détails de la micro-architecture de Von Neumann : la banque de registres ultra-rapides, la mémoire cache multiniveaux et les bus systèmes électriques.",
      },
      en: {
        badge: "Step 4 of 5 • Micro-Architecture 🔬",
        title: "Explore the processor in depth!",
        description: "By switching to advanced or expert levels, you will discover the details of Von Neumann's micro-architecture: the ultra-fast registers, multilevel cache memory, and electrical system buses.",
      },
      ar: {
        badge: "الخطوة 4 من 5 • المعمارية الدقيقة 🔬",
        title: "استكشف المعالج بعمق !",
        description: "بالانتقال إلى المستويات المتقدمة، ستكتشف تفاصيل بنية فون نيومان الدقيقة: سجلات المعالج فائقة السرعة، والذاكرة المخبئية متعددة المستويات، ونواقل النظام الكهربائية.",
      },
      de: {
        badge: "Schritt 4 von 5 • Mikrostruktur 🔬",
        title: "Erkunden Sie den Prozessor im Detail!",
        description: "Wenn Sie in den fortgeschrittenen Modus wechseln, entdecken Sie die Details der Von-Neumann-Mikroarchitektur: die ultraschnellen Register, den mehrstufigen Cache-Speicher und die elektrischen Systembusse.",
      },
      es: {
        badge: "Paso 4 de 5 • Microarquitectura 🔬",
        title: "¡Explore el procesador en profundidad!",
        description: "Al pasar al nivel avanzado, descubrirá los detalles de la microarquitectura de Von Neumann: el banco de registros de alta velocidad, la memoria caché multinivel y los buses de sistema eléctricos.",
      }
    },
    step5: {
      fr: {
        badge: "Étape 5 sur 5 • Simulation live 🚀",
        title: "Lancez votre première simulation !",
        description: "Vous êtes prêt ! Cliquez sur l'onglet 'Scénarios', choisissez une animation (comme l'Addition ou le Clavier) puis activez la 'Lecture Auto' pour voir les électrons binarisés courir sur les lignes d'autobus !",
      },
      en: {
        badge: "Step 5 of 5 • Live Simulation 🚀",
        title: "Start your first simulation!",
        description: "You are ready! Click on the 'Scenarios' tab, choose an animation (like Addition or Keyboard) and then activate 'Auto Play' to see binary electrons run on the bus routes!",
      },
      ar: {
        badge: "الخطوة 5 من 5 • محاكاة مباشرة 🚀",
        title: "ابدأ محاكاتك الأولى !",
        description: "أنت جاهز تماماً ! انقر على تبويب 'السيناريوهات' واختر سيناريو (مثل الإدخال أو الجمع)، ثم قم بتفعيل 'التشغيل التلقائي' لمشاهدة الإلكترونات الثنائية تسير عبر مسارات النواقل !",
      },
      de: {
        badge: "Schritt 5 von 5 • Live-Simulation 🚀",
        title: "Starten Sie Ihre erste Simulation!",
        description: "Sie sind bereit! Klicken Sie auf die Registerkarte 'Szenarien', wählen Sie eine Animation (wie Addition oder Tastatur) und aktivieren Sie 'Auto Play', um binäre Elektronen auf den Buslinien laufen zu sehen!",
      },
      es: {
        badge: "Paso 5 de 5 • Simulación en vivo 🚀",
        title: "¡Inicie su primera simulación!",
        description: "¡Ya está listo! Presione la pestaña 'Escenarios', elija una animación (como la Suma o el Teclado) y luego active 'Auto Play' para ver los electrones correr por las rutas de los buses.",
      }
    }
  };

  const steps: OnboardingStep[] = [
    {
      badge: stepsTranslation.step1[currentLang].badge,
      title: stepsTranslation.step1[currentLang].title,
      description: stepsTranslation.step1[currentLang].description,
      targetId: "hw-node-clavier",
      fallbackText: stepsTranslation.step1[currentLang].fallbackText,
      position: 'bottom',
    },
    {
      badge: stepsTranslation.step2[currentLang].badge,
      title: stepsTranslation.step2[currentLang].title,
      description: stepsTranslation.step2[currentLang].description,
      targetId: "hw-node-cpu",
      position: 'bottom',
    },
    {
      badge: stepsTranslation.step3[currentLang].badge,
      title: stepsTranslation.step3[currentLang].title,
      description: stepsTranslation.step3[currentLang].description,
      targetId: "hw-node-ram",
      position: 'bottom',
    },
    {
      badge: stepsTranslation.step4[currentLang].badge,
      title: stepsTranslation.step4[currentLang].title,
      description: stepsTranslation.step4[currentLang].description,
      targetId: "main-navigation",
      position: 'bottom',
    },
    {
      badge: stepsTranslation.step5[currentLang].badge,
      title: stepsTranslation.step5[currentLang].title,
      description: stepsTranslation.step5[currentLang].description,
      targetId: "nav-btn-voyage",
      position: 'bottom',
    }
  ];

  // Load initial onboarding state from localStorage (Resume support and first-time detector)
  useEffect(() => {
    const tourCompleted = localStorage.getItem('Interactive Computer Simulator_onboarding_completed') === 'true';
    const tourStepSaved = localStorage.getItem('Interactive Computer Simulator_onboarding_step');
    const tourActiveSaved = localStorage.getItem('Interactive Computer Simulator_onboarding_active');

    // Auto-start for first-time users after 2 seconds
    if (!tourCompleted) {
      if (tourActiveSaved === 'false') {
        setIsActive(false);
      } else {
        const timer = setTimeout(() => {
          setIsActive(true);
          if (tourStepSaved) {
            setCurrentStep(parseInt(tourStepSaved, 10));
          }
        }, 2000);
        return () => clearTimeout(timer);
      }
    } else if (tourActiveSaved === 'true') {
      setIsActive(true);
      if (tourStepSaved) {
        setCurrentStep(parseInt(tourStepSaved, 10));
      }
    }
  }, []);

  // Save state on change
  const saveOnboardingState = (active: boolean, step: number) => {
    localStorage.setItem('Interactive Computer Simulator_onboarding_active', active ? 'true' : 'false');
    localStorage.setItem('Interactive Computer Simulator_onboarding_step', step.toString());
  };

  // Recalculate component coordinates for floating pointer tooltips
  const updateTooltipCoords = () => {
    if (!isActive) return;
    const activeStepData = steps[currentStep];
    
    // Attempt to locate target node
    let element = document.getElementById(activeStepData.targetId);
    
    // Fallback search to support simple level IDs
    if (!element) {
      element = document.getElementById(`hw-node-simple-${activeStepData.targetId.replace('hw-node-', '')}`);
    }
    
    // General fallback selector
    if (!element) {
      element = document.querySelector(`[id*="${activeStepData.targetId}"]`);
    }

    if (element) {
      const rect = element.getBoundingClientRect();
      setTooltipCoords({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height
      });
    } else {
      // Element not in current view: fallback to center
      setTooltipCoords(null);
    }
  };

  useEffect(() => {
    updateTooltipCoords();
    
    // Automatically navigate tabs to help the user if they're on the wrong view to identify targeted buttons
    if (isActive) {
      const activeStepData = steps[currentStep];
      if (activeStepData.targetId === 'nav-btn-voyage' && currentTab !== 'voyage') {
        // Ready for step 5, nudge tab
      }
    }

    // Set up resize observer to keep coordinates pinned beautifully
    if (typeof window !== 'undefined' && isActive) {
      const handleResizeOrScroll = () => {
        updateTooltipCoords();
      };

      window.addEventListener('resize', handleResizeOrScroll);
      window.addEventListener('scroll', handleResizeOrScroll);
      
      const observer = new ResizeObserver(() => {
        updateTooltipCoords();
      });
      observer.observe(document.body);
      resizeObserverRef.current = observer;

      return () => {
        window.removeEventListener('resize', handleResizeOrScroll);
        window.removeEventListener('scroll', handleResizeOrScroll);
        if (resizeObserverRef.current) {
          resizeObserverRef.current.disconnect();
        }
      };
    }
  }, [isActive, currentStep, currentTab]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      saveOnboardingState(true, nextStep);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      saveOnboardingState(true, prevStep);
    }
  };

  const handleSkip = () => {
    setIsActive(false);
    localStorage.setItem('Interactive Computer Simulator_onboarding_completed', 'true');
    saveOnboardingState(false, 0);
  };

  const handleComplete = () => {
    setIsActive(false);
    localStorage.setItem('Interactive Computer Simulator_onboarding_completed', 'true');
    saveOnboardingState(false, 0);
    
    // Nudge user to scenarios
    setTab('voyage');
  };

  const startTourManually = () => {
    setCurrentStep(0);
    setIsActive(true);
    saveOnboardingState(true, 0);
  };

  return (
    <>
      {/* 🔮 SMALL FLOATING HELPER MASCOT: CONSTANTLY ACCESSIBLE TO RESTART THE ONBOARDING TOUR */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={startTourManually}
          className="group flex items-center h-12 w-12 hover:w-72 justify-start rounded-full shadow-lg hover:shadow-xl bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border border-blue-400/25 active:scale-95 transition-all duration-300 ease-out cursor-pointer overflow-hidden px-3.5"
          title={localText.helpBtn[currentLang]}
        >
          <Compass 
            className="text-yellow-300 group-hover:rotate-45 transition-transform w-[21px] h-[21px] shrink-0" 
          />
          <span className="opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-xs transition-all duration-300 whitespace-nowrap ml-2.5 text-[11px] font-black uppercase tracking-wider text-white select-none shrink-0">
            {localText.helpBtn[currentLang]}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isActive && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            
            {/* Dark glassmorphic backdrop overlay to focus eye attention on target */}
            <div className="absolute inset-0 bg-slate-950/70 p-4 backdrop-blur-2xs transition-all duration-300 pointer-events-auto" onClick={handleSkip} />

            {/* HIGHLIGHT LAYER : Draws a beautiful pulsing ring around targeted DOM bounding coordinates */}
            {tooltipCoords && (
              <div 
                className="absolute border-[3px] border-yellow-400 dark:border-yellow-300 rounded-2xl shadow-[0_0_20px_10px_rgba(234,179,8,0.3)] animate-pulse transition-all duration-300 pointer-events-none"
                style={{
                  top: tooltipCoords.top - 8,
                  left: tooltipCoords.left - 8,
                  width: tooltipCoords.width + 16,
                  height: tooltipCoords.height + 16,
                }}
              />
            )}

            {/* FLOATING TOUR CORE CARD TOOLTIP */}
            <div 
              className="absolute pointer-events-auto w-full max-w-sm sm:max-w-md p-0.5 rounded-3xl bg-linear-to-tr from-slate-200 to-white dark:from-slate-950 dark:to-slate-900 border border-slate-350 dark:border-slate-800 shadow-2xl transition-all duration-300"
              style={tooltipCoords ? {
                // Pin next to highlighted coordinates
                top: tooltipCoords.top + tooltipCoords.height + 20 > window.innerHeight + window.scrollY - 300
                  ? tooltipCoords.top - 310 // Display above
                  : tooltipCoords.top + tooltipCoords.height + 16, // Display below
                left: Math.max(16, Math.min(window.innerWidth - 460, tooltipCoords.left + (tooltipCoords.width / 2) - 224))
              } : {
                // Fallback to absolute viewport center placement
                top: '45%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="p-5 space-y-4">
                
                {/* Ribbon metadata line */}
                <div className="flex items-center justify-between gap-4">
                  <span className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-mono text-xs font-black px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-900 shadow-3xs">
                    {steps[currentStep].badge}
                  </span>
                  
                  {/* Skip and close icons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleSkip}
                      className="text-2xs font-extrabold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer flex items-center gap-0.5"
                    >
                      <SkipForward className="w-3 h-3" />
                      <span>{localText.skip[currentLang]}</span>
                    </button>
                    <span className="text-slate-300 px-1">|</span>
                    <button 
                      onClick={handleSkip}
                      className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Explanatory texts */}
                <div className="space-y-1 text-left">
                  <h4 className="text-sm sm:text-base font-black text-slate-950 dark:text-white leading-snug">
                    {steps[currentStep].title}
                  </h4>
                  <p className="text-xs sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {steps[currentStep].description}
                  </p>
                </div>

                {/* Progress dot indicators bar */}
                <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex gap-1">
                    {steps.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          currentStep === i ? 'w-5 bg-blue-600' : 'w-1.5 bg-slate-300 dark:bg-slate-700'
                        }`} 
                      />
                    ))}
                  </div>

                  {/* Operational forward/backward buttons */}
                  <div className="flex gap-1.5">
                    {currentStep > 0 && (
                      <button
                        onClick={handlePrev}
                        className="py-1.5 px-3 border border-slate-200 dark:border-slate-800 rounded-lg text-2xs font-bold bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-700 dark:text-slate-350 cursor-pointer flex items-center gap-1 active:scale-95 transition-transform"
                      >
                        <ChevronLeft className="w-3 h-3" />
                        <span>{localText.prev[currentLang]}</span>
                      </button>
                    )}

                    <button
                      onClick={handleNext}
                      className="py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-2xs font-extrabold cursor-pointer flex items-center gap-1 shadow-xs active:scale-95 transition-transform"
                    >
                      <span>{currentStep === steps.length - 1 ? localText.letsGo[currentLang] : localText.continue[currentLang]}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
}
