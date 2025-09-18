import React from 'react';
import { Download, FileText, Database, Home, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ExportScreenProps {
  onNavigate: (screen: string) => void;
}

const translations = {
  en: {
    title: 'Export Report',
    subtitle: 'Download your complete agricultural analysis',
    pdfReport: 'PDF Report',
    pdfDesc: 'Complete analysis with predictions, explanations, and insights',
    csvData: 'CSV Data Export',
    csvDesc: 'Raw data and predictions for further analysis',
    included: 'Report includes:',
    items: [
      'Crop yield predictions and accuracy metrics',
      'SHAP feature importance analysis',
      'Local impact factors explanation',
      'District comparisons and benchmarks',
      'Historical yield trends',
      'Actionable recommendations'
    ],
    downloadPDF: 'Download PDF Report',
    downloadCSV: 'Download CSV Data',
    backToHome: 'Back to Home',
    generating: 'Generating report...',
    ready: 'Report ready for download',
    tagline: 'We don\'t advise. We show cold hard facts, hyper-localized, explainable and farmer-trustworthy.',
  },
  odia: {
    title: 'ରିପୋର୍ଟ ରପ୍ତାନି',
    subtitle: 'ଆପଣଙ୍କର ସମ୍ପୂର୍ଣ୍ଣ କୃଷି ବିଶ୍ଳେଷଣ ଡାଉନଲୋଡ୍ କରନ୍ତୁ',
    pdfReport: 'PDF ରିପୋର୍ଟ',
    pdfDesc: 'ପୂର୍ବାନୁମାନ, ବ୍ୟାଖ୍ୟା ଏବଂ ଅନ୍ତର୍ଦୃଷ୍ଟି ସହିତ ସମ୍ପୂର୍ଣ୍ଣ ବିଶ୍ଳେଷଣ',
    csvData: 'CSV ତଥ୍ୟ ରପ୍ତାନି',
    csvDesc: 'ଅଧିକ ବିଶ୍ଳେଷଣ ପାଇଁ କଞ୍ଚା ତଥ୍ୟ ଏବଂ ପୂର୍ବାନୁମାନ',
    included: 'ରିପୋର୍ଟରେ ଅନ୍ତର୍ଭୁକ୍ତ:',
    items: [
      'ଫସଲ ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ ଏବଂ ସଠିକତା ମେଟ୍ରିକ୍ସ',
      'SHAP ବିଶେଷତା ଗୁରୁତ୍ୱ ବିଶ୍ଳେଷଣ',
      'ସ୍ଥାନୀୟ ପ୍ରଭାବ କାରକଗୁଡିକର ବ୍ୟାଖ୍ୟା',
      'ଜିଲ୍ଲା ତୁଳନା ଏବଂ ମାନଦଣ୍ଡ',
      'ଐତିହାସିକ ଉତ୍ପାଦନ ଧାରା',
      'କାର୍ଯ୍ୟକ୍ଷମ ସୁପାରିସଗୁଡିକ'
    ],
    downloadPDF: 'PDF ରିପୋର୍ଟ ଡାଉନଲୋଡ୍ କରନ୍ତୁ',
    downloadCSV: 'CSV ତଥ୍ୟ ଡାଉନଲୋଡ୍ କରନ୍ତୁ',
    backToHome: 'ହୋମକୁ ଫେରନ୍ତୁ',
    generating: 'ରିପୋର୍ଟ ତିଆରି କରୁଛି...',
    ready: 'ରିପୋର୍ଟ ଡାଉନଲୋଡ୍ ପାଇଁ ପ୍ରସ୍ତୁତ',
    tagline: 'ଆମେ ସୁପାରିସ କରୁନାହିଁ। ଆମେ କେବଳ ତଥ୍ୟ ଦେଖାଉଛୁ, ହାଇପର-ଲୋକାଲ ଏବଂ ବିବେଚନା-ଯୋଗ୍ୟ।',
  }
};

const ExportScreen: React.FC<ExportScreenProps> = ({ onNavigate }) => {
  const { language, data } = useApp();
  const t = translations[language];
  
  const [pdfGenerating, setPdfGenerating] = React.useState(false);
  const [csvGenerating, setCsvGenerating] = React.useState(false);
  const [pdfReady, setPdfReady] = React.useState(false);
  const [csvReady, setCsvReady] = React.useState(false);

  const handlePDFDownload = () => {
    setPdfGenerating(true);
    setTimeout(() => {
      setPdfGenerating(false);
      setPdfReady(true);
      // In a real app, this would trigger an actual download
      console.log('PDF download initiated');
    }, 2000);
  };

  const handleCSVDownload = () => {
    setCsvGenerating(true);
    setTimeout(() => {
      setCsvGenerating(false);
      setCsvReady(true);
      // In a real app, this would trigger an actual download
      console.log('CSV download initiated');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl">
            <Download className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{t.title}</h1>
        </div>
        <p className="text-gray-600 text-lg">{t.subtitle}</p>
      </div>

      {/* Export Options */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* PDF Report Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-xl">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{t.pdfReport}</h3>
              <p className="text-gray-600">{t.pdfDesc}</p>
            </div>
          </div>
          
          <button
            onClick={handlePDFDownload}
            disabled={pdfGenerating}
            className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-semibold transition-all ${
              pdfGenerating
                ? 'bg-gray-300 cursor-not-allowed text-gray-600'
                : pdfReady
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {pdfGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>{t.generating}</span>
              </>
            ) : pdfReady ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>{t.ready}</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>{t.downloadPDF}</span>
              </>
            )}
          </button>
        </div>

        {/* CSV Data Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl">
              <Database className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{t.csvData}</h3>
              <p className="text-gray-600">{t.csvDesc}</p>
            </div>
          </div>
          
          <button
            onClick={handleCSVDownload}
            disabled={csvGenerating}
            className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-semibold transition-all ${
              csvGenerating
                ? 'bg-gray-300 cursor-not-allowed text-gray-600'
                : csvReady
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {csvGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>{t.generating}</span>
              </>
            ) : csvReady ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>{t.ready}</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>{t.downloadCSV}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Report Contents */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.included}</h2>
        <div className="space-y-4">
          {t.items.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tagline */}
      <div className="text-center">
        <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed px-8 py-6 bg-white rounded-2xl shadow-md border border-amber-100">
          "{t.tagline}"
        </p>
      </div>

      {/* Back to Home */}
      <div className="text-center">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all mx-auto"
        >
          <Home className="w-5 h-5" />
          <span>{t.backToHome}</span>
        </button>
      </div>
    </div>
  );
};

export default ExportScreen;