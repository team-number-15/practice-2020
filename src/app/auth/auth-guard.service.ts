import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthenticated()) {
      this.authService.logout();
      this.router.navigate(['login'], {
        queryParams: {
          haveToLogin: true
        }
      });
      return false;
    } else {
      this.authService.refreshToken();
      return true;
    }
  }
}
