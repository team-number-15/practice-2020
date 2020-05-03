import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AbstractControl, AsyncValidatorFn, FormControl} from '@angular/forms';
import {Observable, timer} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AsyncValidators {
  constructor(private http: HttpClient) {}

  uniqueUsername(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return timer(500)
        .pipe(
          switchMap(() => {
            return this.http.get<any>('http://127.0.0.1:8000/api/v1/auth/users/');
          }),
          map(res =>  {
            return res.map(user => user.username).includes(control.value.trim()) ? {usernameExists: true} : null;
          })
        );
    };
  }
  uniqueEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return timer(500)
        .pipe(
          switchMap(() => {
            return this.http.get<any>('http://127.0.0.1:8000/api/v1/auth/users/');
          }),
          map(res =>  {
            return res.map(user => user.email).includes(control.value.trim()) ? {emailExists: true} : null;
          })
        );
    };
  }
}
