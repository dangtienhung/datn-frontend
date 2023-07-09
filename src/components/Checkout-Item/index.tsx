import React from 'react';

type Props = {};

const CheckoutItem = (props: Props) => {
  return (
    <div className="item py-2 flex gap-x-3 border-transparent border border-b-[#f1f1f1]">
      <img
        className="w-[70px] max-w-[70px]"
        src="https://tocotocotea.com/wp-content/uploads/2023/05/O-Long-Man-Chanh-Leo.jpg"
        alt=""
      />
      <div className="content-item">
        <div className="title pb-[5px]">
          <h4 className="font-bold text-sm ">Ô Long Mận Chanh Leo(M)</h4>
        </div>
        <div className="cutoms pl-[5px] ">
          <span className="text-[#7c7c7c] text-[13px] ">70% đường,Làm nóng,</span>
        </div>
        <div className="quanlity pl-[5px] pt-[3px]">
          <p className="text-[13px] text-[#8a733f] font-bold">25.000đ x 1 = 25.000đ</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
