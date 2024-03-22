import React, { JSX, useCallback, useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  View,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import { FontAwesome5 } from '@expo/vector-icons';

import {
  AUTH_TOKEN,
  Color,
  NavAction,
  showAlert,
  USER_ID,
  navigation,
  bgColors,
} from '@components';

type CreateRouteProp = RouteProp<
  {
    Create: {
      id: string;
      bgColor: string;
    };
  },
  'Create'
>;

type CreateNavigationProp = StackNavigationProp<
  {
    Create: {
      id: string;
      bgColor: string;
    };
  },
  'Create'
>;

type CreateProps = {
  navigation: CreateNavigationProp;
  route: CreateRouteProp;
};

// get id from navigations and use it to fetch the details
export function Create({ route }: CreateProps): JSX.Element {
  const [main, setMain] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [titleSet, setTitleSet] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  const id = route?.params?.id;
  const bgColor = route?.params?.bgColor || bgColors[0];

  const fetchNote = useCallback(async () => {
    try {
      const authToken = await AsyncStorage.getItem(AUTH_TOKEN);

      if (!authToken) {
        showAlert('something is wrong');
        return;
      }

      if (id) {
        const response = await axios.get(
          `${Constants.expoConfig?.extra?.baseURL}/note/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );

        setMain(response.data.data.content);
        setTitle(response.data.data.title);
        setDate(new Date(response.data.data.createdAt));
      }
    } catch (_e) {
      showAlert('something went wrong');
    }
  }, [id]);

  // fetch the details
  useEffect(() => {
    fetchNote().then();
  }, [fetchNote]);

  const handleMainChange = (text: string) => {
    setMain(text);
  };

  const handleTitleChange = (text: string) => {
    setTitleSet(true);
    if (text.length > 15) {
      text = text.split('').slice(0, 15).join('');
    }
    setTitle(text);
  };

  const onSaveHandler = async () => {
    try {
      if (!title && !main) {
        navigation.push(NavAction.HOME);
        return;
      }

      const userID = await AsyncStorage.getItem(USER_ID);

      if (!userID) {
        showAlert('something is wrong');
        return;
      }

      const authToken = await AsyncStorage.getItem(AUTH_TOKEN);

      if (!authToken) {
        showAlert('something is wrong');
        return;
      }

      switch (!!id) {
        case true:
          await axios.put(
            `${Constants.expoConfig?.extra?.baseURL}/note/update`,
            {
              title,
              content: main,
              id,
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            },
          );
          break;
        case false:
          await axios.post(
            `${Constants.expoConfig?.extra?.baseURL}/note`,
            {
              title,
              content: main,
              userID,
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            },
          );
          break;
      }

      navigation.push(NavAction.HOME);
    } catch (e) {
      console.log({ e });
      showAlert('something went wrong');
    }
  };

  useEffect(() => {
    if (!id && !titleSet && main.length !== 0) {
      setTitle(main.split('').slice(0, 15).join(''));
    }
  }, [id, main, titleSet]);

  return (
    <SafeAreaView
      style={{
        paddingTop:
          Platform.OS === 'android'
            ? (StatusBar.currentHeight as number) * 2
            : 0,
        flex: 1,
        backgroundColor: bgColor,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <View style={styles.container_top}>
        <Text style={styles.container_top_text}>
          {new Date(date).getFullYear()} | {new Date(date).getMonth()} |{' '}
          {new Date(date).getDay()}
        </Text>
        <View style={styles.container_top_title}>
          <TextInput
            onChangeText={handleTitleChange}
            value={title}
            placeholder={'Title'}
            style={{
              height: '100%',
              flex: 1,
              fontSize: 35,
              color: Color.WHITE,
              fontWeight: '800',
            }}
          />

          <TouchableOpacity onPress={onSaveHandler}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: Color.WHITE,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FontAwesome5
                name="check"
                size={24}
                color={Color.WHITE}
                style={{ fontWeight: 'normal' }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container_bottom}>
        <TextInput
          placeholder={'Note something down...'}
          multiline={true}
          value={main}
          onChangeText={handleMainChange}
          style={{ color: Color.WHITE }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container_top: {
    // ...debug('green'),
    width: '100%',
    padding: 10,
    flexBasis: '10%',
    justifyContent: 'center',
  },

  container_top_text: {
    // ...debug('yellow'),
    width: '100%',
    fontWeight: 'bold',
    color: Color.WHITE,
  },

  container_top_title: {
    // ...debug('yellow'),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 30,
  },

  container_bottom: {
    // ...debug('blue'),
    width: '100%',
    padding: 10,
    flexBasis: '90%',
  },
});
