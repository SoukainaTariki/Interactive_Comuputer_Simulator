# 🎓 DOSSIER TECHNIQUE & PÉDAGOGIQUE DU PROJET DE SOUKAINA TARIKI
## 💻 Simulation Interactive du Schéma Fonctionnel de l'Ordinateur (Tronc Commun)

---

## 📌 1. Fiche d'Identification du Projet
* **Porteuse du projet :** Soukaina TARIKI (Élève-Enseignante Stagiaire)
* **Établissement d'affiliation :** Centre Régional des Métiers de l'Éducation et de la Formation (CRMEF) de Casablanca-Settat – Section Informatique
* **Niveau scolaire visé :** Tronc Commun Scientifique et Technologique (Informatique)
* **Intitulé du projet :** *Conception et mise en œuvre d'une simulation interactive visant à faciliter la compréhension du fonctionnement global d'un ordinateur chez les élèves du tronc commun.*

---

## 🎯 2. Problématique Didactique vs. Solution Technique Interactive Computer Simulator
L'enseignement du « Schéma Fonctionnel d'un Ordinateur » se heurte historiquement à l'abstraction des concepts. Le tableau ci-dessous démontre comment notre application web **Interactive Computer Simulator** apporte une réponse technique directe aux blocages identifiés sur le terrain par Soukaina TARIKI :

