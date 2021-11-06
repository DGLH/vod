import { Action, configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware, combineEpics, StateObservable } from 'redux-observable';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { history, rootReducer } from './rootReducer';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { epics as movieEpics } from 'src/redux/movie';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const persisitedReducer = persistReducer(persistConfig, rootReducer);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rootEpic = (action$: Observable<Action<unknown>>, state$: StateObservable<any>) =>
  combineEpics(...movieEpics)(action$, state$, []).pipe(
    catchError((error) => {
      console.error('epic error', error);
      return of({ type: 'other/setError', payload: { message: error.message } });
    }),
  );

export const setupStore = () => {
  const epicMiddleware = createEpicMiddleware();
  const store = configureStore({
    reducer: persisitedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(epicMiddleware, routerMiddleware(history)),
  });

  epicMiddleware.run((action$, store) => rootEpic(action$, store));
  return store;
};

const store = setupStore();
export type AppDispatch = typeof store.dispatch;

export default store;
