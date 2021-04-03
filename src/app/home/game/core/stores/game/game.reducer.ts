import { createReducer, on } from '@ngrx/store';
import * as GameActions from './game.actions';

export const gameFeatureKey = 'game';

export interface State {
  word: string | null;
}

export const initialState: State = {
  word: null,
};

export const reducer = createReducer(
  initialState,
  on(GameActions.setWord, (state, { word }) => ({ ...state, word }))
);
