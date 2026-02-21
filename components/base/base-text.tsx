import React from 'react';
import { Text, TextProps } from 'react-native';

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'subtitle'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label';

interface BaseTextProps extends TextProps {
  variant?: TextVariant;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<TextVariant, string> = {
  h1: 'text-3xl font-bold text-gray-900 dark:text-gray-100',
  h2: 'text-2xl font-bold text-gray-900 dark:text-gray-100',
  h3: 'text-xl font-semibold text-gray-900 dark:text-gray-100',
  subtitle: 'text-lg text-gray-600 dark:text-gray-400',
  body: 'text-base text-gray-800 dark:text-gray-200',
  bodySmall: 'text-sm text-gray-700 dark:text-gray-300',
  caption: 'text-xs text-gray-500 dark:text-gray-500',
  label: 'text-sm font-medium text-gray-700 dark:text-gray-300',
};

export function BaseText({
  variant = 'body',
  className = '',
  children,
  ...rest
}: BaseTextProps) {
  return (
    <Text className={`${variantClasses[variant]} ${className}`} {...rest}>
      {children}
    </Text>
  );
}
