import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WorkOrder} from './models/work-order';
import { EmployersService} from '../../employers/employers.service';
import { Employer } from '../../shared/models/employer';
@Injectable()
export class WorkOrderService {
  order: WorkOrder = new WorkOrder();
  constructor(private employerService: EmployersService) {

  }

  loadProfile(): Observable<Employer> {
    return this.employerService.getEmployerBySubject();

  }



  create(order: WorkOrder) {
  }

  save(order: WorkOrder) {
    this.order = order;
  }

  get(): WorkOrder {
    return this.order;
  }

  clear() {

  }

  delete() {}
}