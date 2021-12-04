import {
  waitForAsync,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { ReactiveFormsModule, FormsModule, FormGroup } from "@angular/forms";
import { EmployersComponent } from "./employers.component";
import { EmployersService } from "./employers.service";
import { LookupsService } from "../lookups/lookups.service";
import { DropdownModule } from "primeng/dropdown";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import {
  EmployersServiceSpy,
  EmployersServiceWaitingSpy,
  LookupsServiceSpy,
  RouterSpy,
} from "../shared/testing";
import { Router } from "@angular/router";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { KeyFilterModule } from "primeng/keyfilter";
import { InputMaskModule } from "primeng/inputmask";
import { DebugElement } from "@angular/core";
import { Employer } from "../shared/models/employer";
import { of, throwError } from "rxjs";

const tb_base = {
  declarations: [EmployersComponent],
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    NoopAnimationsModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    KeyFilterModule,
    CardModule,
    InputMaskModule,
  ],
  providers: [
    { provide: EmployersService, useClass: EmployersServiceSpy },
    { provide: LookupsService, useClass: LookupsServiceSpy },
    { provide: Router, useClass: RouterSpy },
  ],
};

describe("EmployersComponent", () => {
  let component: EmployersComponent;
  let fixture: ComponentFixture<EmployersComponent>;
  let submitEl: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule(tb_base)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(EmployersComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
          submitEl = fixture.debugElement;
        })
        .catch((e) => console.error(e));
    })
  );

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("saveDisabled set to true disables the Save button", () => {
    component.saveDisabled = true;
    fixture.detectChanges();
    expect(
      submitEl.nativeElement.querySelector("button").disabled
    ).toBeTruthy();
  });

  it("saveDisabled set to false enables the Save button", () => {
    component.saveDisabled = false;
    fixture.detectChanges();
    expect(submitEl.nativeElement.querySelector("button").disabled).toBeFalsy();
  });

  it("saveEmployer sets saveDisabled to false after saving", () => {
    component.saveEmployer();
    fixture.detectChanges();
    expect(component.saveDisabled).toBeFalsy();
  });
});

// describe("EmployersComponentWithSlowService", () => {
//   let component: EmployersComponent;
//   let fixture: ComponentFixture<EmployersComponent>;
//   let submitEl: DebugElement;
//   let employerServiceSpy: any;

//   beforeEach(
//     waitForAsync(() => {
//       employerServiceSpy = jasmine.createSpyObj("EmployerService", ["save"]);

//       TestBed.configureTestingModule(tb_base)
//         .overrideProvider(EmployersService, {
//           useValue: employerServiceSpy,
//         })
//         .compileComponents()
//         .then(() => {
//           fixture = TestBed.createComponent(EmployersComponent);
//           component = fixture.componentInstance;
//           fixture.detectChanges();
//           submitEl = fixture.debugElement;
//         })
//         .catch((e) => console.error(e));
//     })
//   );

//   it("saveEmployer sets saveDisabled to true during saving", fakeAsync(() => {
//     component.employerForm = new FormGroup({});
//     component.saveEmployer();

//     const saveSpy = employerServiceSpy.save.and.returnValue(of(new Employer()));
//     saveSpy.and.returnValue(throwError("EmployerService test failure"));
//     fixture.detectChanges();
//     tick();
//     fixture.detectChanges();
//     expect(component.errorMessage).toMatch(
//       /test failure/,
//       "should display error"
//     );
//     expect(component.saveDisabled).toBeTruthy();
//   }));
// });
