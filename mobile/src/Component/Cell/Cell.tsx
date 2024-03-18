import { View, StyleSheet } from 'react-native';
import { JSX } from 'react';

interface CellProps {
  readonly color: string;
  readonly length: number;
}

export function Cell({ color, length }: CellProps): JSX.Element {
  return (
    <View
      style={[
        {
          backgroundColor: color,
          width: length,
          height: length,
        },
        style.container
      ]}
    ></View>
  );
}

const style = StyleSheet.create({
  container: {},
});
