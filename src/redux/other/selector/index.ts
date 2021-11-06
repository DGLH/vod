import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/rootReducer';

const otherSelector = (state: RootState) => state.other;

export const loadingSelector = createSelector(otherSelector, (other) => other.loading);
