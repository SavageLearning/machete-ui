import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService  as PrimeNGMess } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import ErrorModel from '../../models/error-model';
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
export class MessagesComponent implements OnInit, OnDestroy {
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

  notifyErrors = (error: HttpErrorResponse | ErrorModel) => {
    // simple error object
    if (error instanceof HttpErrorResponse && typeof(error.error) == 'string') {
      this.primeNGMesage.add({
        severity: 'error',
        summary: error.statusText,
        detail: error.error,
        life: 7000,
      });
      return
    }

    if (error instanceof ErrorModel) {
      error.error.map((e: string) => {
        this.primeNGMesage.add({
          severity: 'error',
          summary: error.label,
          detail: e,
          life: 7000,
        });
      });
      return
    }

    let parsedError = error;
    // goal is to catch errors if error prop is in error or in error.errors
    if (error.error !== undefined) {
      parsedError = error.error;
      if (error.error.errors !== undefined) {
        parsedError = error.error.errors;
      }
    }
    const errorLables = Object.keys(parsedError);
    errorLables.map((label: string) => {
      // if value of error = string
      if (typeof(parsedError[label]) == 'string') {
        this.primeNGMesage.add({
          severity: 'error',
          summary: label,
          detail: `${parsedError[label]}`,
          life: 7000,
        });
      }
      // if value of error is array one message per error
      if (parsedError[label] instanceof Array) {
        parsedError[label].map((e: string) => {
          this.primeNGMesage.add({
            severity: 'error',
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
      severity: 'success',
      summary: success.label,
      detail: success.message,
      life: 3000,
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
