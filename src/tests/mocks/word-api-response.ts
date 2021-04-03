import { WordApiResponse } from 'src/app/home/game/core/models/word-api-response';

export abstract class WordApiResponseMocks {
  static readonly default: WordApiResponse = {
    version: 'version',
    author: 'author',
    values: ['values'],
  };
}
