import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/app/rootReducer';

const movieSelector = (state: RootState) => state.movie;

export const classSelector = createSelector(movieSelector, (movieState) => movieState.class);

export const videosSelector = createSelector(movieSelector, (movieStaet) => movieStaet.videos);