| Difficultés sur le Terrain (Formulaire) | Solution Didactique Intégrée dans l'Application | Utilité Pédagogique Directe |
| :--- | :--- | :--- |
| **1. Visualiser l'interaction dynamique entre les composants** (processeur, mémoire, bus, périphériques). | **Diagramme Vectoriel Actif en Temps Réel** (`ComputerDiagram.tsx`) | Traduit les schémas statiques des manuels en une carte animée où chaque composant réagit visuellement dès qu’il est ciblé par le flux de données. |
| **2. Comprendre le parcours précis des données** au sein du système. | **Séquenceur de Voyage de Données** (`SimulationWorkspace.tsx`) | Permet de suivre pas à pas un octet ou un pixel de sa source (ex. clavier) à sa cible (ex. RAM ou Écran) sous forme de capsule lumineuse en mouvement physique. |
| **3. Comprendre les liaisons physiques abstraites** (Buses de données, d'adresses et de contrôle). | **Simulateur Avancé des Trois Bus de Commutation** (`ComputerDiagramAdvanced.tsx`) | Matérialise les trois familles de bus par des liaisons filaires de couleurs distinctes (Bleu, Violet, Orange) qui s'illuminent sous forme d'impulsions électriques synchronisées. |
| **4. Faire le lien entre les concepts théoriques et leur application concrète.** | **Catalogue de Scénarios Réels Adaptés** (Démarrage du PC, Addition, Enregistrement de fichier) | Les élèves ne voient plus le matériel comme des définitions à apprendre par cœur, mais comprennent comment le SSD, la RAM et l'UAL collaborent pour afficher une touche écrite. |
| **5. Favoriser la compréhension approfondie plutôt que la mémorisation mécanique.** | **Fiches Descriptives et Métaphores du Monde Réel** (`ExplorerComposants.tsx`) | Chaque bloc matériel est cliquable et dévoile une fiche complète associant le composant à une métaphore concrète (ex. l'UAL comparée à un ouvrier calculateur rapide). |
| **6. Langues d'enseignement mixtes** (Obstacles linguistiques dans le système éducatif marocain). | **Système Multilingue Instantané** (Français 🇫🇷 et Arabe 🇲🇦 intégrés de bout en bout) | Permet de basculer instantanément la plateforme en Arabe ou en Français pour s’adapter aussi bien aux troncs communs classiques qu'aux options internationales (BIOF). |
| **7. Consolidation des acquis à la maison et manque de fiches de cours physiques imprimables.** | **Fiche de Synthèse Générale et Syllabus Imprimable** (`FicheSyntheseGenerale.tsx`) | Met à disposition un guide d'étude de niveau académique décrivant les 16 composants, exploitable directement sur l'écran ou imprimable en PDF professionnel pour distribution en classe ou révision sur table. |

---

## 📈 3. Intégration de la Solution dans la Démarche Méthodologique
Le projet s'organise rigoureusement autour des **6 phases méthodologiques d’exécution** précisées dans l'autorisation de projet de Soukaina TARIKI :

### 📋 Étape A : Phase de Diagnostic (Évaluation initiale)
* **Comment l'application y répond :** Avant de lancer n'importe quel voyage de données interactif, l'application bloque le simulateur et affiche une **« Question d'activation de départ pour activer ton cerveau ! »**. Cela permet à l'enseignant de tester les prérequis de la classe (diagnostic) de manière ludique juste avant d'aborder une notion.

### 🎨 Étape B : Phase de Conception
* **Comment l'application y répond :** Nous avons conçu des parcours d'apprentissage séquentiels basés sur des cas d'utilisation réels :
  1. *Écrire au Clavier :* Trajet Clavier ➔ CPU (Unité de Contrôle) ➔ RAM ➔ Écran.
  2. *Faire un Calcul :* Saisie ➔ RAM ➔ CPU (UAL) ➔ RAM ➔ Écran (Mise en évidence du rôle de l'UAL).
  3. *Système de Stockage :* RAM ➔ SSD (Comprendre la différence entre mémoire volatile et non volatile).
  4. *Démarrage du PC :* Alimentation ➔ ROM (BIOS) ➔ RAM ➔ Écran (Comprendre la phase d'amorçage).

### 🚀 Étape C : Phase de Réalisation (L'Outil Didactique Innovant)
* **Comment l'application y répond :** L'interface a été unifiée au sein d'un moteur robuste (`SimulationWorkspace.tsx`) évitant toute surcharge cognitive. L'interface propose trois niveaux de visualisation et d'apprentissage :
  * **Modèle Simplifié :** Idéal pour l'introduction générale (approche fonctionnelle par blocs).
  * **Modèle Avancé (Von Neumann pur) :** Révèle le fonctionnement interne du CPU (UC vs UAL, Registres) et l'interconnexion par les trois bus matériels de la carte mère.
  * **Fiche de Synthèse Générale & Syllabus Imprimable :** Une banque de savoirs exhaustive décrivant les 16 composants principaux avec analogies et schémas d'architectures, dotée d'un carnet de révision interactif et optimisée pour l'impression papier en un clic.

### 🔬 Étape D : Phase d'Expérimentation (Mise en œuvre en classe)
* **Comment l'application y répond :** 
  * Un **Mode Plein Écran** robuste a été développé pour permettre une projection nette et claire via le vidéoprojecteur de la salle d'informatique.
  * Un **Sélecteur de Vitesse Synchrone** (0.5x, 1x, 2x, 5x) permet à l'enseignant de ralentir la simulation pour expliquer en détail une étape difficile, ou de l'accélérer pour les révisions rapides.
  * Des **Conseils de classe interactifs** guident les élèves s'ils manipulent en autonomie lors des séances d'activités pratiques.

### 📝 Étape E : Phase d'Évaluation (Mesurer l'amélioration)
* **Comment l'application y répond :** 
  * Un **Quiz Interactif de 8 questions fondamentales** est intégré à la plateforme. Ce quiz ne donne pas qu’une simple note : il propose une fiche corrective ultra-détaillée à chaque réponse pour éliminer les fausses conceptions des élèves.
  * **Le Carnet de Suivi Intégratif :** Permet aux élèves de cocher individuellement les notions de cours de la fiche de synthèse au fur et à mesure de leurs révisions, calculant instantanément un pourcentage d'assimilation (persistant grâce au stockage local).
  * **Édition de Supports Physiques :** Exportation ou impression instantanée de la fiche de synthèse générale en livret PDF d'activité papier, servant de support autonome de remédiation et de révision autonome à la maison d'une extrême clarté.

### ⚙️ Étape F : Phase d'Ajustement
* **Comment l'application y répond :** Le feedback en temps réel des actions des élèves permet à l'enseignant d'adapter son cours. Si le quiz révèle que la volatilité de la RAM ou la fonction de l'UAL reste floue, l'enseignant peut revenir instantanément aux simulations en double-cliquant sur le composant en question pour remontrer le flux électrique.

---

## 🛠️ 4. Architecture Orientée Éducatif (Côté Code)
Pour garantir la robustesse pour un usage intensif en classe, les choix techniques sont optimisés :
* **Unification de la Logique (`SimulationWorkspace.tsx`) :** Gère de manière unifiée le temps de transit des signaux électriques, l'activation des questions d'introduction et le rendu responsif de la carte mère, éliminant tout ralentissement ou crash de l'interface en plein cours.
* **Typage Rigoureux (`src/types.ts`) :** Garantit la cohérence absolue entre les traductions des langues arabes/françaises et le script visuel, évitant les textes tronqués ou décalés sur écran.
* **Isolation du Mode Sombre :** Utilise un système de persistance locale (`localStorage`) pour préserver les réglages de luminosité de l’écran de la salle informatique d'une séance sur l'autre.

---
*Fait d'une manière méticuleuse pour accompagner et défendre le Projet Personnel Encadré de SOUKAINA TARIKI devant le jury du CRMEF.*
