import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private httpClient: HttpClient) { }
  getComment(newsId): Observable<object> {
    return this.httpClient.get(
      'http://localhost:8080/api/comment?newsId=' + newsId);
  }
}
