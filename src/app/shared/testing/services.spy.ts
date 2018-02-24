import { Observable } from "rxjs/Observable";
import { Employer } from "../models/employer";
import { Lookup } from "../../lookups/models/lookup";
import { User } from "oidc-client";
import { EventEmitter } from "@angular/core";
import { WorkOrder } from "../../shared/models/work-order";
import { ScheduleRule, TransportRule } from "../../online-orders/shared/index";
import { WorkAssignment } from "../models/work-assignment";
import { Subject } from "rxjs/Subject";
import { Router, NavigationEnd, UrlTree } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { loadConfirms } from "../../online-orders/shared/rules/load-confirms";
import { Config } from "../models/config";

export class EmployersServiceSpy {
  getEmployer = jasmine.createSpy('getEmployer')
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

export class MyWorkOrdersServiceSpy {
  getOrder = jasmine.createSpy('getOrder')
    .and.callFake(
      () => Observable.of(new WorkOrder({id: 1, transportMethodID: 32}))
    );

}

export class ActivatedRouteSpy {
  get = jasmine.createSpy('snapshot')
    .and.callThrough();
  
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
  navigate = jasmine.createSpy('navigate');
}

export class WorkAssignmentsServiceSpy {
  getAll = jasmine.createSpy('getAll')
    .and.callFake(
      () => new Array<WorkAssignment>()
    );
  getTransportRules = jasmine.createSpy('getTransportRules')
    .and.callFake(
      () => Observable.of(new Array<TransportRule>())
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
  getStream = jasmine.createSpy('getStream')
    .and.callFake(() => Observable.of([new WorkAssignment()]))
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
  getTransportRules = jasmine.createSpy('getTransportRules')
    .and.callFake(
      () => Observable.of(new Array<TransportRule>())
    );

  getInitialConfirmedStream = jasmine.createSpy('getInitialConfirmedStream')
      .and.callFake(
        () => Observable.of(loadConfirms())
      );

  getOrderCompleteStream = jasmine.createSpy('getOrderCompleteStream')
      .and.callFake(
        () => Observable.of(new WorkOrder({
          id: 1,
          transportMethodID: 32
        }))
      )
}

export class ConfigsServiceSpy {
  getConfig = jasmine.createSpy('')
    .and.callFake(
      () => Observable.of(new Config())
    );
  
}

export class ScheduleRulesServiceSpy {
  getScheduleRules = jasmine.createSpy('getScheduleRules')
    .and.callFake(
      () => Observable.of(new Array<ScheduleRule>())
    );
}

export class TransportRulesServiceSpy {
  getTransportRules = jasmine.createSpy('getTransportRules')
    .and.callFake(
      () => Observable.of(new Array<TransportRule>())
    );
}