import { combineReducers } from 'redux';
import { History, createHashHistory } from 'history';
import { connectRouter } from 'connected-react-router';

export const history = createHashHistory();

export const createRooteReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
  });

export const rootReducer = createRooteReducer(history);

export type RootState = ReturnType<typeof rootReducer>;
