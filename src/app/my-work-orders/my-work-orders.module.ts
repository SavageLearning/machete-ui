import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyWorkOrdersComponent } from './my-work-orders.component';
import { WorkOrdersRoutingModule } from './my-work-orders-routing.module';
import { DataTableModule } from 'primeng/primeng';
import { MomentModule } from 'angular2-moment';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { WorkOrdersModule } from '../shared/components/work-orders/work-orders.module';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    WorkOrdersRoutingModule,
    MomentModule,
    WorkOrdersModule
  ],
  declarations: [
    MyWorkOrdersComponent,
    OrderCompleteComponent,
  ]
})
export class MyWorkOrdersModule { }
