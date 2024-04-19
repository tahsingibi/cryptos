import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../store/reducers/chart';

export default function ChartService() {
  const dispatch = useDispatch();
  const symbolState = useSelector((state) => state.chart);

  const {
    setChartPer: setChartPerStore,
    setChartLoading: setChartLoadingStore,
    setChartData: setChartDataStore,
  } = actions;

  const setChartPer = (per) => dispatch(setChartPerStore(per));
  const setChartLoading = (loading) => dispatch(setChartLoadingStore(loading));
  const setChartData = (data) => dispatch(setChartDataStore(data));

  return { ...symbolState, setChartPer, setChartLoading, setChartData };
}
