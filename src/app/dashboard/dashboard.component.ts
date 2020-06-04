import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {TotalResult} from '../shared/shared.interfaces';
import {DashboardService} from './dashboard.service';
import {Router} from '@angular/router';

export interface SavedTestResult {
  testDate: moment.Moment;
  expirationDate: moment.Moment;
  download: number;
  upload: number;
  server: string;
  link: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class DashboardComponent implements OnInit {

  testResultData: TotalResult[];
  currentTestResults: TotalResult[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['date', 'expiration_date', 'download_speed', 'upload_speed', 'server_name', 'share_id'];
  dataSource;

  notAvailableIn = 'hour';
  speedStatFor = 'all';
  totalTestsDone: number;
  customDate: moment.Moment;

  linkRoot;

  topDownload: number;
  topUpload: number;
  avgDownload: number;
  avgUpload: number;
  availableTestsAmount: number;
  almostUnavailableTestsAmount: number;
  test;

  constructor(
    private dashboard: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dashboard.getUserTestResults()
      .subscribe(results => {
        this.testResultData = results;
        this.currentTestResults = this.testResultData;
        this.dataSource = new MatTableDataSource<TotalResult>(this.currentTestResults);
        this.refreshData();
      });
    // console.log(window.location);
    this.linkRoot = window.location.href.replace(this.router.url, '').concat('/results');
    const curMoment = moment();
    this.test = moment.duration(moment().diff(curMoment.subtract(10, 'seconds'))).seconds();
  }

  getTopSpeed(speedData: number[]): number {
    return speedData.length ? Math.max(...speedData) : 0;
  }

  getAverageSpeed(speedData: number[]): number {
    return speedData.length ? speedData.reduce((sum, current) => sum + current) / speedData.length : 0;
  }

  getAvailableResults(data: TotalResult[]): TotalResult[] {
    return data.filter(value => moment(value.expiration_date).isAfter(moment()));
  }

  getAlmostUnavailableResults(data: TotalResult[], time: string): TotalResult[] {
    if (time === 'hour') {
      return data.filter(value => {
        return moment(value.expiration_date).isBetween(moment(), moment().add(1, 'hour'));
      });
    } else if (time === 'day') {
      return data.filter(value => {
        return moment(value.expiration_date).isBetween(moment(), moment().add(1, 'day'));
      });
    }
  }

  unavailableSelectChange() {
    this.almostUnavailableTestsAmount = this.getAlmostUnavailableResults(this.currentTestResults, this.notAvailableIn).length;
  }

  speedStatSelectChange() {
    switch (this.speedStatFor) {
      case 'all':
        this.currentTestResults = this.testResultData;
        break;
      case 'day':
        this.currentTestResults = this.testResultData.filter(value => {
          return moment(value.date).isAfter(moment().subtract(1, 'day'));
        });
        break;
      case 'hour':
        this.currentTestResults = this.testResultData.filter(value => {
          return moment(value.date).isAfter(moment().subtract(1, 'hour'));
        });
        break;
      case 'custom':
        this.customDate = moment().startOf('day');
        this.customDateChange();
        break;
    }
    this.refreshData();
  }

  customDateChange(event?: MatDatepickerInputEvent<moment.Moment>) {
    if (event) {
      this.customDate = event.value;
    }
    this.currentTestResults = this.testResultData.filter(value => {
      return moment(moment(value.date).startOf('day')).isSame(this.customDate);
    });
    // console.log('current', this.currentTestResults);
    this.refreshData();
  }

  refreshData() {
    // console.log(this.currentTestResults);
    this.dataSource = new MatTableDataSource<TotalResult>(this.currentTestResults);
    this.totalTestsDone = this.currentTestResults.length;
    this.topDownload = this.getTopSpeed(this.currentTestResults.map(testResult => testResult.download_speed));
    this.topUpload = this.getTopSpeed(this.currentTestResults.map(testResult => testResult.upload_speed));
    this.avgDownload = this.getAverageSpeed(this.currentTestResults.map(testResult => testResult.download_speed));
    this.avgUpload = this.getAverageSpeed(this.currentTestResults.map(testResult => testResult.upload_speed));

    this.availableTestsAmount = this.getAvailableResults(this.currentTestResults).length;
    this.unavailableSelectChange();

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  clearFilter() {
    this.speedStatFor = 'all';
    this.speedStatSelectChange();
  }
}
