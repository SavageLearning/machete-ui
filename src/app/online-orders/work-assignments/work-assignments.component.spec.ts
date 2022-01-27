import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";

import { WorkAssignmentsComponent } from "./work-assignments.component";
import { WorkAssignmentsService } from "./work-assignments.service";
import { LookupsService } from "../../lookups/lookups.service";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { InputSwitchModule } from "primeng/inputswitch";
import { TableModule } from "primeng/table";

import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { OnlineOrdersService } from "../online-orders.service";
import {
  TransportRulesServiceSpy,
  TransportProvidersServiceSpy,
  DialogServiceSpy,
  MessageServiceSpy,
} from "../../shared/testing";
import {
  WorkAssignmentsServiceSpy,
  LookupsServiceSpy,
} from "../../shared/testing";
import { OnlineOrdersServiceSpy, RouterSpy } from "../../shared/testing";

import { Router } from "@angular/router";
import { TransportRulesService } from "../transport-rules.service";
import { TransportProvidersService } from "../transport-providers.service";
import { DialogService } from "primeng/dynamicdialog";
import { MessageService } from "primeng/api";
import { WorkAssignment } from "../../shared/models/work-assignment";

describe("WorkAssignmentsComponent", () => {
  let component: WorkAssignmentsComponent;
  let fixture: ComponentFixture<WorkAssignmentsComponent>;
  const fakeWorkAssignment: WorkAssignment = new WorkAssignment({
    id: 0,
    skillId: 32,
    skill: "a text label",
    description: "fake",
    hours: 2,
    requiresHeavyLifting: true,
    hourlyWage: 15,
    transportCost: 0,
    days: 0,
  });

  beforeEach(
    waitForAsync(async () => {
      await TestBed.configureTestingModule({
        declarations: [WorkAssignmentsComponent],
        imports: [
          NoopAnimationsModule,
          ReactiveFormsModule,
          DropdownModule,
          InputSwitchModule,
          TableModule,
        ],
        providers: [FormBuilder],
      })
        .overrideComponent(WorkAssignmentsComponent, {
          set: {
            providers: [
              {
                provide: WorkAssignmentsService,
                useClass: WorkAssignmentsServiceSpy,
              },
              { provide: LookupsService, useClass: LookupsServiceSpy },
              {
                provide: TransportProvidersService,
                useClass: TransportProvidersServiceSpy,
              },
              {
                provide: OnlineOrdersService,
                useClass: OnlineOrdersServiceSpy,
              },
              {
                provide: TransportRulesService,
                useClass: TransportRulesServiceSpy,
              },
              { provide: Router, useClass: RouterSpy },
              { provide: DialogService, useClass: DialogServiceSpy },
              { provide: MessageService, useClass: MessageServiceSpy },
            ],
          },
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(WorkAssignmentsComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
        });
    })
  );

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load transportRules", () => {
    expect(component.transportRules).toBeTruthy();
  });

  it("should clear from values on add more jobs", () => {
    const form = component.requestForm;
    form.get("hours").setValue(2);
    const result: number = parseInt(form.get("hours").value, 10);
    expect(result).toEqual(2);
    component.onAddMoreJobs();
    expect(form.get("hours").value).toEqual(null);
  });

  it("should contain correct request on edit", () => {
    const form = component.requestForm;
    const wa = fakeWorkAssignment;

    // most of these are set from the returned lookup spy fake objs
    form.get("hours").setValue(wa.hours);
    form.get("skillId").setValue(wa.skillId);
    form.get("description").setValue(wa.description);
    form.get("requiresHeavyLifting").setValue(wa.requiresHeavyLifting);

    component.editRequest(wa);

    expect(form.get("hours").value).toEqual(wa.hours);
    expect(form.get("skillId").value).toEqual(wa.skillId);
    expect(form.get("skill").value).toEqual(wa.skill);
    expect(form.get("description").value).toEqual(wa.description);
    expect(form.get("requiresHeavyLifting").value).toEqual(
      wa.requiresHeavyLifting
    );
    expect(form.get("hourlyWage").value).toEqual(wa.hourlyWage);
  });
});
