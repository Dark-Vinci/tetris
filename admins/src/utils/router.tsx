import { createBrowserRouter } from 'react-router-dom';

import { Login, Notes, Users, Welcome } from '@pages';

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
        path: '/users',
        Component: Users,
      },
      {
        path: '',
        Component: Welcome,
      },
      {
        path: '*',
        Component: Users,
      },
    ],
    {
      basename: '/melon',
    },
  );
}
