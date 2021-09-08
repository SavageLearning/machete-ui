import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordControlComponent } from './record-control.component';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    RecordControlComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ToolbarModule,
    ButtonModule
  ],
  exports: [
    RecordControlComponent
  ]
})
export class RecordControlModule { }
