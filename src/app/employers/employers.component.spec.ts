import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { EmployersComponent } from "./employers.component";
import { EmployersService } from "./employers.service";
import { LookupsService } from "../lookups/lookups.service";
import { DropdownModule } from "primeng/dropdown";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import {
  EmployersServiceSpy,
  LookupsServiceSpy,
  RouterSpy,
} from "../shared/testing";
import { Router } from "@angular/router";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { KeyFilterModule } from "primeng/keyfilter";
import { InputMaskModule } from "primeng/inputmask";

describe("EmployersComponent", () => {
  let component: EmployersComponent;
  let fixture: ComponentFixture<EmployersComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
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
      })
        .overrideComponent(EmployersComponent, {
          set: {
            providers: [
              { provide: EmployersService, useClass: EmployersServiceSpy },
              { provide: LookupsService, useClass: LookupsServiceSpy },
              { provide: Router, useClass: RouterSpy },
            ],
          },
        })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(EmployersComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
        })
        .catch((e) => console.error(e));
    })
  );

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
