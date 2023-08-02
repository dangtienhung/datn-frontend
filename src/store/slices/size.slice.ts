import { Action, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISize, ISizeDocs, ISizeResponse } from '../../interfaces/size.type';
import { addSize, deleteSize, getAllSizes, updateSize } from '../services/size.service';
import { boolean } from 'yup';

interface ISizeState {
  sizes: ISize[];
  isLoading: boolean;
  error: string;
}

const initialState: ISizeState = {
  sizes: [],
  isLoading: false,
  error: '',
};

export const sizeSlice = createSlice({
  name: 'size',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getAll
    builder.addCase(getAllSizes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllSizes.fulfilled, (state, action) => {
      state.sizes = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllSizes.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.isLoading = false;
    });

    //delete
    // builder.addCase(deleteSize.pending, (state) => {
    //   state.isLoading = true;
    // });
    builder.addCase(deleteSize.fulfilled, (state, action) => {
      state.sizes = state.sizes.filter((item) => item._id !== action.payload.data._id);
    });
    builder.addCase(deleteSize.rejected, (state, action) => {
      state.error = action.error.message || 'Error!';
    });

    //add size
    // builder.addCase(addSize.pending, (state)=> {
    //   state.isLoading =
    // })
    builder.addCase(addSize.fulfilled, (state, action: any) => {
      state.sizes.unshift(action.payload);
    });
    builder.addCase(addSize.rejected, (state, action) => {
      state.error = action.error.message || 'error';
    });

    //update size
    builder.addCase(updateSize.fulfilled, (state, action) => {
      const size = action.payload.data;
      state.sizes = state.sizes.map((item) => (item._id === size._id ? size : item));
    });
    builder.addCase(updateSize.rejected, (state, action: any) => {
      console.log(action.payload);

      state.error = action.payload;
    });
  },
});

export const sizeReducer = sizeSlice.reducer;
