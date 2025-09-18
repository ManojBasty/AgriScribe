import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, ArrowRight, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface InputScreenProps {
  onNavigate: (screen: string) => void;
}

const translations = {
  en: {
    title: 'Input Your Data',
    uploadTitle: 'Upload CSV File',
    uploadDesc: 'Upload your agricultural data in CSV format',
    dragDrop: 'Drag & drop your CSV file here, or click to browse',
    uploadSuccess: 'File uploaded successfully! 245 records processed.',
    uploadWarning: 'Warning: 3 missing values detected in Rainfall column.',
    demoTitle: 'Demo Mode',
    demoDesc: 'Select district and crop for demonstration',
    selectDistrict: 'Select District',
    selectCrop: 'Select Crop',
    proceed: 'Proceed to Prediction',
    back: 'Back to Home',
  },
  odia: {
    title: 'ଆପଣଙ୍କର ତଥ୍ୟ ଇନପୁଟ୍ କରନ୍ତୁ',
    uploadTitle: 'CSV ଫାଇଲ୍ ଅପଲୋଡ୍ କରନ୍ତୁ',
    uploadDesc: 'CSV ଫର୍ମାଟରେ ଆପଣଙ୍କର କୃଷି ତଥ୍ୟ ଅପଲୋଡ୍ କରନ୍ତୁ',
    dragDrop: 'ଆପଣଙ୍କର CSV ଫାଇଲ୍ ଏଠାରେ ଟାଣି ଆଣନ୍ତୁ, କିମ୍ବା ବ୍ରାଉଜ୍ କରିବାକୁ କ୍ଲିକ୍ କରନ୍ତୁ',
    uploadSuccess: 'ଫାଇଲ୍ ସଫଳତାର ସହ ଅପଲୋଡ୍ ହୋଇଛି! 245 ରେକର୍ଡ ପ୍ରକ୍ରିୟାକୃତ।',
    uploadWarning: 'ଚେତାବନୀ: ବର୍ଷା ସ୍ତମ୍ଭରେ 3 ଅନୁପସ୍ଥିତ ମୂଲ୍ୟ ଚିହ୍ନଟ ହୋଇଛି।',
    demoTitle: 'ଡେମୋ ମୋଡ୍',
    demoDesc: 'ପ୍ରଦର୍ଶନ ପାଇଁ ଜିଲ୍ଲା ଏବଂ ଫସଲ ବାଛନ୍ତୁ',
    selectDistrict: 'ଜିଲ୍ଲା ବାଛନ୍ତୁ',
    selectCrop: 'ଫସଲ ବାଛନ୍ତୁ',
    proceed: 'ପୂର୍ବାନୁମାନକୁ ଆଗକୁ ବଢ଼ନ୍ତୁ',
    back: 'ହୋମକୁ ଫେରନ୍ତୁ',
  }
};

const districts = ['Cuttack', 'Bhubaneswar', 'Puri', 'Kendrapada', 'Khordha', 'Ganjam'];
const crops = ['Rice', 'Wheat', 'Maize', 'Sugarcane', 'Cotton', 'Groundnut'];

const InputScreen: React.FC<InputScreenProps> = ({ onNavigate }) => {
  const { language, data, updateData } = useApp();
  const t = translations[language];
  
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(data.selectedDistrict);
  const [selectedCrop, setSelectedCrop] = useState(data.selectedCrop);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileUploaded(true);
      updateData({ csvData: [{ sample: 'data' }] });
    }
  };

  const handleProceed = () => {
    updateData({ 
      selectedDistrict, 
      selectedCrop,
      predictions: {
        actual: 3.2,
        predicted: 3.5,
        mse: 0.15,
        r2: 0.82
      }
    });
    onNavigate('results');
  };

  const canProceed = fileUploaded || (selectedDistrict && selectedCrop);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{t.title}</h1>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{t.uploadTitle}</h2>
            <p className="text-gray-600">{t.uploadDesc}</p>
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="csv-upload"
          />
          <label htmlFor="csv-upload" className="cursor-pointer">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600 mb-2">{t.dragDrop}</p>
          </label>
        </div>

        {/* Upload Status */}
        {fileUploaded && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">{t.uploadSuccess}</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-800 font-medium">{t.uploadWarning}</span>
            </div>
          </div>
        )}
      </div>

      {/* Demo Mode Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-sky-100">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-gradient-to-br from-sky-500 to-sky-600 p-3 rounded-xl">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{t.demoTitle}</h2>
            <p className="text-gray-600">{t.demoDesc}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.selectDistrict}
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
            >
              <option value="">{t.selectDistrict}</option>
              {districts.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.selectCrop}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
            >
              <option value="">{t.selectCrop}</option>
              {crops.map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
        >
          {t.back}
        </button>
        
        <button
          onClick={handleProceed}
          disabled={!canProceed}
          className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all ${
            canProceed
              ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>{t.proceed}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default InputScreen;