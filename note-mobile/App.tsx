import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { JSX, useEffect, useState } from 'react';

import { Home } from './src/Containers/Home';
import { Create } from './src/Containers/Create';
import { Login } from './src/Containers/Login';
import { SignUp } from './src/Containers/SignUp';
import { navigationRef } from './src/Component/rootNavigation';
import { AUTH_TOKEN } from './src/Component/constant';

interface CreateParam {
  id: string;
}

export type NoteStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
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
        initialRouteName={auth ? 'Home' : 'Login'}
        screenOptions={navigationOptions}
      >
        <RootStack.Screen name="SignUp" component={SignUp} />
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Create" component={Create} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
