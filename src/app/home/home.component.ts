import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {animate, animateChild, query, sequence, style, transition, trigger, useAnimation} from '@angular/animations';
import {zoomIn} from 'ng-animate';
import {IpAddressService} from './ip-address.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {SpeedTestService} from './speedtest.service';
import {IntermediateTest, TestInit, TotalResult, TotalResultResponse} from '../shared/shared.interfaces';
import {AuthService} from '../auth/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('zoom', [
      transition('void => *', useAnimation(zoomIn , {
        params: {
          timing: 1,
        }
      }))
    ]),
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {

  zoom: any;
  authSuccess = false;
  clientIpAddress;
  isStartDisabled = false;
  isTestStarted = false;
  isDataLoading = false;
  speed: number;
  downloadSpeed: number;
  uploadSpeed: number;
  notAvailableIn = 'hour';

  randomResults: TotalResultResponse[];
  filteredRandomResults: TotalResultResponse[];
  selectedRandomResult: TotalResultResponse = {
    total_result_id: null,
    tester_id: null,
    test_id: null,
    download_speed: null,
    upload_speed: null,
    server_name: null,
    date: null,
    expiration_date: null
  };

  snackBarConfig: MatSnackBarConfig = {
    verticalPosition: 'bottom',
    panelClass: ['snack-bar'],
    duration: 2500,
  };

  speedTestForm = this.fb.group({
    server: ['any'],
    fileSize: ['0', [Validators.required, Validators.min(1), Validators.max(10)]],
    lifetime: ['0', [Validators.required, Validators.min(1)]],
    timeType: ['hours']
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private ip: IpAddressService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private authService: AuthService,
    private speedTestService: SpeedTestService,
  ) { }

  ngOnInit(): void {
    this.getIP();
    this.route.queryParams.subscribe((params: Params) => {
      this.authSuccess = !!params.authSuccess;
    });
    if (this.authSuccess) {
      this.snackBar.open('Login succeeded', 'Dismiss', this.snackBarConfig);
    }
    this.unavailableSelectChange();
  }

  ngAfterViewInit(): void {
  }

  startSpeedTest() {
    this.isTestStarted = false;
    this.isStartDisabled = true;
    this.isTestStarted = true;

    const speedTestInit: TestInit = {
      tester: this.authService.currentUser.pk,
      file_size_mb: this.speedTestForm.get('fileSize').value,
    };
    this.speedTestService.startSpeedTest(speedTestInit)
      .subscribe(() => {
        const testUnit: IntermediateTest = {
          test_id: this.speedTestService.currentTest.test_id,
          file: '',
          begin_timestamp: null,
          mode: 'download',
          duration: null,
          speed: null
        };
        this.speedTestService.downloadSpeedMeasurement(testUnit)
          .subscribe(downloadUnitResponse => {
            const duration = moment.duration(moment().diff(moment(downloadUnitResponse.begin_timestamp)
                              .format('YYYY-MM-DDTHH:mm:ssZ'))).asSeconds();
            this.downloadSpeed = ((this.speedTestService.currentTest.file_size) / duration) * 8;

            this.speedTestService.currentTestFile = downloadUnitResponse.file;
          },
            error => console.log(error),
            () => {
              const uploadUnit: IntermediateTest = {
                test_id: this.speedTestService.currentTest.test_id,
                file: this.speedTestService.currentTestFile,
                begin_timestamp: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
                mode: 'upload',
                duration: null,
                speed: null
              };
              this.speedTestService.UploadSpeedMeasurement(uploadUnit)
                .subscribe(uploadUnitResponse => {
                  this.uploadSpeed = uploadUnitResponse.speed;
                },
                  error => console.log(error),
                  () => {
                    const testRes: TotalResult = {
                      tester_id: this.authService.currentUser.pk,
                      test_id: this.speedTestService.currentTest.test_id,
                      download_speed: +this.downloadSpeed.toFixed(2),
                      upload_speed: +this.uploadSpeed.toFixed(2),
                      server_name: this.speedTestForm.get('server').value,
                      date: this.speedTestService.testBeginDate,
                      expiration_date: this.timeTypeSelect(this.speedTestService.testBeginDate)
                                            .format('YYYY-MM-DDTHH:mm:ssZ')
                    };
                    this.speedTestService.sendTotalResults(testRes)
                      .subscribe(respond => {
                        console.log('total result id:', respond.total_result_id);
                        this.router.navigate(['/results', respond.total_result_id]);
                      },
                        error => console.log(error)
                      );
                  });
            });
      });
  }

  timeTypeSelect(begin): moment.Moment {
    let expirationDate: moment.Moment;
    if (this.speedTestForm.get('timeType').value === 'hours') {
      expirationDate = moment(begin).add(this.speedTestForm.get('lifetime').value, 'hours');
    } else if (this.speedTestForm.get('timeType').value === 'days') {
      expirationDate = moment(begin).add(this.speedTestForm.get('lifetime').value, 'days');
    } else {
      expirationDate = moment(begin).add(this.speedTestForm.get('lifetime').value, 'weeks');
    }
    return expirationDate;
  }

  getIP() {
    this.ip.getIpAddress()
      .subscribe(response => {
        this.clientIpAddress = response.ip;
      });
  }

  getAlmostUnavailableResults(data: TotalResultResponse[], time: string): TotalResultResponse[] {
    if (time === 'hour') {
      return data.filter(value => {
        return moment(value.expiration_date).isBetween(moment(), moment().add(1, 'hour'));
      });
    } else if (time === 'day') {
      return data.filter(value => {
        return moment(value.expiration_date).isBetween(moment(), moment().add(1, 'day'));
      });
    } else if (time === 'week') {
      return data.filter(value => {
        return moment(value.expiration_date).isBetween(moment(), moment().add(1, 'week'));
      });
    }
  }

  unavailableSelectChange() {
    this.speedTestService.getTotalResults().subscribe(response => {
        this.randomResults = response;
      // tslint:disable-next-line:no-unused-expression
        this.filteredRandomResults = this.getAlmostUnavailableResults(this.randomResults, this.notAvailableIn);
        const randomIndex = Math.floor(Math.random() * Math.floor(this.filteredRandomResults.length));
        console.log(this.filteredRandomResults);
        console.log(randomIndex);
        if (this.filteredRandomResults.length) {
          this.selectedRandomResult = this.filteredRandomResults[randomIndex];
        } else {
          this.selectedRandomResult = {
            total_result_id: null,
            tester_id: null,
            test_id: null,
            download_speed: null,
            upload_speed: null,
            server_name: null,
            date: null,
            expiration_date: null
          };
        }
    });
  }
}
