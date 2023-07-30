'use client';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MyInfor, MyOrder, MyVoucher } from './components';

import AccountLayout from './layouts/AccountLayout/accountLayout';
import AdminLayout from './layouts/admin';
import Categories from './pages/admin/Categories/Categories';
import Checkout from './pages/Checkout/Checkout';
import ClientLayout from './layouts/client';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import { Flowbite } from 'flowbite-react';
import HomePage from './pages/Home/HomePage';
import ProductsList from './pages/admin/Products/Products';
import ProductsPage from './pages/Products/Products';
import Signin from './pages/Sign-in/Signin';
import Signup from './pages/Sign-up/Signup';
import Sizes from './pages/admin/Sizes/Sizes';
import Topping from './pages/admin/Toppings/Topping';
import UserList from './pages/admin/Users/Users';
import theme from './flowbite-theme';

const App = () => {
  return (
    <Flowbite theme={{ theme }}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<HomePage />} />
          <Route path="products" element={<ClientLayout />}>
            {/* <Route index element="Home page" /> */}
            <Route index element={<ProductsPage />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>

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

          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserList />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<ProductsList />} />
            <Route path="orders" element="Orders" />
            <Route path="orders/:id" element="Order-detail" />
            <Route path="toppings" element={<Topping />} />
            <Route path="sizes" element={<Sizes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Flowbite>
  );
};

export default App;
