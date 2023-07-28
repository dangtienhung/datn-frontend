'use client';

// import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';

// import { MdDashboard } from 'react-icons/md';
// import { Tabs } from 'flowbite-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Sign-in/Signin';
import Signup from './pages/Sign-up/Signup';
import ClientLayout from './layouts/client';
import Checkout from './pages/Checkout/Checkout';
import ProductsPage from './pages/Products/Products';
import HomePage from './pages/Home/HomePage';
import { Flowbite } from 'flowbite-react';
import theme from './flowbite-theme';
import AdminLayout from './layouts/admin';
import UserList from './pages/admin/Users/Users';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import ProductsList from './pages/admin/Products/Products';
import Topping from './pages/admin/Toppings/Topping';
import Sizes from './pages/admin/Sizes/Sizes';
import Categories from './pages/admin/Categories/Categories';

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
