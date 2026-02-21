import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera, Check, AlertCircle } from 'lucide-react-native';
import { CameraView } from 'expo-camera';
import { useAppTheme } from '@/hooks/use-app-theme';

interface FaceCaptureCircleProps {
  cameraActive: boolean;
  captured: boolean;
  photoUri?: string | null;
  error?: string | null;
  cameraRef: React.RefObject<CameraView | null>;
  onStartCamera: () => void;
  onCapture: () => void;
}

export function FaceCaptureCircle({
  cameraActive,
  captured,
  photoUri,
  error,
  cameraRef,
  onStartCamera,
  onCapture,
}: FaceCaptureCircleProps) {
  const { colors } = useAppTheme();

  return (
    <View className="items-center">
      {/* Circular frame */}
      <View className="h-64 w-64 items-center justify-center overflow-hidden rounded-full border-4 border-primary-500">
        {cameraActive ? (
          <CameraView
            ref={cameraRef}
            facing="front"
            style={{ width: 256, height: 256 }}
          />
        ) : captured && photoUri ? (
          <Image
            source={{ uri: photoUri }}
            style={{ width: 256, height: 256 }}
            resizeMode="cover"
          />
        ) : (
          <View className="h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
            <Camera size={48} color={colors.textSecondary} />
          </View>
        )}
      </View>

      {/* Status indicator */}
      {captured && (
        <View className="mt-4 flex-row items-center">
          <Check size={20} color="#4CAF50" />
          <Text className="ml-2 text-sm font-medium text-green-600">
            Face verified successfully
          </Text>
        </View>
      )}

      {error && (
        <View className="mt-4 flex-row items-center">
          <AlertCircle size={20} color="#F44336" />
          <Text className="ml-2 text-sm font-medium text-red-500">{error}</Text>
        </View>
      )}

      {/* Capture / Start button */}
      <TouchableOpacity
        onPress={cameraActive ? onCapture : onStartCamera}
        className={`mt-6 items-center rounded-full px-8 py-3 ${
          captured ? 'bg-green-500' : 'bg-primary-500'
        }`}
        disabled={captured}
      >
        <Text className="text-base font-semibold text-white">
          {captured
            ? '✓ Verified'
            : cameraActive
              ? 'Capture'
              : 'Start Camera'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
