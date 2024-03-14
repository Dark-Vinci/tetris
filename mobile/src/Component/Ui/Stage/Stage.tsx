import { View } from 'react-native';
import { Cell } from '../Cell';

interface stageProps {
  stage: number;
}

export function Stage({}: stageProps): JSX.Element {
  return (
    <View>
      <Cell />
    </View>
  );
}
