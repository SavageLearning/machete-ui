import { Component, OnInit } from '@angular/core';
import {MySelectItem} from '../../reports/reports.component';
import {WorkerRequest} from './models/worker-request';
import { LookupsService } from '../../lookups/lookups.service';
import { Lookup } from '../../lookups/models/lookup';
@Component({
  selector: 'app-work-assignments',
  templateUrl: './work-assignments.component.html',
  styleUrls: ['./work-assignments.component.css'],
  providers: [ LookupsService ]
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
  constructor(private lookupsService: LookupsService) {

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
  }

  selectSkill(skillId: number) {
    const skill = this.skills.filter(f => f.id === Number(skillId)).shift();
    if (skill === null) {
      throw new Error('Can\'t find selected skill in component\'s list');
    }
    this.selectedSkill = skill;
    this.request.skill = skill.text_EN;
    this.request.wage = skill.wage;
  }

  editRequest(request: WorkerRequest) {
  }

  deleteRequest(request: WorkerRequest) {
  }

  saveRequest() {
    let requests = [...this.requestList];
    if (this.newRequest) {
      requests.push(this.request); //   cars.push(this.car);
    } else {
      requests[this.findSelectedRequestIndex()] = this.request;
    }

    this.requestList = requests; // this.cars = cars;
    this.request = new WorkerRequest(); // this.car = null;
    this.newRequest = true;
  }

  findSelectedRequestIndex(): number {
    return this.requestList.indexOf(this.selectedRequest);
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
