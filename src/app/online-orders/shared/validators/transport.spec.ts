import { transportValidator } from './transport';
import { AbstractControl, ValidatorFn, FormControl } from "@angular/forms";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { loadTransportRules } from '../rules/load-transport-rules';

describe('Transport rule', () => {


  it('should create an instance', () => {
    const ctrl = new FormControl();
    const tFunc = transportValidator(loadTransportRules());
    const result = tFunc(ctrl);
    expect(result).toBeTruthy();
  });
});
