import 'react-toastify/dist/ReactToastify.css'
import { Flowbite } from 'flowbite-react'
import { RouterProvider, useLocation, useRoutes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import routes from './router'
import theme from './flowbite-theme'
import Loader from './components/Loader'
import { pause } from './utils/pause'
import { useState } from 'react'

const App = () => {
  // const [isLoading, setIsLoading] = useState(false)
  // useRoutes(routes, {
  //   onTransitionStart: () => {
  //     setIsLoading(true) // Bắt đầu hiển thị hiệu ứng loading khi router thay đổi
  //   },
  //   onTransitionEnd: () => {
  //     setIsLoading(false) // Tắt hiệu ứng loading khi router hoàn thành thay đổi
  //   }
  // })
  return (
    <Flowbite theme={{ theme }}>
      <RouterProvider router={routes} />
      <ToastContainer theme='colored' />
    </Flowbite>
  )
}

export default App
