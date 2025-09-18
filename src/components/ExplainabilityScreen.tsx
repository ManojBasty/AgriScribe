import React from 'react';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ExplainabilityScreenProps {
  onNavigate: (screen: string) => void;
}

const translations = {
  en: {
    title: 'AI Explanation',
    subtitle: 'Understanding how AI made this prediction',
    featureImportance: 'Feature Importance (SHAP Analysis)',
    localFactors: 'Local Impact Factors',
    positive: 'Positive Impact',
    negative: 'Negative Impact',
    suboptimal: 'Suboptimal',
    explanation: 'The AI model identified key factors affecting crop yield in your area. Rainfall shows the strongest positive correlation, while nitrogen levels need attention.',
    rainfallFact: 'Rainfall levels are 15% above optimal range, contributing positively to yield prediction.',
    tempFact: 'Temperature conditions are within favorable range for crop growth.',
    phFact: 'Soil pH is slightly below optimal range (6.2 vs 6.5-7.0 ideal).',
    nitrogenFact: 'Nitrogen levels are 20% below recommended, negatively affecting yield.',
    viewInsights: 'View District Insights',
    back: 'Back to Results',
  },
  odia: {
    title: 'AI ବ୍ୟାଖ୍ୟା',
    subtitle: 'AI କିପରି ଏହି ପୂର୍ବାନୁମାନ କରିଛି ତାହା ବୁଝିବା',
    featureImportance: 'ବିଶେଷତା ଗୁରୁତ୍ୱ (SHAP ବିଶ୍ଳେଷଣ)',
    localFactors: 'ସ୍ଥାନୀୟ ପ୍ରଭାବ କାରକଗୁଡିକ',
    positive: 'ସକରାତ୍ମକ ପ୍ରଭାବ',
    negative: 'ନକରାତ୍ମକ ପ୍ରଭାବ',
    suboptimal: 'ଉପ-ଅନୁକୂଳ',
    explanation: 'AI ମଡେଲ ଆପଣଙ୍କ ଅଞ୍ଚଳରେ ଫସଲ ଉତ୍ପାଦନକୁ ପ୍ରଭାବିତ କରୁଥିବା ମୁଖ୍ୟ କାରକଗୁଡିକ ଚିହ୍ନଟ କରିଛି। ବର୍ଷା ସବୁଠାରୁ ଶକ୍ତିଶାଳୀ ସକରାତ୍ମକ ସମ୍ପର୍କ ଦେଖାଉଛି, ଯେତେବେଳେ ନାଇଟ୍ରୋଜେନ ସ୍ତର ଧ୍ୟାନ ଆବଶ୍ୟକ କରେ।',
    rainfallFact: 'ବର୍ଷା ସ୍ତର ଉତ୍କୃଷ୍ଟ ପରିସରଠାରୁ 15% ଅଧିକ, ଯାହା ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନରେ ସକରାତ୍ମକ ଭାବରେ ଯୋଗଦାନ କରୁଛି।',
    tempFact: 'ତାପମାତ୍ରା ଅବସ୍ଥା ଫସଲ ବୃଦ୍ଧି ପାଇଁ ଅନୁକୂଳ ପରିସର ମଧ୍ୟରେ ଅଛି।',
    phFact: 'ମାଟିର pH ଉତ୍କୃଷ୍ଟ ପରିସରଠାରୁ କିଛି କମ୍ (6.2 ବନାମ 6.5-7.0 ଆଦର୍ଶ)।',
    nitrogenFact: 'ନାଇଟ୍ରୋଜେନ ସ୍ତର ସୁପାରିଶଠାରୁ 20% କମ୍, ଯାହା ଉତ୍ପାଦନକୁ ନକରାତ୍ମକ ଭାବରେ ପ୍ରଭାବିତ କରୁଛି।',
    viewInsights: 'ଜିଲ୍ଲା ଅନ୍ତର୍ଦୃଷ୍ଟି ଦେଖନ୍ତୁ',
    back: 'ଫଳାଫଳକୁ ଫେରନ୍ତୁ',
  }
};

