import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RecordControlComponent } from "./record-control.component";

describe("RecordControlComponent", () => {
  let component: RecordControlComponent;
  let fixture: ComponentFixture<RecordControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordControlComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
