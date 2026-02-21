import React from 'react';
import { View, Text } from 'react-native';
import { useAppTheme } from '@/hooks/use-app-theme';

interface BaseAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: { container: 'h-8 w-8', text: 'text-xs' },
  md: { container: 'h-10 w-10', text: 'text-sm' },
  lg: { container: 'h-14 w-14', text: 'text-lg' },
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_COLORS = [
  'bg-primary-500',
  'bg-navy-400',
  'bg-gold-500',
  'bg-green-600',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
];

function getColorForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function BaseAvatar({ name, size = 'md', className = '' }: BaseAvatarProps) {
  const s = sizeClasses[size];
  const bg = getColorForName(name);

  return (
    <View
      className={`${s.container} items-center justify-center rounded-full ${bg} ${className}`}
    >
      <Text className={`${s.text} font-bold text-white`}>
        {getInitials(name)}
      </Text>
    </View>
  );
}
