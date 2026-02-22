import { BaseAvatar } from '@/components/base/base-avatar';
import { BaseBadge } from '@/components/base/base-badge';
import { useAppTheme } from '@/hooks/use-app-theme';
import type { ProposalMessage, ProposalStatus } from '@/types/global';
import { formatDate } from '@/utils/format-date';
import { useRouter } from 'expo-router';
import { FileText, PenTool } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

interface ProposalMessageCardProps {
  message: ProposalMessage & {
    displayTitle: string;
    displayBody: string;
  };
}

export function ProposalMessageCard({ message }: ProposalMessageCardProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { colors } = useAppTheme();

  const hasPdf = !!message.pdfUrl;

  return (
    <View
      className='mb-4 rounded-2xl bg-white p-4 dark:bg-gray-900'
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 1,
      }}
    >
      {/* Header: Step + Status */}
      <View className='mb-3 flex-row items-center justify-between'>
        <View className='flex-row items-center'>
          <View className='mr-2 h-7 w-7 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900'>
            <Text className='text-xs font-bold text-primary-600 dark:text-primary-300'>
              {message.stepNumber}
            </Text>
          </View>
          <Text className='text-sm font-semibold text-gray-900 dark:text-gray-100'>
            {t('chat.step')} {message.stepNumber}
          </Text>
        </View>
        <BaseBadge
          variant={message.status as ProposalStatus}
          label={t(`chat.status.${message.status}`)}
        />
      </View>

      {/* Title */}
      <Text className='mb-2 text-base font-semibold text-gray-900 dark:text-gray-100'>
        {message.displayTitle}
      </Text>

      {/* Body */}
      <Text className='mb-3 text-sm leading-5 text-gray-600 dark:text-gray-400'>
        {message.displayBody}
      </Text>

      {/* PDF & Sign Actions */}
      {hasPdf && (
        <View className='mb-3 flex-row gap-2'>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/(main)/contract/[id]/pdf',
                params: {
                  id: message.contractId,
                  url: message.pdfUrl!,
                  title: message.displayTitle,
                },
              })
            }
            className='flex-1 flex-row items-center justify-center rounded-lg bg-primary-50 px-3 py-2.5 dark:bg-primary-900/30'
          >
            <FileText size={16} color={colors.primary} />
            <Text className='ml-2 text-sm font-semibold text-primary-600 dark:text-primary-300'>
              {t('chat.viewPdf')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/(main)/contract/[id]/sign',
                params: { id: message.contractId },
              })
            }
            className='flex-1 flex-row items-center justify-center rounded-lg bg-gold-50 px-3 py-2.5 dark:bg-gold-900/30'
          >
            <PenTool size={16} color={colors.gold} />
            <Text className='ml-2 text-sm font-semibold text-gold-700 dark:text-gold-300'>
              {t('chat.signContract')}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Footer: Sender + Date */}
      <View className='flex-row items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800'>
        <View className='flex-row items-center'>
          <BaseAvatar name={message.sender.name} size='sm' />
          <View className='ml-2'>
            <Text className='text-xs font-medium text-gray-900 dark:text-gray-100'>
              {message.sender.name}
            </Text>
            <Text className='text-xs text-gray-400'>
              {message.sender.company}
            </Text>
          </View>
        </View>
        <Text className='text-xs text-gray-400'>
          {formatDate(message.date)}
        </Text>
      </View>
    </View>
  );
}
