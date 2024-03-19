import { JSX, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.scss';

const router = createBrowserRouter(
  [
    {
      id: 'root',
      path: '/',
    },
  ],
  {
    basename: '/melon',
  },
);

export function App(): JSX.Element {
  useEffect(() => {
    console.log('MOUNTING.....');
  }, []);

  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}
