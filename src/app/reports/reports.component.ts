import {Component, OnInit} from '@angular/core';
import {ReportsService} from './reports.service';
import {SearchOptions } from './models/search-options';
import {SimpleAggregateRow} from './models/simple-aggregate-row';
import {DataTable, SelectItem} from 'primeng/primeng';
import {Report} from './models/report';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [ReportsService]
})
export class ReportsComponent implements OnInit {
  viewData: SimpleAggregateRow[];
  selectedReportID: string;
  selectedReport: Report[];
  title: string;
  name: string;
  description: string;
  headerLabel: string;
  headerValue: string;
  o: SearchOptions;
  errorMessage: string;
  reportsDropDown: SelectItem[];
  reports$: Observable<Report[]>;
  display = false;

  constructor(private reportsService: ReportsService) {
    this.o = new SearchOptions();
    this.selectedReportID = '1';
    this.title = 'loading';
    this.description = 'loading...';
    this.headerLabel = 'loading...';
    this.headerValue = 'loading...';
    this.o.beginDate = '1/1/2016';
    this.o.endDate = '1/1/2017';
    this.reportsDropDown = [];
    this.reportsDropDown.push({label: 'Select Report', value: null});
  }

  showDialog() {
    this.updateDialog();
    this.display = true;
  }

  updateDialog() {
    this.selectedReport = this.reportsService.listData.filter(x => x.id === Number(this.selectedReportID));
    // TODO catch exception if not found
    this.description = this.selectedReport[0].description;
    this.title = this.selectedReport[0].title || this.selectedReport[0].commonName;
    const foo = JSON.parse(this.selectedReport[0].columnLabelsJson);
    this.headerLabel = foo.label;
    this.headerValue = foo.value;
    this.name = this.selectedReport[0].name;
  }

  ngOnInit() {
    this.reports$ = this.reportsService.subscribeToDataService();
    this.reports$.subscribe(
      listData => this.reportsDropDown = listData.map(r => new MySelectItem(r.commonName, r.id.toString()) as SelectItem),
      error => this.errorMessage = <any>error,
      () => console.log('ngOnInit onCompleted'));
    this.getView();
  }
  getView() {
    this.reportsService.getReport(this.selectedReportID.toString(), this.o)
      .subscribe(
        data => {
          this.viewData = data;
          this.updateDialog();
        },
        error => this.errorMessage = <any>error,
        () => console.log('getView onCompleted'));
  }
  getList() {
    this.reportsService.getList();
    console.log('getList called');
      // .subscribe(
      //   data => this.reports = data,
      //   // data => this.reportsDropDown = data.map(r => new MySelectItem(r.name, r.id.toString()) as SelectItem),
      //   error => this.errorMessage = <any>error,
      //   () => console.log('getList onCompleted'));
    // this.reportsService.getList()
    //   .subscribe(
    //     data => this.reports = data,
    //     error => this.errorMessage = <any>error,
    //     () => console.log('getList onCompleted')
    //   );
  }

  getExport(dt: DataTable) {
    dt.exportFilename = this.name + '_' + this.o.beginDate.toString() + '_to_' + this.o.endDate.toString();
    dt.exportCSV();
  }
}

export class MySelectItem implements SelectItem {
  constructor(public label: string, public value: string) {}
}
