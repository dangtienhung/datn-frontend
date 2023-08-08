import { IProduct } from './products.type';
import { IUser } from './user.type';

export interface IOrder {
  user: IUser;
  items: {
    product: IProduct;
    quantity: number;
    price: number;
    topping: {
      name: string;
      price: number;
    }[];
    size: {
      name: string;
      price: number;
    };
  }[];
  status: 'pending' | 'confirmed' | 'delivered' | 'done' | 'canceled';
  total: number;
  noteOrder?: string;
  priceShipping: number;
  inforOrderShipping: {
    name: string;
    address: string;
    phone: string;
    noteShipping?: string;
    is_active: boolean;
  };
}

export interface IOrderDocs {
  docs: IOrder[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: false;
  hasNextPage: false;
  prevPage: null;
  nextPage: null;
}
