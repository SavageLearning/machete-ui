import {Component, OnInit} from '@angular/core';
import {ReportsService} from './reports.service';
import { Report } from './models/report';
import {SearchOptions } from './models/search-options';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [ReportsService]
})
export class ReportsComponent implements OnInit {
  report: Report;
  o: SearchOptions;
  errorMessage: string;

  constructor(private reportsService: ReportsService) {
    this.o = new SearchOptions();
    this.report = new Report();
  }

  ngOnInit() {
    this.getView();
  }

  getView() {
    this.o.reportName = 'JobsDispatched';
    this.reportsService.getReport(this.o)
      .subscribe(
        data => this.report = data,
        error => this.errorMessage = <any>error);
  }
}
