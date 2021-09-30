import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ConfirmationService } from "primeng/api";

import ErrorModel from "../../models/error-model";
import { MessagesService } from "../messages/messages.service";

export interface IConfirmActionData {
  message: string;
  header: string;
  icon: string;
  accept: () => void;
  // reject: (type: ConfirmEventType) => void; // only handling on type of confirm event
}

@Component({
  selector: "app-record-control",
  template: ` <p-card styleClass="p-mb-4">
      <p-toolbar>
        <div class="p-toolbar-group-left">
          <button
            pButton
            pRipple
            (click)="createRecord()"
            class="p-button-raised p-button-info"
            label="New"
            icon="pi pi-plus"
          ></button>
        </div>
        <div class="p-toolbar-group-right">
          <button
            pButton
            pRipple
            (click)="deleteRecord()"
            class="p-button-raised p-button-danger"
            label="Delete"
            icon="pi pi-trash"
          ></button>
        </div>
      </p-toolbar>
    </p-card>
    <p-confirmDialog
      [style]="{ width: '50vw' }"
      [baseZIndex]="10000"
      rejectButtonStyleClass="p-button-text"
    ></p-confirmDialog>`,
  providers: [ConfirmationService],
})

/*
 * Reusable record actions
 */
export class RecordControlComponent {
  @Input() public recordId: number;
  @Input() public confirmActionData: IConfirmActionData;
  @Output() public newRecordE = new EventEmitter<boolean>();

  constructor(
    private confirmationService: ConfirmationService,
    private appMessages: MessagesService
  ) {}

  deleteRecord(): void {
    this.confirmationService.confirm({
      message: this.confirmActionData.message,
      header: this.confirmActionData.header,
      icon: this.confirmActionData.icon,
      accept: () => this.confirmActionData.accept(),
      reject: () => {
        this.appMessages.showErrors(
          new ErrorModel(["Request Canceled"], "Canceled")
        );
      },
    });
  }

  createRecord(): void {
    this.newRecordE.emit(true);
  }
}
