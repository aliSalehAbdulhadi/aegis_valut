import React from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Search, Shield } from 'lucide-react-native';
import { BaseScreen } from '@/components/base/base-screen';
import { BaseAvatar } from '@/components/base/base-avatar';
import { EmptyState } from '@/components/feedback/empty-state';
import { ContractCard } from '@/features/contracts/components/contract-card';
import { useContracts } from '@/features/contracts/hooks/use-contracts';
import { useAppSelector } from '@/store/hooks';
import { useAppTheme } from '@/hooks/use-app-theme';
import type { Contract } from '@/types/global';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useAppTheme();
  const { contracts, searchQuery, handleSearch } = useContracts();
  const user = useAppSelector((state) => state.auth.user);

  const handleContractPress = (contract: Contract) => {
    router.push(`/(main)/contract/${contract.id}`);
  };

  return (
    <BaseScreen scroll={false} padded={false}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pb-2 pt-4">
        <View className="flex-row items-center">
          <Shield size={28} color="#D4A017" />
          <Text className="ml-2 text-xl font-bold text-gray-900 dark:text-gray-100">
            AEGIS VAULT
          </Text>
        </View>
        <BaseAvatar name={user?.fullName ?? 'U'} size="md" />
      </View>

      {/* Search */}
      <View className="px-5 py-2">
        <View className="flex-row items-center rounded-xl bg-gray-100 px-4 py-2.5 dark:bg-gray-800">
          <Search size={18} color={colors.textSecondary} />
          <TextInput
            className="ml-3 flex-1 text-base text-gray-900 dark:text-gray-100"
            placeholder={t('home.search')}
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {/* Contracts List */}
      <FlatList
        data={contracts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <ContractCard
            contract={item}
            onPress={() => handleContractPress(item)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title={t('home.empty')}
            description={t('home.emptyDesc')}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </BaseScreen>
  );
}
