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
  upload(Img: any[], newsId): Observable<any>{
    const formData = new FormData();
    // tslint:disable-next-line:forin
    for (const i of Img){
      formData.append('multipartFile', i);
    }
    return this.httpClient.post<any>(`http://localhost:8080/api/cloud/upload/${newsId}`, formData );
  }
  uploadOther(Img: any[], newsId): Observable<any>{
    const formData = new FormData();
    // tslint:disable-next-line:forin
    for (const i of Img){
      formData.append('multipartFile', i);
    }
    return this.httpClient.post<any>(`http://localhost:8080/api/cloud/uploadOther/${newsId}`, formData );
  }
  delete(id: string): Observable<any>{
    return this.httpClient.delete<any>(`http://localhost:8080/api/cloud/delete/${id}`);
  }
}
