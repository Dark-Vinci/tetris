import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React, { ReactNode, JSX } from 'react';

import { Color } from './constant';

interface screenProps {
  readonly children: ReactNode;
}

export function Screen({ children }: screenProps): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: Color.WHITE,
          flexGrow: 1,
        }}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // ...debug('blue'),
    flex: 1,
    backgroundColor: Color.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:
      Platform.OS === 'android' ? (StatusBar.currentHeight as number) * 2 : 0,
  },
});
