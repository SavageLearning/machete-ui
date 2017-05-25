import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Http, Headers, Response, RequestOptions, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Export } from './models/export';
import {ExportColumn} from './models/export-column';
@Injectable()
export class ExportsService {
  uriBase = '/api/exports';
  constructor(private http: Http) {
  }
  getExportsList(): Observable<Export[]> {

    console.log('exportsService.getExportList: ' + this.uriBase);
    return this.http.get(this.uriBase)
      .map(res => res.json().data as string[])
      .catch(this.handleError);
  }

  getColumns(tableName: string): Observable<ExportColumn[]> {

    let uri = this.uriBase + '/' + tableName.toLowerCase();
    console.log('exportsService.getColumns ' + uri);
    return this.http.get(uri)
      .map(res => res.json().data as ExportColumn[])
      .catch(this.handleError);
  }

  postExport(columnDetails: string): Observable<Blob> {
    let headers = new Headers({ 'Content-Type': 'application/text' });
    let options = new RequestOptions({
      headers: headers,
      responseType: ResponseContentType.Blob
    });
    console.log('exportsService.postExport: ' + JSON.stringify(columnDetails));

    return this.http.post(this.uriBase, { columnDetails }, options)
      .map((res: Response) => res['_body']);
  }

  private handleError(error: any): Promise<any> {
    console.error('ERROR', error);
    return Promise.reject(error.message || error);
  }
}
