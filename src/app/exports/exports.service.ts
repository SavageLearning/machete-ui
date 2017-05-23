import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ExportsService {
  exportList: string[] = new Array<string>();
  exportList$: BehaviorSubject<string[]>;
  constructor(private http: Http) {
    this.initializeDataService();
  }

  initializeDataService() {
    if (!this.exportList$) {
      this.exportList$ = <BehaviorSubject<string[]>> new BehaviorSubject(new Array<string>());
      this.getExportList();
    }
  }

  subscribeToListService(): Observable<string[]> {
    return this.exportList$.asObservable();
  }

  getExportList() {
    let uri = '/api/exports';
    console.log('exportsService.getExportList: ' + uri);
    this.http.get(uri)
      .map(res => res.json().data as string[])
      .catch(this.handleError)
      .subscribe(
        data => {
          this.exportList = data;
          this.exportList$.next(data);
        },
        error => console.log('Error subscribing to DataService: ' + error)
      );
  }
  private handleError(error: any): Promise<any> {
    console.error('ERROR', error);
    return Promise.reject(error.message || error);
  }
}
