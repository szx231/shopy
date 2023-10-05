import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NewProductType {
  name: string | null;
  price: number | null;
  image: unknown;
}

const initialState: NewProductType = {
  name: null,
  price: null,
  image: null,
};

export const newProductSlice = createSlice({
  name: 'newProductValue',
  initialState,
  reducers: {
    newProductChangeValue: (state, action: PayloadAction<{ key: keyof typeof state; value: any }>) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { newProductChangeValue } = newProductSlice.actions;

export default newProductSlice.reducer;
