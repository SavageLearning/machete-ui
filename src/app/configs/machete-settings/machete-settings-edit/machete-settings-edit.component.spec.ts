import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ConfirmationService } from "primeng/api";
import { of } from "rxjs";
import { ConfigsServiceSpy } from "src/app/shared/testing";
import { ConfigsService } from "../../configs.service";

import { MacheteSettingsEditComponent } from "./machete-settings-edit.component";

describe("MacheteSettingsEditComponent", () => {
  let component: MacheteSettingsEditComponent;
  let fixture: ComponentFixture<MacheteSettingsEditComponent>;
  let confirmationSpy: jasmine.SpyObj<ConfirmationService>;

  beforeEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    confirmationSpy = jasmine.createSpyObj("ConfirmationService", ["confirm"]);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
      ],
      declarations: [MacheteSettingsEditComponent],
      providers: [
        {
          provide: ConfigsService,
          useClass: ConfigsServiceSpy,
        },
        {
          provide: ConfirmationService,
          useValue: confirmationSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of("someRoute"),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MacheteSettingsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
