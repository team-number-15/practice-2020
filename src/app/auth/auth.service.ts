import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import {AuthUser, CurrentUser, JWTPayload, RegisterUser} from '../shared/shared.interfaces';
import {shareReplay, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {AuthService as SocialAuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiRoot = 'http://127.0.0.1:8000/api/v1/';
  public currentUser: CurrentUser;

  constructor(
    private http: HttpClient,
    private router: Router,
    private socialAuthService: SocialAuthService,
  ) {}

  private setSession(authResult) {
    const token = authResult.token;
    const payload = jwtDecode(token) as JWTPayload;
    const expiresAt = moment.unix(payload.exp);

    this.currentUser = {
      pk: authResult.user.pk,
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

  get apiUrlRoot(): string {
    return this.apiRoot;
  }

  login(user: AuthUser) {
    console.log('LOG IN PROCESS');
    return this.http.post(this.apiRoot.concat('auth/login/'), user)
      .pipe(
        tap(response => this.setSession(response)),
        shareReplay(),
      );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'], {
      queryParams: {
        haveToLogin: true
      }
    });
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

  registerUser(user: RegisterUser): Observable<RegisterUser> {
    return this.http.post<RegisterUser>(this.apiRoot.concat('signup/'), user)
      .pipe(
        tap(response => this.setSession(response)),
        shareReplay()
      );
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(userData => {
        this.sendGoogleSocialUser(userData.authToken);
      });
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  sendGoogleSocialUser(accessToken: string) {
    this.http.post(this.apiRoot.concat('auth/social/google/'), {
      access_token: accessToken
    }).pipe(
      tap(response => this.setSession(response)),
      // shareReplay()
    ).subscribe(
      () => this.router.navigate(['/'], {
        queryParams: {
          authSuccess: true
        }
      }),
      error => console.log('Google authentication error ', error)
    );
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }
}
