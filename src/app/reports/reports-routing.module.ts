import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportsComponent} from './reports.component';

const reportsRoutes: Routes = [
  {
    path: '',
    component: ReportsComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(reportsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class ReportsRoutingModule { }
