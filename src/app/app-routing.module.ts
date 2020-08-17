import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import { AllNewsComponent } from './all-news/all-news.component';
import {AddNewsComponent} from './add-news/add-news.component';
import {AboutNewsComponent} from './about-news/about-news.component';
import {UpdateNewsComponent} from './update-news/update-news.component';

const routes: Routes = [
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: AllNewsComponent },
  { path: 'add-news', component: AddNewsComponent},
  { path: 'about-news/:id', component: AboutNewsComponent},
  { path: 'update/:id', component: UpdateNewsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
