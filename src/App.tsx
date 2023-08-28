'use client'

import 'react-toastify/dist/ReactToastify.css'

import { ConfigProvider } from 'antd'
import { Flowbite } from 'flowbite-react'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { antdTheme } from './antd-theme'
import routes from './router'
import theme from './flowbite-theme'

const App = () => {
  return (
    <ConfigProvider theme={antdTheme}>
      <Flowbite theme={{ theme }}>
        <RouterProvider router={routes} />
        <ToastContainer theme='colored' />
      </Flowbite>
    </ConfigProvider>
  )
}

export default App
