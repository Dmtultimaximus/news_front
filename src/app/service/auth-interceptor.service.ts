import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

export const HTTP_AUT = 'skip';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor {

  constructor(private localStorage: LocalStorageService,
              private route: Router,
              private toastr: ToastrService) {
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
    return next.handle(newReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error.message === 'Life Time Token') {
          console.log('this is server side error');
          errorMsg = `Error: ${error.error.message}`;
          this.localStorage.clear('username');
          this.localStorage.clear('authenticationtoken');
          this.localStorage.clear('userId');
          this.toastr.error('Login pls!');
          this.route.navigate(['/login']);
        }
        return throwError(errorMsg);
      })
    );
  }
}

