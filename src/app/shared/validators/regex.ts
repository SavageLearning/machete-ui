import { AbstractControl, ValidatorFn } from '@angular/forms';

export function regexValidator(regex: RegExp, message: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
      
    if (regex.test(control.value)) { return null; }
    return {'phone': message}

  };
}