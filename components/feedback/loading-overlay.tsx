import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message }: LoadingOverlayProps) {
  return (
    <View className="absolute inset-0 z-50 items-center justify-center bg-black/30">
      <View className="items-center rounded-2xl bg-white px-8 py-6 dark:bg-gray-900">
        <ActivityIndicator size="large" color="#0A7EA4" />
        {message && (
          <Text className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            {message}
          </Text>
        )}
      </View>
    </View>
  );
}
