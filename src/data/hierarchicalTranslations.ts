import { SupportedLang } from './translations';

export interface LocalizedHierarchyStrings {
  name?: string;
  roleBadge?: string;
  functionalClassification?: string;
  physicalClassification?: string;
  shortDescription?: string;
  definition?: string;
  fonction?: string;
  exemple?: string;
  schema?: string;
  underComponents?: Record<string, {
    name?: string;
    role?: string;
    definition?: string;
    fonction?: string;
    exemple?: string;
    subElements?: { name: string; role: string; more: string }[];
  }>;
}

export const hierarchicalTranslations: Record<Exclude<SupportedLang, 'fr'>, Record<string, LocalizedHierarchyStrings>> = {
  en: {
    h_cpu: {
      name: 'Processor (CPU)',
      roleBadge: 'Main Calculating Brain',
      functionalClassification: 'Processing',
      physicalClassification: 'Central Unit (Internal)',
      shortDescription: 'Executes sequential program instructions and coordinates all physical components.',
      definition: "It is the true **brain of the computer**. It orchestrates and calculates everything that happens. Physically, the microprocessor (CPU - Central Processing Unit) is a small square silicon chip containing billions of tiny electrical switches called transistors.",
      fonction: 'It reads program instructions one after another. Scientifically, it applies a three-step execution cycle in a loop: 1. Fetch the instruction from RAM, 2. Decode it into usable signals, and 3. Execute it physically by calculating.',
      exemple: 'When you type, launch a game, or open an app, the processor instantly executes billions of binary calculations per second to respond.',
      underComponents: {
        h_uc: {
          name: 'Control Unit (CU)',
          role: 'Fetches, decodes, and directs the execution of each instruction.',
          definition: "It is the **orchestra conductor** inside the processor. It directs everything. Scientifically, the Control Unit (CU) manages the flow of information and the activation of other parts of the computer.",
          fonction: 'It fetches the instruction stored in random access memory (RAM), decodes its binary electrical meaning, and transmits precise commands to the right component to activate it at the right time.',
          exemple: 'If the received instruction is "Display letter A", it analyzes it and commands the screen to turn of corresponding pixels.'
        },
        h_ual: {
          name: 'Arithmetic Logic Unit (ALU)',
          role: 'Executes all mathematical calculations and logical comparisons.',
          definition: "It is the **ultra-fast calculator** integrated into the processor. It handles all mathematical and logical computations.",
          fonction: 'It performs two types of operations: first basic calculations (additions, subtractions, multiplications), then logical comparisons (testing options like greater than, or True/False conditions).',
          exemple: 'Doing the binary sum of 2+3 or checking if an entered password is identical to the saved password.'
        },
        h_registres: {
          name: 'Registers',
          role: 'Store tiny values needed in micro-seconds.',
          definition: "They are **small post-it memory cells** that are ultra-fast, placed directly next to the processor to note things while it calculates.",
          fonction: "They are temporary memory cells running at the processor's clock speed. They retain immediate results of ongoing calculations to avoid losing time querying the RAM.",
          exemple: 'Keeping the carry of a mathematical addition while calculating the next digit.',
          subElements: [
            { name: 'Accumulator', role: 'Direct storage for results computed by the ALU.', more: 'Any basic computed value transits through it.' },
            { name: 'Program Counter (PC)', role: 'Indicates the memory address of the next instruction to execute.', more: 'Increments continuously to keep the program moving forward.' },
            { name: 'Instruction Register (IR)', role: 'Holds the machine code instruction currently being decoded.', more: 'Stored while the decoder analyzes it.' }
          ]
        }
      }
    },
    h_motherboard: {
      name: 'Motherboard',
      roleBadge: 'Global Electrical Skeleton',
      functionalClassification: 'Skeleton / Interconnection',
      physicalClassification: 'Central Unit (Internal)',
      shortDescription: 'The main printed circuit board connecting all major PC components.',
      definition: "It is the **skeleton** of your computer. It is the large rigid plastic board containing printed copper tracks where all components are attached.",
      fonction: 'It distributes power to all parts and possesses microscopically thin copper lines (buses) so binary messages can travel between components in nanoseconds.',
      exemple: 'It physically connects the processor, RAM sticks, graphics card, hard drives, and USB ports.',
      underComponents: {
        h_socket: {
          name: 'CPU Socket',
          role: 'Sturdy physical receiver socket for mounting the CPU chip.',
          definition: 'It is the **docking pouch** for the processor, right in the middle of the motherboard.',
          fonction: 'Allows clipping the CPU chip securely without fragile soldering, connecting thousands of tiny contact pins.',
          exemple: 'The square socket where you place the processor chip before locking the lever.'
        },
        h_chipset: {
          name: 'Chipset',
          role: 'Controls traffic flow between slow and fast devices.',
          definition: 'It is the **traffic policeman** on the motherboard. A small smart chip handles communications.',
          fonction: 'Translates signals between the lightning-fast CPU and slower expansion buses (USB, storage, audio).',
          exemple: 'Ensuring that a file copied from a USB flash drive gets written to the hard drive without data corruption.'
        },
        h_clock: {
          name: 'System Clock',
          role: 'Synchronizes all electronic operations in the computer.',
          definition: 'The **metronome** of the PC. A tiny quartz crystal vibrating regularly with electric current.',
          fonction: 'Sends regular electrical pulses so all microchips perform their cycles at the exact same rhythm, preventing chaos.',
          exemple: 'A 3 GHz CPU receives 3 billion ticks per second to execute its operations.'
        }
      }
    },
    h_gpu: {
      name: 'Graphics Card (GPU)',
      roleBadge: 'Dedicated Visual Calculator',
      functionalClassification: 'Processing',
      physicalClassification: 'Central Unit (Internal)',
      shortDescription: 'Processes graphical data to render images, videos, and animations on the screen.',
      definition: "It is the dedicated **visual artist** of the PC. An expansion card or integrated chip dedicated to drawing 2D or 3D images on screen quickly.",
      fonction: 'Receives vector and geometry instructions from the CPU, computes pixel coloring in parallel at high speeds, and outputs the frames.',
      exemple: 'Rendering fluid 3D animations in simulations or fluid motion in games.',
      underComponents: {
        h_gpu_core: {
          name: 'GPU Core',
          role: 'Process millions of pixel calculations in parallel.',
          definition: 'The brain of the graphics card, specialized in graphics processing.',
          fonction: 'Performs millions of parallel small rendering operations simultaneously, unlike the CPU which works sequentially.',
          exemple: 'Calculating the lighting, shadow, and color of each pixel on the screen.'
        },
        h_gpu_vram: {
          name: 'Video RAM (VRAM)',
          role: 'Temporary memory storing textures, models, and frames.',
          definition: 'The drawing board of the graphics processor.',
          fonction: 'Stores image assets and ongoing display frames so the GPU can access them instantly without overloading the main system RAM.',
          exemple: 'Keeping high-resolution background textures ready for rendering.'
        },
        h_gpu_cooler: {
          name: 'Cooling System',
          role: 'Dissipates heat generated by processing chips.',
          definition: 'The fan and heatsink assembly on the card.',
          fonction: 'Transfers high heat from silicon dies via copper pipes to heat fins, blown away by active fans.',
          exemple: 'Hearing the fan spin slightly faster when rendering highly complex graphics.'
        },
        h_gpu_outputs: {
          name: 'Video Outputs (HDMI, DP...)',
          role: 'Physical ports sending the completed signal to the monitor.',
          definition: 'The display connectors at the back of the computer.',
          fonction: 'Sends formatted digitized electrical or optical video signals to display panels.',
          exemple: 'Connecting the computer to the classroom projector with an HDMI cable.'
        }
      }
    },
    h_cache: {
      name: 'Cache Memory (L1, L2, L3)',
      roleBadge: 'Ultra-Fast Access Buffer',
      functionalClassification: 'Memory',
      physicalClassification: 'Central Unit (Internal)',
      shortDescription: 'Extremely fast memory built directly inside the CPU to buffer hot data queries.',
      definition: 'The **express post-it note** for the CPU cores, built into the processor chip.',
      fonction: 'Saves copies of frequently accessed RAM data, bypassing slow system bus roundtrips.',
      exemple: 'A web browser caching stylesheet tags for instant rendering on reload.',
      underComponents: {
        h_cache_l1: {
          name: 'L1 Cache',
          role: 'Smallest and fastest cache, built inside each CPU core.',
          definition: 'The immediate register-level memory helper.',
          fonction: 'Runs at exact core speeds, providing critical machine code lines in less than a nanosecond.',
          exemple: 'Storing the current loop counter of a running program.'
        },
        h_cache_l2: {
          name: 'L2 Cache',
          role: 'Slightly larger, services CPU core requests.',
          definition: 'The second layer on-chip cache.',
          fonction: 'Catches queries that miss the L1 cache, with low latency.',
          exemple: 'Caching recently decoded program subroutines.'
        },
        h_cache_l3: {
          name: 'L3 Cache',
          role: 'Shared among all CPU cores, larger but slightly slower.',
          definition: 'The shared reservoir of the CPU.',
          fonction: 'Covers major core data overlaps to avoid querying the remote motherboards RAM.',
          exemple: 'Syncing thread data between core 1 and core 2.'
        }
      }
    },
    h_ram: {
      name: 'RAM (Random Access Memory)',
      roleBadge: 'Volatile High-Speed memory',
      functionalClassification: 'Memory',
      physicalClassification: 'Central Unit (Internal)',
      shortDescription: 'Holds active program instructions and variables. Erased when powered off.',
      definition: 'The main working memory of the PC.',
      fonction: 'Provides high-speed read/write access for CPU data needs, active only when supplied with power.',
      exemple: 'Keeping open documents or interactive browser tabs active in memory.',
      underComponents: {
        h_ram_chip: {
          name: 'DRAM Chips',
          role: 'Silicon microchips storing bits electrical charges.',
          definition: 'Dynamic RAM semiconductor chips.',
          fonction: 'Uses tiny capacitors and transistors to store memory bits (0 or 1), requiring continuous electrical refresh.',
          exemple: 'The dark rectangular chips soldered onto the RAM module.'
        },
        h_ram_bus: {
          name: 'Memory Bus Interface',
          role: 'Communicates with the CPU memory controller.',
          definition: 'The golden connector pins and copper tracks.',
          fonction: 'Routes high-speed bus lines from RAM slots to the CPU socket.',
          exemple: 'Pins routing instructions and address markers back and forth.'
        }
      }
    },
    h_rom: {
      name: 'ROM BIOS',
      roleBadge: 'Non-Volatile Boot Memory',
      functionalClassification: 'Memory',
      physicalClassification: 'Central Unit (Internal)',
      shortDescription: 'Contains primary boot firmware (BIOS/UEFI) to initialize the motherboard.',
      definition: 'The permanent startup instructions chip.',
      fonction: 'Stores crucial startup files, verifying that keyboard, RAM, and graphics cards are ready (POST stage).',
      exemple: 'Powering up your PC and seeing the motherboard logo prior to OS loading.',
      underComponents: {
        h_bios_chip: {
          name: 'BIOS Flash Chip',
          role: 'A small non-volatile EEPROM chip.',
          definition: 'Electrical Erasable Programmable Read-Only Memory.',
          fonction: 'Holds firmware that remains fully intact without power, allowing safe boot sequences.',
          exemple: 'Reading the primary instructions on how to load Windows or Linux of the local disk.'
        }
      }
    },
    h_ssd: {
      name: 'SSD Storage',
      roleBadge: 'Solid State Mass Drive',
      functionalClassification: 'Memory',
      physicalClassification: 'Central Unit (Internal)',
      shortDescription: 'Extremely fast non-volatile storage using flash memory cells with no moving parts.',
      definition: 'The modern permanent storage drive.',
      fonction: 'Saves software and user files onto silent semiconductor chips, with speeds up to 100 times faster than mechanical drives.',
      exemple: 'Your computer booting up in 10 seconds flat thanks to SSD read cycles.',
      underComponents: {
        h_ssd_flash: {
          name: 'NAND Flash Memory',
          role: 'Non-volatile transistors storing bits permanently.',
          definition: 'The storage cells of the SSD.',
          fonction: 'Traps electric charges inside isolated microscopic gates to store pages of binary data permanently.',
          exemple: 'Solid state chips keeping saved files intact for years without any electricity.'
        },
        h_ssd_controller: {
          name: 'SSD Controller',
          role: 'The processing brain inside the SSD.',
          definition: 'A dedicated micro-controller on the drive.',
          fonction: 'Directs data routing, checks block wear-leveling, and manages writing speeds.',
          exemple: 'Optimizing and writing files onto the cleanest NAND chips.'
        }
      }
    },
    h_hdd: {
      name: 'HDD Storage',
      roleBadge: 'Mechanical Hard Drive',
      functionalClassification: 'Memory',
      physicalClassification: 'Central Unit (Internal)',
      shortDescription: 'Legacy mass storage storing data magnetically on physical rotatory platters.',
      definition: 'The mechanical permanent storage cabinet of the PC.',
      fonction: 'Uses a high-speed rotatory magnetic platter and a precise reading arm to parse data tracks.',
      exemple: 'Storing very large backup files, music archives, or movies.',
      underComponents: {
        h_hdd_platter: {
          name: 'Magnetic Platter',
          role: 'Circular metal disks revolving at thousands of RPMs.',
          definition: 'The magnetic recording medium.',
          fonction: 'Stores binary bits as local microscopic magnetic polarities change on the spinning surface.',
          exemple: 'The platters rotating at 7200 RPM when reading a file.'
        }
      }
    },
    h_bus_data: {
      name: 'Data Bus',
      roleBadge: 'High-Speed Content Highway',
      functionalClassification: 'Bus',
      physicalClassification: 'Central Unit (Internal)',
      shortDescription: 'Transports actual content bits between CPU, memory, and devices.',
      definition: 'The physical lines carrying the actual data.',
      fonction: 'Bridges components so letters, pixel values, or operation outcomes can travel back and forth.',
      exemple: 'Moving the text characters typed on the keyboard over to RAM.',
      underComponents: {
        h_bd_piste: {
          name: 'PCB Tracks',
          role: 'Copper trails printed on the motherboard surface.',
          definition: 'The visible lines on the circuit board.',
          fonction: 'Conduct parallel electrical impulses representing bits (on/off) simultaneously.',
          exemple: 'The neat copper lines connecting the CPU socket slots to the RAM sockets.'
        }
      }
    },
    h_bus_addr: {
      name: 'Address Bus',
      roleBadge: 'Destination Route Bus',
      functionalClassification: 'Bus',
      physicalClassification: 'Central Unit (Internal)',
      shortDescription: 'Specifies target memory addresses where data should be read or written.',
      definition: 'The pointer index coordinate bus.',
      fonction: 'Carries spatial memory address index bits to choose the specific RAM cell or device register targeted.',
      exemple: 'Choosing address cell "0x2A" in RAM to read its value.',
      underComponents: {
        h_ba_line: {
          name: 'Address Lines',
          role: 'Pathways defining the maximum memory addressing range.',
          definition: 'The address pointer bus lines.',
          fonction: 'Carries high/low voltage bits representing cell coordinate indexes.',
          exemple: 'A 32-bit address bus can address up to 4 gigabytes of memory space.'
        }
      }
    },
    h_bus_ctrl: {
      name: 'Control Bus',
      roleBadge: 'Command Coordinator Bus',
      functionalClassification: 'Bus',
      physicalClassification: 'Central Unit (Internal)',
      shortDescription: 'Sends operational status and command signals (Read, Write, Interrupt).',
      definition: 'The command dispatcher bus.',
      fonction: 'Coordinates timing, synchronizes CPU signals, and schedules Read/Write orders across blocks.',
      exemple: 'Sending a "Write" electric signal to RAM to save a typed word.',
      underComponents: {
        h_bc_line: {
          name: 'Control Flags',
          role: 'Lines notifying ready status or hardware interrupts.',
          definition: 'Hardware state checkers.',
          fonction: 'Transfers read clock sync beats, device ready checks, and interrupt alerts.',
          exemple: 'The mouse interrupting the CPU to report a physical movement click.'
        }
      }
    },
    h_input_dev: {
      name: 'Input Devices',
      roleBadge: 'External Input Interfaces',
      functionalClassification: 'Peripherals',
      physicalClassification: 'External Peripherals',
      shortDescription: 'Converts external human actions or environments into binary input data.',
      definition: 'Devices used to send commands and text to the computer.',
      fonction: 'Translates physical actions (keypress, click, sound, light) into electrical binary numbers.',
      exemple: 'Keyboard typing, mouse clicking, scanning a paper document, or capturing webcam footage.',
      underComponents: {
        h_clavier: { name: 'Keyboard', role: 'Converts physical keypresses into binary machine codes.', definition: 'Primary textual entry device.', fonction: 'Generates scan codes sent via the keyboard bus.', exemple: 'Pressing "Escape" to exit or "A" to write.' },
        h_souris: { name: 'Mouse', role: 'Translates optical physical pointer motion into screen coordinates.', definition: 'Two-axis pointing device.', fonction: 'Measures displacement on a flat surface using optical cameras.', exemple: 'Clicking a link layout button.' },
        h_webcam: { name: 'Webcam', role: 'Transforms captured light matrices into real-time digital video streams.', definition: 'Image and video device.', fonction: 'Uses CMOS photosensors to compile matrices of colored RGB pixels.', exemple: 'Broadcasting video in online school classes.' }
      }
    },
    h_output_dev: {
      name: 'Output Devices',
      roleBadge: 'External Output Interfaces',
      functionalClassification: 'Peripherals',
      physicalClassification: 'External Peripherals',
      shortDescription: 'Translates binary values processed by the computer into human-readable outputs.',
      definition: 'Devices showing results of computing.',
      fonction: 'Takes electrical binary datasets and decodes them into light, sounds, or physical printouts.',
      exemple: 'Monitor display, acoustic speaker sounds, or paper printer text.',
      underComponents: {
        h_ecran: { name: 'Screen / Monitor', role: 'Acoustically or visually outputs computation frames on a panel.', definition: 'Integrated pixel panel displays.', fonction: 'Renders sub-pixels (Red, Green, Blue) at defined refresh frequencies.', exemple: 'Showing typed text characters or rendering interactive simulations.' },
        h_imprimante: { name: 'Printer', role: 'Prints electronic data onto ink or laser paper sheets.', definition: 'Hardcopy document device.', fonction: 'Deposits ink droplets or fused dust toner on physical paper.', exemple: 'Printing out your computer science summary sheet.' },
        h_HP: { name: 'Speakers', role: 'Transforms continuous soundwaves from binary sound registers.', definition: 'Acoustic audio outputs.', fonction: 'Vibrates mechanical paper cones to produce auditory soundwaves.', exemple: 'Hearing audio guides in computer simulations.' }
      }
    },
    h_mixed_dev: {
      name: 'Mixed Devices (I/O)',
      roleBadge: 'Bidirectional Interfaces',
      functionalClassification: 'Peripherals',
      physicalClassification: 'External Peripherals',
      shortDescription: 'Performs both input entries and output results. Handles bidirectional exchange.',
      definition: 'Two-way interaction devices.',
      fonction: 'Allows receiving input data from the environment and projecting output results simultaneously.',
      exemple: 'Touchscreen monitors, Wi-Fi network modems, or VR headsets.',
      underComponents: {
        h_tactile: { name: 'Touch Screen', role: 'Combined display surface and capacitive touch/pressure sensor.', definition: 'The interactive touch user interface. A standard display screen coupled with an input sensor matrix.', fonction: 'Renders dynamic pixels (output) while simultaneously capturing finger coordinates (input) to register clicks.', exemple: 'Tapping buttons directly on a digital school tablet screen to answer biology questions.' },
        h_cle_usb_io: { name: 'USB Flash Drive (Transit I/O)', role: 'External solid-state flash module used for bidirectional data exchange.', definition: 'The portable files gateway. A compact electronic flash key.', fonction: 'Loads school files and lessons (input) and saves back your homework or PDF reports (output).', exemple: 'Transferring slides of the physics presentation to the classroom computer.' }
      }
    },
    h_storage_dev: {
      name: 'External Storage Devices',
      roleBadge: 'Portable Offline Medias',
      functionalClassification: 'Peripherals',
      physicalClassification: 'External Peripherals',
      shortDescription: 'Removable storage units designed for transfer, safety backups, and transport.',
      definition: 'Portable plug-and-play storage cartridges.',
      fonction: 'Interface via USB or reader bays to write files onto non-volatile memory cards or discs.',
      exemple: 'USB Flash Drive, SD Memory Cards, or External portable hard drives.',
      underComponents: {
        h_cle_usb_storage: { name: 'USB Flash Drive', role: 'Miniature affordable solid-state flash storage medium.', definition: 'The solid-state pocket drive containing robust microscopic semiconductor chips.', fonction: 'Stores mid-sized files safely without mechanical wearing since it lacks moving parts.', exemple: 'Carrying presentation materials to the IT lab.' },
        h_sd_card: { name: 'SD Memory Card', role: 'Compact flat memory format designed for phones, cameras, and consoles.', definition: 'The miniature flat memory card with fine copper layout connector pads.', fonction: 'Slides into dedicated host reader bays (cameras, phones, gaming decks) to expand persistent data capacity immediately.', exemple: 'Saving raw photography documents captured with the school SLR camera.' }
      }
    },
    h_psu: {
      name: 'Power Supply Unit (PSU)',
      roleBadge: 'Electrical Energy Transformer',
      functionalClassification: 'Alimentation',
      physicalClassification: 'Central Unit (Internal)',
      shortDescription: 'Converts alternating wall current into pure low-voltage direct currents for the motherboard.',
      definition: 'The power engine of your computer.',
      fonction: 'Takes 110-230V alternating wall current (AC) and regulates it down to stable +12V, +5V, and +3.3V direct currents (DC).',
      exemple: 'Plugging in the heavy power cord and hearing the PSU internal fans spin flat.',
      underComponents: {
        h_transformer: { name: 'Voltage Transformer', role: 'Lowers voltage levels securely.', definition: 'Electrical inductors and transformers.', fonction: 'Reduces electric amplitudes through coupled magnetic loops.', exemple: 'Coils stepping down current safely.' }
      }
    }
  },
  ar: {
    h_cpu: {
      name: 'المعالج (CPU)',
      roleBadge: 'دماغ الحساب الرئيسي',
      functionalClassification: 'المعالجة',
      physicalClassification: 'الوحدة المركزية (داخلي)',
      shortDescription: 'ينفذ تعليمات البرامج المتتالية وينسق جميع المكونات المادية.',
      definition: "هو **العقل المدبر الحقيقي للكمبيوتر**. يقوم بتنظيم وحساب كل ما يحدث. ماديًا، المعالج الدقيق (CPU - وحدة المعالجة المركزية) عبارة عن شريحة سيليكون مربعة صغيرة تحتوي على مليارات المفاتيح الكهربائية الدقيقة التي تسمى الترانزستورات.",
      fonction: 'يقرأ تعليمات البرنامج واحدة تلو الأخرى. علميًا، يطبق حلقة تنفيذ من ثلاث خطوات: 1. جلب التعليمة من الذاكرة العشوائية (Fetch)، 2. تفكيكها إلى إشارات كهربائية (Decode)، 3. تنفيذها ماديًا عبر الحساب (Execute).',
      exemple: 'عند الكتابة، أو تشغيل لعبة، أو فتح تطبيق، يقوم المعالج على الفور بملايين العمليات الحسابية الثنائية في الثانية للاستجابة.',
      underComponents: {
        h_uc: {
          name: 'وحدة التحكم (UC)',
          role: 'تجلب، وتفكيك، وتوجه تنفيذ كل تعليمة.',
          definition: "هي **قائد الأوركسترا** داخل المعالج. تدير كل شيء. علميًا، تتحكم وحدة التحكم (CU) في تدفق المعلومات وتنشيط الأجزاء الأخرى من الكمبيوتر.",
          fonction: 'تقوم بجلب التعليمة المخزنة في الذاكرة الحية (RAM)، وتفكك قيمتها الثنائية، وترسل أوامر دقيقة إلى الجزء المناسب للعمل في الوقت المناسب.',
          exemple: 'إذا كانت التعليمة هي "عرض الحرف أ"، فتقوم بتحليلها وتأمر الشاشة بإشعال البكسلات المناسبة.'
        },
        h_ual: {
          name: 'وحدة الحساب والمنطق (ALU)',
          role: 'تنفيذ العمليات الحسابية والمقارنات المنطقية.',
          definition: "هي **الحاسبة فائقة السرعة** المدمجة في قلب المعالج. تتكفل بجميع الحسابات الرياضية والمنطقية.",
          fonction: 'تقوم بنوعين من العمليات: أولاً العمليات الحسابية الأساسية (الجمع، الطرح، الضرب)، ثم المقارنات المنطقية (مثل التحقق مما إذا كانت قيمة أكبر من أخرى، أو اختبار الشروط صح/خطأ).',
          exemple: 'حل الجمع الثنائي لـ 2+3 أو التحقق من تطابق كلمة المرور المدخلة مع الكلمة الصحيحة.'
        },
        h_registres: {
          name: 'المسجلات',
          role: 'تخزن بيانات متناهية الصغر في أجزاء من المليون من الثانية.',
          definition: "هي **خلايا ذاكرة فائقة السرعة** تقع مباشرة بجوار قلب المعالج لتدوين المعلومات الهامة أثناء الحساب.",
          fonction: 'خلايا ذاكرة مؤقتة تعمل بسرعة المعالج لتجنب تضييع الوقت في استعلام الذاكرة العشوائية البعيدة.',
          exemple: 'الاحتفاظ بالاحتفاظ بالباقي من عملية جمع رياضيات أثناء حساب الرقم التالي.',
          subElements: [
            { name: 'المراكم (Accumulator)', role: 'مستودع مباشر لنتائج الحساب الخارجة من وحدة الحساب والمنطق (ALU).', more: 'كل عملية جمع أو طرح تمر عبره أولاً.' },
            { name: 'عداد البرنامج (PC)', role: 'يشير إلى عنوان الذاكرة الخاص بالتعليم التالية المطلوب تنفيذها.', more: 'يتزايد تلقائيا ليضمن تقدم البرنامج خطوة بخطوة.' },
            { name: 'مسجل التعليم (IR)', role: 'يحتفظ بالتعليم الجاري تفكيكها بواسطة وحدة التحكم.', more: 'يتم تخزين الأمر هنا أثناء قيام وحدة التحكم بفك ترميزه.' }
          ]
        }
      }
    },
    h_motherboard: {
      name: 'اللوحة الأم (Motherboard)',
      roleBadge: 'الهيكل الكهربائي العام',
      functionalClassification: 'الهيكل والترابط',
      physicalClassification: 'الوحدة المركزية (داخلي)',
      shortDescription: 'اللوحة الإلكتروني�      }
    },
    h_gpu: {
      name: 'لوحة الشاشة الرسومية (GPU)',
      roleBadge: 'وحدة حساب الرسوميات المخصصة',
      functionalClassification: 'المعالجة',
      physicalClassification: 'الوحدة المركزية (داخلي)',
      shortDescription: 'تعالج البيانات الرسومية وتعرض الصور، الفيديوهات والرسوم المتحركة على الشاشة.',
      definition: "هي **الرسام المتخصص** للكمبيوتر. شريحة أو بطاقة توسيع مخصصة لتجهيز وعرض الرسوميات والأبعاد على الشاشة بسرعة فائقة وسلاسة.",
      fonction: 'تستقبل الأوامر الهندسية والألوان الخام من المعالج المركزي (CPU)، وتحسبها بشكل متوازٍ وسريع لتنتج البكسلات المعروضة على الشاشة.',
      exemple: 'عرض رسوم متحركة معقدة ومحاكاة حركات ثلاثية الأبعاد مرنة في الوقت الفعلي.',
      underComponents: {
        h_gpu_core: {
          name: 'معالج الرسوميات (GPU)',
          role: 'نواة المعالجة المخصصة لتطبيقات الرسوم والمقاطع البصرية.',
          definition: 'الدماغ الخاص ببطاقة العرض لمعالجة الرسوميات.',
          fonction: 'يقوم بملايين الحسابات البصرية المتوازية في نفس الثانية لعرض الألوان والمشاهد بسرعة.',
          exemple: 'حساب الإضاءة والظلال الدقيقة لكل نقطة تشاهدها على الشاشة.'
        },
        h_gpu_vram: {
          name: 'ذاكرة الفيديو (VRAM)',
          role: 'تخزين مؤقت للرسوم والتكتشرز للوصول فائق السرعة.',
          definition: 'لوحة الرسم الشخصية لمعالج الرسوميات لتخزين البيانات البصرية مؤقتًا.',
          fonction: 'تحتفظ بالأبعاد والملفات الرسومية الثقيلة لتسريع وصول معالج الرسوميات إليها دون إبطاء الذاكرة الرئيسية للكمبيوتر.',
          exemple: 'الاحتفاظ بخلفية عالية الدقة للتطبيق أثناء حركة الرموز الرياضية.'
        },
        h_gpu_cooler: {
          name: 'مبرد معالج الرسوميات (GPU Cooler)',
          role: 'مروحة وبنية تبريد معدنية لامتصاص وتشتيت الحرارة العالية.'
        },
        h_gpu_outputs: {
          name: 'منافذ العرض (HDMI / DisplayPort)',
          role: 'مخارج توصيل كهربائية لإرسال الإشارات الرقمية للشاشة.'
        }
      }
    },
    h_cache: {
      name: 'الذاكرة المخبئية (Cache Memory)',
      roleBadge: 'ذاكرة تخزين مؤقت فائقة السرعة',
      functionalClassification: 'الذاكرة',
      physicalClassification: 'الوحدة المركزية (داخلي)',
      shortDescription: 'ذاكرة صغيرة جدا وسريعة تقع داخل المعالج لتسريع جلب التعليمات المتكررة.',
      definition: 'المستودع السريع والداخلي لخلايا القراءة والمطابقة في قلب المعالج.',
      fonction: 'تحتفظ بنسخ مؤقتة من بيانات الذاكرة العشوائية لتفادي مخاطر الانتظار وبطء خطوط اللوحة الأم الكهربائية.',
      exemple: 'الاحتفاظ بالبيانات الهامة التي يكرر المعالج طلبها بشكل مستمر لعرضها فورا.',
      underComponents: {
        h_cache_l1: {
          name: 'المستوى الأول L1 Cache',
          role: 'الأصغر والأسرع على الإطلاق مدمج داخل كل نواة للمعالج.',
          definition: 'المسجل المساعد الفوري للمعالج.',
          fonction: 'يعمل بنفس سرعة المعالج لتوفير التعليمات البرمجية الحاسمة في أجزاء من النانو ثانية.',
          exemple: 'الاحتفاظ بالعداد الحالي لحلقة تكرارية للبرنامج لتنفيذها فورا.'
        },
        h_cache_l2: {
          name: 'المستوى الثاني L2 Cache',
          role: 'المخزن المؤقت المتوسط المخصص لكل نواة.',
          definition: 'الدرج المتوسط الملحق بالمكتب. أكبر قليلاً من المستوى الأول ولكنه أبطأ منه بقليل.',
          fonction: 'يخزن الأسطر التالية من البيانات لتغذية الذاكرة المخبئية للمستوى الأول بسرعة فائقة لتجنب توقف المعالج عن العمل.',
          exemple: 'الاحتفاظ بالفقرة التالية من النص في مستند مدرسي مفتوح بانتظار قراءتها.'
        },
        h_cache_l3: {
          name: 'المستوى الثالث L3 Cache',
          role: 'ذاكرة مخبئية عامة مشتركة بين جميع مجالات أنوية المعالج.',
          definition: 'مثل الخزانة الكبيرة المشتركة. وهي أكبر مستوى للذاكرة المخبئية، وتكون متاحة لكافة أنوية شريحة المعالج.',
          fonction: 'tغنيك عن الاستعلام المتكرر من الذاكرة العشوائية RAM الرئيسية (التي تقع خارج المعالج) والتي تكون أبطأ بكثير في الاستجابة.',
          exemple: 'الاحتفاظ بالهيكل الرسومي العام لمتصفح الإنترنت المفتوح.'
        }
      }
    },
    h_ram: {
      name: 'ذاكرة RAM (ذاكرة الوصول العشوائي)',
      roleBadge: 'الذاكرة المؤقتة السريعة',
      functionalClassification: 'الذاكرة',
      physicalClassification: 'الوحدة المركزية (داخلي)',
      shortDescription: 'تخزن مؤقتا البيانات وتعليمات البرامج أثناء تشغيلها. تفقد محتواها عند انقطاع التيار.',
      definition: 'ذاكرة العمل الرئيسية للجهاز لتسجيل البرامج النشطة والمفتوحة.',
      fonction: 'توفر القراءة والكتابة السريعة لمساعدة معالج الكمبيوتر في إنجاز مهامه الحالية بسرعة وسلاسة.',
      exemple: 'الاحتفاظ بنصوص المستند المفتوح حتى تقوم بالضغط على زر الحفظ.',
      underComponents: {
        h_ram_chip: {
          name: 'رقاقات الذاكرة (DRAM Chips)',
          role: 'المكثفات الكهربائية لتخزين البتات الثنائية.',
          definition: 'شرائح السيليكون المثبتة في بارزة الرام.',
          fonction: 'تخزين مستمر للشحنات لتمثيل البتات 0 و 1 مع الحاجة المستمرة لإعادة الشحن كهربائيًا.',
          exemple: 'القطع السوداء الصغيرة المستطيلة على جانبي بطاقة ذاكرة الرام.'
        },
        h_ram_bus: {
          name: 'قناة نقل الذاكرة (Memory Bus)',
          role: 'ممرات توصيل فائقة السرعة تتيح نقل البتات بكثافة من وإلى الرام.'
        }
      }
    },
    h_rom: {
      name: 'ذاكرة ROM BIOS',
      roleBadge: 'ذاكرة الإقلاع غير القابلة للمسح',
      functionalClassification: 'الذاكرة',
      physicalClassification: 'الوحدة المركزية (داخلي)',
      shortDescription: 'تحتوي على البرامج الأساسية لبدء تشغيل اللوحة الأم واختبار المكونات والقطع ماليًا.',
      definition: 'رقاقة تحفظ تعليمات بدء تشغيل الكمبيوتر بشكل دائم.',
      fonction: 'تقوم بفحص سلامة المكونات (مثل RAM، لوحة العرض) قبل تحميل نظام التشغيل والبدء.',
      exemple: 'مشاهدة شعار اللوحة الأم بمجرد الضغط على زر تشغيل الجهاز.',
      underComponents: {
        h_bios_chip: {
          name: 'شريحة البيوس (BIOS/UEFI Flash Chip)',
          role: 'رقاقة ذاكرة وميضية غير متطايرة تحفظ التعليمات الأساسية وثابتة.',
          definition: 'ذاكرة قراءة فقط مبرمجة يمكن محوها وكتابتها كهربائيًا (EEPROM).',
          fonction: 'تخزن الأكواد الحيوية لاختبار القطع والبحث أولًا عن نظام تشغيل من القرص لبدء تحميله.',
          exemple: 'رؤية إعدادات لوحة التحكم الزرقاء أو شاشة التهيئة لضبط إعدادات التشغيل.'
        }
      }
    },
    h_ssd: {
      name: 'أقراص SSD',
      roleBadge: 'ذاكرة التخزين الصلبة الحديثة',
      functionalClassification: 'الذاكرة',
      physicalClassification: 'الوحدة المركزية (داخلي)',
      shortDescription: 'تخزين دائم فائق السرعة يعتمد على رقاقات إلكترونية صامتة تمامًا دون أي قطع ميكانيكية متحركة.',
      definition: 'المستودع الرئيسي والسريع لحفظ الملفات ونظام التشغيل والبرامج.',
      fonction: 'تخزن السجلات والبرامج على رقاقات إلكترونيات غير متطايرة وبسرعة تفوق الأقراص الميكانيكية بمئات المرات.',
      exemple: 'إقلاع الكمبيوتر ودخول نظام التشغيل في غضون 10 ثوان بفضل سرعة القراءة في SSD.',
      underComponents: {
        h_ssd_flash: {
          name: 'ذاكرة فلاش NAND (NAND Flash)',
          role: 'خلايا تخزين إلكترونية تحفظ الشحنات دون حاجة لكهرباء مستمرة.',
          definition: 'مستودعات الترانزستورات شبه الموصلة المتلاصقة لحفظ البيانات.',
          fonction: 'تحبس الإلكترونات داخل بوابات مجهرية معزولة لتمثيل قيم الملفات والصور للأبد.',
          exemple: 'بقاء جميع ألعابك وملفاتك وسجلاتك محفوظة بأمان لسنوات حتى عند إطفاء الجهاز.'
        },
        h_ssd_controller: {
          name: 'متحكم الذاكرة (SSD Controller)',
          role: 'العقل المدبر والمنظم الداخلي لعمليات كتابة وقراءة الخلايا.',
          definition: 'معالج دقيق وصغير مخصص داخل لوحة قرص الـ SSD.',
          fonction: 'يقوم بتوزيع البيانات على الخلايا بالتساوي وتصحيح الأخطاء لضمان ديمومة الرقاقات.',
          exemple: 'توزيع الملفات بذكاء للحفاظ على سرعة القرص وعمره الافتراضي.'
        }
      }
    },
    h_hdd: {
      name: 'أقراص HDD ميكانيكية',
      roleBadge: 'القرص الميكانيكي المغناطيسي',
      functionalClassification: 'الذاكرة',
      physicalClassification: 'الوحدة المركزية (داخلي)',
      shortDescription: 'ذاكرة تخزين دائم كلاسيكية تعتمد على صفائح وبكرات تدور مغناطيسيًا لتسجيل وتخزين الملفات.',
      definition: 'خزان الملفات الكبير والاقتصادي في قطع الكمبيوتر.',
      fonction: 'كتابة وحفظ ونقل البيانات مغناطيسيا بانتظام على أقراص دائرية مغطاة بمجال مغناطيسي.',
      exemple: 'حجم ملفات النسخ الاحتياطية الثقيلة والأفلام والصور العائلية المعمرة.',
      underComponents: {
        h_hdd_platter: {
          name: 'الصفائح المغناطيسية (Magnetic Platters)',
          role: 'أقراص معدنية دائرية تدور بسرعة آلاف الدورات لتسجيل البيانات مغناطيسيًا.',
          definition: 'وسط التسجيل والاسترجاع الميكانيكي المغناطيسي.',
          fonction: 'تخزن الخلايا الفردية للبتات عن طريق تغيير شحنة المجال المغناطيسي المجهري بتوجيه من إبرة القراءة الكهرومغناطيسية.',
          exemple: 'سماع دوي خفيف لـ دوران القرص بسرعة 7200 دورة في الدقيقة عند نقل ملف مدرسي ضخم.'
        }
      }
    },
    h_bus_data: {
      name: 'ناقل البيانات (Data Bus)',
      roleBadge: 'طريق المحتوى السريع',
      functionalClassification: 'الناقل',
      physicalClassification: 'الوحدة المركزية (داخلي)',
      shortDescription: 'يقوم بنقل البتات والمحتويات الفعلية المتبادلة بين المعالج المركزي والذاكرة والمنافذ.',
      definition: 'خطوط الربط لنقل قيم المعلومات.',
      fonction: 'تعد همزة الوصل لنقل قيم الحروف، وألوان البكسلات، ونتائج العمليات الحسابية الكهربائية والمنطقية.',
      exemple: 'إرسال الحروف التي يتم كتابتها على لوحة المفاتيح إلى ذاكرة الرام.',
      underComponents: {
        h_bd_piste: {
          name: 'مسارات اللوحة المطبوعة (PCB Tracks)',
          role: 'مسارات رفيعة من النحاس منقوشة على سطح اللوحة لتوصيل النبضات.',
          definition: 'الخطوط النحاسية اللامعة المرئية بالعين المجردة.',
          fonction: 'تسمح بسريان الإشارات الكهربائية التي تمثل الأوامر بين المعالج وباقي المقابس والوحدات.',
          exemple: 'رؤية الخطوط الفضية أو الذهبية المتراصفة والمتصلة بمقابس الذاكرة والمعالج.'
        }
      }
    },
    h_bus_addr: {
      name: 'ناقل العناوين (Address Bus)',
      roleBadge: 'ناقل اتجاه المطلب',
      functionalClassification: 'الناقل',
      physicalClassification: 'الوحدة المركزية (داخلي)',
      shortDescription: 'يحدد من خلاله المعالج موقع الخلية المطلوب كتابة أو قراءة البيانات منها في الذاكرة.',
      definition: 'ناقل لتحديد الخارطة والعناوين الرقمية.',
      fonction: 'يحمل العناوين الكهربائية لإخلاء الرمز المناسب للاتصال بالرام أو أجهزة الإدخال بدقة.',
      exemple: 'تحديد الخلية رقم "0x2A" بالذاكرة العشوائية لقراءة محتوياتها.',
      underComponents: {
        h_ba_line: {
          name: 'خطوط العنونة (Address Lines)',
          role: 'ممرات لتحديد النطاق الأقصى لحجم الذاكرة التي يمكن رقمنتها.',
          definition: 'مؤشرات خارطة الخلية المستهدفة.',
          fonction: 'تحمل جهد فولت يترجم قيم العنوان لتحديد أي من صفوف وأعمدة الذاكرة سيقرأ منه.',
          exemple: 'ناقل عنونة بسعة 32 بت يستطيع تمييز وعنونة ما يصل إلى 4 جيجابايت من الخلايا.'
        }
      }
    },
    h_bus_ctrl: {
      name: 'ناقل التحكم (Control Bus)',
      roleBadge: 'ناقل الإشارات الإدارية',
      functionalClassification: 'الناقل',
      physicalClassification: 'الوحدة المركزية (داخلي)',
      shortDescription: 'يرسل إشارات التحكم (أمر قراءة، أمر كتابة، مقاطعة) لتنسيق التبادل والعمليات.',
      definition: 'خطوط التوجيه لشرائح اللوحة الأم.',
      fonction: 'ظبط الإذن ومزامنة ساعات المعالجة وإرسال قرارات الاستلام أو المقاطعة في العتاد الفني.',
      exemple: 'إرسال أمر "اكتب" لتسجيل الكلمة المدخلة في الذاكرة الحية.',
      underComponents: {
        h_bc_line: {
          name: 'خطوط إشارات التحكم (Control Lines)',
          role: 'قنوات لنقل أوامر القراءة والكتابة ونبضات التزامن.',
          definition: 'أعصاب التنسيق والتوجيه في اللوحة الأم.',
          fonction: 'تنقل إشارات كلاك الساعة للتنسيق ونبضات الفحص والطلب الفوري لسلامة تداول البيانات.',
          exemple: 'استقبل إشارة إيقاف أو مقاطعة (Interrupt) من الفأرة لمعالجة نقرة المستخدم مباشرة.'
        }
      }
    },
    h_input_dev: {
      name: 'أجهزة الإدخال',
      roleBadge: 'أجهزة إرسال البيانات للكمبيوتر',
      functionalClassification: 'الملحقات',
      physicalClassification: 'الملحقات الخارجية',
      shortDescription: 'تحول عمليات الإنسان أو البيئة المادية المحيطة إلى بيانات ثنائية رقمية يفهمها الكمبيوتر.',
      definition: 'الملحقات المستخدمة لإرسال النصوص والأوامر إلى داخل الكمبيوتر.',
      fonction: 'تقوم بترجمة النبضات الفزيائية (الضغط، الصوت، الضوء) إلى سجلات كهربائية ثنائية.',
      exemple: 'الكتابة بلوحة المفاتيح والضغط بالفأرة والتقاط الفيديو بالكاميرا وتسجيل الصوت.',
      underComponents: {
        h_clavier: { name: 'لوحة المفاتيح', role: 'تحويل ضغطات المفاتيح إلى رموز ثنائية.', definition: 'جهاز الإدخال النصي والتحكم الأساسي.', fonction: 'ترسل أكواد الفحص عند الضغط على أي مفتاح.', exemple: 'الضغط على Enter لتأكيد خيار بالبرنامج.' },
        h_souris: { name: 'الفأرة', role: 'ترجمة حركة اليد إلى إحداثيات على الشاشة البصرية.', definition: 'أداة الإدخال للتوجيه والنقر.', fonction: 'ترصد الإحداثيات والحركة ميكانيكيا أو ضوئيا بالفوتوسنسور.', exemple: 'النقر على زر في واجهة الدرس لمتابعة الخطوة.' },
        h_webcam: { name: 'كاميرا الويب (Webcam)', role: 'تلتقط موجات الضوء وتحولها إلى سجل بكسلات رقمية متتابعة.', definition: 'جهاز التقاط الفيديو بفتحة عدسة ضوئية.', fonction: 'تستخدم مصفوفات خلايا CMOS لترجمة شدة الضوء إلى مصفوفة قيم ألوان (أحمر، أخضر، أزرق).', exemple: 'بث صورتك بوضوح في منصة الدراسة التفاعلية أو مؤتمرات الفيديو.' }
      }
    },
    h_output_dev: {
      name: 'أجهزة الإخراج',
      roleBadge: 'أجهزة إظهار النتائج للمستخدم',
      functionalClassification: 'الملحقات',
      physicalClassification: 'الملحقات الخارجية',
      shortDescription: 'تترجم القيم الثنائية المعالجة إلى مخرجات بصرية، مادية، أو صوتية يفهمها الإنسان.',
      definition: 'عناصر استخراج البيانات وعرضها وعزفها.',
      fonction: 'استقبال المعلومات الثنائية من الجهاز ونثرها كهربائيا فورا كأضواء أو أصوات أو حبر مطبوع.',
      exemple: 'الشاشات العارضة، مكبر الصنع، وآلات الطباعة الورقية والرسام الورقي.',
      underComponents: {
        h_ecran: { name: 'الشاشة', role: 'عرض النصوص والرسوم والصور بشكل مرئي وواضح للمستخدم.', definition: 'لوحة العرض البصرية الأساسية.', fonction: 'تضيء البكسلات بالأحمر والأخضر والأزرق لإظهار المحتوى النهائي.', exemple: 'عرض الكلمات والجداول والرسوم البيانية في الوقت الفعلي.' },
        h_imprimante: { name: 'الطابعة (Printer)', role: 'تطبع السجلات الرقمية على أوراق ملموسة باستخدام الحبر أو الليزر.', definition: 'جهاز المحاذاة والنسخ الورقي المادي.', fonction: 'تستقبل مصفوفة البكسلات والخطوط وتبدأ برش قطرات الحبر أو صهر مسحوق التونر على أسطح الورق بترتيب دقيق.', exemple: 'طباعة ملخص درس مادة تكنولوجيا المعلومات والإنتاج لتقديمه للمعلم.' },
        h_HP: { name: 'مكبرات الصوت (Speakers)', role: 'تحول الإشارات الكهربائية التناظرية الناتجة عن فك الرمز الثنائي إلى موجات صوتية مسموعة.', definition: 'مخارج الصوت التناظرية الاهتزازية.', fonction: 'تهز غشاء ورقي أو بلاستيكي بفضل المغناطيس الكهربائي الداخلي لإنتاج الترددات الصوتية التي نلمسها.', exemple: 'سماع الشرح الصوتي للدروس التفاعلية بوضوح بمجرد الضغط على زر التشغيل.' }
      }
    },
    h_mixed_dev: {
      name: 'الأجهزة المشتركة (إدخال وإخراج)',
      roleBadge: 'أجهزة التبادل ثنائي الاتجاه',
      functionalClassification: 'الملحقات',
      physicalClassification: 'الملحقات الخارجية',
      shortDescription: 'تؤدي وظيفتي الإدخال والإخراج في ذات الوقت. تدعم التبادل المتبادل المزدوج.',
      definition: 'الروابط المشتركة للتحاور مع البيئة الخارجية.',
      fonction: 'تسهل استقبال المدخلات الرقمية وإرسال المخرجات اللحظية المعالجة في آن واحد تفاعليًا.',
      exemple: 'شاشات اللمس، المودم ونواقل شبكات الواي فاي، والروتر، ونظارات الواقع الافتراضي VR.',
      underComponents: {
        h_tactile: { name: 'شاشة اللمس', role: 'تدمج لوحة العرض وحقل الاستشعار السعوي للأصابع.', definition: 'شاشة تفاعلية مزدوجة تجمع الإدخال والإخراج في نطاق واحد.', fonction: 'تسجل استشعار الشحنات السعوية في اليد وتغيرها، مع عرض المحتوى الرسومي التفاعلي اللحظي.', exemple: 'تحديد الخيارات أو سحب القطع مباشرة على شاشة التابلت والتفاعل مع التجربة.' },
        h_cle_usb_io: { name: 'مفتاح USB (تبادل I/O)', role: 'وحدة تخزين متنقلة تستخدم لقراءة مدخلات أو تدوير مخرجات بصرية متبادلة.', definition: 'جسر نقل الملفات الخارجي ثنائي التوجيه.', fonction: 'تحميل ملفات الدروس للجهاز (إدخال) وتصدير التقارير المنجزة وحفظها بالخارج (إخراج).', exemple: 'توصيل المفتاح لنقل تقرير مشروع العلوم لمعمل تكنولوجيا المعلومات.' }
      }
    },
    h_storage_dev: {
      name: 'وسائط التخزين الخارجية',
      roleBadge: 'الوسائط المتنقلة لنقل البيانات',
      functionalClassification: 'الملحقات',
      physicalClassification: 'الملحقات الخارجية',
      shortDescription: 'أجهزة تخزين متنقلة ومستقلة تستخدم لنقل الملفات والاحتفاظ بنسخ احتياطية بأمان.',
      definition: 'حقائب التخزين الرقمية سهلة الاستخدام والجاهزة للتوصيل.',
      fonction: 'تسجل الملفات على رقاقات ذاكرة محمية ومستقلة لتسمح للقارئات ومنافذ USB بنقلها.',
      exemple: 'مفاتيح التخزين USB، بطاقات SD، والأقراص المغناطيسية المحمولة.',
      underComponents: {
        h_cle_usb_storage: { name: 'مفتاح التخزين USB', role: 'ذاكرة فلاش صغيرة متنقلة ذات استخدام وتوصيل قياسي سهل وعالمي لنقل السجلات.', definition: 'وحدة الفلاش المتنقلة للجيب والملفات.', fonction: 'توصيل بنواقل ومنافذ USB لتسجيل أو مطالعة الملفات بصفة مستمرة ودون استهلاك ميكانيكي.', exemple: 'تخزين العرض التقديمي لعرضه في معمل تكنولوجيا المعلومات.' },
        h_sd_card: { name: 'بطاقة ذاكرة SD', role: 'شكل مسطح ومدمج مخصص للهواتف والكاميرات وأجهزة الألعاب.', definition: 'البطاقة المسطحة المصغرة ذات الموصلات النحاسية الدقيقة.', fonction: 'تنزلق داخل منفذ مخصص لتزوير الجهاز بمساحة حفظ دائمة فورية وسداسية.', exemple: 'حفظ ملفات الصور الملتقطة بكاميرا المدرسة بنجاح.' }
      }
    },�غناطيسي',
      functionalClassification: 'الذاكرة',
      physicalClassification: 'الوحدة المركزية (داخلي)',
      shortDescription: 'ذاكرة تخزين دائم كلاسيكية تعتمد على صفائح وبكرات تدور مغناطيسيًا لتسجيل وتخزين الملفات.',
      definition: 'خزان الملفات الكبير والاقتصادي في قطع الكمبيوتر.',
      fonction: 'كتابة وحفظ ونقل البيانات مغناطيسيا بانتظام على أقراص دائرية مغطاة بمجال مغناطيسي.',
      exemple: 'حجم ملفات النسخ الاحتياطية الثقيلة والأفلام والصور العائلية المعمرة.'
    },
    h_bus_data: {
      name: 'ناقل البيانات (Data Bus)',
      roleBadge: 'طريق المحتوى السريع',
      functionalClassification: 'الناقل',
      physicalClassification: 'الوحدة المركزية (داخلي)',
      shortDescription: 'يقوم بنقل البتات والمحتويات الفعلية المتبادلة بين المعالج المركزي والذاكرة والمنافذ.',
      definition: 'خطوط الربط لنقل قيم المعلومات.',
      fonction: 'تعد همزة الوصل لنقل قيم الحروف، وألوان البكسلات، ونتائج العمليات الحسابية الكهربائية والمنطقية.',
      exemple: 'إرسال الحروف التي يتم كتابتها على لوحة المفاتيح إلى ذاكرة الرام.'
    },
    h_bus_addr: {
      name: 'ناقل العناوين (Address Bus)',
      roleBadge: 'ناقل اتجاه المطلب',
      functionalClassification: 'الناقل',
      physicalClassification: 'الوحدة المركزية (داخلي)',
      shortDescription: 'يحدد من خلاله المعالج موقع الخلية المطلوب كتابة أو قراءة البيانات منها في الذاكرة.',
      definition: 'ناقل لتحديد الخارطة والعناوين الرقمية.',
      fonction: 'يحمل العناوين الكهربائية لإخلاء الرمز المناسب للاتصال بالرام أو أجهزة الإدخال بدقة.',
      exemple: 'تحديد الخلية رقم "0x2A" بالذاكرة العشوائية لقراءة محتوياتها.'
    },
    h_bus_ctrl: {
      name: 'ناقل التحكم (Control Bus)',
      roleBadge: 'ناقل الإشارات الإدارية',
      functionalClassification: 'الناقل',
      physicalClassification: 'الوحدة المركزية (داخلي)',
      shortDescription: 'يرسل إشارات التحكم (أمر قراءة، أمر كتابة، مقاطعة) لتنسيق التبادل والعمليات.',
      definition: 'خطوط التوجيه لشرائح اللوحة الأم.',
      fonction: 'ظبط الإذن ومزامنة ساعات المعالجة وإرسال قرارات الاستلام أو المقاطعة في العتاد الفني.',
      exemple: 'إرسال أمر "اكتب" لتسجيل الكلمة المدخلة في الذاكرة الحية.'
    },
    h_input_dev: {
      name: 'أجهزة الإدخال',
      roleBadge: 'أجهزة إرسال البيانات للكمبيوتر',
      functionalClassification: 'الملحقات',
      physicalClassification: 'الملحقات الخارجية',
      shortDescription: 'تحول عمليات الإنسان أو البيئة المادية المحيطة إلى بيانات ثنائية رقمية يفهمها الكمبيوتر.',
      definition: 'الملحقات المستخدمة لإرسال النصوص والأوامر إلى داخل الكمبيوتر.',
      fonction: 'تقوم بترجمة النبضات الفزيائية (الضغط، الصوت، الضوء) إلى سجلات كهربائية ثنائية.',
      exemple: 'الكتابة بلوحة المفاتيح والضغط بالفأرة والتقاط الفيديو بالكاميرا وتسجيل الصوت.',
      underComponents: {
        h_clavier: { name: 'لوحة المفاتيح', role: 'تحويل ضغطات المفاتيح إلى رموز ثنائية.', definition: 'جهاز الإدخال النصي والتحكم الأساسي.', fonction: 'ترسل أكواد الفحص عند الضغط على أي مفتاح.', exemple: 'الضغط على Enter لتأكيد خيار بالبرنامج.' },
        h_souris: { name: 'الفأرة', role: 'ترجمة حركة اليد إلى إحداثيات على الشاشة البصرية.', definition: 'أداة الإدخال للتوجيه والنقر.', fonction: 'ترصد الإحداثيات والحركة ميكانيكيا أو ضوئيا بالفوتوسنسور.', exemple: 'النقر على زر في واجهة الدرس لمتابعة الخطوة.' }
      }
    },
    h_output_dev: {
      name: 'أجهزة الإخراج',
      roleBadge: 'أجهزة إظهار النتائج للمستخدم',
      functionalClassification: 'الملحقات',
      physicalClassification: 'الملحقات الخارجية',
      shortDescription: 'تترجم القيم الثنائية المعالجة إلى مخرجات بصرية، مادية، أو صوتية يفهمها الإنسان.',
      definition: 'عناصر استخراج البيانات وعرضها وعزفها.',
      fonction: 'استقبال المعلومات الثنائية من الجهاز ونثرها كهربائيا فورا كأضواء أو أصوات أو حبر مطبوع.',
      exemple: 'الشاشات العارضة، مكبر الصنع، وآلات الطباعة الورقية والرسام الورقي.',
      underComponents: {
        h_ecran: { name: 'الشاشة', role: 'عرض النصوص والرسوم والصور بشكل مرئي وواضح للمستخدم.', definition: 'لوحة العرض البصرية الأساسية.', fonction: 'تضيء البكسلات بالأحمر والأخضر والأزرق لإظهار المحتوى النهائي.', exemple: 'عرض الكلمات والجداول والرسوم البيانية في الوقت الفعلي.' }
      }
    },
    h_mixed_dev: {
      name: 'الأجهزة المشتركة (إدخال وإخراج)',
      roleBadge: 'أجهزة التبادل ثنائي الاتجاه',
      functionalClassification: 'الملحقات',
      physicalClassification: 'الملحقات الخارجية',
      shortDescription: 'تؤدي وظيفتي الإدخال والإخراج في ذات الوقت. تدعم التبادل المتبادل المزدوج.',
      definition: 'الروابط المشتركة للتحاور مع البيئة الخارجية.',
      fonction: 'تسهل استقبال المدخلات الرقمية وإرسال المخرجات اللحظية المعالجة في آن واحد تفاعليًا.',
      exemple: 'شاشات اللمس، المودم ونواقل شبكات الواي فاي، والروتر، ونظارات الواقع الافتراضي VR.',
      underComponents: {
        h_touchscreen: { name: 'شاشة اللمس', role: 'تدمج لوحة العرض وحقل الاستشعار السعوي للأصابع.', definition: 'شاشة تفاعلية مزدوجة.', fonction: 'تسجل استشعار الشحنات السعوية في اليد مع عرض المحتوى الرسومي التفاعلي.', exemple: 'تحديد الخيارات أو سحب القطع مباشرة على شاشة التابلت.' }
      }
    },
    h_storage_dev: {
      name: 'وسائط التخزين الخارجية',
      roleBadge: 'الوسائط المتنقلة لنقل البيانات',
      functionalClassification: 'الملحقات',
      physicalClassification: 'الملحقات الخارجية',
      shortDescription: 'أجهزة تخزين متنقلة ومستقلة تستخدم لنقل الملفات والاحتفاظ بنسخ احتياطية بأمان.',
      definition: 'حقائب التخزين الرقمية سهلة الاستخدام والجاهزة للتوصيل.',
      fonction: 'تسجل الملفات على رقاقات ذاكرة محمية ومستقلة لتسمح للقارئات ومنافذ USB بنقلها.',
      exemple: 'مفاتيح التخزين USB، بطاقات SD، والأقراص المغناطيسية المحمولة.',
      underComponents: {
        h_usb_drive: { name: 'مفتاح التخزين USB', role: 'ذاكرة فلاش صغيرة متنقلة ذات استخدام وتوصيل قياسي سهل وعالمي.', definition: 'وحدة الفلاش المتنقلة للجيب والملفات.', fonction: 'توصيل بنواقل ومنافذ USB لتسجيل أو مطالعة الملفات.', exemple: 'تخزين العرض التقديمي لعرضه في معمل تكنولوجيا المعلومات.' }
      }
    },
    h_psu: {
      name: 'مزود الطاقة (PSU)',
      roleBadge: 'محول الطاقة الكهربائية للجهاز',
      functionalClassification: 'التغذية الكهربائية',
      physicalClassification: 'الوحدة المركزية (داخلي)',
      shortDescription: 'يحول التيار المتردد القادم من الجدار إلى تيار مستمر ومنخفض الجهد لتغذية الرقاقات اللوحة الأم.',
      definition: 'المحرك الكهربائي المغذي لجهازك.',
      fonction: 'يستقبل فولت التيار المتردد (230 فولت) ويخفضه بانتظام إلى فولت مباشر ومستقر (12 فولت، 5 فولت، 3.3 فولت).',
      exemple: 'توصيل كابل الكهرباء الرئيسي بفيشة الجدار وسماع مروحة مزود الطاقة تدور لتبريد القطعة.'
    }
  },
  es: {
    h_cpu: {
      name: 'Procesador (CPU)',
      roleBadge: 'Cerebro de Cálculo Principal',
      functionalClassification: 'Procesamiento',
      physicalClassification: 'Unidad Central (Interno)',
      shortDescription: 'Ejecuta las instrucciones secuenciales de los programas y coordina todos los componentes físicos.',
      definition: "Es el verdadero **cerebro del ordenador**. Orquesta y calcula todo lo que sucede. Físicamente, el microprocesador (CPU) es un pequeño chip de silicio que contiene miles de millones de interruptores eléctricos diminutos llamados transistores.",
      fonction: 'Lee las instrucciones del programa una tras de otra. Científicamente, aplica un ciclo de ejecución en tres etapas: 1. Obtener la instrucción (Fetch), 2. Descodificarla (Decode), y 3. Ejecutarla por cálculo.',
      exemple: 'Al escribir, abrir un juego o una aplicación, el procesador ejecuta instantáneamente miles de millones de operaciones binarias por segundo.',
      underComponents: {
        h_uc: {
          name: 'Unidad de Control (UC)',
          role: 'Obtiene, descodifica y dirige la ejecución de cada instrucción.',
          definition: "Es el **director de orquesta** del procesador. Dirige todo. Científicamente, gestiona el flujo de información y la activación de los demás componentes.",
          fonction: 'Busca la instrucción grabada en la memoria RAM, descodifica su significado binario y envía comandos precisos al componente correcto.',
          exemple: 'Si la instrucción dice "Mostrar la letra A", la analiza y ordena a la pantalla encender los píxeles correspondientes.'
        },
        h_ual: {
          name: 'Unidad Aritmético Lógica (ALU)',
          role: 'Ejecuta todos los cálculos matemáticos y comparaciones lógicas.',
          definition: 'Es la calculadora ultra-rápida integrada en el procesador. Realiza operaciones matemáticas y elecciones lógicas.',
          fonction: 'Efectúa dos tipos de operaciones: cálculos aritméticos básicos (sumas, restas) y comparaciones lógicas de Verdadero/Falso.',
          exemple: 'Resolver la suma binaria de 2+3 o comprobar si una contraseña coincide con la guardada.'
        }
      }
    },
    h_motherboard: {
      name: 'Placa Base',
      roleBadge: 'Esqueleto Eléctrico Global',
      functionalClassification: 'Esqueleto / Interconexión',
      physicalClassification: 'Unidad Central (Interno)',
      shortDescription: 'La placa de circuito impreso principal que conecta todos los componentes del ordenador.',
      definition: "Es el **esqueleto de interconexión** del ordenador. Contiene las pistas de cobre que comunican las piezas.",
      fonction: 'Distribuye la electricidad y proporciona canales (buses) para que los mensajes binarios viajen al instante.',
      exemple: 'Conecta físicamente el procesador, los módulos de RAM, el almacenamiento y la tarjeta gráfica.'
    },
    h_gpu: {
      name: 'Tarjeta Gráfica (GPU)',
      roleBadge: 'Calculadora Visual dedicada',
      functionalClassification: 'Procesamiento',
      physicalClassification: 'Unidad Central (Interno)',
      shortDescription: 'Procesa datos gráficos y muestra imágenes, vídeos y animaciones en pantalla.',
      definition: 'El artista dedicado del ordenador. Un circuito dedicado a la creación ágil de imágenes en pantalla.',
      fonction: 'Recibe datos geométricos del CPU, procesa píxeles en paralelo y emite el cuadro visual definitivo.',
      exemple: 'Dibujar en tiempo real los elementos 3D dinámicos de un simulador o un juego.'
    }
  },
  de: {
    h_cpu: {
      name: 'Prozessor (CPU)',
      roleBadge: 'Haupt-Rechengehirn',
      functionalClassification: 'Verarbeitung',
      physicalClassification: 'Zentraleinheit (Intern)',
      shortDescription: 'Führt Programmbefehle nacheinander aus und koordiniert alle physischen Komponenten.',
      definition: "Es ist das wahre **Gehirn des Computers**. Er koordiniert und berechnet alles, was passiert. Physisch ist der Prozessor (CPU) ein winziger Siliziumchip mit Milliarden Mikroschaltern, genannt Transistoren.",
      fonction: 'Er liest Befehle nacheinander ein. Der Zyklus hat drei Schritte: 1. Befehl aus dem RAM holen (Fetch), 2. Entschlüsseln (Decode), 3. Ausführen und Berechnen (Execute).',
      exemple: 'Beim Tippen oder Öffnen eines Programms rechnet die CPU Milliarden Mal pro Sekunde, um sofort zu reagieren.',
      underComponents: {
        h_uc: {
          name: 'Steuerwerk (CU)',
          role: 'Holt, dekodiert und steuert die Ausführung aller Befehle.',
          definition: 'Der Dirigent im Prozessor. Er regelt die Informationswege und die Aktivierung anderer Teile.',
          fonction: 'Holt den Binärcode aus dem Arbeitsspeicher, übersetzt ihn und steuert gezielt die Rechenwerke.',
          exemple: 'Sagt dem Monitor bei der Taste "A", welche Pixel aufleuchten sollen.'
        },
        h_ual: {
          name: 'Arithmetisch-logische Einheit (ALU)',
          role: 'Führt alle mathematischen Berechnungen und logischen Vergleiche aus.',
          definition: 'Die ultraschnelle Rechenmaschine im Herzen der CPU für Arithmetik und Logik.',
          fonction: 'Berechnet Additionen, Subtraktionen sowie logische Entscheidungen wie Größer/Kleiner-Vergleiche.',
          exemple: 'Berechnet die Summe von 2+3 oder prüft, ob das Passwort richtig eingegeben wurde.'
        }
      }
    },
    h_motherboard: {
      name: 'Mainboard (Motherboard)',
      roleBadge: 'Hauptplatine der Hardware',
      functionalClassification: 'Skelett / Interverbindung',
      physicalClassification: 'Zentraleinheit (Intern)',
      shortDescription: 'Die zentrale Leiterplatte des Computers, die alle wichtigen PC-Komponenten verbindet.',
      definition: 'Das Rückgrat des Computers. Eine Kunststoffplatte mit feinsten Kupferbahnen für alle Anschlüsse.',
      fonction: 'Verteilt den Strom und bietet Datenleitungen (Busse), damit Informationen sofort fließen können.',
      exemple: 'Verbindet CPU, Arbeitsspeicher (RAM) und Speicherlaufwerke miteinander.'
    }
  }
};

