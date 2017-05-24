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
  dateFilterDropDown: MySelectItem[];
  exportsDropDown: MySelectItem[];
  errorMessage: string;
  selectedColumns: ExportColumn[];
  selectedExportName: string;
  selectedDateFilter: string;

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
          this.dateFilterDropDown = data.filter(f => f.system_type_name === 'datetime')
            .map(r =>
              new MySelectItem(r.name, r.name));
        },
        error => this.errorMessage = <any>error,
        () => console.log('exportsService.getColumns completed')
      );
  }
}
