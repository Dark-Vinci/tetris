import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { JSX } from 'react';
import { Fontisto } from '@expo/vector-icons';
// import { Ionicons } from '@expo/vector-icons';

import { Color } from './constant';
// import { navigation } from './rootNavigation';

interface HomeHeaderProps {
  readonly search: string;
  onSearch(): void;
  inputChange: (text: string) => void;
}

export function HomeHeader({
  search,
  inputChange,
  onSearch,
}: HomeHeaderProps): JSX.Element {
  return (
    <View style={style.container}>
      <Text style={style.container_top_text}>Notes</Text>

      <View style={style.container_bottom}>
        <TextInput
          value={search}
          placeholder="Search..."
          onChangeText={inputChange}
          style={style.container_bottom_search}
          placeholderTextColor={Color.PLACEHOLDER_COLOR}
          autoCapitalize="none"
        />

        <TouchableOpacity onPress={onSearch}>
          <View
            style={{
              borderRadius: 100,
              width: 50,
              height: 50,
              backgroundColor: Color.WHITE,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Fontisto name="search" size={25} color={Color.SEARCH_ICON_COLOR} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },

  container_bottom: {
    // ...debug('green'),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 52,
    borderRadius: 50,
    backgroundColor: Color.SEARCH_BG_COLOR,
  },

  container_bottom_search: {
    // ...debug('yellow'),
    flexBasis: '80%',
    height: '100%',
    borderRadius: 30,
    textAlign: 'left',
    paddingLeft: 20,
    // backgroundColor: '#e6e6eb',
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
    width: '100%',
    marginBottom: 20,
    textAlign: 'center',
    color: Color.HEADER_TEXT_COLOR,
  },
});
