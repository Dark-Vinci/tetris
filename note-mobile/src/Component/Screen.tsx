import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ReactNode, JSX } from 'react';

import { Color } from './constant';

interface screenProps {
  readonly children: ReactNode;
}

export function Screen({ children }: screenProps): JSX.Element {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.LOGIN_COLOR,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop:
      Platform.OS == 'android' ? (StatusBar.currentHeight as number) * 2 : 0,
  },
});
