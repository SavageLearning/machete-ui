
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';


import {Headers, Response, RequestOptions, ResponseContentType, Http} from '@angular/http';
import {Observable} from 'rxjs';
import { Export } from './models/export';
import {ExportColumn} from './models/export-column';
import {SearchOptions} from '../reports/models/search-options';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ExportsService {
  uriBase = environment.dataUrl + '/api/exports';
  constructor(private http: HttpClient) {
  }
  getExportsList(): Observable<Export[]> {

    console.log('getExportList: ', this.uriBase);
    return this.http.get(this.uriBase).pipe(
      map(res => res['data'] as Export[]));
  }

  getColumns(tableName: string): Observable<ExportColumn[]> {

    let uri = this.uriBase + '/' + tableName.toLowerCase();
    console.log('getColumns ', uri);
    return this.http.get(uri).pipe(
      map(res => res['data'] as ExportColumn[]));
  }

  getExport(tableName: string, o: SearchOptions): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/text' });
    let options = new RequestOptions({
      headers: headers,
      responseType: ResponseContentType.Blob
    });
    let params = this.encodeData(o);
    console.log('getExport: ', params);
    //const uri = this.uriBase + '/' + tableName.toLowerCase();
    const uri = this.uriBase + '/' + tableName + '/execute?' + params;
    return this.http.get(uri).pipe(
      map((res: Response) => {
        return res;
    }));
  }

  public encodeData(data: any): string {
    return Object.keys(data).map((key) => {
      return [key, data[key]].map(encodeURIComponent).join('=');
    }).join('&');
  }
}
