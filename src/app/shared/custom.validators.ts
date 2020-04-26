import {AbstractControl, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

export class CustomValidators {
  static password(control: FormControl): {[key: string]: any} | null {
    const passwordReg: RegExp = /^(?=.*[a-z])(?=.*[0-9])(?!.*[^a-z0-9])/i;
    const invalid = !passwordReg.test(control.value);
    return invalid ? {password: {value: control.value}} : null;
  }

  static matchPasswords(control: AbstractControl): {[key: string]: any} | null {
    const firstPassword = control.get('password');
    const secondPassword = control.get('confirmPassword');
    const notMatch = firstPassword.value !== secondPassword.value;
    if (notMatch) {
      secondPassword.setErrors({ confirm: true });
    } else {
      secondPassword.setErrors(null);
    }
    return notMatch ? {matchPasswords: {value: true}} : null;
  }

  static uniqueEmail(control: FormControl): Promise<any> | Observable<any> {
    return new Promise(resolve => {
    });
  }
}
