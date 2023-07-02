import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '..';
import { AiOutlineSearch } from 'react-icons/ai';

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="header flex justify-between items-center px-4 py-2">
      <div className="logo">
        <img src="/logo.png" alt="" className="w-[150px] " />
      </div>
      <div className="search flex justify-between items-center bg-[#fbfbfb] rounded-2xl">
        <Input
          prefix={<AiOutlineSearch className="text-xl mx-2 text-[#bebec2] " />}
          type="search"
          placeholder="Tìm kiếm sản phẩm..."
        />
      </div>
      <div className="btn bg-[#d8b979] text-white px-4 py-1 rounded-2xl text-[14px] cursor-pointer">
        <Link to="/signin">Đăng nhập</Link>
      </div>
    </div>
  );
};

export default Header;
