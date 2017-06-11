import { Component, OnInit } from '@angular/core';
import {MySelectItem} from '../../reports/reports.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {WorkOrder} from './models/work-order';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent implements OnInit {
  transportMethods: MySelectItem[];
  orderForm: FormGroup;
  order: WorkOrder = new WorkOrder();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }
  buildForm(): void {
    this.orderForm = this.fb.group({
      'selectedTransportMethod': [this.order.transportMethodID]
    });
  }

}
