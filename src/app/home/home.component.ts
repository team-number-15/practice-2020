import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  isStartDisabled = false;
  isDataLoading = false;
  speed: number;
  downloadSpeed: number;
  uploadSpeed: number;
  // selectedServer = 'any';
  // measuredIn = 'mb';
  // timeToLiveType = 'hours';
  // timeToLive = 1;
  // fileSize = 0;
  gaugeType = 'semi';
  gaugeValue: number | string = 'Connecting';
  gaugeLabel = '';
  gaugeAppendText = '';
  gaugeSize = 280;

  chartOptions = {
    responsive: true,
    elements: {
      point: {
        radius: 0
      }
    },
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
  ) { }

  ngOnInit(): void {
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
    this.gaugeValue = 0;
    this.isStartDisabled = true;
    const speedTestProm = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 4000);
    });

    speedTestProm.then(() => {
      this.gaugeLabel = 'Speed';
      this.gaugeAppendText = 'Mbps';
      this.randomValue();
    });
  }
}
