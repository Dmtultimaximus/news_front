import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequestPayload} from './login-request.payload';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequestPayload: LoginRequestPayload;
  loginForm: FormGroup;
  registerSuccessMessage: string;
  isError: boolean;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
    this.loginRequestPayload = {
      password: '',
      username: ''
    };
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required ),
      password: new FormControl('', Validators.required )
    });
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
            + 'activate your account before you Login!';
        }
      });
  }
  // tslint:disable-next-line:typedef
  login() {
    this.loginRequestPayload.password = this.loginForm.get('password').value;
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.authService.login(this.loginRequestPayload).subscribe(data => {
      if (data) {
        console.log(data);
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastr.success('Login successful');
      } else {
        this.isError = true;
      }
    });
  }
}
