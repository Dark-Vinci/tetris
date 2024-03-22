import React, { JSX, useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_TOKEN, NavAction, navigation, Screen } from '@components';

export function Splash(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      navigation.push(auth ? NavAction.HOME : NavAction.WELCOME);
    }
  }, [isLoading]);

  useEffect(() => {
    AsyncStorage.removeItem(AUTH_TOKEN)
      .then((_el) => {
        // setAuth(_el!);
      })
      .catch((_el) => {
        // setAuth('');
      });

    AsyncStorage.getItem(AUTH_TOKEN)
      .then((_el) => {
        setAuth(_el!);
      })
      .catch((_el) => {
        setAuth('');
      });
  }, []);

  return (
    <Screen>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: Dimensions.get('window').height - 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <Path
            d="M11.6669 24.9998H25.0002"
            stroke="#7E869E"
            stroke-width="4.29167"
            stroke-linecap="round"
          />
          <Path
            d="M11.6669 51.6665H25.0002"
            stroke="#7E869E"
            stroke-width="4.29167"
            stroke-linecap="round"
          />
          <Path
            d="M11.6669 38.3337H25.0002"
            stroke="#7E869E"
            stroke-width="4.29167"
            stroke-linecap="round"
          />
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.0707 17.1527C16.9642 17.7887 16.9109 18.1067 17.1038 18.3345C17.2967 18.5624 17.6338 18.5624 18.3082 18.5624H25.0002C28.5556 18.5624 31.4377 21.4445 31.4377 24.9999C31.4377 28.5552 28.5556 31.4374 25.0002 31.4374H16.896C16.7695 31.4374 16.6669 31.54 16.6669 31.6665C16.6669 31.7931 16.7695 31.8957 16.896 31.8957H25.0002C28.5556 31.8957 31.4377 34.7779 31.4377 38.3332C31.4377 41.8885 28.5556 44.7707 25.0002 44.7707H16.896C16.7695 44.7707 16.6669 44.8733 16.6669 44.9999C16.6669 45.1264 16.7695 45.229 16.896 45.229H25.0002C28.5556 45.229 31.4377 48.1112 31.4377 51.6665C31.4377 55.2219 28.5556 58.104 25.0002 58.104H18.0233C17.3997 58.104 17.0878 58.104 16.8977 58.3028C16.7076 58.5015 16.7212 58.8087 16.7484 59.4229C16.9226 63.3508 17.4687 65.7738 19.1809 67.486C21.6949 70 25.7411 70 33.8335 70H46.1669C54.2593 70 58.3055 70 60.8195 67.486C63.3335 64.972 63.3335 60.9258 63.3335 52.8333V27.1667C63.3335 19.0742 63.3335 15.028 60.8195 12.514C58.3055 10 54.2593 10 46.1669 10H33.8335C25.7411 10 21.6949 10 19.1809 12.514C18.0335 13.6614 17.4098 15.128 17.0707 17.1527Z"
            fill="#1443C3"
          />
          <Path
            d="M51.6666 34.9998V24.9998"
            stroke="#F7F8FF"
            stroke-width="4.29167"
            stroke-linecap="round"
          />
        </Svg>
      </View>
    </Screen>
  );
}
