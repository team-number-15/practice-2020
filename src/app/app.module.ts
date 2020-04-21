import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthComponent } from './auth/auth.component';
import {MaterialModule} from './shared/material.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ErrorPageComponent } from './error-page/error-page.component';

// import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
// import * as more from 'highcharts/highcharts-more.src';
// import * as solidGauge from 'highcharts/modules/solid-gauge.src';

import { ChartModule } from 'angular-highcharts';
import {HighchartsChartModule} from 'highcharts-angular';

import { NgxGaugeModule } from 'ngx-gauge';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    AboutComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    NgxGaugeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HighchartsChartModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
