import { JSX } from 'react';

import style from './UserNotes.module.scss';

export interface userNote {
  readonly id: string;
  readonly title: string;
  readonly createdAt: Date;
  readonly content: string;
}

interface userNotesProps {
  readonly notes: userNote[];
  onClick(obj: userNote): void;
}

export function UserNotes({ notes, onClick }: userNotesProps): JSX.Element {
  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>CREATED AT</th>
            <th>CONTENT</th>
          </tr>
        </thead>

        <tbody>
          {notes.map(({ title, id, createdAt, content }) => {
            return (
              <tr
                key={id}
                onClick={() => onClick({ title, id, createdAt, content })}
              >
                <td>{id.slice(0, 15)}</td>
                <td>{title.slice(0, 15)}</td>
                <td>{new Date(createdAt).toDateString()}</td>
                <td>{`${content.slice(0, 15)}...`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
