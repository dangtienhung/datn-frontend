import React from 'react'
import { AiOutlineLine, AiOutlinePlus } from 'react-icons/ai'

type Props = {}

const CardOrder = (props: Props) => {
  return (
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
  )
}

export default CardOrder