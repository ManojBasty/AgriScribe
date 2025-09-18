import React from 'react';
import { BarChart3, TrendingUp, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface InsightsScreenProps {
  onNavigate: (screen: string) => void;
}

const translations = {
  en: {
    title: 'District Insights',
    subtitle: 'Compare your district with state averages',
    rainfallComparison: 'Rainfall vs State Average',
    soilAnalysis: 'Soil pH Analysis',
    yieldTrends: 'Yield Trends (Last 5 Years)',
    yourDistrict: 'Your District',
    stateAverage: 'State Average',
    optimal: 'Optimal Range',
    above: 'Above Average',
    below: 'Below Average',
    within: 'Within Range',
    mm: 'mm',
    tonnes: 'tonnes/hectare',
    exportReport: 'Export Full Report',
    back: 'Back to Explanation',
    insights: {
      rainfall: 'Your district receives 15% more rainfall than the state average, which contributes positively to crop yield.',
      soil: 'Soil pH in your district is slightly acidic. Consider lime application to optimize nutrient availability.',
      yield: 'Yield trends show consistent improvement over the past 3 years, indicating effective agricultural practices.'
    }
  },
  odia: {
    title: 'ଜିଲ୍ଲା ଅନ୍ତର୍ଦୃଷ୍ଟି',
    subtitle: 'ଆପଣଙ୍କ ଜିଲ୍ଲାକୁ ରାଜ୍ୟ ହାରାହାରି ସହିତ ତୁଳନା କରନ୍ତୁ',
    rainfallComparison: 'ବର୍ଷା ବନାମ ରାଜ୍ୟ ହାରାହାରି',
    soilAnalysis: 'ମାଟି pH ବିଶ୍ଳେଷଣ',
    yieldTrends: 'ଉତ୍ପାଦନ ଧାରା (ଗତ 5 ବର୍ଷ)',
    yourDistrict: 'ଆପଣଙ୍କ ଜିଲ୍ଲା',
    stateAverage: 'ରାଜ୍ୟ ହାରାହାରି',
    optimal: 'ଉତ୍କୃଷ୍ଟ ପରିସର',
    above: 'ହାରାହାରିଠାରୁ ଅଧିକ',
    below: 'ହାରାହାରିଠାରୁ କମ୍',
    within: 'ପରିସର ମଧ୍ୟରେ',
    mm: 'ମିମି',
    tonnes: 'ଟନ୍/ହେକ୍ଟର',
    exportReport: 'ପୂର୍ଣ୍ଣ ରିପୋର୍ଟ ରପ୍ତାନି କରନ୍ତୁ',
    back: 'ବ୍ୟାଖ୍ୟାକୁ ଫେରନ୍ତୁ',
    insights: {
      rainfall: 'ଆପଣଙ୍କ ଜିଲ୍ଲା ରାଜ୍ୟ ହାରାହାରିଠାରୁ 15% ଅଧିକ ବର୍ଷା ପାଇଥାଏ, ଯାହା ଫସଲ ଉତ୍ପାଦନରେ ସକରାତ୍ମକ ଯୋଗଦାନ କରେ।',
      soil: 'ଆପଣଙ୍କ ଜିଲ୍ଲାରେ ମାଟିର pH ଟିକେ ଅମ୍ଳୀୟ। ପୋଷକ ତତ୍ତ୍ୱର ଉପଲବ୍ଧତା ଉନ୍ନତ କରିବା ପାଇଁ ଚୂନ ପ୍ରୟୋଗ ବିଚାର କରନ୍ତୁ।',
      yield: 'ଉତ୍ପାଦନ ଧାରା ଗତ 3 ବର୍ଷ ମଧ୍ୟରେ ନିରନ୍ତର ଉନ୍ନତି ଦେଖାଉଛି, ଯାହା ପ୍ରଭାବଶାଳୀ କୃଷି ଅଭ୍ୟାସକୁ ସୂଚିତ କରେ।'
    }
  }
};

const InsightsScreen: React.FC<InsightsScreenProps> = ({ onNavigate }) => {
  const { language, data } = useApp();
  const t = translations[language];

  const districtName = data.selectedDistrict || 'Cuttack';
  
  // Mock data for comparisons
  const rainfallData = {
    district: 1250,
    state: 1100,
    optimal: { min: 1000, max: 1400 }
  };
  
  const soilData = {
    district: 6.2,
    optimal: { min: 6.5, max: 7.0 }
  };
  
  const yieldTrends = [
    { year: 2020, yield: 2.8 },
    { year: 2021, yield: 3.1 },
    { year: 2022, yield: 3.0 },
    { year: 2023, yield: 3.3 },
    { year: 2024, yield: 3.5 }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-gradient-to-br from-sky-500 to-sky-600 p-3 rounded-xl">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{t.title}</h1>
        </div>
        <p className="text-gray-600 text-lg">{t.subtitle}</p>
        <p className="text-sky-600 font-semibold text-xl">{districtName}</p>
      </div>

      {/* Comparisons Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Rainfall Comparison */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          <div className="flex items-center space-x-3 mb-6">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">{t.rainfallComparison}</h2>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">{t.yourDistrict}</span>
              <span className="text-2xl font-bold text-blue-600">{rainfallData.district} {t.mm}</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                style={{ width: `${(rainfallData.district / 1600) * 100}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <span className="font-medium text-gray-700">{t.stateAverage}</span>
              <span className="text-xl font-bold text-gray-600">{rainfallData.state} {t.mm}</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-400 rounded-full transition-all duration-1000"
                style={{ width: `${(rainfallData.state / 1600) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-xl border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">{t.above}</span>
            </div>
            <p className="text-green-700 text-sm">{t.insights.rainfall}</p>
          </div>
        </div>

        {/* Soil pH Analysis */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-yellow-100">
          <div className="flex items-center space-x-3 mb-6">
            <BarChart3 className="w-6 h-6 text-yellow-600" />
            <h2 className="text-2xl font-bold text-gray-800">{t.soilAnalysis}</h2>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-gray-700">{t.yourDistrict}</span>
              <span className="text-3xl font-bold text-yellow-600">{soilData.district}</span>
            </div>
            
            <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute inset-0 flex">
                {/* Below optimal */}
                <div className="bg-red-300 h-full" style={{ width: '50%' }} />
                {/* Optimal range */}
                <div className="bg-green-400 h-full" style={{ width: '30%' }} />
                {/* Above optimal */}
                <div className="bg-orange-300 h-full" style={{ width: '20%' }} />
              </div>
              {/* Current value indicator */}
              <div 
                className="absolute top-0 h-full w-1 bg-yellow-600"
                style={{ left: `${((soilData.district - 5) / 4) * 100}%` }}
              />
            </div>
            
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>5.0</span>
              <span className="text-green-600 font-medium">{t.optimal} (6.5-7.0)</span>
              <span>9.0</span>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold text-yellow-800">{t.below} {t.optimal}</span>
            </div>
            <p className="text-yellow-700 text-sm">{t.insights.soil}</p>
          </div>
        </div>
      </div>

      {/* Yield Trends */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-800">{t.yieldTrends}</h2>
        </div>
        
        <div className="mb-6">
          <div className="flex items-end justify-between space-x-2 h-48">
            {yieldTrends.map((data, index) => (
              <div key={data.year} className="flex-1 flex flex-col items-center space-y-2">
                <div 
                  className="w-full bg-green-500 rounded-t transition-all duration-1000 ease-out hover:bg-green-600"
                  style={{ height: `${(data.yield / 4) * 100}%` }}
                />
                <span className="text-sm font-medium text-gray-700">{data.year}</span>
                <span className="text-xs text-gray-600">{data.yield} {t.tonnes}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-800">Improving Trend</span>
          </div>
          <p className="text-green-700 text-sm">{t.insights.yield}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <button
          onClick={() => onNavigate('explainability')}
          className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.back}</span>
        </button>
        
        <button
          onClick={() => onNavigate('export')}
          className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <span>{t.exportReport}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default InsightsScreen;