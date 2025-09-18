import React from 'react';
import { Globe, Sprout } from 'lucide-react';

interface HeaderProps {
  language: 'en' | 'odia';
  onLanguageChange: (lang: 'en' | 'odia') => void;
  currentScreen: string;
  onNavigate: (screen: any) => void;
}

const translations = {
  en: {
    title: 'Odisha Agri-XAI',
    subtitle: 'AI-Powered Crop Yield Prediction',
  },
  odia: {
    title: 'ଓଡ଼ିଶା କୃଷି-XAI',
    subtitle: 'AI-ଚାଳିତ ଫସଲ ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ',
  }
};

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange, currentScreen, onNavigate }) => {
  const t = translations[language];

  return (
    <header className="bg-white shadow-sm border-b-2 border-green-100">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-md">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
              <p className="text-sm text-gray-600 font-medium">{t.subtitle}</p>
            </div>
          </div>
          
          <button
            onClick={() => onLanguageChange(language === 'en' ? 'odia' : 'en')}
            className="flex items-center space-x-2 px-4 py-2 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors border border-sky-200"
          >
            <Globe className="w-4 h-4 text-sky-600" />
            <span className="text-sm font-medium text-sky-700">
              {language === 'en' ? 'ଓଡ଼ିଆ' : 'English'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;