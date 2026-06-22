# 🖥️ Documentation Technique Complète : Interactive Computer Simulator v1.0
## 🎓 Plateforme Éducative Interactive sur l'Architecture de Von Neumann

> 📄 **Note Pédagogique :** Pour les détails relatifs à l'autorisation, aux objectifs didactiques, aux 6 phases d'exécution et à la soutenance du Projet Personnel Encadré de **Soukaina TARIKI** au sein du **CRMEF Casablanca-Settat ( شعبة المعلوميات )**, veuillez vous référer directement au dossier complet : [`/DOCUMENTATION_PROJET_TARIKI.md`](./DOCUMENTATION_PROJET_TARIKI.md).

---

## 📌 1. Introduction et Objectif Pédagogique

**Interactive Computer Simulator v1.0** est une application web d'apprentissage monopage (SPA) conçue spécifiquement pour le grand public, les élèves et les enseignants du secondaire, particulièrement ceux du **Tronc Commun Lycéen au Maroc** (conformément aux directives du Ministère de l'Éducation Nationale, du Préscolaire et des Sports). 

Le défi principal résolu par cette application est **la matérialisation de l'invisible** : comment les informations (caractères alphabétiques, opérations arithmétiques, fichiers binaires stockés sur support SSD/Disque dur) sont converties en signaux physiques et transitent d'un composant de l'ordinateur à un autre pour être traitées puis restituées sous une forme exploitable.

