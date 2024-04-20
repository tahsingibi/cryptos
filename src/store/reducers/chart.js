import { createSlice } from '@reduxjs/toolkit';
import config from '../../config';
import fetchApi from '../../utils/fetchApi';
import timeOutCalc from '../../utils/timeout';
import chartDataFormat from '../../utils/chartDataFormat';

const initialState = {
  loading: true,
  per: config.chart.per,
  data: null,
  socket: null,
};

export const { reducer, actions } = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setLoadingStore: (state, action) => {
      state.loading = action.payload;
    },

    setPerStore: (state, action) => {
      state.per = action.payload;
    },

    setDataStore: (state, action) => {
      state.data = action.payload;
    },

    setSocketStore: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const initializeChartData = () => async (dispatch, getState) => {
  const symbol = getState().app.symbol;
  const per = getState().chart.per;
  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${per}&limit=500`;

  async function setData() {
    dispatch(actions.setLoadingStore(true));
    dispatch(actions.setDataStore(null));

    const { result } = await fetchApi({ url });

    const format = chartDataFormat(result);

    dispatch(actions.setDataStore(format));
    dispatch(actions.setLoadingStore(false));
  }

  await setData();

  const timeoutFunction = setTimeout(
    async () => await setData(),
    timeOutCalc[per]
  );

  dispatch(actions.setSocketStore(timeoutFunction));
};

export const initializeChartOnLoad = () => (dispatch) => {
  dispatch(initializeChartData());
};
