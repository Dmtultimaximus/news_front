import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequestPayload} from './login-request.payload';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {map, mergeMap} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import {TransferDataAdminService} from '../../service/transfer-data-admin.service';
import * as Rx from 'rxjs';

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
              private toastr: ToastrService,
              private transferData: TransferDataAdminService) {
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
  }
  login(): void {
    this.transferData.roleAdmin.next(false);
    this.loginRequestPayload.password = this.loginForm.get('password').value;
    this.loginRequestPayload.username = this.loginForm.get('username').value;

    // this.authService.login(this.loginRequestPayload).subscribe(data => {
    //   if (data) {
    //     this.isError = false;
    //     this.router.navigateByUrl('/news/all');
    //     this.toastr.success('Login successful');
    //   } else {
    //     this.isError = true;
    //   }
    // });

    this.authService.login(this.loginRequestPayload).pipe(map(
      (data: any) => {
        if (data) {
          this.isError = false;
          this.router.navigateByUrl('/news/all');
          this.toastr.success('Login successful');
        } else {
          this.isError = true;
          }
        }
      ),
      mergeMap( data => this.authService.getDataOfUser())).subscribe(
        (data: any) => {
          this.transferData.roleAdmin.next(false);
          console.log(this.transferData.roleAdmin.getValue());
          for (const arr of  data.role){
            if (arr.authority === 'ADMIN'){
              this.transferData.roleAdmin.next(true);
              console.log(this.transferData.roleAdmin.getValue());
            }
          }
          // console.log(this.transferData.subjectRole.getValue(), 'after log');
        }
    );
  }
}
