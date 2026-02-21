import React from 'react';
import { View, Text } from 'react-native';

type BadgeVariant = 'draft' | 'active' | 'pending' | 'signed' | 'expired' |
  'accepted' | 'rejected' | 'counter' | 'info';

interface BaseBadgeProps {
  variant: BadgeVariant;
  label: string;
  className?: string;
}

const variantClasses: Record<BadgeVariant, { bg: string; text: string }> = {
  draft: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-400' },
  active: { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-700 dark:text-blue-300' },
  pending: { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-700 dark:text-yellow-300' },
  signed: { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-700 dark:text-green-300' },
  expired: { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-700 dark:text-red-300' },
  accepted: { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-700 dark:text-green-300' },
  rejected: { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-700 dark:text-red-300' },
  counter: { bg: 'bg-orange-100 dark:bg-orange-900', text: 'text-orange-700 dark:text-orange-300' },
  info: { bg: 'bg-primary-100 dark:bg-primary-900', text: 'text-primary-700 dark:text-primary-300' },
};

export function BaseBadge({ variant, label, className = '' }: BaseBadgeProps) {
  const style = variantClasses[variant];

  return (
    <View className={`rounded-full px-3 py-1 ${style.bg} ${className}`}>
      <Text className={`text-xs font-semibold ${style.text}`}>{label}</Text>
    </View>
  );
}
