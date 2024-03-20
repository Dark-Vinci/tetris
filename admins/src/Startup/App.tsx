import { JSX } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@utils';
import './App.scss';

// process.env.REACT_APP_API_ENDPOINT = 'http://localhost:8080/notes/api';

export function App(): JSX.Element {
  // const [userID, setUserID] = useState<string>('');
  // const [authToken, setAuthToken] = useState<string>('');
  //
  // useEffect(() => {
  //   const token = localStorage.getItem(AUTH_TOKEN);
  //
  //   if (token) {
  //     setAuthToken(token);
  //   }
  //
  //   const userId = localStorage.getItem(USER_ID);
  //
  //   if (userId) {
  //     setUserID(userID);
  //   }
  // }, []);

  return (
    <RouterProvider
      router={router()}
      fallbackElement={<p>Initial Load...</p>}
    />
  );
}
