import { Component, OnInit } from '@angular/core';
import {NewsModel} from './news-model';
import {AllNewsService} from '../service/all-news.service';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {

  news$: Array<NewsModel> = [];

  constructor(private allNewsService: AllNewsService) {
    this.allNewsService.getAllNews().subscribe( data => {
      this.news$ = data;
    });
  }

  ngOnInit(): void {
  }

}
