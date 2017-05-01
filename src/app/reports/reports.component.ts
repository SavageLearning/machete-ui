import {Component, OnInit} from '@angular/core';
import {ReportsService} from './reports.service';
import { Report } from './models/report';
import {SearchOptions } from './models/search-options';
import {SimpleAggregateRow} from './models/simple-aggregate-row';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [ReportsService]
})
export class ReportsComponent implements OnInit {
  data: SimpleAggregateRow[];
  id: string;
  o: SearchOptions;
  errorMessage: string;

  constructor(private reportsService: ReportsService) {
    this.o = new SearchOptions();
  }

  ngOnInit() {
    this.getView();
  }

  getView() {
    this.reportsService.getReport(this.id, this.o)
      .subscribe(
        data => this.data = data,
        error => this.errorMessage = <any>error);
  }
}
