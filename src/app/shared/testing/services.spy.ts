/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
let Jasmine = require('jasmine');
import { Observable } from "rxjs/Observable";
import { Employer } from "../models/employer";
import { Lookup } from "../../lookups/models/lookup";
import { User } from "oidc-client";
import { EventEmitter } from "@angular/core";
import { WorkOrder } from "../../online-orders/work-order/models/work-order";
import { ScheduleRule, loadTransportRules, TransportRule } from "../../online-orders/shared/index";
import { WorkAssignment } from "../../online-orders/work-assignments/models/work-assignment";
import { Subject } from "rxjs/Subject";
import { Router, NavigationEnd, UrlTree } from "@angular/router";
import { BehaviorSubject } from "rxjs";

export class EmployersServiceSpy {
  getEmployerBySubject = jasmine.createSpy('getEmployerBySubject')
    .and.callFake(
      () => Observable.of(new Employer())
    );
}

export class LookupsServiceSpy {
  getLookups = jasmine.createSpy('getLookups')
    .and.callFake(
      () => Observable.of([new Lookup({id: 32, text_EN: 'a text label'})])
    );
}

export class AuthServiceSpy {
  startSigninMainWindow = jasmine.createSpy('startSigninMainWindow');
  
  endSigninMainWindow = jasmine.createSpy('endSigninMainWindow')
    .and.callFake(() => {
      // TODO: Implement a better stub of the User interface
      // https://stackoverflow.com/questions/37027776/how-to-stub-a-typescript-interface-type-definition
      let user = {
        id_token: '',
        session_state: '',
        access_token: '',
        token_type: '',
        scope: '',
        profile: '',
        expires_at: 0,
        state: '',

        expires_in: 0,
        expired: true,
        scopes: new Array<string>()
      } as User;
      return Observable.of(user)}); // void response
  getUserEmitter = jasmine.createSpy('getUserEmitter')
    .and.callFake(() => new EventEmitter<User>());
  getUser = jasmine.createSpy('getUser');

  getUserRoles$ = jasmine.createSpy('getUserRoles$')
  .and.callFake(
    () => Observable.of(new Array<string>())
  );
}

export class RouterSpy {
  public ne = new NavigationEnd(0, 
    'http://localhost:4200/login', 
    'http://localhost:4200/login');
  public events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });
  createUrlTree = jasmine.createSpy('createUrlTree')
    .and.callFake(
      () => new UrlTree()
    );
  serializeUrl = jasmine.createSpy('serializeUrl')
    .and.callFake(
      () => ""
    );
}

export class WorkAssignmentsServiceSpy {
  getAll = jasmine.createSpy('getAll')
    .and.callFake(
      () => new Array<WorkAssignment>()
    );
  getTransportRules = jasmine.createSpy('getTransportRules')
    .and.callFake(
      () => Observable.of(loadTransportRules())
    );
  compactRequests = jasmine.createSpy('compactRequests');

  getTransportRulesStream = jasmine.createSpy('getTransportRulesStream')
    .and.callFake(
      () => Observable.of(new Array<TransportRule>())
    );
  
  getTransportsStream = jasmine.createSpy('getTransportsStream')
    .and.callFake(
      () => Observable.of(new Array<Lookup>())
    );

    getWorkOrderStream = jasmine.createSpy('getWorkOrderStream')
    .and.callFake(
      () => Observable.of(new WorkOrder())
    );
}

export class WorkOrderServiceSpy {
  get = jasmine.createSpy('get')
    .and.callFake(
      () => new WorkOrder()
    );
  getStream = jasmine.createSpy('getStream')
    .and.callFake(() => Observable.of( new WorkOrder({
      id: 1,
      transportMethodID: 32
      }))
    );

  loadFromProfile = jasmine.createSpy('loadFromProfile')
    .and.callFake(
      () => Observable.of(new Employer())
    );
}
export class OnlineOrdersServiceSpy {
  get = jasmine.createSpy('get')
    .and.callFake(
      () => {}
    );
  scheduleRules = jasmine.createSpy('scheduleRules')
    .and.callFake(
      () => new Array<ScheduleRule>()
    );
  getTransportRules = jasmine.createSpy('getTransportRules')
    .and.callFake(
      () => Observable.of(loadTransportRules())
    );

  getInitialConfirmedStream = jasmine.createSpy('getInitialConfirmedStream')
      .and.callFake(
        () => Observable.of(true)
      );
}

export class ConfigsServiceSpy {
  
}