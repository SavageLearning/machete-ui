import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ExportColumn } from './models/export-column';
@Component({
  selector: 'exports-options',
  templateUrl: './exports-options.component.html',
  styleUrls: ['./exports-options.component.css']
})
export class ExportsOptionsComponent implements OnInit {
  @Input() columns: ExportColumn[] = [];
  constructor() { }

  ngOnInit() {
  }

}
