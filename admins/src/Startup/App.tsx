import { JSX } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@utils';
import './App.scss';

export function App(): JSX.Element {
  return (
    <RouterProvider
      router={router()}
      fallbackElement={<p>Initial Load...</p>}
    />
  );
}
