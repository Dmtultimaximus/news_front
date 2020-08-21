import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutNewsService {

  constructor(private httpClient: HttpClient) {

  }
  // @ts-ignore
  getNews(newsId): Observable<object> {
    return this.httpClient.get('http://localhost:8080/api/news/getNews/' + newsId, {
        headers: {
          skip: 'true'
        }
      }
    );
  }
  getImgNews(newsId): Observable<object> {
    return this.httpClient.get('http://localhost:8080/api/news/getAllImgNews/' + newsId, {
        headers: {
          skip: 'true'
        }
      }
    );
  }
}
