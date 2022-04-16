import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { url, WordsService } from './words.service';
import { first } from 'rxjs/operators';
import { WordApiResponseMocks } from 'src/tests/mocks/word-api-response';
import { WordApiResponse } from '../../models/word-api-response';

describe('WordsService', () => {
  let service: WordsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WordsService],
    });
    service = TestBed.inject(WordsService);
    httpMock = TestBed.inject(HttpTestingController);
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
      .subscribe((data: WordApiResponse) => {
        expect(data).toEqual(WordApiResponseMocks.default);
        done();
      }, done.fail);

    const req = httpMock.expectOne((r) => r.url === url);

    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toEqual(null);
    req.flush(WordApiResponseMocks.default);
  });
});
