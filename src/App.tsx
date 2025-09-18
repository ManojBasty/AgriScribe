import React, { useState } from 'react';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import InputScreen from './components/InputScreen';
import ResultsScreen from './components/ResultsScreen';
import ExplainabilityScreen from './components/ExplainabilityScreen';
import InsightsScreen from './components/InsightsScreen';
import ExportScreen from './components/ExportScreen';
import { AppProvider } from './context/AppContext';

type Screen = 'home' | 'input' | 'results' | 'explainability' | 'insights' | 'export';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [language, setLanguage] = useState<'en' | 'odia'>('en');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'input':
        return <InputScreen onNavigate={setCurrentScreen} />;
      case 'results':
        return <ResultsScreen onNavigate={setCurrentScreen} />;
      case 'explainability':
        return <ExplainabilityScreen onNavigate={setCurrentScreen} />;
      case 'insights':
        return <InsightsScreen onNavigate={setCurrentScreen} />;
      case 'export':
        return <ExportScreen onNavigate={setCurrentScreen} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-sky-50">
        <Header 
          language={language} 
          onLanguageChange={setLanguage}
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
        />
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          {renderScreen()}
        </main>
      </div>
    </AppProvider>
  );
}

export default App;