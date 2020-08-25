import {Component, OnInit, ViewChild} from '@angular/core';
import {ProfileUserService} from '../service/profile-user.service';
import {ProfileData} from './profile-data';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {UserDataNews} from './progile-response';
import {MatSort} from '@angular/material/sort';
import {DeleteUpdateNewsService} from '../service/delete-update-news.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {NewsModel} from '../all-news/news-model';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  profileData: ProfileData;
  userNews: Array<object> = [];

  displayedColumns: string[] = ['newsId', 'newsname', 'description', 'tags', 'text'];
  dataSource: MatTableDataSource<UserDataNews>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private profileService: ProfileUserService,
              private deleteNewsService: DeleteUpdateNewsService,
              private route: Router,
              private toastr: ToastrService) {
    this.profileService.getDataOfUser().subscribe((data: ProfileData) => {
      this.profileData = data;
    });
    this.profileService.getUserNews().subscribe((data: any)  => {
      this.dataSource = new MatTableDataSource<UserDataNews>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  deleteNews(newsId): void {
    this.deleteNewsService.deleteNews(newsId).pipe(map(
      (data: any) => {
        return this.toastr.success(data.message);
      }),
      mergeMap(data => this.profileService.getUserNews())).subscribe(
      (dataUsers: any) => {
        this.dataSource = new MatTableDataSource<UserDataNews>(dataUsers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  aboutNews(newsId): void {
      this.route.navigate(['/about-news', newsId]);
  }
}


