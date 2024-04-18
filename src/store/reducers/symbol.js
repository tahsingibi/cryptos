import { createSlice } from '@reduxjs/toolkit';
import { defaultSymbol } from '../../config';
import createSocket from '../../utils/createSocket';

const initialState = {
  symbol: defaultSymbol,
  ticker: {
    loading: false,
    price: null,
  },
};

export const { reducer, actions } = createSlice({
  name: 'symbol',
  initialState,
  reducers: {
    setSymbol: (state, action) => {
      const newSymbol = action.payload;
      state.symbol = newSymbol;
    },

    setTickerLoading: (state, action) => {
      state.ticker.loading = action.payload;
    },

    setTickerPrice: (state, action) => {
      state.ticker.price = action.payload;
    },
  },
});

export const initializeSocket = () => (dispatch, getState) => {
  const { symbol } = getState().symbol;
  createSocket({
    type: 'ticker',
    symbol: symbol,
    onClose: () => {
      dispatch(actions.setTickerLoading(true));
    },
    onError: () => {
      dispatch(actions.setTickerLoading(true));
    },
    onMessage: (value) => {
      dispatch(actions.setTickerLoading(false));
      dispatch(actions.setTickerPrice(value.c));
    },
  });
};

export const initializeSocketOnLoad = () => (dispatch) => {
  dispatch(initializeSocket());
};
