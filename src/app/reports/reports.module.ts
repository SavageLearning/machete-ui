import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { DataTableModule,SharedModule, ChartModule, TabViewModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    ChartModule,
    DataTableModule,
    SharedModule
  ],
  exports: [
    ReportsComponent
  ],
  bootstrap: [ReportsComponent]
})
export class ReportsModule {}
