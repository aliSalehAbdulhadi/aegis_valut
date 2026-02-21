import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ProposalMessage } from '@/types/global';
import mockMessages from '@/data/mock-messages.json';

interface ChatState {
  messagesByContractId: Record<string, ProposalMessage[]>;
  loading: boolean;
}

const initialState: ChatState = {
  messagesByContractId: mockMessages as Record<string, ProposalMessage[]>,
  loading: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage(
      state,
      action: PayloadAction<{ contractId: string; message: ProposalMessage }>
    ) {
      const { contractId, message } = action.payload;
      if (!state.messagesByContractId[contractId]) {
        state.messagesByContractId[contractId] = [];
      }
      state.messagesByContractId[contractId].push(message);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { sendMessage, setLoading } = chatSlice.actions;

export default chatSlice.reducer;
