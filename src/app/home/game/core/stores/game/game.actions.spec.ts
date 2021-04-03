import * as fromGame from './game.actions';

describe('setWord', () => {
  it('should return an action', () => {
    expect(fromGame.setWord.type).toBe('[Game] Set word');
  });
});
