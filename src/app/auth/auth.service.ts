import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import {AuthUser, CurrentUser, JWTPayload} from '../shared/shared.interfaces';
import {shareReplay, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiRoot = 'http://127.0.0.1:8000/api/v1/';
  public currentUser: CurrentUser;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  private setSession(authResult) {
    const token = authResult.token;
    const payload = jwtDecode(token) as JWTPayload;
    const expiresAt = moment.unix(payload.exp);

    this.currentUser = {
      pk: payload.pk,
      username: payload.username,
      email: payload.email
    };
    localStorage.setItem('curUser', JSON.stringify(this.currentUser));
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  login(user: AuthUser) {
    return this.http.post(this.apiRoot.concat('auth/login/'), user)
      .pipe(
        tap(response => this.setSession(response)),
        shareReplay(),
      );
  }

  logout() {
    localStorage.clear();
    // this.router.navigate(['/login']);
  }

  refreshToken() {
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
      return this.http.post(this.apiRoot.concat('token/refresh/'), {
        token: this.token
      }).pipe(
        tap(response => this.setSession(response)),
        shareReplay(),
      ).subscribe();
    }
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  isAuthenticated(): boolean {
    return !!this.token && moment().isBefore(this.getExpiration());
  }
}
