import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) {  }
  getRole(): Observable<any> {
    return this.httpClient.get(
      'http://localhost:8080/api/admin/roles');
  }
  getUsers(): Observable<any> {
    return this.httpClient.get(
      'http://localhost:8080/api/admin/users');
  }
  deleteRole(userId, roleId): Observable<any> {
    return this.httpClient.delete(
      'http://localhost:8080/api/admin?userId=' + userId + '&roleId=' + roleId);
  }
  addRole(userId, roleId): Observable<any> {
    return this.httpClient.get(
      'http://localhost:8080/api/admin?userId=' + userId + '&roleId=' + roleId);
  }
}
