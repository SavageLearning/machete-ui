import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { filter, first } from "rxjs/operators";
import { ReportsService } from "src/app/reports/reports.service";
import { Report } from "../models/report";

@Component({
  selector: "app-reports-list",
  templateUrl: "./reports-list.component.html",
  styleUrls: ["./reports-list.component.css"],
})
export class ReportsListComponent implements OnInit {
  selectedReport: Report;
  reportList$: Observable<Report[]>;
  public excludeCols: string[] = [
    "id",
    "subcategory",
    "name",
    "title",
    "inputs",
    "columns",
    "sqlquery",
    "inputsJson",
    "columnsJson",
  ];

  public colOrder: string[] = ["commonName"];

  constructor(private router: Router, private store: ReportsService) {}

  async onRowSelect(e: Report): Promise<void> {
    await this.router.navigate([`/reports/view/${e.name}`]);
  }

  ngOnInit(): void {
    // view subscribes and unsubscribes via the async pipe
    this.reportList$ = this.store.reports$.pipe(
      filter((x) => x.length !== 0 || !x),
      first()
    );
  }
}
