import { JSX } from 'react';

import style from './Notes.module.scss';

export function Notes(): JSX.Element {
  return (
    <div className={style.container}>
      <div className={style.container_minor}>Notes</div>
    </div>
  );
}
