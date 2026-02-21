import { Stack, Redirect } from 'expo-router';
import { useAppSelector } from '@/store/hooks';

export default function MainLayout() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="contract/[id]"
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="contract/[id]/chat"
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
}
