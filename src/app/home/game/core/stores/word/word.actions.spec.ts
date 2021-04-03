import * as fromWord from './word.actions';

describe('loadWords', () => {
  it('should return an action', () => {
    expect(fromWord.loadWords().type).toBe('[Word] Load Words');
  });
});
