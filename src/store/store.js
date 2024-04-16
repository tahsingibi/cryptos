import { configureStore } from '@reduxjs/toolkit';
import { reducer as appReducer } from './reducers/app';
import { reducer as symbolReducer } from './reducers/symbol';

export function createStore(preloadedState = {}) {
  const store = configureStore({
    reducer: {
      app: appReducer,
      symbol: symbolReducer,
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
