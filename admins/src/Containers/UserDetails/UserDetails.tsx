import { JSX } from 'react';

import style from './UserDetails.module.scss';
import { bgColors, colors } from '@utils';

interface userDetailsProp {
  readonly username: string;
  readonly email: string;
  readonly createdAt: Date;
  readonly index: number;
}

export function UserDetails({
  username,
  createdAt,
  email,
  index,
}: userDetailsProp): JSX.Element {
  return (
    <div className={style.container}>
      <div className={style.container_minor}>
        <div style={{ color: colors[index], backgroundColor: bgColors[index] }}>
          {username[0]?.toUpperCase()}
        </div>

        <div className={style.details}>
          <p>{username}</p>
          <p>{email}</p>
          <p>Join at {new Date(createdAt).toDateString()}</p>
        </div>
      </div>
    </div>
  );
}
