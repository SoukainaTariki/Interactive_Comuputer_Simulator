import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  ArrowLeft,
  ArrowRight, 
  AlertCircle,
  BookOpen
} from 'lucide-react';
import { QuestionType } from '../data/quizData';
import { useLanguage } from '../context/LanguageContext';

interface QuizProps {
  onBackToHome?: () => void;
}

const QUIZ_STRINGS = {
  fr: {
    resultsTitle: "Résultats du Quiz de validation",
    formativeEvaluation: "Évaluation formative • Tronc Commun Lycée",
    scoreLabel: "Score :",
    correctionLabel: "Corrigé rapide :",
    refLabel: "Réf :",
    restartLabel: "Recommencer le Quiz",
    qcmTitle: "QCM Évaluation",
    qcmSub: "Connaissances de l'architecture du PC",
    questionLabel: "Question",
    excellent: "Excellent 🏆",
    excellentPhrase: "Félicitations ! Tu as parfaitement compris le voyage des données dans un ordinateur.",
    good: "Bien 🌟",
    goodPhrase: "Très bon score ! Relis un peu les fiches des composants pour obtenir le sans-faute de 8/8.",
    review: "À revoir 📚",
    reviewPhrase: "Ne t'inquiète pas ! Relis tranquillement les fiches \"Explorer les composants\" et réessaie le quiz pour t'améliorer."
  },
  en: {
    resultsTitle: "Validation Quiz Results",
    formativeEvaluation: "Formative Evaluation • High School Curriculum",
    scoreLabel: "Score:",
    correctionLabel: "Quick Recap:",
    refLabel: "Ref:",
    restartLabel: "Restart the Quiz",
    qcmTitle: "QCM Evaluation",
    qcmSub: "PC Architecture Knowledge",
    questionLabel: "Question",
    excellent: "Excellent 🏆",
    excellentPhrase: "Congratulations! You have perfectly understood the data flow in a computer.",
    good: "Good 🌟",
    goodPhrase: "Great score! Review the component guides to achieve a perfect 8/8.",
    review: "To review 📚",
    reviewPhrase: "Don't worry! Read the \"Explore components\" guides and try the quiz again to improve."
  },
  ar: {
    resultsTitle: "نتائج اختبار التحقق من الفهم",
    formativeEvaluation: "تقييم تكويني • منهاج الحاسوب الثانوي التأسيسي",
    scoreLabel: "النتيجة النهائية:",
    correctionLabel: "التصحيح السريع والملخص المبسط:",
    refLabel: "الإجابة الصحيحة:",
    restartLabel: "إعادة الاختبار",
    qcmTitle: "اختبار خيارات متعددة",
    qcmSub: "معارف ومعلومات هندسة الحواسب الآلية",
    questionLabel: "السؤال",
    excellent: "ممتاز ومتميز 🏆",
    excellentPhrase: "تهانينا! لقد استوعبت تماماً وفهمت مسار البيانات الكهربائية داخل أجهزة الحاسوب.",
    good: "جيد جداً 🌟",
    goodPhrase: "نتيجة رائعة! راجع بطاقات المكونات قليلاً للحصول على العلامة الكاملة 8/8 في المرة القادمة.",
    review: "يحتاج للمراجعة 📚",
    reviewPhrase: "لا تقلق أبداً! اقرأ بطاقات المكونات من تبويب \"استكشاف المكونات المادية\" بتركيز وحاول مرة أخرى لتحسين مستواك."
  },
  es: {
    resultsTitle: "Resultados del Cuestionario de Validación",
    formativeEvaluation: "Evaluación formativa • Plan de Estudios de Secundaria",
    scoreLabel: "Puntuación:",
    correctionLabel: "Recapitulación rápida:",
    refLabel: "Ref:",
    restartLabel: "Reiniciar el Cuestionario",
    qcmTitle: "Evaluación de Cuestionario",
    qcmSub: "Conocimiento de la Arquitectura de la PC",
    questionLabel: "Pregunta",
    excellent: "Excelente 🏆",
    excellentPhrase: "¡Felicidades! Has entendido perfectamente el recorrido de los datos en la computadora.",
    good: "Bien 🌟",
    goodPhrase: "¡Excelente puntuación! Revisa un poco las guías de componentes para obtener el 8/8.",
    review: "Para revisar 📚",
    reviewPhrase: "¡No te preocupes! Lee las guías de \"Explorar componentes\" y vuelve a intentar el quiz para mejorar."
  },
  de: {
    resultsTitle: "Ergebnisse des Validierungs-Quiz",
    formativeEvaluation: "Formative Bewertung • Sekundarstufen-Lehrplan",
    scoreLabel: "Ergebnis:",
    correctionLabel: "Schnelle Zusammenfassung:",
    refLabel: "Ref:",
    restartLabel: "Quiz neu starten",
    qcmTitle: "Quiz-Bewertung",
    qcmSub: "PC-Architektur Kenntnisse",
    questionLabel: "Frage",
    excellent: "Hervorragend 🏆",
    excellentPhrase: "Herzlichen Glückwunsch! Du hast den Datenfluss im PC perfekt verstanden.",
    good: "Gut 🌟",
    goodPhrase: "Toller Punktestand! Lies die Komponenten-Führer durch, um die vollen 8/8 zu erreichen.",
    review: "Wiederholen 📚",
    reviewPhrase: "Keine Sorge! Lies die „Komponenten erkunden“-Führer durch und versuche das Quiz erneut."
  }
};

