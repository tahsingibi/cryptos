import { configureStore } from '@reduxjs/toolkit';
import { reducer as appReducer } from './reducers/app';

export function createStore(preloadedState = {}) {
  const store = configureStore({
    reducer: {
      app: appReducer,
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
