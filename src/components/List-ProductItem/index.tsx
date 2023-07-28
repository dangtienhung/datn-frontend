import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

type Props = {};

const ListProductItem = (props: Props) => {
  return (
    <div className="product relative sidebar bg-[#fff] w-[calc(50%-5px)] sm:w-[calc(33.33333%-10px)] p-[15px] tracking-tight text-[14px] mb-3">
      <img
        className="align-middle w-[100%]"
        src="https://tocotocotea.com/wp-content/uploads/2023/05/O-Long-Man-Chanh-Leo.jpg"
        alt=""
      />
      <div className="flex flex-col">
        <div className="product-name  mt-[20px] mb-[10px] flex-1">Trà sữa chân trâu hoàng kim</div>
        <div className="product-price mt-auto flex-shrink-0">
          <p className="product-origin-price text-[#8a733f] mb-[20px]">25,000đ</p>
        </div>
      </div>
      <div className="quantity w-[20px] h-[20px] bg-[#799dd9] rounded-full text-white absolute right-[15px] bottom-[15px] flex justify-around items-center">
        <AiOutlinePlus />
      </div>
    </div>
  );
};

export default ListProductItem;
