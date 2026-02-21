import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User, SignUpData, VerificationStatus } from '@/types/global';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  signUpData: SignUpData | null;
  verificationStatus: VerificationStatus;
  nationalIdPhoto: string | null;
  passportPhoto: string | null;
  facePhoto: string | null;
  signatureData: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  signUpData: null,
  verificationStatus: {
    nationalId: false,
    passport: false,
    face: false,
  },
  nationalIdPhoto: null,
  passportPhoto: null,
  facePhoto: null,
  signatureData: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignUpData(state, action: PayloadAction<SignUpData>) {
      state.signUpData = action.payload;
      state.error = null;
    },
    setNationalIdPhoto(state, action: PayloadAction<string>) {
      state.nationalIdPhoto = action.payload;
      state.verificationStatus.nationalId = true;
    },
    setPassportPhoto(state, action: PayloadAction<string>) {
      state.passportPhoto = action.payload;
      state.verificationStatus.passport = true;
    },
    setFacePhoto(state, action: PayloadAction<string>) {
      state.facePhoto = action.payload;
      state.verificationStatus.face = true;
    },
    setSignature(state, action: PayloadAction<string>) {
      state.signatureData = action.payload;
    },
    completeRegistration(state) {
      state.user = {
        id: 'user-new',
        email: state.signUpData?.email ?? '',
        phone: state.signUpData?.phone ?? '',
        fullName: 'New User',
        nationalIdPhoto: state.nationalIdPhoto ?? undefined,
        passportPhoto: state.passportPhoto ?? undefined,
        facePhoto: state.facePhoto ?? undefined,
        createdAt: new Date().toISOString(),
      };
      state.isAuthenticated = true;
      state.loading = false;
    },
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginWithMock(state) {
      state.user = {
        id: 'user-001',
        email: 'ahmed@aegisvault.com',
        phone: '+966501234567',
        fullName: 'Ahmed Al-Rashidi',
        createdAt: '2025-01-01',
      };
      state.isAuthenticated = true;
      state.error = null;
    },
    logout(state) {
      return { ...initialState };
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    resetVerification(state) {
      state.verificationStatus = { nationalId: false, passport: false, face: false };
      state.nationalIdPhoto = null;
      state.passportPhoto = null;
      state.facePhoto = null;
    },
  },
});

export const {
  setSignUpData,
  setNationalIdPhoto,
  setPassportPhoto,
  setFacePhoto,
  setSignature,
  completeRegistration,
  login,
  loginWithMock,
  logout,
  setLoading,
  setError,
  resetVerification,
} = authSlice.actions;

export default authSlice.reducer;
