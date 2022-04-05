import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TransportProvidersEditComponent } from "./transport-providers-edit.component";

describe("TransportProvidersEditComponent", () => {
  let component: TransportProvidersEditComponent;
  let fixture: ComponentFixture<TransportProvidersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransportProvidersEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportProvidersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
