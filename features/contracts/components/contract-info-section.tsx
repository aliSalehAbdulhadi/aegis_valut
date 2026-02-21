import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Building2, Calendar, Users, FileText, DollarSign } from 'lucide-react-native';
import { BaseBadge } from '@/components/base/base-badge';
import { BaseAvatar } from '@/components/base/base-avatar';
import { useAppTheme } from '@/hooks/use-app-theme';
import { formatDate } from '@/utils/format-date';
import type { Contract, InvolvedParty } from '@/types/global';

interface ContractInfoSectionProps {
  contract: Contract & {
    displayTitle: string;
    displayDescription: string;
  };
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  const { colors } = useAppTheme();
  return (
    <View className="mb-3 flex-row items-center">
      <Icon size={18} color={colors.textSecondary} />
      <Text className="ml-3 w-24 text-sm text-gray-500 dark:text-gray-400">
        {label}
      </Text>
      <Text className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">
        {value}
      </Text>
    </View>
  );
}

export function ContractInfoSection({ contract }: ContractInfoSectionProps) {
  const { t } = useTranslation();

  return (
    <View>
      {/* Description */}
      <Text className="mb-4 text-sm leading-5 text-gray-600 dark:text-gray-400">
        {contract.displayDescription}
      </Text>

      {/* Info Grid */}
      <View className="mb-4 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
        <InfoRow
          icon={FileText}
          label={t('contract.type')}
          value={contract.type}
        />
        <InfoRow
          icon={Building2}
          label={t('contract.company')}
          value={contract.companyName}
        />
        <InfoRow
          icon={Calendar}
          label={t('contract.startDate')}
          value={formatDate(contract.startDate)}
        />
        <InfoRow
          icon={Calendar}
          label={t('contract.endDate')}
          value={formatDate(contract.endDate)}
        />
        {contract.value && contract.value !== 'N/A' && (
          <InfoRow
            icon={DollarSign}
            label={t('contract.value')}
            value={`${contract.value} ${contract.currency}`}
          />
        )}
      </View>

      {/* Status */}
      <View className="mb-4 flex-row items-center">
        <Text className="mr-3 text-sm text-gray-500 dark:text-gray-400">
          {t('contract.status')}:
        </Text>
        <BaseBadge
          variant={contract.status}
          label={t(`contract.statusLabels.${contract.status}`)}
        />
      </View>

      {/* Involved Parties */}
      <Text className="mb-3 text-base font-semibold text-gray-900 dark:text-gray-100">
        {t('contract.involvedParties')}
      </Text>
      <View className="mb-4">
        {contract.involvedParties.map((party: InvolvedParty) => (
          <View key={party.id} className="mb-2 flex-row items-center">
            <BaseAvatar name={party.name} size="sm" />
            <View className="ml-3">
              <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {party.name}
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">
                {party.role} • {party.company}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
