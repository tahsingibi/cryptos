import { createSlice } from '@reduxjs/toolkit';
import config from '../../config';

const initialState = {
  symbol: config.defaultSymbol,
};

export const { reducer, actions } = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSymbolStore: (state, action) => {
      state.symbol = action.payload;
    },
  },
});
