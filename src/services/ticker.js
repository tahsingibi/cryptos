import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store/reducers/ticker';
import createSocket from '../utils/createSocket';

export default function TickerService() {
  const tickerState = useSelector((state) => state.ticker);
  const { socket } = tickerState;
  const dispatch = useDispatch();

  const { setLoadingStore, setPriceStore, setSocketStore, setBeforeStore } =
    actions;

  function newSocket(symbol) {
    socket?.close();
    dispatch(setLoadingStore(true));
    dispatch(setPriceStore(null));

    let before;
    createSocket({
      symbol,
      type: 'ticker',
      onOpen: ({ data, websocket }) => {
        dispatch(setSocketStore(websocket));
      },
      onMessage: ({ data, websocket }) => {
        dispatch(setLoadingStore(false));
        dispatch(setBeforeStore(before));

        before = data.c;
        dispatch(setPriceStore(data.c));
      },
    });
  }

  return {
    newSocket,
    ...tickerState,
  };
}
