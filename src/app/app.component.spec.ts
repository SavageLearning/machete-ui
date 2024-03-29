import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { AppTopBarComponent } from "./app.topbar.component";
import { InlineProfileComponent } from "./menu/app.profile.component";
import {
  AppMenuComponent,
  AppSubMenuComponent,
} from "./menu/app.menu.component";
import { AppFooterComponent } from "./app.footer.component";
import { AppRoutingModule } from "./app-routing.module";
import { PageNotFoundComponent } from "./not-found.component";
import { APP_BASE_HREF } from "@angular/common";
import { AuthorizeComponent } from "./auth/authorize/authorize.component";
import { AuthService } from "./shared/index";
import { AuthServiceSpy } from "./shared/testing";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";

describe("AppComponent", () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          AppComponent,
          AppMenuComponent,
          AppSubMenuComponent,
          AppTopBarComponent,
          AppFooterComponent,
          InlineProfileComponent,
          PageNotFoundComponent,
          AuthorizeComponent,
        ],
        imports: [AppRoutingModule, NoopAnimationsModule, ToastModule],
        providers: [
          { provide: APP_BASE_HREF, useValue: "/" },
          { provide: AuthService, useClass: AuthServiceSpy },
          MessageService,
        ],
      })
        .compileComponents()
        .catch((e) => console.error(e));
    })
  );

  it(
    "should create the app",
    waitForAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance as AppComponent;
      expect(app).toBeTruthy();
    })
  );
});
