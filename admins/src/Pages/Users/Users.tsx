import { JSX } from 'react';
import { RxTrackNext, RxTrackPrevious } from 'react-icons/rx';

import style from './Users.module.scss';
import { UserHeader } from '@containers';
import { userDetail, UsersTable } from '@components';

const data: userDetail[] = [
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

        <div>
          <div>
            <RxTrackPrevious size="40px" />
          </div>
          <div>
            <RxTrackNext size="40px" />
          </div>
        </div>
      </div>
    </div>
  );
}
