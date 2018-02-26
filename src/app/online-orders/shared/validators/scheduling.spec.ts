import { schedulingValidator } from './scheduling';
import { AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleRule } from '..';

describe('ScheduleRule', () => {
    let ctrl: FormControl;
    let tFunc: ValidatorFn;
    let today: Date;
    beforeEach(() => {
        ctrl = new FormControl();
        today = new Date();
        tFunc = schedulingValidator(new Array<ScheduleRule>(new ScheduleRule({
            day: today.getUTCDay(),
            leadHours: 48,
            minStartMin: 420, //7am
            maxEndMin: 1020 // 5pm 
        })));    
    });

  it('should create an instance', () => {
    const result = tFunc(ctrl);
    expect(result).toBeNull();
  });

  it('should reject time in the past', () => {
    let anHourAgo = today.valueOf() - (3600 * 1000);
    ctrl.setValue((new Date(anHourAgo)).toLocaleString());
    // act
    const result = tFunc(ctrl);
    // 
    expect(result['scheduling']).toBe('Date cannot be in the past.');
  });

  it('should reject time before start time', () => {
    var utc = today.toJSON().slice(0,10).replace(/-/g,'/');
    ctrl.setValue(new Date(utc));
    // act
    const result = tFunc(ctrl);
    // 
    expect(result['scheduling']).toBe('Lead time of 0 hours less than the 2 days required.');
  });
});
