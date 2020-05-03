import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RegisterUser} from '../shared/shared.interfaces';

@Injectable()
export class RegistrationService {
  constructor(
    private http: HttpClient,
  ) {}

  registerUser(user: RegisterUser): Observable<RegisterUser> {
    return this.http.post<RegisterUser>('http://127.0.0.1:8000/api/v1/auth/registration/', user);
  }
}
