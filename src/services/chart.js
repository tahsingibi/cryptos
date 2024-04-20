import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store/reducers/chart';
import fetchApi from '../utils/fetchApi';
import timeOutCalc from '../utils/timeout';
import chartDataFormat from '../utils/chartDataFormat';

export default function ChartService() {
  const chartState = useSelector((state) => state.chart);
  const activeSymbol = useSelector((state) => state.app.symbol);

  const dispatch = useDispatch();

  const { setLoadingStore, setPerStore, setDataStore, setSocketStore } =
    actions;

  async function setPer(newPer) {
    dispatch(setPerStore(newPer));
    getPerData(activeSymbol, newPer);
  }

  async function getPerData(newSymbol, newPer) {
    const { socket } = chartState;

    clearTimeout(socket);

    const symbol = newSymbol || activeSymbol;
    const per = newPer || chartState.per;
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${per}&limit=500`;

    async function setData() {
      dispatch(setLoadingStore(true));
      dispatch(setDataStore(null));

      const { result } = await fetchApi({ url });

      const format = chartDataFormat(result);
      dispatch(setDataStore(format));
      dispatch(setLoadingStore(false));
    }

    await setData();

    const timeoutFunction = setTimeout(
      async () => await setData(),
      timeOutCalc[per]
    );

    dispatch(setSocketStore(timeoutFunction));
  }

  return { setPer, getPerData, ...chartState };
}
