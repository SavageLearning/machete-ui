import { AbstractControl, ValidatorFn } from '@angular/forms';
import { TransportRule } from '../models/transport-rule';

export function transportValidator(rules: TransportRule[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    return null;
  };
}
