import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReportsStoreService } from "src/app/shared/services/reports-store.service";
import { ReportsStoreServiceSpy } from "src/app/shared/testing";

import { ReportCreateComponent } from "./report-create.component";

describe("ReportCreateComponent", () => {
  let component: ReportCreateComponent;
  let fixture: ComponentFixture<ReportCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportCreateComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: ReportsStoreService, useClass: ReportsStoreServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
