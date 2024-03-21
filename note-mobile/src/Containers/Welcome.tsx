import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { JSX } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Path } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';

import { Color, navigation } from '@components';

export function Welcome(): JSX.Element {
  return (
    <LinearGradient
      colors={['#46d6f0', Color.BLUE]}
      start={[0, 0]}
      end={[1, 1]}
      locations={[0.1, 0.9]}
      style={styles.container}
    >
      <SafeAreaView style={styles.container_mini}>
        <View style={styles.top}>
          <Svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <Path
              d="M17.4999 37.4998H37.4999"
              stroke="#ECEDEF"
              stroke-width="4.29167"
              stroke-linecap="round"
            />
            <Path
              d="M17.4999 77.5005H37.4999"
              stroke="#ECEDEF"
              stroke-width="4.29167"
              stroke-linecap="round"
            />
            <Path
              d="M17.4999 57.4995H37.4999"
              stroke="#ECEDEF"
              stroke-width="4.29167"
              stroke-linecap="round"
            />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M25.0026 29.7732C25.0003 30.3801 24.9992 30.6835 25.1879 30.8729C25.3766 31.0623 25.6805 31.0623 26.2884 31.0623H37.4998C41.0552 31.0623 43.9373 33.9445 43.9373 37.4998C43.9373 41.0552 41.0552 43.9373 37.4998 43.9373H26.2873C25.6803 43.9373 25.3769 43.9373 25.1883 44.1259C24.9998 44.3144 24.9998 44.6179 24.9998 45.2248V49.7748C24.9998 50.3817 24.9998 50.6852 25.1883 50.8738C25.3769 51.0623 25.6803 51.0623 26.2873 51.0623H37.4998C41.0552 51.0623 43.9373 53.9445 43.9373 57.4998C43.9373 61.0552 41.0552 63.9373 37.4998 63.9373H26.2873C25.6803 63.9373 25.3769 63.9373 25.1883 64.1259C24.9998 64.3144 24.9998 64.6179 24.9998 65.2248V69.7748C24.9998 70.3817 24.9998 70.6852 25.1883 70.8738C25.3769 71.0623 25.6803 71.0623 26.2873 71.0623H37.4998C41.0552 71.0623 43.9373 73.9445 43.9373 77.4998C43.9373 81.0551 41.0552 83.9373 37.4998 83.9373H26.2873C25.6803 83.9373 25.3769 83.9373 25.1883 84.1259C24.9998 84.3144 24.9998 84.6179 24.9998 85.2248V87.8333C24.9998 95.9258 24.9998 99.972 27.5138 102.486C30.0278 105 34.074 105 42.1664 105H77.8331C85.9255 105 89.9717 105 92.4857 102.486C94.9997 99.972 94.9997 95.9258 94.9997 87.8333V32.1667C94.9997 24.0742 94.9997 20.028 92.4857 17.514C89.9717 15 85.9255 15 77.8331 15H42.1664C34.074 15 30.0278 15 27.5138 17.514C25.2609 19.7669 25.0269 23.2502 25.0026 29.7732Z"
              fill="white"
            />
            <Path
              d="M77.4999 52.4995V37.4995"
              stroke="#1443C3"
              stroke-width="4.29167"
              stroke-linecap="round"
            />
          </Svg>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.bottom_welcome}>Welcome to notes app</Text>
          <Text style={styles.bottom_long}>
            The ultimate digital notebook that effortlessly organize all aspect,
            from tasks and reminders to ideas and inspiration.
          </Text>

          <TouchableOpacity
            style={styles.bottom_botton}
            onPress={() => navigation.push('Login')}
          >
            <Text style={styles.bottom_botton_text}>Get started</Text>
            <MaterialIcons
              name="arrow-forward"
              size={40}
              color="white"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  top: {
    // ...debug('red'),
    flexBasis: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottom_botton: {
    // ...debug('green'),
    height: 70,
    width: 300,
    backgroundColor: '#1b72f5',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  bottom_botton_text: {
    color: Color.WHITE,
    fontSize: 30,
    // ...debug('green'),
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
  },

  bottom_long: {
    // ...debug('red'),
    flexBasis: '40%',
    color: Color.WHITE,
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
  },

  bottom_welcome: {
    fontSize: 35,
    color: Color.WHITE,
    // ...debug('white'),
    fontWeight: '600',
    paddingBottom: 15,
  },

  bottom: {
    // ...debug('yellow'),
    flexBasis: '50%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  container: {
    flex: 1,
  },

  container_mini: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
