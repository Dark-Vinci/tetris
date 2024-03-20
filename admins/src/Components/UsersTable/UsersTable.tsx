import { JSX } from 'react';

import style from './UsersTable.module.scss';

export interface userDetail {
  readonly createdAt: Date;
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly count: number;
}

interface userTableProps {
  readonly data: userDetail[];
}

export function UsersTable({ data }: userTableProps): JSX.Element {
  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr>
            <th>username</th>
            <th>email</th>
            <th>note count</th>
            <th>created at</th>
          </tr>
        </thead>

        <tbody>
          {data.map(({ username, createdAt, email, count, id }) => {
            return (
              <tr key={id}>
                <td>{username}</td>
                <td>{email}</td>
                <td>{count}</td>
                <td>{new Date(createdAt).toDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
