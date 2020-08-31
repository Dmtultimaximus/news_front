import {Component, OnInit} from '@angular/core';
import {ObservableService} from '../service/observable-service.service';
import {pipe, Subscription} from 'rxjs';
import {NewsModel} from '../all-news/news-model';
import {ActivatedRoute, Router} from '@angular/router';
import {AboutNewsService} from '../service/about-news.service';
import {LocalStorageService} from 'ngx-webstorage';
import {DeleteUpdateNewsService} from '../service/delete-update-news.service';
import {ToastrService} from 'ngx-toastr';
import {RatingNewsService} from '../service/rating-news.service';
import {AddRatingNewsRequestPayload} from '../request-payload/add-rating-news-request-payload';
import {AllImageNewsModel} from './all-image-news';
import {map, mergeMap, publish} from 'rxjs/operators';
import {MessageService} from '../service/message.service';
import {CommentModel} from './comment-model';

@Component({
  selector: 'app-about-news',
  templateUrl: './about-news.component.html',
  styleUrls: ['./about-news.component.css']
})
export class AboutNewsComponent implements OnInit {
  alreadyAddedRating = false;
  isUpdate = false;
  ratingNow;
  comment: CommentModel;
  aboutNews: NewsModel;
  allImageNews: any[];
  urlImg: string;
  addRatingNewsRequestPayload: AddRatingNewsRequestPayload;
  mainImageNews: AllImageNewsModel[] = [];
  otherImageNews: AllImageNewsModel[] = [];
  public newsId = this.route.snapshot.paramMap.get('id');
  title = 'websocket-frontend';
  input;

  constructor(private route: ActivatedRoute,
              private aboutService: AboutNewsService,
              private localStorage: LocalStorageService,
              private deleteNewsService: DeleteUpdateNewsService,
              private router: Router,
              private toastr: ToastrService,
              private ratingNewsService: RatingNewsService,
              public messageService: MessageService) {
    const newsId = this.route.snapshot.paramMap.get('id');
    this.aboutService.getNews(newsId).subscribe((data: NewsModel) => {
      this.aboutNews = data;
    });
    this.aboutService.getImgNews(newsId).subscribe((data: any[]) => {
      this.allImageNews = data;
      for (const i of this.allImageNews) {
        i.mainImg ? this.mainImageNews.push(i) : this.otherImageNews.push(i);
      }
      console.log(this.allImageNews);
      console.log(this.mainImageNews);
      console.log(this.otherImageNews);
    });
    this.addRatingNewsRequestPayload = {
      newsId: null,
      rating: null
    };
    this.comment = {
      text: '',
      username: ''
    };
    if (this.localStorage.retrieve('authenticationtoken')) {
      this.ratingNewsService.checkRating(newsId).subscribe((data: any) => {
        this.alreadyAddedRating = data;
      });
    }
    this.ratingNewsService.getRating(newsId).subscribe((datarating: any) => {
      if (datarating === 'NaN') {
        this.ratingNow = datarating;
      } else {
        this.ratingNow = datarating.toFixed(3);
      }
    });
  }

  ngOnInit(): void {
  }

  sendMessage(newsId): void {
    if (this.input) {
      this.comment.text = this.input;
      this.comment.username = this.localStorage.retrieve('username');
      this.messageService.sendMessage(this.comment.text, this.newsId);
      this.input = '';
    }
  }

  isAuth(): boolean {
    return !!this.localStorage.retrieve('username');
  }

  userOwner(): boolean {
    return this.aboutNews.userId === this.localStorage.retrieve('userId');
  }

  deleteNews(): void {
    this.deleteNewsService.deleteNews(this.aboutNews.newsId).subscribe((data: any) => {
      if (data) {
        this.toastr.success('success');
        this.router.navigate(['/main']);
      } else {
        this.toastr.error('error');
      }
    });
  }

  updateNews(newsId): void {
    this.router.navigate(['/update', newsId]);
  }

  addRating(rating): void {
    this.addRatingNewsRequestPayload.newsId = this.aboutNews.newsId;
    this.addRatingNewsRequestPayload.rating = rating;

    this.ratingNewsService.addRating(this.addRatingNewsRequestPayload).pipe(map(
      (data: any) => {
        return data;
      }),
      mergeMap(datarating => this.ratingNewsService.getRating(this.route.snapshot.paramMap.get('id')))).subscribe(
      (datarating: any) => {
        if (datarating === 'NaN') {
          this.ratingNow = datarating;
        } else {
          this.ratingNow = datarating.toFixed(3);
        }
        this.toastr.success('rating added');
        this.alreadyAddedRating = false;
      });
  }
}
