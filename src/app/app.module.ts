import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';

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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth/auth.interceptor';
import {TruncatePipe} from './shared/pipes/truncate.pipe';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('644435568241-kshhba96aevrthdqbstb99a04qg1o2bn.apps.googleusercontent.com')
  },
  // {
  //   id: FacebookLoginProvider.PROVIDER_ID,
  //   provider: new FacebookLoginProvider('229145725011435')
  // }
]);

export function provideConfig() {
  return config;
}

const AUTH_SERVICE_CONFIG = {
  provide: AuthServiceConfig,
  useFactory: provideConfig
};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    AboutComponent,
    ErrorPageComponent,
    DashboardComponent,
    RegisterComponent,
    ResultComponent,
    TruncatePipe
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
    ChartsModule,
    SocialLoginModule
  ],
  providers: [
    INTERCEPTOR_PROVIDER,
    AUTH_SERVICE_CONFIG,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
