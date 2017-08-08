import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {
  ButtonModule, DropdownModule, DataTableModule, SharedModule, ChartModule,
  DialogModule, TabViewModule, CalendarModule, InputTextareaModule, InputSwitchModule
} from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExportsComponent } from './exports.component';
import {HttpModule} from '@angular/http';
import {ExportsService} from './exports.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { ExportsOptionsComponent } from './exports-options.component';
import { HttpClient } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";

describe('ExportsComponent', () => {
  let component: ExportsComponent;
  let fixture: ComponentFixture<ExportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExportsComponent,
        ExportsOptionsComponent
      ],
      providers: [ExportsService, HttpClient, HttpHandler ],
      imports: [
        NoopAnimationsModule,
        DataTableModule,
        DropdownModule,
        TabViewModule,
        CalendarModule,
        DialogModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        InputSwitchModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the export list',
    async(inject([ExportsService], (service: ExportsService) => {
      service.getExportsList()
        .toPromise()
        .then(rows => {
          expect(rows.length).toBe(2, 'expected 2 in exports list');
        });
    }))
  );


});
