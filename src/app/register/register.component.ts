import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthErrorStateMatcher} from '../auth/auth.component';
import {CustomValidators} from '../shared/custom.validators';
import {AsyncValidators} from '../shared/async.validators';
import {RegistrationService, User} from './registration.service';

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
  providers: [RegistrationService]
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email], this.asyncValidator.uniqueEmail()],
    password: ['', [Validators.required, Validators.minLength(8), CustomValidators.password]],
    confirmPassword: ['', [Validators.required]],
  }, {validator: CustomValidators.matchPasswords});
  matcher = new RegisterErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private asyncValidator: AsyncValidators,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
  }

  registerSubmit() {
    const newUser: User = {
      username: this.registerForm.get('username').value,
      email: this.registerForm.get('email').value,
      password1: this.registerForm.get('password').value,
      password2: this.registerForm.get('confirmPassword').value
    };
    this.registrationService.registerUser(newUser)
      .subscribe(response => {
        console.log('registration Response', response);
        this.registerForm.reset();
      });
    // this.router.navigate(['/login']);
  }
}
