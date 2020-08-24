import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NewsService} from '../../service/news.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-img-news',
  templateUrl: './add-img-news.component.html',
  styleUrls: ['./add-img-news.component.css']
})
export class AddImgNewsComponent implements OnInit {
  files: any = [];
  addNewsForm: FormGroup;
  constructor(private newsService: NewsService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  onUpload(): void {
    // @ts-ignore
    this.newsService.upload(this.files, this.route.snapshot.paramMap.get('id')).subscribe(
      data => {
        console.log(data, 'пришло');
        if (data.success){
          this.router.navigate(['/main']);
          this.toastr.success('Img Added');
        } else {
          this.toastr.error('Img not Added');
        }
      }
    );
  }
  // tslint:disable-next-line:typedef
  uploadFile(event) {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element);
    }
  }
  // tslint:disable-next-line:typedef
  deleteAttachment(index) {
    this.files.splice(index, 1);
  }

  // tslint:disable-next-line:typedef
  uploadImage() {
    console.log(this.files, 'dnd');
  }
}