/**
 * Helper that takes a MainComponent defined in French, and returns a translated
 * version if a translation exists in `hierarchicalTranslations` for the requested language.
 */
export function getLocalizedHierarchicalComponent(
  comp: any,
  lang: SupportedLang
): any {
  if (lang === 'fr') return comp;

  const dictionary = hierarchicalTranslations[lang];
  if (!dictionary) return comp;

  const trans = dictionary[comp.id];
  if (!trans) return comp;

  // Let's deeply translate the component
  const localized = {
    ...comp,
    name: trans.name || comp.name,
    roleBadge: trans.roleBadge || comp.roleBadge,
    functionalClassification: trans.functionalClassification || comp.functionalClassification,
    physicalClassification: trans.physicalClassification || comp.physicalClassification,
    shortDescription: trans.shortDescription || comp.shortDescription,
    details: {
      ...comp.details,
      definition: trans.definition || comp.details.definition,
      fonction: trans.fonction || comp.details.fonction,
      exemple: trans.exemple || comp.details.exemple,
      schema: trans.schema || comp.details.schema
    }
  };

  if (comp.underComponents && comp.underComponents.length > 0 && trans.underComponents) {
    localized.underComponents = comp.underComponents.map((under: any) => {
      const underTrans = trans.underComponents?.[under.id];
      if (!underTrans) return under;

      const updatedUnder = {
        ...under,
        name: underTrans.name || under.name,
        role: underTrans.role || under.role,
        details: under.details ? {
          ...under.details,
          definition: underTrans.definition || under.details.definition,
          fonction: underTrans.fonction || under.details.fonction,
          exemple: underTrans.exemple || under.details.exemple
        } : undefined
      };

      if (under.subElements && underTrans.subElements) {
        updatedUnder.subElements = under.subElements.map((sub: any, idx: number) => {
          const subTrans = underTrans.subElements?.[idx];
          if (!subTrans) return sub;
          return {
            ...sub,
            name: subTrans.name || sub.name,
            role: subTrans.role || sub.role,
            more: subTrans.more || sub.more
          };
        });
      }

      return updatedUnder;
    });
  }

  return localized;
}
