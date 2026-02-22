import { BaseScreen } from '@/components/base/base-screen';
import { Header } from '@/components/layout/header';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Dimensions, Text, View } from 'react-native';
import Pdf from 'react-native-pdf';

export default function PdfViewerScreen() {
  const { url, title } = useLocalSearchParams<{
    url: string;
    title?: string;
  }>();
  const { t } = useTranslation();
  const { colors } = useAppTheme();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);

  const screenWidth = Dimensions.get('window').width;

  return (
    <BaseScreen scroll={false} padded={false}>
      <Header title={title ?? t('pdf.title')} showBack />

      {totalPages > 0 && (
        <View className='flex-row items-center justify-center bg-gray-100 py-2 dark:bg-gray-800'>
          <Text className='text-xs text-gray-500 dark:text-gray-400'>
            {t('pdf.page')} {currentPage} / {totalPages}
          </Text>
        </View>
      )}

      {error ? (
        <View className='flex-1 items-center justify-center px-4'>
          <Text className='text-center text-base text-gray-500 dark:text-gray-400'>
            {t('pdf.loadError')}
          </Text>
        </View>
      ) : (
        <Pdf
          source={{ uri: url ?? '', cache: true }}
          style={{ flex: 1, width: screenWidth }}
          trustAllCerts={false}
          onLoadComplete={(numberOfPages) => {
            setTotalPages(numberOfPages);
          }}
          onPageChanged={(page) => {
            setCurrentPage(page);
          }}
          onError={(err) => {
            console.error('PDF load error:', err);
            setError(true);
          }}
          renderActivityIndicator={() => (
            <ActivityIndicator size='large' color={colors.primary} />
          )}
        />
      )}
    </BaseScreen>
  );
}
