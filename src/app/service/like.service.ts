import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private httpClient: HttpClient) { }
  addLike(commentId): Observable<object> {
    return this.httpClient.get('http://localhost:8080/api/comment/add-like?commentId=' + commentId);
  }

  checkLike(newsId): Observable<object> {
    return this.httpClient.get('http://localhost:8080/api/comment/chek-like?newsId=' + newsId);
  }
}
