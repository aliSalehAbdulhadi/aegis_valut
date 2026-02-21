import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Contract } from '@/types/global';
import mockContracts from '@/data/mock-contracts.json';

interface ContractsState {
  contracts: Contract[];
  activeContractId: string | null;
  searchQuery: string;
  loading: boolean;
}

const initialState: ContractsState = {
  contracts: mockContracts as Contract[],
  activeContractId: null,
  searchQuery: '',
  loading: false,
};

const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    setActiveContract(state, action: PayloadAction<string>) {
      state.activeContractId = action.payload;
    },
    clearActiveContract(state) {
      state.activeContractId = null;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  setActiveContract,
  clearActiveContract,
  setSearchQuery,
  setLoading,
} = contractsSlice.actions;

export default contractsSlice.reducer;
