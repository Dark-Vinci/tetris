import { FlatList, Text } from 'react-native';
import { useEffect, useState, JSX } from 'react';
import axios from 'axios';

import { HomeHeader } from '../Component/HomeHeader';
import { NoteListItem } from '../Component/NoteListItem';
import { Screen } from '../Component/Screen';

interface listType {
  readonly title: string;
  readonly createdAt: string;
  readonly id: string;
}

export function Home(): JSX.Element {
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<listType[]>([]);

  const handleInputHandler = (text: string) => {
    setSearch(text);
  };

  const fetchNotes = () => {
    axios
      .get('http://localhost:8080/notes/api/note/all', {})
      .then((res) => {
        console.log({ abc: res.data.data.items[0] });

        setData(res.data.data.items);
      })
      .catch((ERR) => console.log({ ERR }));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Screen>
      <HomeHeader inputChange={handleInputHandler} search={search} />

      {data.length < 1 ? (
        <Text>No note created....</Text>
      ) : (
        <FlatList
          data={data}
          onRefresh={fetchNotes}
          refreshing={false}
          renderItem={({ item }) => {
            return (
              <NoteListItem
                id={item.id}
                createdAt={item.createdAt}
                title={item.title}
              />
            );
          }}
          keyExtractor={(item) => `${Math.random()}${item.id}`}
          style={{
            width: '90%',
            height: 150,
            flex: 1,
            margin: 5,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Screen>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Color.GLOBAL_BACKGROUND,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
// });
