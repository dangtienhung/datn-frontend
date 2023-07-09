import React from 'react';
import { Button } from '..';
import NewProductItem from '../New-ProductItem';
import { Link } from 'react-router-dom';

type Props = {};

const NewProducts = (props: Props) => {
  return (
    <section className="pt-[50px] pb-[60px] mx-auto w-[1140px] max-w-[1140px]">
      <div className="title flex flex-col items-center">
        <div className="sub-title">
          <h4 className="text-[#d3b673] text-[22px] mb-[5px] font-bold">ToCoToCo Menu</h4>
        </div>
        <div className="main-title">
          <h2 className="text-4xl text-center text-black px-[50px] uppercase font-bold mb-2">
            Sản phẩm nổi bật
          </h2>
        </div>
        <div className="bg_title"></div>
      </div>
      <div className="flex flex-col container">
        <div className="list mt-[50px] flex flex-wrap gap-x-3">
          <NewProductItem />
          <NewProductItem />
          <NewProductItem />
          <NewProductItem />
          <NewProductItem />
        </div>
        <div className="mt-4 self-center">
          <Link to="/products">
            <Button
              size="medium"
              shape="square"
              style="border border-[#d3b673]  hover:text-[#d3b673] hover:bg-white"
            >
              Xem tất cả
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewProducts;
