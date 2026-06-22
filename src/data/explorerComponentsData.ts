import React from 'react';
import { 
  Keyboard, 
  HelpCircle, 
  Cpu, 
  Database, 
  Settings, 
  Calculator, 
  HardDrive, 
  Monitor, 
  ArrowLeft,
  ArrowRightLeft,
  BookOpen,
  Info,
  Sparkles,
  Eye,
  ChevronRight,
  ChevronDown,
  Layers,
  Sliders,
  Compass,
  Zap,
  Network,
  Wifi,
  MousePointer,
  Copy,
  Mic,
  Video,
  Printer,
  Volume2,
  Smartphone,
  FolderOpen,
  Server
} from 'lucide-react';

export interface DetailInfo {
  definition: string;
  fonction: string;
  exemple: string;
  schema?: string;
}

export interface SubElement {
  name: string;
  role: string;
  more: string;
}

export interface UnderComponent {
  id: string;
  name: string;
  role: string;
  icon: React.ComponentType<{ className?: string }>;
  details?: DetailInfo;
  subElements?: SubElement[];
}

export interface MainComponent {
  id: string;
  name: string;
  roleBadge: string;
  functionalClassification: string;
  physicalClassification: string;
  shortDescription: string;
  icon: React.ComponentType<{ className?: string }>;
  colorTheme: {
    border: string;
    bg: string;
    text: string;
    badge: string;
    lightBg: string;
  };
  details: DetailInfo;
  underComponents?: UnderComponent[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  colorClass: string;
  components: MainComponent[];
}

// Global Single Instance Components definitions to enable clean routing
export const componentCPU: MainComponent = {
  id: 'h_cpu',
  name: 'Processeur (CPU)',
  roleBadge: 'Cerveau Calculateur Principal',
  functionalClassification: 'Traitement',
  physicalClassification: 'Unité Centrale (Interne)',
  shortDescription: "Exécute les instructions séquentielles des programmes et coordonne tous les composants physiques.",
  icon: Cpu,
  colorTheme: {
    border: 'border-rose-200 hover:border-rose-400',
    bg: 'bg-rose-50/50',
    text: 'text-rose-900',
    badge: 'bg-rose-100 text-rose-800',
    lightBg: 'bg-rose-50/20'
  },
  details: {
    definition: "Le microprocesseur (CPU - Central Processing Unit) est le véritable **cerveau de l'ordinateur**. C'est lui qui orchestre, pilote et calcule tout ce qui se passe. Physiquement, c'est une petite puce carrée en silicium contenant des milliards de minuscules interrupteurs électriques appelés transistors.",
    fonction: "Il lit les instructions binaires des programmes l'une après l'autre. Scientifiquement, il applique en boucle un cycle d'exécution en trois étapes clés : 1. Récupérer l'instruction en mémoire vive (Fetch), 2. La déchiffrer en signaux électriques (Decode), et 3. L'exécuter physiquement (Execute) en calculant.",
    exemple: "Quand vous déplacez la souris, tapez au clavier, ou lancez un jeu, le processeur exécute instantanément des milliards de calculs binaires par seconde pour répondre.",
    schema: `
+---------------------------------------+
|              PROCESSEUR               |
|  +-----------------+ +-------------+  |
|  |    Unité de     | |  Unité      |  |
|  |    Contrôle     | |  Arithm. &  |  |
|  |     (UC)        | |  Logique    |  |
|  +--------+--------+ +------+------+  |
|           |                 |         |
|  +--------v-----------------v------+  |
|  |           REGISTRES             |  |
|  +---------------------------------+  |
+---------------------------------------+`
  },
  underComponents: [
    {
      id: 'h_uc',
      name: 'Unité de Contrôle (UC)',
      role: "Récupère, décode et dirige l'exécution de chaque consigne.",
      icon: Settings,
      details: {
        definition: "C'est le **chef d'orchestre** à l'intérieur du processeur. Elle dirige tout le flux opérationnel.",
        fonction: "Elle va chercher (Fetch) l'instruction enregistrée dans la mémoire vive (RAM), déchiffre (Decode) son sens électrique binaire et transmet l'ordre précis au bon composant pour qu'il s'active au bon moment.",
        exemple: "Si l'instruction reçue dit 'Afficher la lettre A', elle l'analyse et ordonne à l'écran de s'allumer.",
        schema: `
  [ Instruction RAM ]
          |
          v
  +--------------------------------+
  |    UNITÉ DE CONTRÔLE (UC)      |
  |  - Décodeur d'Instruction      |
  |  - Séquenceur d'Horloge        |
  +--------------------------------+
     |                  |
     v                  v
[Ordres Calcul]   [Aiguillage Bus]`
      }
    },
    {
      id: 'h_ual',
      name: "Unité Arithmétique et Logique (UAL)",
      role: "Exécute tous les calculs mathématiques et comparaisons logiques.",
      icon: Calculator,
      details: {
        definition: "C'est la **calculatrice ultra-rapide** intégrée au cœur du processeur. Elle s'occupe de faire tous les calculs mathématiques et logiques.",
        fonction: "Elle effectue deux types d'opérations : d'abord des calculs de base (comme les additions, les soustractions, les multiplications), puis des choix logiques de comparaison (dire si une valeur est supérieure à une autre, ou tester des conditions Vrai/Faux avec l'algèbre de Boole).",
        exemple: "Faire la somme binaire de 2+3 ou vérifier si un mot de passe entré est identique au bon mot de passe (comparaison logique).",
        schema: `
      [Donnée A]        [Donnée B]
          \\                 /
           v               v
      +---------------------------+
      |   UNITÉ DE CALCUL (UAL)   |
      |  Opérations binaires (+,-) |
      +---------------------------+
                     |
                     v
                [ Résultat ]`
      }
    },
    {
      id: 'h_registres',
      name: 'Registres',
      role: 'Stockent de minuscules données nécessaires à la micro-seconde.',
      icon: Database,
      details: {
        definition: "Ce sont des **petites cases à post-it** de mémoire ultra-rapides, posées directement à côté des cœurs de calcul du processeur pour noter des choses à la volée.",
        fonction: "En termes d'architecture, ce sont des cellules mémoires temporaires très petites mais fonctionnant à la vitesse de l'horloge interne du processeur. Ils retiennent immédiatement les résultats des calculs en cours et les consignes pour éviter de perdre du temps à interroger la mémoire vive RAM lointaine.",
        exemple: "Garder en mémoire la retenue d'une addition de mathématiques pendant qu'on calcule le chiffre suivant.",
      },
      subElements: [
        {
          name: 'Accumulateur',
          role: "Sert de fiole de stockage direct pour le résultat calculé par l'UAL.",
          more: "Toute valeur sortante d'une addition électrique élémentaire transite en priorité par lui."
        },
        {
          name: 'Compteur Ordinal (PC - Program Counter)',
          role: "Indique l'adresse mémoire de la prochaine instruction à exécuter.",
          more: "Il s'incrément de manière continue pour garantir que le programme avance ligne après ligne."
        },
        {
          name: "Registre d'Instruction (IR)",
          role: "Conserve l'ordre machine en cours d'analyse par l'unité de contrôle.",
          more: "La consigne y reste stockée pendant que le décodeur interne l'analyse."
        }
      ]
    }
  ]
};

export const componentMotherboard: MainComponent = {
  id: 'h_motherboard',
  name: 'Carte Mère',
  roleBadge: 'Squelette Électrique Global',
  functionalClassification: 'Squelette / Interconnexion',
  physicalClassification: 'Unité Centrale (Interne)',
  shortDescription: "La plaque principale de circuit imprimé qui connecte physiquement tous les composants majeurs du PC.",
  icon: Layers,
  colorTheme: {
    border: 'border-emerald-250 hover:border-emerald-400',
    bg: 'bg-emerald-50/50',
    text: 'text-emerald-950',
    badge: 'bg-emerald-100 text-emerald-800',
    lightBg: 'bg-emerald-50/30'
  },
  details: {
    definition: "C'est le **squelette d'interconnexion** de votre ordinateur. C'est la grande plaque en plastique rigide contenant des circuits imprimés où tous les composants physiques sont rattachés et branchés.",
    fonction: "Elle fait transiter l'électricité d'alimentation vers tous les organes et possède des chemins de cuivre microscopiques (les pistes et les bus de connexion) pour que les messages binaires voyagent l'un vers l'autre en un éclair.",
    exemple: "Elle relie physiquement et électriquement le processeur, les barrettes de RAM, la carte graphique, le disque dur et les ports USB.",
    schema: `
+----------------------------------------+
| CARTE MÈRE                             |
|  +-------------+      +-------------+  |
|  | Socket CPU  |<====>|  Chipset    |  |
|  +-------------+      +------+------+  |
|           ^                  |         |
|           |                  v         |
|     (Barrettes RAM)     (Ports SATA)   |
+----------------------------------------+`
  },
  underComponents: [
    {
      id: 'h_socket',
      name: 'Socket CPU',
      role: "Support de réception robuste et d'accueil physique pour le processeur.",
      icon: Cpu,
      details: {
        definition: "C'est la **poche de réception du processeur**. C'est le nid ou le socle d'accueil carré situé tout au milieu de la carte mère.",
        fonction: "Il sert à clipser fermement la puce du processeur sur la grande carte sans devoir faire de soudure fragile, tout en connectant parfaitement des milliers de petits points de contact électriques.",
        exemple: "C'est l'emplacement où l'on dépose délicatement le processeur carrée avant de fermer le petit levier métallique de sûreté."
      }
    },
    {
      id: 'h_chipset',
      name: 'Chipset',
      role: "Contrôleur et régulateur de trafic entre les composants lents et rapides.",
      icon: ArrowRightLeft,
      details: {
        definition: "C'est l'**aiguilleur ou le régulateur** du trafic d'informations. C'est une petite puce intelligente soudée sur la carte mère.",
        fonction: "Elle gère la vitesse des échanges en faisant le traducteur entre le processeur (qui travaille à la vitesse de l'éclair) et les autres parties de l'ordinateur un peu plus lentes (prises USB, souris, stockage).",
        exemple: "Veiller à ce qu'un gros fichier texte copié depuis une clé USB soit enregistré sur le disque dur sans provoquer d'erreur ou d'embouteillage de données."
      }
    },
    {
      id: 'h_clock',
      name: 'Horloge Système',
      role: "Générateur de rythme de synchronisation des horloges internes.",
      icon: Sliders,
      details: {
        definition: "C'est le **métronome ou le batteur de rythme** de toute la machine. C'est un minuscule cristal de quartz qui vibre très régulièrement grâce à l'électricité.",
        fonction: "Elle envoie de petites impulsions électriques régulières pour que toutes les puces de l'ordinateur fassent leurs calculs exactement au même instant, sans se décaler ou s'emmêler.",
        exemple: "Un processeur dit 'cadencé à 3 GHz' reçoit de l'horloge 3 milliards d'impulsions (de battements) par seconde pour accomplir ses tâches."
      }
    }
  ]
};

export const componentGPU: MainComponent = {
  id: 'h_gpu',
  name: 'Carte Graphique (GPU)',
  roleBadge: 'Calculateur Visuel Dédié',
  functionalClassification: 'Traitement',
  physicalClassification: 'Unité Centrale (Interne)',
  shortDescription: "Traite les données graphiques et affiche les images, vidéos et animations à l'écran.",
  icon: Monitor,
  colorTheme: {
    border: 'border-fuchsia-200 hover:border-fuchsia-400',
    bg: 'bg-fuchsia-50/50',
    text: 'text-fuchsia-900',
    badge: 'bg-fuchsia-100 text-fuchsia-800',
    lightBg: 'bg-fuchsia-50/30'
  },
  details: {
    definition: "C'est le **dessinateur spécialisé** de l'ordinateur. C'est une carte d'extension (ou une puce intégrée) dédiée à la création rapide et fluide des images sur votre écran.",
    fonction: "Elle reçoit du cerveau (le CPU) des données géométriques, vectorielles ou des codes de couleur bruts, les calcule en parallèle à toute vitesse, et produit le rendu visuel final (pixels) à projeter à l'écran.",
    exemple: "Afficher de manière fluide les exercices animés en classe, faire tourner des simulations en haute résolution, ou restituer les jeux vidéo.",
  },
  underComponents: [
    {
      id: 'h_gpu_core',
      name: 'GPU (processeur graphique)',
      role: "Cœur de calcul dédié au traitement d'images et d'algorithmes parallèles.",
      icon: Cpu,
      details: {
        definition: "Le **cerveau spécialisé dans l'affichage**. C'est la grosse puce électronique de calcul central de la carte graphique.",
        fonction: "Contrairement au CPU qui fait des tâches très variées une par une de manière séquentielle, le GPU sait faire des millions de calculs de couleurs de pixels en même temps (calcul parallèle) pour dessiner l'image.",
        exemple: "Calculer instantanément la luminosité exacte, l'ombre et la couleur de chaque petit point de l'image projetée."
      }
    },
    {
      id: 'h_gpu_vram',
      name: 'Mémoire vidéo (VRAM)',
      role: "Stocke temporairement les textures, les modèles 3D et les images pour un accès ultra-rapide.",
      icon: Database,
      details: {
        definition: "La **table à dessin personnelle** du processeur graphique. C'est une mémoire de stockage temporaire ultra-rapide placée juste à côté de l'unité de calcul GPU.",
        fonction: "Elle stocke les décors 3D, les images de l'exercice en cours, et les textures graphiques lourdes afin que le GPU y accède immédiatement sans ralentir la mémoire système principale.",
        exemple: "Conserver la structure graphique de l'application de simulation en haute définition."
      }
    },
    {
      id: 'h_gpu_cooler',
      name: 'Système de refroidissement',
      role: "Évacue la forte chaleur générée par les puces de silicium en fonctionnement.",
      icon: Sliders,
      details: {
        definition: "La **climatisation ou le radiateur** de la carte graphique pour l'empêcher de surchauffer et de s'arrêter sous l'effort.",
        fonction: "Faire circuler la chaleur produite par les puces en activité vers des tuyaux en cuivre et de petites grilles en métal, puis l'évacuer dehors à l'aide d'un ou plusieurs ventilateurs actifs.",
        exemple: "Entendre le petit bourdonnement du ventilateur qui tourne un peu plus vite quand la simulation affiche de grands modèles 3D animés."
      }
    },
    {
      id: 'h_gpu_outputs',
      name: 'Sorties vidéo (HDMI, DisplayPort, VGA...)',
      role: "Prises physiques d'envoi du signal d'affichage finalisé vers le moniteur ou le vidéoprojecteur.",
      icon: Monitor,
      details: {
        definition: "Les **prises ou branchements d'affichage** situés à l'arrière ou sur les tranches de l'ordinateur.",
        fonction: "Elles transmettent le signal visuel calculé à l'intérieur de l'ordinateur sous forme de signaux électriques ou optiques normalisés vers un appareil d'affichage externe.",
        exemple: "Relier l'ordinateur de l'apprenant au vidéoprojecteur de la classe via un câble de raccordement HDMI."
      }
    }
  ]
};

export const componentCache: MainComponent = {
  id: 'h_cache',
  name: 'Mémoire Cache (L1, L2, L3)',
  roleBadge: 'Mémoire de Raccourci Ultra-Rapide',
  functionalClassification: 'Mémoires',
  physicalClassification: 'Unité Centrale (Interne)',
  shortDescription: "Placée directement pour tamponner et accélérer les demandes récurrentes du CPU.",
  icon: Database,
  colorTheme: {
    border: 'border-blue-200 hover:border-blue-400',
    bg: 'bg-blue-50/50',
    text: 'text-blue-900',
    badge: 'bg-blue-100 text-blue-800',
    lightBg: 'bg-blue-50/10'
  },
  details: {
    definition: "C'est une **mémoire ultra-proche** et ultra-rapide, intégrée directement sur la puce du processeur pour stocker les informations dont il se sert à chaque instant.",
    fonction: "Elle sert de raccourci : elle garde à l'avance une copie des informations de la RAM lointaine les plus fréquemment lues par le processeur, pour lui éviter de perdre du temps à les attendre.",
    exemple: "Garder en attente immédiate la prochaine ligne d'un tableau de calcul pour que le processeur la lise en un éclair.",
    schema: `
 [ CPU CORES ] ===> [ Cache L1 ] ===> [ Cache L2 ] ===> [ Cache L3 ] ===> [ RAM ]
  (Ultra-rapide)                                                            (Modérée)`
  },
  underComponents: [
    {
      id: 'h_cache_l1',
      name: 'Cache L1',
      role: 'Le cache primaire intégré dans chaque cœur du CPU (rapide mais très petit).',
      icon: Database,
      details: {
        definition: "C'est l'**étagère personnelle immédiate** du cœur de calcul. C'est la mémoire la plus rapide de l'ordinateur, mais sa taille est minuscule (quelques kilo-octets seulement).",
        fonction: "Elle stocke les toutes petites instructions de calcul binaire que le processeur est en train de résoudre à la micro-seconde prés.",
        exemple: "Garder l'instruction de l'addition mathématique en cours."
      }
    },
    {
      id: 'h_cache_l2',
      name: 'Cache L2',
      role: 'Cache intermédiaire de taille moyenne propre à chaque cœur.',
      icon: Database,
      details: {
        definition: "Le **tiroir intermédiaire** à côté du bureau. Un peu plus grand que L1 mais un poil moins rapide.",
        fonction: "Elle stocke les prochaines lignes de données pour alimenter très rapidement le cache L1 afin de ne pas bloquer le processeur de calcul.",
        exemple: "Garder en attente le paragraphe de texte suivant dans un document scolaire ouvert."
      }
    },
    {
      id: 'h_cache_l3',
      name: 'Cache L3',
      role: 'Un large cache global partagé entre tous les cœurs de la puce processeur.',
      icon: Database,
      details: {
        definition: "L'**armoire partagée**. C'est le plus grand niveau de mémoire cache, utilisable par tous les cœurs du processeur ou de la puce.",
        fonction: "Elle évite de devoir demander des informations à la mémoire vive RAM principale (située en dehors du CPU), qui est beaucoup plus lente à répondre à cause de la distance physique.",
        exemple: "Conserver le canevas ou la structure visuelle globale d'un navigateur internet ouvert."
      }
    }
  ]
};

export const componentRAM: MainComponent = {
  id: 'h_ram',
  name: 'RAM (Mémoire Vive)',
  roleBadge: 'Espace de Travail Volatile',
  functionalClassification: 'Mémoires',
  physicalClassification: 'Unité Centrale (Interne)',
  shortDescription: "Garde temporairement les instructions et données des programmes actifs en mémoire.",
  icon: Layers,
  colorTheme: {
    border: 'border-cyan-200 hover:border-cyan-400',
    bg: 'bg-cyan-50/50',
    text: 'text-cyan-900',
    badge: 'bg-cyan-100 text-cyan-800',
    lightBg: 'bg-cyan-50/30'
  },
  details: {
    definition: "C'est la **grande table de travail active** de votre ordinateur. Elle contient vos applications ouvertes (comme votre navigateur, un jeu ou un document de cours). En terme scientifique, la RAM (Random Access Memory) est une mémoire de silicium ultra-rapide.",
    fonction: "Elle permet au processeur de lire et écrire des informations à grande vitesse. C'est une mémoire volatile : elle nécessite impérativement de l'électricité pour retenir les données. Dès qu'on éteint l'ordinateur, cette table est vidée !",
    exemple: "Votre document de cours rédigé reste en RAM tant que vous ne l'avez pas sauvegardé. Si l'ordinateur s'éteint brusquement, vos modifications non enregistrées sont perdues.",
    schema: `
+---------------------------------------+
| RAM (Volatile)                        |
|                                       |
| [ App Active 1 ]  [ App Active 2 ]   |
| (Ex: Navigateur)  (Ex: Jeu en cours)  |
|                                       |
| <==== S'EFFACE SANS COURANT (0V) ===> |
+---------------------------------------+`
  },
  underComponents: [
    {
      id: 'h_ram_chip',
      name: 'Puces de mémoire (DRAM)',
      role: "Composants de silicium sauvegardant l'état électrique (1 ou 0).",
      icon: Database,
      details: {
        definition: "Les **cellules de stockage électronique**. Les puces noires rectangulaires soudées directement sur la barrette de RAM.",
        fonction: "Chaque puce renferme des millions de petits condensateurs qui accumulent (1) ou relâchent (0) une charge électrique à chaque cycle.",
        exemple: "Régénérer continuellement la charge pour ne pas perdre la lettre écrite."
      }
    },
    {
      id: 'h_ram_bus',
      name: 'Interface du bus mémoire',
      role: 'Raccord direct de communication vers le contrôleur mémoire du CPU.',
      icon: ArrowRightLeft,
      details: {
        definition: "Les **connecteurs de contact dorés**. Les petites broches alignées au bas du module.",
        fonction: "Permet les transferts ultra-rapides de données binaires entre les puces de silicium de la RAM et le socket CPU de la carte mère.",
        exemple: "Insérer le module RAM fermement dans l'encoche de fixation."
      }
    }
  ]
};

export const componentROM: MainComponent = {
  id: 'h_rom',
  name: 'ROM / EEPROM',
  roleBadge: 'Mémoire de Démarrage Stable',
  functionalClassification: 'Mémoires',
  physicalClassification: 'Unité Centrale (Interne)',
  shortDescription: "Stocke en permanence le court programme d'allumage (BIOS/UEFI) créé par le constructeur.",
  icon: BookOpen,
  colorTheme: {
    border: 'border-blue-200 hover:border-blue-400',
    bg: 'bg-blue-50/50',
    text: 'text-blue-900',
    badge: 'bg-blue-100 text-blue-800',
    lightBg: 'bg-blue-50/30'
  },
  details: {
    definition: "C'est la **mémoire morte (Read-Only Memory)**. C'est le manuel de départ ou le microprogram de base créé par la constructeur de l'ordinateur qui ne s'efface jamais.",
    fonction: "Au moment exact où vous pressez le bouton Power, cette puce lance le premier petit programme (BIOS ou UEFI). Elle inspecte le matériel (mémoire, processeur, affichage) et trouve sur quel disque est enregistré le système d'exploitation pour démarrer le PC.",
    exemple: "L'allumage de l'écran avec le logo d'accueil du constructeur à la première seconde d'utilisation."
  },
  underComponents: [
    {
      id: 'h_bios_chip',
      name: 'Puce EEPROM / BIOS',
      role: 'Contient le programme système stocké de manière ineffaçable.',
      icon: Settings,
      details: {
        definition: "Puce électronique non-volatile soudée sur la carte mère.",
        fonction: "Conserve l'intégralité du code d'allumage, même sans aucune pile ou prise électrique.",
        exemple: "Lancer le chargement de votre OS (Windows, Linux, MacOS...)."
      }
    }
  ]
};

export const componentSSD: MainComponent = {
  id: 'h_ssd',
  name: 'SSD (Solid State Drive)',
  roleBadge: 'Stockage Permanent Flash',
  functionalClassification: 'Mémoires',
  physicalClassification: 'Unité Centrale (Interne)',
  shortDescription: "Support de stockage silencieux et ultra-rapide basé sur des puces de mémoire flash.",
  icon: HardDrive,
  colorTheme: {
    border: 'border-sky-200 hover:border-sky-400',
    bg: 'bg-sky-50/50',
    text: 'text-sky-900',
    badge: 'bg-sky-100 text-sky-800',
    lightBg: 'bg-sky-50/30'
  },
  details: {
    definition: "C'est la **mémoire solide de stockage**. C'est le placard moderne de l'ordinateur qui garde vos fichiers, logiciels et systèmes informatiques de manière sécurisée et permanente.",
    fonction: "Il utilise une technologie similaire aux clés USB (mémoire flash NAND) sans aucune pièce mécanique mobile. Il peut lire et écrire d'énormes fichiers avec une rapidité extraordinaire.",
    exemple: "Démarrer l'ordinateur de l'école et ouvrir les logiciels d'apprentissage en moins de 10 secondes flat."
  },
  underComponents: [
    {
      id: 'h_ssd_flash',
      name: 'Mémoire NAND Flash',
      role: 'Cellules de transistors retenant les puces mémoires de données.',
      icon: Database,
      details: {
        definition: "Les puces d'enregistrement solid-state.",
        fonction: "Piègent de microscopiques charges de courant dans des barrières physiques étanches pour stocker de façon permanente des Go de données.",
        exemple: "Retrouver tous ses fichiers de cours intacts un an après."
      }
    },
    {
      id: 'h_ssd_controller',
      name: 'Contrôleur SSD',
      role: 'Le cerveau autonome chargé du dispatching des données.',
      icon: Settings,
      details: {
        definition: "Microprocesseur miniature logé à l'intérieur de l'unité SSD.",
        fonction: "Organise les lectures/écritures, vérifie l'usure précoce des blocs mémoire et gère la vitesse.",
        exemple: "Optimiser les entrées de données pour prolonger la durée de vie du SSD."
      }
    }
  ]
};

export const componentHDD: MainComponent = {
  id: 'h_hdd',
  name: 'HDD (Disque dur)',
  roleBadge: 'Sauvegarde Magnétique de Masse',
  functionalClassification: 'Mémoires',
  physicalClassification: 'Unité Centrale (Interne)',
  shortDescription: "Disque traditionnel renfermant des plateaux rotatifs idéal pour stocker d'importants volumes de données.",
  icon: HardDrive,
  colorTheme: {
    border: 'border-slate-200 hover:border-slate-400',
    bg: 'bg-slate-50/50',
    text: 'text-slate-900',
    badge: 'bg-slate-100 text-slate-800',
    lightBg: 'bg-slate-50/30'
  },
  details: {
    definition: "C'est l'**unité de disque mécanique classique**. C'est un boîtier étanche en métal rattaché à l'ordinateur qui stocke tous vos fichiers à petit prix.",
    fonction: "Il contient de vrais disques rigides empilés qui tournent très vite (5400 à 7200 tr/min) tandis qu'une tête de lecture mécanique mobile survole pour lire et écrire les 1 et les 0 magnétiquement sans électricité.",
    exemple: "Stocker de très gros dossiers de sauvegardes d'écoles, ou des collections de cours vidéo complexes.",
  },
  underComponents: [
    {
      id: 'h_hdd_platter',
      name: 'Bisseau/Plat métallique tournant',
      role: 'Plateau recouvert de matière magnétique pour fixer les bits.',
      icon: HardDrive,
      details: {
        definition: "Le disque physique en métal poli.",
        fonction: "Tourne de façon continue et fixe les polarités microscopiques au passage de la tête de lecture.",
        exemple: "Le son de rotation mécanique que l'on perçoit au démarrage du PC."
      }
    }
  ]
};

export const componentBusData: MainComponent = {
  id: 'h_bus_data',
  name: 'Bus de Données',
  roleBadge: 'Véhicule de l\'Information Brute',
  functionalClassification: 'Bus',
  physicalClassification: 'Unité Centrale (Interne)',
  shortDescription: "Transporte les bits de valeurs réelles (les nombres d'un calcul, les textes, les pixels).",
  icon: ArrowRightLeft,
  colorTheme: {
    border: 'border-yellow-250 hover:border-yellow-400',
    bg: 'bg-yellow-50/50',
    text: 'text-yellow-900',
    badge: 'bg-yellow-105 text-yellow-850',
    lightBg: 'bg-yellow-50/10'
  },
  details: {
    definition: "C'est l'**autoroute bidirectionnelle des données**. Ce sont des fils conducteurs sur la carte mère qui transportent le contenu binaire réel de vos fichiers (textes, images ou calculs) d'un composant à un autre.",
    fonction: "Il assure les liaisons dans les deux sens : il fait passer les résultats des calculs et les données brutes entre le processeur, la mémoire vive et les périphériques.",
    exemple: "Transporter la lettre 'A' saisie au clavier vers le processeur puis de là vers la puce de mémoire RAM active."
  },
  underComponents: [
    {
      id: 'h_bd_piste',
      name: 'Pistes en cuivre imprimées',
      role: 'Conducteurs électriques de précision permettant la circulation de charges.',
      icon: Layers,
      details: {
        definition: "Les lignes fines gravées en surface de la carte mère.",
        fonction: "Conduisent simultanément plusieurs signaux binaires (parallélisme de bus) d'un point à un autre.",
        exemple: "Suivre du regard les pistes qui partent des connecteurs RAM vers le processeur."
      }
    }
  ]
};

export const componentBusAddr: MainComponent = {
  id: 'h_bus_addr',
  name: "Bus d'Adresses",
  roleBadge: 'Pointeur de Destination',
  functionalClassification: 'Bus',
  physicalClassification: 'Unité Centrale (Interne)',
  shortDescription: "Permet au CPU de spécifier précisément dans quelle case mémoire physique il souhaite lire ou écrire.",
  icon: Compass,
  colorTheme: {
    border: 'border-amber-205 hover:border-amber-400',
    bg: 'bg-amber-50/50',
    text: 'text-amber-900',
    badge: 'bg-amber-100 text-amber-800',
    lightBg: 'bg-amber-50/30'
  },
  details: {
    definition: "C'est l'**annuaire d'adresses spatiales**. C'est un groupe de fils servant à désigner de manière unidirectionnelle la case mémoire exacte concernée par l'instruction.",
    fonction: "Il fonctionne à sens unique (unidirectionnel du CPU vers la RAM). Quand le processeur veut récupérer ou ranger un élément, il dépose le numéro exact de la boîte aux lettres correspondante (adresse mémoire binaire) sur ce bus pour y accéder.",
    exemple: "Le processeur pointe sur 'case mémoire n°8' pour lui indiquer d'activer son ouverture."
  },
  underComponents: [
    {
      id: 'h_ba_line',
      name: "Lignes d'adressage",
      role: 'Désignent la limite maximale physique gérable par la machine.',
      icon: Compass,
      details: {
        definition: "Les pistes définissant la taille maximale de RAM adressable.",
        fonction: "Envoient des tensions pour composer le code binaire de l'adresse.",
        exemple: "Une carte mère en 32-bits physique peut gérer au maximum 4 gigaoctets d'adresses RAM."
      }
    }
  ]
};

export const componentBusCtrl: MainComponent = {
  id: 'h_bus_ctrl',
  name: 'Bus de Contrôle',
  roleBadge: 'Feux de Signalisation de Commandes',
  functionalClassification: 'Bus',
  physicalClassification: 'Unité Centrale (Interne)',
  shortDescription: "Transporte les ordres (Écrire, Lire, Arrêter) et assure la synchronisation électrique.",
  icon: Sliders,
  colorTheme: {
    border: 'border-orange-205 hover:border-orange-400',
    bg: 'bg-orange-50/50',
    text: 'text-orange-900',
    badge: 'bg-orange-100 text-orange-850',
    lightBg: 'bg-orange-50/30'
  },
  details: {
    definition: "Ce sont les **feux de signalisation et les contrôleurs de rythme** de la carte mère. Ils gèrent le dialogue binaire de l'ordinateur en propageant les ordres d'action.",
    fonction: "Il achemine les signaux de commande générés par l'Unité de Contrôle du processeur vers les périphériques et mémoires (comme 'LIRE l'information immédiatement !', 'ÉCRIRE l'information !', 'INITIALISER...').",
    exemple: "Donner l'autorisation et l'ordre d'écrire le devoir fini sur la clé USB."
  },
  underComponents: [
    {
      id: 'h_bc_line',
      name: 'Lignes de synchronisation',
      role: "Assurent que toutes les pièces reçoivent l'appel de calcul en simultané.",
      icon: Sliders,
      details: {
        definition: "Fils conducteurs de signaux d'alertes (interruptions matérielles ou horloge).",
        fonction: "Assurent la synchronisation électrique et gèrent les interruptions.",
        exemple: "Une souris transmettant un 'clic d'interruption' au processeur pour qu'il s'arrête de calculer et bouge le pointeur."
      }
    }
  ]
};

export const componentInputDev: MainComponent = {
  id: 'h_input_dev',
  name: "Périphériques d'entrée",
  roleBadge: "Envoi d'informations",
  functionalClassification: 'Périphériques d\'entrée',
  physicalClassification: 'Périphériques Externes',
  shortDescription: "Permettent d'envoyer des informations, des textes et des ordres bruts à l'ordinateur.",
  icon: Keyboard,
  colorTheme: {
    border: 'border-violet-200 hover:border-violet-400',
    bg: 'bg-violet-50/50',
    text: 'text-violet-900',
    badge: 'bg-violet-100 text-violet-800',
    lightBg: 'bg-violet-50/30'
  },
  details: {
    definition: "Ce sont les **yeux, les oreilles et les mains** de l'ordinateur. Ce sont les appareils situés en dehors de l'ordinateur (externes) qui servent à lui faire parvenir des informations, ordres ou contenus.",
    fonction: "Ils captent les interactions humaines réelles (frappe d'une touche, clic, votre voix, un dessin) et les transforment en signaux électriques binaires (1 et 0) compréhensibles par l'ordinateur.",
    exemple: "Taper des lettres sur le clavier, cliquer sur une icône avec la souris, ou capturer l'ambiance avec le micro."
  },
  underComponents: [
    {
      id: 'h_clavier',
      name: 'Clavier',
      role: "Envoi d'instructions textuelles et de commandes par pression mécanique.",
      icon: Keyboard,
      details: {
        definition: "L'**outil textuel indispensable**. C'est une grille de boutons montés sur un circuit électrique.",
        fonction: "Enfoncer une touche établit un contact qui transmet une impulsion électrique binaire.",
        exemple: "Saisir son prénom dans un questionnaire d'exercice en classe d'informatique."
      }
    },
    {
      id: 'h_souris',
      name: 'Souris',
      role: "Indicateur de positionnement de précision sur l'écran.",
      icon: MousePointer,
      details: {
        definition: "Le **guide du pointeur**. Un boîtier maniable posé à côté du clavier.",
        fonction: "Elle capte ses mouvements sur le bureau à l'aide d'un laser optique pour diriger le curseur correspondant à l'écran.",
        exemple: "Cliquer sur l'onglet 'Quiz' de ton application."
      }
    },
    {
      id: 'h_webcam',
      name: 'Webcam',
      role: "Captation de flux vidéo réel en direct.",
      icon: Video,
      details: {
        definition: "La **camera de travail**. Un capteur d'image optique branché par câble.",
        fonction: "Elle capte la lumière ambiante sous forme matricielle et transmet les matrices colorées à l'Unité Centrale.",
        exemple: "Faire une réunion pour suivre le cours à distance avec l'enseignant."
      }
    }
  ]
};

export const componentOutputDev: MainComponent = {
  id: 'h_output_dev',
  name: 'Périphériques de sortie',
  roleBadge: "Restitution d'informations",
  functionalClassification: 'Périphériques de sortie',
  physicalClassification: 'Périphériques Externes',
  shortDescription: "Permettent à l'ordinateur d'exprimer et de communiquer ses résultats à l'utilisateur.",
  icon: Monitor,
  colorTheme: {
    border: 'border-fuchsia-250 hover:border-fuchsia-400',
    bg: 'bg-fuchsia-50/50',
    text: 'text-fuchsia-900',
    badge: 'bg-fuchsia-100 text-fuchsia-800',
    lightBg: 'bg-fuchsia-50/30'
  },
  details: {
    definition: "Ce sont la **bouche, l'écran et les expressions** de l'ordinateur. Ils restituent, projettent de l'encre, ou émettent du son pour que l'être humain puisse comprendre les données.",
    fonction: "Ils prennent les informations binaires calculées par l'Unité Centrale (des 0 et des 1 invisibles) et les convertissent en sons physiques, en lumière colorée ou en textes imprimés sur papier.",
    exemple: "Observer les lettres s'éclairer à l'écran ou écouter un extrait audio."
  },
  underComponents: [
    {
      id: 'h_ecran',
      name: 'Écran',
      role: "Restitution visuelle graphique haute définition en temps réel.",
      icon: Monitor,
      details: {
        definition: "Le **moniteur de contrôle**. Un panneau composé de millions de points de lumière colorés (pixels).",
        fonction: "Reçoit les signaux de la carte graphique pour allumer de façon ultra-rapide les sous-pixels rouge, vert et bleu.",
        exemple: "Voir les schémas de l'unité centrale s'afficher en direct devant vos yeux."
      }
    },
    {
      id: 'h_imprimante',
      name: 'Imprimante',
      role: "Impression physique permanente sur support papier.",
      icon: Printer,
      details: {
        definition: "Le **transférateur papier**. Une machine automatisée d'impression de documents.",
        fonction: "Dépose de l'encre liquide ou fixe de la poudre laser sèche par chaleur sur du papier blanc.",
        exemple: "Imprimer son cours de technologie à la fin du cours informatique."
      }
    },
    {
      id: 'h_HP',
      name: 'Haut-parleurs / Écouteurs',
      role: "Diffusion sonore de bruitages, voix et musiques.",
      icon: Volume2,
      details: {
        definition: "Les **diffuseurs de vibrations acoustiques**. Des enceintes contenant des membranes magnétiques.",
        fonction: "Reçoivent des électricités oscillantes de la carte son pour faire vibrer l'air environnant.",
        exemple: "Écouter l'explication audio d'un cours d'histoire ou d'anglais interactivement."
      }
    }
  ]
};

export const componentMixedDev: MainComponent = {
  id: 'h_mixed_dev',
  name: "Périphériques d'entrée/sortie",
  roleBadge: "Transit Bidirectionnel",
  functionalClassification: 'Périphériques d\'entrée/sortie',
  physicalClassification: 'Périphériques Externes',
  shortDescription: "Permettent à la fois la saisie d'informations (entrée) et la restitution des calculs (sortie).",
  icon: Smartphone,
  colorTheme: {
    border: 'border-indigo-200 hover:border-indigo-400',
    bg: 'bg-indigo-50/50',
    text: 'text-indigo-900',
    badge: 'bg-indigo-100 text-indigo-800',
    lightBg: 'bg-indigo-50/30'
  },
  details: {
    definition: "Ce sont les **organes intelligents bidirectionnels (hybrides)** de communication. Ils combinent en même temps les flux d'entrée d'ordres et de sortie de résultats.",
    fonction: "Ils encapsulent des capteurs de pression tactile ou des structures de transmission d'antennes Wi-Fi/Réseau pour faire transiter les paquets de données informatiques dans les deux sens.",
    exemple: "Toucher du doigt une tablette pour dessiner une forme qui s'affiche à l'écran."
  },
  underComponents: [
    {
      id: 'h_tactile',
      name: 'Écran tactile',
      role: "Surface combinée d'affichage d'images et de capteurs de pression tactile.",
      icon: Smartphone,
      details: {
        definition: "L'**interface tactile de manipulation**. Un écran classique doublé d'une grille de capteurs.",
        fonction: "Affiche l'image (sortie) tout en détectant la position précise du doigt de l'utilisateur (entrée) pour réagir.",
        exemple: "Utiliser une tablette tactile scolaire pour résoudre un problème de géométrie."
      }
    },
    {
      id: 'h_cle_usb_io',
      name: 'Clé USB (Transit I/O)',
      role: "Module flash externe d'échange mobile bidirectionnel.",
      icon: FolderOpen,
      details: {
        definition: "Le **passeur de documents nomade**. Une clé électronique compacte.",
        fonction: "Permet de charger des exercices (entrée) puis d'y enregistrer des rapports d'exposés (sortie).",
        exemple: "Copier la présentation du projet en classe de physique."
      }
    }
  ]
};

export const componentStorageDev: MainComponent = {
  id: 'h_storage_dev',
  name: 'Périphériques de stockage',
  roleBadge: 'Conservation de données externe',
  functionalClassification: 'Périphériques de stockage',
  physicalClassification: 'Périphériques Externes',
  shortDescription: "Permettent la conservation et l'échange amovible des données en dehors de l'unité centrale.",
  icon: HardDrive,
  colorTheme: {
    border: 'border-cyan-205 hover:border-cyan-400',
    bg: 'bg-cyan-50/50',
    text: 'text-cyan-900',
    badge: 'bg-cyan-100 text-cyan-800',
    lightBg: 'bg-cyan-50/30'
  },
  details: {
    definition: "Ce sont les **placards externes amovibles** de l'ordinateur. Ils servent à garder en sécurité vos photos, devoirs et cours de manière permanente pour pouvoir les emporter partout avec vous.",
    fonction: "Ils utilisent des puces de mémoire stables qui bloquent les données binaires pour éviter qu'elles ne s'effacent lorsque l'appareil n'est plus branché à une prise électrique.",
    exemple: "Enregistrer vos dossiers scolaires d'histoire-géo sur une carte mémoire ou une clé USB amovible."
  },
  underComponents: [
    {
      id: 'h_cle_usb_storage',
      name: 'Clé USB',
      role: "Support de stockage miniature et économique à mémoire flash.",
      icon: FolderOpen,
      details: {
        definition: "La **mémoire de poche amovible** contenant de petites puces électroniques robustes.",
        fonction: "Elle stocke des fichiers de taille moyenne sans s'user, car elle ne contient aucun mécanisme mobile en mouvement.",
        exemple: "Ranger ses présentations orales pour les amener en classe."
      }
    },
    {
      id: 'h_sd_card',
      name: 'Carte mémoire SD',
      role: "Format plat compact destiné aux téléphones, appareils photo et consoles.",
      icon: Database,
      details: {
        definition: "La **carte plate miniature**. Une petite plaquette en plastique avec de fins connecteurs dorés de contact.",
        fonction: "Elle se glisse dans un slot de carte (appareil photo, console, téléphone) pour lui offrir à l'instant un espace de stockage permanent.",
        exemple: "Sauvegarder les fichiers images saisis par l'appareil reflex de l'école."
      }
    }
  ]
};

export const componentPSU: MainComponent = {
  id: 'h_psu',
  name: "Bloc d'Alimentation (PSU)",
  roleBadge: 'Protecteur et Transformateur Électrique',
  functionalClassification: 'Alimentation',
  physicalClassification: 'Unité Centrale (Interne)',
  shortDescription: "Convertit le courant alternatif dangereux de la prise murale (ex: 230V) en courants continus de faibles voltages.",
  icon: Zap,
  colorTheme: {
    border: 'border-amber-200 hover:border-amber-400',
    bg: 'bg-amber-50/50',
    text: 'text-amber-900',
    badge: 'bg-amber-100 text-amber-800',
    lightBg: 'bg-amber-50/30'
  },
  details: {
    definition: "C'est l'**unité de d'alimentation en électricité**. C'est le bloc robuste raccordé à la prise.",
    fonction: "Prend le fort courant secteur de la classe (230 Volts alternatif) et le régule en de tout petits voltages stables (12V, 5V, 3V continus) adaptés aux fragiles circuits de silicium.",
    exemple: "Elle évite que les puces ne fondent en recevant l'extrême puissance de la prise murale.",
    schema: `
  [ Prise Murale ]  =====>  [ BLOC ALIMENTATION ]  =====>  [ Composants internes ]
    (230V Alternatif)              (PSU)                   - CPU (1.2V stable)
                                                           - Disques (12V continu)`
  }
};

// Double classification lists
export const functionalCategories: CategoryInfo[] = [
  {
    id: 'peripheriques_entree',
    name: "Périphériques d'entrée",
    description: "Appareils externes servant à saisir des ordres, des textes, des sons ou des vidéos pour les expédier au processeur.",
    colorClass: "bg-violet-50 text-violet-800 border-violet-200",
    components: [componentInputDev]
  },
  {
    id: 'unites_traitement',
    name: "Unités de traitement",
    description: "Les cœurs de calcul principaux qui analysent et résolvent les instructions programmatiques.",
    colorClass: "bg-rose-50 text-rose-800 border-rose-200",
    components: [componentCPU, componentGPU]
  },
  {
    id: 'memoires',
    name: "Mémoires",
    description: "Organes et barrettes stockant provisoirement les données de travail ou sauvegardant à long terme vos fiches de révisions.",
    colorClass: "bg-blue-50 text-blue-800 border-blue-200",
    components: [componentCache, componentRAM, componentROM, componentSSD, componentHDD]
  },
  {
    id: 'bus_communication',
    name: "Bus et communication",
    description: "L'infrastructure de transport sur la carte mère pour faire voyager l'électricité et les messages binaires.",
    colorClass: "bg-yellow-50 text-yellow-800 border-yellow-200",
    components: [componentBusData, componentBusAddr, componentBusCtrl]
  },
  {
    id: 'peripheriques_sortie',
    name: "Périphériques de sortie",
    description: "Organes d'expression restituant les informations binaires calculées sous forme visuelle, sonore ou imprimée.",
    colorClass: "bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200",
    components: [componentOutputDev]
  },
  {
    id: 'peripheriques_entree_sortie',
    name: "Périphériques d'entrée/sortie",
    description: "Appareils bidirectionnels fonctionnant de manière polyvalente pour capter l'ordre puis afficher ou stocker le rendu.",
    colorClass: "bg-indigo-50 text-indigo-800 border-indigo-200",
    components: [componentMixedDev]
  },
  {
    id: 'peripheriques_stockage',
    name: "Périphériques de stockage",
    description: "Placards de poche portatifs permettant de transporter à l'abri vos fichiers d'un ordinateur à un autre.",
    colorClass: "bg-cyan-50 text-cyan-800 border-cyan-200",
    components: [componentStorageDev]
  }
];

export const physicalCategories: CategoryInfo[] = [
  {
    id: 'unite_centrale',
    name: "Unité Centrale (Interne)",
    description: "Tous les composants électroniques capitaux et essentiels, raccordés à la carte mère et protégés à l'intérieur du boîtier.",
    colorClass: "bg-teal-50 text-teal-800 border-teal-200",
    components: [
      componentMotherboard,
      componentCPU,
      componentGPU,
      componentCache,
      componentRAM,
      componentROM,
      componentSSD,
      componentHDD,
      componentPSU
    ]
  },
  {
    id: 'peripheriques_externes',
    name: "Périphériques Externes",
    description: "Appareils de manipulation positionnés à l'extérieur de la caisse centrale et branchés via port USB, Bluetooth ou câbles vidéo.",
    colorClass: "bg-indigo-50 text-indigo-800 border-indigo-200",
    components: [
      componentInputDev,
      componentOutputDev,
      componentMixedDev,
      componentStorageDev
    ]
  }
];
