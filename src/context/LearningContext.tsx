import React, { createContext, useContext, useState, useEffect } from 'react';

export type LearningLevel = 'simple' | 'intermediate' | 'advanced';

interface LearningContextProps {
  learningLevel: LearningLevel;
  setLearningLevel: (level: LearningLevel) => void;
  isProjectionMode: boolean;
  setIsProjectionMode: (mode: boolean) => void;
  animationSpeed: number; // 0.5, 1, 2
  setAnimationSpeed: (speed: number) => void;
  showBusDetails: boolean;
  setShowBusDetails: (show: boolean) => void;
  numeralSystem: 'bin' | 'dec' | 'hex';
  setNumeralSystem: (sys: 'bin' | 'dec' | 'hex') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeComponentId: string | null;
  setActiveComponentId: (id: string | null) => void;
}

const LearningContext = createContext<LearningContextProps | undefined>(undefined);

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeComponentId, setActiveComponentId] = useState<string | null>(null);

  const [learningLevel, setLearningLevelState] = useState<LearningLevel>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('learningLevel');
      if (saved === 'simple' || saved === 'intermediate' || saved === 'advanced') {
        return saved;
      }
    }
    return 'simple';
  });

  const [isProjectionMode, setIsProjectionModeState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('isProjectionMode');
      return saved === 'true';
    }
    return false;
  });

  const [animationSpeed, setAnimationSpeedState] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('animationSpeed');
      if (saved) return parseFloat(saved);
    }
    return 1;
  });

  const [showBusDetails, setShowBusDetailsState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('showBusDetails');
      return saved !== 'false'; // default to true
    }
    return true;
  });

  const [numeralSystem, setNumeralSystemState] = useState<'bin' | 'dec' | 'hex'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('numeralSystem');
      if (saved === 'bin' || saved === 'dec' || saved === 'hex') {
        return saved;
      }
    }
    return 'bin';
  });

  const setLearningLevel = (level: LearningLevel) => {
    setLearningLevelState(level);
    localStorage.setItem('learningLevel', level);
  };

  const setIsProjectionMode = (mode: boolean) => {
    setIsProjectionModeState(mode);
    localStorage.setItem('isProjectionMode', mode ? 'true' : 'false');
  };

  const setAnimationSpeed = (speed: number) => {
    setAnimationSpeedState(speed);
    localStorage.setItem('animationSpeed', speed.toString());
  };

  const setShowBusDetails = (show: boolean) => {
    setShowBusDetailsState(show);
    localStorage.setItem('showBusDetails', show ? 'true' : 'false');
  };

  const setNumeralSystem = (sys: 'bin' | 'dec' | 'hex') => {
    setNumeralSystemState(sys);
    localStorage.setItem('numeralSystem', sys);
  };

  // Synchronize top-level projection html attributes or class if necessary
  useEffect(() => {
    if (isProjectionMode) {
      document.documentElement.classList.add('projection-mode');
    } else {
      document.documentElement.classList.remove('projection-mode');
    }
  }, [isProjectionMode]);

  return (
    <LearningContext.Provider
      value={{
        learningLevel,
        setLearningLevel,
        isProjectionMode,
        setIsProjectionMode,
        animationSpeed,
        setAnimationSpeed,
        showBusDetails,
        setShowBusDetails,
        numeralSystem,
        setNumeralSystem,
        activeTab,
        setActiveTab,
        activeComponentId,
        setActiveComponentId,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}
