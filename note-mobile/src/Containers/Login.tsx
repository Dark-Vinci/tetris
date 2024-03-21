import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, { JSX } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Svg, Path } from 'react-native-svg';

import {
  AUTH_TOKEN,
  Color,
  NavAction,
  showAlert,
  USER_ID,
  navigation,
  Screen,
} from '@components';

export function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const emailInputChange = (text: string) => {
    setEmail(text);
  };

  const passwordInputChange = (text: string) => {
    setPassword(text);
  };

  const loginPress = async () => {
    try {
      const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailIsValid.test(email)) {
        setErrorMessage('invalid email');
        return;
      }

      if (password.length < 7) {
        setErrorMessage('invalid password');
        return;
      }

      setIsLoading(true);

      const response = await axios.post(
        `${Constants.expoConfig?.extra?.baseURL}/user/login`,
        {
          email: email.toLowerCase(),
          password,
        },
      );

      await Promise.all([
        AsyncStorage.setItem(AUTH_TOKEN, response.data.data.token.AccessToken),

        AsyncStorage.setItem(USER_ID, response.data.data.user.ID),
      ]);

      navigation.push(NavAction.HOME);
    } catch (e) {
      console.log({ e: JSON.stringify(e) });
      showAlert('something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen>
      <View
        style={{
          // ...debug('green'),
          height: Dimensions.get('window').height - 100,
          width: '100%',
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/*<Text> CENTER </Text>*/}
        <View style={style.header}>
          <Svg
            // xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
          >
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
          <Text
            style={{
              fontSize: 40,
              fontWeight: '500',
            }}
          >
            Login
          </Text>

          <Text
            style={{
              fontSize: 20,
              // color: 'b',
            }}
          >
            Login to your account
          </Text>
        </View>

        {/*MAIN*/}
        <View style={style.body}>
          <View style={style.body_input}>
            <View>
              <Text>Username</Text>

              <TextInput
                placeholder={'johndoe@gmail.com'}
                onChangeText={emailInputChange}
                value={email}
                textContentType={'emailAddress'}
                style={{
                  backgroundColor: Color.INPUT_BACKGROUND_COLOR,
                  height: 50,
                  fontSize: 20,
                  borderRadius: 10,
                  paddingLeft: 16,
                  marginTop: 10,
                  borderColor: Color.INPUT_BORDER,
                  borderWidth: 1,
                }}
              />
            </View>

            <View style={{ paddingTop: 20 }}>
              <Text>Password</Text>
              <TextInput
                secureTextEntry={true}
                onChangeText={passwordInputChange}
                placeholder={'**********'}
                value={password}
                style={{
                  backgroundColor: Color.INPUT_BACKGROUND_COLOR,
                  height: 50,
                  marginTop: 10,
                  fontSize: 20,
                  borderRadius: 10,
                  paddingLeft: 16,
                  borderWidth: 1,
                  borderColor: Color.INPUT_BORDER,
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={loginPress}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}
          >
            <Text
              style={{
                backgroundColor: Color.BLUE,
                borderRadius: 30,
                height: 60,
                textAlign: 'center',
                width: '100%',
                verticalAlign: 'middle',
                textAlignVertical: 'center',
                overflow: 'hidden',
                color: 'white',
                fontSize: 20,
                lineHeight: 60,
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>

          {!!errorMessage && (
            <Text
              style={{
                color: 'red',
                fontSize: 15,
                width: '100%',
                textAlign: 'center',
              }}
            >
              {errorMessage}
            </Text>
          )}

          <View style={style.foot}>
            <Text style={{ textAlign: 'center' }}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.push(NavAction.SIGN_UP)}
            >
              <Text
                style={{
                  color: Color.BLUE,
                  textAlign: 'center',
                  verticalAlign: 'middle',
                }}
              >
                {' '}
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const style = StyleSheet.create({
  header: {
    // ...debug('blue'),
    width: '100%',
    flexBasis: '40%',
    height: '100%',
    justifyContent: 'space-evenly',
    padding: 10,
    alignItems: 'center',
  },

  body: {
    // ...debug('green'),
    width: '100%',
    flexBasis: '60%',
    height: '100%',
    justifyContent: 'space-around',
    padding: 20,
  },

  body_input_text: {},

  body_input: {
    // ...debug('aqua'),
    height: 150,
  },

  foot: {
    // ...debug('red'),
    flexBasis: '30%',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
