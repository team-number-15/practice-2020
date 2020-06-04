import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TotalResult} from '../shared/shared.interfaces';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiRoot = 'http://127.0.0.1:8000/api/v1/';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  getUserTestResults(): Observable<TotalResult[]> {
    return this.http.get<TotalResult[]>(this.apiRoot.concat('speedtest/total_result_list/'))
      .pipe(
        map(res => {
          return res.filter(totalRes => totalRes.tester_id === this.auth.currentUser.pk);
        })
      );
  }
}
