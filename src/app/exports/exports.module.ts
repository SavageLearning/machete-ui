import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportsComponent } from './exports.component';
import { FormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import {ExportsRoutingModule} from './exports-routing.module';
import { ButtonModule, DropdownModule, DataTableModule, SharedModule, ChartModule,
  DialogModule, TabViewModule, CalendarModule, InputTextareaModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JsonpModule,
    TabViewModule,
    ChartModule,
    DataTableModule,
    SharedModule,
    CalendarModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    InputTextareaModule,
    ExportsRoutingModule
  ],
  declarations: [ExportsComponent]
})
export class ExportsModule {
  constructor() {
    console.log('ExportsModule-ctor');
  }
}
