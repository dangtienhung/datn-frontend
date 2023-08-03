import { createSlice } from '@reduxjs/toolkit';
import { IRole } from '../../interfaces/role.type';
import { addRole, deleteRole, getAllRoles, updateRole } from '../services/role.service';
import { boolean } from 'yup';

interface IRoleState {
  roles: IRole[];
  isLoading: boolean;
  isUpdating: boolean;
  isAdding: boolean;
  error: string;
}

const initialState: IRoleState = {
  roles: [],
  isLoading: false,
  isUpdating: false,
  isAdding: false,
  error: '',
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all roles
    builder.addCase(getAllRoles.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllRoles.fulfilled, (state, action) => {
      state.roles = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllRoles.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'error';
    });

    //delete role
    builder.addCase(deleteRole.fulfilled, (state, action) => {
      const id = action.payload._id;
      state.roles = state.roles.filter((item) => item._id !== id);
    });
    builder.addCase(deleteRole.rejected, (state, action) => {
      state.error = action.error.message || 'Error';
    });

    //update role
    builder.addCase(updateRole.pending, (state) => {
      state.isUpdating = true;
    });
    builder.addCase(updateRole.fulfilled, (state, action) => {
      state.isUpdating = false;
      const role = action.payload;
      state.roles = state.roles.map((item) => (item._id === role._id ? role : item));
    });
    builder.addCase(updateRole.rejected, (state, action) => {
      state.isUpdating = false;
      state.error = action.error.message || 'Error';
    });

    //Add role
    builder.addCase(addRole.pending, (state) => {
      state.isAdding = true;
    });
    builder.addCase(addRole.fulfilled, (state, action) => {
      const role = action.payload;
      state.roles.unshift(role);
      state.isAdding = false;
    });
    builder.addCase(addRole.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Error';
    });
  },
});

export const roleReducer = roleSlice.reducer;
