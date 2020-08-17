import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AddNewsRequestPayload} from './add-news-request.payload';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NewsService} from '../service/news.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

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
  }

  ngOnInit(): void {
    this.addNewsForm = new FormGroup({
      newsname: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
      urlImg: new FormControl('', Validators.required)
    });
  }

  public addNews(): void {
    if (this.addNewsForm.valid) {
      this.addNewsRequestPayload.newsname = this.addNewsForm.get('newsname').value;
      this.addNewsRequestPayload.description = this.addNewsForm.get('description').value;
      this.addNewsRequestPayload.tags = this.addNewsForm.get('tags').value;
      this.addNewsRequestPayload.text = this.addNewsForm.get('text').value;
      this.addNewsRequestPayload.urlImg = this.addNewsForm.get('urlImg').value;
      this.newsService.addNews(this.addNewsRequestPayload)
        .subscribe((data) => {
          // @ts-ignore
          if (!data.success){
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
    }
    else {
      this.toastr.error('Form invalid');
    }
  }
}
