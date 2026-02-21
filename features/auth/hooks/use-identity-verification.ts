import { useState, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setNationalIdPhoto,
  setPassportPhoto,
} from '@/features/auth/store/auth-slice';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';

export function useIdentityVerification() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const verification = useAppSelector(
    (state) => state.auth.verificationStatus
  );
  const [permission, requestPermission] = useCameraPermissions();
  const [captureMode, setCaptureMode] = useState<'nationalId' | 'passport' | null>(null);
  const cameraRef = useRef<CameraView>(null);

  const startCapture = useCallback(
    async (type: 'nationalId' | 'passport') => {
      if (!permission?.granted) {
        const result = await requestPermission();
        if (!result.granted) return;
      }
      setCaptureMode(type);
    },
    [permission, requestPermission]
  );

  const capturePhoto = useCallback(async () => {
    if (!cameraRef.current || !captureMode) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: false,
      });

      if (photo?.uri) {
        if (captureMode === 'nationalId') {
          dispatch(setNationalIdPhoto(photo.uri));
        } else {
          dispatch(setPassportPhoto(photo.uri));
        }
      }
      setCaptureMode(null);
    } catch (error) {
      console.error('Failed to capture photo:', error);
    }
  }, [captureMode, dispatch]);

  const cancelCapture = useCallback(() => {
    setCaptureMode(null);
  }, []);

  const canProceed = verification.nationalId && verification.passport;

  const handleNext = useCallback(() => {
    if (canProceed) {
      router.push('/(auth)/verify-face');
    }
  }, [canProceed, router]);

  return {
    verification,
    captureMode,
    cameraRef,
    permission,
    startCapture,
    capturePhoto,
    cancelCapture,
    canProceed,
    handleNext,
  };
}
