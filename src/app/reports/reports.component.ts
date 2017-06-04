import {Component, OnInit} from '@angular/core';
import {ReportsService} from './reports.service';
import {SearchOptions } from './models/search-options';
import {SimpleAggregateRow} from './models/simple-aggregate-row';
import {DataTable, SelectItem} from 'primeng/primeng';
import {Report} from './models/report';
import {Observable} from 'rxjs/Observable';
import {SearchInputs} from './models/search-inputs';
import {Column} from './models/column';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [ReportsService]
})
export class ReportsComponent implements OnInit {
  viewData: SimpleAggregateRow[];
  selectedReportID: string;
  selectedReport: Report;
  title: string;
  name: string;
  description: string;
  o: SearchOptions;
  errorMessage: string;
  reportsDropDown: SelectItem[];
  reports$: Observable<Report[]>;
  displayDescription = false;
  displayDialog = false;
  cols: Column[];
  inputs: SearchInputs;

  constructor(private reportsService: ReportsService) {
    this.o = new SearchOptions();
    this.selectedReport = new Report();
    this.selectedReportID = 'DispatchesByJob';
    // this.title = 'loading';
    // this.description = 'loading...';
    this.o.beginDate = '1/1/2016';
    this.o.endDate = '1/1/2017';
    this.reportsDropDown = [];
    this.reportsDropDown.push({label: 'Select Report', value: null});
    this.inputs = new SearchInputs();
  }

  showDescription() {
    this.updateDescription();
    this.displayDescription = true;
  }

  updateDescription() {
    this.selectedReport = this.reportsService.reportList.filter(x => x.name === this.selectedReportID)[0];
    // TODO catch exception if not found
    this.description = this.selectedReport.description;
    this.title = this.selectedReport.title || this.selectedReport.commonName;
    this.name = this.selectedReport.name;
    this.cols = this.selectedReport.columns.filter(a => a.visible === true);
    this.inputs = <SearchInputs>this.selectedReport.inputs;
  }

  ngOnInit() {
    this.reports$ = this.reportsService.subscribeToDataService();
    this.reports$.subscribe(
      listData => {
        this.reportsDropDown = listData.map(r => new MySelectItem(r.commonName, r.name) as SelectItem);
        this.getView();
      },
      error => this.errorMessage = <any>error,
      () => console.log('ngOnInit onCompleted'));

  }
  getView() {
    this.reportsService.getReportData(this.selectedReportID.toString(), this.o)
      .subscribe(
        data => {
          this.viewData = data;
          this.updateDescription();
        },
        error => this.errorMessage = <any>error,
        () => console.log('getView onCompleted'));
  }
  // getList() {
  //   this.reportsService.getReportList();
  //   console.log('getList called');
  // }

  getExport(dt: DataTable) {
    dt.exportFilename = this.name + '_' + this.o.beginDate.toString() + '_to_' + this.o.endDate.toString();
    dt.exportCSV();
  }
}

export class MySelectItem implements SelectItem {
  constructor(public label: string, public value: string) {}
}
