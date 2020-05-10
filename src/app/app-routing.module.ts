import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RegisterComponent} from './register/register.component';
import {ResultComponent} from './result/result.component';
import {AuthGuardService} from './auth/auth-guard.service';


const routes: Routes = [
  {path: '', component: HomeComponent, data: {animation: 'HomePage'}},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: AuthComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  // {path: 'results/:id', component: ResultComponent},
  {path: 'results', component: ResultComponent, data: {animation: 'ResultPage'}},
  {path: 'error', component: ErrorPageComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
