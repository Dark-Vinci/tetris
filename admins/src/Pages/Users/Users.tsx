import { JSX } from 'react';

import style from './Users.module.scss';
import { UserHeader } from '@containers';
import { Next, userDetail, UsersTable } from '@components';

const data: userDetail[] = [
  {
    username: 'melon',
    email: 'melon@gmail.com',
    count: 20,
    createdAt: new Date(),
    id: '2',
  },

  {
    username: 'melon',
    email: 'melon@gmail.com',
    count: 20,
    createdAt: new Date(),
    id: '2',
  },

  {
    username: 'melon',
    email: 'melon@gmail.com',
    count: 20,
    createdAt: new Date(),
    id: '2',
  },

  {
    username: 'melon',
    email: 'melon@gmail.com',
    count: 20,
    createdAt: new Date(),
    id: '2',
  },

  {
    username: 'melon',
    email: 'melon@gmail.com',
    count: 20,
    createdAt: new Date(),
    id: '2',
  },

  {
    username: 'melon',
    email: 'melon@gmail.com',
    count: 20,
    createdAt: new Date(),
    id: '2',
  },

  {
    username: 'melon',
    email: 'melon@gmail.com',
    count: 20,
    createdAt: new Date(),
    id: '2',
  },

  {
    username: 'melon',
    email: 'melon@gmail.com',
    count: 20,
    createdAt: new Date(),
    id: '2',
  },

  {
    username: 'melon',
    email: 'melon@gmail.com',
    count: 20,
    createdAt: new Date(),
    id: '2',
  },

  {
    username: 'melon',
    email: 'melon@gmail.com',
    count: 20,
    createdAt: new Date(),
    id: '2',
  },
];

export function Users(): JSX.Element {
  return (
    <div className={style.container}>
      <div className={style.container_minor}>
        <div>
          <UserHeader />
        </div>

        <div>
          <UsersTable data={data} />
        </div>

        <div className={style.more}>
          <Next />
        </div>
      </div>
    </div>
  );
}
