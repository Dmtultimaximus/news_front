import { Injectable } from '@angular/core';
import {NewsModel} from '../all-news/news-model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  aboutNews: NewsModel = {
    newsId: null,
    userId: null,
    description: '',
    newsname: '',
    tags: '',
    text: '',
    urlImg: ''
  };
  private newsSubject$ = new BehaviorSubject<NewsModel>(this.aboutNews);
  newsTransition$ = this.newsSubject$.asObservable();
  constructor() { }
  // tslint:disable-next-line:typedef
  aboutToNews(newsModel: NewsModel){
    this.aboutNews = newsModel;
    this.newsSubject$.next(newsModel);
  }
}
