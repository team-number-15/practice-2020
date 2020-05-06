import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import * as moment from 'moment';

export interface SavedTestResult {
  testDate: moment.Moment;
  expirationDate: moment.Moment;
  download: number;
  upload: number;
  server: string;
  link: string;
}

const TEST_RESULTS_DATA: SavedTestResult[] = [
  {
    testDate: moment('21/4/2020 12:50', 'D/M/YY HH:mm'),
    expirationDate: moment('1/5/2020 12:50', 'D/M/YY HH:mm'),
    download: 43.28,
    upload: 34.87,
    server: 'California',
    link: '/'},
  {
    testDate: moment('21/4/2020 12:50', 'D/M/YY HH:mm'),
    expirationDate: moment('1/5/2020 12:50', 'D/M/YY HH:mm'),
    download: 12.38,
    upload: 14.87,
    server: 'California',
    link: '/'},
  {
    testDate: moment('25/4/2020 12:50', 'D/M/YY HH:mm'),
    expirationDate: moment('25/4/2020 13:50', 'D/M/YY HH:mm'),
    download: 32.11,
    upload: 4.43,
    server: 'Frankfurt',
    link: '/'},
  {
    testDate: moment('25/4/2020 12:50', 'D/M/YY HH:mm'),
    expirationDate: moment('25/4/2020 13:50', 'D/M/YY HH:mm'),
    download: 3.56,
    upload: 0.98,
    server: 'Frankfurt',
    link: '/'},
  {
    testDate: moment('25/4/2020 12:50', 'D/M/YY HH:mm'),
    expirationDate: moment('25/4/2020 13:50', 'D/M/YY HH:mm'),
    download: 98.54,
    upload: 87.42,
    server: 'California',
    link: '/'},
  {
    testDate: moment('2/5/2020 10:43', 'D/M/YY HH:mm'),
    expirationDate: moment('7/5/2020 10:43', 'D/M/YY HH:mm'),
    download: 98.54,
    upload: 87.42,
    server: 'Frankfurt',
    link: '/'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentTestResults: SavedTestResult[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['date', 'expiration-date', 'download', 'upload', 'server', 'share'];
  dataSource = new MatTableDataSource<SavedTestResult>(this.currentTestResults);

  notAvailableIn = 'hour';
  speedStatFor = 'all';
  totalTestsDone: number;

  topDownload: number;
  topUpload: number;
  avgDownload: number;
  avgUpload: number;
  availableTestsAmount: number;
  almostUnavailableTestsAmount: number;
  test;

  constructor() { }

  ngOnInit(): void {
    this.currentTestResults = TEST_RESULTS_DATA;
    this.refreshData();
    // this.test = moment().format('D/M/YY HH:mm');
  }

  getTopSpeed(speedData: number[]): number {
    return speedData.length ? Math.max(...speedData) : 0;
  }

  getAverageSpeed(speedData: number[]): number {
    return speedData.length ? speedData.reduce((sum, current) => sum + current) / speedData.length : 0;
  }

  getAvailableResults(data: SavedTestResult[]): SavedTestResult[] {
    return data.filter(value => moment(value.expirationDate).isAfter(moment()));
  }

  getAlmostUnavailableResults(data: SavedTestResult[], time: string): SavedTestResult[] {
    if (time === 'hour') {
      return data.filter(value => {
        moment(value.expirationDate).isBetween(moment(), moment().add(1, 'hour'));
      });
    } else if (time === 'day') {
      return data.filter(value => {
        moment(value.expirationDate).isBetween(moment(), moment().add(1, 'day'));
      });
    }
  }

  unavailableSelectChange() {
    this.almostUnavailableTestsAmount = this.getAlmostUnavailableResults(this.currentTestResults, this.notAvailableIn).length;
  }

  speedStatSelectChange() {
    switch (this.speedStatFor) {
      case 'all':
        this.currentTestResults = TEST_RESULTS_DATA;
        break;
      case 'day':
        this.currentTestResults = TEST_RESULTS_DATA.filter(value => {
          moment(value.testDate).isAfter(moment().subtract(1, 'day'));
        });
        break;
      case 'hour':
        this.currentTestResults = TEST_RESULTS_DATA.filter(value => {
          moment(value.testDate).isAfter(moment().subtract(1, 'hour'));
        });
    }
    this.refreshData();
  }

  refreshData() {
    console.log(this.currentTestResults);
    this.dataSource = new MatTableDataSource<SavedTestResult>(this.currentTestResults);
    this.totalTestsDone = this.currentTestResults.length;
    this.topDownload = this.getTopSpeed(this.currentTestResults.map(testResult => testResult.download));
    this.topUpload = this.getTopSpeed(this.currentTestResults.map(testResult => testResult.upload));
    this.avgDownload = this.getAverageSpeed(this.currentTestResults.map(testResult => testResult.download));
    this.avgUpload = this.getAverageSpeed(this.currentTestResults.map(testResult => testResult.upload));

    this.availableTestsAmount = this.getAvailableResults(this.currentTestResults).length;
    this.unavailableSelectChange();

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
