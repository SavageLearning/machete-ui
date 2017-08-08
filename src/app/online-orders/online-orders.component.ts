import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/primeng';
import { LookupsService } from '../lookups/lookups.service';
import {OnlineOrdersService} from './online-orders.service';
import {FormBuilder} from '@angular/forms';
import { WorkAssignmentsService } from './work-assignments/work-assignments.service';
import { WorkOrderService } from './work-order/work-order.service';
import { EmployersService } from '../employers/employers.service';

@Component({
  selector: 'app-online-orders',
  templateUrl: './online-orders.component.html',
  styleUrls: ['./online-orders.component.css'],
  providers: [
    LookupsService,
    EmployersService,
    OnlineOrdersService,
    WorkOrderService,
    WorkAssignmentsService,
    FormBuilder
  ]
})
export class OnlineOrdersComponent implements OnInit {
  private items: MenuItem[];
  activeIndex: number = 0;
  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Introduction', routerLink: ['introduction']},
      {label: 'Confirm', routerLink: ['intro-confirm']},
      {label: 'work site details', routerLink: ['work-order']},
      {label: 'worker details', routerLink: ['work-assignments']},
      {label: 'finalize', routerLink: ['final-confirm']}
    ];
  }

}
