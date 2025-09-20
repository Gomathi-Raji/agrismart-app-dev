import { Language } from '@/contexts/LanguageContext';

/**
 * Utility functions for language management
 */

/**
 * Get the display name for a language code
 */
export function getLanguageDisplayName(language: Language): string {
  const names = {
    'en': 'English',
    'ta': 'தமிழ்'
  };
  return names[language];
}

/**
 * Get the native display name for a language code  
 */
export function getLanguageNativeName(language: Language): string {
  const names = {
    'en': 'English',
    'ta': 'தமிழ்'
  };
  return names[language];
}

/**
 * Check if the browser's preferred language matches Tamil
 */
export function getBrowserLanguage(): Language {
  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'ta' ? 'ta' : 'en';
}

/**
 * Format numbers according to the current language locale
 */
export function formatNumber(num: number, language: Language): string {
  const locale = language === 'ta' ? 'ta-IN' : 'en-US';
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Format dates according to the current language locale
 */
export function formatDate(date: Date, language: Language): string {
  const locale = language === 'ta' ? 'ta-IN' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}