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
  newsId;
  title = 'websocket-frontend';
  input;
  user;
  constructor(private route: ActivatedRoute,
              private aboutService: AboutNewsService,
              private localStorage: LocalStorageService,
              private deleteNewsService: DeleteUpdateNewsService,
              private router: Router,
              private toastr: ToastrService,
              private ratingNewsService: RatingNewsService,
              public messageService: MessageService) {
    this.newsId = this.route.snapshot.paramMap.get('id');

    if (this.messageService.status){
      console.log('status true');
      this.messageService.stompClient.disconnect();
    } else {
      console.log('status false');
    }
    this.messageService.initializeWebSocketConnection(this.newsId);

    this.user = this.localStorage.retrieve('username');
    this.aboutService.getNews(this.newsId).subscribe((data: NewsModel) => {
      this.aboutNews = data;
    });
    this.aboutService.getImgNews(this.newsId).subscribe((data: any[]) => {
      this.allImageNews = data;
      for (const i of this.allImageNews) {
        i.mainImg ? this.mainImageNews.push(i) : this.otherImageNews.push(i);
      }
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
      this.ratingNewsService.checkRating(this.newsId).subscribe((data: any) => {
        this.alreadyAddedRating = data;
      });
    }
    this.ratingNewsService.getRating(this.newsId).subscribe((datarating: any) => {
      if (datarating === 'NaN') {
        this.ratingNow = datarating;
      } else {
        this.ratingNow = datarating.toFixed(3);
      }
    });
  }

  ngOnInit(): void {

  }

  sendMessage(): void {
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
        this.router.navigate(['/news/all']);
      } else {
        this.toastr.error('error');
      }
    });
  }

  updateNews(newsId: bigint): void {
    this.router.navigate([`news/${this.newsId}/update`]);
  }

  addRating(rating): void {
    this.addRatingNewsRequestPayload.newsId = this.aboutNews.newsId;
    this.addRatingNewsRequestPayload.rating = rating;

    this.ratingNewsService.addRating(this.addRatingNewsRequestPayload).pipe(map(
      (data: any) => {
        return data;
      }),
      mergeMap(datarating => this.ratingNewsService.getRating(this.newsId))).subscribe(
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
