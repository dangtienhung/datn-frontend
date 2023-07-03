'use client';

// import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';

// import { MdDashboard } from 'react-icons/md';
// import { Tabs } from 'flowbite-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Sign-in/Signin';
import Signup from './pages/Sign-up/Signup';
import ClientLayout from './layouts/client';
import ProductsList from './pages/ProductsList/ProductsList';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ClientLayout />}>
          <Route index element="Home" />
          <Route path="products" element={<ProductsList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
