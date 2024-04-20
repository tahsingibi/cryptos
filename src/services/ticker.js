import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store/reducers/ticker';
import createSocket from '../utils/createSocket';

export default function TickerService() {
  const tickerState = useSelector((state) => state.ticker);
  const { socket } = tickerState;
  const dispath = useDispatch();

  const { setLoadingStore, setPriceStore, setSocketStore } = actions;

  function newSocket(symbol) {
    socket?.close();
    dispath(setLoadingStore(true));
    dispath(setPriceStore(null));

    createSocket({
      symbol,
      type: 'ticker',
      onOpen: ({ data, websocket }) => {
        dispath(setSocketStore(websocket));
      },
      onMessage: ({ data, websocket }) => {
        dispath(setLoadingStore(false));
        dispath(setPriceStore(data.c));
      },
    });
  }

  return {
    newSocket,
    ...tickerState,
  };
}
