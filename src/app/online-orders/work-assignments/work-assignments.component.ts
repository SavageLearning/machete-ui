import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MySelectItem} from '../../reports/reports.component';
import {WorkerRequest} from './models/worker-request';
import { LookupsService } from '../../lookups/lookups.service';
import { Lookup } from '../../lookups/models/lookup';
import {OnlineOrdersService} from '../online-orders.service';
@Component({
  selector: 'app-work-assignments',
  templateUrl: './work-assignments.component.html',
  styleUrls: ['./work-assignments.component.css']
})
export class WorkAssignmentsComponent implements OnInit {
  skills: Lookup[]; // Lookups from Lookups Service
  skillsDropDown: MySelectItem[];
  selectedSkill: Lookup = new Lookup();
  requestList: WorkerRequest[] = new Array<WorkerRequest>(); // list built by user in UI
  request: WorkerRequest = new WorkerRequest(); // composed by UI to make/edit a request
  selectedRequest: WorkerRequest;
  errorMessage: string;
  newRequest: boolean = true;
  requestForm: FormGroup;
  showErrors: boolean = false;

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
    'wage': {'required': 'wage is required.' },

  };

  constructor(
    private lookupsService: LookupsService,
    private ordersService: OnlineOrdersService,
    private fb: FormBuilder) {
    console.log('work-assignments.component: ' + JSON.stringify(ordersService.getRequests()));
  }

  ngOnInit() {
    this.lookupsService.getLookups('skill')
      .subscribe(
        listData => {
          this.skills = listData;
          this.skillsDropDown = listData.map(l =>
            new MySelectItem(l.text_EN, String(l.id)));
        },
        error => this.errorMessage = <any>error,
        () => console.log('exports.component: ngOnInit onCompleted'));
    this.requestList = this.ordersService.getRequests();
    this.buildForm();
  }

  buildForm(): void {
    this.requestForm = this.fb.group({
      'skillId': [this.request.skillId, Validators.required],
      'skill': [this.request.skill],
      'hours': [this.request.hours, Validators.required],
      'description': [this.request.description],
      'requiresHeavyLifting': [this.request.requiresHeavyLifting],
      'wage': [this.request.wage]
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
    const skill = this.skills.filter(f => f.id === Number(skillId)).shift();
    if (skill === null) {
      throw new Error('Can\'t find selected skill in component\'s list');
    }
    this.selectedSkill = skill;
    this.requestForm.controls['skill'].setValue(skill.text_EN);
    this.requestForm.controls['wage'].setValue(skill.wage);
  }

  editRequest(request: WorkerRequest) {
  }

  deleteRequest(request: WorkerRequest) {
  }

  saveRequest() {
    this.onValueChanged();
    if (this.requestForm.status === 'INVALID') {
      this.showErrors = true;
      return;
    }
    this.showErrors = false;
    const formModel = this.requestForm.value;


    const saveRequest: WorkerRequest = {
      skillId: formModel.skillId,
      skill: formModel.skill,
      hours: formModel.hours,
      description: formModel.description,
      requiresHeavyLifting: formModel.requiresHeavyLifting,
      wage: formModel.wage
    };

    if (this.newRequest) {
      this.ordersService.createRequest(saveRequest);
    } else {
      this.ordersService.saveRequest(saveRequest);
    }

    this.requestList = [...this.ordersService.getRequests()];
    this.requestForm.reset();
    this.newRequest = true;
  }

  onRowSelect(event) {
    this.newRequest = false;
    this.request = this.cloneRequest(event.data);
  }

  cloneRequest(c: WorkerRequest): WorkerRequest {
    let request = new WorkerRequest();
    for (let prop in c) {
      request[prop] = c[prop];
    }
    return request;
  }
}
