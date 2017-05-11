import {Component, OnInit} from '@angular/core';
import {ReportsService} from './reports.service';
import {SearchOptions } from './models/search-options';
import {SimpleAggregateRow} from './models/simple-aggregate-row';
import {SelectItem} from 'primeng/primeng';
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
  altname: string;
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
    // TODO throw exception
    this.description = this.selectedReport[0].description;
    this.title = this.selectedReport[0].name;
  }

  ngOnInit() {
    this.reports$ = this.reportsService.subscribeToDataService();
    this.reports$.subscribe(
      listData => this.reportsDropDown = listData.map(r => new MySelectItem(r.name, r.id.toString()) as SelectItem),
      error => this.errorMessage = <any>error,
      () => console.log('ngOnInit onCompleted'));
    // this.getList();
    this.getView();
  }

  getView() {
    this.reportsService.getReport(this.selectedReportID.toString(), this.o)
      .subscribe(
        data => this.viewData = data,
        error => this.errorMessage = <any>error,
        () => console.log('getView onCompleted'));
    this.updateDialog();
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

  showDetails() {

  }
}

export class MySelectItem implements SelectItem {
  constructor(public label: string, public value: string) {}
}
