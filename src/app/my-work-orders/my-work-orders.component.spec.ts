import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyWorkOrdersComponent } from './my-work-orders.component';
import { WorkOrder } from '../shared/models/work-order';
import { Observable } from 'rxjs/Observable';
import { MyWorkOrdersService } from './my-work-orders.service';
import { DataTableModule } from 'primeng/primeng';
import { TransportRulesService } from '../online-orders/transport-rules.service';
import { TransportRulesServiceSpy } from '../shared/testing/services.spy';
import { RouterTestingModule } from '@angular/router/testing';
import { MomentModule } from 'angular2-moment/moment.module';
class WorkOrdersServiceSpy {
  getOrders = jasmine.createSpy('getOrders')
    .and.callFake(
      () => Observable.of(new Array<WorkOrder>())
    );
}
describe('WorkOrdersComponent', () => {
  let component: MyWorkOrdersComponent;
  let fixture: ComponentFixture<MyWorkOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWorkOrdersComponent ],
      imports: [
        DataTableModule,
        MomentModule,
        RouterTestingModule
      ]
    })
    .overrideComponent(MyWorkOrdersComponent, {
      set: {
        providers: [
          { provide: MyWorkOrdersService, useClass: WorkOrdersServiceSpy },
        ]
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(MyWorkOrdersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
