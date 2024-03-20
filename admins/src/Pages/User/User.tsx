import { JSX } from 'react';
import { useParams } from 'react-router-dom';

import style from './User.module.scss';
import { UserDetails } from '@containers';
import { UserNotes } from '../../Components/UserNotes';

export function User(): JSX.Element {
  const { userId } = useParams();

  console.log({ userId });

  return (
    <div className={style.container}>
      <div className={style.container_minor}>
        <div>
          <UserDetails
            createdAt={new Date()}
            email={'email@gmail.com'}
            username={'melon'}
          />
        </div>

        <div>
          <UserNotes notes={[]} />
        </div>
      </div>
    </div>
  );
}
