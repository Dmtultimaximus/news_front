import { Component, OnInit } from '@angular/core';
import {ObservableService} from '../service/observable-service.service';
import {Subscription} from 'rxjs';
import {NewsModel} from '../all-news/news-model';
import {ActivatedRoute, Router} from '@angular/router';
import {AboutNewsService} from '../service/about-news.service';
import {LocalStorageService} from 'ngx-webstorage';
import {DeleteUpdateNewsService} from '../service/delete-update-news.service';
import {ToastrService} from 'ngx-toastr';
import {RatingNewsService} from '../service/rating-news.service';
import {AddRatingNewsRequestPayload} from '../request-payload/add-rating-news-request-payload';
import {AllImageNewsModel} from './all-image-news';

@Component({
  selector: 'app-about-news',
  templateUrl: './about-news.component.html',
  styleUrls: ['./about-news.component.css']
})
export class AboutNewsComponent implements OnInit {
  alreadyAddedRating = false;
  isUpdate = false;
  ratingNow;
  subscription: Subscription;
  aboutNews: NewsModel;
  allImageNews: AllImageNewsModel;
  urlImg: string;
  addRatingNewsRequestPayload: AddRatingNewsRequestPayload;

  constructor(private observableService: ObservableService,
              private route: ActivatedRoute,
              private aboutService: AboutNewsService,
              private localStorage: LocalStorageService,
              private deleteNewsService: DeleteUpdateNewsService,
              private router: Router,
              private toastr: ToastrService,
              private ratingNewsService: RatingNewsService) {
    // this.subscription = this.observableService.newsTransition$.subscribe(data => {
    //   console.log('in about', data);
    //   this.aboutNews = data;
    // });
    const newsId = this.route.snapshot.paramMap.get('id');
    this.aboutService.getNews(newsId).subscribe(data => {
      // @ts-ignore
      this.aboutNews = data;
      // @ts-ignore
      console.log(typeof data.rating);
    });
    this.aboutService.getImgNews(newsId).subscribe( data => {
      // @ts-ignore
      this.allImageNews = data;
      console.log(this.allImageNews);
    });
    this.addRatingNewsRequestPayload = {
      newsId: null,
      rating: null
    };
    if (this.localStorage.retrieve('authenticationtoken')){
      this.ratingNewsService.checkRating(newsId).subscribe( data => {
        // @ts-ignore
        this.alreadyAddedRating = data.success;
        console.log(this.alreadyAddedRating);
      });
    }
    this.ratingNewsService.getRating(newsId).subscribe( datarating => {
      // @ts-ignore
      if (datarating === 'NaN'){
        this.ratingNow = datarating;
      } else {
        // @ts-ignore
        this.ratingNow = datarating.toFixed(3);
      }
      console.log('rating', datarating, typeof datarating);
    });
  }
  ngOnInit(): void {

  }
  // tslint:disable-next-line:typedef
  isAuth() {
    // @ts-ignore
    return !!this.localStorage.retrieve('username');
  }
  // tslint:disable-next-line:typedef
  userOwner(){
    return this.aboutNews.userId === this.localStorage.retrieve('userId');
  }
  // tslint:disable-next-line:typedef
  deleteNews() {
    this.deleteNewsService.deleteNews(this.aboutNews.newsId).subscribe( data => {
      // @ts-ignore
      if (data.success){
        // @ts-ignore
        this.toastr.success(data.message);
        this.router.navigate(['/main']);
      } else {
        // @ts-ignore
        this.toastr.success(data.message);
      }
    });
  }
  // tslint:disable-next-line:typedef
  updateNews(newsId) {
    this.router.navigate(['/update', newsId]);
  }

  // tslint:disable-next-line:typedef
  addRating(rating) {
    this.addRatingNewsRequestPayload.newsId = this.aboutNews.newsId;
    this.addRatingNewsRequestPayload.rating = rating;
    this.ratingNewsService.addRating(this.addRatingNewsRequestPayload).subscribe( data => {
      // @ts-ignore
      if (data.success){
        // @ts-ignore
        this.toastr.success(data.message);
        this.alreadyAddedRating = false;
      } else {
        // @ts-ignore
        this.toastr.error(data.message);
      }
    });
  }
}
