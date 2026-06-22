import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  PlayCircle, 
  HelpCircle, 
  Laptop, 
  BookOpen, 
  Sun, 
  Moon, 
  ArrowRightLeft, 
  Search, 
  Globe, 
  Menu, 
  X,
  Sparkles,
  Command,
  ChevronRight,
  Info,
  Tv,
  Sliders
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLearning, LearningLevel } from '../context/LearningContext';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLang } from '../data/translations';

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
  darkMode: boolean;
  themeMode?: 'light' | 'dark';
  toggleDarkMode: () => void;
}

export default function Header({ currentTab, setTab, darkMode, themeMode = 'light', toggleDarkMode }: HeaderProps) {
  const { isProjectionMode, setIsProjectionMode } = useLearning();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Nav items translated dynamically
  const navItems = [
    { id: 'home', label: t('navHome'), icon: Laptop },
    { id: 'schema', label: t('navComponents'), icon: BookOpen },
    { id: 'voyage', label: t('navScenarios'), icon: ArrowRightLeft },
    { id: 'simulation', label: t('navSimulations'), icon: PlayCircle },
    { id: 'quiz', label: t('navQuiz'), icon: HelpCircle },
  ];

  const currentLang = ['fr', 'en', 'ar', 'de', 'es'].includes(language) ? language : 'fr';

  // Localized string dictionary for search command palette and buttons
  const localUI = {
    searchBtnTitle: {
      fr: "Rechercher des concepts (Ctrl+K)",
      en: "Search concepts (Ctrl+K)",
      ar: "البحث عن المفاهيم (Ctrl+K)",
      es: "Buscar conceptos (Ctrl+K)",
      de: "Konzepte suchen (Strg+K)"
    },
    projectionActive: {
      fr: "Mode projection actif (taille normale)",
      en: "Projection mode active (normal size)",
      ar: "وضع العرض المكثف نشط (الحجم العادي)",
      es: "Modo proyección activo (tamaño normal)",
      de: "Projektionsmodus aktiv (normale Größe)"
    },
    projectionInactive: {
      fr: "Mode projection (grande taille + contraste élevé)",
      en: "Projection mode (large size + high contrast)",
      ar: "وضع العرض المكثف (حجم كبير + تباين عالٍ)",
      es: "Modo proyección (tamaño grande + alto contraste)",
      de: "Projektionsmodus (große Größe + hoher Kontrast)"
    },
    themeLightHint: {
      fr: "Thème : Clair - Cliquer pour Sombre",
      en: "Theme: Light - Click for Dark",
      ar: "المظهر: مضيء - انقر للمظهر المظلم",
      es: "Tema: Claro - Clic para Oscuro",
      de: "Thema: Hell - Klicken für Dunkel"
    },
    themeDarkHint: {
      fr: "Thème : Sombre - Cliquer pour Clair",
      en: "Theme: Dark - Click for Light",
      ar: "المظهر: مظلم - انقر للمظهر المضيء",
      es: "Tema: Oscuro - Clic para Claro",
      de: "Thema: Dunkel - Klicken für Hell"
    },
    searchPlaceholderText: {
      fr: "Rechercher un composant, simulateur ou leçon... (ex: RAM, CPU, Horloge)",
      en: "Search for a component, simulator, or lesson... (e.g., RAM, CPU, Clock)",
      ar: "ابحث عن مكون مادي، محاكي أو درس... (مثال: معالج، رام، ساعة)",
      es: "Buscar un componente, simulador o lección... (ej: RAM, CPU, Reloj)",
      de: "Nach Komponente, Simulator oder Lektion suchen... (z.B. RAM, CPU, Takt)"
    },
    matchingResultsLabel: {
      fr: "Résultats correspondants",
      en: "Matching Results",
      ar: "النتائج المطابقة",
      es: "Resultados correspondientes",
      de: "Übereinstimmende Ergebnisse"
    },
    goToLabel: {
      fr: "Aller à",
      en: "Go to",
      ar: "انتقال إلى",
      es: "Ir a",
      de: "Gehe zu"
    },
    noConceptsText: {
      fr: 'Aucun concept trouvé',
      en: 'No concepts found',
      ar: 'لا توجد مفاهيم مطابقة',
      es: 'No se encontraron conceptos',
      de: 'Keine Konzepte gefunden'
    },
    tryKeywordsText: {
      fr: 'Essayez des mots-clés simples comme "CPU", "RAM" ou "impulsion"',
      en: 'Try simple keywords like "CPU", "RAM", or "clock"',
      ar: 'جرب كلمات رئيسية بسيطة مثل "CPU" أو "RAM" أو "ساعة"',
      es: 'Pruebe palabras clave simples como "CPU", "RAM" o "reloj"',
      de: 'Versuchen Sie einfache Schlüsselwörter wie "CPU", "RAM" oder "Takt"'
    },
    searchFooterText: {
      fr: "Rechercher sur le simulateur • Tronc Commun Lycéen",
      en: "Search on Simulator • Secondary School Curriculum",
      ar: "البحث في المحاكي • المنهاج الدراسي الثانوي",
      es: "Buscar en el simulador • Plan de Estudios de Secundaria",
      de: "Suche im Simulator • Lehrplan der Sekundarstufe"
    },
    typeKText: {
      fr: "Tapez K pour naviguer",
      en: "Type K to navigate",
      ar: "اضغط على س للبحث",
      es: "Escriba K para navegar",
      de: "Drücken Sie K zum Navigieren"
    }
  };

  // Map search query to matching tabs/components for helpful mock feedback
  const searchableKeys = [
    { 
      name: language === 'ar' ? 'المعالج / CPU' : language === 'en' ? 'Processor / CPU' : language === 'es' ? 'Procesador / CPU' : language === 'de' ? 'Prozessor / CPU' : 'Processeur / CPU', 
      tab: 'schema', 
      desc: language === 'ar' ? 'اكتشف وحدة التحكم ووحدة الحساب والمنطق' : language === 'en' ? 'Discover the control unit and ALU' : language === 'es' ? 'Descubre la unidad de control y la ALU' : language === 'de' ? 'Entdecken Sie die Steuereinheit und das Rechenwerk (ALU)' : 'Découvrez l\'unité de commande et l\'ALU' 
    },
    { 
      name: language === 'ar' ? 'الذاكرة العشوائية / RAM' : language === 'en' ? 'RAM / Memory' : language === 'es' ? 'Memoria RAM / Viva' : language === 'de' ? 'RAM-Arbeitsspeicher' : 'Mémoire RAM / Vive', 
      tab: 'schema', 
      desc: language === 'ar' ? 'استكشف الذاكرة المتطايرة لتخزين البيانات المؤقت' : language === 'en' ? 'Explore volatile temporary storage memory' : language === 'es' ? 'Explore la memoria volátil de almacenamiento temporal' : language === 'de' ? 'Erkunden Sie den flüchtigen temporären Speicher' : 'Explorez la mémoire volatile de stockage temporaire' 
    },
    { 
      name: language === 'ar' ? 'نبضة الساعة الكهربائية' : language === 'en' ? 'Clock Pulse' : language === 'es' ? 'Impulso de Reloj' : language === 'de' ? 'Systemtakt-Impuls' : 'Impulsion d\'Horloge', 
      tab: 'simulation', 
      desc: language === 'ar' ? 'محاكاة تردد دورة الحاسوب (مستوى متقدم)' : language === 'en' ? 'Simulate computer cycle frequency (Advanced Mode)' : language === 'es' ? 'Simular la frecuencia de ciclo informático (Modo Avanzado)' : language === 'de' ? 'Computertaktfrequenz simulieren (Erweiterter Modus)' : 'Simuler la fréquence de cycle informatique (Mode Avancé)' 
    },
    { 
      name: language === 'ar' ? 'رحلة البيانات والاتصالات' : language === 'en' ? 'Data Journey' : language === 'es' ? 'Viaje de Datos' : language === 'de' ? 'Die Datenreise' : 'Voyage des Données', 
      tab: 'voyage', 
      desc: language === 'ar' ? 'عرض عملية حسابية 2+3 أو المدخلات من الكيبورد' : language === 'en' ? 'Visualize 2+3 calculation or keyboard input' : language === 'es' ? 'Visualizar cálculo de 2+3 o entrada de teclado' : language === 'de' ? 'Visualisieren Sie die 2+3-Rechnung oder die Tastatureingabe' : 'Visualisez un calcul mathématique 2+3 ou une saisie clavier' 
    },
    { 
      name: language === 'ar' ? 'اختبار المعارف النظري' : language === 'en' ? 'Theoretical Quiz' : language === 'es' ? 'Cuestionario Teórico' : language === 'de' ? 'Theorie-Quiz' : 'Quiz théorique', 
      tab: 'quiz', 
      desc: language === 'ar' ? 'اختبر مهاراتك ومعلوماتك في هندسة الحاسوب' : language === 'en' ? 'Test your computer architecture architecture skills' : language === 'es' ? 'Pruebe sus conocimientos sobre arquitectura de PC' : language === 'de' ? 'Testen Sie Ihre Fähigkeiten im Bereich Computerarchitektur' : 'Testez vos compétences Tronc Commun Lycée' 
    },
    { 
      name: language === 'ar' ? 'نواقل العناوين والبيانات' : language === 'en' ? 'Address and Data Buses' : language === 'es' ? 'Buses de Direcciones y de Datos' : language === 'de' ? 'Adress- und Datenbusse' : 'Bus d\'Adresses et de Données', 
      tab: 'simulation', 
      desc: language === 'ar' ? 'فهم الاتصالات والترابط الفيراري (مستوى متقدم)' : language === 'en' ? 'Grasp physical line communications (Advanced Mode)' : language === 'es' ? 'Comprender la comunicación por cable (Modo Avanzado)' : language === 'de' ? 'Verschaffen Sie sich einen Eindruck von Datenbus-Kommunikation' : 'Comprendre la communication filaire (Mode Avancé)' 
    },
  ];

  const filteredSearch = searchQuery.trim() === '' 
    ? searchableKeys 
    : searchableKeys.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Esc key closure bindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsLangDropdownOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync mobile drawer closure on navigate
  const handleNavigate = (tabId: string) => {
    setTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      id="app-header" 
      className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-900/80 transition-colors duration-300 shadow-xs"
    >
      <div className="w-[96%] max-w-[1800px] md:max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* ── ZONE GAUCHE: LOGO & APPLICATION NAME ── */}
          <div 
            onClick={() => handleNavigate('home')} 
            className="flex items-center gap-2.5 cursor-pointer group active:scale-98 transition-transform shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-650 to-indigo-600 text-white flex items-center justify-center shadow-xs group-hover:shadow-md group-hover:scale-102 transition-all">
              <Laptop className="w-5 h-5" id="logo-icon animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black text-slate-955 dark:text-white tracking-tight leading-none group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Interactive Computer Simulator
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-slate-500 font-mono tracking-wider mt-0.5 uppercase">
                {t('platformSubtitle')}
              </span>
            </div>
          </div>

          {/* ── ZONE CENTRALE: MAIN HORIZONTAL TABS (Desktop Only) ── */}
          <nav 
            id="main-navigation" 
            className="hidden lg:flex items-center bg-slate-100/65 dark:bg-slate-900/60 p-1.5 rounded-xl border border-slate-200/40 dark:border-slate-800/40"
          >
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavigate(item.id)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'text-slate-950 dark:text-white' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Sliding pill active layout indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="active-tab-indicator"
                      className="absolute inset-0 bg-white dark:bg-slate-800 rounded-lg shadow-2xs border border-slate-200/20 dark:border-slate-700/30"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  
                  <IconComponent className="w-3.5 h-3.5 shrink-0 relative z-10" />
                  <span className="relative z-10 leading-none">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ── ZONE DROITE: PREMIUM COMPACT BUTTONS ([🔍] [🌐 FR] [☀️/🌙]) ── */}
          <div className="flex items-center gap-2">
            
            {/* Desktop-only action items row for unified same-height icons */}
            <div className="flex items-center gap-2">
              
              {/* 1. BUTTON SEARCH [ 🔍 ] */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-50/50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800 text-slate-505 dark:text-slate-400 flex items-center justify-center cursor-pointer transition-all hover:scale-102 hover:shadow-2xs"
                title={localUI.searchBtnTitle[currentLang]}
                id="search-trigger-btn"
              >
                <Search className="w-4.5 h-4.5" />
              </button>

              {/* 2. BUTTON LANGUE [ 🌐 FR ] */}
              <div className="relative">
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="h-9 sm:h-10 px-3 rounded-xl bg-slate-50/50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800 text-slate-650 dark:text-slate-400 flex items-center gap-1.5 font-mono text-xs font-black cursor-pointer transition-all hover:scale-102 select-none font-sans"
                  id="lang-selector-btn"
                >
                  <Globe className="w-4 h-4 text-slate-405 shrink-0" />
                  <span>{language.toUpperCase()}</span>
                </button>

                {/* Micro language menu wrapper */}
                <AnimatePresence>
                  {isLangDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsLangDropdownOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-1 w-44 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-xl z-50 overflow-hidden font-sans"
                      >
                        <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                          {language === 'fr' ? 'Langues' : language === 'en' ? 'Languages' : language === 'ar' ? 'اللغات المتاحة' : language === 'es' ? 'Idiomas' : 'Sprachen'}
                        </div>
                        <div className="space-y-1">
                          {([
                            { code: 'fr', label: '🇫🇷 Français' },
                            { code: 'en', label: '🇺🇸 English' },
                            { code: 'ar', label: '🇸🇦 العربية' },
                            { code: 'es', label: '🇪🇸 Español' },
                            { code: 'de', label: '🇩🇪 Deutsch' }
                          ] as { code: SupportedLang; label: string }[]).map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setLanguage(lang.code);
                                setIsLangDropdownOpen(false);
                              }}
                              className={`w-full text-left px-2.5 py-1.5 text-xs font-bold rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                                language === lang.code 
                                  ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400' 
                                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-350'
                              }`}
                            >
                              <span>{lang.label}</span>
                              {language === lang.code && (
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>



              {/* ── MODE DE PROJECTION (Projection High Contrast Selector) ── */}
              <button
                onClick={() => setIsProjectionMode(!isProjectionMode)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center cursor-pointer transition-all hover:scale-102 mr-1 ${
                  isProjectionMode
                    ? 'bg-amber-500 border-amber-650 text-white shadow-md shadow-amber-500/10'
                    : 'bg-slate-50/50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800 text-slate-505 dark:text-slate-400'
                }`}
                title={isProjectionMode ? localUI.projectionActive[currentLang] : localUI.projectionInactive[currentLang]}
                id="projection-toggle-btn"
              >
                <Tv className={`w-4.5 h-4.5 ${isProjectionMode ? 'animate-pulse' : ''}`} />
              </button>

              {/* 3. BUTTON THEME SWITCHER [ ☀️ / 🌙 ] */}
              <button
                onClick={toggleDarkMode}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-50/50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800 text-slate-650 dark:text-slate-400 flex items-center justify-center cursor-pointer transition-all hover:scale-102"
                title={themeMode === 'light' ? localUI.themeLightHint[currentLang] : localUI.themeDarkHint[currentLang]}
                id="theme-toggle-btn"
                aria-label="Changer le thème"
               >
                <div className="relative w-4.5 h-4.5 flex items-center justify-center">
                  {themeMode === 'light' ? (
                    <motion.div
                      key="light"
                      initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <Sun className="w-4.5 h-4.5 text-amber-500 fill-amber-500/20" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="dark"
                      initial={{ scale: 0.5, rotate: 45, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <Moon className="w-4.5 h-4.5 text-indigo-400 fill-indigo-500/10" />
                    </motion.div>
                  )}
                </div>
              </button>

            </div>

            {/* Mobile hamburger menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 flex items-center justify-center text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-850 cursor-pointer"
              id="mobile-drawer-trigger"
              aria-label="Menu de navigation principal"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-rose-500 animate-pulse" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

          </div>

        </div>
      </div>

      {/* ── RESPONSIVE MOBILE NAV DRAWER PANEL/OVERLAY ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-900 shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4">
              <div className="grid grid-cols-1 gap-2">
                {navItems.map((item) => {
                  const IconComp = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`flex items-center gap-3 w-full px-4.5 py-3 rounded-xl text-sm font-black transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-900/55 text-slate-700 dark:text-slate-300 border border-slate-200/40 dark:border-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <IconComp className="w-4.5 h-4.5" />
                      <span>{item.label}</span>
                      {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SEARCH COMMAND PALETTE MODAL (UNIVERSAL MOCK) ── */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:pt-28">
            {/* Backdrop filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden font-sans"
            >
              
              {/* Query bar */}
              <div className="flex items-center gap-2.5 px-4.5 py-4 border-b border-slate-200/80 dark:border-slate-800">
                <Command className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder={localUI.searchPlaceholderText[currentLang]}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-slate-800 dark:text-white placeholder-slate-400 text-sm focus:ring-0"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="px-2 py-1 text-[10px] font-mono font-black border rounded bg-slate-100 dark:bg-slate-800 dark:border-slate-700 text-slate-505"
                >
                  ESC
                </button>
              </div>

              {/* Items feed */}
              <div className="max-h-[300px] overflow-y-auto p-2">
                {filteredSearch.length > 0 ? (
                  <div className="space-y-1">
                    <div className="px-2.5 py-1 text-[10.5px] font-bold text-slate-400 dark:text-slate-500 uppercase font-mono tracking-wider">
                      {localUI.matchingResultsLabel[currentLang]}
                    </div>
                    {filteredSearch.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          handleNavigate(item.tab);
                          setIsSearchOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-150/70 dark:hover:bg-slate-800 flex items-center justify-between group cursor-pointer transition-all border border-transparent hover:border-slate-200/50 dark:hover:border-slate-705"
                      >
                        <div>
                          <div className="text-xs font-black text-slate-800 dark:text-slate-250 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {item.name}
                          </div>
                          <div className="text-[10px] text-slate-450 dark:text-slate-450 mt-0.5">
                            {item.desc}
                          </div>
                        </div>
                        <div className="text-[10px] font-bold text-blue-650 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-md flex items-center gap-0.5 shrink-0 opacity-80 group-hover:opacity-100">
                          <span>{localUI.goToLabel[currentLang]}</span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-slate-400 space-y-1">
                    <div>{localUI.noConceptsText[currentLang]} "{searchQuery}"</div>
                    <div className="text-[10.5px]">{localUI.tryKeywordsText[currentLang]}</div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4.5 py-2.5 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-[10px] font-mono text-slate-400 font-bold flex items-center justify-between">
                <span>{localUI.searchFooterText[currentLang]}</span>
                <span>{localUI.typeKText[currentLang]}</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </header>
  );
}
