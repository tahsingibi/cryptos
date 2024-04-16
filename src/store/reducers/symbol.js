import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  symbol: '',
};

export const { reducer, actions } = createSlice({
  name: 'symbol',
  initialState,
  reducers: {
    setSymbol: (state, action) => {
      state.symbol = action.payload;
    },
  },
});
