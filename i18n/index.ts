import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager, Platform } from 'react-native';

import { KEYS } from '@/utils/storage';
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

/**
 * Apply RTL based on language. Returns true if a reload is needed
 * (i.e. the native RTL state didn't match the desired direction).
 */
export function applyRTL(lang: string): boolean {
  const shouldBeRTL = lang === 'ar';
  if (shouldBeRTL !== I18nManager.isRTL && Platform.OS !== 'web') {
    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);
    return true; // needs reload
  }
  return false;
}

/**
 * Load persisted language from AsyncStorage and apply it.
 * Called once on app startup from the root layout.
 * Returns true if a reload is needed to apply RTL changes.
 */
export async function loadPersistedLanguage(): Promise<boolean> {
  try {
    const savedLang = await AsyncStorage.getItem(KEYS.LANGUAGE);
    const lang =
      savedLang === 'en' || savedLang === 'ar' ? savedLang : i18n.language;

    if (savedLang && savedLang !== i18n.language) {
      await i18n.changeLanguage(lang);
    }

    return applyRTL(lang);
  } catch (error) {
    console.error('Failed to load persisted language:', error);
    return false;
  }
}

export default i18n;
