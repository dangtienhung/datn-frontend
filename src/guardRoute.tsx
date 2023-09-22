import { Navigate, Outlet, useNavigate } from 'react-router-dom'

import { RootState } from './store/store'
import { useAppSelector } from './store/hooks'
import { useEffect } from 'react'
import { toLower } from 'lodash'

interface Props {
  JSX: () => JSX.Element
}

export const GuardSign = ({ JSX }: Props) => {
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth)
  const navigate = useNavigate()
  const { pathname } = location
  useEffect(() => {
    console.log(pathname)

    if (['admin', 'Shipper', 'Staff'].includes(user.role?.name) && user.role.status === 'active') {
      navigate(`/${toLower(user.role.name)}`)
    } else if (user.role?.name === 'customer') {
      navigate('/')
    }
  }, [navigate, user])
  return !user.role?.name ? <JSX /> : <Navigate to={'/'} />
}

export const GuardAccount = ({ JSX }: Props) => {
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth)
  return ['customer', 'Shipper', 'Staff', 'admin'].includes(user.role?.name) && user.role.status === 'active' ? (
    <JSX />
  ) : (
    <Navigate to={'/'} />
  )
}

const GuardAuth = () => {
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth)
  const navigate = useNavigate()
  const { pathname } = location
  useEffect(() => {
    if (!user.role?.name) {
      navigate('/')
    }
  }, [user])
  return pathname.split('/')[1] === toLower(user.role?.name) && user.role.status === 'active' ? (
    <Outlet />
  ) : (
    <Navigate to={`/${toLower(user.role?.name)}`} />
  )
}

export default GuardAuth
