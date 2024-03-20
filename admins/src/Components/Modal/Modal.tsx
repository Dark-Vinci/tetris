import { JSX, ReactNode } from 'react';

import style from './Modal.module.scss';

interface modalProps {
  readonly children: ReactNode;
  readonly isOpen: boolean;
}

export function Modal({ children, isOpen }: modalProps): JSX.Element | null {
  if (!isOpen) return null;

  return (
    <div className={style.container}>
      <div className={style.container_minor}>{children}</div>
    </div>
  );
}
