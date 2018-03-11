import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoggingService } from './index';
import { MessageService } from 'primeng/components/common/messageservice';

// https://medium.com/@amcdnl/global-error-handling-with-angular2-6b992bdfb59c
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
constructor(private injector: Injector) { }
handleError(error) {
    const loggingService = this.injector.get(LoggingService);
    const msgService = this.injector.get(MessageService);
    const location = this.injector.get(LocationStrategy);
    const message = error.message ? error.message : error.toString();
    const url = location instanceof PathLocationStrategy
      ? location.path() : '';

    const shortMsg = (error.rejection.status && error.rejection.statusText) ? 
        `${error.rejection.status} ${error.rejection.statusText}` : 'Unknown error';
    // log on the server
    msgService.add({severity:'error', summary: shortMsg});
    loggingService.log(message, location );


  }
  
}