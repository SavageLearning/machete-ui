import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkOrder } from './models/work-order';
import { LookupsService } from '../../lookups/lookups.service';
import { OnlineOrdersService } from '../online-orders.service';
import { Lookup, LCategory } from '../../lookups/models/lookup';
import { Employer } from '../../shared/models/employer';
import { WorkOrderService } from './work-order.service';
import { ScheduleRule, schedulingValidator, requiredValidator} from '../shared';
import { ConfigsService } from '../../configs/configs.service';
import { MySelectItem } from '../../shared/models/my-select-item';

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
  showErrors = false;
  newOrder = true;
  schedulingRules: ScheduleRule[];

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

  display = false;

  showDialog() {
      this.display = true;
  }
  constructor(
    private lookupsService: LookupsService,
    private orderService: WorkOrderService,
    private onlineService: OnlineOrdersService,
    private configsService: ConfigsService,
    private fb: FormBuilder) {
      console.log('.ctor');
    }

  ngOnInit() {
    this.initializeScheduling();
    this.buildForm();
    this.initializeTransports();
    this.initializeProfile();
  }
  initializeScheduling() {
    this.schedulingRules = this.onlineService.scheduleRules;
  }

  initializeProfile() {
    if (this.orderService.get() == null) {
      this.orderService.loadFromProfile()
        .subscribe(
          data => {
            console.log('ngOnInit: loadFromProfile ', data)
            this.order = this.mapOrderFrom(data);
            this.buildForm();
          }
        );
    } else {
      this.order = this.orderService.get();
      this.buildForm();
    }
  }

  initializeTransports() {
    this.lookupsService.getLookups(LCategory.TRANSPORT)
      .subscribe(
        listData => {
          this.transportMethods = listData;
          let items = [new MySelectItem('Select transportion', null)];
          let transports = listData.map(l =>
            new MySelectItem(l.text_EN, String(l.id)));
          this.transportMethodsDropDown = items.concat(transports); ;
        },
        error => this.errorMessage = <any>error,
        () => console.log('ngOnInit: getLookups onCompleted'));
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

  buildForm(): void {
    this.orderForm = this.fb.group({
      'dateTimeofWork': [this.order.dateTimeofWork, [
        requiredValidator('Date & time is required.'),
        schedulingValidator(this.schedulingRules)
      ]],
      'contactName': [this.order.contactName, requiredValidator('Contact name is required.')],
      'worksiteAddress1': [this.order.worksiteAddress1, requiredValidator('Address is required.')],
      'worksiteAddress2': [this.order.worksiteAddress2],
      'city': [this.order.city, requiredValidator('City is required.')],
      'state': [this.order.state, requiredValidator('State is required.')],
      'zipcode': [this.order.zipcode, requiredValidator('Zip code is required.')],
      'phone': [this.order.phone, requiredValidator('Phone is required.')],
      'description': [this.order.description, requiredValidator('Description is required.')],
      'additionalNotes': '',
      'transportMethodID': [this.order.transportMethodID, requiredValidator('A transport method is required.')]
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
        for (const key in control.errors) {
          //console.log('onValueChanged.error:' + field + ': ' + control.errors[key]);
            this.formErrors[field] += control.errors[key] + ' ';
        }
      }
    }
  }

  load() {

  }

  save() {
    this.onValueChanged();
    if (this.orderForm.status === 'INVALID') {
      console.log('save: INVALID: ' + this.formErrors)
      this.showErrors = true;
      return;
    }
    this.showErrors = false;

    const order = this.prepareOrderForSave();
    this.orderService.save(order);
    this.newOrder = false;
  }

  prepareOrderForSave(): WorkOrder {
    const formModel = this.orderForm.value;

    const order: WorkOrder = {
      id: 0,
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
