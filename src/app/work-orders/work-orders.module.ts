import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrdersComponent } from './work-orders.component';
import { WorkOrdersRoutingModule } from './work-orders-routing.module';
import { DataTableModule } from 'primeng/primeng';
import { MomentModule } from 'angular2-moment';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { OrderViewsModule } from '../shared/views/order-views/order-views.module';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    WorkOrdersRoutingModule,
    MomentModule,
    OrderViewsModule
  ],
  declarations: [
    WorkOrdersComponent,
    OrderCompleteComponent,
  ]
})
export class WorkOrdersModule { }
