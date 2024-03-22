import { JSX } from 'react';
import { NavLink } from 'react-router-dom';

import style from './404Page.module.scss';

export function Page404(): JSX.Element {
  return (
    <div className={style.container}>
      <div className={style.container_mini}>
        <div className={style.main}>
          <p>404</p>
          <p>Oops..</p>
        </div>

        <div>
          <p>
            Go back to{' '}
            <NavLink to={'/login'} style={{ textDecoration: 'none' }}>
              login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
