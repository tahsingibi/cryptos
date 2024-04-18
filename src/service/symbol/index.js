import { useDispatch, useSelector } from 'react-redux';
import { actions as symbolStore } from '../../store/reducers/symbol';
import createSocket from '../../utils/createSocket';

export default function SymbolService() {
  const dispatch = useDispatch();
  const symbolState = useSelector((state) => state.symbol);

  const {
    setSymbol,
    setTickerPrice: setTickerPriceStore,
    setTickerLoading: setTickerLoadingStore,
  } = symbolStore;

  const setNewSymbol = (symbol) => {
    dispatch(setSymbol(symbol));
    dispatch(setTickerPriceStore(null));

    createSocket({
      type: 'ticker',
      symbol: symbol,
      onClose: () => {
        dispatch(setTickerLoadingStore(true));
      },
      onError: () => {
        dispatch(setTickerLoadingStore(true));
      },
      onMessage: (value) => {
        dispatch(setTickerLoadingStore(false));
        dispatch(setTickerPriceStore(value.c));
      },
    });
  };

  const setTickerPrice = (val) => {
    dispatch(setTickerPriceStore(val));
  };

  const setTickerLoading = (val) => {
    dispatch(setTickerLoadingStore(val));
  };

  return {
    setNewSymbol,
    setTickerPrice,
    setTickerLoading,
    ...symbolState,
  };
}
