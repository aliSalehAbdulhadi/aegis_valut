import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BaseBadge } from '@/components/base/base-badge';
import { BaseAvatar } from '@/components/base/base-avatar';
import { formatDate } from '@/utils/format-date';
import type { ProposalMessage, ProposalStatus } from '@/types/global';

interface ProposalMessageCardProps {
  message: ProposalMessage & {
    displayTitle: string;
    displayBody: string;
  };
}

export function ProposalMessageCard({ message }: ProposalMessageCardProps) {
  const { t } = useTranslation();

  return (
    <View
      className="mb-4 rounded-2xl bg-white p-4 dark:bg-gray-900"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 1,
      }}
    >
      {/* Header: Step + Status */}
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="mr-2 h-7 w-7 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
            <Text className="text-xs font-bold text-primary-600 dark:text-primary-300">
              {message.stepNumber}
            </Text>
          </View>
          <Text className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {t('chat.step')} {message.stepNumber}
          </Text>
        </View>
        <BaseBadge
          variant={message.status as ProposalStatus}
          label={t(`chat.status.${message.status}`)}
        />
      </View>

      {/* Title */}
      <Text className="mb-2 text-base font-semibold text-gray-900 dark:text-gray-100">
        {message.displayTitle}
      </Text>

      {/* Body */}
      <Text className="mb-3 text-sm leading-5 text-gray-600 dark:text-gray-400">
        {message.displayBody}
      </Text>

      {/* Footer: Sender + Date */}
      <View className="flex-row items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
        <View className="flex-row items-center">
          <BaseAvatar name={message.sender.name} size="sm" />
          <View className="ml-2">
            <Text className="text-xs font-medium text-gray-900 dark:text-gray-100">
              {message.sender.name}
            </Text>
            <Text className="text-xs text-gray-400">
              {message.sender.company}
            </Text>
          </View>
        </View>
        <Text className="text-xs text-gray-400">
          {formatDate(message.date)}
        </Text>
      </View>
    </View>
  );
}
