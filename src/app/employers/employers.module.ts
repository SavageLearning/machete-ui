import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployersComponent } from './employers.component';
import { EmployersRoutingModule } from './employers-routing.module'

@NgModule({
  imports: [
    CommonModule,
    EmployersRoutingModule
  ],
  declarations: [EmployersComponent]
})
export class EmployersModule {
  // Diagnostic only: inspect router configuration
  constructor() {
    console.log('employers');
  }
}
