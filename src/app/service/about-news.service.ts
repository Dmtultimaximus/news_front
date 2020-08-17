import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutNewsService {

  private httpClient: HttpClient;

  constructor(private handler: HttpBackend) {
    this.httpClient = new HttpClient(this.handler);
  }
  // @ts-ignore
  getNews(newsId): Observable<object> {
    return this.httpClient.get('http://localhost:8080/api/news/getNews/' + newsId);
  }

}
