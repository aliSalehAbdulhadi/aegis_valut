import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Check, Clock, Circle } from 'lucide-react-native';
import { formatShortDate } from '@/utils/format-date';
import type { Draft, DraftStatus } from '@/types/global';

interface DraftTimelineProps {
  drafts: Array<
    Draft & {
      displayTitle: string;
      displayDescription: string;
    }
  >;
}

function StatusIcon({ status }: { status: DraftStatus }) {
  switch (status) {
    case 'completed':
      return (
        <View className="h-8 w-8 items-center justify-center rounded-full bg-green-500">
          <Check size={16} color="#fff" />
        </View>
      );
    case 'current':
      return (
        <View className="h-8 w-8 items-center justify-center rounded-full bg-primary-500">
          <Clock size={16} color="#fff" />
        </View>
      );
    case 'pending':
      return (
        <View className="h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600">
          <Circle size={12} color="#9CA3AF" />
        </View>
      );
  }
}

export function DraftTimeline({ drafts }: DraftTimelineProps) {
  const { t } = useTranslation();

  return (
    <View>
      <Text className="mb-4 text-base font-semibold text-gray-900 dark:text-gray-100">
        {t('contract.timeline')}
      </Text>

      {drafts.map((draft, index) => (
        <View key={draft.id} className="flex-row">
          {/* Timeline line + icon */}
          <View className="items-center">
            <StatusIcon status={draft.status} />
            {index < drafts.length - 1 && (
              <View
                className={`w-0.5 flex-1 ${
                  draft.status === 'completed'
                    ? 'bg-green-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
                style={{ minHeight: 40 }}
              />
            )}
          </View>

          {/* Content */}
          <View className="ml-4 flex-1 pb-6">
            <View className="flex-row items-center justify-between">
              <Text
                className={`text-sm font-semibold ${
                  draft.status === 'pending'
                    ? 'text-gray-400 dark:text-gray-500'
                    : 'text-gray-900 dark:text-gray-100'
                }`}
              >
                {draft.displayTitle}
              </Text>
              {draft.date ? (
                <Text className="text-xs text-gray-400">
                  {formatShortDate(draft.date)}
                </Text>
              ) : null}
            </View>

            <Text
              className={`mt-1 text-sm ${
                draft.status === 'pending'
                  ? 'text-gray-400 dark:text-gray-500'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              numberOfLines={2}
            >
              {draft.displayDescription}
            </Text>

            {draft.author ? (
              <Text className="mt-1 text-xs text-gray-400">
                {draft.author}
              </Text>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
}
