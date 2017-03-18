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
  errorMessage: string;

  constructor(private reportsService: ReportsService) {
    this.o = new SearchOptions();
  }

  ngOnInit() {

    this.getView();
  }

  ngOnChanges() {
    console.log(this.o.beginDate);
  }
  getView() {
    this.reportsService.getJobsDispatchedCount(this.o)
      .subscribe(
        data => this.jobsDispatchedCount = data,
        error => this.errorMessage = <any>error);

  }
}
