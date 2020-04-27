import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthErrorStateMatcher} from '../auth/auth.component';
import {CustomValidators} from '../shared/custom.validators';
import {AsyncValidators} from '../shared/async.validators';

export class RegisterErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email], this.asyncValidator.uniqueEmail()],
    password: ['', [Validators.required, Validators.minLength(8), CustomValidators.password]],
    confirmPassword: ['', [Validators.required]],
  }, {validator: CustomValidators.matchPasswords});
  matcher = new RegisterErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private asyncValidator: AsyncValidators,
  ) { }

  ngOnInit(): void {
  }

  registerSubmit() {
    this.registerForm.reset();
    this.router.navigate(['/login']);
  }
}
