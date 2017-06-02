import { Component, OnInit } from '@angular/core';
import {MySelectItem} from '../../reports/reports.component';
import {WorkerRequest} from './models/worker-request';

@Component({
  selector: 'app-work-assignments',
  templateUrl: './work-assignments.component.html',
  styleUrls: ['./work-assignments.component.css']
})
export class WorkAssignmentsComponent implements OnInit {
  skillsList: MySelectItem[];
  selectedSkill: number;
  workerRequestList: WorkerRequest[];
  constructor() { }

  ngOnInit() {
  }

  selectRequest(request: WorkerRequest) {
  }
}
