import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLang, uiTranslations, UiTranslations } from '../data/translations';
import { 
  getLocalizedComponents, 
  getLocalizedLabels, 
  getLocalizedDetails, 
  getLocalizedBusLabels, 
  getLocalizedScenarios, 
  getLocalizedQuiz 
} from '../data/localizedData';
import { ComputerComponentType } from '../data/componentsData';
import { ScenarioType } from '../data/scenariosData';
import { QuestionType } from '../data/quizData';
import { BusType, LABELS, DETAILS, BUS_LABELS } from '../data/diagramData';
import { quizQuestions } from '../data/quizData';

interface LanguageContextProps {
  language: SupportedLang;
  setLanguage: (lang: SupportedLang) => void;
  t: (key: keyof UiTranslations) => string;
  dir: 'ltr' | 'rtl';
  componentsData: ComputerComponentType[];
  scenariosData: ScenarioType[];
  quizQuestions: QuestionType[];
  labels: Record<string, { line1: string; line2: string; emoji: string }>;
  details: Record<string, { desc: string; role: string }>;
  busLabels: Record<string, { title: string; subtitle: string; type: BusType }>;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLang>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      if (saved === 'fr' || saved === 'en' || saved === 'ar' || saved === 'es' || saved === 'de') {
        return saved as SupportedLang;
      }
    }
    return 'fr'; // default French
  });

  const setLanguage = (lang: SupportedLang) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: keyof UiTranslations): string => {
    const pack = uiTranslations[language];
    return pack[key] || uiTranslations['en'][key] || uiTranslations['fr'][key] || String(key);
  };

  const dynamicComponents = getLocalizedComponents(language);
  const dynamicLabels = getLocalizedLabels(language, LABELS);
  const dynamicDetails = getLocalizedDetails(language, DETAILS);
  const dynamicBusLabels = getLocalizedBusLabels(language, BUS_LABELS);
  const dynamicScenarios = getLocalizedScenarios(language);
  const dynamicQuizQuestions = getLocalizedQuiz(language, quizQuestions);

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      dir,
      componentsData: dynamicComponents,
      scenariosData: dynamicScenarios,
      quizQuestions: dynamicQuizQuestions,
      labels: dynamicLabels,
      details: dynamicDetails,
      busLabels: dynamicBusLabels
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
