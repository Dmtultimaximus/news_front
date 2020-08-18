import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpRequest} from '@angular/common/http';
import {LoginComponent} from './auth/login/login.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {AuthInterceptorService} from './service/auth-interceptor.service';
import {AllNewsComponent} from './all-news/all-news.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { AboutNewsComponent } from './about-news/about-news.component';
import { UpdateNewsComponent } from './update-news/update-news.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import {MatSliderModule} from '@angular/material/slider';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SignupComponent,
    LoginComponent,
    AllNewsComponent,
    AddNewsComponent,
    AboutNewsComponent,
    UpdateNewsComponent,
    ProfileUserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatSliderModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
