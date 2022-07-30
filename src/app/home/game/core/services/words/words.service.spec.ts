import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { url, WordsService } from './words.service';
import { first } from 'rxjs/operators';
import { WordApiResponseMocks } from 'src/tests/mocks/word-api-response';
import { WordApiResponse } from '../../models/word-api-response';
import { HttpClientModule } from '@angular/common/http';
import { MockBuilder, ngMocks } from 'ng-mocks';

describe('WordsService', () => {
  let service: WordsService;
  let httpMock: HttpTestingController;

  beforeEach(() =>
    MockBuilder(WordsService).replace(HttpClientModule, HttpClientTestingModule)
  );

  beforeEach(() => {
    service = ngMocks.findInstance(WordsService);
    httpMock = ngMocks.findInstance(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get words', (done) => {
    service
      .get()
      .pipe(first())
      .subscribe({
        next: (data: WordApiResponse) => {
          expect(data).toEqual(WordApiResponseMocks.default);
          done();
        },
        error: done.fail,
      });

    const req = httpMock.expectOne((r) => r.url === url);

    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toEqual(null);
    req.flush(WordApiResponseMocks.default);
  });
});
