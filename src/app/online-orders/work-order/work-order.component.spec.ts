import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderComponent } from './work-order.component';
import { Observable } from 'rxjs/Observable';
import { WorkOrderService } from './work-order.service';
import { LookupsService } from '../../lookups/lookups.service';
import { Lookup } from '../../lookups/models/lookup';
import { WorkOrder } from './models/work-order';
import { Employer } from '../../shared/models/employer';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule, CalendarModule, DialogModule } from 'primeng/primeng';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OnlineOrdersService } from '../online-orders.service';
import { ScheduleRule } from '../shared/models/schedule-rule';
import { ConfigsService } from '../../configs/configs.service';
import { WorkOrderServiceSpy, LookupsServiceSpy, ConfigsServiceSpy, OnlineOrdersServiceSpy, RouterSpy, ScheduleRulesServiceSpy } from '../../shared/testing';
import { Router } from "@angular/router";
import { ScheduleRulesService } from '../schedule-rules.service';

describe('WorkOrderComponent', () => {
  let component: WorkOrderComponent;
  let fixture: ComponentFixture<WorkOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        CalendarModule,
        DropdownModule,
        DialogModule
      ]
    })
    .overrideComponent(WorkOrderComponent, {
      set: {
        providers: [
          { provide: WorkOrderService, useClass: WorkOrderServiceSpy },
          { provide: LookupsService, useClass: LookupsServiceSpy },
          { provide: OnlineOrdersService, useClass: OnlineOrdersServiceSpy },
          { provide: ConfigsService, useClass: ConfigsServiceSpy },
          { provide: Router, useClass: RouterSpy},
          { provide: ScheduleRulesService, useClass: ScheduleRulesServiceSpy }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
