import { of as observableOf } from "rxjs";
import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { TabViewModule } from "primeng/tabview";
import { CalendarModule } from "primeng/calendar";
import { InputSwitchModule } from "primeng/inputswitch";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ExportsComponent } from "./exports.component";
import { ExportsService } from "./exports.service";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ExportsOptionsComponent } from "./exports-options.component";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Export } from "src/app/shared/models/export";

class ExportsServiceSpy {
  getExportsList = jasmine
    .createSpy("getExportsList")
    .and.callFake(() => observableOf(new Array<Export>()));
}

describe("ExportsComponent", () => {
  let component: ExportsComponent;
  let fixture: ComponentFixture<ExportsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ExportsComponent, ExportsOptionsComponent],
        providers: [HttpClient, HttpHandler],
        imports: [
          NoopAnimationsModule,
          TableModule,
          DropdownModule,
          TabViewModule,
          CalendarModule,
          DialogModule,
          FormsModule,
          ReactiveFormsModule,
          InputSwitchModule,
        ],
      })
        .overrideComponent(ExportsComponent, {
          set: {
            providers: [
              { provide: ExportsService, useClass: ExportsServiceSpy },
            ],
          },
        })
        .compileComponents();
      //.catch((e) => console.error(e));
      fixture = TestBed.createComponent(ExportsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });
});
