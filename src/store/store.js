import { configureStore } from '@reduxjs/toolkit';
import { reducer as appReducer } from './reducers/app';
import {
  reducer as chartReducer,
  initializeChartOnLoad,
} from './reducers/chart';
import {
  reducer as tickerReducer,
  initializeTickerSocketOnLoad,
} from './reducers/ticker';
import {
  reducer as bookReducer,
  initializeBookSocketOnLoad,
} from './reducers/book';

export function createStore(preloadedState = {}) {
  const store = configureStore({
    reducer: {
      app: appReducer,
      ticker: tickerReducer,
      chart: chartReducer,
      book: bookReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    preloadedState,
  });

  return store;
}

export const store = createStore();

store.dispatch(initializeTickerSocketOnLoad());
store.dispatch(initializeChartOnLoad());
store.dispatch(initializeBookSocketOnLoad());
