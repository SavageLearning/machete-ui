import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
import { ReportsComponent } from './reports.component';

@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    ChartModule
  ],
  exports: [
    ReportsComponent
  ],
  bootstrap: [ReportsComponent]
})
export class ReportsModule {}
