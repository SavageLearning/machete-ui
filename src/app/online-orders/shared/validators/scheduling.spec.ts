import { schedulingDayValidator } from './scheduling';
import { AbstractControl, ValidatorFn, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleRule } from '..';
import * as moment from 'moment/moment';

describe('ScheduleRule', () => {
    let ctrl: AbstractControl;
    let tFunc: ValidatorFn;
    let fb: FormBuilder;
    let fg: FormGroup;
    let today: Date;
    beforeEach(() => {
        fb = new FormBuilder(); 
        today = new Date();
        tFunc = schedulingDayValidator(new Array<ScheduleRule>(
          new ScheduleRule({
            day: today.getDay(),
            leadHours: 48,
            minStartMin: 420, //7am
            maxEndMin: 1020 // 5pm 
          }), 
          new ScheduleRule({
            day: (new Date(today.valueOf()+(24 * 60 * 60 * 1000)).getDay()), // shame
            leadHours: 48,
            minStartMin: 420, //7am
            maxEndMin: 1020 // 5pm 
          })
        ));    
    });

  it('should create an instance', () => {
    const date: Date = moment().startOf('day').add(1, 'weeks').isoWeekday(2).toDate();
    const time: string = moment(0).format('HH:mm').toString();
    fg = fb.group({
      dateOfWork: date,
      timeOfWork: time,
      transportProviderID: 1
    });
    ctrl = fg.get('dateOfWork'); 
    const result = tFunc(ctrl);
    expect(result).toBeNull();
  });

  it('should reject time in the past', () => {
    const date: Date = moment().startOf('day').toDate();
    const time: string = moment().subtract(1, 'hour').format('HH:mm').toString(); 
    fg = fb.group({
      dateOfWork: date,
      timeOfWork: time,
      transportProviderID: 1
    });
    
    ctrl = fg.get('dateOfWork'); 
    // act
    const result = tFunc(ctrl);
    // 
    expect(result['scheduling']).toBe('Date cannot be in the past.');
  });

  it('should reject time 1 sec before start time', () => {
    //var utc = today.toJSON().slice(0,10).replace(/-/g,'/');
    var utc = today.valueOf() + (1 * 1000);
    var date = new Date(utc);
    ctrl.setValue(new Date(utc));
    // act
    const result = tFunc(ctrl);
    // 
    expect(result['scheduling']).toBe('Lead time of 1 days required.');
  });

  it('should reject time 2 hours before start time', () => {
    const date: Date = moment().startOf('day').toDate();
    const time: string = moment().add(2, 'hour').format('HH:mm').toString(); 
    fg = fb.group({
      dateOfWork: date,
      timeOfWork: time,
      transportProviderID: 1
    });  
    ctrl = fg.get('dateOfWork'); 
    // act
    const result = tFunc(ctrl);
    // 
    expect(result['scheduling']).toBe('Lead time of 1 days required.');
  });

  
});
