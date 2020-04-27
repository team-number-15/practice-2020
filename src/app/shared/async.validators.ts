import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AbstractControl, AsyncValidatorFn, FormControl} from '@angular/forms';
import {Observable, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AsyncValidators {
  constructor(private http: HttpClient) {}

  uniqueEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return timer(500)
        .pipe(
          switchMap(() => {
            return this.http.get<any>('https://jsonplaceholder.typicode.com/users', {
              params: new HttpParams().set('email', control.value)
            });
          }),
          map(res =>  {
            return res.length ? {emailExists: true} : null;
          })
        );
    };
  }
  // uniqueEmail(control: FormControl): Observable<string> {
  //   return this.http.get<string>('https://jsonplaceholder.typicode.com/users', {
  //     params: new HttpParams().set('email', control.value)
  //   }).subscribe(user => {
  //
  //   })
  // }
}
