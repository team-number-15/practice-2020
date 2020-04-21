import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

// import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';
// import * as HighchartsMore from 'highcharts/highcharts-more.src';
// import * as solidGauge from 'highcharts/modules/solid-gauge';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('chartTarget') chartTarget: ElementRef;
  // options: any;
  // chart: Highcharts.Chart;
  speed: number;
  gaugeType = 'semi';
  gaugeValue: number | string = 'Connecting';
  gaugeLabel = 'Connecting...';
  gaugeAppendText = '';

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [],
      type: 'areaspline'
    }],
    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
      '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
      type: 'areaspline',
      backgroundColor: '#263859',
      style: {
        fontFamily: 'Montserrat'
      },
      // events: {
      //   load: () => {
      //     const series = this.chartOptions.series[0];
      //     setInterval(() => {
      //       console
      //     }, 100);
      //   }
      // }
    },
    title: {
      style: {
        color: '#E0E0E3',
        textTransform: 'uppercase',
        fontSize: '20px'
      }
    },
    subtitle: {
      style: {
        color: '#E0E0E3',
        textTransform: 'uppercase'
      }
    },
    xAxis: {
      gridLineColor: '#707073',
      labels: {
        style: {
          color: '#E0E0E3'
        }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
        style: {
          color: '#A0A0A3'
        }
      }
    },
    yAxis: {
      gridLineColor: '#707073',
      labels: {
        style: {
          color: '#E0E0E3'
        }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
        style: {
          color: '#A0A0A3'
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
        color: '#F0F0F0'
      }
    },
    plotOptions: {
      series: {
        dataLabels: {
          color: '#F0F0F3',
          style: {
            fontSize: '13px'
          }
        },
        marker: {
          lineColor: '#333'
        }
      },
      boxplot: {
        fillColor: '#505053'
      },
      candlestick: {
        lineColor: 'white'
      },
      errorbar: {
        color: 'white'
      }
    },
    legend: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      itemStyle: {
        color: '#E0E0E3'
      },
      itemHoverStyle: {
        color: '#FFF'
      },
      itemHiddenStyle: {
        color: '#606063'
      },
      title: {
        style: {
          color: '#C0C0C0'
        }
      }
    },
    credits: {
      style: {
        color: '#666'
      }
    },
    drilldown: {
      activeAxisLabelStyle: {
        color: '#F0F0F3'
      },
      activeDataLabelStyle: {
        color: '#F0F0F3'
      }
    },
    navigation: {
      buttonOptions: {
        symbolStroke: '#DDDDDD',
        theme: {
          fill: '#505053'
        }
      }
    },
  };

  constructor() { }

  ngOnInit(): void {
    // console.log(this.chartOptions.series[0].data);
  }

  ngAfterViewInit(): void {
    // this.initOptions();
    // this.chart = chart(this.chartTarget.nativeElement, this.options as any);
    const kek = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 4000);
    });

    kek.then(() => {
      this.gaugeLabel = 'Speed';
      this.gaugeAppendText = 'Mbps';
      this.randomValue();
    });
  }

  randomValue() {
    const timer = setInterval(() => {
      this.speed = +(Math.random() * 100).toFixed(1);
      console.log(this.speed);
      this.gaugeValue = this.speed;
    }, 100);
    setTimeout(() => {
      clearInterval(timer);
    }, 10000);
  }

  // initOptions() {
  //   this.options = {
  //     chart: {
  //       type: 'solidgauge'
  //     },
  //     title: {
  //       text: 'Solid Gauge Demo'
  //     },
  //     pane: {
  //       startAngle: -90,
  //       endAngle: 90,
  //       background: {
  //         backgroundColor: 'white',
  //         innerRadius: '60%',
  //         outerRadius: '90%',
  //         shape: 'arc'
  //       }
  //     },
  //     tooltip: {
  //       enabled: false
  //     },
  //     // the value axis
  //     yAxis: {
  //       stops: [
  //         [0.5, 'green'], // green
  //         [0.6, 'yellow'], // yellow
  //         [0.9, '#DF5353'] // red
  //       ],
  //       length: 5,
  //       lineWidth: 0,
  //       minorTickInterval: null,
  //       tickAmount: 2,
  //       title: {
  //         y: -70
  //       },
  //       labels: {
  //         y: 16
  //       },
  //       min: 0,
  //       max: 200,
  //       plotBands: [
  //         { from: 0, to: 100, color: 'green' },
  //         { from: 100, to: 120, color: 'yellow' },
  //         { from: 120, to: 200, color: 'red' }
  //       ]
  //     },
  //     plotOptions: {
  //       solidgauge: {
  //         dataLabels: {
  //           y: 5,
  //           borderWidth: 0,
  //           useHTML: true
  //         }
  //       }
  //     },
  //     series: [
  //       {
  //         data: [80]
  //       }
  //     ]
  //   };
  // }

}
