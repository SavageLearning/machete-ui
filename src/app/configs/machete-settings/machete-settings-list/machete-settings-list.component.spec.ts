import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { AppSettingsStoreServiceSpy, RouterSpy } from "src/app/shared/testing";
import { AppSettingsStoreService } from "../../../shared/services/app-settings-store.service";

import { MacheteSettingsListComponent } from "./machete-settings-list.component";

describe("MacheteSettingsListComponent", () => {
  let component: MacheteSettingsListComponent;
  let fixture: ComponentFixture<MacheteSettingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MacheteSettingsListComponent],
      providers: [
        {
          provide: AppSettingsStoreService,
          useClass: AppSettingsStoreServiceSpy,
        },
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
