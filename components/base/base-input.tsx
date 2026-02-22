import { useAppTheme } from '@/hooks/use-app-theme';
import { Eye, EyeOff, type LucideIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  I18nManager,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

interface BaseInputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  isPassword?: boolean;
  className?: string;
}

export function BaseInput({
  label,
  error,
  icon: Icon,
  isPassword = false,
  className = '',
  ...rest
}: BaseInputProps) {
  const [secureEntry, setSecureEntry] = useState(isPassword);
  const { colors } = useAppTheme();

  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text
          className='mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'
          style={{ textAlign: I18nManager.isRTL ? 'right' : 'left' }}
        >
          {label}
        </Text>
      )}
      <View
        className={`flex-row items-center rounded-xl border px-4 py-3 ${
          error
            ? 'border-red-500 bg-red-50 dark:bg-red-950'
            : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900'
        }`}
      >
        {Icon && (
          <Icon
            size={20}
            color={error ? '#F44336' : colors.icon}
            style={I18nManager.isRTL ? { marginLeft: 12 } : { marginRight: 12 }}
          />
        )}
        <TextInput
          className='flex-1 text-base text-gray-900 dark:text-gray-100'
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={secureEntry}
          style={{ textAlign: I18nManager.isRTL ? 'right' : 'left' }}
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
            {secureEntry ? (
              <EyeOff size={20} color={colors.icon} />
            ) : (
              <Eye size={20} color={colors.icon} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className='mt-1 text-xs text-red-500'>{error}</Text>}
    </View>
  );
}
