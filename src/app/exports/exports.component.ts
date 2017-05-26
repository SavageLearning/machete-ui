import { Component, OnInit } from '@angular/core';
import {ExportsService} from './exports.service';
import {MySelectItem} from '../reports/reports.component';
import { Export } from './models/export';
import {ExportColumn} from './models/export-column';
import {Http, Headers, Response, RequestOptions, ResponseContentType} from '@angular/http';
import { saveAs } from 'file-saver';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {SearchOptions} from '../reports/models/search-options';
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
  selectedStartDate: string;
  selectedEndDate: string;
  form: FormGroup;

  constructor(private exportsService: ExportsService, private _fb: FormBuilder)
  {
    this.form = new FormGroup({});
  }

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
          const group: any = {};
          data.forEach(col => {
            group[col.name] = new FormControl(true);
          });
          this.form = new FormGroup(group);
        },
        error => this.errorMessage = <any>error,
        () => console.log('exportsService.getColumns completed')
      );
  }

  onSubmit()
  {
    let data = Object.assign( {
      beginDate: this.selectedStartDate,
      endDate: this.selectedEndDate,
      filterField: this.selectedDateFilter
    }, this.form.value);
    console.log(this.form.value);
    this.exportsService.getExport(this.selectedExportName, data)
      .subscribe((res: Response) => {
        this.downloadFile(res['_body'].data,
          res.headers.get('filename'),
          res.headers.get('ContentType'));
      }
      ),
      error => this.errorMessage = <any>error,
      () => console.log('exportsService.getColumns completed');
  }

  downloadFile(data: any, fileName: string, ttype: string) {
    const blob = new Blob([data], {type: ttype});
    // const url = window.URL.createObjectURL(blob);
    saveAs(blob, fileName);
    // window.open(url);
  }
}
