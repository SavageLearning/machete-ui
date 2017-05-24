import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Export } from './models/export';
import {ExportColumn} from './models/export-column';
@Injectable()
export class ExportsService {
  exportsList: Export[] = new Array<Export>();
  exportsList$: BehaviorSubject<Export[]>;
  constructor(private http: Http) {
    this.initializeDataService();
  }

  initializeDataService() {
    if (!this.exportsList$) {
      this.exportsList$ = <BehaviorSubject<Export[]>> new BehaviorSubject(new Array<Export>());
      this.getExportsList();
    }
  }

  subscribeToListService(): Observable<Export[]> {
    return this.exportsList$.asObservable();
  }

  getExportsList() {
    let uri = '/api/exports';
    console.log('exportsService.getExportList: ' + uri);
    this.http.get(uri)
      .map(res => res.json().data as string[])
      .catch(this.handleError)
      .subscribe(
        data => {
          this.exportsList = data;
          this.exportsList$.next(data);
        },
        error => console.log('Error subscribing to DataService: ' + error)
      );
  }

  getColumns(tableName: string): Observable<ExportColumn[]> {

    let uri = '/api/exports/' + tableName.toLowerCase();
    console.log('exportsService.getColumns ' + uri);
    return this.http.get(uri)
      .map(res => res.json().data as ExportColumn[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('ERROR', error);
    return Promise.reject(error.message || error);
  }
}