const ExplainabilityScreen: React.FC<ExplainabilityScreenProps> = ({ onNavigate }) => {
  const { language, data } = useApp();
  const t = translations[language];
  
  const shapData = data.shapData || [
    { feature: 'Rainfall', importance: 0.35, color: 'text-green-600' },
    { feature: 'Temperature', importance: 0.28, color: 'text-orange-600' },
    { feature: 'Soil pH', importance: 0.22, color: 'text-yellow-600' },
    { feature: 'Nitrogen', importance: -0.15, color: 'text-red-600' },
  ];

  const localFactors = [
    {
      factor: language === 'en' ? 'Rainfall' : 'ବର୍ଷା',
      status: 'positive',
      description: t.rainfallFact,
      icon: TrendingUp,
      color: 'green'
    },
    {
      factor: language === 'en' ? 'Temperature' : 'ତାପମାତ୍ରା',
      status: 'positive',
      description: t.tempFact,
      icon: TrendingUp,
      color: 'blue'
    },
    {
      factor: language === 'en' ? 'Soil pH' : 'ମାଟିର pH',
      status: 'suboptimal',
      description: t.phFact,
      icon: AlertTriangle,
      color: 'yellow'
    },
    {
      factor: language === 'en' ? 'Nitrogen' : 'ନାଇଟ୍ରୋଜେନ',
      status: 'negative',
      description: t.nitrogenFact,
      icon: TrendingDown,
      color: 'red'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{t.title}</h1>
        </div>
        <p className="text-gray-600 text-lg">{t.subtitle}</p>
      </div>

      {/* SHAP Feature Importance */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.featureImportance}</h2>
        <div className="space-y-4">
          {shapData.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-24 text-right font-medium text-gray-700">
                {item.feature}
              </div>
              <div className="flex-1 relative">
                <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className={`h-full ${
                      item.importance > 0 ? 'bg-green-500' : 'bg-red-500'
                    } transition-all duration-1000 ease-out`}
                    style={{
                      width: `${Math.abs(item.importance) * 200}px`,
                      marginLeft: item.importance < 0 ? 'auto' : '0'
                    }}
                  />
                </div>
              </div>
              <div className={`w-16 text-right font-bold ${item.color}`}>
                {item.importance > 0 ? '+' : ''}{(item.importance * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
          <p className="text-purple-800 leading-relaxed">{t.explanation}</p>
        </div>
      </div>

      {/* Local Impact Factors */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.localFactors}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {localFactors.map((factor, index) => {
            const Icon = factor.icon;
            const colorClasses = {
              green: 'border-green-200 bg-green-50',
              blue: 'border-blue-200 bg-blue-50',
              yellow: 'border-yellow-200 bg-yellow-50',
              red: 'border-red-200 bg-red-50'
            };
            const iconColors = {
              green: 'text-green-600',
              blue: 'text-blue-600',
              yellow: 'text-yellow-600',
              red: 'text-red-600'
            };
            const badgeColors = {
              positive: 'bg-green-100 text-green-800',
              negative: 'bg-red-100 text-red-800',
              suboptimal: 'bg-yellow-100 text-yellow-800'
            };
            const badgeText = {
              positive: t.positive,
              negative: t.negative,
              suboptimal: t.suboptimal
            };

            return (
              <div
                key={index}
                className={`p-6 rounded-xl border-2 ${colorClasses[factor.color as keyof typeof colorClasses]} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start space-x-4">
                  <Icon className={`w-6 h-6 mt-1 ${iconColors[factor.color as keyof typeof iconColors]}`} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="font-bold text-gray-800">{factor.factor}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${badgeColors[factor.status as keyof typeof badgeColors]}`}>
                        {badgeText[factor.status as keyof typeof badgeText]}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{factor.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <button
          onClick={() => onNavigate('results')}
          className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.back}</span>
        </button>
        
        <button
          onClick={() => onNavigate('insights')}
          className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <span>{t.viewInsights}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ExplainabilityScreen;