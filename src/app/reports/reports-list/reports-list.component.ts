import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { ReportsStoreService } from "src/app/shared/services/reports-store.service";
import { Report } from "../models/report";
import { SimpleAggregateRow } from "../models/simple-aggregate-row";
import { ReportsService } from "../reports.service";

@Component({
  selector: "app-reports-list",
  templateUrl: "./reports-list.component.html",
  styleUrls: ["./reports-list.component.css"],
})
export class ReportsListComponent implements OnInit {
  selectedReport: Report;
  reportList$: Observable<Report[]>;

  constructor(
    private router: Router,
    private store: ReportsStoreService
  ) {}

  onRowSelect(e: any) {
    console.log(e);
    this.router.navigate([`/reports/view/${this.selectedReport.name}`]);
  }

  ngOnInit() {
    // view subscribes and unsubscribes via the async pipe
    this.reportList$ = this.store.reports$;
  }
}
