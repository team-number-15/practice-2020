import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {transition, trigger, useAnimation} from '@angular/animations';
import {zoomIn} from 'ng-animate';
import {IpAddressService} from './ip-address.service';

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
  clientIpAddress;
  isStartDisabled = false;
  isTestStarted = false;
  isDataLoading = false;
  speed: number;
  downloadSpeed: number;
  uploadSpeed: number;
  gaugeType = 'semi';
  gaugeValue: number | string = 'Connecting';
  gaugeLabel = '';
  gaugeAppendText = '';
  gaugeSize = 280;

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0
      },
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: true
      }],
    }
  };

  chartData = [{
      data: [],
      label: 'Download',
      borderColor: '#00818a',
      backgroundColor: 'rgba(0,129,138, 0.5)',
    },
    {
      data: [],
      label: 'Upload',
      borderColor: '#ff6768',
      backgroundColor: 'rgb(255,103,104, 0.5)'
    },
  ];

  chartLabels = [];

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
  ) { }

  ngOnInit(): void {
    this.getIP();
    this.breakpointObserver
      .observe(['(max-width: 491px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.gaugeSize = 200;
          this.chartOptions.scales.yAxes[0].display = false;
        } else {
          this.gaugeSize = 280;
          this.chartOptions.scales.yAxes[0].display = false;
        }
      });
  }

  ngAfterViewInit(): void {
  }

  onChartClick(event) {
    console.log(event);
  }

  randomValue() {
    const timer = setInterval(() => {
      this.speed = +(Math.random() * 100).toFixed(1);
      console.log(this.speed);
      this.gaugeValue = this.speed;
      this.chartData[0].data.push(this.speed);
      this.chartLabels.push('');
    }, 100);
    setTimeout(() => {
      clearInterval(timer);
      const currentSpeedData = this.chartData[0].data;
      this.downloadSpeed = currentSpeedData.reduce((sum, curr) => sum + curr) / currentSpeedData.length;
      this.isStartDisabled = false;
    }, 10000);
  }

  startSpeedTest() {
    this.gaugeLabel = 'Connecting...';
    this.isTestStarted = false;
    this.gaugeValue = 0;
    this.isStartDisabled = true;
    const speedTestProm = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 4000);
    });

    speedTestProm.then(() => {
      this.isTestStarted = true;
      this.gaugeLabel = 'Speed';
      this.gaugeAppendText = 'Mbps';
      this.randomValue();
    });
  }

  getIP() {
    this.ip.getIpAddress()
      .subscribe(response => {
        this.clientIpAddress = response.ip;
      });
  }

  @HostListener('window.resize', ['$event'])
  onResize(event) {
    this.breakpointObserver
      .observe(['(max-width: 491px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.gaugeSize = 200;
          this.chartOptions.scales.yAxes[0].display = false;
        } else {
          this.gaugeSize = 280;
          this.chartOptions.scales.yAxes[0].display = true;
        }
      });
  }
}
