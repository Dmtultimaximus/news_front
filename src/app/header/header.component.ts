import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {AuthService} from '../service/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {LogoutService} from '../service/logout.service';
import {TransferDataAdminService} from '../service/transfer-data-admin.service';
import {LoginComponent} from '../auth/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private localStorage: LocalStorageService,
              private authService: AuthService,
              private logoutService: LogoutService,
              private toastr: ToastrService,
              private router: Router,
              public transferData: TransferDataAdminService) {
  }

  ngOnInit(): void {
  }

  isAuth(): boolean {
    return !!this.localStorage.retrieve('username');
  }

  logOut(): void {
    console.log(this.localStorage.retrieve('authenticationtoken'));
    this.logoutService.logout({
      token: this.localStorage.retrieve('authenticationtoken')
    })
      .subscribe((data) => {
        if (data) {
          this.toastr.success('You logout');
          this.localStorage.clear('username');
          this.localStorage.clear('authenticationtoken');
          this.localStorage.clear('userId');
          this.router.navigateByUrl('/news/all');
        }
      }, (data) => {
        this.toastr.error('Registration Failed! Please try again');
      });
  }
}
