import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {ReportsRoutingModule } from './reports-routing.module';
import {CardModule} from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { EditorComponent } from './editor/editor.component';
import { ReportsListComponent } from './reports-list/reports-list.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { ReportDetailFiltersSelectComponent } from './report-detail/report-detail-filters-select.component';
import { RecordControlModule } from '../shared/components/record-control/record-control.module';
import { ReportResultComponent } from 'src/app/reports/report-result/report-result.component';



@NgModule({
  declarations: [
    ReportsComponent,
    EditorComponent,
    ReportsListComponent,
    ReportDetailComponent,
    ReportDetailFiltersSelectComponent,
    ReportResultComponent,
  ],
  imports: [
    CommonModule,
    TabViewModule,
    ChartModule,
    TableModule,
    CalendarModule,
    FormsModule,
    HttpClientJsonpModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    InputTextareaModule,
    ReportsRoutingModule,
    CardModule,
    TooltipModule,
    MenubarModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    OverlayPanelModule,
    ToastModule,
    InputMaskModule,
    CheckboxModule,
    RecordControlModule,
    MonacoEditorModule.forRoot() // use forRoot() in main app module only.
  ],
  bootstrap: []
})
export class ReportsModule {
  constructor() {
    console.log('.ctor: ReportsModule');
  }
}
