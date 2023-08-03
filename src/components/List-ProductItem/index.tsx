import { AiOutlinePlus } from 'react-icons/ai';
import { IProduct } from '../../interfaces/products.type';
import { formatCurrency } from '../../utils/formatCurrency';
import { useState } from 'react';

interface ListProductItemProps {
  product: IProduct;
  fetchProductById: (id: number | string) => void;
}

const ListProductItem = ({ product, fetchProductById }: ListProductItemProps) => {
  return (
    <div
      onClick={() => fetchProductById(product._id!)}
      className="select-none w-full cursor-pointer hover:bg-[d3b673] product relative sidebar bg-[#fff] p-[15px] tracking-tight text-[14px] mb-3"
    >
      <img className="align-middle w-[100%]" src={product.images[0].url} alt={product.name} />
      <div className="flex flex-col">
        <div className="product-name  mt-[20px] mb-[10px] flex-1">{product.name}</div>
        <div className="product-price flex flex-shrink-0 gap-3 mt-auto">
          <p className="product-origin-price text-[#8a733f] mb-[20px]">
            {product.sale !== 0
              ? formatCurrency(product.sizes[0].price - product.sale)
              : formatCurrency(product.sizes[0]?.price)}
          </p>
          {product.sale !== 0 && (
            <span className="text-[#bebebe] text-[13px] line-through">
              {formatCurrency(product.sizes[0].price)}
            </span>
          )}
        </div>
      </div>
      <div className="quantity w-[20px] h-[20px] bg-[#799dd9] rounded-full text-white absolute right-[15px] bottom-[15px] flex justify-around items-center">
        <AiOutlinePlus />
      </div>
    </div>
  );
};

export default ListProductItem;