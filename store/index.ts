import authReducer from '@/features/auth/store/auth-slice';
import chatReducer from '@/features/chat/store/chat-slice';
import contractsReducer from '@/features/contracts/store/contracts-slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contracts: contractsReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
