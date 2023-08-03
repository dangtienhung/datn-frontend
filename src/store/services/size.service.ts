import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../api/instance';
import { ISize } from '../../interfaces/size.type';
import { pause } from '../../utils/pause';

export const getAllSizes = createAsyncThunk('size/getAllSizes', async () => {
  try {
    const { data } = await http.get('/sizes');
    return data.docs;
  } catch (error: any) {
    return error.message;
  }
});

export const deleteSize = createAsyncThunk('size/deleteSize', async (id: string) => {
  try {
    const { data } = await http.delete(`/size/${id}`);
    return data;
  } catch (error) {
    return error;
  }
});

export const addSize = createAsyncThunk('size/addSize', async (size: ISize) => {
  try {
    await pause(2000);
    const { data } = await http.post('/size', size);
    return data.data;
  } catch (error) {
    return error;
  }
});

export const updateSize = createAsyncThunk('size/updateSize', async (size: ISize) => {
  try {
    await pause(2000);
    const { data } = await http.put(`/size/${size._id}`, { name: size.name, price: size.price });
    return data;
  } catch (error: any) {
    return error.message;
  }
});
