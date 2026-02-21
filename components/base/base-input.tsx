import React, { useState } from 'react';
import { View, TextInput, Text, TextInputProps, TouchableOpacity } from 'react-native';
import { Eye, EyeOff, type LucideIcon } from 'lucide-react-native';
import { useAppTheme } from '@/hooks/use-app-theme';

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
        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
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
            style={{ marginRight: 12 }}
          />
        )}
        <TextInput
          className="flex-1 text-base text-gray-900 dark:text-gray-100"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={secureEntry}
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
      {error && (
        <Text className="mt-1 text-xs text-red-500">{error}</Text>
      )}
    </View>
  );
}
