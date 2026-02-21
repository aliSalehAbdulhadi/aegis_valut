import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Send } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@/hooks/use-app-theme';

interface ProposalComposerProps {
  onSend: (title: string, body: string) => void;
}

export function ProposalComposer({ onSend }: ProposalComposerProps) {
  const { t } = useTranslation();
  const { colors } = useAppTheme();
  const [body, setBody] = useState('');

  const handleSend = () => {
    if (!body.trim()) return;
    onSend('New Proposal', body.trim());
    setBody('');
  };

  return (
    <View className="border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900">
      <View className="flex-row items-end">
        <TextInput
          className="max-h-24 min-h-[44px] flex-1 rounded-xl bg-gray-100 px-4 py-2.5 text-base text-gray-900 dark:bg-gray-800 dark:text-gray-100"
          placeholder={t('chat.compose')}
          placeholderTextColor={colors.textSecondary}
          value={body}
          onChangeText={setBody}
          multiline
          textAlignVertical="top"
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={!body.trim()}
          className={`ml-2 h-11 w-11 items-center justify-center rounded-full ${
            body.trim() ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <Send
            size={18}
            color={body.trim() ? '#fff' : colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
