import { AbstractControl, ValidatorFn } from '@angular/forms';

export function lengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any | null} => {
    if (control.value == null) { return null; }
    if ((control.value as string).length <= length) { return null; }
    return {length: `Must be less than ${length} characters`}

  };
}
