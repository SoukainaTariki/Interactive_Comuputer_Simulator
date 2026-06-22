import React, { useState, useEffect } from 'react';
import { 
  Keyboard as KeyboardIcon, 
  Cpu as CpuIcon, 
  ArrowRight, 
  Laptop, 
  HelpCircle, 
  ArrowRightLeft, 
  Activity, 
  ChevronRight, 
  Database, 
  Terminal, 
  Zap, 
  Layers, 
  Sparkles, 
  BookOpen, 
  Monitor, 
  RefreshCw,
  CheckCircle2,
  Lock,
  Compass,
  ArrowUpRight,
  Clock,
  Play,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface HomeProps {
  onStartScenario: (scenarioId: string) => void;
  onSelectTab: (tab: string) => void;
}

export default function Home({ onStartScenario, onSelectTab }: HomeProps) {
  const { t, dir, language } = useLanguage();
  // --- Live Architecture Preview State ---
  const [inputText, setInputText] = useState('G');
  const [simState, setSimState] = useState<'idle' | 'keyboard_to_ram' | 'ram_to_cpu' | 'cpu_to_screen' | 'done'>('idle');
  const [ramValue, setRamValue] = useState<string>('');
  const [cpuProcessing, setCpuProcessing] = useState<boolean>(false);
  const [screenValue, setScreenValue] = useState<string>('');
  
  // Theme state observer
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
      const observer = new MutationObserver(() => {
        setIsDarkMode(document.documentElement.classList.contains('dark'));
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      return () => observer.disconnect();
    }
  }, []);

  // Keyboard keys options
  const keysOption = ['A', 'G', '🚀', '💻', '9', 'V'];

  const startLiveSimulation = (char: string = inputText) => {
    if (simState !== 'idle') return;
    setInputText(char);
    setScreenValue('');
    setRamValue('');
    setCpuProcessing(false);
    
    // Step 1: Keyboard to RAM
    setSimState('keyboard_to_ram');
    
    setTimeout(() => {
      // Step 2: Stored in RAM
      setRamValue(char);
      setSimState('ram_to_cpu');
      
      setTimeout(() => {
        // Step 3: CPU Processing
        setCpuProcessing(true);
        setSimState('cpu_to_screen');
        
        setTimeout(() => {
          // Step 4: Display on Screen
          setCpuProcessing(false);
          setScreenValue(char);
          setSimState('done');
          
          setTimeout(() => {
            setSimState('idle');
          }, 3000);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const isRtl = dir === 'rtl';

  return (
    <div 
      id="home-view" 
      dir={dir}
      className={`relative w-full overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-0 ${isRtl ? 'text-right' : 'text-left'}`}
      style={{ paddingTop: '8px', marginTop: '-20px', paddingBottom: '0px' }}
    >
      
      {/* ── BACKGROUND HERO LIGHT LAYERS ── */}
      <div className="absolute top-0 inset-x-0 h-[800px] pointer-events-none overflow-hidden -z-10">
        <div 
          className="absolute top-[-300px] left-[-200px] w-[50vw] h-[50vw] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] mix-blend-screen" 
        />
        <div className="absolute top-[-250px] right-[-200px] w-[600px] h-[600px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[200px] left-[30%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/5 blur-[100px] mix-blend-screen" />
        
        {/* Subtle Cyber Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] opacity-80" />
      </div>

      {/* ── SECTION 1: HERO SECTION ── */}
      <div className="w-[96%] max-w-[1800px] md:max-w-[2000px] mx-auto px-4 md:px-6 pt-1 lg:pt-2 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Texts */}
          <div className={`lg:col-span-7 space-y-4 text-center ${isRtl ? 'lg:text-right' : 'lg:text-left'}`}>
            <div className="space-y-2.5">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]"
              >
                {t('heroTitle1')}<span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">{t('heroTitleHighlight')}</span>{t('heroTitle2')}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
              >
                {t('heroDesc')}
              </motion.p>
            </div>

            {/* CTA action row */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 ${isRtl ? 'lg:justify-end' : ''}`}
            >
              <button
                id="hero-cta-primary"
                onClick={() => onSelectTab('voyage')}
                className="group px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-xl border-2 border-blue-600 hover:border-blue-700 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <Play className={`w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110 ${isRtl ? 'rotate-180' : ''}`} />
                <span>{t('btnStartSimulation')}</span>
                <ArrowRight className={`w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
              </button>

              <button
                id="home-goto-components-btn"
                onClick={() => onSelectTab('schema')}
                className="group px-6 py-3 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-2 border-slate-350 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 font-black text-xs sm:text-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <CpuIcon className="w-4.5 h-4.5 text-blue-500 dark:text-blue-400 group-hover:rotate-12 transition-transform" />
                <span>{t('btnExploreComponents')}</span>
                <ArrowRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all ${isRtl ? 'rotate-180' : ''}`} />
              </button>
            </motion.div>

            {/* Micro Badge Row */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-2 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-xs font-semibold text-slate-400 dark:text-slate-500 font-mono"
            >
              
            </motion.div>

          </div>

          {/* Right Hero Graphic: Glassmorphic interactive Motherboard */}
          <div className="lg:col-span-5 flex justify-center items-center py-4">
            <motion.div 
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-full max-w-[430px] aspect-square rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/30 backdrop-blur-xl p-8 shadow-2xl flex flex-col justify-between overflow-hidden"
              style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), 0 25px 60px -15px rgba(0,0,0,0.1)' }}
            >
              {/* Circuit board traces backplate */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#6366f1_1px,transparent_1px)] bg-[size:16px_16px]" />
              
              <div className="relative flex-1 flex flex-col items-center justify-center space-y-6">
                
                {/* Visual RAM Node */}
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
                  className="w-48 bg-white/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-850 p-3.5 rounded-2xl flex items-center justify-between shadow-md"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Database className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black dark:text-slate-200">
                        {language === 'ar' ? 'ذاكرة RAM (الذاكرة)' : language === 'de' ? 'RAM (Arbeitsspeicher)' : language === 'es' ? 'RAM (Memoria)' : language === 'en' ? 'RAM (Memory)' : 'RAM (Mémoire)'}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-bold">
                        {language === 'ar' ? 'ذاكرة وصول عشوائي' : language === 'de' ? 'Hauptspeicher' : language === 'es' ? 'Memoria de trabajo' : language === 'en' ? 'Random Access Memory' : 'Mémoire Vive'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[9px] bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold px-2 py-0.5 rounded-full">0x2A</span>
                </motion.div>
 
                {/* Cybernetic High velocity Data Bus link with real electrical flow simulator */}
                <div className="w-1.5 h-12 bg-gradient-to-b from-blue-500 via-indigo-550 to-purple-500 relative rounded-full">
                  {/* Floating electrical ions flowing between RAM and CPU */}
                  <motion.div 
                    animate={{ y: [-4, 48] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                    className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"
                  />
                  <motion.div 
                    animate={{ y: [48, -4] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "linear", delay: 0.8 }}
                    className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,1)]"
                  />
                </div>
 
                {/* Visual CPU Card */}
                <motion.div 
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut' }}
                  className="w-56 bg-slate-950 border-2 border-indigo-500 rounded-2xl p-4.5 flex flex-col gap-3 shadow-[0_15px_35px_rgba(99,102,241,0.25)] relative"
                >
                  <div className="absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                  
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-black text-slate-200 tracking-wider">
                      {language === 'ar' ? 'المعالج (CPU)' : language === 'de' ? 'CPU (PROZESSOR)' : language === 'es' ? 'CPU (PROCESADOR)' : language === 'en' ? 'CPU (PROCESSOR)' : 'CPU (PROCESSEUR)'}
                    </span>
                    <CpuIcon className="w-4.5 h-4.5 text-indigo-400 animate-pulse" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                    <div className="bg-slate-900 border border-slate-850 rounded-xl p-1.5">
                      <span className="text-slate-400 font-mono block">
                        {language === 'ar' ? 'و.ت' : language === 'de' ? 'S.W.' : language === 'es' ? 'U.C.' : language === 'en' ? 'C.U.' : 'U.C.'}
                      </span>
                      <span className="text-sky-450 font-black" style={{ color: '#ffffff' }}>
                        {language === 'ar' ? 'وحدة التحكم' : language === 'de' ? 'Steuerwerk' : language === 'es' ? 'Unidad Control' : language === 'en' ? 'Control Unit' : 'Contrôle'}
                      </span>
                    </div>
                    <div className="bg-slate-900 border border-slate-850 rounded-xl p-1.5">
                      <span className="text-slate-400 font-mono block">
                        {language === 'ar' ? 'و.ح.م' : language === 'de' ? 'R.W.' : language === 'es' ? 'U.A.L.' : language === 'en' ? 'A.L.U.' : 'U.A.L.'}
                      </span>
                      <span className="text-pink-400 font-black font-mono">
                        {language === 'ar' ? 'حساب (ALU)' : language === 'de' ? 'Rechenwerk' : language === 'es' ? 'Cálculo (ALU)' : language === 'en' ? 'Math (ALU)' : 'Calcul (ALU)'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-indigo-950/40 rounded-xl px-2.5 py-1.5 border border-indigo-900/50 text-[9px] text-indigo-200">
                    <span className="font-mono text-slate-450">{language === 'ar' ? 'المسجلات' : language === 'de' ? 'Register' : language === 'es' ? 'Registros' : language === 'en' ? 'Registers' : 'Registres'}</span>
                    <span className="bg-indigo-505/20 px-1.5 py-0.5 rounded font-mono font-bold text-cyan-300">R0 = 0x05</span>
                  </div>
                </motion.div>

              </div>

              {/* Lower status row */}
              <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500 border-t border-slate-200 dark:border-slate-855 pt-3.5">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  {t('busSignalActive')}
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">{t('busSignalTraces')}</span>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ── EDUCATIONAL COGNITIVE DASHBOARD ── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 w-full rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/70 dark:bg-slate-900/45 backdrop-blur-xl py-4.5 px-6 shadow-md relative overflow-hidden"
        >
          <div className="absolute top-0 left-12 h-px w-28 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
            
            <div className="space-y-1.5 pb-4 md:pb-0">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <div className="p-1.5 rounded-lg bg-blue-500/10 dark:bg-blue-500/20">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-extrabold uppercase font-mono tracking-wider">{t('statsTitleProgram')}</span>
              </div>
              <p className="text-base font-black text-slate-950 dark:text-white">{t('statsValueProgram')}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('statsDescProgram')}</p>
            </div>

            <div className="space-y-1.5 pt-4 md:pt-0 pb-4 md:pb-0 md:pl-6">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <div className="p-1.5 rounded-lg bg-indigo-505/10 dark:bg-indigo-505/20">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-extrabold uppercase font-mono tracking-wider">{t('statsTitleExp')}</span>
              </div>
              <p className="text-base font-black text-slate-950 dark:text-white">{t('statsValueExp')}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('statsDescExp')}</p>
            </div>

            <div className="space-y-1.5 pt-4 md:pt-0 pb-4 md:pb-0 md:pl-6">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <div className="p-1.5 rounded-lg bg-emerald-505/10 dark:bg-emerald-505/20">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-extrabold uppercase font-mono tracking-wider">{language === 'ar' ? 'الاختبار النهائي' : language === 'de' ? 'Quiz-Test' : language === 'es' ? 'Cuestionario' : language === 'en' ? 'Final Quiz' : 'Ancrage'}</span>
              </div>
              <p className="text-base font-black text-slate-950 dark:text-white">{t('navQuiz')}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{language === 'ar' ? '8 أسئلة مع شروحات' : language === 'de' ? '8 Fragen mit Erklärungen' : language === 'es' ? '8 preguntas con explicaciones' : language === 'en' ? '8 questions with explanations' : '8 questions avec explications'}</p>
            </div>

            <div className="space-y-1.5 pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
                <div className="p-1.5 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 animate-pulse">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-extrabold uppercase font-mono tracking-wider">{language === 'ar' ? 'الوقت المقدر' : language === 'de' ? 'Dauer' : language === 'es' ? 'Tiempo estimado' : language === 'en' ? 'Timing' : 'Timing'}</span>
              </div>
              <p className="text-base font-black text-slate-950 dark:text-white">{language === 'ar' ? 'التقدير: 20 دقيقة' : language === 'de' ? 'Schätzung: 20 Min.' : language === 'es' ? 'Estimado: 20 min' : language === 'en' ? 'Estimation: 20 min' : 'Estimation: 20 min'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{language === 'ar' ? 'التحكم الذاتي في السرعة' : language === 'de' ? 'Autonome Geschwindigkeitskontrolle' : language === 'es' ? 'Control autónomo de velocidad' : language === 'en' ? 'Self-paced control' : 'Contrôle autonome de la vitesse'}</p>
            </div>

          </div>
        </motion.div>
      </div>

      

    </div>
  );
}
