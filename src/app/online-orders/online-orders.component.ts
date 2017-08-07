import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/primeng';
import { LookupsService } from '../lookups/lookups.service';
import {FormBuilder} from '@angular/forms';
import { SequenceGuardService } from './sequence-guard.service';
import { WorkAssignmentService } from './work-assignments/work-assignment.service';
import { WorkOrderService } from './work-order/work-order.service';
import { EmployersService } from '../employers/employers.service';
import { OnlineOrdersService } from './online-orders.service';

@Component({
  selector: 'app-online-orders',
  templateUrl: './online-orders.component.html',
  styleUrls: ['./online-orders.component.css'],
  providers: [
    LookupsService,
    EmployersService,
    WorkOrderService,
    WorkAssignmentService,
    FormBuilder,
    OnlineOrdersService
  ]
})
export class OnlineOrdersComponent implements OnInit {
  private items: MenuItem[];
  activeIndex = 0;

  constructor(private onlineService: OnlineOrdersService) {
    onlineService.activeStep$.subscribe(
        step => {
          this.activeIndex = step;
        }
    );
  }

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
