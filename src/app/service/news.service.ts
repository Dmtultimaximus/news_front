import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AddNewsRequestPayload} from '../add-news/add-news-request.payload';
import {Observable} from 'rxjs';
import {AddNewsResponse} from '../add-news/add-news-response';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:typedef
  addNews(addNewsRequestPayload: AddNewsRequestPayload): Observable<object> {
    return this.httpClient.post<AddNewsResponse>(
      'http://localhost:8080/api/news/addNews',
      addNewsRequestPayload
    );
  }
}
