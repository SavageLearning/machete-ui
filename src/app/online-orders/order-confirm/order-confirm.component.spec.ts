import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmComponent } from './order-confirm.component';
import { WorkOrderService } from '../work-order/work-order.service';
import { WorkOrder } from '../../shared/models/work-order';
import { OnlineOrdersService } from '../online-orders.service';
import { WorkOrderServiceSpy, OnlineOrdersServiceSpy, LookupsServiceSpy, WorkAssignmentsServiceSpy, RouterSpy } from '../../shared/testing';
import { LookupsService } from "../../lookups/lookups.service";
import { DataTableModule } from 'primeng/primeng';

import { WorkAssignmentsService } from "../work-assignments/work-assignments.service";
import { Router } from '@angular/router';
import { FullOrderViewComponent } from '../../shared/components/work-orders/full-order-view/full-order-view.component';

describe('OrderConfirmComponent', () => {
  let component: OrderConfirmComponent;
  let fixture: ComponentFixture<OrderConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        OrderConfirmComponent,
        FullOrderViewComponent
       ],
      imports: [DataTableModule]
    })
    .overrideComponent(OrderConfirmComponent, {
      set: {
        providers: [
          { provide: WorkOrderService, useClass: WorkOrderServiceSpy },
          { provide: OnlineOrdersService, useClass: OnlineOrdersServiceSpy },
          { provide: LookupsService, useClass: LookupsServiceSpy},
          { provide: WorkAssignmentsService, useClass: WorkAssignmentsServiceSpy},
          { provide: Router, useClass: RouterSpy }
          
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
