import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from './introduction/introduction.component';
import { OnlineOrdersComponent } from './online-orders.component';
import { IntroConfirmComponent } from './intro-confirm/intro-confirm.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { WorkAssignmentsComponent } from './work-assignments/work-assignments.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { OnlineOrdersRoutingModule } from './online-orders-routing.module';
import { StepsModule, CalendarModule, DropdownModule,
          DataTableModule, InputSwitchModule, MessagesModule,
          DialogModule, CheckboxModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnlineOrdersService } from './online-orders.service';
import { ScheduleRulesService } from './schedule-rules.service';
import { TransportRulesService } from './transport-rules.service';
import { OrderCompleteComponent } from './src/app/online-orders/order-complete/order-complete.component';
import { PaypalNoticeComponent } from './src/app/online-orders/paypal-notice/paypal-notice.component';

@NgModule({
  imports: [
    CommonModule,
    StepsModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    InputSwitchModule,
    MessagesModule,
    DialogModule,
    CheckboxModule,
    OnlineOrdersRoutingModule
  ],
  declarations: [
    IntroductionComponent,
    OnlineOrdersComponent,
    IntroConfirmComponent,
    WorkOrderComponent,
    WorkAssignmentsComponent,
    OrderConfirmComponent,
    OrderCompleteComponent,
    PaypalNoticeComponent
  ],
  providers: [
    OnlineOrdersService,
    ScheduleRulesService,
    TransportRulesService
  ]
})
export class OnlineOrdersModule { }
