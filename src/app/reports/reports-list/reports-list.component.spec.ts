import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsListComponent } from './reports-list.component';
import { Router } from '@angular/router';
import { ReportsStoreService } from 'src/app/shared/services/reports-store.service';
import { ReportsStoreServiceSpy, RouterSpy } from 'src/app/shared/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

describe('ReportsListComponent', () => {
  let component: ReportsListComponent;
  let fixture: ComponentFixture<ReportsListComponent>;

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
        {provide: ReportsStoreService, useClass: ReportsStoreServiceSpy}
      ]
    })
    .compileComponents().catch(e => console.error(e));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and display report list', () => {
    expect(component).toBeTruthy();
    const tableRows = fixture.nativeElement.querySelectorAll('tr');

    expect(tableRows.length).toBe(3);
    const headerRow = tableRows[0];

    const firstHeading = fixture.nativeElement.querySelectorAll('th');
    expect(firstHeading[0].innerHTML).toContain('Name');

    const firstDataCell = fixture.nativeElement.querySelectorAll('td');
    expect(firstDataCell[0].innerHTML).toContain('Test');
    expect(firstDataCell[5].innerHTML).toContain('More');
  });
});
