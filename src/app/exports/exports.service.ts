/* eslint-disable arrow-body-style */
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Export } from "src/app/shared/models/export";
import { ExportColumn } from "../shared/models/export-column";
import { SearchOptions } from "../reports/models/search-options";
import { ExportsService as ExportsClient } from "machete-client";
@Injectable()
export class ExportsService {
  constructor(private client: ExportsClient) {}

  getExportsList(): Observable<Export[]> {
    return this.client
      .apiExportsGet()
      .pipe(map((res) => res["data"] as Export[]));
  }

  getColumns(tableName: string): Observable<ExportColumn[]> {
    return this.client
      .apiExportsTableNameGet(tableName)
      .pipe(map((res) => res["data"] as ExportColumn[]));
  }

  getExport(tableName: string, o: SearchOptions): Observable<Blob> {
    return this.client
      .apiExportsTablenameExecuteGet(
        tableName,
        o.filterField,
        o.beginDate,
        o.endDate,
        "body"
      )
      .pipe(
        // eslint-disable-next-line arrow-body-style
        map((res: any) => {
          console.log(res);
          return res;
        })
      );
  }

  // public encodeData(data: any): string {
  //   return Object.keys(data)
  //     .map((key) => {
  //       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //       return [key, data[key]].map(encodeURIComponent).join("=");
  //     })
  //     .join("&");
  // }
}
