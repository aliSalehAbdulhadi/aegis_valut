import { signContract } from '@/features/contracts/store/contracts-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

export function useSignContract(contractId: string) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const contract = useAppSelector((state) =>
    state.contracts.contracts.find((c) => c.id === contractId),
  );

  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [isSigning, setIsSigning] = useState(false);

  const handleSignature = useCallback((data: string) => {
    setSignatureData(data);
  }, []);

  const clearSignature = useCallback(() => {
    setSignatureData(null);
  }, []);

  const handleConfirmSign = useCallback(() => {
    if (!signatureData) return;

    setIsSigning(true);

    // Simulate API call to submit signature
    setTimeout(() => {
      dispatch(signContract(contractId));
      setIsSigning(false);

      Alert.alert(t('sign.successTitle'), t('sign.successMessage'), [
        {
          text: t('common.done'),
          onPress: () => router.back(),
        },
      ]);
    }, 1500);
  }, [signatureData, contractId, dispatch, router, t]);

  return {
    contract,
    signatureData,
    isSigning,
    handleSignature,
    clearSignature,
    handleConfirmSign,
  };
}
