import { JSX, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import style from './Welcome.module.scss';
import logo from '../../assets/logo.png';
import { AUTH_TOKEN, USER_ID } from '@utils';

export function Welcome(): JSX.Element {
  const [userID, setUserID] = useState<string>('');
  const [authToken, setAuthToken] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN);

    if (token) {
      setAuthToken(token);
    }

    const userId = localStorage.getItem(USER_ID);

    if (userId) {
      setUserID(userID);
    }
  }, []);

  return (
    <div className={style.container}>
      <div className={style.container_minor}>
        <div className={style.main}>
          <img src={logo} alt="logo" />
          <p>Notes...</p>
        </div>

        <div className={style.minor}>
          <p>
            {authToken ? `Go to main page ` : `Go to login page`}
            {'  '}
            <NavLink
              to={authToken ? '/users' : '/login'}
              style={{ textDecoration: 'none' }}
            >
              here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
