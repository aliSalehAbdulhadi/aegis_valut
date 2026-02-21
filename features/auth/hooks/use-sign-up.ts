import { useState, useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setSignUpData, setError } from '@/features/auth/store/auth-slice';
import { validateSignUpForm } from '@/utils/validation';
import { useRouter } from 'expo-router';

export function useSignUp() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = useCallback(() => {
    const validationErrors = validateSignUpForm({ email, phone, password });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    dispatch(setSignUpData({ email, phone, password }));
    router.push('/(auth)/verify-identity');
  }, [email, phone, password, dispatch, router]);

  return {
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    errors,
    handleSubmit,
  };
}
