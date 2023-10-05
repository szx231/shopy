import { configureStore } from '@reduxjs/toolkit';
import Filters from './Filters';
import NewProduct from './NewProduct';

export const store = configureStore({
  reducer: {
    Filters,
    NewProduct,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
