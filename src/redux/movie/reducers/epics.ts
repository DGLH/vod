import { Action } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import { Epic, ofType } from 'redux-observable';
import { from, of, Observable } from 'rxjs';
import { catchError, switchMap, takeUntil, tap, map } from 'rxjs/operators';

import getSourceApi from 'src/api/source';
import { actions as otherActions } from 'src/redux/other';
import { actions as movieActions } from 'src/redux/movie';

const loadClassList = async (address: string) => {
  try {
    const listJson = await getSourceApi.getClassList(address);
    return listJson;
  } catch (error) {
    console.error('error', error);
  }
};

// ********************************** redux actions ****************************

const loadClassListEA = createAction<string>('loadClassList');

// ********************************** redux-observable Epic ********************: Observable<Action<string>>

const loadClassListEpic: Epic = (actions$) =>
  actions$.pipe(
    ofType(loadClassListEA.type),
    switchMap(({ payload }) =>
      from(loadClassList(payload)).pipe(
        takeUntil(otherActions.setCancelAction.type),
        map((listJson: any) => of(movieActions.setClass(listJson))),
      ),
    ),
  );

export const epics = [loadClassListEpic];

export const epicActions = {
  loadClassListEA,
};
