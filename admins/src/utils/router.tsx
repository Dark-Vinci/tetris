import { createBrowserRouter } from 'react-router-dom';

import { Login, Notes, User, Users, Welcome } from '@pages';

export function router() {
  return createBrowserRouter(
    [
      {
        id: 'notes',
        path: '/notes',
        Component: Notes,
      },
      {
        id: 'login',
        path: '/login',
        Component: Login,
      },
      {
        id: 'users',
        path: '/user/:userId',
        Component: User,
      },
      {
        path: '',
        Component: Welcome,
      },
      {
        path: '/users',
        Component: Users,
      },
    ],
    {
      basename: '/melon',
    },
  );
}
