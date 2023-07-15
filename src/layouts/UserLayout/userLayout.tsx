import React from 'react';
import { Header } from '../../components';
import { Outlet } from 'react-router-dom';
type Props = {};

const UserLayout = (props: Props) => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default UserLayout;
