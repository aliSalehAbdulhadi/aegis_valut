import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CameraView } from 'expo-camera';
import { BaseScreen } from '@/components/base/base-screen';
import { BaseButton } from '@/components/base/base-button';
import { BaseText } from '@/components/base/base-text';
import { Header } from '@/components/layout/header';
import { IdentityCaptureCard } from '@/features/auth/components/identity-capture-card';
import { useIdentityVerification } from '@/features/auth/hooks/use-identity-verification';
import { useAppSelector } from '@/store/hooks';
import { X } from 'lucide-react-native';
import { TouchableOpacity, Modal } from 'react-native';

export default function VerifyIdentityScreen() {
  const { t } = useTranslation();
  const {
    verification,
    captureMode,
    cameraRef,
    permission,
    startCapture,
    capturePhoto,
    cancelCapture,
    canProceed,
    handleNext,
  } = useIdentityVerification();
  const nationalIdPhoto = useAppSelector((state) => state.auth.nationalIdPhoto);
  const passportPhoto = useAppSelector((state) => state.auth.passportPhoto);

  return (
    <BaseScreen>
      <Header title={t('auth.verifyIdentity.title')} showBack />

      <View className="px-2 pt-4">
        <BaseText variant="subtitle" className="mb-8">
          {t('auth.verifyIdentity.subtitle')}
        </BaseText>

        <IdentityCaptureCard
          title={t('auth.verifyIdentity.nationalId')}
          description={t('auth.verifyIdentity.nationalIdDesc')}
          captured={verification.nationalId}
          photoUri={nationalIdPhoto}
          onCapture={() => startCapture('nationalId')}
        />

        <IdentityCaptureCard
          title={t('auth.verifyIdentity.passport')}
          description={t('auth.verifyIdentity.passportDesc')}
          captured={verification.passport}
          photoUri={passportPhoto}
          onCapture={() => startCapture('passport')}
        />

        <View className="mt-6">
          <BaseButton
            variant="primary"
            size="lg"
            fullWidth
            onPress={handleNext}
            disabled={!canProceed}
          >
            {t('auth.verifyIdentity.next')}
          </BaseButton>
        </View>
      </View>

      {/* Camera Modal */}
      <Modal visible={captureMode !== null} animationType="slide">
        <View className="flex-1 bg-black">
          <View className="flex-1">
            <CameraView
              ref={cameraRef}
              style={{ flex: 1 }}
              facing="back"
            />
          </View>
          <View className="flex-row items-center justify-around bg-black py-6">
            <TouchableOpacity onPress={cancelCapture}>
              <X size={32} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={capturePhoto}
              className="h-16 w-16 items-center justify-center rounded-full border-4 border-white"
            >
              <View className="h-12 w-12 rounded-full bg-white" />
            </TouchableOpacity>
            <View className="w-8" />
          </View>
        </View>
      </Modal>
    </BaseScreen>
  );
}
