import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { JSX } from 'react';

import { Home, Create, Login, SignUp, Welcome, Splash } from '@containers';
import { NavAction, navigationRef } from '@components';

interface CreateParam {
  id: string;
  bgColor: string;
}

export type NoteStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  Welcome: undefined;
  Create: CreateParam;
  Splash: undefined;
};

const RootStack = createStackNavigator<NoteStackParamList>();

function App(): JSX.Element {
  const navigationOptions: StackNavigationOptions = {
    headerShown: false,
    gestureEnabled: false,
    cardStyle: {},
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName={NavAction.SPLASH}
        screenOptions={navigationOptions}
      >
        <RootStack.Screen name={NavAction.SPLASH} component={Splash} />
        <RootStack.Screen name={NavAction.SIGN_UP} component={SignUp} />
        <RootStack.Screen name={NavAction.LOGIN} component={Login} />
        <RootStack.Screen name={NavAction.HOME} component={Home} />
        <RootStack.Screen name={NavAction.CREATE} component={Create} />
        <RootStack.Screen name={NavAction.WELCOME} component={Welcome} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
