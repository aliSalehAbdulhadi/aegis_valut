import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ar from './locales/ar.json';
import en from './locales/en.json';

const deviceLanguage = getLocales()[0]?.languageCode ?? 'en';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage === 'ar' ? 'ar' : 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v4',
});

export default i18n;
