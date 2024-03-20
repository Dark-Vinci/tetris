import { JSX, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@utils';
import './App.scss';

// process.env.REACT_APP_API_ENDPOINT = 'http://localhost:8080/notes/api';

export function App(): JSX.Element {
  useEffect(() => {
    console.log('MOUNTING.....');
  }, []);

  return (
    <RouterProvider
      router={router()}
      fallbackElement={<p>Initial Load...</p>}
    />
  );
}
