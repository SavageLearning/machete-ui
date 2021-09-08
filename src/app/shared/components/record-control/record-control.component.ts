import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { exception } from 'console';

@Component({
  selector: 'app-record-control',
  template: `
  <p-card styleClass="p-mb-4">
    <p-toolbar>
      <div class="p-toolbar-group-left">
          <button pButton pRipple class="p-button-raised p-button-info" label="New" icon="pi pi-plus"></button>
      </div>
      <div class="p-toolbar-group-right">
          <button pButton pRipple (click)="deleteRecord()" class="p-button-raised p-button-danger" label="Delete" icon="pi pi-trash"></button>
      </div>
    </p-toolbar>
  </p-card>`
})

export class RecordControlComponent {
  @Input() public recordId: number;
  @Output() public deleteRecordE = new EventEmitter<number>();
  @Output() public newRecordE = new EventEmitter<void>();

  constructor() { }

  deleteRecord() {
    this.deleteRecordE.emit(this.recordId);
  }

  createRecord() {
    this.newRecordE.emit();
  }

}
