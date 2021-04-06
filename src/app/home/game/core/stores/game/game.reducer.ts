import { createReducer, on } from '@ngrx/store';
import * as GameActions from './game.actions';

export const gameFeatureKey = 'game';

export interface State {
  word: string | null;
  chars: string[];
}

export const initialState: State = {
  word: null,
  chars: [],
};

export const reducer = createReducer(
  initialState,
  on(GameActions.setWord, (state, { word }) => ({ ...state, word })),
  on(GameActions.tryCharSuccess, (state, { char }) => ({
    ...state,
    chars: [...state.chars, char],
  })),
  on(GameActions.tryCharFailure, (state, { char }) => ({
    ...state,
    chars: [...state.chars, char],
  }))
);
