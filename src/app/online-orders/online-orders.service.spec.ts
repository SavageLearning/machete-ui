import { TestBed, inject } from "@angular/core/testing";

import { OnlineOrdersService } from "./online-orders.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { WorkOrderService } from "./work-order/work-order.service";
import { EmployersService } from "../employers/employers.service";
import { AuthService } from "../shared/index";
import { WorkAssignmentsService } from "./work-assignments/work-assignments.service";
import { HttpClientModule } from "@angular/common/http";
import {
  WorkOrderServiceSpy,
  EmployersServiceSpy,
  AuthServiceSpy,
  WorkAssignmentsServiceSpy,
  AppSettingsStoreServiceSpy,
} from "../shared/testing";
import { AppSettingsStoreService } from "../shared/services/app-settings-store.service";

describe("OnlineOrdersService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OnlineOrdersService,
        { provide: WorkOrderService, useClass: WorkOrderServiceSpy },
        { provide: EmployersService, useClass: EmployersServiceSpy },
        { provide: AuthService, useClass: AuthServiceSpy },
        {
          provide: AppSettingsStoreService,
          useClass: AppSettingsStoreServiceSpy,
        },
        {
          provide: WorkAssignmentsService,
          useClass: WorkAssignmentsServiceSpy,
        },
      ],
      imports: [HttpClientModule, HttpClientTestingModule],
    })
      .compileComponents()
      .catch((e) => console.error(e));
    TestBed.inject(OnlineOrdersService);
    TestBed.inject(HttpTestingController);
  });

  it("should ...", inject(
    [OnlineOrdersService],
    (service1: OnlineOrdersService) => {
      expect(service1).toBeTruthy();
    }
  ));
});
