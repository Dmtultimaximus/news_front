import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AddNewsRequestPayload} from './add-news-request.payload';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NewsService} from '../service/news.service';
// for authocompleate input
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export const allItTags: string[] = ['C++', 'Java', 'Python', 'Ruby', 'JavaScript'];

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})

export class AddNewsComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  tagsCtrl = new FormControl(Validators.required);
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags: Observable<string[]>;
  tags: string[] = ['C#'];
  allTags: string[] = allItTags;

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  addNewsForm: FormGroup;
  addNewsRequestPayload: AddNewsRequestPayload;

  constructor(private router: Router,
              private toastr: ToastrService,
              private newsService: NewsService) {
    this.addNewsRequestPayload = {
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
    this.addNewsForm = new FormGroup({
      newsname: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
      urlImg: new FormControl('', Validators.required)
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

  public addNews(): void {
    if (this.addNewsForm.valid) {
      this.addNewsRequestPayload.newsname = this.addNewsForm.get('newsname').value;
      this.addNewsRequestPayload.description = this.addNewsForm.get('description').value;
      // this.addNewsRequestPayload.tags = this.addNewsForm.get('tags').value;
      this.addNewsRequestPayload.tags = this.tags.join(',');
      this.addNewsRequestPayload.text = this.addNewsForm.get('text').value;
      this.addNewsRequestPayload.urlImg = this.addNewsForm.get('urlImg').value;
      console.log(this.addNewsRequestPayload);
      this.newsService.addNews(this.addNewsRequestPayload)
        .subscribe((data) => {
          // @ts-ignore
          if (!data.success) {
            // @ts-ignore
            this.toastr.error(data.message);
            // @ts-ignore
            console.log(data.success);
          } else {
            this.router.navigate(['/main']);
          }
        }, (data) => {
          this.toastr.error('Registration Failed! Please try again');
        });
    } else {
      this.toastr.error('Form invalid');
    }
  }
}
