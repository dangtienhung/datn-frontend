import { MyInfor, MyOrder, MyVoucher } from './components'
import GuardAuth, { GuardAccount, GuardSign } from './guardRoute'

import Achievement from './components/Achievement/Achievement'
import BrandStory from './components/Blogs/BrandStory/BrandStory'
import Events from './components/Blogs/Events/Events'
import LayoutBlog from './components/Blogs/Layout/LayoutBlog'
import News from './components/Blogs/News/News'
import Introduce from './components/Introduce/Introduce'
import MyAddress from './components/My-address'
import AccountLayout from './layouts/AccountLayout/accountLayout'
import AdminLayout from './layouts/admin'
import ClientLayout from './layouts/client'
import Checkout from './pages/Checkout/Checkout'
import HomePage from './pages/Home/HomePage'
import NotFound from './pages/Not-Found/NotFound'
import ProductsPage from './pages/Products/Products'
import Categories from './pages/admin/Categories/Categories'
import Dashboard from './pages/admin/Dashboard/Dashboard'
import OrderDetail from './pages/admin/Order-Detail/OrderDetail'
import Orders from './pages/admin/Orders/Orders'
import ProductsList from './pages/admin/Products/Products'
// import Role from './pages/admin/Manager-Staff-Shipper/Role'
import { createBrowserRouter } from 'react-router-dom'
import Signin from './pages/Sign-in/Signin'
import Signup from './pages/Sign-up/Signup'
import Manager from './pages/admin/Manager-Staff-Shipper/Manager'
import SizeList from './pages/admin/Size/Size'
import Topping from './pages/admin/Toppings/Topping'
import TrashCan from './pages/admin/Trash-can/TrashCan'
import UserList from './pages/admin/Users/Users'
import Voucher from './pages/admin/Voucher/Voucher'

import ForgotPassword from './pages/Forgot-password/ForgotPassword'
import Banner from './pages/admin/Banner/Banner'
import Blogs from './pages/admin/Blogs/Blogs'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/signin',
    element: <GuardSign JSX={Signin} />
  },
  {
    path: '/signup',
    element: <GuardSign JSX={Signup} />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/products',
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <ProductsPage />
      },
      {
        path: 'checkout',
        element: <Checkout />
      }
    ]
  },
  {
    path: 'about',
    element: <Introduce />
  },
  {
    path: 'achievement',
    element: <Achievement />
  },
  {
    path: 'blogs',
    element: <LayoutBlog />,
    children: [
      {
        index: true,
        path: 'tin-tuc-khuyen-mai',
        element: <News />
      },
      {
        path: 'cau-chuyen-thuong-hieu',
        element: <BrandStory />
      },
      {
        path: 'su-kien',
        element: <Events />
      }
    ]
  },
  {
    path: '/account-layout',
    element: <GuardAccount JSX={AccountLayout} />,
    children: [
      { index: true, element: <MyInfor /> },
      { path: 'my-order', element: <MyOrder /> },
      { path: 'my-voucher', element: <MyVoucher /> },
      { path: 'my-address', element: <MyAddress /> }
    ]
  },
  {
    path: '/admin',
    // element: <GuardAuth />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />
          },
          {
            path: 'users',
            element: <UserList />
          },

          {
            path: 'orders',
            element: <Orders />
          },
          {
            path: 'orders/:id',
            element: <OrderDetail />
          },

          {
            path: 'manage',
            element: <Manager />,
            children: [
              {
                path: 'products',
                element: <ProductsList />
              },
              {
                path: 'toppings',
                element: <Topping />
              },
              {
                path: 'size',
                element: <SizeList />
              },
              {
                path: 'categories',
                element: <Categories />
              },
              // {
              //   path: 'staff',
              //   element: <Staff />
              // },
              // {
              //   path: 'shipper',
              //   element: <Shipper />
              // },
              {
                path: 'blogs',
                element: <Blogs />
              }
            ]
          },

          {
            path: 'voucher',
            element: <Voucher />
          },
          {
            path: 'banners',
            element: <Banner />
          },
          {
            path: 'trash-can',
            element: <TrashCan />
          }
        ]
      }
    ]
  },

  {
    path: '*',
    element: <NotFound />
  }
])

export default routes
