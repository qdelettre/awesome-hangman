import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGame from './game.reducer';

export const selectGameState = createFeatureSelector<fromGame.State>(
  fromGame.gameFeatureKey
);

export const getWord = createSelector(selectGameState, ({ word }) => word);

export const getChars = createSelector(selectGameState, ({ chars }) => chars);

const r = new RegExp('[^a-zA-Z]');
export const getWordChars = createSelector(getWord, getChars, (word, chars) =>
  !!word && word.length
    ? [...word].map((char) =>
        chars.includes(char.toLowerCase()) || r.test(char) ? char : ''
      )
    : []
);
