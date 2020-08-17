import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NewsUpdateRequestPayload} from '../update-news/news-update-request.payload';

@Injectable({
  providedIn: 'root'
})
export class DeleteUpdateNewsService {

  constructor(private httpClient: HttpClient) {
  }
  deleteNews(newsId): Observable<object> {
    return this.httpClient.delete('http://localhost:8080/api/news/deleteNews/' + newsId);
  }
  updateNews(newsId, newsUpdateRequestPayload: NewsUpdateRequestPayload): Observable<object> {
    console.log(newsId, newsUpdateRequestPayload);
    return this.httpClient.put('http://localhost:8080/api/news/updateNews/' + newsId, newsUpdateRequestPayload);
  }
}
