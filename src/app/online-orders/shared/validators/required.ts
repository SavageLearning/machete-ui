import { AbstractControl, ValidatorFn } from '@angular/forms';

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

export function requiredValidator(message: string): ValidatorFn {
    return(control: AbstractControl): {[key: string]: any} => isEmptyInputValue(control.value) ? {required: message} : null;
}
