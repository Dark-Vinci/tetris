import { StyleSheet, TouchableOpacity, Text, StyleProp } from 'react-native';

interface customButtonProps {
  readonly bgColor: string;
  readonly title: string;
  readonly color: string;
  onPress: () => any;
}

export function CustomButton({
  title,
  bgColor = 'black',
  color = 'white',
  onPress,
}: customButtonProps): JSX.Element {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style.container,
        { ...(bgColor && { backgroundColor: bgColor }) },
      ]}
    >
      <Text style={[style.text, { ...(color && { color }) }]}>{title}</Text>
    </TouchableOpacity>
  );
}

interface borderProp {
  width: number;
  color: string | undefined;
  type: 'none' | 'solid';
}

export function border<T = any>({
  type,
  color,
  width,
}: borderProp): StyleProp<T> {
  return {
    borderWidth: width,
    borderColor: color,
    type,
  } as StyleProp<T>;
}

const style = StyleSheet.create({
  container: {
    // borderWidth
    width: 200,
    height: 100,
    backgroundColor: 'blue',
    // @ts-ignore
    ...border<TouchableOpacity>({ width: 1, color: 'yellow', type: 'solid' }),
  },

  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
