/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";

import { WorkOrderComponent } from "./work-order.component";
import { WorkOrderService } from "./work-order.service";
import { ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { DialogModule } from "primeng/dialog";
import { ToggleButtonModule } from "primeng/togglebutton";

import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { OnlineOrdersService } from "../online-orders.service";
import {
  TransportRulesServiceSpy,
  TransportProvidersServiceSpy,
  ScheduleRulesServiceSpy,
  AppSettingsStoreServiceSpy,
} from "../../shared/testing";
import {
  WorkOrderServiceSpy,
  OnlineOrdersServiceSpy,
  RouterSpy,
} from "../../shared/testing";

import { Router } from "@angular/router";
import { ScheduleRulesService } from "../schedule-rules.service";
import { TransportRulesService } from "../transport-rules.service";
import { TransportProvidersService } from "../transport-providers.service";
import { AppSettingsStoreService } from "../../shared/services/app-settings-store.service";

describe("WorkOrderComponent", () => {
  let component: WorkOrderComponent;
  let fixture: ComponentFixture<WorkOrderComponent>;

  beforeEach(
    waitForAsync(async () => {
      await TestBed.configureTestingModule({
        declarations: [WorkOrderComponent],
        imports: [
          NoopAnimationsModule,
          ReactiveFormsModule,
          CalendarModule,
          DropdownModule,
          DialogModule,
          ToggleButtonModule,
        ],
        providers: [
          { provide: WorkOrderService, useClass: WorkOrderServiceSpy },
          {
            provide: TransportProvidersService,
            useClass: TransportProvidersServiceSpy,
          },
          {
            provide: OnlineOrdersService,
            useClass: OnlineOrdersServiceSpy,
          },
          {
            provide: AppSettingsStoreService,
            useClass: AppSettingsStoreServiceSpy,
          },
          { provide: Router, useClass: RouterSpy },
          {
            provide: ScheduleRulesService,
            useClass: ScheduleRulesServiceSpy,
          },
          {
            provide: TransportRulesService,
            useClass: TransportRulesServiceSpy,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("toggle require vaccinated workers binds to form control", () => {
    const form = component.orderForm;
    form.get("requireVaccinatedWorkers").setValue(true);
    const req = form.get("requireVaccinatedWorkers").value;
    expect(req).toEqual(true);
  });

  //   it('should save', () => {
  //     expect(component.orderForm.dirty).toBeFalsy();
  //   });
});
