import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface User {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

@Injectable()
export class RegistrationService {
  constructor(
    private http: HttpClient,
  ) {}

  registerUser(user: User): Observable<User> {
    return this.http.post<User>('http://127.0.0.1:8000/api/v1/auth/registration/', user);
  }
}
