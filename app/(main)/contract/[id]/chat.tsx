import React from 'react';
import { View, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { BaseScreen } from '@/components/base/base-screen';
import { Header } from '@/components/layout/header';
import { EmptyState } from '@/components/feedback/empty-state';
import { ProposalMessageCard } from '@/features/chat/components/proposal-message';
import { ProposalComposer } from '@/features/chat/components/proposal-composer';
import { useChat } from '@/features/chat/hooks/use-chat';
import { MessageSquare } from 'lucide-react-native';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { messages, handleSendMessage } = useChat(id);

  return (
    <BaseScreen scroll={false} padded={false}>
      <Header title={t('chat.title')} showBack />

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 16,
          flexGrow: 1,
        }}
        renderItem={({ item }) => <ProposalMessageCard message={item} />}
        ListEmptyComponent={
          <EmptyState
            icon={MessageSquare}
            title={t('chat.empty')}
            description={t('chat.emptyDesc')}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      <ProposalComposer onSend={handleSendMessage} />
    </BaseScreen>
  );
}
