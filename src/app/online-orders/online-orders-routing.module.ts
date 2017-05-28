import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OnlineOrdersComponent} from './online-orders.component';
import {IntroductionComponent} from './introduction/introduction.component';
import {IntroConfirmComponent} from './intro-confirm/intro-confirm.component';
import {WorkOrderComponent} from './work-order/work-order.component';
import {WorkAssignmentsComponent} from './work-assignments/work-assignments.component';
import {FinalConfirmComponent} from './final-confirm/final-confirm.component';

const onlineOrderRoutes: Routes = [
  {
    path: '',
    component: OnlineOrdersComponent,
    children: [
      {
        path: 'introduction',
        component: IntroductionComponent
      },
      {
        path: 'intro-confirm',
        component: IntroConfirmComponent
      },
      {
        path: 'work-order',
        component: WorkOrderComponent
      },
      {
        path: 'work-assignments',
        component: WorkAssignmentsComponent
      },
      {
        path: 'final-confirm',
        component: FinalConfirmComponent
      }
    ]
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(onlineOrderRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class OnlineOrdersRoutingModule { }
