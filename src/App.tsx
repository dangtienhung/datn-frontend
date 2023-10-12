'use client'

import 'react-toastify/dist/ReactToastify.css'
import { Flowbite } from 'flowbite-react'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import routes from './router'
import theme from './flowbite-theme'
import { useState } from 'react'
import Loader from './components/Loader'
import { pause } from './utils/pause'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  pause(3000).then(() => {
    setIsLoading(false)
  })
  if (isLoading) return <Loader />
  return (
    <Flowbite theme={{ theme }}>
      <RouterProvider router={routes} />
      <ToastContainer theme='colored' />
    </Flowbite>
  )
}

export default App
