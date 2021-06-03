import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WordApiResponse } from '../../models/word-api-response';

export const url = `https://gist.githubusercontent.com/
qdelettre/f5e23d9421769d3df3119dc7f8ff1e09/
raw/a84c8e1142d157110ac2f62285841213eb970652/pendu.json`;

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<WordApiResponse> {
    return this.httpClient.get<WordApiResponse>(url);
  }
}
