import {
  Text,
  SafeAreaView,
  StyleProp,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { JSX, useState, useRef, useEffect } from 'react';
import LottieView from 'lottie-react-native';

const border: StyleProp<ViewStyle> = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: 300,
  height: 500,
};

function App(): JSX.Element {
  let [start, setStart] = useState<boolean>(false);
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play();
  }, []);

  let toRender = (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        flex: 1,
        // @ts-ignore
        ...border,
        height: windowHeight,
        width: windowWidth,
      }}
    >
      <LottieView
        // autoPlay
        ref={animationRef}
        loop={false}
        resizeMode="cover"
        onAnimationFinish={() => setStart(true)}
        style={{
          width: '100%',
          height: '100%',
          borderColor: 'blue',
          borderStyle: 'solid',
          borderWidth: 10,
        }}
        source={require('./src/assets/JSON/splashy.json')}
      />
    </SafeAreaView>
  );

  if (start) {
    toRender = <Text>Open up App.tsx to start working on your app!</Text>;
  }

  console.log({ toRender });

  return (
    // <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'aqua'}}>
    toRender
    // </SafeAreaView>
  );
}

export default App;
