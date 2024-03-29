/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { LocationStrategy } from "@angular/common";
import { LoggingService } from "./index";
import { MessageService } from "primeng/api";
import { HttpErrorResponse } from "@angular/common/http";

// https://medium.com/@amcdnl/global-error-handling-with-angular2-6b992bdfb59c
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}
  handleError(error): void {
    const loggingService = this.injector.get(LoggingService);
    const msgService = this.injector.get(MessageService);
    const location = this.injector.get(LocationStrategy);
    const message = error?.message || error.toString();

    let shortMsg: string = "unknown error: " + error.toString();
    if (error instanceof HttpErrorResponse) {
      shortMsg = `${error.status} ${error.statusText}`;
    }
    // I think this is a bluebird promise error, but i dunno
    if (error.rejection && error.rejection instanceof HttpErrorResponse) {
      shortMsg =
        error.rejection.status && error.rejection.statusText
          ? `${error.rejection.status} ${error.rejection.statusText}`
          : "Unknown error";
    }

    // log on the server
    msgService.add({ severity: "error", summary: shortMsg });
    loggingService.log(message, location.path());
    throw error;
  }
}
