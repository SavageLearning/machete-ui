import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { ReportsService } from "src/app/reports/reports.service";

import { ReportsServiceSpy } from "src/app/shared/testing";
import { Report } from "../models/report";

import { ReportDetailComponent } from "./report-detail.component";

describe("ReportDetailComponent", () => {
  let component: ReportDetailComponent;
  let fixture: ComponentFixture<ReportDetailComponent>;
  const fakeService = {
    reports$: of(new Array<Report>()),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportDetailComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => {
                  return "fakeReport";
                },
              },
            },
          },
        },
        { provide: ReportsService, class: ReportsServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
