import { Injectable, Optional, SkipSelf } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ISuccessMessage } from "./messages.component";

/**
 * A singleton Machete messages service.
 * Sends a notification errors to its component observable
 * @class MessagesService
 */
@Injectable({
  providedIn: "root",
})
export class MessagesService {
  private errorSubject = new BehaviorSubject<any>([]);
  private successSubject = new BehaviorSubject<any>([]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  success$: Observable<ISuccessMessage> = this.successSubject.asObservable();

  errors$: Observable<any> = this.errorSubject.asObservable();

  showErrors(errors): void {
    this.errorSubject.next(errors);
  }

  showSuccess(message: ISuccessMessage): void {
    this.successSubject.next(message);
  }

  constructor(@Optional() @SkipSelf() parentModule?: MessagesService) {
    // enforce app singleton pattern
    if (parentModule) {
      throw new Error(
        "Machete dev error:MessagesService is already loaded. Additional imports not needed"
      );
    }
  }
}
