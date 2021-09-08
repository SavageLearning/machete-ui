import { Component, Input, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
  }

}
