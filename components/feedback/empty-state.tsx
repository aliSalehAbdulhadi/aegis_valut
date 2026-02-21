import React from 'react';
import { View, Text } from 'react-native';
import { FileX, type LucideIcon } from 'lucide-react-native';
import { useAppTheme } from '@/hooks/use-app-theme';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function EmptyState({
  icon: Icon = FileX,
  title,
  description,
  children,
}: EmptyStateProps) {
  const { colors } = useAppTheme();

  return (
    <View className="flex-1 items-center justify-center px-8 py-16">
      <Icon size={64} color={colors.textSecondary} />
      <Text className="mt-4 text-center text-lg font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </Text>
      {description && (
        <Text className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          {description}
        </Text>
      )}
      {children && <View className="mt-6">{children}</View>}
    </View>
  );
}
