import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators, FormGroup, FormControl } from '@angular/forms';
import { SkillRule } from "../models/skill-rule";
import { Lookup } from '../../../lookups/models/lookup';

export function hoursValidator(
  rules: SkillRule[],
  lookups: Lookup[],
  skillIdKey: string,
  hoursKey: string): ValidatorFn {
  return (control: FormControl): {[key: string]: any} => {
    if (!control.parent) {
      return null;
    }
    let skillIdControl = control.parent.get(skillIdKey);
    let hoursControl = control;

    if (!hoursControl.value) {
      return null;
    }

    if (!skillIdControl.value) {
      return null
    }
    let hours: number = Number(hoursControl.value);
    let skill: number = Number(skillIdControl.value);

    if (!Number.isInteger(hours)) {
      return {'hours': 'Value must be a whole number.'}
    }

    let lookup = lookups.find(l => l.id == skill);
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