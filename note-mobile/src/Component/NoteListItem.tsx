import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { JSX } from 'react';

import { Color, NavAction } from './constant';
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
  console.log({ id });
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(NavAction.CREATE, { id })}
    >
      <View style={style.container}>
        <Text style={style.title}>{title}</Text>
        <Text style={style.createdAt}>
          {new Date(createdAt).toDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    height: 100,
    flex: 1,
    flexBasis: '80%',
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    backgroundColor: Color.THICK,
    marginBottom: 10,
    paddingLeft: 10,
  },

  title: {
    color: Color.WHITE,
    fontWeight: 'bold',
    fontSize: 35,
  },

  createdAt: {
    color: Color.GLOBAL_BACKGROUND,
    fontWeight: 'normal',
    fontSize: 20,
  },
});
