import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PageResult } from 'src/app/models/PageResult';
import { User } from 'src/app/models/User';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  users: User[] = [];
  items: PageResult<User>;
  pageSize = 5;
  pageSizeOptions: number[] = [5];
  length: number;
  public dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['id', 'name', 'username', 'posts'];

  constructor(
    private _router: Router,
    private _userService: UserServiceService
  ) {}

  ngOnInit() {
    this._userService
      .getUsersPagination(1)
      .subscribe((data: PageResult<User>) => {
        this.dataSource.data = data.items;
        this.length = data.count;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelect(userId: any) {
    this._router.navigate(['/posts'], {
      queryParams: { id: userId },
    });
  }

  public handlePage(e: any) {
    this._userService
      .getUsersPagination(e.pageIndex + 1)
      .subscribe((data: PageResult<User>) => {
        this.dataSource.data = data.items;
        this.length = data.count;
      });
  }
}
