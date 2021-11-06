import { combineReducers } from 'redux';
import { History, createHashHistory } from 'history';
import { connectRouter } from 'connected-react-router';

import { OtherSlice } from 'src/redux/other';
import { UsrSlice } from 'src/redux/usr';
import { MovieSlice } from 'src/redux/movie';

export const history = createHashHistory();

export const createRooteReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    other: OtherSlice.reducer,
    usr: UsrSlice.reducer,
    movie: MovieSlice.reducer,
  });

export const rootReducer = createRooteReducer(history);

export type RootState = ReturnType<typeof rootReducer>;
