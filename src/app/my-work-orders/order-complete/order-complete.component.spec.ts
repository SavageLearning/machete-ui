import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCompleteComponent } from './order-complete.component';
import { FullOrderViewComponent } from '../../shared/components/work-orders/full-order-view/full-order-view.component';
import { DataTableModule } from 'primeng/primeng';
import { LookupsService } from '../../lookups/lookups.service';
import { LookupsServiceSpy, MyWorkOrdersServiceSpy, ActivatedRouteSpy, RouterSpy } from '../../shared/testing'; 
import * as paypal from 'paypal-checkout';
import { MyWorkOrdersService } from '../my-work-orders.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('OrderCompleteComponent', () => {
  let component: OrderCompleteComponent;
  let fixture: ComponentFixture<OrderCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        OrderCompleteComponent,
        FullOrderViewComponent
      ],
      imports: [DataTableModule]
    })
    .overrideComponent(OrderCompleteComponent, {
      set: {
        providers: [
          { provide: LookupsService, useClass: LookupsServiceSpy},
          { provide: MyWorkOrdersService, useClass: MyWorkOrdersServiceSpy },
          { provide: ActivatedRoute, useValue: { snapshot: {
            paramMap: {
              get: (id) => { return 1; } 
            }
          } 
          }},
          { provide: Router, useClass: RouterSpy } 
        ]
      }
    })
    .compileComponents();
    spyOn(paypal.Button, 'render').and.callFake(
      function() {}
    );
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(OrderCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
