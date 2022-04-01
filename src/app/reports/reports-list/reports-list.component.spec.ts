import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ReportsListComponent } from "./reports-list.component";
import { Router } from "@angular/router";
import { ReportsService } from "src/app/reports/reports.service";

import {
  ReportsStoreServiceSpy as ReportsServiceSpy,
  RouterSpy,
} from "src/app/shared/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { TabViewModule } from "primeng/tabview";
import { CalendarModule } from "primeng/calendar";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { DialogModule } from "primeng/dialog";

describe("ReportsListComponent", () => {
  let component: ReportsListComponent;
  let fixture: ComponentFixture<ReportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsListComponent],
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
        { provide: Router, useClass: RouterSpy },
        { provide: ReportsService, useClass: ReportsServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
