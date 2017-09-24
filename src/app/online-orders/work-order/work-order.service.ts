import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WorkOrder} from './models/work-order';
import { EmployersService} from '../../employers/employers.service';
import { Employer } from '../../shared/models/employer';

@Injectable()
export class WorkOrderService {
  order: WorkOrder;
  storageKey = 'machete.workorder';
  constructor(private employerService: EmployersService) {
    console.log('.ctor');
  }

  loadFromProfile(): Observable<Employer> {
    console.log('loadFromProfile: called');
    return this.employerService.getEmployerBySubject();
  }

  save(order: WorkOrder) {
    console.log('save', order);
    sessionStorage.setItem(this.storageKey, JSON.stringify(order));
    this.order = order;
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

  clear() {
    this.order = null;
    sessionStorage.removeItem(this.storageKey);
  }
}
