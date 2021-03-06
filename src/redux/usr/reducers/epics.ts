import { createAction } from '@reduxjs/toolkit';
import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { actions as usrActions, Source } from 'src/redux/usr';
import { epicActions as movieEpics } from 'src/redux/movie';
import { replace } from 'connected-react-router';
import { ROUTES } from 'src/utils/constant';

// ********************************** redux actions ****************************

const setCurrentSourceEA = createAction<Source>('setCurrentSource');

// ********************************** redux-observable Epic ********************: Observable<Action<string>>

const setCurrentSourceEpic: Epic = (actions$) =>
  actions$.pipe(
    ofType(setCurrentSourceEA.type),
    switchMap(({ payload }) =>
      of(usrActions.setCurrentSource(payload), movieEpics.clearVideos(), replace(ROUTES.HOME)),
    ),
  );

export const epics = [setCurrentSourceEpic];

export const epicActions = {
  setCurrentSource: setCurrentSourceEA,
};
