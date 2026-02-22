import { BaseButton } from '@/components/base/base-button';
import { BaseScreen } from '@/components/base/base-screen';
import { LoadingOverlay } from '@/components/feedback/loading-overlay';
import { Header } from '@/components/layout/header';
import { SignatureCanvasComponent } from '@/features/auth/components/signature-canvas';
import { useSignContract } from '@/features/contracts/hooks/use-sign-contract';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useLocalSearchParams } from 'expo-router';
import { CheckCircle } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Dimensions, Text, View } from 'react-native';
import Pdf from 'react-native-pdf';

export default function SignContractScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { colors } = useAppTheme();
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const {
    contract,
    signatureData,
    isSigning,
    handleSignature,
    clearSignature,
    handleConfirmSign,
  } = useSignContract(id ?? '');

  const screenWidth = Dimensions.get('window').width;

  const handleSignatureStart = useCallback(() => setScrollEnabled(false), []);
  const handleSignatureEnd = useCallback(() => setScrollEnabled(true), []);

  return (
    <BaseScreen scrollEnabled={scrollEnabled}>
      <Header title={t('sign.title')} showBack />

      <View className='px-2 pt-2'>
        {/* Contract Info Banner */}
        <View className='mb-4 rounded-xl bg-navy-50 p-4 dark:bg-navy-900'>
          <Text className='text-sm font-semibold text-navy-800 dark:text-navy-200'>
            {contract?.title ?? ''}
          </Text>
          <Text className='mt-1 text-xs text-navy-600 dark:text-navy-400'>
            {contract?.companyName} • {contract?.type}
          </Text>
        </View>

        {/* PDF Preview */}
        {contract?.pdfUrl && (
          <View className='mb-4 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700'>
            <View className='bg-gray-50 px-3 py-2 dark:bg-gray-800'>
              <Text className='text-xs font-medium text-gray-500 dark:text-gray-400'>
                {t('sign.document')}
              </Text>
            </View>
            <View style={{ height: 300 }}>
              <Pdf
                source={{ uri: contract.pdfUrl, cache: true }}
                style={{ flex: 1, width: screenWidth - 36 }}
                trustAllCerts={false}
                renderActivityIndicator={() => (
                  <ActivityIndicator size='small' color={colors.primary} />
                )}
              />
            </View>
          </View>
        )}

        {/* Signature Section */}
        {signatureData ? (
          <View className='mb-4 items-center rounded-xl bg-green-50 p-4 dark:bg-green-900/20'>
            <CheckCircle size={32} color={colors.success} />
            <Text className='mt-2 text-sm font-semibold text-green-700 dark:text-green-300'>
              {t('sign.signatureCaptured')}
            </Text>
            <BaseButton
              variant='ghost'
              size='sm'
              onPress={clearSignature}
              className='mt-2'
            >
              {t('sign.redraw')}
            </BaseButton>
          </View>
        ) : (
          <SignatureCanvasComponent
            title={t('sign.signatureTitle')}
            description={t('sign.signatureDesc')}
            clearLabel={t('sign.clear')}
            onSignature={handleSignature}
            onTouchStart={handleSignatureStart}
            onTouchEnd={handleSignatureEnd}
          />
        )}

        {/* Confirm Button */}
        <BaseButton
          variant='primary'
          size='lg'
          fullWidth
          onPress={handleConfirmSign}
          disabled={!signatureData}
          className='mt-4 mb-8'
        >
          {t('sign.confirmSign')}
        </BaseButton>
      </View>

      {isSigning && <LoadingOverlay />}
    </BaseScreen>
  );
}
