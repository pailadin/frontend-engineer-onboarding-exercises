import { configureStore } from '@reduxjs/toolkit';
import configReducer from './reducers/configSlice';

const store = configureStore({
  reducer: {
    config: configReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
