import { JSX } from 'react';

import style from './Card.module.scss';

interface cardProps {
  readonly title: string;
  readonly amount: number;
  readonly bgColor: string;
  readonly color: string;
}

export function Card({
  title,
  amount,
  bgColor,
  color,
}: cardProps): JSX.Element {
  return (
    <div
      className={style.container}
      style={{ backgroundColor: bgColor, color }}
    >
      <p>{title}</p>
      <p>{amount}</p>
    </div>
  );
}
