import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { JSX, useEffect, useState } from 'react';

import { Home, Create, Login, SignUp } from '@containers';
import { navigationRef, AUTH_TOKEN } from '@components';
import { Welcome } from './src/Containers/Welcome';

interface CreateParam {
  id: string;
}

export type NoteStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  Welcome: undefined;
  Create: CreateParam;
};

const RootStack = createStackNavigator<NoteStackParamList>();

function App(): JSX.Element {
  const navigationOptions: StackNavigationOptions = {
    headerShown: false,
    gestureEnabled: false,
    cardStyle: {},
  };

  const [auth, setAuth] = useState<boolean>(false);

  console.log({ auth });

  useEffect(() => {
    AsyncStorage.getItem(AUTH_TOKEN)
      .then((_el) => {
        setAuth(true);
      })
      .catch((_el) => {
        setAuth(false);
      });
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        // initialRouteName={auth ? 'Home' : 'Login'}
        initialRouteName="Welcome"
        screenOptions={navigationOptions}
      >
        <RootStack.Screen name="SignUp" component={SignUp} />
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Create" component={Create} />
        <RootStack.Screen name="Welcome" component={Welcome} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
