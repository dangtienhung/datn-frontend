interface IOrder {
  user?: string;
  items: {
    product: string;
    quantity: number;
    price: number;
  }[];
  status: 'pending' | 'confirmed' | 'delivered' | 'done' | 'canceled';
  total: number;
  priceShipping: number;
  address: string;
  is_active: boolean;
}

interface IOrderDocs {
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
