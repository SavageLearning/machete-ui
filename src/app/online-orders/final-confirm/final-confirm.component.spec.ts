import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalConfirmComponent } from './final-confirm.component';
import { WorkOrderService } from '../work-order/work-order.service';
import { WorkOrder } from '../work-order/models/work-order';
import { OnlineOrdersService } from '../online-orders.service';
import { WorkOrderServiceSpy, OnlineOrdersServiceSpy, LookupsServiceSpy, WorkAssignmentsServiceSpy } from '../../shared/testing';
import { LookupsService } from "../../lookups/lookups.service";
import { DataTableModule } from 'primeng/primeng';

import { WorkAssignmentsService } from "../work-assignments/work-assignments.service";

describe('FinalConfirmComponent', () => {
  let component: FinalConfirmComponent;
  let fixture: ComponentFixture<FinalConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalConfirmComponent ],
      imports: [DataTableModule]
    })
    .overrideComponent(FinalConfirmComponent, {
      set: {
        providers: [
          { provide: WorkOrderService, useClass: WorkOrderServiceSpy },
          { provide: OnlineOrdersService, useClass: OnlineOrdersServiceSpy },
          { provide: LookupsService, useClass: LookupsServiceSpy},
          { provide: WorkAssignmentsService, useClass: WorkAssignmentsServiceSpy}
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
