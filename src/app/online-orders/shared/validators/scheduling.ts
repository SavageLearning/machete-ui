import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';
import { ScheduleRule } from '../models/schedule-rule';
import { request } from 'http';

export function schedulingValidator(rules: ScheduleRule[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    if (control.value == null) {
        return null;
    }
    if (control.parent == null) return null;
    const dateOfWork: Date  = control.parent.get('dateOfWork').value;
    const timeOfWork: string = control.parent.get('timeOfWork').value;
    if (!dateOfWork || !timeOfWork ) return null;

    const timeInMS = (Number(timeOfWork.split(':')[0])*3600+Number(timeOfWork.split(':')[1])*60)*1000;
    const requestTime = new Date(dateOfWork.getTime() + timeInMS);
    const orderTime = new Date();
    const today = new Date(orderTime.toDateString());
    const leadInSecs = requestTime.valueOf() - orderTime.valueOf();
    const rule = rules.find(s => s.day === requestTime.getDay());

    if (leadInSecs < 0) {
        return {'scheduling': 'Date cannot be in the past.'}
    }

    let daysSinceEpoch = Math.floor(today.valueOf()/3.6e6);
    let reqDaysSinceEpoch = Math.floor(requestTime.valueOf()/3.6e6);
    let leadInHours = (reqDaysSinceEpoch - daysSinceEpoch);
    if (leadInHours < rule.leadHours) {
        return {'scheduling': `Lead time of ${(rule.leadHours/24)-1} days required.`}
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
