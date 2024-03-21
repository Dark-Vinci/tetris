import { Text, TouchableOpacity, View } from 'react-native';
import React, { JSX } from 'react';

import { bgColors, colors, generateRandom, NavAction } from './constant';
import { navigation } from './rootNavigation';

interface NoteListItemProps {
  readonly title: string;
  readonly createdAt: string;
  readonly id: string;
}

export function NoteListItem({
  title,
  createdAt,
  id,
}: NoteListItemProps): JSX.Element {
  const ind = generateRandom();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(NavAction.CREATE, { id, bgColor: bgColors[ind] })
      }
    >
      <View
        style={{
          height: 150,
          flex: 1,
          flexBasis: '80%',
          borderRadius: 20,
          justifyContent: 'space-evenly',
          alignItems: 'flex-start',
          backgroundColor: bgColors[ind],
          marginBottom: 10,
          paddingLeft: 10,
        }}
      >
        <Text
          style={{
            color: colors[ind],
            fontWeight: 'bold',
            fontSize: 35,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: colors[ind],
            fontWeight: 'normal',
            fontSize: 20,
          }}
        >
          {new Date(createdAt).getFullYear()} | {new Date(createdAt).getMonth()}{' '}
          | {new Date(createdAt).getDay()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
