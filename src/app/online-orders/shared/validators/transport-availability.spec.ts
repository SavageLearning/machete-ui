import { AbstractControl, ValidatorFn, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleRule, TransportProvider, TransportProviderAvailability } from '..';
import { transportAvailabilityValidator } from './transport-availability';
import * as moment from 'moment/moment';

describe('TransportAvailability', () => {
    let ctrl: AbstractControl;
    let fb: FormBuilder;
    let fg: FormGroup;
    let tFunc: ValidatorFn;
    let today: Date;
    beforeEach(() => {
        today = new Date();
        fb = new FormBuilder();
        fg = fb.group({
          dateTimeofWork: today,
          transportMethodID: 1
        });
        ctrl = fg.get('dateTimeofWork');
        
        tFunc = transportAvailabilityValidator('testfield', new Array<TransportProvider>(
          new TransportProvider({
            id: 1,
            key: '',
            text: 'transport_van',
            defaultAttribute: true,
            sortorder: 1,
            active: true,
            availabilityRules: new Array<TransportProviderAvailability>(
              new TransportProviderAvailability({day: 0, available: false}),
              new TransportProviderAvailability({day: 1, available: true}),
              new TransportProviderAvailability({day: 2, available: true}),
              new TransportProviderAvailability({day: 3, available: true}),
              new TransportProviderAvailability({day: 4, available: true}),
              new TransportProviderAvailability({day: 5, available: true}),
              new TransportProviderAvailability({day: 6, available: true})
            )
          })
        ));    
    });

  it('should create an instance', () => {
    const result = tFunc(ctrl);
    expect(result).toBeNull();
  });  
  it('should not show van on Sunday', () => {
    fg = fb.group({
      dateTimeofWork: moment().add(1, 'weeks').isoWeekday(0),
      transportMethodID: 1
    });

    ctrl = fg.get('dateTimeofWork');
    const result = tFunc(ctrl);
    expect(result.name).toBe('transport_van not available on Sunday.' );
  });
});
