import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {AllNewsComponent} from './all-news/all-news.component';
import {AddNewsComponent} from './add-news/add-news.component';
import {AboutNewsComponent} from './about-news/about-news.component';
import {UpdateNewsComponent} from './update-news/update-news.component';
import {ProfileUserComponent} from './profile-user/profile-user.component';
import {AddImgNewsComponent} from './add-news/add-img-news/add-img-news.component';
import {NewsComponent} from './news/news.component';

const routes: Routes = [
  {path: 'sign-up', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'add-news', component: AddNewsComponent},
  {path: 'update/:id', component: UpdateNewsComponent},
  {path: 'profile', component: ProfileUserComponent},
  {path: 'add-image/:id', component: AddImgNewsComponent},
  {
    path: 'news', component: NewsComponent,
    children: [
      {path: 'all', component: AllNewsComponent},
      {path: ':id', component: AboutNewsComponent},
      {path: ':id/update', component: UpdateNewsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
