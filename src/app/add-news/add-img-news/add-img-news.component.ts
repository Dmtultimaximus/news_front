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
    // this need spinner
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
  uploadFile(fileList: FileList): void {
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList.item(index);
      this.files.push(element);
    }
  }

  deleteAttachment(index): void {
    this.files.splice(index, 1);
  }

  uploadImage(): void {
    console.log(this.files, 'dnd');
  }
}
