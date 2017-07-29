import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WorkOrder} from './models/work-order';
import { EmployersService} from '../../employers/employers.service';
import { Employer } from '../../shared/models/employer';
import { Log } from "oidc-client";
@Injectable()
export class WorkOrderService {
  order: WorkOrder;
  constructor(private employerService: EmployersService) {
    Log.info('work-order.service: ' + JSON.stringify(this.get()));
  }

  loadFromProfile(): Observable<Employer> {
    Log.info('work-order.service.loadFromProfile: called');
    return this.employerService.getEmployerBySubject();
  }

  save(order: WorkOrder) {
    Log.info('work-order.service.save: called');
    this.order = order;
  }

  get(): WorkOrder {
    Log.info('work-order.service.get: called');
    return this.order;
  }

  clear() {
    this.order = null;
  }
}