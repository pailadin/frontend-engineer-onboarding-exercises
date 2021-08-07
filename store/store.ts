import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
