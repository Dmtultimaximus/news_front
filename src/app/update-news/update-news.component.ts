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
import {map, startWith} from 'rxjs/operators';
import {allItTags} from '../add-news/add-news.component';
import {AllImageNewsModel} from '../about-news/all-image-news';

@Component({
  selector: 'app-update-news',
  templateUrl: './update-news.component.html',
  styleUrls: ['./update-news.component.css']
})
export class UpdateNewsComponent implements OnInit {

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

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

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
      console.log(this.aboutNews);
    });
    this.aboutService.getImgNews(newsId).subscribe( data => {
      // @ts-ignore
      this.allImageNews = data;
    });
    // console.log(this.aboutNews);
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
}
