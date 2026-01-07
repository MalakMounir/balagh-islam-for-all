import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import arTranslations from './locales/ar.json';
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import urTranslations from './locales/ur.json';
import idTranslations from './locales/id.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        translation: arTranslations,
      },
      en: {
        translation: enTranslations,
      },
      fr: {
        translation: frTranslations,
      },
      ur: {
        translation: urTranslations,
      },
      id: {
        translation: idTranslations,
      },
    },
    lng: 'ar', // default language
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    // Support for RTL languages
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;








