import { JSX } from 'react';
import { NavLink } from 'react-router-dom';

import style from './Welcome.module.scss';
import logo from '../../assets/logo.png';

export function Welcome(): JSX.Element {
  return (
    <div className={style.container}>
      <div className={style.container_minor}>
        <div className={style.main}>
          <img src={logo} alt="logo" />
          <p>Notes...</p>
        </div>

        <div className={style.minor}>
          <p>
            Click{' '}
            <NavLink to="/login" style={{ textDecoration: 'none' }}>
              here
            </NavLink>{' '}
            to login
          </p>
        </div>
      </div>
    </div>
  );
}
