import {Component, OnInit} from '@angular/core';
import {ReportsService} from './reports.service';
import {SearchOptions } from './models/search-options';
import {SimpleAggregateRow} from './models/simple-aggregate-row';
import {SelectItem} from 'primeng/primeng';
import {Report} from './models/report';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [ReportsService]
})
export class ReportsComponent implements OnInit {
  data: SimpleAggregateRow[];
  selectedReport: string;
  o: SearchOptions;
  errorMessage: string;
  reports: SelectItem[];

  constructor(private reportsService: ReportsService) {
    this.o = new SearchOptions();
    this.selectedReport = '1';
    this.o.beginDate = '1/1/2017';
    this.o.endDate = '3/1/2017';
    this.reports = [];
    this.reports.push({label: 'Select Report', value: null});
  }

  ngOnInit() {
    // this.getList();
    // this.getView();
  }

  getView() {
    this.reportsService.getReport(this.selectedReport, this.o)
      .subscribe(
        data => this.data = data,
        error => this.errorMessage = <any>error);
  }
  getList() {
    this.reportsService.getList()
      .subscribe(
        data => this.reports = data.map(r => new MySelectItem(r.name, r.id.toString()) as SelectItem),
        error => this.errorMessage = <any>error);
  }
}

export class MySelectItem implements SelectItem {
  constructor(public label: string, public value: string) {}
}
