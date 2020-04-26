import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatHeaderRowDef} from '@angular/material/table';

export interface SavedTestResult {
  testDate: Date;
  expirationDate: Date;
  download: number;
  upload: number;
  server: string;
  link: string;
}

const TEST_RESULTS_DATA: SavedTestResult[] = [
  {testDate: new Date(), expirationDate: new Date(), download: 43.28, upload: 34.87, server: 'California', link: '/'},
  {testDate: new Date(), expirationDate: new Date(), download: 12.38, upload: 14.87, server: 'California', link: '/'},
  {testDate: new Date(), expirationDate: new Date(), download: 32.11, upload: 4.43, server: 'Frankfurt', link: '/'},
  {testDate: new Date(), expirationDate: new Date(), download: 3.56, upload: 0.98, server: 'Frankfurt', link: '/'},
  {testDate: new Date(), expirationDate: new Date(), download: 98.54, upload: 87.42, server: 'California', link: '/'},
  {testDate: new Date(), expirationDate: new Date(), download: 98.54, upload: 87.42, server: 'Frankfurt', link: '/'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['date', 'expiration-date', 'download', 'upload', 'server', 'share'];
  dataSource = new MatTableDataSource<SavedTestResult>(TEST_RESULTS_DATA);

  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
