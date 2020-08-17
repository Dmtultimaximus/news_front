import {Component, OnInit, Output} from '@angular/core';
import {NewsModel} from './news-model';
import {AllNewsService} from '../service/all-news.service';
import {ObservableService} from '../service/observable-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {

  news$: Array<NewsModel> = [];

  constructor(private allNewsService: AllNewsService,
              private observableService: ObservableService,
              private route: Router) {
    this.allNewsService.getAllNews().subscribe( data => {
      this.news$ = data;
    });
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  public about(news: NewsModel) {
    this.observableService.aboutToNews(news);
    this.route.navigate(['/about-news', news.newsId]);
  }
}
