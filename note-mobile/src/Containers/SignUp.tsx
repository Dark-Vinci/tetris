import { JSX, useState } from 'react';
import axios from 'axios';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Screen } from '../Component/Screen';
import { Color, NavAction } from '../Component/constant';
import { navigation } from '../Component/rootNavigation';

export function SignUp(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const emailInputChange = (text: string) => {
    setEmail(text);
  };

  const passwordInputChange = (text: string) => {
    setPassword(text);
  };

  const usernameInputChange = (text: string) => {
    setUsername(text);
  };

  const loginPress = () => {
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailIsValid.test(email)) {
      setErrorMessage('invalid email');
      return;
    }

    if (!username) {
      setErrorMessage('invalid username');
      return;
    }

    if (password.length < 7) {
      setErrorMessage('invalid password');
      return;
    }

    console.log('FETCHING....');
    axios
      .post('http://localhost:8080/notes/api/user/signup', {
        email: email.toLowerCase(),
        password,
        username,
        isAdmin: true,
      })
      .then((_res) => {
        console.log('LOGGED MINNNIE...');
      })
      .catch((ERR) => console.log({ ERR: JSON.stringify(ERR) }));

    setErrorMessage('');

    navigation.push(NavAction.HOME);

    console.log({ username, email, password });
  };

  return (
    <Screen>
      <KeyboardAvoidingView
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

        <View style={style.body}>
          {/*form container*/}
          <View style={style.body_input}>
            <TextInput
              placeholder={'username'}
              onChangeText={usernameInputChange}
              value={username}
              style={{
                backgroundColor: Color.INPUT_BACKGROUND_COLOR,
                height: 50,
                fontSize: 20,
                borderRadius: 20,
                paddingLeft: 16,
              }}
            />
            <TextInput
              placeholder={'johndoe@gmail.com'}
              onChangeText={emailInputChange}
              value={email}
              style={{
                backgroundColor: Color.INPUT_BACKGROUND_COLOR,
                height: 50,
                fontSize: 20,
                borderRadius: 20,
                paddingLeft: 16,
                marginTop: 20,
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
              }}
            >
              Signup
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

        <View style={style.foot}>
          <Text style={{ textAlign: 'center', color: 'white' }}>
            You have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.push(NavAction.LOGIN)}>
            <Text
              style={{
                color: '#8B4513',
                textAlign: 'center',
                verticalAlign: 'middle',
                marginTop: 5,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const style = StyleSheet.create({
  header: {
    // ...debug('blue'),
    width: '100%',
    flexBasis: '25%',
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
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
