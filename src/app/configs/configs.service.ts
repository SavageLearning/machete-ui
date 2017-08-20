import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Config } from '../shared/models/config';
import { HandleError } from "../shared/handle-error";

@Injectable()
export class ConfigsService {
  uriBase = environment.dataUrl + '/api/lookups';
  constructor(private http: HttpClient) {
  }
  getConfigs(category?: string): Observable<Config[]> {
    let uri = this.uriBase;
    if (category) {
      uri = uri + '?category=' + category;
    }
    return this.http.get(uri)
      .map(res => res['data'] as Config[])
      .catch(HandleError.error);
  }

  getConfig(key: string): Observable<Config> {
    let uri = this.uriBase;
    uri = uri + '?key=' + key;
    return this.http.get(uri)
    .map(res => res['data'] as Config)
    .catch(HandleError.error);
  }
}
