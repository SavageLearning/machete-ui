import { AbstractControl, ValidatorFn } from '@angular/forms';

export function lengthValidator(length: number, key: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any | null} => {
      
    if (control.value == null) { return null; }
    if (control.value.length <= length) { return null; }
    return {key: `Must be less than ${length} characters`}

  };
}