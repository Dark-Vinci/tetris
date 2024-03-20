import { ChangeEvent, JSX, useState } from 'react';
import { MdOutlineAdminPanelSettings, MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import style from './Login.module.scss';
import { AUTH_TOKEN, Color, REACT_APP_API_ENDPOINT, USER_ID } from '@utils';

export function Login(): JSX.Element {
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    try {
      const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailIsValid.test(email)) {
        setError('invalid email');
        return;
      }

      if (password.length < 7) {
        setError('invalid password');
        return;
      }

      setIsLoading(true);

      const response = await axios.post(
        `${REACT_APP_API_ENDPOINT}/user/login`,
        {
          email: email.toLowerCase(),
          password,
        },
      );

      localStorage.setItem(AUTH_TOKEN, response.data.data.token.AccessToken);
      localStorage.setItem(USER_ID, response.data.data.user.ID);

      navigate('/users');
    } catch (e) {
      setError('something went wrong on server');
    } finally {
      setIsLoading(false);
    }
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

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>

        <div className={style.foot}>
          <button onClick={login}>{isLoading ? 'loading...' : 'login'}</button>
        </div>
      </div>
    </div>
  );
}
