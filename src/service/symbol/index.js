import { useDispatch, useSelector } from 'react-redux';
import { actions as symbolStore } from '../../store/reducers/symbol';

export default function SymbolService() {
  const dispatch = useDispatch();
  const { symbol: activeSymbol } = useSelector((state) => state.symbol);
  const { setSymbol } = symbolStore;

  const setNewSymbol = (symbol) => {
    dispatch(setSymbol(symbol));
    console.log('activeSymbol', activeSymbol);
  };

  return { setNewSymbol, activeSymbol };
}
