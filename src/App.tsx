'use client';

import { RouterProvider } from 'react-router-dom';

import { Flowbite } from 'flowbite-react';
import theme from './flowbite-theme';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import routes from './router';

const App = () => {
  return (
    <Flowbite theme={{ theme }}>
      <ToastContainer />
      <RouterProvider router={routes} />
    </Flowbite>
  );
};

export default App;
