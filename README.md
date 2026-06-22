# 🖥️ Interactive Computer Simulator v1.0 — Le voyage des données dans l’ordinateur

Une application web interactive, hautement visuelle et pédagogique conçue pour illustrer l'architecture interne d'un micro-ordinateur et tracer le transit des signaux de données entre ses différents composants.

**Conforme au programme scolaire officiel du Tronc Commun des Lycées** (Ministère de l'Éducation Nationale, du Préscolaire et des Sports).

---

## 🎯 Objectif Pédagogique

L'objectif est d'aider les enseignants d'informatique à expliquer visuellement le schéma fonctionnel de l'ordinateur (modèle de Von Neumann simplifié) et de permettre aux élèves de visualiser physiquement les flux d'entrées, de traitements, de stockage temporaire/permanent, et de sorties de données au sein d'une unité centrale.

---

## 👥 Public Cible

* **Élèves du Tronc Commun au lycée** (enseignement secondaire).
* **Enseignants d'informatique** recherchant un outil de démonstration clair pour les séances de cours projecteurs.

---

## ✨ Fonctionnalités Majeures

### 1. Header Moderne Premium
Barre de navigation supérieure à 3 zones inspirée par les meilleurs standards industriels (*Linear, Framer, Notion, Stripe*) :
* **Zone Gauche** : Logo interactif de marque et étiquette pédagogique claire `💻 Interactive Computer Simulator • Von Neumann`.
* **Zone Centrale** : Routeur de navigation par onglets équipé d'indicateurs de glissement réactifs assurés par `motion/react` pour une expérience tactile sans saccade.
* **Zone Droite** : Palette premium d'actions compactes sur une seule ligne comprenant :
  * **Bouton de Recherche Universelle [ 🔍 ]** : Palette de commandes (Command Palette) avec raccourcis clavier (`Ctrl+K` / `Cmd+K`) pour naviguer instantanément à travers les notions clés du programme.
  * **Sélecteur de Langue [ 🌐 FR ]** : Menu déroulant élégant (uniquement en Français actuellement, prêt pour d'autres dialectes).
  * **Commutateur de Thème Interactif [ ☀️ / 🌙 ]** : Animation gyroscopique de ressort élastique (Spring) pour basculer de manière mémorable entre le mode clair et le mode sombre (préférence persistante sur `localStorage`).
* **Menu Responsive Tiroir (Tiroir Rideau)** : Un menu mobile de type "overlay" glisse délicatement depuis le haut pour recouvrir les calques de la page sans déformer ni perturber les éléments inférieurs de l'affichage.

### 2. Simulations du Voyage des Données (Scénarios de Cours)
* Schéma divisé de manière structurée :
  * **Entrée** (Clavier)
  * **Traitement** (Bus de données, RAM volatile, CPU avec UC et UAL)
  * **Sortie** (Écran d'affichage)
  * **Stockage permanent** en bas de l'écran.
* **Donnée physique visible** sous forme de capsule orange lumineuse qui se déplace physiquement de composant en composant selon l'étape active.
* Pour chaque étape, mise en valeur claire de :
  * *"Que se passe-t-il ?"*
  * *"Pourquoi c'est important ?"*
* **Question interactive d'activation** au départ de chaque simulation pour mobiliser les connaissances de l'apprenant.
* **Résumé de synthèse "Ce que j'ai compris"** disponible à la fin de chaque scénarios.
* **Mode Plein Écran Universel** avec bouton et support de la touche d'échappement physique `Esc` pour se replier.

### 3. Simulateur d'Architecture Von Neumann Avancé
* Représentation géospatiale vectorielle interactive de la carte mère.
* Flux de particules électriques dynamiques (bleu pour les Données, violet pour les Adresses, orange pour le Contrôle).
* **Gestionnaire d'Horloge Synchrone** : Réglage précis de la fréquence d'horloge pour observer directement l'accélération ou le ralentissement des impulsions électriques et leur influence sur les cycles de calcul machine.

### 4. Page Explorer les Composants (Classement Double)
* Fiches interactives détaillées pour les 8 composants clés (Clavier, Bus, RAM, CPU, UC, UAL, Stockage, Écran).
* **Sélecteur réactif par double classification** :
  * **Par fonction** (selon le rôle logique : Entrées, Traitement, Stockage, Sorties).
  * **Par emplacement** (selon la topographie matérielle : Interne ou Externe).
* Chaque fiche expose : le rôle précis, un exemple concret de la vie réelle, et la justification d'indispensabilité.

### 5. Fiche de Synthèse Générale & Syllabus Imprimable
Un module complet de révision autonome de niveau académique :
* **Banque de savoirs exhaustive** : Traduit et décrit l'intégralité des 16 composants principaux de l'ordinateur, incluant le Processeur, la RAM, l'Alimentation, la ROM, les différents Stockages secondaires et les trois types de bus de communication.
* **Carnet d'études interactif** : Permet aux élèves de cocher des cases d'assimilation qui calculent de manière réactive un score de progression (%) enregistré de manière pérenne d'une session à l'autre.
* **Impression Premium et Export PDF en un clic** : Styles CSS d'impression dédiés, optimisés pour un tirage physique parfait utilisable directement par les enseignants ou à la maison.
* **Traduction multiligue intégrale** : Disponible instantanément dans toutes les langues de la plateforme (Français, Anglais, Arabe RTL, Allemand, Espagnol).

### 6. Quiz Final de Validation
* Questionnaire complet et calibré de 8 questions fondamentales.
* Calcul en temps réel du score final avec attributions d'appréciations scolaires : *Excellent*, *Bien*, et *À revoir*.
* Feedback pédagogique correcteur immédiat après chaque réponse expliquant le concept théorique.

---

## 🛠️ Scénarios de Transit Inclus

1. **J'écris au clavier :** La lettre "A" (convertie en binaire `01000001`) voyage du Clavier ➔ Bus ➔ RAM ➔ CPU ➔ RAM ➔ Écran.
2. **Je fais un calcul :** L'addition "2 + 3" est chargée en RAM, découpée par l'Unité de Contrôle (UC), calculée sous forme de résultat "5" par l'Unité d’Arithmétique et de Logique (UAL), puis affichée à l'Écran.
3. **J'ouvre une image :** Le fichier "image.jpg" passe du Stockage stable (SSD) ➔ RAM ➔ CPU (calcul de pixels décodés) ➔ Écran.

---

## 📚 Documentation Technique

Pour une vue exhaustive de la structure de programmation, de la pile d'états réactifs et des routines de conception, consultez notre guide manuel technique de premier niveau :

👉 **[DOCUMENTATION.md](./DOCUMENTATION.md)**

---

## 🚀 Lancement Local du Projet

Pour exécuter le projet sur votre machine locale :

1. Installez les dépendances :
   ```bash
   npm install
   ```

2. Lancez le serveur de développement local :
   ```bash
   npm run dev
   ```

3. Créez la version de production optimisée :
   ```bash
   npm run build
   ```
---
##**crédits**
**Auteur**: Soukaina TARIKI
**Co-Auteur**: Broumi said Broumisaid78@gmail.com Regional Center for the Professions of Education and Training (CRMEF), Casablanca- Settat, Morocco.
---
*Conçu et développé par **SOUKAINA TARIKI** (Enseignante d'informatique – Lycée Qualifiant — Ministère de l'Éducation Nationale, du Préscolaire et des Sports).*
