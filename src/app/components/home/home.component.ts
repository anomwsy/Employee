import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/DataService/data.service';
import { HttpClient } from '@angular/common/http';
import {
  ActivatedRoute,
  NavigationExtras,
  Route,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  employees: any = [];
  page: number = 1;
  sort: boolean | null = null;
  column: string = '';
  totalPage: number = 0;
  selectedEmployee: any = null;
  pageSize: number = 10;
  searchText: string = '';
  isNotifOpen: boolean = false;
  constructor(
    private _service: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams['search'] || queryParams['page']) {
        this.searchText = queryParams['search'];
        this.page = Number(queryParams['page']);
      }
    });
    this.router.navigate([]);
    this.employees = this.getData();
  }

  getData() {
    this.employees = this._service
      .getAllData('username', 'default', this.page, this.pageSize)
      .subscribe({
        next: (result: any) => {
          this.totalPage = result.pages;
          this.employees = result.data;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }


  sortBy(column: string) {
    this.sort = this.sort === null ? true : !this.sort;
    this.column = column;
    this._service
      .getAllData(
        this.column,
        this.sort === null ? '' : this.sort ? 'asc' : 'desc',
        this.page,
        this.pageSize
      )
      .subscribe({
        next: (result: any) => {
          this.totalPage = result.pages;
          this.employees = result.data;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  range(): number[] {
    const visiblePages = 3;
    const currentPage = this.page;

    let startPage = Math.max(currentPage - 1, 1);
    let endPage = startPage + visiblePages - 1;

    if (endPage > this.totalPage) {
      endPage = this.totalPage;
      startPage = Math.max(endPage - visiblePages + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => index + startPage
    );
  }

  toPage(page: number) {
    this.page = page;
    this._service
      .getAllData(
        this.column,
        this.sort === null ? '' : this.sort ? 'asc' : 'desc',
        this.page,
        this.pageSize
      )
      .subscribe({
        next: (result: any) => {
          this.totalPage = result.pages;
          this.employees = result.data;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  trackByFunction(index: number, item: any) {
    return item.id; // Ganti dengan properti yang unik pada objek employee
  }

  selectEmployee(employee: any) {
    if (this.selectedEmployee === employee) {
      this.selectedEmployee = null;
      return;
    }
    this.selectedEmployee = employee;
  }

  isEmployeeSelected(employee: any): boolean {
    return this.selectedEmployee === employee;
  }

  detailEmployee(id: string) {
    this.router.navigate(['/detail'], {
      queryParams: {
        id: id,
        search: this.searchText,
        page: this.page,
      },
    });
  }

  searchHandler() {
    console.log('Search belum berfungsi')
  }

  deleteEmployee() {
    const id = this.selectedEmployee.id;
    this._service.deleteEmployee(id).subscribe({
      next: (result) => {
        this.selectEmployee(null);
        this._service
        .getAllData(
          this.column,
          this.sort === null ? '' : this.sort ? 'asc' : 'desc',
          this.page,
          this.pageSize
        )
        .subscribe({
          next: (result: any) => {
            this.totalPage = result.pages;
            this.employees = result.data;
            if(this.page > this.totalPage){
              this.page = this.totalPage
              this.toPage(this.page)
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
        this.isNotifOpen = true;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  closeNotif() {
    this.isNotifOpen = false;
  }
}
