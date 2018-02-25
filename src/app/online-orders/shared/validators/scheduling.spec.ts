import { schedulingValidator } from './scheduling';
import { AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleRule } from '..';

describe('ScheduleRule', () => {
  it('should create an instance', () => {
    const ctrl = new FormControl();
    const tFunc = schedulingValidator(new Array<ScheduleRule>());
    const result = tFunc(ctrl);
    expect(result).toBeNull();
  });
});
