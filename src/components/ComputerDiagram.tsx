import React from 'react';
import { 
  Keyboard, 
  Monitor, 
  Cpu, 
  Layers, 
  HardDrive, 
  MoveRight, 
  ArrowRightLeft, 
  Calculator, 
  Settings 
} from 'lucide-react';
import { ComputerComponentType } from '../data/componentsData';
import { useLanguage } from '../context/LanguageContext';

interface ComputerDiagramProps {
  selectedComponentId: string | null;
  onSelectComponent: (id: string | null) => void;
  // This is optional for reuse in Simulation
  highlightedComponentId?: string | null;
}

export default function ComputerDiagram({ 
  selectedComponentId, 
  onSelectComponent,
  highlightedComponentId 
}: ComputerDiagramProps) {
  const { componentsData } = useLanguage();
  
  const activeId = highlightedComponentId || selectedComponentId;

  // Icon selector helper
  const getIcon = (id: string, className: string) => {
    switch(id) {
      case 'clavier': return <Keyboard className={className} />;
      case 'ecran': return <Monitor className={className} />;
      case 'cpu': return <Cpu className={className} />;
      case 'ram': return <Layers className={className} />;
      case 'stockage': return <HardDrive className={className} />;
      case 'bus': return <ArrowRightLeft className={className} />;
      case 'ual': return <Calculator className={className} />;
      case 'uc': return <Settings className={className} />;
      default: return <Cpu className={className} />;
    }
  };

  const renderComponentCard = (id: string, extraClasses: string = '') => {
    const comp = componentsData.find(c => c.id === id);
    if (!comp) return null;
    const isSelected = activeId === id;

    return (
      <button
        key={id}
        id={`diagram-card-${id}`}
        onClick={() => onSelectComponent(comp.id)}
        className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-full ${
          isSelected 
            ? 'border-amber-500 bg-amber-50/90 ring-4 ring-amber-500/20 shadow-md transform -translate-y-0.5' 
            : 'border-slate-350 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-400 hover:shadow-xs'
        } ${extraClasses}`}
      >
        <div className="flex items-start justify-between w-full mb-1">
          <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
            comp.category === 'entree' ? 'bg-emerald-100 text-emerald-800' :
            comp.category === 'sortie' ? 'bg-indigo-100 text-indigo-800' :
            comp.category === 'stockage' ? 'bg-cyan-100 text-cyan-800' :
            comp.category === 'liaison' ? 'bg-yellow-100 text-yellow-800' :
            'bg-rose-100 text-rose-800'
          }`}>
            {comp.role.split(' (')[0]}
          </span>
          {getIcon(comp.id, `w-5 h-5 ${isSelected ? 'text-amber-600' : 'text-blue-500'}`)}
        </div>
        <div className="mt-2">
          <h4 className="font-bold text-gray-900 text-base">{comp.name}</h4>
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">{comp.simpleExplanation.slice(0, 75)}...</p>
        </div>
      </button>
    );
  };

  return (
    <div id="motherboard-diagram-wrapper" className="bg-slate-50 dark:bg-slate-900/40 border-2 border-slate-350 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
            </span>
            Schéma Fonctionnel & Cartographie du PC
          </h3>
          <p className="text-xs text-gray-500 font-mono mt-1">
            Clique sur n'importe quel bloc pour l'examiner en détail.
          </p>
        </div>
        {activeId && (
          <button
            id="clear-selection-btn"
            onClick={() => onSelectComponent(null)}
            className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-100 cursor-pointer"
          >
            Réinitialiser la sélection
          </button>
        )}
      </div>

      {/* Motherboard Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch relative">
        {/* Left Hand: INPUT (Clavier) & STORAGE */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="h-1/2">
            <h5 className="text-xs font-mono font-bold text-emerald-700 uppercase mb-1.5 bg-emerald-50 inline-block px-2 py-0.5 rounded-md">
              [1] Entrée
            </h5>
            {renderComponentCard('clavier')}
          </div>
          
          <div className="h-1/2">
            <h5 className="text-xs font-mono font-bold text-cyan-700 uppercase mb-1.5 bg-cyan-50 inline-block px-2 py-0.5 rounded-md">
              [Mémoire de masse]
            </h5>
            {renderComponentCard('stockage')}
          </div>
        </div>

        {/* Bus Arrow Line Column 1 */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-around text-blue-300">
          <MoveRight className="w-8 h-8 animate-pulse text-yellow-500" />
          <MoveRight className="w-8 h-8 opacity-40 text-yellow-500" />
        </div>

        {/* Center: BUS, RAM & CPU */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* RAM (Top Center) */}
          <div>
            <h5 className="text-xs font-mono font-bold text-blue-700 uppercase mb-1.5 bg-blue-50 inline-block px-2 py-0.5 rounded-md">
              [2] Mémoire Vive
            </h5>
            {renderComponentCard('ram')}
          </div>

          {/* BUS (Separator row) */}
          <div className="bg-yellow-50 dark:bg-yellow-950/10 border-2 border-yellow-350 dark:border-yellow-750 rounded-xl p-3 flex items-center justify-between text-yellow-905 dark:text-yellow-300">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-yellow-600 animate-bounce" />
              <div>
                <span className="text-xs font-mono font-bold uppercase">Bus de données principal</span>
                <p className="text-[10px] text-yellow-700/80">Liaison entre la RAM, le Stockage et le CPU</p>
              </div>
            </div>
            <button
              onClick={() => onSelectComponent('bus')}
              className={`text-2xs font-bold px-2 py-1.5 rounded-lg border cursor-pointer ${
                activeId === 'bus' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white hover:bg-yellow-100 text-yellow-800 border-yellow-300'
              }`}
            >
              Inspecter le Bus
            </button>
          </div>

          {/* CPU Card containing nested UC and UAL blocks */}
          <div className={`p-4 rounded-xl border-2 transition-all ${
            activeId === 'cpu' 
              ? 'border-amber-500 bg-amber-50/50 ring-4 ring-amber-500/20' 
              : 'border-rose-350 dark:border-rose-800 bg-rose-50/20 dark:bg-rose-950/10'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-rose-600" />
                <span className="text-sm font-bold text-rose-900">CPU (Processeur de calculs)</span>
              </div>
              <button
                onClick={() => onSelectComponent('cpu')}
                className={`text-xs font-bold px-2 py-1 rounded-md cursor-pointer ${
                  activeId === 'cpu' ? 'bg-amber-500 text-white' : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                }`}
              >
                Inspecter le CPU
              </button>
            </div>

            <p className="text-2xs text-gray-500 leading-relaxed mb-3">
              Le processeur contient deux sections indispensables pour exécuter le code de l'utilisateur :
            </p>

            {/* Nested blocks: UC and UAL */}
            <div className="grid grid-cols-2 gap-3">
              {/* UC Block */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectComponent('uc');
                }}
                className={`p-3 rounded-lg border-2 text-left transition-all cursor-pointer ${
                  activeId === 'uc' 
                    ? 'border-amber-500 bg-orange-50 ring-2 ring-amber-500/30' 
                    : 'border-purple-300 dark:border-purple-800 bg-white dark:bg-slate-900 hover:border-purple-400 font-medium'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-purple-700 uppercase bg-purple-50 px-1 rounded">UC</span>
                  <Settings className={`w-3.5 h-3.5 ${activeId === 'uc' ? 'text-amber-500' : 'text-purple-500'}`} />
                </div>
                <h6 className="font-bold text-xs text-gray-800">Unité de Contrôle</h6>
                <p className="text-[9px] text-gray-500 mt-1 leading-snug">Dirige les données</p>
              </button>

              {/* UAL Block */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectComponent('ual');
                }}
                className={`p-3 rounded-lg border-2 text-left transition-all cursor-pointer ${
                  activeId === 'ual' 
                    ? 'border-amber-500 bg-orange-50 ring-2 ring-amber-500/30' 
                    : 'border-pink-300 dark:border-pink-805 bg-white dark:bg-slate-900 hover:border-pink-400 font-medium'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-pink-700 uppercase bg-pink-50 px-1 rounded">UAL</span>
                  <Calculator className={`w-3.5 h-3.5 ${activeId === 'ual' ? 'text-amber-500' : 'text-pink-500'}`} />
                </div>
                <h6 className="font-bold text-xs text-gray-800">U.A.Logique</h6>
                <p className="text-[9px] text-gray-500 mt-1 leading-snug">Calcule 2+3 ou compare</p>
              </button>
            </div>
          </div>
        </div>

        {/* Bus Arrow Line Column 2 */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-around text-blue-300">
          <MoveRight className="w-8 h-8 opacity-40 text-yellow-500" />
          <MoveRight className="w-8 h-8 animate-pulse text-yellow-500" />
        </div>

        {/* Right Hand: OUTPUT (Écran) */}
        <div className="lg:col-span-3 flex flex-col justify-center">
          <div>
            <h5 className="text-xs font-mono font-bold text-indigo-700 uppercase mb-1.5 bg-indigo-50 inline-block px-2 py-0.5 rounded-md">
              [3] Sortie final
            </h5>
            {renderComponentCard('ecran', 'h-48')}
          </div>
        </div>
      </div>
    </div>
  );
}
