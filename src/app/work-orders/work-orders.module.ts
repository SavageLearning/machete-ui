import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrdersComponent } from './work-orders.component';
import { WorkOrdersRoutingModule } from './work-orders-routing.module';
import { DataTableModule } from 'primeng/primeng';
import { MomentModule } from 'angular2-moment';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    WorkOrdersRoutingModule,
    MomentModule
  ],
  declarations: [WorkOrdersComponent]
})
export class WorkOrdersModule { }
