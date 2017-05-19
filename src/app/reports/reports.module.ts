import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ButtonModule, DropdownModule, DataTableModule, SharedModule, ChartModule,
  DialogModule, TabViewModule, CalendarModule, InputTextareaModule } from 'primeng/primeng';

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
    DropdownModule,
    DialogModule,
    InputTextareaModule,
    BrowserAnimationsModule
  ],
  exports: [
    ReportsComponent
  ],
  bootstrap: [ReportsComponent]
})
export class ReportsModule {}
