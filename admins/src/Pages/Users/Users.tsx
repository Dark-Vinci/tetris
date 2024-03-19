import { JSX } from 'react';

import style from './Users.module.scss';

export function User(): JSX.Element {
  return <div className={style.container}>User</div>;
}
