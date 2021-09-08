import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Report } from "../models/report";
import { SearchOptions } from "../models/search-options";
import { SimpleAggregateRow } from "../models/simple-aggregate-row";
import { ReportsService } from "../reports.service";
import { Table } from "primeng/table";
import { Observable } from "rxjs";
import { ReportsStoreService } from "src/app/shared/services/reports-store.service";

export enum SqlEditorState {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export class SqlReportError {
  errorName: string;
  errorDetails: string;
}

@Component({
  selector: "app-report-detail",
  templateUrl: "./report-detail.component.html",
  styleUrls: ["./report-detail.component.css"],
})
export class ReportDetailComponent implements OnInit, OnDestroy {
  routeReportID: string;
  report?: Report = null;
  o: SearchOptions;
  viewData$: Observable<SimpleAggregateRow[]>;
  loadingRecord: boolean = true;
  sqlEditorState: SqlEditorState = SqlEditorState.CLOSED;
  validate: string;
  calYearRange: string;
  originalReportName: string;

  constructor(
    private route: ActivatedRoute,
    private reportsService: ReportsService,
    private store: ReportsStoreService
  ) {}

  getReportDefinition() {
    let report$ = this.store.getReport(this.routeReportID);
    report$.subscribe(
      (data) => {
        this.report = data as Report;
        this.loadingRecord = false;
      }
    );
  }

  getReportData() {
    this.viewData$ = this.reportsService.getReportData(this.report.name.toString(), this.o);
  }

  // child component emits event
  onDoneWithSql(sql: string) {
    this.report.sqlquery = sql;
  }
  onStartEditSql(sqlEditorState: SqlEditorState) {
    this.sqlEditorState = sqlEditorState;
  }

  disableSave = (): boolean => this.sqlEditorState !== SqlEditorState.CLOSED;

  getExport(dt: Table) {
    dt.exportFilename =
      this.report.name +
      "_" +
      this.o.beginDate.toString() +
      "_to_" +
      this.o.endDate.toString();
    dt.exportCSV({options: [{selectionOnly: false}]});
  }

  save() {
    this.store.update(this.report).subscribe(res => this.report = res);
  }

  onChildRecordControlDelete(id: number) {
    this.reportsService
      .delete(this.report.id == id ? this.report.name : '', 'reports')
      .subscribe();
  }

  ngOnInit(): void {
    // set cal year range
    const today = new Date();
    this.calYearRange = `2000:${today.getFullYear() + 1}`
    // other vars
    let now = new Date();
    let aYearAgo = new Date();
    aYearAgo.setFullYear(now.getFullYear() - 1);
    this.o = new SearchOptions();
    this.o.endDate = now.toLocaleDateString();
    this.o.beginDate = aYearAgo.toLocaleDateString();

    // load data
    this.routeReportID = this.route.snapshot.paramMap.get("id");
    this.getReportDefinition();    
  }

  ngOnDestroy(): void {
    // !! todo unsubscribe
  }

}
