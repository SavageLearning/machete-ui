/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/naming-convention */

import { of as observableOf, Observable } from "rxjs";
import {} from "jasmine";
import { Employer } from "../models/employer";
import { Lookup } from "../models/lookup";
import { User, UserProfile } from "../models/user";
import { EventEmitter } from "@angular/core";
import { WorkOrder } from "../../shared/models/work-order";
import {
  ScheduleRule,
  TransportRule,
  TransportProvider,
  CostRule,
  TransportProviderAvailability,
} from "../../online-orders/shared/index";
import { WorkAssignment } from "../models/work-assignment";
import { NavigationEnd, UrlTree, convertToParamMap } from "@angular/router";
import { loadConfirms } from "../../online-orders/shared/rules/load-confirms";
import { Config } from "../models/config";
import { ApiResponse } from "../../workers/models/api-response";
import { Worker } from "../models/worker";
import { Skill } from "../models/skill";
import { Report } from "src/app/reports/models/report";
import { tick } from "@angular/core/testing";

export class EmployersServiceSpy {
  getEmployer = jasmine
    .createSpy("getEmployer")
    .and.callFake(() => observableOf(new Employer()));
  save = jasmine
    .createSpy("save")
    .and.callFake(() => observableOf(new Employer()));
}

export class EmployersServiceWaitingSpy {
  getEmployer = jasmine
    .createSpy("getEmployer")
    .and.callFake(() => observableOf(new Employer()));
  save = jasmine.createSpy("save").and.callFake(() => {
    setTimeout(() => {}, 5000);
    return observableOf(new Employer());
  });
}

export class LookupsServiceSpy {
  fakeLookup = new Lookup({ id: 32, text_EN: "a text label", wage: 15 });
  getLookups = jasmine
    .createSpy("getLookups")
    .and.callFake(() => observableOf([this.fakeLookup]));
  getLookup = jasmine
    .createSpy("getLookup")
    .and.callFake(() => observableOf(this.fakeLookup));
}

export class MyWorkOrdersServiceSpy {
  getOrder = jasmine
    .createSpy("getOrder")
    .and.callFake(() =>
      observableOf(new WorkOrder({ id: 1, transportProviderID: 32 }))
    );
}

export class ActivatedRouteSpy {
  get = jasmine.createSpy("snapshot").and.callThrough();
  queryParams = observableOf({
    "fb-fail": "true",
  });
}

export const ActivatedRouteStub = {
  snapshot: {
    paramMap: convertToParamMap({
      id: "1",
    }),
  },
};

export class AuthServiceSpy {
  startSigninMainWindow = jasmine.createSpy("startSigninMainWindow");

  endSigninMainWindow = jasmine
    .createSpy("endSigninMainWindow")
    .and.callFake(() => {
      // TODO: Implement a better stub of the User interface
      // https://stackoverflow.com/questions/37027776/how-to-stub-a-typescript-interface-type-definition
      const user = {
        session_state: "",
        token_type: "",
        scope: "",
        profile: new UserProfile(),
        expires_at: 0,
        state: "",

        expires_in: 0,
        expired: true,
        scopes: new Array<string>(),
      } as User;
      return observableOf(user);
    }); // void response
  getUserEmitter = jasmine
    .createSpy("getUserEmitter")
    .and.callFake(() => new EventEmitter<User>());
  getUser = jasmine.createSpy("getUser");

  getUserRoles$ = jasmine
    .createSpy("getUserRoles$")
    .and.callFake(() => observableOf(new Array<string>()));

  authorize = jasmine
    .createSpy("authorize")
    .and.callFake(() => observableOf(new User()));
}

export class RouterSpy {
  public ne = new NavigationEnd(
    0,
    "http://localhost:4200/login",
    "http://localhost:4200/login"
  );
  public events = new Observable((observer) => {
    observer.next(this.ne);
    observer.complete();
  });
  createUrlTree = jasmine
    .createSpy("createUrlTree")
    .and.callFake(() => new UrlTree());
  serializeUrl = jasmine.createSpy("serializeUrl").and.callFake(() => "");
  navigate = jasmine.createSpy("navigate");
}

export class WorkAssignmentsServiceSpy {
  getAll = jasmine
    .createSpy("getAll")
    .and.callFake(() => new Array<WorkAssignment>());
  getTransportRules = jasmine
    .createSpy("getTransportRules")
    .and.callFake(() => observableOf(new Array<TransportRule>()));
  compactRequests = jasmine.createSpy("compactRequests");

  getTransportRulesStream = jasmine
    .createSpy("getTransportRulesStream")
    .and.callFake(() => observableOf(new Array<TransportRule>()));

  getTransportsStream = jasmine
    .createSpy("getTransportsStream")
    .and.callFake(() => observableOf(new Array<Lookup>()));

  getWorkOrderStream = jasmine
    .createSpy("getWorkOrderStream")
    .and.callFake(() => observableOf(new WorkOrder()));
  getStream = jasmine
    .createSpy("getStream")
    .and.callFake(() => observableOf([new WorkAssignment()]));
}

export class WorkOrderServiceSpy {
  get = jasmine.createSpy("get").and.callFake(() => new WorkOrder());
  getStream = jasmine.createSpy("getStream").and.callFake(() =>
    observableOf(
      new WorkOrder({
        id: 1,
        transportProviderID: 32,
      })
    )
  );

