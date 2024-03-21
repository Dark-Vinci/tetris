import { Alert } from 'react-native';

export enum Color {
  BLACK = '#0a0a0a',
  CREAM = '#c9c9c9',
  FADE = '#424242',
  LIST_BACKGROUND_COLOR = '#a4a5ba',
  GLOBAL_BACKGROUND = '#dfe3eb',
  PLACEHOLDER_COLOR = '#989a9c',
  SEARCH_ICON_COLOR = '#2d2e30',
  ADD_ICON_COLOR = '#4e55d4',
  INPUT_BACKGROUND_COLOR = 'white',
  LOGIN_COLOR = '#D3BAA6',
  THICK = '#B5651D',
  WHITE = '#FFFFFF',
  CREATE_BACKGROUND = '#C6A788',
  WATER = 'aqua',
  BLUE = '#221bf5',
  INPUT_BORDER = '#CBD2E0',
}

export enum NavAction {
  LOGIN = 'Login',
  SIGN_UP = 'SignUp',
  CREATE = 'Create',
  HOME = 'Home',
}

export const AUTH_TOKEN = 'AUTH_TOKEN' as const;
export const USER_ID = 'USER_ID' as const;

export const debug = (color: string) => {
  return {
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: color,
  } as any;
};

export const showAlert = (message: string) => {
  Alert.alert(
    'error',
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ],
    { cancelable: false },
  );
};
