import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react-native';
import { BaseScreen } from '@/components/base/base-screen';
import { BaseButton } from '@/components/base/base-button';

export default function SuccessScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <BaseScreen scroll={false}>
      <View className="flex-1 items-center justify-center px-8">
        <View className="mb-6 h-28 w-28 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <CheckCircle2 size={64} color="#4CAF50" />
        </View>

        <Text className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t('auth.success.title')}
        </Text>

        <Text className="mt-3 text-center text-base text-gray-500 dark:text-gray-400">
          {t('auth.success.subtitle')}
        </Text>
      </View>

      <View className="px-2 pb-12">
        <BaseButton
          variant="primary"
          size="lg"
          fullWidth
          onPress={() => router.replace('/(main)/(tabs)')}
        >
          {t('auth.success.enterApp')}
        </BaseButton>
      </View>
    </BaseScreen>
  );
}
