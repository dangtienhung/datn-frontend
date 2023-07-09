import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

type Props = {};

const HeaderHomePage = (props: Props) => {
  return (
    <header className="w-full absolute z-[99] py-3">
      <div className="container my-0 mx-auto flex items-center justify-between">
        <div className="left flex items-center">
          <Link to="/">
            <img className="w-[200px] max-w-[200px]" src="/logo.png" alt="" />
          </Link>
          <div className="menu">
            <nav className="ml-[30px] text-white">
              <ul className="flex gap-x-5 uppercase">
                <li className="font-[700] py-2 text-sm ">
                  <Link to="/">Trang chủ</Link>
                </li>
                <li className="font-[700] py-2 text-sm ">
                  <Link to="/">Trang chủ</Link>
                </li>
                <li className="font-[700] py-2 text-sm ">
                  <Link to="/">Trang chủ</Link>
                </li>
                <li className="font-[700] py-2 text-sm ">
                  <Link to="/">Trang chủ</Link>
                </li>
                <li className="font-[700] py-2 text-sm ">
                  <Link to="/">Trang chủ</Link>
                </li>
                <li className="font-[700] py-2 text-sm ">
                  <Link to="/">Trang chủ</Link>
                </li>
                <li className="font-[700] py-2 text-sm ">
                  <Link to="/">Trang chủ</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="right">
          <div className="w-8 h-8 rounded-[50%] flex items-center justify-center bg-[#d3b673] text-white">
            <FaSearch />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderHomePage;
