'use client';

import { RouterProvider } from 'react-router-dom';

import { Flowbite } from 'flowbite-react';
import theme from './flowbite-theme';
import routes from './router';

const App = () => {
  return (
    <Flowbite theme={{ theme }}>
      <RouterProvider router={routes} />
    </Flowbite>
  );
};

export default App;
