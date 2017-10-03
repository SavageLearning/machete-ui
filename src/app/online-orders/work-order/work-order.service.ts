import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WorkOrder} from './models/work-order';
import { EmployersService} from '../../employers/employers.service';
import { Employer } from '../../shared/models/employer';
import { BehaviorSubject, ReplaySubject } from "rxjs";

@Injectable()
export class WorkOrderService {
  order: WorkOrder;
  orderSource = new ReplaySubject<WorkOrder>(1);
  order$ = this.orderSource.asObservable();

  storageKey = 'machete.workorder';
  constructor(private employerService: EmployersService) {
    console.log('.ctor');
    let data = sessionStorage.getItem(this.storageKey);
    if (data) {
      let order: WorkOrder = JSON.parse(data);
      order.dateTimeofWork = new Date(order.dateTimeofWork);
      this.order = order;
      this.orderSource.next(this.order);
    } else {
      this.employerService.getEmployerBySubject()
        .subscribe(data => {
          this.order = this.mapOrderFrom(data);
          this.orderSource.next(this.order);
        });
    }
  }

  get(): WorkOrder { 
    console.log('get called'); 
    let data = sessionStorage.getItem(this.storageKey); 
    if (data) { 
      let order: WorkOrder = JSON.parse(data); 
      //console.log('get: returning stored order', order); 
      order.dateTimeofWork = new Date(order.dateTimeofWork); 
      return order; 
    } else { 
      return this.order; 
    } 
  } 

  mapOrderFrom(employer: Employer): WorkOrder {
    const order = new WorkOrder();
    order.contactName = employer.name;
    order.worksiteAddress1 = employer.address1;
    order.worksiteAddress2 = employer.address2;
    order.city = employer.city;
    order.state = employer.state;
    order.zipcode = employer.zipcode;
    order.phone = employer.phone || employer.cellphone;
    return order;
  }

  save(order: WorkOrder) {
    console.log('save', order);
    sessionStorage.setItem(this.storageKey, JSON.stringify(order));
    this.order = order;
    this.orderSource.next(this.order);
  }

  // TODO: Call clear when order expires, is completed, removed.
  clear() {
    this.order = null;
    sessionStorage.removeItem(this.storageKey);
  }
}
