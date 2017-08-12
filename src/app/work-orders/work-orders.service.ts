import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { WorkOrder } from '../shared/models/work-order';
import { HandleError } from '../shared/handle-error';
@Injectable()
export class WorkOrdersService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<WorkOrder[]> {
    let uri = environment.dataUrl + '/api/workorders';

    return this.http.get(uri)
      .map(o => o['data'] as WorkOrder[])
      .catch(HandleError.error);
  }
}
