import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

import * as difflib from 'difflib';

export class CustomValidators {

  static password(control: FormControl): {[key: string]: any} | null {
    const passwordReg: RegExp = /^(?=.*[a-z])(?=.*[0-9])(?!.*[^a-z0-9])/i;
    const invalid = !passwordReg.test(control.value);
    return invalid ? {password: {value: control.value}} : null;
  }

  // static userAttributeSimilarity(control: FormGroup): {[key: string]: any} | null {
  //   const userAttributes: string[] =  Object.keys(control.controls);
  //   for (const attribute of userAttributes) {
  //     if (attribute === 'username' || attribute === 'email') {
  //       const value = control.get(attribute).value;
  //       if (!value) {
  //         continue;
  //       }
  //       const valueParts = value.split(/\W+/).concat(value);
  //       for (const valuePart of valueParts) {
  //         const seqMatcher = new difflib.SequenceMatcher(
  //           null,
  //           control.get('password').value.toLowerCase(),
  //           valuePart.toLowerCase(),
  //           null
  //         ).quickRatio() >= 0.7;
  //         if (seqMatcher) {
  //           return {verySimilar: {value: true}};
  //         }
  //       }
  //     }
  //   }
  //   return null;
  // }

  static matchPasswords(control: FormGroup): {[key: string]: any} | null {
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
}
