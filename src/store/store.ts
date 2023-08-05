import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { productReducer } from './slices/product.slice';
import { Auth } from '../api/Auth';
import AuthReducer from './slices/Auth.slice';
import { ApiUser } from '../api/User';
import { ApiProducts } from '../api/Product';
import { categoriesReducer } from './slices/categories';
import { ToppingAPI } from '../api/topping';
import ApiVoucher from '../api/voucher';
import SizeApi from '../api/size';
import RoleApi from '../api/role';
import CategoryApi from '../api/category';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  products: productReducer,
  auth: AuthReducer,
  category: categoriesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persistedReducer,
    [Auth.reducerPath]: Auth.reducer,
    [ApiUser.reducerPath]: ApiUser.reducer,
    [ApiProducts.reducerPath]: ApiProducts.reducer,
    [ToppingAPI.reducerPath]: ToppingAPI.reducer,
    [ApiVoucher.reducerPath]: ApiVoucher.reducer,
    [SizeApi.reducerPath]: SizeApi.reducer,
    [RoleApi.reducerPath]: RoleApi.reducer,
    [CategoryApi.reducerPath]: CategoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      Auth.middleware,
      ApiUser.middleware,
      ApiProducts.middleware,
      ToppingAPI.middleware,
      ApiVoucher.middleware,
      SizeApi.middleware,
      RoleApi.middleware,
      CategoryApi.middleware
    ),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
