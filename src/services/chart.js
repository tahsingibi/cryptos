import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store/reducers/chart';
import { getKline } from '../utils/fetchApi';
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

    async function setData() {
      dispatch(setLoadingStore(true));
      dispatch(setDataStore(null));

      const { result } = await getKline({ symbol, per });

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
