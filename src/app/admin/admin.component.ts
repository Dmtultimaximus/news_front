import {Component, OnInit} from '@angular/core';
import {TransferDataAdminService} from '../service/transfer-data-admin.service';
import {AdminService} from '../service/admin.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {map, mergeMap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  roles: Array<object>;
  admin: boolean;
  dataUsers: Array<object>;
  addDel: boolean;
  constructor(public transferData: TransferDataAdminService,
              private adminService: AdminService,
              private modalService: NgbModal,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    // this.transferData.subjectRole.subscribe(
    //   (data: any) => {
    //     for (const arr of data.role) {
    //       if (arr.authority === 'ADMIN') {
    //         this.transferData.admin = true;
    //       }
    //     }
    //     console.log(this.admin);
    //   }
    // );
    console.log(this.admin, 'after');
    this.adminService.getRole().subscribe(
      (data: Array<object>) => {
        data.splice(1, 1);
        this.roles = data;
        console.log(this.roles, 'roles');
      }
    );
    this.adminService.getUsers().subscribe(
      (data: any) => {
        console.log(data, 'data');
        this.dataUsers = data;
      }
    );
  }

  openVerticallyCentered(content): void {
    this.modalService.open(content, { centered: true });
  }

  triggerDel(authority): boolean {
    return authority.length > 1;
  }
  triggerAdd(authority): boolean {
    return authority.length < 3;
  }
  deleteRole(userId, roleId): void {
    this.adminService.deleteRole(userId, roleId).pipe(map(
      (data: boolean) => {
        if (data) {
          this.toastr.warning('role deleted');
        }
      }
    ),
      mergeMap(data => this.adminService.getUsers())).subscribe(
      (data: Array<object>) => {
        this.dataUsers = data;
      }
    );
  }
  addRole(userId, roleId): void {
    this.adminService.addRole(userId, roleId).pipe(map(
      (data: boolean) => {
        if (data){
          this.toastr.success('role added');
        }
      }
    ),
    mergeMap( data => this.adminService.getUsers())).subscribe(
      (data: Array<object>) => {
        this.dataUsers = data;
      }
    );
    // this.adminService.addRole(userId, roleId).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //   }
    // );
  }

  check(role, userRoles): boolean {
    let trigger = false;
    userRoles.forEach((el) => {
      if (el.authority === role.authority){
        trigger = true;
      }
    });
    return trigger;
  }
}
