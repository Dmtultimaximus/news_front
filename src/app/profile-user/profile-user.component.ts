import { Component, OnInit } from '@angular/core';
import {ProfileUserService} from '../service/profile-user.service';
import {ProfileData} from './profile-data';
import {NewsModel} from '../all-news/news-model';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  profileData: ProfileData;
  userNews: Array<object> = [];
  constructor(private profileService: ProfileUserService) {
    this.profileService.getDataOfUser().subscribe(data => {
      // @ts-ignore
      this.profileData = data;
    });
    this.profileService.getUserNews().subscribe(data => {
      // @ts-ignore
      this.userNews = data;
      console.log(this.userNews);
    });
  }

  ngOnInit(): void {
  }

}
