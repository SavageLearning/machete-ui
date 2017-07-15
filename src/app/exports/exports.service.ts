import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Headers, Response, RequestOptions, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Export } from './models/export';
import {ExportColumn} from './models/export-column';
import {SearchOptions} from '../reports/models/search-options';
import {AuthService} from '../shared/services/auth.service';
import {environment} from '../../environments/environment';
@Injectable()
export class ExportsService {
  uriBase = environment.dataUrl + '/api/exports';
  constructor(private auth: AuthService) {
  }
  getExportsList(): Observable<Export[]> {

    console.log('exportsService.getExportList: ' + this.uriBase);
    return this.auth.AuthGet(this.uriBase)
      .map(res => res.json().data as string[])
      .catch(this.handleError);
  }

  getColumns(tableName: string): Observable<ExportColumn[]> {

    let uri = this.uriBase + '/' + tableName.toLowerCase();
    console.log('exportsService.getColumns ' + uri);
    return this.auth.AuthGet(uri)
      .map(res => res.json().data as ExportColumn[])
      .catch(this.handleError);
  }

  getExport(tableName: string, o: SearchOptions): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/text' });
    let options = new RequestOptions({
      headers: headers,
      responseType: ResponseContentType.Blob
    });
    let params = this.encodeData(o);
    console.log('exportsService.getExport: ' + JSON.stringify(params));
    //const uri = this.uriBase + '/' + tableName.toLowerCase();
    const uri = this.uriBase + '/' + tableName + '/execute?' + params;
    return this.auth.AuthGet(uri, options)
      .map((res: Response) => {
        return res;
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('ERROR', error);
    return Promise.reject(error.message || error);
  }

  public encodeData(data: any): string {
    return Object.keys(data).map((key) => {
      return [key, data[key]].map(encodeURIComponent).join('=');
    }).join('&');
  }
}
