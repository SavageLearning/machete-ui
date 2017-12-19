import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkOrdersComponent } from './work-orders.component';
import { WorkOrder } from '../shared/models/work-order';
import { Observable } from 'rxjs/Observable';
import { WorkOrdersService } from './work-orders.service';
import { DataTableModule } from 'primeng/primeng';
import { TransportRulesService } from '../online-orders/transport-rules.service';
import { TransportRulesServiceSpy } from '../shared/testing/services.spy';
class WorkOrdersServiceSpy {
  getOrders = jasmine.createSpy('getOrders')
    .and.callFake(
      () => Observable.of(new Array<WorkOrder>())
    );
}
describe('WorkOrdersComponent', () => {
  let component: WorkOrdersComponent;
  let fixture: ComponentFixture<WorkOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrdersComponent ],
      imports: [
        DataTableModule
      ]
    })
    .overrideComponent(WorkOrdersComponent, {
      set: {
        providers: [
          { provide: WorkOrdersService, useClass: WorkOrdersServiceSpy },
        ]
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(WorkOrdersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
