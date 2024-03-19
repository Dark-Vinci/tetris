import { JSX, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@utils';
import './App.scss';

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
