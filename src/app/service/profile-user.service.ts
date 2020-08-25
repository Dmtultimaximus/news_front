import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileUserService {

  constructor(private http: HttpClient) { }

  getDataOfUser(): Observable<object> {
    return  this.http.get('http://localhost:8080/api/auth/getDetailsOfUser');
  }
  getUserNews(): Observable<object> {
    return  this.http.get('http://localhost:8080/api/news/getUsersNews');
  }
}
