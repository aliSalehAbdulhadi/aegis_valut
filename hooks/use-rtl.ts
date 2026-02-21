import { I18nManager } from 'react-native';

export function useRTL() {
  const isRTL = I18nManager.isRTL;

  return {
    isRTL,
    textAlign: isRTL ? ('right' as const) : ('left' as const),
    flexDirection: isRTL ? ('row-reverse' as const) : ('row' as const),
    iconFlip: isRTL ? [{ scaleX: -1 as number }] : [],
  };
}
