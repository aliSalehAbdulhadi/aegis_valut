import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useRTL } from '@/hooks/use-rtl';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  className?: string;
}

export function Header({
  title,
  showBack = false,
  rightAction,
  className = '',
}: HeaderProps) {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { isRTL } = useRTL();
  const BackIcon = isRTL ? ChevronRight : ChevronLeft;

  return (
    <View
      className={`flex-row items-center justify-between px-4 py-3 ${className}`}
    >
      <View className="w-10">
        {showBack && (
          <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
            <BackIcon size={28} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
      <Text
        className="flex-1 text-center text-lg font-bold text-gray-900 dark:text-gray-100"
        numberOfLines={1}
      >
        {title}
      </Text>
      <View className="w-10 items-end">{rightAction}</View>
    </View>
  );
}
