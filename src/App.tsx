'use client';

// import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';

// import { MdDashboard } from 'react-icons/md';
// import { Tabs } from 'flowbite-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Sign-in/Signin';
import Signup from './pages/Sign-up/Signup';
// import HomePage from './pages/Home/home';
import AccountLayout from './layouts/AccountLayout/accountLayout';
import { MyInfor, MyOrder, MyVoucher } from './components';
import ClientLayout from './layouts/client';
import Checkout from './pages/Checkout/Checkout';
import ProductsPage from './pages/Products/Products';
import HomePage from './pages/Home/HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<HomePage />} />

        <Route path="account-layout" element={<AccountLayout />}>
          <Route index element={<MyInfor />} />
          <Route path="my-infor" element={<MyInfor />} />
          <Route path="my-order" element={<MyOrder />} />
          <Route path="my-voucher" element={<MyVoucher />} />
        </Route>

        <Route path="products" element={<ClientLayout />}>
          {/* <Route index element="Home page" /> */}
          <Route index element={<ProductsPage />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        <Route path="admin" element="AdminPage"></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
