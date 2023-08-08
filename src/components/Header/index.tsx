import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '..';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../store/hooks';
import { getAllProducts } from '../../store/services/product.service';

type Props = {};

const Header = (props: Props) => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.persistedReducer.auth);

  useEffect(() => {
    dispatch(getAllProducts(text));
  }, [text]);

  return (
    <div className="header flex justify-between items-center px-4 py-2 gap-2">
      <div className="logo hidden lg:block">
        <Link to={'/'}>
          <img src="/logo.png" alt="" className="w-[150px]" />
        </Link>
      </div>
      <div className="search w-full lg:flex items-center justify-center">
        <Input
          prefix={<AiOutlineSearch className="text-xl ml-2 text-[#bebec2] absolute" />}
          type="search"
          placeholder="Tìm kiếm sản phẩm..."
          setText={setText}
        />
      </div>
      {user?.avatar ? (
        <div>
          <Link to="/account-layout">
            <img
              className="w-[30px] h-[30px] rounder-full mr-[8px] object-cover"
              src={user?.avatar}
              alt=""
            />
          </Link>
        </div>
      ) : (
        <div className="text-sm px-[15px] py-[6px] bg-[#d8b979] text-white text-center rounded-3xl">
          <Link to="/signin" className="block w-max">
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
