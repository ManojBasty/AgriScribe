import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppData {
  csvData: any[] | null;
  selectedDistrict: string;
  selectedCrop: string;
  predictions: {
    actual: number;
    predicted: number;
    mse: number;
    r2: number;
  } | null;
  shapData: {
    feature: string;
    importance: number;
    color: string;
  }[];
}

interface AppContextType {
  data: AppData;
  updateData: (newData: Partial<AppData>) => void;
  language: 'en' | 'odia';
  setLanguage: (lang: 'en' | 'odia') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'odia'>('en');
  const [data, setData] = useState<AppData>({
    csvData: null,
    selectedDistrict: '',
    selectedCrop: '',
    predictions: null,
    shapData: [
      { feature: 'Rainfall', importance: 0.35, color: 'text-green-600' },
      { feature: 'Temperature', importance: 0.28, color: 'text-orange-600' },
      { feature: 'Soil pH', importance: 0.22, color: 'text-yellow-600' },
      { feature: 'Nitrogen', importance: -0.15, color: 'text-red-600' },
    ]
  });

  const updateData = (newData: Partial<AppData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  return (
    <AppContext.Provider value={{ data, updateData, language, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};