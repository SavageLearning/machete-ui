import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';
import { ScheduleRule } from '../models/schedule-rule';
import { request } from 'http';

export function schedulingValidator(rules: ScheduleRule[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    if (control.value == null) {
        return null;
    }
    const requestTime = new Date(control.value);
    const orderTime = new Date();
    const leadInSecs = requestTime.valueOf() - orderTime.valueOf();
    const rule = rules.find(s => s.day === requestTime.getDay());

    if (leadInSecs < 0) {
        return {'scheduling': 'Date cannot be in the past.'}
    }

    let daysSinceEpoch = Math.floor(orderTime.valueOf()/8.64e7);
    let reqDaysSinceEpoch = Math.floor(requestTime.valueOf()/8.64e7);
    let leadInHours = (reqDaysSinceEpoch - daysSinceEpoch) * 24;
    if (leadInHours < rule.leadHours) {
        return {'scheduling': `Lead time of ${leadInHours} hours less than the ${rule.leadHours/24} days required.`}
    }

    if (requestTime.getHours() < (rule.minStartMin / 60)) {
        return {'scheduling': 'Start time cannot be before ' + String(rule.minStartMin / 60) + ':00 hours' }
    }

    if (requestTime.getHours() > (rule.maxEndMin / 60)) {
        return {'scheduling': 'Start time cannot be after ' + String(rule.maxEndMin / 60) + ':00 hours' }
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
