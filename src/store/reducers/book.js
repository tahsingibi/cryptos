import { createSlice } from '@reduxjs/toolkit';
import createSocket from '../../utils/createSocket';
import fetchApi from '../../utils/fetchApi';
const initialState = {
  socket: null,
  bids: null,
  asks: null,
  loading: true,
};

export const { reducer, actions } = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setSocketStore: (state, action) => {
      state.socket = action.payload;
    },
    setLoadingStore: (state, action) => {
      state.loading = action.payload;
    },
    setBidsStore: (state, action) => {
      state.bids = action.payload;
    },
    setAsksStore: (state, action) => {
      state.asks = action.payload;
    },
  },
});

let lists = {
  asks: null,
  bids: null,
};
export const initializeBookSocket = () => async (dispatch, getState) => {
  const symbol = getState().app.symbol;
  const bookSocket = getState().book.socket;

  const url = `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=100`;
  const { result } = await fetchApi({ url });

  const { asks, bids } = result;

  dispatch(actions.setLoadingStore(true));

  createSocket({
    symbol,
    type: 'book',
    onOpen: ({ data, websocket }) => {
      bookSocket?.close();
      dispatch(actions.setSocketStore(websocket));
    },
    onMessage: ({ data, websocket }) => {
      const _bids = [...data.b, ...bids];
      const _asks = [...data.a, ...asks];
      lists.asks = _asks;
      lists.bids = _bids;
      dispatch(actions.setLoadingStore(false));
      dispatch(actions.setBidsStore(_bids));
      dispatch(actions.setAsksStore(_asks));
    },
  });
};

export const initializeBookSocketOnLoad = () => (dispatch) => {
  dispatch(initializeBookSocket());
};
