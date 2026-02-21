import { useMemo, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { sendMessage } from '@/features/chat/store/chat-slice';
import { useTranslation } from 'react-i18next';
import type { ProposalMessage } from '@/types/global';

export function useChat(contractId: string) {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const messages = useAppSelector(
    (state) => state.chat.messagesByContractId[contractId] ?? []
  );
  const user = useAppSelector((state) => state.auth.user);

  const localizedMessages = useMemo(() => {
    return messages.map((m) => ({
      ...m,
      displayTitle: isArabic ? m.titleAr : m.title,
      displayBody: isArabic ? m.bodyAr : m.body,
    }));
  }, [messages, isArabic]);

  const handleSendMessage = useCallback(
    (title: string, body: string) => {
      const newMessage: ProposalMessage = {
        id: `msg-new-${Date.now()}`,
        contractId,
        stepNumber: messages.length + 1,
        title,
        titleAr: title,
        sender: {
          id: user?.id ?? 'unknown',
          name: user?.fullName ?? 'Unknown',
          avatar: user?.avatar,
          company: 'AEGIS VAULT',
        },
        date: new Date().toISOString(),
        body,
        bodyAr: body,
        status: 'pending',
        attachments: [],
      };

      dispatch(sendMessage({ contractId, message: newMessage }));
    },
    [contractId, messages.length, user, dispatch]
  );

  return {
    messages: localizedMessages,
    handleSendMessage,
    isArabic,
  };
}
