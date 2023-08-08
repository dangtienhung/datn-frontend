import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../api/instance';
import axios from 'axios';

/* lấy ra tất cả sản phẩm */
export const getAllProducts = createAsyncThunk<Response, string>(
  'product/getAllProducts',
  async (data = '') => {
    try {
      const response = await http.get(`/products?_page=1&_limit=10&q=${data}`);
      if (response && response.data) {
        return response.data;
      }
    } catch (error: any) {
      return error.message;
    }
  }
);
