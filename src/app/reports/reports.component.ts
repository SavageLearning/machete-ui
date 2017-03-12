import { Component, OnInit } from '@angular/core';
import {ReportsService} from "./reports.service";
import { JobsDispatchedCount } from './models/jobs-dispatched-count'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [ReportsService]
})
export class ReportsComponent implements OnInit {
  jobsDispatchedCount: JobsDispatchedCount[];
  beginDate: Date;
  endDate: Date;

  constructor(private reportsService: ReportsService) {}

  ngOnInit() {
    this.reportsService.getJobsDispatchedCount()
      .then(data => this.jobsDispatchedCount = data);
  }

}
