import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Fingerprint } from 'lucide-react-native';
import { BaseScreen } from '@/components/base/base-screen';
import { BaseInput } from '@/components/base/base-input';
import { BaseButton } from '@/components/base/base-button';
import { BaseText } from '@/components/base/base-text';
import { Header } from '@/components/layout/header';
import { SignatureCanvasComponent } from '@/features/auth/components/signature-canvas';
import { useSignIn } from '@/features/auth/hooks/use-sign-in';
import { LoadingOverlay } from '@/components/feedback/loading-overlay';

export default function SignInScreen() {
  const { t } = useTranslation();
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    errors,
    handleSignIn,
    handleBiometricAuth,
    handleSignatureCapture,
  } = useSignIn();

  return (
    <BaseScreen>
      <Header title={t('auth.signIn.title')} showBack />

      <View className="px-2 pt-4">
        <BaseText variant="subtitle" className="mb-8">
          {t('auth.signIn.subtitle')}
        </BaseText>

        <BaseInput
          label={t('common.email')}
          placeholder={t('auth.signIn.emailPlaceholder')}
          value={email}
          onChangeText={setEmail}
          icon={Mail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <BaseInput
          label={t('common.password')}
          placeholder={t('auth.signIn.passwordPlaceholder')}
          value={password}
          onChangeText={setPassword}
          icon={Lock}
          isPassword
          error={errors.password}
        />

        <BaseButton
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleSignIn}
          className="mt-2"
        >
          {t('auth.signIn.signInButton')}
        </BaseButton>

        {/* Divider */}
        <View className="my-6 flex-row items-center">
          <View className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          <Text className="mx-4 text-sm text-gray-400">{t('common.or')}</Text>
          <View className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </View>

        {/* Biometric Auth */}
        <BaseButton
          variant="outline"
          size="lg"
          fullWidth
          onPress={handleBiometricAuth}
        >
          <View className="flex-row items-center">
            <Fingerprint size={24} color="#0A7EA4" />
            <Text className="ml-3 text-base font-semibold text-primary-500">
              {t('auth.signIn.biometric')}
            </Text>
          </View>
        </BaseButton>

        {/* Signature Canvas */}
        <SignatureCanvasComponent
          title={t('auth.signIn.signature')}
          description={t('auth.signIn.signatureDesc')}
          clearLabel={t('auth.signIn.clearSignature')}
          onSignature={handleSignatureCapture}
        />
      </View>

      {loading && <LoadingOverlay />}
    </BaseScreen>
  );
}
