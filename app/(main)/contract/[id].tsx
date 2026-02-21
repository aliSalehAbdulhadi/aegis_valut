import React from 'react';
import { View, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MessageSquare } from 'lucide-react-native';
import { BaseScreen } from '@/components/base/base-screen';
import { BaseButton } from '@/components/base/base-button';
import { BaseText } from '@/components/base/base-text';
import { Header } from '@/components/layout/header';
import { ContractInfoSection } from '@/features/contracts/components/contract-info-section';
import { DraftTimeline } from '@/features/contracts/components/draft-timeline';
import { useContractDetail } from '@/features/contracts/hooks/use-contract-detail';

export default function ContractDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const { contract } = useContractDetail(id);

  if (!contract) {
    return (
      <BaseScreen>
        <Header title={t('contract.details')} showBack />
        <View className="flex-1 items-center justify-center">
          <BaseText variant="body">Contract not found</BaseText>
        </View>
      </BaseScreen>
    );
  }

  return (
    <BaseScreen>
      <Header title={contract.displayTitle} showBack />

      <View className="px-2 pt-2">
        <ContractInfoSection contract={contract} />

        <View className="my-4 h-px bg-gray-200 dark:bg-gray-700" />

        <DraftTimeline drafts={contract.localizedDrafts} />

        <View className="mt-4 pb-8">
          <BaseButton
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => router.push(`/(main)/contract/${id}/chat`)}
          >
            <View className="flex-row items-center">
              <MessageSquare size={20} color="#fff" />
              <BaseText
                variant="body"
                className="ml-2 font-semibold text-white"
              >
                {t('contract.viewChat')}
              </BaseText>
            </View>
          </BaseButton>
        </View>
      </View>
    </BaseScreen>
  );
}
