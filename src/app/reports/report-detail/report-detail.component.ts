import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Report } from "../models/report";
import { SearchOptions } from "../models/search-options";
import { SimpleAggregateRow } from "../models/simple-aggregate-row";
import { ReportsService } from "../reports.service";
import { Observable } from "rxjs";

import { takeWhile } from "rxjs/operators";
import { IConfirmActionData } from "src/app/shared/components/record-control/record-control.component";

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
  reportCreate?: Report = new Report();
  o: SearchOptions;
  viewData$: Observable<SimpleAggregateRow[]>;
  loadingRecord = true;
  sqlEditorState: SqlEditorState = SqlEditorState.CLOSED;
  validate: string;
  calYearRange: string;
  displayCreateForm = false;
  deleteConfirmActionData: IConfirmActionData;
  saving = false;
  private alive = true;

  constructor(
    private route: ActivatedRoute,
    private reportsService: ReportsService
  ) {}

  getReportDefinition(): void {
    const report$ = this.reportsService.getReport(this.routeReportID);
    report$.pipe(takeWhile(() => this.alive)).subscribe((data) => {
      this.report = data;
      this.loadingRecord = false;
    });
  }

  getReportData(): void {
    // no need to unsubscribe as it uses async pipe
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.viewData$ = this.reportsService.getReportData(
      this.report.name.toString(),
      this.o
    );
  }

  // child component emits event
  onDoneWithSql(sql: string): void {
    this.report.sqlquery = sql;
  }
  onStartEditSql(sqlEditorState: SqlEditorState): void {
    this.sqlEditorState = sqlEditorState;
  }

  disableSave = (): boolean =>
    this.sqlEditorState !== SqlEditorState.CLOSED || this.saving;

  get exportFileName(): string {
    return `${this.report.name}${this.o.beginDate}${this.o.endDate}`;
  }

  save(): void {
    this.saving = true;
    this.reportsService.update(this.report).subscribe(
      (res) => {
        this.report = res;
        this.saving = false;
      },
      () => (this.saving = false)
    );
  }

  onChildRecordControlCreate(createFromEvent: boolean): void {
    // this triggers child component to display create form
    this.displayCreateForm = createFromEvent;
  }

  /*
   * Child component creates record and passes new record from API here
   */
  onNewRecord($event: Report): void {
    this.report = $event;
  }

  ngOnInit(): void {
    // set cal year range
    const today = new Date();
    this.calYearRange = `2000:${today.getFullYear() + 1}`;
    // other vars
    const now = new Date();
    const aYearAgo = new Date();
    aYearAgo.setFullYear(now.getFullYear() - 1);
    this.o = new SearchOptions();
    this.o.endDate = now.toLocaleDateString();
    this.o.beginDate = aYearAgo.toLocaleDateString();

    // load data
    this.routeReportID = this.route.snapshot.paramMap.get("id");
    this.getReportDefinition();

    // set delete confirm action
    this.deleteConfirmActionData = {
      message: `Are you sure you want to delete?`,
      header: "Confirm Delete",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.reportsService
          .delete(this.report.name, "reports")
          .pipe(takeWhile(() => this.alive))
          .subscribe(() => (this.report = new Report()));
      },
    };
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
