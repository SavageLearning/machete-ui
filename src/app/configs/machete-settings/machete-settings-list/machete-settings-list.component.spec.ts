import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { ConfigsServiceSpy, RouterSpy } from "src/app/shared/testing";
import { ConfigsService } from "../../configs.service";

import { MacheteSettingsListComponent } from "./machete-settings-list.component";

describe("MacheteSettingsListComponent", () => {
  let component: MacheteSettingsListComponent;
  let fixture: ComponentFixture<MacheteSettingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MacheteSettingsListComponent],
      providers: [
        { provide: ConfigsService, useClass: ConfigsServiceSpy },
        { provide: Router, useClass: RouterSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MacheteSettingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
