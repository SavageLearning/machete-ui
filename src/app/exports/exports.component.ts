import { Component, OnInit } from '@angular/core';
import {ExportsService} from './exports.service';
import {Observable} from 'rxjs/Observable';
import {MySelectItem} from '../reports/reports.component';

@Component({
  selector: 'app-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.css'],
  providers: [ExportsService]
})
export class ExportsComponent implements OnInit {
  exports$: Observable<string[]>;
  exports: string[];
  selectedExport: string;
  exportsDropDown: MySelectItem[];
  errorMessage: string;

  constructor(private exportsService: ExportsService) { }

  ngOnInit() {
    this.exports$ = this.exportsService.subscribeToListService();
    this.exports$.subscribe(
      listData => {
        this.exports = listData;
        this.exportsDropDown = listData.map(r => new MySelectItem(r, r));
      },
      error => this.errorMessage = <any>error,
      () => console.log('exports.component: ngOnInit onCompleted'));
  }

  getExportList() {
    this.exportsService.getExportList();
  }
}
