import React from 'react';
import { View, Text, TouchableOpacity, Alert, I18nManager } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  Globe,
  User,
  LogOut,
  ChevronRight,
  Info,
  Shield,
} from 'lucide-react-native';
import { BaseScreen } from '@/components/base/base-screen';
import { BaseAvatar } from '@/components/base/base-avatar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/features/auth/store/auth-slice';
import { useAppTheme } from '@/hooks/use-app-theme';
import { APP_VERSION } from '@/constants/theme';

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
      className="flex-row items-center justify-between border-b border-gray-100 px-4 py-4 dark:border-gray-800"
    >
      <View className="flex-row items-center">
        <Icon size={20} color={danger ? '#F44336' : colors.textSecondary} />
        <Text
          className={`ml-3 text-base ${
            danger
              ? 'text-red-500'
              : 'text-gray-900 dark:text-gray-100'
          }`}
        >
          {label}
        </Text>
      </View>
      <View className="flex-row items-center">
        {value && (
          <Text className="mr-2 text-sm text-gray-400">{value}</Text>
        )}
        <ChevronRight size={18} color={colors.textSecondary} />
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

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);

    // Handle RTL
    const shouldBeRTL = newLang === 'ar';
    if (shouldBeRTL !== I18nManager.isRTL) {
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
      // In production, you'd call Updates.reloadAsync() here
      Alert.alert(
        'Language Changed',
        'Please restart the app to apply RTL layout changes.',
      );
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
      <View className="items-center px-4 py-8">
        <BaseAvatar name={user?.fullName ?? 'User'} size="lg" />
        <Text className="mt-3 text-lg font-bold text-gray-900 dark:text-gray-100">
          {user?.fullName ?? 'User'}
        </Text>
        <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {user?.email ?? ''}
        </Text>
      </View>

      {/* Settings Items */}
      <View className="mx-4 overflow-hidden rounded-2xl bg-white dark:bg-gray-900">
        <SettingsItem
          icon={Globe}
          label={t('settings.language')}
          value={i18n.language === 'ar' ? t('settings.arabic') : t('settings.english')}
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

      <View className="mx-4 mt-6 overflow-hidden rounded-2xl bg-white dark:bg-gray-900">
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
