import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OnlineOrdersComponent} from './online-orders.component';

const onlineOrderRoutes: Routes = [
  {
    path: '',
    component: OnlineOrdersComponent
  }
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
