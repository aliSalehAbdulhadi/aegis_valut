import React from 'react';
import { type LucideIcon } from 'lucide-react-native';
import { useAppTheme } from '@/hooks/use-app-theme';

interface BaseIconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  className?: string;
}

export function BaseIcon({ icon: Icon, size = 24, color, className }: BaseIconProps) {
  const { colors } = useAppTheme();
  return <Icon size={size} color={color ?? colors.icon} />;
}
