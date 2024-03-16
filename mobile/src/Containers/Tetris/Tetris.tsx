import { JSX, useState } from 'react';
import { View, StyleSheet } from 'react-native';

type Tet = Array<Array<boolean>>

export function Tetris(): JSX.Element {
  const [grid, setGrid] = useState<Tet>([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ]);
  return (
    <View style ={style.container}>
      <View>GAME SCREEN</View>
      <View>Others</View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {}
})