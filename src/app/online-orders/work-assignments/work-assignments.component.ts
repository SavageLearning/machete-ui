import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MySelectItem} from '../../reports/reports.component';
import {WorkAssignment} from './models/work-assignment';
import { LookupsService } from '../../lookups/lookups.service';
import { Lookup } from '../../lookups/models/lookup';
import {OnlineOrdersService} from '../online-orders.service';
import { WorkAssignmentsService } from './work-assignments.service';
import { Log } from "oidc-client";
import { WorkOrderService } from "../work-order/work-order.service";
import { TransportRule } from "../shared";
@Component({
  selector: 'app-work-assignments',
  templateUrl: './work-assignments.component.html',
  styleUrls: ['./work-assignments.component.css']
})
export class WorkAssignmentsComponent implements OnInit {
  skills: Lookup[]; // Lookups from Lookups Service
  transports: Lookup[];
  skillsDropDown: MySelectItem[];
  selectedSkill: Lookup = new Lookup();
  requestList: WorkAssignment[] = new Array<WorkAssignment>(); // list built by user in UI
  request: WorkAssignment = new WorkAssignment(); // composed by UI to make/edit a request
  selectedRequest: WorkAssignment;
  errorMessage: string;
  newRequest = true;
  requestForm: FormGroup;
  showErrors = false;
  transportRules: TransportRule[];
  formErrors = {
    'skillId': '',
    'skill': '',
    'hours': '',
    'description': '',
    'requiresHeavyLifting': '',
    'wage': ''
  };

  validationMessages = {
    'skillId': {'required': 'Please select the type of work to be performed.' },
    'skill': { 'required': 'skill is required.' },
    'hours': {'required': 'Please enter the number of hours needed.' },
    'description': {'required': 'description is required.' },
    'requiresHeavyLifting': {'required': 'requiresHeavyLifting is required.' },
    'wage': {'required': 'wage is required.' }
  };

  constructor(
    private lookupsService: LookupsService,
    private orderService: WorkOrderService,
    private waService: WorkAssignmentsService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    // waService.transportRules could fail under race conditions
    this.waService.getTransportRules()
      .subscribe(
        data => this.transportRules = data,
        error => Log.error('work-assignments.component.ngOnInit.getTransportRules.error' + error),
        () => console.log('work-assignments.component: ngOnInit:getTransportRules onCompleted'));
        
    this.lookupsService.getLookups('skill')
      .subscribe(
        listData => {
          this.skills = listData;
          this.skillsDropDown = listData.map(l =>
            new MySelectItem(l.text_EN, String(l.id)));
        },
        error => this.errorMessage = <any>error,
        () => console.log('work-assignments.component: ngOnInit:skills onCompleted'));
    this.lookupsService.getLookups('transportmethod')
    .subscribe(
      listData => {
        this.transports = listData;
      },
      error => this.errorMessage = <any>error,
      () => console.log('work-assignments.component: ngOnInit:transports onCompleted'));
    this.requestList = this.waService.getAll();
    this.buildForm();
  }

  buildForm(): void {
    this.requestForm = this.fb.group({
      'id': '',
      'skillId': ['', Validators.required],
      'skill': [''],
      'hours': ['', Validators.required],
      'description': [''],
      'requiresHeavyLifting': [false, Validators.required],
      'wage': ['', Validators.required]
    });

    this.requestForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    const form = this.requestForm;

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

  selectSkill(skillId: number) {
    Log.info('work-assignment.component.selectSkill.skillId:' + String(skillId));
    const skill = this.skills.filter(f => f.id === Number(skillId)).shift();
    if (skill === null || skill === undefined) {
      throw new Error('Can\'t find selected skill in component\'s list');
    }
    this.selectedSkill = skill;
    this.requestForm.controls['skill'].setValue(skill.text_EN);
    this.requestForm.controls['wage'].setValue(skill.wage);
  }

  editRequest(request: WorkAssignment) {
    this.requestForm.controls['id'].setValue(request.id);
    this.requestForm.controls['skillId'].setValue(request.skillId);
    this.requestForm.controls['skill'].setValue(request.skill);
    this.requestForm.controls['hours'].setValue(request.hours);
    this.requestForm.controls['description'].setValue(request.description);
    this.requestForm.controls['requiresHeavyLifting'].setValue(request.requiresHeavyLifting);
    this.requestForm.controls['wage'].setValue(request.wage);
    this.newRequest = false;
  }

  deleteRequest(request: WorkAssignment) {
    this.waService.delete(request);
    this.requestList = [...this.waService.getAll()];
    this.requestForm.reset();
    this.newRequest = true;
  }

  calculateTransportCost(id: number): number {
    const order = this.orderService.get();
    const lookup: Lookup = this.transports.find(f => f.id == order.transportMethodID);
    const rule = this.transportRules.filter(f => f.lookupKey == lookup.key)
                  .find(f => f.zipcodes.includes(Number(order.zipcode)));

    return rule.costRules.find(r => id > r.minWorker && id <= r.maxWorker).cost;
  }

  refreshRequests() {
    for (let r of this.waService.getAll()) {
      r.transportCost = this.calculateTransportCost(r.id);
    }
  }

  compactRequestIds() {
    let i = 0;
    for (let r of this.waService.getAll().sort(WorkAssignment.sort)) {
      i++;
      r.id = i;
    }
  }

  saveRequest() {
    this.onValueChanged();
    if (this.requestForm.status === 'INVALID') {
      this.showErrors = true;
      return;
    }
    this.showErrors = false;
    const formModel = this.requestForm.value;

    const saveRequest: WorkAssignment = {
      id: formModel.id || this.waService.getNextRequestId(),
      skillId: formModel.skillId,
      skill: formModel.skill,
      hours: formModel.hours,
      description: formModel.description,
      requiresHeavyLifting: formModel.requiresHeavyLifting,
      wage: formModel.wage,
      transportCost: this.calculateTransportCost(
        formModel.id || this.waService.getNextRequestId())
    };

    this.waService.save(saveRequest);
    this.requestList = [...this.waService.getAll()];
    this.requestForm.reset();
    this.buildForm();
    this.newRequest = true;
  }

  onRowSelect(event) {
    this.newRequest = false;
    this.request = this.cloneRequest(event.data);
  }

  cloneRequest(c: WorkAssignment): WorkAssignment {
    let request = new WorkAssignment();
    for (let prop in c) {
      request[prop] = c[prop];
    }
    return request;
  }
}
