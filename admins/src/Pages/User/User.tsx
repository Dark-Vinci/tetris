import { JSX } from 'react';

import style from './User.module.scss';

export function User(): JSX.Element {
  return (
    <div className={style.container}>
      <div className={style.container_minor}>USER</div>
    </div>
  );
}
