import { ChangeEvent, JSX, useState } from 'react';
import { BsSearch } from "react-icons/bs";

import style from './UserHeader.module.scss';
import { Card } from '@components';

interface userHeaderProp {
  // readonly totalCount: number;
  // readonly totalNotes: number;
  // readonly avg: number;
}

const a = [
  {
    title: 'total users',
    amount: 23,
  },

  {
    title: 'total notes',
    amount: 30,
  },

  {
    title: 'avg note/user',
    amount: 2.333,
  },
]

export function UserHeader({}: userHeaderProp): JSX.Element {
  const [search, setSearch] = useState<string>('');

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  return (
    <div className={style.container}>
      <div className={style.container_minor}>
        <div>
          {
            a.map(({ title, amount }) => {
              return (
                <div key={title}>
                  <Card title={title} amount={amount} />
                </div>
              )
            })
          }
        </div>

        <div>
          <div>
            <input
              type='text'
              value={search}
              onChange={inputChangeHandler}
              placeholder='search by username...'
            />
            <BsSearch size='40px'/>
          </div>
        </div>
      </div>
    </div>
  );
}
