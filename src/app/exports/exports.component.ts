import { Component, OnInit } from '@angular/core';
import {ExportsService} from './exports.service';
import {Observable} from 'rxjs/Observable';
import {MySelectItem} from '../reports/reports.component';
import { Export } from './models/export';
import {ExportColumn} from './models/export-column';
@Component({
  selector: 'app-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.css'],
  providers: [ExportsService]
})
export class ExportsComponent implements OnInit {
  exports: Export[];
  selectedExportName: string;
  exportsDropDown: MySelectItem[];
  errorMessage: string;
  selectedColumns: ExportColumn[];

  constructor(private exportsService: ExportsService) { }

  ngOnInit() {
    this.exportsService.getExportsList()
      .subscribe(
      listData => {
        this.exports = listData;
        this.exportsDropDown = listData.map(r =>
          new MySelectItem(r.name, r.name));
      },
      error => this.errorMessage = <any>error,
      () => console.log('exports.component: ngOnInit onCompleted'));
  }

  getColumns() {
    this.exportsService.getColumns(this.selectedExportName)
      .subscribe(
        data => {
          this.selectedColumns = data;
        },
        error => this.errorMessage = <any>error,
        () => console.log('exportsService.getColumns completed')
      );
  }
}
