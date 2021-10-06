/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { WelcomeComponent } from "./welcome.component";
import { ConfigsService } from "../configs/configs.service";
import { AuthService } from "../shared/index";
import { Router } from "@angular/router";
import {
  AuthServiceSpy,
  ConfigsServiceSpy,
  getConfigsList,
  RouterSpy,
} from "../shared/testing";

describe("WelcomeComponent", () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
    })
      .overrideComponent(WelcomeComponent, {
        set: {
          providers: [
            { provide: ConfigsService, useClass: ConfigsServiceSpy },
            { provide: AuthService, useClass: AuthServiceSpy },
            { provide: Router, useClass: RouterSpy },
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
});
