import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalConfirmComponent } from './final-confirm.component';
import { WorkOrderService } from '../work-order/work-order.service';
import { WorkOrder } from '../work-order/models/work-order';
import { OnlineOrdersService } from '../online-orders.service';

class WorkOrderServiceSpy {
  get = jasmine.createSpy('get')
    .and.callFake(
      () => new WorkOrder()
    );
}
class OnlineOrdersServiceSpy {
  get = jasmine.createSpy('get')
    .and.callFake(
      () => {}
    );
}
describe('FinalConfirmComponent', () => {
  let component: FinalConfirmComponent;
  let fixture: ComponentFixture<FinalConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalConfirmComponent ]
    })
    .overrideComponent(FinalConfirmComponent, {
      set: {
        providers: [
          { provide: WorkOrderService, useClass: WorkOrderServiceSpy },
          { provide: OnlineOrdersService, useClass: OnlineOrdersServiceSpy }
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
