import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrdersComponent } from './work-orders.component';
import { WorkOrdersRoutingModule } from "./work-orders-routing.module";
import { DataTableModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    WorkOrdersRoutingModule
  ],
  declarations: [WorkOrdersComponent]
})
export class WorkOrdersModule { }
