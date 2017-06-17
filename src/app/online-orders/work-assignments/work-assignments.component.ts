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
    'wage': {'required': 'wage is required.' }
  };

  constructor(
    private lookupsService: LookupsService,
    private ordersService: OnlineOrdersService,
    private fb: FormBuilder) {
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
        () => console.log('work-assignments.component: ngOnInit onCompleted'));
    this.requestList = this.ordersService.getRequests();
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
    const skill = this.skills.filter(f => f.id === Number(skillId)).shift();
    if (skill === null) {
      throw new Error('Can\'t find selected skill in component\'s list');
    }
    this.selectedSkill = skill;
    this.requestForm.controls['skill'].setValue(skill.text_EN);
    this.requestForm.controls['wage'].setValue(skill.wage);
  }

  editRequest(request: WorkerRequest) {
    this.requestForm.controls['id'].setValue(request.id);
    this.requestForm.controls['skillId'].setValue(request.skillId);
    this.requestForm.controls['skill'].setValue(request.skill);
    this.requestForm.controls['hours'].setValue(request.hours);
    this.requestForm.controls['description'].setValue(request.description);
    this.requestForm.controls['requiresHeavyLifting'].setValue(request.requiresHeavyLifting);
    this.requestForm.controls['wage'].setValue(request.wage);
    this.newRequest = false;
  }

  deleteRequest(request: WorkerRequest) {
    this.ordersService.deleteRequest(request);
    this.requestList = [...this.ordersService.getRequests()];
    this.requestForm.reset();
    this.newRequest = true;
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
      id: formModel.id || this.ordersService.getNextRequestId(),
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
    this.buildForm();
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
