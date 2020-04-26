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

import { NgxGaugeModule } from 'ngx-gauge';
import {ChartsModule} from 'ng2-charts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ResultComponent } from './result/result.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    AboutComponent,
    ErrorPageComponent,
    DashboardComponent,
    RegisterComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    NgxGaugeModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ChartsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
