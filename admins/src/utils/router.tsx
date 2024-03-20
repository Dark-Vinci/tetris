import { createBrowserRouter } from 'react-router-dom';

import { Login, Notes, Page404, User, Users, Welcome } from '@pages';

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

      {
        path: '*',
        Component: Page404,
      },
    ],
    {
      basename: '/melon',
    },
  );
}
