import { createSlice } from '@reduxjs/toolkit';
import createSocket from '../../utils/createSocket';

const initialState = {
  loading: true,
  price: null,
  socket: null,
  before: null,
};

export const { reducer, actions } = createSlice({
  name: 'ticker',
  initialState,
  reducers: {
    setLoadingStore: (state, action) => {
      state.loading = action.payload;
    },

    setPriceStore: (state, action) => {
      state.price = action.payload;
    },

    setBeforeStore: (state, action) => {
      state.before = action.payload;
    },

    setSocketStore: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const initializeTickerSocket = () => (dispatch, getState) => {
  const symbol = getState().app.symbol;
  const tickerSocket = getState().ticker.socket;

  dispatch(actions.setLoadingStore(true));

  createSocket({
    symbol,
    type: 'ticker',
    onOpen: ({ data, websocket }) => {
      tickerSocket?.close();
      dispatch(actions.setSocketStore(websocket));
    },
    onMessage: ({ data, websocket }) => {
      dispatch(actions.setPriceStore(data.c));
      dispatch(actions.setLoadingStore(false));
    },
  });
};

export const initializeTickerSocketOnLoad = () => (dispatch) => {
  dispatch(initializeTickerSocket());
};
