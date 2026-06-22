import React from 'react';
import { Laptop } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language, dir } = useLanguage();

  const getTeacherTitle = () => {
    switch (language) {
      case 'en': return "Computer Science Teacher – Qualifying High School";
      case 'ar': return "أستاذة مادة المعلوميات – سلك الثانوي التأهيلي";
      case 'es': return "Profesora de Informática – Escuela Secundaria Cualificada";
      case 'de': return "Informatiklehrerin – Qualifizierende Sekundarschule";
      default: return "Enseignante d'informatique – Lycée Qualifiant";
    }
  };

  const getMinistryTitle = () => {
    switch (language) {
      case 'en': return "Ministry of National Education, Preschool and Sports";
      case 'ar': return "وزارة التربية الوطنية والتعليم الأولي والرياضة";
      case 'es': return "Ministerio de Educación Nacional, Preescolar y Deportes";
      case 'de': return "Ministerium für Nationale Bildung, Vorschule und Sport";
      default: return "Ministère de l'Éducation Nationale, du Préscolaire et des Sports";
    }
  };

  return (
    <footer
  id="app-footer"
  dir={dir}
  className="border-t border-slate-200 bg-slate-50/70 dark:bg-slate-900/40 dark:border-slate-700 py-3 mt-10"
>
  <div className="w-[96%] max-w-[1800px] md:max-w-[2000px] mx-auto px-4 text-center">

    <div className="flex justify-center items-center gap-2 mb-1">
      <Laptop className="w-4 h-4 text-blue-600" />
      <span className="font-medium text-slate-700 dark:text-slate-300">
        Interactive Computer Simulator v1.0
      </span>
    </div>

    <p className="text-xs text-slate-500">
      © {currentYear} <strong>SOUKAINA TARIKI</strong> ·{' '}
      {getTeacherTitle()} ·{' '}
      {getMinistryTitle()}
    </p>

  </div>
</footer>
  );
}

