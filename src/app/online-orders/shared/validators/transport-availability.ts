import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';
import { TransportRule, TransportProvider } from '../index';
export function transportAvailabilityValidator(rules: TransportProvider[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (control.value == null) {
          return null;
      }

  
      return null;
    };
  }
  