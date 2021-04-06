import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WordApiResponse } from '../../models/word-api-response';

export const url = `https://gist.githubusercontent.com/
  ruizalexandre/13e65c88e7ab65f88f13a01928632311/
  raw/59d0ba6a5ba865967cc2de2619300613bfd2f55c/pendu.json`;

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<WordApiResponse> {
    return this.httpClient.get<WordApiResponse>(url);
  }
}
