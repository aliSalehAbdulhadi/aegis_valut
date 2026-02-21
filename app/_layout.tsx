import '@/i18n';
import '@/global.css';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { I18nManager } from 'react-native';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { store } from '@/store';
import { useColorScheme } from 'react-native';

function RootNavigator() {
  const colorScheme = useColorScheme();
  const { i18n } = useTranslation();

  useEffect(() => {
    const isArabic = i18n.language === 'ar';
    if (I18nManager.isRTL !== isArabic) {
      I18nManager.allowRTL(isArabic);
      I18nManager.forceRTL(isArabic);
    }
  }, [i18n.language]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
