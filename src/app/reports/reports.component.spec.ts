import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { TabViewModule } from "primeng/tabview";
import { CalendarModule } from "primeng/calendar";
import { ReportsComponent } from "./reports.component";
import { FormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import {
  HttpClientModule,
  HttpClient,
  HttpHandler,
} from "@angular/common/http";
import { ReportsService } from "./reports.service";
import { Report } from "./models/report";
import { of } from "rxjs";
import { DialogService } from "primeng/dynamicdialog";

class ReportsServiceSpy {
  getReportList = jasmine
    .createSpy("getReportList")
    .and.callFake(() => of(new Array<Report>()));
  getReportData = jasmine
    .createSpy("")
    .and.callFake(() => of(new Array<any>()));
}

const dynamicDialogRefServiceSpy = jasmine
  .createSpy("dynamicDialogRefSpy")
  .and.callFake(() => {
    return;
  });

describe("ReportsComponent", () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ReportsComponent],
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
        providers: [HttpClient, HttpHandler],
      })
        .overrideComponent(ReportsComponent, {
          set: {
            providers: [
              { provide: ReportsService, useClass: ReportsServiceSpy },
              { provide: DialogService, useValue: dynamicDialogRefServiceSpy },
            ],
          },
        })
        .compileComponents()
        .catch((e) => console.error(e));
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });
});
