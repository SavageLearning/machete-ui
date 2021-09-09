import { Component, Input, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Column } from '../models/column';
import { SimpleAggregateRow } from '../models/simple-aggregate-row';

@Component({
  selector: 'app-report-result',
  templateUrl: `./report-result.component.html`,
  styles: []
})
export class ReportResultComponent implements OnInit {
  @Input() public viewData: SimpleAggregateRow[];
  @Input() public cols: Column[];
  @Input() public exportFileName: string;
  constructor() { }

  ngOnInit(): void {
  }

  getExport(dt: Table) {
    dt.exportFilename =
      this.exportFileName;
    dt.exportCSV({options: [{selectionOnly: false}]});
  }

}
