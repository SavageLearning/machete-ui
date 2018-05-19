import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';
import { TransportRule, TransportProvider, TransportProviderAvailability } from '../index';
import * as moment from 'moment/moment';

export function transportAvailabilityValidator(name: string, rules: TransportProvider[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (rules == null) return null;
      if (control.parent == null) return null;
      const dateTimeofWork = control.parent.get('dateTimeofWork').value;
      const transportMethodID = control.parent.get('transportMethodID').value;
      if (!dateTimeofWork || !transportMethodID) return null;
        
      let provider = rules.find(f => f.id == transportMethodID);
      let day = provider.availabilityRules.find(a => a.day == moment(dateTimeofWork).day())
      if(!day.available) {
        return {name: `${provider.text} not available on ${moment(dateTimeofWork).format('dddd')}.`}
      }
      return null;
    };
  }
  