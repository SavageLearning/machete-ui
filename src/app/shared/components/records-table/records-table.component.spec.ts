/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { Report } from "src/app/reports/models/report";

import { RecordsTableComponent } from "./records-table.component";

describe("RecordsTableComponent", () => {
  let component: RecordsTableComponent;
  let fixture: ComponentFixture<RecordsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordsTableComponent],
      imports: [CommonModule, TableModule, InputTextModule],
    })
      .overrideComponent(RecordsTableComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsTableComponent);
    component = fixture.componentInstance;
    // component.values = [];
    component.excludeCols = [
      "id",
      "subcategory",
      "name",
      "title",
      "inputs",
      "columns",
      "sqlquery",
      "inputsJson",
      "columnsJson",
    ];
    component.colOrder = ["commonName"];
    component.values = new Array<Report>(
      new Report({ commonName: "test" }),
      new Report({ commonName: "more" })
    );
    const previous = [];
    const current = new Array<Report>(
      new Report({ commonName: "test" }),
      new Report({ commonName: "more" })
    );
    const changes: SimpleChanges = {
      values: new SimpleChange(previous, current, false),
    };
    component.ngOnChanges(changes);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display 3 tables in row", () => {
    const tableRows = fixture.nativeElement.querySelectorAll("tr");

    expect(tableRows.length).toBe(3);
  });

  it("should display record list headings", () => {
    const firstHeading = fixture.nativeElement.querySelectorAll("th");
    expect(firstHeading[0].innerHTML).toContain("Name");
  });

  it("should display record data", () => {
    const firstDataCell =
      fixture.debugElement.nativeElement.querySelectorAll("#dt");
    expect(firstDataCell[0].textContent).toContain("test");
    expect(firstDataCell[1].textContent).toContain("more");
  });
});
