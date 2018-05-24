import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';
import { TransportRule, TransportProvider, TransportProviderAvailability } from '../index';
import * as moment from 'moment/moment';

export function transportAvailabilityValidator(rules: TransportProvider[], fields: string[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (rules == null) return null;
      if (control.parent == null) return null;
      const dateTimeofWork = control.parent.get('dateTimeofWork').value;
      const transportProviderID = control.parent.get('transportProviderID').value;
      if (!dateTimeofWork || !transportProviderID) return null;
        
      let provider = rules.find(f => f.id == transportProviderID);
      let day = provider.availabilityRules.find(a => a.day == moment(dateTimeofWork).day())
      if(!day.available) {
        return {'transportAvailability': `${provider.text} not available on ${moment(dateTimeofWork).format('dddd')}.`}
      }
      for (let i in fields) {
        const ctrl = control.parent.get(fields[i]);
        ctrl.setErrors(null);
      }
      return null;
    };
  }
  