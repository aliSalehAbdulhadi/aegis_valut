import { useState, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFacePhoto, completeRegistration } from '@/features/auth/store/auth-slice';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';

export function useFaceVerification() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const verification = useAppSelector(
    (state) => state.auth.verificationStatus
  );
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraActive, setCameraActive] = useState(false);
  const [captureError, setCaptureError] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  const startCamera = useCallback(async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) return;
    }
    setCameraActive(true);
    setCaptureError(null);
  }, [permission, requestPermission]);

  const capturePhoto = useCallback(async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: false,
      });

      if (photo?.uri) {
        dispatch(setFacePhoto(photo.uri));
        setCameraActive(false);
        setCaptureError(null);
      }
    } catch (error) {
      setCaptureError('Failed to capture photo. Please try again.');
    }
  }, [dispatch]);

  const handleCompleteRegistration = useCallback(() => {
    if (verification.face) {
      dispatch(completeRegistration());
      router.push('/(auth)/success');
    }
  }, [verification.face, dispatch, router]);

  return {
    verification,
    cameraActive,
    cameraRef,
    permission,
    captureError,
    startCamera,
    capturePhoto,
    handleCompleteRegistration,
  };
}
