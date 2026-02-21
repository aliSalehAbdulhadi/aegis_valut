import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BaseScreen } from '@/components/base/base-screen';
import { BaseButton } from '@/components/base/base-button';
import { BaseText } from '@/components/base/base-text';
import { Header } from '@/components/layout/header';
import { FaceCaptureCircle } from '@/features/auth/components/face-capture-circle';
import { useFaceVerification } from '@/features/auth/hooks/use-face-verification';
import { useAppSelector } from '@/store/hooks';

export default function VerifyFaceScreen() {
  const { t } = useTranslation();
  const {
    verification,
    cameraActive,
    cameraRef,
    captureError,
    startCamera,
    capturePhoto,
    handleCompleteRegistration,
  } = useFaceVerification();
  const facePhoto = useAppSelector((state) => state.auth.facePhoto);

  return (
    <BaseScreen>
      <Header title={t('auth.verifyFace.title')} showBack />

      <View className="flex-1 items-center px-2 pt-4">
        <BaseText variant="subtitle" className="mb-8 text-center">
          {t('auth.verifyFace.subtitle')}
        </BaseText>

        <FaceCaptureCircle
          cameraActive={cameraActive}
          captured={verification.face}
          photoUri={facePhoto}
          error={captureError}
          cameraRef={cameraRef}
          onStartCamera={startCamera}
          onCapture={capturePhoto}
        />

        <View className="mt-auto w-full pb-6">
          <BaseButton
            variant="primary"
            size="lg"
            fullWidth
            onPress={handleCompleteRegistration}
            disabled={!verification.face}
          >
            {t('auth.verifyFace.completeRegistration')}
          </BaseButton>
        </View>
      </View>
    </BaseScreen>
  );
}
