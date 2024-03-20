import { ChangeEvent, JSX, MouseEventHandler } from 'react';
import { BsSearch } from 'react-icons/bs';

import style from './UserHeader.module.scss';
import { Card } from '@components';
import { bgColors, colors } from '@utils';

interface userHeaderProp {
  // readonly totalCount: number;
  // readonly totalNotes: number;
  // readonly avg: number;
  readonly search: string;
  onSearchChange(e: ChangeEvent<HTMLInputElement>): void;
  onSearch(e: MouseEventHandler<SVGElement>): void;
  readonly analytics: number[];
}

export function UserHeader({
  search,
  onSearchChange,
  onSearch,
  analytics,
}: userHeaderProp): JSX.Element {
  const a = [
    {
      title: 'total users',
      amount: analytics[0],
    },

    {
      title: 'total notes',
      amount: analytics[1],
    },

    {
      title: 'avg note/user',
      amount: analytics[2],
    },
  ];

  return (
    <div className={style.container}>
      <div className={style.container_minor}>
        <div className={style.cards}>
          {a.map(({ title, amount }, i) => {
            return (
              <div key={title}>
                <Card
                  title={title}
                  amount={amount}
                  bgColor={bgColors[i]}
                  color={colors[i]}
                />
              </div>
            );
          })}
        </div>

        <div className={style.input}>
          <div>
            <input
              type="text"
              value={search}
              onChange={onSearchChange}
              placeholder="search by username..."
            />
            <BsSearch size="50px" onClick={onSearch as any} />
          </div>
        </div>
      </div>
    </div>
  );
}
