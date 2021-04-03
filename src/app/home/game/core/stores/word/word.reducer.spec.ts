import { reducer, initialState } from './word.reducer';
import * as WordActions from './word.actions';
import { RequestState } from '../../models/request-state';

describe('Word Reducer', () => {
  describe('on loadWords action', () => {
    it('should set loading state to loading', () => {
      const action = WordActions.loadWords();
      const result = reducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        requestState: RequestState.Loading,
      });
    });
  });
  describe('on loadWordsSuccess action', () => {
    it('should set loading state to success and words', () => {
      const words = ['word'];
      const action = WordActions.loadWordsSuccess({ words });
      const result = reducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        requestState: RequestState.Success,
        words,
      });
    });
  });
  describe('on loadWordsFailure action', () => {
    it('should set loading state to error and words', () => {
      const error = null;
      const action = WordActions.loadWordsFailure({ error });
      const result = reducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        requestState: RequestState.Error,
      });
    });
  });
});
