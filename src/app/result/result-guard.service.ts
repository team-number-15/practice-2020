import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TotalResultResponse} from '../shared/shared.interfaces';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ResultGuardService implements CanActivate{
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
    return true;
  }

  testExpiration(route: ActivatedRouteSnapshot): boolean | any  {
    this.http.get<TotalResultResponse>('http://127.0.0.1:8000/api/v1/speedtest/total_result_list/'.concat(route.params.id))
      .subscribe(response => {
        if (moment(response.expiration_date).isBefore(moment())) {
          console.log('expiration', response.expiration_date);
          console.log(moment().format('YYYY-MM-DDTHH:mm:ssZ'));
          this.router.navigate(['error'], {
            queryParams: {
              noLongerAvailable: true
            }
          });
          return false;
        } else {
          return true;
        }
      });
  }
}
