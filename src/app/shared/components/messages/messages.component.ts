import { Component, OnInit } from '@angular/core';
import { MessageService  as PrimeNGMess } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { MessagesService } from './messages.service';

export interface ISuccessMessage {
  label: string;
  message: string;
}

@Component({
  selector: 'app-messages',
  template: `<p-toast></p-toast>`,
  styles: []
})
export class MessagesComponent implements OnInit {
  private alive = true;
  errors$: Observable<any>;
  success$: Observable<void>;


  constructor(
    public messagesService: MessagesService,
    private primeNGMesage: PrimeNGMess) { }

  ngOnInit(): void {
    this.errors$ = this.messagesService.errors$
      .pipe(
        takeWhile(() => this.alive),
        tap(error => console.log(error)),
        map(error => this.notifyErrors(error)),
      );
    this.errors$.subscribe();
    this.success$ = this.messagesService.success$
      .pipe(
        takeWhile(() => this.alive),
        tap(success => console.log(success)),
        map((success: ISuccessMessage) => this.notifySuccess(success))
      );
    this.success$.subscribe();
  }

  notifyErrors = (error: any) => {
    // goal is to catch errors in nested array
    if (error['error'] !== undefined ) {
      error = error['error'];
      if (error !== undefined) error = error['errors'];
    }

    const errorLables = Object.keys(error);
    errorLables.map((label: string) => {
      // if value of error = string
      if (typeof(error[label]) == "string") {
        this.primeNGMesage.add({
          severity: "error",
          summary: label,
          detail: `${error[label]}`,
          life: 7000,
        });
      }
      // if value of error is array
      if (error[label] instanceof Array) {
        error[label].map((e: string) => {
          this.primeNGMesage.add({
            severity: "error",
            summary: label,
            detail: `${e}`,
            life: 7000,
          });
        })
      }
    })
  }

  notifySuccess(success: ISuccessMessage) {
    this.primeNGMesage.add({
      severity: "success",
      summary: success.label,
      detail: success.message,
      life: 3000,
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
