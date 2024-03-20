import { JSX } from 'react';
import { useParams } from 'react-router-dom';

import style from './User.module.scss';
import { UserDetails } from '@containers';
import { Next, userNote, UserNotes } from '@components';
import { generateRandom } from '@utils';

const uN: userNote[] = [
  {
    id: '78d34823-9469-4e17-a509-c44c380430b1',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },

  {
    id: '78d34823-9469-4e17-a509-c44c380430b1',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },

  {
    id: '12',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },
  {
    id: '78d34823-9469-4e17-a509-c44c380430b1',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },

  {
    id: '12',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },
  {
    id: '78d34823-9469-4e17-a509-c44c380430b1',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },

  {
    id: '12',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },

  {
    id: '12',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },

  {
    id: '12',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },

  {
    id: '12',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },
];

export function User(): JSX.Element {
  const { userId } = useParams();

  const i = generateRandom();

  console.log({ userId });

  return (
    <div className={style.container}>
      <div className={style.container_minor}>
        <div>
          <UserDetails
            createdAt={new Date()}
            email={'email@gmail.com'}
            username={'melon'}
            index={i}
          />
        </div>

        <div>
          <UserNotes notes={uN} />
        </div>

        <div className={style.more}>
          <Next />
        </div>
      </div>
    </div>
  );
}
