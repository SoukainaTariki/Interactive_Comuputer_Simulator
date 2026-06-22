import React, { useEffect, useState, useRef } from 'react';
import { 
  X,
  ChevronRight,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { 
  BusType, 
  BusPath, 
  BUS_COLORS
} from '../data/diagramData';
import { useLanguage } from '../context/LanguageContext';

interface ComputerDiagramAdvancedProps {
  activeStepIndex: number;
  scenarioId: 'clavier_ecrire' | 'faire_calcul' | 'ouvrir_image' | 'ouvrir_fichier' | 'enregistrer_fichier' | 'cycle_cpu' | 'demarrage_pc';
  selectedComponentId: string | null;
  onSelectComponent: (id: string | null) => void;
  isPlaying: boolean;
  activeDelay?: number;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  zoomScale: number;
  setZoomScale: React.Dispatch<React.SetStateAction<number>>;
  panOffset: { x: number; y: number };
  setPanOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
}

interface Particle { 
  id: number; 
  progress: number; 
  busId: string; 
  type: BusType; 
}

// Coordinate layout generator based on isFullscreen parameter
const getLayoutCoordinates = (isFullscreenParam: boolean) => {
  const isFullscreen = isFullscreenParam; // Use dynamic spacious coordinates based on actual fullscreen State
  const scale = isFullscreen ? 1.2 : 1.0;
  
  // Dynamic Canvas boundaries
  const w = isFullscreen ? 1550 : 1300;
  const h = isFullscreen ? 900 : 800;
  
  const card_w = isFullscreen ? 210 : 170;
  const card_h = isFullscreen ? 82 : 72;

  // Columns & Motherboard Box definition
  const inputs_x = isFullscreen ? 40 : 35;
  const outputs_x = isFullscreen ? 1285 : 1085;

  const mb_x = isFullscreen ? 295 : 245;
  const mb_w = isFullscreen ? 945 : 790;
  const mb_cx = mb_x + mb_w / 2;
  const mb_y = 20;
  const mb_h = h - 60;

  // CPU dimensions inside Motherboard
  const cpu_w = isFullscreen ? 620 : 540;
  const cpu_h = isFullscreen ? 420 : 370;
  const cpu_x = mb_cx - cpu_w / 2;
  const cpu_y = isFullscreen ? 190 : 160;

  // Bottom row slots inside Motherboard Box
  const bottom_y = isFullscreen ? 685 : 595;

  const rom_w = isFullscreen ? 140 : 120;
  const rom_h = isFullscreen ? 75 : 65;
  const rom_x = mb_x + (isFullscreen ? 30 : 20);

  const ssd_w = isFullscreen ? 170 : 140;
  const ssd_h = isFullscreen ? 75 : 65;
  const ssd_x = mb_x + (isFullscreen ? 200 : 165);

  const gpu_w = isFullscreen ? 175 : 145;
  const gpu_h = isFullscreen ? 75 : 65;
  const gpu_x = mb_cx - gpu_w / 2;

  const stok_w = isFullscreen ? 145 : 120;
  const stok_h = isFullscreen ? 70 : 60;
  const stok_x = mb_x + mb_w - (isFullscreen ? 350 : 295);

  const psu_w = isFullscreen ? 180 : 150;
  const psu_h = isFullscreen ? 110 : 95;
  const psu_x = mb_x + mb_w - (isFullscreen ? 195 : 160);

  const rects: Record<string, [number, number, number, number]> = {
    // Left Column: External Inputs
    webcam:       [inputs_x,  100,  card_w, card_h],
    clavier:      [inputs_x,  220,  card_w, card_h],
    souris:       [inputs_x,  340,  card_w, card_h],
    microphone:   [inputs_x,  460,  card_w, card_h],

    // Motherboard Center - Top: RAM Only
    ram:          [mb_cx - (card_w + 30)/2,  mb_y + 30,  card_w + 30, card_h + 10],

    // Motherboard Center - Middle: CPU Box
    cpu:          [cpu_x,  cpu_y,  cpu_w, cpu_h],
    uc:           [cpu_x + 20,  cpu_y + 45, isFullscreen ? 175 : 155, isFullscreen ? 85 : 75],
    ual:          [cpu_x + (isFullscreen ? 215 : 195),  cpu_y + 45, isFullscreen ? 175 : 155, isFullscreen ? 85 : 75],
    registres:    [cpu_x + 20,  cpu_y + (isFullscreen ? 290 : 250), isFullscreen ? 175 : 155, isFullscreen ? 85 : 75],
    
    cache_l1:     [cpu_x + cpu_w - (isFullscreen ? 150 : 135),  cpu_y + 40, isFullscreen ? 130 : 115, isFullscreen ? 70 : 62],
    cache_l2:     [cpu_x + cpu_w - (isFullscreen ? 150 : 135),  cpu_y + 125, isFullscreen ? 130 : 115, isFullscreen ? 70 : 62],
    cache_l3:     [cpu_x + cpu_w - (isFullscreen ? 150 : 135),  cpu_y + 210, isFullscreen ? 130 : 115, isFullscreen ? 70 : 62],
    cache:        [cpu_x + cpu_w - (isFullscreen ? 150 : 135),  cpu_y + 125, isFullscreen ? 130 : 115, isFullscreen ? 70 : 62],

    // Right Column: External Outputs
    ecran:        [outputs_x,  120,  card_w + 20, card_h + 10],
    hautparleurs: [outputs_x,  250,  card_w, card_h],
    imprimante:   [outputs_x,  385,  card_w, card_h],

    // Motherboard Center - Bottom: Secondary components, PSU & Storage Peripherals
    rom:          [rom_x,  bottom_y, rom_w, rom_h],
    ssd_hdd:      [ssd_x,  bottom_y, ssd_w, ssd_h],
    gpu:          [gpu_x,  bottom_y, gpu_w, gpu_h],
    stockage_ext: [stok_x, bottom_y + 5, stok_w, stok_h],
    psu:          [psu_x,  bottom_y - 12, psu_w, psu_h],
  };
  
  return { rects, w, h, mb_box: [mb_x, mb_y, mb_w, mb_h] };
};

const getAdvancedTargetId = (id: string): string => {
  const nid = id.toLowerCase();
  if (nid.includes('clavier')) return 'clavier';
  if (nid.includes('souris')) return 'souris';
  if (nid.includes('webcam')) return 'webcam';
  if (nid.includes('micro')) return 'micro';
  if (nid.includes('ecran') || nid.includes('écran')) return 'ecran';
  if (nid.includes('imprimante')) return 'imprimante';
  if (nid.includes('hautparleur') || nid.includes('haut-parleur') || nid.includes('spk')) return 'HP';
  if (nid.includes('cpu') || nid.includes('processeur')) return 'cpu';
  if (nid.includes('uc') || nid.includes('contrôle')) return 'uc';
  if (nid.includes('ual') || nid.includes('alu')) return 'ual';
  if (nid.includes('registre')) return 'registre';
  if (nid.includes('ram')) return 'ram';
  if (nid.includes('rom')) return 'rom';
  if (nid.includes('ssd_hdd') || nid.includes('ssd') || nid.includes('hdd') || nid.includes('stockage')) return 'stockage';
  if (nid.includes('cache_l1') || nid.includes('cache_l2') || nid.includes('cache_l3')) return 'cache';
  if (nid.includes('gpu')) return 'gpu';
  if (nid.includes('psu') || nid.includes('alim')) return 'psu';
  return id;
};

export default function ComputerDiagramAdvanced({
  activeStepIndex,
  scenarioId,
  selectedComponentId,
  onSelectComponent,
  isPlaying,
  activeDelay = 3000,
  isFullscreen = false,
  onToggleFullscreen,
  zoomScale,
  setZoomScale,
  panOffset,
  setPanOffset
}: ComputerDiagramAdvancedProps) {
  const { labels: LABELS, details: DETAILS, busLabels: BUS_LABELS, t, language } = useLanguage();

  const [activeCapsule, setActiveCapsule] = useState<{ x: number; y: number; text: string; show: boolean }>({
    x: 0,
    y: 0,
    text: '',
    show: false
  });

  const [hoveredCompId, setHoveredCompId] = useState<string | null>(null);
  const [hoveredBus, setHoveredBus] = useState<{ id: string; x: number; y: number } | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [activeRevealTab] = useState<'global' | 'cpu' | 'buses' | 'memory' | 'boot'>('global');
  
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [isSpacePressed, setIsSpacePressed] = useState<boolean>(false);

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panOffsetStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const { learningLevel, setLearningLevel, isProjectionMode, setActiveTab, setActiveComponentId } = useLearning();

  // Dynamic layout calculations
  const { rects, w: viewBoxWidth, h: viewBoxHeight, mb_box } = React.useMemo(() => {
    return getLayoutCoordinates(isFullscreen);
  }, [isFullscreen]);

  const cx = (id: string) => {
    const normId = id === 'cache' ? 'cache_l2' : id;
    const r = rects[normId];
    if (!r) return 0;
    return r[0] + r[2] / 2;
  };
  const cy = (id: string) => {
    const normId = id === 'cache' ? 'cache_l2' : id;
    const r = rects[normId];
    if (!r) return 0;
    return r[1] + r[3] / 2;
  };
  const right = (id: string) => {
    const normId = id === 'cache' ? 'cache_l2' : id;
    const r = rects[normId];
    if (!r) return 0;
    return r[0] + r[2];
  };
  const left = (id: string) => {
    const normId = id === 'cache' ? 'cache_l2' : id;
    const r = rects[normId];
    if (!r) return 0;
    return r[0];
  };
  const top = (id: string) => {
    const normId = id === 'cache' ? 'cache_l2' : id;
    const r = rects[normId];
    if (!r) return 0;
    return r[1];
  };
  const bottom = (id: string) => {
    const normId = id === 'cache' ? 'cache_l2' : id;
    const r = rects[normId];
    if (!r) return 0;
    return r[1] + r[3];
  };

  // PROGRAMMATIC 100% ORTHOGONAL STATIC BUS PATHWAYS (Rule 1/2/5/11)
  const STATIC_BUSES = React.useMemo(() => {
    const mb_x = mb_box[0];
    const mb_w = mb_box[2];
    const mb_y = mb_box[1];

    // Orthogonal trace highways to prevent messy overlaps
    const lHighway1 = mb_x - 35;
    const lHighway2 = mb_x - 25;
    const lHighway3 = mb_x - 15;
    const lHighway4 = mb_x - 5;

    const rHighway1 = mb_x + mb_w + 15;
    const rHighway2 = mb_x + mb_w + 25;
    const rHighway3 = mb_x + mb_w + 35;
    const rHighway4 = mb_x + mb_w + 45;

    const bCY = (bottom('cpu') + top('gpu')) / 2;

    const paths: BusPath[] = [
      // DATA: Inputs → RAM (routed cleanly through left highways, then across above the motherboard)
      { id:'wcm-ram', type:'data', d:`M ${right('webcam')} ${cy('webcam')} L ${lHighway1} ${cy('webcam')} L ${lHighway1} ${mb_y + 10} L ${cx('ram') - 30} ${mb_y + 10} L ${cx('ram') - 30} ${top('ram')}` },
      { id:'kbd-ram', type:'data', d:`M ${right('clavier')} ${cy('clavier')} L ${lHighway2} ${cy('clavier')} L ${lHighway2} ${mb_y + 15} L ${cx('ram') - 15} ${mb_y + 15} L ${cx('ram') - 15} ${top('ram')}` },
      { id:'sor-ram', type:'data', d:`M ${right('souris')} ${cy('souris')} L ${lHighway3} ${cy('souris')} L ${lHighway3} ${mb_y + 20} L ${cx('ram') - 5} ${mb_y + 20} L ${cx('ram') - 5} ${top('ram')}` },
      { id:'mic-ram', type:'data', d:`M ${right('microphone')} ${cy('microphone')} L ${lHighway4} ${cy('microphone')} L ${lHighway4} ${mb_y + 25} L ${cx('ram') + 10} ${mb_y + 25} L ${cx('ram') + 10} ${top('ram')}` },

      // DATA: RAM → Outputs (routes right into neat vertical highways, down to each device level)
      { id:'ram-scr', type:'data', d:`M ${right('ram')} ${cy('ram')} L ${rHighway1} ${cy('ram')} L ${rHighway1} ${cy('ecran')} L ${left('ecran')} ${cy('ecran')}` },
      { id:'ram-spk', type:'data', d:`M ${right('ram')} ${cy('ram') + 10} L ${rHighway2} ${cy('ram') + 10} L ${rHighway2} ${cy('hautparleurs')} L ${left('hautparleurs')} ${cy('hautparleurs')}` },
      { id:'ram-prn', type:'data', d:`M ${right('ram')} ${cy('ram') - 10} L ${rHighway3} ${cy('ram') - 10} L ${rHighway3} ${cy('imprimante')} L ${left('imprimante')} ${cy('imprimante')}` },

      // DATA: Registers → RAM (leaves CPU from left, routes up along outer CPU side back to RAM)
      { id:'reg-ram', type:'data', d:`M ${left('registres')} ${cy('registres')} L ${left('cpu') - 20} ${cy('registres')} L ${left('cpu') - 20} ${top('cpu') - 12} L ${left('ram') + 20} ${top('cpu') - 12} L ${left('ram') + 20} ${bottom('ram')}` },

      // ADDR: RAM ↓ UC (Address bus indicating address target)
      { id:'ram-uc',  type:'addr', d:`M ${left('ram') + 40} ${bottom('ram')} L ${left('ram') + 40} ${top('cpu') - 18} L ${cx('uc')} ${top('cpu') - 18} L ${cx('uc')} ${top('uc')}` },

      // ADDR: UC → Registers (Central status lines)
      { id:'uc-reg',  type:'addr', d:`M ${cx('uc')} ${bottom('uc')} L ${cx('uc')} ${top('registres')}` },

      // CTRL: UC ↔ UAL (internal CPU)
      { id:'uc-ual',  type:'ctrl', d:`M ${right('uc')} ${cy('uc')} L ${left('ual')} ${cy('ual')}` },

      // CTRL: UAL → Registers (stores computed operations)
      { id:'ual-reg', type:'ctrl', d:`M ${cx('ual')} ${bottom('ual')} L ${cx('ual')} ${bCY - 12} L ${cx('registres')} ${bCY - 12} L ${cx('registres')} ${top('registres')}` },

      // DATA: RAM ↔ Cache (links memory to L1/L2 caches gracefully)
      { id:'ram-cch', type:'data', d:`M ${right('ram') - 40} ${bottom('ram')} L ${right('ram') - 40} ${top('cpu') - 18} L ${cx('cache_l1')} ${top('cpu') - 18} L ${cx('cache_l1')} ${top('cache_l1')}` },

      // DATA: SSD → RAM (secondary storage lookup)
      { id:'ssd-ram', type:'data', d:`M ${cx('ssd_hdd')} ${top('ssd_hdd')} L ${cx('ssd_hdd')} ${top('ssd_hdd') - 20} L ${mb_x + 20} ${top('ssd_hdd') - 20} L ${mb_x + 20} ${cy('ram') + 10} L ${left('ram')} ${cy('ram') + 10}` },

      // DATA: ROM → CPU (Boot logic)
      { id:'rom-cpu', type:'data', d:`M ${cx('rom')} ${top('rom')} L ${cx('rom')} ${top('rom') - 25} L ${left('cpu') + 30} ${top('rom') - 25} L ${left('cpu') + 30} ${bottom('cpu')}` },

      // DATA: GPU → CPU (high speed instruction pipeline)
      { id:'gpu-cpu', type:'data', d:`M ${cx('gpu')} ${top('gpu')} L ${cx('gpu')} ${bottom('cpu')}` },

      // DATA: GPU → Écran (Direct Pixel processing)
      { id:'gpu-scr', type:'data', d:`M ${right('gpu')} ${cy('gpu')} L ${rHighway4} ${cy('gpu')} L ${rHighway4} ${cy('ecran') + 15} L ${left('ecran')} ${cy('ecran') + 15}` },

      // CTRL: PSU → CPU (electrical current pipeline)
      { id:'psu-cpu', type:'ctrl', d:`M ${cx('psu')} ${top('psu')} L ${cx('psu')} ${top('psu') - 20} L ${right('cpu') - 30} ${top('psu') - 20} L ${right('cpu') - 30} ${bottom('cpu')}` },

      // DATA: ROM → RAM (micro-booting values loader)
      { id:'rom-ram', type:'data', d:`M ${left('rom')} ${cy('rom')} L ${mb_x + 10} ${cy('rom')} L ${mb_x + 10} ${cy('ram') + 20} L ${left('ram')} ${cy('ram') + 20}` },
    ];

    return paths;
  }, [rects, mb_box]);

  // spacebar hook for cursor/mode switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        setIsSpacePressed(true);
        e.preventDefault();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Figma style canvas wheel zoom & pinch-to-zoom
  useEffect(() => {
    const element = canvasRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const zoomFactor = 1.08;
        const direction = e.deltaY < 0 ? 1 : -1;
        let nextScale = direction > 0 ? zoomScale * zoomFactor : zoomScale / zoomFactor;
        nextScale = Math.max(0.5, Math.min(nextScale, 3.5));

        const rect = element.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xs = (mouseX - panOffset.x) / zoomScale;
        const ys = (mouseY - panOffset.y) / zoomScale;

        setZoomScale(nextScale);
        setPanOffset({
          x: mouseX - xs * nextScale,
          y: mouseY - ys * nextScale
        });
      }
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    return () => element.removeEventListener('wheel', handleWheel);
  }, [zoomScale, panOffset, setZoomScale, setPanOffset]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeStepIndex >= 0) return;
    const target = e.target as HTMLElement;
    const isInteractive = target.closest('button') || target.closest('a') || target.closest('[id*="hw-node-"]');
    if (!isInteractive && (e.button === 0 || e.button === 1)) {
      setIsPanning(true);
      panStartRef.current = { x: e.clientX, y: e.clientY };
      panOffsetStartRef.current = { ...panOffset };
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    setPanOffset({
      x: panOffsetStartRef.current.x + dx,
      y: panOffsetStartRef.current.y + dy
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsPanning(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (activeStepIndex >= 0) return;
    const target = e.target as HTMLElement;
    const isInteractive = target.closest('button') || target.closest('a') || target.closest('[id*="hw-node-"]');
    if (!isInteractive && e.touches.length === 1) {
      const touch = e.touches[0];
      setIsPanning(true);
      panStartRef.current = { x: touch.clientX, y: touch.clientY };
      panOffsetStartRef.current = { ...panOffset };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isPanning || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - panStartRef.current.x;
    const dy = touch.clientY - panStartRef.current.y;
    setPanOffset({
      x: panOffsetStartRef.current.x + dx,
      y: panOffsetStartRef.current.y + dy
    });
  };

  const handleZoomIn = () => setZoomScale(prev => Math.min(prev + 0.15, 3.5));
  const handleZoomOut = () => setZoomScale(prev => Math.max(prev - 0.15, 0.5));
  const resetZoomAndPan = () => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handlePopupEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedComponentId) {
        onSelectComponent(null);
      }
    };
    window.addEventListener('keydown', handlePopupEsc);
    return () => window.removeEventListener('keydown', handlePopupEsc);
  }, [selectedComponentId, onSelectComponent]);

  const activeFocusId = hoveredCompId || selectedComponentId;

  const isBusConnectedToNode = (busId: string, nodeId: string): boolean => {
    const normNodeId = nodeId === 'cache' ? 'cache_l2' : nodeId;
    switch (normNodeId) {
      case 'clavier': return ['kbd-ram'].includes(busId);
      case 'webcam': return ['wcm-ram'].includes(busId);
      case 'souris': return ['sor-ram'].includes(busId);
      case 'microphone': return ['mic-ram'].includes(busId);
      case 'ecran': return ['ram-scr', 'gpu-scr'].includes(busId);
      case 'hautparleurs': return ['ram-spk'].includes(busId);
      case 'imprimante': return ['ram-prn'].includes(busId);
      case 'ram': return ['kbd-ram', 'wcm-ram', 'sor-ram', 'mic-ram', 'ram-scr', 'ram-spk', 'ram-prn', 'reg-ram', 'ram-uc', 'ram-cch', 'ssd-ram', 'rom-ram'].includes(busId);
      case 'cache_l1':
      case 'cache_l2':
      case 'cache_l3': return ['ram-cch'].includes(busId);
      case 'uc': return ['ram-uc', 'uc-reg', 'uc-ual'].includes(busId);
      case 'ual': return ['uc-ual', 'ual-reg'].includes(busId);
      case 'registres': return ['reg-ram', 'uc-reg', 'ual-reg'].includes(busId);
      case 'gpu': return ['gpu-cpu', 'gpu-scr'].includes(busId);
      case 'rom': return ['rom-cpu', 'rom-ram'].includes(busId);
      case 'ssd_hdd': return ['ssd-ram', 'ssd-cpu'].includes(busId);
      case 'stockage_ext': return ['ssd-raw'].includes(busId);
      case 'psu': return ['psu-cpu'].includes(busId);
      case 'cpu': return ['gpu-cpu', 'rom-cpu', 'psu-cpu', 'reg-ram', 'ram-uc', 'ram-cch'].includes(busId);
      default: return false;
    }
  };

  const isNodeVisible = (id: string) => {
    if (learningLevel === 'simple') {
      return ['clavier', 'cpu', 'ssd_hdd', 'ecran'].includes(id);
    }
    if (learningLevel === 'intermediate') {
      return ['clavier', 'ram', 'ssd_hdd', 'ecran', 'cpu'].includes(id);
    }
    return true; 
  };

  const isBusVisible = (busId: string) => {
    if (learningLevel === 'simple') {
      return ['kbd-ram', 'ram-scr', 'ssd-ram'].includes(busId);
    }
    if (learningLevel === 'intermediate') {
      return ['kbd-ram', 'ram-scr', 'ssd-ram', 'reg-ram', 'ram-uc'].includes(busId);
    }
    return true;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen && onToggleFullscreen) {
        onToggleFullscreen();
      }
    };
    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, onToggleFullscreen]);

  const partRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const partIdRef = useRef(0);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    return () => observer.disconnect();
  }, []);

  const speed = 3000 / activeDelay;

  const getTrajectory = () => {
    if (scenarioId === 'clavier_ecrire') {
      return [
        { from: 'clavier', to: 'clavier', text: 'A', activeId: 'clavier' }, 
        { from: 'clavier', to: 'ram', text: '01000001 (A)', activeId: 'clavier' }, 
        { from: 'clavier', to: 'ram', text: '01000001', activeId: 'ram' }, 
        { from: 'ram', to: 'uc', text: '01000001', activeId: 'uc' }, 
        { from: 'uc', to: 'uc', text: 'Décodage A', activeId: 'uc' }, 
        { from: 'uc', to: 'ram', text: 'Pixels A', activeId: 'ram' }, 
        { from: 'ram', to: 'ecran', text: 'A', activeId: 'ecran' }  
      ];
    } else if (scenarioId === 'faire_calcul') {
      return [
        { from: 'clavier', to: 'clavier', text: '2 + 3', activeId: 'clavier' }, 
        { from: 'clavier', to: 'ram', text: '2 + 3', activeId: 'ram' }, 
        { from: 'ram', to: 'uc', text: '2 + 3', activeId: 'uc' }, 
        { from: 'uc', to: 'ual', text: 'Calcul (+)', activeId: 'uc' }, 
        { from: 'ual', to: 'registres', text: '5', activeId: 'ual' }, 
        { from: 'ual', to: 'ram', text: '5 (Résultat)', activeId: 'ram' }, 
        { from: 'ram', to: 'ecran', text: '5', activeId: 'ecran' } 
      ];
    } else if (scenarioId === 'ouvrir_image') {
      return [
        { from: 'clavier', to: 'clavier', text: 'Double Clic', activeId: 'clavier' }, 
        { from: 'ssd_hdd', to: 'ssd_hdd', text: 'image.jpg', activeId: 'ssd_hdd' }, 
        { from: 'ssd_hdd', to: 'ram', text: 'image.jpg', activeId: 'ram' }, 
        { from: 'ram', to: 'cpu', text: 'Décompress JPG', activeId: 'cpu' }, 
        { from: 'cpu', to: 'gpu', text: 'Rendu Pixels', activeId: 'gpu' }, 
        { from: 'gpu', to: 'ecran', text: '🖼️ Image HD', activeId: 'ecran' } 
      ];
    } else if (scenarioId === 'ouvrir_fichier') {
      return [
        { from: 'souris', to: 'souris', text: 'Double Clic', activeId: 'souris' }, 
        { from: 'souris', to: 'uc', text: 'Interrupt OS', activeId: 'uc' }, 
        { from: 'uc', to: 'ssd_hdd', text: 'Chercher index', activeId: 'ssd_hdd' }, 
        { from: 'ssd_hdd', to: 'ram', text: 'Texte binaire', activeId: 'ram' }, 
        { from: 'ram', to: 'cpu', text: 'Décoder texte', activeId: 'cpu' }, 
        { from: 'cpu', to: 'ecran', text: '📄 Texte ouvert', activeId: 'ecran' } 
      ];
    } else if (scenarioId === 'enregistrer_fichier') {
      return [
        { from: 'clavier', to: 'clavier', text: 'Ctrl + S', activeId: 'clavier' }, 
        { from: 'clavier', to: 'ram', text: 'Sauvegarde', activeId: 'ram' }, 
        { from: 'ram', to: 'uc', text: 'Écrire bloc', activeId: 'uc' }, 
        { from: 'uc', to: 'ssd_hdd', text: 'Écriture SSD', activeId: 'ssd_hdd' }, 
        { from: 'ssd_hdd', to: 'rom', text: 'Index système', activeId: 'rom' }, 
        { from: 'ssd_hdd', to: 'ecran', text: '💾 Enregistré', activeId: 'ecran' } 
      ];
    } else if (scenarioId === 'cycle_cpu') {
      return [
        { from: 'ram', to: 'ram', text: 'Instruction Fetch', activeId: 'ram' }, 
        { from: 'ram', to: 'uc', text: 'Opcode binaire', activeId: 'uc' }, 
        { from: 'uc', to: 'uc', text: 'Decode [ADD]', activeId: 'uc' }, 
        { from: 'uc', to: 'registres', text: 'Load opérandes', activeId: 'registres' }, 
        { from: 'registres', to: 'ual', text: 'Execute UAL', activeId: 'ual' }, 
        { from: 'ual', to: 'registres', text: 'Write outcome', activeId: 'registres' } 
      ];
    } else if (scenarioId === 'demarrage_pc') {
      return [
        { from: 'psu', to: 'psu', text: 'Bouton ON ⚡', activeId: 'psu' },
        { from: 'psu', to: 'cpu', text: 'Courant 12V 🔌', activeId: 'psu' },
        { from: 'rom', to: 'cpu', text: 'BIOS Boot 🔒', activeId: 'rom' },
        { from: 'ssd_hdd', to: 'ram', text: 'Charge Kernel 💾', activeId: 'ram' },
        { from: 'cpu', to: 'cpu', text: 'Calcul Init 🧠', activeId: 'uc' },
        { from: 'ram', to: 'cpu', text: 'OS Appelé 📊', activeId: 'uc' },
        { from: 'cpu', to: 'ecran', text: '🖥️ Bureau Prêt !', activeId: 'ecran' }
      ];
    }
    return [];
  };

  const trajectory = getTrajectory();
  const currentStep = trajectory[activeStepIndex] || trajectory[0];

  const getActiveBusId = (from: string, to: string): string => {
    if (to === 'ram') {
      if (from === 'clavier') return 'kbd-ram';
      if (from === 'webcam') return 'wcm-ram';
      if (from === 'souris') return 'sor-ram';
      if (from === 'microphone') return 'mic-ram';
      if (from === 'registres') return 'reg-ram';
      if (from === 'ssd_hdd') return 'ssd-ram';
      if (from === 'rom') return 'rom-ram';
    }
    if (from === 'ram') {
      if (to === 'ecran') return 'ram-scr';
      if (to === 'hautparleurs') return 'ram-spk';
      if (to === 'imprimante') return 'ram-prn';
      if (to === 'uc') return 'ram-uc';
      if (to === 'cache') return 'ram-cch';
    }
    if (from === 'uc') {
      if (to === 'registres') return 'uc-reg';
      if (to === 'ual') return 'uc-ual';
    }
    if (from === 'ual' && to === 'registres') return 'ual-reg';
    if (from === 'cache' && to === 'ram') return 'ram-cch';
    if (from === 'gpu' && to === 'cpu') return 'gpu-cpu';
    if (from === 'gpu' && to === 'ecran') return 'gpu-scr';
    if (from === 'psu' && to === 'cpu') return 'psu-cpu';
    if (from === 'rom' && to === 'cpu') return 'rom-cpu';
    if (from === 'rom' && to === 'ram') return 'rom-ram';
    
    // fallbacks
    if (from === 'cpu' && to === 'gpu') return 'gpu-cpu';
    if (from === 'cpu' && to === 'ecran') return 'ram-scr';
    if (from === 'souris' && to === 'uc') return 'kbd-ram';
    if (from === 'uc' && to === 'ssd_hdd') return 'ssd-ram';
    return '';
  };

  const activeBusId = getActiveBusId(currentStep.from, currentStep.to);

  const getBusColor = (type: BusType, isActive: boolean) => {
    if (isDarkMode) {
      if (type === 'data') return '#3b82f6';
      if (type === 'addr') return '#c084fc';
      return '#f97316';
    } else {
      if (type === 'data') return '#1d4ed8';
      if (type === 'addr') return '#7e22ce';
      return '#ea580c';
    }
  };

  // Particle Spawner Loop
  useEffect(() => {
    if (!activeBusId) { setParticles([]); return; }
    const intervalTime = Math.max(40, 110 / speed);

    partRef.current = setInterval(() => {
      setParticles(prev => {
        const moved = prev
          .map(p => ({ ...p, progress: p.progress + 0.015 * speed }))
          .filter(p => p.progress < 1);

        const bus = STATIC_BUSES.find(b => b.id === activeBusId);
        if (!bus) return moved;

        const newOnes: Particle[] = [{ id: partIdRef.current++, progress: 0, busId: activeBusId, type: bus.type }];
        return [...moved, ...newOnes.slice(0, 3)];
      });
    }, intervalTime);

    return () => {
      if (partRef.current) clearInterval(partRef.current);
      setParticles([]);
    };
  }, [activeStepIndex, scenarioId, activeBusId, speed, STATIC_BUSES]);

  // Travelling text capsule tracking
  useEffect(() => {
    if (!currentStep) return;

    if (currentStep.from === currentStep.to) {
      setActiveCapsule({
        x: cx(currentStep.from),
        y: cy(currentStep.from),
        text: currentStep.text,
        show: true
      });
    } else {
      const activeBus = STATIC_BUSES.find(b => b.id === activeBusId);
      if (!activeBus) return;
      
      const pts = parsePath(activeBus.d);
      if (pts.length === 0) return;

      let progress = 0;
      const stepTimer = setInterval(() => {
        progress += 0.04 * speed;
        if (progress >= 1) {
          progress = 1;
          clearInterval(stepTimer);
        }

        const point = getPointOnPolyline(pts, progress);
        setActiveCapsule({
          x: point.x,
          y: point.y,
          text: currentStep.text,
          show: true
        });
      }, 30);

      return () => clearInterval(stepTimer);
    }
  }, [activeStepIndex, scenarioId, activeBusId, speed, STATIC_BUSES]);

  const isComponentGlowing = (id: string) => {
    if (currentStep && currentStep.activeId === id) return true;
    if (selectedComponentId === id) return true;
    return false;
  };

  const nodeColors = (id: string) => {
    const isActive = isComponentGlowing(id);
    const isSelected = selectedComponentId === id;

    if (isDarkMode) {
      if (isActive) {
        if (['clavier', 'souris', 'webcam', 'microphone'].includes(id)) {
          return { fill: '#022c22', stroke: '#34d399', text: '#34d399' };
        }
        if (['ecran', 'hautparleurs', 'imprimante'].includes(id)) {
          return { fill: '#2e1065', stroke: '#c084fc', text: '#c084fc' };
        }
        if (['ram', 'cache', 'rom'].includes(id)) {
          return { fill: '#082f49', stroke: '#38bdf8', text: '#38bdf8' };
        }
        if (['uc', 'ual', 'registres'].includes(id)) {
          return { fill: '#451a03', stroke: '#f97316', text: '#f97316' };
        }
        return { fill: '#1e3a8a', stroke: '#3b82f6', text: '#93c5fd' };
      } else {
        return { fill: '#090d16', stroke: isSelected ? '#3b82f6' : '#334155', text: '#cbd5e1' };
      }
    } else {
      if (isActive) {
        if (['clavier', 'souris', 'webcam', 'microphone'].includes(id)) {
          return { fill: '#dcfce7', stroke: '#10b981', text: '#14532d' };
        }
        if (['ecran', 'hautparleurs', 'imprimante'].includes(id)) {
          return { fill: '#f3e8ff', stroke: '#9333ea', text: '#581c87' };
        }
        if (['ram', 'cache', 'rom'].includes(id)) {
          return { fill: '#e0f2fe', stroke: '#0284c7', text: '#0369a1' };
        }
        if (['uc', 'ual', 'registres'].includes(id)) {
          return { fill: '#fef3c7', stroke: '#ea580c', text: '#78350f' };
        }
        return { fill: '#eff6ff', stroke: '#1d4ed8', text: '#1e3a8a' };
      } else {
        return { fill: '#ffffff', stroke: isSelected ? '#1d4ed8' : '#475569', text: '#0f172a' };
      }
    }
  };

  const localMap: Record<string, {
    circulation: string;
    schemaSimple: string;
    schemaInter: string;
    schemaAdvanced: string;
    simple: string;
    inter: string;
    advanced: string;
    titleSimple: string;
    titleInter: string;
    titleAdv: string;
  }> = {
    fr: {
      circulation: "Circulation Temps-Réel",
      schemaSimple: "Schéma Simple",
      schemaInter: "Schéma Intermédiaire",
      schemaAdvanced: "Schéma Avancé",
      simple: "Simple",
      inter: "Intermédiaire",
      advanced: "Avancé",
      titleSimple: "Niveau Simple",
      titleInter: "Niveau Intermédiaire",
      titleAdv: "Niveau Avancé",
    },
    en: {
      circulation: "Real-Time Flow",
      schemaSimple: "Simple Diagram",
      schemaInter: "Intermediate Diagram",
      schemaAdvanced: "Advanced Diagram",
      simple: "Simple",
      inter: "Intermediate",
      advanced: "Advanced",
      titleSimple: "Simple Level",
      titleInter: "Intermediate Level",
      titleAdv: "Advanced Level",
    },
    ar: {
      circulation: "تدفق البيانات في الوقت الفعلي",
      schemaSimple: "مخطط مبسط",
      schemaInter: "مخطط متوسط",
      schemaAdvanced: "مخطط متقدم",
      simple: "مبسط",
      inter: "متوسط",
      advanced: "متقدم",
      titleSimple: "مستوى مبسط",
      titleInter: "مستوى متوسط",
      titleAdv: "مستوى متقدم",
    },
    es: {
      circulation: "Flujo en Tiempo Real",
      schemaSimple: "Diagrama Simple",
      schemaInter: "Diagrama Intermedio",
      schemaAdvanced: "Diagrama Avanzado",
      simple: "Simple",
      inter: "Intermedio",
      advanced: "Avanzado",
      titleSimple: "Nivel Simple",
      titleInter: "Nivel Intermedio",
      titleAdv: "Nivel Avanzado",
    },
    de: {
      circulation: "Echtzeit-Datenfluss",
      schemaSimple: "Einfaches Diagramm",
      schemaInter: "Mittleres Diagramm",
      schemaAdvanced: "Erweitertes Diagramm",
      simple: "Einfach",
      inter: "Mittel",
      advanced: "Fortgeschritten",
      titleSimple: "Einfache Stufe",
      titleInter: "Mittlere Stufe",
      titleAdv: "Fortgeschrittene Stufe",
    }
  };

  const currentStrings = localMap[language] || localMap.fr;

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      
      {/* Upper header segment on projection board */}
      <div 
        className="flex justify-between items-center mb-4 px-2 gap-4"
        style={{ paddingLeft: '9px', paddingRight: '5px', marginBottom: '11px' }}
      >
        <div className="flex items-center gap-2">
          <span className="flex h-3.5 w-3.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-purple-500"></span>
          </span>
          <span 
            className={`font-mono font-black ${isProjectionMode ? 'text-base' : 'text-xs'} text-slate-500 dark:text-slate-400 uppercase tracking-widest`}
            style={{ fontSize: '13px' }}
          >
            {currentStrings.circulation} • {currentStrings.schemaAdvanced}
          </span>
        </div>

        {/* Level selector buttons directly next to the title */}
        <div 
          className="flex items-center gap-1 p-1 bg-slate-100/95 dark:bg-slate-950 rounded-xl border-2 border-slate-300 dark:border-slate-800 shadow-sm shrink-0 font-sans"
        >
          <button
            onClick={() => setLearningLevel('simple')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all duration-200 cursor-pointer ${
              learningLevel === 'simple'
                ? 'bg-emerald-600 text-white shadow-xs border border-emerald-500'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-205 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
            }`}
            style={{ paddingTop: '4px', paddingBottom: '4px' }}
            title={currentStrings.titleSimple}
          >
            {currentStrings.simple}
          </button>
          <button
            onClick={() => setLearningLevel('intermediate')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all duration-200 cursor-pointer ${
              learningLevel === 'intermediate'
                ? 'bg-blue-600 text-white shadow-xs border border-blue-500'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-205 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
            }`}
            style={{ paddingBottom: '4px', paddingTop: '4px' }}
            title={currentStrings.titleInter}
          >
            {currentStrings.inter}
          </button>
          <button
            onClick={() => setLearningLevel('advanced')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all duration-200 cursor-pointer ${
              learningLevel === 'advanced'
                ? 'bg-purple-600 text-white shadow-xs border border-purple-500'
                : 'text-slate-600 hover:text-slate-905 hover:bg-slate-205 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
            }`}
            style={{ paddingBottom: '4px', paddingTop: '4px' }}
            title={currentStrings.titleAdv}
          >
            {currentStrings.advanced}
          </button>
        </div>
      </div>
      
      {/* Responsive Full Motherboard Container */}
      <div 
        className={isFullscreen
          ? `relative w-full flex-1 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 overflow-hidden shadow-2xl font-sans transition-all duration-300 min-h-[480px] h-full ${
              isDarkMode ? 'bg-slate-950 shadow-slate-950/40' : 'bg-slate-100 shadow-slate-200/50'
            }`
          : `relative w-full aspect-[16/10] rounded-3xl border border-slate-200/60 dark:border-slate-800/80 overflow-hidden shadow-2xl font-sans transition-all duration-300 ${
              isDarkMode ? 'bg-slate-950 shadow-slate-950/40' : 'bg-slate-100 shadow-slate-200/50'
            }`
        }
        style={{ minHeight: isFullscreen ? undefined : 380 }}
      >

        {/* Outer Grid Tracer Backdrop */}
        <div className="absolute inset-0 pointer-events-none opacity-40 z-0 bg-[radial-gradient(#64748b_1.2px,transparent_1.2px)] dark:bg-[radial-gradient(#334155_1.2px,transparent_1.2px)] bg-[size:20px_20px]"></div>

        <div
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUpOrLeave}
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
            transformOrigin: 'center center',
            transition: isPanning ? 'none' : 'transform 0.15s ease-out',
            cursor: isPanning ? 'grabbing' : 'grab',
            touchAction: 'none'
          }}
          className="absolute inset-0 w-full h-full z-10 origin-center select-none"
        >
          <svg
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            width="100%" height="100%"
            style={{ display: 'block' }}
            className="w-full h-full"
          >
          <defs>
            {/* CPU linear gradients */}
            <linearGradient id="cpu-grad-light" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f0f9ff" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>
            <linearGradient id="cpu-grad-light-glow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>
            <linearGradient id="cpu-grad-dark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0b172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="cpu-grad-dark-glow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f2440" />
              <stop offset="100%" stopColor="#080e1a" />
            </linearGradient>

            {/* Glow filters */}
            <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            
            {/* Shadows */}
            <filter id="card-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor={isDarkMode ? "#000000" : "#0f172a"} floodOpacity={isDarkMode ? "0.6" : "0.08"} />
            </filter>
            <filter id="cpu-shadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor={isDarkMode ? "#000000" : "#0284c7"} floodOpacity={isDarkMode ? "0.65" : "0.15"} />
            </filter>

            {/* Dots */}
            <pattern id="grid-dots" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.75" fill={isDarkMode ? "#334155" : "#94a3b8"} opacity={isDarkMode ? "0.3" : "0.22"} />
            </pattern>

            {/* Arrows */}
            <marker id="arrow-blue" viewBox="0 0 10 10" refX="4.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
              <path d="M 1 2 L 7 5 L 1 8 z" fill={isDarkMode ? '#3b82f6' : '#1d4ed8'} />
            </marker>
            <marker id="arrow-purple" viewBox="0 0 10 10" refX="4.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
              <path d="M 1 2 L 7 5 L 1 8 z" fill={isDarkMode ? '#c084fc' : '#7e22ce'} />
            </marker>
            <marker id="arrow-orange" viewBox="0 0 10 10" refX="4.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
              <path d="M 1 2 L 7 5 L 1 8 z" fill={isDarkMode ? '#f97316' : '#ea580c'} />
            </marker>
          </defs>

          {/* Mesh backdrop inside Motherboard */}
          <rect width={viewBoxWidth} height={viewBoxHeight} fill="url(#grid-dots)" pointerEvents="none"/>

          {/* ⚡ CARTE MÈRE PRINCIPALE Backdrop: Gris très clair, discret et élégant */}
          <rect x={mb_box[0]} y={mb_box[1]} width={mb_box[2]} height={mb_box[3]} rx="20" 
            fill={isDarkMode ? "#0f172a" : "#f8fafc"} 
            fillOpacity={isDarkMode ? "0.3" : "0.9"} 
            stroke={isDarkMode ? "#334155" : "#cbd5e1"} 
            strokeWidth="2.5" strokeDasharray="6 6" pointerEvents="none" 
            filter="url(#card-shadow)"
          />
          
          <text x={mb_box[0] + 20} y={mb_box[1] + mb_box[3] - 15} fontFamily="monospace" fontSize="11" fill={isDarkMode ? "#475569" : "#64748b"} fontWeight="900" letterSpacing="1.8" pointerEvents="none">
            CARTE MÈRE PRINCIPALE (MOTHERBOARD)
          </text>
          <text x={mb_box[0] + mb_box[2] - 20} y={mb_box[1] + mb_box[3] - 15} fontFamily="monospace" fontSize="11" fill={isDarkMode ? "#475569" : "#64748b"} fontWeight="900" letterSpacing="1.2" textAnchor="end" pointerEvents="none">
            3-BUS VON NEUMANN TRACE SYSTEM
          </text>

          {/* 🛣️ SVG LAYER 1 & 2: PASSIVE BUSES (Only rendered underneath component cards) */}
          {STATIC_BUSES.filter(bus => isBusVisible(bus.id) && bus.id !== activeBusId).map(bus => {
            const isTargeted = activeFocusId ? isBusConnectedToNode(bus.id, activeFocusId) : false;
            const opacityVal = activeFocusId ? (isTargeted ? 0.35 : 0.01) : 0.12;
            const busWidth = isProjectionMode ? 7.5 : 5.0;

            return (
              <path
                key={`passive-wide-${bus.id}`}
                d={bus.d}
                fill="none"
                stroke={getBusColor(bus.type, false)}
                strokeWidth={busWidth}
                opacity={opacityVal}
                strokeLinecap="round"
                pointerEvents="none"
                className="transition-all duration-300"
              />
            );
          })}

          {STATIC_BUSES.filter(bus => isBusVisible(bus.id) && bus.id !== activeBusId).map(bus => {
            const isTargeted = activeFocusId ? isBusConnectedToNode(bus.id, activeFocusId) : false;
            const opacityVal = activeFocusId ? (isTargeted ? 0.8 : 0.02) : 0.45;
            const busWidth = isProjectionMode ? 4.5 : 2.5;

            return (
              <path
                key={`passive-dashed-${bus.id}`}
                d={bus.d}
                fill="none"
                stroke={getBusColor(bus.type, false)}
                strokeWidth={busWidth}
                strokeDasharray="5 5"
                opacity={opacityVal}
                strokeLinecap="round"
                pointerEvents="none"
                className="transition-all duration-300"
              />
            );
          })}

          {/* ⚡ SVG LAYER 3: HARDWARE COMPONENT NODES (including outer CPU socket/internals) */}
          {/* Socket outlines for CPU */}
          {(() => {
            const [x, y, w, h] = rects.cpu;
            const isCpuGlow = isComponentGlowing('cpu') || isComponentGlowing('uc') || isComponentGlowing('ual') || isComponentGlowing('registres') || isComponentGlowing('cache');
            return (
              <g pointerEvents="none">
                <rect x={x - 8} y={y - 8} width={w + 16} height={h + 16} rx="16"
                  fill="none" 
                  stroke={isCpuGlow ? "#3b82f6" : (isDarkMode ? "#1e293b" : "#cbd5e1")} 
                  strokeWidth="1.8" 
                  strokeDasharray="12 12"
                  opacity={isCpuGlow ? 1.0 : 0.45}
                />
                <rect x={x} y={y} width={w} height={h} rx="14" fill="none" stroke="none" filter="url(#cpu-shadow)" />
              </g>
            );
          })()}

          {/* Central CPU card */}
          {(() => {
            const [x, y, w, h] = rects.cpu;
            const isCpuGlow = isComponentGlowing('cpu') || isComponentGlowing('uc') || isComponentGlowing('ual') || isComponentGlowing('registres') || isComponentGlowing('cache');
            const isUnifiedCPU = learningLevel === 'simple' || learningLevel === 'intermediate';
            
            let cpuOpacity = 1.0;
            if (activeFocusId) {
              const isCpuSubComponent = ['uc', 'ual', 'registres', 'cache_l1', 'cache_l2', 'cache_l3', 'cache'].includes(activeFocusId);
              if (activeFocusId === 'cpu' || isCpuSubComponent) {
                cpuOpacity = 1.0;
              } else {
                cpuOpacity = 0.15;
              }
            }

            return (
              <g 
                id="hw-node-cpu"
                onClick={() => onSelectComponent('cpu')} 
                style={{ cursor: 'pointer' }}
                opacity={cpuOpacity}
                className="transition-all duration-300"
              >
                <rect x={x} y={y} width={w} height={h} rx="14"
                  fill={isCpuGlow ? (isDarkMode ? "url(#cpu-grad-dark-glow)" : "url(#cpu-grad-light-glow)") : (isDarkMode ? "url(#cpu-grad-dark)" : "url(#cpu-grad-light)")}
                  fillOpacity="0.98"
                  stroke={isCpuGlow ? "#2563eb" : (isDarkMode ? "#38bdf8" : "#0284c7")}
                  strokeWidth={isCpuGlow ? "3.5" : "2.5"}
                  filter="url(#cpu-shadow)"
                />
                <line x1={x + 12} y1={y + 26} x2={x + w - 12} y2={y + 26} 
                  stroke={isCpuGlow ? "#38bdf8" : (isDarkMode ? "#334155" : "#bae6fd")} 
                  strokeWidth="1.2" opacity="0.85" />

                <text x={x + 12} y={y + 18} fontFamily="monospace" fontSize={isProjectionMode ? "14" : "11"} 
                  fill={isCpuGlow ? (isDarkMode ? "#38bdf8" : "#1d4ed8") : (isDarkMode ? "#e2e8f0" : "#0f172a")} fontWeight="950" letterSpacing="1.8">
                  PROCESSEUR CENTRAL (CPU)
                </text>
                <text x={x + w - 12} y={y + h - 11} fontFamily="monospace" fontSize="9" 
                  fill={isDarkMode ? "#475569" : "#64748b"} fontWeight="800" textAnchor="end">
                  Von Neumann Model
                </text>

                {isUnifiedCPU && (
                  <g pointerEvents="none" className="animate-fadeIn">
                    <rect x={x + w/2 - 50} y={y + h/2 - 60} width="100" height="100" rx="16" 
                      fill={isDarkMode ? "#1e293b" : "#f1f5f9"} 
                      stroke={isCpuGlow ? "#fb923c" : (isDarkMode ? "#38bdf8" : "#0284c7")} 
                      strokeWidth={isCpuGlow ? "3.5" : "2"} 
                    />
                    <path d={`M ${x + w/2 - 50} ${y + h/2 - 40} h -10 M ${x + w/2 - 50} ${y + h/2 - 20} h -10 M ${x + w/2 - 50} ${y + h/2} h -10 M ${x + w/2 - 50} ${y + h/2 + 20} h -10`} stroke={isDarkMode ? "#475569" : "#94a3b8"} strokeWidth="2.5" />
                    <path d={`M ${x + w/2 + 50} ${y + h/2 - 40} h 10 M ${x + w/2 + 50} ${y + h/2 - 20} h 10 M ${x + w/2 + 50} ${y + h/2} h 10 M ${x + w/2 + 50} ${y + h/2 + 20} h 10`} stroke={isDarkMode ? "#475569" : "#94a3b8"} strokeWidth="2.5" />
                    <path d={`M ${x + w/2 - 30} ${y + h/2 - 60} v -10 M ${x + w/2 - 10} ${y + h/2 - 60} v -10 M ${x + w/2 + 10} ${y + h/2 - 60} v -10 M ${x + w/2 + 30} ${y + h/2 - 60} v -10`} stroke={isDarkMode ? "#475569" : "#94a3b8"} strokeWidth="2.5" />
                    <path d={`M ${x + w/2 - 30} ${y + h/2 + 40} v 10 M ${x + w/2 - 10} ${y + h/2 + 40} v 10 M ${x + w/2 + 10} ${y + h/2 + 40} v 10 M ${x + w/2 + 30} ${y + h/2 + 40} v 10`} stroke={isDarkMode ? "#475569" : "#94a3b8"} strokeWidth="2.5" />
                    <text x={x + w/2} y={y + h/2 - 2} textAnchor="middle" fontSize={isProjectionMode ? "20" : "15"} fill={isDarkMode ? "#38bdf8" : "#0284c7"} fontWeight="950">
                      📟 CPU
                    </text>
                    <text x={x + w/2} y={y + h/2 + 18} textAnchor="middle" fontSize={isProjectionMode ? "17" : "12"} fontWeight="950" fill={isDarkMode ? "#e2e8f0" : "#0f172a"}>
                      UNITE CENTRALE
                    </text>
                    <text x={x + w/2} y={y + h/2 + 32} textAnchor="middle" fontSize={isProjectionMode ? "13" : "9"} fontWeight="bold" fill={isDarkMode ? "#94a3b8" : "#475569"}>
                      Traitement des instructions
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* Advanced educational partitions (CPU internals) */}
          {learningLevel === 'advanced' && (() => {
            const isRamUcActive = currentStep && currentStep.from === 'ram' && currentStep.to === 'uc';
            const isUcUalActive = currentStep && ((currentStep.from === 'uc' && currentStep.to === 'ual') || (currentStep.from === 'ual' && currentStep.to === 'uc'));
            const isUcRegActive = currentStep && currentStep.from === 'uc' && currentStep.to === 'registres';
            const isRegUalActive = currentStep && currentStep.from === 'registres' && currentStep.to === 'ual';
            
            const cpu_l = left('cpu');
            const cpu_w = right('cpu') - left('cpu');
            const bCY = (bottom('cpu') + top('gpu')) / 2;
            
            const coreBox = { 
              x: cpu_l + 12, 
              y: top('uc') - 10, 
              w: right('ual') - left('uc') + 16, 
              h: bottom('uc') - top('uc') + 20 
            };
            
            const regBox  = { 
              x: cpu_l + 12, 
              y: top('registres') - 10, 
              w: right('registres') - left('registres') + 16, 
              h: bottom('registres') - top('registres') + 20 
            };
            
            const cacheBox = { 
              x: left('cache') - 10, 
              y: top('cache_l1') - 10, 
              w: right('cache') - left('cache') + 20, 
              h: bottom('cache_l3') - top('cache_l1') + 20 
            };

            return (
              <g pointerEvents="none" className="transition-all duration-300">
                {/* Core Box */}
                <rect x={coreBox.x} y={coreBox.y} width={coreBox.w} height={coreBox.h} rx="14"
                  fill={isDarkMode ? "rgba(15, 23, 42, 0.45)" : "rgba(241, 245, 249, 0.9)"}
                  stroke={isDarkMode ? "rgba(56, 189, 248, 0.25)" : "rgba(2, 132, 199, 0.35)"}
                  strokeWidth="1.8" strokeDasharray="6 4"
                />
                <rect x={coreBox.x + 12} y={coreBox.y - 10} width={180} height={18} rx="5"
                  fill={isDarkMode ? "#090d16" : "#e2e8f0"} stroke={isDarkMode ? "#1e293b" : "#cbd5e1"} strokeWidth="1"
                />
                <text x={coreBox.x + 18} y={coreBox.y + 2} fontFamily="monospace" fontSize="8.5" fontWeight="950" fill={isDarkMode ? "#38bdf8" : "#0369a1"}>
                  ⚡ CŒUR CPU (Processing Core)
                </text>

                {/* Registers Box */}
                <rect x={regBox.x} y={regBox.y} width={regBox.w} height={regBox.h} rx="14"
                  fill={isDarkMode ? "rgba(15, 23, 42, 0.45)" : "rgba(241, 245, 249, 0.9)"}
                  stroke={isDarkMode ? "rgba(192, 132, 252, 0.25)" : "rgba(126, 34, 206, 0.35)"}
                  strokeWidth="1.8" strokeDasharray="6 4"
                />
                <rect x={regBox.x + 12} y={regBox.y - 10} width={150} height={18} rx="5"
                  fill={isDarkMode ? "#090d16" : "#e2e8f0"} stroke={isDarkMode ? "#1e293b" : "#cbd5e1"} strokeWidth="1"
                />
                <text x={regBox.x + 18} y={regBox.y + 2} fontFamily="monospace" fontSize="8.5" fontWeight="950" fill={isDarkMode ? "#c084fc" : "#6d28d9"}>
                  📂 BANQUE REGISTRES (Regs)
                </text>

                {/* Cache hub wrapper */}
                <rect x={cacheBox.x} y={cacheBox.y} width={cacheBox.w} height={cacheBox.h} rx="14"
                  fill={isDarkMode ? "rgba(15, 23, 42, 0.45)" : "rgba(241, 245, 249, 0.9)"}
                  stroke={isDarkMode ? "rgba(96, 165, 250, 0.25)" : "rgba(29, 78, 216, 0.35)"}
                  strokeWidth="1.8" strokeDasharray="6 4"
                />
                <rect x={cacheBox.x + 12} y={cacheBox.y - 10} width={135} height={18} rx="5"
                  fill={isDarkMode ? "#090d16" : "#e2e8f0"} stroke={isDarkMode ? "#1e293b" : "#cbd5e1"} strokeWidth="1"
                />
                <text x={cacheBox.x + 18} y={cacheBox.y + 2} fontFamily="monospace" fontSize="8.5" fontWeight="950" fill={isDarkMode ? "#60a5fa" : "#1e40af"}>
                  💾 BLOC DE CACHE
                </text>

                {/* Micro logical signal wires */}
                {/* RAM to UC */}
                <path d={`M ${cx('ram') - 15} ${bottom('ram')} L ${cx('ram') - 15} ${top('cpu') + 15} L ${cx('uc')} ${top('cpu') + 15} L ${cx('uc')} ${top('uc')}`}
                  fill="none" stroke={isRamUcActive ? (isDarkMode ? "#c084fc" : "#7e22ce") : (isDarkMode ? "#a855f7" : "#5b21b6")}
                  strokeWidth={isRamUcActive ? 6.5 : 3.5} strokeDasharray={isRamUcActive ? "none" : "4 4"}
                  markerEnd="url(#arrow-purple)" opacity={0.8} />
                <text x={cx('uc') - 20} y={top('cpu') + 8} fill={isRamUcActive ? '#c084fc' : '#a855f7'} fontSize="11" fontWeight="950" fontFamily="monospace">
                  Instr. RAM ➔ UC
                </text>

                {/* UC to UAL */}
                <path d={`M ${right('uc')} ${cy('uc')} L ${left('ual')} ${cy('ual')}`}
                  fill="none" stroke={isUcUalActive ? (isDarkMode ? "#fb923c" : "#ea580c") : (isDarkMode ? "#f97316" : "#c2410c")}
                  strokeWidth={isUcUalActive ? 6.5 : 3.5} markerEnd="url(#arrow-orange)" markerStart="url(#arrow-orange)" opacity={0.8} />

                {/* UC to Registers */}
                <path d={`M ${left('uc') + 40} ${bottom('uc')} L ${left('uc') + 40} ${top('registres')}`}
                  fill="none" stroke={isUcRegActive ? (isDarkMode ? "#c084fc" : "#7e22ce") : (isDarkMode ? "#a855f7" : "#5b21b6")}
                  strokeWidth={isUcRegActive ? 6 : 3.2} markerEnd="url(#arrow-purple)" opacity={0.8} />

                {/* UAL to Registers */}
                <path d={`M ${cx('ual')} ${bottom('ual')} L ${cx('ual')} ${bCY - 12} L ${cx('registres')} ${bCY - 12} L ${cx('registres')} ${top('registres')}`}
                  fill="none" stroke={isRegUalActive ? (isDarkMode ? "#3b82f6" : "#1d4ed8") : (isDarkMode ? "#60a5fa" : "#3b82f6")}
                  strokeWidth={isRegUalActive ? 6 : 3.2} markerEnd="url(#arrow-blue)" opacity={0.8} />
              </g>
            );
          })()}

          {/* Standard component cards */}
          {Object.keys(rects).filter(id => id !== 'cpu' && id !== 'psu' && isNodeVisible(id)).map(id => {
            const [x, y, w, h] = rects[id];
            const colors = nodeColors(id);
            const label = LABELS[id];
            const isActive = isComponentGlowing(id);
            const isSelected = selectedComponentId === id;
            if (!label) return null;

            let opacity = 1.0;
            if (activeFocusId) {
              if (activeFocusId === id) {
                opacity = 1.0;
              } else if (activeFocusId === 'cpu' && ['uc', 'ual', 'registres', 'cache_l1', 'cache_l2', 'cache_l3', 'cache'].includes(id)) {
                opacity = 0.55;
              } else if (['uc', 'ual', 'registres', 'cache_l1', 'cache_l2', 'cache_l3', 'cache'].includes(activeFocusId) && id === 'cpu') {
                opacity = 0.55;
              } else {
                opacity = 0.15;
              }
            }

            return (
              <g 
                key={id} 
                id={`hw-node-${id}`}
                onClick={() => onSelectComponent(id)} 
                onMouseEnter={() => setHoveredCompId(id)}
                onMouseLeave={() => setHoveredCompId(null)}
                style={{ cursor: 'pointer' }}
                className="transition-all duration-300"
                opacity={opacity}
              >
                {isActive && (
                  <rect x={x-3} y={y-3} width={w+6} height={h+6} rx="13"
                    fill="none" stroke={colors.stroke} strokeWidth={isProjectionMode ? 3 : 1.5} opacity="0.6">
                    <animate attributeName="stroke-dashoffset" values="0;-24" dur="1.2s" repeatCount="indefinite"/>
                  </rect>
                )}

                <rect x={x} y={y} width={w} height={h} rx="11"
                  fill={colors.fill} 
                  stroke={isSelected ? '#3b82f6' : colors.stroke}
                  strokeWidth={isActive ? (isProjectionMode ? 4.5 : 2.5) : (isSelected ? (isProjectionMode ? 3.5 : 2) : (isProjectionMode ? 2.5 : 1.3))}
                  filter={isActive ? 'url(#glow-blue)' : 'url(#card-shadow)'}
                />

                <text x={x + w/2} y={y + (isProjectionMode ? 26 : 21)} textAnchor="middle" fontSize={isProjectionMode ? (['uc','ual','registres','cache_l1','cache_l2','cache_l3'].includes(id) ? 22 : 25) : (['uc','ual','registres','cache_l1','cache_l2','cache_l3'].includes(id) ? 15 : 17)}>
                  {label.emoji}
                </text>

                <text x={x + w/2} y={y + (isProjectionMode ? 42 : 36)} textAnchor="middle"
                  fontFamily="system-ui, sans-serif" fontSize={isProjectionMode ? "14" : "12"} fontWeight="950"
                  fill={colors.text}>
                  {label.line1}
                </text>

                <text x={x + w/2} y={y + (isProjectionMode ? 56 : 48)} textAnchor="middle"
                  fontFamily="system-ui, sans-serif" fontSize={isProjectionMode ? "11.5" : "9.5"} fontWeight="800"
                  fill={isActive ? colors.text : (isDarkMode ? '#94a3b8' : '#475569')}>
                  {label.line2}
                </text>
              </g>
            );
          })}

          {/* ⚡ SPECIAL POWER SUPPLY UNIT (PSU) BLOCK (Rule 7) */}
          {learningLevel === 'advanced' && (() => {
            const [x, y, w, h] = rects.psu;
            const colors = nodeColors('psu');
            const isActive = isComponentGlowing('psu');
            const isSelected = selectedComponentId === 'psu';
            let psuOpacity = 1.0;
            if (activeFocusId) {
              psuOpacity = activeFocusId === 'psu' ? 1.0 : 0.15;
            }
            return (
              <g 
                onClick={() => onSelectComponent('psu')}
                onMouseEnter={() => setHoveredCompId('psu')}
                onMouseLeave={() => setHoveredCompId(null)}
                style={{ cursor: 'pointer' }}
                className="transition-all duration-300"
                opacity={psuOpacity}
              >
                {isActive && (
                  <rect x={x-4} y={y-4} width={w+8} height={h+8} rx="14"
                    fill="none" stroke="#f59e0b" strokeWidth="2.5" opacity="0.8">
                    <animate attributeName="opacity" values="1;0.4;1" dur="0.8s" repeatCount="indefinite"/>
                  </rect>
                )}

                <rect x={x} y={y} width={w} height={h} rx="12"
                  fill={isDarkMode ? '#2d1a03' : '#fffbeb'} 
                  stroke={isSelected ? '#1d4ed8' : (isActive ? '#f59e0b' : (isDarkMode ? '#d97706' : '#b45309'))}
                  strokeWidth={isActive ? 3.5 : (isSelected ? 3 : 2.2)}
                  filter={isActive ? 'url(#glow-blue)' : 'url(#card-shadow)'}
                />

                <g opacity={isDarkMode ? 0.35 : 0.55} stroke={isDarkMode ? "#fbbf24" : "#b45308"} strokeWidth="1.5">
                  <line x1={x + 18} y1={y + 11} x2={x + w - 18} y2={y + 11} />
                  <line x1={x + 18} y1={y + 15} x2={x + w - 18} y2={y + 15} />
                  <line x1={x + 18} y1={y + 19} x2={x + w - 18} y2={y + 19} />
                </g>

                <text x={x + w/2} y={y + 34} textAnchor="middle" fontSize="23" className={isActive ? "animate-pulse" : ""}>
                  ⚡
                </text>

                <text x={x + w/2} y={y + 53} textAnchor="middle"
                  fontFamily="monospace" fontSize="12" fontWeight="950"
                  fill={isDarkMode ? '#fef08a' : '#78350f'}>
                  {LABELS.psu.line1}
                </text>

                <text x={x + w/2} y={y + 68} textAnchor="middle"
                  fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="800"
                  fill={isDarkMode ? '#fbbf24' : '#b45309'}>
                  {LABELS.psu.line2}
                </text>
              </g>
            );
          })()}

          {/* 🖥️ MONITOR DISPLAY SCREEN */}
          {(() => {
            const [x, y, w, h] = rects.ecran;
            const done = (
              (scenarioId === 'clavier_ecrire' && activeStepIndex >= 6) ||
              (scenarioId === 'faire_calcul' && activeStepIndex >= 6) ||
              (scenarioId === 'ouvrir_image' && activeStepIndex >= 5) ||
              (scenarioId === 'ouvrir_fichier' && activeStepIndex >= 5) ||
              (scenarioId === 'enregistrer_fichier' && activeStepIndex >= 5) ||
              (scenarioId === 'demarrage_pc' && activeStepIndex >= 6)
            );
            
            let screenValue = "";
            let screenColor = "#334155";
            let fontColor = "#475569";

            if (done) {
              screenColor = "#10b981";
              fontColor = "#34d399";
              if (scenarioId === 'clavier_ecrire') screenValue = "A";
              else if (scenarioId === 'faire_calcul') screenValue = "5";
              else if (scenarioId === 'ouvrir_image') screenValue = "🖼️ IMAGE";
              else if (scenarioId === 'ouvrir_fichier') screenValue = "📄 TEXTE";
              else if (scenarioId === 'enregistrer_fichier') screenValue = "💾 SAUVÉ";
              else if (scenarioId === 'demarrage_pc') screenValue = "🖥️ Bureau Prêt!";
            }

            return (
              <g pointerEvents="none">
                {done && (
                  <rect x={x + 10} y={y + 12} width={w - 20} height={h - 22} rx="4"
                    fill="none" stroke="#10b981" strokeWidth="6" opacity="0.32" filter="url(#glow-green)">
                    <animate attributeName="opacity" values="0.25;0.65;0.25" dur="1.5s" repeatCount="indefinite" />
                  </rect>
                )}

                <rect x={x + 10} y={y + 12} width={w - 20} height={h - 22} rx="4"
                  fill={done ? "#050d0a" : (isDarkMode ? "#0f172a" : "#f1f5f9")} 
                  stroke={done ? "#10b981" : (isDarkMode ? "#4b5563" : "#94a3b8")} 
                  strokeWidth={done ? "2.2" : "1.8"} 
                />
                
                {done ? (
                  <g>
                    <rect x={x + 12} y={y + 14} width={w - 24} height={h - 26} rx="2" fill="#042f1a" opacity="0.3" />
                    <text x={x + w/2} y={y + (isProjectionMode ? 42 : 36)} textAnchor="middle"
                      fontFamily="monospace" fontSize={isProjectionMode ? "14" : "12"} fontWeight="950" fill={fontColor}>
                      {screenValue}
                    </text>
                  </g>
                ) : (
                  <text x={x + w/2} y={y + 36} textAnchor="middle"
                    fontFamily="monospace" fontSize="8.5" fontWeight="800" fill={isDarkMode ? "#475569" : "#64748b"}>
                    VEILLE
                  </text>
                )}

                {done && (
                  <circle cx={x + w - 16} cy={y + 17} r="2.5" fill="#10b981">
                    <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            );
          })()}

          {/* 🛣️ SVG LAYER 4: ACTIVE BUSES (Bold and flowing right on top of components) */}
          {STATIC_BUSES.filter(bus => isBusVisible(bus.id) && bus.id === activeBusId).map(bus => {
            const busWidth = isProjectionMode ? 12 : 9.5;
            return (
              <path
                key={`active-wide-${bus.id}`}
                d={bus.d}
                fill="none"
                stroke={getBusColor(bus.type, true)}
                strokeWidth={busWidth}
                opacity={1.0}
                strokeLinecap="round"
                pointerEvents="none"
                className="transition-all duration-300"
                filter="url(#glow-blue)"
              />
            );
          })}

          {STATIC_BUSES.filter(bus => isBusVisible(bus.id) && bus.id === activeBusId).map(bus => {
            const busWidth = isProjectionMode ? 8.5 : 6;
            return (
              <path
                key={`active-dashed-${bus.id}`}
                d={bus.d}
                fill="none"
                stroke={getBusColor(bus.type, true)}
                strokeWidth={busWidth}
                strokeDasharray="8 6"
                opacity={1.0}
                strokeLinecap="round"
                pointerEvents="none"
                className="transition-all duration-300"
              />
            );
          })}

          {/* 🛣️ SVG LAYER 5: ANIMATED HIGH-SPEED PARTICLES */}
          {isPlaying && particles.map(p => {
            const bus = STATIC_BUSES.find(b => b.id === p.busId);
            if (!bus || !isBusVisible(bus.id)) return null;
            const pts = parsePath(bus.d);
            const pt = getPointOnPolyline(pts, p.progress);
            return (
              <g key={p.id} pointerEvents="none">
                <circle cx={pt.x} cy={pt.y} r={isProjectionMode ? 9 : 5} fill={BUS_COLORS[p.type]} opacity="0.65" filter="url(#glow-blue)"/>
                <circle cx={pt.x} cy={pt.y} r={isProjectionMode ? 4.5 : 2.2} fill="#ffffff" opacity="1"/>
              </g>
            );
          })}

          {/* 🚀 SVG LAYER 6: INTERACTIVE INVISIBLE BUS HOVER TARGETS (Enables easy hovering) */}
          {STATIC_BUSES.filter(bus => isBusVisible(bus.id)).map(bus => (
            <path
              key={`hit-${bus.id}`}
              d={bus.d}
              fill="none"
              stroke="transparent"
              strokeWidth={20}
              className="cursor-help"
              pointerEvents="visibleStroke"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                if (rect) {
                  setHoveredBus({ id: bus.id, x: e.clientX - rect.left, y: e.clientY - rect.top });
                }
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                if (rect) {
                  setHoveredBus({ id: bus.id, x: e.clientX - rect.left, y: e.clientY - rect.top });
                }
              }}
              onMouseLeave={() => setHoveredBus(null)}
            />
          ))}

          {/* TRAVELLING VALUES BUBBLE */}
          {activeCapsule.show && currentStep.from !== currentStep.to && (
            <g pointerEvents="none">
              <rect 
                x={activeCapsule.x - 45} 
                y={activeCapsule.y - 12} 
                width="90" 
                height="22" 
                rx="11"
                fill="#1e40af" 
                stroke="#60a5fa" 
                strokeWidth="1.5"
                filter="url(#glow-blue)"
              />
              <text 
                x={activeCapsule.x} 
                y={activeCapsule.y + 4} 
                textAnchor="middle"
                fontFamily="monospace" 
                fontSize="9" 
                fontWeight="900" 
                fill="#ffffff"
              >
                {activeCapsule.text.split(' ')[0]}
              </text>
              <circle cx={activeCapsule.x - 36} cy={activeCapsule.y} r="2.5" fill="#ffffff">
                <animate attributeName="opacity" values="1;0.2;1" dur="0.8s" repeatCount="indefinite" />
              </circle>
            </g>
          )}

          </svg>
        </div>

        {/* 🎓 BUS SYSTEM HIGH-VISIBILITY HOVER TOOLTIPS (Rule 4) */}
        {hoveredBus && BUS_LABELS[hoveredBus.id] && (() => {
          const info = BUS_LABELS[hoveredBus.id];
          return (
            <div 
              className="absolute pointer-events-none z-50 bg-slate-950/90 dark:bg-slate-900/95 text-white backdrop-blur-md border border-slate-800/80 dark:border-slate-700/80 rounded-xl px-4 py-2.5 shadow-2xl transition-all duration-150 ease-out flex flex-col gap-1 max-w-xs text-left"
              style={{
                left: hoveredBus.x + 15,
                top: hoveredBus.y + 15,
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase font-black tracking-widest text-slate-400">
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: BUS_COLORS[info.type] }}
                />
                <span>{info.type === 'data' ? 'Données' : info.type === 'addr' ? 'Adresses' : 'Contrôle'}</span>
              </div>
              <div className="font-black text-sm text-slate-100">
                {info.title}
              </div>
              <div className="text-xs text-slate-300 leading-relaxed font-semibold">
                {info.subtitle}
              </div>
            </div>
          );
        })()}

      </div>

      {/* Centered Modal Popup for Clicked Component in Advanced View (Rule 6) */}
      {selectedComponentId && (() => {
        const activeShowId = selectedComponentId;
        const componentItem = DETAILS[activeShowId];
        if (!componentItem) return null;

        return (
          <div 
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
            onClick={() => onSelectComponent(null)}
          >
            <div 
              className={`border-2 rounded-2xl p-6 md:p-8 shadow-2xl relative max-w-lg w-full flex flex-col gap-5 animate-scaleIn text-left ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-slate-200' 
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => onSelectComponent(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 transition-colors cursor-pointer"
                title="Fermer (Esc)"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4 mt-2">
                <div className={`p-3 rounded-full border text-2xl shrink-0 flex items-center justify-center w-14 h-14 ${
                  isDarkMode 
                    ? 'bg-slate-950 border-slate-800 text-sky-400 shadow-inner' 
                    : 'bg-slate-50 border-slate-150 text-sky-600 shadow-sm'
                }`}>
                  {LABELS[activeShowId]?.emoji || "⚙️"}
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className={`font-extrabold text-lg md:text-xl tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {LABELS[activeShowId]?.line1}
                    </h4>
                    <span className={`text-[10px] font-semibold tracking-wider uppercase font-mono px-2.5 py-0.5 rounded-full border ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-650'
                    }`}>
                      {LABELS[activeShowId]?.line2}
                    </span>
                  </div>
                  <p className={`text-sm md:text-base leading-relaxed font-semibold ${isDarkMode ? 'text-slate-350' : 'text-slate-600'}`}>
                    {componentItem.desc}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className={`p-2.5 px-3.5 rounded-xl border flex flex-col justify-center text-left ${
                  isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className="text-[9px] font-semibold text-slate-400 block uppercase tracking-wider">
                    {language === 'ar' ? 'مستوى البنية' : language === 'en' ? 'Architecture Level' : language === 'es' ? 'Nivel de Arquitectura' : language === 'de' ? 'Architekturebene' : "Niveau d'architecture"}
                  </span>
                  <span className="text-xs font-black text-sky-600 dark:text-sky-400 mt-0.5 block">
                    {['clavier', 'souris', 'webcam', 'microphone', 'ecran', 'hautparleurs', 'imprimante', 'stockage_ext'].includes(activeShowId) 
                      ? (language === 'ar' ? '🔌 ملحق خارجي' : language === 'en' ? '🔌 External Peripheral' : language === 'es' ? '🔌 Periférico Externo' : language === 'de' ? '🔌 Externes Peripheriegerät' : '🔌 Périphérique Externe')
                      : (['uc', 'ual', 'registres', 'cache', 'cpu'].includes(activeShowId) 
                          ? (language === 'ar' ? '🧠 نواة المعالج' : language === 'en' ? '🧠 CPU Core' : language === 'es' ? '🧠 Núcleo del CPU' : language === 'de' ? '🧠 CPU-Kern' : '🧠 Coeur du CPU')
                          : (language === 'ar' ? '⚙️ داخلي' : language === 'en' ? '⚙️ Internal' : language === 'es' ? '⚙️ Interno' : language === 'de' ? '⚙️ Intern' : '⚙️ Interne'))}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      const targetId = getAdvancedTargetId(activeShowId);
                      setActiveTab('schema');
                      setActiveComponentId(targetId);
                      onSelectComponent(null);
                    }}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl inline-flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-xs whitespace-nowrap justify-center border border-transparent"
                  >
                    <span>
                      {language === 'ar' ? 'عرض المزيد' : language === 'en' ? 'See more' : language === 'es' ? 'Ver más' : language === 'de' ? 'Mehr sehen' : 'Voir plus'}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// Math/geometry helpers for parsing and tracing SVG pathways
function parsePath(d: string): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  const re = /[ML]\s*([\d.-]+)\s+([\d.-]+)/g;
  let m;
  while ((m = re.exec(d)) !== null) {
    pts.push({ x: parseFloat(m[1]), y: parseFloat(m[2]) });
  }
  return pts;
}

function getPointOnPolyline(pts: { x: number; y: number }[], t: number): { x: number; y: number } {
  if (pts.length < 2) return pts[0] ?? { x: 0, y: 0 };
  let totalLen = 0;
  const segs: number[] = [];
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x, dy = pts[i].y - pts[i - 1].y;
    const len = Math.sqrt(dx * dx + dy * dy);
    segs.push(len);
    totalLen += len;
  }
  let target = t * totalLen;
  for (let i = 0; i < segs.length; i++) {
    if (target <= segs[i]) {
      const frac = segs[i] === 0 ? 0 : target / segs[i];
      return {
        x: pts[i].x + (pts[i + 1].x - pts[i].x) * frac,
        y: pts[i].y + (pts[i + 1].y - pts[i].y) * frac,
      };
    }
    target -= segs[i];
  }
  return pts[pts.length - 1];
}
