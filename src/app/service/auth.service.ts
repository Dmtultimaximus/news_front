import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {SignupRequestPayload} from '../auth/signup/signup-request.payload';
import {Observable} from 'rxjs';
import {LoginRequestPayload} from '../auth/login/login-request.payload';
import {LoginResponse} from '../auth/login/login-response';
import {map} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import {SignupResponse} from '../auth/signup/signup-response';
import {LogoutRequest} from '../auth/login/logout-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient: HttpClient;

  constructor(
              private localStorage: LocalStorageService,
              private handler: HttpBackend) {
    this.httpClient = new HttpClient(this.handler);
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<object> {
    return this.httpClient.post<SignupResponse>('http://localhost:8080/api/auth/signup', signupRequestPayload);
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    console.log(loginRequestPayload);
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login', loginRequestPayload)
      .pipe(map(data => {
        console.log(data);
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        return true;
      }));
  }

  // logout(logoutRequest: LogoutRequest): Observable<object> {
  //   return this.httpClient.post<SignupResponse>(
  //     'http://localhost:8080/api/auth/logout',
  //     logoutRequest
  //   );
  // }

}
