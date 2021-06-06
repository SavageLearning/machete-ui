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
          DialogModule, CheckboxModule, ToggleButtonModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnlineOrdersService } from './online-orders.service';
import { ScheduleRulesService } from './schedule-rules.service';
import { TransportRulesService } from './transport-rules.service';
import { OrderNotFoundComponent } from './order-not-found/order-not-found.component';
import { WorkOrdersModule } from '../shared/components/work-orders/work-orders.module';
import { ProfileGuard } from './guards/profile.guard';
import { BannerGuard } from './guards/banner.guard';
import { ConfigsService } from '../configs/configs.service';

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
    ToggleButtonModule,
    OnlineOrdersRoutingModule,
    WorkOrdersModule
  ],
  declarations: [
    IntroductionComponent,
    OnlineOrdersComponent,
    IntroConfirmComponent,
    WorkOrderComponent,
    WorkAssignmentsComponent,
    OrderConfirmComponent,
    OrderNotFoundComponent
  ],
  providers: [
    OnlineOrdersService,
    ScheduleRulesService,
    TransportRulesService,
    ConfigsService,
    ProfileGuard,
    BannerGuard
  ]
})
export class OnlineOrdersModule { }
