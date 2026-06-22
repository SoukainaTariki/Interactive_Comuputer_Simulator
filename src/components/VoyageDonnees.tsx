import React, { useState, useEffect } from 'react';
import { Play, Keyboard, Calculator, Image, ArrowLeft, FolderOpen, Save, Cpu } from 'lucide-react';
import { ScenarioType } from '../data/scenariosData';
import { useLanguage } from '../context/LanguageContext';

interface VoyageDonneesProps {
  onStartScenario: (scenarioId: string) => void;
  onBackToHome?: () => void;
}

export default function VoyageDonnees({ onStartScenario, onBackToHome }: VoyageDonneesProps) {
  const { scenariosData, t, dir, language } = useLanguage();
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

  // Map icons and custom color schemes to scenarios
  const getScenarioAsset = (id: string) => {
    switch (id) {
      case 'clavier_ecrire':
        return {
          icon: Keyboard,
          borderColor: 'border-blue-200 dark:border-blue-900',
          hoverBorderColor: 'hover:border-blue-500 dark:hover:border-blue-400',
          glow: 'rgba(37, 99, 235, 0.08)',
          accentBg: 'bg-blue-50 dark:bg-blue-950/50',
          accentBorder: 'border-blue-200 dark:border-blue-800',
          iconColor: 'text-blue-600 dark:text-blue-400',
          badgeStyle: 'border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400',
          btnBg: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white',
          labelText: language === 'ar' ? "الضغط على مفتاح" : language === 'en' ? "Pressing a key" : language === 'es' ? "Presionar una tecla" : language === 'de' ? "Eine Taste drücken" : "Appuyer sur une touche"
        };
      case 'faire_calcul':
        return {
          icon: Calculator,
          borderColor: 'border-emerald-200 dark:border-emerald-900',
          hoverBorderColor: 'hover:border-emerald-500 dark:hover:border-emerald-400',
          glow: 'rgba(16, 185, 129, 0.08)',
          accentBg: 'bg-emerald-50 dark:bg-emerald-950/50',
          accentBorder: 'border-emerald-200 dark:border-emerald-800',
          iconColor: 'text-emerald-600 dark:text-emerald-400',
          badgeStyle: 'border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400',
          btnBg: 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-750 text-white',
          labelText: language === 'ar' ? "حساب 2 + 3" : language === 'en' ? "Calculate 2 + 3" : language === 'es' ? "Calcular 2 + 3" : language === 'de' ? "Berechne 2 + 3" : "Calculer 2 + 3"
        };
      case 'ouvrir_image':
        return {
          icon: Image,
          borderColor: 'border-purple-200 dark:border-purple-900',
          hoverBorderColor: 'hover:border-purple-500 dark:hover:border-purple-400',
          glow: 'rgba(147, 51, 234, 0.08)',
          accentBg: 'bg-purple-50 dark:bg-purple-950/50',
          accentBorder: 'border-purple-200 dark:border-purple-800',
          iconColor: 'text-purple-600 dark:text-purple-400',
          badgeStyle: 'border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400',
          btnBg: 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white',
          labelText: language === 'ar' ? "فتح صورة" : language === 'en' ? "Open an image" : language === 'es' ? "Abrir una imagen" : language === 'de' ? "Ein Bild öffnen" : "Ouvrir une image"
        };
      case 'ouvrir_fichier':
        return {
          icon: FolderOpen,
          borderColor: 'border-amber-200 dark:border-amber-900',
          hoverBorderColor: 'hover:border-amber-500 dark:hover:border-amber-400',
          glow: 'rgba(245, 158, 11, 0.08)',
          accentBg: 'bg-amber-50 dark:bg-amber-950/50',
          accentBorder: 'border-amber-200 dark:border-amber-800',
          iconColor: 'text-amber-600 dark:text-amber-400',
          badgeStyle: 'border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400',
          btnBg: 'bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white',
          labelText: language === 'ar' ? "فتح ملف / مجلد" : language === 'en' ? "Open a file / folder" : language === 'es' ? "Abrir un archivo / carpeta" : language === 'de' ? "Datei / Ordner öffnen" : "Ouvrir un fichier / dossier"
        };
      case 'enregistrer_fichier':
        return {
          icon: Save,
          borderColor: 'border-sky-200 dark:border-sky-900',
          hoverBorderColor: 'hover:border-sky-500 dark:hover:border-sky-400',
          glow: 'rgba(14, 165, 233, 0.08)',
          accentBg: 'bg-sky-50 dark:bg-sky-950/50',
          accentBorder: 'border-sky-200 dark:border-sky-800',
          iconColor: 'text-sky-600 dark:text-sky-400',
          badgeStyle: 'border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-400',
          btnBg: 'bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-700 text-white',
          labelText: language === 'ar' ? "حفظ ملف (Ctrl+S)" : language === 'en' ? "Save a file (Ctrl+S)" : language === 'es' ? "Guardar un archivo (Ctrl+S)" : language === 'de' ? "Datei speichern (Strg+S)" : "Enregistrer un fichier (Ctrl+S)"
        };
      case 'cycle_cpu':
      default:
        return {
          icon: Cpu,
          borderColor: 'border-indigo-200 dark:border-indigo-900',
          hoverBorderColor: 'hover:border-indigo-500 dark:hover:border-indigo-400',
          glow: 'rgba(99, 102, 241, 0.08)',
          accentBg: 'bg-indigo-50 dark:bg-indigo-950/50',
          accentBorder: 'border-indigo-200 dark:border-indigo-800',
          iconColor: 'text-indigo-600 dark:text-indigo-400',
          badgeStyle: 'border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400',
          btnBg: 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white',
          labelText: language === 'ar' ? "دورة المعالج (Fetch-Decode-Execute)" : language === 'en' ? "CPU Cycle (Fetch-Decode-Execute)" : language === 'es' ? "Ciclo de CPU (F-D-E)" : language === 'de' ? "CPU-Zyklus (F-D-E)" : "Cycle CPU (F-D-E)"
        };
    }
  };

  const cleanStepTitle = (title: string) => {
    return title.replace(/^(Étape|Step|الخطوة|Paso|Schritt)\s*\d+\s*[:：]\s*/i, '');
  };

  return (
    <div id="voyage-donnees-view" dir={dir} className={`w-[96%] max-w-[1800px] md:max-w-[2000px] mx-auto pt-1 pb-4 px-4 space-y-4 animate-fadeIn ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
      


      {/* Header and Back navigation button */}
      <div className="space-y-0.5">
        <h2 className={`text-xl md:text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {language === 'ar' ? 'السيناريوهات: رحلة البيانات' : language === 'en' ? 'Scenarios: The Data Journey' : language === 'es' ? 'Escenarios: El viaje de los datos' : language === 'de' ? 'Szenarien: Die Datenreise' : 'Scénarios : Le Voyage des Données'}
        </h2>
        <p className={`text-xs md:text-sm max-w-3xl ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
          {language === 'ar' ? 'اختر الدرس المطلوب استكشافه قبل الدخول في الرسوم المتحركة التفاعلية ومحاكي البنية الرياضية للحاسوب.' : language === 'en' ? 'Choose the lesson to explore before entering the interactive animation and architecture simulator.' : language === 'es' ? 'Elige la lección a explorar antes de ingresar a la animación interactiva y al simulador de arquitectura.' : language === 'de' ? 'Wähle die Lektion aus, die du erkunden möchtest, bevor du die interaktive Animation und den Architektur-Simulator startest.' : "Choisissez la leçon à explorer avant d'entrer dans l'animation interactive et le simulateur d'architecture."}
        </p>
      </div>

      {/* Main card grid mapping across scenario list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenariosData.map((scenario) => {
          const assets = getScenarioAsset(scenario.id);
          const Icon = assets.icon;
          const stepsCount = scenario.steps.length;

          return (
            <div
              key={scenario.id}
              id={`voyage-card-${scenario.id}`}
              style={{
                boxShadow: isDarkMode 
                  ? `0 12px 30px ${assets.glow}` 
                  : `0 8px 24px rgba(0, 0, 0, 0.03)`
              }}
              className={`flex flex-col justify-between border-2 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${assets.borderColor} ${assets.hoverBorderColor} ${
                isDarkMode ? 'bg-slate-950' : 'bg-white'
              }`}
            >
              <div className="p-5 md:p-6 flex-1 flex flex-col justify-between space-y-4">
                
                {/* Header structure of card */}
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 shrink-0 rounded-2xl border-2 flex items-center justify-center transition-all ${assets.accentBg} ${assets.accentBorder}`}
                  >
                    <Icon className={`w-8 h-8 ${assets.iconColor}`} />
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className={`font-black text-lg md:text-xl leading-snug tracking-tight truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {assets.labelText}
                    </h3>
                    
                    {/* Dynamic '6 étapes' or 'X étapes' Badge */}
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border uppercase tracking-wider font-mono ${assets.badgeStyle}`}
                    >
                      {stepsCount} {language === 'ar' ? 'خطوات' : language === 'en' ? 'steps' : language === 'es' ? 'pasos' : language === 'de' ? 'Schritte' : 'étapes'}
                    </span>
                  </div>
                </div>

                {/* Introductory Description of the lesson */}
                <p className={`text-xs md:text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  {scenario.description}
                </p>

                {/* Sub Steps preview points (sliced to 3 steps) */}
                <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-slate-900">
                  {scenario.steps.slice(0, 3).map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-blue-500 shrink-0">
                        {idx + 1}.
                      </span>
                      <span className={`font-medium truncate ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                        {cleanStepTitle(step.title)}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Actions Button at bottom */}
              <div className="px-5 pb-5 md:px-6 md:pb-6">
                <button
                  onClick={() => onStartScenario(scenario.id)}
                  className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 text-sm shadow-md transition-all active:scale-97 cursor-pointer hover:shadow-lg ${assets.btnBg}`}
                >
                  <Play className="w-4 h-4 fill-current shrink-0" />
                  <span>{language === 'ar' ? 'ابدأ' : language === 'en' ? 'Start' : language === 'es' ? 'Iniciar' : language === 'de' ? 'Starten' : 'Démarrer'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
