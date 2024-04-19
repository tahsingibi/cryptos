import { createSlice } from '@reduxjs/toolkit';
import createSocket from '../../utils/createSocket';
import config from '../../config';

const initialState = {
  chart: {
    loading: true,
    per: config.chart.per,
    data: null,
  },
};

export const { reducer, actions } = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    //CHART
    setChartLoading: (state, action) => {
      state.chart.loading = action.payload;
    },
    setChartPer: (state, action) => {
      state.chart.per = action.payload;
    },
    setChartData: (state, action) => {
      state.chart.data = action.payload;
    },
  },
});

export const initializeKLineSocket = () => (dispatch, getState) => {
  const { symbol } = getState().symbol;
  createSocket({
    type: 'kline',
    symbol: symbol,
    onClose: () => {
      dispatch(actions.setChartLoading(true));
    },
    onError: () => {
      dispatch(actions.setChartLoading(true));
    },
    onMessage: (value) => {
      dispatch(actions.setChartLoading(false));
      dispatch(actions.setChartData(value));
    },
  });
};

export const initializeKLineSocketOnLoad = () => (dispatch) => {
  dispatch(initializeKLineSocket());
};
