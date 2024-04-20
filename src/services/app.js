import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store/reducers/app';
import TickerService from './ticker';
import ChartService from './chart';
import BookService from './book';

export default function AppService() {
  const { newSocket: newTickerSocket } = TickerService();
  const { newSocket: newBookSocket } = BookService();
  const { getPerData } = ChartService();
  const app = useSelector((state) => state.app);

  const dispatch = useDispatch();

  const { setSymbolStore } = actions;

  function setSymbol(newSymbol) {
    dispatch(setSymbolStore(newSymbol));
    newTickerSocket(newSymbol);
    newBookSocket(newSymbol);
    getPerData(newSymbol);
  }

  return { setSymbol, ...app };
}
