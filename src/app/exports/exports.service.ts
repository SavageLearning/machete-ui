import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Response, RequestOptions, ResponseContentType, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
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
    return this.http.get(this.uriBase)
      .map(res => res['data'] as string[])
      .catch(this.handleError);
  }

  getColumns(tableName: string): Observable<ExportColumn[]> {

    let uri = this.uriBase + '/' + tableName.toLowerCase();
    console.log('getColumns ', uri);
    return this.http.get(uri)
      .map(res => res['data'] as ExportColumn[])
      .catch(this.handleError);
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
    return this.http.get(uri)
      .map((res: Response) => {
        return res;
    });
  }

  private handleError(error: any): Observable<any> {
    console.error('exports.service.handleError:', JSON.stringify(error));
    return Observable.of(error);
  }

  public encodeData(data: any): string {
    return Object.keys(data).map((key) => {
      return [key, data[key]].map(encodeURIComponent).join('=');
    }).join('&');
  }
}
