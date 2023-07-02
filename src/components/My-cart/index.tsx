import React from 'react';
import { AiOutlinePlus, AiOutlineLine } from 'react-icons/ai';

type Props = {};

const MyCart = (props: Props) => {
  return (
    <div className="sidebar shrink-0 w-[300px] bg-[#fff] text-[14px] rounded-sm mx-[16px] pb-[12px] h-fit">
      <div className="border border-transparent border-b-[#f1f1f1]  px-4 py-2 flex justify-between items-center">
        <div className="uppercase">Giỏ hàng của tôi</div>
        <div className="text-[11px] cursor-pointer ">Xoá tất cả</div>
      </div>

      <div className="mx-[16px]">
        <div className="card flex justify-between items-center border border-transparent border-b-[#f1f1f1] tracking-tight ">
          <div className="py-3">
            <div className="name ">Ô Long Trân Châu Đường Hổ (M)</div>
            <div className="customize text-[#adaeae]">70% đường,Làm nóng,</div>
            <div className="total text-[#8a733f]">25,000đ x 1 = 25,000đ</div>
          </div>
          <div className="flex">
            <div className="quantity w-[20px] h-[20px] bg-[#799dd9] rounded-full text-white flex justify-around items-center">
              <AiOutlineLine className="" />
            </div>
            <div className="amount mx-2">1</div>
            <div className="quantity w-[20px] h-[20px] bg-[#799dd9] rounded-full text-white flex justify-around items-center">
              <AiOutlinePlus />
            </div>
          </div>
        </div>

        <div className="card flex justify-between items-center border border-transparent border-b-[#f1f1f1] tracking-tight ">
          <div className="py-3">
            <div className="name ">Ô Long Trân Châu Đường Hổ (M)</div>
            <div className="customize text-[#adaeae]">70% đường,Làm nóng,</div>
            <div className="total text-[#8a733f]">25,000đ x 1 = 25,000đ</div>
          </div>
          <div className="flex">
            <div className="quantity w-[20px] h-[20px] bg-[#799dd9] rounded-full text-white flex justify-around items-center">
              <AiOutlineLine className="" />
            </div>
            <div className="amount mx-2">1</div>
            <div className="quantity w-[20px] h-[20px] bg-[#799dd9] rounded-full text-white flex justify-around items-center">
              <AiOutlinePlus />
            </div>
          </div>
        </div>

        <div className="cart ">
          <div className="cart-ss2 flex justify-start items-center my-5">
            <img className="img-toco h-[40px] pr-2" src="src/assets/icon-glass-tea.png" />
            <span className="cart-ss2-one pr-2">x</span>
            <span className="cart-ss2-two pr-2 text-[#8a733f]">1</span>
            <span className="cart-ss2-three pr-2">=</span>
            <span className="cart-ss2-four text-[#8a733f]">25,000đ</span>
          </div>
          <div className="cart-ss3">
            <button className='bg-[#d8b979] text-white text-center rounded-xl py-1 w-full'>Thanh toán</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyCart;
