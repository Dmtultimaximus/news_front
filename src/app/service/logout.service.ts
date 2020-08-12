import { Injectable } from '@angular/core';
import {LogoutRequest} from '../auth/login/logout-request';
import {Observable} from 'rxjs';
import {SignupResponse} from '../auth/signup/signup-response';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private httpClient: HttpClient,
              ) { }
  logout(logoutRequest: LogoutRequest): Observable<object> {
    return this.httpClient.post<SignupResponse>(
      'http://localhost:8080/api/auth/logout',
      logoutRequest.token
    );
  }
}
