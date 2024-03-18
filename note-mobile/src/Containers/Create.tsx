import { JSX, useEffect, useState } from 'react';
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
import { MaterialIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';

import { Color } from '../Component/constant';
import { navigation } from '../Component/rootNavigation';

type CreateRouteProp = RouteProp<
  {
    Create: {
      id: string;
    };
  },
  'Create'
>;

type CreateNavigationProp = StackNavigationProp<
  {
    Create: {
      id: string;
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

  // fetch the details
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/notes/api/note/${id}`, {})
        .then((res) => {
          console.log({ abc: res.data.data });
          setMain(res.data.data.content);
          setTitle(res.data.data.title);
          setDate(new Date(res.data.data.createdAt));

          console.log({ main, title, date });
        })
        .catch((ERR) => console.log({ ERR }));
    }
  }, []);

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

  const onSaveHandler = () => {
    console.log({ main, title });
    axios
      .put('http://localhost:8080/notes/api/note/update', {
        title,
        content: main,
        id,
      })
      .then((res) => {
        console.log('UPDATED.......');

        console.log({ main, title, date });
      })
      .catch((ERR) => console.log({ ERR }));

    // update
    navigation.goBack();
    //   do dome magic
  };

  useEffect(() => {
    if (!id && !titleSet && main.length != 0) {
      setTitle(main.split('').slice(0, 15).join(''));
    }
  }, [main]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_top}>
        <Text style={styles.container_top_text}>
          {new Date(date).toDateString()}
        </Text>
        <View style={styles.container_top_title}>
          <TextInput
            onChangeText={handleTitleChange}
            value={title}
            placeholder={'Title'}
            style={{
              height: '100%',
              flex: 1,
              // ...debug('green'),
              fontSize: 30,
              color: Color.WHITE,
            }}
          />

          <TouchableOpacity onPress={onSaveHandler}>
            <MaterialIcons name="save" size={35} color={Color.WATER} />
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
  container: {
    paddingTop:
      Platform.OS == 'android' ? (StatusBar.currentHeight as number) * 2 : 0,
    flex: 1,
    backgroundColor: Color.CREATE_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

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
