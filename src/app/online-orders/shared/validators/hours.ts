import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators, FormGroup } from '@angular/forms';
import { SkillRule } from "../models/skill-rule";
import { Lookup } from '../../../lookups/models/lookup';

export function hoursValidator(
  rules: SkillRule[],
  lookups: Lookup[],
  skillIdKey: string,
  hoursKey: string): ValidatorFn {
  return (group: FormGroup): {[key: string]: any} => {

    let skillIdControl = group.controls[skillIdKey];
    let hoursControl = group.controls[hoursKey];

    if (hoursControl.value == null) {
      return null;
    }

    if (typeof hoursControl.value != 'number') {
      return {'hours': 'Value entered must be a number'}
    }

    if (Number.isInteger(hoursControl.value)) {
      return {'hours': 'Value must be a whole number.'}
    }

    if (skillIdControl.value == null) {
      return {'hours': 'Please select a skill from the above dropdown.'}      
    }

    if (typeof skillIdControl.value != 'number') {
      throw new Error('SkillId control value is not a number');
    }

    let lookup = lookups.find(l => l.id == skillIdControl.value);
    if (lookup == null) {
      throw new Error('skillId control didn\'t match a lookup record.');
    }

    let rule = rules.find(f => f.key == lookup.key)
    if (hoursControl.value <  rule.minHour) {
      return {'hours': `${lookup.text_EN} requires a minimum of ${rule.minHour} hours`}
    }

    if (hoursControl.value > rule.maxHour) {
      return {'hours': `${lookup.text_EN} cannot exceed ${rule.maxHour} hours`}
    }
  };
}