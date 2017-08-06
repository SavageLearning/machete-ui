import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WorkOrder} from './models/work-order';
import { EmployersService} from '../../employers/employers.service';
import { Employer } from '../../shared/models/employer';
import { Log } from "oidc-client";
@Injectable()
export class WorkOrderService {
  order: WorkOrder;
  orderKey: string = 'machete.workorder';
  constructor(private employerService: EmployersService) {
    Log.info('work-order.service: ' + JSON.stringify(this.get()));
  }

  loadFromProfile(): Observable<Employer> {
    Log.info('work-order.service.loadFromProfile: called');
    return this.employerService.getEmployerBySubject();
  }

  save(order: WorkOrder) {
    Log.info('work-order.service.save: called');
    sessionStorage.setItem(this.orderKey, JSON.stringify(order));
    this.order = order;
  }

  get(): WorkOrder {
    Log.info('work-order.service.get: called');
    var data = sessionStorage.getItem(this.orderKey);
    if (data) {
      Log.info('work-order.service.get: returning stored order');
      let order: WorkOrder = JSON.parse(data);
      order.dateTimeofWork = new Date(order.dateTimeofWork);
      return order;
    } else {
      return this.order;
    }
  }

  clear() {
    this.order = null;
    sessionStorage.removeItem(this.orderKey);
  }
}