import { of as observableOf } from "rxjs";

import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { WorkOrderDatatableComponent } from "./work-order-datatable.component";
import { WorkOrder } from "../../shared/models/work-order";
import { MyWorkOrdersService } from "../my-work-orders.service";
import { TableModule } from "primeng/table";
import { RouterSpy } from "../../shared/testing/services.spy";
import { Router } from "@angular/router";
class WorkOrdersServiceSpy {
  getOrders = jasmine
    .createSpy("getOrders")
    .and.callFake(() => observableOf(new Array<WorkOrder>()));
}
describe("WorkOrderDatatableComponent", () => {
  let component: WorkOrderDatatableComponent;
  let fixture: ComponentFixture<WorkOrderDatatableComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WorkOrderDatatableComponent],
        imports: [TableModule],
      })
        .overrideComponent(WorkOrderDatatableComponent, {
          set: {
            providers: [
              { provide: MyWorkOrdersService, useClass: WorkOrdersServiceSpy },
              { provide: Router, useClass: RouterSpy },
            ],
          },
        })
        .compileComponents()
        .catch((e) => console.error(e))
        .then(() => {
          fixture = TestBed.createComponent(WorkOrderDatatableComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
        });
    })
  );

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
