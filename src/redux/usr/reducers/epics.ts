import { Action } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import { Epic, ofType } from 'redux-observable';
import { from, of, Observable } from 'rxjs';
import { catchError, switchMap, takeUntil, tap, map } from 'rxjs/operators';

import getSourceApi from 'src/api/source';
import { actions as otherActions } from 'src/redux/other';
import {} from 'src/redux/usr';

const loadSourceList = async (address: string) => {
  try {
    const listJson = await getSourceApi.getClassList(address);
    return listJson;
  } catch (error) {
    console.error('error', error);
  }
};

// ********************************** redux actions ****************************

const loadSourceEA = createAction<string>('loadSource');

// ********************************** redux-observable Epic ********************: Observable<Action<string>>

const loadSourceEpic: Epic = (actions$) =>
  actions$.pipe(
    ofType(loadSourceEA.type),
    switchMap(({ payload }) =>
      from(loadSourceList(payload)).pipe(
        takeUntil(otherActions.setCancelAction.type),
        map((listJson) => of()),
      ),
    ),
  );
