import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {AuthService} from '../service/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {LogoutService} from '../service/logout.service';

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
              private router: Router) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  isAuth() {
    // @ts-ignore
    return !!this.localStorage.retrieve('username');
  }

  // tslint:disable-next-line:typedef
  logOut() {
    console.log(this.localStorage.retrieve('authenticationtoken'));
    this.logoutService.logout({
      token: this.localStorage.retrieve('authenticationtoken')
    })
      .subscribe((data) => {
        // @ts-ignore
        if (data) {
          this.toastr.success('You logout');
          this.localStorage.clear('username');
          this.localStorage.clear('authenticationtoken');
        } else {
          this.router.navigateByUrl('/');
        }
      }, (data) => {
        this.toastr.error('Registration Failed! Please try again');
      });
  }
}
