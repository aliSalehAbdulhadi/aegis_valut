import React, { useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';
import { useAppTheme } from '@/hooks/use-app-theme';

interface SignatureCanvasComponentProps {
  title: string;
  description: string;
  clearLabel: string;
  onSignature: (data: string) => void;
}

export function SignatureCanvasComponent({
  title,
  description,
  clearLabel,
  onSignature,
}: SignatureCanvasComponentProps) {
  const signatureRef = useRef<any>(null);
  const { colors, isDark } = useAppTheme();

  const handleClear = useCallback(() => {
    signatureRef.current?.clearSignature();
  }, []);

  const handleEnd = useCallback(() => {
    signatureRef.current?.readSignature();
  }, []);

  const handleOK = useCallback(
    (signature: string) => {
      onSignature(signature);
    },
    [onSignature]
  );

  return (
    <View className="mt-4">
      <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </Text>
      <Text className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </Text>
      <View className="h-48 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
        <SignatureCanvas
          ref={signatureRef}
          onEnd={handleEnd}
          onOK={handleOK}
          webStyle={`
            .m-signature-pad { box-shadow: none; border: none; }
            .m-signature-pad--body { border: none; }
            .m-signature-pad--footer { display: none; }
            body, html { background-color: ${isDark ? '#1E2022' : '#F9FAFB'}; }
          `}
          backgroundColor={isDark ? '#1E2022' : '#F9FAFB'}
          penColor={isDark ? '#ECEDEE' : '#11181C'}
        />
      </View>
      <TouchableOpacity
        onPress={handleClear}
        className="mt-2 self-end rounded-lg px-4 py-2"
      >
        <Text className="text-sm font-medium text-primary-500">{clearLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
