import { JSX, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import style from './Users.module.scss';
import { UserHeader } from '@containers';
import { Next, UsersTable } from '@components';
import { AUTH_TOKEN, REACT_APP_API_ENDPOINT } from '@utils';

export function Users(): JSX.Element {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const nav = useNavigate();

  const [authToken, setAuthToken] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN);

    console.log({ token });

    if (token) {
      setAuthToken(token);
    } else {
      nav('/login');
    }
  }, []);

  const fetchUsers = async () => {
    try {
      console.log({ error, users, isLoading });
      setIsLoading(true);

      const response = await axios.get(`${REACT_APP_API_ENDPOINT}/user/all`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log({ abc: response.data.data });

      setHasNext(response.data.data.page.hasNextPage);
      setHasPrev(response.data.data.page.hasPreviousPage);

      setUsers(response.data.data.items);
    } catch (e) {
      setError('abc');
      console.log({ e });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers().then();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.container_minor}>
        <div>
          <UserHeader />
        </div>

        <div>
          <UsersTable data={users} />
        </div>

        <div className={style.more}>
          <Next hasNext={hasNext} hasPrev={hasPrev} />
        </div>
      </div>
    </div>
  );
}
