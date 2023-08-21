'use client';

import { RouterProvider } from 'react-router-dom';

import { Flowbite } from 'flowbite-react';
import theme from './flowbite-theme';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastContainer } from 'react-toastify';
import routes from './router';

const App = () => {
  return (
    <Flowbite theme={{ theme }}>
      <RouterProvider router={routes} />
      <ToastContainer theme="colored" />
    </Flowbite>
  );
};

export default App;
