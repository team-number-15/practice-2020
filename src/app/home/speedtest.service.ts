import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  CurrentTest,
  IntermediateTest,
  IntermediateTestResult,
  SpeedTest,
  TestInit,
  TotalResult,
  TotalResultResponse
} from '../shared/shared.interfaces';
import {concat, forkJoin, generate, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import * as moment from 'moment';
import {TestRequest} from '@angular/common/http/testing';
import {TestResult} from 'tslint/lib/test';
import {AuthService} from '../auth/auth.service';



@Injectable({
  providedIn: 'root',
})
export class SpeedTestService {
  testApiRoot = 'http://127.0.0.1:8000/api/v1/speedtest/';
  currentTestId: number;
  currentTest: CurrentTest;
  currentTestFile;

  testBeginDate;
  downloadRequests: Observable<IntermediateTestResult>[] = [];
  downloadSpeedData: number[] = [];

  unitUploadSpeed;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  startSpeedTest(test: TestInit): Observable<SpeedTest> {
    return this.http.post<SpeedTest>(this.testApiRoot.concat('speed_test_list/'), test)
      .pipe(
        tap(response => this.setTest(response))
      );
  }

  private setTest(testInitResponse: SpeedTest) {
    this.currentTest = {
      test_id: testInitResponse.test_id,
      file_size: testInitResponse.file_size_mb
    };
    this.currentTestId = testInitResponse.test_id;
    this.testBeginDate = moment().format('YYYY-MM-DDTHH:mm:ssZ');
    localStorage.setItem('currentTest', JSON.stringify(this.currentTest));
  }

  downloadSpeedMeasurement(testUnit: IntermediateTest): Observable<IntermediateTestResult> {
    return this.http.post<IntermediateTestResult>(this.testApiRoot.concat('speed_test_result_list/'), testUnit);
    // for (let unit = 0; unit < 1; unit++) {
    //   // testUnit.begin_timestamp = moment().format('YYYY-MM-DDTHH:mm:ssZ');
    //   const netTest$ = this.http.post<IntermediateTestResult>(this.testApiRoot.concat('speed_test_result_list/'), testUnit);
    //   this.downloadRequests.push(netTest$);
    // }
    // concat(...this.downloadRequests)
    //   .subscribe(unit => {
    //     const duration = moment.duration(moment().diff(moment(unit.begin_timestamp).format('YYYY-MM-DDTHH:mm:ssZ'))).asSeconds();
    //     console.log('Duration', duration);
    //     const unitDownloadSpeed = ((this.currentTest.file_size) / duration) * 8;
    //     this.downloadSpeedData.push(unitDownloadSpeed);
    //     console.log('Download Speed data', this.downloadSpeedData);
    //
    //     this.currentTestFile = unit.file;
    //     // console.log(this.currentTestFile);
    //   },
    //     error => {
    //       console.log(error);
    //     },
    //     () => {
    //       console.log('COMPLETED');
    //       this.downloadSpeedData = [];
    //       this.downloadRequests = [];
    //       const uploadUn: IntermediateTest = {
    //         test_id: this.currentTest.test_id,
    //         file: this.currentTestFile,
    //         begin_timestamp: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
    //         mode: 'upload',
    //         duration: null,
    //         speed: null
    //       };
    //       this.UploadSpeedMeasurement(uploadUn);
    //     });
  }

  UploadSpeedMeasurement(testUnit: IntermediateTest): Observable<IntermediateTestResult> {
    return this.http.post<IntermediateTestResult>(this.testApiRoot.concat('speed_test_result_list/'), testUnit);
    // const netTest$ = this.http.post<IntermediateTestResult>(this.testApiRoot.concat('speed_test_result_list/'), testUnit);
    // netTest$.subscribe(unit => {
    //   this.unitUploadSpeed = unit.speed;
    //   console.log('Upload Speed data', this.unitUploadSpeed);
    // },
    //   error => {
    //     console.log(error);
    //   },
    //   () => {
    //     const testRes: TotalResult = {
    //       tester_id: this.auth.currentUser.pk,
    //       test_id: this.currentTest.test_id,
    //       download_speed: 5,
    //       upload_speed: this.unitUploadSpeed,
    //       server_name: 'Frankfurt',
    //       date: this.testBeginDate,
    //       expiration_date: this.testBeginDate
    //     };
    //
    //     this.sendTotalResults(testRes).subscribe(respond => {
    //       console.log('total result id:', respond.total_result_id);
    //     });
    //   });
  }

  sendTotalResults(totalTestResult: TotalResult): Observable<TotalResultResponse> {
    return this.http.post<TotalResultResponse>(this.testApiRoot.concat('total_result_list/'), totalTestResult);
  }

  getTotalResults(): Observable<TotalResultResponse[]> {
    return this.http.get<TotalResultResponse[]>(this.testApiRoot.concat('total_result_list'));
  }

  getkek() {
    console.log('kek');
  }
}
