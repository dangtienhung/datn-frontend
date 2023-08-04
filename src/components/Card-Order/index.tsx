import { AiOutlineLine, AiOutlinePlus } from 'react-icons/ai';

import { CartLists } from '../../store/slices/types/cart.type';
import { formatCurrency } from '../../utils/formatCurrency';
import { v4 as uuidv4 } from 'uuid';

type CardOrderProps = {
  product: CartLists;
};

const CardOrder = ({ product }: CardOrderProps) => {
  return (
    <div className="card flex justify-between items-center border border-transparent border-b-[#f1f1f1] tracking-tight ">
      <div className="py-3">
        <div className="name ">{product?.name}</div>
        {product?.items?.length > 0 &&
          product?.items?.map((item) => (
            <div className="flex items-center gap-1" key={uuidv4()}>
              <div>
                <p className="text-sm text-[#adaeae] truncate">{item.size.name}</p>
                <div className="customize text-[#adaeae] truncate w-[182px]" key={uuidv4()}>
                  <span className="overflow-hidden truncate">
                    {item.toppings?.map((topping) => topping.name).join(', ')}
                  </span>
                </div>
                <div className="total text-[#8a733f]">
                  {formatCurrency(item.total)} x {item.quantity} = {formatCurrency(item.total)}
                </div>
              </div>
              <div className="flex">
                <div className="quantity w-[20px] h-[20px] bg-[#799dd9] rounded-full text-white flex justify-around items-center">
                  <AiOutlineLine className="" />
                </div>
                <div className="mx-2 amount">1</div>
                <div className="quantity w-[20px] h-[20px] bg-[#799dd9] rounded-full text-white flex justify-around items-center">
                  <AiOutlinePlus />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardOrder;
