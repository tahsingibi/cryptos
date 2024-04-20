import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store/reducers/book';
import createSocket from '../utils/createSocket';
import fetchApi from '../utils/fetchApi';

export default function BookService() {
  const bookState = useSelector((state) => state.book);
  const { socket } = bookState;
  const dispatch = useDispatch();

  const { setSocketStore, setLoadingStore, setBidsStore, setAsksStore } =
    actions;

  async function newSocket(symbol) {
    socket?.close();
    dispatch(setLoadingStore(true));

    const url = `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=100`;
    const { result } = await fetchApi({ url });

    const { asks, bids } = result;

    createSocket({
      symbol,
      type: 'book',
      onOpen: ({ data, websocket }) => {
        dispatch(setSocketStore(websocket));
      },
      onMessage: ({ data, websocket }) => {
        const _bids = data.b;
        const _asks = data.a;
        dispatch(setLoadingStore(false));
        dispatch(setBidsStore(bids, _bids));
        dispatch(setAsksStore(asks, _asks));
      },
    });
  }

  return {
    newSocket,
    ...bookState,
  };
}
