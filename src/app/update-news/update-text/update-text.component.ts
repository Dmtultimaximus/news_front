import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {allItTags} from '../../add-news/add-news.component';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {NewsUpdateRequestPayload} from '../news-update-request.payload';
import {NewsModel} from '../../all-news/news-model';
import {ActivatedRoute, Router} from '@angular/router';
import {AboutNewsService} from '../../service/about-news.service';
import {DeleteUpdateNewsService} from '../../service/delete-update-news.service';
import {ToastrService} from 'ngx-toastr';
import {map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-update-text',
  templateUrl: './update-text.component.html',
  styleUrls: ['./update-text.component.css']
})
export class UpdateTextComponent implements OnInit {
  strToArrTags: string[];
  selectable = true;
  removable = true;
  tagsCtrl = new FormControl(Validators.required);
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = allItTags;

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  newsUpdateRequestPayload: NewsUpdateRequestPayload;
  updateNewsForm: FormGroup;
  aboutNews: NewsModel = new NewsModel();
  constructor(private route: ActivatedRoute,
              private aboutService: AboutNewsService,
              private deleteUpdateNewsService: DeleteUpdateNewsService,
              private router: Router,
              private toastr: ToastrService) {

    const newsId = this.route.snapshot.paramMap.get('id');
    this.aboutService.getNews(newsId).subscribe((data: NewsModel) => {
      this.aboutNews = data;
      this.strToArrTags = this.aboutNews.tags.split(',');
      this.tags = this.strToArrTags;
      this.updateNewsForm = new FormGroup({
        newsname: new FormControl(data.newsname),
        description: new FormControl(data.description),
        text: new FormControl(data.text)
      });
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

  updateNews(): void {
    this.newsUpdateRequestPayload.newsname = this.updateNewsForm.controls.newsname.value;
    this.newsUpdateRequestPayload.description = this.updateNewsForm.controls.description.value;
    this.newsUpdateRequestPayload.tags = this.tags.join(',');
    this.newsUpdateRequestPayload.text = this.updateNewsForm.controls.text.value;
    this.deleteUpdateNewsService.updateNews(this.aboutNews.newsId, this.newsUpdateRequestPayload).subscribe(
      (data: any) => {
        if (data) {
          this.router.navigate(['/main']);
          this.toastr.success('success');
        } else {
          this.toastr.error('error');
        }
      });
  }
}
