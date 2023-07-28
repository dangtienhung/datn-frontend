import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../api/instance';

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
