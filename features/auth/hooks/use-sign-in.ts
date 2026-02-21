import { useState, useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { loginWithMock, setSignature } from '@/features/auth/store/auth-slice';
import { useRouter } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

export function useSignIn() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSignIn = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      dispatch(loginWithMock());
      setLoading(false);
      router.replace('/(main)/(tabs)');
    }, 1000);
  }, [email, password, dispatch, router]);

  const handleBiometricAuth = useCallback(async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert('Error', 'Biometric authentication not available on this device');
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert('Error', 'No biometric credentials enrolled');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Sign in to AEGIS VAULT',
        fallbackLabel: 'Use password',
        cancelLabel: 'Cancel',
      });

      if (result.success) {
        dispatch(loginWithMock());
        router.replace('/(main)/(tabs)');
      }
    } catch (error) {
      Alert.alert('Error', 'Biometric authentication failed');
    }
  }, [dispatch, router]);

  const handleSignatureCapture = useCallback(
    (signatureData: string) => {
      dispatch(setSignature(signatureData));
    },
    [dispatch]
  );

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    errors,
    handleSignIn,
    handleBiometricAuth,
    handleSignatureCapture,
  };
}
