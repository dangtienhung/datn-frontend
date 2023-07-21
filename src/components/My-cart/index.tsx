import React from 'react';
import { Link } from 'react-router-dom';
import CardOrder from '../Card-Order';

type Props = {};

const MyCart = (props: Props) => {
  return (
    <div className="sidebar shrink-0 w-[300px] bg-[#fff] text-[14px] rounded-sm mx-[16px] pb-[12px] h-fit hidden lg:block">
      <div className="border border-transparent border-b-[#f1f1f1]  px-4 py-2 flex justify-between items-center">
        <div className="uppercase">Giỏ hàng của tôi</div>
        <div className="text-[11px] cursor-pointer ">Xoá tất cả</div>
      </div>

      <div className="mx-[16px]">
        <CardOrder />
        <CardOrder />
        <CardOrder />

        <div className="cart ">
          <div className="cart-ss2 flex justify-start items-center my-5">
            <img className="img-toco h-[40px] pr-2" src="/icon-glass-tea.png" />
            <span className="cart-ss2-one pr-2">x</span>
            <span className="cart-ss2-two pr-2 text-[#8a733f]">1</span>
            <span className="cart-ss2-three pr-2">=</span>
            <span className="cart-ss2-four text-[#8a733f]">25,000đ</span>
          </div>
          <div className="cart-ss3">
            <Link to="checkout">
              <button className="bg-[#d8b979] text-white text-center rounded-xl py-1 w-full">
                Thanh toán
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
