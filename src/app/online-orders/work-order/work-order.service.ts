import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { EmployersService } from "../../employers/employers.service";
import { Employer } from "../../shared/models/employer";
import { WorkOrderVM } from "src/app/client";
import { isEmpty } from "src/app/shared/helpers";
import { DateTime } from "luxon";

@Injectable()
export class WorkOrderService {
  order: WorkOrderVM;
  orderSource = new BehaviorSubject<WorkOrderVM>(null);
  //order$ = this.orderSource.asObservable();

  storageKey = "machete.workorder";
  constructor(private employerService: EmployersService) {
    const data = sessionStorage.getItem(this.storageKey);
    const order: WorkOrderVM = JSON.parse(data) as WorkOrderVM;
    // check that data's not null first
    if (data && order && !isEmpty(order)) {
      console.log(".ctor->Loading existing order", order);
      order.dateTimeofWork = DateTime.fromISO(order.dateTimeofWork).toString(); // deserializing date
      this.order = order;
      this.orderSource.next(this.order);
    } else {
      console.log(".ctor->Create work order from employer");
      this.employerService.getEmployer().subscribe((res) => {
        // loading employer data as the defaults for
        // the new workorder
        this.order = this.mapOrderFrom(res || new Employer());
        this.orderSource.next(this.order);
      });
    }
  }

  getStream(): Observable<WorkOrderVM> {
    return this.orderSource.asObservable();
  }

  get(): WorkOrderVM {
    console.log("get called");
    const data = sessionStorage.getItem(this.storageKey);
    if (data) {
      const order: WorkOrderVM = JSON.parse(data) as WorkOrderVM;
      //console.log('get: returning stored order', order);
      //order.dateTimeofWork = new Date(order.dateTimeofWork);
      return order;
    } else {
      return this.order;
    }
  }

  mapOrderFrom(employer: Employer): WorkOrderVM {
    const order: WorkOrderVM = {};
    order.contactName = employer.name;
    order.workSiteAddress1 = employer.address1;
    order.workSiteAddress2 = employer.address2;
    order.city = employer.city;
    order.state = employer.state;
    order.zipcode = employer.zipcode;
    order.phone = employer.phone || employer.cellphone;
    return order;
  }

  save(order: WorkOrderVM): void {
    console.log("save", order);
    sessionStorage.setItem(this.storageKey, JSON.stringify(order));
    this.order = order;
    this.orderSource.next(this.order);
  }

  // TODO: Call clear when order expires, is completed, removed.
  clearState(): void {
    this.order = {};
    console.log("WorkOrdersService.clearState-----");

    sessionStorage.removeItem(this.storageKey);
    this.orderSource.next(this.order);
  }
}
