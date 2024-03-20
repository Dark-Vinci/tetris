import { JSX } from 'react';

import style from './NoteModal.module.scss';

export function NoteModal(): JSX.Element {
  return (
    <div className={style.container}>
      <div className={style.container_minor}>NOTE MODAL</div>
    </div>
  );
}
