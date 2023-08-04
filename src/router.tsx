import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import Signin from './pages/Sign-in/Signin';
import Signup from './pages/Sign-up/Signup';
import ProductsPage from './pages/Products/Products';
import Checkout from './pages/Checkout/Checkout';
import AccountLayout from './layouts/AccountLayout/accountLayout';
import { MyInfor, MyOrder, MyVoucher } from './components';
import ClientLayout from './layouts/client';
import AdminLayout from './layouts/admin';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import UserList from './pages/admin/Users/Users';
import Categories from './pages/admin/Categories/Categories';
import ProductsList from './pages/admin/Products/Products';
import Topping from './pages/admin/Toppings/Topping';
import Sizes from './pages/admin/Sizes/Sizes';
import PageNotFound from './pages/404/404';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/products',
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
    ],
  },
  {
    path: '/account-layout',
    element: <AccountLayout />,
    children: [
      {
        index: true,
        element: <MyInfor />,
      },
      {
        path: 'my-order',
        element: <MyOrder />,
      },
      {
        path: 'my-voucher',
        element: <MyVoucher />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <UserList />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'products',
        element: <ProductsList />,
      },
      {
        path: 'orders',
        element: 'order',
      },
      {
        path: 'orders/:id',
        element: 'Order-detail',
      },
      {
        path: 'toppings',
        element: <Topping />,
      },
      {
        path: 'sizes',
        element: <Sizes />,
      },
    ],
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export default routes;
