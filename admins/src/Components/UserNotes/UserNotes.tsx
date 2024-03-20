import { JSX } from 'react';

import style from './UserNotes.module.scss';

interface userNotesProps {
  readonly notes: object[];
}

export function UserNotes({ notes }: userNotesProps): JSX.Element {
  return (
    <div className={style.container}>
      <table>
        <thead>
        <tr>
          <th>TITLE</th>
          <th>CREATED AT</th>
          <th>CONTENT</th>
        </tr>
        </thead>

        <tbody>
        {
          notes.map(({}, i) => {
            return <tr key={i}>
              <td></td>
            </tr>})
        }
        </tbody>
      </table>
    </div>
  );
}
