import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";

import { IntroductionComponent } from "./introduction.component";
import {
  RouterSpy,
  OnlineOrdersServiceSpy,
  WorkOrderServiceSpy,
  WorkAssignmentsServiceSpy,
  AppSettingsStoreServiceSpy,
} from "../../shared/testing";
import { Router } from "@angular/router";
import { OnlineOrdersService } from "../online-orders.service";
import { WorkOrderService } from "../work-order/work-order.service";
import { WorkAssignmentsService } from "../work-assignments/work-assignments.service";
import { CardModule } from "primeng/card";
import { AppSettingsStoreService } from "../../shared/services/app-settings-store.service";

describe("IntroductionComponent", () => {
  let component: IntroductionComponent;
  let fixture: ComponentFixture<IntroductionComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [IntroductionComponent],
        imports: [CardModule],
      })
        .overrideComponent(IntroductionComponent, {
          set: {
            providers: [
              { provide: Router, useClass: RouterSpy },
              {
                provide: OnlineOrdersService,
                useClass: OnlineOrdersServiceSpy,
              },
              { provide: WorkOrderService, useClass: WorkOrderServiceSpy },
              {
                provide: WorkAssignmentsService,
                useClass: WorkAssignmentsServiceSpy,
              },
              {
                provide: AppSettingsStoreService,
                useClass: AppSettingsStoreServiceSpy,
              },
            ],
          },
        })
        .compileComponents()
        .catch((e) => console.error(e));
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
