import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { DataTableModule,SharedModule, ChartModule, TabViewModule, CalendarModule } from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';

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
    ButtonModule

  ],
  exports: [
    ReportsComponent
  ],
  bootstrap: [ReportsComponent]
})
export class ReportsModule {}
