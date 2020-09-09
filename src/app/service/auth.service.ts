import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {SignupRequestPayload} from '../auth/signup/signup-request.payload';
import {Observable} from 'rxjs';
import {LoginRequestPayload} from '../auth/login/login-request.payload';
import {LoginResponse} from '../auth/login/login-response';
import {map} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import {SignupResponse} from '../auth/signup/signup-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
              private localStorage: LocalStorageService,
              private httpClient: HttpClient) {
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<object> {
    return this.httpClient.post<SignupResponse>('http://localhost:8080/api/auth/signup', signupRequestPayload, {
      headers: {
        skip: 'true'
      }
    });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    console.log(loginRequestPayload);
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login', loginRequestPayload, {
      headers: {
        skip: 'true'
      }})
      .pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('userId', data.userId);
        return true;
      }));
  }

  getDataOfUser(): Observable<object> {
    return  this.httpClient.get('http://localhost:8080/api/auth/get-details-user');
  }
}
