export interface ComputerComponentType {
  id: string;
  name: string;
  category: 'entree' | 'traitement' | 'stockage' | 'sortie' | 'liaison';
  role: string;
  example: string;
  simpleExplanation: string;
  pourquoiImportant: string;
  color: string;
}

export const componentsData: ComputerComponentType[] = [
  {
    id: 'clavier',
    name: 'Clavier',
    category: 'entree',
    role: 'Permet à l’utilisateur de saisir des textes, caractères ou commandes et d\'envoyer des instructions à l\'ordinateur.',
    example: 'Quand tu appuies sur la touche "A", un signal électrique binaire est généré.',
    simpleExplanation: 'C\'est l\'outil d\'entrée principal qui convertit tes frappes physiques en signaux informatiques compréhensibles.',
    pourquoiImportant: 'C\'est le périphérique indispensable pour exprimer tes pensées et tes ordres à la machine. Sans lui, tu ne pourrais pas écrire d\'e-mail ni saisir d\'opérations.',
    color: 'border-emerald-200 bg-emerald-50 text-emerald-800'
  },
  {
    id: 'bus',
    name: 'Bus de données',
    category: 'liaison',
    role: 'Transporte les signaux de données électriques à très haute vitesse entre tous les composants de la carte mère.',
    example: 'Acheminer le signal de la touche clavier vers la RAM puis vers le processeur.',
    simpleExplanation: 'Le Bus est l\'autoroute de l\'ordinateur. Il relie les puces électroniques pour qu\'elles puissent s\'échanger des informations.',
    pourquoiImportant: 'Sans le bus, tous les composants physiques de l\'ordinateur resteraient isolés les uns des autres et aucune communication ne serait possible.',
    color: 'border-yellow-200 bg-yellow-50 text-yellow-800'
  },
  {
    id: 'ram',
    name: 'RAM (Mémoire Vive)',
    category: 'stockage',
    role: 'Stocke temporairement les données et les instructions des programmes en cours d\'exécution (actives).',
    example: 'Garder provisoirement le texte d\'un document tant que tu n\'as pas cliqué sur Enregistrer.',
    simpleExplanation: 'C\'est la mémoire de travail ultra-rapide du PC. Elle s\'efface complètement dès que l\'on éteint l\'appareil.',
    pourquoiImportant: 'Elle évite au CPU de devoir puiser ses données sur le disque dur très lent, ce qui rend l\'exécution des logiciels instantanée.',
    color: 'border-blue-200 bg-blue-50 text-blue-800'
  },
  {
    id: 'cpu',
    name: 'CPU (Processeur)',
    category: 'traitement',
    role: 'Lit les instructions d\'un programme, les exécute, effectue les traitements et coordonne le fonctionnement de toute la machine.',
    example: 'Traiter l\'ouverture d\'une photo ou calculer l\'emplacement d\'un objet.',
    simpleExplanation: 'C\'est le véritable "cerveau" ou moteur central de l\'ordinateur.',
    pourquoiImportant: 'Sans lui, l\'ordinateur ne serait qu\'un tas de plastique et de métal inerte : aucune tâche de calcul ou d\'intelligence ne pourrait démarrer.',
    color: 'border-rose-200 bg-rose-50 text-rose-800'
  },
  {
    id: 'uc',
    name: 'UC (Unité de Contrôle)',
    category: 'traitement',
    role: 'Située à l\'intérieur du CPU, elle charge, décode et organise l\'ordre d\'exécution de chaque instruction de travail.',
    example: 'Comprendre qu\'une touche du clavier est un ordre d\'affichage et ordonner à l\'écran d\'allumer ses pixels.',
    simpleExplanation: 'C\'est le chef d\'orchestre suprême à l\'intérieur du processeur : elle sait qui doit agir et quand.',
    pourquoiImportant: 'Elle synchronise parfaitement toutes les puces à la vitesse de l\'horloge électrique, garantissant la stabilité du processeur.',
    color: 'border-purple-200 bg-purple-50 text-purple-800'
  },
  {
    id: 'ual',
    name: 'UAL (Unité d\'Arithmétique et de Logique)',
    category: 'traitement',
    role: 'Fait la somme, la soustraction des nombres et résout les règles logiques (comparaisons de valeurs Vrai/Faux).',
    example: 'Résoudre mathématiquement le calcul binaire 2 + 3 pour renvoyer le résultat 5.',
    simpleExplanation: 'C\'est la calculatrice pure intégrée au processeur, destinée aux mathématiques fondamentales.',
    pourquoiImportant: 'Tout programme informatique est en réalité une suite infinie d\'additions et de décisions logiques que seule l\'UAL sait résoudre.',
    color: 'border-pink-200 bg-pink-50 text-pink-800'
  },
  {
    id: 'stockage',
    name: 'Stockage (Disque Dur / SSD / Clé USB)',
    category: 'stockage',
    role: 'Conserve tes logiciels, fichiers, images et ton système d\'exploitation de manière permanente, même après l\'arrêt de l\'ordinateur.',
    example: 'Enregistrer une photo de vacances ou enregistrer un devoir d\'informatique.',
    simpleExplanation: 'C\'est la mémoire de stockage de masse, stable et durable, qui ne nécessite aucune électricité.',
    pourquoiImportant: 'Elle garantit que tes souvenirs, tes projets scolaires et tes logiciels restent disponibles au prochain allumage de l\'ordinateur.',
    color: 'border-cyan-200 bg-cyan-50 text-cyan-800'
  },
  {
    id: 'ecran',
    name: 'Écran',
    category: 'sortie',
    role: 'Affiche de manière fluide et visuelle l\'aboutissement final du traitement opéré par l\'ordinateur.',
    example: 'Afficher le dessin de la lettre "A" ou le résultat d\'une addition.',
    simpleExplanation: 'C\'est le périphérique de sortie visuel indispensable pour dialoguer avec l\'ordinateur.',
    pourquoiImportant: 'Il traduit en temps réel les millions de signaux électroniques invisibles circulant dans l\'ordinateur sous forme d\'images claires.',
    color: 'border-indigo-200 bg-indigo-50 text-indigo-800'
  }
];
