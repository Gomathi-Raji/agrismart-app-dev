import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  console.log("LanguageProvider: Starting initialization");
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState<any>({});

  // Load translations
  useEffect(() => {
    console.log("LanguageProvider: Loading translations");
    const loadTranslations = async () => {
      try {
        const translationsModule = await import('../data/translations.json');
        console.log("LanguageProvider: Translations loaded", translationsModule.default);
        setTranslations(translationsModule.default);
      } catch (error) {
        console.error('LanguageProvider: Failed to load translations:', error);
      }
    };
    loadTranslations();
  }, []);

  // Load saved language preference
  useEffect(() => {
    console.log("LanguageProvider: Loading saved language preference");
    const savedLanguage = localStorage.getItem('agrismart-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ta')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    console.log("LanguageProvider: Setting language to", lang);
    setLanguageState(lang);
    localStorage.setItem('agrismart-language', lang);
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = lang === 'en' ? 'en' : 'ta';
  };

  const t = (key: string): string => {
    console.log("LanguageProvider: Translating key", key, "with language", language);
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value?.[language] || value?.['en'] || key;
  };

  console.log("LanguageProvider: Rendering with context value", { language, setLanguage, t });

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  console.log("useLanguage: Attempting to get context");
  const context = useContext(LanguageContext);
  console.log("useLanguage: Context value:", context);
  if (context === undefined) {
    console.error("useLanguage: Context is undefined - must be used within a LanguageProvider");
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  console.log("useLanguage: Returning context successfully");
  return context;
}