import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { AppMenuComponent } from "./app.menu.component";
import { AppComponent } from "./app.component";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "./shared/index";
import { AuthServiceSpy } from "./shared/testing";

class AppComponentSpy {}

describe("AppMenuComponent", () => {
  let component: AppMenuComponent;
  let fixture: ComponentFixture<AppMenuComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AppMenuComponent],
        imports: [ReactiveFormsModule, RouterTestingModule],
      })
        .overrideComponent(AppMenuComponent, {
          set: {
            providers: [
              { provide: AppComponent, useClass: AppComponentSpy },
              { provide: AuthService, useClass: AuthServiceSpy },
            ],
          },
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppMenuComponent);
          component = fixture.componentInstance;
          // component
          fixture.detectChanges();
        })
        .catch((e) => console.error(e));
    })
  );

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
