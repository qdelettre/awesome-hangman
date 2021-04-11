import { reducer, initialState } from './game.reducer';
import * as GameActions from './game.actions';

describe('Game Reducer', () => {
  const char = 'w';
  const word = 'word';

  describe('on setWord action', () => {
    it('should set word', () => {
      const action = GameActions.setWord({ word });
      const result = reducer(initialState, action);
      expect(result).toEqual({ ...initialState, word });
    });
  });

  it('should set char tryCharSuccess', () => {
    const action = GameActions.guessSuccess({ charOrWord: char });
    const result = reducer(initialState, action);
    expect(result).toEqual({ ...initialState, guess: [char] });
  });

  it('should set char tryCharFailure', () => {
    const action = GameActions.guessFailure({ charOrWord: char });
    const result = reducer(initialState, action);
    expect(result).toEqual({ ...initialState, guess: [char] });
  });

  it('should reset guess on start', () => {
    const action = GameActions.start();
    const result = reducer({ ...initialState, guess: [char, word] }, action);
    expect(result).toEqual(initialState);
  });
});
