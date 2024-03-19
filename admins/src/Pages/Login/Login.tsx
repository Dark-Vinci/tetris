import { ChangeEvent, JSX, useState } from 'react';
import { MdOutlineAdminPanelSettings, MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import style from './Login.module.scss';
import { Color } from '@utils';

export function Login(): JSX.Element {
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    console.log({ email, password });
    navigate('/users');
  };

  return (
    <div className={style.container}>
      <div className={style.container_minor}>
        <div className={style.header}>
          <MdOutlineAdminPanelSettings color={Color.MINOR} size="200px" />
        </div>

        <div className={style.form}>
          <div className={style.input_container}>
            <MdAlternateEmail size="40px" color={Color.MINOR} />
            <input
              type="email"
              value={email}
              onChange={emailChangeHandler}
              placeholder="johndoe@gmail.com"
            />
          </div>

          <div className={style.input_container}>
            <RiLockPasswordFill size="40px" color={Color.MINOR} />
            <input
              type="password"
              value={password}
              onChange={passwordChangeHandler}
              placeholder="***password***"
            />
          </div>
        </div>

        <div className={style.foot}>
          <button onClick={login}>login</button>
        </div>
      </div>
    </div>
  );
}
