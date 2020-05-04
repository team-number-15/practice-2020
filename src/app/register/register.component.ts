import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthErrorStateMatcher} from '../auth/auth.component';
import {CustomValidators} from '../shared/custom.validators';
import {AsyncValidators} from '../shared/async.validators';
import {RegisterUser} from '../shared/shared.interfaces';
import {AuthService} from '../auth/auth.service';

export class RegisterErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: []
})
export class RegisterComponent implements OnInit {

  errors: any;
  registerForm = this.fb.group({
    username: ['', [Validators.required], this.asyncValidator.uniqueUsername()],
    email: ['', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
    ], this.asyncValidator.uniqueEmail()],
    password: ['', [Validators.required, Validators.minLength(8), CustomValidators.password]],
    confirmPassword: ['', [Validators.required]],
  }, {validators: [CustomValidators.matchPasswords]});
  matcher = new RegisterErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private asyncValidator: AsyncValidators,
    private registration: AuthService
  ) { }

  ngOnInit(): void {
  }

  registerSubmit() {
    // console.log(Object.values(this.registerForm.controls));
    const newUser: RegisterUser = {
      username: this.registerForm.get('username').value,
      email: this.registerForm.get('email').value,
      password1: this.registerForm.get('password').value,
      password2: this.registerForm.get('confirmPassword').value
    };
    this.registration.registerUser(newUser)
      .subscribe(response => {
        this.router.navigate(['/'], {
          queryParams: {
            signUpSuccess: true
          }
        });
        this.registerForm.reset();
      },
        error => this.errors = error);
  }
}
