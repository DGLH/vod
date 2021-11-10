import { createAction } from '@reduxjs/toolkit';
import { Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';

import getSourceApi from 'src/api/source';
import { actions as otherActions } from 'src/redux/other';
import { actions as movieActions } from 'src/redux/movie';

const loadClassList = (address: string) => getSourceApi.getClassList(address);

const loadClassDetails = (address: string) => getSourceApi.getClassDetail(address);

// ********************************** redux actions ****************************

const loadClassListEA = createAction<string>('loadClassList');
const loadClassDetailsEA = createAction<string>('loadClassDetails');
const clearClassListEA = createAction('clearClassList');
const clearClassDetailsEA = createAction('clearClassDetails');
const clearVideosEA = createAction('clearVideos');

// ********************************** redux-observable Epic ********************: Observable<Action<string>>

const loadClassListEpic: Epic = (actions$) =>
  actions$.pipe(
    ofType(loadClassListEA.type),
    switchMap(({ payload }) =>
      from(loadClassList(payload)).pipe(takeUntil(actions$.pipe(ofType(otherActions.setCancelAction.type)))),
    ),
    switchMap((result) => {
      return of(movieActions.setClass(result!));
    }),
    catchError(() => of(otherActions.toggleLoading(false))),
  );

const loadClassDetailsEpic: Epic = (actions$) =>
  actions$.pipe(
    ofType(loadClassDetailsEA.type),
    switchMap(({ payload }) =>
      from(loadClassDetails(payload)).pipe(takeUntil(actions$.pipe(ofType(otherActions.setCancelAction.type)))),
    ),
    switchMap((result) => {
      return of(movieActions.setVideos(result!));
    }),
    catchError(() => of(otherActions.toggleLoading(false))),
  );

const clearClassListEpic: Epic = (actions$) =>
  actions$.pipe(
    ofType(clearClassListEA.type),
    switchMap(() => of(movieActions.setClass([]))),
  );

const clearClassDetailsEpic: Epic = (actions$) =>
  actions$.pipe(
    ofType(clearClassDetailsEA.type),
    switchMap(() => of(movieActions.clearVideosValue())),
  );

const clearVideosEpic: Epic = (actions$) =>
  actions$.pipe(
    ofType(clearVideosEA.type),
    switchMap(() => of(clearClassListEA(), clearClassDetailsEA())),
  );

export const epics = [
  loadClassListEpic,
  loadClassDetailsEpic,
  clearClassListEpic,
  clearClassDetailsEpic,
  clearVideosEpic,
];

export const epicActions = {
  loadClassList: loadClassListEA,
  loadClassDetails: loadClassDetailsEA,
  clearClassList: clearClassListEA,
  clearClassDetails: clearClassDetailsEA,
  clearVideos: clearVideosEA,
};