L'application s'appuie sur le modèle de **Von Neumann** simplifié pour introduire :
1. **Les bus matériels de communication** (Bus de données, Bus d'adresses, Bus de contrôle).
2. **Le découpage du processeur (CPU)** en deux entités fondamentales : l'**Unité de Contrôle (UC)** pour le séquençage et l'**Unité d'Arithmétique et de Logique (UAL)** pour les calculs.
3. **Le rôle et la volatilité de la mémoire vive (RAM)** par rapport au **stockage secondaire permanent** (SSD / Disque).
4. **Les périphériques d'entrée/sortie (E/S)** servant d'interface physique avec le monde extérieur.

---

## 📂 2. Architecture des Dossiers et Fichiers

L'arborescence du projet s'organise selon un découpage modulaire rigoureux :

```text
├── package.json                   # Gestion des scripts de développement/production et dépendances NPM
├── tsconfig.json                  # Règles de typage et de compilation strictes de TypeScript
├── vite.config.ts                 # Configuration optimisée du bundler et serveur web Vite
├── index.html                     # Squelette HTML5 principal de l'application
├── metadata.json                  # Métadonnées d'identification pour l'intégration de la plateforme
├── README.md                      # Guide d'introduction rapide et guide d'installation utilisateur
├── DOCUMENTATION.md               # Présente documentation technique et fonctionnelle détaillée (Français)
└── src/
    ├── main.tsx                   # Point d'amorçage et montage du DOM virtuel React
    ├── App.tsx                    # Contrôleur d'états racine, routage dynamique et persistance thématique
    ├── index.css                  # Styles globaux, utilitaires de dégradés et variables d'adaptation sombre (Dark Theme)
    ├── data/                      # Base de connaissances et syllabus codés de manière statique et typée
    │   ├── componentsData.ts      # Syllabus explicatif complet des 8 composants principaux de l'ordinateur
    │   ├── scenariosData.ts       # Étapes chronologiques et narrations des 3 parcours de voyage de données
    │   └── quizData.ts            # Banque de questions d'auto-évaluation finale avec feedbacks immédiats
    └── components/                # Modules d'interface utilisateur autonomes et réactifs
        ├── Header.tsx             # En-tête premium d'esthétique industrielle avec barre d'outils, recherche et menu mobile
        ├── Footer.tsx             # Signature institutionnelle et crédits d'auteur
        ├── Home.tsx               # Tableau de bord d'accueil, bento de navigation et pré-requis du cours
        ├── ExplorerComposants.tsx # Syllabus interactif équipé du double paradigme de filtrage (fonctionnel & physique)
        ├── FicheSyntheseGenerale.tsx # Guide d'étude de synthèse global avec carnet de suivi interactif et support d'impression PDF
        ├── VoyageDonnees.tsx      # Catalogue des 3 leçons / parcours de données physiques
        ├── Simulation.tsx         # Séquenceur de simulation du trajet de données avec animations pas-à-pas
        ├── SimulationAdvanced.tsx # Simulateur électrique de Von Neumann avec gestion d'horloge synchrone
        ├── ComputerDiagram.tsx    # Schéma interactif de carte mère classique lié aux 3 scénarios
        ├── ComputerDiagramAdvanced.tsx # Schéma vectoriel des bus physiques avec simulation des flux électriques
        └── Quiz.tsx               # Questionnaire d'auto-évaluation finale interactif de 8 questions
```

---

## 🏛️ 3. Spécifications Détaillées des Composants Majeurs

L'application a été structurée de manière à assurer une séparation parfaite de la logique métier, du rendu géospatial vectoriel et de l'orchestration des flux d'évaluation.

### 🌟 A. Le Header Moderne (`src/components/Header.tsx`)
Inspiré par la pureté de lignes de produits de renommée mondiale (*Stripe, Linear, Notion*), le Header adopte une structure rigide à trois zones distinctes :
1. **Zone Gauche (Identité de la Plateforme)** :
   * Affiche un emblème d'ordinateur élégant suivi de l'appellation `💻 Interactive Computer Simulator`.
   * Un badge de type monospace spécifiant la thématique industrielle `Von Neumann Architecture` est placé pour contextualiser l'application.
   * L'ensemble dispose d'animations subtiles de survol et sert de raccourci d'un seul clic pour revenir à la page principale.
2. **Zone Centrale (Navigation Standardisée)** :
   * Une barre de routage condensée permet d'accéder d'un clic aux différents onglets (`Accueil`, `Scénarios`, `Composants`, `Simulations`, `Simulateur avancé`, `Quiz final`).
   * **Glissement Dynamique** : L'onglet actif dispose d'un pilier blanc ou gris anthracite flottant qui se déplace horizontalement d'un onglet à un autre via des transitions physiques de glissement assurées par **Framer Motion** (`layoutId="active-tab-indicator"`).
3. **Zone Droite (Palette Premium d'Outils Compacts)** :
   * **[ 🔍 ] Bouton d'accès rapide à la recherche universelle** :
     * Déclenche une boîte de dialogue modale flottante (ou s'active via le raccourci global `Ctrl+K` / `Cmd+K`).
     * Permet le filtrage d'un clic parmi les thématiques les plus importantes et redirige instantanément l'utilisateur sur le bon onglet d'apprentissage.
   * **[ 🌐 FR ] Sélecteur de langue compact** :
     * Actuellement ancré sur le français, ce bouton présente un menu déroulant soigné muni d'indicateurs de disponibilité pour de futures extensions (marochain, anglais).
   * **[ ☀️ / 🌙 ] Commutateur de Thème** :
     * Bouton compact changeant en douceur la préférence colorimétrique de l'application. Dispose d'une animation gyroscopique de ressort élastique (Spring Animation) pour une transition mémorable.
4. **Version Mobile (Tiroir Menu Rideau)** :
   * Lorsque l'écran passe sous la limite de résolution standard, la barre de navigation se replie et laisse place à un bouton de menu hamburger hautement réactif.
   * Clic sur le bouton : Un rideau de contrôle structuré se déploie **en superposition au-dessus des couches de contenu** (sans casser l'alignement naturel des cartes du dessous) pour assurer une navigation tactile complète.

---

### 📥 B. Explorer les Composants (`src/components/ExplorerComposants.tsx`)
Il s'agit du dictionnaire visuel d'architecture matérielle :
* **Double Classification** : L'apprenant peut trier l'ensemble des 8 composants selon deux logiques complémentaires :
  1. **Par Fonction** : Est-ce un canal d'**Entrée** (Clavier), un module de **Traitement** (CPU, UC, UAL, Bus), un espace de **Stockage** (RAM, SSD) ou un terminal de **Sortie** (Écran) ?
  2. **Par Emplacement** : Le composant est-il **Interne** à l'unité centrale (CPU, RAM, UAL, UC, Bus, Stockage) ou se situe-t-il à l'**Externe** (Clavier, Écran) ?
* **Richesse Pédagogique** : Chaque composant est équipé d'illustrations, de définitions vulgarisées, de métaphores du monde réel pour susciter l'ancrage mnémonique, et de justifications de sa présence ("Pourquoi ce composant est-il indispensable ?").
* **Bouton de Retour Uniforme** : Un bouton de retour élégant, aligné en haut à gauche et équipé d'une micro-animation de flèche translationnelle (`ArrowLeft`), est intégré pour permettre aux élèves de retrouver le tableau d'accueil de manière intuitive.

---

### 🗺️ C. Le Voyage des Données & Scénarios (`src/components/VoyageDonnees.tsx`)
Cette interface sert d'introduction théorique aux simulations de transit :
* Présente les objectifs globaux de chaque leçon interactive d'une manière rassurante et engageante.
* Offre un accès direct aux trois parcours de données pré-programmés.
* Intègre notre **Bouton de Retour Uniformisé à l'Accueil** pour assurer la symétrie comportementale des pages.

---

### 🎮 D. Les Séquenceurs de Simulation (Moteur Unifié `src/components/SimulationWorkspace.tsx`)

Afin d'éviter tout doublon de code et d'assurer une expérience utilisateur irréprochable, les modules de simulation classique et d'architecture ont été unifiés au sein d'un **moteur de synchronisation d'orchestration de données commun** appelé `SimulationWorkspace.tsx` :
* **Unification de la logique métier** : Même pilotage automatique du cycle d'horloge de pas (intervalles de 1s à 6s), validation conjointe des questionnaires préalables d'activation pédagogique, gestion de l'affichage plein écran, et synthèse de progression.
* **Transition dynamique de diagramme** : Un sélecteur interactif est proposé en haut à droite du simulateur pour basculer à la volée entre la **Vue Motherboard** et la **Vue Bus & Horloge** sans réinitialiser la simulation ou perdre le point d'étape atteint par l'apprenant.
* **Optimisation structurelle** : Les composants `Simulation.tsx` et `SimulationAdvanced.tsx` agissent désormais comme de légères interfaces d'instanciation transmettant le type de diagramme à charger par défaut (`simplified` ou `advanced`).

#### 1. Diagramme de Carte Mère Simplifié (`src/components/ComputerDiagramSimplified.tsx`)
* Représente une structure géospatiale matérielle de la carte mère découpée en 3 zones d'activités repérables.
* Les modules (Clavier, RAM, CPU avec UC/UAL, SSD et Écran) s'allument dynamiquement lors du passage du focus.
* Une capsule contenant la donnée à cette étape (ex: la lettre "A" ou un résultat arithmétique) s'anime et flotte de manière fluide au-dessus de l'onglet actif.

#### 2. Simulateur de Von Neumann d'Architecture Globale (`src/components/ComputerDiagramAdvanced.tsx`)
Affiche les flux électriques oscillants dans les trois familles de liaisons physiques (bus) de la carte mère :
* 🔵 **Bus de données** (couleur bleue) : Transite les signaux binaires.
* 🟣 **Bus d'adresses** (couleur violette) : Spécifie le nœud de destination mémoire.
* 🟠 **Bus de contrôle** (couleur orange) : Dicte l'ordre d’écriture ou de lecture.
* **Gestionnaire de Cycles d'Horloge** : Un panneau de réglage de la fréquence d'horloge synchrone modifie l'amplitude de course des charges de données électriques.
* **Mode plein écran robuste** : Disponible avec contrôle de fermeture automatique sur pression de la touche `Escape` du clavier.

---

### 📝 E. Quiz d'Évaluation Autonome (`src/components/Quiz.tsx`)
Sert de validation finale pour mesurer l'assimilation globale de l'apprenant :
* **Séquencement Sans Failles** : 8 questions couvrant l'ensemble du syllabus de Von Neumann. Contient des distracteurs calibrés pour identifier les confusions classiques des lycéens (confusion entre RAM volatile et stockage permanent non volatile SSD).
* **Anti-Triche** : Les options sélectionnées sont instantanément figées après validation pour préserver l'intégrité de l'épreuve formative.
* **Fiches Explicatives de Correction** : Qu'il y ait erreur ou réussite, une fiche explicative rigoureuse accompagne chaque question pour consolider les acquis.
* **Notation et Appréciation Académique Standardisée** : Le score d'évaluation est trié selon des seuils sélectifs :
  * **Excellent (de 7 à 8 points)** : Des félicitations chaleureuses qui saluent l'acquisition totale des compétences.
  * **Bien (de 5 à 6 points)** : Encourage l'apprenant à repasser les concepts encore flous.
  * **À revoir (moins de 5 points)** : Recommande de manière bienveillante d'utiliser le syllabus interactif et de refaire le parcours des simulations.
* **Boutons de retours unifiés** : S'intègrent précisément à la logique visuelle homogène de l'ensemble de la plateforme.

---

### 📋 F. La Fiche de Synthèse Générale et Guide d'Étude Imprimable (`src/components/FicheSyntheseGenerale.tsx`)
Pour aller au-delà des animations de simulation interactives, la plateforme intègre un **Syllabus exhaustif de révision et de synthèse (Syllabus Handout)** destiné au travail hors-classe et à la préparation aux évaluations :
1. **Contenu Encyclopédique Complet** : Regroupe et décrit l'intégralité des **16 composants matériels majeurs** de l'architecture informatique (Processeur, RAM, Mémoire Cache, Disque Dur, SSD, Alimentation, les trois familles de bus de communication, et tous les périphériques matériels d'entrée/sortie/mixtes), offrant pour chacun d'eux les définitions académiques, les descriptions de cycles de fonctionnement et des analogies d'apprentissage quotidiennes pour une assimilation intuitive.
2. **Carnet de Suivi d'Étude Interactif** : L'apprenant peut cocher activement au fur et à mesure les concepts et composants maîtrisés. Un indicateur dynamique calcule instantanément la progression globale d'apprentissage (sous forme de pourcentage réactif sauvegardé localement par `localStorage` pour préserver le suivi de l'apprentissage d'une session à une autre).
3. **Mise en Page Orientée Impression (Print-First Layout) & PDF** : 
   * Intégration de styles spécifiquement calibrés pour le moteur d'impression des navigateurs (`print:hidden`, `print:bg-white`, `print:text-black`, `page-break-inside-avoid`).
   * Un bouton d'exportation permet de reformater dynamiquement la synthèse en un document PDF professionnel ou de l'imprimer directement pour en faire un livret d'activité papier distribuable en classe.
   * Adaptabilité linguistique transversale (Français, Anglais, Espagnol, Allemand et Arabe en affichage bidirectionnel RTL) assurant une portée éducative universelle.

---

## 💻 4. Système de États Réactifs et Synchronisation

Voici une vue approfondie des principaux mécanismes d'états réactifs de l'application conçus pour s'exécuter de façon fluide sans latence ni instabilité :

### 🌓 Persistance et Propagation du Thème Sombre
Le thème est géré au sommet de la plateforme (`App.tsx`) avec propagation directe :
```typescript
const [darkMode, setDarkMode] = useState<boolean>(() => {
  const saved = localStorage.getItem('info_explorer_dark_mode');
  if (saved !== null) return saved === 'true';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
});

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('info_explorer_dark_mode', String(darkMode));
}, [darkMode]);
```
Cette méthode empêche l'apparition d'un flash de couleur clair indésirable lors du chargement initial de la page.

### 🚗 Déplacement Géospatial de la Capsule de Données
Le positionnement dynamique de la donnée se base sur des repères absolus calculés d'une manière responsive le long de notre carte mère :

```typescript
// Coordonnées prédéfinies pour chaque élément matériel de la carte mère
const COMPONENT_COORDINATES: Record<string, { x: number; y: number }> = {
  clavier:  { x: 12,  y: 40  },
  bus:      { x: 50,  y: 45  },
  ram:      { x: 50,  y: 18  },
  cpu:      { x: 50,  y: 72  },
  uc:       { x: 42,  y: 68  },
  ual:      { x: 58,  y: 76  },
  stockage: { x: 15,  y: 80  },
  ecran:    { x: 88,  y: 40  }
};
```
Lors de l'incrémentation de l'état `currentStepIndex`, le script lit le point de départ et la destination physique :
1. Calcul du vecteur de transition.
2. Ajout de l'animation par interpolation linéaire de la variable de style CSS.
3. Déclenchement d'un clignotement circulaire sur les bordures du périphérique ciblé.

---

## 🛠️ 5. Devoir de Maintenance et Compilation

L'intégralité du code source a été développée pour répondre aux normes les plus rigoureuses de TypeScript.
Aucune erreur de compilation n'est présente dans le projet.

### Instructions de Compilation

Pour générer nos actifs de production minifiés et optimisés pour le déploiement sur serveur cloud :

```bash
# 1. Installer l'environnement de paquets académiques
npm install

# 2. Lancer le linter pour évaluer la conformité syntaxique
npm run lint

# 3. Compiler et générer le build statique de production
npm run build
```

Le code de production optimisé s'implante automatiquement dans le dossier `/dist`. Il est conçu de façon universelle pour être hébergé sur des réseaux de distribution statiques ou des serveurs éphémères de manière instantanée, assurant une disponibilité 100% stable pour les cours d'informatique.

---
*Fait d'une manière méticuleuse par SOUKAINA TARIKI. Document à conserver précieusement pour toute modification future de l'application.*
