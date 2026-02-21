import React from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Shield } from 'lucide-react-native';
import { BaseScreen } from '@/components/base/base-screen';
import { BaseButton } from '@/components/base/base-button';

export default function WelcomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <BaseScreen scroll={false} padded={false} statusBarStyle="light">
      <View className="flex-1 bg-navy-500">
        {/* Top section with logo */}
        <View className="flex-1 items-center justify-center px-8">
          <View className="mb-6 h-24 w-24 items-center justify-center rounded-3xl bg-white/10">
            <Shield size={56} color="#D4A017" />
          </View>
          <Text className="text-4xl font-bold text-white">
            {t('welcome.title')}
          </Text>
          <Text className="mt-2 text-lg text-white/70">
            {t('welcome.subtitle')}
          </Text>
        </View>

        {/* Bottom section with buttons */}
        <View className="px-6 pb-12">
          <BaseButton
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => router.push('/(auth)/sign-up')}
            className="mb-4 bg-gold-500 active:bg-gold-600"
          >
            <Text className="text-lg font-bold text-navy-500">
              {t('welcome.signUp')}
            </Text>
          </BaseButton>

          <BaseButton
            variant="outline"
            size="lg"
            fullWidth
            onPress={() => router.push('/(auth)/sign-in')}
            className="border-white/30"
          >
            <Text className="text-lg font-semibold text-white">
              {t('welcome.signIn')}
            </Text>
          </BaseButton>
        </View>
      </View>
    </BaseScreen>
  );
}
