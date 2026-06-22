/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import ExplorerComposants from './components/ExplorerComposants';
import Simulation from './components/Simulation';
import Quiz from './components/Quiz';
import VoyageDonnees from './components/VoyageDonnees';
import Footer from './components/Footer';
import { LearningProvider, useLearning } from './context/LearningContext';
import OnboardingTour from './components/OnboardingTour';

function AppContent() {
  const { isProjectionMode, activeTab, setActiveTab } = useLearning();
  const [activeScenarioId, setActiveScenarioId] = useState<string>('clavier_ecrire');

  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('themeMode');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [darkMode, setDarkMode] = useState<boolean>(false);

  React.useEffect(() => {
    const activeDark = themeMode === 'dark';
    setDarkMode(activeDark);
    if (activeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  // Scroll to top automatically when changing tabs (components page, scenario page...)
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeTab]);

  const toggleDarkMode = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleStartScenario = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    setActiveTab('simulation');
  };

  return (
    <div 
      className={`min-h-screen bg-blue-50/20 flex flex-col justify-between font-sans selection:bg-blue-200 dark-mode-transition ${darkMode ? 'dark' : ''} ${isProjectionMode ? 'projection-layout' : ''}`}
    >
      
      {/* Navigation header bar */}
      <Header currentTab={activeTab} setTab={setActiveTab} darkMode={darkMode} themeMode={themeMode} toggleDarkMode={toggleDarkMode} />

      {/* Core pages router */}
      <main className="flex-grow mt-0 pt-2 lg:pt-5" style={{ paddingTop: '2px', paddingBottom: '-2px' }}>
        
        {activeTab === 'home' && (
          <Home 
            onStartScenario={handleStartScenario}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === 'voyage' && (
          <VoyageDonnees 
            onStartScenario={handleStartScenario}
            onBackToHome={() => {
              setActiveTab('home');
            }}
          />
        )}

        {activeTab === 'schema' && (
          <ExplorerComposants 
            onBackToHome={() => {
              setActiveTab('home');
            }}
          />
        )}

        {activeTab === 'simulation' && (
          <Simulation 
            initialScenarioId={activeScenarioId}
            onBackToHome={() => {
              setActiveTab('home');
            }}
          />
        )}

        {activeTab === 'quiz' && (
          <Quiz 
            onBackToHome={() => {
              setActiveTab('home');
            }}
          />
        )}

      </main>

      {/* Clean high-contrast footer */}
      <Footer />

      {/* Global reusable step-by-step Onboarding program */}
      <OnboardingTour currentTab={activeTab} setTab={setActiveTab} isDarkMode={darkMode} />
    </div>
  );
}

export default function App() {
  return (
    <LearningProvider>
      <AppContent />
    </LearningProvider>
  );
}
