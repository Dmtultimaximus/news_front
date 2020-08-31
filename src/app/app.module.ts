import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddImgNewsComponent } from './add-news/add-img-news/add-img-news.component';
import { DragDropDirective } from './directive/drag-and-drop.directive';
import { UpdateTextComponent } from './update-news/update-text/update-text.component';
import { UpdateImageComponent } from './update-news/update-image/update-image.component';



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
    ProfileUserComponent,
    AddImgNewsComponent,
    DragDropDirective,
    UpdateTextComponent,
    UpdateImageComponent
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
    MatSliderModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    NgxPaginationModule,
    FormsModule
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
