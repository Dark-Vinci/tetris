import { JSX } from 'react';

import style from './NoteModal.module.scss';

interface noteModalProps {
  readonly title: string;
  readonly id: string;
  readonly createdAt: Date;
  readonly content: string;
  readonly bgColor: string;
}

export function NoteModal({
  title,
  id,
  createdAt,
  content,
  bgColor,
}: noteModalProps): JSX.Element {
  return (
    <div className={style.container} style={{ backgroundColor: bgColor }}>
      <div className={style.container_minor}>
        <div className={style.title}>
          <p> {title}</p>
        </div>

        {/*  other details*/}
        <div className={style.body}>
          <p>id: {id}</p>
          <p>created at {new Date(createdAt).toDateString()}</p>
        </div>

        {/*  content */}
        <div className={style.content}>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}
