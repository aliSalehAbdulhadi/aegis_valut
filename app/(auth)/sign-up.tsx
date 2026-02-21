import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, Lock } from 'lucide-react-native';
import { BaseScreen } from '@/components/base/base-screen';
import { BaseInput } from '@/components/base/base-input';
import { BaseButton } from '@/components/base/base-button';
import { BaseText } from '@/components/base/base-text';
import { Header } from '@/components/layout/header';
import { useSignUp } from '@/features/auth/hooks/use-sign-up';

export default function SignUpScreen() {
  const { t } = useTranslation();
  const {
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    errors,
    handleSubmit,
  } = useSignUp();

  return (
    <BaseScreen>
      <Header title={t('auth.signUp.title')} showBack />

      <View className="px-2 pt-4">
        <BaseText variant="subtitle" className="mb-8">
          {t('auth.signUp.subtitle')}
        </BaseText>

        <BaseInput
          label={t('common.email')}
          placeholder={t('auth.signUp.emailPlaceholder')}
          value={email}
          onChangeText={setEmail}
          icon={Mail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <BaseInput
          label={t('common.phone')}
          placeholder={t('auth.signUp.phonePlaceholder')}
          value={phone}
          onChangeText={setPhone}
          icon={Phone}
          keyboardType="phone-pad"
          error={errors.phone}
        />

        <BaseInput
          label={t('common.password')}
          placeholder={t('auth.signUp.passwordPlaceholder')}
          value={password}
          onChangeText={setPassword}
          icon={Lock}
          isPassword
          error={errors.password}
        />

        <View className="mt-6">
          <BaseButton
            variant="primary"
            size="lg"
            fullWidth
            onPress={handleSubmit}
          >
            {t('auth.signUp.next')}
          </BaseButton>
        </View>
      </View>
    </BaseScreen>
  );
}
