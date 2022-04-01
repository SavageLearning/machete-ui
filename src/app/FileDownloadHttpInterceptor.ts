import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable()
export class FileDownloadHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get("Accept") === "application/octet-stream") {
      // @ts-ignore: ignore that responseType is read only
      req.responseType = "blob";
    }
    return next.handle(req);
  }
}
