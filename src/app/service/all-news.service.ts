import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NewsModel} from '../all-news/news-model';

@Injectable({
  providedIn: 'root'
})
export class AllNewsService {

  constructor(private httpClient: HttpClient) {
  }

  // @ts-ignore
  getAllNews(): Observable<Array<NewsModel>> {
    return this.httpClient.get<Array<NewsModel>>('http://localhost:8080/api/news/getAllNews', {
        headers: {
          skip: 'true'
        }
      }
    );
  }
}
