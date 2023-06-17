/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { WelcomeComponent } from "./welcome.component";
import { AuthService } from "../shared/index";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ActivatedRouteSpy,
  AppSettingsStoreServiceSpy,
  AuthServiceSpy,
  getConfigsList,
  RouterSpy,
} from "../shared/testing";
import { MessageService } from "primeng/api";
import { AppSettingsStoreService } from "../shared/services/app-settings-store.service";

describe("WelcomeComponent", () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  const messageService = jasmine.createSpyObj("MessageService", ["add"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
    })
      .overrideComponent(WelcomeComponent, {
        set: {
          providers: [
            {
              provide: AppSettingsStoreService,
              useClass: AppSettingsStoreServiceSpy,
            },
            { provide: AuthService, useClass: AuthServiceSpy },
            { provide: Router, useClass: RouterSpy },
            { provide: ActivatedRoute, useClass: ActivatedRouteSpy },
            { provide: MessageService, useValue: messageService },
          ],
        },
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(WelcomeComponent);
        component = fixture.componentInstance;
        component.welcome = "bar";
        fixture.detectChanges();
      });
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  it("should have configs all configs", () => {
    getConfigsList().map((conf) => {
      expect(component.serverData).toContain(conf);
    });
  });

  it("should display unauthenticated dashboard", () => {
    const dashboardHeading = fixture.debugElement.nativeElement.querySelector(
      "[data-mtest=dashboard-heading]"
    );
    expect(dashboardHeading.textContent).toContain("Dashboard");
    expect(dashboardHeading.textContent).not.toContain("Center Staff");
    expect(dashboardHeading.textContent).not.toContain("Employer");
  });
  it("should call message service when fb-login fails", () => {
    // We know the activated route params contains the query that triggers the call
    const add = messageService.add.and.callFake(() => "");
    expect(add.calls.any()).toBe(true, "messsages add called");
  });
});
