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
});
