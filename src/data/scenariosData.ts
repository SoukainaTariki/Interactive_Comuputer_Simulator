export interface ScenarioStep {
  componentId: string;
  title: string;
  queSePasseTil: string;
  pourquoi: string;
  packetValue: string; // La donnée visible ("A", "2 + 3" puis "5", "image.jpg")
}

export interface ScenarioType {
  id: string;
  title: string;
  description: string;
  pathString: string;
  activationQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  steps: ScenarioStep[];
  summaryPoints: string[];
}

export const scenariosData: ScenarioType[] = [
  {
    id: 'clavier_ecrire',
    title: 'Scénario 1 : J\'écris au clavier',
    description: 'Observe pas à pas comment le fait d\'appuyer sur la touche du clavier fait voyager la lettre "A" jusqu\'à l\'écran.',
    pathString: 'Clavier ➔ Bus ➔ RAM ➔ CPU ➔ RAM ➔ Écran',
    activationQuestion: {
      question: "Quand tu appuies sur une touche du clavier, est-ce que la lettre va directement à l’écran ?",
      options: [
        "Oui, le câble relie directement le clavier à l'écran.",
        "Non, le signal doit d'abord transiter par l'intérieur de l'ordinateur (RAM, CPU, Bus) pour être traité.",
        "Oui, l'écran aspire l'électricité de la touche directement."
      ],
      correctIndex: 1,
      explanation: "Exactement ! La touche tapée produit un signal binaire qui doit être acheminé, mis en mémoire et traité avant de pouvoir être dessiné et affiché sur l'écran."
    },
    steps: [
      {
        componentId: 'clavier',
        title: 'Étape 1 : Saisie de la lettre "A"',
        queSePasseTil: 'L’utilisateur appuie sur la touche "A" du clavier.',
        pourquoi: 'Le clavier est un périphérique d\'entrée. C\'est l\'action externe de l\'utilisateur qui lance le voyage de la donnée (scénario).',
        packetValue: 'A'
      },
      {
        componentId: 'clavier',
        title: 'Étape 2 : Numérisation de la donnée',
        queSePasseTil: 'Le clavier transforme l’action mécanique en un signal numérique binaire.',
        pourquoi: 'L’ordinateur ne comprend pas la lettre "A" en tant que telle. Il a besoin d\'un signal électrique binaire : 01000001.',
        packetValue: 'A (Binaire: 01000001)'
      },
      {
        componentId: 'bus',
        title: 'Étape 3 : Transport par le Bus',
        queSePasseTil: 'Le Bus de données transporte ce signal vers les composants internes.',
        pourquoi: 'Le Bus est l\'autoroute électrique de la carte mère. Il permet de relier physiquement les composants entre eux.',
        packetValue: '01000001'
      },
      {
        componentId: 'ram',
        title: 'Étape 4 : Stockage temporaire en RAM',
        queSePasseTil: 'La RAM (mémoire vive) garde temporairement la donnée numérique.',
        pourquoi: 'Le processeur travaille extrêmement vite et pioche directement les données dans la RAM, qui est une mémoire de travail temporaire ultra-rapide.',
        packetValue: '01000001'
      },
      {
        componentId: 'cpu',
        title: 'Étape 5 : Décodage par le CPU',
        queSePasseTil: 'Le CPU traite la donnée et prépare son rendu graphique d’affichage.',
        pourquoi: 'Le processeur (le cerveau) lit l\'instruction stockée en RAM, comprend que c\'est la lettre "A" et prépare l\'ordre pour l\'écran.',
        packetValue: 'A'
      },
      {
        componentId: 'ram',
        title: 'Étape 6 : Transit retour par la RAM',
        queSePasseTil: 'La donnée traitée retourne vers la RAM puis est envoyée vers l’écran.',
        pourquoi: 'La carte graphique utilise la RAM de travail pour stocker les pixels calculés de l’image avant de les projeter.',
        packetValue: 'A'
      },
      {
        componentId: 'ecran',
        title: 'Étape 7 : Affichage sur l\'Écran',
        queSePasseTil: 'L’écran affiche le caractère "A" à l\'élève.',
        pourquoi: 'L’écran est le périphérique de sortie. Il convertit le signal numérique en pixels allumés visibles par l\'œil humain.',
        packetValue: 'A'
      }
    ],
    summaryPoints: [
      "Le clavier est un périphérique d'ENTRÉE qui convertit ta frappe physique en code binaire (0 et 1).",
      "Le bus de données sert d'autoroute de communication interne et indispensable entre tous les circuits.",
      "La RAM est une mémoire temporaire de travail ultra-rapide, mais elle s'efface complètement à l'arrêt du PC.",
      "Le CPU (Processeur) est le cerveau informatique : il coordonne et traite le signal pour donner un sens à la donnée.",
      "L'écran est un périphérique de SORTIE qui traduit les signaux électroniques internes en une image en couleur visible par l'homme."
    ]
  },
  {
    id: 'faire_calcul',
    title: 'Scénario 2 : Je fais un calcul (2 + 3)',
    description: 'Découvre comment le processeur exécute une addition et coordonne ses circuits internes pour afficher 5.',
    pathString: 'Clavier ➔ RAM ➔ CPU ➔ UAL ➔ RAM ➔ Écran',
    activationQuestion: {
      question: "Qui calcule réellement 2 + 3 dans l’ordinateur ?",
      options: [
        "L'écran de manière autonome.",
        "L'Unité d'Arithmétique et de Logique (UAL), qui est le moteur de calcul situé à l'intérieur du CPU.",
        "Le disque dur en grattant le disque métallique."
      ],
      correctIndex: 1,
      explanation: "Tout à fait ! C'est l'UAL (Unité d'Arithmétique et de Logique) située tout au centre du processeur qui s'occupe de résoudre les additions et les opérations logiques."
    },
    steps: [
      {
        componentId: 'clavier',
        title: 'Étape 1 : Saisie de l\'opération',
        queSePasseTil: 'L’utilisateur saisit l\'opération "2 + 3" sur son clavier de calcul.',
        pourquoi: 'Le clavier transmet les deux valeurs (2 et 3) et l\'instruction d\'addition (+) sous forme numérique.',
        packetValue: '2 + 3'
      },
      {
        componentId: 'ram',
        title: 'Étape 2 : Stockage en RAM',
        queSePasseTil: 'Les valeurs "2", "3" et l\'instruction "+" sont placées temporairement en RAM.',
        pourquoi: 'Toutes les instructions de calcul actives doivent d\'abord être mémorisées dans la RAM de travail pour être à portée de main du processeur.',
        packetValue: '2 + 3'
      },
      {
        componentId: 'cpu',
        title: 'Étape 3 : Lecture par le CPU',
        queSePasseTil: 'Le CPU lit les données nécessaires stockées dans la RAM.',
        pourquoi: 'Le processeur s\'apprête à traiter la donnée. Il commence donc par charger l\'instruction depuis la mémoire vive.',
        packetValue: '2 + 3'
      },
      {
        componentId: 'uc',
        title: 'Étape 4 : Décodage par l\'Unité de Contrôle (UC)',
        queSePasseTil: 'À l’intérieur du CPU, l’Unité de Contrôle (UC) organise et dirige le traitement.',
        pourquoi: 'L\'UC est le chef d\'orchestre : elle comprend qu\'il s\'agit d\'une addition et commande d\'envoyer les chiffres vers le circuit de calcul.',
        packetValue: '2 + 3'
      },
      {
        componentId: 'ual',
        title: 'Étape 5 : Calcul de l\'opération par l\'UAL',
        queSePasseTil: 'L’Unité d\'Arithmétique et de Logique (UAL) calcule mathématiquement : 2 + 3 = 5.',
        pourquoi: 'L\'UAL est la super calculatrice électrique intégrée au CPU. Elle assemble les impulsions électriques pour générer la valeur binaire de 5.',
        packetValue: '5'
      },
      {
        componentId: 'ram',
        title: 'Étape 6 : Enregistrement du résultat en RAM',
        queSePasseTil: 'Le CPU enregistre le résultat trouvé (5) à un emplacement temporaire de la RAM.',
        pourquoi: 'Le résultat calculé doit repasser par la mémoire de travail pour pouvoir ensuite être orienté vers les bons périphériques.',
        packetValue: '5'
      },
      {
        componentId: 'ecran',
        title: 'Étape 7 : Affichage de la réponse',
        queSePasseTil: 'L’écran reçoit l\'ordre d\'affichage et montre le chiffre "5" à l’élève.',
        pourquoi: 'Le périphérique de sortie finalise l\'action en rendant le résultat du traitement informatique visible sur l\'interface graphique.',
        packetValue: '5'
      }
    ],
    summaryPoints: [
      "La saisie de départ (2 + 3) voyage d’abord jusqu’à la RAM avant d’intéresser le processeur.",
      "L’Unité de Contrôle (UC) du CPU coordonne l’ordre de traitement : elle décode l’action (ici, une addition).",
      "L’Unité d’Arithmétique et de Logique (UAL) réalise physiquement l’opération arithmétique pour avoir 5.",
      "Le résultat repasse temporairement par la RAM pour être géré proprement par le système.",
      "L'écran affiche la valeur finale '5', complétant le cycle complet : Entrée ➔ Traitement ➔ Sortie."
    ]
  },
  {
    id: 'ouvrir_image',
    title: 'Scénario 3 : J\'ouvre une image',
    description: 'Comprends comment l\'image stockée sur ton disque dur permanent est copiée en mémoire vive (RAM) puis calculée par le co-processeur graphique (GPU / Carte Graphique) pour s\'afficher.',
    pathString: 'Stockage ➔ RAM ➔ CPU ➔ GPU ➔ Écran',
    activationQuestion: {
      question: "Quel composant est spécialement conçu pour calculer l'affichage des millions de pixels et les graphismes 2D/3D de l'ordinateur ?",
      options: [
        "L'unité d'alimentation pour donner du courant.",
        "Le Co-processeur Graphique (GPU) dédié au calcul d'affichage intensif.",
        "Le haut-parleur grâce à ses vibrations acoustiques."
      ],
      correctIndex: 1,
      explanation: "Excellent ! Le GPU (Graphics Processing Unit ou Carte Graphique) est spécialement optimisé pour traiter l'immense flux de pixels requis pour l'affichage moderne."
    },
    steps: [
      {
        componentId: 'stockage',
        title: 'Étape 1 : Requête du fichier image',
        queSePasseTil: 'L’utilisateur double-clique sur le fichier "image.jpg" enregistré.',
        pourquoi: 'L\'action de l\'utilisateur demande au système de localiser l\'image conservée au chaud sur le disque dur permanent.',
        packetValue: 'image.jpg'
      },
      {
        componentId: 'stockage',
        title: 'Étape 2 : Lecture depuis le Stockage Permanent',
        queSePasseTil: 'L’image comprimée est extraite et lue depuis le disque durable SSD.',
        pourquoi: 'Le stockage de masse retient les fichiers d\'un jour à l\'autre même sans électricité.',
        packetValue: 'image.jpg'
      },
      {
        componentId: 'ram',
        title: 'Étape 3 : Chargement temporaire en RAM',
        queSePasseTil: 'Le fichier de l\'image est recopié et chargé en mémoire RAM.',
        pourquoi: 'Pour pouvoir y accéder instantanément, le processeur travaille exclusivement sur des données copiées en mémoire vive.',
        packetValue: 'image.jpg'
      },
      {
        componentId: 'cpu',
        title: 'Étape 4 : Décodage par le CPU',
        queSePasseTil: 'Le CPU décode et décompresse les données compressées de l\'image JPG.',
        pourquoi: 'Un fichier JPEG est compressé pour prendre moins de place. Le processeur doit décoder sa structure.',
        packetValue: 'Pixels décodés'
      },
      {
        componentId: 'gpu',
        title: 'Étape 5 : Calcul de rendu par le GPU',
        queSePasseTil: 'Le co-processeur graphique (GPU / carte graphique) prend le relais pour traiter les pixels ronds.',
        pourquoi: 'La carte graphique dispose de milliers de cœurs pour calculer à toute vitesse la matrice de l’image.',
        packetValue: 'Rendu pixels'
      },
      {
        componentId: 'ecran',
        title: 'Étape 6 : Affichage de l\'image',
        queSePasseTil: 'L’écran allume ses LED et affiche enfin l’image JPEG décodée.',
        pourquoi: 'La dalle d\'affichage reçoit l’ordre d’affichage calculé par le GPU pour le rendre visible sous forme de lumière.',
        packetValue: '🖼️ image.jpg'
      }
    ],
    summaryPoints: [
      "Les fichiers documents, photos et logiciels sont stockés en sécurité sur le DISQUE DUR/SSD (Stockage permanent).",
      "Le processeur ne peut pas manipuler directement le disque dur de manière fluide car sa vitesse est trop lente.",
      "L’image 'image.jpg' est donc recopiée temporairement en RAM pour être mise à la disposition immédiate du CPU.",
      "Le CPU se charge de décompresser le format compressé (JPG) pour obtenir la matrice d'affichage de base.",
      "Le Co-processeur Graphique (GPU) calcule efficacement l'allure des couleurs et l'animation des trames pour décharger le processeur.",
      "L'écran affiche la photo finale, bouclant le voyage du stockage aux millions de pixels colorés visibles."
    ]
  },
  {
    id: 'ouvrir_fichier',
    title: 'Scénario 4 : J\'ouvre un fichier / dossier',
    description: 'Découvre comment l’action d’un double-clic sur un dossier ou fichier déclenche une recherche disque puis le charge en RAM de travail.',
    pathString: 'Souris ➔ UC ➔ SSD/HDD ➔ RAM ➔ CPU ➔ Écran',
    activationQuestion: {
      question: "Où est conservé un fichier texte de manière permanente quand l'ordinateur est complètement éteint ?",
      options: [
        "Dans la mémoire vive (RAM) volatile.",
        "Sur le disque de stockage permanent (SSD/HDD).",
        "Dans les impulsions statiques du clavier."
      ],
      correctIndex: 1,
      explanation: "Parfait ! Le stockage permanent (SSD/HDD) conserve vos fichiers de manière stable en l'absence complète d'alimentation électrique."
    },
    steps: [
      {
        componentId: 'souris',
        title: 'Étape 1 : Double-clic de l\'utilisateur',
        queSePasseTil: 'L’utilisateur double-clique sur l\'icône d\'un dossier ou fichier avec sa souris.',
        pourquoi: 'La souris est un périphérique d\'ENTRÉE qui capte le mouvement physique et le clic de votre doigt pour le convertir en coordonnées binaires.',
        packetValue: 'Clic Ouvrir'
      },
      {
        componentId: 'uc',
        title: 'Étape 2 : Chef d\'orchestre alerté',
        queSePasseTil: 'À l\'intérieur du CPU, l\'Unité de Contrôle (UC) intercepte le clic et suspend le travail courant.',
        pourquoi: 'L\'UC coordonne toute la carte mère : elle comprend le besoin de l\'utilisateur et réclame un accès au disque système.',
        packetValue: 'Interruption Ouvrir'
      },
      {
        componentId: 'stockage',
        title: 'Étape 3 : Requête au stockage permanent',
        queSePasseTil: 'Le contrôleur de stockage localise les secteurs physiques du dossier sur le SSD/HDD.',
        pourquoi: 'Le stockage permanent possède des structures de répertoires permettant d\'associer un nom de dossier à une adresse électrique durable.',
        packetValue: 'Recherche Index'
      },
      {
        componentId: 'ram',
        title: 'Étape 4 : Chargement en RAM',
        queSePasseTil: 'Les octets binaires utiles du dossier/fichier sont chargés en urgence dans la RAM.',
        pourquoi: 'Le disque dur est trop poussif pour répondre aux impulsions du processeur. On recopie donc l\'information dans la RAM vive.',
        packetValue: 'Données Fichier'
      },
      {
        componentId: 'cpu',
        title: 'Étape 5 : Mise en forme par le CPU',
        queSePasseTil: 'Le CPU traite le code binaire pour reconstituer l\'affichage de votre dossier.',
        pourquoi: 'Il faut calculer quelles icônes, textes et fenêtres doivent être dessinés en fonction de ce qui est stocké.',
        packetValue: 'Dossier formaté'
      },
      {
        componentId: 'ecran',
        title: 'Étape 6 : Affichage visuel',
        queSePasseTil: 'L’écran affiche le dossier ouvert contenant vos cahiers et travaux scolaires.',
        pourquoi: 'L\'écran restitue l\'information finale : l\'élève peut naviguer dans l\'espace de travail virtuel ainsi créé.',
        packetValue: '📂 Dossier ouvert'
      }
    ],
    summaryPoints: [
      "La souris transmet un double-clic d'ouverture en ordonnant une lecture spatiale.",
      "L'Unité de Contrôle du CPU capte le signal, stoppe en tâche de fond et amorce l'accès de stockage.",
      "Le SSD/HDD extrait l'ordre persistant des pistes mémoire même si éteint la veille.",
      "Le dossier se charge temporairement en RAM pour être lu à haute vitesse par les circuits d'évaluation.",
      "Le CPU interprète les codes de représentation de fichiers avant d'ordonner la mise à jour de l'affichage.",
      "L'affichage final montre le dossier prêt à être exploité par l'utilisateur."
    ]
  },
  {
    id: 'enregistrer_fichier',
    title: 'Scénario 5 : J\'enregistre un fichier (Ctrl+S)',
    description: 'Observe comment la commande de sauvegarde du clavier transfère tes modifications volatiles de la RAM vers le stockage figé.',
    pathString: 'Clavier ➔ RAM ➔ CPU ➔ SSD/HDD ➔ ROM ➔ Écran',
    activationQuestion: {
      question: "Que se passe-t-il si l'ordinateur s'éteint brutalement avant d'avoir sauvegardé (Ctrl+S) ?",
      options: [
        "Les modifications de la session sont effacées car stockées uniquement en RAM volatile.",
        "Le fichier est automatiquement gravé dans l'écran physique.",
        "Le clavier conserve par écrit toutes les touches enfoncées de la journée."
      ],
      correctIndex: 0,
      explanation: "Tout à fait ! La RAM s'efface instantanément sans courant électrique. Seul l'enregistrement sur SSD ou disque dur permanent garantit la sauvegarde physique."
    },
    steps: [
      {
        componentId: 'clavier',
        title: 'Étape 1 : Saisie de la commande Ctrl+S',
        queSePasseTil: 'L\'utilisateur appuie sur les touches Ctrl + S au clavier pour sauvegarder son document.',
        pourquoi: 'Le clavier est notre périphérique d\'entrée. Cette combinaison est le raccourci universel des commandes d\'écriture sur disque.',
        packetValue: 'Commande Ctrl+S'
      },
      {
        componentId: 'ram',
        title: 'Étape 2 : Tampon de données en RAM',
        queSePasseTil: 'La demande de modification et le contenu du fichier sont placés en transit dans la RAM vive.',
        pourquoi: 'La RAM gère la mémoire dynamique en cours : elle détient temporairement les derniers mots tapes par l\'élève.',
        packetValue: 'Fichier à écrire'
      },
      {
        componentId: 'uc',
        title: 'Étape 3 : Planification par l\'Unité de Contrôle',
        queSePasseTil: 'L\'Unité de Contrôle (UC) planifie l\'écriture physique et verrouille le fichier pour l\'OS.',
        pourquoi: 'L\'UC supervise les impulsions électriques pour s\'assurer qu\'aucune autre donnée ne vient corrompre l\'écriture en cours.',
        packetValue: 'Verrou d\'écriture'
      },
      {
        componentId: 'stockage',
        title: 'Étape 4 : Écriture sur le disque durable',
        queSePasseTil: 'Les blocs de données sont copiés physiquement sur les puces mémoires du SSD ou pistes du HDD.',
        pourquoi: 'Le stockage permanent est le seul à retenir de manière figée et sans électricité les données du document.',
        packetValue: 'Écriture NAND SSD'
      },
      {
        componentId: 'rom',
        title: 'Étape 5 : Validation de l\'index système',
        queSePasseTil: 'Le CPU interroge les blocs système de la ROM/BIOS pour mettre à jour les pointeurs de boot si nécessaire.',
        pourquoi: 'Pour confirmer l\'intégrité de la hiérarchie disque, le système met à jour la table d\'allocation.',
        packetValue: 'Table système validée'
      },
      {
        componentId: 'ecran',
        title: 'Étape 6 : Acquittement visuel',
        queSePasseTil: 'Le moniteur met fin à l\'étoile de modification : le fichier est entièrement sécurisé.',
        pourquoi: 'Le périphérique de sortie de l\'ordinateur rassure l\'utilisateur en montrant l\'icône de sauvegarde validée.',
        packetValue: '💾 Sauvegarde OK'
      }
    ],
    summaryPoints: [
      "Le clavier envoie le raccourci binaire Ctrl+S pour solliciter le traitement d'écriture immédiat.",
      "Le document est temporairement retenu au sein de la RAM vive volatile sous forme d'image informatique.",
      "L'Unité de Contrôle ordonne de transvaser cette image volatile vers le contrôleur de disque.",
      "Les pistes magnétiques ou transistors flash du disque SSD conservent enfin l'exactitude de façon durable.",
      "La table d'indexation système est recalibrée pour enregistrer le nouveau poids du fichier.",
      "L'écran met à jour la barre de menu pour notifier que l'état courant est sécurisé."
    ]
  },
  {
    id: 'cycle_cpu',
    title: 'Scénario 6 : Cycle CPU (F-D-E)',
    description: 'Observe au ralenti le cycle magique du processeur : Recherche de l\'instruction (Fetch), Décodage de l\'ordre (Decode), et Exécution logique (Execute).',
    pathString: 'RAM ➔ UC ➔ Registres ➔ UAL ➔ Registres ➔ RAM',
    activationQuestion: {
      question: "Dans le processeur de Von Neumann, que décrit exactement le cycle Fetch-Decode-Execute ?",
      options: [
        "Un programme permettant de nettoyer le ventilateur du processeur.",
        "Le fonctionnement interne fondamental du CPU pour lire, comprendre et faire chaque commande.",
        "La procédure d'extinction automatique si la puce commence à chauffer."
      ],
      correctIndex: 1,
      explanation: "Brillant ! Fetch (Rechercher l'instruction), Decode (Traduire l'ordre) et Execute (Lancers l'exécution) est la séquence répétée continuellement."
    },
    steps: [
      {
        componentId: 'ram',
        title: 'Étape 1 : Recherche de l\'instruction (Fetch)',
        queSePasseTil: 'Le processeur récupère (Fetch) l\'instruction suivante stockée à l\'adresse mémoire de la RAM.',
        pourquoi: 'Le code machine de l\'application réside dans la mémoire vive. Le compteur de programme (PC) indique sa position exacte.',
        packetValue: 'Opcode binaire'
      },
      {
        componentId: 'uc',
        title: 'Étape 2 : Réception dans l\'UC',
        queSePasseTil: 'L\'instruction voyage par le bus de données et se loge dans l\'Unité de Contrôle du processeur.',
        pourquoi: 'L\'UC possède un registre spécial d\'instruction temporaire pour maintenir l\'ordre binaire durant son traitement.',
        packetValue: 'Registre d\'Instruction'
      },
      {
        componentId: 'uc',
        title: 'Étape 3 : Décodage de l\'ordre (Decode)',
        queSePasseTil: 'Le CPU décode les bits de poids fort pour déduire s\'il s\'agit d\'une addition, d\'un saut ou d\'une écriture.',
        pourquoi: 'Le CPU est câblé logiquement : selon les fils conducteurs allumés par l\'instruction, différents circuits du CPU s\'activent.',
        packetValue: 'Décoder [ADD]'
      },
      {
        componentId: 'registres',
        title: 'Étape 4 : Chargement des Registres',
        queSePasseTil: 'L\'instruction requiert des opérandes. Le CPU charge les données depuis ses Registres ultra-rapides.',
        pourquoi: 'Les registres CPU sont disposés à quelques micromètres du CPU. Ils fournissent les opérandes en quelques fractions de nanoseconde.',
        packetValue: 'Données (Chiffres)'
      },
      {
        componentId: 'ual',
        title: 'Étape 5 : Exécution arithmétique (Execute)',
        queSePasseTil: 'L\'Unité d\'Arithmétique et de Logique (UAL) réalise la somme et élève les cellules électriques.',
        pourquoi: 'L\'exécution matérielle se concrétise ici. Les portes logiques ET/OU de l\'UAL génèrent le bit de retenue et le total.',
        packetValue: '2 + 3 = 5'
      },
      {
        componentId: 'registres',
        title: 'Étape 6 : Stockage du résultat stable',
        queSePasseTil: 'Le résultat de l\'exécution est enregistré dans le registre accumulateur de données.',
        pourquoi: 'Une fois stable, le résultat est momentanément parqué en registre avant d\'être envoyé vers la RAM ou l\'écran.',
        packetValue: 'Résultat : 5'
      }
    ],
    summaryPoints: [
      "Le CPU commence par prélever l'opcode binaire en RAM géré par le Program Counter (Fetch).",
      "Le code binaire est stocké dans l'Unité de Contrôle du processeur.",
      "Le bloc de contrôle le décrypte pour rediriger le courant vers l'UAL ou les registres (Decode).",
      "L'unité de mémoire interne (Registres) transfère instantanément les variables requises (Opérandes).",
      "Le circuit matériel de l'UAL résout physiquement le total par manipulation de transistors (Execute).",
      "Le registre de retour temporise le résultat, prêt pour l'algorithme suivant ou affichage durable."
    ]
  },
  {
    id: 'demarrage_pc',
    title: 'Scénario 7 : Démarrage du PC',
    description: 'Découvre comment la pression du bouton d\'alimentation réveille le PC en activant la PSU, la ROM (BIOS/UEFI), charge l\'OS en RAM, l\'exécute sur le CPU, puis allume l\'écran.',
    pathString: 'Bouton d\'alim ➔ Alimentation ➔ ROM ➔ RAM ➔ CPU ➔ OS ➔ Écran',
    activationQuestion: {
      question: "Quel composant matériel de l'ordinateur stocke le programme initial de démarrage (le BIOS) de manière permanente sans électricité ?",
      options: [
        "La mémoire vive (RAM) volatile.",
        "La puce ROM (Read-Only Memory) non-volatile.",
        "Les boutons d'alimentation mécanique sur le boîtier."
      ],
      correctIndex: 1,
      explanation: "Excellent ! La RAM s'efface complètement en l'absence de courant. Seule la ROM non-volatile stocke de manière permanente le micro-logiciel BIOS/UEFI requis par le CPU pour démarrer la machine."
    },
    steps: [
      {
        componentId: 'psu',
        title: 'Étape 1 : Bouton d\'alimentation',
        queSePasseTil: 'L\'utilisateur appuie physiquement sur le bouton d\'alimentation du boîtier du PC.',
        pourquoi: 'La pression mécanique ferme le circuit d\'allumage basse tension de la carte mère, envoyant le signal d\'éveil à l\'alimentation.',
        packetValue: 'Impulsion d\'allumage'
      },
      {
        componentId: 'psu',
        title: 'Étape 2 : Bloc d\'alimentation (PSU)',
        queSePasseTil: 'Le bloc d\'alimentation (PSU) s\'allume et commence à délivrer des tensions régulées aux composants.',
        pourquoi: 'Les circuits de silicium requièrent des tensions électriques continues très stables (+12V, +5V, +3.3V) pour s\'éveiller sans griller.',
        packetValue: 'Tensions stables (12V) ⚡'
      },
      {
        componentId: 'rom',
        title: 'Étape 3 : Puce ROM (BIOS / UEFI)',
        queSePasseTil: 'Le CPU s\'éveille et commence à lire le programme de boot immuable (BIOS) stocké dans la ROM.',
        pourquoi: 'La RAM étant entièrement vide au démarrage, le processeur doit se tourner vers la ROM non-volatile pour savoir comment initialiser la carte mère et exécuter l\'autotest (POST).',
        packetValue: 'Instructions BIOS 🔒'
      },
      {
        componentId: 'ram',
        title: 'Étape 4 : Chargement de l\'OS en RAM',
        queSePasseTil: 'Le chargeur d\'amorçage lit les fichiers du noyau du système d\'exploitation sur le disque SSD et les copie en RAM.',
        pourquoi: 'Le disque SSD est trop lent pour répondre aux pulsations à l\'échelle du nanoseconde du CPU. Les fichiers système doivent être copiés dans la RAM ultra-véloce.',
        packetValue: 'Données Noyau OS 💾'
      },
      {
        componentId: 'cpu',
        title: 'Étape 5 : Exécution par le CPU',
        queSePasseTil: 'Le CPU commence à exécuter les instructions machine de l\'OS récemment transférées en RAM.',
        pourquoi: 'Le processeur est le cerveau logique de traitement; il prend en charge l\'enregistrement des variables et dirige l\'activation des threads système.',
        packetValue: 'Calculs CPU 🧠'
      },
      {
        componentId: 'uc',
        title: 'Étape 6 : Système d\'exploitation (OS) actif',
        queSePasseTil: 'Le système d\'exploitation configure l\'environnement utilisateur, initialise l\'interface graphique et charge les pilotes.',
        pourquoi: 'L\'OS fait office de traducteur universel pour simplifier le dialogue entre le matériel et les logiciels applicatifs.',
        packetValue: 'Services OS Prêts 📊'
      },
      {
        componentId: 'ecran',
        title: 'Étape 7 : Affichage de l\'Écran',
        queSePasseTil: 'La mémoire vidéo envoie la carte de pixels de l\'accueil au moniteur.',
        pourquoi: 'L\'écran d\'affichage, périphérique de sortie, convertit ce flux de bits en pixels de lumière RVB agréables, validant la réussite définitive du démarrage.',
        packetValue: '🖥️ Bureau Prêt !'
      }
    ],
    summaryPoints: [
      "Le bouton d'alimentation ferme un circuit mécanique pour réveiller la source d'énergie.",
      "Le bloc PSU régule le courant en tensions saines et durables (+12V, +5V, +3.3V).",
      "La puce ROM préserve de manière immuable le BIOS car la RAM se réveille complètement vide de données.",
      "La RAM accueille temporairement les fichiers fondamentaux de l'OS pour permettre une exécution fluide à haute vitesse.",
      "Le CPU (Processeur) s'empare du noyau système et exécute les calculs de démarrage.",
      "L'OS d'arrière-plan charge l'interface humaine, les pilotes matériels et configure la session de l'utilisateur.",
      "L'écran de sortie dessine les pixels colorés visibles, marquant avec succès l'achèvement du boot informatique."
    ]
  }
];
