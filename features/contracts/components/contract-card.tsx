import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Building2 } from 'lucide-react-native';
import { BaseBadge } from '@/components/base/base-badge';
import { useAppTheme } from '@/hooks/use-app-theme';
import { formatShortDate } from '@/utils/format-date';
import type { Contract, ContractStatus } from '@/types/global';

interface ContractCardProps {
  contract: Contract;
  onPress: () => void;
}

const COMPANY_COLORS: Record<string, string> = {
  facebook: 'bg-blue-500',
  google: 'bg-red-500',
  government: 'bg-green-700',
  samsung: 'bg-indigo-600',
};

export function ContractCard({ contract, onPress }: ContractCardProps) {
  const { t, i18n } = useTranslation();
  const { colors } = useAppTheme();
  const isArabic = i18n.language === 'ar';
  const title = isArabic ? contract.titleAr : contract.title;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="mb-3 rounded-2xl bg-white p-4 dark:bg-gray-900"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <View className="flex-row items-center">
        {/* Company Icon */}
        <View
          className={`h-12 w-12 items-center justify-center rounded-xl ${
            COMPANY_COLORS[contract.companyLogo] ?? 'bg-gray-500'
          }`}
        >
          <Building2 size={24} color="#fff" />
        </View>

        {/* Info */}
        <View className="ml-3 flex-1">
          <Text
            className="text-base font-semibold text-gray-900 dark:text-gray-100"
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            {contract.companyName}
          </Text>
        </View>

        <ChevronRight size={20} color={colors.textSecondary} />
      </View>

      {/* Bottom row: badges + date */}
      <View className="mt-3 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <BaseBadge
            variant={contract.status}
            label={t(`contract.statusLabels.${contract.status}`)}
          />
          <BaseBadge variant="info" label={contract.type} />
        </View>
        <Text className="text-xs text-gray-400">
          {formatShortDate(contract.startDate)}
        </Text>
      </View>

      {/* Draft count */}
      <View className="mt-2 flex-row items-center">
        <Text className="text-xs text-gray-400">
          {contract.drafts.length} {t('contract.drafts')}
        </Text>
        <Text className="mx-2 text-gray-300">•</Text>
        <Text className="text-xs text-gray-400">
          {contract.involvedParties.length} {t('contract.involvedParties')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
