import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {AuthUser} from '../shared/shared.interfaces';

export class AuthErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', Validators.required],
  });
  matcher = new AuthErrorStateMatcher();
  httpTest;
  authError = false;
  haveToLogin = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.authError = !!params.authFailed;
      this.haveToLogin = !!params.haveToLogin;
      console.log('AUTH ERROR? ', this.authError);
    });
  }

  authSubmit() {
    const user: AuthUser = {
      username: this.authForm.get('login').value,
      password: this.authForm.get('password').value
    };
    this.authService.login(user).subscribe(
      () => this.router.navigate(['/'], {
        queryParams: {
          authSuccess: true
        }
      })
    );
  }
}
