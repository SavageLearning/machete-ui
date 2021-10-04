/* eslint-disable arrow-body-style */

import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";

// TODO @angular/http should be deprecated, need to find @angular/common/http equivalents
import { Observable } from "rxjs";
import { Export } from "./models/export";
import { ExportColumn } from "./models/export-column";
import { SearchOptions } from "../reports/models/search-options";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ExportsService {
  uriBase = environment.dataUrl + "/api/exports";
  constructor(private http: HttpClient) {}
  getExportsList(): Observable<Export[]> {
    console.log("getExportList: ", this.uriBase);
    return this.http
      .get(this.uriBase, { withCredentials: true })
      .pipe(map((res) => res["data"] as Export[]));
  }

  getColumns(tableName: string): Observable<ExportColumn[]> {
    const uri = this.uriBase + "/" + tableName.toLowerCase();
    console.log("getColumns ", uri);
    return this.http
      .get(uri, { withCredentials: true })
      .pipe(map((res) => res["data"] as ExportColumn[]));
  }

  getExport(tableName: string, o: SearchOptions): Observable<Blob> {
    const params = this.encodeData(o);
    console.log("getExport: ", params);
    const uri = `${this.uriBase}/${tableName}/execute?${params}`;
    return this.http
      .get(uri, { responseType: "blob", withCredentials: true })
      .pipe(
        // eslint-disable-next-line arrow-body-style
        map((res: any) => {
          return res;
        })
      );
  }

  public encodeData(data: any): string {
    return Object.keys(data)
      .map((key) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return [key, data[key]].map(encodeURIComponent).join("=");
      })
      .join("&");
  }
}
