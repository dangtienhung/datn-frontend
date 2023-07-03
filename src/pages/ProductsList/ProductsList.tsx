import React from 'react';
import { Cart, Category, Product } from '../../components';

type Props = {};

const ProductsList = (props: Props) => {
  return (
    <div className="order">
      <div className="order-content flex justify-between pt-2 w-[1200px] max-w-[1200px] my-0 mx-auto">
        <Category />
        <Product />
        <Cart />
      </div>
    </div>
  );
};

export default ProductsList;
