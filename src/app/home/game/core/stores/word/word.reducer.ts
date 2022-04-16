import { createReducer, on } from '@ngrx/store';
import { RequestState } from '../../models/request-state';
import * as WordActions from './word.actions';

export const wordFeatureKey = 'word';

export interface State {
  words: string[];
  requestState: RequestState;
}

export const initialState: State = {
  words: [],
  requestState: RequestState.initial,
};

export const reducer = createReducer(
  initialState,
  on(WordActions.loadWords, (state) => ({
    ...state,
    words: [],
    requestState: RequestState.loading,
  })),
  on(WordActions.loadWordsSuccess, (state, { words }) => ({
    ...state,
    requestState: RequestState.success,
    words,
  })),
  on(WordActions.loadWordsFailure, (state) => ({
    ...state,
    requestState: RequestState.error,
    words: [],
  }))
);
