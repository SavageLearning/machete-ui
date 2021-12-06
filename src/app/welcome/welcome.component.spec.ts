/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { WelcomeComponent } from "./welcome.component";
import { ConfigsService } from "../configs/configs.service";
import { AuthService } from "../shared/index";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ActivatedRouteSpy,
  AuthServiceSpy,
  ConfigsServiceSpy,
  getConfigsList,
  RouterSpy,
} from "../shared/testing";
import { MessageService } from "primeng/api";

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
            { provide: ConfigsService, useClass: ConfigsServiceSpy },
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

  it("should call message service when fb-login fails", () => {
    // We know the activated route params contains the query that triggers the call
    const add = messageService.add.and.callFake(() => "");
    expect(add.calls.any()).toBe(true, "messsages add called");
  });
});
