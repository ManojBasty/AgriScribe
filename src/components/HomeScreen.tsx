import React from 'react';
import { Upload, MapPin, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

const translations = {
  en: {
    welcome: 'Welcome to Agri-XAI',
    description: 'Get AI-powered crop yield predictions with explainable insights for informed agricultural decisions.',
    uploadOption: 'Upload Your Data',
    uploadDesc: 'Upload CSV file with your agricultural data',
    selectOption: 'Demo Mode',
    selectDesc: 'Select district and crop for demonstration',
    getStarted: 'Get Started',
    tagline: 'We don\'t advise. We show cold hard facts, hyper-localized, explainable and farmer-trustworthy.',
  },
  odia: {
    welcome: 'କୃଷି-XAI ରେ ସ୍ୱାଗତ',
    description: 'ସୂଚିତ କୃଷି ନିଷ୍ପତ୍ତି ପାଇଁ ବ୍ୟାଖ୍ୟାଯୋଗ୍ୟ ଅନ୍ତର୍ଦୃଷ୍ଟି ସହିତ AI-ଚାଳିତ ଫସଲ ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ ପାଆନ୍ତୁ।',
    uploadOption: 'ଆପଣଙ୍କର ତଥ୍ୟ ଅପଲୋଡ୍ କରନ୍ତୁ',
    uploadDesc: 'ଆପଣଙ୍କର କୃଷି ତଥ୍ୟ ସହିତ CSV ଫାଇଲ୍ ଅପଲୋଡ୍ କରନ୍ତୁ',
    selectOption: 'ଡେମୋ ମୋଡ୍',
    selectDesc: 'ପ୍ରଦର୍ଶନ ପାଇଁ ଜିଲ୍ଲା ଏବଂ ଫସଲ ବାଛନ୍ତୁ',
    getStarted: 'ଆରମ୍ଭ କରନ୍ତୁ',
    tagline: 'ଆମେ ସୁପାରିସ କରୁନାହିଁ। ଆମେ କେବଳ ତଥ୍ୟ ଦେଖାଉଛୁ, ହାଇପର-ଲୋକାଲ ଏବଂ ବିବେଚନା-ଯୋଗ୍ୟ।',
  }
};

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const { language } = useApp();
  const t = translations[language];

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
          {t.welcome}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          {t.description}
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Upload CSV Card */}
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-green-100 hover:border-green-200">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{t.uploadOption}</h3>
              <p className="text-gray-600 mt-1">{t.uploadDesc}</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('input')}
            className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-xl font-semibold transition-colors group-hover:scale-105 transform"
          >
            <span>{t.getStarted}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Mode Card */}
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-sky-100 hover:border-sky-200">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-gradient-to-br from-sky-500 to-sky-600 p-4 rounded-xl group-hover:scale-110 transition-transform">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{t.selectOption}</h3>
              <p className="text-gray-600 mt-1">{t.selectDesc}</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('input')}
            className="w-full flex items-center justify-center space-x-2 bg-sky-500 hover:bg-sky-600 text-white py-4 px-6 rounded-xl font-semibold transition-colors group-hover:scale-105 transform"
          >
            <span>{t.getStarted}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tagline */}
      <div className="text-center max-w-4xl mx-auto">
        <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed px-8 py-6 bg-white rounded-2xl shadow-md border border-amber-100">
          "{t.tagline}"
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;