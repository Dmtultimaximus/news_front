import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';

export const HTTP_AUT = 'skip';
@Injectable({
  providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor {

  constructor(private localStorage: LocalStorageService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has(HTTP_AUT)) {
      req.headers.delete(HTTP_AUT);
      return next.handle(req);
    }

    const newReq = req.clone({
      params: req.params.set('withCredentials', 'true'),
      headers: req.headers.set('Authorization', this.localStorage.retrieve('authenticationtoken'))
    });
    return next.handle(newReq);
  }
}
