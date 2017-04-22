import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { ButtonModule, DataTableModule,SharedModule, ChartModule, TabViewModule, CalendarModule } from 'primeng/primeng';
import {ReportsRoutingModule} from "./reports-routing.module";

@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    ChartModule,
    DataTableModule,
    SharedModule,
    CalendarModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ButtonModule,
    ReportsRoutingModule
  ],
  bootstrap: []
})
export class ReportsModule {
  constructor() {
    console.log('reports');
  }
}
