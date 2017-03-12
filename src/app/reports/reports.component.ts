import {Component, OnInit, OnChanges} from '@angular/core';
import {ReportsService} from "./reports.service";
import { JobsDispatchedCount } from './models/jobs-dispatched-count';
import {SearchOptions } from './models/search-options';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [ReportsService]
})
export class ReportsComponent implements OnInit, OnChanges {
  jobsDispatchedCount: JobsDispatchedCount[];
  o: SearchOptions;

  constructor(private reportsService: ReportsService) {
    this.o = new SearchOptions();
  }

  ngOnInit() {
    this.reportsService.getJobsDispatchedCount()
      .then(data => this.jobsDispatchedCount = data);
  }

  ngOnChanges() {
    console.log(this.o.beginDate);
  }

}
