import {Component, OnInit} from '@angular/core';
import {ObservableService} from '../service/observable-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AboutNewsService} from '../service/about-news.service';
import {LocalStorageService} from 'ngx-webstorage';
import {DeleteUpdateNewsService} from '../service/delete-update-news.service';
import {ToastrService} from 'ngx-toastr';
import {NewsUpdateRequestPayload} from './news-update-request.payload';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewsModel} from '../all-news/news-model';

@Component({
  selector: 'app-update-news',
  templateUrl: './update-news.component.html',
  styleUrls: ['./update-news.component.css']
})
export class UpdateNewsComponent implements OnInit {

  newsUpdateRequestPayload: NewsUpdateRequestPayload;
  updateNewsForm: FormGroup;
  aboutNews: NewsModel = new NewsModel();

  constructor(private observableService: ObservableService,
              private route: ActivatedRoute,
              private aboutService: AboutNewsService,
              private localStorage: LocalStorageService,
              private deleteUpdateNewsService: DeleteUpdateNewsService,
              private router: Router,
              private toastr: ToastrService) {
    const newsId = this.route.snapshot.paramMap.get('id');
    this.aboutService.getNews(newsId).subscribe(data => {
      // @ts-ignore
      this.aboutNews = data;
      this.updateNewsForm = new FormGroup({
        // @ts-ignore
        newsname: new FormControl(data.newsname),
        // @ts-ignore
        description: new FormControl(data.description),
        // @ts-ignore
        tags: new FormControl(data.tags),
        // @ts-ignore
        text: new FormControl(data.text),
        // @ts-ignore
        urlImg: new FormControl(data.urlImg)
      });
    });
    // console.log(this.aboutNews);
    this.newsUpdateRequestPayload = {
      newsname: '',
      description: '',
      tags: '',
      text: '',
      urlImg: ''
    };
    // this.newsUpdateRequestPayload.newsname = this.aboutNews.newsname;
  }

  ngOnInit(): void {
    this.updateNewsForm = new FormGroup({
      newsname: new FormControl(Validators.required),
      description: new FormControl(Validators.required),
      tags: new FormControl(Validators.required),
      text: new FormControl(Validators.required),
      urlImg: new FormControl(Validators.required)
    });
  }

  // tslint:disable-next-line:typedef
  updateNews() {
    this.newsUpdateRequestPayload.newsname = this.updateNewsForm.controls.newsname.value;
    this.newsUpdateRequestPayload.description = this.updateNewsForm.controls.description.value;
    this.newsUpdateRequestPayload.tags = this.updateNewsForm.controls.tags.value;
    this.newsUpdateRequestPayload.text = this.updateNewsForm.controls.text.value;
    this.newsUpdateRequestPayload.urlImg = this.updateNewsForm.controls.urlImg.value;
    this.deleteUpdateNewsService.updateNews(this.aboutNews.newsId, this.newsUpdateRequestPayload).subscribe( data => {
      // @ts-ignore
      if (data.success){
        this.router.navigate(['/main']);
        // @ts-ignore
        this.toastr.success(data.message);
      } else {
        // @ts-ignore
        this.toastr.success(data.message);
      }
    });
  }
}
