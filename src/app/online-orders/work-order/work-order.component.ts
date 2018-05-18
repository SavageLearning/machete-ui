import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkOrder } from '../../shared/models/work-order';
import { LookupsService } from '../../lookups/lookups.service';
import { OnlineOrdersService } from '../online-orders.service';
import { Lookup, LCategory } from '../../lookups/models/lookup';
import { Employer } from '../../shared/models/employer';
import { WorkOrderService } from './work-order.service';
import { ScheduleRule, schedulingValidator, requiredValidator, TransportRule, TransportProviderAvailability, TransportProvider} from '../shared';
import { ConfigsService } from '../../configs/configs.service';
import { MySelectItem } from '../../shared/models/my-select-item';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { ScheduleRulesService } from '../schedule-rules.service';
import { zipcodeValidator } from '../shared/validators/zipcode';
import { TransportRulesService } from '../transport-rules.service';
import { phoneValidator } from '../../shared/validators/phone';
import { regexValidator } from '../../shared/validators/regex';
import { lengthValidator } from '../../shared/validators/length';
import { TransportProvidersService } from '../transport-providers.service';
import { transportAvailabilityValidator } from '../shared/validators/transport-availability';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent implements OnInit {
  transportMethods: TransportProvider[];
  transportMethodsDropDown: MySelectItem[];
  transportRules: TransportRule[];
  orderForm: FormGroup;
  order: WorkOrder = new WorkOrder();
  errorMessage: string;
  showErrors = false;
  newOrder = true;
  schedulingRules: ScheduleRule[];
  displayTransportCosts = false;
  displayUserGuide = true;
  engReqToggle = false;
  selectedTransport: number = 0;
  storageKey = 'machete.work-order.component';
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
    'englishRequired': '',
    'englishRequiredNote':  '',
    'transportMethodID': ''
  };



  showDialog() {
      this.displayTransportCosts = true;
  }

  ackUserGuide() {
    this.displayUserGuide = false;
    sessionStorage.setItem(this.storageKey + '.UG', 'false');
  }

  constructor(
    //private lookupsService: LookupsService,
    private transportProviderService: TransportProvidersService, 
    private orderService: WorkOrderService,
    private onlineService: OnlineOrdersService,
    private configsService: ConfigsService,
    private schedulingRulesService: ScheduleRulesService,
    private transportRulesService: TransportRulesService,
    private router: Router,
    private fb: FormBuilder) {
      console.log('.ctor'); 
      let result = sessionStorage.getItem(this.storageKey + '.UG');
      if (result === 'false')
      {
        this.displayUserGuide = false;
      } else {
        this.displayUserGuide = true;
      }
    }

  ngOnInit() {
    this.buildForm();
    Observable.combineLatest(
      //this.lookupsService.getLookups(LCategory.TRANSPORT),
      this.transportProviderService.getTransportProviders(),
      this.orderService.getStream(),
      this.schedulingRulesService.getScheduleRules(),
      this.transportRulesService.getTransportRules()
    ).subscribe(([l, o, s, t]) => {
      this.order = o;
      this.engReqToggle = o.englishRequired;
      this.transportMethods = l;
      this.schedulingRules = s;
      this.transportRules = t;
      // map transport entries to dropdown
      let items = [new MySelectItem('Select transportion', null)];
      let transports = l.map(l =>
        new MySelectItem(l.text, String(l.id)));
      this.transportMethodsDropDown = items.concat(transports);       
      this.buildForm();
    });
  }

  buildForm(): void {
    this.selectedTransport = this.order.transportMethodID;
    this.orderForm = this.fb.group({
      'dateTimeofWork': [this.order.dateTimeofWork, [
        requiredValidator('Date & time is required.'),
        schedulingValidator(this.schedulingRules),
        transportAvailabilityValidator(this.transportMethods),
      ]],
      'contactName': [this.order.contactName, requiredValidator('Contact name is required')],
      'worksiteAddress1': [this.order.worksiteAddress1, [requiredValidator('Address is required'), lengthValidator(50, 'worksiteAddress1')]],
      'worksiteAddress2': [this.order.worksiteAddress2, lengthValidator(50, 'worksiteAddress2'), ],
      'city': [this.order.city, [requiredValidator('City is required.'), lengthValidator(50, 'city')]],
      'state': [this.order.state, [requiredValidator('State is required.'), 
      regexValidator(new RegExp(/^[a-zA-Z]{2,2}$/), 'state', "State must be two letters")]],
      'zipcode': [this.order.zipcode, [
        requiredValidator('Zipcode is required.'),
        zipcodeValidator(this.transportRules)
      ]],
      'phone': [this.order.phone, phoneValidator('Phone is required in ###-###-#### format')],
      'description': [this.order.description, [requiredValidator('Description is required'), lengthValidator(100, 'description')]],
      'englishRequired': [this.order.englishRequired],
      'englishRequiredNote': [this.order.englishRequiredNote, lengthValidator(100, 'englishRequiredNote')],
      'transportMethodID': [this.order.transportMethodID, requiredValidator('A transport method is required'), transportAvailabilityValidator(this.transportMethods)]
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
          if (this.showErrors == true){
            console.log('onValueChanged.error:' + field + ': ' + control.errors[key]);
          }
          this.formErrors[field] += control.errors[key] + ' ';
        }
      }
    }
  }

  save() {
    this.onValueChanged();
    if (this.orderForm.status === 'INVALID') {
      console.log('save: INVALID', this.formErrors)
      this.onlineService.setWorkorderConfirm(false);    
      this.showErrors = true;
      return;
    }
    this.showErrors = false;

    const order = this.prepareOrderForSave();
    this.orderService.save(order);
    this.onlineService.setWorkorderConfirm(true);
    this.newOrder = false;
    this.router.navigate(['/online-orders/work-assignments']);
  }

  prepareOrderForSave(): WorkOrder {
    const formModel = this.orderForm.value;

    const order = new WorkOrder({
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
      englishRequired: formModel.englishRequired,
      englishRequiredNote: formModel.englishRequiredNote,
      transportMethodID: formModel.transportMethodID
    });
    return order;
  }
}
