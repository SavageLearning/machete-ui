import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployersComponent } from './employers.component';
import { EmployersRoutingModule } from './employers-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule, ButtonModule, DropdownModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    EmployersRoutingModule
  ],
  declarations: [EmployersComponent]
})
export class EmployersModule {
  // Diagnostic only: inspect router configuration
  constructor() {
    console.log('.ctor');
  }
}
