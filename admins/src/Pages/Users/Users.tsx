import { ChangeEvent, JSX, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import style from './Users.module.scss';
import { UserHeader } from '@containers';
import { Next, UsersTable } from '@components';
import { AUTH_TOKEN, formatToken, REACT_APP_API_ENDPOINT, SIZE } from '@utils';

export function Users(): JSX.Element {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const nav = useNavigate();

  const [analytics, setAnalytics] = useState({
    userCount: 0,
    noteCount: 0,
    notePerUser: 0,
  });

  const [search, setSearch] = useState<string>('');

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const [authToken, setAuthToken] = useState<string>('');

  useEffect(() => {
    console.log({ error, isLoading });
    const token = localStorage.getItem(AUTH_TOKEN);

    if (token) {
      setAuthToken(() => token);
    } else {
      nav('/login');
    }

    Promise.all([fetchUsers(token!), fetchAnalytics(token!)]).then();
  }, []);

  const onSearch = async () => {
    fetchUsers(authToken, search).then();
  };

  const fetchAnalytics = async (token: string) => {
    try {
      console.log({ search, authToken });
      setIsLoading(true);

      const response = await axios.get(
        `${REACT_APP_API_ENDPOINT}/user/analytics`,
        {
          headers: {
            Authorization: formatToken(token),
          },
          params: {},
        },
      );

      setAnalytics(response.data.data);
    } catch (e) {
      setError('abc');
    }
  };

  const fetchUsers = async (token: string, search?: string) => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${REACT_APP_API_ENDPOINT}/user/${search ? `search?search=${search}` : 'all'}`,
        {
          headers: {
            Authorization: formatToken(token),
          },
          params: {
            size: SIZE,
          },
        },
      );

      setHasNext(response.data.data.page.hasNextPage);
      setHasPrev(response.data.data.page.hasPreviousPage);
      setUsers(response.data.data.items);
    } catch (e) {
      setError('error from the server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.container_minor}>
        <div>
          <UserHeader
            onSearchChange={inputChangeHandler}
            search={search}
            onSearch={onSearch}
            analytics={[
              analytics.userCount,
              analytics.noteCount,
              analytics.notePerUser,
            ]}
          />
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
