import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from './introduction/introduction.component';
import { OnlineOrdersComponent } from './online-orders.component';
import { IntroConfirmComponent } from './intro-confirm/intro-confirm.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { WorkAssignmentsComponent } from './work-assignments/work-assignments.component';
import { FinalConfirmComponent } from './final-confirm/final-confirm.component';
import { OnlineOrdersRoutingModule } from './online-orders-routing.module';
@NgModule({
  imports: [
    CommonModule,
    OnlineOrdersRoutingModule
  ],
  declarations: [IntroductionComponent, OnlineOrdersComponent, IntroConfirmComponent, WorkOrderComponent, WorkAssignmentsComponent, FinalConfirmComponent]
})
export class OnlineOrdersModule { }
