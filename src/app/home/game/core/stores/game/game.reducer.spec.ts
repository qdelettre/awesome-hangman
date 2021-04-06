import { reducer, initialState } from './game.reducer';
import * as GameActions from './game.actions';

describe('Game Reducer', () => {
  describe('on setWord action', () => {
    it('should set word', () => {
      const word = 'word';
      const action = GameActions.setWord({ word });
      const result = reducer(initialState, action);
      expect(result).toEqual({ ...initialState, word });
    });
  });

  it('should set char tryCharSuccess', () => {
    const char = 'w';
    const action = GameActions.tryCharSuccess({ char });
    const result = reducer(initialState, action);
    expect(result).toEqual({ ...initialState, chars: [char] });
  });

  it('should set char tryCharFailure', () => {
    const char = 'w';
    const action = GameActions.tryCharFailure({ char });
    const result = reducer(initialState, action);
    expect(result).toEqual({ ...initialState, chars: [char] });
  });
});
