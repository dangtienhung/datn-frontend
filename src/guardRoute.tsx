import React from 'react';
import PageNotFound from './pages/404/404';
import { useAppSelector } from './store/hooks';
import { RootState } from './store/store';
import { Navigate } from 'react-router-dom';
import Signin from './pages/Sign-in/Signin';

interface Props {
  JSX: () => JSX.Element;
}

export const GuardNotUser = ({ JSX }: Props) => {
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth);

  if (user && Object.keys(user).length > 0) {
    return <Navigate to={'/products'} replace />;
  }

  return <JSX />;
};

export const GuardExistUser = ({ JSX }: Props) => {
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth);

  return Object.keys(user).length <= 0 ? <PageNotFound /> : <JSX />;
};

// export default GuardRoute;
