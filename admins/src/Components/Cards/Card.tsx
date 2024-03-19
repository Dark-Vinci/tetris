import { JSX } from 'react';

import style from './Card.module.scss';

interface cardProps {
  readonly title: string;
  readonly amount: number;
}

export function Card({title, amount}: cardProps): JSX.Element {
  return (
    <div className={style.container}>
      <p>{title}</p>
      <p>{amount}</p>
    </div>
  )
}