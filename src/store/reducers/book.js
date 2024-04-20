import { createSlice } from '@reduxjs/toolkit';
import createSocket from '../../utils/createSocket';
import { getDepth } from '../../utils/fetchApi';
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
      state.bids =
        action.payload?.length > 50
          ? action.payload.slice(0, 50)
          : action.payload;
    },
    setAsksStore: (state, action) => {
      state.asks =
        action.payload?.length > 50
          ? action.payload.slice(0, 50)
          : action.payload;
    },
  },
});

let beforeValues = {
  asks: [],
  bids: [],
};
export const initializeBookSocket = () => async (dispatch, getState) => {
  const symbol = getState().app.symbol;
  const bookSocket = getState().book.socket;

  const { result } = await getDepth({ symbol });

  const { asks, bids } = result;
  beforeValues.asks = asks;
  beforeValues.bids = bids;

  dispatch(actions.setLoadingStore(true));

  createSocket({
    symbol,
    type: 'book',
    onOpen: ({ data, websocket }) => {
      bookSocket?.close();
      dispatch(actions.setSocketStore(websocket));
    },
    onMessage: ({ data, websocket }) => {
      const _bids = [...data.b, ...beforeValues.bids];
      const _asks = [...data.a, ...beforeValues.asks];
      beforeValues.asks = _asks;
      beforeValues.bids = _bids;

      dispatch(actions.setLoadingStore(false));
      dispatch(actions.setBidsStore(_bids));
      dispatch(actions.setAsksStore(_asks));
    },
  });
};

export const initializeBookSocketOnLoad = () => (dispatch) => {
  dispatch(initializeBookSocket());
};
