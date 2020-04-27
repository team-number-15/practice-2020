import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';

export class AuthErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface User {
  id?: number;
  username: string;
  password: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm = this.fb.group({
    login: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  matcher = new AuthErrorStateMatcher();
  httpTest;

  availableUsers: User[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  authSubmit() {
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users', {
      params: new HttpParams().set('email', this.authForm.get('login').value)
    })
      .subscribe(users => {
        this.availableUsers = users;
        if (this.availableUsers[0]){
          this.httpTest = 'it works';
        } else {
          this.httpTest = 'wrong username';
        }
        // this.authForm.reset();
      });
    // this.router.navigate(['/']);
  }
}
