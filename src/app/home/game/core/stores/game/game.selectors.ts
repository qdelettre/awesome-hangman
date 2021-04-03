import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGame from './game.reducer';

export const selectGameState = createFeatureSelector<fromGame.State>(
  fromGame.gameFeatureKey
);

export const getWord = createSelector(selectGameState, (state) => state.word);