  loadFromProfile = jasmine
    .createSpy("loadFromProfile")
    .and.callFake(() => observableOf(new Employer()));
}
export class OnlineOrdersServiceSpy {
  get = jasmine.createSpy("get").and.callFake(() => {
    return;
  });
  getTransportRules = jasmine
    .createSpy("getTransportRules")
    .and.callFake(() => observableOf(new Array<TransportRule>()));

  getInitialConfirmedStream = jasmine
    .createSpy("getInitialConfirmedStream")
    .and.callFake(() => observableOf(loadConfirms()));

  getOrderCompleteStream = jasmine
    .createSpy("getOrderCompleteStream")
    .and.callFake(() =>
      observableOf(
        new WorkOrder({
          id: 1,
          transportProviderID: 32,
        })
      )
    );

  setWorkorderConfirm = jasmine
    .createSpy("setWorkorderConfirm")
    .and.callThrough();
}

export const getConfigsList = (): Config[] => {
  const configs: Config[] = new Array<Config>();
  configs.push(new Config({ key: "WorkCenterDescription_EN", value: "foo" }));
  configs.push(new Config({ key: "FacebookAppId", value: "foo" }));
  configs.push(new Config({ key: "GoogleClientId", value: "foo" }));
  configs.push(new Config({ key: "OAuthStateParameter", value: "foo" }));
  configs.push(new Config({ key: "DisableOnlineOrders", value: "false" }));
  configs.push(
    new Config({ key: "DisableOnlineOrdersBanner", value: "fakeVal" })
  );
  return configs;
};

export class ConfigsServiceSpy {
  getConfig = jasmine
    .createSpy("getConfig")
    .and.callFake(() => observableOf(getConfigsList()[0]));
  getAllConfigs = jasmine
    .createSpy("getAllConfigs")
    .and.callFake(() => observableOf(getConfigsList()));
}

/**
 * the spy for PrimeNG message service
 */
export class MessageServiceSpy {
  add = jasmine.createSpy("add");
  clear = jasmine.createSpy("clear");
}

export class ScheduleRulesServiceSpy {
  getScheduleRules = jasmine
    .createSpy("getScheduleRules")
    .and.callFake(() => observableOf(new Array<ScheduleRule>()));
}

export class TransportRulesServiceSpy {
  getTransportRules = jasmine.createSpy("getTransportRules").and.callFake(() =>
    observableOf([
      new TransportRule({
        id: 1,
        zipcodes: ["12345"],
        costRules: [
          new CostRule({
            minWorker: 0,
            maxWorker: 10,
            cost: 10,
          }),
        ],
      }),
    ])
  );
}

export class TransportProvidersClientSpy {
  apiTransportProvidersGet = jasmine
    .createSpy("apiTransportProvidersGet")
    .and.returnValue(
      observableOf({
        data: [
          new TransportProvider({
            id: 32,
            text: "a text label",
            availabilityRules: new Array<TransportProviderAvailability>(
              new TransportProviderAvailability({ day: 0, available: false })
            ),
          }),
        ],
      })
    );
}

export class TransportProvidersServiceSpy {
  getTransportProviders = jasmine
    .createSpy("getTransportProviders")
    .and.callFake(() =>
      observableOf([
        new TransportProvider({
          id: 32,
          text: "a text label",
          availabilityRules: new Array<TransportProviderAvailability>(
            new TransportProviderAvailability({ day: 0, available: false }),
            new TransportProviderAvailability({ day: 1, available: true }),
            new TransportProviderAvailability({ day: 2, available: true }),
            new TransportProviderAvailability({ day: 3, available: true }),
            new TransportProviderAvailability({ day: 4, available: true }),
            new TransportProviderAvailability({ day: 5, available: true }),
            new TransportProviderAvailability({ day: 6, available: true })
          ),
        }),
      ])
    );
}

export class WorkerServiceSpy {
  workers: Array<Worker> = new Array<Worker>(
    new Worker({
      id: 1,
      firstname1: "Pedro",
      lastname1: "Navaja",
      dwccardnum: 10000,
    })
  );
  apiRes: ApiResponse<Worker> = {
    data: this.workers,
    recordCount: this.workers.length + 1,
    pageNumber: 1,
    pageSize: 10,
    totalPages: 1,
  };
  // constructor() {}
  getWorkersInSkill = (): Observable<ApiResponse<Worker>> => {
    return observableOf(this.apiRes);
  };
  getSkills = jasmine
    .createSpy("getSkillsFromWorkers")
    .and.callFake(() => observableOf(new Array<Skill>(new Skill({ id: 1 }))));
}

export class ReportsServiceSpy {
  // getReportData
}

export class MessagesServiceSpy {
  showErrors = jasmine.createSpy("showErrors").and.callThrough();
}

export class ReportsStoreServiceSpy {
  reports$ = observableOf(
    new Array<Report>(
      new Report({ commonName: "test" }),
      new Report({ commonName: "more" })
    )
  );
}

export class DynamicDialogRefSpy {}

export class DynamicDialogConfigSpy {}

export class DialogServiceSpy {}

export class TransportProvidersStoreServiceSpy {
  transportProviders$ = observableOf(
    new Array<TransportProvider>(new TransportProvider({ key: "test" }))
  );
}
