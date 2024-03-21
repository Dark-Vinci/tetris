import { Dimensions, FlatList, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, JSX } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import {
  HomeHeader,
  NoteListItem,
  AUTH_TOKEN,
  showAlert,
  Color,
  navigation,
  NavAction,
  Empty,
} from '@components';

interface listType {
  readonly title: string;
  readonly createdAt: string;
  readonly id: string;
}

export function Home(): JSX.Element {
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<listType[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const handleInputHandler = (text: string) => {
    setSearch(text);
  };

  const fetchNotes = async (searchText = '', isSearch: boolean) => {
    try {
      setIsSearch(isSearch);
      const authToken = await AsyncStorage.getItem(AUTH_TOKEN);

      // setIsSearch(isSearch);

      if (!authToken) {
        showAlert('something is wrong');
        return;
      }

      const response = await axios.get(
        `${Constants.expoConfig?.extra?.baseURL}/note/mine?search=${searchText}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      setData(response.data.data.items);
    } catch (e) {
      showAlert('something went wrong');
    }
  };

  const searchNotes = async () => {
    fetchNotes(search, true).then();
  };

  useEffect(() => {
    fetchNotes('', false).then();
  }, []);

  if (data.length === 0 && !isSearch) {
    return <Empty />;
  }

  return (
    <LinearGradient
      colors={[Color.GRADIENT_COLOR, Color.WHITE]}
      style={{
        width: '100%',
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        // ...debug('blue'),
        flex: 1,
      }}
    >
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          zIndex: 20,
          height: 65,
          width: 65,
        }}
        onPress={() => {
          navigation.push(NavAction.CREATE);
        }}
      >
        <View
          style={{
            backgroundColor: 'blue',
            height: 65,
            width: 65,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AntDesign name="plus" size={35} color={Color.WHITE} />
        </View>
      </TouchableOpacity>

      <HomeHeader
        inputChange={handleInputHandler}
        search={search}
        onSearch={searchNotes}
      />

      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <NoteListItem
              id={item.id}
              createdAt={item.createdAt}
              title={item.title}
            />
          );
        }}
        keyExtractor={(item) => `${Math.random()}${item?.id}`}
        style={{
          width: '90%',
          height: 'auto',
          flex: 1,
          margin: 5,
          // ...debug('yellow'),
        }}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
}
