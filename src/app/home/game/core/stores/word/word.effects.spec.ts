import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { WordsService } from '../../services/words/words.service';
import { cold, hot } from 'jasmine-marbles';
import { WordEffects } from './word.effects';
import * as WordActions from './word.actions';
import { WordApiResponseMocks } from 'src/tests/mocks/word-api-response';

describe('WordEffects', () => {
  let actions$: Observable<any>;
  let effects: WordEffects;

  const wordsService = jasmine.createSpyObj<WordsService>('wordService', [
    'get',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WordEffects,
        provideMockActions(() => actions$),
        {
          provide: WordsService,
          useValue: wordsService,
        },
      ],
    });

    effects = TestBed.inject(WordEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should loadWordsSuccess', () => {
    wordsService.get.and.returnValue(
      cold('a', { a: WordApiResponseMocks.default })
    );

    actions$ = hot('-a-', {
      a: WordActions.loadWords,
    });
    const expected = cold('-a-', {
      a: WordActions.loadWordsSuccess({
        words: WordApiResponseMocks.default.values,
      }),
    });
    expect(effects.loadWords$).toBeObservable(expected);
  });

  it('should loadWordsFailure', () => {
    wordsService.get.and.returnValue(cold('#', {}, 'error'));

    actions$ = hot('-a-', {
      a: WordActions.loadWords,
    });
    const expected = cold('-a-', {
      a: WordActions.loadWordsFailure({ error: 'error' }),
    });
    expect(effects.loadWords$).toBeObservable(expected);
  });
});