export default function Quiz({ onBackToHome }: QuizProps) {
  const { quizQuestions, t, dir, language } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({}); // maps question index to picked option index
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const qs = QUIZ_STRINGS[language as keyof typeof QUIZ_STRINGS] || QUIZ_STRINGS.fr;

  const currentQuestion: QuestionType = quizQuestions[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return; // Prevent changing answer

    const updatedAnswers = { ...selectedAnswers, [currentQuestionIndex]: optionIndex };
    setSelectedAnswers(updatedAnswers);
    setIsAnswered(true);

    if (optionIndex === currentQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsAnswered(false);
    setShowResults(false);
    setScore(0);
  };

  // Feedback calculation based on standard Lycée grading keys
  const getFeedback = (finalScore: number) => {
    if (finalScore >= 7) {
      return {
        text: qs.excellent,
        color: 'text-emerald-800 dark:text-emerald-350 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900',
        phrase: qs.excellentPhrase
      };
    } else if (finalScore >= 5) {
      return {
        text: qs.good,
        color: 'text-blue-800 dark:text-blue-350 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900',
        phrase: qs.goodPhrase
      };
    } else {
      return {
        text: qs.review,
        color: 'text-rose-800 dark:text-rose-350 bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900',
        phrase: qs.reviewPhrase
      };
    }
  };

  if (showResults) {
    const feedback = getFeedback(score);
    return (
      <div id="quiz-results-view" className="pt-1 pb-4 px-4 max-w-2xl mx-auto space-y-4" dir={dir}>

        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 shadow-sm bg-white dark:bg-slate-950 text-center">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/30 rounded-full flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400 mb-1">
            <Award className="w-10 h-10" id="results-award-icon" />
          </div>
          
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100">{qs.resultsTitle}</h3>
            <p className="text-gray-500 text-xs mt-0.5">{qs.formativeEvaluation}</p>
          </div>

          {/* Large custom grade badge */}
          <div className={`inline-block px-5 py-2 rounded-xl border-2 font-black text-lg tracking-wide ${feedback.color}`}>
            {qs.scoreLabel} {score} / {quizQuestions.length} • {feedback.text}
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed px-4">
            {feedback.phrase}
          </p>

          {/* Quick Recap lists of correct/incorrect questions */}
          <div className="text-left bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-2.5" dir={dir}>
            <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider mb-1">{qs.correctionLabel}</span>
            {quizQuestions.map((q, idx) => {
              const studentAnswer = selectedAnswers[idx];
              const isCorrect = studentAnswer === q.correctAnswerIndex;
              return (
                <div key={q.id} className="flex items-start gap-2 text-xs">
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold text-gray-800 dark:text-gray-200">{qs.questionLabel} {idx + 1}. {q.question.slice(0, 50)}...</span>
                    <p className="text-gray-500 mt-0.5">
                      {qs.refLabel} <span className="font-semibold text-emerald-700 dark:text-emerald-400">{q.options[q.correctAnswerIndex]}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            id="btn-retry-quiz"
            onClick={handleResetQuiz}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-transform active:scale-95 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4.5 h-4.5" />
            <span>{qs.restartLabel}</span>
          </button>
        </div>
      </div>
    );
  }

  const selectedOption = selectedAnswers[currentQuestionIndex];

  return (
    <div id="quiz-question-view" className="pt-1 pb-4 px-4 max-w-3xl mx-auto space-y-4" dir={dir}>
      

      {/* Quiz Progress header */}
      <div className="bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl py-3 px-5 shadow-xs flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase">{qs.qcmTitle}</span>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mt-0.5">{qs.qcmSub}</h3>
        </div>
        <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-850 dark:text-blue-400 border border-blue-100 dark:border-blue-900 font-bold px-2.5 py-1 rounded-xl text-xs sm:text-sm font-mono shrink-0">
          {qs.questionLabel} {currentQuestionIndex + 1} / {quizQuestions.length}
        </span>
      </div>

      {/* Main question box */}
      <div className="bg-white dark:bg-slate-950 border-2 border-gray-100 dark:border-slate-900 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
        <h4 className="text-lg md:text-xl font-black text-gray-900 dark:text-white leading-snug">
          {currentQuestion.question}
        </h4>

        {/* List of answer options with strict buttons for touch size targets */}
        <div className="space-y-2.5">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectAnswer = idx === currentQuestion.correctAnswerIndex;
            
            let btnClasses = 'border-gray-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100/50 dark:hover:bg-slate-800 text-gray-800 dark:text-gray-200';
            let iconElement = <span className="w-4.5 h-4.5 rounded-full border border-gray-300 dark:border-slate-700 shrink-0 bg-white dark:bg-slate-900"></span>;

            if (isAnswered) {
              if (isCorrectAnswer) {
                btnClasses = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-955 dark:text-emerald-300 font-semibold';
                iconElement = <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />;
              } else if (isSelected) {
                btnClasses = 'border-rose-300 bg-rose-50 dark:bg-rose-950/20 text-rose-950 dark:text-rose-300';
                iconElement = <XCircle className="w-4.5 h-4.5 text-rose-600 shrink-0" />;
              } else {
                btnClasses = 'border-gray-100 dark:border-slate-900 bg-white dark:bg-slate-950 text-gray-400 opacity-60';
              }
            } else if (isSelected) {
              btnClasses = 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200';
            }

            return (
              <button
                key={idx}
                id={`quiz-option-${idx}`}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full p-3.5 rounded-xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer text-sm sm:text-base leading-relaxed ${btnClasses}`}
              >
                {iconElement}
                <span className="flex-1">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Immediate Pedagogical Explanation block once answered */}
        {isAnswered && (
          <div className="bg-blue-50/70 dark:bg-blue-950/35 border border-blue-200 dark:border-blue-900/55 rounded-2xl p-5 space-y-2 animate-fadeIn duration-200">
            <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 font-bold text-sm">
              <BookOpen className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" />
              <span>{language === 'ar' ? 'لماذا هذه هي الإجابة الصحيحة؟' : language === 'de' ? 'Warum ist das die richtige Antwort?' : language === 'es' ? '¿Por qué esta es la respuesta correcta?' : language === 'en' ? 'Why is this the correct answer?' : "Pourquoi c'est la bonne réponse ?"}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Bottom controls: Proceed to Next Question */}
        {isAnswered && (
          <div className="flex justify-end pt-2">
            <button
              id="quiz-btn-next"
              onClick={handleNextQuestion}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl text-base inline-flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer shadow-xs font-sans"
            >
              <span>{currentQuestionIndex === quizQuestions.length - 1 ? (language === 'ar' ? 'إنهاء وعرض النتيجة' : language === 'de' ? 'Beenden und Ergebnis anzeigen' : language === 'es' ? 'Terminar y ver puntuación' : language === 'en' ? 'Finish and see score' : 'Terminer et voir le score') : (language === 'ar' ? 'السؤال التالي' : language === 'de' ? 'Nächste Frage' : language === 'es' ? 'Siguiente pregunta' : language === 'en' ? 'Next Question' : 'Question Suivante')}</span>
              <ArrowRight className={`w-4.5 h-4.5 ${language === 'ar' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
