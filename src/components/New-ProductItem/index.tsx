import React from 'react';
import { Button } from '..';

type Props = {};

const NewProductItem = (props: Props) => {
  return (
    <div className="item-product w-[24%] mb-8 relative overflow-hidden shadow-[0_2px_1.5px_0_#ccc] transition-all group">
      <div className="tags flex w-full absolute p-4 top-0 justify-between items-center z-10">
        <span className="-rotate-12 bg-[#d3b673] rounded-[50%] flex justify-center items-center text-white w-10 h-10 text-sm font-bold ">
          new
        </span>
        <span
          className="flex items-center justify-center h-10 w-10 font-bold 
    bg-[#282828] text-[#d3b673] rounded-[50%]"
        >
          31%
        </span>
      </div>
      <div className="img">
        <img
          className="transition-all group-hover:scale-[1.2]"
          src="/O-Long-Man-Chanh-Leo.jpg"
          alt=""
        />
      </div>
      <div className="product-content relative top-[50px] flex flex-col items-center transition-all bg-[#f5f5f5] group-hover:top-0">
        <div className="item-title w-full text-[16px] font-[700] px-2 mt-[18px] text-center">
          <h4> Ô Long Mận Chanh Leo </h4>
        </div>
        <div className="item-price mt-6 flex items-center gap-x-2">
          <span className="text-[#8a733f] text-sm font-[700] ">25,000đ</span>
          <span className="text-[#bebebe] text-sm line-through">36,000đ</span>
        </div>
        <div className="btn-order py-[2px] px-4 mt-4 mb-3 ">
          <Button
            size="small"
            shape="square"
            style="hover:bg-white hover:text-[#d3b673] hover:border hover:border-[#d3b673]"
          >
            Đặt hàng
          </Button>
          {/* <button className="border border-[#d3b673] bg-[#d3b673] text-white uppercase text-[16px] py-[2px]  px-4">
            Đặt hàng
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default NewProductItem;
