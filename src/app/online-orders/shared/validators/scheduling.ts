import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';
import { ScheduleRule } from '../models/schedule-rule';

export function schedulingValidator(rules: ScheduleRule[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    if (control.value == null) {
        return null;
    }
    const date = control.value as Date;
    const diffdate = date.valueOf() - Date.now();
    const rule = rules.find(s => s.day === date.getDay());

    if (diffdate < 0) {
        return {'scheduling': 'Date cannot be in the past.'}
    }

    if (diffdate < (rule.leadHours * 3600)) {
        return {'scheduling': 'Lead time less than ' + String(rule.leadHours) + ' hours.'}
    }

    if (date.getHours() < (rule.minStartMin / 60)) {
        return {'scheduling': 'Start time is before minimum time of ' + String(rule.minStartMin / 60) + 'hours' }
    }

    if (date.getHours() > (rule.maxEndMin / 60)) {
        return {'scheduling': 'End time is after maximum time of ' + String(rule.minStartMin / 60) + 'hours' }
    }

    return null;
  };
}

// @Directive({
//   selector: '[scheduling]',
//   providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
// })
// export class ForbiddenValidatorDirective implements Validator {
//   @Input() rules: ScheduleRule[];

//   validate(control: AbstractControl): {[key: string]: any} {
//     return schedulingValidator(this.rules)(control);
//   }
// }
