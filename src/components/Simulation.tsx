import React from 'react';
import SimulationWorkspace from './SimulationWorkspace';

interface SimulationProps {
  initialScenarioId?: string;
  onBackToHome?: () => void;
}

export default function Simulation({ initialScenarioId, onBackToHome }: SimulationProps) {
  return (
    <SimulationWorkspace 
      initialScenarioId={initialScenarioId} 
      onBackToHome={onBackToHome} 
      defaultMode="simplified" 
    />
  );
}
