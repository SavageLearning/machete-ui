import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCompleteComponent } from './order-complete.component';
import { FullOrderViewComponent } from '../../shared/views/full-order-view/full-order-view.component';
import { DataTableModule } from 'primeng/primeng';
import { OnlineOrdersService } from '../online-orders.service';
import { OnlineOrdersServiceSpy, LookupsServiceSpy } from '../../shared/testing';
import { LookupsService } from '../../lookups/lookups.service';
import * as paypal from 'paypal-checkout';

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
          { provide: OnlineOrdersService, useClass: OnlineOrdersServiceSpy },
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
