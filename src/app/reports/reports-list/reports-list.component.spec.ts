import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsListComponent } from './reports-list.component';
import { Router } from '@angular/router';
import { ReportsStoreService } from 'src/app/shared/services/reports-store.service';
import { RouterSpy } from 'src/app/shared/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { of } from 'rxjs';
import { Report } from '../models/report';

describe('ReportsListComponent', () => {
  let component: ReportsListComponent;
  let fixture: ComponentFixture<ReportsListComponent>;
  const fakeService = {
    reports$: of(new Array<Report>()),
    getReportList: jasmine.createSpy('getReportList')
      .and.callFake
  }
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsListComponent ],
      imports: [
        NoopAnimationsModule,
        TableModule,
        DropdownModule,
        TabViewModule,
        CalendarModule,
        DialogModule,
        FormsModule,
        HttpClientModule,
      ],
      providers: [
        {provide: Router, useClass: RouterSpy},
        {provide: ReportsStoreService, value: fakeService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
