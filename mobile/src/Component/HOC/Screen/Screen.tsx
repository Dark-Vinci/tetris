import { SafeAreaView, StyleSheet } from 'react-native';
import { ReactNode, JSX } from 'react';
import { StatusBar } from 'expo-status-bar';

interface ScreenProps {
  readonly children: ReactNode;
  readonly style?: StyleSheet;
}

export function Screen({ children }: ScreenProps): JSX.Element {
  return (
    <SafeAreaView style={[screenStyle.container]}>
      <StatusBar style="auto" />
      {children}
    </SafeAreaView>
  );
}

const screenStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
});
