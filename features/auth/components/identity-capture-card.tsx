import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera, Check } from 'lucide-react-native';
import { useAppTheme } from '@/hooks/use-app-theme';

interface IdentityCaptureCardProps {
  title: string;
  description: string;
  captured: boolean;
  photoUri?: string | null;
  onCapture: () => void;
}

export function IdentityCaptureCard({
  title,
  description,
  captured,
  photoUri,
  onCapture,
}: IdentityCaptureCardProps) {
  const { colors } = useAppTheme();

  return (
    <View className="mb-4 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      {captured && photoUri ? (
        <View className="relative">
          <Image
            source={{ uri: photoUri }}
            className="h-36 w-full"
            resizeMode="cover"
          />
          <View className="absolute right-2 top-2 rounded-full bg-green-500 p-1">
            <Check size={16} color="#fff" />
          </View>
        </View>
      ) : (
        <View className="h-36 items-center justify-center bg-gray-50 dark:bg-gray-800">
          <Camera size={40} color={colors.textSecondary} />
        </View>
      )}
      <View className="p-4">
        <Text className="text-base font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </Text>
        <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </Text>
        <TouchableOpacity
          onPress={onCapture}
          className={`mt-3 items-center rounded-xl py-2.5 ${
            captured ? 'bg-green-100 dark:bg-green-900' : 'bg-primary-500'
          }`}
          disabled={captured}
        >
          <Text
            className={`text-sm font-semibold ${
              captured
                ? 'text-green-700 dark:text-green-300'
                : 'text-white'
            }`}
          >
            {captured ? '✓ Captured' : 'Capture Photo'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
