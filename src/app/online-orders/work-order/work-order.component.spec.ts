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
import { ConfigsService } from "../../configs/configs.service";
class WorkOrderServiceSpy {
  get = jasmine.createSpy('get')
    .and.callFake(
      () => Observable.of(new WorkOrder())
    );
  loadFromProfile = jasmine.createSpy('loadFromProfile')
    .and.callFake(
      () => Observable.of(new Employer())
    );
}
class LookupsServiceSpy {
  getLookups = jasmine.createSpy('getLookups')
    .and.callFake(
      () => Observable.of(new Array<Lookup>())
    );
}

class OnlineOrdersServiceSpy {
  scheduleRules = jasmine.createSpy('scheduleRules')
    .and.callFake(
      () => new Array<ScheduleRule>()
    );
}

class ConfigsServiceSpy {
  
}

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
          { provide: ConfigsService, useClass: ConfigsServiceSpy }
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
