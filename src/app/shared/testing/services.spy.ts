import { Observable } from "rxjs/Observable";
import { Employer } from "../models/employer";
import { Lookup } from "../../lookups/models/lookup";
import { User } from "oidc-client";
import { EventEmitter } from "@angular/core";
import { WorkOrder } from "../../online-orders/work-order/models/work-order";

export class EmployersServiceSpy {
  getEmployerBySubject = jasmine.createSpy('getEmployerBySubject')
    .and.callFake(
      () => Observable.of(new Employer())
    );
}

export class LookupsServiceSpy {
  getLookups = jasmine.createSpy('getLookups')
    .and.callFake(
      () => Observable.of(new Array<Lookup>())
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
  
}

export class WorkOrderServiceSpy {
  get = jasmine.createSpy('get')
    .and.callFake(
      () => new WorkOrder()
    );
  order = jasmine.createSpy('order$')
    .and.callFake(
      () => {}
    );
}
export class OnlineOrdersServiceSpy {
  get = jasmine.createSpy('get')
    .and.callFake(
      () => {}
    );
}