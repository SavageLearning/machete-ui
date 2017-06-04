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
  skills: Lookup[];
  skillsDropDown: MySelectItem[];
  selectedSkill: number;
  workerRequestList: WorkerRequest[];
  errorMessage: string;
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

  selectRequest(request: WorkerRequest) {
  }
}
