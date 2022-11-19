import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MacheteSettingsComponent } from "./machete-settings.component";

describe("MacheteSettingsComponent", () => {
  let component: MacheteSettingsComponent;
  let fixture: ComponentFixture<MacheteSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MacheteSettingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MacheteSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
