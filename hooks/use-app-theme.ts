import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

export function useAppTheme() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const isDark = colorScheme === 'dark';

  return { colors, isDark, colorScheme };
}
