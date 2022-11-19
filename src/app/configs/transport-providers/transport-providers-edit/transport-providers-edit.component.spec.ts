/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { ActivatedRoute, Params } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ConfirmationService } from "primeng/api";
import { BehaviorSubject } from "rxjs";
import { TransportProvidersService } from "src/app/online-orders/transport-providers.service";
import { TransportProvidersServiceSpy } from "src/app/shared/testing";

import { TransportProvidersEditComponent } from "./transport-providers-edit.component";

describe("TransportProvidersEditComponent", () => {
  let component: TransportProvidersEditComponent;
  let fixture: ComponentFixture<TransportProvidersEditComponent>;
  let confirmationSpy: jasmine.SpyObj<ConfirmationService>;
  const routeChangeSource: BehaviorSubject<Params> =
    new BehaviorSubject<Params>({});

  beforeEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    confirmationSpy = jasmine.createSpyObj("ConfirmationService", ["confirm"]);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
      ],
      declarations: [TransportProvidersEditComponent],
      providers: [
        {
          provide: TransportProvidersService,
          useClass: TransportProvidersServiceSpy,
        },
        {
          provide: ConfirmationService,
          useValue: confirmationSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: routeChangeSource.asObservable(),
          },
        },
      ],
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

  it("valid id route should load form with record", () => {
    routeChangeSource.next({ id: "1" });
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        const key = fixture.debugElement.query(By.css("#key"));
        expect(key.nativeElement.value).toBe("one");
        expect(key.nativeElement.value).not.toBe("");
      })
      .catch(() => console.log(""));
  });

  it("NEW route should load empty form", () => {
    routeChangeSource.next({ id: "new" });
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        const key = fixture.debugElement.query(By.css("#key"));
        expect(key.nativeElement.value).toBe("");
      })
      .catch(() => console.log(""));
  });
});
