import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewsService} from '../../service/news.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-img-news',
  templateUrl: './add-img-news.component.html',
  styleUrls: ['./add-img-news.component.css']
})
export class AddImgNewsComponent implements OnInit {
  imagen: File;
  imagenMin: File;
  addNewsForm: FormGroup;
  constructor(private newsService: NewsService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) {}
  ngOnInit(): void {
    this.addNewsForm = new FormGroup({
      img: new FormControl('', Validators.required)
    });
  }
  // tslint:disable-next-line:typedef
  onFileChange(event) {
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }

  onUpload(): void {
    // @ts-ignore
    console.log();
    this.newsService.upload(this.imagen, this.route.snapshot.paramMap.get('id')).subscribe(
      data => {
        console.log(data);
        if (data.success){
          this.router.navigate(['/main']);
          this.toastr.success('Img Added');
        } else {
          this.toastr.error('Img not Added');
        }
      }
    );
  }
}
