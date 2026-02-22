import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';

interface BaseScreenProps {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  className?: string;
  statusBarStyle?: 'light' | 'dark';
  scrollEnabled?: boolean;
}

export function BaseScreen({
  children,
  scroll = true,
  padded = true,
  className = '',
  statusBarStyle,
  scrollEnabled = true,
}: BaseScreenProps) {
  const content = (
    <View className={`flex-1 ${padded ? 'px-4' : ''} ${className}`}>
      {children}
    </View>
  );

  return (
    <SafeAreaView className='flex-1 bg-white dark:bg-gray-950'>
      <StatusBar
        barStyle={statusBarStyle === 'light' ? 'light-content' : 'dark-content'}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        {scroll ? (
          <ScrollView
            className='flex-1'
            contentContainerClassName='flex-grow'
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}
            scrollEnabled={scrollEnabled}
          >
            {content}
          </ScrollView>
        ) : (
          content
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
