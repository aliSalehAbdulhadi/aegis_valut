import { BaseAvatar } from '@/components/base/base-avatar';
import { BaseScreen } from '@/components/base/base-screen';
import { APP_VERSION } from '@/constants/theme';
import { logout } from '@/features/auth/store/auth-slice';
import { useAppTheme } from '@/hooks/use-app-theme';
import { applyRTL } from '@/i18n';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { KEYS, setItem } from '@/utils/storage';
import { useRouter } from 'expo-router';
import * as Updates from 'expo-updates';
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Info,
  LogOut,
  User,
} from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  DevSettings,
  I18nManager,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function SettingsItem({
  icon: Icon,
  label,
  value,
  onPress,
  danger = false,
}: {
  icon: React.ElementType;
  label: string;
  value?: string;
  onPress: () => void;
  danger?: boolean;
}) {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      className='flex-row items-center justify-between border-b border-gray-100 px-4 py-4 dark:border-gray-800'
    >
      <View className='flex-row items-center'>
        <Icon size={20} color={danger ? '#F44336' : colors.textSecondary} />
        <Text
          className={`ml-3 text-base ${
            danger ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'
          }`}
        >
          {label}
        </Text>
      </View>
      <View className='flex-row items-center'>
        {value && <Text className='mr-2 text-sm text-gray-400'>{value}</Text>}
        {I18nManager.isRTL ? (
          <ChevronLeft size={18} color={colors.textSecondary} />
        ) : (
          <ChevronRight size={18} color={colors.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { colors } = useAppTheme();

  const toggleLanguage = async () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';

    // Persist the language choice
    await setItem(KEYS.LANGUAGE, newLang);
    await i18n.changeLanguage(newLang);

    // Apply RTL — returns true if native direction changed and reload is needed
    const needsReload = applyRTL(newLang);

    if (needsReload) {
      // In production, use Updates.reloadAsync for a full native restart
      if (!__DEV__) {
        try {
          await Updates.reloadAsync();
        } catch {}
        return;
      }
      // In dev mode, DevSettings.reload() does a JS-only reload.
      // I18nManager.forceRTL is persisted natively so it takes effect on next full restart.
      if (DevSettings?.reload) {
        DevSettings.reload();
      }
    }
  };

  const handleLogout = () => {
    Alert.alert(t('settings.logout'), t('settings.logoutConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('settings.logout'),
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
          router.replace('/(auth)/welcome');
        },
      },
    ]);
  };

  return (
    <BaseScreen padded={false}>
      {/* Profile Header */}
      <View className='items-center px-4 py-8'>
        <BaseAvatar name={user?.fullName ?? 'User'} size='lg' />
        <Text className='mt-3 text-lg font-bold text-gray-900 dark:text-gray-100'>
          {user?.fullName ?? 'User'}
        </Text>
        <Text className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
          {user?.email ?? ''}
        </Text>
      </View>

      {/* Settings Items */}
      <View className='mx-4 overflow-hidden rounded-2xl bg-white dark:bg-gray-900'>
        <SettingsItem
          icon={Globe}
          label={t('settings.language')}
          value={
            i18n.language === 'ar'
              ? t('settings.arabic')
              : t('settings.english')
          }
          onPress={toggleLanguage}
        />
        <SettingsItem
          icon={User}
          label={t('settings.profile')}
          onPress={() => {}}
        />
        <SettingsItem
          icon={Info}
          label={t('settings.about')}
          value={`v${APP_VERSION}`}
          onPress={() => {}}
        />
      </View>

      <View className='mx-4 mt-6 overflow-hidden rounded-2xl bg-white dark:bg-gray-900'>
        <SettingsItem
          icon={LogOut}
          label={t('settings.logout')}
          onPress={handleLogout}
          danger
        />
      </View>
    </BaseScreen>
  );
}
