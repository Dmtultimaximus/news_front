import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {AuthService} from './auth.service';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferDataAdminService {
  public admin: boolean;
  public roleAdmin = new Rx.BehaviorSubject(false);
  constructor(private localStorage: LocalStorageService,
              private authService: AuthService) {
    if (this.localStorage.retrieve('authenticationtoken')) {
      this.authService.getDataOfUser().subscribe(
        (data: any) => {
          this.roleAdmin.next(false);
          for (const arr of  data.role){
            if (arr.authority === 'ADMIN'){
              this.roleAdmin.next(true);
            }
          }
        });
    }
  }
}
