import { createReducer, on } from '@ngrx/store';
import * as GameActions from './game.actions';

export const gameFeatureKey = 'game';

export interface State {
  word: string | null;
  guess: string[];
  rules: {
    maxAttempts: number;
  };
}

export const initialState: State = {
  word: null,
  guess: [],
  rules: {
    maxAttempts: 7,
  },
};

export const reducer = createReducer(
  initialState,
  on(GameActions.setWord, (state, { word }) => ({ ...state, word })),
  on(GameActions.guessSuccess, (state, { charOrWord: char }) => ({
    ...state,
    guess: [...state.guess, char],
  })),
  on(GameActions.guessFailure, (state, { charOrWord: char }) => ({
    ...state,
    guess: [...state.guess, char],
  }))
);
