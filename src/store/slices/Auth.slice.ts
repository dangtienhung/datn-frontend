import { createSlice } from '@reduxjs/toolkit';
import { responseUser } from '../../interfaces/user.type';
import { Auth } from '../../api/Auth';

const initialState: responseUser = {
  user: {
    googleId: '',
    twitterId: '',
    githubId: '',
    facebookId: '',
    username: '',
    account: '',
    avatar: '',
    password: '',
    address: '',
    products: [],
    order: [],
    role: '',
    accessToken: '',
    refreshToken: '',
  },
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    refreshUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(Auth.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.user = payload.user;
    });
    builder.addMatcher(Auth.endpoints.logout.matchFulfilled, (state) => {
      state.user = {};
    });
  },
});

export const { refreshUser } = AuthSlice.actions;

export default AuthSlice.reducer;
