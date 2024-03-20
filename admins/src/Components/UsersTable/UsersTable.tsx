import { JSX } from 'react';

import style from './UsersTable.module.scss';
import { useNavigate } from 'react-router-dom';

export interface userDetail {
  readonly createdAt: Date;
  readonly ID: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
}

interface userTableProps {
  readonly data: userDetail[];
}

export function UsersTable({ data }: userTableProps): JSX.Element {
  const nav = useNavigate();

  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr>
            <th>username</th>
            <th>email</th>
            <th>password</th>
            <th>created at</th>
          </tr>
        </thead>

        <tbody>
          {data.map(({ username, createdAt, email, password, ID }) => {
            return (
              <tr key={ID} onClick={() => nav(`/user/${ID}`)}>
                <td>{username}</td>
                <td>{email}</td>
                <td>{password}</td>
                <td>{new Date(createdAt).toDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
