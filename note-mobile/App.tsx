import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { JSX } from 'react';

import { Home, Create, Login, SignUp, Welcome, Splash } from '@containers';
import { navigationRef } from '@components';

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
        initialRouteName="Login"
        screenOptions={navigationOptions}
      >
        <RootStack.Screen name="Splash" component={Splash} />
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
