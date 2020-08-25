import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignupRequestPayload} from './signup-request.payload';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  public signup(): void {
    if (this.signupForm.valid) {
      this.signupRequestPayload.email = this.signupForm.get('email').value;
      this.signupRequestPayload.username = this.signupForm.get('username').value;
      this.signupRequestPayload.password = this.signupForm.get('password').value;
      console.log(this.signupRequestPayload);
      this.authService.signup(this.signupRequestPayload)
        .subscribe((data: any) => {
          if (!data.success){
            this.toastr.error(data.message);
            console.log(data.success);
          } else {
            this.router.navigate(['/login']);
          }
        }, () => {
          this.toastr.error('Registration Failed! Please try again');
        });
    }
    else {
      this.toastr.error('Form invalid');
    }
  }
}
