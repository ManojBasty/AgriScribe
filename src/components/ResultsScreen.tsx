import React from 'react';
import { TrendingUp, Target, BarChart3, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ResultsScreenProps {
  onNavigate: (screen: string) => void;
}

const translations = {
  en: {
    title: 'Prediction Results',
    actualYield: 'Actual Yield',
    predictedYield: 'Predicted Yield',
    accuracy: 'Model Accuracy',
    mse: 'Mean Squared Error',
    r2Score: 'R² Score',
    tonnes: 'tonnes/hectare',
    viewExplanation: 'View AI Explanation',
    back: 'Back to Input',
    confidence: 'Prediction Confidence',
    high: 'High',
  },
  odia: {
    title: 'ପୂର୍ବାନୁମାନ ଫଳାଫଳ',
    actualYield: 'ପ୍ରକୃତ ଉତ୍ପାଦନ',
    predictedYield: 'ପୂର୍ବାନୁମାନିତ ଉତ୍ପାଦନ',
    accuracy: 'ମଡେଲ ସଠିକତା',
    mse: 'ମାନ ବର୍ଗ ତ୍ରୁଟି',
    r2Score: 'R² ସ୍କୋର',
    tonnes: 'ଟନ୍/ହେକ୍ଟର',
    viewExplanation: 'AI ବ୍ୟାଖ୍ୟା ଦେଖନ୍ତୁ',
    back: 'ଇନପୁଟକୁ ଫେରନ୍ତୁ',
    confidence: 'ପୂର୍ବାନୁମାନ ବିଶ୍ୱାସ',
    high: 'ଉଚ୍ଚ',
  }
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({ onNavigate }) => {
  const { language, data } = useApp();
  const t = translations[language];
  
  const predictions = data.predictions || {
    actual: 3.2,
    predicted: 3.5,
    mse: 0.15,
    r2: 0.82
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{t.title}</h1>
        <p className="text-gray-600 text-lg">
          {data.selectedDistrict && data.selectedCrop && 
            `${data.selectedDistrict} • ${data.selectedCrop}`
          }
        </p>
      </div>

      {/* Main Results Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Actual Yield Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{t.actualYield}</h3>
              <p className="text-gray-600">Historical data</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {predictions.actual.toFixed(1)}
            </div>
            <div className="text-gray-500 font-medium">{t.tonnes}</div>
          </div>
        </div>

        {/* Predicted Yield Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{t.predictedYield}</h3>
              <p className="text-gray-600">AI forecast</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {predictions.predicted.toFixed(1)}
            </div>
            <div className="text-gray-500 font-medium">{t.tonnes}</div>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <span className="text-sm text-gray-600">{t.confidence}:</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {t.high} (82%)
              </span>
            </div>
          </div>
        </div>

        {/* Model Metrics Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{t.accuracy}</h3>
              <p className="text-gray-600">Model metrics</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">{t.r2Score}</span>
              <span className="text-2xl font-bold text-purple-600">
                {(predictions.r2 * 100).toFixed(0)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">{t.mse}</span>
              <span className="text-xl font-bold text-gray-700">
                {predictions.mse.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Visualization */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Yield Comparison</h3>
        <div className="max-w-md mx-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
              <span className="font-semibold text-blue-800">{t.actualYield}</span>
              <div className="flex items-center space-x-3">
                <div 
                  className="h-6 bg-blue-500 rounded"
                  style={{ width: `${(predictions.actual / 5) * 200}px` }}
                ></div>
                <span className="font-bold text-blue-600 w-16 text-right">
                  {predictions.actual.toFixed(1)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <span className="font-semibold text-green-800">{t.predictedYield}</span>
              <div className="flex items-center space-x-3">
                <div 
                  className="h-6 bg-green-500 rounded"
                  style={{ width: `${(predictions.predicted / 5) * 200}px` }}
                ></div>
                <span className="font-bold text-green-600 w-16 text-right">
                  {predictions.predicted.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <button
          onClick={() => onNavigate('input')}
          className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.back}</span>
        </button>
        
        <button
          onClick={() => onNavigate('explainability')}
          className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <span>{t.viewExplanation}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;