import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import {
  DynamicDialogConfigSpy,
  DynamicDialogRefSpy,
} from "src/app/shared/testing";

import { SkillsComponent } from "./skills.component";

describe("SkillsComponent", () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillsComponent],
      imports: [DynamicDialogModule],
      providers: [
        { provide: DynamicDialogRef, useClass: DynamicDialogRefSpy },
        { provide: DynamicDialogConfig, useClass: DynamicDialogConfigSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should not have skills after construction", () => {
    expect(component.skills).toBeUndefined();
  });
});
