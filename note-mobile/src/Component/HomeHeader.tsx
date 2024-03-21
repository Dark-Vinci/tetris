import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { JSX } from 'react';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { Color, NavAction } from './constant';
import { navigation } from './rootNavigation';

interface HomeHeaderProps {
  readonly search: string;
  inputChange: (text: string) => void;
}

export function HomeHeader({
  search,
  inputChange,
}: HomeHeaderProps): JSX.Element {
  return (
    <View style={style.container}>
      <View style={style.container_top}>
        <Text style={style.container_top_text}>Notes</Text>

        <TouchableOpacity onPress={() => navigation.push(NavAction.CREATE)}>
          <Ionicons
            name="add-circle-outline"
            size={40}
            color={Color.ADD_ICON_COLOR}
          />
        </TouchableOpacity>
      </View>

      <View style={style.container_bottom}>
        <TextInput
          value={search}
          placeholder="Search notes..."
          onChangeText={inputChange}
          style={style.container_bottom_search}
          placeholderTextColor={Color.PLACEHOLDER_COLOR}
        />

        <TouchableOpacity>
          <Fontisto name="search" size={40} color={Color.SEARCH_ICON_COLOR} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    backgroundColor: Color.LOGIN_COLOR,
    justifyContent: 'center',
    padding: 10,
  },

  container_bottom: {
    // ...debug('green'),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },

  container_bottom_search: {
    // ...debug('yellow'),
    flexBasis: '80%',
    height: '100%',
    borderRadius: 30,
    textAlign: 'left',
    paddingLeft: 20,
    backgroundColor: '#e6e6eb',
    fontSize: 20,
  },

  container_top: {
    // ...debug('red'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  container_top_text: {
    fontSize: 50,
    fontWeight: 'bold',
  },
});
