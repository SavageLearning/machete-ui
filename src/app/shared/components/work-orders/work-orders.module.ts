import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullOrderViewComponent } from './full-order-view/full-order-view.component';
import { DataTableModule, InputSwitchModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    InputSwitchModule
  ],
  declarations: [
    FullOrderViewComponent
  ],
  exports: [
    FullOrderViewComponent
  ]
})
export class WorkOrdersModule { }
