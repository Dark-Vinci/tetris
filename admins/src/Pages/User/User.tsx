import { JSX } from 'react';

import style from './User.module.scss';

export function User(): JSX.Element {
  return (
    <div className={style.container}>
      USER PAGE
    </div>
  );
}
