import { CartItem, CartLists } from './types/cart.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { arraysAreEqual } from '../../utils/arrayAreEqual';

interface CartState {
  items: CartLists[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const product = action.payload;
      // /* check xem đã có sản phẩm nào tồn tại bên trong giỏ hàng chưa */
      const products = [...state.items];
      const productIndex = products.findIndex((item) => item.name === product.name);
      if (productIndex < 0) {
        state.items.push({
          name: product.name,
          items: [
            {
              image: product.image,
              price: product.price,
              quantity: product.quantity,
              size: product.size,
              toppings: product.toppings,
              total: product.total,
            },
          ],
        });
        state.total += product.total;
      } else {
        /* check xem có sản phẩm có trùng size không */
        const productSizeIndex = products[productIndex].items.findIndex(
          (item) => item.size.name === product.size.name
        );
        if (productSizeIndex < 0) {
          const newProduct = {
            image: product.image,
            price: product.price,
            quantity: product.quantity,
            size: product.size,
            toppings: product.toppings,
            total: product.total,
          };
          state.items[productIndex].items.push(newProduct);
        } else {
          /* nếu mà trùng size & trùng tên => không có topping => thêm mới sản phẩm */
          if (product.toppings.length === 0 && product.quantity === 1) {
            /* tăng số lượng lên */
            state.items[productIndex].items[productSizeIndex].quantity += product.quantity;
            state.items[productIndex].items[productSizeIndex].total += product.total;
          }
          if (product.toppings.length === 0 && product.quantity > 1) {
            /* tăng số lượng lên */
            state.items[productIndex].items[productSizeIndex].quantity += product.quantity;
            state.items[productIndex].items[productSizeIndex].total += product.total;
          }
          /* nếu mà trùng size & trùng tên => có topping => thêm mới sản phẩm */
          if (
            product.toppings.length > 0 &&
            state.items[productIndex].items[productSizeIndex].quantity === 1
          ) {
            const newProduct = {
              image: product.image,
              price: product.price,
              quantity: product.quantity,
              size: product.size,
              toppings: product.toppings,
              total: product.total,
            };
            console.log('test1');
            state.items[productIndex].items.push(newProduct);
          }
          /* nếu mà trùng size & trùng tên => có topping => tăng số lượng lên */
          if (
            product.toppings.length > 0 &&
            state.items[productIndex].items[productSizeIndex].quantity > 1
          ) {
            // state.items[productIndex].items[productSizeIndex].quantity += product.quantity;
            // state.items[productIndex].items[productSizeIndex].total += product.total;
            const newProduct = {
              image: product.image,
              price: product.price,
              quantity: product.quantity,
              size: product.size,
              toppings: product.toppings,
              total: product.total,
            };
            state.items[productIndex].items.push(newProduct);
          }
        }
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
