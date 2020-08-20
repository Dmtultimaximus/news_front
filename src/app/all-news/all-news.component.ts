import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {NewsModel} from './news-model';
import {AllNewsService} from '../service/all-news.service';
import {ObservableService} from '../service/observable-service.service';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';

export const itemPage = 3;
@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {
  p: number;
  numberPage: number = itemPage;
  news$: Array<NewsModel> = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private allNewsService: AllNewsService,
              private observableService: ObservableService,
              private route: Router) {
    this.allNewsService.getAllNews().subscribe( data => {
      this.news$ = data;
      console.log(data);
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
