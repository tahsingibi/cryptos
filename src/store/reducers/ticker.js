import { createSlice } from '@reduxjs/toolkit';
import createSocket from '../../utils/createSocket';

const initialState = {
  loading: true,
  price: null,
  socket: null,
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
      dispatch(actions.setLoadingStore(false));
      dispatch(actions.setPriceStore(data.c));
    },
  });
};

export const initializeTickerSocketOnLoad = () => (dispatch) => {
  dispatch(initializeTickerSocket());
};
