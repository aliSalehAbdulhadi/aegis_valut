import { Redirect } from 'expo-router';
import { useAppSelector } from '@/store/hooks';

export default function Index() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/(main)/(tabs)" />;
  }

  return <Redirect href="/(auth)/welcome" />;
}
