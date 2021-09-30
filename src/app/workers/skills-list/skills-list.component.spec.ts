import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterSpy, WorkerServiceSpy } from "../../shared/testing";
import { WorkersService } from "../workers.service";

import { SkillsListComponent } from "./skills-list.component";

describe("SkillsListComponent", () => {
  let component: SkillsListComponent;
  let fixture: ComponentFixture<SkillsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillsListComponent],
    })
      .overrideComponent(SkillsListComponent, {
        set: {
          providers: [
            { provide: WorkersService, useClass: WorkerServiceSpy },
            { provide: Router, useClass: RouterSpy },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
