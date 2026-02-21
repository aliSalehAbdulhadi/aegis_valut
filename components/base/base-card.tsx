import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface BaseCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

export function BaseCard({ children, onPress, className = '' }: BaseCardProps) {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      className={`rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-900 ${className}`}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      {children}
    </Wrapper>
  );
}
