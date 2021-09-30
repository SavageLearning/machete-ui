import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { OrderConfirmComponent } from "./order-confirm.component";
import { WorkOrderService } from "../work-order/work-order.service";
import { OnlineOrdersService } from "../online-orders.service";
import {
  MessageServiceSpy,
  TransportProvidersServiceSpy,
  WorkOrderServiceSpy,
  OnlineOrdersServiceSpy,
  WorkAssignmentsServiceSpy,
  RouterSpy,
} from "../../shared/testing";
import { TableModule } from "primeng/table";
import { WorkAssignmentsService } from "../work-assignments/work-assignments.service";
import { Router } from "@angular/router";
import { FullOrderViewComponent } from "../../shared/components/work-orders/full-order-view/full-order-view.component";
import { MessageService } from "primeng/api";
import { TransportProvidersService } from "../transport-providers.service";

describe("OrderConfirmComponent", () => {
  let component: OrderConfirmComponent;
  let fixture: ComponentFixture<OrderConfirmComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OrderConfirmComponent, FullOrderViewComponent],
        imports: [TableModule],
      })
        .overrideComponent(OrderConfirmComponent, {
          set: {
            providers: [
              { provide: WorkOrderService, useClass: WorkOrderServiceSpy },
              {
                provide: OnlineOrdersService,
                useClass: OnlineOrdersServiceSpy,
              },
              {
                provide: TransportProvidersService,
                useClass: TransportProvidersServiceSpy,
              },
              { provide: MessageService, useClass: MessageServiceSpy },
              {
                provide: WorkAssignmentsService,
                useClass: WorkAssignmentsServiceSpy,
              },
              { provide: Router, useClass: RouterSpy },
            ],
          },
        })
        .compileComponents()
        .catch((e) => console.error(e));
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
