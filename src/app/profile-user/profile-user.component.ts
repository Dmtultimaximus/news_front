import {Component, OnInit, ViewChild} from '@angular/core';
import {ProfileUserService} from '../service/profile-user.service';
import {ProfileData} from './profile-data';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {UserDataNews} from './progile-response';
import {MatSort} from '@angular/material/sort';

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

  constructor(private profileService: ProfileUserService) {
    this.profileService.getDataOfUser().subscribe(data => {
      // @ts-ignore
      this.profileData = data;
    });
    this.profileService.getUserNews().subscribe(data => {
      // @ts-ignore
      this.userNews = data;
      // @ts-ignore
      this.dataSource = new MatTableDataSource<UserDataNews>(this.userNews);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


