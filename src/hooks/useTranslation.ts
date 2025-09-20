import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Custom hook that provides translation functionality
 * This is a convenience hook that re-exports the translation function
 * from the LanguageContext for easier use across components
 */
export function useTranslation() {
  const { t, language, setLanguage } = useLanguage();
  
  return {
    t,
    language,
    setLanguage,
    isEnglish: language === 'en',
    isTamil: language === 'ta'
  };
}