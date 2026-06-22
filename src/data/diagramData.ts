export type BusType = 'data' | 'addr' | 'ctrl';

export interface BusPath {
  id: string;
  type: BusType;
  d: string;
}

export const BUS_COLORS: Record<BusType, string> = {
  data: '#3b82f6',
  addr: '#a855f7',
  ctrl: '#f97316',
};

export const LABELS: Record<string, { line1: string; line2: string; emoji: string }> = {
  webcam:      { line1: 'Webcam',       line2: 'Entrée Vidéo', emoji: '📷' },
  clavier:     { line1: 'Clavier',      line2: 'Entrée Saisie', emoji: '⌨️' },
  souris:      { line1: 'Souris',       line2: 'Entrée Clic',  emoji: '🖱️' },
  microphone:  { line1: 'Microphone',   line2: 'Entrée Son',   emoji: '🎙️' },
  ecran:       { line1: 'Écran',        line2: 'Sortie Pixels', emoji: '🖥️' },
  hautparleurs: { line1: 'Haut-Parleurs', line2: 'Sortie Audio',  emoji: '🔊' },
  imprimante:  { line1: 'Imprimante',   line2: 'Sortie Papier', emoji: '🖨️' },
  ram:         { line1: 'Mémoire RAM',  line2: 'Mémoire Vive Volatile', emoji: '💾' },
  cache:       { line1: 'Cache L2 (Interm.)', line2: 'Accès Direct CPU', emoji: '⚡' },
  cache_l1:    { line1: 'Cache L1 (1 cycle)', line2: 'Intégré au cœur CPU', emoji: '⚡' },
  cache_l2:    { line1: 'Cache L2 (3 cycles)', line2: 'Tampon d\'accès rapide', emoji: '⚡' },
  cache_l3:    { line1: 'Cache L3 (Partagé)', line2: 'Cache Global du CPU', emoji: '⚡' },
  rom:         { line1: 'Puce ROM',     line2: 'Code de Démarrage',   emoji: '🔒' },
  uc:          { line1: 'Unité de',     line2: 'Contrôle (UC)', emoji: '⚙️' },
  ual:         { line1: 'U.A.Logique',  line2: 'Calculs (UAL)',        emoji: '🧮' },
  registres:   { line1: 'Registres',    line2: 'Mémoire Instantanée',  emoji: '📂' },
  gpu:         { line1: 'Coprocesseur GPU', line2: 'Calculs Graphiques & 3D', emoji: '🖼️' },
  ssd_hdd:     { line1: 'Disque SSD',   line2: 'Stockage Permanent',  emoji: '🗄️' },
  stockage_ext: { line1: 'Clef USB',    line2: 'Stockage Amovible',  emoji: '🔌' },
  psu:         { line1: 'Bloc d\'Alimentation', line2: 'Courant Régulé (PSU)', emoji: '🔌' },
};

export const DETAILS: Record<string, { desc: string; role: string }> = {
  clavier:     { desc: "Clavier (Périphérique d'entrée)", role: "Convertit la pression physique des touches en code ASCII binaire stable (ex. 'A' = 01000001) avant de l'injecter sur le bus." },
  webcam:      { desc: "Webcam (Périphérique d'entrée)", role: "Capte l'onde lumineuse via un capteur CMOS et transforme l'image analogique en une matrice de valeurs numériques binaires." },
  souris:      { desc: "Souris (Périphérique d'entrée)", role: "Traduit les gestes de la main et les clics de boutons en deltas de mouvement (X, Y) acheminés vers le processeur." },
  microphone:  { desc: "Microphone (Périphérique d'entrée)", role: "Numérise les ondes sonores acoustiques de l'air en flux d'échantillons audionumériques PCM binaires." },
  ecran:       { desc: "Écran (Périphérique de sortie)", role: "Affiche l'information finale en convertissant la matrice binaire de la mémoire vidéo en impulsions lumineuses RVB." },
  hautparleurs: { desc: "Haut-Parleurs (Périphérique de sortie)", role: "Convertit le signal binaire décodé par le codec audio en ondes de pression acoustique compressibles." },
  imprimante:  { desc: "Imprimante (Périphérique de sortie)", role: "Matérialise l'information virtuelle stockée sur un support physique permanent (papier) à l'aide d'encre." },
  ram:         { desc: "Mémoire Vive (RAM)", role: "Mémoire de travail extrêmement rapide et volatile. Stocke temporairement les instructions des logiciels actifs et les calculs en cours." },
  cache:       { desc: "Mémoire Cache L1/L2/L3", role: "Mémoire ultra-rapide adjacente aux cœurs d'exécution pour limiter les temps d'accès coûteux à la RAM." },
  cache_l1:    { desc: "Mémoire Cache L1", role: "Cache de premier niveau intégré directement au cœur d'exécution. Accès quasi instantané en 1 seul cycle d'horloge." },
  cache_l2:    { desc: "Mémoire Cache L2", role: "Cache de deuxième niveau un peu plus spacieux pour éviter les attentes de livraison de la mémoire RAM." },
  cache_l3:    { desc: "Mémoire Cache L3", role: "Cache de troisième niveau partagé par tous les cœurs du CPU pour optimiser l'accès à la RAM." },
  rom:         { desc: "Puce ROM (BIOS/UEFI)", role: "Mémoire immuable non-volatile préservant les instructions fondamentales de démarrage (POST, amorçage) dès la mise sous tension." },
  uc:          { desc: "Unité de Contrôle (UC du CPU)", role: "Chef d'orchestre interne au CPU. Elle charge (Fetch), décode l'instruction binaire et pilote les autres unités." },
  ual:         { desc: "Unité Arithmétique & Logique (UAL)", role: "Cerveau mathématique du CPU. Réalise physiquement les additions, soustractions et comparaisons logiques (ET, OU, NON)." },
  registres:   { desc: "Registres Internes du CPU", role: "Emplacements mémoire haute vitesse intégrés (1 cycle d'horloge). Servent d'accumulateurs temporaires d'exécution." },
  gpu:         { desc: "Coprocesseur Graphique (GPU)", role: "Puce optimisée pour le calcul parallèle intensif des shaders et l'envoi direct des flux pixels vers l'écran." },
  ssd_hdd:     { desc: "Stockage Durable SSD / HDD", role: "Mémoire de masse non volatile. Retient le système d'exploitation, les programmes et les fichiers même hors tension." },
  stockage_ext: { desc: "Stockage Externe (Clef USB / Carte SD)", role: "Support de stockage de masse amovible et portatif s'interconnectant à la carte mère via le bus universel." },
  psu:         { desc: "Bloc d'Alimentation électrique (PSU)", role: "Module d'alimentation convertissant le courant alternatif alternatif du secteur en tensions continues stables (3.3V, 5V, 12V)." },
  cpu:         { desc: "Processeur (CPU Central)", role: "Unité centrale de traitement combinant l'Unité de Contrôle, l'UAL, les Registres rapides et la mémoire Cache." },
};

