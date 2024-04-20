import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store/reducers/book';
import createSocket from '../utils/createSocket';
import { getDepth } from '../utils/fetchApi';

export default function BookService() {
  const bookState = useSelector((state) => state.book);
  const { socket } = bookState;
  const dispatch = useDispatch();

  const { setSocketStore, setLoadingStore, setBidsStore, setAsksStore } =
    actions;

  async function newSocket(symbol) {
    socket?.close();
    dispatch(setLoadingStore(true));

    let beforeValues = {
      asks: null,
      bids: null,
    };

    const { result } = await getDepth({ symbol });

    const { asks, bids } = result;

    beforeValues.asks = asks;
    beforeValues.bids = bids;

    createSocket({
      symbol,
      type: 'book',
      onOpen: ({ data, websocket }) => {
        dispatch(setSocketStore(websocket));
      },
      onMessage: ({ data, websocket }) => {
        const _bids = [...data.b, ...beforeValues.bids];
        const _asks = [...data.a, ...beforeValues.asks];

        beforeValues.asks = _asks;
        beforeValues.bids = _bids;

        dispatch(setBidsStore(_bids));
        dispatch(setAsksStore(_asks));
        dispatch(setLoadingStore(false));
      },
    });
  }

  return {
    newSocket,
    ...bookState,
  };
}
