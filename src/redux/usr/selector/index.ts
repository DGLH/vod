import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/app/rootReducer';

const usrSelector = (state: RootState) => state.usr;

export const usrInfoSelector = createSelector(usrSelector, (usrState) => usrState.usrInfo);

export const watchHistorySelector = createSelector(usrSelector, (usrState) => usrState.watchHistory);

export const usrSourceSelector = createSelector(usrSelector, (usrState) => usrState.usrSource);
