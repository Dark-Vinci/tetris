import React, { memo } from 'react';
import { FlatList } from 'react-native';

import { NoteListItem } from './NoteListItem';
import { listType } from '@containers';

interface ChildProps {
  data: listType[];
}

export const CardList = memo(({ data }: ChildProps) => {
  return (
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
  );
});
