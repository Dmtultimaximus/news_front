import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ObservableService} from '../service/observable-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AboutNewsService} from '../service/about-news.service';
import {LocalStorageService} from 'ngx-webstorage';
import {DeleteUpdateNewsService} from '../service/delete-update-news.service';
import {ToastrService} from 'ngx-toastr';
import {NewsUpdateRequestPayload} from './news-update-request.payload';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewsModel} from '../all-news/news-model';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {map, mergeMap, startWith} from 'rxjs/operators';
import {allItTags} from '../add-news/add-news.component';
import {AllImageNewsModel} from '../about-news/all-image-news';
import {NewsService} from '../service/news.service';
import {logger} from 'codelyzer/util/logger';

// @ts-ignore
@Component({
  selector: 'app-update-news',
  templateUrl: './update-news.component.html',
  styleUrls: ['./update-news.component.css']
})
export class UpdateNewsComponent implements OnInit {
  isAddedOther: boolean;
  isAddedMain: boolean;
  isEmptyImg: boolean;
  filesOther: any = [];
  filesMain: any = [];

  strToArrTags: string[];
  visible = true;
  selectable = true;
  removable = true;
  tagsCtrl = new FormControl(Validators.required);
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = allItTags;
  allImageNews: AllImageNewsModel;
  // doing init ALWAYS!!!
  mainImageNews: AllImageNewsModel[] = [];
  otherImageNews: AllImageNewsModel[] = [];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  newsUpdateRequestPayload: NewsUpdateRequestPayload;
  updateNewsForm: FormGroup;
  aboutNews: NewsModel = new NewsModel();

  constructor(private observableService: ObservableService,
              private route: ActivatedRoute,
              private aboutService: AboutNewsService,
              private localStorage: LocalStorageService,
              private newsService: NewsService,
              private deleteUpdateNewsService: DeleteUpdateNewsService,
              private router: Router,
              private toastr: ToastrService) {

    const newsId = this.route.snapshot.paramMap.get('id');
    this.aboutService.getNews(newsId).subscribe(data => {
      // @ts-ignore
      this.aboutNews = data;
      this.strToArrTags = this.aboutNews.tags.split(',');
      this.tags = this.strToArrTags;
      this.updateNewsForm = new FormGroup({
        // @ts-ignore
        newsname: new FormControl(data.newsname),
        // @ts-ignore
        description: new FormControl(data.description),
        // @ts-ignore
        text: new FormControl(data.text)
      });
    });

    // tslint:disable-next-line:typedef
    this.aboutService.getImgNews(newsId).subscribe( data => {
      // @ts-ignore
      this.allImageNews = data;
      // @ts-ignore
      for (const i of this.allImageNews ){
        i.mainImg ? this.mainImageNews.push(i) : this.otherImageNews.push(i);
      }
      if (this.mainImageNews.length === 0){
        this.isEmptyImg = true;
      }
      console.log(this.mainImageNews, 'main');
      console.log(this.otherImageNews, 'other');
    });

    this.newsUpdateRequestPayload = {
      newsname: '',
      description: '',
      tags: '',
      text: '',
      urlImg: ''
    };

    this.filteredTags = this.tagsCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  ngOnInit(): void {
    this.updateNewsForm = new FormGroup({
      newsname: new FormControl(Validators.required),
      description: new FormControl(Validators.required),
      tags: new FormControl(Validators.required),
      text: new FormControl(Validators.required),
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    // this.tagsCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    // this.tagsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  // tslint:disable-next-line:typedef
  updateNews() {
    this.newsUpdateRequestPayload.newsname = this.updateNewsForm.controls.newsname.value;
    this.newsUpdateRequestPayload.description = this.updateNewsForm.controls.description.value;
    this.newsUpdateRequestPayload.tags = this.tags.join(',');
    this.newsUpdateRequestPayload.text = this.updateNewsForm.controls.text.value;
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
  onUploadMainImg(): void {
    // multiplay subscribe
    // mergeMap
    if (this.newsService.upload(this.filesMain, this.route.snapshot.paramMap.get('id')).pipe(map( data => {
      return data.success;
    }), mergeMap(data => this.aboutService.getImgNews(this.route.snapshot.paramMap.get('id')))).subscribe( mainImg => {
      // @ts-ignore
      for (const i of mainImg){
        if (i.mainImg){
          this.mainImageNews.push(i);
        }
      }
      this.isEmptyImg = false;
      this.filesMain = [];
      console.log(this.mainImageNews, 'main img after downloand');
    })){
      this.toastr.success('Img Added');
    } else{
      this.toastr.error('Img not Added');
    }
  }
  // tslint:disable-next-line:typedef
  uploadMainFile(event) {
    console.log(event, 'main');
    // tslint:disable-next-line:prefer-for-of
    const element = event[0];
    this.filesMain.push(element);
  }
  // tslint:disable-next-line:typedef
  uploadOtherFile(event) {
    console.log(event, 'other');
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.filesOther.push(element);
    }
  }
  // tslint:disable-next-line:typedef
  // tslint:disable-next-line:typedef
  deleteAttachmentOther(index) {
    this.filesOther.splice(index, 1);
  }
  // tslint:disable-next-line:typedef
  deleteAttachmentMain(index) {
    this.filesMain.splice(index, 1);
  }
  // tslint:disable-next-line:typedef
  deleteMainImg(cloudIdImg: string) {
    this.newsService.delete(cloudIdImg).subscribe( data => {
      if (data.success){
        this.isEmptyImg = true;
        this.mainImageNews = [];
      }
    });
  }

  // tslint:disable-next-line:typedef
  deleteOtherImg(cloudIdImg: string) {
    this.newsService.delete(cloudIdImg).pipe(map( data => {
    return console.log(data);
    }),
      // @ts-ignore
      mergeMap(data => this.aboutService.getImgNews(this.route.snapshot.paramMap.get('id')))).subscribe(otherImg => {
        this.otherImageNews = [];
        // @ts-ignore
        for (const i of otherImg){
          if (!i.mainImg){
            this.otherImageNews.push(i);
            // console.log(i);
            // console.log(this.otherImageNews, 'after delete');
          }
      }
    });
  }
  // tslint:disable-next-line:typedef
  addOtherImg() {
    this.isAddedOther = !this.isAddedOther;
  }
  // tslint:disable-next-line:typedef
  onUploadOtherImg() {
    console.log(this.filesOther);
    if (this.newsService.uploadOther(this.filesOther, this.route.snapshot.paramMap.get('id')).pipe(map( data => {
      return data.success;
    }), mergeMap(data => this.aboutService.getImgNews(this.route.snapshot.paramMap.get('id')))).subscribe( Img => {
      this.otherImageNews = [];
      // @ts-ignore
      for (const i of Img){
        if (!i.mainImg){
          this.otherImageNews.push(i);
        }
      }
      // this.isEmptyImg = false;
      this.filesOther = [];
      console.log(this.mainImageNews, 'other img after downloand');
    })){
      this.toastr.success('Img Added');
    } else{
      this.toastr.error('Img not Added');
    }
  }
}
