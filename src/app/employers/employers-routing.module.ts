import { NgModule }       from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployersComponent} from './employers.component';

const employerRoutes: Routes = [
  {
    path: 'employers',
    component: EmployersComponent
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(employerRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class EmployersRoutingModule { }
