import React from 'react';
import { SidebarCate, ListProducts, MyCart } from '../../components';
// import { AiOutlinePlus, AiOutlineLine } from 'react-icons/ai';

type Props = {};

const ProductsPage = (props: Props) => {
  return (
    <div>
      {/* <Header /> */}
      <div className="bg-[#fbfbfb]">
        <div className="container mx-auto pt-3">
          <div className="content flex justify-between">
            <SidebarCate />
            <ListProducts />
            <MyCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
