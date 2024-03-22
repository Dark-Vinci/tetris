import { Alert } from 'react-native';

export enum Color {
  BLACK = '#0a0a0a',
  CREAM = '#c9c9c9',
  FADE = '#424242',
  LIST_BACKGROUND_COLOR = '#a4a5ba',
  GLOBAL_BACKGROUND = '#dfe3eb',
  PLACEHOLDER_COLOR = '#989a9c',
  SEARCH_ICON_COLOR = 'grey',
  ADD_ICON_COLOR = '#4e55d4',
  INPUT_BACKGROUND_COLOR = 'white',
  LOGIN_COLOR = '#D3BAA6',
  THICK = '#B5651D',
  WHITE = '#FFFFFF',
  CREATE_BACKGROUND = '#C6A788',
  WATER = 'aqua',
  BLUE = '#221bf5',
  INPUT_BORDER = '#CBD2E0',
  AQUA = '#46d6f0',
  SEARCH_BG_COLOR = '#F5F7FF',
  HEADER_TEXT_COLOR = '#191D23',
  GRADIENT_COLOR = '#DCE3F6',
}

export function generateRandom(): number {
  return Math.floor(Math.random() * 13);
}

export const bgColors = [
  'rgba(245, 40, 145, 0.26)',
  'rgba(0, 215, 0, 0.26)',
  'rgba(176, 85, 0, 0.36)',
  'rgba(7, 232, 210, 0.26)',
  'rgba(232, 7, 7, 0.26)',
  'rgba(232, 7, 210, 0.26)',
  'rgba(132, 4, 207, 0.26)',
  'rgba(176, 4, 130, 0.26)',
  'rgba(176, 4, 116, 0.26)',
  'rgba(176, 53, 20, 0.26)',
  'rgba(0,111,76, 0.26)',
  'rgba(0,0,0, 0.26)',
  'rgba(0,76,255, 0.26)',
  'rgba(255,146,0, 0.26)',
];

export const colors = [
  'rgba(245, 40, 145, 1)',
  'rgba(0, 215, 0, 1)',
  'rgba(176, 85, 0, 1)',
  'rgba(7, 232, 210, 1)',
  'rgba(232, 7, 7, 1)',
  'rgba(232, 7, 210, 1)',
  'rgba(132, 4, 207, 1)',
  'rgba(176, 4, 130, 1)',
  'rgba(176, 4, 116, 1)',
  'rgba(176, 53, 20, 1)',
  'rgba(0,111,76, 1)',
  'rgba(0,76,255, 1)',
  'rgba(0,0,0, 1)',
  'rgba(255,146,0, 1)',
];

export enum NavAction {
  LOGIN = 'Login',
  SIGN_UP = 'SignUp',
  CREATE = 'Create',
  HOME = 'Home',
  SPLASH = 'Splash',
  WELCOME = 'Welcome',
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
