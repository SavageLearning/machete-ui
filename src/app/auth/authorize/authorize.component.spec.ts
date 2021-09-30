import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { AuthorizeComponent } from "./authorize.component";
import { AuthService } from "../../shared/index";
import { Router } from "@angular/router";
import { AuthServiceSpy } from "../../shared/testing";

describe("AuthorizeComponent", () => {
  let component: AuthorizeComponent;
  let fixture: ComponentFixture<AuthorizeComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy("navigate"),
  };
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AuthorizeComponent],
      })
        .overrideComponent(AuthorizeComponent, {
          set: {
            providers: [
              { provide: AuthService, useClass: AuthServiceSpy },
              { provide: Router, useValue: mockRouter },
            ],
          },
        })
        .compileComponents()
        .catch((e) => console.error(e));
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(mockRouter.navigate).toHaveBeenCalledWith(["/welcome"]);
  });
});
