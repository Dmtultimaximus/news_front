import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AddRatingNewsRequestPayload} from '../request-payload/add-rating-news-request-payload';

@Injectable({
  providedIn: 'root'
})
export class RatingNewsService {

  constructor(private httpClient: HttpClient) {
  }

  addRating(addRatingNewsRequestPayload: AddRatingNewsRequestPayload): Observable<object> {
    return this.httpClient.post(
      'http://localhost:8080/api/rating/addRating', addRatingNewsRequestPayload);
  }

  getRating(newsId): Observable<object> {
    return this.httpClient.get('http://localhost:8080/api/rating/getRating?newsId=' + newsId, {
      headers: {
        skip: 'true'
      }
    });
  }

  checkRating(newsId): Observable<object> {
    return this.httpClient.get(
      'http://localhost:8080/api/rating/checkRating?newsId=' + newsId);
  }
}
