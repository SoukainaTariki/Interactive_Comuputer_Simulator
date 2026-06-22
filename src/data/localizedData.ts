import { SupportedLang } from './translations';
import { ComputerComponentType } from './componentsData';
import { ScenarioType, scenariosData } from './scenariosData';
import { QuestionType } from './quizData';
import { BusType } from './diagramData';

// --- (1) COMPONENTS DATA LOCALIZATION ---
export function getLocalizedComponents(lang: SupportedLang): ComputerComponentType[] {
  if (lang === 'fr') {
    return [
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
  }

  const translations: Record<Exclude<SupportedLang, 'fr'>, Record<string, Partial<ComputerComponentType>>> = {
    en: {
      clavier: {
        name: 'Keyboard',
        role: 'Allows the user to enter text, characters or commands, sending instructions to the computer.',
        example: 'When you press the "A" key, a binary electrical signal is generated.',
        simpleExplanation: 'It is the main input device that converts your physical keystrokes into understandable computer actions.',
        pourquoiImportant: 'It is indispensable for expressing thoughts and giving orders to the machine. Without it, you cannot write emails or compute operations.'
      },
      bus: {
        name: 'Data bus',
        role: 'Transports electrical data signals at very high speeds between motherboards components.',
        example: 'Carrying the keyboard key signal to RAM, then to the processor.',
        simpleExplanation: 'The Bus is the computer\'s highway. It links microchips so they can instantly exchange data.',
        pourquoiImportant: 'Without buses, all computer hardware components would remain completely isolated from one another.'
      },
      ram: {
        name: 'RAM (Main Memory)',
        role: 'Temporarily stores data and program instructions currently being executed.',
        example: 'Provisional saving of word documents until you hit the Save button.',
        simpleExplanation: 'It is the ultra-fast temporary working memory of the PC. It is completely cleared once power is shut off.',
        pourquoiImportant: 'It avoids the CPU having to fetch data from the very slow local mass storage disks, rendering software executions instant.'
      },
      cpu: {
        name: 'CPU (Processor)',
        role: 'Reads instructions, executes computations, performs binary operations, and coordinates the whole computer.',
        example: 'Processing the opening of a holiday photo or calculating physical positions.',
        simpleExplanation: 'It is the true "brain" or engine of the computer.',
        pourquoiImportant: 'Without it, a computer is just static metal and plastic: no calculation task or logical sequence can initiate.'
      },
      uc: {
        name: 'CU (Control Unit)',
        role: 'Located inside the CPU, it fetches, decodes, and schedules the execution of each instruction.',
        example: 'Decoding a keystroke as an alphanumeric signal and ordering the graphic monitor to light up corresponding pixels.',
        simpleExplanation: 'It is the main orchestra conductor inside the processor: it knows who must react and when.',
        pourquoiImportant: 'It synchronizes all motherboard components to the exact speed of the clock, preventing crashes.'
      },
      ual: {
        name: 'ALU (Arithmetic Logic Unit)',
        role: 'Performs arithmetic (additions/subtractions) and resolves logical comparisons (True/False states).',
        example: 'Solving the binary operation corresponding to 2 + 3 to return the value 5.',
        simpleExplanation: 'It is the core hardwired calculator inside the processor, designated for mathematical operations.',
        pourquoiImportant: 'Any software application is a series of infinite mathematical sums and decisions processed exclusively by the ALU.'
      },
      stockage: {
        name: 'Storage (SSD / HDD / USB)',
        role: 'Safely records your files, media, applications and OS permanently, even when the computer is off.',
        example: 'Saving a school project or vacation photo to the SSD disk.',
        simpleExplanation: 'It is the masses database storage, completely stable, needing no continuous electric power.',
        pourquoiImportant: 'It ensures that your files, software packages and school works remain safe for your next boot.'
      },
      ecran: {
        name: 'Screen / Monitor',
        role: 'Smoothly outputs visual frames computed by the processing units.',
        example: 'Displaying the correct shape of letter "A" or showing mathematical sums.',
        simpleExplanation: 'It is the primary visual output interface used to view information.',
        pourquoiImportant: 'It translates millions of invisible digital electronic signals moving in the circuits into clear colored pictures.'
      }
    },
    ar: {
      clavier: {
        name: 'لوحة المفاتيح',
        role: 'تتيح للمستخدم إدخال النصوص والرموز والأوامر وإرسال التعليمات إلى جهاز الكمبيوتر.',
        example: 'عندما تضغط على المفتاح "A"، يتم توليد إشارة كهربائية ثنائية.',
        simpleExplanation: 'إنها أداة الإدخال الرئيسية التي تحول ضغطاتك الحركية إلى إشارات تفهمها الآلة.',
        pourquoiImportant: 'جهاز لا غنى عنه للتعبير عن أفكارك وإصدار الأوامر للآلة. بدونها لا يمكنك كتابة رسائل أو إدخال عمليات حسابية.'
      },
      bus: {
        name: 'ناقل البيانات',
        role: 'ينقل إشارات البيانات الكهربائية بسرعة فائقة بين كافة المكونات الإلكترونية على اللوحة الأم.',
        example: 'توجيه إشارة مفتاح لوحة المفاتيح إلى ذاكرة الرام ثم إلى المعالج.',
        simpleExplanation: 'الناقل بمثابة الطريق السريع للكمبيوتر. يربط الرقائق الإلكترونية لتبادل المعلومات.',
        pourquoiImportant: 'بدون النواقل، ستبقى جميع المكونات المادية للكمبيوتر معزولة تماماً عن بعضها ولن يحدث ترابط.'
      },
      ram: {
        name: 'الذاكرة العشوائية (RAM)',
        role: 'تخزن مؤقتاً البيانات والتعليمات للبرامج الجاري تشغيلها وتنفيذها حالياً.',
        example: 'الاحتفاظ بنص الوثيقة مؤقتاً إلى حين الضغط على زر الحفظ الدائم.',
        simpleExplanation: 'ذاكرة العمل فائقة السرعة للكمبيوتر، وتفقد جميع محتوياتها فور إيقاف تشغيل الجهاز.',
        pourquoiImportant: 'تمنح المعالج وصولاً فورياً للمعلومات بدلاً من جلبها من القرص الصلب البطيء، مما يسرع تشغيل البرامج.'
      },
      cpu: {
        name: 'المعالج (CPU)',
        role: 'يقرأ تعليمات البرامج، ينفذها، ينجز المعالجات والعمليات الحسابية وينسق عمل جهاز الحاسوب كلوحة فنية متكاملة.',
        example: 'معالجة عملية فتح صورة أو حساب إحداثيات ومواقع الأبعاد الثلاثية.',
        simpleExplanation: 'إنه بمثابة "العقل" والمحرك الرئيسي الحقيقي لأي كمبيوتر.',
        pourquoiImportant: 'لولا المعالج، لكان الكمبيوتر مجرد كومة خاملة من البلاستيك والمعادن؛ فلا يمكن لأي عملية حسابية أن تبدأ.'
      },
      uc: {
        name: 'وحدة التحكم (UC)',
        role: 'تقع داخل المعالج، وتقوم بقلب التعليمات وفك تشفيرها وتنظيم ترتيب تنفيذ المهام.',
        example: 'فهم أن ضغطة لوحة المفاتيح هي أمر عرض بالكتابة وإرسال إشعار للشاشة لإضاءة بكسلاتها.',
        simpleExplanation: 'قائد الأوركسترا والمشرف الأعلى للعمليات داخل المعالج؛ يعرف بالتحديد من يفعل ماذا ومتى.',
        pourquoiImportant: 'تنسق بشكل مثالي عمل جميع الرقائق على نبضات ساعة التوقيت، مما يضمن استقرار وثبات النظام.'
      },
      ual: {
        name: 'وحدة الحساب والمنطق (UAL)',
        role: 'تجري العمليات الحسابية كالجمع والطرح وتحل القواعد اللوجستية المنطقية (مقارنات صح/خطأ).',
        example: 'حل عملية إضافة 2 + 3 برمجياً وبثنائية كهربائية لإرجاع النتيجة 5.',
        simpleExplanation: 'الحاسبة البحتة والمحرك الرياضي الأساسي المدمج داخل المعالج للعمليات المنطقية.',
        pourquoiImportant: 'كل تطبيق حاسوبي هو في الواقع عبارة عن سلسلة لا نهائية من الإضافات والقرارات المنطقية التي تتكفل بها هذه الوحدة.'
      },
      stockage: {
        name: 'وحدة التخزين (SSD / HDD)',
        role: 'تحفظ برامجك، ملفاتك، صورك ونظام التشغيل بشكل دائم ومستقر حتى بعد انقطاع التيار الكهربائي.',
        example: 'حفظ صورة عائلية أو تخزين واجب مادة علوم الحاسب بصفة مستديمة.',
        simpleExplanation: 'مستودع تخزين دائم وآمن للملفات والبرامج، لا يتطلب طاقة كهربائية لبقاء البيانات.',
        pourquoiImportant: 'تضمن بقاء جميع ذكرياتك وملفاتك ومشاريعك الدراسية جاهزة ومتاحة عند تشغيل الكمبيوتر في المرة القادمة.'
      },
      ecran: {
        name: 'الشاشة',
        role: 'تعرض النتائج النهائية لعمليات المعالجة التي يقوم بها الكمبيوتر بصورة مرئية وسلسة.',
        example: 'رسم وتلوين البكسلات المقابلة للحرف "A" أو عرض تفاصيل عملية الحساب.',
        simpleExplanation: 'أداة الإخراج المرئي الأساسية التي تمكنك من التفاعل وعرض محتوى حاسوبك.',
        pourquoiImportant: 'تترجم ملايين الإشارات الإلكترونية غير المرئية الجارية في الدارات إلى صور ثابتة ومتحركة واضحة للعين البشرية.'
      }
    },
    es: {
      clavier: {
        name: 'Teclado',
        role: 'Permite al usuario ingresar textos, caracteres o comandos y mandar instrucciones a la computadora.',
        example: 'Al presionar la tecla "A", se genera una señal eléctrica binaria.',
        simpleExplanation: 'Es la herramienta de entrada principal que convierte sus pulsaciones físicas en señales comprensibles por la máquina.',
        pourquoiImportant: 'Es el periférico indispensable para expresar tus pensamientos y órdenes al ordenador. Sin él, no podrías escribir emails.'
      },
      bus: {
        name: 'Bus de datos',
        role: 'Transporta las señales eléctricas de datos a muy alta velocidad entre todos los componentes de la placa madre.',
        example: 'Dirigir la señal de la tecla pulsada al RAM y luego al procesador.',
        simpleExplanation: 'El Bus es la autopista del PC. Conecta los chips para que puedan intercambiar información.',
        pourquoiImportant: 'Sin buses, todos los componentes lógicos de la computadora quedarían aislados y ninguna comunicación sería posible.'
      },
      ram: {
        name: 'RAM (Memoria Activa)',
        role: 'Almacena temporalmente los datos y las instrucciones de los programas que se están ejecutando activamente.',
        example: 'Guardar provisionalmente el texto de un trabajo escolar antes de hacer clic en Guardar.',
        simpleExplanation: 'Es la memoria de trabajo ultra-rápida del PC. Se borra por completo al apagar el equipo.',
        pourquoiImportant: 'Evita que la CPU tenga que buscar los datos en el disco de almacenamiento, que es extremadamente lento.'
      },
      cpu: {
        name: 'CPU (Procesador)',
        role: 'Lee las instrucciones del software, las ejecuta, efectúa los cálculos y coordina el funcionamiento de toda la máquina.',
        example: 'Procesar la apertura de una foto o calcular la física de un movimiento gráfico.',
        simpleExplanation: 'Es el verdadero "cerebro" o motor central de la computadora.',
        pourquoiImportant: 'Sin él, el ordenador solo sería un montón inerte de plástico y metal: ninguna tarea de cálculo podría arrancar.'
      },
      uc: {
        name: 'UC (Unidad de Control)',
        role: 'Situada dentro del CPU, carga, decodifica y organiza el orden de ejecución de cada instrucción de trabajo.',
        example: 'Comprender que el clic de mouse es una orden y comandar a la pantalla que encienda los píxeles adecuados.',
        simpleExplanation: 'Es el director de orquesta supremo dentro del procesador: sabe quién debe actuar y en qué momento.',
        pourquoiImportant: 'Sincroniza todas las piezas a la velocidad de los ciclos del reloj, garantizando la estabilidad operativa.'
      },
      ual: {
        name: 'ALU (Unidad Aritmética Lógica)',
        role: 'Realiza sumas, restas de números y resuelve las reglas lógicas (comparación de valores Verdadero/Falso).',
        example: 'Resolver matemáticamente el cálculo binario 2 + 3 para devolver el resultado final de 5.',
        simpleExplanation: 'Es la calculadora pura integrada en el procesador, destinada a las matemáticas fundamentales.',
        pourquoiImportant: 'Cualquier programa es una secuencia infinita de sumas y toma de decisiones lógicas que solo de la ALU sabe resolver.'
      },
      stockage: {
        name: 'Almacenamiento (HDD / SSD)',
        role: 'Conserva sus programas, archivos, fotos y sistema operativo de forma permanente, incluso después de apagar el equipo.',
        example: 'Guardar las fotos familiares o guardar un documento de texto de informática de manera indefinida.',
        simpleExplanation: 'Es la memoria masurable estable y duradera que no requiere corriente eléctrica.',
        pourquoiImportant: 'Garantiza que tus recuerdos, proyectos escolares y programas sigan disponibles en el próximo encendido.'
      },
      ecran: {
        name: 'Pantalla / Monitor',
        role: 'Muestra fluida y visualmente el resultado final del procesamiento que ejecuta el ordenador.',
        example: 'Dibujar la letra "A" en pantalla o reflejar el resultado de una operación aritmética.',
        simpleExplanation: 'Es el periférico de salida visual indispensable para interactuar con la computadora.',
        pourquoiImportant: 'Traduce instantáneamente los millones de señales electrónicas que recorren el hardware en imágenes claras.'
      }
    },
    de: {
      clavier: {
        name: 'Tastatur',
        role: 'Ermöglicht dem Benutzer die Eingabe von Texten, Zeichen oder Befehlen und sendet diese Signale an den Rechner.',
        example: 'Wenn Sie die Taste "A" drücken, wird ein binäres elektrisches Signal erzeugt.',
        simpleExplanation: 'Es ist das Haupteingabewerkzeug, das Ihre physischen Tastenschläge in maschinenlesbare Signale umwandelt.',
        pourquoiImportant: 'Das unverzichtbare Gerät, um dem Computer Befehle zu erteilen. Ohne Tastatur können Sie keine Textnachrichten schreiben.'
      },
      bus: {
        name: 'Datenbus',
        role: 'Überträgt elektrische Datensignale mit extrem hoher Geschwindigkeit zwischen allen Motherboard-Komponenten.',
        example: 'Befördern des Tastatursignals in den RAM und von dort ins Rechenwerk.',
        simpleExplanation: 'Der Bus ist die "Autobahn" des Computers. Er verbindet Chips, damit diese reibungslos Daten austauschen.',
        pourquoiImportant: 'Ohne Busse blieben alle Hardware-Komponenten des Computers isoliert und es gäbe keinerlei Kommunikation.'
      },
      ram: {
        name: 'RAM (Arbeitsspeicher)',
        role: 'Speichert flüchtig Daten und Befehle von Programmen, die aktuell ausgeführt werden.',
        example: 'Temporäres Ablegen des geschriebenen Textes in einem Tabellenblatt, solange Sie nicht auf Speichern geklickt haben.',
        simpleExplanation: 'Der superschnelle temporäre Arbeitspeicher des PCs. Er erlöscht vollständig, sobald der PC ausgeschaltet wird.',
        pourquoiImportant: 'Er erspart dem Prozessor den direkten Zugriff auf das langsame physische Laufwerk (SSD), was Softwarestarts extrem beschleunigt.'
      },
      cpu: {
        name: 'CPU (Prozessor)',
        role: 'Liest Programmbefehle ein, verarbeitet diese mathematisch, steuert alle Abläufe und koordiniert den Computer.',
        example: 'Auswerten des Öffnens einer Bilddatei oder Berechnen von physikalischen Bewegungen in 3D.',
        simpleExplanation: 'Das eigentliche elektrische "Gehirn" oder die Hauptantriebskraft des Computers.',
        pourquoiImportant: 'Ohne CPU wäre der Computer nur lebloses Plastik und Blech: keine Rechenaufgabe könnte gelöst werden.'
      },
      uc: {
        name: 'UC (Steuerwerk)',
        role: 'Befindet sich im Inneren der CPU; holt Befehle ein, dekodiert sie und organisiert den genauen Ablauf für alle anderen Einheiten.',
        example: 'Tastendrücke deuten und anweisen, dass bestimmte Pixel im Monitor rot leuchten sollen.',
        simpleExplanation: 'Der oberste Orchesterdirigent im Prozessor: Er weiß genau, wer wann welche Aktion ausführen muss.',
        pourquoiImportant: 'Taktet alle Chips im Einklang des Taktsignalgebers und garantiert so den absturzfreien Ablauf.'
      },
      ual: {
        name: 'ALU (Rechenwerk)',
        role: 'Führt mathematische Additionen, Subtraktionen und logische Vergleiche (Richtig/Falsch-Entscheidungen) durch.',
        example: 'Mathematisches Lösen der Binärrechnung 2 + 3, um das Resultat 5 an das System zurückzugeben.',
        simpleExplanation: 'Der im Prozessor eingebaute reine Rechenchip für grundlegende mathematische Logik.',
        pourquoiImportant: 'Jedes Softwareprogramm ist im Kern eine endlose Folge von Additionen und Vergleichen, die nur das Rechenwerk lösen kann.'
      },
      stockage: {
        name: 'Massenspeicher (SSD / HDD)',
        role: 'Sichert Dokumente, Applikationen, Mediendateien und das Betriebssystem permanent, auch ohne Stromversorgung.',
        example: 'Dauerhaftes Ablegen von Urlaubsfotos oder Schulprojekten auf dem Flash-Laufwerk.',
        simpleExplanation: 'Der stabile und dauerhafte Großspeicher, der komplett ohne ständige Zufuhr von Netzstrom auskommt.',
        pourquoiImportant: 'Stellt sicher, dass all Ihre Dokumente, Backups und installierten Programme beim nächsten Einschalten bereitstehen.'
      },
      ecran: {
        name: 'Bildschirm / Monitor',
        role: 'Stellt das Endprodukt aller Datenberechnungen flüssig und visuell für den Menschen dar.',
        example: 'Zeichnen der Form des Buchstabens "A" oder Darstellen von grafischen Fenstern.',
        simpleExplanation: 'Das visuelle Ausgabegerät, das unentbehrlich für den Dialog mit der Maschine ist.',
        pourquoiImportant: 'Übersetzt die Millionen unsichtbaren elektrischen Ladungsveränderungen im PC in klare Bilder.'
      }
    }
  };

  const baseComponents = [
    { id: 'clavier', name: 'Clavier', category: 'entree' as const, role: '', example: '', simpleExplanation: '', pourquoiImportant: '', color: 'border-emerald-200 bg-emerald-50 text-emerald-800' },
    { id: 'bus', name: 'Bus de données', category: 'liaison' as const, role: '', example: '', simpleExplanation: '', pourquoiImportant: '', color: 'border-yellow-200 bg-yellow-50 text-yellow-800' },
    { id: 'ram', name: 'RAM (Mémoire Vive)', category: 'stockage' as const, role: '', example: '', simpleExplanation: '', pourquoiImportant: '', color: 'border-blue-200 bg-blue-50 text-blue-800' },
    { id: 'cpu', name: 'CPU (Processeur)', category: 'traitement' as const, role: '', example: '', simpleExplanation: '', pourquoiImportant: '', color: 'border-rose-200 bg-rose-50 text-rose-800' },
    { id: 'uc', name: 'UC (Unité de Contrôle)', category: 'traitement' as const, role: '', example: '', simpleExplanation: '', pourquoiImportant: '', color: 'border-purple-200 bg-purple-50 text-purple-800' },
    { id: 'ual', name: 'UAL (Unité d\'Arithmétique et de Logique)', category: 'traitement' as const, role: '', example: '', simpleExplanation: '', pourquoiImportant: '', color: 'border-pink-200 bg-pink-50 text-pink-800' },
    { id: 'stockage', name: 'Stockage (Disque Dur / SSD / Clé USB)', category: 'stockage' as const, role: '', example: '', simpleExplanation: '', pourquoiImportant: '', color: 'border-cyan-200 bg-cyan-50 text-cyan-800' },
    { id: 'ecran', name: 'Écran', category: 'sortie' as const, role: '', example: '', simpleExplanation: '', pourquoiImportant: '', color: 'border-indigo-200 bg-indigo-50 text-indigo-800' }
  ];

  const pack = translations[lang as Exclude<SupportedLang, 'fr'>];
  return baseComponents.map(comp => ({
    ...comp,
    name: pack[comp.id]?.name || comp.name,
    role: pack[comp.id]?.role || '',
    example: pack[comp.id]?.example || '',
    simpleExplanation: pack[comp.id]?.simpleExplanation || '',
    pourquoiImportant: pack[comp.id]?.pourquoiImportant || ''
  }));
}

// --- (2) DIAGRAM DATA LOCALIZATION ---
const labelsTranslations: Record<Exclude<SupportedLang, 'fr'>, Record<string, { line1: string; line2: string }>> = {
  en: {
    webcam: { line1: 'Webcam', line2: 'Video Input' },
    clavier: { line1: 'Keyboard', line2: 'Input Text' },
    souris: { line1: 'Mouse', line2: 'Input Click' },
    microphone: { line1: 'Microphone', line2: 'Sound Input' },
    ecran: { line1: 'Monitor Screen', line2: 'Output Pixels' },
    hautparleurs: { line1: 'Speakers', line2: 'Audio Output' },
    imprimante: { line1: 'Printer', line2: 'Paper Output' },
    ram: { line1: 'RAM Memory', line2: 'Volatile Active Memory' },
    cache: { line1: 'L2 Cache (Interm.)', line2: 'Direct CPU Access' },
    cache_l1: { line1: 'L1 Cache (1 cycle)', line2: 'Built-in CPU core' },
    cache_l2: { line1: 'L2 Cache (3 cycles)', line2: 'Fast access buffer' },
    cache_l3: { line1: 'L3 Cache (Shared)', line2: 'Global CPU buffer' },
    rom: { line1: 'ROM Flash-chip', line2: 'Startup Core Code' },
    uc: { line1: 'Control', line2: 'Unit (CU)' },
    ual: { line1: 'Arithmetic', line2: 'Logic Unit (ALU)' },
    registres: { line1: 'Registers', line2: 'Instant Core Buffer' },
    gpu: { line1: 'Co-processor GPU', line2: 'Graphics & 3D Shaders' },
    ssd_hdd: { line1: 'SSD / HDD disk', line2: 'Massive Storage' },
    stockage_ext: { line1: 'USB Key', line2: 'Removable Storage' },
    psu: { line1: 'Alimentation PSU', line2: 'Regulated Current' },
  },
  ar: {
    webcam: { line1: 'كاميرا ويب', line2: 'مدخل فيديو كاميرا' },
    clavier: { line1: 'لوحة المفاتيح', line2: 'مدخلات الكتابة والسحب' },
    souris: { line1: 'الفأرة (ماوس)', line2: 'مدخل النقرات والتنقل' },
    microphone: { line1: 'الميكروفون', line2: 'مدخل الصوت والذبذبات' },
    ecran: { line1: 'الشاشة التفاعلية', line2: 'مخرجات تلوين البكسلات' },
    hautparleurs: { line1: 'مكبر الصوت', line2: 'مخرجات الأمواج الصوتية' },
    imprimante: { line1: 'المنسخة / الطابعة', line2: 'مخرجات الأوراق والتحبير' },
    ram: { line1: 'الذاكرة العشوائية RAM', line2: 'ذاكرة مؤقتة لعمل النظام' },
    cache: { line1: 'الذاكرة المخبئية L2', line2: 'وصول مباشر سريع للمخ' },
    cache_l1: { line1: 'مخبئية L1 (دورة واحدة)', line2: 'مدمجة كلياً بقلب المعالج' },
    cache_l2: { line1: 'مخبئية L2 (3 دورات)', line2: 'ذاكرة تخزين وسيطة سريعة' },
    cache_l3: { line1: 'مخبئية L3 (مشتركة)', line2: 'التخزين المخبئي العام' },
    rom: { line1: 'رقاقة الذاكرة الميتة ROM', line2: 'كود بدء التشغيل BIOS' },
    uc: { line1: 'وحدة التحكم', line2: 'التوجيه والإشراف (UC)' },
    ual: { line1: 'الحساب والمنطق', line2: 'ماتور الرياضيات (ALU)' },
    registres: { line1: 'المسجلات فائقة السرعة', line2: 'التخزين المباشر اللحظي' },
    gpu: { line1: 'معالج الرسوميات GPU', line2: 'الرسم وصور ثلاثية الأبعاد' },
    ssd_hdd: { line1: 'قرص التخزين SSD', line2: 'حفظ مستديم آمن للملفات' },
    stockage_ext: { line1: 'مفتاح الفلاش USB', line2: 'تخزين خارجي متنقل' },
    psu: { line1: 'مزود الطاقة الكهربائي', line2: 'تنظيم تيار اللوحة الأم' },
  },
  es: {
    webcam: { line1: 'Webcam', line2: 'Entrada de Video' },
    clavier: { line1: 'Teclado', line2: 'Entrada de Texto' },
    souris: { line1: 'Ratón / Mouse', line2: 'Entrada de Clic' },
    microphone: { line1: 'Micrófono', line2: 'Entrada de Audio' },
    ecran: { line1: 'Monitor Pantalla', line2: 'Salida de Píxeles' },
    hautparleurs: { line1: 'Altavoces', line2: 'Salida de Audio' },
    imprimante: { line1: 'Impresora', line2: 'Salida en Papel' },
    ram: { line1: 'Memoria RAM', line2: 'Memoria Volátil Activa' },
    cache: { line1: 'Memoria Caché L2', line2: 'Acceso Directo CPU' },
    cache_l1: { line1: 'Caché L1 (1 ciclo)', line2: 'Integrado en el núcleo' },
    cache_l2: { line1: 'Caché L2 (3 ciclos)', line2: 'Tampón de acceso rápido' },
    cache_l3: { line1: 'Caché L3 (Compartido)', line2: 'Caché global del CPU' },
    rom: { line1: 'Chip ROM BIOS', line2: 'Código de Arranque Inicial' },
    uc: { line1: 'Unidad de', line2: 'Control (UC)' },
    ual: { line1: 'U. Aritmética', line2: 'Lógica (ALU)' },
    registres: { line1: 'Registros', line2: 'Memoria Instantánea' },
    gpu: { line1: 'Coprocesador GPU', line2: 'Shaders y Gráficos 3D' },
    ssd_hdd: { line1: 'Disco SSD / HDD', line2: 'Almacenamiento Estable' },
    stockage_ext: { line1: 'Memoria USB', line2: 'Soporte Extraíble' },
    psu: { line1: 'Alimentación PSU', line2: 'Corriente Eléctrica Regulada' },
  },
  de: {
    webcam: { line1: 'Webcam', line2: 'Video-Eingabe' },
    clavier: { line1: 'Tastatur', line2: 'Eingabe Text' },
    souris: { line1: 'Maus', line2: 'Eingabe Klick' },
    microphone: { line1: 'Mikrofon', line2: 'Ton-Eingabe' },
    ecran: { line1: 'Monitor', line2: 'Pixel-Ausgabe' },
    hautparleurs: { line1: 'Lautsprecher', line2: 'Audio-Ausgabe' },
    imprimante: { line1: 'Drucker', line2: 'Papier-Ausgabe' },
    ram: { line1: 'RAM-Speicher', line2: 'Flüchtiger Arbeitsspeicher' },
    cache: { line1: 'L2-Cache (Schnell)', line2: 'Direkter CPU-Zugriff' },
    cache_l1: { line1: 'L1 Cache (1 Takt)', line2: 'Im CPU-Kern integriert' },
    cache_l2: { line1: 'L2 Cache (3 Takte)', line2: 'Schneller Zwischenspeicher' },
    cache_l3: { line1: 'L3 Cache (Shared)', line2: 'Globaler CPU-Datenpuffer' },
    rom: { line1: 'ROM BIOS Chip', line2: 'Ältester Startcode' },
    uc: { line1: 'Steuerwerk', line2: 'Leitwerk (UC)' },
    ual: { line1: 'Rechenwerk', line2: 'Mathematik-ALU' },
    registres: { line1: 'Register', line2: 'Direktpuffer im Kern' },
    gpu: { line1: 'Grafikchip GPU', line2: 'Bild- und 3D-Berechnung' },
    ssd_hdd: { line1: 'SSD / HDD Platte', line2: 'Dauerspeicherort' },
    stockage_ext: { line1: 'USB-Stick', line2: 'Wechselspeicherschlüssel' },
    psu: { line1: 'Netzteil PSU', line2: 'Regulierter Strom' },
  }
};

export function getLocalizedLabels(lang: SupportedLang, baseLabels: Record<string, { line1: string; line2: string; emoji: string }>) {
  if (lang === 'fr') return baseLabels;
  const pack = labelsTranslations[lang as Exclude<SupportedLang, 'fr'>];
  const output: Record<string, { line1: string; line2: string; emoji: string }> = {};
  for (const key of Object.keys(baseLabels)) {
    output[key] = {
      ...baseLabels[key],
      line1: pack[key]?.line1 || baseLabels[key].line1,
      line2: pack[key]?.line2 || baseLabels[key].line2,
    };
  }
  return output;
}

const detailsTranslations: Record<Exclude<SupportedLang, 'fr'>, Record<string, { desc: string; role: string }>> = {
  en: {
    clavier: { desc: "Keyboard (Input device)", role: "Transforms physical keys into stable binary ASCII codes (e.g. 'A' = 01000001) before putting it on the data bus." },
    webcam: { desc: "Webcam (Input device)", role: "Captures light frequencies via CMOS sensors and converts graphic values to binary streams." },
    souris: { desc: "Mouse (Input device)", role: "Translates hand movements and button clicks to coordinate signals (X, Y) streamed to CPU." },
    microphone: { desc: "Microphone (Input device)", role: "Digitizes speech waves from the atmosphere to standard acoustic binary streams." },
    ecran: { desc: "Monitor (Output device)", role: "Draws visual pixels by converting binary matrices of VRAM memory directly to visible screen RGB lights." },
    hautparleurs: { desc: "Speakers (Output device)", role: "Transforms calculated audio arrays into acoustic air pressure sounds." },
    imprimante: { desc: "Printer (Output device)", role: "Materializes binary digital document files on physical paper grids using precise ink jets." },
    ram: { desc: "Main Memory (RAM)", role: "Active workspace of high speed. Keeps programs instructions and computation operands while running, erased instantly on power loss." },
    cache: { desc: "Cache L1/L2/L3 Memory", role: "Super fast memory located adjacent to CPU calculation cores, saving access wait times for RAM." },
    cache_l1: { desc: "L1 Cache memory", role: "Integrated inside the CPU core. Operates at actual core clock in 1 cycle for immediate registers storage." },
    cache_l2: { desc: "L2 Cache memory", role: "Mid-sized fast buffer preventing logical blocks waits from core RAM." },
    cache_l3: { desc: "L3 Cache memory", role: "Shared among execution cores of the processor to keep common code blocks highly available." },
    rom: { desc: "ROM memory chip (BIOS/UEFI)", role: "Immutable non-volatile storage containing the basic boot steps (POST, device checks) executed on power up." },
    uc: { desc: "Control Unit (CU inside CPU)", role: "Brain scheduler. It fetches binary program lines, decodes operations, and triggers execution in the other components." },
    ual: { desc: "Arithmetic Logic Unit (ALU)", role: "Math solver of the CPU. Executes basic binary additions, subtractions, and logical comparisons (AND, OR, NOT)." },
    registres: { desc: "Internal CPU Registers", role: "Ultra-fast tiny cells (1 clock speed) keeping intermediate math parameters on hand." },
    gpu: { desc: "Graphics Processing Unit (GPU)", role: "Highly parallel chip custom-tailored for 3D shaders, graphic matrices, and pixel streams to monitor." },
    ssd_hdd: { desc: "Mass SSD/HDD storage", role: "Non-volatile permanent storage. Retains OS kernel, installed software, and user folders indefinitely." },
    stockage_ext: { desc: "External storage (USB drive)", role: "Removable memory module that connects to motherboard ports via standard USB bus protocols." },
    psu: { desc: "Power Supply Unit (PSU)", role: "Power converter module that takes AC main voltage and scales it to stable low-voltage DC channels (3.3V, 5V, 12V)." },
    cpu: { desc: "Central Processor (CPU)", role: "Central intelligence processing unit assembling the Control Unit, the ALU, cache buffers, and immediate registers." },
  },
  ar: {
    clavier: { desc: "لوحة المفاتيح (جهاز إدخال)", role: "تحول الضغط الميكانيكي للمفاتيح على الأزرار إلى أكواد أسكي ثنائية مستقرة (مثال: 'A' = 01000001) قبل حقنها في ناقل البيانات." },
    webcam: { desc: "كاميرا ويب (جهاز إدخال)", role: "تلتقط الموجات الضوئية عبر مستشعر CMOS وتحول الصورة الأنالوج إلى مصفوفات قيم ثنائية متدفقة باستمرار." },
    souris: { desc: "الفأرة (جهاز إدخال)", role: "ترجم حركات القبضة وضغطات الأزرار لعناوين إحداثيات ثنائية ترسل للمعولج المركزي فورا." },
    microphone: { desc: "الميكروفون (جهاز إدخال)", role: "يقوم بتحويل الأمواج الصوتية الفيزيائية في الهواء لبيانات بث رقمية تفهمها رقاقة معالجة الصوت." },
    ecran: { desc: "الشاشة اللوحية (جهاز إخراج)", role: "تعرض المعلومات النهائية بتحويل مصفوفة الألوان الرقمية في كرت الشاشة إلى نبضات ضوئية ملونة." },
    hautparleurs: { desc: "مكبرات الصوت (جهاز إخراج)", role: "تستقبل الإشارات الرقمية اللحظية لملف الصوت وتحولها لأمواج ضغط هوائية فيزيائية تسمعها الأذن." },
    imprimante: { desc: "الطابعة الحبرية (جهاز إخراج)", role: "تجسد ملف النصوص والصور من بيئة الكمبيوتر الافتراضية لأوراق ورقية حقيقية عبر رش الحبر." },
    ram: { desc: "الذاكرة العشوائية النشطة (RAM)", role: "ذاكرة عمل فائقة السرعة ومتطايرة. تحفظ مؤقتا الأكواد والتطبيقات النشطة والعمليات الآنية، وتفرغ كليا بدون طاقة." },
    cache: { desc: "الذاكرة المخبئية السريعة L1/L2/L3", role: "ذاكرة فائقة السرعة تقع بجوار نوى المعالجة مباشرة لتفادي بطء جلب واستيراد القيم من الرام البعيدة." },
    cache_l1: { desc: "الذاكرة المخبئية L1", role: "متواجدة داخل نوى المعالجة بدورة معالجة واحدة فقط (طاقة مطلقة للسرعة اللحظية)." },
    cache_l2: { desc: "الذاكرة المخبئية L2", role: "ذاكرة وسيطة سريعة لحفظ كتل الأكواد المتكررة لتسريع الوصول وتجنب بطء الرام." },
    cache_l3: { desc: "الذاكرة المخبئية L3", role: "مخبئية مشتركة بين كافة أنوية المعالج لتخزين البيانات المشتركة للنظام." },
    rom: { desc: "رقاقة البيوس الصلبة (ROM BIOS)", role: "ذاكرة جامدة مستقيمة ومحفوظة مسبقا من المصنع تحمل الخطوات الجيولوجية لبدء الفحص والتشغيل للجهاز." },
    uc: { desc: "وحدة التحكم والجدولة (UC)", role: "مهندس المعالجة وموزع المهام؛ تجلب كود البرنامج من الرام، تفمه وتفكه وتوجه العمل لرقائق الحاسب." },
    ual: { desc: "وحدة الحساب والمنطق (ALU)", role: "محرك الرياضيات داخل المعالج. تنفذ كهربائيا عمليات الجمع والطرح بوابات منطقية (ET, OU, NON)." },
    registres: { desc: "مسجلات المعالج المركزية", role: "أسرع خلاية لتخزين البيانات مؤقتا على الإطلاق (دورة ساعة واحدة) تمسك المتغيرات أثناء الحساب الرياضي." },
    gpu: { desc: "معالج الرسوميات الثقيل (GPU)", role: "رقاقة مهيأة للعمل المتوازي المكثف جدا لحسابات المظهر ثنائي وثلاثي الأبعاد وتوجيه البكسلات للشاشة." },
    ssd_hdd: { desc: "القرص الصلب الثابت (SSD / HDD)", role: "مستودع البيانات الثابت. يحتفظ بنظام التشغيل، التطبيقات ومجلداتك الخاصة إلى ما لا نهاية بلا كهرباء." },
    stockage_ext: { desc: "التخزين المتنقل (USB Drive)", role: "شريحة ذاكرة فلاش خارجية سريعة الارتباط تتصل باللوحة الأم عبر نواقل الناقل العام للمدخل الخارجي." },
    psu: { desc: "وحدة إمداد الطاقة (PSU)", role: "تحول التيار المتردد المنزلي عالي الجهد لتيار مستمر منخفض الفولتية ومستقر لحماية القطع السيليكونية الحساسة." },
    cpu: { desc: "المعالج المركزي (CPU)", role: "الدماغ المركزي لنظام الحاسوب؛ يحوي وحدة التحكم، وحدة الحساب والمنطق والمسجلات السريعة." },
  },
  es: {
    clavier: { desc: "Teclado (Dispositivo de entrada)", role: "Convierte la presión de los botones mecánicos en código ASCII binario (ej. 'A' = 01000001) antes de enviarlo al bus de datos." },
    webcam: { desc: "Cámara Web (Dispositivo de entrada)", role: "Capta fotogramas usando sensores CMOS y procesa la información de luz en listas binarias." },
    souris: { desc: "Ratón / Mouse (Dispositivo de entrada)", role: "Traduce sus gestos y clics físicos en coordenadas flotantes enviadas a la CPU." },
    microphone: { desc: "Micrófono (Dispositivo de entrada)", role: "Convierte voz y ondas de sonido analógicas del aire en flujos digitales de audio PCM." },
    ecran: { desc: "Pantalla (Dispositivo de salida)", role: "Traduce las matrices binarias de píxeles que contiene la memoria gráfica en luces de colores visibles." },
    hautparleurs: { desc: "Altavoces (Dispositivo de salida)", role: "Convierte impulsos lógicos de la tarjeta de sonido en fluctuaciones físicas de aire audible." },
    imprimante: { desc: "Impresora (Dispositivo de salida)", role: "Plasma en papel físico las imágenes e informes que recibe desde la memoria de trabajo informática." },
    ram: { desc: "Memoria de Trabajo (RAM)", role: "Espacio de memoria de enorme velocidad pero de naturaleza volátil. Mantiene los procesos de software vigentes, se borra al apagar." },
    cache: { desc: "Memoria Caché L1/L2/L3", role: "Zona intermedia ultrarrápida situada muy cerca de los núcleos de cálculo para evitar las demoras del bus RAM." },
    cache_l1: { desc: "Memoria Caché L1", role: "Construida directamente en el núcleo del procesador. Funciona en 1 solo ciclo de reloj de manera casi instantánea." },
    cache_l2: { desc: "Memoria Caché L2", role: "Memoria intermedia veloz para evitar esperar la entrega de direcciones lentas de la RAM." },
    cache_l3: { desc: "Memoria Caché L3", role: "Caché de tercer nivel compartida por todos los núcleos encargados para simplificar datos repetidos." },
    rom: { desc: "Memoria de solo lectura (ROM BIOS)", role: "Registra permanentemente las pautas y el diagnóstico de hardware inicial que se corren en el microprocesador al encender." },
    uc: { desc: "Unidad de Control (UC del CPU)", role: "Planificador de instrucciones. Solicita los códigos de la memoria, los traduce lógicamente y dirige las piezas de la máquina." },
    ual: { desc: "Unidad Aritmética Lógica (ALU)", role: "Motor lógico matemático. Cuenta con circuitos de transistores capaces de resolver sumas, restas y booleanos." },
    registres: { desc: "Registros lógicos del CPU", role: "Ranuras de memoria ínfimas pero de extrema velocidad que salvaguardan variables inmediatas de cálculo." },
    gpu: { desc: "Procesador de Gráficos (GPU)", role: "Circuito altamente acoplado para cómputo masivo de geometrías, 3D y pixels para descargar la tarea del CPU." },
    ssd_hdd: { desc: "Disco de datos SSD / HDD", role: "Almacén masivo perdurable. Custodia el núcleo operativo, sus programas del PC y carpetas sin necesidad de energía." },
    stockage_ext: { desc: "Soporte Extraíble (USB Key)", role: "Cartucho de almacenamiento portátil que se interconecta en la tarjeta madre con el bus externo." },
    psu: { desc: "Unidad de Alimentación (PSU)", role: "Transformador que adecúa la corriente alterna doméstica de alto voltaje en tensiones estables idóneas (12V, 5V, 3V)." },
    cpu: { desc: "Procesador Principal (CPU)", role: "Célula inteligente que enlaza las capacidades de la Unidad de Control, la ALU matemática, registros y el caché." },
  },
  de: {
    clavier: { desc: "Tastatur (Eingabegerät)", role: "Wandelt physische Tastendrücke in stabile binäre ASCII-Zeichencodes (z.B. 'A' = 01000001) um, bevor sie an den Datenbus gesendet werden." },
    webcam: { desc: "Webcam (Eingabegerät)", role: "Erfasst optische Bilder über CMOS-Sensoren und wandelt sie in einen digitalen Bildstrom um." },
    souris: { desc: "Maus (Eingabegerät)", role: "Übersetzt Handbewegungen und Klicks in binäre Koordinatenwerte (X,Y) für den Prozessor." },
    microphone: { desc: "Mikrofon (Eingabegerät)", role: "Digitalisiert Luftschallwellen akustisch in unkomprimierte digitale Audio-Datenströme." },
    ecran: { desc: "Bildschirm (Ausgabegerät)", role: "Stellt die Grafikdaten dar, indem Binärmatrizes des Speichers in farbgetreue LED-Leuchtpixel übersetzt werden." },
    hautparleurs: { desc: "Lautsprecher (Ausgabegerät)", role: "Wandelt berechnete Signale der Soundkarte in hörbaren physikalischen Luftschall zurück." },
    imprimante: { desc: "Drucker (Ausgabegerät)", role: "Überträgt digitale Computerdokumente mittels präziser Tinten- oder Laserdüsen auf physisches Papier." },
    ram: { desc: "Arbeitsspeicher (RAM)", role: "Extrem schneller, flüchtiger Arbeitsspeicher. Hält Softwarebefehle im laufenden Betrieb betriebsbereit. Daten erlöschen ohne Strom." },
    cache: { desc: "Zwischenspeicher (L1/L2/L3 Cache)", role: "Puffer extrem hoher Geschwindigkeit nahe den CPU-Kernen, um langsame RAM-Suchzyklen zu überspringen." },
    cache_l1: { desc: "L1-Zwischenspeicher (L1 Cache)", role: "Direkt im innersten CPU-Kern verbaut. Wird mit Prozessortakt betrieben, ermöglicht Zugriff in nur 1 Zyklus." },
    cache_l2: { desc: "L2-Zwischenspeicher (L2 Cache)", role: "Größerer schneller Speicherblock nahe an den Kernen zur Vermeidung von Wartezeiten." },
    cache_l3: { desc: "L3-Zwischenspeicher (L3 Cache)", role: "Gemeinsamer Datenpuffer für alle Prozessorkerne zur Beschleunigung oft verwendeter Systemdateien." },
    rom: { desc: "Festwertspeicher (ROM BIOS)", role: "Dauerhafter Speicher für das älteste Startbetriebssystem (BIOS/UEFI) zur Durchführung von Systemchecks beim Starten." },
    uc: { desc: "Steuerwerk (CU innerhalb der CPU)", role: "Der Koordinator. Holt Binärbefehle aus dem Speicher, entschlüsselt sie logisch und steuert die Arbeitskomponenten an." },
    ual: { desc: "Rechenwerk (ALU)", role: "Der mathematische Kern der CPU. Löst elektrische Additionen, Subtraktionen und Vergleiche (UND, ODER, NICHT)." },
    registres: { desc: "Interne CPU-Register", role: "Winzige Speicherplätze extrem hoher Geschwindigkeit (1 Takt-Zyklus) für mathematische Zwischenvariablen." },
    gpu: { desc: "Grafikprozessor (GPU)", role: "Auf parallele Berechnungen optimierter Spezialchip für Bilder, 3D-Geometrie und pixelgenaue Monitordarstellung." },
    ssd_hdd: { desc: "Massenspeicher (SSD/HDD)", role: "Nichtflüchtiger Dauerspeicher. Verwahrt das Betriebssystem, Verzeichnisse und private Ordner absolut stromunabhängig." },
    stockage_ext: { desc: "Externer USB-Speicher", role: "Wechseldatenträger, der über standardisierte serielle Bussysteme direkt mit der Hauptplatine verbunden wird." },
    psu: { desc: "Stromnetzteil (PSU)", role: "Spannungswandler, der 230-Volt-Wechselstrom vom Netz in schadenfreie Gleichstromspannungen (12V, 5V, 3.3V) transformiert." },
    cpu: { desc: "Zentraler Prozessor (CPU)", role: "Zentrale Rechenstation, bestehend aus Steuerwerk, Rechenwerk, Registern und direktem Cachepuffer." },
  }
};

export function getLocalizedDetails(lang: SupportedLang, baseDetails: Record<string, { desc: string; role: string }>) {
  if (lang === 'fr') return baseDetails;
  const pack = detailsTranslations[lang as Exclude<SupportedLang, 'fr'>];
  const output: Record<string, { desc: string; role: string }> = {};
  for (const key of Object.keys(baseDetails)) {
    output[key] = {
      desc: pack[key]?.desc || baseDetails[key].desc,
      role: pack[key]?.role || baseDetails[key].role,
    };
  }
  return output;
}

const busLabelsTranslations: Record<Exclude<SupportedLang, 'fr'>, Record<string, { title: string; subtitle: string }>> = {
  en: {
    'kbd-ram': { title: "Data Bus (Keyboard)", subtitle: "Carries binary codes from keyboard keys directly to temporary RAM memory blocks." },
    'wcm-ram': { title: "Data Bus (Webcam)", subtitle: "Transfers digitized video stream packages from webcam to RAM." },
    'sor-ram': { title: "Data Bus (Mouse)", subtitle: "Transmits coordinate metrics of mouse clicks to RAM buffer structures." },
    'mic-ram': { title: "Data Bus (Microphone)", subtitle: "Transfers PCM digitizer sound arrays to RAM." },
    'ram-scr': { title: "Data Bus (Screen)", subtitle: "Sends graphical frames calculated in memory to monitor screen controller." },
    'ram-spk': { title: "Data Bus (Speakers)", subtitle: "Transmits sound streams from RAM to auditive output channels." },
    'ram-prn': { title: "Data Bus (Printer)", subtitle: "Sends documents and file assets to printing machinery." },
    'reg-ram': { title: "Internal Data Bus", subtitle: "Exchanges variables and instructions payloads between RAM cells and CPU registers." },
    'ram-uc': { title: "Address Bus (RAM ➔ CU)", subtitle: "Allows the Control Unit to specify RAM memory cells coordinates for fetching instructions." },
    'uc-reg': { title: "Control lines", subtitle: "Selects target CPU registers for processing instruction operands." },
    'uc-ual': { title: "Internal Control connection", subtitle: "Coordinates calculation directions from Control Unit to ALU processor core." },
    'ual-reg': { title: "Control & data paths", subtitle: "Returns finished computation result from ALU back to registers cells." },
    'ram-cch': { title: "Cache data pathway", subtitle: "High speed highway linking memory slots directly to the Cache buffer blocks." },
    'ssd-ram': { title: "Data Bus (SSD)", subtitle: "Loads software blocks and operating systems kernels from persistent disk to active RAM." },
    'rom-cpu': { title: "Boot Core bus", subtitle: "Transfers startup program parameters (BIOS UEFI codes) from ROM chip to CPU." },
    'gpu-cpu': { title: "Processor bus", subtitle: "Speedy synchronization and math instructions channel between CPU and GPU graphic chip." },
    'gpu-scr': { title: "Direct monitor channel (Pixel Pipeline)", subtitle: "Sends massive parallel shaders calculated directly from GPU to monitor." },
    'psu-cpu': { title: "Main electric wiring", subtitle: "Powers calculated CPU silicium transistors using regulated continuous voltage channels." },
    'rom-ram': { title: "Boot memory link", subtitle: "Loads BIOS machine segments to RAM active cache during startup routines." }
  },
  ar: {
    'kbd-ram': { title: "ناقل البيانات (لوحة المفاتيح)", subtitle: "يوجه الأكواد الثنائية للأزرار المضغوطة لتخزينها مؤقتا بالرام." },
    'wcm-ram': { title: "ناقل البيانات (الكاميرا)", subtitle: "ينقل دفق إطارات الفيديو الملتقطة رقميا ليركب في الذاكرة العشوائية." },
    'sor-ram': { title: "ناقل البيانات (الفأرة)", subtitle: "ينقل إشارات الإحداثيات والاتجاه والسرعة للرام لتمر للمعالج." },
    'mic-ram': { title: "ناقل البيانات (الميكروفون)", subtitle: "يوجه حزم موجات الصوت المرقمنة بالترميز الثنائي إلى الرام." },
    'ram-scr': { title: "ناقل البيانات (الشاشة)", subtitle: "يرسل كتل الببكسلات المعدة سلفا بالرام لتلوين ولمعان الشاشة." },
    'ram-spk': { title: "ناقل البيانات (مكبرات الصوت)", subtitle: "يوجه بيانات ترددات الصوت للرام مباشرة لمضخم التردد السماعي." },
    'ram-prn': { title: "ناقل البيانات (الطابعة)", subtitle: "يرسل كود الملف والتحبير من الرام لدارة الطابعة لبشر الطباعة." },
    'reg-ram': { title: "ناقل البيانات الداخلي للبورد", subtitle: "يبادل البيانات المحسوبة باستمرارية بين مسجلات المعالج العالي والرام." },
    'ram-uc': { title: "ناقل العناوين (RAM ➔ UC)", subtitle: "يسمح لوحدة التحكم بتعيين أي عنوان بالرام لقراءة وحزم الأكواد." },
    'uc-reg': { title: "خطوط ومسارات التحكم", subtitle: "يحدد المسجل المطلوب من الأنوية للبدء الفوري بالتنفيذ." },
    'uc-ual': { title: "رابط التحكم الداخلي للمعالج", subtitle: "يطلق ويرسل عمليات التوجيه المحددة من وحدة التحكم لوحدة ALU." },
    'ual-reg': { title: "خطوط التحكم والبيانات الداخلية", subtitle: "يسجل ويحفظ مخرجات الحساب اللوجستية المنتهية بمسجلات النوى." },
    'ram-cch': { title: "ناقل الذاكرة المخبئية السريعة", subtitle: "مجال حماية فائق السرعة يربط الرام مباشرة بالذاكرة المخبئية المضافة." },
    'ssd-ram': { title: "ناقل بيانات القرص الصلب (SSD)", subtitle: "يستخرج النواة لبرنامج التشغيل والملفات من الذاكرة المستقرة للرام." },
    'rom-cpu': { title: "رابط البيوس والتشغيل", subtitle: "ينقل أوامر وإيعازات بدء الفحص من لوحة الـ ROM لقلب المعالج." },
    'gpu-cpu': { title: "ناقل المعالج المساعد", subtitle: "خط تشغيل غاية السرعة للمزامنة العلوية بين المعالج وكرت الشاشة GPU." },
    'gpu-scr': { title: "أنبوب البكسلات المباشر (Pixel Pipeline)", subtitle: "يوجه فورا مصفوفات الأبعاد والظلال ثلاثية الأبعاد من كرت الشاشة للـ monitor ." },
    'psu-cpu': { title: "خط التغذية الكهربائي", subtitle: "يوصل الطاقة والجهد الخالي من التشتت والذبذبات الخاطرة لمعماريات الـ CPU." },
    'rom-ram': { title: "رابط تهيئة تشغيل الرام", subtitle: "يحقن كود تهيئة المذربورد في خلاية الرام الفاعلة لحظة تشغيل الباور." }
  },
  es: {
    'kbd-ram': { title: "Bus de Datos (Teclado)", subtitle: "Transmite los valores binarios redactados al teclado directamente a la memoria de trabajo RAM." },
    'wcm-ram': { title: "Bus de Datos (Cámara)", subtitle: "Conduce los paquetes digitales de imágenes de la cámara hasta la RAM." },
    'sor-ram': { title: "Bus de Datos (Mouse)", subtitle: "Transmite los delta de coordenadas de los clics a los registros de la RAM." },
    'mic-ram': { title: "Bus de Datos (Micrófono)", subtitle: "Acrecienta los valores digitales de audio de forma directa a la RAM." },
    'ram-scr': { title: "Bus de Datos (Pantalla)", subtitle: "Envía los bits de píxeles recopilados en la RAM hacia el bus de la pantalla." },
    'ram-spk': { title: "Bus de Datos (Altavoces)", subtitle: "Direcciona los datos del búfer de sonido de la RAM para reproducirlos." },
    'ram-prn': { title: "Bus de Datos (Impresora)", subtitle: "Lleva los bloques de documentos cargados en memoria listo para imprimir." },
    'reg-ram': { title: "Bus de Datos Interno (Motherboard)", subtitle: "Intercambia datos computados entre las celdas volátiles de RAM y registros." },
    'ram-uc': { title: "Bus de Direcciones (RAM ➔ UC)", subtitle: "Permite a la Unidad de Control indicar la dirección exacta de RAM de donde leer instrucciones." },
    'uc-reg': { title: "Líneas de Control Interno", subtitle: "Selecciona el registro de destino óptimo para asimilar operandos." },
    'uc-ual': { title: "Conexión de Control Interna", subtitle: "Dicta el tipo de cálculo aritmético que la Unidad de Control manda a la ALU." },
    'ual-reg': { title: "Líneas lógicas y de resultado", subtitle: "Almacena los números sumados y lógicas calculados en los registros temporales." },
    'ram-cch': { title: "Bus de datos del Caché (Bus)", subtitle: "Interacción veloz para mover de memoria RAM a bloques de caché." },
    'ssd-ram': { title: "Bus de Datos (SSD)", subtitle: "Copia archivos de almacenamiento del disco duradero hasta la memoria RAM." },
    'rom-cpu': { title: "Línea de Arranque (Boot)", subtitle: "Inyecta las directrices elementales de la BIOS ROM en los registros del CPU." },
    'gpu-cpu': { title: "Bus del Coprocesador", subtitle: "Canal rápido de comando recíproco entre el CPU procesador central y la GPU." },
    'gpu-scr': { title: "Canal Directo Pantalla (Pixel Pipeline)", subtitle: "Descarga de píxeles en alta velocidad del procesador GPU a los píxeles de pantalla." },
    'psu-cpu': { title: "Línea de corriente", subtitle: "Entrega la dote eléctrica filtrada de la fuente hacia los transistores del procesador." },
    'rom-ram': { title: "Enlace RAM de Arranque", subtitle: "Transfiere la tabla de periféricos BIOS a la memoria RAM para acceso ágil." }
  },
  de: {
    'kbd-ram': { title: "Datenbus (Tastatur)", subtitle: "Übermittelt Tasten-Binärcodes zur temporären Ablage direkt in den Arbeitsspeicher." },
    'wcm-ram': { title: "Datenbus (Webcam)", subtitle: "Leitet digitale Videoeinzelbilder der Webcam stabil in den RAM." },
    'sor-ram': { title: "Datenbus (Maus)", subtitle: "Teilt Koordinatenänderungen und Klickvorgänge direkt dem RAM mit." },
    'mic-ram': { title: "Datenbus (Mikrofon)", subtitle: "Sendet digitalisierte PCM-Schalldatenströme an die RAM-Speicherzellen." },
    'ram-scr': { title: "Datenbus (Bildschirm)", subtitle: "Sperrt und sendet berechnete Framepuffer aus dem RAM zur Monitoranzeige." },
    'ram-spk': { title: "Datenbus (Lautsprecher)", subtitle: "Sorgt für die Zuteilung von Audiodaten aus dem RAM an Audiosystemausgänge." },
    'ram-prn': { title: "Datenbus (Drucker)", subtitle: "Befördert Druckanweisungen und Schriftdateien vom RAM zum USB-Gerätepuffer." },
    'reg-ram': { title: "Interner Datenbus (Systembus)", subtitle: "Ermöglicht den schnellen Datenaustausch zwischen Arbeitsspeicher und Registern." },
    'ram-uc': { title: "Adressbus (RAM ➔ UC)", subtitle: "Erlaubt dem Steuerwerk, die genaue Speicheradresse im RAM für den nächsten Codebefehl zu adressieren." },
    'uc-reg': { title: "Interne Steuerleitungen", subtitle: "Wählt das Zielregister im Hauptkern für anstehende Code-Operatoren aus." },
    'uc-ual': { title: "Leitwerkverbindung (intern)", subtitle: "Gibt das genaue mathematische Befehlssignal vom Steuerwerk an das Rechenwerk (ALU)." },
    'ual-reg': { title: "Register-Buspfade", subtitle: "Gleicht Rechenergebnisse der ALU sicher zur Speicherung in den Registern ab." },
    'ram-cch': { title: "Datentransferleitung Cache", subtitle: "Koppelt Speicherzellen zur Umgehung von Wartezeiten direkt an die Caches." },
    'ssd-ram': { title: "Datenbus (SSD)", subtitle: "Lädt Betriebssystemkerne und Programmcodes vom Flashlaufwerk in den RAM." },
    'rom-cpu': { title: "Start-Leitungsbus", subtitle: "Sendet Diagnoseinstruktionen (UEFI BIOS Code) vom ROM-Modul in den Prozessor." },
    'gpu-cpu': { title: "Koprozessor-Systembus", subtitle: "Hochfrequenzkanal für gegenseitige Rechensynchronisation zwischen CPU und GPU." },
    'gpu-scr': { title: "Direktleitung Bildschirm (Pixel Pipeline)", subtitle: "Sendet massenhaft gerenderte Shaderdaten direkt vom Grafikchip an die Mattscheibe." },
    'psu-cpu': { title: "Betriebsstromzufuhr", subtitle: "Liefert stabilisierten Gleichstrom für die Millionen Transistoren im Prozessor." },
    'rom-ram': { title: "Initialer Speicherlink", subtitle: "Kopiert fundamentale BIOS-Anweisungsblöcke bei Stromzufuhr direkt in den RAM." }
  }
};

export function getLocalizedBusLabels(lang: SupportedLang, baseBusLabels: Record<string, { title: string; subtitle: string; type: BusType }>) {
  if (lang === 'fr') return baseBusLabels;
  const pack = busLabelsTranslations[lang as Exclude<SupportedLang, 'fr'>];
  const output: Record<string, { title: string; subtitle: string; type: BusType }> = {};
  for (const key of Object.keys(baseBusLabels)) {
    output[key] = {
      ...baseBusLabels[key],
      title: pack[key]?.title || baseBusLabels[key].title,
      subtitle: pack[key]?.subtitle || baseBusLabels[key].subtitle,
    };
  }
  return output;
}

// --- (3) SCENARIOS DATA LOCALIZATION ---
export function getLocalizedScenarios(lang: SupportedLang): ScenarioType[] {
  // Rather than writing massive duplicate arrays, we will translate the core strings of the French array
  // which is imported from/defined on demand, or we'll return targeted trans arrays. 
  // To keep it clean and robust, we provide translations for all 7 scenarios!
  if (lang === 'fr') {
    // Import original
    return scenariosData;
  }

  // Define simplified lookup maps for scenario title, desc, pathString, questions and steps.
  // This is highly compact and maintains full fidelity.
  const tMap: Record<Exclude<SupportedLang, 'fr'>, Record<string, { title: string; desc: string; path: string; q: string; opts: string[]; expl: string; steps: { title: string; act: string; why: string; val?: string }[]; bullet: string[] }>> = {
    en: {
      clavier_ecrire: {
        title: "Scenario 1: Typing on the keyboard",
        desc: "Watch step-by-step how pressing a keyboard key sends the letter 'A' flowing into the screen.",
        path: "Keyboard ➔ Bus ➔ RAM ➔ CPU ➔ RAM ➔ Screen",
        q: "When you press a key on the keyboard, does the letter go straight to the screen?",
        opts: [
          "Yes, the cable links the keyboard directly to the screen.",
          "No, the electrical signal must transit through computer circuits (RAM, CPU, Bus) to be processed.",
          "Yes, the screen sucks up electricity from the pressed key instantly."
        ],
        expl: "Correct! The pressed key creates a binary code that must be routed, loaded to memory and processed before pixels of 'A' are drawn on the screen.",
        steps: [
          { title: "Step 1: Input of key 'A'", act: "The user presses key 'A' on the physical keyboard.", why: "The keyboard is an input device. Direct physical user actions trigger the data highway (simulation)." },
          { title: "Step 2: Data digitalization", act: "Keyboard transforms mechanic actions to electrical binary signals.", why: "Computers do not understand the letter 'A' as humans do. They need electrical pulses representing 01000001." },
          { title: "Step 3: Bus transportation", act: "The Data Bus transports this signal towards internal components.", why: "The Bus acts as the motherboard's main copper highway, hardware links together." },
          { title: "Step 4: Temporary storage in RAM", act: "The RAM volatile memory holds the binary chunk temporarily.", why: "The CPU works extremely fast and fetches data directly from active fast temporary memory cells (RAM)." },
          { title: "Step 5: Decoding by the CPU", act: "The CPU decodes and processes the binary order to render screen graphics.", why: "The compiler engine (processor) reads RAM instructions, decodes 'A' and schedules visual display commands." },
          { title: "Step 6: Memory return flow", act: "Processed visual pixels return to active frame buffer grids in RAM.", why: "The graphics card references active RAM zones to retrieve finished matrices before monitor light triggers." },
          { title: "Step 7: Render on Monitor Screen", act: "The monitor screen illuminates pixels to draw letter 'A'.", why: "The screen is an output device. It translates electronic binary matrices into real physical colored lights." }
        ],
        bullet: [
          "The keyboard is an INPUT device converting mechanical key presses into binary bytes (0s and 1s).",
          "The data bus serves as the essential internal motherboard highway connecting all hardware chips.",
          "The RAM is a volatile workspace of fast speed, completely cleared when electrical current is cut.",
          "The CPU (Processor) acts as the brain: it reads, decodes and computes signals to give data meaning.",
          "The screen is an OUTPUT device converting invisible electrical packets into colored physical light."
        ]
      },
      faire_calcul: {
        title: "Scenario 2: Doing a calculation (2 + 3)",
        desc: "See how the CPU executes algebra sums and coordinates internal units to output 5.",
        path: "Keyboard ➔ RAM ➔ CPU ➔ ALU ➔ RAM ➔ Screen",
        q: "Who actually computes 2 + 3 in the computer?",
        opts: [
          "The monitor screen on its own.",
          "The Arithmetic Logic Unit (ALU), which is the mathematical calculator engine inside the CPU.",
          "The storage disk drive by scratching mechanical platters."
        ],
        expl: "Brilliant! The ALU (Arithmetic Logic Unit) located inside the CPU handles math additions and logical questions.",
        steps: [
          { title: "Step 1: Keys inputted", act: "The user enters sum '2 + 3' on the physical keyboard.", why: "The keyboard sends coordinates of numbers and operation commands on the bus line." },
          { title: "Step 2: Buffer in RAM", act: "Terms '2', '3' and operation code '+' are temporally saved in RAM.", why: "All active program threads and computation values must dwell in RAM to remain highly accessible to CPU cores." },
          { title: "Step 3: Loading by CPU", act: "The CPU fetches the required operands from RAM.", why: "The processor prepares for computation, transferring arguments into registers." },
          { title: "Step 4: Operations decoded by CU", act: "Inside the CPU, the Control Unit (CU) decodes and directs the calculation.", why: "The CU acts as the central conductor: it understands an ADD is asked and directs data to math circuits." },
          { title: "Step 5: Math solved by ALU", act: "The Arithmetic Logic Unit (ALU) solves 2 + 3 = 5.", why: "The ALU is the hardwired electrical calculator. Silicon gates perform math to output binary 5." },
          { title: "Step 6: Saving result in RAM", act: "The CPU writes the calculated result (5) back to a temporary RAM slot.", why: "Calculated numbers must return to the active pool of memory before being routed to screen pipelines." },
          { title: "Step 7: Result printed on screen", act: "The monitor screen receives graphics rendering instruction and draws '5'.", why: "The output peripheral concludes the cycle by displaying processed variables on the user interface." }
        ],
        bullet: [
          "Input data (2 + 3) travels to RAM memory before the CPU can interact with it.",
          "The Control Unit (CU) coordinates the steps, decoding the requested logic (addition).",
          "The Arithmetic Logic Unit (ALU) physically handles the addition inside CPU wires.",
          "The result returns temporarily to RAM to maintain clean task synchronization.",
          "The screen outputs 5, completing the full: Input ➔ Treatment ➔ Output cycle."
        ]
      },
      ouvrir_image: {
        title: "Scenario 3: Opening a picture",
        desc: "See how pictures saved on permanent SSD drives are loaded into RAM and calculated by GPUs.",
        path: "Storage ➔ RAM ➔ CPU ➔ GPU ➔ Screen",
        q: "Which hardware component is tailored to calculate graphics, pixel colors, and 3D frames?",
        opts: [
          "The power supply unit to deliver raw current.",
          "The Graphic Processing Unit (GPU) tailored for high performance image arrays.",
          "Speakers using structural sound vibration."
        ],
        expl: "Excellent! The GPU (Graphic Processing Unit) features thousands of tiny cores optimized to calculate pixels for monitors.",
        steps: [
          { title: "Step 1: Opening file trigger", act: "User double-clicks file 'image.jpg' in their database folder.", why: "User request prompts the OS to locate the file blocks saved on permanent non-volatile storage." },
          { title: "Step 2: Reading from SSD Storage", act: "Compressed image bytes are read from the permanent non-volatile SSD disk.", why: "Local mass storage retains files safe and static across years with no electrical input." },
          { title: "Step 3: Buffering in memory RAM", act: "Image compression bytes are transferred and loaded in RAM.", why: "The CPU can access RAM cells at ultra high speeds, making calculations fluent." },
          { title: "Step 4: Decoding by the CPU", act: "The CPU decompresses the JPG algorithms into unzipped raw pixel grids.", why: "JPEG and PNG files are compressed to save space; processors must decode them to yield raw matrices." },
          { title: "Step 5: Shaders solved by GPU", act: "The GPU takes over to calculate pixel hues, brightness and layout filters.", why: "The GPU features parallel computation grids specialized to render image matrices instantly." },
          { title: "Step 6: Graphic output on Monitor", act: "The monitor screen lights up corresponding LEDs to render the picture.", why: "The monitor transforms calculated color channels into physical lights visible to humans." }
        ],
        bullet: [
          "Media, files, and applications reside safely on permanent MASS STORAGE devices (SSD/HDD).",
          "CPU processors cannot directly compute files on SSD drives because retrieval speeds are too slow.",
          "The compressed files are buffered in active RAM cells to allow direct, fast CPU interactions.",
          "The CPU unzips the JPG file into graphic matrices.",
          "The parallel GPU processor calculates color parameters, offloading heavy calculations from CPU.",
          "The screen shows the picture, concluding the voyage from disk storage to physical screen LEDs."
        ]
      },
      ouvrir_fichier: {
        title: "Scenario 4: Opening a file or folder",
        desc: "Watch how double-clicking a directory triggers disk searches and memory loading.",
        path: "Mouse ➔ CU ➔ SSD/HDD ➔ RAM ➔ CPU ➔ Screen",
        q: "Where is a text document saved when the computer is completely powered off?",
        opts: [
          "In the volatile RAM memory.",
          "On the permanent mass storage drive (SSD/HDD).",
          "Inside structural static signals of plastic keyboard keys."
        ],
        expl: "Spot on! Permanent storage (SSD/HDD) retains files safely even when completely disconnected from electricity.",
        steps: [
          { title: "Step 1: Mouse click inputted", act: "User double-clicks a directory icon with the mouse.", why: "The mouse is an INPUT device that turns plastic button clicks into coordinate pulses for the processor." },
          { title: "Step 2: Control Unit alerted", act: "Inside the CPU, the Control Unit (CU) intercepts the click.", why: "The CU coordinates system interrupts, pausing idle work to prioritize storage read requests." },
          { title: "Step 3: disk search", act: "The storage controller locates directory files index blocks on the SSD.", why: "Solid state memories host filing tables mapping directories files to exact physical NAND sectors." },
          { title: "Step 4: Loading to RAM", act: "The correct file bytes are loaded into temporary RAM memory.", why: "Because SSDs are too slow to feed direct CPU execution threads, data must reside in fast RAM." },
          { title: "Step 5: OS processing by CPU", act: "The CPU organizes binary files data into directory graphical windows.", why: "The CPU calculates where text lines, folder icons and menu rows sit in workspace windows." },
          { title: "Step 6: Monitor output", act: "The monitor draws the folders and spreadsheets on screen.", why: "The screen delivers visual output, letting pupils interact with folder contents." }
        ],
        bullet: [
          "Mice transmit click interrupts to notify system schedulers about user intents.",
          "The Control Unit intercepts clicks, pausing background threads to initiate SSD lookups.",
          "Mass storage extracts persistent sectors files even after days of complete shutdowns.",
          "The files are buffered in RAM to sustain high speed processing speeds.",
          "The CPU draws window frames, texts and borders according to directory values.",
          "The monitor renders folders ready to be edited by the user."
        ]
      },
      enregistrer_fichier: {
        title: "Scenario 5: Saving a file (Ctrl+S)",
        desc: "See how typing 'Save' transfers volatile modifications from RAM back to permanent disk storage.",
        path: "Keyboard ➔ RAM ➔ CPU ➔ SSD/HDD ➔ ROM ➔ Screen",
        q: "What happens if a desktop computer loses electricity before saving (Ctrl+S)?",
        opts: [
          "The new changes are lost because they only resided in volatile RAM memory.",
          "The file is automatically burned on the physical glass on screen.",
          "Keyboards write down and save all keystrokes clicked during the day."
        ],
        expl: "Spot on! RAM memory is highly volatile and clears instantly without power. Saving to disks is necessary to write files physically down.",
        steps: [
          { title: "Step 1: Save keys typed", act: "User presses Ctrl + S on the physical keyboard.", why: "Keyboards act as input devices. These shortcut keys represent universal write requests." },
          { title: "Step 2: Buffering temporary RAM edits", act: "Edited paragraphs are aligned in active RAM transit arrays.", why: "RAM holds the dynamic active document; it holds the latest words typed by the pupil." },
          { title: "Step 3: CU schedules write task", act: "The Control Unit freezes thread actions and locks the file writing state.", why: "CU manages computer synchronization to prevent concurrent file edits from corrupting writing sectors." },
          { title: "Step 4: Writing to permanent storage", act: "Bytes are written on permanent flash NAND blocks inside the SSD.", why: "Disks are the only hardware capable of retaining parameters without electronic input." },
          { title: "Step 5: Updating filing tables", act: "The CPU updates directories index maps via System ROM definitions.", why: "The OS updates file allocation tables to record new weight and position parameters." },
          { title: "Step 6: Safe indicator on Monitor", act: "The monitor removes the editing asterisk, showing a save tick.", why: "The output device feeds back reassurance to the user, confirming files are safe." }
        ],
        bullet: [
          "Keyboards transmit write intents using binary command shortcuts like Ctrl+S.",
          "Unsaved paragraphs are kept in volatile RAM and depend on active electricity to exist.",
          "The Control Unit directs disk controllers to transfer memory registers to permanent cells.",
          "NAND transistors on solid state drives safely record the files indefinitely.",
          "Operating system indexing directories are updated with fresh file parameters.",
          "The monitor displays safe indicators to confirm changes are written."
        ]
      },
      cycle_cpu: {
        title: "Scenario 6: CPU Cycle (Fetch-Decode-Execute)",
        desc: "Watch the basic engine of computer processors: Fetch instructions, Decode formulas, Execute additions.",
        path: "RAM ➔ CU ➔ Registers ➔ ALU ➔ Registers ➔ RAM",
        q: "In Von Neumann computers, what sequence describes processor actions?",
        opts: [
          "A cleaning program to clean physical fan dust.",
          "The Fetch-Decode-Execute cycle to retrieve, translate and solve operations.",
          "An emergency shut down method if systems overheat."
        ],
        expl: "Brilliant! Fetch (loading instructions from RAM), Decode (translating binary bits) and Execute (solving sum circuits) is the infinite loop.",
        steps: [
          { title: "Step 1: Fetching instructions", act: "Processor fetches instruction bits from active RAM memory cells.", why: "Software machine codes reside in volatile RAM. Schedulers use Program Counters (PC) to track current instructions." },
          { title: "Step 2: Buffer in CU", act: "The loaded instrucs arrive through buses in the Control Unit.", why: "Control units feature specific registers designed to hold active instructions while translating." },
          { title: "Step 3: Decoding steps", act: "The CU decodes the instruction bits to identify requested math actions.", why: "Processors are wired logically; decoded bits determine which internal gates and pipelines open." },
          { title: "Step 4: Registers loaded", act: "CPU fetches sum values (operands) from fast Internal Registers.", why: "Registers dwell micrometers away from CPU cores, loading variables in nanoseconds." },
          { title: "Step 5: Computation solved", act: "ALU math gates resolve addition arithmetic (ADD 2 + 3 = 5).", why: "Silicon logical gates (AND/OR/NOT) compute electron currents to generate output values." },
          { title: "Step 6: Buffering result", act: "The solved sum is temporarily placed in returned registers.", why: "Result elements are buffered in registers before being sent back to RAM slots." }
        ],
        bullet: [
          "The processor fetches instruction bytes from active RAM using program counters (Fetch).",
          "Binary machine instruction codes are parsed in CPU Control Units.",
          "Control decoders direct electrical signals to ALU mathematics lanes (Decode).",
          "Ultra fast registers feed operand parameters to core ALU wires.",
          "ALU logic gates solve physical sums by routing electricity through transistors (Execute).",
          "The result is saved in accumulator registers, ready for next loops or output paths."
        ]
      },
      demarrage_pc: {
        title: "Scenario 7: PC Boot/Startup",
        desc: "Watch how pushing the power button wakes up routers, loads ROM BIOS, loads OS to RAM, and starts monitors.",
        path: "Power Button ➔ PSU ➔ ROM ➔ RAM ➔ CPU ➔ OS ➔ Screen",
        q: "Which hardware component stores boot instructions (BIOS) permanently with no current?",
        opts: [
          "Volatile RAM memory.",
          "ROM chip (Read-Only Memory).",
          "Mechanical plastic casing buttons."
        ],
        expl: "Marvelous! RAM is empty without electric current. Only ROM chips preserve startup BIOS programs permanently.",
        steps: [
          { title: "Step 1: Power button pressed", act: "User presses the power button on the computer case.", why: "Waking up computers requires mechanical switch triggers closing motherboards power gates." },
          { title: "Step 2: PSU turns on", act: "Power Supply Unit (PSU) regulates home current to safe levels.", why: "Motherboard microcircuits require extremely regular low voltage DC power (12V/5V/3.3V) to prevent frying." },
          { title: "Step 3: Loading ROM BIOS", act: "The CPU starts, reading boot instructions stored on System ROM chips.", why: "Because RAM cells are blank on powering up, processors must search permanent ROM BIOS chips to execute checks." },
          { title: "Step 4: Loading OS from disk to RAM", act: "CPU copies core Operating System kernels from SSD storage to RAM.", why: "SSD retrieval is too slow to support CPU clock cycles. Kernels must load into fast active RAM." },
          { title: "Step 5: CPU executes Operating System threads", act: "The CPU processes machine code instructions of the loaded OS.", why: "The central brain takes control, initiating threads and background schedulers." },
          { title: "Step 6: OS interface loaded", act: "The OS finishes initializing graphic drivers, layouts, and desktop widgets.", why: "The Operating System serves as a translator, letting users run applications safely." },
          { title: "Step 7: Screen output", act: "Display memory routes safe desktop imagery to the monitor.", why: "Monitors transform data buses pixel indicators into user interfaces, confirming boots completed." }
        ],
        bullet: [
          "Casing power buttons close physical circuits, alerting the power unit.",
          "PSUs filter alternating household inputs to continuous low voltages (+12V, +5V, +3.3V).",
          "Non-volatile ROM chips preserve boot BIOS programs since RAM starts completely blank.",
          "Active OS modules are copied from SSD folders straight to RAM to enable fast processing.",
          "The Central Processor (CPU) processes kernels calculations to startup software.",
          "The Operating System configures desktop widgets, graphical frameworks and drivers.",
          "The monitor draws login screens, confirming successful computer startups."
        ]
      }
    },
    ar: {},
    es: {},
    de: {}
  };

  // Spanish
  tMap.es = {
    clavier_ecrire: {
      title: "Escenario 1: Escribo con el teclado",
      desc: "Observa paso a paso cómo pulsar una tecla del teclado envía la letra 'A' hasta la pantalla.",
      path: "Teclado ➔ Bus ➔ RAM ➔ CPU ➔ RAM ➔ Pantalla",
      q: "¿Cuando presionas una tecla la letra viaja directo a la pantalla?",
      opts: [
        "Sí, el cable une directamente el teclado con el monitor.",
        "No, la corriente debe transitar por los circuitos de procesamiento (RAM, CPU, Bus).",
        "Sí, la pantalla succiona electricidad del botón mecánico."
      ],
      expl: "¡Exacto! El botón genera un código binario que debe encaminarse, almacenarse y procesarse antes de dibujarse en pantalla.",
      steps: [
        { title: "Paso 1: Presión de tecla 'A'", act: "El usuario presiona la tecla 'A' en el teclado físico.", why: "El teclado es un dispositivo de entrada. Arranca la travesía de simulación." },
        { title: "Paso 2: Digitalización en bits", act: "El teclado convierte la presión mecánica en señales binarias.", why: "Las computadoras solo entienden voltajes representando bits de datos: 01000001." },
        { title: "Paso 3: Envío por el Bus", act: "El bus de datos traslada la señal hasta los circuitos integrados.", why: "El Bus es la autopista principal de comunicación en la tarjeta madre." },
        { title: "Paso 4: Guarda en RAM", act: "La memoria RAM volátil retiene de manera temporal los bits.", why: "El CPU asimila de forma directa registros de memorias ultrarrápidas como de la RAM." },
        { title: "Paso 5: Decodificación CPU", act: "El CPU procesa la información para preparar el gráfico de píxeles.", why: "El decodificador lee binarios de la RAM y manda las coordenadas a la zona de render." },
        { title: "Paso 6: Copia en Búfer", act: "Los píxeles listos regresan a la RAM de video activa.", why: "La pantalla monitoriza búferes de RAM rápidos para dibujar fotogramas." },
        { title: "Paso 7: Salida en Pantalla", act: "El monitor prende sus luces coloridas armando la letra 'A'.", why: "El periférico de salida transforma datos lógicos en luces reales de fósforo o LED." }
      ],
      bullet: [
        "El teclado es entrada pura, traduce gestos humanos a pulsos lógicos binarios.",
        "El bus actúa como autopista compartida entre todos los chips del hardware.",
        "La RAM aloja temas de manera interina, se borra al vaciar la corriente del PC.",
        "El procesador CPU es el cerebro organizando cálculos y órdenes de control.",
        "La pantalla es salida, proyectando bits ocultos en formas e imágenes perceptibles."
      ]
    },
    faire_calcul: {
      title: "Escenario 2: Hago un cálculo (2 + 3)",
      desc: "Observa cómo el CPU realiza operaciones matemáticas y coordina sus componentes para dar como resultado 5.",
      path: "Teclado ➔ RAM ➔ CPU ➔ ALU ➔ RAM ➔ Pantalla",
      q: "¿Quién realiza realmente la operación matemática 2 + 3 dentro del ordenador?",
      opts: [
        "La pantalla de visualización por sí sola.",
        "La Unidad Aritmético Lógica (ALU) ubicada dentro del procesador CPU.",
        "El disco duro físico mediante sus pistas de metal."
      ],
      expl: "¡Brillante! La ALU (Unidad Aritmético Lógica) dentro del CPU es la encargada del procesamiento algebraico.",
      steps: [
        { title: "Paso 1: Entrada de teclas", act: "El estudiante introduce '2 + 3' usando el teclado físico.", why: "El teclado transmite señales de valores numéricos e instrucciones de operación." },
        { title: "Paso 2: Retención en RAM", act: "Los números y el signo '+' se almacenan interinamente en la RAM.", why: "Para que el CPU tenga acceso veloz, los datos en ejecución deben habitar en la memoria RAM." },
        { title: "Paso 3: Carga al Procesador", act: "El CPU extrae los operandos y datos guardados desde la RAM.", why: "El procesador prepara las variables moviendo los operandos a sus registros." },
        { title: "Paso 4: Decodificación por la UC", act: "La Unidad de Control (UC) asimila la orden de suma y activa las compuertas.", why: "La UC coordina todo: identifica que hay que sumar y canaliza los flujos de datos." },
        { title: "Paso 5: Resolución en la ALU", act: "La Unidad Aritmético Lógica (ALU) calcula 2 + 3 = 5.", why: "La ALU es la calculadora electrónica de silicio; procesa bits a niveles de voltaje." },
        { title: "Paso 6: Guarda en la RAM", act: "El CPU escribe la solución calculada (5) de regreso en la memoria RAM.", why: "El resultado debe reubicarse en memoria común antes de conducirse al canal de render." },
        { title: "Paso 7: Salida en Pantalla", act: "La pantalla recibe los píxeles renderizados y muestra el número '5'.", why: "El monitor concluye el ciclo proyectando los datos digeridos por el hardware." }
      ],
      bullet: [
        "Los datos ingresados migran a la RAM para que el CPU pueda interactuar con ellos.",
        "La Unidad de Control (CU) orquesta los flujos de control y entiende la suma.",
        "La Unidad Aritmético Lógica (ALU) efectúa en el hardware la adición exacta.",
        "El resultado se estaciona en la RAM para mantener la sincronía del sistema intacta.",
        "La pantalla muestra 5, cerrando el ciclo: Entrada ➔ Procesamiento ➔ Salida."
      ]
    },
    ouvrir_image: {
      title: "Escenario 3: Abro una imagen",
      desc: "Comprende cómo la imagen guardada en tu almacenamiento duradero se copia en la RAM y se procesa por el chip gráfico (GPU) para mostrarse.",
      path: "Almacenamiento ➔ RAM ➔ CPU ➔ GPU ➔ Pantalla",
      q: "¿Qué componente está especialmente diseñado para calcular los gráficos de millones de píxeles y las tareas visuales intensivas de la computadora?",
      opts: [
        "La unidad de alimentación.",
        "El Procesador Gráfico (GPU) dedicado al renderizado intensivo.",
        "El altavoz mediante vibraciones acústicas."
      ],
      expl: "¡Excelente! El GPU está optimizado para calcular matrices de píxeles a velocidad ultrarrápida, liberando al procesador principal.",
      steps: [
        { title: "Paso 1: Solicitud de imagen", act: "El usuario hace doble clic sobre el archivo 'image.jpg' guardado.", why: "Esta acción solicita al sistema que localice la imagen preservada de forma permanente." },
        { title: "Paso 2: Lectura desde el disco SSD", act: "La información es leída de las celdas duraderas de almacenamiento de masa SSD o HDD.", why: "El almacenamiento de masa conserva tus archivos aun desprovisto de corriente eléctrica." },
        { title: "Paso 3: Carga en la RAM", act: "El archivo de la imagen se copia en la memoria viva RAM.", why: "Para procesar instrucciones rápido, el CPU opera con datos cargados temporalmente en la RAM." },
        { title: "Paso 4: Decodificación por el CPU", act: "El CPU decodifica y descomprime los bits del formato JPG a pixeles brutos.", why: "Los archivos JPEG se comprimen para ocupar menos espacio; el CPU debe decodificar su estructura." },
        { title: "Paso 5: Renderizado por el GPU", act: "El chip gráfico toma el control para calcular tramas y canales de color.", why: "El GPU cuenta con miles de núcleos en paralelo diseñados para calcular píxeles en nanosegundos." },
        { title: "Paso 6: Salida en la pantalla", act: "La pantalla monitoriza el búfer de imagen y enciende sus ledes.", why: "La pantalla recibe los píxeles listos generados por el GPU y los muestra en píxeles visibles de colores." }
      ],
      bullet: [
        "Tus archivos se resguardan intactos en el ALMACENAMIENTO PERMANENTE (disco SSD).",
        "El procesador principal no puede operar sobre el SSD directo porque la transferencia de datos es lenta.",
        "La imagen se copia temporalmente a la RAM para que esté disponible inmediatamente para el CPU.",
        "El CPU decompressa el JPG estructurado a píxeles libres de pantalla.",
        "El procesador de gráficos GPU calcula de forma muy eficaz los fotogramas y tramas.",
        "La pantalla muestra la foto finalizada, completando la ruta de datos."
      ]
    },
    ouvrir_fichier: {
      title: "Escenario 4: Abro un archivo o carpeta",
      desc: "Descubre cómo el doble clic sobre una carpeta detona una búsqueda en disco y la carga en la RAM de trabajo.",
      path: "Mouse ➔ Unidad de Control ➔ SSD/HDD ➔ RAM ➔ CPU ➔ Pantalla",
      q: "¿Dónde se resguarda un archivo cuando el computador está apagado por completo?",
      opts: [
        "En la memoria temporal RAM volátil.",
        "En el almacenamiento duradero permanente (SSD/HDD).",
        "En los impulsos remanentes mecánicos de las teclas."
      ],
      expl: "¡Correcto! El disco duro guarda de manera perdurable los bytes e índices en ausencia de energía activa.",
      steps: [
        { title: "Paso 1: Doble clic del usuario", act: "El alumno hace doble clic sobre un directorio con la ayuda del ratón.", why: "El mouse es un periférico de entrada. Traduce roces físicos en binario de coordenadas." },
        { title: "Paso 2: Interrupción en la UC", act: "Dentro del procesador, la Unidad de Control (UC) intercepta las coordenadas del clic.", why: "La UC es la coordinadora soberana de la tarjeta madre y detiene operaciones secundarias para priorizar el clic." },
        { title: "Paso 3: Consulta al SSD", act: "El controlador de almacenamiento localiza la dirección física en el SSD.", why: "Celdas sólidas registran árboles de archivos ligando etiquetas lógicas a ubicaciones físicas." },
        { title: "Paso 4: Copia de tránsito en RAM", act: "Los datos de archivos de la carpeta son cargados en la RAM integrada.", why: "Debido a la lentitud del disco duro, se requiere posicionar los recursos en la RAM de alta velocidad." },
        { title: "Paso 5: Reconstrucción del CPU", act: "El CPU procesa códigos binarios determinando los iconos del directorio.", why: "El cerebro calcula en qué ejes geométricos yacen marcos y textos conforme a variables." },
        { title: "Paso 6: Proyección en Pantalla", act: "La pantalla dibuja el espacio virtual que almacena carpetas y tareas.", why: "El periférico de salida culmina mostrando las respuestas del ordenador, facilitando la interacción." }
      ],
      bullet: [
        "El ratón propaga comandos de coordenadas pidiendo inmediatas lecturas.",
        "La Unidad de Control capta interrupciones del ratón organizando el diálogo integrador.",
        "El disco duro es perseverante: sostiene la estructura aun cuando el ordenador esté desenchufado.",
        "Los datos son redirigidos a la RAM para agilizar operaciones sobre los circuitos del procesador.",
        "El CPU reestructura el render lógico interpretando datos binarios antes de pintar la vista activa.",
        "El monitor asume la orden pintando los colores correctos para el usuario."
      ]
    },
    enregistrer_fichier: {
      title: "Escenario 5: Guardo un archivo (Ctrl+S)",
      desc: "Observa cómo la orden de escritura del teclado traslada tus avances de la RAM volátil hacia las celdas seguras del disco.",
      path: "Teclado ➔ RAM ➔ CPU ➔ SSD/HDD ➔ ROM ➔ Pantalla",
      q: "¿Qué sucede si el computador sufre un apagón repentino antes de haber guardado (Ctrl+S)?",
      opts: [
        "Los avances del documento se borran porque residían temporalmente en la RAM volátil.",
        "El archivo se quema de forma instantánea sobre los vidrios de la pantalla.",
        "El teclado almacena de forma grabada los botones presionados del día."
      ],
      expl: "¡Exacto! La RAM se extingue sin corriente. Solo el acto de guardar en discos físicos retiene los datos de forma permanente.",
      steps: [
        { title: "Paso 1: Solicitud de guardado", act: "El usuario presiona Ctrl + S al teclado para escribir el progreso.", why: "El teclado es entrada directa. Estas teclas mandan la orden prioritaria de almacenamiento seguro." },
        { title: "Paso 2: Datos en la RAM", act: "Las palabras añadidas se conservan de forma temporal en la RAM activa.", why: "La RAM actúa como sostén activo para albergar la versión editada que redacta el estudiante." },
        { title: "Paso 3: Orden de la UC", act: "La Unidad de Control del CPU organiza la escritura y bloquea ediciones.", why: "La UC estabiliza los buses para asegurar un flujo de escritura limpio, evitando datos corruptos." },
        { title: "Paso 4: Escritura en disco", act: "Los bloques binarios se graban físicamente en las compuertas lógicas flash del SSD.", why: "Los discos sólidos persisten la información de forma definitiva desprovistos de soporte eléctrico." },
        { title: "Paso 5: Calibrado de índices", act: "El CPU actualiza las tablas del sistema vinculando registros e índices.", why: "Para resguardar el orden del disco, se actualizan las proporciones de rutas de almacenamiento." },
        { title: "Paso 6: Confirmación del tutor", act: "El monitor retira el asterisco indicativo y muestra una palomita de guardado exitoso.", why: "El dispositivo de salida notifica al alumno que sus avances ya se encuentran protegidos físicamente." }
      ],
      bullet: [
        "El comando Ctrl+S activa una solicitud de copiado inmediato hacia el disco duradero.",
        "Los documentos no salvados dependen de la tensión eléctrica de la RAM para continuar existiendo.",
        "La Unidad de Control guía flujos hacia los buses internos de control primario.",
        "Los transistores del disco duradero (SSD) graban de forma sólida y estable la información.",
        "Las tablas de indexación se actualizan para reportar la presencia de nuevos archivos.",
        "El monitor refresca las vistas dando total tranquilidad al operador."
      ]
    },
    cycle_cpu: {
      title: "Escenario 6: Ciclo CPU (Fetch-Decode-Execute)",
      desc: "Observa en cámara lenta el latido de los procesadores: Búsqueda del código (Fetch), Decodificación de la orden (Decode) y Ejecución (Execute).",
      path: "RAM ➔ Unidad de Control ➔ Registros ➔ ALU ➔ Registros ➔ RAM",
      q: "En una arquitectura Von Neumann, ¿qué describe adecuadamente el ciclo Fetch-Decode-Execute?",
      opts: [
        "Un programa de software que remueve el polvo del ventilador mecánico de la caja.",
        "La secuencia cíclica básica de la CPU para recuperar, comprender y ejecutar operaciones.",
        "Una medida de protección térmica que detiene el sistema al superar altas temperaturas."
      ],
      expl: "¡Estupendo! Fetch (traer la orden), Decode (interpretar) y Execute (calcular con circuitos lógicos) es el ciclo infinito de procesamiento.",
      steps: [
        { title: "Paso 1: Búsqueda (Fetch)", act: "El CPU trae la instrucción guardada en la dirección de la RAM.", why: "Los programas binarios habitan en la RAM. El Contador de Programa (PC) marca la coordenada actual." },
        { title: "Paso 2: Almacenado en la UC", act: "La orden binaria viaja por buses y se aloja temporalmente en la Unidad de Control.", why: "La UC requiere disponer de la instrucción en sus registros durante el proceso de descifrado." },
        { title: "Paso 3: Decodificación (Decode)", act: "La UC decodifica los bits para entender si demanda sumar, escribir o saltar.", why: "El CPU consiste en conexiones eléctricas lógicas. El descifrado activa las líneas de hardware apropiadas." },
        { title: "Paso 4: Carga de operandos", act: "El CPU extrae los números de la instrucción a sus Registros internos rápidos.", why: "Los registros internos distan micrómetros del núcleo, respondiendo en millonésimas de segundo." },
        { title: "Paso 5: Ejecución (Execute)", act: "La Unidad Aritmético Lógica (ALU) calcula la adición aplicando compuertas lógicas.", why: "Es el procesamiento puro. Compuertas (AND/OR/NOT) rigen caminos de voltaje sumando valores binarios." },
        { title: "Paso 6: Registro de resultado", act: "La solución resultante se aloja en un registro acumulador.", why: "Una vez completado el cálculo, el valor se estabiliza momentáneamente antes de ir a memoria RAM." }
      ],
      bullet: [
        "El CPU inicia extrayendo bytes de comandos lógicos en RAM comandado por el Program Counter.",
        "El bit de comando se deposita para su análisis en las entrañas de la Unidad de Control.",
        "La UC traduce las secuencias, guiando la energía a compuertas de la ALU pertinentes.",
        "Registros internos aportan instantáneamente operandos demandados por la lógica de silicio.",
        "Circuitos especializados de la ALU completan el cálculo físico a través de transistores.",
        "Se retiene el resultado final en registros rápidos, preparándolo para el siguiente ciclo."
      ]
    },
    demarrage_pc: {
      title: "Escenario 7: Encendido de la PC",
      desc: "Descubre cómo presionar el botón de inicio despierta todos los componentes, arranca el BIOS, copia el sistema operativo en RAM y muestra tu escritorio.",
      path: "Botón de encendido ➔ Fuente de Poder ➔ ROM ➔ RAM ➔ CPU ➔ OS ➔ Pantalla",
      q: "¿Qué componente de hardware guarda para siempre el firmware de encendido (BIOS) libre de soporte eléctrico?",
      opts: [
        "La memoria viva RAM volátil.",
        "La tarjeta o chip ROM (Read-Only Memory) no volátil.",
        "Los resortes de los interruptores del plástico exterior."
      ],
      expl: "¡Maravilloso! La RAM inicia en blanco y vacía. Solo la memoria ROM no volátil resguarda de por vida el firmware BIOS básico.",
      steps: [
        { title: "Paso 1: Botón presionado", act: "El usuario presiona físicamente el botón de encendido en el gabinete de la PC.", why: "La presión cierra los contactos de baja tensión enviando la orden de arranque a la fuente de alimentación." },
        { title: "Paso 2: Activación de fuente", act: "La Fuente de Alimentación regula la tensión hogareña a niveles muy estables.", why: "Microcircuitos requieren flujos sumamente estables (+12V, +5V, +3.3V) para operar sin quemarse." },
        { title: "Paso 3: Lectura del BIOS en ROM", act: "El CPU arranca examinando las instrucciones firmes de por vida en la ROM.", why: "Como la RAM arranca completamente vacía, el CPU examina la ROM para ejecutar diagnósticos iniciales (POST)." },
        { title: "Paso 4: Carga de OS en RAM", act: "El cargador de arranque localiza el núcleo del OS en el SSD copiándolo en las celdas RAM.", why: "Extraer datos del disco sólido es demasiado lento para la velocidad del CPU. Se copian temporalmente a la RAM." },
        { title: "Paso 5: Ejecución del CPU", act: "El CPU comienza a marchar leyendo las órdenes lógicas del kernel cargadas en la RAM.", why: "El director matemático coordina variables, subprocesos e hilos informáticos en segundo plano." },
        { title: "Paso 6: Escritorio listo", act: "El sistema operativo (OS) compone las interfaces del escritorio cargando controladores gráficos.", why: "El OS funge de mediador y traductor polivalente allanando la interacción entre hardware y usuario." },
        { title: "Paso 7: Salida en pantalla", act: "La memoria gráfica proyecta el color de las interfaces visuales hacia el monitor.", why: "El monitor traduce mapas binarios del bus de datos en luces, consumando el encendido exitoso." }
      ],
      bullet: [
        "El botón de encendido activa los relevadores físicos pidiendo flujo a la fuente.",
        "La fuente de poder regula voltajes limpios de corriente continua (+12V, +5V, +3.3V).",
        "Chips estables ROM portan las rutinas de BIOS pues los módulos de RAM se inicializan vacíos.",
        "Archivos elementales del sistema operativo migran del SSD a la RAM para rápido acceso.",
        "El CPU corre cálculos robustos de arranque evaluando el kernel dinámico del OS.",
        "El sistema operativo levanta controladores gráficos, escritorio e interfaces operativas.",
        "El monitor dibuja el escritorio final, verifying el éxito del inicio."
      ]
    }
  };

  // German
  tMap.de = {
    clavier_ecrire: {
      title: "Szenario 1: Tippen auf der Tastatur",
      desc: "Beobachten Sie Schritt für Schritt, wie das Drücken einer Taste den Buchstaben 'A' auf den Bildschirm bringt.",
      path: "Tastatur ➔ Bus ➔ RAM ➔ CPU ➔ RAM ➔ Bildschirm",
      q: "Wenn Sie eine Taste drücken, geht das Signal direkt zum Monitor?",
      opts: [
        "Ja, das Kabel verbindet Tastatur und Monitor ungehindert.",
        "Nein, das elektrische Signal muss zuerst durch die Rechnerschaltkreise laufen.",
        "Ja, der Bildschirm saugt die Elektrizität der Taste an."
      ],
      expl: "Korrekt! Tastenschläge erzeugen Signale, die verarbeitet und in Pixel umgesetzt werden müssen.",
      steps: [
        { title: "Schritt 1: Eingabe von Taste 'A'", act: "Der Benutzer drückt die Taste 'A' auf der Tastatur.", why: "Eingabegeräte starten den physischen Datenreiseablauf." },
        { title: "Schritt 2: Digitalisierung in Bits", act: "Die Tastatur wandelt mechanischen Druck in Binärzahlen um.", why: "Rechner verstehen nur Spannungsimpulse wie 01000001." },
        { title: "Schritt 3: Transport über den Bus", act: "Der Datenbus leitet dieses Signal an die Systemkomponenten weiter.", why: "Der Bus ist die wichtigste Signalautobahn auf der Hauptplatine." },
        { title: "Schritt 4: Puffern im RAM", act: "Der RAM sichert die Binärdaten flüchtig ab.", why: "Die CPU arbeitet mit direktem Hochgeschwindigkeitszugriff auf Arbeitsspeicher." },
        { title: "Schritt 5: Dekodieren im CPU", act: "Die CPU interpretiert Befehle und berechnet die Pixelkoordinaten.", why: "Das Steuerwerk deutet Anweisungen und steuert Grafikadressen." },
        { title: "Schritt 6: Rücklauf zum RAM", act: "Die fertigen Farbwerte gehen zurück in den Bildschirmpuffer.", why: "Grafikchips holen Bildpunkte aus dem Arbeitsspeicher-VRAM." },
        { title: "Schritt 7: Monitor-Ausgabe", act: "Der Monitor leuchtet die Pixel farbig auf, der Buchstabe 'A' erscheint.", why: "Ausgabegeräte wandeln systeminterne Elektronik in sichtbares Licht um." }
      ],
      bullet: [
        "Tastaturen sind EINGABEgeräte, die physische Aktionen in Bits übersetzen.",
        "Der Datenbus vernetzt alle Systemkreise als übergeordnete Signalader.",
        "RAM speichert flüchtig, ohne Strom löscht sich der Inhalt vollständig auf.",
        "Die CPU orchestriert als Gehirn Rechnungen und Datendeutungen.",
        "Bildschirme geben optisches Feedback als AUSGABEgeräte aus."
      ]
    },
    faire_calcul: {
      title: "Szenario 2: Eine Berechnung durchführen (2 + 3)",
      desc: "Sehen Sie, wie die CPU mathematische Operationen ausführt und ihre internen Einheiten koordiniert, um das Ergebnis 5 auszugeben.",
      path: "Tastatur ➔ RAM ➔ CPU ➔ ALU ➔ RAM ➔ Bildschirm",
      q: "Wer berechnet tatsächlich 2 + 3 im Computer?",
      opts: [
        "Der Monitor ganz allein für sich.",
        "Das Rechenwerk (ALU), also der mathematische Taschenrechner in der CPU.",
        "Die physische Festplatte durch mechanisches Rotieren."
      ],
      expl: "Genial! Das Rechenwerk (ALU - Arithmetic Logic Unit) in der CPU ist für mathematische Rechnungen und logische Fragen zuständig.",
      steps: [
        { title: "Schritt 1: Tasteneingabe", act: "Der Benutzer gibt die Rechnung '2 + 3' über die Tastatur ein.", why: "Die Tastatur sendet Zahlenwerte und Rechenbefehle über die Busleitungen." },
        { title: "Schritt 2: Puffern im RAM", act: "Die Zahlen und das Rechenzeichen '+' werden vorübergehend im RAM gespeichert.", why: "Um der CPU schnellen Zugriff zu gewähren, müssen alle aktiven Rechenwerte im Arbeitsspeicher liegen." },
        { title: "Schritt 3: Laden in Prozessor", act: "Die CPU holt die benötigten Operanden und Anweisungen aus dem RAM.", why: "Der Prozessor bereitet die Daten vor, indem er die Werte in ultraschnelle Register lädt." },
        { title: "Schritt 4: Dekodieren (CU)", act: "Im Prozessor dekodiert das Steuerwerk (CU) den Befehl und steuert die Leitungen an.", why: "Das Steuerwerk dirigiert alles: Es erkennt die geforderte Addition und öffnet die Pfade zum Rechenwerk." },
        { title: "Schritt 5: Berechnung (ALU)", act: "Das Rechenwerk (ALU) löst die Aufgabe 2 + 3 = 5.", why: "Die ALU ist der elektronische Rechner aus Silizium; Logikgatter berechnen Signale in Nanosekunden." },
        { title: "Schritt 6: Speichern im RAM", act: "Die CPU schreibt das berechnete Ergebnis (5) zurück in eine RAM-Zelle.", why: "Das Ergebnis muss im Arbeitsspeicher gepuffert werden, bevor es an Grafikkanäle weitergeleitet wird." },
        { title: "Schritt 7: Ausgabe auf Schirm", act: "Der Monitor empfängt die berechneten Grafikdaten und stellt die Zahl '5' dar.", why: "Das Ausgabegerät schließt den Zyklus ab, indem es die verarbeiteten Systemdaten sichtbar macht." }
      ],
      bullet: [
        "Eingegebene Rechenpfade wandern zuerst in den RAM, bevor die CPU mit ihnen arbeiten kann.",
        "Das Steuerwerk (CU) koordiniert die Befehle und entschlüsselt die Addition.",
        "Das Rechenwerk (ALU) führt im Hardware-Schaltkreis die exakte Addition aus.",
        "Das Resultat wird im Arbeitsspeicher zwischengelagert, um die Systemsynchronisation zu bewahren.",
        "Der Bildschirm zeigt 5 und schließt den Kreis: Eingabe ➔ Verarbeitung ➔ Ausgabe."
      ]
    },
    ouvrir_image: {
      title: "Szenario 3: Ein Bild öffnen",
      desc: "Erfahren Sie, wie ein Bild von der Festplatte in den Arbeitsspeicher (RAM) geladen und über die Grafikkarte (GPU) berechnet wird.",
      path: "Speicher ➔ RAM ➔ CPU ➔ GPU ➔ Bildschirm",
      q: "Welches Bauteil berechnet die Farben von Millionen von Pixeln und 2D/3D-Grafiken?",
      opts: [
        "Das Netzteil für die Stromzufuhr.",
        "Der Grafikprozessor (GPU) für intensive Rendering-Arbeiten.",
        "Der Lautsprecher mittels akustischer Signale."
      ],
      expl: "Super! Die GPU (Graphics Processing Unit) ist darauf optimiert, Millionen von Pixeln extrem schnell zu verarbeiten.",
      steps: [
        { title: "Schritt 1: Dateianforderung", act: "Der Benutzer klickt doppelt auf die Datei 'image.jpg'.", why: "Dies fordert das System auf, das Bild auf dem permanenten Speicher (SSD) zu lokalisieren." },
        { title: "Schritt 2: Lesen vom SSD", act: "Das komprimierte Bild wird vom permanenten SSD-Laufwerk ausgelesen.", why: "Der Massenspeicher bewahrt Dateien auch ohne Stromzufuhr dauerhaft auf." },
        { title: "Schritt 3: Zwischenladen im RAM", act: "Die Bilddatei wird kopiert und in den Arbeitsspeicher (RAM) geladen.", why: "Für flüssiges Arbeiten greift der Prozessor primär auf Daten im RAM zu." },
        { title: "Schritt 4: Dekodieren im CPU", act: "Die CPU dekodiert und entpackt die komprimierten JPG-Bilddaten.", why: "JPEG-Dateien sind komprimiert, um Speicherplatz zu sparen. Der Prozessor muss diese Struktur entpacken." },
        { title: "Schritt 5: Rendering der GPU", act: "Der Grafikprozessor berechnet Pixel und Farbwerte des Bildes.", why: "Die GPU verfügt über Tausende winzige Kerne für parallele Bildberechnungen in Echtzeit." },
        { title: "Schritt 6: Bildschirmanzeige", act: "Der Monitor aktiviert seine Pixel-LEDs und zeigt das Bild an.", why: "Das Ausgabegerät setzt die berechneten Grafiksignale in sichtbares Licht um." }
      ],
      bullet: [
        "Bilder und Dateien lagern sicher auf dem permanenten MASSENSPEICHER (SSD).",
        "Die CPU kann nicht direkt auf der Festplatte arbeiten, da diese viel zu langsam ist.",
        "Die Bilddatei 'image.jpg' wird temporär in den RAM kopiert, um für die CPU bereit zu stehen.",
        "Die CPU dekomprimiert das JPG-Dateiformat in ein offenes Pixelgitter.",
        "Der Grafikprozessor (GPU) berechnet Farben und entlastet die CPU.",
        "Der Bildschirm stellt das Bild dar – vom Festplattenspeicher direkt vor Ihre Augen."
      ]
    },
    ouvrir_fichier: {
      title: "Szenario 4: Datei oder Ordner öffnen",
      desc: "Sehen Sie, wie ein Doppelklick eine Dateisuche auslöst und den ausgewählten Ordner in den RAM lädt.",
      path: "Maus ➔ Steuerwerk ➔ SSD/HDD ➔ RAM ➔ CPU ➔ Bildschirm",
      q: "Wo bleibt ein Dokument dauerhaft gespeichert, wenn der Computer komplett ausgeschaltet ist?",
      opts: [
        "Im flüchtigen RAM-Arbeitsspeicher.",
        "Auf dem permanenten Massenspeicher (SSD/HDD).",
        "In den statischen Impulsen der Tastaturtasten."
      ],
      expl: "Genau! Der permanente Massenspeicher (SSD/HDD) sichert Dateien stabil ohne Energiezufuhr.",
      steps: [
        { title: "Schritt 1: Doppelklick", act: "Der Nutzer klickt doppelt auf ein Ordner-Symbol.", why: "Die Maus ist ein Eingabegerät, welches Handbewegungen in Koordinaten für den Rechner übersetzt." },
        { title: "Schritt 2: CU alarmiert", act: "In der CPU fängt das Steuerwerk (CU) den Doppelklick ab.", why: "Die CU koordiniert das Mainboard und fordert Zugriff auf den Speicher an." },
        { title: "Schritt 3: Abfrage des SSD", act: "Der Controller sucht den Ordnerindex auf dem SSD-Laufwerk.", why: "Das SSD-Laufwerk speichert Dateitabellen, die Pfade den physischen NAND-Zellen zuordnen." },
        { title: "Schritt 4: Laden in den RAM", act: "Die Binärdaten des Ordners werden in den RAM-Speicher geladen.", why: "Da SSDs für CPUs im Taktvergleich zu langsam sind, lagern aktive Daten im schnellen Arbeitsspeicher." },
        { title: "Schritt 5: Aufbau der CPU", act: "Die CPU berechnet die visuelle Anzeige Ihres Ordnerfensters.", why: "Der Prozessor berechnet Positionen von Symbolen und Fenstermenüs basierend auf den Daten." },
        { title: "Schritt 6: Ordneranzeige", act: "Der Bildschirm zeigt den geöffneten Ordner an.", why: "Das Ausgabegerät stellt die verarbeiteten Daten für die Benutzerinteraktion visuell dar." }
      ],
      bullet: [
        "Die Maus sendet Klick-Interrupts zur Benachrichtigung des Betriebssystems.",
        "Das Steuerwerk unterbricht laufende Prozesse für die SSD-Speicherabfrage.",
        "Das SSD-Laufwerk arbeitet ohne Strom und hält Dateien auch nach Wochen bereit.",
        "Der angeforderte Ordner wird flüchtig im RAM gepuffert, um schnellen Zugriff zu gewähren.",
        "Die CPU übersetzt Binärdaten des Ordners in Fenster-Layouts und Symbole.",
        "Der Monitor stellt den Ordner für den Dateizugriff der Anwender bereit."
      ]
    },
    enregistrer_fichier: {
      title: "Szenario 5: Datei speichern (Strg+S)",
      desc: "Sehen Sie, wie der Speicherbefehl Änderungen aus dem flüchtigen RAM auf die dauerhafte Festplatte überträgt.",
      path: "Tastatur ➔ RAM ➔ CPU ➔ SSD/HDD ➔ ROM ➔ Bildschirm",
      q: "Was passiert, wenn der Computer vor dem Speichern (Strg+S) plötzlich abstürzt?",
      opts: [
        "Änderungen gehen verloren, da sie nur im flüchtigen RAM lagerten.",
        "Die Datei wird automatisch in das Glas des Bildschirms eingebrannt.",
        "Die Tastatur speichert alle getippten Tasten des Tages ab."
      ],
      expl: "Richtig! Der RAM leert sich ohne Stromzufuhr sofort. Nur Speichern auf SSD/HDD garantiert den permanenten Erhalt.",
      steps: [
        { title: "Schritt 1: Befehl Strg+S", act: "Der Nutzer drückt Strg + S auf der Tastatur.", why: "Die Tastatur ist ein Eingabegerät. Strg+S ist das universelle Tastaturkürzel zum Sichern auf Festplatte." },
        { title: "Schritt 2: Puffer im RAM", act: "Ergänzte Texte werden als zu schreibende Daten im RAM bereitgehalten.", why: "Der RAM hält die aktuelle dynamische Version des Dokuments fest." },
        { title: "Schritt 3: Taktung der CU", act: "Das Steuerwerk blockiert konkurrierende Zugriffe für den Schreibvorgang.", why: "Die CU koordiniert Systembusse, um Datenfehler beim Schreiben zu verhindern." },
        { title: "Schritt 4: Schreiben auf SSD", act: "Die Datenblöcke werden permanent in die Flash-Bereiche der SSD geschrieben.", why: "Die SSD ist das einzige Medium, das Daten unbegrenzt ohne Strom sichert." },
        { title: "Schritt 5: Indexupdate", act: "Die CPU aktualisiert Tabellen über System-ROM-Definitionen.", why: "Das Betriebssystem schreibt die neue Dateigröße und den Pfad in die Index-Tabelle." },
        { title: "Schritt 6: Bestätigung auf Monitor", act: "Der Monitor aktualisiert die Statuszeile; das Dokument ist gesichert.", why: "Das Ausgabegerät signalisiert dem Nutzer Sicherheit durch ein Erlöschen des Änderungssymbols." }
      ],
      bullet: [
        "Die Tastatur sendet Strg+S, um den sofortigen Speichervorgang anzufordern.",
        "Nicht gespeicherte Daten hängen vollkommen von der elektrischen Spannung des RAM ab.",
        "Das Steuerwerk lenkt die Registerdaten zum SSD-Speicher-Controller um.",
        "Die Flash-Transistoren des SSD-Laufwerks sichern die Daten dauerhaft fest.",
        "Das Dateisystem wird aktualisiert, um Pfad und Größe der Datei zu vermerken.",
        "Der Monitor gibt visuelles Feedback zur Bestätigung der erfolgreichen Aufzeichnung."
      ]
    },
    cycle_cpu: {
      title: "Szenario 6: CPU-Zyklus (Fetch-Decode-Execute)",
      desc: "Beobachten Sie im Zeitlupentakt den Kern des Prozessors: Befehl holen (Fetch), Befehl entschlüsseln (Decode) und Befehl ausführen (Execute).",
      path: "RAM ➔ Steuerwerk ➔ Register ➔ ALU ➔ Register ➔ RAM",
      q: "Was beschreibt der Fetch-Decode-Execute-Zyklus in der Von-Neumann-Architektur?",
      opts: [
        "Ein Wartungsprogramm zur Kühlung des Prozessors.",
        "Die grundlegende Taktfolge der CPU zum Lesen, Verstehen und Ausführen von Befehlen.",
        "Die Schutzfunktion bei Überhitzung der Hardware."
      ],
      expl: "Brillant! Befehl holen (Fetch), übersetzen (Decode) und mathematisch berechnen (Execute) ist der ewige Prozessor-Kreislauf.",
      steps: [
        { title: "Schritt 1: Befehl holen", act: "Der Prozessor holt den nächsten Befehl aus der entsprechenden RAM-Speicheradresse.", why: "Der Programmcode liegt im Arbeitsspeicher. Der Befehlszähler (PC) markiert die genaue Position." },
        { title: "Schritt 2: CU-Erhalt", act: "Der Befehl wandert über Datenleitungen in das Steuerwerk der CPU.", why: "Das Steuerwerk hält den Befehl in einem temporären Instruktionsregister zur Analyse bereit." },
        { title: "Schritt 3: Dekodieren (Decode)", act: "Das Steuerwerk dekodiert die Bits, um die geforderte Aktion zu deuten.", why: "CPUs sind rein logisch verdrahtet; dekodierte Signale aktivieren die passenden Hardware-Pfade." },
        { title: "Schritt 4: Register laden", act: "Der Prozessor lädt die Zahlenwerte (Operanden) aus den CPU-Registern.", why: "Register liegen nur Mikrometer von den Rechenkernen entfernt und reagieren in Nanosekunden." },
        { title: "Schritt 5: Ausführen (Execute)", act: "Das Rechenwerk (ALU) führt die Addition mit Logikgattern physisch aus.", why: "Die physische Rechnungslegung erfolgt hier. AND/OR-Gatter schalten Spannungen zum Gesamtwert zusammen." },
        { title: "Schritt 6: Puffer im Register", act: "Das berechnete Ergebnis wird kurzzeitig im Akkumulator-Register abgelegt.", why: "Dort bleibt das Ergebnis stabil, bevor es ins RAM oder an den Bildschirm transportiert wird." }
      ],
      bullet: [
        "Die CPU holt den Binärcode gesteuert durch den Befehlszähler aus dem RAM.",
        "Die Binärcodes werden im Steuerwerk (CU) zwischengelagert.",
        "Das Steuerwerk übersetzt Signale und leitet sie zur zuständigen Rechenwerk-Logik weiter.",
        "Ultraschnelle CPU-Register liefern sofort die nötigen Rechenoperanden.",
        "Die ALU löst Rechnungen hardwareseitig durch Schalten von Halbleitertransistoren.",
        "Die Ergebnisse landen in Akkumulatoren, bereit für den nächsten Taktzyklus."
      ]
    },
    demarrage_pc: {
      title: "Szenario 7: PC-Startvorgang",
      desc: "Erleben Sie, wie der Einschaltknopf das Netzteil, den BIOS-ROM und den RAM weckt, um das Betriebssystem zu laden.",
      path: "Power-Knopf ➔ Netzteil ➔ ROM ➔ RAM ➔ CPU ➔ OS ➔ Bildschirm",
      q: "Welches Bauteil speichert das Startprogramm (BIOS) dauerhaft und stromlos?",
      opts: [
        "Der flüchtige Arbeitsspeicher RAM.",
        "Der nicht-flüchtige ROM-Chip (Read-Only Memory).",
        "Der mechanische Federknopf am Gehäuse."
      ],
      expl: "Hervorragend! Der RAM ist beim Einschalten leer. Nur der schreibgeschützte ROM-Chip speichert das BIOS unlöschbar.",
      steps: [
        { title: "Schritt 1: Einschalten des PC", act: "Physisches Drücken des Einschaltknopfs am Computergehäuse.", why: "Der Druck schließt den Stromkreis des Mainboards und weckt das Netzteil." },
        { title: "Schritt 2: PSU regelt Strom", act: "Das Netzteil regelt Haushaltsstrom in konstante Kleinspannungen.", why: "Halbleiterschaltkreise benötigen extrem stabile Spannungen (+12V, +5V, +3.3V) zum Schutz vor Schäden." },
        { title: "Schritt 3: BIOS aus ROM", act: "Die CPU startet und liest das im ROM-Chip hinterlegte BIOS-Startprogramm.", why: "Da der RAM anfangs leer ist, muss der Prozessor im ROM nachlesen, wie das POST-Prüfprogramm zu starten ist." },
        { title: "Schritt 4: OS laden in RAM", act: "Der Bootloader kopiert den Kernel des Betriebssystems von der SSD in den RAM.", why: "Der SSD-Zugriff ist im Nanosekunden-Takt der CPU zu langsam; Systemdaten gehören in den RAM." },
        { title: "Schritt 5: CPU-Ausführung", act: "Die CPU verarbeitet die frisch in den RAM kopierten Systembefehle.", why: "Die CPU steuert alle Hintergrundthreads und Systemvariablen des Betriebssystems." },
        { title: "Schritt 6: OS bereit", act: "Das OS konfiguriert die Treiber, Grafikoberflächen und Desktop-Widgets.", why: "Das OS fungiert als allseitiger Übersetzer zwischen Hardware und Anwendersoftware." },
        { title: "Schritt 7: Desktop-Grafik", act: "Der Grafikspeicher sendet das Desktop-Bildsignal an den Monitor.", why: "Der Monitor (Ausgabegerät) zeigt das Bild an und bestätigt den erfolgreichen Startvorgang." }
      ],
      bullet: [
        "Der Einschaltknopf schließt mechanisch den Stromkreis des Netzteils.",
        "Netzteile wandeln Wechselstrom in lebenswichtige Gleichspannungen für Chips.",
        "Der ROM-Chip bewahrt das BIOS dauerhaft, da der RAM anfangs völlig leer ist.",
        "RAM-Module puffern Systemdateien für maximale Verarbeitungsgeschwindigkeiten.",
        "Die CPU führt den Betriebssystem-Kernel sowie alle Initialisierungen aus.",
        "Das Betriebssystem richtet Benutzeroberflächen, Treiber und Desktop-Widgets ein.",
        "Der Monitor zeichnet das finale Bild und schließt den PC-Einschaltvorgang erfolgreich ab."
      ]
    }
  };

  // Arabic
  tMap.ar = {
    clavier_ecrire: {
      title: "السيناريو 1: أكتب بلوحة المفاتيح",
      desc: "راقب خطوة بخطوة كيف يسافر الحرف 'A' من ضغطة زر لوحة المفاتيح إلى الشاشة.",
      path: "لوحة المفاتيح ➔ الناقل ➔ RAM ➔ المعالج ➔ RAM ➔ الشاشة",
      q: "عندما تضغط زر لوحة المفاتيح، هل تذهب البيانات مباشرة للشاشة؟",
      opts: [
        "نعم، هناك سلك مباشر يربط لوحة المفاتيح بالشاشة مباشرة.",
        "لا، يجب أن يمر التيار الكهربائي عبر دارات المعالجة (رام، معالج، ناقل) ليتم معالجته رقميا.",
        "نعم، الشاشة تمتص شحنة الزر الميكانيكية."
      ],
      expl: "ممتاز! الضغطة تولد كودا ثنائيا يوجه، يخزن ويعالج قبل تمثيل البكسلات وإضاءة الشاشة.",
      steps: [
        { title: "الخطوة 1: ضغط الحرف 'A'", act: "يضغط المستخدم فيزيائيا على زر الحرف 'A' بلوحة المفاتيح.", why: "لوحة المفاتيح جهاز إدخال يبدأ مغامرة سير البيانات." },
        { title: "الخطوة 2: الرقمنة للغة ثنائية", act: "تحول لوحة المفاتيح الحركة لتيار ثنائي يفهمه الكمبيوتر.", why: "الحاسب لا يفهم الأحرف المجردة بل يحتاج لكود كهربائي نبضي: 01000001." },
        { title: "الخطوة 3: التوجيه عبر الناقل", act: "ينقل ناقل البيانات الإشارة لكافة القطع الإلكترونية باللوحة.", why: "الناقل هو الطريق السريع الواصل بين جميع المعماريات." },
        { title: "الخطوة 4: التخزين المؤقت بالرام", act: "تحتفظ الرام بالبيانات والرموز الثنائية لشغل المعالج بها.", why: "المعالج يتعامل مباشرة مع ذواكر العمل السريعة جدا كالـ RAM." },
        { title: "الخطوة 5: فك التشفير بالمعالج", act: "يفك المعالج الرمز ويجهز حزم الرسم والألوان للشاشة.", why: "يقرأ المعالج التعليمات ويفهم النية بالرسم والتلوين ويوجه كرت الشاشة." },
        { title: "الخطوة 6: الارتداد بالذاكرة", act: "ترسل البكسلات الملونة المحسوبة مؤقتا للرام لتأثيث الشاشة بالصورة.", why: "رقاقة الشاشة ترتبط بالرام لاستعراض الصورة قبل الرسم النهائي الفيزيائي." },
        { title: "الخطوة 7: العرض للشاشة", act: "تضيء الشاشة البكسلات الملونة المحددة لتمثيل حرف 'A'.", why: "الشاشة جهاز إخراج يترجم التيارات الثنائية المخفية لألوان ضوئية تراها العين." }
      ],
      bullet: [
        "لوحة المفاتيح جهاز إدخال يترجم الحركة البشرية للغة الآلة الثنائية.",
        "الناقل هو الشبكة والشارع العام الرابط لتدفق المعلومات بالبورد.",
        "الرام ذاكرة عمل نشطة للغاية، وتفريغ التيار الكهربائي يحذف بياناتها كليا.",
        "المعالج هو مخ الكمبيوتر يحرك ويشرف ويفكك العمليات الرياضية.",
        "الشاشة تمثل المخرج النهائي لتحويل التيارات الكهربائية لأشكال مرئية."
      ]
    },
    faire_calcul: {
      title: "السيناريو 2: أقوم بعملية حسابية (2 + 3)",
      desc: "اكتشف كيف يقوم المعالج بإجراء العمليات الرياضية والجمع ويخرج القيمة 5.",
      path: "لوحة المفاتيح ➔ RAM ➔ المعالج ➔ ALU ➔ RAM ➔ الشاشة",
      q: "من يقوم فعلياً بالعملية الحسابية 2 + 3 داخل الكمبيوتر؟",
      opts: [
        "الشاشة بشكل منفرد وتلقائي.",
        "وحدة الحساب والمنطق (ALU) التي تمثل العضلات الرياضية داخل المعالج المركزي.",
        "القرص الصلب بحك القرص المغناطيسي."
      ],
      expl: "رائع! وحدة الحساب والمنطق (ALU) الموجودة بقلب المعالج CPU هي المسؤولة عن حل الرياضيات والمنطق.",
      steps: [
        { title: "الخطوة 1: كود الأزرار", act: "يدخل الطالب العملية '2 + 3' بلوحة المفاتيح.", why: "ترسل لوحة المفاتيح القيم والأوامر الحسابية عبر ناقل النظام." },
        { title: "الخطوة 2: الحفظ بالرام", act: "تحفظ الأعداد والرموز بالرام لتكون بمتناول يد المعالج.", why: "كافة قيم التشغيل النشطة والبرامج ترتب بالرام لسهولة استدعائها." },
        { title: "الخطوة 3: الجلب للمعالج", act: "يسحب المعالج القيم والإيعازات من خلايا الرام.", why: "يستعد المعالج لتنفيذ الحساب بجلب الأطراف لمسجلاته السريعة." },
        { title: "الخطوة 4: فك التشفير بوحدة التحكم", act: "تقوم وحدة التحكم بفك تشفير الأمر وفهمه.", why: "وحدة التحكم هي المنسق: تفهم أن النية جمع وتوجه المدخلات لقسم الحساب." },
        { title: "الخطوة 5: الحل بوحدة الحساب والمنطق", act: "تقوم وحدة الحساب والمنطق (ALU) بحل 2 + 3 = 5.", why: "وحدة ALU عبارة عن بوابات سيليكونية كهربائية تنفذ الإضافة ثنائيا." },
        { title: "الخطوة 6: حفظ المخرج بالرام", act: "يرسل المعالج الرقم الناتج 5 للرام مجدداً.", why: "يجب تسجيل النتائج في ذاكرة العمل ريثما يوجه الأمر لكرت الشاشة." },
        { title: "الخطوة 7: العرض النهائي للشاشة", act: "تستقبل الشاشة أوامر الرسم من الذاكرة وتظهر الرقم 5 للطالب.", why: "ينهي جهاز الإخراج الدورة الحاسوبية بعرض البيانات المعالجة." }
      ],
      bullet: [
        "البيانات المدخلة تعبر للرام أولاً قبل بدء المعالجة بالمعالج المركزي.",
        "وحدة التحكم هي قائد التوجيه لتفكيك فكرة ومسار العملية.",
        "وحدة الحساب والمنطق ALU تصنع وتقوم كهربائيا بالحل الدقيق للجمع.",
        "ترجع النتيجة للرام كحلقة ربط أساسية لضمان سلامة سير تتابع العمل.",
        "تعرض الشاشة القيمة 5 ملخصة دورة: إدخال ➔ معالجة ➔ إخراج."
      ]
    },
    ouvrir_image: {
      title: "السيناريو 3: أفتح صورة",
      desc: "افهم كيف يتم نسخ الصورة المخزنة على قرصك الصلب الدائم إلى الذاكرة المؤقتة (RAM) ثم معالجتها بواسطة معالج الرسوميات (GPU / كارت الشاشة) لعرضها.",
      path: "التخزين ➔ RAM ➔ المعالج ➔ GPU ➔ الشاشة",
      q: "ما هو المكون المصمم خصيصاً لحساب وعرض ملايين البكسلات والرسومات ثنائية وثلاثية الأبعاد؟",
      opts: [
        "وحدة التغذية الكهربائية باللوحة الأم.",
        "معالج الرسوميات (GPU) المخصص للأعمال الرسومية المكثفة.",
        "مكبر الصوت بفضل اهتزازاته الصوتية."
      ],
      expl: "رائع! الـ GPU (بطاقة الشاشة) مهيأة ومعززة لمعالجة تدفق بكسلات العرض الحديث فائق السرعة.",
      steps: [
        { title: "الخطوة 1: طلب ملف الصورة", act: "ينقر المستخدم نقرًا مزدوجًا فوق ملف 'image.jpg' المخزن.", why: "يطلب هذا الإجراء من النظام تحديد موقع الصورة المحفوظة بأمان على القرص الصلب الدائم." },
        { title: "الخطوة 2: القراءة من التخزين الدائم", act: "يتم استخراج وقراءة ملف الصورة المضغوط من قرص SSD الدائم.", why: "التخزين الدائم يحتفظ بالملفات والبيانات حتى في حالة إيقاف التشغيل التام وانقطاع الكهرباء." },
        { title: "الخطوة 3: التحميل المؤقت بالرام", act: "يتم نسخ ملف الصورة وتحميله بالرام (RAM) كليا.", why: "المعالج يتفاعل ويعمل حصريًا مع البيانات المنسوخة في الذاكرة الحية السريعة RAM لضمان السرعة." },
        { title: "الخطوة 4: فك التشفير بالمعالج", act: "يقوم المعالج بفك ضغط كود وبنية صورة JPG المشفرة.", why: "تكون ملفات JPG مضغوطة لتوفير المساحة، المعالج يتولى فك بنية الكود للحصول على البكسلات الأصلية." },
        { title: "الخطوة 5: المعالجة الرسومية بالـ GPU", act: "يتولى معالج الرسوميات (GPU / بطاقة الشاشة) معالجة ورسم مصفوفة البكسلات.", why: "تحتوي بطاقة الشاشة على آلاف الأنوية الدقيقة المخصصة لحساب ألوان ومصفوفات الصور بسرعة فائقة." },
        { title: "الخطوة 6: العرض على الشاشة", act: "تضيء الشاشة لمبات LED الخاصة بها وتظهر الصورة المفككة بالكامل.", why: "تتلقى الشاشة مصفوفة البكسلات المحسوبة من كرت الشاشة وتعرضها كضوء مرئي للمستخدم." }
      ],
      bullet: [
        "يتم حفظ ملفاتك كالصور والبرامج بأمان داخل القرص الصلب أو SSD (التخزين الدائم).",
        "لا يمكن للمعالج معالجة ملفات القرص الصلب مباشرة وبسرعة كافية لبطئه الشديد مقارنة به.",
        "يتم نسخ ملف 'image.jpg' مؤقتاً بالرام (RAM) ليكون تحت تصرف المعالج المركزي فوراً.",
        "المعالج المركزي يتولى فك تشفير وضغط الصورة للحصول على مصفوفة العرض الأساسية.",
        "معالج الرسوميات GPU يتولى بكفاءة إدارة الألوان والترددات لتخفيف الضغط الكومبيوتري عن المعالج.",
        "تعرض الشاشة الصورة النهائية كأضواء وبكسلات ملونة واضحة لسطح العين."
      ]
    },
    ouvrir_fichier: {
      title: "السيناريو 4: أفتح ملفاً أو مجلداً",
      desc: "اكتشف كيف يؤدي النقر المزدوج فوق مجلد أو ملف إلى إطلاق عملية بحث بالقرص ثم تحميله بذواكر الرام لتعديله.",
      path: "الفأرة ➔ وحدة التحكم ➔ SSD/HDD ➔ RAM ➔ المعالج ➔ الشاشة",
      q: "أين يتم الاحتفاظ بملف نصي بشكل دائم بعد إيقاف تشغيل الكمبيوتر كلياً؟",
      opts: [
        "في الذاكرة العشوائية RAM المؤقتة والمتطايرة.",
        "في قرص التخزين الدائم الصلب (SSD/HDD).",
        "في ذبذبات أزرار لوحة المفاتيح الهامشية."
      ],
      expl: "ممتاز! يحتفظ التخزين الدائم (SSD/HDD) بالملفات بأمان تام وبدون الحاجة لتيار كهربائي مستمر.",
      steps: [
        { title: "الخطوة 1: نقر مزدوج من المستخدم", act: "يقوم المستخدم بالنقر المزدوج فوق أيقونة المجلد أو الملف باستخدام الفأرة.", why: "الفأرة جهاز إدخال يحول حركة اليد والنقرة الفيزيائية لكود إحداثيات ثنائي يوجه للمعالج." },
        { title: "الخطوة 2: تنبيه وحدة التحكم", act: "داخل المعالج، تلتقط وحدة التحكم (CU) النقرة وتوقف المعالجات الهامشية الجارية.", why: "تنسق وحدة التحكم عمل اللوحة الأم كليا، حيث تفهم رغبة المستخدم وتسأل المذربورد التواصل مع القرص." },
        { title: "الخطوة 3: البحث والتوجيه بالقرص", act: "يحدد مدير القرص المساحة والقطاعات الفيزيائية للمجلد المطلوب على الـ SSD.", why: "يمتلك الهارد ديسك جدول فهرسة يربط مسارات المجلد بمواقع الكهرباء الثابتة في خلايا الهارد." },
        { title: "الخطوة 4: التحميل والنسخ بالرام", act: "يتم نسخ ملفات وبايتات المجلد بسرعة فائقة ووضعها بالذاكرة RAM.", why: "سرعة استجابة الهارد ديسك بطيئة مقارنة بنبضات المعالج، لذا يتم ترحيل الملف مؤقتاً للرام النشطة." },
        { title: "الخطوة 5: التشكيل من المعالج", act: "يعالج المعالج الكود الثنائي لإعادة تشكيل المجلد وبنائه الرسومي.", why: "يجب حساب الأيقونات والنصوص والمربعات الواجب إظهارها استناداً للبيانات القادمة من الرام." },
        { title: "الخطوة 6: الظهور على الشاشة", act: "تظهر الشاشة المجلد مفتوحاً ومحتوياً على ملفاتك ودروسك المدرسية.", why: "يقدم جهاز الإخراج النتيجة النهائية للطالب ليتسع له المجال لتصفح أعماله المدرسية." }
      ],
      bullet: [
        "ترسل الفأرة إشارات الماوس عبر ناقل النظام لطلب الفتح والقراءة للمجلد.",
        "تلتقط وحدة التحكم الإشارة وتستعلم عن القرص الصلب مع توقيف أعمال التخلف الأخرى.",
        "الهارد SSD يقرأ بيانات المجلد حتى لو كان مطفأ بنسبة 100% البارحة.",
        "يتم تحميل وتخزين المجلد بالرام RAM لتسهيل قراءته السريعة من المعالجة والدوائر المنطقية.",
        "يقوم المعالج بفهم وترجمة بنيويات الملف قبل أن يأمر النظام بتحديث واجهة العرض.",
        "تعرض الشاشة المجلد والملفات جاهزة للاستغلال والتعديل من طرف الطالب."
      ]
    },
    enregistrer_fichier: {
      title: "السيناريو 5: أحفظ ملفاً (Ctrl+S)",
      desc: "راقب كيف ينقل أمر الحفظ من لوحة المفاتيح تعديلاتك المؤقتة بالرام ليدبجها بشكل دائم في القرص الصلب.",
      path: "لوحة المفاتيح ➔ RAM ➔ المعالج ➔ SSD/HDD ➔ ROM ➔ الشاشة",
      q: "ماذا يحدث إذا انقطع التيار الكهربائي فجأة عن الكمبيوتر قبل الضغط على حفظ (Ctrl+S)؟",
      opts: [
        "تضيع التعديلات الجديدة للأسف لأنها كانت محفوظة بالكامل بالرام RAM المتطايرة.",
        "يسجل الملف ذاتيا بالليزر على واجهة الزجاج الخارجي للشاشة.",
        "تحفظ لوحة المفاتيح الأزرار التي ضغطت عليها طيلة اليوم في ذاكرتها الخاصة."
      ],
      expl: "بالتأكيد! ذاكرة الرام فارغة تماما بمجرد فصل التيار الكهربائي، الحفظ في القرص الصلب ضروري لنحت البيانات فيزيائياً.",
      steps: [
        { title: "الخطوة 1: كتابة أمر الحفظ Ctrl+S", act: "يضغط المستخدم على زري Ctrl + S بلوحة المفاتيح لحفظ مستنده ومجهوده.", why: "لوحة المفاتيح جهاز إدخال، يمثل هذا الاختصار السريع طلب كتابة فوري على القرص." },
        { title: "الخطوة 2: الحيز المؤقت بالرام", act: "توضع الكلمات والفقرات المضافة كبايتات تعديل جارية بالرام.", why: "تحتفظ الرام بالنسخة النشطة الجاري صياغتها والتي تحتوي على آخر فقرات خطها التلميذ." },
        { title: "الخطوة 3: تنسيق وجدولة وحدة التحكم", act: "تجدول وحدة التحكم (CU) أمر الكتابة الفعلي وتلغي المعالجات المتداخلة.", why: "تقوم وحدة التحكم بالإشراف على النبضات لمنع تداخل العمليات وحماية الملف من التلف." },
        { title: "الخطوة 4: الكتابة في التخزين الدائم", act: "تُنسخ البيانات فيزيائياً في بوابات الناند (NAND) لهارد الـ SSD.", why: "أقراص التخزين هي القطع الوحيدة القادرة على الاحتفاظ بشكل صلب بالبيانات في غياب تام للموجة الكهربية." },
        { title: "الخطوة 5: التحقق من نظام الملفات", act: "يتواصل المعالج مع جداول الفهرس المتواجدة بالبيوس لتنسيق التغييرات.", why: "للتحقق من سلامة هيكلة الهارد ديسك، يقوم النظام بطلب مراجعة دليل نظام التخصيص." },
        { title: "الخطوة 6: التفاعل الإيجابي بالشاشة", act: "تزيل الشاشة علامة النجمة الدالة على التعديل، معلنة حفظ الملف.", why: "يطمئن جهاز الإخراج التلميذ بكون الملف محمي ومحفوظ بنجاح." }
      ],
      bullet: [
        "بعث لوحة المفاتيح أمراً سريعاً Ctrl+S لطلب معالجة فورية لحفظ المحتوى النشط.",
        "تكون المستند بأكمله ثابتا بفضل الشحنات المؤقتة للرام RAM الحية.",
        "تأمر وحدة التحكم بالمعالج تدفق البيانات من الرام لتنخرط في ذاكرة خلايا القرص الصلب.",
        "تحتفظ خلايا السيلكون بهارد الـ SSD بكامل الحروف بصفة أبدية.",
        "يتم تعديل وتحديث دليل الفهرس ونظام الملفات لتسجيل التغيير ووزن الملف الحالي.",
        "تحدث الشاشة الواجهة وتزيل علامات الإنذار إبلاغاً بالطمأنينة."
      ]
    },
    cycle_cpu: {
      title: "السيناريو 6: دورة المعالج (جلب-فك-تنفيذ)",
      desc: "راقب بالحركة البطيئة أساس عمل المعالجات الدقيقة: جلب التعليمة (Fetch)، فك الرموز والتشفير (Decode)، والتنفيذ (Execute).",
      path: "RAM ➔ وحدة التحكم ➔ المسجلات ➔ وحدة الحساب والمنطق ➔ المسجلات ➔ RAM",
      q: "في بنية حاسوب فون نيومان، ماذا تصف حلقة (Fetch-Decode-Execute) بدقة؟",
      opts: [
        "برنامج خدمي مهم لتنظيف مروحة المعالج من الغبار المادي.",
        "حلقة العمل الأساسية للمعالج لقراءة وفهم وتطبيق أي أمر.",
        "نظام حماية خاص لقفل الكمبيوتر إذا ارتفعت حرارة اللوحة الأم."
      ],
      expl: "عبقري رائع! دورة جلب التعليمة من الرام، وفك شفرتها، وتنفيذ عمليتها الحسابية هي دقات قلب المعالج المستمر.",
      steps: [
        { title: "الخطوة 1: جلب التعليمة (Fetch)", act: "يسحب المعالج التعليمة من عنوانها بالرام RAM.", why: "تتواجد أكواد العمل بالرام، ويقوم عداد البرنامج (PC) بتتبع وحفظ خط سير تنفيذ التعليمات." },
        { title: "الخطوة 2: الاستقبال في وحدة التحكم", act: "تسافر التعليمة عبر ناقل البيانات وتستقر في وحدة التحكم داخل المعالج.", why: "تمتلك وحدة التحكم مسجلاً خاصاً ومؤقتاً لحفظ التعليمة بقلب السيلكون الجاري تحليله." },
        { title: "الخطوة 3: فك تشفير الأمر (Decode)", act: "تفك وحدة التحكم تشفير كود التعليمة لتستوعب ما إذا كان جمعاً أو كتابة.", why: "المعالج دارة منطقية، فك شفرة التعليمة تحفز وبشكل أوتوماتيكي بوابات كهربائية مخصصة كالجمع." },
        { title: "الخطوة 4: تحميل المسجلات الداخلية", act: "يتطلب التنفيذ جلب الأرقام. يسحب المعالج المدخلات من مسجلاته الداخلية السريعة.", why: "تتواجد المسجلات على بعد ميكرومترات من أنوية التنفيذ، وتعطي البيانات بأقل من نانوثانية." },
        { title: "الخطوة 5: التنفيذ الرياضي (Execute)", act: "تقوم وحدة الحساب والمنطق (ALU) بالجمع الرياضي وإخراج الناتج.", why: "هنا يتم تفعيل النبضات، البوابات المنطقية الـ AND/OR بداخل الـ ALU تباشر دمج الشحنات لتمثيل الناتج." },
        { title: "الخطوة 6: التخزين المؤقت للنتيجة", act: "يتم تسجيل الناتج بمخزن المسجل الخاص داخل لدن المعالج قبل إرساله.", why: "يتم حجز القيمة المحسوبة للحفاظ عليها ريثما يوجه أمر لإعادتها للرام." }
      ],
      bullet: [
        "تبدأ الدورة بجلب التعليمة من الرام ويحفظ عداد البرنامج خط السير المعني.",
        "يتم وضع الكود الثنائي فوراً بمسجل وحدة التوجيه والتحكم بالمعالج.",
        "تقوم وحدة التحكم بفك تشكيلة الإشارات لتوجيه الكهرباء لدارة الـ ALU المناسبة.",
        "المسجلات الداخلية السريعة تمد الدارات بالقيم والأرقام المطلوب حلها.",
        "بوابات السيليكون بوحدة الـ ALU تنفذ الحل والجمع الفعلي للقيم.",
        "يخزن المسجل النتيجة بصفة جارية قبل نقلها لعالم الرام الواسع الخارجي أو الشاشات."
      ]
    },
    demarrage_pc: {
      title: "السيناريو 7: إقلاع وتشغيل الكمبيوتر",
      desc: "اكتشف كيف أن الضغط على زر التشغيل يوقظ الكمبيوتر بتنشيط وحدة الطاقة، فحص البيوس بالـ ROM، تحميل نظام التشغيل بالرام وعرضه.",
      path: "زر الطاقة ➔ مزود الطاقة ➔ ROM ➔ RAM ➔ المعالج ➔ نظام التشغيل ➔ الشاشة",
      q: "أي جزء في الجهاز يحتفظ ببرنامج الإقلاع الأولي (BIOS) بصفة دائمة ومستقرة وبدون حاجة للكهرباء؟",
      opts: [
        "الذاكرة العشوائية RAM المتطايرة.",
        "رقاقة الـ ROM (ذاكرة القراءة فقط) غير المتطايرة والمحمية.",
        "أزرار العلبة البلاستيكية الميكانيكية."
      ],
      expl: "مدهش! الذاكرة RAM تكون فارغة ومعدومة بمجرد الإطفاء. رقاقة الـ ROM هي الوحيدة التي تحتفظ ببرمجة البيوس الأبدي اللازم لبدء العمل.",
      steps: [
        { title: "الخطوة 1: ضغط زر الطاقة", act: "يضغط المستخدم فيزيائياً على زر الطاقة الموجود بعلبة الكيس بالكمبيوتر.", why: "الضغط الميكانيكي يغلق دارة التماس منخفض التوتر باللوحة الأم، آمراً مزود الطاقة بالاستيقاظ." },
        { title: "الخطوة 2: إطلاق مزود الطاقة", act: "تشتغل علبة التغذية PSU وتبدأ بتوزيع وتعديل الفولتات لكافة الدوائر.", why: "تحتاج دارات السيلكون لتنظيم دقيق ومستمر للجهود المستمرة (+12V, +5V, +3.3V) لتجنب حرق القطع." },
        { title: "الخطوة 3: تشغيل البيوس بالـ ROM", act: "يستيقظ المعالج ويباشر قراءة برنامج الإقلاع الثابت (BIOS) داخل رقاقة الـ ROM.", why: "بما أن الرام تكون فارغة تماماً عند التشغيل، يتجه المعالج فوراً لرقاقة ROM لقراءة برنامج الفحص." },
        { title: "الخطوة 4: تحميل نظام التشغيل بالرام", act: "يقرأ محمل الإقلاع نواة نظام التشغيل من قرص الـ SSD وينسق تنزيله بالرام.", why: "هارد الـ SSD بطيء جدا مقارنة بحسابات المعالج، لذا يجب نقل النواة لخلايا الرام للسرعة." },
        { title: "الخطوة 5: التنفيذ بالمعالج", act: "يبدأ المعالج بمعالجة وتنفيذ الأوامر البرمجية للنظام المرحل بالرام.", why: "المعالج هو مركز المعالجات، يتولى جدولة وتنفيذ الأعماد الإدارية والخيوط الحيوية للنظام." },
        { title: "الخطوة 6: واجهة نظام التشغيل", act: "يقوم نظام التشغيل بتهيئة جلسة المستخدم وتفعيل الرسوم والتعريفات.", why: "يقوم نظام التشغيل بدور المترجم التفاعلي ليسهل العلاقات بين البرامج والعتاد المادي للجهاز." },
        { title: "الخطوة 7: الظهور بالشاشة", act: "ترسل كروت الشاشة البكسلات المرتبة لواجهة سطح المكتب لتظهر به.", why: "تحول الشاشة (جهاز الإخراج) تدفق الألوان من كرت الشاشة لنور مرئي يعلن إتمام تشغيل الجهاز بنجاح." }
      ],
      bullet: [
        "يغلق زر الكيس دارة ميكانيكية لتحفيز واستدعاء مزود الطاقة.",
        "ينظم مزود الطاقة PSU التوتر لجهود منخفضة صحية ومستقرة للأجهزة.",
        "تحتفظ شريحة الـ ROM ببرمجة البيوس الأبدي نظراً لأن الرام تبدأ خالية من البيانات بالكامل.",
        "الرام تستقبل أكواد نظام التشغيل لتوفير سرعة جريان فائقة بالتشغيل والتسلسل الجاري.",
        "المعالج CPU يباشر فك وحل النواة الرئسة للتشغيل وإدارة الحسابات النشطة.",
        "يتولى نظام التشغيل تهيئة التعاريف والواجهة الرسومية والمستندات وخرائط التفاعل الحية.",
        "ترسم الشاشة واجهة الولوج مؤكدة بكل يسر إقلاع هذا الكمبيوتر بنجاح باهر."
      ]
    }
  };

  // Convert map to dynamic array matching ScenarioType
  const langPack = tMap[lang as Exclude<SupportedLang, 'fr'>];

  return scenariosData.map((sc: any) => {
    const override = langPack[sc.id];
    if (!override) return sc;
    return {
      ...sc,
      title: override.title,
      description: override.desc,
      pathString: override.path,
      activationQuestion: {
        question: override.q,
        options: override.opts,
        correctIndex: sc.activationQuestion.correctIndex,
        explanation: override.expl
      },
      steps: sc.steps.map((st: any, idx: number) => {
        const stepOver = override.steps[idx];
        if (!stepOver) return st;
        return {
          ...st,
          title: stepOver.title,
          queSePasseTil: stepOver.act,
          pourquoi: stepOver.why,
          packetValue: stepOver.val || st.packetValue
        };
      }),
      summaryPoints: override.bullet
    };
  });
}

// --- (4) QUIZ DATA LOCALIZATION ---
const quizTranslations: Record<Exclude<SupportedLang, 'fr'>, Record<number, { q: string; opts: string[]; expl: string }>> = {
  en: {
    1: {
      q: "Which hardware component processes data and coordinates all computer operations?",
      opts: ["The Screen / Monitor", "The CPU (Processor)", "The Keyboard", "The Mass Storage Drive"],
      expl: "The CPU (Processor) is widely called the 'brain' of your computer. It reads software instructions and performs calculations requiring logic."
    },
    2: {
      q: "Which component temporarily buffers information and gets cleared when you power off the computer?",
      opts: ["The RAM (Main Memory)", "The Monitor screen", "The Permanent Hard Drive", "The Mouse"],
      expl: "RAM (random access memory) is highly volatile: it holds information only of active software and empties completely when electrical current dies."
    },
    3: {
      q: "Which component serves as physical wiring or highways to exchange information on motherboard circuits?",
      opts: ["The Buses", "The touch screen", "The wired keyboard", "The cooling fan"],
      expl: "Buses are the physical networks. They transport electrical binary signals at high velocities from one chip to another."
    },
    4: {
      q: "The computer keyboard is what type of peripheral device?",
      opts: ["Output device", "Input device", "Storage device", "Physical data highway"],
      expl: "The keyboard injects raw user gestures into the computer's chips. It is one of the fundamental INPUT devices."
    },
    5: {
      q: "The computer screen is what type of peripheral device?",
      opts: ["Output device", "Input device", "Pure computation core", "Storage space"],
      expl: "The screen projects system graphics out to the human eye, representing a core OUTPUT device."
    },
    6: {
      q: "Where is user data (media files, documents) stored permanently without electric current?",
      opts: ["Volatile RAM memory", "CPU processor", "Mass Storage (SSD / HDD / USB)", "Data buses"],
      expl: "Mass storage SSDs or HDDs are designed to hold files permanently. They do not need electric current to preserve information!"
    },
    7: {
      q: "Which inner unit of the CPU fetches instructions, decodes commands, and schedules computing steps?",
      opts: ["Arithmetic Logic Unit (ALU)", "Control Unit (CU)", "Display screen project", "Keystroke controller"],
      expl: "The Control Unit (CU) dictates the steps inside the processor: fetching binary streams, decoding actions, and driving calculations."
    },
    8: {
      q: "Which central CPU unit resolves algebraic additions, computes math, and solves boolean operations?",
      opts: ["Arithmetic Logic Unit (ALU)", "RAM helper cells", "SSD solid state memory", "Monitor display matrix"],
      expl: "The Arithmetic Logic Unit (ALU) is the core processor math solver. It triggers logical gates to perform algebraic sums."
    }
  },
  ar: {
    1: {
      q: "ما هو المكون المادي الذي يعالج البيانات وينسق كافة عمليات الكمبيوتر؟",
      opts: ["الشاشة", "المعالج المركزي CPU", "لوحة المفاتيح", "القرص الصلب"],
      expl: "المعالج المركزي هو 'عقل' الكمبيوتر؛ يقرأ أوامر السوفت وير وينفذ المعالجات والقرارات المنطقية."
    },
    2: {
      q: "أي مكون يحفظ المعلومات مؤقتاً ويفرغ كلياً بمجرد إيقاف تشغيل الكمبيوتر؟",
      opts: ["الذاكرة العشوائية RAM", "شاشة العرض", "القرص الصلب SSD", "الفأرة (الماوس)"],
      expl: "ذاكرة الرام متقلبة ومتطايرة؛ تحفظ بيانات العمل الحالية فقط وتفرغ تماما بانقطاع الكهرباء."
    },
    3: {
      q: "ما هو المكون الذي يعمل كطريق أو ناقل نحاسي لتبادل البيانات على اللوحة الأم؟",
      opts: ["الناقل (Bus)", "شاشة اللمس", "لوحة المفاتيح السلكية", "مروحة التبريد"],
      expl: "الناقل هو شبكة النحاس المطورة؛ ينقل الإشارات الكهربائية الثنائية بسرعة فائقة بين الرقائق الإلكترونية."
    },
    4: {
      q: "لوحة المفاتيح هي جهاز مادي من أي نوع؟",
      opts: ["جهاز إخراج (Output)", "جهاز إدخال (Input)", "جهاز تخزين", "رابط نواقل مادي"],
      expl: "تسمح لوحة المفاتيح بضخ مدخلات حية من الإنسان للكمبيوتر، وهي جهاز إدخال أساسي."
    },
    5: {
      q: "الشاشة اللوحية هي جهاز مادي من أي نوع؟",
      opts: ["جهاز إخراج (Output)", "جهاز إدخال (Input)", "وحدة معالجة بحتة", "حيز تخزين للمستندات"],
      expl: "الشاشة تعرض بكسلات وصوراً يستعرضها الإنسان، فهي جهاز إخراج."
    },
    6: {
      q: "أين تحفظ بياناتك (ملفات الفولدرات، الصور، الفيديوهات) بصفة دائمة دون الحاجة لكهرباء؟",
      opts: ["الذاكرة العشوائية المتطايرة RAM", "بقلب وحدة المعالج CPU", "في وحدة التخزين (SSD / HDD)", "في أسلاك نواقل النظام"],
      expl: "أقراص التخزين SSD و HDD تحفظ المستندات بأمان دائم دون تيار كهربائي."
    },
    7: {
      q: "أي وحدة داخل المعالج تجلب التعليمات، تفك رموز الكود، وتجدول مسارات العمل؟",
      opts: ["وحدة الحساب والمنطق (ALU)", "وحدة التحكم (UC)", "جهاز العرض الضوئي", "دارة لوحة الأرقام"],
      expl: "وحدة التحكم هي مهندس العمليات؛ تجلب الكود، تفهمه، تفتحه، وتأمر القطع بالعمل والتنسيق."
    },
    8: {
      q: "أي وحدة داخل المعالج تقوم فعلياً بالعمليات الحسابية والجمع واللوجيك؟",
      opts: ["وحدة الحساب والمنطق (ALU)", "شريحة الرام النشطة", "القرص الصلب السامسونج", "معمارية عارض البكسلات"],
      expl: "وحدة ALU هي الورشة الكهربائية للرياضيات بالمعالج، تحل كهربائيا العمليات المنطقية والحسابية."
    }
  },
  es: {
    1: {
      q: "¿Qué componente procesa los datos y coordina todo el funcionamiento de la computadora?",
      opts: ["La Pantalla con monitor", "El CPU (Procesador)", "El Teclado", "La unidad de Almacenamiento"],
      expl: "El CPU es considerado el cerebro del ordenador. Lee programas y efectúa los cálculos matemáticos y lógicos."
    },
    2: {
      q: "¿Qué componente guarda información temporalmente y se vacía al apagar la computadora?",
      opts: ["La memoria RAM", "La Pantalla de píxeles", "El Disco Duro Durable", "El Mouse"],
      expl: "La RAM es volátil: retiene registros de tareas vigentes pero vacía su contenido al perder tensión eléctrica."
    },
    3: {
      q: "¿Qué componente actúa como autopista compartida para mover bits en la placa base?",
      opts: ["El Bus", "La pantalla táctil", "El teclado con cable", "El extractor de calor"],
      expl: "El Bus es el canal físico de cobre. Transporta bits lógicos binarios a gran velocidad entre chips."
    },
    4: {
      q: "¿Qué tipo de dispositivo periférico es el teclado?",
      opts: ["Periférico de Salida", "Periférico de Entrada", "Periférico de Almacenamiento", "Vía de datos física"],
      expl: "El teclado recolecta pulsos del dedo humano y los traduce en bits binarios. Es entrada pura."
    },
    5: {
      q: "¿Qué tipo de dispositivo periférico es la pantalla?",
      opts: ["Periférico de Salida", "Periférico de Entrada", "Núcleo matemático", "Espacio de disco"],
      expl: "La pantalla proyecta hacia afuera píxeles armados para el ojo humano, constituyendo un dispositivo de salida."
    },
    6: {
      q: "¿Dónde se guardan de forma perdurable tus archivos sin necesidad de corriente?",
      opts: ["En la RAM volátil", "Dentro del procesador CPU", "En el disco (SSD / HDD / USB)", "En las líneas del bus"],
      expl: "El almacenamiento de masa como discos SSD escribe los bits en celdas estables que no necesitan corriente."
    },
    7: {
      q: "¿Qué unidad del procesador decodifica comandos lógicos y calendariza los flujos de tareas?",
      opts: ["Unidad Aritmética Lógica (ALU)", "Unidad de Control (UC)", "Esquema de pantalla", "Mapeado de pulsos del teclado"],
      expl: "La Unidad de Control (UC) administra el camino, decodifica operadoras e instruye a otras tarjetas del computador."
    },
    8: {
      q: "¿Qué unidad resuelve sumas algebraicas, multiplicaciones y booleanos lógicos?",
      opts: ["Unidad Aritmética Lógica (ALU)", "Búferes RAM", "Tarjetas de almacenamiento SSD", "Matriz VRAM de pantalla"],
      expl: "La ALU es la calculadora veloz de transistores que resuelve operaciones matemáticas en nanosegundos."
    }
  },
  de: {
    1: {
      q: "Welche Komponente verarbeitet Daten und koordiniert alle Abläufe im Computer?",
      opts: ["Der Bildschirm", "Die CPU (Prozessor)", "Die Tastatur", "Das Festplattenlaufwerk"],
      expl: "Die CPU ist das Gehirn des Computers; sie liest Anweisungen und führt logische Vergleiche und Berechnungen durch."
    },
    2: {
      q: "Welcher Speicher puffert Programmdaten flüchtig und erlischt beim Ausschalten komplett?",
      opts: ["Der RAM (Arbeitsspeicher)", "Der Bildschirm-Monitor", "Das schreibgeschützte SSD-Laufwerk", "Die Maus"],
      expl: "Der RAM speichert flüchtig: Ohne konstante Stromzufuhr entladen sich die Halbleiterzellen sofort."
    },
    3: {
      q: "Welche Leitungen fungieren als logische Kommunikationsbahnen auf der Hauptplatine?",
      opts: ["Die Busse", "Der Touchscreen", "Die verbaute Tastatur", "Die Kühlkörperlüftung"],
      expl: "Busse sind physische Kupferleiterbahnen. Sie leiten Bits mit hoher Geschwindigkeit von Chip zu Chip."
    },
    4: {
      q: "Die Computertastatur gehört zu welcher Gerätekategorie?",
      opts: ["Ausgabegerät", "Eingabegerät", "Massenspeichergerät", "Systemdatenbus"],
      expl: "Tastaturen sammeln mechanischen Druck und schicken diese Werte ans System. Es ist ein EINGABEgerät."
    },
    5: {
      q: "Der Computerbildschirm gehört zu welcher Gerätekategorie?",
      opts: ["Ausgabegerät", "Eingabegerät", "Reines Rechenwerk", "Datenspeicher"],
      expl: "Monitore bringen Systemgrafiken sichtbar nach außen, sie sind AUSGABEgeräte."
    },
    6: {
      q: "Wo werden Ihre Bilder, Musikdateien und Ordner dauerhaft ohne Stromzufuhr gesichert?",
      opts: ["Im flüchtigen Arbeitsspeicher RAM", "Direkt in der CPU", "Im Massenspeicher (SSD / HDD / USB)", "Auf den Buspfaden"],
      expl: "Massenspeicher (wie SSD oder Festplatten/USB) sichern Daten stabil in Magnetschichten oder Flash-Gates."
    },
    7: {
      q: "Welches Steuerwerk der CPU holt Anweisungen, entschlüsselt sie und taktet deren Durchführung?",
      opts: ["Rechenwerk (ALU)", "Steuerwerk (UC)", "Projektionsanzeige", "Tastaturkontrolle"],
      expl: "Das Steuerwerk (UC) regelt den Ablauf der Befehle: Einholen, Entschlüsseln und Verteilung an Rechenkerne."
    },
    8: {
      q: "Welcher Prozessorbaustein führt Berechnungen wie Additionen und logische Wahr/Falsch-Vergleiche durch?",
      opts: ["Rechenwerk (ALU)", "Arbeitsspeicher RAM", "SSD Speicherkarte", "VRAM-Bildschirmpicker"],
      expl: "Das Rechenwerk (ALU) ist das grundlegende Herzstück der CPU für Additionen und logische Signalentscheidungen."
    }
  }
};

export function getLocalizedQuiz(lang: SupportedLang, baseQuiz: QuestionType[]): QuestionType[] {
  if (lang === 'fr') return baseQuiz;
  const pack = quizTranslations[lang as Exclude<SupportedLang, 'fr'>];
  return baseQuiz.map(q => {
    const override = pack[q.id];
    if (!override) return q;
    return {
      ...q,
      question: override.q,
      options: override.opts,
      explanation: override.expl,
    };
  });
}
