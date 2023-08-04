import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { ApiUser } from '../api/User';
import { Auth } from '../api/Auth';
import AuthReducer from './slices/Auth.slice';

import cartReducer from './slices/cart.slice';
import { productReducer } from './slices/product.slice';
import storage from 'redux-persist/lib/storage';
import { ApiUser } from '../api/User';
import { ApiProduct } from '../api/Product';

import { categoriesReducer } from './slices/categories';
import { ToppingAPI } from '../api/topping';
import ApiVoucher from '../api/voucher';
import SizeApi from '../api/size';
import RoleApi from '../api/role';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['cart'],
};
const rootReducer = combineReducers({
  products: productReducer,
  auth: AuthReducer,
  cart: cartReducer,
  category: categoriesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persistedReducer,
    [Auth.reducerPath]: Auth.reducer,
    [ApiUser.reducerPath]: ApiUser.reducer,
    [ApiProduct.reducerPath]: ApiProduct.reducer,
    [ToppingAPI.reducerPath]: ToppingAPI.reducer,
    [ApiVoucher.reducerPath]: ApiVoucher.reducer,
    [SizeApi.reducerPath]: SizeApi.reducer,
    [RoleApi.reducerPath]: RoleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(Auth.middleware)
      .concat(ApiUser.middleware)
      .concat(ApiProduct.middleware)
      .concat(ToppingAPI.middleware)
      .concat(ApiVoucher.middleware)
      .concat(SizeApi.middleware)
      .concat(RoleApi.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
