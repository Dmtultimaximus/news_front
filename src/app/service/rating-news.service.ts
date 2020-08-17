import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AddRatingNewsRequestPayload} from '../request-payload/add-rating-news-request-payload';

@Injectable({
  providedIn: 'root'
})
export class RatingNewsService {
  private httpClientWithIgnore: HttpClient;
  constructor(private httpClient: HttpClient,
              private handler: HttpBackend) {
    this.httpClientWithIgnore = new HttpClient(this.handler);
  }

  // tslint:disable-next-line:typedef
  addRating(addRatingNewsRequestPayload: AddRatingNewsRequestPayload): Observable<object> {
    return this.httpClient.post(
      'http://localhost:8080/api/rating/addRating', addRatingNewsRequestPayload);
  }
  getRating(newsId): Observable<object> {
    return this.httpClientWithIgnore.get('http://localhost:8080/api/rating/getRating?newsId=' + newsId);
  }
  checkRating(newsId): Observable<object> {
    return this.httpClient.get(
      'http://localhost:8080/api/rating/checkRating?newsId=' + newsId);
  }
}
