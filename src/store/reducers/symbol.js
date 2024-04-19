import { createSlice } from '@reduxjs/toolkit';
import config from '../../config';
import createSocket from '../../utils/createSocket';

const initialState = {
  symbol: config.defaultSymbol,
  ticker: {
    loading: true,
    price: null,
  },
};

export const { reducer, actions } = createSlice({
  name: 'symbol',
  initialState,
  reducers: {
    // SYMBOL
    setSymbol: (state, action) => {
      const newSymbol = action.payload;
      state.symbol = newSymbol;
    },

    // TICKER
    setTickerLoading: (state, action) => {
      state.ticker.loading = action.payload;
    },

    setTickerPrice: (state, action) => {
      state.ticker.price = action.payload;
    },
  },
});

export const initializeTickerSocket = () => (dispatch, getState) => {
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

export const initializeTickerSocketOnLoad = () => (dispatch) => {
  dispatch(initializeTickerSocket());
};