export const BUS_LABELS: Record<string, { title: string; subtitle: string; type: BusType }> = {
  'kbd-ram': { title: "Bus de Données (Clavier)", subtitle: "Achemine les codes binaires saisis au clavier vers la RAM.", type: 'data' },
  'wcm-ram': { title: "Bus de Données (Webcam)", subtitle: "Transfère le flux vidéo numérisé de la webcam vers la RAM.", type: 'data' },
  'sor-ram': { title: "Bus de Données (Souris)", subtitle: "Transmet les coordonnées du curseur à la RAM.", type: 'data' },
  'mic-ram': { title: "Bus de Données (Microphone)", subtitle: "Achemine les flux audio numérisés vers la RAM.", type: 'data' },
  'ram-scr': { title: "Bus de Données (Écran)", subtitle: "Transfère les pixels d'affichage de la RAM vers l'écran.", type: 'data' },
  'ram-spk': { title: "Bus de Données (Haut-parleurs)", subtitle: "Envoie les échantillons audio de la RAM aux haut-parleurs.", type: 'data' },
  'ram-prn': { title: "Bus de Données (Imprimante)", subtitle: "Achemine les documents à imprimer de la RAM aux buses de l'imprimante.", type: 'data' },
  'reg-ram': { title: "Bus de Données Interne", subtitle: "Échange des données calculées entre les registres du CPU et la RAM.", type: 'data' },
  'ram-uc':  { title: "Bus d'Adresses (RAM ➔ UC)", subtitle: "Permet à l'Unité de Contrôle d'indiquer de quelle adresse RAM lire l'instruction.", type: 'addr' },
  'uc-reg':  { title: "Lignes de Contrôle", subtitle: "Sélectionne le registre cible pour l'exécution d'une instruction.", type: 'addr' },
  'uc-ual':  { title: "Lignage de Contrôle Interne", subtitle: "Envoie des instructions de calcul de l'UC vers l'UAL.", type: 'ctrl' },
  'ual-reg': { title: "Lignes de Contrôle et de Données", subtitle: "Enregistre le résultat de l'opération de l'UAL dans les registres.", type: 'ctrl' },
  'ram-cch': { title: "Bus de Données Cache", subtitle: "Liaison ultra-rapide entre la RAM et le bloc de mémoire Cache.", type: 'data' },
  'ssd-ram': { title: "Bus de Données (SSD)", subtitle: "Charge les fichiers et programmes du stockage non-volatile vers la RAM.", type: 'data' },
  'rom-cpu': { title: "Liaison de Boot", subtitle: "Transfère les instructions de démarrage (BIOS) de la ROM au CPU.", type: 'data' },
  'gpu-cpu': { title: "Bus de Coprocesseur", subtitle: "Liaison de commande haute vitesse entre le CPU et le GPU.", type: 'data' },
  'gpu-scr': { title: "Canal Écran Direct (Pixel Pipeline)", subtitle: "Transfère directement les graphiques du GPU vers l'écran.", type: 'data' },
  'psu-cpu': { title: "Ligne d'Alimentation", subtitle: "Achemine l'énergie électrique régulée du bloc secteur vers le CPU.", type: 'ctrl' },
  'rom-ram': { title: "Liaison de Boot RAM", subtitle: "Charge le micro-code BIOS en RAM active lors de la mise sous tension.", type: 'data' }
};
