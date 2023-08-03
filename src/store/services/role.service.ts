import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../api/instance';
import { IRole } from '../../interfaces/role.type';
import { pause } from '../../utils/pause';

export const getAllRoles = createAsyncThunk('role/getAllRoles', async () => {
  try {
    const { data } = await http.get('/roles');
    return data.data;
  } catch (error: any) {
    return error.message;
  }
});

export const deleteRole = createAsyncThunk('role/deleteRole', async (id: string) => {
  try {
    const { data } = await http.delete(`/role/${id}`);
    return data.data;
  } catch (error: any) {
    return error.message;
  }
});

export const updateRole = createAsyncThunk('role/updateRole', async (role: IRole) => {
  try {
    await pause(2000);
    const { data } = await http.put(`/role/${role._id}`, { name: role.name });
    return data.data;
  } catch (error: any) {
    return error.message;
  }
});

export const addRole = createAsyncThunk('role/addRole', async (role: IRole) => {
  try {
    await pause(2000);
    const { data } = await http.post('/role', { name: role.name });
    return data.data;
  } catch (error: any) {
    return error.message;
  }
});
