import { Component, OnInit } from '@angular/core';
import {MySelectItem} from '../../reports/reports.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {WorkOrder} from './models/work-order';
import {LookupsService} from '../../lookups/lookups.service';
import {OnlineOrdersService} from '../online-orders.service';
import {Lookup} from '../../lookups/models/lookup';
import { Employer } from "../../shared/models/employer";
import { WorkOrderService } from "./work-order.service";

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent implements OnInit {
  transportMethods: Lookup[];
  transportMethodsDropDown: MySelectItem[];
  orderForm: FormGroup;
  order: WorkOrder = new WorkOrder();
  errorMessage: string;
  showErrors: boolean = false;
  newOrder: boolean = true;
  formErrors = {
    'dateTimeofWork': '',
    'contactName':  '',
    'worksiteAddress1':  '',
    'worksiteAddress2':  '',
    'city':  '',
    'state':  '',
    'zipcode':  '',
    'phone':  '',
    'description':  '',
    'additionalNotes':  '',
    'transportMethodID': ''
  };

  validationMessages = {
    'dateTimeofWork': { 'required': 'Date & time is required.' },
    'contactName': { 'required': 'Contact name is required.' },
    'worksiteAddress1': { 'required': 'Address is required.' },
    'worksiteAddress2': {},
    'city': { 'required': 'City is required.' },
    'state': { 'required': 'State is required.' },
    'zipcode': { 'required': 'Zip code is required.' },
    'phone': { 'required': 'Phone is required.' },
    'description': { 'required': 'Description is required.' },
    'additionalNotes': { },
    'transportMethodID': { 'required': 'skill is required.' }
  };

  constructor(
    private lookupsService: LookupsService,
    private orderService: WorkOrderService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.lookupsService.getLookups('transportmethod')
      .subscribe(
        listData => {
          this.transportMethods = listData;
          this.transportMethodsDropDown = listData.map(l =>
            new MySelectItem(l.text_EN, String(l.id)));
        },
        error => this.errorMessage = <any>error,
        () => console.log('work-assignments.component: ngOnInit onCompleted'));
    this.orderService.loadProfile()
      .subscribe(
        data => {
          this.order =this.mapOrderFrom(data);
          this.buildForm();
        }
      );
    
  }
  mapOrderFrom(employer: Employer): WorkOrder {
    const order = new WorkOrder();
    order.contactName = employer.name;
    order.worksiteAddress1 = employer.address1;
    order.worksiteAddress2 = employer.address2;
    order.city = employer.city;
    order.state = employer.state;
    order.zipcode = employer.zipcode;
    return order;
  }

  buildForm(): void {
    this.orderForm = this.fb.group({
      'dateTimeofWork': [this.order.dateTimeofWork, Validators.required],
      'contactName': [this.order.contactName, Validators.required],
      'worksiteAddress1': [this.order.worksiteAddress1, Validators.required],
      'worksiteAddress2': [this.order.worksiteAddress2, Validators.required],
      'city': [this.order.city, Validators.required],
      'state': [this.order.state, Validators.required],
      'zipcode': [this.order.zipcode, Validators.required],
      'phone': [this.order.phone, Validators.required],
      'description': [this.order.description, Validators.required],
      'additionalNotes': '',
      'selectedTransportMethod': [this.order.transportMethodID, Validators.required]
    });

    this.orderForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    const form = this.orderForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  loadOrder() {

  }

  saveOrder() {
    this.onValueChanged();
    if (this.orderForm.status === 'INVALID') {
      this.showErrors = true;
      return;
    }
    this.showErrors = false;

    const order = this.prepareOrderForSave();
    if (this.newOrder) {
      this.orderService.create(order);
    } else {
      this.orderService.save(order);
    }
    this.newOrder = false;
  }

  prepareOrderForSave(): WorkOrder {
    const formModel = this.orderForm.value;

    const order: WorkOrder = {
      dateTimeofWork: formModel.dateTimeofWork,
      contactName: formModel.contactName,
      worksiteAddress1: formModel.worksiteAddress1,
      worksiteAddress2: formModel.worksiteAddress2,
      city: formModel.city,
      state: formModel.state,
      zipcode: formModel.zipcode,
      phone: formModel.phone,
      description: formModel.description,
      additionalNotes: formModel.additionalNotes,
      transportMethodID: formModel.transportMethodID
    };
    return order;
  }

  clearOrder() {

  }
}
