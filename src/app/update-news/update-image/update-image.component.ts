import {Component, OnInit} from '@angular/core';
import {AllImageNewsModel} from '../../about-news/all-image-news';
import {ActivatedRoute} from '@angular/router';
import {AboutNewsService} from '../../service/about-news.service';
import {NewsService} from '../../service/news.service';
import {ToastrService} from 'ngx-toastr';
import {map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {

  isAddedOther: boolean;
  isEmptyImg: boolean;
  filesOther: any = [];
  filesMain: any = [];
  allImageNews: any[];
  // doing init ALWAYS!!!
  mainImageNews: AllImageNewsModel[] = [];
  otherImageNews: AllImageNewsModel[] = [];

  constructor(private route: ActivatedRoute,
              private aboutService: AboutNewsService,
              private newsService: NewsService,
              private toastr: ToastrService) {

    const newsId = this.route.snapshot.paramMap.get('id');
    this.aboutService.getImgNews(newsId).subscribe((data: any[]) => {
      this.allImageNews = data;
      console.log(this.allImageNews, 'array?', typeof this.allImageNews);
      for (const i of this.allImageNews) {
        i.mainImg ? this.mainImageNews.push(i) : this.otherImageNews.push(i);
      }
      if (this.mainImageNews.length === 0) {
        this.isEmptyImg = true;
      }
    });
  }

  ngOnInit(): void {
  }

  onUploadMainImg(): void {
    // multiplay subscribe
    // this need spinner
    if (this.newsService.upload(this.filesMain, this.route.snapshot.paramMap.get('id')).pipe(
      map(data => {
        return data;
      }),
      mergeMap(data => this.aboutService.getImgNews(this.route.snapshot.paramMap.get('id')))).subscribe(
      (mainImg: any[]) => {
        for (const i of mainImg) {
          if (i.mainImg) {
            this.mainImageNews.push(i);
          }
        }
        this.isEmptyImg = false;
        this.filesMain = [];
      })) {
      this.toastr.success('Img Added');
    } else {
      this.toastr.error('Img not Added');
    }
  }

  onUploadOtherImg(): void {
    // this need spinner
    if (this.newsService.uploadOther(this.filesOther, this.route.snapshot.paramMap.get('id')).pipe(map(data => {
      return data;
    }), mergeMap(data => this.aboutService.getImgNews(this.route.snapshot.paramMap.get('id')))).subscribe(
      (Img: any[]) => {
        this.otherImageNews = [];
        for (const i of Img) {
          if (!i.mainImg) {
            this.otherImageNews.push(i);
          }
        }
        this.filesOther = [];
        console.log(this.mainImageNews, 'other img after downloand');
      })) {
      this.toastr.success('Img Added');
    } else {
      this.toastr.error('Img not Added');
    }
  }

  uploadMainFile(event): void {
    console.log(event, 'main');
    const element = event[0];
    this.filesMain.push(element);
  }

  uploadOtherFile(fileList: FileList): void {
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList.item(index);
      this.filesOther.push(element);
    }
  }

  deleteAttachmentOther(index): void {
    this.filesOther.splice(index, 1);
  }

  deleteAttachmentMain(index): void {
    this.filesMain.splice(index, 1);
  }

  deleteMainImg(cloudIdImg: string): void {
    this.newsService.delete(cloudIdImg).subscribe((data: boolean) => {
      if (data) {
        this.isEmptyImg = true;
        this.mainImageNews = [];
      }
    });
  }

  deleteOtherImg(cloudIdImg: string): void {
    this.newsService.delete(cloudIdImg).pipe(map(data => {
        return console.log(data);
      }),
      mergeMap(data => this.aboutService.getImgNews(this.route.snapshot.paramMap.get('id')))).subscribe(
      (otherImg: any[]) => {
        this.otherImageNews = [];
        for (const i of otherImg) {
          if (!i.mainImg) {
            this.otherImageNews.push(i);
          }
        }
      });
  }

  addOtherImg(): void {
    this.isAddedOther = !this.isAddedOther;
  }
}
