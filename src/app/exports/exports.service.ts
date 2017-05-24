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
  constructor(private http: Http) {
  }
  getExportsList(): Observable<Export[]> {
    let uri = '/api/exports';
    console.log('exportsService.getExportList: ' + uri);
    return this.http.get(uri)
      .map(res => res.json().data as string[])
      .catch(this.handleError);
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
