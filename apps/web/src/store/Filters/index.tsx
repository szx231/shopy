import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersType {
  searchValue: string;
  fromPrice: number;
  toPrice: number;
  sortBy: string;
  page: number;
}

const initialState: FiltersType = {
  searchValue: '',
  fromPrice: 0,
  toPrice: 0,
  sortBy: 'newest',
  page: 0,
};

export const filtersSlice = createSlice({
  name: 'filtersValue',
  initialState,
  reducers: {
    filtersChangeValue: (state, action: PayloadAction<{ key: keyof typeof state; value: any }>) => {
      state[action.payload.key] = action.payload.value;
    },
    clearPriceRange: (state) => {
      state.fromPrice = 0;
      state.toPrice = 0;
    },
    resetAll: (state) => {
      state.searchValue = '';
      state.fromPrice = 0;
      state.toPrice = 0;
      state.sortBy = 'newest';
      state.page = 0;
    },
  },
});

export const { filtersChangeValue, clearPriceRange, resetAll } = filtersSlice.actions;

export default filtersSlice.reducer;
