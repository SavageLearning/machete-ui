import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ISuccessMessage } from "./messages.component";

@Injectable({
  providedIn: "root",
})
export class MessagesService {
  private errorSubject = new BehaviorSubject<any>([]);
  private successSubject = new BehaviorSubject<any>([]);

  success$: Observable<ISuccessMessage> = this.successSubject.asObservable();

  errors$: Observable<any> = this.errorSubject.asObservable();

  showErrors(errors): void {
    this.errorSubject.next(errors);
  }

  showSuccess(message: ISuccessMessage): void {
    this.successSubject.next(message);
  }

  constructor() {}
}
