import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, { JSX } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Screen } from '../Component/Screen';
import {
  AUTH_TOKEN,
  Color,
  NavAction,
  showAlert,
  USER_ID,
} from '../Component/constant';
import { navigation } from '../Component/rootNavigation';

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
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: Color.LOGIN_COLOR,
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <View style={style.header}>
          <Image
            source={require('../../assets/logol.png')}
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'transparent',
            }}
          />
          <Text
            style={{
              fontSize: 40,
              color: 'white',
            }}
          >
            Welcome to notes
          </Text>
        </View>

        {/*  MAIN*/}
        <View style={style.body}>
          <View style={style.body_input}>
            <TextInput
              placeholder={'johndoe@gmail.com'}
              onChangeText={emailInputChange}
              value={email}
              textContentType={'emailAddress'}
              style={{
                backgroundColor: Color.INPUT_BACKGROUND_COLOR,
                height: 50,
                fontSize: 20,
                borderRadius: 20,
                paddingLeft: 16,
              }}
            />
            <TextInput
              secureTextEntry={true}
              onChangeText={passwordInputChange}
              placeholder={'Password....'}
              value={password}
              style={{
                backgroundColor: Color.INPUT_BACKGROUND_COLOR,
                height: 50,
                marginTop: 20,
                fontSize: 20,
                borderRadius: 20,
                paddingLeft: 16,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={loginPress}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                backgroundColor: '#8B4513',
                borderRadius: 10,
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
        </View>

        {/*  LOWER*/}
        <View style={style.foot}>
          <Text style={{ textAlign: 'center', color: 'white' }}>
            Dont have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.push(NavAction.SIGN_UP)}>
            <Text
              style={{
                color: '#8B4513',
                textAlign: 'center',
                verticalAlign: 'middle',
                marginTop: 5,
              }}
            >
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

const style = StyleSheet.create({
  header: {
    // ...debug('blue'),
    width: '100%',
    flexBasis: '30%',
    height: '100%',
    justifyContent: 'space-evenly',
    padding: 10,
    alignItems: 'center',
  },

  body: {
    // ...debug('green'),
    width: '100%',
    flexBasis: '40%',
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
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
