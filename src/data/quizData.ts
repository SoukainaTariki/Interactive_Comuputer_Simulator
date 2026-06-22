export interface QuestionType {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number; // 0-based index correspondant à l'option correcte
  explanation: string;
}

export const quizQuestions: QuestionType[] = [
  {
    id: 1,
    question: "Quel composant traite les données et coordonne tout le fonctionnement de l'ordinateur ?",
    options: [
      "L'Écran",
      "Le CPU (Processeur)",
      "Le Clavier",
      "Le support de Stockage"
    ],
    correctAnswerIndex: 1,
    explanation: "Le CPU (Processeur) est considéré comme le 'cerveau' de ton ordinateur. Il lit les instructions et réalise tous les traitements informatiques requérant de la logique."
  },
  {
    id: 2,
    question: "Quel composant stocke temporairement les informations et s'efface quand on éteint l'ordinateur ?",
    options: [
      "La RAM (Mémoire Vive)",
      "L'Écran de sortie",
      "Le Disque Dur Permanent",
      "La Souris"
    ],
    correctAnswerIndex: 0,
    explanation: "La RAM (mémoire vive) est volatile : elle retient uniquement les données en cours de traitement de manière temporaire et se vide entièrement à l'arrêt du PC."
  },
  {
    id: 3,
    question: "Quel composant joue le rôle de canal physique ou d'autoroute d'échange d'informations sur la carte mère ?",
    options: [
      "Le Bus",
      "L'Écran tactile",
      "Le Clavier branché",
      "Le ventilateur de refroidissement"
    ],
    correctAnswerIndex: 0,
    explanation: "Le Bus est l'interconnexion physique. Il transporte à toute vitesse les signaux électriques numériques d'un composant de la machine à un autre."
  },
  {
    id: 4,
    question: "Le clavier est un périphérique de quel type ?",
    options: [
      "Périphérique de Sortie",
      "Périphérique d'Entrée",
      "Périphérique de Stockage",
      "Liaison de données"
    ],
    correctAnswerIndex: 1,
    explanation: "Le clavier permet d'injecter des données brutes de l'humain vers l'électronique. C'est l'un des périphériques d'ENTRÉE fondamentaux."
  },
  {
    id: 5,
    question: "L’écran est un périphérique de quel type ?",
    options: [
      "Périphérique de Sortie",
      "Périphérique d'Entrée",
      "Unité de calcul pure",
      "Emplacement de Stockage"
    ],
    correctAnswerIndex: 0,
    explanation: "L’écran rend l'information disponible et visible pour l'être humain. C'est donc un périphérique de SORTIE."
  },
  {
    id: 6,
    question: "Où sont stockées tes données (images, musiques, fichiers) de façon durable, même sans courant électrique ?",
    options: [
      "Dans la mémoire volatile RAM",
      "Dans le CPU (Processeur)",
      "Dans le support de Stockage (Disque Dur / SSD / Clé USB)",
      "Dans le Bus de liaison"
    ],
    correctAnswerIndex: 2,
    explanation: "Le support de stockage (Disque Dur / SSD) sert à conserver tes fichiers de façon permanente. Il n'a pas besoin d'électricité pour retenir les informations !"
  },
  {
    id: 7,
    question: "Quelle unité interne du CPU est chargée de décoder les instructions et d'ordonner les étapes du traitement ?",
    options: [
      "L'Unité d'Arithmétique et de Logique (UAL)",
      "L'Unité de Contrôle (UC)",
      "L'écran de projection",
      "Le clavier mécanique"
    ],
    correctAnswerIndex: 1,
    explanation: "L'Unité de Contrôle (UC) est le chef de file du CPU : elle organise la lecture, le décodage et l'orchestration globale de chaque instruction."
  },
  {
    id: 8,
    question: "Quelle unité effectue réellement les additions, les calculs mathématiques et comparaisons logiques ?",
    options: [
      "L'Unité d'Arithmétique et de Logique (UAL)",
      "La RAM de calcul",
      "Le disque SSD",
      "L'écran de travail"
    ],
    correctAnswerIndex: 0,
    explanation: "L'Unité d'Arithmétique et de Logique (UAL) est l'unité arithmétique et logique du CPU. C'est le moteur de calcul pur qui fait les opérations fondamentales."
  }
];
