import {Component, OnInit} from '@angular/core';
import {ReportsService} from "./reports.service";
import { JobsDispatchedCount } from './models/jobs-dispatched-count';
import {SearchOptions } from './models/search-options';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [ReportsService]
})
export class ReportsComponent implements OnInit {
  jobsDispatchedCount: JobsDispatchedCount[];
  o: SearchOptions;
  errorMessage: string;

  constructor(private reportsService: ReportsService) {
    this.o = new SearchOptions();
    console.log("reports.component");

  }

  ngOnInit() {

    this.getView();
  }

  getView() {
    this.reportsService.getJobsDispatchedCount(this.o)
      .subscribe(
        data => this.jobsDispatchedCount = data,
        error => this.errorMessage = <any>error);

  }
}
