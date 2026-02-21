import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  Text,
  TouchableOpacityProps,
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
}

const variantClasses: Record<ButtonVariant, { button: string; text: string }> = {
  primary: {
    button: 'bg-primary-500 active:bg-primary-600',
    text: 'text-white font-semibold',
  },
  secondary: {
    button: 'bg-navy-500 active:bg-navy-600',
    text: 'text-white font-semibold',
  },
  outline: {
    button: 'border-2 border-primary-500 bg-transparent active:bg-primary-50',
    text: 'text-primary-500 font-semibold',
  },
  ghost: {
    button: 'bg-transparent active:bg-gray-100 dark:active:bg-gray-800',
    text: 'text-primary-500 font-medium',
  },
  danger: {
    button: 'bg-danger-500 active:bg-red-700',
    text: 'text-white font-semibold',
  },
};

const sizeClasses: Record<ButtonSize, { button: string; text: string }> = {
  sm: { button: 'px-4 py-2 rounded-lg', text: 'text-sm' },
  md: { button: 'px-6 py-3 rounded-xl', text: 'text-base' },
  lg: { button: 'px-8 py-4 rounded-xl', text: 'text-lg' },
};

export function BaseButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  children,
  disabled,
  className = '',
  textClassName = '',
  ...rest
}: BaseButtonProps) {
  const variantStyle = variantClasses[variant];
  const sizeStyle = sizeClasses[size];

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center ${sizeStyle.button} ${variantStyle.button} ${fullWidth ? 'w-full' : ''} ${disabled || loading ? 'opacity-50' : ''} ${className}`}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? '#0A7EA4' : '#fff'}
          size="small"
        />
      ) : typeof children === 'string' ? (
        <Text
          className={`${sizeStyle.text} ${variantStyle.text} ${textClassName}`}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}
