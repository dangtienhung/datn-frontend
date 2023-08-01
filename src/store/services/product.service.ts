import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../api/instance';
import { HiHand } from 'react-icons/hi';

/* lấy ra tất cả sản phẩm */
export const getAllProducts = createAsyncThunk('product/getAllProducts', async () => {
  try {
    const response = await http.get('/products');
    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
});
