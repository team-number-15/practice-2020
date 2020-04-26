import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';

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
    login: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  matcher = new AuthErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  authSubmit() {
    this.authForm.reset();
    this.router.navigate(['/']);
  }
}
