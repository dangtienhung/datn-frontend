import { IProduct } from '../../../interfaces/products.type';
import { IRole } from '../../../interfaces/role.type';

import { ITopping } from '../../../interfaces/topping.type';
import { CartItemState } from './cart.type';

interface inforOrderShipping {
  name: string;
  phone: string;
  address: string;
  noteShipping: string;
}
export interface IOrderCheckout {
  user: string;
  items: Omit<CartItemState, 'total'>[] | number[];
  total: number;
  priceShipping: number;
  noteOrder: string | undefined;
  paymentMethodId: string;
  inforOrderShipping: inforOrderShipping;
}

export interface dataDocsOrderRes {
  _id: string;
  inforOrderShipping: inforOrderShipping;
  user: {
    _id: string;
    username: string;
    avatar: string;
    account: string;
    role: Omit<IRole, 'users'>;
  };
  items: {
    size: {
      name: string;
      price: number;
    };
    product: IProduct;
    toppings: Pick<ITopping, '_id' | 'name' | 'price'>[];
    quantity: number;
    price: number;
  }[];
  status: string;
  total: number;
  priceShipping: number;
  paymentMethodId: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface IOrderRes {
  docs: dataDocsOrderRes[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null;
  nextPage: null;
}
