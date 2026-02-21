import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  AUTH_TOKEN: '@aegis_vault/auth_token',
  USER_DATA: '@aegis_vault/user_data',
  LANGUAGE: '@aegis_vault/language',
  ONBOARDED: '@aegis_vault/onboarded',
} as const;

export async function setItem(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('AsyncStorage setItem error:', error);
  }
}

export async function getItem(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error('AsyncStorage getItem error:', error);
    return null;
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('AsyncStorage removeItem error:', error);
  }
}

export async function clearAll(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('AsyncStorage clear error:', error);
  }
}

export { KEYS };
